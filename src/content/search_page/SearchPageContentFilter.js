function SearchPageContentFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageContentFilter.prototype = Object.create(Filter.prototype);

SearchPageContentFilter.prototype.constructor = SearchPageContentFilter;

SearchPageContentFilter.prototype.onFound = function(child, useCallbackFilter){

	if(child.tagName === "YTD-SHELF-RENDERER"){
		for(elem of child.getElementsByClassName("style-scope ytd-vertical-list-renderer")){
			if(elem.id === "items"){
				new SearchPageContentFilter(elem, this);
			}
		}
	}

	if(child.tagName === "YTD-VIDEO-RENDERER"){
		let linkInnerArr = child.getElementsByTagName("a");
		if(linkInnerArr.length >= 3){
			if(useCallbackFilter === undefined){
				new CallbackFilter(linkInnerArr[2], this, child);
			}

			checkVideoTitle(linkInnerArr[2].textContent, linkInnerArr[1].textContent, child);

			for(let btnContainerElem of child.getElementsByClassName("style-scope ytd-video-meta-block")){
				if(btnContainerElem.id === "metadata"){
					createBtnAtStart(btnContainerElem, createBtnNode(linkInnerArr[2].textContent), btnContainerElem.firstChild);
				}
			}
		}
	}
};

SearchPageContentFilter.prototype.reload = function(child){
	this.onFound(child, true);
};
