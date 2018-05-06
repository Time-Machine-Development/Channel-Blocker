
	function VideoPageContentFilter(target, parent) {
		this.onFound = function(child){
			for(let elem of child.getElementsByClassName("style-scope ytd-compact-video-renderer")){
				if(elem.id == "video-title"){
					console.log("Video: " + elem.textContent);
					if(checkVideoTilte(elem.textContent)){
						child.remove();
					}
				}
			}
			
			for(let elem of child.getElementsByClassName("style-scope ytd-video-meta-block")){
				if(elem.id == "byline"){
					console.log("by: " + elem.textContent);
					if(checkUserChannelName(elem.textContent)){
						child.remove();
					}
				}
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageContentFilter.prototype = Object.create(Filter.prototype);

	VideoPageContentFilter.prototype.constructor = VideoPageContentFilter;

	VideoPageContentFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "green";
		}
	};
	
	VideoPageContentFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "blue";
		}
	};