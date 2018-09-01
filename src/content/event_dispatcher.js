//Sends a message to the Backgroundscripts_controller_storage, to block the 'userChannelName'
function blockUserChannel (userChannelName, elem){
	
	if(elem !== null){
		console.log("checking befor blocking...");
		for(let item of elem.parentNode.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")){
			console.log(item.textContent + " --- " + userChannelName);
			userChannelName = item.textContent;
		}
	}
	
	let msg = {
		sender: "content_event_dispatcher",
		receiver: "background_controller_storage",
		"event": {
			type: "add",
			origin: ContainerId.BLOCKED_USERS,
			input: userChannelName
		}
	};
	let sending = browser.runtime.sendMessage(msg);
}