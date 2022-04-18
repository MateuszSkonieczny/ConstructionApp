function validateEstateForm(){
    const adresInput = document.getElementById('Adres');
    const liczbabudInput = document.getElementById('LiczbaBudynkow');

    const errorAdresInput = document.getElementById('errorAdres');
    const errorLiczbabudInput = document.getElementById('errorLiczbabud');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([adresInput, liczbabudInput], [errorAdresInput, errorLiczbabudInput], errorsSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const s1 = document.getElementById('errorMessage-s1').innerText;
    const s2 = document.getElementById('errorMessage-s2').innerText;
    const s3 = document.getElementById('errorMessage-s3').innerText;
    const b = document.getElementById('errorMessage-b').innerText;
    const l = document.getElementById('errorMessage-l').innerText;

    let valid = true;

    if(!checkRequired(adresInput.value)){
        valid = false;
        adresInput.classList.add("error-input");
        errorAdresInput.innerText = required;
    } else if(!checkTextLengthRange(adresInput.value, 2, 60)){
        valid = false;
        adresInput.classList.add("error-input");
        errorAdresInput.innerText = s1+2+s2+60+s3;
    }

    if(!checkRequired(liczbabudInput.value)){
        valid = false;
        liczbabudInput.classList.add("error-input");
        errorLiczbabudInput.innerText = required;
    } else if(!checkNumberSize(liczbabudInput.value, 1, 50)){
        valid = false;
        liczbabudInput.classList.add("error-input");
        errorLiczbabudInput.innerText = l+1+s2+50;
    }

    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid


}