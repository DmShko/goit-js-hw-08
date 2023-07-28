import throttle from "lodash.throttle";

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

// handler of 'inputs' event
const inputHandler = function() {
    // get value of 'email' and 'message' fields
    const { elements: { email, message } } = elementLinks.formElement; 
   
    // add data to local storage
    localStorage.setItem("feedback-form-state",  
    JSON.stringify({email: email.value, message: message.value}));
}

// handler of 'submit' event
const clickHandler = function(e) {

    e.preventDefault();

    // "submit" button event
    if(elementLinks.formEmail.value === "" || elementLinks.formMessage.value === "") 
        return alert('All fields must be filled!');
    // output 'input's values
    console.log(getStorageValue());

    // clear storage
    localStorage.removeItem('feedback-form-state');

    // clear 'input's fields
    elementLinks.formElement.reset();
};

// add event handler
elementLinks.formElement.addEventListener('input', throttle(inputHandler, 500));
elementLinks.formElement.addEventListener('submit', clickHandler);