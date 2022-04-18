function validateOpinion(){
    const trescInput = document.getElementById('Tresc');

    const errorTrescInput = document.getElementById('errorTresc');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([trescInput], [errorTrescInput], errorsSummary);

    const required = document.getElementById('errorMessage-required').innerText;
    const b = document.getElementById('errorMessage-b').innerText;

    let valid = true;

    if(!checkRequired(trescInput.value)){
        valid = false;
        trescInput.classList.add("error-input");
        errorNazwaInput.innerText = required;
    }

    if(!valid){
        errorsSummary.innerText = b;
    }

    return valid


}