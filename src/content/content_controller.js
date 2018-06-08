const curFilter = new Array();

function pageUrlChanged(context){
	console.log(context);
	
	//detaches all currently active Filter
	for(actFilter of curFilter){
		if(actFilter !== undefined){
			try{
				actFilter.detach();
			}catch(e){
				console.log(e);
			}
		}
	}
	curFilter.length = 0;
	
	//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
	if(context === YTContext.HOME || context === YTContext.TRENDING){
		try{
			let selectList = document.getElementsByClassName("style-scope ytd-section-list-renderer");
			for(elem of selectList){
				if(elem.id === "contents"){
					curFilter.push(new StartContentFilter(elem));
				}
			}
		}catch(e){
			console.log(e);
		}
	}
	
	//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
	if(context === YTContext.SEARCH){
		try{
			for(elem of document.getElementsByClassName("style-scope ytd-two-column-search-results-renderer")){
				if(elem.tagName === "YTD-SECTION-LIST-RENDERER"){
					curFilter.push(new SearchPageStartFilter(elem));
				}
			}
		}catch(e){
			console.log(e);
		}
	}
	
	//WatchPage(https://www.youtube.com/watch?v=<ID>)
	if(context === YTContext.VIDEO){
		try{
			let list = document.getElementsByTagName("ytd-app");
			for(elem of list){ 
				curFilter.push(new VideoPageAppFilter(elem));
			}
		}catch(e){
			console.log(e);
		}
	}
}

async function getUrl(refresh){
	let msg = {
		sender: "content_controller",
		receiver: "background_controller_url_update",
		"event": {
			type: "context_request"
		}
	};
	
	let sending = await browser.runtime.sendMessage(msg);
	
	if(refresh !== undefined){
		pageUrlChanged(sending);
	}
}

function processMessage(msg){
	if(msg.receiver !== "content_controller"){
		return;
	}
	if(msg.event.type === "storage_grew"){
		getUrl(true);
	}else{
		pageUrlChanged(msg.event.context);
	}
}

getUrl(true);

browser.runtime.onMessage.addListener(processMessage);	