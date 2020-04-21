const EXPANDED_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-video-renderer[class='style-scope ytd-expanded-shelf-contents-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onExpandedVideoObserved(expandedVideo, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName, undefined);

	toggleVisibilty(expandedVideo, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}