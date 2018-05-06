

	function StartContentFilter(target, parent) {
		this.onFound = function(child){
			
			//OuterVideo-container
			for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
				if(elem.id == "title"){
					console.log("Container: " + elem.textContent);
					if(checkUserChannelName(elem.textContent)){
						child.remove();
					}
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
						try{
							let linkInnerArr = videoElem.getElementsByTagName("a");
							if(linkInnerArr.length >= 3){
								console.log("Video: '" + linkInnerArr[1].textContent + "' from " + linkInnerArr[2].textContent);
								
								if(checkVideoTilte(linkInnerArr[1].textContent)){
									videoElem.remove();
								}
								if(checkUserChannelName(linkInnerArr[2].textContent)){
									videoElem.remove();
								}
								
								if(debug){
									linkInnerArr[1].style.color = "darkgray";
									linkInnerArr[2].style.color = "darkgray";
								}
								
								for(let btnContainerElem of videoElem.getElementsByClassName("text-wrapper style-scope ytd-video-renderer")){
									btnContainerElem.appendChild(createBtnNode(linkInnerArr[2].textContent));
								}
							}
							
							if(debug){
								videoElem.style.background = "green";
							}
						}catch(e){console.log(e);}
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
	
