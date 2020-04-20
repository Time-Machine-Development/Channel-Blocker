function createHomeObservers(){
	let obs = [];

	obs.push(new Observer(GRIDVIDEO_CONFIG, onGridVideoObserved));
	obs.push(new Observer(POST_CONFIG, onPostObserved));
	obs.push(new Observer(GRIDVIDEO_IN_CONTAINER_CONFIG, onGridVideoInContainerObserved));

	return obs;
}

function createTrendingObservers(){
	let obs = [];

	obs.push(new Observer(EXPANDEDVIDEO_CONFIG, onExpandedVideoObserved));
	obs.push(new Observer(HORIZONTAL_GRIDVIDEO_CONFIG, onHorizontalGridVideoObserved));

	return obs;
}

function createRecommendedObservers(){
	let obs = [];

	return obs;
}

function createSearchObservers(){
	let obs = [];
	
	obs.push(new Observer(VIDEO_CONFIG, onVideoObserved));
	obs.push(new Observer(PLAYLIST_CONFIG, onPlaylistObserved));
	obs.push(new Observer(CHANNEL_CONFIG, onChannelObserved));

	return obs;
}

function createChannelHomeObservers(){
	let obs = [];

	return obs;
}

function createChannelVideosObservers(){
	let obs = [];

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

	return obs;
}
