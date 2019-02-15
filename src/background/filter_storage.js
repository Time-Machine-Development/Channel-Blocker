{
	const SENDER = "background_filter_storage";
	const STORAGE = browser.storage.local;

	let storageManager = new FilterStorageManager(STORAGE);
	storageManager.initSets();

	function createContentUpdaterMsg(type, target, items){
		return {
			sender: SENDER,
			receiver: "config_content_updater",
			"event": {
				type: type,
				target: target,
				items: items
			}
		};
	}

	function createContentUpdaterAlertMsg(){
		return {
			sender: SENDER,
			receiver: "content_controller",
			content: "filter_storage_modified"
		};
	}

	function onAddMsg(msg){
		//only continue if changes have been done
		if(!storageManager.add(msg.event.origin, msg.event.input))
			return;

		//send add message to config_content_updater on config tab (if it exists)
		if(configTabId !== null)
			browser.tabs.sendMessage(configTabId, createContentUpdaterMsg("add", msg.event.origin, [msg.event.input]));

		//send alert message to content controller to update
		for(let tabId of YT_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterAlertMsg());
		}
	}

	function onDelMsg(msg){
		let changed = false;
		for(let item of msg.event.input){
			changed = storageManager.remove(msg.event.origin, item) || changed;
		}

		//only continue if changes have been done
		if(!changed)
			return;

		//send delete message to config_content_updater on config tab (if it exists)
		if(configTabId !== null)
			browser.tabs.sendMessage(configTabId, createContentUpdaterMsg("delete", msg.event.origin, msg.event.input));

		//send alert message to content controller to update
		for(let tabId of YT_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterAlertMsg());
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
				content: <user/channel>
			}
			*/

			if(msg.content.info === "add_blocked_user")
				onAddMsg({
					info: "add",
					filter_type: FilterType.BLOCKED_USERS,
					content: msg.content.content
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

		//react to add, delete or export messages from config_event_dispatcher
		if(msg.sender === "config_event_dispatcher"){
			if(msg.event.type === "add"){
				onAddMsg(msg);
			}else if(msg.event.type === "delete"){
				onDelMsg(msg);
			}

			return;
		}

		//react to add or delete messages from config_user_interaction
		if(msg.sender === "config_user_interaction"){
			if(msg.event.type === "add")
				onAddMsg(msg);
			else if(msg.event.type === "delete")
				onDelMsg(msg);

			return;
		}

		//react on initial content_update_request of a newly created config tab
		if(msg.sender === "config_content_updater"){
			if(msg.event.type === "content_update_request"){
				for(let bt of Object.values(FilterType))
					browser.tabs.sendMessage(Number(sender.tab.id), createContentUpdaterMsg("add", bt, storageManager.getHashSet(cId).keys()));
			}

			return;
		}

	});
}
