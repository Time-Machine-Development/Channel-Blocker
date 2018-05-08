let CONFIG_TAB_IDS = new HashSet();

{
	//open config page if browser action is pressed and save the tabId of the newly created tab (is used in storage)
	browser.browserAction.onClicked.addListener(() => {
		browser.tabs.create({
			active: true,
			url: "/config/config.html"
		})
		.then((tab) => {
			CONFIG_TAB_IDS.add(tab.id);
		});
	});

	//remove tabId from configTabIds
	browser.tabs.onRemoved.addListener((id, rm) => {
		CONFIG_TAB_IDS.remove(id);
	});

	//remove or add tabId from configTabIds if the tab with id tabId has changed it's url from or to valid URL
	browser.tabs.onUpdated.addListener((id, ci) => {
		if(ci.url){
			let configURL = browser.runtime.getURL("config/config.html");

			if(CONFIG_TAB_IDS.hasOwnProperty(id)){
				if(ci.url !== configURL)
					CONFIG_TAB_IDS.remove(id);
			}else{
				if(ci.url === configURL)
					CONFIG_TAB_IDS.add(id);
			}
		}
	});
}
