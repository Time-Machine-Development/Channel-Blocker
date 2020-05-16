
const CHANNEL_HOME_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-grid-video-renderer[class='style-scope yt-horizontal-list-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-grid-video-renderer']"]
	}
});

async function onChannelHomeVideoObserved(video, characterDatas){
	toggleVisibiltyHorizontal(video, await isVideoTitleBlocked(undefined, characterDatas.videoTitle));
}