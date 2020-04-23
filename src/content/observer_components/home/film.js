const FILM_CONFIG = Object.freeze({
	anchorSelector: ["ytd-rich-item-renderer[class='style-scope ytd-rich-shelf-renderer']"],
	characterDataSelectors: {
        videoTitle: ["span#video-title[class='style-scope ytd-rich-movie-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onFilmObserved(film, characterDatas){
	insertBlockBtnAfter($(film).find("a[class='yt-simple-endpoint style-scope ytd-rich-movie-renderer']")[0], characterDatas.userChannelName);

	toggleVisibilty(film, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
