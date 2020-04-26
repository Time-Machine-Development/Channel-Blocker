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

/* NOTE:
DO NOT USE/CHANGE THE VALUES IN RANGE [0, 7] IN Object.values(ContentUI) OR Object.values(ContentUI) ANYMORE,
INSTEAD USE VALUES >= 8 WHEN ADDING NEW ENTRIES TO ENUMS ContentUI AND SettingsUI.
THE INTERSECTION OF Object.values(ContentUI) AND Object.values(ContentUI) MUST BE EMPTY.

(This is due to the layout of STORAGE and backward compatibility of export-files from older versions.)
*/
const ContentUI = Object.freeze({
	BLOCK_BTN_VISIBILITY: 2,
	BLOCK_BTN_COLOR: 4,
	BLOCK_BTN_SIZE: 5,
	ANIMATION_SPEED: 6,
});

const SettingsUI = Object.freeze({
	PAGE_DESIGN: 0,
	ADVANCED_VIEW: 1,
	POPUP: 7
});

const DEFAULT_CONTENT_UI_CONFIG = Object.freeze({
	[ContentUI.BLOCK_BTN_VISIBILITY]: true,
	[ContentUI.BLOCK_BTN_COLOR]: "#717171",
	[ContentUI.BLOCK_BTN_SIZE]: 140,
	[ContentUI.ANIMATION_SPEED]: 200
});

const DEFAULT_SETTINGS_UI_CONFIG = Object.freeze({
	[SettingsUI.PAGE_DESIGN]: 0,
	[SettingsUI.ADVANCED_VIEW]: false,
	[SettingsUI.POPUP]: false
});
