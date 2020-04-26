{
	const SENDER = "popup_config_user_interaction";

	function createAddMsg(userChannelName){
		return {
			sender: SENDER,
			receiver: "background_storage_filter",
			info: "add",
			content: {
				filter_type: FilterType.BLOCKED_USERS,
				user_channel_name: userChannelName
			}
		};
	}

	function createDeleteMsg(filterVal){
		return {
			sender: SENDER,
			receiver: "background_storage_filter",
			info: "delete",
			content: {
				filter_type: FilterType.BLOCKED_USERS,
				filter_val: filterVal
			}
		};
	}

	function createFilterValuesRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_storage_filter",
			info: "filter_values_request",
			content: {
				filter_type: FilterType.BLOCKED_USERS
			}
		};
	}

	function createOpenConfigMsg(){
		return {
			sender: SENDER,
			receiver: "background_browser_action",
			info: "open_config"
		};
	}

	//set all options of popup-selection to null
	function clearSelection(){
		let selection = document.getElementById("popupSelection");

		for(let i = selection.options.length - 1 ; i >= 0 ; i--){
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

	//get the filter values of type FilterType.BLOCKED_USERS, clear the selection and add the new values
	async function sendAndProcessFilterValuesRequestMsg(){
		/* sendAndProcessFilterValuesRequestMsg() receives the currently stored values including the newly added resp. newly deleted
		(probably) because the messages the background_storage_filter receives are added in a queue and therefore the
		message sent in createFilterValuesRequestMsg() will always be processed by background_storage_filter after the storage was altered
		by messages sent in addBtnHandler() and popupDelBtnHandler(). */
		let values = await browser.runtime.sendMessage(createFilterValuesRequestMsg());

		clearSelection();

		for(let val of Object.keys(values)){
			addUserToSelection(val, values[val]);
		}
	}

	//handle the event from the openOptionsHandlerBtn
	function openConfigHandler() {
		browser.runtime.sendMessage(createOpenConfigMsg());
	}

	//handle the event from the addBtnHandler
	async function addBtnHandler() {
		if(document.getElementById("popupTextField").value === ""){
			return;
		}

		browser.runtime.sendMessage(createAddMsg(document.getElementById("popupTextField").value));
		document.getElementById("popupTextField").value = "";

		sendAndProcessFilterValuesRequestMsg();
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

		sendAndProcessFilterValuesRequestMsg();
	}

	//define behavior for popupOptionsBtn
	document.getElementById("popupOptions").addEventListener('click', openConfigHandler);

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

	//get the filtervalues at startup
	sendAndProcessFilterValuesRequestMsg();
}
