//Adds a EventListener to the button ad returns it
function addListener(btn, userChannelName, checkBeforBlocking = false){
	let func;
	if(checkBeforBlocking){
		func = function(){blockUserChannelwithFallback(userChannelName, this);}
	}else{
		func = function(){blockUserChannel(userChannelName);}
	}
	btn.addEventListener("click", func); 
	return btn;
}

//Creates a button and returns it
function createBtnNode(userChannelName, checkBeforBlocking = false){
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (YouTube™ Cleaner)");
	btn = addListener(btn, userChannelName, checkBeforBlocking);
	btn.setAttribute("style", "padding-left:0em; color:red; border:none; background-color:Transparent; cursor:pointer;");
	
	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");
	
	btn.appendChild(svg);
	
	return btn;
}

//Creates a button and returns it
function createContainerBtnNode(userChannelName, checkBeforBlocking = false){
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "block '" + userChannelName + "' (YouTube™ Cleaner)");
	btn = addListener(btn, userChannelName, checkBeforBlocking);
	btn.setAttribute("style", "padding-right:0em; color:red; border: none; background-color: Transparent;");
	
	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");
	btn.appendChild(svg);
	
	return btn;
}

//Creates a button and inserts it after the 'child'-node
function createBtnAfter(child, btn){
	for(ch of child.parentNode.children){
		if(ch.tagName === "BUTTON"){
			ch.remove();
		}
	}
	child.after(btn);
}

//Takes the button(btn) and inserts it befor the 'child'-node
//If the 'child'-node isn't a child of the 'patent'-node anymore insert it as fist childNode
function createBtnAtStart(parent, btn, child){
	for(ch of parent.children){
		if(ch.tagName === "BUTTON"){
			ch.remove();
		}
	}
	if(child === undefined){
		parent.insertBefore(btn, parent.firstChild);
	}else{
		try{
			parent.insertBefore(btn,child);
		}catch(e){
			parent.prepend(btn);
			
		}
	}
}