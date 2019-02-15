//all filters currently active
const CUR_FILTERS = new Array();

//creates filters, based on the current yt-context
function pageUrlChanged(context){
	//detaches all currently active filters
	for(actFilter of CUR_FILTERS){
		if(actFilter !== undefined){
			actFilter.detach();
		}
	}

	//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
	if(context === YTContext.HOME || context === YTContext.TRENDING){
		let selectList = document.getElementsByClassName("style-scope ytd-section-list-renderer");
		for(elem of selectList){
			if(elem.id === "contents"){
				CUR_FILTERS.push(new StartContentFilter(elem));
			}
		}
	}

	//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
	if(context === YTContext.SEARCH || context === YTContext.CHANNEL_VIDEOS || context === YTContext.CHANNEL_HOME){
		for(elem of document.getElementsByClassName("style-scope ytd-two-column-search-results-renderer")){
			if(elem.tagName === "YTD-SECTION-LIST-RENDERER"){
				CUR_FILTERS.push(new SearchPageStartFilter(elem));
			}
		}
	}

	//WatchPage(https://www.youtube.com/watch?v=<ID>)
	if(context === YTContext.VIDEO){
		let list = document.getElementsByTagName("ytd-app");
		for(elem of list){
			CUR_FILTERS.push(new VideoPageAppFilter(elem));
		}
	}
}

//send a "context_request"-message to background_url_update to receive the current yt-context
async function getUrl(){
	let msg = {
		sender: "content_controller",
		receiver: "background_url_update",
		content: "context_request"
	};

	let context = await browser.runtime.sendMessage(msg);

	//wait for document to be ready
	$(document).ready(pageUrlChanged(context));
}

/*
INSTALLING LISTENER FOR MESSAGES FROM background-scripts
*/

browser.runtime.onMessage.addListener((msg) => {
	if(msg.receiver !== "content_controller")
		return;

	if(msg.sender === "background_filter_storage"){
		/* msg.content is of the form:
		"filter_storage_modified"
		*/

		if(msg.content === "filter_storage_modified"){
			//note that animationSpeed is declared and init. in checker_module
			animationSpeed = 1000;

			//?: why do you call getUrl(), if the context changes background_url_update sends a "context_switch"-message
			//?: besides, a "filter_storage_modified"-message DOES NOT imply a context switch
			getUrl();
		}
	}

	if(msg.sender === "background_url_update"){
		/* msg.content is of the form:
		{
			info: "context_switch",
			context: <context>
		}
		where <context> is a key of YTCONTEXT or undefined
		*/

		if(msg.content.info === "context_switch"){
			//note that animationSpeed is declared and init. in checker_module
			animationSpeed = 0;

			//wait for document to be ready
			$(document).ready(pageUrlChanged(msg.content.context));
		}
	}
});

//request inital context (and register this tab as a yt-tab in background as a side-effect)
getUrl();
