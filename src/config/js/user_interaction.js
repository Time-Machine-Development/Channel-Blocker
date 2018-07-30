{
	function checkboxHandler() {
		let showAdvancedView = document.getElementById("configurationCheckbox").checked;
		if(showAdvancedView === true){
			document.getElementById("hideable").style.display = "block";
		}else{
			document.getElementById("hideable").style.display = "none";
		}
	}

	function darkThemeCheckboxHandler() {
		let showDarkTheme = document.getElementById("darkThemeCheckbox").checked;
		if(showDarkTheme === true){
			document.getElementById("css").href = "styleDark.css";
		}else{
			document.getElementById("css").href = "style.css";
		}
	}
	
	//handle initial checkbox status
	checkboxHandler();
	darkThemeCheckboxHandler();

	//define behavior for clicking the checkbox
	document.getElementById("configurationCheckbox").onclick = checkboxHandler;
	
	//define behavior for clicking the checkbox
	document.getElementById("darkThemeCheckbox").onclick = darkThemeCheckboxHandler;
}
