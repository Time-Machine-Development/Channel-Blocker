async function onVideoObserved(video, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);

	addContextmenuListener2(video, characterDatas.userChannelName);

	toggleVisibilty(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}