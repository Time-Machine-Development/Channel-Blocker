
	function StartContentFilter(target, parent) {
		this.onFound = function(child){
			
			//OuterVideo-container
			for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
				if(elem.id == "title"){
					if(checkUserChannelName(elem.textContent)){
						child.remove();
					}
					
					//insert button to block channel/user
					elem.parentNode.parentNode.parentNode.parentNode.insertBefore(createBtnNode(elem.textContent), elem.parentNode.parentNode.parentNode);
				}
			}
			
			//Empfohlen-container
			for(let elem of child.getElementsByClassName("style-scope yt-horizontal-list-renderer")){
				if(elem.id == "items"){
					var filter2 = new VideoContainerFilter(elem, this);
				}
			}
			
			//SingleVideo-container
			for(let elem of child.getElementsByClassName("style-scope ytd-expanded-shelf-contents-renderer")){
				if(elem.id == "grid-container"){
					for(videoElem of elem.children){
						let linkInnerArr = videoElem.getElementsByTagName("a");
						if(linkInnerArr.length >= 3){
							
							if(checkVideoTitle(linkInnerArr[1].textContent)){
								videoElem.remove();
							}
							if(checkUserChannelName(linkInnerArr[2].textContent)){
								videoElem.remove();
							}
							
							//insert button to block channel/user
							for(let btnContainerElem of videoElem.getElementsByClassName("style-scope ytd-video-meta-block")){
								if(btnContainerElem.id === "metadata"){
									btnContainerElem.insertBefore(createBtnNode(linkInnerArr[2].textContent), btnContainerElem.firstChild);
								}
							}
							
							if(debug){
								linkInnerArr[1].style.color = "darkgray";
								linkInnerArr[2].style.color = "darkgray";
							}
						}
						
						if(debug){
							videoElem.style.background = "green";
						}
					}
				}
			}
			//gridVideo/channel-container
			for(let elem of child.getElementsByClassName("style-scope ytd-grid-renderer")){
				if(elem.id == "items"){
					var filter2 = new VideoContainerFilter(elem, this);
				}
			}
		}
		
		Filter.call(this, target, parent);
	}

	StartContentFilter.prototype = Object.create(Filter.prototype);

	StartContentFilter.prototype.constructor = StartContentFilter;

	StartContentFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "red";
		}
	};
	
	StartContentFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "orange";
		}
	};
	
