
	function VideoContainerFilter(target, parent) {
		this.onFound = function(child){
			let linkInnerArr = child.getElementsByTagName("a");
			if(linkInnerArr.length >= 3){
				console.log("GridVideo: '" + linkInnerArr[1].textContent + "' from " + linkInnerArr[2].textContent);
				
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
			}else{
				for(let elem of child.getElementsByClassName("style-scope ytd-grid-channel-renderer")){
					if(elem.id == "title"){
						console.log("Channel: " + elem.textContent);
						if(checkUserChannelName(elem.textContent)){
							child.remove();
						}
					}
				}
			}
		}
		
		Filter.call(this, target, parent);
	}

	VideoContainerFilter.prototype = Object.create(Filter.prototype);

	VideoContainerFilter.prototype.constructor = VideoContainerFilter;

	VideoContainerFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "green";
		}
	};
	
	VideoContainerFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "blue";
		}
	};