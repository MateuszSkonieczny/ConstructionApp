function validateFirmEquipmentForm(){
    const firmInput = document.getElementById('FId');
    const equipmentInput = document.getElementById('SId');
    const quantityInput = document.getElementById('Ilosc');
    const borrowedInput = document.getElementById('Wypozyczone');

    const errorFirmInput = document.getElementById('errorFirm');
    const errorEquipmentInput = document.getElementById('errorEquipment');
    const errorQuantityInput = document.getElementById('errorIlosc');
    const errorBorrowedInput = document.getElementById('errorWypozyczone');
    const errorsSummary = document.getElementById('errorsSummary');



    resetErrors([firmInput, equipmentInput, quantityInput, borrowedInput],
        [errorFirmInput, errorEquipmentInput, errorQuantityInput, errorBorrowedInput],
        errorsSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const b = document.getElementById('errorMessage-b').innerText;
    const l = document.getElementById('errorMessage-l').innerText;
    const s2 = document.getElementById('errorMessage-s2').innerText;

    let valid = true;

    if(!checkRequired(firmInput.value) || firmInput.toString() === '') {
        valid = false;
        firmInput.classList.add("error-input");
        errorFirmInput.innerText = required;
    }

    if(!checkRequired(equipmentInput.value)) {
        valid = false;
        equipmentInput.classList.add("error-input");
        errorEquipmentInput.innerText = required;
    }

    if(!checkRequired(quantityInput.value)){
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantityInput.innerText = required;
    } else if(!checkNumberSize(quantityInput.value, 1, 100)){
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantityInput.innerText = l+1+s2+100;
    }

    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid;
}
