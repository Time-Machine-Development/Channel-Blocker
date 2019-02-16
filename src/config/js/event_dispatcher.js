{
	const SENDER = "config_event_dispatcher";

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

	//creates a "delete"-message for background_filter_storage
	function createDeleteMsg(filterType, userChannelNameOrRegEx){
		return {
			sender: SENDER,
			receiver: "background_filter_storage",
			content: {
				info: "delete",
				filter_type: filterType,
				filter_val: userChannelNameOrRegEx
			}
		};
	}

	// TODO: following code will be reworked in feature/config_rework (greatly depends on config.html)
	//
	// function sendAddMessage(filterType){
	// 	let input = document.getElementById("input_textfield").value;
	// 	document.getElementById("input_textfield").value = "";
	//
	// 	//only accept inputs that contain at least one non-whitespace character
	// 	input = input.trim();
	// 	if(input !== "")
	// 		sendMessage("add", FilterType[filterType], input);
	// }
	//
	//
	// function sendDeleteMessage(filterType){
	// 	function getSelectedOptions(selectionId){
	// 		let selection = document.getElementById(selectionId);
	// 		let options = [];
	//
	// 		for(let opt of selection.selectedOptions){
	// 			options.push(opt.getAttribute("value"));
	// 		}
	//
	// 		return options;
	// 	}
	//
	// 	let selectionId = filterType.toLowerCase() + "_selection";
	// 	let input = getSelectedOptions(selectionId);
	//
	// 	sendMessage("delete", FilterType[filterType], input);
	// }
	//
	// //install onclick functions for all buttons of config.html
	// for(let filterType in FilterType){
	// 	let filterTypeStr = filterType.toLowerCase();
	//
	// 	let addBtnId = filterTypeStr + "_add_btn";
	// 	let deleteBtnId = filterTypeStr + "_delete_btn";
	//
	// 	document.getElementById(addBtnId).onclick = () => {
	// 		sendAddMessage(filterType)
	// 	};
	// 	document.getElementById(deleteBtnId).onclick = () => {
	// 		sendDeleteMessage(filterType)
	// 	};
	// }
}
