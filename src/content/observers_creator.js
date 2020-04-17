function createHomeObservers(){
	let obs = [];

	return obs;
}

function createTrendingObservers(){
	let obs = [];

	return obs;
}

function createRecommendedObservers(){
	let obs = [];

	return obs;
}

function createSearchObservers(){
	let obs = [];

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
