import {getPhotographers} from '../utils/util.js';
import {url,urlId,params,paramsId} from'../utils/util.js';
// DOM
const photographHeader = document.querySelector('.photograph-header');
const main = document.querySelector('main');
const mediaDiv = document.querySelector('.media');

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
    const photographerById = photographers.find(filterPhotographerById);
    const mediaArreyById = media.filter(filterMediaById);

    const photographerBlock = photographerFactory(photographerById);
    const userCardDOM = photographerBlock.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);

    let sum = 0;
    
    mediaArreyById.forEach((media) => {
        sum = media.likes + sum;
        const mediaBlock = mediaFactory(media,photographerById);
        main.appendChild(mediaBlock);
    })

    const likePrice = document.querySelector('.like-price');
    const pricePhotographer = document.createElement('span');
    pricePhotographer.innerText = photographerById.price + '€ / jour';
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

        const {title,image,likes} = media;
        const mediaPicture = `assets/photographers/${photographer.name}/${image}`
        
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('imgcard')

        const mediaA = document.createElement('a');
        mediaA.setAttribute('href',mediaPicture);
        const img = document.createElement('img');
        img.classList.add('mediaimage')
        img.setAttribute('src',mediaPicture);
 
        const descriptionImg = document.createElement('div');
        descriptionImg.classList.add('description-img');
        const likeDiv = document.createElement('div');
        likeDiv.classList.add('likediv')

        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;
        const likeImg = document.createElement('p');
        likeImg.innerHTML = likes;
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('fa-solid')
        likeIcon.classList.add('fa-heart')
        
        mediaA.appendChild(img);
        mediaCard.appendChild(mediaA);
        likeDiv.appendChild(likeImg);
        likeDiv.appendChild(likeIcon);
        descriptionImg.appendChild(imgTitle);
        descriptionImg.appendChild(likeDiv);
        mediaCard.appendChild(descriptionImg);
        mediaDiv.appendChild(mediaCard);

        return (mediaDiv)   
    } 
    
    function getMediaCardDOMVideo(media,photographer) {
        const {title,video,likes} = media;
        const mediaVideo = `assets/photographers/${photographer.name}/${video}`;

        const videoDiv =document.createElement('div');
        const mediaA = document.createElement('a');
        mediaA.setAttribute('href',mediaVideo);
        const videoCard = document.createElement('video');
        videoCard.classList.add('videocard')
        videoCard.setAttribute('controls','');

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
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('fa-solid')
        likeIcon.classList.add('fa-heart')

        videoDiv.appendChild(mediaA);
        mediaA.appendChild(videoCard)
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
