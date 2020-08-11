// ==UserScript==
// @name AdGuard Set Top and Bottom buttons
// @name:ja AdGuard 最上部/最下部 移動ボタン
// @description Set Top and Bottom buttons on your browser
// @description:ja 最上部/最下部へ移動するボタンをブラウザ上に追加します
// @version 1.11.1
// @author PermanentWave
// @homepageURL https://github.com/PermanentWave/SetTopAndBottomButtons
// @downloadURL https://github.com/PermanentWave/SetTopAndBottomButtons/raw/master/Set%20Top%20and%20Bottom%20Buttons.js
// @supportURL https://github.com/PermanentWave/SetTopAndBottomButtons/issues
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://github.com/PermanentWave/SetTopAndBottomButtons/blob/master/LICENSE
// @include *
// @icon http://github.com/PermanentWave.png
// @run-at document-end
// @grant none
// ==/UserScript==

// package
function SetTopBottomButtons( ) {

	// load element
	const letElement = fncSelectElement( );
	// timer
	let letUpTimer;
	let letDownTimer;
	let letIdleTimer;
	// up and down timeout (miliseconds)
	const constTimeOut = 0;
	// z-index (layer number)
	const constZIndex = 1001; // edit this value
	// y-position (%)
	const constYPosition = 55; // edit this value
	// idle timeout (milliseconds)
	const constIdleTimeOut = 2000; // edit this value
	// auto hide buttons (true:auto hide, false:always show)
	const constAutoHideMode = true; // edit this value

	// [1] skip all iframe 
	if ( window.self != window.top ) { return; };

	// create element
	function fncCreateElement( varNumber ) { return document.createElement( varNumber ); }; // end of function

	// select element
	function fncSelectElement( ) {
		// high priority used
		if ( 'scrollingElement' in document ) {
			return document.scrollingElement;
		// firefox
		} else if ( navigator.userAgent.indexOf( 'webkit' ) != -1 ) {
			return document.body;
		// browser expected firefox
		} else if ( 'documentElement' in document ) {
			return document.documentElement;
		// default
		} else {
			return document.body;
		} // end if
	}; // end of function

	// add style
	function fncAddStyle( varCSS ) {
		let letHtmlHeadElement = document.head || document.getElementsByTagName( 'head' )[0];
		if ( letHtmlHeadElement ) {
			let letStyle = fncCreateElement( "style" );
			letStyle.type = "text/css";
			letStyle.appendChild( document.createTextNode( varCSS ) );
			letHtmlHeadElement.appendChild( letStyle );
		} // end if

		return true;
	}; // end of function

	// move up
	function fncMoveUp( ) { 
		window.scrollTo( 0, 0 );
		letUpTimer = setTimeout( fncMoveUp, constTimeOut );

		return true;
	}; // end of function

	// move down
	function fncMoveDown( ) { 
		let letDocumentHeight = fncSelectElement( );
		let letBottom = letDocumentHeight.scrollHeight - letDocumentHeight.clientHeight;
		window.scrollTo( 0, letBottom );
		letDownTimer = setTimeout( fncMoveDown, constTimeOut );

		return true;
	}; // end of function

	// get y-position from top
	function fncScrollTop( varDocumentElement ) {
		let letScrollTop = window.pageYOffset || varDocumentElement.scrollTop;

		return letScrollTop;
	}; // end of function

	// get y-position from bottom
	function fncScrollBottom( varDocumentElement ) {
		let letScrollTop = fncScrollTop( varDocumentElement );
		let letScrollHeight = varDocumentElement.scrollHeight;
		let letClientHeight = varDocumentElement.clientHeight;
		let letClientTop = varDocumentElement.clientTop;
		let letScrollBottom = letScrollHeight - letClientHeight - letClientTop - letScrollTop;

		return letScrollBottom;
	}; // end of function

	// document scroll
	function fncGetScroll( ) { return ( letElement.clientHeight < letElement.scrollHeight ); }; // end of function

	// add css
	function fncShareCSS( ){ 
		// variables
		let letString = '';
		let letImgUp;
		let letImgDown;

		// img vs button
		letImgUp = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=';
		letImgDown = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==';
		// button id
		letString += '#play_btn_up { position:fixed; right:0; bottom:' + constYPosition + '%;z-index:' + constZIndex + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgUp + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString += '#play_btn_dn { position:fixed; right:0; top:' + constYPosition + '%;  z-index:' + constZIndex + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgDown + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		// button class
		letString += '.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
		letString += '.play_btn:hover { opacity:1; }'; 
		// append
		fncAddStyle( '' + letString );

		return true;
	}; // end of function

	// main
	function fncCreateButtonElement( ) { 
		let letUpButton;
		let letDownButton;
		let letHeight = fncGetScroll( );
		let letClickFlag = 0;

		// exit function
		if( !letHeight ) { return; }; // end if

		// add css
		fncShareCSS( ); 

		// if loading element
		if( letElement ){ 
			// create DOM element
			letUpButton = fncCreateElement( 'span' );
			letDownButton = fncCreateElement( 'span' );
			// set attribute
			letUpButton.setAttribute( 'id', 'play_btn_up' );
			letDownButton.setAttribute( 'id', 'play_btn_dn' );
			// set class
			letUpButton.className = "play_btn";
			letDownButton.className = "play_btn";
			// append element
			document.body.appendChild( letUpButton );
			document.body.appendChild( letDownButton );

			// scroll
			let letScrollTop = fncScrollTop( letElement );
			// if scroll 
			letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";

			// switch visible buttons
			function fncVisibleButtons( ) {
				let letScrollTop = fncScrollTop( letElement );
				let letScrollBottom = fncScrollBottom( letElement );

				letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";
				letDownButton.style.display = ( letScrollBottom >= 1 ) ? "" : "none"; // remove digits after decimal point

				return true;
			}; // end function

			// switch invisible buttons
			function fncInvisibleButtons( ) {
				if ( constAutoHideMode ) {
					letUpButton.style.display = "none";
					letDownButton.style.display = "none";
				} // end if

				return true;
			}; // end function

			// reset timer
			function fncRestartTimer( ) {
				fncVisibleButtons( );
				clearTimeout( letIdleTimer );
				letIdleTimer = setTimeout( fncInvisibleButtons, constIdleTimeOut );

				return true;
			}; // end function

			// onscroll event
			function fncOnScroll( ) {
				let letScrollTop = fncScrollTop( letElement );
				let letScrollBottom = fncScrollBottom( letElement );

				// if scroll up
				letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";
				// if scroll down
				letDownButton.style.display = ( letScrollBottom >= 1 ) ? "" : "none"; // remove digits after decimal point

				// if click
				if ( letClickFlag < 0 ) { // invisible top button if click top button
					letUpButton.style.display = "none";
					letClickFlag = 0;
				} else if ( letClickFlag > 0 ) { // invisible buttom button if click buttom button
					letDownButton.style.display = "none";
					letClickFlag = 0;
				} // end if

				return true;
			}; // end function

			// add event loading
			window.addEventListener( 'load', fncRestartTimer, false );

			// add event click up button
			letUpButton.addEventListener( 'click', fncMoveUp, false );
			letUpButton.addEventListener( 'click', function( ){ clearTimeout( letUpTimer ); }, false );
			letUpButton.addEventListener( 'click', function( ){ letClickFlag = -1; }, false );
			// add event click down button
			letDownButton.addEventListener( 'click', fncMoveDown, false );
			letDownButton.addEventListener( 'click', function( ){ clearTimeout( letDownTimer ); }, false );
			letDownButton.addEventListener( 'click', function( ){ letClickFlag = 1; }, false );

			// add event scroll
			window.addEventListener( 'scroll', fncRestartTimer, false );
			window.addEventListener( 'scroll', fncOnScroll, false );
		} // end if

		return true;
	}; // end of function

	// run it
	fncCreateButtonElement( );

	return true;
}; // end of function

// call
SetTopBottomButtons( );
