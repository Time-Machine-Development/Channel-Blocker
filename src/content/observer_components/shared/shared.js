async function onVideoObserved(video, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);
	toggleVisibilty(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}

async function onVerticalVideoObserved(video, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);

	toggleVisibiltyHorizontal(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}

async function onHorizontalVideoObserved(video, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);

	toggleVisibiltyVertical(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
