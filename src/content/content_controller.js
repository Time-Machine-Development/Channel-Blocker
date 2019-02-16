//all filters currently active
const CUR_FILTERS = new Array();

//current context to make an update if a "filter_storage_modified"-message is received
let curContext;

//removes all old filters and creates new filters, based on the current yt-context
function pageUrlChanged(context){
	//detaches all currently active filters
	for(actFilter of CUR_FILTERS){
		if(actFilter !== undefined){
			actFilter.detach();
		}
	}

	//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
	if(curContext === YTContext.HOME || curContext === YTContext.TRENDING){
		let selectList = document.getElementsByClassName("style-scope ytd-section-list-renderer");
		for(elem of selectList){
			if(elem.id === "contents"){
				CUR_FILTERS.push(new StartContentFilter(elem));
			}
		}
	}

	//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
	if(curContext === YTContext.SEARCH || curContext === YTContext.CHANNEL_VIDEOS || curContext === YTContext.CHANNEL_HOME){
		for(elem of document.getElementsByClassName("style-scope ytd-two-column-search-results-renderer")){
			if(elem.tagName === "YTD-SECTION-LIST-RENDERER"){
				CUR_FILTERS.push(new SearchPageStartFilter(elem));
			}
		}
	}

	//WatchPage(https://www.youtube.com/watch?v=<ID>)
	if(curContext === YTContext.VIDEO){
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

	curContext = await browser.runtime.sendMessage(msg);

	//wait for document to be ready
	$(document).ready(pageUrlChanged());
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

			//wait for document to be ready
			$(document).ready(pageUrlChanged());
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

			//update current context
			curContext = msg.content.context;

			//wait for document to be ready
			$(document).ready(pageUrlChanged());
		}
	}
});

//request inital context (and register this tab as a yt-tab in background as a side-effect)
getUrl();
