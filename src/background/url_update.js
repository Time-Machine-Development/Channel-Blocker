/*url_update will add a tabId to YT_TAB_IDS if and only if the content controller makes a context
  request and the context of the url is a valid YTContext;
  it will remove a tabId from YT_TAB_IDS if and only if it is in YT_TAB_IDS and
  this tab changed url to a none-YTContext or this tab was closed;
  a context switch message will always be sent to the content_controller of the tab in which a context
  switch happend (even if the context remained the same)*/

const YT_TAB_IDS = new HashSet();

{
	const SENDER = "background_url_update";

	const YTRegEx = new RegExp("^https://www\\.youtube\\.com(.)*$");

	const RegExToContextMapping = Object.freeze({
		"^https://www\\.youtube\\.com/watch\\?(.)*$": 								YTContext.VIDEO,
		"^https://www\\.youtube\\.com/results\\?search_query=(.)*$": 			YTContext.SEARCH,
		"^https://www\\.youtube\\.com/user/[^/]*(\\?(.)*|)$": 					YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/channel/[^/]*(\\?(.)*|)$": 				YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/user/[^/]+/featured(\\?(.)*|)$": 		YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/channel/[^/]+/featured(\\?(.)*|)$": 	YTContext.CHANNEL_HOME,
		"^https://www\\.youtube\\.com/user/[^/]+/videos(\\?(.)*|)$": 			YTContext.CHANNEL_VIDEOS,
		"^https://www\\.youtube\\.com/channel/[^/]+/videos(\\?(.)*|)$": 		YTContext.CHANNEL_VIDEOS,
		"^https://www\\.youtube\\.com/feed/trending(\\?(.)*|)$": 				YTContext.TRENDING,
		"^https://www\\.youtube\\.com/feed/recommended(\\?(.)*|)$": 			YTContext.RECOMMENDED,
		"^https://www\\.youtube\\.com/(\\?(.)*|)$": 									YTContext.HOME
	});

	//creates a "context_switch"-message for content_controller
	function createContextSwitchMsg(context){
		return {
			sender: SENDER,
			receiver: "content_controller",
			content: {
				info: "context_switch",
				"context": context
			}
		};
	}

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

	//listen to url updates and send context switch message if url changed to a YTContext, otherwise remove tabId from YT_TAB_IDS
	browser.tabs.onUpdated.addListener((tabId, cInfo, tab) => {
		if(YT_TAB_IDS.contains(tabId) && cInfo.status === "complete"){
			let context = urlToContext(tab.url);

			if(context !== undefined){
				//send context switch message
				browser.tabs.sendMessage(tabId, createContextSwitchMsg(context));
			}else{
				//remove tabId from YT_TAB_IDS
				YT_TAB_IDS.remove(tabId);
			}
		}
	});

	//listen to removed tabs and try to delete them from YT_TAB_IDS
	browser.tabs.onRemoved.addListener((tabId) => {
		YT_TAB_IDS.remove(tabId);
	});

	/*
	INSTALLING LISTENER FOR MESSAGES FROM content-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.sender === "content_controller"){
			/* msg.content is of the form:
			"context_request"
			*/
			if(msg.content === "context_request"){
				let context = urlToContext(sender.tab.url);

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
}
