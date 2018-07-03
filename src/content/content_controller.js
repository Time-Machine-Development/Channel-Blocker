//All filter currently active
const CUR_FILTER = new Array();

//Creates filter, based on the current url
//context represents the current url with a number:
//HOME: 0,
//VIDEO: 1,
//SEARCH: 2,
//TRENDING: 3,
//CHANNEL_HOME: 4,
//CHANNEL_VIDEOS: 5,
//OTHER: 6
function pageUrlChanged(context){
	
	//detaches all currently active Filter
	for(actFilter of CUR_FILTER){
		if(actFilter !== undefined){
			try{
				actFilter.detach();
			}catch(e){
			}
		}
	}
	CUR_FILTER.length = 0;
	
	//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
	if(context === YTContext.HOME || context === YTContext.TRENDING){
		try{
			let selectList = document.getElementsByClassName("style-scope ytd-section-list-renderer");
			for(elem of selectList){
				if(elem.id === "contents"){
					CUR_FILTER.push(new StartContentFilter(elem));
				}
			}
		}catch(e){
		}
	}
	
	//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
	if(context === YTContext.SEARCH || context === YTContext.CHANNEL_VIDEOS || context === YTContext.CHANNEL_HOME){
		try{
			for(elem of document.getElementsByClassName("style-scope ytd-two-column-search-results-renderer")){
				if(elem.tagName === "YTD-SECTION-LIST-RENDERER"){
					CUR_FILTER.push(new SearchPageStartFilter(elem));
				}
			}
		}catch(e){
		}
	}
	
	//WatchPage(https://www.youtube.com/watch?v=<ID>)
	if(context === YTContext.VIDEO){
		try{
			let list = document.getElementsByTagName("ytd-app"); 
			for(elem of list){ 
				CUR_FILTER.push(new VideoPageAppFilter(elem));
			}
		}catch(e){
		}
	}
}

//Send a message to the background_controller_url_updater to receive the current Url
async function getUrl(){
	let msg = {
		sender: "content_controller",
		receiver: "background_controller_url_update",
		"event": {
			type: "context_request"
		}
	};
	
	let sending = await browser.runtime.sendMessage(msg);
	
	pageUrlChanged(sending);
}

//Process the Messages for the content_controller from beackgroundscripts
//Triggert when the storage has changed or the url has changed
function processMessage(msg){
	if(msg.receiver !== "content_controller"){
		return;
	}
	if(msg.event.type === "storage_modified"){
		getUrl();
	}else{
		pageUrlChanged(msg.event.context);
	}
}

getUrl();

//Add a listener, to get Messages from the backgroundscripts
browser.runtime.onMessage.addListener(processMessage);	