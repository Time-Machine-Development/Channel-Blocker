const VIDEOWALL_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["a[class='ytp-videowall-still ytp-suggestion-set']"],
	characterDataSelectors: {
		videoTitle: ["span.ytp-videowall-still-info-title"],
		userChannelName: ["span.ytp-videowall-still-info-author"]
	}
});

async function onVideowallVideoObserved(videowallVideo, characterDatas){
	if(characterDatas.userChannelName === ""){
		//this videowall-video is a Mix, therefore ignore it
		return;
	}

	//extract the user/channel-name by removing the Views-part from characterDatas.userChannelName
	const USER_CHANNEL_NAME_VIEW_SEPERATOR = "•";
	let userChannelNameArray = characterDatas.userChannelName.split(USER_CHANNEL_NAME_VIEW_SEPERATOR);
	userChannelNameArray.pop();

	let userChannelName = userChannelNameArray.join("").trim();

	fade(videowallVideo, await isVideoTitleBlocked(userChannelName, characterDatas.videoTitle));
}
