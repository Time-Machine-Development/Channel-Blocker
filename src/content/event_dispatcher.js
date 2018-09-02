//Sends a message to the Backgroundscripts_controller_storage, to block the 'userChannelName'
function blockUserChannel (userChannelName){
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


//Checks if the 'userChannelName' is still correct and invokes 'blockUserChannel()'
function blockUserChannelwithFallback (userChannelName, elem){
	
	for(let item of elem.parentNode.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")){
		userChannelName = item.textContent;
	}
	
	blockUserChannel (userChannelName);
}