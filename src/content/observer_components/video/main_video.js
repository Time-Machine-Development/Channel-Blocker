const MAIN_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["div#primary-inner"],
	characterDataSelectors: {
		userChannelName: [
			"div#top-row[class='style-scope ytd-video-secondary-info-renderer']",
			"a[class='yt-simple-endpoint style-scope yt-formatted-string']"
		]
	}
});

async function onMainVideoObserved(mainVideo, characterDatas, characterDataParents){
	insertBlockBtnBefore(characterDataParents.userChannelName, characterDatas.userChannelName);
}
