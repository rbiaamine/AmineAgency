

//random background status
let randomBackround = true;
//interval function 
let randomInterval;
//check background option in local storage
let mainBgstorage = localStorage.getItem('main_background');
//check if there is local storage bg
if(mainBgstorage !== null){
    if(mainBgstorage === 'true'){
        randomBackround = true;
    }else{
        randomBackround = false;
    }
    document.querySelectorAll('.option-box .random, .option-box .fix').forEach(bgSpan => {
        bgSpan.classList.remove("active")
    });
    if(mainBgstorage === 'true'){
        document.querySelector('.option-box .random').classList.add('active');
    }else{
        document.querySelector('.option-box .fix').classList.add('active');
    }
}

//toggle-settings
document.querySelector('.toggle-settings .fa-cog').onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector('.setting-box').classList.toggle('opened')

}
//Switsh Colors
const colorsList = document.querySelectorAll('.colors li');
//make node list of colors
colorsList.forEach(li => {
//change root color when li clicked    
    li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
    //det configuration on local storage
    localStorage.setItem("main_color", e.target.dataset.color);
    //change active class to the selected color
    
    toggleActive(e)//Toggle active Function
    });
});
//check if there is localstorage configuration
let mainColor = localStorage.getItem('main_color');
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main--color',mainColor )
    colorsList.forEach(
        couleur=>{
            couleur.classList.remove('active');
            if(couleur.dataset.color === mainColor){
                couleur.classList.add('active');
            }
        }
    );

}
//switch random bg
const randomBg = document.querySelectorAll('.option-box span');
randomBg.forEach(span => {
    span.addEventListener("click", (e) => {
        //Toggle active Function
        toggleActive(e);    
        if(e.target.dataset.bg === 'random'){
            randomBackround = true;
            randomImgFun();
            localStorage.setItem('main_background',true);
        }else{
            randomBackround = false;
            clearInterval(randomInterval);
            localStorage.setItem('main_background',false);
            
        }
        
    });
});
// Show hidden navigation icons
let navIcons = document.querySelector('.nav-icons'),
    storageNavIcons = localStorage.getItem('nav_icons_option');
    const navSpan = document.querySelectorAll('.option-box span.show,.option-box span.hide');
    //local storage option
    if(storageNavIcons !== null){
        navSpan.forEach(span => {
            span.classList.remove('active');
        });
        if(storageNavIcons === 'block'){
            document.querySelector('.option-box .show').classList.add('active');
            navIcons.style.display = 'block';
        }else{
            document.querySelector('.option-box .hide').classList.add('active');
            navIcons.style.display = 'none';
        }
    }


    navSpan.forEach(span => {
        span.addEventListener('click',(ev)=>{
            
            if(ev.target.dataset.inav === 'show'){
                navIcons.style.display ='block'
                localStorage.setItem('nav_icons_option','block');
            } else{
                navIcons.style.display ='none'
                localStorage.setItem('nav_icons_option','none');
                
            }
            toggleActive(ev);
        })
    });
    

//select LPage
let landingPage = document.querySelector('.landing-page');

//images array
let imgArray = ["1.jpg","2.jpeg","3.jpg","4.jpg"];

//change images every 5s
function randomImgFun(){
    if(randomBackround === true){
    randomInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imgArray.length);
    landingPage.style.backgroundImage = 'url("images/'+imgArray[randomNumber] +'")';
},10000);}
}

randomImgFun();
//croll animation progress bars
let ourSkills = document.querySelector('.skills');
window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOffsetHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    
    if(windowScrollTop > (skillsOffsetTop + skillsOffsetHeight)/2){
        
        let allSkills = document.querySelectorAll('.skills .skill-progress span');
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    };
    
};
//create popup image
let popupImg = document.querySelectorAll('.gallerie img');
popupImg.forEach(image => {
    image.addEventListener('click', (e) =>{
    //create overlay
    let  popOverlay = document.createElement('div');
    //add class to overlay
    popOverlay.className = 'pop-overlay';
    //append the overlay to the body
    document.body.appendChild(popOverlay);
    //create the popup
    let thePopup = document.createElement('div');
    //add class to the popup
    thePopup.className = 'popup-box';
    //append the popup div to the body
    document.body.appendChild(thePopup);
    //create the popup heading from the image alt
    if(image.alt !== null){
        
        let thePopHeading = document.createElement('h2');
        let popTextHeading = document.createTextNode(image.alt);
        thePopHeading.appendChild(popTextHeading);
        thePopup.appendChild(thePopHeading);
        

    }
    //create the img
    let popImg = document.createElement('img');
    //append the img to the popup
    thePopup.appendChild(popImg);
    popImg.src = image.src;

    // create the close button 
    let closeButton = document.createElement('span');
    //text of close botton 
    let closeButtonText = document.createTextNode('X');
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        thePopup.appendChild(closeButton);
    
    
    });
});
// close popUp
document.addEventListener('click',(e)=>{
    if(e.target.className == 'close-button' || e.target.className == 'pop-overlay'){
        document.querySelector('.popup-box').remove();
        document.querySelector('.pop-overlay').remove();
    }
});

//scroll section

//select all icons 
//const allIcons =document.querySelectorAll('.nav-icons .nav-icon');
//allIcons.forEach(icon => {
//   icon.addEventListener('click',(e)=>{
//  document.querySelector(e.target.dataset.section).scrollIntoView({
//       
//        behavior: 'smooth'
//    });
//   
//   });
//});
//functions 
 function toggleActive(e) {
   e.target.parentElement.querySelectorAll('.active').forEach(selected => {
    selected.classList.remove('active');
});  
e.target.classList.add('active'); 
}
//Reset all loclal storage options
document.querySelector('.option-box .reset').addEventListener('click', (e) => {
    localStorage.removeItem('main_color');
    localStorage.removeItem('main_background');
    localStorage.removeItem('nav_icons_option');
});
//burger menu
let bergerIcon = document.querySelector('.berger');
let bergerOverlay = document.querySelector('.landing-page .overlay');
let  bergerMenu = document.querySelector('.navbar .menu');
const bergerMenuLinks = document.querySelectorAll('.navbar .menu li');
    //event click on berger
    bergerIcon.onclick = function (e){
        e.stopPropagation();
        this.classList.toggle('clicked');
        bergerMenu.classList.toggle('opened');
        bergerMenuLinks.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation ='';
            }else{
                link.classList.toggle('active');
                link.style.animation = `fadeIntr 1s ease forwards ${index/8 + 0.5}s`;
                
            }
        });
    };
    document.addEventListener('click',(e) => {
        
        if(e.target !== bergerIcon && e.target !== bergerMenu){
            if(bergerMenu.classList.contains('opened')){

                bergerIcon.classList.toggle('clicked');
                bergerMenu.classList.toggle('opened');
                bergerMenuLinks.forEach((link,index) => {
                    if(link.style.animation){
                        link.style.animation ='';
                    }else{
                        link.classList.toggle('active');
                        link.style.animation = `fadeIntr 1s ease forwards ${index/8 + 0.5}s`;
                        
                    }
                });
            }
           
            
        }
    });
    bergerMenu.onclick = function (e){
        e.stopPropagation();
    }