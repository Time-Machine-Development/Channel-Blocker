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

    //TODO: "bind" to config-HTML
	 
	//handle the event from the configurationCheckbox
	//send a massage to the background to activate/deactivate the advanced view
	function configAdvancedViewCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		
		//send a msg to the background_config_storage to activate/deactivate the advanced view
			createConfigValueSetMsg(ConfigId.CONFIG_ADVANCED_VIEW, !document.getElementById("configurationCheckbox").checked);
	}
	
	//
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
	}
	
	/*
	INSTALLING LISTENER FOR EVENTS FROM userinteraction
	*/
	
	//define behavior for clicking the configAdvancedViewCheckbox
	document.getElementById("configAdvancedViewCheckbox").addEventListener('click',  function(event){configAdvancedViewCheckboxHandler(event);});

	
    /*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

     browser.runtime.onMessage.addListener((msg, sender) => {
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
					if(msg.content.config_id === ConfigId.CONFIG_ADVANCED_VIEW){
						changeAdvancedView(msg.content.config_val);
					}
               }
          }
     });
}
