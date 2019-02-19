{
     const SENDER = "background_config_storage";

     //represents the current configuration
     let config;
     initConfig();

     /* init. current config with the the config which is stored in STORAGE(defined in shared)
     if these function is called for the first time after the installation of this webextension,
     it is also necessary to set all configuration-keys to the default value(defined in DEFAULT_CONFIG in shared) */
     async function initConfig(){
          let storageContainer = await STORAGE.get("config");
		config = storageContainer["config"];

          let changed = false;
          for(let cId of DEFAULT_CONFIG){
               if(config[cId] === undefined){
                    config[cId] = DEFAULT_CONFIG[cId];
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

     function setConfig(configId, val){
          config[configId] = val;

          updateStorage();
     }

     function getConfig(configId){
          return config[configId];
     }

     
}
