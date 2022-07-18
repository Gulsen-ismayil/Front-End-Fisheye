import {getPhotographers} from '../utils/fetch.js';
// DOM
const url = document.location.href;
const urlData = new URL(url);
const params = new URLSearchParams(urlData.search);
const paramsId = params.get('id')

const headerPhotographersFactory = document.querySelector('header');
const lienLogoFisheye = document.createElement('a');
lienLogoFisheye.setAttribute('href','index.html');

const headerImage = document.querySelector('.logo');
headerImage.setAttribute('alt','Fisheye Home Page')

headerPhotographersFactory.appendChild(lienLogoFisheye);
lienLogoFisheye.appendChild(headerImage);


const photographHeader = document.querySelector('.photograph-header');
const main = document.querySelector('main');
const mediaDiv = document.createElement('div');
mediaDiv.classList.add('media')
main.appendChild(mediaDiv)


// recupere les datas

async function init() {

    const { photographers } = await getPhotographers();
    displayData(photographers);

    const {media} = await getPhotographers();
    displayData(media);
};

init();



// filtrer et displaydata
async function displayData(photographers) {

    function filterPhotographerById(photographer) {
        if(photographer.id==paramsId ) { 
            return true    
        }else {
            return false
        }
    }
    function filterMediaById(photographer) {
        if(photographer.photographerId==paramsId ) { 
            return true    
        }else {
            return false
        }
    }

    const photographer = photographers.find(filterPhotographerById);
    const mediaArreyById = photographers.filter(filterMediaById);

       
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographHeader.appendChild(userCardDOM);
    

        mediaArreyById.forEach((media) => {
        const mediaModel = mediaFactory(media,photographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        main.appendChild(mediaCardDOM);
    })
};


// Media factory 

function mediaFactory(media,photographer) {
    const {id,photographerId,title,image,video,likes,date,price} = media;

    const mediaPicture = `assets/photographers/${photographer.name}/${image}`;
    const mediaVideo = `assets/photographers/${video}`;

    function getMediaCardDOM() {
        const imgCard = document.createElement('div');
        imgCard.classList.add('card')

        const img = document.createElement('img');
        img.setAttribute('src',mediaPicture);
        img.setAttribute('src',mediaVideo);
 
        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;

        const likeImg = document.createElement('p');
        likeImg.innerHTML = likes;
        // const iconHeart = document.createElement('i');
        // iconHeart.classList.add('fa-heart');

        imgCard.appendChild(img);
        imgCard.appendChild(imgTitle);
        imgCard.appendChild(likeImg);
        // imgCard.appendChild(iconHeart);
        mediaDiv.appendChild(imgCard);

        return (mediaDiv)   
    } 
        return {id,photographerId,title, getMediaCardDOM}
}


// Photographer Factory

function photographerFactory(data) {
    debugger
    const { name, portrait,city,country,tagline,price,id } = data;
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
