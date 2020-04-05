/*
Observer:
Runs onObserverd on all current and future Elements of $(window.document).find(config.anchorSelector), if config.observeOnAnchor is true
by creating a new MutationSummary for all future Elements of $(window.document).find(config.anchorSelector).
On any found Element anchor of $(config.anchorSelector), a new MutationSummary is created
which observes newly added characterData on Elements describe by config.characterDataSelectors.
Depending on config.observeOnCharacterData, onObserved is called if newly added characterData
was found for any or for all Elements described by config.characterDataSelectors.

Parameters:
config: {
	anchorSelector: <String>,
	[observeOnAnchor: <Boolean>,] 			//default: true
	[characterDataSelectors: <Object>,]		//default: {}
	[observeOnCharacterData: ("any"|"all")]	//default: "all"
}

onObserved: <Function>

Semantic of config
anchorSelector: A selector which defines the properties of Elements (descendants of window.document) which shall be observed.

observeOnAnchor: If and only if observeOnAnchor is true, onObserved(...) is called on any newly found anchor in $(anchorSelector).

characterDataSelectors: {
	[key: selectors,]+
}
where key is a user-defined String which is later passed as a part of a parameter in onObserved
and selectors is an Array of selector-Strings [selector_0, selector_1, ..., selector_n] which describe how to find an Element
$($($(anchor).find(selector_0)).find(selector_1))...).find(selector_n)[0] which is observed for characterData changes.

observeOnCharacterData:
Let (key, selectors) be a key-value-pair defined in characterDataSelectors.
If observeOnCharacterData is "any", onObserved(anchor, characterDatas) is called with
anchor being of $(window.document).find(config.anchorSelector) and characterDatas being {key: characterData} with
characterData the newly observed characterData in $($($(anchor).find(selector_0)[0]).find(selector_1)[0])...)[0].find(selector_n)[0].
If observeOnCharacterData is "all", onObserved(anchor, characterDatas) is called with
anchor being of $(window.document).find(config.anchorSelector) and characterDatas containing (key, characterData) key-value-pairs
for all (key, selectors) key-value-pairs defined in characterDataSelectors, when new characterData was observed for every (key, selectors) key-value-pair
at least ones.

Semantic of onObserved
onObserved(anchor, characterDatas) where

anchor: An Element which is of $(window.document).find(config.anchorSelector).

characterDatas: {
	[key: characterData]+
}
where key was defined by user in config.characterDataSelectors and characterData is the newly observed characterData
in $($($(anchor).find(selector_0)).find(selector_1))...).find(selector_n)[0]
for a given Array of selector-Strings [selector_0, selector_1, ..., selector_n] by the user in config.characterDataSelector.
*/

//completes the passed config by adding missing default values
function completeConfig(config){
	if(config.observeOnAnchor === undefined){
		config.observeOnAnchor = true;
	}

	if(config.characterDataSelectors === undefined){
		config.characterDataSelectors = {};
	}

	if(config.observeOnCharacterData === undefined){
		config.observeOnCharacterData = "all";
	}
}

//creates characterDatas-parameter for onObserved
function createCharacterDatas(config, anchor){
	let characterDatas = {};

	for(let key in config.characterDataSelectors){
		let characterDataParent = anchor;
		for(let selector of config.characterDataSelectors[key]){
			characterDataParent = $(characterDataParent).find(selector)[0];
		}

		characterDatas[key] = characterDataParent.innerHTML.trim();
	}

	return characterDatas;
}

function initCharacterDatasFound(config, characterDatasFound){
	for(let key in config.characterDataSelectors){
		characterDatasFound[key] = 0;
	}
}

//returns true if and only if every characterData was found at least ones
function allCharaterDatasFound(characterDatasFound){
	for(let timesFound of Object.values(characterDatasFound)){
		if(timesFound === 0){
			return false;
		}
	}

	return true;
}

function createCharacterDataObserver(config, _config, onObserved, anchor, characterDatasFound, characterDatasKey){
	let characterDataParent = anchor;
	for(let selector of config.characterDataSelectors[characterDatasKey]){
		characterDataParent = $(characterDataParent).find(selector)[0];
	}

	return new MutationSummary({
		callback: (summaries) => {
			for(let summary of summaries){

				let newCharacterData;
				if(summary.added.length === 1 && summary.removed.length === 1){
					newCharacterData = summary.added[0].data.trim();
				}else if(summary.valueChanged.length === 1){
					newCharacterData = summary.valueChanged[0].data.trim();
				}

				if(newCharacterData !== undefined){
					if(config.observeOnCharacterData === "all"){
						//update characterDatasFound
						characterDatasFound[characterDatasKey]++;

						if(allCharaterDatasFound(characterDatasFound)){
							onObserved(anchor, createCharacterDatas(config, anchor), _config);

							//reset characterDatasFound
							initCharacterDatasFound(config, characterDatasFound);
						}
					}else if(config.observeOnCharacterData === "any"){
						//ignore characterDatasFound because any new characterData was found (namely characterData for characterDatasKey)

						//build characterDatas-parameter for onObserved
						let characterDatas = {};
						characterDatas[characterDatasKey] = summary.added[0].data.trim();

						//call onObserved with
						onObserved(anchor, characterDatas, _config);
					}
				}
			}
		},
		rootNode: characterDataParent,
		queries: [{characterData: true}]
	});
}

function onAnchorFound(observers, config, _config, onObserved, anchor){
	let characterDatasFound = {};
	initCharacterDatasFound(config, characterDatasFound);

	if(config.observeOnAnchor){
		onObserved(anchor, createCharacterDatas(config, anchor), _config);
	}

	for(let key in config.characterDataSelectors){
		observers.push(createCharacterDataObserver(config, _config, onObserved, anchor, characterDatasFound, key));
	}
}

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
