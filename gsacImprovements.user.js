// ==UserScript==
// @name         UI Improvements for GSAC
// @namespace    http://tampermonkey.net/
// @version      0.2
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

        //only toogles the sidebar button within a dashboard page
        if(window.location.pathname.startsWith('/secure/Dashboard')) {
            let div = document.createElement('DIV');   
            div.innerHTML = "≡";
            div.className = 'sidebar-button';                    
            document.body.appendChild(div);

            //listener to toogle the sidebar
            div.addEventListener('click', (event) =>{
                let content = document.querySelector('#dashboard-content');
                let sidebar = document.querySelector('.sidebar-button');
                // let checked = localStorage.getItem('checked');

                // if (checked && checked === 'false') {
                //     localStorage.setItem('checked', 'true')
                // } else { 
                //     if (checked && checked === 'true') {
                //         localStorage.setItem('checked', 'false')
                //     }
                // }//else
                $(content).toggleClass('removeSidePanel');
                $(sidebar).toggleClass('slide-sidebar-button');
            })//event listener
    }//if 
}
    
    //add event listener to sticky the side panel
    window.onscroll = function() {stickyPanel()};
    

function stickyPanel () {
    //gets the positions of activitymodule which is used as base to fix the panel
    var elementPosition = $('#customer-notes_heading').offset();

    if($(window).scrollTop() > elementPosition.top){
    	$('#sla-web-panel').addClass('stickySLA');
     	$('#peoplemodule').addClass('stickyPeople');
        $('#tenant-tab').addClass('stickyGovernator');
        $('.sd-rt-preview').addClass('stickyCustomerPortalLink');
     } else {
     	$('#sla-web-panel').removeClass('stickySLA');
     	$('#peoplemodule').removeClass('stickyPeople');
         $('#tenant-tab').removeClass('stickyGovernator');
         $('.sd-rt-preview').removeClass('stickyCustomerPortalLink');
	}//else
}//stickyPanel()


    init();
})(AJS.$);