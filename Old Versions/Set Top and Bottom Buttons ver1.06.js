// ==UserScript==
// @name Set Top and Bottom buttons
// @description Set Top and Bottom buttons on your browser
// @version 1.06
// @author PermanentWave
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://opensource.org/licenses/mit-license.php
// @include *
// @icon https://avatars0.githubusercontent.com/u/68002384
// @run-at document-end
// @grant none
// ==/UserScript==

// [1] skip all iframe 
if (window.self!=window.top) {return}

// create element
function fncCreateElement(varNumber) { return document.createElement(varNumber); } // end of function

// select element
function fncDocumentHeight() {
	if ('scrollingElement' in document) {
		return document.scrollingElement;
	} else if (navigator.userAgent.indexOf('webkit') != -1) {
		return document.body;
	} else if ('documentElement' in document) {
		return document.documentElement;
	} else {
		return document.body;
	} // end if
}  // end of function

// add style
function fncAddStyle(varCSS) {
	var varHtmlHeadElement = document.head || document.getElementsByTagName('head')[0];
	if (varHtmlHeadElement) {
		var varStyle = fncCreateElement("style");
		varStyle.type = "text/css";
		varStyle.appendChild(document.createTextNode(varCSS));
		varHtmlHeadElement.appendChild(varStyle);
	} // end if
} // end of function

// figure out if this is moz || IE because they use documentElement
var varHtmlElement = fncDocumentHeight();
// timer
var varUpTimer;
var varDownTimer;
// speed by
var varTimeOut = 0; // edit this value
// z-index
var varZIndex = 1001; // edit this value

// move up
function fncMoveUp() { 
	window.scrollTo(0, 0);
	varUpTimer = setTimeout(fncMoveUp, varTimeOut);
} // end of function

// move down
function fncMoveDown() { 
	var varDocumentHeight = fncDocumentHeight();
	var varBottom = varDocumentHeight.scrollHeight - varDocumentHeight.clientHeight;
	window.scrollTo(0, varBottom*1.05); // +5% over scroll
	varDownTimer = setTimeout(fncMoveDown, varTimeOut);
} // end of function

// document scroll
function fncGetScroll(varScrolledStep) { 
	var varDocument = document;
	var varDocumentBody = varDocument.body;
	var varDocumentElement = varDocument.documentElement;
	var varClient = "client" + varScrolledStep;
	var varScrolledStep = "scroll" + varScrolledStep;
	return /CSS/.test(varDocument.compatMode)? (varDocumentElement[varClient]< varDocumentElement[varScrolledStep]) : (varDocumentBody[varClient]< varDocumentBody[varScrolledStep])
} // end of function

// add css
function fncShareCSS(){ 
	// variables
	var varString='';
	var varImgUp;
	var varImgDown;
	
	// img vs button
	varImgUp = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=';
	varImgDown = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==';
	// button id
	varString+='#play_btn_up { position:fixed; right:0; bottom:55%;z-index:'+varZIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgUp+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
	varString+='#play_btn_dn { position:fixed; right:0; top:55%;   z-index:'+varZIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgDown+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
	// button class
	varString+='.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
	varString+='.play_btn:hover { opacity:1; }'; 
	// append
	fncAddStyle(''+varString);
} // end of function

// main
function fncCreateButtonElement() { 
	// get scroll
	var varUpButton;
	var varDownButton;
	var varScrollTop;
	var varDocumentHeight = fncDocumentHeight();
	var varHeight = fncGetScroll('Height');
	var varClickFlag = 0;
	// exit	var
	if(!varHeight) { return; } // end if
	
	// add css
	fncShareCSS(); 

	// if 
	if(varHtmlElement){ 
		// create DOM element
		varUpButton = fncCreateElement('span');
		varDownButton = fncCreateElement('span');
		// set attribute
		varUpButton.setAttribute('id','play_btn_up');
		varDownButton.setAttribute('id','play_btn_dn');
		// set class
		varUpButton.className = "play_btn";
		varDownButton.className = "play_btn";
		// append element
		document.body.appendChild(varUpButton);
		document.body.appendChild(varDownButton);
		
		// scroll
		varScrollTop = window.pageYOffset || varDocumentHeight.scrollTop;
		// if scroll 
		varUpButton.style.display = (varScrollTop > 0)  ? "" : "none";
		
		// add event click
		varUpButton.addEventListener('click', fncMoveUp, false);
		varUpButton.addEventListener('click', function(){clearTimeout(varUpTimer);}, false);
		varUpButton.addEventListener('click', function(){varClickFlag = -1;}, false);
		
		varDownButton.addEventListener('click', fncMoveDown, false);
		varDownButton.addEventListener('click', function(){clearTimeout(varDownTimer);}, false);
		varDownButton.addEventListener('click', function(){varClickFlag = 1;}, false);
		
		// if scroll
		window.onscroll = function() { 
			var varScrollTop = window.pageYOffset || varDocumentHeight.scrollTop;
			var varScrollHeight = varDocumentHeight.scrollHeight;
			var varClientHeight = varDocumentHeight.clientHeight;
			var varClientTop = varDocumentHeight.clientTop;
			
			// if scroll up
			varUpButton.style.display = (varScrollTop > 0)  ? "" : "none";
			// if scroll down
			varDownButton.style.display = (varScrollHeight - varClientHeight - varClientTop - varScrollTop > 0 )  ? "" : "none";
			// if click
			if (varClickFlag < 0) {
				varUpButton.style.display = "none";
				varClickFlag = 0;
			} else if (varClickFlag > 0) {
				varDownButton.style.display = "none";
				varClickFlag = 0;
			} // end if
		}; // end of function
		
	} // end if
} // end of function

// run it
fncCreateButtonElement();
