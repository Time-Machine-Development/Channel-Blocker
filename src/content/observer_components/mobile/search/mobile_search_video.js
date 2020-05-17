
const MOBILE_SEARCH_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytm-compact-video-renderer[class='item']"],
	characterDataSelectors: {
        videoTitle: ["h4[class='compact-media-item-headline']", "span"],
        userChannelName: ["div[class='compact-media-item-byline small-text']"]
	}
});

async function onMobileSearchVideoObserved(video, characterDatas){
	toggleVisibiltyHorizontal(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
