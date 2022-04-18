function validateNewFirmForm(){
    const nazwaInput = document.getElementById('Nazwa');
    const adresInput = document.getElementById('Adres');
    const passwordInput = document.getElementById('password');

    const errorNazwaInput = document.getElementById('errorNazwa');
    const errorAdresInput = document.getElementById('errorAdres');
    const errorPasswordInput = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nazwaInput, adresInput, passwordInput], [errorNazwaInput, errorAdresInput, errorPasswordInput], errorsSummary);

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
    } else if(!checkTextLengthRange(nazwaInput.value, 2, 60)){
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwaInput.innerText = s1+2+s2+60+s3;
    }

    if(!checkRequired(adresInput.value)){
        valid = false;
        adresInput.classList.add("error-input");
        errorAdresInput.innerText = required;
    } else if(!checkTextLengthRange(adresInput.value, 2, 60)){
        valid = false;
        adresInput.classList.add("error-input");
        errorAdresInput.innerText = s1+2+s2+60+s3;
    }

    if(!checkRequired(passwordInput.value)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPasswordInput.innerText = required;
    }



    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid
}