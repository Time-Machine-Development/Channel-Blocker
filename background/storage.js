let storageManager;

{
	const SENDER = "background_controller_storage"
	const STORAGE = browser.storage.local;

	storageManager = new StorageManager(STORAGE);
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

	function onAddMsg(msg){
		//only continue if changes have been done
		if(!storageManager.add(msg.event.origin, msg.event.input))
			return;

		//send add message to config_content_updater on all config tabs
		for(let tabId of CONFIG_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterMsg("add", msg.event.origin, [msg.event.input]));
		}


		//TODO: send message to content controller to update
	}

	function onDelMsg(msg){
		let changed = false;
		for(let item of input){
			changed = changed || storageManager.remove(msg.event.origin, msg.event.input);
		}

		//only continue if changes have been done
		if(!changed)
			return;

		//send delete message to config_content_updater on all config tabs
		for(let tabId of CONFIG_TAB_IDS.keys()){
			browser.tabs.sendMessage(Number(tabId), createContentUpdaterMsg("delete", msg.event.origin, msg.event.input));
		}

		//(maybe)TODO: send message to content controller to update
	}

	//install listener for "add"- and "delete"-messages from content scripts and config scripts
	browser.runtime.onMessage.addListener((msg) => {
		if(msg.receiver === SENDER){
			if(msg.sender === "config_event_dispatcher"){
				if(msg.event.type === "add")
					onAddMsg(msg);
				else if(msg.event.type === "delete")
					onDelMsg(msg);
			}else if(msg.sender === "config_content_updater"){
				if(msg.event.type === "content_update_request"){
					for(let id of CONTAINER_IDS){
						for(let tabId of CONFIG_TAB_IDS.keys())
							browser.tabs.sendMessage(Number(tabId), createContentUpdaterMsg("add", id, storageManager.getHashSet(id).keys()));
					}
				}
			}else if(msg.sender === "TODO_name_of_content_script_blocked_btn_event_dispatcher"){
				if(msg.event.type === "add")
					onAddMsg(msg);
			}
		}
	});
}
