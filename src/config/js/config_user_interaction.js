{
     const SENDER = "config_config_user_interaction";

     //creates a "config_value_set"-message for background_config_storage
     function createConfigValueSetMsg(configId, configVal){
          return {
               sender: SENDER,
               receiver: "background_config_storage",
               content: {
                    info: "config_value_set",
                    config_id: configId,
                    config_val: configVal
               }
          };
     }

     //creates a "config_value_request"-message for background_config_storage
	function createConfigValueRequestMsg(configId){
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			content: {
				info: "config_value_request",
                    config_id: configId
			}
		};
	}
	 
	//handle the event from the DesignSelect
	//send a massage to the background to activate/deactivate the page design
	function configPageDesignSelectHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		
		//send a msg to the background_config_storage to activate/deactivate the advanced view
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONFIG_PAGE_DESIGN, document.getElementById("DesignSelect").value));
	}
	 
	//handle the event from the configAdvancedViewCheckbox
	//send a massage to the background to activate/deactivate the advanced view
	function configAdvancedViewCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		
		//send a msg to the background_config_storage to activate/deactivate the advanced view
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONFIG_ADVANCED_VIEW, document.getElementById("configAdvancedViewCheckbox").checked));
	}
	
	//handle the event from the configBtnVisibilityCheckbox
	//send a massage to the background to activate/deactivate the BtnVisibility
	function configBtnVisibilityCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		
		//send a msg to the background_config_storage to activate/deactivate the advanced view
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONTENT_BLOCK_BTN_VISIBILITY, document.getElementById("configBtnVisibilityCheckbox").checked));
	}
	
	//set all configboxes unviable and set the selected configboxe viable
	function containerSelectHandler() {
		document.getElementById("0").style.display = "none";
		document.getElementById("1").style.display = "none";
		document.getElementById("2").style.display = "none";
		document.getElementById("3").style.display = "none";
		document.getElementById("4").style.display = "none";
		
		let selectValue = document.getElementById("containerSelect").value;
		document.getElementById(selectValue).style.display = "block";
	}
	
	//change the css-style of the config page
	function changePageDesign(configValue){
		console.log("changePageDesign: " + configValue);
		document.getElementById("DesignSelect").value = configValue;
		if(configValue == 0){
			document.getElementById("css").href = "styleDark.css";
		}else if(configValue == 1){
			console.log("changePageDesign to light");
			document.getElementById("css").href = "style.css";
		}
	}
	
	//show the advanced view and display the right filterbox
	function changeAdvancedView(configValue){
		document.getElementById("configAdvancedViewCheckbox").value = configValue;
		if(configValue){
			document.getElementById("containerHeadline").style.display = "none";
			document.getElementById("containerSelect").style.display = "block";
			containerSelectHandler();
		}else{
			document.getElementById("containerHeadline").style.display = "block";
			document.getElementById("containerSelect").style.display = "none";
			
			document.getElementById("0").style.display = "block";
			document.getElementById("1").style.display = "none";
			document.getElementById("2").style.display = "none";
			document.getElementById("3").style.display = "none";
			document.getElementById("4").style.display = "none";
		}
		document.getElementById("configAdvancedViewCheckbox").checked = configValue;
	}
	
	//change the configBtnVisibilityCheckbox
	//change the configBtnVisibilityCheckbox
	function changeBtnVisibility(configValue){
		document.getElementById("configBtnVisibilityCheckbox").value = configValue;
		document.getElementById("configBtnVisibilityCheckbox").checked = configValue;
	}
	
	/*
	INSTALLING LISTENER FOR EVENTS FROM userinteraction
	*/
	
	//define behavior for changing the DesignSelect
	//document.getElementById("DesignSelect").addEventListener('onchange',  function(event){console.log("event: " + event);configPageDesignSelectHandler(event);});
	document.getElementById("DesignSelect").onchange = function(event){configPageDesignSelectHandler(event);};
	
	//define behavior for clicking the configAdvancedViewCheckbox
	document.getElementById("configAdvancedViewCheckbox").addEventListener('click',  function(event){configAdvancedViewCheckboxHandler(event);});

	//define behavior for clicking the configBtnVisibilityCheckbox
	document.getElementById("configBtnVisibilityCheckbox").addEventListener('click',  function(event){configBtnVisibilityCheckboxHandler(event);});
	
	//define behavior for changing the containerSelect
	document.getElementById("containerSelect").onchange = containerSelectHandler;
	
	//send a config_value_request
	async function initRequests(){
		let val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONFIG_PAGE_DESIGN));
		changePageDesign(val);
		console.log(val);
		
		//AdvancedView
		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONFIG_ADVANCED_VIEW));
		changeAdvancedView(val);
		console.log(val);
		
		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONTENT_BLOCK_BTN_VISIBILITY));
		changeBtnVisibility(val);
		console.log(val);
	}
	
	initRequests();
	
    /*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

     browser.runtime.onMessage.addListener((msg, sender) => {
		console.log(msg);
          if(msg.receiver !== SENDER)
               return;

          if(msg.sender === "background_config_storage"){
               if(msg.content.info === "config_storage_modified"){
                    /* msg.content is of the form:
     			{
     				info: "config_storage_modified",
     				config_id: <cid>,
                    config_val: <cval>
     			}
                    where <cid> is a value of ConfigId
                    */

                    //TODO: react on config-storage modification
					if(msg.content.config_id === ConfigId.CONFIG_PAGE_DESIGN){
						changePageDesign(msg.content.config_val);
					}else if(msg.content.config_id === ConfigId.CONFIG_ADVANCED_VIEW){
						changeAdvancedView(msg.content.config_val);
					}else if(msg.content.config_id === ConfigId.CONTENT_BLOCK_BTN_VISIBILITY){
						changeBtnVisibility(msg.content.config_val);
					}
               }
          }
     });
}
