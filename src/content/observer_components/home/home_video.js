const HOME_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-grid-renderer']"],
	characterDataSelectors: {
        videoTitle: ["yt-formatted-string#video-title"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

const HOME_VIDEO_CONFIG_V2 = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-grid-row']"],
	characterDataSelectors: {
        videoTitle: ["yt-formatted-string#video-title"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
