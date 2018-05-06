
	function VideoPageAppFilter(target, parent) {
		this.onFound = function(child){
			if(child.id === "content"){
				for(let elem of child.getElementsByClassName("style-scope ytd-app")){
					console.log(elem);
					if(elem.id === "page-manager"){
						console.log(elem);
						console.log("new VideopageManagerFilter");
						try{
							let videopageManagerFilter = new VideopageManagerFilter(elem, this);
						}catch(e){console.log(e);}
					}
				}
			}
			
		}
		
		Filter.call(this, target, parent);
	}

	VideoPageAppFilter.prototype = Object.create(Filter.prototype);

	VideoPageAppFilter.prototype.constructor = VideoPageAppFilter;

	VideoPageAppFilter.prototype.onFoundInit = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "green";
		}
	};
	
	VideoPageAppFilter.prototype.onFoundObs = function(child){
		this.onFound(child);
		
		if(debug){
			child.style.background = "blue";
		}
	};