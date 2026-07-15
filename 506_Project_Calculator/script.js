const display = document.getElementById("display");

let displayValue = "";

const buttons = document.querySelectorAll("button");

buttons.forEach(function(button){

    button.addEventListener("click",function(){

        let value = button.innerText;

        if(value === "C"){

            clearDisplay();

        }

        else if(value === "⌫"){

            backspace();

        }

        else if(value === "="){

            calculate();

        }

        else{

            appendValue(value);

        }

    });

});

function appendValue(value){

    displayValue += value;

    updateDisplay();

}

function updateDisplay(){

    display.value = displayValue;

}

function clearDisplay(){

    displayValue = "";

    updateDisplay();

}

function backspace(){

    displayValue = displayValue.slice(0,-1);

    updateDisplay();

}

function calculate(){

    try{

        displayValue = eval(displayValue).toString();

    }

    catch{

        displayValue = "Error";

    }

    updateDisplay();

}

document.addEventListener("keydown",function(event){

    let key = event.key;

    if((key >= "0" && key <= "9") || key=="+" || key=="-" || key=="*" || key=="/" || key=="." ){

        appendValue(key);

    }

    else if(key=="Enter"){

        calculate();

    }

    else if(key=="Backspace"){

        backspace();

    }

    else if(key=="Escape"){

        clearDisplay();

    }

});