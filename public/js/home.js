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

