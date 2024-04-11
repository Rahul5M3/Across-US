const searchForm=document.querySelector('.navbar #navbarContent form');
const blogBtn=document.querySelector('.navbar #navbarContent .blogLink');
const searchBtn=document.querySelector('.searchBtn');
searchBtn.addEventListener('click',()=>{
    searchForm.style.display='inline';
    searchBtn.style.display='none';
    blogBtn.style.display='none';
});

function scrollContainer(amount){
    const homeMainContent=document.querySelector('.home-main-content')
    homeMainContent.scrollLeft += amount;
}

const menuBar=document.querySelector('.menuBar-box');
const menuBox=document.querySelector('.menuBox');
menuBar.addEventListener('click',()=>{
    if(menuBox.style.display==='none'){
        menuBox.style.display='block';
        menuBar.style.zIndex='10';      
    }else {
        menuBox.style.display='none';
        menuBar.style.zIndex='2';
    }
});


function scrollToSection(sectionId){
    const sectionid=document.getElementById('sectionId');
    if(sectionid){
        sectionid.scrollIntoView({behavior:"smooth"});
    }
}
