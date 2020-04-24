const FILM_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-shelf-renderer']"],
	characterDataSelectors: {
        videoTitle: ["span#video-title[class='style-scope ytd-rich-movie-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
