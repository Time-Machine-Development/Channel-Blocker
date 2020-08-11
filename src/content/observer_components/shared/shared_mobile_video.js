
const SHARED_MOBILE_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytm-item-section-renderer"],
	characterDataSelectors: {
        videoTitle: ["h3", "span"],
        userChannelName: ["span[class='ytm-badge-and-byline-item-byline small-text']"]
	}
});

async function onSharedMobileVideoObserved(video, characterDatas){
	toggleVisibiltyHorizontal(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
