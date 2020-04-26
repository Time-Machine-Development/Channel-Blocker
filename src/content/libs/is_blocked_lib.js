function createIsBlockedRequestMsg(userChannelName){
	return {
		sender: "content_is_blocked_lib",
		receiver: "background_storage_filter",
		info: "is_blocked_request",
		content: {
			user_channel_name: userChannelName
		}
	};
}

//returns 'true' if and only if user/channel-name userChannelName is blocked
async function isUserChannelNameBlocked(userChannelName){
	return await browser.runtime.sendMessage(createIsBlockedRequestMsg(userChannelName));
}

//returns 'true' if and only if user/channel-name userChannelName is blocked or video-title videoTitle is blocked
async function isVideoTitleBlocked(userChannelName, videoTitle){
	let msg = createIsBlockedRequestMsg(userChannelName);
	msg.content.additional = {
		type: "title",
		content: videoTitle
	};

	return await browser.runtime.sendMessage(msg);
}

//returns 'true' if and only if user/channel-name is blocked or comment-content commentContent is blocked
async function isCommentContentBlocked(userChannelName, commentContent){
	let msg = createIsBlockedRequestMsg(userChannelName);
	msg.content.additional = {
		type: "comment",
		content: commentContent
	};

	return await browser.runtime.sendMessage(msg);
}
