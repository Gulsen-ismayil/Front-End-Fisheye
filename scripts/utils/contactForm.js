// import { photographerFactory } from "../factories/photographer.js";
// DOM
const contactButton = document.querySelector('.contact_button');
const contactModal = document.getElementById("contact_modal");
const overLay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.closemodal');

contactButton.addEventListener('click',launchContactModal); 
function launchContactModal(e) {
    e.preventDefault();
    contactModal.style.display="block";
    overLay.style.display="block"
}

closeModalButton.addEventListener('click',closeModal);
function closeModal() {
    contactModal.style.display = "none";
    overLay.style.display="none";
}

// function titleContactezmoi {

// }
