/* Manages the part of the storage which is affilliated to settings UI configuration..
Due to the fact that it is not possible to completly outsource the Popup feature into browser_action.js,
settings_ui_storage.js also and solely enables and disables the Popup. */

{
	const SENDER = "background_settings_ui_storage";

	//represents the current settings ui configuration
	let settingsUIConfig = {};
	initSettingsUIConfig();

	function createSettingsUIStorageModifiedMsg(settingsUIID){
		return {
			sender: SENDER,
			receiver: "config_config_user_interaction",
			info: "settings_ui_storage_modified",
			content: {
				settings_ui_id: settingsUIID,
				settings_ui_config_val: settingsUIConfig[settingsUIID]
			}
		};
	}

	//If the setting for SettingsUI.POPUP is true, overwrite browserAction-button functionality s.t. Popup will open instead of the Configuration-page or vice versa.
	function changeBrowserActionFunc(){
		if(settingsUIConfig[SettingsUI.POPUP]){
			browser.browserAction.setPopup({popup: "ui/popup/html/popup.html"});
		}else{
			browser.browserAction.setPopup({popup: ""});
		}
	}

	/* Init. settingsUIConfig with the the settings UI configuration which is stored in STORAGE (defined in shared).
	If this function is called for the first time after the installation of this webextension,
	it is also necessary to set settingsUIConfig to DEFAULT_SETTINGS_UI_CONFIG (defined in shared). */
	async function initContentUIConfig() {
		let config = await STORAGE.get("config");

		if(storageContainer["config"] !== undefined){
			//configuation was found in STORAGE

			//load configuration from STORAGE
			for(let settingsUIID of Object.values(SettingsUI)){
				settingsUIConfig[settingsUIID] = config[settingsUIID];
			}
		}

		//set all not already set configurations to their default
		for(let settingsUIID of Object.values(SettingsUI)){
			if(config[settingsUIID] === undefined){
				settingsUIConfig[settingsUIID] = DEFAULT_SETTINGS_UI_CONFIG[settingsUIID];
			}
		}

		//an update of storage is necessary if configuration was (paritially) not found in STORAGE
		updateStorage();

		//change browserAction functionality depending on configuration of SettingsUI.POPUP
		changeBrowserActionFunc();
	}

	//synchronize STORAGE with settingsUIConfig
	async function updateStorage() {
		let updatedConfig = Object.assign(await STORAGE.get("config"), settingsUIConfig);

		await STORAGE.set({
			"config": updatedConfig
		});
	}

	/* Sets settingsUIConfig[settingsUIID] to val.
	If settingsUIConfig[settingsUIID] was changed a "settings_ui_storage_modified"-message is sent to the config-tab.
	Finally the STORAGE is updated. */
	function setSettingsUIConfigVal(settingsUIID, val) {
		if(contentUIConfig[contentUIID] !== val){
			contentUIConfig[contentUIID] = val;

			if(configTabId !== null){
				browser.tabs.sendMessage(configTabId, createSettingsUIStorageModifiedMsg(contentUIID));
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

		if(msg.info === "settings_ui_config_value_set"){
			/* msg.content is of the form:
			{
				settings_ui_id: <Settings UI ID>,
				settings_ui_config_val: <Settings UI Config Value>
			}
			where <Settings UI ID> is of Object.values(SettingsUI).
			*/

			if(msg.sender === "config_savefile_import" || msg.sender === "config_config_user_interaction"){
				setSettingsUIConfigVal(msg.content.config_id, msg.content.config_val);
			}
		}

		if(msg.info === "settings_ui_config_value_request"){
			/* msg.content is of the form:
			{
				settings_ui_id: <Settings UI ID>
			}
			where <Settings UI ID> is of Object.values(SettingsUI).
			*/

			if(msg.sender === "config_config_user_interaction"){
				//answer message with settingsUIConfig[<Settings UI ID>]
				return new Promise((resolve) => {
					resolve(settingsUIConfig[msg.content.settings_ui_id]);
				});
			}
		}
	});
}
