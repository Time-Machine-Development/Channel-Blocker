{
     const SENDER = "background_config_storage";

     const DEFAULT_CONFIG = {};
     DEFAULT_CONFIG[ConfigId.CONFIG_PAGE_DESIGN] = 0;
     DEFAULT_CONFIG[ConfigId.CONFIG_ADVANCED_VIEW] = false;
     DEFAULT_CONFIG[ConfigId.CONTENT_BLOCK_BTN_VISIBILITY] = true;
     Object.freeze(DEFAULT_CONFIG);

     //represents the current configuration
     let config;
     initConfig();

     //creates a "config_storage_modified"-message for config_config_user_interaction
     function createConfigStorageModifiedMsg(configId){
          return {
               sender: SENDER,
               receiver: "config_config_user_interaction",
               content: {
                    info: "config_storage_modified",
                    config_id: configId,
                    config_val: config[configId]
               }
          };
     }

     /* init. current config with the the config which is stored in STORAGE(defined in shared)
     if these function is called for the first time after the installation of this webextension,
     it is also necessary to set all configuration-keys to the default value(defined in DEFAULT_CONFIG in shared) */
     async function initConfig(){
          let storageContainer = await STORAGE.get("config");
		config = storageContainer["config"];

          let changed = false;
          for(let cId of Object.values(ConfigId)){
               if(config[cId] === undefined){
                    config[cId] = DEFAULT_CONFIG[cId];

                    if(configTabId !== null)
                         browser.tabs.sendMessage(configTabId, createConfigStorageModifiedMsg(cId));

                    changed = true;
               }
          }

          if(changed)
               updateStorage();
     }

     //synchronize STORAGE with current storage
     async function updateStorage(){
          await STORAGE.set({
               "config": config
          });
     }

     /* sets config[configId] to val, if config[configId] was changed a "config_storage_modified"-message is sent to the config-tab
     and the STORAGE is updated*/
     function setConfigVal(configId, val){
          if(config[configId] !== val){
               config[configId] = val;

               if(configTabId !== null)
                    browser.tabs.sendMessage(configTabId, createConfigStorageModifiedMsg(configId));

               updateStorage();
          }
     }

     /*
	INSTALLING LISTENER FOR MESSAGES FROM config-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
          if(msg.receiver !== SENDER)
               return;

          if(msg.sender === "config_config_user_interaction"){
               if(msg.content.info === "config_value_set"){
                    /* msg.content is of the form:
     			{
     				info: "config_value_set",
     				config_id: <cid>,
                         config_val: <cval>
     			}
                    where <cid> is a value of ConfigId
                    */

                    setConfigVal(msg.content.config_id, msg.content.config_val);
               }else if(msg.content.info === "config_value_request"){
                    /* msg.content is of the form:
     			{
     				info: "config_value_request",
     				config_id: <cid>
     			}
                    where <cid> is a value of ConfigId
                    */

                    //answer message with config[<cid>]
				return new Promise((resolve) => {
					resolve(config[msg.content.config_id]);
				});
               }
          }
     });
}
