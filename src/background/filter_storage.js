{
	const SENDER = "background_filter_storage";

	let storageManager = new FilterStorageManager(STORAGE);
	storageManager.initSets();

	function createConfigFilterStorageModifiedMsg(filterType){
		return {
			sender: SENDER,
			receiver: "config_filter_user_interaction",
			info: "filter_storage_modified",
			content: {
				filter_type: filterType
			}
		};
	}

	function createContentFilterStorageModifiedMsg(){
		return {
			sender: SENDER,
			receiver: "content_controller",
			info: "filter_storage_modified"
		};
	}

	function onAddMsg(msgContent){
		let storageChanged;

		if(msgContent.filter_type === FilterType.BLOCKED_USERS || msgContent.filter_type === FilterType.EXCLUDED_USERS){
			/* msgContent is of the form:
			{
				info: "add",
				filter_type: (FilterType.BLOCKED_USERS | FilterType.EXCLUDED_USERS),
				user_channel_name: <user/channel>
			}
			*/
			storageChanged = storageManager.add(msgContent.filter_type, msgContent.user_channel_name, 53);
		}else{
			/* msgContent is of the form:
			{
				info: "add",
				filter_type: (FilterType.TITLE_REGEXS | FilterType.NAME_REGEXS | FilterType.COMMENT_REGEXS),
				reg_exp: <regular expression>,
				reg_exp_type: (RegExType.CASE_SENSITIVE | RegExType.CASE_INSENSITIVE)
			}
			*/
			storageChanged = storageManager.add(msgContent.filter_type, msgContent.reg_exp, msgContent.reg_exp_type);
		}

		//only continue if storage changed
		if(storageChanged){
			//sends "filter_storage_modified"-message to config-tab
			if(configTabId !== null)
				browser.tabs.sendMessage(configTabId, createConfigFilterStorageModifiedMsg(msgContent.filter_type));

			//sends "filter_storage_modified"-message to all known content_controller (e.g. all tabs in YT_TAB_IDS)
			for(let tabId of YT_TAB_IDS.keys()){
				browser.tabs.sendMessage(Number(tabId), createContentFilterStorageModifiedMsg());
			}
		}
	}

	function onDelMsg(msgContent){
		/* msgContent is of the form:
		{
			info: "delete",
			filter_type: (FilterType.BLOCKED_USERS | FilterType.EXCLUDED_USERS | FilterType.TITLE_REGEXS | FilterType.NAME_REGEXS | FilterType.COMMENT_REGEXS),
			filter_val: <user/channel/regular expression>
		}
		*/

		let storageChanged = storageManager.remove(msgContent.filter_type, msgContent.filter_val);

		//only continue if storage changed
		if(storageChanged){
			//sends "filter_storage_modified"-message to config-tab
			if(configTabId !== null)
				browser.tabs.sendMessage(configTabId, createConfigFilterStorageModifiedMsg(msgContent.filter_type));

			//sends "filter_storage_modified"-message to all known content_controller (e.g. all tabs in YT_TAB_IDS)
			for(let tabId of YT_TAB_IDS.keys()){
				browser.tabs.sendMessage(Number(tabId), createContentFilterStorageModifiedMsg());
			}
		}
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM content-, config- and popup-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "is_blocked_request"){
			/* msg.content is of the form:
			{
				user_channel_name: <User/Channel Name>,
				[additional: {
					type: <Type>,
					content: <Content>
				}]
			}
			where <Type> is ("comment"|"title").
			*/

			if(msg.sender === "content_is_blocked_lib"){
				//send repsond-Promise containing a message which is either true or false
				return new Promise((resolve) => {
					resolve(storageManager.isBlocked(msg.content));
				});
			}
		}

		if(msg.info === "add_blocked_user"){
			/* msg.content is of the form:
			{
				user_channel_name: <User/Channel Name>
			}
			*/

			if(msg.sender === "content_block_button_lib"){
				onAddMsg({
					info: "add",
					filter_type: FilterType.BLOCKED_USERS,
					user_channel_name: msg.content.user_channel_name
				});
			}
		}

		if(msg.info === "add"){
			/* msg.content is of the form:
			{
				filter_type: <Filter Type>,
				user_channel_name: <User/Channel Name>
			}
			where <Filter Type> is of Object.values(FilterType).

			or

			{
				filter_type: <Filter Type>,
				reg_exp: <Regular Expression>,
				reg_exp_type: <Regular Expression Type>
			}
			where <Filter Type> is of Object.values(FilterType),
			<Regular Expression> is of type String
			and <Regular Expression Type> is of Object.values(RegExType).
			*/

			if(msg.sender === "config_filter_user_interaction" || msg.sender === "config_savefile_import" || msg.sender === "popup_config_user_interaction"){
				onAddMsg(msg.content);
			}
		}

		if(msg.info === "delete"){
			/* msg.content is of the form:
			{
				filter_type: <Filter Type>,
				filter_val: <User/Channel Name or Regular Expression>
			}
			where <Filter Type> is of Object.values(FilterType)
			and <User/Channel Name or Regular Expression> is of type String.
			*/

			if(msg.sender === "config_filter_user_interaction" || msg.sender === "popup_config_user_interaction"){
				onDelMsg(msg.content);
			}
		}

		if(msg.info === "filter_values_request"){
			/* msg.content is of the form:
			{
				filter_type: <Filter Type>
			}
			where <Filter Type> is of Object.values(FilterType).
			*/

			if(msg.sender === "config_filter_user_interaction" || msg.sender === "popup_config_user_interaction"){
				/* return an object containing all user/channel-names or regular expressions as keys and their values,
				depending on the requested FilterType */
				return new Promise((resolve) => {
					resolve(Object.assign({}, storageManager.getHashSet(msg.content.filter_type)));
				});
			}
		}
	});
}
