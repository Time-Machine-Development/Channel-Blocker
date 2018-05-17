	
	function blockUserChannel (userChannelName){
		console.log(userChannelName + " blocked!");
		alert(userChannelName + " blocked!");
		let msg = {
			sender: "background_controller_storage",
			receiver: "content_event_dispatcher",
			"event": {
				type: "add",
				origin: ContainerId.BLOCKED_USERS,
				input: userChannelName
			}
		};
		let sending = browser.runtime.sendMessage(msg);
	}
	

	