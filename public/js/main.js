"use strict";

document.addEventListener("DOMContentLoaded", function(event) {

// Prevent Default behavior of Form 
if(document.querySelectorAll('body form') !== null) {
    document.querySelectorAll('body form').forEach(each=>{
        each.addEventListener('submit', event=>{
            event.preventDefault();
        })
    })
}


let DOMElements = {
    body: 'body',
    lightModeId: 'light-mode',
    darkModeId: 'dark-mode',
    colorModeToggleId: 'changeDisplayMode',
    menu: '.mobile-toggle-bar',
    sidebar: '.left-sidebar-wrapper',
    overlay: '.overlay',
    mobileSearchClass: 'mobile-search',
    back: 'back-normal',
    actionTypeOneClass: 'action-type-one'
}

colorModeChange();
actionBtn();



function colorModeChange (){
    const pageBody = document.querySelector(DOMElements.body);
    const lightBtn = document.querySelector(`#${DOMElements.lightModeId}`);
    const darkBtn = document.querySelector(`#${DOMElements.darkModeId}`);
    const colorModeToggle = document.querySelector(`#${DOMElements.colorModeToggleId}`);
    if( lightBtn !== null || darkBtn !== null) {
        lightBtn.addEventListener('click', event=>{
            event.preventDefault();
            pageBody.classList.remove('dark_mode');
            lightBtn.classList.add('active');
            darkBtn.classList.remove('active');
        })
        darkBtn.addEventListener('click', event=>{
            event.preventDefault();
            pageBody.classList.add('dark_mode');
            darkBtn.classList.add('active');
            lightBtn.classList.remove('active');
        })
    }


    if(colorModeToggle !== null) {
        colorModeToggle.addEventListener('click', event=>{
            event.preventDefault();
            pageBody.classList.toggle('dark_mode');
            if(lightBtn.classList.contains('active')) {
                darkBtn.classList.add('active');
                lightBtn.classList.remove('active');
            } else {
                lightBtn.classList.add('active');
                darkBtn.classList.remove('active'); 
            } 
        })
    }
    
}

// Script for Custom Scrollbar
let scrollbars = document.querySelectorAll('.scroll-bar');
scrollbars.forEach(each=>{
    new MiniBar(each,
        {
            barType: "default",
            minBarSize: 10,
            hideBars: false
        }
    )
})

// Code For Main Menu
if(document.querySelector(DOMElements.menu) !== null) {
    document.querySelector(DOMElements.menu).addEventListener('click', event=>{
        event.preventDefault();
        document.querySelector(DOMElements.sidebar).classList.toggle('appear');
        document.querySelector(DOMElements.overlay).classList.toggle('appear');
    })

    document.querySelector(DOMElements.overlay).addEventListener('click', function(){
        document.querySelector(DOMElements.sidebar).classList.toggle('appear');
        document.querySelector(DOMElements.overlay).classList.toggle('appear');
    })
}


function actionBtn (){
    document.querySelectorAll(`.${DOMElements.actionTypeOneClass}`).forEach(each=>{
        each.addEventListener('click', event =>{
            event.preventDefault();
            event.target.classList.toggle('active');
        })
    })
}




});
