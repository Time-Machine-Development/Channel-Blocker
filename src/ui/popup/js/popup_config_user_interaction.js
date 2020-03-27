{
	const SENDER = "popup_config_user_interaction";

	/* creates an "add"-message for background_filter_storage
	if regExType is undefined (e.g. not passed) userChannelNameOrRegEx is an user/channel-name,
	otherwise it is a regular expression with type regExType */
	function createAddMsg(userChannelNameOrRegEx){
		let msg = {
			sender: SENDER,
			receiver: "background_filter_storage",
			content: {
				info: "add",
				filter_type: FilterType.BLOCKED_USERS
			}
		};
		msg.content.user_channel_name = userChannelNameOrRegEx;

		return msg;
	}


	//creates a "delete"-message for background_filter_storage
	function createDeleteMsg(userChannelNameOrRegEx){
		return {
			sender: SENDER,
			receiver: "background_filter_storage",
			content: {
				info: "delete",
				filter_type: FilterType.BLOCKED_USERS,
				filter_val: userChannelNameOrRegEx
			}
		};
	}

	//creates a "filter_values_request"-message for background_filter_storage
	function createFilterValuesRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_filter_storage",
			content: {
				info: "filter_values_request",
				filter_type: FilterType.BLOCKED_USERS
			}

		}
	}

	//creates a "createOpenOptionsMsg"-message for background_browser_action
	function createOpenOptionsMsg(){
		return {
			sender: SENDER,
			receiver: "background_browser_action",
			content: {
				info: "openOptions"
			}

		}
	}

	//set all options of selectio to null
	function clearSelection(){
		let selection = document.getElementById("popupSelection");
		let i;
		for(i = selection.options.length - 1 ; i >= 0 ; i--){
			selection.remove(i);
		}
	}

	//add an user/channel-name to the selection
	function addUserToSelection(user){
		let selection = document.getElementById("popupSelection");

		let option = document.createElement("option");
		selection.appendChild(option);

		option.setAttribute("value", user);
		option.textContent = "\"" + user + "\"";
	}

	//send a FilterValuesRequestMsg and refresh the selection
	async function refreshValues(){
		let values = await browser.runtime.sendMessage(createFilterValuesRequestMsg());

		clearSelection();

		for(let val of Object.keys(values)){
			addUserToSelection(val, values[val]);
		}
	}

	//handle the event from the openOptionsHandlerBtn
	function openOptionsHandler() {
		browser.runtime.sendMessage(createOpenOptionsMsg());
	}

	//handle the event from the addBtnHandler
	async function addBtnHandler() {
		if(document.getElementById("popupTextField").value === ""){
			return;
		}

		let values = await browser.runtime.sendMessage(createAddMsg(document.getElementById("popupTextField").value));
		document.getElementById("popupTextField").value = "";

		clearSelection();

		for(let val of Object.keys(values)){
			addUserToSelection(val, values[val]);
		}
	}

	//handle the event from the popupDelBtnHandler
	async function popupDelBtnHandler() {
		function getSelectedOptions(){
			let selection = document.getElementById("popupSelection");
			let options = [];

			for(let opt of selection.selectedOptions){
				options.push(opt.getAttribute("value"));
			}

			return options;
		}

		let input = getSelectedOptions();

		for(let filterVal of input){
			browser.runtime.sendMessage(createDeleteMsg(filterVal));
		}
		refreshValues();
	}

	//define behavior for popupOptionsBtn
	document.getElementById("popupOptions").addEventListener('click', openOptionsHandler);

	//define behavior for popupAddBtn
	document.getElementById("popupAddBtn").addEventListener('click', addBtnHandler);

	//define behavior for popupDelBtn
	document.getElementById("popupDelBtn").addEventListener('click', popupDelBtnHandler);

	//define behavior for popupTextField
	document.getElementById("popupTextField").onkeypress = (e) => {
		//Pressed enter
		if(e.keyCode===13){
			addBtnHandler();
		}
	};

	//refresh
	refreshValues();
}
