// Manages the part of the storage which is affilliated to content UI configuration.

{
	const SENDER = "background_content_ui_storage";

	//represents the current content ui configuration
	let contentUIConfig = {};
	initContentUIConfig();

	function createContentUIStorageModifiedMsg(receiver, contentUIID){
		return {
			sender: SENDER,
			receiver: receiver,
			info: "content_ui_storage_modified",
			content: {
				content_ui_id: contentUIID,
				content_ui_config_val: contentUIConfig[contentUIID]
			}
		};
	}

	/* Init. contentUIConfig with the the content UI configuration which is stored in STORAGE (defined in shared).
	If this function is called for the first time after the installation of this webextension,
	it is also necessary to set contentUIConfig to DEFAULT_CONTENT_UI_CONFIG (defined in shared). */
	async function initContentUIConfig() {
		let config = await STORAGE.get("config");

		if(storageContainer["config"] !== undefined){
			//configuation was found in STORAGE

			//load configuration from STORAGE
			for(let contentUIID of Object.values(ContentUI)){
				contentUIConfig[contentUIID] = config[contentUIID];
			}
		}

		//set all not already set configurations to their default
		for(let contentUIID of Object.values(ContentUI)){
			if(config[contentUIID] === undefined){
				contentUIConfig[contentUIID] = DEFAULT_CONTENT_UI_CONFIG[contentUIID];
			}
		}

		//an update of storage is necessary if configuration was (paritially) not found in STORAGE
		updateStorage();
	}

	//synchronize STORAGE with contentUIConfig
	async function updateStorage() {
		let updatedConfig = Object.assign(await STORAGE.get("config"), contentUIConfig);

		await STORAGE.set({
			"config": updatedConfig
		});
	}

	/* Sets contentUIConfig[contentUIID] to val.
	If contentUIConfig[contentUIID] was changed a "content_ui_storage_modified"-message is sent to the config-tab
	and to all YT_TAB_IDS.
	Finally the STORAGE is updated. */
	function setContentUIConfigVal(contentUIID, val) {
		if(contentUIConfig[contentUIID] !== val){
			contentUIConfig[contentUIID] = val;

			if(configTabId !== null){
				browser.tabs.sendMessage(configTabId, createContentUIStorageModifiedMsg("config_config_user_interaction", contentUIID));
			}

			for(let tabId of YT_TAB_IDS.keys()){
				browser.tabs.sendMessage(Number(tabId), createContentUIStorageModifiedMsg("content_config", contentUIID));
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

		if(msg.info === "content_ui_config_value_set"){
			/* msg.content is of the form:
			{
				content_ui_id: <Content UI ID>,
				content_ui_config_val: <Content UI Config Value>
			}
			where <Content UI ID> is of Object.values(ContentUI).
			*/

			if(msg.sender === "config_savefile_import" || msg.sender === "config_config_user_interaction"){
				setContentUIConfigVal(msg.content.content_ui_id, msg.content.content_ui_config_val);
			}
		}

		if(msg.info === "content_ui_config_value_reset"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "config_config_user_interaction"){
				setContentUIConfigVal(ContentUI.BLOCK_BTN_COLOR, DEFAULT_CONTENT_UI_CONFIG[ContentUI.BLOCK_BTN_COLOR]);
				setContentUIConfigVal(ContentUI.BLOCK_BTN_SIZE, DEFAULT_CONTENT_UI_CONFIG[ContentUI.BLOCK_BTN_SIZE]);
			}
		}

		if(msg.info === "content_ui_config_value_request"){
			/* msg.content is of the form:
			{
				content_ui_id: <Content UI ID>
			}
			where <Content UI ID> is of Object.values(ContentUI).
			*/

			if(msg.sender === "shared_design_controller" || msg.sender === "config_config_user_interaction" || msg.sender === "content_controller"){
				//answer message with contentUIConfig[<Content UI ID>]
				return new Promise((resolve) => {
					resolve(contentUIConfig[msg.content.content_ui_id]);
				});
			}
		}

		if(msg.info === "content_ui_config_request"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "content_config"){
				return new Promise((resolve) => {
					resolve(Object.assign({}, contentUIConfig));
				});
			}
		}
	});
}
