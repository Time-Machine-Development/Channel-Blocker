function createHomeObservers(){
	let obs = [];

	obs.push(new Observer(HOME_VIDEO_CONFIG, onHorizontalVideoObserved));
	obs.push(new Observer(POST_CONFIG, onPostObserved));
	obs.push(new Observer(VIDEO_IN_CONTAINER_CONFIG, onVideoObserved));
	obs.push(new Observer(HOME_MOVIE_CONFIG, onVideoObserved));

	return obs;
}

function createTrendingObservers(){
	let obs = [];

	obs.push(new Observer(EXPANDED_VIDEO_CONFIG, onVerticalVideoObserved));
	obs.push(new Observer(HORIZONTAL_VIDEO_CONFIG, onHorizontalVideoObserved));
	obs.push(new Observer(VIDEO_CONTAINER_CONFIG, onVideoContainerObserved));

	return obs;
}

function createSearchObservers(){
	let obs = [];

	obs.push(new Observer(SEARCH_VIDEO_CONFIG, onVerticalVideoObserved));
	obs.push(new Observer(VERTICAL_VIDEO_CONFIG, onVerticalVideoObserved));
	obs.push(new Observer(PLAYLIST_CONFIG, onPlaylistObserved));
	obs.push(new Observer(CHANNEL_CONFIG, onChannelObserved));
	obs.push(new Observer(SEARCH_MOVIE_CONFIG, onVideoObserved));

	return obs;
}

function createChannelHomeObservers(){
	let obs = [];

	console.log("createChannelHomeObservers");

	obs.push(new Observer(SHARED_HORIZONTAL_VIDEO_CONFIG, onVideoObserved));
	obs.push(new Observer(SHARED_HORIZONTAL_PLAYLIST_CONFIG, onVideoObserved));
	obs.push(new Observer(CHANNEL_HOME_VIDEO_CONFIG, onChannelHomeVideoObserved));

	return obs;
}

function createChannelVideosObservers(){
	let obs = [];

	obs.push(new Observer(CHANNEL_VIDEO_CONFIG, onChannelVideoObserved));

	return obs;
}

function createVideoObservers(){
	let obs = [];

	obs.push(new Observer(COMMENT_CONFIG, onCommentObserved));
	obs.push(new Observer(REPLY_COMMENT_CONFIG, onReplyCommentObserved));

	obs.push(new Observer(NEXT_AUTOPLAY_CONFIG, onNextObserved));
	obs.push(new Observer(NEXT_VIDEO_CONFIG, onNextObserved));
	obs.push(new Observer(NEXT_PLAYLIST_CONFIG, onNextObserved));

	obs.push(new Observer(VIDEOWALL_VIDEO_CONFIG, onVideowallVideoObserved));

	obs.push(new Observer(MAIN_VIDEO_CONFIG, onMainVideoObserved));

	obs.push(new Observer(VIDEO_MOVIE_CONFIG, onVideoObserved));

	return obs;
}

function createSubscriptionsObservers(){
	let obs = [];

	console.log("createSubscriptionsObserversr");

	obs.push(new Observer(SHARED_GRIDVIDEO_CONFIG, onVideoObserved));

	return obs;
}

function createGamingObservers(){
	let obs = [];

	console.log("createGamingObservers");

	obs.push(new Observer(SHARED_GRIDVIDEO_CONFIG, onVideoObserved));
	obs.push(new Observer(GAMING_VIDEO_CONFIG, onVideoObserved));

	return obs;
}

function createLibraryObservers(){
	let obs = [];

	console.log("createLibraryObservers");

	obs.push(new Observer(SHARED_GRIDVIDEO_CONFIG, onVideoObserved));
	obs.push(new Observer(LIBRARY_PLAYLIST_CONFIG, onVideoObserved));

	return obs;
}

function createHistoryObservers(){
	let obs = [];

	console.log("createHistoryObservers");

	obs.push(new Observer(HISTORY_VIDEO_CONFIG, onVideoObserved));

	return obs;
}

function createLearningObservers(){
	let obs = [];

	console.log("createLearningObservers");

	obs.push(new Observer(SHARED_HORIZONTAL_VIDEO_CONFIG, onVideoObserved));
	obs.push(new Observer(SHARED_HORIZONTAL_PLAYLIST_CONFIG, onVideoObserved));

	return obs;
}

function createMobileHomeObservers(){
	let obs = [];

	console.log("createMobileHomeObservers");

	obs.push(new Observer(SHARED_MOBILE_VIDEO_CONFIG, onSharedMobileVideoObserved));

	return obs;
}

function createMobileTrendingObservers(){
	let obs = [];

	console.log("createMobileTrendingObservers");

	obs.push(new Observer(SHARED_MOBILE_VIDEO_CONFIG, onSharedMobileVideoObserved));

	return obs;
}

function createMobileSearchObservers(){
	let obs = [];

	console.log("createMobileSearchObservers");

	obs.push(new Observer(MOBILE_SEARCH_VIDEO_CONFIG, onMobileSearchVideoObserved));
	obs.push(new Observer(MOBILE_SEARCH_CHANNEL_CONFIG, onMobileSearchChannelObserved));
	obs.push(new Observer(MOBILE_SEARCH_PLAYLIST_CONFIG, onMobileSearchPlaylistObserved));

	return obs;
}

function createMobileVideoObservers(){
	let obs = [];

	console.log("createMobileVideoObservers");

	obs.push(new Observer(MOBILE_SEARCH_VIDEO_CONFIG, onMobileSearchVideoObserved));
	obs.push(new Observer(MOBILE_SEARCH_CHANNEL_CONFIG, onMobileSearchChannelObserved));
	obs.push(new Observer(MOBILE_SEARCH_PLAYLIST_CONFIG, onMobileSearchPlaylistObserved));
	obs.push(new Observer(MOBILE_COMMENT_CONFIG, onMobileCommentObserved));
	obs.push(new Observer(RESPONSE_CONFIG, onResponseObserved));

	return obs;
}