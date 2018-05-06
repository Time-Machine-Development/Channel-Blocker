	console.log("SearchPageContentFilter");
	
	function SearchPageContentFilter(target, parent) {
		this.onFound = function(child){
			
			if(child.tagName === "YTD-SHELF-RENDERER"){
				for(elem of child.getElementsByClassName("style-scope ytd-vertical-list-renderer")){
					if(elem.id == "items"){
						console.log("<"+child.tagName+" "+child.className+">");
						console.log("new SearchPageContentFilter");
						var filter = new SearchPageContentFilter(elem, this);
					}
				}
			}
			
			if(child.tagName === "YTD-VIDEO-RENDERER"){
				let linkInnerArr = child.getElementsByTagName("a");
				if(linkInnerArr.length >= 3){
					console.log("Video: '" + linkInnerArr[1].textContent + "' from " + linkInnerArr[2].textContent);
					
					if(checkVideoTilte(linkInnerArr[1].textContent)){
						child.remove();
					}
					if(checkUserChannelName(linkInnerArr[2].textContent)){
						child.remove();
					}
					
					if(debug){
						linkInnerArr[1].style.color = "darkgray";
						linkInnerArr[2].style.color = "darkgray";
					}
					
					for(let btnContainerElem of child.getElementsByClassName("text-wrapper style-scope ytd-video-renderer")){
						btnContainerElem.appendChild(createBtnNode(linkInnerArr[2].textContent));
					}
				}
				
				if(debug){
					child.style.background = "green";
				}
			}
			
			
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
	
