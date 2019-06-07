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
	
	function addContentToFilterBox(containerId, item){
		let selection = document.getElementById(containerId + "_selection");

			let option = document.createElement("option");
			selection.appendChild(option);

			option.setAttribute("value", item);
			option.textContent = "\"" + item + "\"";
	}
	
	async function sendAndProcessFilterValuesRequestMsg() {
		//blocked_users_selection
		let values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.BLOCKED_USERS));
		for(let val of Object.keys(values)){
			addContentToFilterBox("blocked_users",val);
		}
		
		//title_regexs_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.TITLE_REGEXS));
		for(let val of Object.keys(values)){
		addContentToFilterBox("title_regexs",val + " [" + values[val] + "]");
		}
		
		//name_regexs_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.NAME_REGEXS));
		for(let val of Object.keys(values)){
			addContentToFilterBox("name_regexs",val + " [" + values[val] + "]");
		}
		
		//comment_regexs_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.COMMENT_REGEXS));
		for(let val of Object.keys(values)){
			addContentToFilterBox("comment_regexs",val + " [" + values[val] + "]");
		}
		
		//excluded_users_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.EXCLUDED_USERS));
		for(let val of Object.keys(values)){
			addContentToFilterBox("excluded_users",val);
		}
	}
	
	browser.runtime.sendMessage(createAddMsg(FilterType.TITLE_REGEXS, "Test1", RegExType.CASE_SENSITIVE));
	browser.runtime.sendMessage(createAddMsg(FilterType.TITLE_REGEXS, "Test2", RegExType.CASE_INSENSITIVE));
	
	sendAndProcessFilterValuesRequestMsg();
	
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
