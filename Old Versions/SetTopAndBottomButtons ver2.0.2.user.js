// ==UserScript==
// @name Set buttons to jump to top and bottom
// @name:ja 最上部/最下部 移動ボタン追加
// @description Set buttons to jump to top and bottom on the Web page. The primary use is userscript extension for AdGuard.
// @description:ja 最上部/最下部へ移動するボタンをブラウザ上に追加します
// @version 2.0.2
// @author PermanentWave
// @homepageURL https://github.com/PermanentWave/SetTopAndBottomButtons
// @updateURL https://raw.githubusercontent.com/PermanentWave/SetTopAndBottomButtons/master/SetTopAndBottomButtons.user.js
// @supportURL https://github.com/PermanentWave/SetTopAndBottomButtons/issues
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://github.com/PermanentWave/SetTopAndBottomButtons/blob/master/LICENSE
// @include *
// @icon http://github.com/PermanentWave.png
// @run-at document-end
// @grant none
// ==/UserScript==

// package
function SetTopBottomButtons( ) {

	// timer
	let letIdleTimer;
	// load element
	const LOAD_ELEMENT = fncSelectElement( );
	// layer index (number)
	const LAYER_INDEX = 1001; // edit this value
	// position (%)
	const POSITION = 55; // edit this value
	// idle timeout (milliseconds)
	const IDLE_TIMEOUT = 2000; // edit this value
	// auto hide buttons (true:auto hide, false:always show)
	const AUTO_HIDE_MODE = true; // edit this value

	// create element
	function fncCreateElement( varNumber ) { return document.createElement( varNumber ); }; // end function

	// select element
	function fncSelectElement( ) {
		// high priority use
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
	}; // end function

	// add style
	function fncAddStyle( varCSS ) {
		let letElement = document.head || document.getElementsByTagName( 'head' )[0];
		if ( letElement ) {
			let letStyle = fncCreateElement( "style" );
			letStyle.type = "text/css";
			letStyle.appendChild( document.createTextNode( varCSS ) );
			letElement.appendChild( letStyle );
		} // end if

		return true;
	}; // end function

	// add css
	function fncShareCSS( ) {
		let letString = '';
		let letImgUp;
		let letImgDown;

		// img vs button
		letImgUp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURaqqqqqqqkdwTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqjfXEQEAAAAMdFJOU/wPAKSPdF28R8805OPAZQgAAABpSURBVBjTZZBbDgAhCANbfOv977urBJ/9sRkIkwh5AivkjdgaT8TSWuGBEmpF2pFDFslwC3nE/kR4QwFBjaN0NIZqHOvQE2bsR6GiafwLnA1t3YE8jeQ0itxGzW60bMaZaVwx48GI96M/9sgD7Y3Hro8AAAAASUVORK5CYII=';
		letImgDown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqu6rUBMAAAALdFJOUwAQ/j2n1PG8j1x0dBa5ZQAAAGhJREFUCNdjYIADQTjtKgBmMIYwmBWAWezJDMwqYJaTAQPDpAYgg0MTSHBpAYlFC0B6miYwcGqA9bIoMxg5QPSWGadD9YqmBUL1MoYKwPQKgvUyQPWCAFgvxBkgvRAA0gsBQL3oroUCAIEJErtmb0XIAAAAAElFTkSuQmCC';
		// button id
		letString += '#play_btn_up { position:fixed; right:0; bottom:' + POSITION + '%; z-index:' + LAYER_INDEX + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgUp + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString += '#play_btn_dn { position:fixed; right:0; top:' + POSITION + '%; z-index:' + LAYER_INDEX + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgDown + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		// button class
		letString += '.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
		letString += '.play_btn:hover { opacity:1; }'; 
		// append
		fncAddStyle( '' + letString );

		return true;
	}; // end function

	// move up
	function fncMoveUp( ) { 
		window.scrollBy( 0, -fncScrollTop( LOAD_ELEMENT ) );

		return true;
	}; // end function

	// move down
	function fncMoveDown( ) { 
		window.scrollBy( 0, fncScrollBottom( LOAD_ELEMENT ) );

		return true;
	}; // end function

	// get position from page top to client top
	function fncScrollTop( varDocumentElement ) { return window.pageYOffset || varDocumentElement.scrollTop; }; // end function

	// get position from page bottom to client bottom
	function fncScrollBottom( varDocumentElement ) { return varDocumentElement.scrollHeight - varDocumentElement.clientHeight - fncScrollTop( varDocumentElement ); }; // end function

	// compare height
	function fncCompareHeight( ) { return ( LOAD_ELEMENT.clientHeight < LOAD_ELEMENT.scrollHeight ); }; // end function
	
	// main
	function fncCreateButtonElement( ) { 
		let letUpButton;
		let letDownButton;

		// show buttons
		function fncShowButtons( ) {
			// if scroll up
			letUpButton.style.display = ( fncScrollTop( LOAD_ELEMENT ) > 0 ) ? "" : "none";
			// if scroll down
			letDownButton.style.display = ( fncScrollBottom( LOAD_ELEMENT ) >= 1 ) ? "" : "none"; // remove digits after decimal point

			return true;
		}; // end function

		// hide buttons
		function fncHideButtons( ) {
			if ( AUTO_HIDE_MODE ) {
				letUpButton.style.display = "none";
				letDownButton.style.display = "none";
			} // end if

			return true;
		}; // end function

		// restart timer
		function fncRestartTimer( ) {
			clearTimeout( letIdleTimer );
			letIdleTimer = setTimeout( fncHideButtons, IDLE_TIMEOUT );

			return true;
		}; // end function

		// add css
		fncShareCSS( ); 
		
		// if load element
		if( LOAD_ELEMENT ) { 
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

			// initialize buttons
			fncShowButtons( );

			// add event load
			window.addEventListener( 'load', fncRestartTimer, false );
			// add event click up button
			letUpButton.addEventListener( 'click', fncMoveUp, false );
			// add event click down button
			letDownButton.addEventListener( 'click', fncMoveDown, false );
			// add event scroll
			window.addEventListener( 'scroll', fncRestartTimer, false );
			window.addEventListener( 'scroll', fncShowButtons, false );
		} // end if

		return true;
	}; // end function

	// exit function
	if ( window.self != window.top ) { return; }; // end if
	if ( !fncCompareHeight( ) ) { return; }; // end if

	// run
	fncCreateButtonElement( );

	return true;
}; // end function

// call
SetTopBottomButtons( );