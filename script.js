var error;

const inputFields = document.querySelectorAll('input');
inputFields.forEach(element => element.addEventListener('blur', validate));

document.getElementById('country').addEventListener('change', checkZip);

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
        error.textContent = 'Password must be 8 characters long and contain 1 upper, 1 lower, and 1 number'
    } else {
        error.textContent = 'Format: xxx@email.com'
    }

    this.style.border = '1px solid red';
}

function checkZip() {
    // read zip input
    const zip = document.getElementById('zip')
    
    // read country value
    const country = document.getElementById('country').value;

    // look up associated regex
    const constraints = {
        us: [/^\d{5}$/, 'US zip codes must contain 5 digits'],
        fr: [/^\d{5}$/, 'France zip codes must contain 5 digits'],
        sw: [/^\d{4}$/, 'Swiss zip codes must contain 4 digits']
    }

    // set error message
    error = zip.nextElementSibling;
    if (constraints[country][0].test(zip.value)) {
        error.textContent = ''
        zip.style.border = ''
    } else {
        error.textContent = constraints[country][1];
        zip.style.border = '1px solid red';
    }

}

function checkPasswordMatch() {
    // read confirm pw field
    const confirm = document.getElementById('confirm-pw');
    
    // read pw field
    const password = document.getElementById('password');

    error = confirm.nextElementSibling
    if (confirm.value !== password.value) {
        error.textContent = 'Passwords do not match';
        confirm.style.border = '1px solid red';
    } else {
        error.textContent = '';
        confirm.style.border = '';
    }
}
