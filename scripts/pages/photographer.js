import {getPhotographers} from '../utils/util.js';
import {url,urlId,params,paramsId} from'../utils/util.js';
// DOM
const photographHeader = document.querySelector('.photograph-header');
const main = document.querySelector('main');
const mediaDiv = document.querySelector('.media');
export let photographer 
export let medias 
let number
let sum
let currentImage


// recupere les datas
async function init() {
    const { media,photographers } = await getPhotographers();
    displayData(media,photographers);
};
init();



// filtrer et displaydata
async function displayData(media,photographers) {
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
    photographer = photographers.find(filterPhotographerById);
    medias = media.filter(filterMediaById);

    const photographerBlock = photographerFactory(photographer);
    const userCardDOM = photographerBlock.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);

    sum = 0;
    
    medias.forEach((media) => {
        sum = media.likes + sum;
        const mediaBlock = mediaFactory(media,photographer);
        main.appendChild(mediaBlock);
    })
    
    
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
    let mediaDOM;
        if(media.image){
            mediaDOM = getMediaCardDOMImage(media,photographer);
        }else if(media.video) {
            mediaDOM = getMediaCardDOMVideo(media,photographer);
        }
    return mediaDOM ;
}

function getMediaCardDOMImage(media,photographer) {

        const {title,image,likes,id} = media;
        const mediaPicture = `assets/photographers/${photographer.name}/${image}`
        
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('imgcard')

        // const mediaA = document.createElement('a');
        // mediaA.setAttribute('href',mediaPicture);
        const img = document.createElement('img');
        img.classList.add('mediaimage')
        img.setAttribute('src',mediaPicture);
        img.addEventListener('click',openModal);
        img.setAttribute('data-id',id);
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
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('fa-solid')
        likeIcon.classList.add('fa-heart')
        likeIcon.setAttribute('data-id',id)
        likeIcon.addEventListener('click',clickIcon)
       
        
        // mediaA.appendChild(img);
        // mediaCard.appendChild(mediaA);
        mediaCard.appendChild(img);
        likeDiv.appendChild(likeImg);
        likeDiv.appendChild(likeIcon);
        descriptionImg.appendChild(imgTitle);
        descriptionImg.appendChild(likeDiv);
        mediaCard.appendChild(descriptionImg);
        mediaDiv.appendChild(mediaCard);





        // test 

    
        // const img = document.querySelectorAll('mediaimage')
        // img.forEach((img)=> {
        //     img.setAttribute('src',mediaPicture);
        //     img.addEventListener('click',imgModal);
        // })
        // const imgTitle =document.querySelectorAll('imgtitle')
        // imgTitle.innerHTML = title;
  
        // const likeImg = document.querySelectorAll('likenumber')
        // likeImg.innerHTML = likes;

        // const likeIcon =document.querySelectorAll('likeicon')
        // likeIcon.forEach((icon)=> {
        //     icon.addEventListener('click',clickIcon)
        // })
        // function clickIcon() {
        //     const likeImg = document.querySelector('likenumbers');
        //     //  likeImg = likeImg +1 ;
        //     console.log(mediaDiv)
        //  }

        return mediaDiv   
    } 
  
    function getMediaCardDOMVideo(media,photographer) {
        const {title,video,likes,id} = media;
        const mediaVideo = `assets/photographers/${photographer.name}/${video}`;

        const videoDiv =document.createElement('div');
        // const mediaA = document.createElement('a');
        // mediaA.setAttribute('href',mediaVideo);
        const videoCard = document.createElement('video');
        videoCard.classList.add('videocard')
        videoCard.setAttribute('controls','');
        videoCard.addEventListener('click',openModal);

        const source = document.createElement('source');
        source.setAttribute('src',mediaVideo);

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

        // videoDiv.appendChild(mediaA);
        // mediaA.appendChild(videoCard)
        videoDiv.appendChild(videoCard);
        videoCard.appendChild(source);
        videoDiv.appendChild(descriptionVideo);
        descriptionVideo.appendChild(imgTitle);
        descriptionVideo.appendChild(likeDiv);
        likeDiv.appendChild(likeImg);
        likeDiv.appendChild(likeIcon);
        mediaDiv.appendChild(videoDiv);

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
// DOM

const lightboxModal = document.querySelector('.lightbox-modal');
const lightboxClose = document.querySelectorAll('.closemodal');
const lightboxContent = document.querySelector('.lightbox-modal-content');
const iconNext = document.querySelector('.next');
const iconPrev = document.querySelector('.prev');

// EVENT
lightboxClose.forEach((close => {
    close.addEventListener('click',closeLightbox)
}));

iconNext.addEventListener('click',nextImage);
iconPrev.addEventListener('click',prevImage);

// FUNCTION
function openModal(e) {
    lightboxModal.style.display = 'block';
    const id = e.target.getAttribute('data-id');
    let imageDom = document.querySelector(`.mediaimage[data-id='${id}']`);
    currentImage = document.querySelector('.lightbox-img');
    currentImage.setAttribute('src',imageDom.src);
}

function closeLightbox() {
    lightboxModal.style.display = 'none';
}

function nextImage() {

    currentImage.style.display = 'none';
  
}

function prevImage() {
    console.log('halooo prev')
}


// like

function clickIcon(e) {
    const id = e.target.getAttribute('data-id');
    let likenumbersDom = document.querySelector(`.likenumbers[data-id="${id}"]`);
    number = parseInt(likenumbersDom.innerText)
    number = number + 1
    likenumbersDom.innerText = number
    console.log(number);
 }

