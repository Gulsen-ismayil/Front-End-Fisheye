
// Contact Modal 

const contactButton = document.querySelector('.contact_button');
console.log(contactButton)
// contactButton.forEach((button)=> {
//     button.addEventListener('click',launchContactModal)
// }) 
contactButton.addEventListener('click',launchContactModal)  
// function displayModal() {
//     console.log(3554)
//     contactButton.addEventListener('click',launchContactModal)
   
//     }

const contactModal = document.getElementById("contact_modal");
function launchContactModal(e) {
    e.preventDefault();
    contactModal.style.display="block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
