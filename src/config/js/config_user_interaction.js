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
               }
          }
     });
}
