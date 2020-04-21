/* Manages the part of the storage which is not affilliated to filter settings made by the user.
Due to the fact that it is not possible to completly outsource the Popup feature into browser_action.js,
config_storage.js also and solely enables and disables the Popup. */

{
	const SENDER = "background_config_storage";

	//represents the current configuration
	let config = {};
	initConfig();

	function createConfigStorageModifiedMsg(configId){
		return {
			sender: SENDER,
			receiver: "config_config_user_interaction",
			info: "config_storage_modified",
			content: {
				config_id: configId,
				config_val: config[configId]
			}
		};
	}

	function createContentConfigStorageModifiedMsg(configId){
		return {
			sender: SENDER,
			receiver: "content_config",
			info: "content_config_storage_modified",
			content: {
				config_id: configId,
				config_val: config[configId]
			}
		}
	}

	//returns true if and only if configId represents a content-related configId
	function isContentConfigId(configId){
		return Object.entries(ConfigId).reduce((acc, [key, val]) => {
			return acc || (val === configId && key.substr(0, 7) === "CONTENT")},
		false);
	}

	//returns an object containing the same key/value-pairs as config, excluding all where key represents a non-content-related configId
	function createContentConfigFromConfig(){
		return Object.entries(ConfigId).reduce((acc, [key, val]) => {
			if(key.substr(0, 7) === "CONTENT"){
				acc[val] = config[val];
			}

			return acc;
		},
		{});
	}

	//If the setting for ConfigId.CONFIG_USE_POPUP is true, overwrite browserAction-button functionality s.t. Popup will open instead of the Configuration-page or vice versa.
	function changeBrowserActionFunc(){
		if(config[ConfigId.CONFIG_USE_POPUP]){
			browser.browserAction.setPopup({popup: "ui/popup/html/popup.html"});
		}else{
			browser.browserAction.setPopup({popup: ""});
		}
	}

	/* init. current config with the the config which is stored in STORAGE (defined in shared)
	if this function is called for the first time after the installation of this webextension,
	it is also necessary to set all configuration-values to the default values (defined in DEFAULT_CONFIG) */
	async function initConfig() {
		let storageContainer = await STORAGE.get("config");

		if(storageContainer["config"] !== undefined){
			//configuation was found in STORAGE

			//load configuration from STORAGE
			config = storageContainer["config"];
		}else{
			//no configuration was found in STORAGE

			//set all configuration-values to their default and updateStorage s.t. the new configuration is eventually written to STORAGE
			for(let cId of Object.values(ConfigId)){
				config[cId] = DEFAULT_CONFIG[cId];
			}

			updateStorage();
		}

		//apply the setting for ConfigId.CONFIG_USE_POPUP
		changeBrowserActionFunc();
	}

	//synchronize STORAGE with current storage
	async function updateStorage() {
		await STORAGE.set({
			"config": config
		});
	}

	/* sets config[configId] to val,
	if config[configId] was changed a "config_storage_modified"-message is sent to the config-tab,
	if configId is content-related it a "content_config_storage_modified"-message is sent to all YT_TAB_IDS
	and the STORAGE is updated */
	function setConfigVal(configId, val) {
		if (config[configId] !== val) {
			config[configId] = val;

			if(configTabId !== null){
				browser.tabs.sendMessage(configTabId, createConfigStorageModifiedMsg(configId));
			}

			if(isContentConfigId(configId)){
				for(let tabId of YT_TAB_IDS.keys()){
					browser.tabs.sendMessage(Number(tabId), createContentConfigStorageModifiedMsg(configId));
				}
			}

			if(configId === ConfigId.CONFIG_USE_POPUP){
				//apply the setting for ConfigId.CONFIG_USE_POPUP
				changeBrowserActionFunc();
			}

			updateStorage();
		}
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM config-, content- and shared-scripts
	 */

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "config_value_set"){
			/* msg.content is of the form:
			{
				config_id: <Config ID>,
				config_val: <Config Value>
			}
			where <Config ID> is of Object.values(ConfigId).
			 */

			if(msg.sender === "config_savefile_import" || msg.sender === "config_config_user_interaction"){
				setConfigVal(msg.content.config_id, msg.content.config_val);
			}
		}

		if(msg.info === "config_value_reset"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "config_config_user_interaction"){
				setConfigVal(ConfigId.CONTENT_BLOCK_BTN_COLOR, DEFAULT_CONFIG[ConfigId.CONTENT_BLOCK_BTN_COLOR]);
				setConfigVal(ConfigId.CONTENT_BLOCK_BTN_SIZE, DEFAULT_CONFIG[ConfigId.CONTENT_BLOCK_BTN_SIZE]);
			}
		}

		if(msg.info === "config_value_request"){
			/* msg.content is of the form:
			{
				config_id: <Config ID>
			}
			where <Config ID> is of Object.values(ConfigId).
			*/

			if(msg.sender === "shared_design_controller" || msg.sender === "config_config_user_interaction" || msg.sender === "content_controller"){
				//answer message with config[<Config ID>]
				return new Promise((resolve) => {
					resolve(config[msg.content.config_id]);
				});
			}
		}

		if(msg.info === "content_config_request"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "content_config"){
				return new Promise((resolve) => {
					resolve(createContentConfigFromConfig());
				});
			}
		}
	});
}
