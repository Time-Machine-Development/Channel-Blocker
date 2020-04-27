const SEARCH_MOVIE_CONFIG = Object.freeze({
	anchorSelector: ["ytd-movie-renderer[class='style-scope ytd-item-section-renderer']"],
	characterDataSelectors: {
        videoTitle: ["a#video-title[class='yt-simple-endpoint style-scope ytd-movie-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});
