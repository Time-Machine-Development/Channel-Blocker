let configTabId = null;

{
	const SENDER = "background_browser_action";

	//if an open config page exists makes config tab active, otherwise creates new config tab and make it active
	async function openConfig(){
		if(configTabId === null){
			let tab = await browser.tabs.create({
				active: true,
				url: "/ui/config/html/config.html"
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
	}

	//open config page as default behavior of clicking the browserAction-button
	browser.browserAction.onClicked.addListener(openConfig);

	//if config tab was closed set configTabId to null
	browser.tabs.onRemoved.addListener((tabId) => {
		if(tabId === configTabId)
			configTabId = null;
	});

	//remove or add tabId from configTabIds if the tab with id tabId has changed its url from or to valid URL
	browser.tabs.onUpdated.addListener((tabId, ci) => {
		if(ci.url){
			let configURL = browser.runtime.getURL("/ui/config/html/config.html");

			if(tabId === configTabId){
				if(ci.url !== configURL)
					configTabId = null;
			}else{
				if(ci.url === configURL)
					configTabId = tabId;
			}
		}
	});


	/*
	INSTALLING LISTENER FOR MESSAGES FROM popup-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "open_config"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "popup_config_user_interaction"){
				openConfig();
			}
		}
	});
}
