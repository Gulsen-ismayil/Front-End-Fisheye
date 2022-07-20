import {getPhotographers} from '../utils/fetch.js';

// DOM
const url = document.location.href;
const urlData = new URL(url);
const params = new URLSearchParams(urlData.search);
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
async function displayData(media,photographer) {
 
    function filterMediaById(media) {
        if(media.photographerId==paramsId ) {    
            return true    
        }else {
            return false
        }
    }
    
    function filterPhotographerById(photographer) {
        if(photographer.id==paramsId ) { 
            return true    
        }else {
            return false
        }
    }
    const Photographer = photographer.find(filterPhotographerById);
    
    const mediaArreyById = media.filter(filterMediaById);
    
    const photographerModel = photographerFactory(Photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographHeader.appendChild(userCardDOM);
    
    mediaArreyById.forEach((media) => {
        const mediaModel = mediaFactory(media,photographer);
        const mediaCardDOM = mediaModel.getMediaCardDOMImage();
        main.appendChild(mediaCardDOM);
    })
};


// Media factory 

function mediaFactory(media,photographer) {
    
    const {id,photographerId,title,image,video,likes,date,price} = media;
    const mediaPicture = `assets/photographers/${photographer[5].name}/${image}`;
    console.log(photographer)
    // const mediaVideo = `assets/photographers/${photographer[5].name}/${video}`;
  

    function getMediaCardDOMImage() {
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('imgcard')

        const img = document.createElement('img');
        img.classList.add('mediaimage')
        img.setAttribute('src',mediaPicture);
 
        const imgTitle = document.createElement('p');
        imgTitle.innerHTML = title;

        const likeImg = document.createElement('p');
        likeImg.innerHTML = likes;
       
        mediaCard.appendChild(img);
        mediaCard.appendChild(imgTitle);
        mediaCard.appendChild(likeImg);
        mediaDiv.appendChild(mediaCard);

        return (mediaDiv)   
    } 
    
    function getMediaCardDOMVideo() {
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
        return {id,photographerId,title, getMediaCardDOMImage,getMediaCardDOMVideo}
}


// function mediaFactory(media,photographer) {
    
//     const {id,photographerId,title,image,video,likes,date,price} = media;
//     const mediaPicture = `assets/photographers/${photographer[5].name}/${image}`;
//     const mediaVideo = `assets/photographers/${photographer[5].name}/${video}`;
   

//     function getMediaCardDOMImage() {
//         const mediaCard = document.createElement('div');
//         mediaCard.classList.add('card')

//         const img = document.createElement('img');
//         img.setAttribute('src',mediaPicture);
 
//         const imgTitle = document.createElement('p');
//         imgTitle.innerHTML = title;

//         const likeImg = document.createElement('p');
//         likeImg.innerHTML = likes;
       
//         mediaCard.appendChild(img);
//         mediaCard.appendChild(imgTitle);
//         mediaCard.appendChild(likeImg);
//         mediaDiv.appendChild(mediaCard);

//         return (mediaDiv)   
//     } 
    
//     function getMediaCardDOMVideo() {
//         const mediaCard = document.createElement('div');
//         mediaCard.classList.add('card')

//         const video = document.createElement('video');
//         video.setAttribute('src',mediaVideo);

//         const imgTitle = document.createElement('p');
//         imgTitle.innerHTML = title;

//         const likeImg = document.createElement('p');
//         likeImg.innerHTML = likes;

//         mediaCard.appendChild(video);
//         mediaCard.appendChild(imgTitle);
//         mediaCard.appendChild(likeImg);
//         mediaDiv.appendChild(mediaCard);

//         return (mediaDiv)  
//     }
//         return {id,photographerId,title, getMediaCardDOMImage,getMediaCardDOMVideo}
// }


// Photographer Factory

function photographerFactory(data) {

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
