const HORIZONTAL_GRIDVIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-grid-video-renderer[class='style-scope yt-horizontal-list-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-grid-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onHorizontalGridVideoObserved(horizontalGridVideo, characterDatas){
	let beforeBlockBtn = $(horizontalGridVideo).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(horizontalGridVideo, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}