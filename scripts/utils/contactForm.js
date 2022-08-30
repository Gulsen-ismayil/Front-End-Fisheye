import { photographer,lightboxModal } from "../pages/photographer.js";
// DOM
const contactButton = document.querySelector('.contactbutton');
const sendButton = document.querySelector('.sendbutton');
const contactModal = document.getElementById("contact_modal");
const overLay = document.querySelector('.overlay');
const closeModalButton = document.querySelectorAll('.closemodal');
const h1contactezmoi = document.querySelector('.modaltitle');
const formulaire = document.querySelector('form');
const formData = document.querySelectorAll('.formdata');


// event
document.addEventListener('keydown',function(e){
    console.log(e);
    if(e.key==='Escape'){
        closeModal()
    }else if(e.key==='Enter'){
        if(e.target.nodeName==='BUTTON'){
            launchContactModal()
            lightboxModal.style.display = 'none'
        }
    }
})
contactButton.addEventListener('click',launchContactModal); 
closeModalButton.forEach((close=> {
close.addEventListener('click',closeModal)
}));
sendButton.addEventListener('click',launchSend);

// function modal 
function launchContactModal() {
    contactModal.style.display="block";
    overLay.style.display="block";
    contactModal.setAttribute('aria-hidden','false');
    titleContactezmoi();
}

function closeModal() {
    contactModal.style.display = "none";
    overLay.style.display="none";
    contactModal.setAttribute('aria-hidden','true');
}

function titleContactezmoi() {
    
    h1contactezmoi.innerText = `Contactez-moi ${photographer.name}`;
}



// formulaire

function launchSend(e) {
    e.preventDefault();
    const valide = validate();
    if(valide) {
        console.log('merci')
    }else {
        console.log('nest pas valide')
    }
}

function validate() {
    let isValide = true;
   if(validateName(formulaire.first.value)) {
    console.log(formulaire.first.value)
    formData[0].setAttribute('error','false')
   }else {
    formData[0].setAttribute('error','true')
    isValide = false;

   }

   if(validateName(formulaire.last.value)){
    console.log(formulaire.last.value)
    formData[1].setAttribute('error','false')
   }else {
    formData[1].setAttribute('error','true')
    isValide = false;
   }

   if(validateEmail(formulaire.email.value)){
    console.log(formulaire.email.value)
    formData[2].setAttribute('error','false')
   }else {
    formData[2].setAttribute('error','true')
    isValide = false;
   }

   if(validateMessage(formulaire.message.value)){
    console.log(formulaire.message.value)
    formData[3].setAttribute('error','false')
   }else {
    formData[3].setAttribute('error','true')
    isValide = false;
   }
   return isValide;
}



function regexName(value) {
   const regex = /^[a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/;
   return regex.test(value);
}

function validateName(nom) {
    const text = new Text(nom);
    if(text.length>1 && regexName(nom)){
        return true;
    }else {
        return false;
    }
}

function validateEmail(mail) {
    const regexmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    if(mail.match(regexmail)) {
        return true;
    }else {
        return false;
    }
}

function validateMessage(message) {
    const text = new Text(message)

    if(text.length>0 && text.length<20){
        return true;
    }else {
        return false;
    }
}





