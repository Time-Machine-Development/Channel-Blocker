
const LIBRARY_PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: ["ytd-grid-playlist-renderer[class='style-scope ytd-grid-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-grid-playlist-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
