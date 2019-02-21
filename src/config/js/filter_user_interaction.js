{
	const SENDER = "config_filter_user_interaction";

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

	//creates a "filter_values_request"-message for background_filter_storage
	function createFilterValuesRequestMsg(filterType){
		return {
			sender: SENDER,
			receiver: "background_filter_storage",
			content: {
				info: "filter_values_request",
				filter_type: filterType
			}

		}
	}

	// TODO: following code will be reworked in feature/config_rework (greatly depends on config.html)
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

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

     browser.runtime.onMessage.addListener((msg, sender) => {
          if(msg.receiver !== SENDER)
               return;

		if(msg.sender === "background_filter_storage"){
			if(msg.content.info === "filter_storage_modified"){
				/* msg.content is of the form:
     			{
     				info: "filter_storage_modified",
     				filter_type: <ft>
     			}
                    where <ft> is a value of FilterType
                    */

				//TODO: react on "filter_storage_modified"-message
			}
		}

	});
}
