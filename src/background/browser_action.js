let configTabId = null;

{
	//if an open config page exists make config tab active, otherwise create new config tab and make it active
	browser.browserAction.onClicked.addListener(async function(){
		if(configTabId === null){
			let tab = await browser.tabs.create({
				active: true,
				url: "/config/config.html"
			});

			configTabId = tab.id;
		}else{
			let tab = await browser.tabs.update(
				configTabId,
				{
					active: true
				}
			);

			await browser.windows.update(
				tab.windowId,
				{
					focused: true
				}
			);
		}
	});

	//if config tab was closed set configTabId to null
	browser.tabs.onRemoved.addListener((tabId) => {
		if(tabId === configTabId)
			configTabId = null;
	});

	//remove or add tabId from configTabIds if the tab with id tabId has changed it's url from or to valid URL
	browser.tabs.onUpdated.addListener((tabId, ci) => {
		if(ci.url){
			let configURL = browser.runtime.getURL("config/config.html");

			if(tabId === configTabId){
				if(ci.url !== configURL)
					configTabId = null;
			}else{
				if(ci.url === configURL)
					configTabId = tabId;
			}
		}
	});
}
