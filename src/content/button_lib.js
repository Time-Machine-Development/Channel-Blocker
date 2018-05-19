function createBtnNode(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "block '" + userChannelName + "', so you dont see them anymore!");
	let func = function(){blockUserChannel(userChannelName);}
	btn.addEventListener("click", func); 
	btn.setAttribute("style", "padding-left:0em; color:red; border: none; background-color: Transparent;");
	btn.textContent = "✖";
	return btn;
}

function createContainerBtnNode(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "block '" + userChannelName + "', so you dont see them anymore!");
	let func = function(){blockUserChannel(userChannelName);}
	btn.addEventListener("click", func); 
	btn.setAttribute("style", "padding-right:0em; color:red; border: none; background-color: Transparent;");
	btn.textContent =  "✖";
	return btn;
}

function createBtnAfter(child, btn){
	for(ch of child.parentNode.children){
		if(ch.tagName === "BUTTON"){
			ch.remove();
		}
	}
	child.after(btn);
}

function createBtnAtStart(parent, btn, child){
	for(ch of parent.children){
		if(ch.tagName === "BUTTON"){
			ch.remove();
		}
	}
	if(child == undefined){
		parent.insertBefore(btn, parent.firstChild);
	}else{
		parent.insertBefore(btn, child);
	}
}