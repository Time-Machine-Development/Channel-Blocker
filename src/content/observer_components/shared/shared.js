async function onVideoObserved(video, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);

	addContextmenuListener(video, characterDatas.userChannelName);

	toggleVisibilty(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}