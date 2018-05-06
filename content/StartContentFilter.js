

	function StartContentFilter(target, parent) {
		this.onFound = function(child){
			
			//OuterVideo-container
			for(let elem of child.getElementsByClassName("style-scope ytd-shelf-renderer")){
				if(elem.id == "title"){
					console.log("Container: " + elem.textContent);
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
					for(let inElem of elem.getElementsByClassName("yt-simple-endpoint style-scope ytd-video-renderer")){
						if(inElem.id == "video-title"){
							console.log("Video: " + inElem.getAttribute("title"));
						}
					}
					
					if(debug){
						elem.style.background = "green";
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
	
