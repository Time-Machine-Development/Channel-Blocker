function blockUserChannel (userChannelName){
	console.log(userChannelName + " blocked!");
	alert(userChannelName + " blocked!");
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