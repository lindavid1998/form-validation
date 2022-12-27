var error;

const inputFields = document.querySelectorAll('input');
inputFields.forEach(element => element.addEventListener('blur', validate));

document.getElementById('country').addEventListener('change', checkZip);
document.getElementById('password').addEventListener('input', checkPassword)

document.querySelector('.submit-btn').addEventListener('click', () => {
    checkPasswordMatch()
    document.querySelector('.form').reportValidity();
});

function validate() {
    error = this.nextElementSibling;

    // if form is valid, clear error message
    if (this.id != 'zip' && this.id != 'confirm-pw' && this.validity.valid) {
        error.textContent = '';
        this.style.border = '';
        return
    }

    // if form is invalid, show error message
    if (this.required && this.validity.valueMissing) {
        error.textContent = 'Form is required'
    } else if (this.id == 'zip') {
        checkZip()
        return
    } else if (this.id == 'confirm-pw') {
        checkPasswordMatch()
        return
    } else if (this.validity.patternMismatch) {
        error.textContent = 'Password does not satisfy the below requirements'
    } else {
        error.textContent = 'Format: xxx@email.com'
    }

    this.style.border = '1px solid red';
}

function checkZip() {
    const zip = document.getElementById('zip')
    const country = document.getElementById('country').value;

    const constraints = {
        us: [/^\d{5}$/, 'US zip codes must contain 5 digits'],
        fr: [/^\d{5}$/, 'France zip codes must contain 5 digits'],
        sw: [/^\d{4}$/, 'Swiss zip codes must contain 4 digits']
    }

    const regex = constraints[country][0];
    const errorMsg = constraints[country][1];

    // set error message
    error = zip.nextElementSibling;
    if (regex.test(zip.value)) {
        error.textContent = ''
        zip.style.border = ''
        zip.setCustomValidity("")
    } else {
        error.textContent = errorMsg;
        zip.style.border = '1px solid red';
        zip.setCustomValidity(errorMsg);
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm-pw');
    
    error = confirm.nextElementSibling
    if (confirm.value !== password.value) {
        error.textContent = 'Passwords do not match';
        confirm.style.border = '1px solid red';
        confirm.setCustomValidity("Passwords do not match"); // sets validity to false
    } else {
        error.textContent = '';
        confirm.style.border = '';
        confirm.setCustomValidity(""); // sets validity to true
    }
}

function checkPassword() {
    // clear error styling
    document.querySelectorAll('.requirements li').forEach(element => {
        element.style.color = ''
    })
    
    // apply styling based on whether conditions are met
    let input = this.value;
    let reqs = document.querySelector('.requirements')
    if (/.{8,}/.test(input)) {
        reqs.querySelector('#char-limit').style.color = 'green'
    }

    if (/^(?=.*[a-z]).*$/.test(input)) {
        reqs.querySelector('#lowercase').style.color = 'green'
    }

    if (/^(?=.*[A-Z]).*$/.test(input)) {
        reqs.querySelector('#uppercase').style.color = 'green'
    }

    if (/^(?=.*\d).*$/.test(input)) {
        reqs.querySelector('#number').style.color = 'green'
    }
}