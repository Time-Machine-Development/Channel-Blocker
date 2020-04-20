const GRIDVIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-grid-renderer']"],
	characterDataSelectors: {
        videoTitle: ["yt-formatted-string#video-title"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onGridVideoObserved(item, characterDatas){
	let beforeBlockBtn = $(item).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(item, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}