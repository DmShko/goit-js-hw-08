import Debounce from "lodash";

const elementLinks = {
    // get element '<form>'
    formElement: document.querySelector('.feedback-form'),
    formEmail: document.querySelector('[name="email"]'),
    formMessage: document.querySelector('[name="message"]'),
    formButton: document.querySelector('button'),
}

function getStorageValue() {
    return JSON.parse(localStorage.getItem("feedback-form-state"));
}

// get storage value
const storageValue = getStorageValue();

// autocomplete form after page refresh
if(storageValue !== null) {
    elementLinks.formEmail.value = storageValue.email;
    elementLinks.formMessage.value = storageValue.message;
} 

// handler of '<form>' event
const eventHandler = function(e) {

    e.preventDefault();

    // "submit" button event
    if(e.target.getAttribute("type") === "submit" 
    && elementLinks.formEmail.value !== null && elementLinks.formMessage.value !== null) {
       // output 'input's values
       console.log(getStorageValue());

       // clear storage
       localStorage.clear();

       // clear 'input's fields
       elementLinks.formEmail.value = "";
       elementLinks.formMessage.value = "";

       return;
    }

    // get value of 'email' and 'message' fields
    const { elements: { email, message } } = elementLinks.formElement; 
   
    localStorage.setItem("feedback-form-state",  
    JSON.stringify({email: email.value, message: message.value}));
};

// add '<form>' event handler
elementLinks.formElement.addEventListener('input', Debounce._.debounce(eventHandler, 500, {"trailing": true}));
elementLinks.formElement.addEventListener('click', eventHandler);