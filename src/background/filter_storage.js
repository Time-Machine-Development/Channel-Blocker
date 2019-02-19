{
	const SENDER = "background_filter_storage";
	const STORAGE = browser.storage.local;

	let storageManager = new FilterStorageManager(STORAGE);
	storageManager.initSets();

	//TODO: feature/config_rework
	//creates "???"-message for ???
	//
	// function createContentUpdaterMsg(type, target, items){
	// 	return {
	// 		sender: SENDER,
	// 		receiver: "config_content_updater",
	// 		"event": {
	// 			type: type,
	// 			target: target,
	// 			items: items
	// 		}
	// 	};
	// 	return;
	// }

	//creates "filter_storage_modified"-message for content_controller
	function createFilterStorageModifiedMsg(){
		return {
			sender: SENDER,
			receiver: "content_controller",
			content: "filter_storage_modified"
		};
	}

	function onAddMsg(msgContent){
		let storageChanged;

		if(msgContent.filter_type === FilterType.BLOCKED_USERS || msgContent.filterType === FilterType.EXCLUDED_USERS){
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

			storageChanged = storageManager.add(msgContent.filterType, msgContent.reg_exp, reg_exp_type);
		}

		//only continue if storage changed
		if(storageChanged){
			//TODO: following code will be reworked in feature/config_rework (greatly depends on config.html), maybe redundant to onDelMsg
			//
			//send add message to config_content_updater on config tab (if it exists)
			// if(configTabId !== null)
			// 	browser.tabs.sendMessage(configTabId, createContentUpdaterMsg("add", msg.event.origin, [msg.event.input]));

			//sends "filter_storage_modified"-message to all known content_controller (e.g. all tabs in YT_TAB_IDS)
			for(let tabId of YT_TAB_IDS.keys()){
				browser.tabs.sendMessage(Number(tabId), createFilterStorageModifiedMsg());
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

		let storageChanged = storageManager.remove(msgContent.filterType, filter_val);

		//only continue if storage changed
		if(storageChanged){
			//TODO: following code will be reworked in feature/config_rework (greatly depends on config.html), maybe redundant to onAddMsg
			//
			//send add message to config_content_updater on config tab (if it exists)
			// if(configTabId !== null)
			// 	browser.tabs.sendMessage(configTabId, createContentUpdaterMsg("add", msg.event.origin, [msg.event.input]));

			//sends "filter_storage_modified"-message to all known content_controller (e.g. all tabs in YT_TAB_IDS)
			for(let tabId of YT_TAB_IDS.keys()){
				browser.tabs.sendMessage(Number(tabId), createFilterStorageModifiedMsg());
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
					user_channel_name: msg.content.content
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

		//react to "add"/"delete"-message from config_event_dispatcher
		if(msg.sender === "config_event_dispatcher"){
			if(msg.content.info === "add"){
				onAddMsg(msg.content);
			}else if(msg.content.info === "delete"){
				onDelMsg(msg.content);
			}

			return;
		}

		//TODO: following code will be reworked in feature/config_rework (greatly depends on config.html)
		//
		// //react to add or delete messages from config_user_interaction
		// if(msg.sender === "config_user_interaction"){
		// 	if(msg.event.type === "add")
		// 		onAddMsg(msg);
		// 	else if(msg.event.type === "delete")
		// 		onDelMsg(msg);
		//
		// 	return;
		// }

		// //react on initial content_update_request of a newly created config tab
		// if(msg.sender === "config_content_updater"){
		// 	if(msg.event.type === "content_update_request"){
		// 		for(let bt of Object.values(FilterType))
		// 			browser.tabs.sendMessage(Number(sender.tab.id), createContentUpdaterMsg("add", bt, storageManager.getHashSet(cId).keys()));
		// 	}
		//
		// 	return;
		// }
	});
}
