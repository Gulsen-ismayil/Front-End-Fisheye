import {getPhotographers} from '../utils/fetch.js';

// DOM
const url = document.location.href;
const urlId = new URL(url);
const params = new URLSearchParams(urlId.search);
const paramsId = params.get('id')

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
        sum += media.likes;
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
    likePrice.appendChild(totalLikePhotographers);
    likePrice.appendChild(likeIcon);
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

        const img = document.createElement('img');
        img.classList.add('mediaimage')
        img.setAttribute('src',mediaPicture);
 
        const descriptionImg = document.createElement('div');
        descriptionImg.classList.add('description-img');

        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;
        const likeImg = document.createElement('p');
        likeImg.innerHTML = likes;
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('fa-solid')
        likeIcon.classList.add('fa-heart')
        

           
        mediaCard.appendChild(img);
        descriptionImg.appendChild(imgTitle);
        descriptionImg.appendChild(likeImg);
        descriptionImg.appendChild(likeIcon);
        mediaCard.appendChild(descriptionImg);
        mediaDiv.appendChild(mediaCard);

        return (mediaDiv)   
    } 
    
    function getMediaCardDOMVideo(media,photographer) {
        const {title,video,likes} = media;
        const mediaVideo = `assets/photographers/${photographer.name}/${video}`;

        const videoCard = document.createElement('video');
        videoCard.classList.add('videocard')

        const source = document.createElement('source');
        source.setAttribute('src',mediaVideo);

        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;

        const likeImg = document.createElement('p');
        likeImg.innerHTML = likes;

        videoCard.appendChild(source);
        videoCard.appendChild(imgTitle);
        videoCard.appendChild(likeImg);
        mediaDiv.appendChild(videoCard);

        return (mediaDiv)  
    }


// Photographer Factory

function photographerFactory(data) {

    const { name, portrait,city,country,tagline,id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.setAttribute('href',`photographer.html?id=${id}`);
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt', name);

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description')

        const photographButton = document.querySelector('.contact_button');

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisationDiv = document.createElement('div');
        localisationDiv.classList.add('localisation');
        localisationDiv.innerHTML = city + ', ' + country ;

        const para = document.createElement('p');
        para.classList.add('paragraph')
        para.innerHTML = tagline;

        descriptionDiv.appendChild(h2);
        descriptionDiv.appendChild(localisationDiv);
        descriptionDiv.appendChild(para);
        article.appendChild(descriptionDiv);
        article.appendChild(photographButton);
        article.appendChild(img);
        a.appendChild(article);

        return (a);
    }
    return { name, picture, getUserCardDOM }
}
