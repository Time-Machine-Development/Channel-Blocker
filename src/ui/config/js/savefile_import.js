{
	const SENDER = "config_savefile_import";

	/* creates an "add"-message for background_filter_storage
	If an user/channel name is added regExType must be undefined (e.g. not passed) and userChannelNameOrRegEx has to be the user/channel name.
	If a regular expression is added regExType has to be either RegExType.CASE_SENSITIVE or RegExType.CASE_INSENSITIVE
	and userChannelNameOrRegEx has to be a regular expression.
	FilterType has to be in Object.values(FilterType) which is a subset of Numbers.*/
	function createAddMsg(filterType, userChannelNameOrRegExp, regExpType){
		let msg = {
			sender: SENDER,
			receiver: "background_filter_storage",
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

	function createConfigValueSetMsg(configId, configVal) {
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			info: "config_value_set",
			content: {
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
					//userChannelNameOrRegEx is an user/channel name
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
