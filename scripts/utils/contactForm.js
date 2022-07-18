
// Contact Modal 

function displayModal() {
    const contactButton = document.querySelector('.contact_button');
    contactButton.addEventListener('click', launchContactModal)
}

function launchContactModal() {
    const contactModal = document.getElementById("contact_modal");
    contactModal.style.display=block;
    console.log(contactModal)
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
