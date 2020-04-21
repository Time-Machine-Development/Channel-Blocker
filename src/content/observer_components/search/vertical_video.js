const VERTICAL_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-video-renderer[class='style-scope ytd-vertical-list-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
