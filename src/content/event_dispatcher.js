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

//?: what means 'still correct', what is the loop doing
//Checks if the 'userChannelName' is still correct and invokes 'blockUserChannel()'
function blockUserChannelwithFallback(userChannelName, elem){
	for(let item of elem.parentNode.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")){
		userChannelName = item.textContent;
	}

	//sends an "add_blocked_user"-message to the background_filter_storage which adds userChannelName to the set of blocked users
	browser.runtime.sendMessage(createAddBlockedUserMsg(userChannelName));
}
