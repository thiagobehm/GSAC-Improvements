// ==UserScript==
// @name         UI Improvements for GSAC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Thiago Behm
// @match        https://getsupport.atlassian.com/*
// @updateURL    https://raw.githubusercontent.com/thiagobehm/GSAC-Improvements/master/gsacImprovements.user.js
// @downloadURL  https://raw.githubusercontent.com/thiagobehm/GSAC-Improvements/master/gsacImprovements.user.js
// @resource css_file https://raw.githubusercontent.com/thiagobehm/GSAC-Improvements/master/view/style.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function($) {
    'use strict';

    function init () {
        GM_addStyle(GM_getResourceText('css_file'));
        //close the customer notes and time tracking modules
        $('#customer-notes').removeClass('expanded').addClass('collapsed')
        $('#timetrackingmodule').removeClass('expanded').addClass('collapsed')
        //add the time tracking at the end of the page
        $('#timetrackingmodule').insertAfter('#slack-viewissue-panel');

        let div = document.createElement('DIV');   
        div.innerHTML = ">>";
        div.className = 'expand-sidebar';                    
        document.body.appendChild(div);

        div.addEventListener('click', (event) =>{
            let content = document.querySelector('#dashboard-content');
            // content.style.marginLeft = "180px !important"
            content.toggleClass('removeSidePanel');
        })
    }
    let body = $('body');
    //add event listener to sticky the side panel
    window.onscroll = function() {stickyPanel()};
    /*
    TODO
    window.onkeypress = (e) => {
      if(e.srcElement.tagName === 'BODY')
        return;
    };
    */

function stickyPanel () {
    //gets the positions of activitymodule which is used as base to fix the panel
    var elementPosition = $('#customer-notes_heading').offset();

    if($(window).scrollTop() > elementPosition.top){
    	$('#sla-web-panel').addClass('stickySLA');
     	$('#peoplemodule').addClass('stickyPeople');
        $('#tenant-tab').addClass('stickyGovernator');
     } else {
     	$('#sla-web-panel').removeClass('stickySLA');
     	$('#peoplemodule').removeClass('stickyPeople');
         $('#tenant-tab').removeClass('stickyGovernator');
	}//else
}//stickyPanel()


    init();
})(AJS.$);