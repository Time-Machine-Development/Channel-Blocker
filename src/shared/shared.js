const STORAGE = browser.storage.local;

const FilterType = Object.freeze({
	BLOCKED_USERS: 0,
	TITLE_REGEXS: 1,
	NAME_REGEXS: 2,
	COMMENT_REGEXS: 3,
	EXCLUDED_USERS: 4
});

const RegExType = Object.freeze({
	CASE_INSENSITIVE: 0,
	CASE_SENSITIVE: 1
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

//NOTE: DO NOT USE THE VALUE '3' ANYMORE. It was formerly used for the block-main-video-on-video-page feature up to version 2.1.0.
const ConfigId = Object.freeze({
	CONFIG_PAGE_DESIGN: 0,
	CONFIG_ADVANCED_VIEW: 1,
	CONTENT_BLOCK_BTN_VISIBILITY: 2,
	CONTENT_BLOCK_BTN_COLOR: 4,
	CONTENT_BLOCK_BTN_SIZE: 5,
	CONTENT_ANIMATION_SPEED: 6,
	CONFIG_USE_POPUP: 7
});

const DEFAULT_CONFIG = Object.freeze({
	[ConfigId.CONFIG_PAGE_DESIGN]: 0,
	[ConfigId.CONFIG_ADVANCED_VIEW]: false,
	[ConfigId.CONTENT_BLOCK_BTN_VISIBILITY]: true,
	[ConfigId.CONTENT_BLOCK_BTN_COLOR]: "#717171",
	[ConfigId.CONTENT_BLOCK_BTN_SIZE]: 140,
	[ConfigId.CONTENT_ANIMATION_SPEED]: 200,
	[ConfigId.CONFIG_USE_POPUP]: false
});
