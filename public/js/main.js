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
    menu: '.mobile-toggle-bar',
    sidebar: '.left-sidebar-wrapper',
    overlay: '.overlay',
    mobileSearchClass: 'mobile-search',
    back: 'back-normal',
    actionTypeOneClass: 'action-type-one'
}

actionBtn();



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
