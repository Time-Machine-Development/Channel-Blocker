const ContainerId = {
	BLOCKED_USERS: 0,
	TITLE_REGEXS: 1,
	NAME_REGEXS: 2,
	COMMENT_REGEXS: 3,
	EXCLUDED_USERS: 4
};

const YTContext = {
	HOME: 0,
	VIDEO: 1,
	SEARCH: 2,
	CHANNEL: 3
};

const RegExBlockType = {
	TITLE: 0,
	NAME: 1,
	COMMENT: 2
};

Object.freeze(ContainerId);
Object.freeze(YTContext);
Object.freeze(RegExBlockType);
