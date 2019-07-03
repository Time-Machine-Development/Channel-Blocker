//this is changed in the controllers
let showBtns = false;
let btnColor = "#717171";
let btnSize = 1.4;

//create the svg blockBtn
function createSVG(){
	// create svg
	let svgURI = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS( svgURI, 'svg' );

	svg.setAttribute( "viewBox", "0 0 100 100" );

	let path = document.createElementNS( svgURI, 'path' );
	path.setAttribute("d", "M 15,15 L 85,85 M 85,15 L 15,85");
	path.setAttribute( "style", "stroke: " + btnColor + ";fill: transparent;stroke-linecap: round;stroke-width: 25;" );

	svg.appendChild( path );

	return svg;
}

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
	btn.setAttribute("id", "cb_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");
	btn = addListener(btn, userChannelName, checkBeforBlocking);
	btn.setAttribute("style", "padding-left:0em; color:red; border:none; background-color:Transparent; cursor:pointer; width:" + btnSize + "em");

	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");

	btn.appendChild(createSVG());

	return btn;
}

//Creates a button and returns it
function createContainerBtnNode(userChannelName, checkBeforBlocking = false){
	let btn = document.createElement("button");
	btn.setAttribute("id", "cb_button");
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
	if(!showBtns)return;
	for(ch of parent.getElementsByTagName("button")){
		ch.remove();
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
