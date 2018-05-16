
	function createBtnNode(userChannelName){
		let btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("title", "block '" + userChannelName + "', so you dont see them anymore!");
		let func = function(){blockUserChannel(userChannelName);}
		btn.addEventListener("click", func); 
		btn.setAttribute("style", "padding-left:0em; color:red; border: none; background-color: Transparent;");
		btn.textContent =  "✖"; //⨯ ✕ ✖
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
	
	