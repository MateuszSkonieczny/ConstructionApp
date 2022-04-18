function validateConstructionForm(){
    const firmInput = document.getElementById('FId');
    const estateInput = document.getElementById('OId');
    const nameInput = document.getElementById('ImieManagera');
    const sureInput = document.getElementById('NazwiskoManagera');
    const dateInput = document.getElementById('DataZakonczenia');

    const errorFirmInput = document.getElementById('errorFirm');
    const errorEstateInput = document.getElementById('errorEstate');
    const errorNameInput = document.getElementById('errorIM');
    const errorSureInput = document.getElementById('errorNM');
    const errorDateInput = document.getElementById('errorDZ');
    const errorsSummary = document.getElementById('errorsSummary');



    resetErrors([firmInput, estateInput, nameInput, sureInput, dateInput],
        [errorFirmInput, errorEstateInput, errorNameInput, errorSureInput, errorDateInput],
        errorsSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const s1 = document.getElementById('errorMessage-s1').innerText;
    const s2 = document.getElementById('errorMessage-s2').innerText;
    const s3 = document.getElementById('errorMessage-s3').innerText;
    const b = document.getElementById('errorMessage-b').innerText;
    const d = document.getElementById('errorMessage-d').innerText;

    let valid = true;

    if(!checkRequired(firmInput.value) || firmInput.toString() === '') {
        valid = false;
        firmInput.classList.add("error-input");
        errorFirmInput.innerText = required;
    }

    if(!checkRequired(estateInput.value)) {
        valid = false;
        estateInput.classList.add("error-input");
        errorEstateInput.innerText = required;
    }

    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = required;
    } else if(!checkTextLengthRange(nameInput.value, 2, 60)){
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = s1+2+s2+60+s3;
    }

    if(!checkRequired(sureInput.value)){
        valid = false;
        sureInput.classList.add("error-input");
        errorSureInput.innerText = required;
    } else if(!checkTextLengthRange(sureInput.value, 2, 60)){
        valid = false;
        sureInput.classList.add("error-input");
        errorSureInput.innerText = s1+2+s2+60+s3;
    }

    if(!checkDate(dateInput.value)){
        valid = false;
        dateInput.classList.add("error-input");
        errorDateInput.innerText = d;
    }

    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid;
}
