const NEXT_CHARACTER_DATA_SELECTORS = Object.freeze({
	videoTitle: ["span#video-title"],
	userChannelName: ["yt-formatted-string#text"]
});

const NEXT_AUTOPLAY_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-autoplay-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

const NEXT_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-video-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

const NEXT_PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-playlist-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: NEXT_CHARACTER_DATA_SELECTORS
});

async function onNextObserved(next, characterDatas, characterDataParents, config){
	let beforeBlockBtn;
	if(config === NEXT_AUTOPLAY_CONFIG || config === NEXT_VIDEO_CONFIG){
		beforeBlockBtn = $(next).find("a[class='yt-simple-endpoint style-scope ytd-compact-video-renderer']")[0];
	}else if(config === NEXT_PLAYLIST_CONFIG){
		beforeBlockBtn = $(next).find("a[class='yt-simple-endpoint style-scope ytd-compact-playlist-renderer']")[0];
	}

	insertBlockBtnAfter(beforeBlockBtn, characterDatas.userChannelName, {
		position: "absolute",
		top: "50%",
		right: "0%"
	});

	toggleVisibilty(next, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
