import {getPhotographers} from '../utils/util.js';
import {paramsId} from'../utils/util.js';
// DOM
const photographHeader = document.querySelector('.photograph-header');
const main = document.querySelector('main');
const mediaDiv = document.querySelector('.media');
export let photographer 
export let medias 
let mediaDOM
let number
let sum
let index


// recupere les datas
async function init() {
    const { media,photographers } = await getPhotographers();
    displayData(media,photographers);
};
init();


// filtrer et displaydata
function filterMediaById(media) {
    if(media.photographerId==paramsId ) {    
        return true    
    }else {
        return false
    }
}

function filterPhotographerById(photographers) {
   if(photographers.id==paramsId ) { 
       return true    
   }else {
       return false
   }
}

async function displayData(media,photographers) {
    
    photographer = photographers.find(filterPhotographerById);
    medias = media.filter(filterMediaById);
    
    const photographerBlock = photographerFactory(photographer);
    const userCardDOM = photographerBlock.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);

    sumLikes()

    const likePrice = document.querySelector('.like-price');
    const pricePhotographer = document.createElement('span');
    pricePhotographer.innerText = photographer.price + '€ / jour';
    const totalLikePhotographers = document.createElement('span');
    totalLikePhotographers.innerText = sum;
    
    const likeIcon = document.createElement('i')
    likeIcon.classList.add('fa-solid')
    likeIcon.classList.add('fa-heart')
    
    const likeTotalDiv = document.createElement('div');
    likeTotalDiv.classList.add('liketotal');
    likeTotalDiv.appendChild(totalLikePhotographers);
    likeTotalDiv.appendChild(likeIcon);
    likePrice.appendChild(likeTotalDiv);
    likePrice.appendChild(pricePhotographer);
};


// Media factory 

function mediaFactory(media,photographer) {
        if(media.image){
            mediaDOM = getMediaCardDOMImage(media,photographer);
        }else if(media.video) {
            mediaDOM = getMediaCardDOMVideo(media,photographer);
        }
    return mediaDOM ;
}

function getMediaCardDOMImage(media,photographer) {

        const {title,image,likes,id} = media;
        const mediaPicture = `assets/photographers/${photographer.name}/${image}`;
       
        
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('mediaimage')

        const img = document.createElement('img');
        img.classList.add('imgVideoCard')
        img.setAttribute('src',mediaPicture);
        img.setAttribute('data-id',id);
        img.addEventListener('click',openImgModal);
        const descriptionImg = document.createElement('div');
        descriptionImg.classList.add('description-img');
        const likeDiv = document.createElement('div');
        likeDiv.classList.add('likediv')

        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;
        const likeImg = document.createElement('p');
        likeImg.setAttribute('data-id',id)
        likeImg.classList.add('likenumbers')
        likeImg.innerHTML = likes;
        // console.log(likeImg);
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('fa-solid')
        likeIcon.classList.add('fa-heart')
        likeIcon.classList.add('likeicon')
        likeIcon.setAttribute('data-id',id)
        likeIcon.addEventListener('click',clickIcon)
        likeIcon.setAttribute('data-clicked','')
       

        mediaCard.appendChild(img);
        likeDiv.appendChild(likeImg);
        likeDiv.appendChild(likeIcon);
        descriptionImg.appendChild(imgTitle);
        descriptionImg.appendChild(likeDiv);
        mediaCard.appendChild(descriptionImg);
        mediaDiv.appendChild(mediaCard);

        return mediaDiv   
    } 
  
    function getMediaCardDOMVideo(media,photographer) {
        const {title,video,likes,id} = media;
        const mediaVideoUrl = `assets/photographers/${photographer.name}/${video}`;

        const mediaCard =document.createElement('div');
        mediaCard.addEventListener('click',openVideoModal);
        mediaCard.classList.add('videocard')
        const mediaVideo = document.createElement('video');
        const videoSource = document.createElement('source');
        // videoSource.setAttribute('src',mediaVideoUrl);
        mediaVideo.classList.add('imgVideoCard')
        mediaVideo.setAttribute('controls','');
        mediaVideo.setAttribute('data-id',id);
        mediaVideo.setAttribute('src',mediaVideoUrl);

        const descriptionVideo = document.createElement('div');
        descriptionVideo.classList.add('description-video');
        const likeDiv = document.createElement('div');
        likeDiv.classList.add('likediv')

        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;

        const likeImg = document.createElement('p');
        likeImg.innerHTML = likes;
        likeImg.classList.add('likenumbers')
        likeImg.setAttribute('data-id',id)
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('fa-solid')
        likeIcon.classList.add('fa-heart')
        likeIcon.setAttribute('data-id',id)
        likeIcon.addEventListener('click',clickIcon)

        mediaVideo.appendChild(videoSource);
        mediaCard.appendChild(mediaVideo);
        mediaCard.appendChild(descriptionVideo);
        descriptionVideo.appendChild(imgTitle);
        descriptionVideo.appendChild(likeDiv);
        likeDiv.appendChild(likeImg);
        likeDiv.appendChild(likeIcon);
        mediaDiv.appendChild(mediaCard);

        return (mediaDiv)  
    }


// Photographer Factory

export function photographerFactory(data) {
    const { name, portrait,city,country,tagline} = data;
   
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.querySelector('.photograph-img')
        img.setAttribute("src", picture);
        img.setAttribute('alt', name);

        const h2 = document.querySelector('h2');
        h2.textContent = name;

        const localisationDiv = document.querySelector('.localisation');
        localisationDiv.innerHTML = city + ', ' + country ;

        const paragraph = document.querySelector('.paragraph')
        paragraph.innerHTML = tagline;

        return (article);
    }
    return { name, picture, getUserCardDOM }
}





// lightbox 
// lightbox  DOM
const lightboxModal = document.querySelector('.lightbox-modal');
const lightboxClose = document.querySelectorAll('.closemodal');
const lightboxContent = document.querySelector('.lightbox-modal-content');
const lightboxMedia = document.querySelector('.lightbox-media');
const iconNext = document.querySelector('.next');
const iconPrev = document.querySelector('.prev');
const currentImage = document.createElement('img');
currentImage.setAttribute('src','')
currentImage.classList.add('lightbox-img');
const currentVideo = document.createElement('video');
currentVideo.setAttribute('controls','')
currentVideo.setAttribute('src','');
currentVideo.classList.add('lightbox-video')
lightboxMedia.appendChild(currentImage);
lightboxMedia.appendChild(currentVideo)
lightboxContent.appendChild(lightboxMedia);
lightboxContent.appendChild(iconNext)



// lightbox EVENT
lightboxClose.forEach((close => {
    close.addEventListener('click',closeLightbox)
}));

iconNext.addEventListener('click',nextImage);
iconPrev.addEventListener('click',prevImage);


// lightbox FUNCTION
let currentDom
let dataId
function openModal(e) {
    dataId = e.target.getAttribute('data-id');
    let mediaDom = document.querySelector(`.imgVideoCard[data-id='${dataId}']`);
    debugger
    currentDom = currentImage.setAttribute('src',mediaDom.src)
    currentDom = currentVideo.setAttribute('src',mediaDom.src);
    console.log(currentImage);
    index= medias.findIndex(element=>
        element.id==dataId
    )
}


function openImgModal(e) {
    debugger
    // index = medias.findIndex(openModal);
    lightboxModal.style.display = 'block';
    currentImage.style.display = 'block';
    currentVideo.style.display = 'none';
    openModal(e)
}


function openVideoModal(e) {
    debugger
    lightboxModal.style.display = 'block';
    currentImage.style.display='none'
    currentVideo.style.display = 'block'
    openModal(e)
}



function closeLightbox() {
    lightboxModal.style.display = 'none';
}

function nextImage() {
    if(index>=medias.length-1) {
        index=0
    }else {
        index+=1
    }
    dataId = medias[index].id;
    console.log(index,medias);
    const dataImage = medias[index].image;
    // const dataVideo = medias[index].video;
    if(dataImage){
        currentImage.style.display = 'block';
        currentVideo.style.display = 'none';
    }else {
        currentImage.style.display='none'
        currentVideo.style.display = 'block'
    }
    let mediaDom = document.querySelector(`.imgVideoCard[data-id='${dataId}']`);
    currentImage.setAttribute('src',mediaDom.src)
    currentVideo.setAttribute('src',mediaDom.src);
    lightboxContent.appendChild(currentImage);
    lightboxContent.appendChild(currentVideo);
    lightboxContent.appendChild(iconNext);
}

function prevImage() {
    dataId = medias[index-=1].id;
    let mediaDom = document.querySelector(`.imgVideoCard[data-id='${dataId}']`);
    currentImage.setAttribute('src',mediaDom.src)
    currentVideo.setAttribute('src',mediaDom.src);
    lightboxContent.appendChild(currentImage);
    lightboxContent.appendChild(currentVideo);
    lightboxContent.appendChild(iconNext);
}




// like

function clickIcon(e) {
    const id = e.target.getAttribute('data-id');
    let clicked = Boolean(e.target.getAttribute('data-clicked'));

    if(!clicked){
        let likenumbersDom = document.querySelector(`.likenumbers[data-id="${id}"]`);
        number = parseInt(likenumbersDom.innerText)
        number = number + 1
        likenumbersDom.innerHTML = number;
        
        // console.log(likenumbersDom);
        // console.log(number);
        sumLikes();
    }
    clicked = e.target.setAttribute('data-clicked',true)
    
 }

 function sumLikes() {
    sum = 0;
 
    medias.forEach((media) => {
        sum = media.likes + sum;
        console.log(media.likes+=1);
        const mediaBlock = mediaFactory(media,photographer);
        main.appendChild(mediaBlock);
    })
}


//  trier 

const sortSelect = document.getElementById('sorting')

sortSelect.addEventListener('change',function(e) {
    if(e.target.value==='titre') {
      titleSorting();
    } else if(e.target.value==='date') {
        dateSorting();
    }else {
        populerSorting();
    }
});

function dateSorting(){
    mediaDiv.innerHTML = '';
    medias.sort((a,z) => {
        return new Date(a.date).valueOf() - new Date(z.date).valueOf()
    }) 
    medias.forEach((element) => {
        mediaFactory(element,photographer)
    })
}

function populerSorting() {
    mediaDiv.innerHTML = '';
    medias.sort((a,z) => {
        return parseInt(a.likes) - parseInt(z.likes)
    })
    console.log(medias);
    medias.forEach((element) => {
        mediaFactory(element,photographer)
    })
}

function titleSorting() {
    medias.sort((a,z)=> {
        console.log(medias);
        return a.title.localeCompare(z.title);
    })
    mediaDiv.innerHTML = '';
    medias.forEach((element) => {
        mediaFactory(element,photographer)
    })
}

