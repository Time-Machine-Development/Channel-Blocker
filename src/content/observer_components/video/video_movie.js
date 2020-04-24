const VIDEO_MOVIE_CONFIG = Object.freeze({
	anchorSelector: ["ytd-compact-movie-renderer[class='style-scope ytd-watch-next-secondary-results-renderer']"],
	characterDataSelectors: {
        videoTitle: ["h3#movie-title[class='style-scope ytd-compact-movie-renderer']"],
        userChannelName: ["div#container[class='style-scope ytd-channel-name']"]
	}
});
