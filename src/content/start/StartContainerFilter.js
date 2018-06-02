function StartContainerFilter(target, parent) {
	Filter.call(this, target, parent);
}

StartContainerFilter.prototype = Object.create(Filter.prototype);

StartContainerFilter.prototype.constructor = StartContainerFilter;

StartContainerFilter.prototype.onFound = function(child){

	let userChannelName;

	let linkInnerArr = child.getElementsByTagName("a");
	if(linkInnerArr.length >= 3){
		let cFilter = new CallbackFilter(linkInnerArr[2], this);
		userChannelName = linkInnerArr[2].textContent;

		//GridVideo-Container
		checkVideoTitle(userChannelName, linkInnerArr[1].textContent, child);

		if(debug){
			linkInnerArr[1].style.color = "darkgray";
			linkInnerArr[2].style.color = "darkgray";
		}
	}else{

		//Channel-Container
		for(let elem of child.getElementsByClassName("style-scope ytd-grid-channel-renderer")){
			if(elem.id === "title"){
				userChannelName = elem.textContent;
				checkUserChannelName(userChannelName, elem.textContent, child);
			}
		}
	}

	//insert button to block channel/user
	for(let btnContainerElem of child.getElementsByClassName("style-scope ytd-grid-video-renderer")){
		if(btnContainerElem.id === "byline-container"){
			createBtnAtStart(btnContainerElem, createBtnNode(userChannelName));
		}
	}
};

StartContainerFilter.prototype.reload = function(){
	console.log("--RELOAD--");
	for(let childElement of this.target.children){
		this.onFound(childElement);
	}
};
