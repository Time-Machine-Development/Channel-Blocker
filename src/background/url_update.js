/*url_update will add a tabId to YT_TAB_IDS if and only if the content controller makes a context
  request and the context of the url is a valid YTContext;
  it will remove a tabId from YT_TAB_IDS if and only if it is in YT_TAB_IDS and
  this tab changed url to a none-YTContext or this tab was closed;
  a context switch message will always be sent to the content_controller of the tab in which a context
  switch happend (even if the context remained the same)*/

const YT_TAB_IDS = new HashSet();

{
	const SENDER = "background_controller_url_update";

	const YTRegEx = new RegExp("^https://www\\.youtube\\.com(.)*$");

	const RegExToContextMapping = Object.freeze({
		"^https://www\\.youtube\\.com/watch\\?(.)*$": 						YTContext.VIDEO,
		"^https://www\\.youtube\\.com/results\\?search_query=(.)*$": 		YTContext.SEARCH,
		"^https://www\\.youtube\\.com/user/[^/]*(\\?(.)*|)$": 				YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/channel/[^/]*(\\?(.)*|)$": 			YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/user/[^/]+/featured(\\?(.)*|)$": 		YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/channel/[^/]+/featured(\\?(.)*|)$": 	YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/user/[^/]+/videos(\\?(.)*|)$": 		YTContext.CHANNEL_VIDEOS,
		"^https://www\\.youtube\\.com/channel/[^/]+/videos(\\?(.)*|)$": 	YTContext.CHANNEL_VIDEOS,
		"^https://www\\.youtube\\.com/feed/trending(\\?(.)*|)$": 			YTContext.TRENDING,
		"^https://www\\.youtube\\.com/(\\?(.)*|)$": 						YTContext.HOME
	});

	//returns the context of an url, if the url is a YT-url, otherwise returns undefined
	function urlToContext(url){
		for(let regEx of Object.keys(RegExToContextMapping)){
			if((new RegExp(regEx)).test(url)){
				return RegExToContextMapping[regEx];
			}
		}

		if(YTRegEx.test(url))
			return YTContext.OTHER;
	}

	//listen and respond to messages from content script controller
	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.sender === "content_controller"){
			if(msg.event.type === "context_request"){
				let context = urlToContext(sender.url);

				if(context !== undefined){
					//add tab id to YT_TAB_IDS with value context
					YT_TAB_IDS.add(sender.tab.id);
				}

				//send response (containing the context)
				return new Promise((resolve) => {
					resolve(context);
				});
			}
		}
	});

	//listen to removed tabs and try to delete them from YT_TAB_IDS
	browser.tabs.onRemoved.addListener((tabId) => {
		YT_TAB_IDS.remove(tabId);
	});

	//listen to url updates and send context switch message if url changed to a YTContext
	function onUpdateHandler(tabId, cInfo, tab){
		if(YT_TAB_IDS.contains(tabId) && cInfo.status === "complete"){
			let context = urlToContext(tab.url);

			if(context !== undefined){
				//send context switch message
				browser.tabs.sendMessage(tabId, {
					sender: SENDER,
					receiver: "content_controller",
					"event": {
						type: "context_switch",
						context: context
					}
				});
			}else{
				//remove tabId from YT_TAB_IDS
				YT_TAB_IDS.remove(tabId);
			}
		}
	}
	browser.tabs.onUpdated.addListener(onUpdateHandler);
}
