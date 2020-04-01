let configTabId = null;

{
	const SENDER = "background_browser_action";

	//creates a "createOpenOptionsMsg"-message for background_browser_action
	function createUsePopupRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			content: "use_popup_request"
		}
	}

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

	//remove or add tabId from configTabIds if the tab with id tabId has changed it's url from or to valid URL
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

	browser.runtime.onMessage.addListener((msg, sender) => {
		if (msg.receiver !== SENDER)
			return;

		if(msg.sender === "popup_config_user_interaction"){
			if(msg.content === "open_config"){
				/* msg.content is of the form:
				"open_config"
				*/

				openConfig();
			}
		}
	});
}
