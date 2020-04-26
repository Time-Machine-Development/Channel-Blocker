{
	const SENDER = "config_filter_user_interaction";

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

	function createDeleteMsg(filterType, filterVal){
		return {
			sender: SENDER,
			receiver: "background_storage_filter",
			info: "delete",
			content: {
				filter_type: filterType,
				filter_val: filterVal
			}
		};
	}

	function createFilterValuesRequestMsg(filterType){
		return {
			sender: SENDER,
			receiver: "background_storage_filter",
			info: "filter_values_request",
			content: {
				filter_type: filterType
			}
		};
	}

	//set all options of selection to null
	function clearSelection(containerId){
		let selection = document.getElementById(containerId + "_selection");

		for(let i = selection.options.length - 1 ; i >= 0 ; i--){
			selection.remove(i);
		}
	}

	//add an user/channel-name or regular expression (case-sensitve or case-insensitive) to container with id containerId
	function addUserChannelNameOrRegExToFilterBox(containerId, userChannelNameOrRegEx, regExType){
		let selection = document.getElementById(containerId + "_selection");

		let option = document.createElement("option");
		selection.appendChild(option);

		option.setAttribute("value", userChannelNameOrRegEx);
		option.textContent = "\"" + userChannelNameOrRegEx + "\"";

		/*regExType should only be interpreted if and only if containerId is (FilterType.TITLE_REGEXS | FilterType.NAME_REGEXS | FilterType.COMMENT_REGEXS)
		because in older versions no concept of a regular expression type existed, nevertheless the part of the storage
		which is now interpreted as the regular expression was filled with certain values e.g. 53, true and potentially other*/
		if(containerId.toUpperCase() === "TITLE_REGEXS" || containerId.toUpperCase() === "NAME_REGEXS" || containerId.toUpperCase() === "COMMENT_REGEXS"){
			if(regExType === RegExType.CASE_INSENSITIVE){
				option.textContent += " *";
			}
		}
	}

	//get the filter values, clear the selection and add the new values
	async function sendAndProcessFilterValuesRequestMsg() {
		for(let filterType in FilterType){
			let filterTypeStr = filterType.toLowerCase();
			let values = await browser.runtime.sendMessage(createFilterValuesRequestMsg(FilterType[filterType]));

			clearSelection(filterTypeStr);

			for(let val of Object.keys(values)){
				addUserChannelNameOrRegExToFilterBox(filterTypeStr, val, values[val]);
			}
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
			}else if(document.getElementById(filterType.toLowerCase() + "_caseInsensitive_checkbox").checked){
				browser.runtime.sendMessage(createAddMsg(FilterType[filterType], input, RegExType.CASE_INSENSITIVE));
			}else{
				browser.runtime.sendMessage(createAddMsg(FilterType[filterType], input, RegExType.CASE_SENSITIVE));
			}
		}
	}

	//get the options from the selection, create a deleteMsg and send it to the background
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

		for(let filterVal of input){
			browser.runtime.sendMessage(createDeleteMsg(FilterType[filterType], filterVal));
		}
	}


	//get the filtervalues at startup
	sendAndProcessFilterValuesRequestMsg();


	//install onclick functions for all buttons of config.html
	for(let filterType in FilterType){
		let filterTypeStr = filterType.toLowerCase();

	 	let addBtnId = filterTypeStr + "_add_btn";
	 	let deleteBtnId = filterTypeStr + "_delete_btn";
	 	let inputTextfieldId = filterTypeStr + "_input_textfield";

	 	document.getElementById(addBtnId).onclick = () => {
	 		sendAddMessage(filterType);
	 	};
	 	document.getElementById(deleteBtnId).onclick = () => {
			sendDeleteMessage(filterType);
	 	};
		document.getElementById(inputTextfieldId).onkeypress = (e) => {
			if(e.keyCode===13){
	 			sendAddMessage(filterType);
			}
	 	};
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
  		if(msg.receiver !== SENDER)
    		return;

		if(msg.info === "filter_storage_modified"){
			/* msg.content is of the form:
			{
				filter_type: <Filter Type>
			}
			where <Filter Type> is of Object.values(FilterType).
			*/

			if(msg.sender === "background_storage_filter"){
				sendAndProcessFilterValuesRequestMsg();
			}
		}
	});
}
