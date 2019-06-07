//TODO: following code will be reworked in feature/config_rework (greatly depends on config.html)

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

		console.log(document.getElementById("configAdvancedViewCheckbox").checked);
		
		
	function test(){
		console.log(document.getElementById("configAdvancedViewCheckbox").checked);
	}
	
	function checkboxHandler(e) {
		e.preventDefault();
		console.log(document.getElementById("configAdvancedViewCheckbox").checked);
		test();
	}
		
	function checkboxHandler1(e) {
		e.preventDefault();
		console.log(e.cancelable);
		let showAdvancedView = document.getElementById("configAdvancedViewCheckbox").checked;
		//document.getElementById("configAdvancedViewCheckbox").checked = true;
		console.log(document.getElementById("configAdvancedViewCheckbox").checked);

		if(showAdvancedView === true){
			document.getElementById("containerHeadline").style.display = "none";
			document.getElementById("containerSelect").style.display = "block";
			containerSelectHandler();
			//sendMessage("add", ContainerId.CONFIG, "enable_advanced_view");
		}else{
			document.getElementById("containerHeadline").style.display = "block";
			document.getElementById("containerSelect").style.display = "none";
			
			document.getElementById("0").style.display = "block";
			document.getElementById("1").style.display = "none";
			document.getElementById("2").style.display = "none";
			document.getElementById("3").style.display = "none";
			document.getElementById("4").style.display = "none";
			//let options = [];
			//options.push("enable_advanced_view");
			//sendMessage("delete", ContainerId.CONFIG, options);
		}
		document.getElementById("configAdvancedViewCheckbox").checked = false;
		console.log(document.getElementById("configAdvancedViewCheckbox").checked);
		document.getElementById("configAdvancedViewCheckbox").checked = true;
	}

	function containerSelectHandler() {
		document.getElementById("0").style.display = "none";
		document.getElementById("1").style.display = "none";
		document.getElementById("2").style.display = "none";
		document.getElementById("3").style.display = "none";
		document.getElementById("4").style.display = "none";
		
		let selectValue = document.getElementById("containerSelect").value;
		document.getElementById(selectValue).style.display = "block";
	}
	
	function darkThemeCheckboxHandler() {
		let showDarkTheme = document.getElementById("darkThemeCheckbox").checked;
		if(showDarkTheme === true){
			document.getElementById("css").href = "styleDark.css";
			let options = [];
			options.push("enable_light_theme");
			sendMessage("delete", ContainerId.CONFIG, options);
		}else{
			document.getElementById("css").href = "style.css";
			sendMessage("add", ContainerId.CONFIG, "enable_light_theme");
		}
	}

	//define behavior for clicking the checkbox
	document.getElementById("configAdvancedViewCheckbox").addEventListener('click',  function(event){checkboxHandler1(event);});
	
	//define behavior for changing the containerSelect
	document.getElementById("containerSelect").onchange = containerSelectHandler;

	//define behavior for clicking the checkbox
	//document.getElementById("darkThemeCheckbox").onclick = darkThemeCheckboxHandler;
}
