const PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: ["ytd-playlist-renderer[class='style-scope ytd-item-section-renderer']"],
	characterDataSelectors: {
        videoTitle: ["span#video-title[class='style-scope ytd-playlist-renderer']"],
        userChannelName: ["a[class='yt-simple-endpoint style-scope yt-formatted-string']"]
	}
});

async function onPlaylistObserved(playlist, characterDatas){
	let beforeBlockBtn = $(playlist).find("a[class='yt-simple-endpoint style-scope ytd-playlist-renderer']")[0];

	insertBlockBtnBefore(beforeBlockBtn, characterDatas.userChannelName);

	toggleVisibiltyHorizontal(playlist, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
