const VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-video-renderer[class='style-scope ytd-item-section-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onVideoObserved(video, characterDatas){
	let beforeBlockBtn = $(video).find("a[class='yt-simple-endpoint style-scope yt-formatted-string']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName, undefined);

	toggleVisibilty(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}