// ERROR HANDLING
function showSuccess(container) {
    const inputContainer = document.querySelector(`#${container}`);
    const errorMessage = document.querySelector(`#${container} p`);
    inputContainer.classList.remove('error')
    inputContainer.classList.add('success')
    errorMessage.setAttribute('hidden', '')
}

function showErrors(container, message) {
    const inputContainer = document.querySelector(`#${container}`);
    const errorMessage = document.querySelector(`#${container} p`);
    inputContainer.classList.remove('success')
    inputContainer.classList.add('error')
    errorMessage.innerHTML = `${message}`
    errorMessage.removeAttribute('hidden', '')
}

function clearErrors(container) {
    const inputContainer = document.querySelector(`#${container}`);
    const errorMessage = document.querySelector(`#${container} p`);
    inputContainer.classList.remove('success')
    inputContainer.classList.remove('error')
    errorMessage.setAttribute('hidden', '')
}

// NAME VALIDATION
const nameInput = document.querySelector('#name');
nameInput.onblur = function (e) {
    nameValidation()
}
nameInput.onkeydown = function (e) {
    if (nameInput.parentElement.classList.contains("error")) {
        clearErrors('name-container')
    }
}

let nameValidation = function () {
    if (nameInput.value.trim().length > 0) {
        if (nameInput.value.match(/^[A-Za-z\s\.]*$/)) {
            showSuccess("name-container")
            return true;
        } else {
            showErrors("name-container", "Name must contain only letters")
            return false;
        }
    } else {
        showErrors("name-container", "Name is required")
        return false;
    }
}

// EMAIL VALIDATION
const emailInput = document.querySelector('#email');
emailInput.onblur = function (e) {
    emailValidation()
}
emailInput.onkeydown = function (e) {
    if (emailInput.parentElement.classList.contains("error")) {
        clearErrors('email-container')
    }
}

let emailValidation = function () {
    if (emailInput.value.length > 0) {
        if (emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/)) {
            showSuccess("email-container")
            return true;
        } else {
            showErrors("email-container", "Email is invalid")
            return false;
        }
    } else {
        showErrors("email-container", "Email is required")
        return false;
    }
}

// CARD VALIDATION (LUHN ALGORITHM)
const cardInput = document.querySelector('#card');
cardInput.onblur = function (e) {
    cardValidation()
}
cardInput.onkeydown = function (e) {
    if (cardInput.parentElement.classList.contains("error")) {
        clearErrors('card-container')
    }
}

let cardValidation = function () {
    let element = document.querySelector("input[name=card]").value;
    let split = element.split("");
    let reverse = split.reverse()
    let x = reverse.join("")
    let validator = 0;
    for (let i = 0; i < x.length; i++) {
        if (i % 2 !== 0) {
            let y = x[i] * 2;
            if (y > 9) {
                let j = parseInt(String(y)[0]) + parseInt(String(y)[1])
                validator += parseInt(j)
            } else {
                validator += parseInt(y)
            }
        } else {
            validator += parseInt(x[i])
        }
    }
    if (element > 0) {
        if (validator % 10 == 0 && cardInput.value.match(/[0-9]+/)) {
            showSuccess("card-container")
            return true;
        } else {
            showErrors("card-container", "Card is invalid")
            return false;
        }
    } else {
        showErrors("card-container", "Card is required")
        return false;
    }
}

// OVERALL FORM VALIDATION
function formValidation() {
    event.preventDefault();
    if (nameValidation() == true && emailValidation() == true && cardValidation() == true) {
        console.log("Valid Form")
        // SEND EMAIL (DONE THROUGH EMAILJS)
        emailjs.send("service_gai7saj", "card", {
            name: nameInput.value,
            email: emailInput.value,
            card: cardInput.value,
        });
        const submit = document.querySelector('.submit-container button');
        nameInput.setAttribute('disabled', '')
        emailInput.setAttribute('disabled', '')
        cardInput.setAttribute('disabled', '')
        submit.setAttribute('disabled', '')
        alert('An email containing these details has been sent to hello@dn-uk.com')
    } else {
        if (nameValidation() == false) {
            if (nameInput.value.length > 0) {
                showErrors('name-container', "Name must contain only letters")
            } else {
                showErrors('name-container', "Name is required")
            }
        }
        if (emailValidation() == false) {
            if (emailInput.value.length > 0) {
                showErrors('email-container', "Email is invalid")
            } else {
                showErrors('email-container', "Email is required")
            }
        }
        if (cardValidation() == false) {
            let element = document.querySelector("input[name=card]").value;
            if (element > 0) {
                showErrors('card-container', "Card is invalid")
            } else {
                showErrors('card-container', "Card is required")
            }
        }
        console.log("Invalid Form")
    }
}