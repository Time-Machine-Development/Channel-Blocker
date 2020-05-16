
const SUBSCRIPTIONS_VIDEO_CONFIG = Object.freeze({
	anchorSelector: ["ytd-grid-video-renderer[class='style-scope ytd-grid-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-grid-video-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
