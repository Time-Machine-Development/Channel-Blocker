//sends an "add_blocked_user"-message to the background_filter_storage which adds userChannelName to the set of blocked users
function blockUserChannel(userChannelName){
	let msg = {
		sender: "content_event_dispatcher",
		receiver: "background_filter_storage",
		content: {
			info: "add_blocked_user",
			user_channel_name: userChannelName
		}
	};

	browser.runtime.sendMessage(msg);
}

//?: what means 'still correct', what is the loop doing
//Checks if the 'userChannelName' is still correct and invokes 'blockUserChannel()'
function blockUserChannelwithFallback(userChannelName, elem){
	for(let item of elem.parentNode.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")){
		userChannelName = item.textContent;
	}

	blockUserChannel(userChannelName);
}
