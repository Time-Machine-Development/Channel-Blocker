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

/*sends an "is_blocked_request"-message to background_filter_storage and processes the result by making checkedNode visible/invisible
depending on the result of the request*/
async function sendAndProcessIsBlockedRequestMsg(msg, checkedNode, isVideo = false) {
	if(isBlocked){
		if(!blockVideosOnVideopage && isVideo){
			return;
		}
		//hide checkedNode
		checkedNode.id = "blocked";
		$(checkedNode).hide(animationSpeed);
		if(isVideo){
			for(let ch of checkedNode.parentNode.children){
				if(ch.id === "videoIsBlockedDiv"){
					return;
				}
			}
			checkedNode.getElementsByClassName("video-stream html5-main-video")[0].volume = 0;
			checkedNode.getElementsByClassName("video-stream html5-main-video")[0].pause();
			let div = document.createElement("div");

			let img = document.createElement("img");
			img.src = browser.runtime.getURL("content/img/blockedVideo.svg");
			img.alt = "This video is block by 'channel blocker'!";
			//img.width = "80%";
			img.setAttribute("width", "100%");
			let h1 = document.createElement("h1");
			let textNode = document.createTextNode("This video is block by 'channel blocker'!");

			div.setAttribute("id", "videoIsBlockedDiv");
			div.setAttribute("style", "color: red;");

			h1.appendChild(textNode);
			div.appendChild(img);

			checkedNode.parentNode.insertBefore(div, checkedNode);
		}
	}else{
		if(checkedNode.id === "blocked"){
			//show checkedNode
			$(checkedNode).show(animationSpeed);
			checkedNode.id = "unblocked";
		}
		if(isVideo){
			for(let ch of checkedNode.parentNode.children){
				if(ch.id === "videoIsBlockedDiv"){
					ch.remove();
				}
			}
		}
	}
}
