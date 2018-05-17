
	function pageUrlChanged(context){
		
		console.log("COntext: " + context);
		
		//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
		if(context === YTContext.HOME || context === YTContext.TRENDING){
			console.log("HOME/TRENDING");
			try{
				var startTrendFilter = new StartContentFilter(document.getElementsByTagName("ytd-item-section-renderer")[0].parentNode);
			}catch(e){
				console.log(e);
			}
		}
		
		//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
		if(context === YTContext.SEARCH){
			console.log("SEARCH");
			try{
				for(elem of document.getElementsByClassName("style-scope ytd-item-section-renderer")){
					if(elem.id == "contents"){
						var searchFilter = new SearchPageContentFilter(elem);
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
					var watchFilter = new VideoPageAppFilter(elem);
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
	
	getUrl();
	
	function processMessage(msg){
		console.log(msg);
		if(msg.receiver !== "content_controller"){
			return;
		}
		
		pageUrlChanged(msg.event.context);
	}
	
	browser.runtime.onMessage.addListener(processMessage);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	