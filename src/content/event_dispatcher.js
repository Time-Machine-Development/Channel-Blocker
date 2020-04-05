function createAddBlockedUserMsg(userChannelName){
	return {
		sender: "content_event_dispatcher",
		receiver: "background_filter_storage",
		info: "add_blocked_user",
		content: {
			user_channel_name: userChannelName
		}
	};
}

function createBlockUserChannelFunction(userChannelName){
	return () => {
		browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
	};
}
