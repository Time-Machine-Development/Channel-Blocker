const VERTICAL_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-video-renderer[class='style-scope ytd-vertical-list-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onVerticalVideoObserved(verticalVideo, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName, undefined);

	toggleVisibilty(verticalVideo, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}