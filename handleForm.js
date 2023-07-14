const submitBtn = $("#submit");
const usernameElement = $("#username");
const limitElement = $("#limit");
const periodElement = $("#period");
const randomizeElement = $("#randomize");

submitBtn.click(function(event) {
    event.preventDefault();
    validateForm();
  });

function validateForm(){
    
}

function checkUsername(){
    if(usernameElement.val() == ""){
        markError(usernameElement);
        return false;
    }
    else{
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

