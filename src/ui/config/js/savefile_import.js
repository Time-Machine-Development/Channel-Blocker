{
	const SENDER = "config_savefile_import";

	/* creates an "add"-message for background_storage_filter
	If an user/channel name is added regExType must be undefined (e.g. not passed) and userChannelNameOrRegEx has to be the user/channel name.
	If a regular expression is added regExType has to be either RegExType.CASE_SENSITIVE or RegExType.CASE_INSENSITIVE
	and userChannelNameOrRegEx has to be a regular expression.
	FilterType has to be in Object.values(FilterType) which is a subset of Numbers.*/
	function createAddMsg(filterType, userChannelNameOrRegExp, regExpType){
		let msg = {
			sender: SENDER,
			receiver: "background_storage_filter",
			info: "add",
			content: {
				filter_type: filterType
			}
		};

		if(regExpType === undefined){
			msg.content.user_channel_name = userChannelNameOrRegExp;
		}else{
			msg.content.reg_exp = userChannelNameOrRegExp;
			msg.content.reg_exp_type = regExpType;
		}

		return msg;
	}

	function createContentUIConfigValueSetMsg(contentUIID, contentUIConfigVal) {
		return {
			sender: SENDER,
			receiver: "background_storage_content_ui",
			info: "content_ui_config_value_set",
			content: {
				content_ui_id: contentUIID,
				content_ui_config_val: contentUIConfigVal
			}
		};
	}

	function createSettingsUIConfigValueSetMsg(settingsUIID, settingsUIConfigVal) {
		return {
			sender: SENDER,
			receiver: "background_storage_settings_ui",
			info: "settings_ui_config_value_set",
			content: {
				settings_ui_id: settingsUIID,
				settings_ui_config_val: settingsUIConfigVal
			}
		};
	}

	//Get the choosen file and read it as text
	function startRead(event) {
		let file = document.getElementById('fileLoaderBtn').files[0];
		if (file) {
			let fileReader = new FileReader();

			fileReader.readAsText(file, "UTF-8");

			fileReader.onload = onLoad;
		}
	}

	//If file is Loaded
	function onLoad(event) {
		let fileString = event.target.result;
		let jsonSaveFile = JSON.parse(fileString);

		//add all filter the savefile contains (e.g. user/channel names and regular expressions)
		for(let filterType of Object.values(FilterType)){
			for(let userChannelNameOrRegEx in jsonSaveFile[filterType]){
				if(filterType === FilterType.BLOCKED_USERS || filterType === FilterType.EXCLUDED_USERS){
					//userChannelNameOrRegEx is an user/channel name
					browser.runtime.sendMessage(createAddMsg(filterType, userChannelNameOrRegEx));
				}else{
					//userChannelNameOrRegEx is a regular expression
					browser.runtime.sendMessage(createAddMsg(filterType, userChannelNameOrRegEx, jsonSaveFile[filterType][userChannelNameOrRegEx]));
				}
			}
		}

		if(jsonSaveFile["config"] !== undefined){
			//Assume savefile from version 2.2.1 or below

			for(deprecatedID of Object.values(DeprecatedConfig)){
				let mappedConfig = DeprecatedConfigToConfigMapping[deprecatedID];

				if(mappedConfig.storageID === SETTINGS_UI_STORAGE_ID){
					// the PAGE_DESIGN is not longer of type string, parse it to an int when found
					if(deprecatedID === DeprecatedConfig.PAGE_DESIGN){
						browser.runtime.sendMessage(createSettingsUIConfigValueSetMsg(mappedConfig.ID, parseInt(jsonSaveFile["config"][deprecatedID])));
					}else{
						browser.runtime.sendMessage(createSettingsUIConfigValueSetMsg(mappedConfig.ID, jsonSaveFile["config"][deprecatedID]));
					}
				}else if(mappedConfig.storageID === CONTENT_UI_STORAGE_ID){
					browser.runtime.sendMessage(createContentUIConfigValueSetMsg(mappedConfig.ID, jsonSaveFile["config"][deprecatedID]));
				}
			}
		}

		if(jsonSaveFile[CONTENT_UI_STORAGE_ID] !== undefined && jsonSaveFile[SETTINGS_UI_STORAGE_ID] !== undefined){
			//Assume savefile from version higher than 2.2.1

			for(let contentUIID of Object.values(ContentUI)){
				browser.runtime.sendMessage(createContentUIConfigValueSetMsg(contentUIID, jsonSaveFile[CONTENT_UI_STORAGE_ID][contentUIID]));
			}

			for(let settingsUIID of Object.values(SettingsUI)){
				browser.runtime.sendMessage(createSettingsUIConfigValueSetMsg(settingsUIID, jsonSaveFile[SETTINGS_UI_STORAGE_ID][settingsUIID]));
			}
		}
	}

	//Check if the file-APIs are supported.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		//The file-APIs are supported.
		document.getElementById('fileLoaderBtn').addEventListener('change', startRead, false);
	} else {
		//The file-APIs are not supported.
		alert('The file-APIs are not supported. You are not able to import.');
	}

	document.getElementById('visibleFileLoaderBtn').addEventListener('click', () => {
		document.getElementById('fileLoaderBtn').click();
	});
}
