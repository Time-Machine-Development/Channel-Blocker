
	console.log("Start");
	try{
		var filter1 = new StartContentFilter(document.getElementsByTagName("ytd-item-section-renderer")[0].parentNode);
	}catch(e){
		console.log(e);
	}
	
	try{
		for(elem of document.getElementsByClassName("style-scope ytd-item-section-renderer")){
			if(elem.id == "contents"){
				var filter2 = new SearchPageContentFilter(elem);
			}
		}
	}catch(e){
		console.log(e);
	}
	console.log(filter2.childFilters);