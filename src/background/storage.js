{
	const SENDER = "background_controller_storage";
	const STORAGE = browser.storage.local;

	let storageManager = new StorageManager(STORAGE);
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
			"event": {
				type: "storage_modified"
			}
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

	//install listener for storage related messages from content scripts and config scripts
	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		//react to add or delete messages from config_event_dispatcher
		if(msg.sender === "config_event_dispatcher"){
			if(msg.event.type === "add")
				onAddMsg(msg);
			else if(msg.event.type === "delete")
				onDelMsg(msg);

			return;
		}

		//react on initial content_update_request of a newly created config tab
		if(msg.sender === "config_content_updater"){
			if(msg.event.type === "content_update_request"){
				for(let cId of Object.values(ContainerId))
					browser.tabs.sendMessage(Number(sender.tab.id), createContentUpdaterMsg("add", cId, storageManager.getHashSet(cId).keys()));
			}

			return;
		}

		//react on add messages from content_event_dispatcher
		if(msg.sender === "content_event_dispatcher"){
			if(msg.event.type === "add")
				onAddMsg(msg);

			return;
		}

		//react on check_content messages from content_checker_module
		if(msg.sender === "content_checker_module"){
			if(msg.event.type === "check_content"){
				//send repsond-Promise containing a message which is either true or false
				return new Promise((resolve) => {
						resolve(storageManager.isBlocked(msg.event.input));
				});
			}

			return;
		}
	});
}
