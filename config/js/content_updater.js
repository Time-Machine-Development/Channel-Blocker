{
	const SENDER = "config_content_updater";

	function addOption(containerId, item){
		let selection = document.getElementById(containerId + "_selection");

		let option = document.createElement("option");
		selection.appendChild(option);

		option.setAttribute("value", item.id);
		option.textContent = "\"" + item.id + "\"";

		if(item.additional !== undefined){
			option.textContent += "(" + item.additional + ")";
		}
	}

	function deleteOption(containerId, item){
		let selection = document.getElementById(containerId + "_selection");

		for(let child of selection.childNodes){
			if(child.nodeType === Node.ELEMENT_NODE && child.getAttribute("value") === item.id){
				selection.removeChild(child);

				return;
			}
		}
	}

	function handleMsg(msg){
		if(msg.sender !== "background_controller_storage" || msg.receiver !== SENDER)
			return;

		let containerIdStr = (Object.keys(ContainerId)[msg.event.target]).toLowerCase();

		if(msg.event.type === "add"){
			for(let item of msg.event.items){
				addOption(containerIdStr, item);
			}
		}else if(msg.event.type === "delete"){
			for(let item of msg.event.items){
				deleteOption(containerIdStr, item);
			}
		}
	}

	//install message handler to handle incoming messages from background-script controller
	browser.runtime.onMessage.addListener(handleMsg);

	//initial content update request (will be answered with "add"-messages from controller)
	browser.runtime.sendMessage(
		{
			sender: SENDER,
			receiver: "background_controller_storage",
			"event": {
				type: "content_update_request"
			}
		}
	);
}
