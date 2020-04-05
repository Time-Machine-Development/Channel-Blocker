//this is changed in the controllers
let showBtns = false;
let btnColor = "#717171";
let btnSize = 1.4;



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

//creates and returns a block-button
function createBtnNode(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("id", "cb_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");
	btn.addEventListener("click", blockUserChannel);
	btn.setAttribute("style", "padding-left:0em; border:none; background-color:Transparent; cursor:pointer; width:" + btnSize + "em");

	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");

	btn.appendChild(createSVG());

	return btn;
}

//Creates a button and returns it
function createContainerBtnNode(userChannelName, checkBeforBlocking = false){
	let btn = document.createElement("button");
	btn.setAttribute("class", "cb_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "block '" + userChannelName + "' (Channel Blocker)");
	btn = addListener(btn, userChannelName, checkBeforBlocking);
	btn.setAttribute("style", "padding-right:0em; color:red; border: none; background-color: Transparent; cursor:pointer; width:" + btnSize + "em");

	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");
	btn.appendChild(createSVG());

	return btn;
}

//Creates a button and inserts it after the 'child'-node
function createBtnAfter(child, btn){
	if(!showBtns)return;
	for(ch of child.parentNode.parentNode.getElementsByTagName("button")){
		if(ch.id === "cb_button"){
			ch.remove();
		}
	}
	child.after(btn);
}

//Creates a button and inserts it after the 'child'-node
function createBtnAfterWithOneCheck(child, btn){
	if(!showBtns)return;
	for(ch of child.parentNode.getElementsByTagName("button")){
		if(ch.id === "cb_button"){
			ch.remove();
		}
	}
	child.after(btn);
}




//Takes the button(btn) and inserts it befor the 'child'-node
//If the 'child'-node isn't a child of the 'patent'-node anymore insert it as fist childNode
function createBtnAtStartWithOneCheck(parent, btn, child){
	if(!showBtns)return;
	for(ch of parent.parentNode.getElementsByTagName("button")){
		if(ch.id === "cb_button"){
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
