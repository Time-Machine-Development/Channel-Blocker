//create the svg blockBtn
function createSVG(){
	// create svg
	let svgURI = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS( svgURI, 'svg' );

	svg.setAttribute( "viewBox", "0 0 100 100" );

	let path = document.createElementNS( svgURI, 'path' );
	path.setAttribute("d", "M 15,15 L 85,85 M 85,15 L 15,85");
	path.setAttribute( "style", "stroke: #717171;fill: transparent;stroke-linecap: round;stroke-width: 25;" );

	svg.appendChild(path);

	return svg;
}

//creates and returns a block-button
function createBtnNode(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("class", "cb_button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "' (Channel Blocker)");
	btn.addEventListener("click", createBlockUserChannelFunction(userChannelName));
	btn.setAttribute("style", "padding-left:0em; border:none; background-color:Transparent; cursor:pointer; width:" + 1.4 + "em");

	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");

	btn.appendChild(createSVG());

	return btn;
}
