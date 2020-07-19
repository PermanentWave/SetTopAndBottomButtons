// ==UserScript==
// @name Set Top and Bottom buttons
// @description Set Top and Bottom buttons on browser (no Jquery) 
// @version 1.04
// @author PermanentWave
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://opensource.org/licenses/mit-license.php
// @include *
// @icon https://pbs.twimg.com/profile_images/1247511314965999621/dVQak652_400x400.png
// @run-at document-end
// @grant none
// ==/UserScript==

// [1] skip all iframe 
if (window.self!=window.top) {return}

// create element
function fncCreateElement(varNumber) { return document.createElement(varNumber); } // end of function

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

// global variables
var varPosition, 
// figure out if this is moz || IE because they use documentElement
varHtmlElement = (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('MSIE') != -1) ? document.documentElement : document.body,
// timer
varUpTimer, varDownTimer,
// speed by
varTimeOut = 0,  // edit this value
// z-index
varZIIndex = 1001;       // edit this value

// move up
function fncMoveUp() { 
    window.scrollTo(0, 0);
    varUpTimer = setTimeout(fncMoveUp, varTimeOut);
} // end of function

// move down
function fncMoveDown() { 
    var varDocumentElement = document.documentElement;
    var varBottom = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    window.scrollTo(0, varBottom*1.05);
    varDownTimer = setTimeout(fncMoveDown, varTimeOut);
} // end of function

// document height
function getDocumentHeight() {
	return (document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
} // end of function

// document scroll
function get_scroll(varScrolledStep) {
    var varDocument = document,
        varDocumentBody = varDocument.body,
        varDocumentElement = varDocument.documentElement,
        varClient = "client" + varScrolledStep,
        varScrolledStep = "scroll" + varScrolledStep;
    return /CSS/.test(varDocument.compatMode)? (varDocumentElement[varClient]< varDocumentElement[varScrolledStep]) : (varDocumentBody[varClient]< varDocumentBody[varScrolledStep])
} // end of function

// calk
function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20,
        newDuration = (typeof(duration) === 'undefined') ? 500: duration;
		
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, newDuration);                        
        element.scrollTop = val; 
        if(currentTime < newDuration) { setTimeout(animateScroll, increment); }
    };
    animateScroll();
} // end of function

// easing
Math.easeInOutQuad = function (varCurrentTime, varStartValue, varChangeInValue, varDuration) {
    varCurrentTime /= varDuration/2;
    if (varCurrentTime < 1) return varChangeInValue/2 * varCurrentTime * varCurrentTime + varStartValue;
    varCurrentTime--;
    return -varChangeInValue/2 * (varCurrentTime * (varCurrentTime - 2) - 1) + varStartValue;
};

// add css
function fucShareCSS(){ 
    // variables
    var varString='', varImgUp, varImgDown; 
	
	// img vs button
    varImgUp = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=';
	varImgDown = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==';
    // button id
    varString+='#play_btn_up { position:fixed; right:0; bottom:55%;z-index:'+varZIIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgUp+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
    varString+='#play_btn_dn { position:fixed; right:0; top:55%;   z-index:'+varZIIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgDown+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
    // button class
    varString+='.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
    varString+='.play_btn:hover { opacity:1; }'; 
	// append
    fncAddStyle(''+varString);
} // end of function

// main
function create_btn_element() { 
    // get scroll
	var varUpButton, varDownButton, 
	    varScrolled,
	    varHeight = get_scroll('Height');
    // exit
    if(!varHeight) { return; } // end if
	
	// add css
	fucShareCSS(); 

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
		varScrolled = window.pageYOffset || document.documentElement.scrollTop;
		// if scroll 
		varUpButton.style.display = (varScrolled > 0)  ? "" : "none";
		

		// add event click
        varUpButton.addEventListener('click', fncMoveUp, false);
		varUpButton.addEventListener('click', function(){clearTimeout(varUpTimer);}, false);
		
		varDownButton.addEventListener('click', fncMoveDown, false);
        varDownButton.addEventListener('click', function(){clearTimeout(varDownTimer);}, false);

		
		// add event scroll
		window.onscroll = function() { 
            var varScrolled = window.pageYOffset || document.documentElement.scrollTop, 
            varDiffHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			// if scroll up
			varUpButton.style.display = (varScrolled > 0)  ? "" : "none";
			// if scroll down
			varDownButton.style.display = (varDiffHeight >= varScrolled)  ? "" : "none";
		}; // end of function
	} // end if
} // end of function

// run it
create_btn_element();
