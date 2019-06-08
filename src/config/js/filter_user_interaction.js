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
	
	//set all options of selectio to null
	function clearSelection(containerId){
		let selection = document.getElementById(containerId + "_selection");
		var i;
		for(i = selection.options.length - 1 ; i >= 0 ; i--){
			selection.remove(i);
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
		clearSelection("blocked_users");
		for(let val of Object.keys(values)){
			addContentToFilterBox("blocked_users",val);
		}
		
		//title_regexs_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.TITLE_REGEXS));
		clearSelection("title_regexs");
		for(let val of Object.keys(values)){
		addContentToFilterBox("title_regexs",val + " [" + values[val] + "]");
		}
		
		//name_regexs_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.NAME_REGEXS));
		clearSelection("name_regexs");
		for(let val of Object.keys(values)){
			addContentToFilterBox("name_regexs",val + " [" + values[val] + "]");
		}
		
		//comment_regexs_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.COMMENT_REGEXS));
		clearSelection("comment_regexs");
		for(let val of Object.keys(values)){
			addContentToFilterBox("comment_regexs",val + " [" + values[val] + "]");
		}
		
		//excluded_users_selection
		values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType.EXCLUDED_USERS));
		clearSelection("excluded_users");
		for(let val of Object.keys(values)){
			addContentToFilterBox("excluded_users",val);
		}
	}
	
	//get the input_textfield value, create an addMsg and send it to the storage
	function sendAddMessage(filterType){
		let input = document.getElementById(filterType.toLowerCase() + "_input_textfield").value;
		document.getElementById(filterType.toLowerCase() + "_input_textfield").value = "";

		input = input.trim();
		if(input !== ""){
			if(filterType === "BLOCKED_USERS" || filterType === "EXCLUDED_USERS"){
				browser.runtime.sendMessage(createAddMsg(FilterType[filterType], input));
			}else{
				browser.runtime.sendMessage(createAddMsg(FilterType[filterType], input, RegExType.CASE_SENSITIVE));
			}
		}
	}

	//get the options from the selection, create an deleteMsg and send it to the storage
	function sendDeleteMessage(filterType){
		function getSelectedOptions(selectionId){
			let selection = document.getElementById(selectionId);
			let options = [];

			for(let opt of selection.selectedOptions){
				options.push(opt.getAttribute("value"));
			}

			return options;
		}

		let selectionId = filterType.toLowerCase() + "_selection";
		let input = getSelectedOptions(selectionId);

		browser.runtime.sendMessage(createDeleteMsg(FilterType[filterType], input));
	}
	
	//TODO test
	browser.runtime.sendMessage(createAddMsg(FilterType.TITLE_REGEXS, "Test1", RegExType.CASE_SENSITIVE));
	browser.runtime.sendMessage(createAddMsg(FilterType.TITLE_REGEXS, "Test2", RegExType.CASE_INSENSITIVE));
	
	//get the filtervalues at startup
	sendAndProcessFilterValuesRequestMsg();
	
	
	//install onclick functions for all buttons of config.html
	for(let filterType in FilterType){
		let filterTypeStr = filterType.toLowerCase();
	
	 	let addBtnId = filterTypeStr + "_add_btn";
	 	let deleteBtnId = filterTypeStr + "_delete_btn";
	
	 	document.getElementById(addBtnId).onclick = () => {
	 		sendAddMessage(filterType);
	 	};
	 	document.getElementById(deleteBtnId).onclick = () => {
			sendDeleteMessage(filterType);
	 	};
	}

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
				sendAndProcessFilterValuesRequestMsg();
			}
		}

	});
}
