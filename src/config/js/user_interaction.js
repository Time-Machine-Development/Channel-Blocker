{
	const SENDER = "config_user_interaction";

	function sendMessage(type, origin, input){
		browser.runtime.sendMessage(
			{
				sender: SENDER,
				receiver: "background_controller_storage",
				"event": {
					type: 	type,
					origin: origin,
					input: 	input
				}
			}
		);
	}

	function checkboxHandler() {
		let showAdvancedView = document.getElementById("configurationCheckbox").checked;

		if(showAdvancedView === true){
			document.getElementById("hideable").style.display = "block";
			sendMessage("add", ContainerId.CONFIG, "enable_advanced_view");
		}else{
			document.getElementById("hideable").style.display = "none";
			let options = [];
			options.push("enable_advanced_view");
			sendMessage("delete", ContainerId.CONFIG, options);
		}
	}

	function darkThemeCheckboxHandler() {
		let showDarkTheme = document.getElementById("darkThemeCheckbox").checked;
		if(showDarkTheme === true){
			document.getElementById("css").href = "styleDark.css";
			let options = [];
			options.push("enable_dark_theme");
			sendMessage("delete", ContainerId.CONFIG, options);
		}else{
			document.getElementById("css").href = "style.css";
			sendMessage("add", ContainerId.CONFIG, "enable_light_theme");
		}
	}

	//define behavior for clicking the checkbox
	document.getElementById("configurationCheckbox").onclick = checkboxHandler;

	//define behavior for clicking the checkbox
	document.getElementById("darkThemeCheckbox").onclick = darkThemeCheckboxHandler;
}
