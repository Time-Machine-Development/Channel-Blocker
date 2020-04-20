const GRIDVIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-grid-renderer']"],
	characterDataSelectors: {
        videoTitle: ["yt-formatted-string#video-title"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onGridVideoObserved(gridVideo, characterDatas){
	let beforeBlockBtn = $(gridVideo).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(gridVideo, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}