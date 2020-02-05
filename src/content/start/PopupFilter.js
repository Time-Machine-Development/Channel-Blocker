//MenuPopup
function PopupFilter(target) {
	Filter.call(this, target);
}

PopupFilter.prototype = Object.create(Filter.prototype);

PopupFilter.prototype.constructor = PopupFilter;

//create the svg blockBtn
function createSVG(){
	// create svg
	let svgURI = "http://www.w3.org/2000/svg";
	let svg = document.createElementNS( svgURI, 'svg' );

	svg.setAttribute( "viewBox", "0 0 100 100" );

	let path = document.createElementNS( svgURI, 'path' );
	path.setAttribute("d", "M 15,15 L 85,85 M 85,15 L 15,85");
	path.setAttribute( "style", "stroke: " + btnColor + ";fill: transparent;stroke-linecap: round;stroke-width: 25;" );

  	svg.setAttribute( "style", "max-height: 16px" );

	svg.appendChild( path );

	return svg;
}

PopupFilter.prototype.onFound = function(child){
  console.log("Popup", child);
  let div = document.createElement("div");
  div.setAttribute("id", "cb_menuButtonDiv");

  let btn = document.createElement("button");
  btn.setAttribute("id", "cb_menuButton");
  btn.setAttribute("type", "button");
  btn.setAttribute("title", "Block '" + curChanelName + "' (Channel Blocker)");
  btn.addEventListener("click", function(){console.log("new MenueBtn clicked!")});

  let txt = document.createTextNode("Block with ChannelBlocker");

  btn.appendChild(createSVG());
  btn.appendChild(txt);
  div.appendChild(btn);

  console.log("btn", btn);
  let items = child.getElementsByClassName("style-scope ytd-menu-popup-renderer")[0];
  if(items.parentNode.firstElementChild.id == "cb_menuButtonDiv"){
    items.parentNode.firstElementChild.remove();
  }
  console.log("Popup-items", items);

  console.log(items.parentNode.insertBefore(div, items));
}
