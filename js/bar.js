/**
 * Copyright 2011 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author opensource@google.com
 * @license Apache License, Version 2.0.
 */

'use strict';

// Constants.
var RELOCATE_COOLDOWN_PERIOD_MS = 400;
var X_KEYCODE = 88;

// Global variables.
var queryEl = document.getElementById('query');
var resultsEl = document.getElementById('results');
var nodeCountEl = document.getElementById('node-count');

var nodeCountText = document.createTextNode('0');
nodeCountEl.appendChild(nodeCountText);

// Used by handleMouseMove() to enforce a cooldown period on relocate.
var mostRecentRelocateTimeInMs = 0;

var evaluateQuery = function() {
	var request = {
		'type' : 'evaluate',
		'query' : queryEl.value
	};
	chrome.extension.sendMessage(request);
};

var handleRequest = function(request, sender, callback) {
	// Note: Setting textarea's value and text node's nodeValue is XSS-safe.
	if (request['type'] === 'update') {
		if (request['query'] !== null) {
			queryEl.value = request['query'];
		}
		if (request['results'] !== null) {
			resultsEl.value = request['results'][0];
			nodeCountText.nodeValue = request['results'][1];
		}
	}
};

var handleMouseMove = function(e) {
	if (e.shiftKey) {
		// Only relocate if we aren't in the cooldown period. Note, the cooldown
		// duration should take CSS transition time into consideration.
		var timeInMs = new Date().getTime();
		if (timeInMs - mostRecentRelocateTimeInMs < RELOCATE_COOLDOWN_PERIOD_MS) {
			return;
		}
		mostRecentRelocateTimeInMs = timeInMs;

		// Tell content script to move iframe to a different part of the screen.
		chrome.extension.sendMessage({
			'type' : 'relocateBar'
		});
	}
};

var handleKeyDown = function(e) {
	if (e.keyCode === X_KEYCODE && e.ctrlKey && e.shiftKey) {
		chrome.extension.sendMessage({
			'type' : 'hideBar'
		});
	}
};

queryEl.addEventListener('keyup', evaluateQuery);
queryEl.addEventListener('mouseup', evaluateQuery);


// Add mousemove listener so we can detect Shift + mousemove inside iframe.
document.addEventListener('mousemove', handleMouseMove);
// Add keydown listener so we can detect Ctrl-Shift-X and tell content script to
// steal focus and hide bar.
document.addEventListener('keydown', handleKeyDown);

chrome.extension.onMessage.addListener(handleRequest);

var request = {
	'type' : 'height',
	'height' : document.documentElement.offsetHeight
};
chrome.extension.sendMessage(request);


var confirm = document.getElementById("submit-name");
confirm.addEventListener('click', recordMessage);

function recordMessage() {
	var st = window.localStorage;
	var key = document.getElementById("key-name").value;
	if(key == undefined || key == null || trim(key) == ""){
		alert("请填写键名称！");
		return;
	}
	for(var i = 0; i < st.length; i ++){
		if(st.key(i) == key){
	 		alert("已存在该名称，请重新输入！");
	 		return;
	 	}
	}
	
	var query = queryEl.value;
	if(query == undefined || query == null || trim(query) == ""){
		alert("请选择需要的元素生成xpath！");
		return;
	}
	
	var config = " ";
	var conf = document.getElementsByName("config");
	for(var i = 0; i < conf.length; i ++){
		if(conf[i].checked){
			config = conf[i].value;
			break;
		}
	}
	query += query + "," + config;
	
	if(key == undefined)
		return;
	var val = {
			'key' : key,
			'value' : query
		};
	chrome.runtime.sendMessage(val);
};

function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}