
const MOBILE_SEARCH_PLAYLIST_CONFIG = Object.freeze({
	anchorSelector: ["ytm-compact-playlist-renderer[class='item']"],
	characterDataSelectors: {
        videoTitle: ["h4[class='compact-media-item-headline']"],
        userChannelName: ["div[class='compact-media-item-byline small-text']"]
	}
});

async function onMobileSearchPlaylistObserved(video, characterDatas){
    console.log("onMobileSearchPlaylistObserved", characterDatas.userChannelName, characterDatas.videoTitle);
	toggleVisibiltyHorizontal(video, await isVideoTitleBlocked(characterDatas.userChannelName, characterDatas.videoTitle));
}
