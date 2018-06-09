const CUR_FILTER = new Array();

function pageUrlChanged(context){
	console.log(context);
	
	
	//detaches all currently active Filter
	for(actFilter of CUR_FILTER){
		if(actFilter !== undefined){
			try{
				actFilter.detach();
			}catch(e){
				console.log(e);
			}
		}
	}
	CUR_FILTER.length = 0;
	
	//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
	if(context === YTContext.HOME || context === YTContext.TRENDING){
	console.log("HOME  TRENDING");
		try{
			let selectList = document.getElementsByClassName("style-scope ytd-section-list-renderer");
			for(elem of selectList){
				if(elem.id === "contents"){
					CUR_FILTER.push(new StartContentFilter(elem));
				}
			}
		}catch(e){
			console.log(e);
		}
	}
	
	//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
	if(context === YTContext.SEARCH){
	console.log("SEARCH");
		try{
			for(elem of document.getElementsByClassName("style-scope ytd-two-column-search-results-renderer")){
				if(elem.tagName === "YTD-SECTION-LIST-RENDERER"){
					CUR_FILTER.push(new SearchPageStartFilter(elem));
				}
			}
		}catch(e){
			console.log(e);
		}
	}
	
	//WatchPage(https://www.youtube.com/watch?v=<ID>)
	if(context === YTContext.VIDEO){
	console.log("VIDEO");
		try{
			let list = document.getElementsByTagName("ytd-app"); 
			for(elem of list){ 
				CUR_FILTER.push(new VideoPageAppFilter(elem));
			}
		}catch(e){
			console.log(e);
		}
	}
}

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

function processMessage(msg){
	if(msg.receiver !== "content_controller"){
		return;
	}
	if(msg.event.type === "storage_grew"){
		getUrl();
	}else{
		pageUrlChanged(msg.event.context);
	}
}

getUrl();

browser.runtime.onMessage.addListener(processMessage);	