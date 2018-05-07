	
	function blockUserChannel (userChannelName){
		console.log(userChannelName + " blocked!");
		alert(userChannelName + " blocked!");
		let msg = {
			sender: "background_controller_storage",
			receiver: "content_event_dispatcher",
			"event": {
				type: "add",
				origin: "blocked_users",
				input: userChannelName
			}
		};
		let sending = browser.runtime.sendMessage(msg);
	}
	

	