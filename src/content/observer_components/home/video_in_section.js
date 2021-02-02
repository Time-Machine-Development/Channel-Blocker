const VIDEO_IN_SECTION_CONFIG = Object.freeze({
    anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-shelf-renderer']"],
	characterDataSelectors: {
        videoTitle: ["yt-formatted-string#video-title[class='style-scope ytd-rich-grid-media']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
