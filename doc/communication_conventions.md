## Communication Conventions

### 1 Syntax of a message

#### 1.1 Syntax of a message-object
```
{
	sender: <Communication ID>,
	receiver: <Communication ID>,
	info: <Info>,
	[content: <Value>]
}
```
where `<Communication ID>` is of type `String`,
`<Info>` is of type `String`
and `<Value>` is of type `Object`.

#### 1.2 Syntax of &lt;Communication ID&gt;
`<Communication ID>` (or `CID`) is an identifying `String` and is determined like this:
Let's say `<bar>.js` is a file which sends or receives messages.
If the file path of `<bar>.js` is
- `*/src/ui/<foo>/js/<bar>.js`,  `CID` is `"<foo>_<bar>"`.
- `*/src/content/<bar>.js`,  `CID` is `"content_<bar>"`.
- `*/src/background/<bar>.js`,  `CID` is `"background_<bar>"`.

#### 1.3 Syntax of &lt;Info&gt;
`<Info>` is a `String` which may contain any number
of words (containing **lower-case characters ONLY**) which are seperated by underscores `_`.
If the message is answered with an `Object`, the last word of `<Info>` must be `request`.

##### Example
```javascript
add                   //valid <Info> which does not receive an answer.
context_switch        //valid <Info> which does not receive an answer.
filter_value_request  //valid <Info> which does receive an answer.

get_filter_value	  //invalid <Info> assuming it receives an answer (implied by 'get').
contextSwitch         //invalid <Info> because of usage of an upper-case character
                      //and missing '_' between words
```

#### 1.4 Syntax of &lt;Value&gt;
`<Value>` is of type `Object` whose keys may contain any number of words (containing **lower-case characters ONLY**) which are seperated by underscores `_`
##### Example
```javascript
"my precious data"        //valid <Value>

{                         //valid <Value>
	html_data: "<html/>",
}

{                         //invalid <Value> because of usage of an upper-case character
	htmlData: ""          //and missing '_' between words
	url: "foo.bar"
}
```

### 2 Implementing code for sending or receiving messages

#### 2.1 Syntax of code which implements sending messages
Every message-object shall receive its own `create<CInfo>Msg(...)` `function`,
where `<CInfo>` is derived from `<Info>` of the message like this:  
The first character of every word except for the first one in `<Info>`
is made to upper-case and underscores `_` are removed.  
`function` parameters are also described in the Java convention for variable-names.  
If the value of a key in the message-object is passed via a parameter of the `function`,
the parameter-variable-name is derived from the key like `<CInfo>` from `<Info>`.

##### Example
Consider the implementations for the following message object.
```
{
	sender: "bob_pc",
	receiver: "alice_smartphone",
	info: "love_letter",
	content: {
		text_data: <String>,
		image: <String>
	}
}
```

```javascript
function createLoveLetterMsg(textData, image){        //valid create<CInfo>Msg() function
	return {
		sender: "bob_pc",
		receiver: "alice_smartphone",
		info: "love_letter",
		content: {
			text_data: textData,
			image: image
		}
	}
}

function createLoveConfessionMsg(text_data, picture){  //invalid create<CInfo>Msg() function because
	return {                                           //parameter text_data (not in Java-convention),
		sender: "bob_pc",                              //parameter picture (must be image)
		receiver: "alice_smartphone",                  //and 'Confession' instead of 'Letter' in function-name
		info: "love_letter",
		content: {
			text_data: text_data,
			image: picture
		}
	}
}
```

##### Template

```javascript
const SENDER = "typex_sender_name";

function createInfoNameMsg(keyData){
	return {
		sender: SENDER,
		receiver: "typey_receiver_name",
		info: "info_name",
		content: {
			key_data: keyData
		}
	}
}

browser.runtime.sendMessage(createInfoNameMsg(42));
browser.tabs.sendMessage(<TabID>, createInfoNameMsg(42));
```

#### 2.2 Syntax of code which implements receiving messages
- `if`-branches which are testing for `msg.content.info` are **NOT ALLOWED**
inside the scope of `if`-branches which are testing `msg.sender`.
- `if`-branches which are testing `msg.sender` **MUST BE** inside the scope of
`if`-branches which are testing for `msg.content.info`.
- Before a message is processed `msg.sender` and `msg.info` **must both be tested**,
**even if the receiver only receives on kind of messages or only receives messages from
one sender.** (This is because of upward-compatibility.)
- A documentation describing the possible senders of messages for a specific listener, **MUST BE** added
textually before the installment of the listener. **For the syntax of the documentation refer to the following template.**
- Directly at the beginning of the scope of an `if`-branch which tests for `msg.info`,
`msg.content` must be documented. **For the syntax of the documentation refer to the following template.**

##### Template
```javascript
const SENDER = "typea_sender_name";

/*
INSTALLING LISTENER FOR MESSAGES FROM typex-, typey- and typez-scripts
*/

browser.runtime.onMessage.addListener((msg, sender) => {
	if(msg.receiver !== SENDER)
		return;

	if(msg.info === "info_name_a"){
		/* msg.content is of the form:
		{
			some_key: <Value>
		}
		where <Value> is of type CLASS
		*/

		if(msg.sender === "typex_sender_name" || msg.sender === "typey_sender_name"){
			//DO SOMETHING
		}

		if(msg.sender === "typez_sender_name"){
			//DO SOMETHING ELSE
		}
	}

	if(msg.info === "info_name_b"){
		/* msg.content is of the form:
		"just_some_string_request"
		*/

		if(msg.sender === "typez_sender_name"){
			return new Promise((resolve) => {
				resolve("just some string");
			});
		}
	}
});
```
