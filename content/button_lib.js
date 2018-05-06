
	function createBtnNode(UserChannelName){
		let btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("title", "block '" + UserChannelName + "', so you dont see them anymore!");
		btn.textContent =  "block '" + UserChannelName + "'";
		return btn;
	}
	
	