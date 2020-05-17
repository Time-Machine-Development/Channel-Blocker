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
	SUBSCRIPTIONS: 6,
	HISTORY: 7,
	LIBRARY: 8,
	GAMING: 9,
	STOREFRONT: 10,
	LEARNING: 11,
	MOBILE_HOME: 12,
	MOBILE_VIDEO: 13,
	MOBILE_SEARCH: 14,
	MOBILE_TRENDING: 15,
	MOBILE_CHANNEL_HOME: 16,
	MOBILE_CHANNEL_VIDEOS: 17,
	MOBILE_SUBSCRIPTIONS: 18,
	MOBILE_HISTORY: 19,
	MOBILE_LIBRARY: 20,
	MOBILE_GAMING: 21,
	MOBILE_STOREFRONT: 22,
	MOBILE_LEARNING: 23,
	OTHER: 24
});


const CONTENT_UI_STORAGE_ID = "content_ui";

const ContentUI = Object.freeze({
	BLOCK_BTN_VISIBILITY: 0,
	BLOCK_BTN_COLOR: 1,
	BLOCK_BTN_SIZE: 2,
	ANIMATION_SPEED: 3,
	FILTERED_PAGES: 4
});

const DEFAULT_CONTENT_UI_CONFIG = Object.freeze({
	[ContentUI.BLOCK_BTN_VISIBILITY]: true,
	[ContentUI.BLOCK_BTN_COLOR]: "#717171",
	[ContentUI.BLOCK_BTN_SIZE]: 140,
	[ContentUI.ANIMATION_SPEED]: 200,
	[ContentUI.FILTERED_PAGES]: [YTContext.HOME, YTContext.VIDEO, YTContext.SEARCH, YTContext.TRENDING, YTContext.HISTORY, YTContext.GAMING, YTContext.LEARNING, YTContext.MOBILE_HOME,
		 YTContext.MOBILE_VIDEO, YTContext.MOBILE_SEARCH, YTContext.MOBILE_TRENDING]
});

const UNSUPPORTED_YTCONTEXTS = [YTContext.STOREFRONT, YTContext.MOBILE_SUBSCRIPTIONS, YTContext.MOBILE_CHANNEL_HOME, YTContext.MOBILE_CHANNEL_VIDEOS, YTContext.MOBILE_STOREFRONT, 
	YTContext.MOBILE_HISTORY, YTContext.MOBILE_LIBRARY, YTContext.MOBILE_GAMING, YTContext.MOBILE_LEARNING, YTContext.OTHER];

const SETTINGS_UI_STORAGE_ID = "settings_ui";

const SettingsUI = Object.freeze({
	PAGE_DESIGN: 0,
	ADVANCED_VIEW: 1,
	POPUP: 2
});

const DEFAULT_SETTINGS_UI_CONFIG = Object.freeze({
	[SettingsUI.PAGE_DESIGN]: 0,
	[SettingsUI.ADVANCED_VIEW]: false,
	[SettingsUI.POPUP]: false
});

/* NOTE:
ONLY USE FOR IMPLEMENTATION OF BACKWARD-COMPATIBILITY E.G. IMPORT OF OLD SAVE-FILES.
*/

const DeprecatedConfig = Object.freeze({
	PAGE_DESIGN: 0,
	ADVANCED_VIEW: 1,
	BLOCK_BTN_VISIBILITY: 2,
	BLOCK_BTN_COLOR: 4,
	BLOCK_BTN_SIZE: 5,
	ANIMATION_SPEED: 6,
	POPUP: 7
});

/* Maps the DeprecatedConfigID to the
storageID of the storage which now manages the configuration for DeprecatedConfigID
and to the ID in storageID which supersedes DeprecatedConfigID.
*/
const DeprecatedConfigToConfigMapping = Object.freeze({
	[DeprecatedConfig.PAGE_DESIGN]: 			{storageID: SETTINGS_UI_STORAGE_ID, ID: SettingsUI.PAGE_DESIGN},
	[DeprecatedConfig.ADVANCED_VIEW]: 			{storageID: SETTINGS_UI_STORAGE_ID, ID: SettingsUI.ADVANCED_VIEW},
	[DeprecatedConfig.BLOCK_BTN_VISIBILITY]:	{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.BLOCK_BTN_VISIBILITY},
	[DeprecatedConfig.BLOCK_BTN_COLOR]:			{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.BLOCK_BTN_COLOR},
	[DeprecatedConfig.BLOCK_BTN_SIZE]: 			{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.BLOCK_BTN_SIZE},
	[DeprecatedConfig.ANIMATION_SPEED]: 		{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.ANIMATION_SPEED},
	[DeprecatedConfig.POPUP]: 					{storageID: SETTINGS_UI_STORAGE_ID, ID: SettingsUI.POPUP}
});
