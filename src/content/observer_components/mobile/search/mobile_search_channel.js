
const MOBILE_SEARCH_CHANNEL_CONFIG = Object.freeze({
	anchorSelector: ["ytm-compact-channel-renderer[class='item']"],
	characterDataSelectors: {
        userChannelName: ["h4[class='compact-media-item-headline']"]
	}
});

async function onMobileSearchChannelObserved(video, characterDatas){
	toggleVisibiltyHorizontal(video, await isUserChannelNameBlocked(characterDatas.userChannelName));
}
