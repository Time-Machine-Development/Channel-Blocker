
	function pageUrlChanged(){
		
		let pageUrl = window.location.href;
		
		console.log("Content-Controller starting filter at '" + pageUrl + "'");
		
		pageUrl = pageUrl.replace("https://www.youtube.com/", "");
		
		//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
		if(pageUrl === "" || pageUrl === "feed/trending" || pageUrl.startsWith("user")){
			try{
				var startTrendFilter = new StartContentFilter(document.getElementsByTagName("ytd-item-section-renderer")[0].parentNode);
			}catch(e){
				console.log(e);
			}
		}
		
		//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
		if(pageUrl.startsWith('results')){
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
		if(pageUrl.startsWith('watch')){
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
	
	 pageUrlChanged();