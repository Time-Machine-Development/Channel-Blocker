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

		//only accept inputs that contain at least one non-whitespace character
		if(input.trim() !== "")
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
	for(let containerId in ContainerId){
		let addBtnId = containerId.toLowerCase() + "_add_btn";
		let deleteBtnId = containerId.toLowerCase() + "_delete_btn";

		document.getElementById(addBtnId).onclick = () => {sendAddMessage(ContainerId[containerId])};
		document.getElementById(deleteBtnId).onclick = () => {sendDeleteMessage(ContainerId[containerId])};
	}
}
