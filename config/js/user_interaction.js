function checkboxHandler() {
	let showAdvancedView = document.getElementById("configurationCheckbox").checked;
	if(showAdvancedView === true){
		document.getElementById("hideable").style.display = "block";
	}else{
		document.getElementById("hideable").style.display = "none";
	}
}

//check initial checkbox status
checkboxHandler();

//define behaviour for clicking the checkbox
document.getElementById("configurationCheckbox").onclick = checkboxHandler;
