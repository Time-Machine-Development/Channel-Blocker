
	console.log("Start");

	//Start/Trends
	try{
		var filter1 = new StartContentFilter(document.getElementsByTagName("ytd-item-section-renderer")[0].parentNode);
		console.log("1");
	}catch(e){
		console.log(e);
	}
	
	console.log("Search");
	//Search
	try{
		for(elem of document.getElementsByClassName("style-scope ytd-item-section-renderer")){
			if(elem.id == "contents"){
				console.log("2");
				var filter2 = new SearchPageContentFilter(elem);
			}
		}
	}catch(e){
		console.log(e);
	}
	
	console.log("Video");
	//Video
	try{
		let list = document.getElementsByTagName("ytd-app");
		console.log(list);
		for(elem of list){  //style-scope ytd-watch-next-secondary-results-renderer
			console.log(elem);
			var filter3 = new VideoPageAppFilter(elem);
		}
	}catch(e){
		console.log(e);
	}
	console.log(filter2.childFilters);