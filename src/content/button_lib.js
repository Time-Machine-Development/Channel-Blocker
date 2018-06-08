function createBtnNode(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Block '" + userChannelName + "'");
	let func = function(){blockUserChannel(userChannelName);}
	btn.addEventListener("click", func); 
	btn.setAttribute("style", "padding-left:0em; color:red; border: none; background-color: Transparent;");
	//btn.textContent = "✖";
	
	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close_2.svg"));
	svg.setAttribute("width", "11em");
	
	/*let svg = document.createElement("svg");
	svg.setAttribute("width", "11");
	svg.setAttribute("height", "11");
	
	let line1 = document.createElement("line");
	line1.setAttribute("x1", "0");
	line1.setAttribute("y1", "11");
	line1.setAttribute("x2", "11");
	line1.setAttribute("y2", "0");
	line1.setAttribute("style", "stroke:rgb(255,44,44);stroke-width:2");
	
	let line2 = document.createElement("line");
	line2.setAttribute("x1", "0");
	line2.setAttribute("y1", "11");
	line2.setAttribute("x2", "0");
	line2.setAttribute("y2", "11");
	line2.setAttribute("style", "stroke:rgb(255,44,44);stroke-width:2");

	svg.appendChild(line1);
	svg.appendChild(line2);*/
	btn.appendChild(svg);
	
	return btn;
}

function createContainerBtnNode(userChannelName){
	let btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "block '" + userChannelName + "', so you dont see them anymore!");
	let func = function(){blockUserChannel(userChannelName);}
	btn.addEventListener("click", func); 
	btn.setAttribute("style", "padding-right:0em; color:red; border: none; background-color: Transparent;");
	//btn.textContent = "✖";
	
	let svg = document.createElement("img");
	svg.setAttribute("src", browser.extension.getURL("content/img/close.svg"));
	svg.setAttribute("width", "11em");
	btn.appendChild(svg);
	
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
	if(child === undefined){
		parent.insertBefore(btn, parent.firstChild);
	}else{
		try{
			parent.insertBefore(btn, child);
		}catch(e){
			console.log(e);
			if(parent !== undefined)
			parent.appendChild(btn);
		}
	}
}