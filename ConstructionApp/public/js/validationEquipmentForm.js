function validateEquipmentForm(){
    const nazwaInput = document.getElementById('Nazwa');
    const sprzetCiezkiInput = document.getElementById('SprzetCiezki');

    const errorNazwaInput = document.getElementById('errorNazwa');
    const errorSprzetCiezkiInput = document.getElementById('errorSprzetCiezki');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nazwaInput, sprzetCiezkiInput], [errorNazwaInput, errorSprzetCiezkiInput], errorsSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const s1 = document.getElementById('errorMessage-s1').innerText;
    const s2 = document.getElementById('errorMessage-s2').innerText;
    const s3 = document.getElementById('errorMessage-s3').innerText;
    const b = document.getElementById('errorMessage-b').innerText;

    let valid = true;

    if(!checkRequired(nazwaInput.value)){
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwaInput.innerText = required;
    } else if(!checkTextLengthRange(nazwaInput.value, 2, 50)){
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwaInput.innerText = s1+2+s2+60+s3;
    }

    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid


}