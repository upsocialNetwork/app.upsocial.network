"use strict";

$(document).ready(function(){
    $('.selection').niceSelect();
})

// Prevent Default behavior of Form 
if(document.querySelectorAll('body form') !== null) {
    document.querySelectorAll('body form').forEach(each=>{
        each.addEventListener('submit', event=>{
            event.preventDefault();
        })
    })
}


let DOMElements = {
    registrationId: 'register',
    registerContentId:'register-content',
    closeRegisterId: 'close-registration',
    loginId:'login',
    loginContentId:'login-content',
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

registration();
colorModeChange();
actionBtn();

const closeRegisterScreen = (regContent, logContent)=>{
    regContent.style.display = 'none';
    regContent.style.opacity = '0';
    logContent.style.display = 'block';
    logContent.style.transition = '.3s';

    setTimeout(()=>{
        logContent.style.opacity = '1'
    }, 300)
}

function registration (){
    if(document.getElementById(`${DOMElements.registrationId}`) !== null) {
        let register = document.getElementById(`${DOMElements.registrationId}`);
        let registerContent = document.getElementById(`${DOMElements.registerContentId}`);
        let closeRegister = document.getElementById(`${DOMElements.closeRegisterId}`);
        let login = document.getElementById(`${DOMElements.loginId}`);
        let loginContent = document.getElementById(`${DOMElements.loginContentId}`);
        register.addEventListener('click', event=>{
            event.preventDefault();
            loginContent.style.display = 'none';
            loginContent.style.opacity = '0';
            registerContent.style.display = 'block';
            setTimeout(()=>{
                registerContent.style.opacity = '1'
            }, 300)
        })

        closeRegister.addEventListener('click', event=>{
            event.preventDefault();
            closeRegisterScreen(registerContent, loginContent)
        });
        login.addEventListener('click', event=>{
            event.preventDefault();
            closeRegisterScreen(registerContent, loginContent)
        });
    }
}

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
// let scrollbars = document.querySelectorAll('.scroll-bar');
// scrollbars.forEach(each=>{
//     new MiniBar(each,
//         {
//             barType: "default",
//             minBarSize: 10,
//             hideBars: false
//         }
//     )
// })

// Code For Main Menu
// if(document.querySelector(DOMElements.menu) !== null) {
//     document.querySelector(DOMElements.menu).addEventListener('click', event=>{
//         event.preventDefault();
//         document.querySelector(DOMElements.sidebar).classList.toggle('appear');
//         document.querySelector(DOMElements.overlay).classList.toggle('appear');
//     })

//     document.querySelector(DOMElements.overlay).addEventListener('click', function(){
//         document.querySelector(DOMElements.sidebar).classList.toggle('appear');
//         document.querySelector(DOMElements.overlay).classList.toggle('appear');
//     })
// }


function actionBtn (){
    document.querySelectorAll(`.${DOMElements.actionTypeOneClass}`).forEach(each=>{
        each.addEventListener('click', event =>{
            event.preventDefault();
            event.target.classList.toggle('active');
        })
    })
}





