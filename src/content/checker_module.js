//helper to create a "simple" message for the background_filter_storage, to check if a user/channel-name, title or comment is blocked
function createIsBlockedRequestMsg(userChannelName){
	return {
		sender: "content_checker_module",
		receiver: "background_filter_storage",
		info: "is_blocked_request",
		content: {
			user_channel_name: userChannelName
		}
	};
}

/*create a "simple" "is_blocked_request"-message which only checks for user/channel-name
and send it to background_filter_storage and process the result*/
function checkUserChannelName(userName, checkedNode, isVideo = false){
	sendAndProcessIsBlockedRequestMsg(createIsBlockedRequestMsg(userName), checkedNode, isVideo);
}

/*create an "advanced" "is_blocked_request"-message which checks for user/channel-name and a video-title
and send it to background_filter_storage and process the result*/
function checkVideoTitle(userName, videoTitle){
	let msg = createIsBlockedRequestMsg(userName);
	msg.content.additional = {
		type: "title",
		content: videoTitle.trim()
	};

	return browser.runtime.sendMessage(msg);
}

/*create an "advanced" "is_blocked_request"-message which checks for user/channel-name and a comment-content
and send it to background_filter_storage and process the result*/
function checkCommentContent(userName, commentContent){
	let msg = createIsBlockedRequestMsg(userName.trim());
	msg.content.additional = {
		type: "comment",
		content: commentContent.trim()
	};

	return browser.runtime.sendMessage(msg);
}
