{
	const SENDER = "config_event_dispatcher";

	function sendMessage(type, origin, input){
		browser.runtime.sendMessage(
			{
				sender: SENDER,
				receiver: "background_controller_storage",
				"event": {
					type: 	type,
					origin: origin,
					input: 	input
				}
			}
		);
	}

	function sendAddMessage(containerId){
		let input = document.getElementById("input_textfield").value;
		document.getElementById("input_textfield").value = "";

		sendMessage("add", containerId, input);
	}

	function sendDeleteMessage(containerId){
		function getSelectedOptions(selectionId){
			let selection = document.getElementById(selectionId);
			let options = [];

			for(let opt of selection.selectedOptions){
				options.push(opt.getAttribute("value"));
			}

			return options;
		}

		let selectionId = containerId + "_selection";
		let input = getSelectedOptions(selectionId);

		sendMessage("delete", containerId, input);
	}

	//install onclick functions for all buttons of config.html
	for(let containerId of CONTAINER_IDS){
		let addBtnId = containerId + "_add_btn";
		let deleteBtnId = containerId + "_delete_btn";

		document.getElementById(addBtnId).onclick = () => {sendAddMessage(containerId)};
		document.getElementById(deleteBtnId).onclick = () => {sendDeleteMessage(containerId)};
	}
}
