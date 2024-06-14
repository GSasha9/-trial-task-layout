
//находим скроллбар
let scrollbar = document.querySelector('#main--blub--container--scrollbar');
//находим ползунок
let scrollthumb = document.querySelector('#main--blub--container--scrollthumb');
//находим блок, соержащий все статьи
let allItems = document.querySelector('#main--blub--container--items');
//находим контейнер, который содержит все вышеперечисленные элементы
let container = document.querySelector('#main--blub--container');

//высота блока, содержащего все статьи
let allItemsHeight = pixelsToVW(parseInt(window.getComputedStyle(allItems).height));
//высота скроллбара
let scrollbarHeight = window.getComputedStyle(scrollbar).height;
//высота ползунка            
let scrollthumbHeight = window.getComputedStyle(scrollthumb).height;
//паксимальная точка по оси У для ползунка: от высоты скроллбара отнимаем высоту ползунка
let maxPointOfThumb = pixelsToVW(parseInt(scrollbarHeight)-parseInt(scrollthumbHeight));

//если прокрутить все статьи до конца - определяется максимальная точка прокрутки контейнера, который содержит все статьи, отнимаем 4, чтобы добиться 100%
let maxContainerScroll = pixelsToVW(parseInt(window.getComputedStyle(container).height))-4;

console.log(maxContainerScroll);




allItems.addEventListener('wheel', onWheel);


function onWheel(e){
    if(window.innerWidth < 770){
        onTouchMove(e);
    }
    else {
        //определяем процент прокрутки контейнера: делим текущее значение скроллтопа блока, 
        //содержащего все статьи на высоту всего контейнера
        let proc = (pixelsToVW(allItems.scrollTop)/maxContainerScroll)*100;
        console.log("верхняя точка контейнера прокрутки " + (pixelsToVW(allItems.scrollTop)));
        console.log("процент контейнера " + proc);
        //если положение ползунка по У больше его максимальной точки по Y - останавливаем
        if(scrollthumb.style.top >= maxPointOfThumb){
            return;
        }
        if(pixelsToVW(allItems.scrollTop) == maxContainerScroll || proc>100){
            scrollthumb.style.top = maxPointOfThumb + 'vw';
            return;
        }
        else{
        scrollthumb.style.top = maxPointOfThumb*(proc/100) + 'vw';
        }
    }
}

window.addEventListener("keydown", function(e) {
    if (e.key == "ArrowDown" || e.key == "ArrowUp") {  
        onWheel(e);
    }
});




function onTouchMove(e) {

    maxPointOfThumb = parseInt(scrollbarHeight)-parseInt(scrollthumbHeight);
    let proc = (allItems.scrollTop / maxContainerScroll) * 100;
    console.log("верхняя точка контейнера прокрутки " + allItems.scrollTop);
    console.log("процент контейнера " + proc);
    
    // Проверяем, не достиг ли ползунок максимальной точки
    if (scrollthumb.style.top >= maxPointOfThumb) {
        return;
    }
    // Устанавливаем положение ползунка
    if (allItems.scrollTop == maxContainerScroll || proc > 100) {
        scrollthumb.style.top = maxPointOfThumb + 'px';
    } 
    else {
        scrollthumb.style.top = maxPointOfThumb * (proc / 100) + 'px';
    }
}
    
// Добавляем обработчик события касания
allItems.addEventListener('touchmove', onTouchMove);






























//функция для перевода пикс в vw
function pixelsToVW(pixels) {
    return (pixels / window.innerWidth) * 100;
}

//функция для перевода vw в писк
function VWToPixels(vw) {
    return parseInt((vw * window.innerWidth)/100);
}

//меню рус-анг для десктопной версии
let lang_button = document.querySelector('#header--nav--lang_authorization_buttons--language');
let lang_button_RU = document.querySelector('#header--nav--lang_authorization_buttons--language>span:first-of-type');
let lang_button_EN = document.querySelector('#header--nav--lang_authorization_buttons--language>span:last-of-type');

lang_button.addEventListener('click', function(){
    if(lang_button_RU.classList == 'not_active'){
        lang_button_RU.classList.remove('not_active');
        lang_button_EN.classList.add('not_active');
    }
    else{
        lang_button_EN.classList.remove('not_active');
        lang_button_RU.classList.add('not_active');
    }
})


//меню рус-анг в мобильной версии

let mobile_changeLang_menu = document.querySelector('#header--nav-mobile--changeLang-menu');
let rus = document.querySelector('#header--nav-mobile--changeLang-menu_RU');
let eng = document.querySelector('#header--nav-mobile--changeLang-menu_EN');
let circle = document.querySelector('#circle_lang');

document.querySelector('#header--nav-mobile--changeLanguage').addEventListener('click', function(){
    
    if(mobile_changeLang_menu.style.visibility == "visible"){
        mobile_changeLang_menu.style.visibility = "hidden";
    }
    else{
        mobile_changeLang_menu.style.visibility = "visible";
    }
})

rus.addEventListener('click', function(event) {
     mobile_changeLang_menu.style.visibility = "hidden"
    circle.classList.remove('chosen_lang_eng');
    circle.classList.add('chosen_lang_rus');
    circle.style.visibility = 'visible';
    
});
eng.addEventListener('click', function(event) {
     mobile_changeLang_menu.style.visibility = "hidden"
    circle.classList.remove('chosen_lang_rus');
    circle.classList.add('chosen_lang_eng');
    circle.style.visibility = 'visible';
    
});
    
function lang_check(element){
    
    mobile_changeLang_menu.classList.add('menu_lang_check');
    
    mobile_changeLang_menu.style.visibility = "hidden"
}


//мобильное меню
let mobile_menu_icon = document.querySelector('#header--nav-mobile--menuIcon');
let mobile_menu = document.querySelector('#header--nav-mobile--menu-open');
let mobile_menu_icon_exit = document.querySelector('#header--nav-mobile--menu--open-exit');

mobile_menu_icon.addEventListener('click', function(){
    if(mobile_menu.style.visibility == "visible"){
        mobile_menu.style.visibility = "hidden";
    }
    else{
        mobile_menu.style.visibility = "visible";
        mobile_menu_icon.style.visibility = "hidden";
    }
})

mobile_menu_icon_exit.addEventListener('click', function(){
    mobile_menu.style.visibility = "hidden";
    mobile_menu_icon.style.visibility = "visible";
});