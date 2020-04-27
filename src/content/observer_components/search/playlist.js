const PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: ["ytd-playlist-renderer[class='style-scope ytd-item-section-renderer']"],
	characterDataSelectors: {
        videoTitle: ["span#video-title[class='style-scope ytd-playlist-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onPlaylistObserved(playlist, characterDatas){
	insertBlockBtnBefore($(playlist).find("div#byline-container[class='style-scope ytd-video-meta-block']")[0], characterDatas.userChannelName);

	toggleVisibiltyHorizontal(playlist, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
