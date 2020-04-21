/*
Parameters:
config: {
	anchorSelector: <Aray of Strings>,						//not optional
	characterDataSelectors: {(key: <Array of Strings>,)+},	//not optional
	[observeOnCharacterData: ("any"|"all")]					//optional, default: "all"
},
onObserved: function with signature (
	anchor: Element,
	characterDatas: {
		(key: <String>,)+
	},
	characterDataParents: {
		(key: <Element>,)+
	},
	config: <Object>
) -> undefined.

Semantic of config
anchorSelector: An Array of selector-Strings [selector_0, selector_1, ..., selector_n] which describes how to find an existing or future Element of
$($($(window.document).find(selector_0)).find(selector_1))...).find(selector_n) which shall be observed for characterData changes according to characterDataSelectors.

characterDataSelectors: {
	(key: selector,)+
}
where key is a user-defined String which is later passed as a property of characterDatas and characterDataParents in onObserved.
and selector is an Array of selector-Strings [selector_0, selector_1, ..., selector_n] which describes how to find an existing or future Element
$($($(anchor).find(selector_0)[0]).find(selector_1)[0])...).find(selector_n)[0] which is observed for characterData changes.

observeOnCharacterData:
Let anchorSelector be an Array of selector-Strings [anchor_0, anchor_1, ..., anchor_m].
Let (key, selector) be a key-value-pair defined in characterDataSelectors with selector being an Array of selector-Strings [selector_0, selector_1, ..., selector_n].

If observeOnCharacterData is "any":
onObserved(anchor, characterDatas, characterDataParents, config) is called with
anchor being of $($($(window.document).find(anchor_0)).find(anchor_1))...).find(anchor_n),
characterDatas being {key: characterData}
	with characterData being the newly observed characterData in $($($(anchor).find(selector_0)[0]).find(selector_1)[0])...)[0].find(selector_n)[0],
characterDataParents being {[key: characterDataParent]+}
	with characterDataParent being the Element $($($(anchor).find(selector_0)[0]).find(selector_1)[0])...)[0].find(selector_n)[0]
	for every (key, selector) in characterDataSelectors with selector being being an Array of selector-Strings [selector_0, selector_1, ..., selector_n],
and config being the config-parameter the Observer-constructor was called with.

If observeOnCharacterData is "all", onObserved(anchor, characterDatas, characterDataParents, config) is called with
anchor, characterDataParents and config being as explained in the case of "any" above
and characterDatas being {(key: characterData,)+}
	with characterData being the newly observed characterData in $($($(anchor).find(selector_0)[0]).find(selector_1)[0])...)[0].find(selector_n)[0]
	for every (key, selector) in characterDataSelectors with selector being being an Array of selector-Strings [selector_0, selector_1, ..., selector_n],
when new characterData was observed for every key at least ones.
*/

//completes the passed config by adding missing default values
function completeConfig(config){
	if(config.observeOnCharacterData === undefined){
		config.observeOnCharacterData = "all";
	}
}

function onCharacterDataObserved(characterDataParent, config, _config, onObserved, anchor, characterDatas, characterDataParents, characterDatasKey){
	let characterData = characterDataParent.innerText.trim();

	if(config.observeOnCharacterData === "all"){
		//update characterDatas
		characterDatas[characterDatasKey] = characterData;

		//check if all characterDatas were found
		if(Object.keys(characterDatas).length === Object.keys(config.characterDataSelectors).length){
			onObserved(anchor, Object.assign({}, characterDatas), characterDataParents, _config);

			//reset characterDatas
			for(let prop in characterDatas){
				delete characterDatas[prop];
			}
		}
	}else if(config.observeOnCharacterData === "any"){
		//only include the newly found characterData in characterDatas-paramter of onObserved

		onObserved(anchor, {[characterDatasKey]: characterData}, characterDataParents, _config);
	}
}

//builds a MutationSummary-chain which always only follows the first found Element
function createCharacterDataObserverRec(characterDataSelectorIndex, subCharacterData, observers, config, _config, onObserved, anchor, characterDatas, characterDataParents, characterDatasKey){
	let characterDataSelector = config.characterDataSelectors[characterDatasKey];

	if(characterDataSelectorIndex < characterDataSelector.length){
		//find current Elements of $($($(anchor).find(characterDataSelector[0])[0]).find(characterDataSelector[1])[0]...).find(characterDataSelector[characterDataSelectorIndex])
		let subSubCharacterDatas = $(subCharacterData).find(characterDataSelector[characterDataSelectorIndex]);

		if(subSubCharacterDatas.length > 0){
			createCharacterDataObserverRec(characterDataSelectorIndex+1, subSubCharacterDatas[0], observers, config, _config, onObserved, anchor, characterDatas, characterDataParents, characterDatasKey);
		}else{
			let firstTime = true;

			//create new MutationSummary to find the next future Element of $($($(anchor).find(characterDataSelector[0])).find(characterDataSelector[1])...).find(characterDataSelector[characterDataSelectorIndex])
			observers.push(new MutationSummary({
				callback: (summaries) => {
					if(firstTime && summaries.length > 0){
						if(summaries[0].added.length > 0){
							//only the first found Element is observed
							firstTime = false;

							createCharacterDataObserverRec(characterDataSelectorIndex+1, summaries[0].added[0], observers, config, _config, onObserved, anchor, characterDatas, characterDataParents, characterDatasKey);
						}
					}
				},
				rootNode: subCharacterData,
				queries: [{element: characterDataSelector[characterDataSelectorIndex]}]
			}));
		}
	}else{
		//update characterDataParents
		characterDataParents[characterDatasKey] = subCharacterData;

		//observe current characterData
		onCharacterDataObserved(subCharacterData, config, _config, onObserved, anchor, characterDatas, characterDataParents, characterDatasKey);

		observers.push(new MutationSummary({
			callback: (summaries) => {
				for(let summary of summaries){
					if(summary.added.length === 1 && summary.removed.length === 1 || summary.valueChanged.length === 1){
						onCharacterDataObserved(subCharacterData, config, _config, onObserved, anchor, characterDatas, characterDataParents, characterDatasKey);
					}
				}
			},
			rootNode: subCharacterData,
			queries: [{characterData: true}]
		}));
	}
}

function createCharacterDataObserver(observers, config, _config, onObserved, anchor, characterDatasFound, characterDataParents, characterDatasKey){
	createCharacterDataObserverRec(0, anchor, observers, config, _config, onObserved, anchor, characterDatasFound, characterDataParents, characterDatasKey);
}

function onAnchorFound(observers, config, _config, onObserved, anchor){
	let characterDatas = {};
	let characterDataParents = {};

	for(let key in config.characterDataSelectors){
		createCharacterDataObserver(observers, config, _config, onObserved, anchor, characterDatas, characterDataParents, key);
	}
}

//builds a MutationSummary-tree
function createaAnchorObserverRec(anchorSelectorIndex, subAnchor, observers, config, _config, onObserved){
	if(anchorSelectorIndex < config.anchorSelector.length-1){
		//find current Elements of $($($(document).find(config.anchorSelector[0])).find(config.anchorSelector[1])...).find(config.anchorSelector[anchorSelectorIndex])
		for(let subSubAnchor of $(subAnchor).find(config.anchorSelector[anchorSelectorIndex])){
			createaAnchorObserverRec(anchorSelectorIndex+1, subSubAnchor, observers, config, _config, onObserved);
		}

		//create new MutationSummary to find future Elements of $($($(document).find(config.anchorSelector[0])).find(config.anchorSelector[1])...).find(config.anchorSelector[anchorSelectorIndex])
		observers.push(new MutationSummary({
			callback: (summaries) => {
				for(let summary of summaries){
					for(let subSubAnchor of summary.added){
						createaAnchorObserverRec(anchorSelectorIndex+1, subSubAnchor, observers, config, _config, onObserved);
					}
				}
			},
			rootNode: subAnchor,
			queries: [{element: config.anchorSelector[anchorSelectorIndex]}]
		}));
	}else{
		//find current Elements of $($($(document).find(config.anchorSelector[0])).find(config.anchorSelector[1])...).find(config.anchorSelector[config.anchorSelector.length-1])
		for(let anchor of $(subAnchor).find(config.anchorSelector[anchorSelectorIndex])){
			onAnchorFound(observers, config, _config, onObserved, anchor);
		}

		//create new MutationSummary to observe future Elements of $($($(document).find(config.anchorSelector[0])).find(config.anchorSelector[1])...).find(config.anchorSelector[config.anchorSelector.length-1])
		observers.push(new MutationSummary({
			callback: (summaries) => {
				for(let summary of summaries){
					for(let anchor of summary.added){
						onAnchorFound(observers, config, _config, onObserved, anchor);
					}
				}
			},
			rootNode: subAnchor,
			queries: [{element: config.anchorSelector[anchorSelectorIndex]}]
		}));
	}
}

function Observer(_config, onObserved){
	this.observers = [];

	let config = Object.assign({}, _config);
	completeConfig(config);

	try{
		createaAnchorObserverRec(0, document, this.observers, config, _config, onObserved);
	}catch(exception){
		//print exception to console s.t. not properly working selectors (due to changes in Youtube-HTML or mistakes by a developer) can be found easily
		console.debug(exception);
	}
}

function disconnect(){
	while(this.observers.length > 0){
		this.observers.pop().disconnect();
	}
}

Observer.prototype.constructor = Observer;

Observer.prototype.disconnect = disconnect;
