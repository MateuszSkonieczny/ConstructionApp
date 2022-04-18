function validateFirmPasswordForm(){
    const noweHasloInput = document.getElementById('NoweHaslo');
    const potwierdzHasloInput = document.getElementById('PotwierdzHaslo');

    const errorNoweHasloInput = document.getElementById('errorNoweHaslo');
    const errorPotwierdzHasloInput = document.getElementById('errorPotwierdzHaslo');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([noweHasloInput, potwierdzHasloInput], [errorNoweHasloInput, errorPotwierdzHasloInput], errorsSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const b = document.getElementById('errorMessage-b').innerText;

    let valid = true;

    if(!checkRequired(noweHasloInput.value)){
        valid = false;
        noweHasloInput.classList.add("error-input");
        errorNoweHasloInput.innerText = required;
    }

    if(!checkRequired(potwierdzHasloInput.value)){
        valid = false;
        potwierdzHasloInput.classList.add("error-input");
        errorPotwierdzHasloInput.innerText = required;
    }


    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid

}