function SearchPageContentFilter(target, parent) {
	this.onFound = function(child, useCallbackFilter){
		console.log(child);
		
		if(child.tagName === "YTD-SHELF-RENDERER"){
			for(elem of child.getElementsByClassName("style-scope ytd-vertical-list-renderer")){
				if(elem.id == "items"){
					var filter = new SearchPageContentFilter(elem, this);
				}
			}
		}
		
		
		if(child.tagName === "YTD-VIDEO-RENDERER"){
			let linkInnerArr = child.getElementsByTagName("a");
			if(linkInnerArr.length >= 3){
				if(useCallbackFilter === undefined){
					let cFilter = new CallbackFilter(linkInnerArr[2], this, child);
				}
				console.log(linkInnerArr[2].textContent);
				
				checkVideoTitle(linkInnerArr[2].textContent, linkInnerArr[1].textContent, child);
				
				if(debug){
					linkInnerArr[1].style.color = "darkgray";
					linkInnerArr[2].style.color = "darkgray";
				}
				
				for(let btnContainerElem of child.getElementsByClassName("style-scope ytd-video-meta-block")){
					if(btnContainerElem.id === "metadata"){
						createBtnAtStart(btnContainerElem, createBtnNode(linkInnerArr[2].textContent), btnContainerElem.firstChild);
					}
				}
			}
			
			if(debug){
				child.style.background = "green";
			}
		}
		
		
	}
	
	this.reload = function(child){
		console.log("--RELOAD--");
		this.onFoundInit(child, true);
	}
	
	Filter.call(this, target, parent);
}

SearchPageContentFilter.prototype = Object.create(Filter.prototype);

SearchPageContentFilter.prototype.constructor = SearchPageContentFilter;

SearchPageContentFilter.prototype.onFoundInit = function(child){
	this.onFound(child);
};

SearchPageContentFilter.prototype.onFoundObs = function(child){
	this.onFound(child);
};