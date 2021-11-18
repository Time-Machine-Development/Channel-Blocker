/* Manages the part of the storage which is affiliated to settings UI configuration..
Due to the fact that it is not possible to completely outsource the Popup feature into browser_action.js,
settings_ui_storage.js also and solely enables and disables the Popup. */

{
	const SENDER = "background_storage_settings_ui";

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
	async function initSettingsUIConfig() {
		let storage = await STORAGE.get(SETTINGS_UI_STORAGE_ID);

		if(storage[SETTINGS_UI_STORAGE_ID] !== undefined){
			//load configuration from STORAGE if it was found
			settingsUIConfig = storage[SETTINGS_UI_STORAGE_ID];
		}

		//set all not already set configurations to their default
		for(let settingsUIID of Object.values(SettingsUI)){
			if(settingsUIConfig[settingsUIID] === undefined){
				settingsUIConfig[settingsUIID] = DEFAULT_SETTINGS_UI_CONFIG[settingsUIID];
			}
		}

		//an update of storage is necessary if configuration was (partially) not found in STORAGE
		updateSettingsUIConfigStorage();

		//change browserAction functionality depending on configuration of SettingsUI.POPUP
		changeBrowserActionFunc();
	}

	async function updateSettingsUIConfigStorage(){
		await STORAGE.set({
			[SETTINGS_UI_STORAGE_ID]: settingsUIConfig
		});
	}

	/* Sets settingsUIConfig[settingsUIID] to val.
	If settingsUIConfig[settingsUIID] was changed a "settings_ui_storage_modified"-message is sent to the config-tab.
	Finally the STORAGE is updated. */
	function setSettingsUIConfigVal(settingsUIID, val) {
		if(settingsUIConfig[settingsUIID] !== val){
			settingsUIConfig[settingsUIID] = val;

			if(configTabId !== null){
				browser.tabs.sendMessage(configTabId, createSettingsUIStorageModifiedMsg(settingsUIID));
			}

			//an update of storage is necessary if configuration was (partially) not found in STORAGE
			updateSettingsUIConfigStorage();

			//change browserAction functionality depending on configuration of SettingsUI.POPUP
			changeBrowserActionFunc();
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
				setSettingsUIConfigVal(msg.content.settings_ui_id, msg.content.settings_ui_config_val);
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

			if(msg.sender === "shared_design_controller"){
				//shared_design_controller may only request SettingsUI.PAGE_DESIGN
				if(msg.content.settings_ui_id === SettingsUI.PAGE_DESIGN){
					return new Promise((resolve) => {
						resolve(settingsUIConfig[msg.content.settings_ui_id]);
					});
				}
			}
		}
	});
}
