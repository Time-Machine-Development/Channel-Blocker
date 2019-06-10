{
	const SENDER = "background_config_storage";

	const DEFAULT_CONFIG = {};
	DEFAULT_CONFIG[ConfigId.CONFIG_PAGE_DESIGN] = 0;
	DEFAULT_CONFIG[ConfigId.CONFIG_ADVANCED_VIEW] = false;
	DEFAULT_CONFIG[ConfigId.CONTENT_BLOCK_BTN_VISIBILITY] = true;
	Object.freeze(DEFAULT_CONFIG);

	//represents the current configuration
	let config;
	initConfig();

	//creates a "config_storage_modified"-message for config_config_user_interaction
	function createConfigStorageModifiedMsg(configId) {
		return {
			sender: SENDER,
			receiver: "config_config_user_interaction",
			content: {
				info: "config_storage_modified",
				config_id: configId,
				config_val: config[configId]
			}
		};
	}

	//creates a "block_btn_visibility_modified"-message for content_controller
	function createBlockBtnVisibilityModifiedMsg() {
		return {
			sender: SENDER,
			receiver: "content_controller",
			content: {
				info: "block_btn_visibility_modified",
				block_btn_visibility: config[ConfigId.CONTENT_BLOCK_BTN_VISIBILITY]
			}
		};
	}

	/* init. current config with the the config which is stored in STORAGE (defined in shared)
	if this function is called for the first time after the installation of this webextension,
	it is also necessary to set all configuration-values to the default values (defined in DEFAULT_CONFIG) */
	async function initConfig() {
		let storageContainer = await STORAGE.get("config");
		config = storageContainer["config"];
		if(config === undefined){
			config = DEFAULT_CONFIG;
		}

		let changed = false;
		for (let cId of Object.values(ConfigId)) {
			if (config[cId] === undefined) {
				config[cId] = DEFAULT_CONFIG[cId];
				changed = true;
			}
		}

		if (changed)
			updateStorage();
	}

	//synchronize STORAGE with current storage
	async function updateStorage() {
		await STORAGE.set({
			"config": config
		});
	}

	/* sets config[configId] to val, if config[configId] was changed a "config_storage_modified"-message is sent to the config-tab
	and if configId is ConfigId.CONTENT_BLOCK_BTN_VISIBILITY a "block_btn_visibility_modified"-message is also sent to all YT_TAB_IDS
	and the STORAGE is updated*/
	function setConfigVal(configId, val) {
		if (config[configId] !== val) {
			config[configId] = val;

			if (configTabId !== null)
				browser.tabs.sendMessage(configTabId, createConfigStorageModifiedMsg(configId));

			if (configId === ConfigId.CONTENT_BLOCK_BTN_VISIBILITY) {
				for (let tabId of YT_TAB_IDS.keys()) {
					browser.tabs.sendMessage(Number(tabId), createBlockBtnVisibilityModifiedMsg());
				}
			}
			updateStorage();
		}
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM config-scripts
	 */

	browser.runtime.onMessage.addListener((msg, sender) => {
		if (msg.receiver !== SENDER)
			return;

		if (msg.sender === "config_config_user_interaction") {
			if (msg.content.info === "config_value_set") {
				/* msg.content is of the form:{
				info: "config_value_set",
				config_id: <cid>,
				config_val: <cval>
				}
				where <cid> is a value of ConfigId
				 */

				setConfigVal(msg.content.config_id, msg.content.config_val);
			} else if (msg.content.info === "config_value_request") {
				/* msg.content is of the form:{
				info: "config_value_request",
				config_id: <cid>
				}
				where <cid> is a value of ConfigId
				 */

				//answer message with config[<cid>]
				return new Promise((resolve) => {
					resolve(config[msg.content.config_id]);
				});
			}
		}
	});

	/*
	INSTALLING LISTENER FOR MESSAGES FROM content-scripts
	 */

	browser.runtime.onMessage.addListener((msg, sender) => {
		if (msg.receiver !== SENDER)
			return;

		if (msg.sender === "content_controller") {
			/* msg.content is of the form:
			"block_btn_visibility_request"
			 */

			if (msg.content === "block_btn_visibility_request") {
				return new Promise((resolve) => {
					resolve(config[ConfigId.CONTENT_BLOCK_BTN_VISIBILITY]);
				});
			}
		}
	});
}
