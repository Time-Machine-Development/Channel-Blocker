
	function createBtnNode(userChannelName){
		let btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("title", "block '" + userChannelName + "', so you dont see them anymore!");
		//btn.setAttribute("onclick", "blockUserChannel(" + userChannelName + ")");
		btn.setAttribute("onclick", "alert(\"" + userChannelName + " BLOCKED\")");
		btn.setAttribute("style", "color:red; border: none; background-color: Transparent;");
		btn.textContent =  "X";
		return btn;
	}
	
	