{
	const SENDER = "background_controller_storage";
	const STORAGE = browser.storage.local;

	let storageManager = new StorageManager(STORAGE);
	storageManager.initSets();

	function createContentUpdaterMsg(type, target, items){
		let set = storageManager.getHashSet(target);

		let msgItems = [];
		for(let item of items){
			msgItems.push({
				id: item,
				additional: set[item]
			});
		}

		return {
			sender: SENDER,
			receiver: "config_content_updater",
			"event": {
				type: type,
				target: target,
				items: msgItems
			}
		};
	}

	function createContentUpdaterAlertMsg(){
		return {
			sender: SENDER,
			receiver: "content_controller",
			"event": {
				type: "storage_grew"
			}
		};
	}

	function onAddMsg(msg){
		//only continue if changes have been done
		if(!storageManager.add(msg.event.origin, msg.event.input))
			return;

		//send add message to config_content_updater on all config tabs
		for(let tabId of CONFIG_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterMsg("add", msg.event.origin, [msg.event.input]));
		}

		//send alert message to content controller to update
		for(let tabId of YT_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterAlertMsg());
		}
	}

	function onDelMsg(msg){
		let changed = false;
		for(let item of msg.event.input){
			changed = changed || storageManager.remove(msg.event.origin, item);
		}

		//only continue if changes have been done
		if(!changed)
			return;

		//send delete message to config_content_updater on all config tabs
		for(let tabId of CONFIG_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterMsg("delete", msg.event.origin, msg.event.input));
		}
	}

	//install listener for storage related messages from content scripts and config scripts
	browser.runtime.onMessage.addListener((msg) => {
		if(msg.receiver === SENDER){
			if(msg.sender === "config_event_dispatcher"){
				if(msg.event.type === "add")
					onAddMsg(msg);
				else if(msg.event.type === "delete")
					onDelMsg(msg);
			}else if(msg.sender === "config_content_updater"){
				if(msg.event.type === "content_update_request"){
					for(let cId of Object.values(ContainerId)){
						for(let tabId of CONFIG_TAB_IDS.keys())
							browser.tabs.sendMessage(Number(tabId), createContentUpdaterMsg("add", cId, storageManager.getHashSet(cId).keys()));
					}
				}
			}else if(msg.sender === "content_event_dispatcher"){
				if(msg.event.type === "add")
					onAddMsg(msg);
			}else if(msg.sender === "content_checker_module"){
				if(msg.event.type === "check_content"){
					//send repsond-Promise containing a message which is either true or false
					return new Promise((resolve) => {
							resolve(storageManager.isBlocked(msg.event.input));
					});
				}
			}
		}
	});
}
