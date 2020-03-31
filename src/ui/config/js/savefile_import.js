{
	const SENDER = "config_import_savefile";

	/* creates an "add"-message for background_filter_storage
	if regExType is undefined (e.g. not passed) userChannelNameOrRegEx is an user/channel-name,
	otherwise it is a regular expression with type regExType */
	function createAddMsg(filterType, userChannelNameOrRegEx, regExType){
		let msg = {
			sender: SENDER,
			receiver: "background_filter_storage",
			content: {
				info: "add",
				filter_type: filterType
			}
		};

		if(regExType === undefined){
			msg.content.user_channel_name = userChannelNameOrRegEx;
		}else{
			msg.content.reg_exp = userChannelNameOrRegEx;
			msg.content.reg_exp_type = regExType;
		}

		return msg;
	}

	//creates a "config_value_set"-message for background_config_storage
	function createConfigValueSetMsg(configId, configVal) {
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			content: {
				info: "config_value_set",
				config_id: configId,
				config_val: configVal
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
					//userChannelNameOrRegEx is a user/channel name

					browser.runtime.sendMessage(createAddMsg(filterType, userChannelNameOrRegEx));
				}else{
					//userChannelNameOrRegEx is a regular expression

					browser.runtime.sendMessage(createAddMsg(filterType, userChannelNameOrRegEx, jsonSaveFile[filterType][userChannelNameOrRegEx]));
				}
			}
		}

		if(jsonSaveFile["config"] !== undefined){
			//New savefile-format
			for(let configId of Object.values(ConfigId)){
				browser.runtime.sendMessage(createConfigValueSetMsg(configId, jsonSaveFile["config"][configId]));
			}
		}
	}

	//Check if the file-APIs are supported.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		//The file-APIs are supported.
		document.getElementById('fileLoaderBtn').addEventListener('change', startRead, false);
	} else {
		//The file-APIs are supported.
		alert('The file-APIs are not supported. You are not able to import.');
	}

	document.getElementById('visibleFileLoaderBtn').addEventListener('click', () => {
			document.getElementById('fileLoaderBtn').click();
	});
}
