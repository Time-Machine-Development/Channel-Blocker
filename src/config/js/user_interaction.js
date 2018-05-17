{
	function checkboxHandler() {
		let showAdvancedView = document.getElementById("configurationCheckbox").checked;
		if(showAdvancedView === true){
			document.getElementById("hideable").style.display = "block";
		}else{
			document.getElementById("hideable").style.display = "none";
		}
	}

	//handle initial checkbox status
	checkboxHandler();

	//define behavior for clicking the checkbox
	document.getElementById("configurationCheckbox").onclick = checkboxHandler;
}
