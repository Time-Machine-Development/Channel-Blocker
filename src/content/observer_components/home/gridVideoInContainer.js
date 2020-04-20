const GRIDVIDEO_IN_CONTAINER_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-shelf-renderer']"],
	characterDataSelectors: {
        videoTitle: ["yt-formatted-string#video-title[class='style-scope ytd-rich-grid-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onGridVideoInContainerObserved(item, characterDatas){
	let beforeBlockBtn = $(item).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(item, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}