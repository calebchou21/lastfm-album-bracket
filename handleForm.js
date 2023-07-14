const submitBtn = $("#submit");
const usernameElement = $("#username");
const limitElement = $("#limit");
const periodElement = $("#period");
const formElement = $("#intro-form");
const randomizeElement = document.getElementById("randomize");

let detachedForm;
let formData = {};
let username = "";
let limit = 16;
let period = "overall";
let randomize = randomizeElement.checked;

submitBtn.click(function(event) {
    event.preventDefault();
    validateForm();
  });

function validateForm(){
    if(checkUsername() && checkLimit()){
        period = periodElement.val();
        randomize = randomizeElement.checked;
        startBracket();
    }
}

function startBracket(){
    detachedForm = formElement.detach();
    detachedBracket.appendTo("body");
    loadBracket();
}

function checkUsername(){
    if(usernameElement.val() == ""){
        markError(usernameElement);
        return false;
    }
    else{
        username = usernameElement.val();
        removeError(usernameElement);
        return true;
    }
}

function checkLimit(){
    let limitVal = limitElement.val();
    if(limitVal == "" || limitVal < 16 || limitVal > 100){
        markError(limitElement);
        return false;
    }
    else{
        limit = limitVal;
        removeError(limitElement);
        return true;
    }
}


function removeError(element){
    element.removeClass("error");
}

function markError(element){
    element.addClass("error");
}

