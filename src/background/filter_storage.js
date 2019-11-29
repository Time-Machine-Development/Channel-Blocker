{
	const SENDER = "background_filter_storage";

	let storageManager = new FilterStorageManager(STORAGE);
	storageManager.initSets();

	//creates "filter_storage_modified"-message for config_filter_user_interaction
	function createConfigFilterStorageModifiedMsg(filterType){
		return {
			sender: SENDER,
			receiver: "config_filter_user_interaction",
			content: {
				info: "filter_storage_modified",
				filter_type: filterType
			}
		};
	}

	//creates "filter_storage_modified"-message for content_controller
	function createContentFilterStorageModifiedMsg(){
		return {
			sender: SENDER,
			receiver: "content_controller",
			content: "filter_storage_modified"
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
	INSTALLING LISTENER FOR MESSAGES FROM content-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.sender === "content_checker_module"){
			/* msg.content is of the form:
			{
				info: "is_blocked_request",
				user_channel_name: <user/channel>,
				[additional: {
					type: <t>,
					content: <content>
				}]
			 }
			where <t> is ("comment"|"title")
			*/

			if(msg.content.info === "is_blocked_request"){
				//send repsond-Promise containing a message which is either true or false
				return new Promise((resolve) => {
					resolve(storageManager.isBlocked(msg.content));
				});
			}

			return;
		}

		if(msg.sender === "content_event_dispatcher"){
			/* msg.content is of the form:
			{
				info: "add_blocked_user",
				user_channel_name: <user/channel>
			}
			*/

			if(msg.content.info === "add_blocked_user")
				onAddMsg({
					info: "add",
					filter_type: FilterType.BLOCKED_USERS,
					user_channel_name: msg.content.user_channel_name
				});

			return;
		}
	});

	/*
	INSTALLING LISTENER FOR MESSAGES FROM config-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.sender === "popup_config_user_interaction"){
			if(msg.content.info === "add"){
				onAddMsg(msg.content);
			}else if(msg.content.info === "delete"){
				onDelMsg(msg.content);
			}
			return new Promise((resolve) => {
				resolve(Object.assign({}, storageManager.getHashSet(msg.content.filter_type)));
			});
		}

		if(msg.sender === "config_filter_user_interaction" || msg.sender === "config_import_savefile"){
			//react to "add"-message from config_filter_user_interaction
			if(msg.content.info === "add"){
				onAddMsg(msg.content);

			//react to "delete"-message from config_filter_user_interaction
			}else if(msg.content.info === "delete"){
				onDelMsg(msg.content);

			//react to "filter_values_request"-message from config_filter_user_interaction
			}else if(msg.content.info === "filter_values_request"){
				/* msg.content is of the form:
     			{
     				info: "filter_values_request",
     				filter_type: <ft>
     			}
                    where <ft> is a value of FilterType
                    */

				/* return an object containing all user/channel-names or regular expressions as keys and their values,
				depending on the requested FilterType */
				return new Promise((resolve) => {
					resolve(Object.assign({}, storageManager.getHashSet(msg.content.filter_type)));
				});
			}
		}
	});
}
