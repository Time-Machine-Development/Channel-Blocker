//init. animationSpeed (which is modified by content_controller)
var animationSpeed = 0;

//helper to create the "simple" message for the background_filter_storage, to check if a user/channel-name, title or comment is blocked
function createIsBlockedRequestMsg(userName){
	return {
		sender: "content_checker_module",
		receiver: "background_filter_storage",
		content: {
			info: "is_blocked_request",
			user_channel_name: userName
		}
	};
}

/*create a "simple" "is_blocked_request"-message which only checks for user/channel-name
and send it to background_filter_storage and process the result*/
function checkUserChannelName(userName, checkedNode){
	sendAndProcessIsBlockedRequestMsg(createIsBlockedRequestMsg(userName), checkedNode);
}

/*create an "advanced" "is_blocked_request"-message which checks for user/channel-name and a video-title
and send it to background_filter_storage and process the result*/
function checkVideoTitle(userName, videoTitle, checkedNode){
	let msg = createMsg(userName);
	msg.content.additional = {
		type: "title",
		content: videoTitle.trim()
	};

	sendAndProcessIsBlockedRequestMsg(msg, checkedNode);
}

/*create an "advanced" "is_blocked_request"-message which checks for user/channel-name and a comment-content
and send it to background_filter_storage and process the result*/
function checkCommentContent(userName, commentContent, checkedNode){
	let msg = createMsg(userName);
	msg.event.input.additional = {
		type: "comment",
		content: commentContent.trim()
	};

	sendAndProcessIsBlockedRequestMsg(msg, checkedNode);
}

/*sends an "is_blocked_request"-message to background_filter_storage and processes the result by making checkedNode visible/invisible
depending on the result of the request*/
async function sendAndProcessIsBlockedRequestMsg(msg, checkedNode) {
	let isBlocked = await browser.runtime.sendMessage(msg);

	if(isBlocked){
		//hide checkedNode
		checkedNode.id = "blocked";
		$(checkedNode).hide(animationSpeed);
	}else{
		if(checkedNode.id === "blocked"){
			//show checkedNode
			$(checkedNode).show(animationSpeed);
			checkedNode.id = "unblocked";
		}
	}
}
