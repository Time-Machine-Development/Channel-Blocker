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
	
	function sendExportMessage(){
		browser.runtime.sendMessage(
			{
				sender: SENDER,
				receiver: "background_controller_storage",
				"event": {
					type: 	"export"
				}
			}
		);
	}

	function sendAddMessage(containerId){
		let input = document.getElementById("input_textfield").value;
		document.getElementById("input_textfield").value = "";

		//only accept inputs that contain at least one non-whitespace character
		input = input.trim();
		if(input !== "")
			sendMessage("add", ContainerId[containerId], input);
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

		let selectionId = containerId.toLowerCase() + "_selection";
		let input = getSelectedOptions(selectionId);

		sendMessage("delete", ContainerId[containerId], input);
	}

	//install onclick functions for all buttons of config.html
	for(let containerId in ContainerId){
		if(containerId !== "CONFIG"){
			
			let containerIdStr = containerId.toLowerCase();

			let addBtnId = containerIdStr + "_add_btn";
			let deleteBtnId = containerIdStr + "_delete_btn";

			document.getElementById(addBtnId).onclick = () => {
				sendAddMessage(containerId)
			};
			document.getElementById(deleteBtnId).onclick = () => {
				sendDeleteMessage(containerId)
			};
		}
	}
	
	document.getElementById("exportBtn").onclick = () => {sendExportMessage();};
}
