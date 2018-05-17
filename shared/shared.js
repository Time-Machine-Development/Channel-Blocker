const ContainerId = Object.freeze({
	BLOCKED_USERS: 0,
	TITLE_REGEXS: 1,
	NAME_REGEXS: 2,
	COMMENT_REGEXS: 3,
	EXCLUDED_USERS: 4
});

const YTContext = Object.freeze({
	HOME: 0,
	VIDEO: 1,
	SEARCH: 2,
	TRENDING: 3,
	CHANNEL_HOME: 4,
	CHANNEL_VIDEOS: 5,
	OTHER: 6
});

const RegExBlockType = Object.freeze({
	TITLE: 0,
	COMMENT: 1
});
