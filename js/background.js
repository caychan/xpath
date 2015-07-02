'use strict';

var xpath, copyXPathId;
var st = window.localStorage;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	var key = message.key;
	var value = message.value;
	if(key == undefined || key == "undefined")
		return;
	//将键值对写进localStorage
	st.setItem(key, value);
});


/*chrome.contextMenus.create({
    type:'normal',
	title : "copy xpath",
	contexts : ["selection"],
	onclick : copy
	
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	value += message;
    if(message == 'Hello'){
        sendResponse('Hello from background.');
    }
});


function copy(info, tab) {
	
//	chrome.runtime.

	
	var text = info.selectionText.toString();
	//确定选中了内容
	if(text == undefined || text == null || text.trim() == ""){
		alert("请选择内容！");
		return;
	} 
	//确定填写了逗号
	if(text.indexOf(",") == -1 && text.indexOf("，") == -1){
		alert("使用逗号隔开键值对！");
		return;
	}
	var kv = null;
	//根据分号分割开键值
	if(text.indexOf(",") > 0){
		kv = text.split(",");
	} else if(text.indexOf("，") > 0){
		kv = text.split("，");
	} 
	//确定填写了名称
	if(kv[1] == null || (kv[1].replace(/(^\s*)|(\s*$)/g, "")) == ""){
		alert("请填写名称！");
		return;
	}
	//名称不能重复
	if(kv.length == 2){
		var storage = window.localStorage;
	 	for(var i=0; i < storage.length; i++){
	 		if(storage.key(i) == kv[1]){
	 			alert("已存在该名称，请重新输入！");
	 			return;
	 		}
	 	}
	 	//将键值对存进localStorage里
		localStorage.setItem(kv[1],kv[0]);
	} else{
		alert("操作失败，请重试！");
	}
}*/


function handleRequest(request, sender, callback) {
  // Simply relay the request. This lets content.js talk to bar.js.
  chrome.tabs.sendMessage(sender.tab.id, request, callback);
}
chrome.extension.onMessage.addListener(handleRequest);
