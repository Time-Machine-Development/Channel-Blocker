function blockUserChannel (userChannelName){
	console.log(userChannelName + " blocked!");
if (confirm("Are you sure you want to block \"" + userChannelName + "\"?")) {
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
}