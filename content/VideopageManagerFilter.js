
	console.log("VideopageManagerFilter");
				
	function VideopageManagerFilter(target, parent) {
		this.onFound = function(child){
			console.log(child);
			console.log("length");
			console.log(child.children.length);
			console.log(child.getElementsByClassName("style-scope ytd-watch").length);
			for(let elem of child.getElementsByClassName("style-scope ytd-watch")){
				if(elem.tagName === "YTD-WATCH-NEXT-SECONDARY-RESULTS-RENDERER"){
					console.log(elem);
					let videoPageWatchFilter = new VideoPageWatchFilter(elem, this);
				}
			}
			
		}
		
		Filter.call(this, target, parent);
	}

	VideopageManagerFilter.prototype = Object.create(Filter.prototype);

	VideopageManagerFilter.prototype.constructor = VideopageManagerFilter;

	VideopageManagerFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "green";
		}
	};
	
	VideopageManagerFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "blue";
		}
	};