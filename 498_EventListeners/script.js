// =========================================
// CLICK EVENT
// =========================================

const clickBtn = document.querySelector("#clickBtn");

const clickResult = document.querySelector("#clickResult");

clickBtn.addEventListener("click", function (event) {

    clickResult.innerHTML = `
    Button Clicked <br>
    Event Type : ${event.type}
    `;

    console.log(event);

});



// =========================================
// COUNTER
// =========================================

let count = 0;

const increaseBtn = document.querySelector("#increaseBtn");

const counter = document.querySelector("#count");

increaseBtn.addEventListener("click", () => {

    count++;

    counter.textContent = count;

});



// =========================================
// SUBMIT EVENT
// =========================================

const form = document.querySelector("#myForm");

const formResult = document.querySelector("#formResult");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#name").value;

    formResult.textContent = `Welcome ${name}`;

});




// =========================================
// KEYDOWN EVENT
// =========================================

const keyboardInput = document.querySelector("#keyboardInput");

const keyResult = document.querySelector("#keyResult");

keyboardInput.addEventListener("keydown", function (event) {

    keyResult.innerHTML = `
    Key : ${event.key}<br>
    Code : ${event.code}
    `;

});




// CTRL + S

document.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "s") {

        event.preventDefault();

        alert("CTRL + S Pressed");

    }

});




// =========================================
// EVENT BUBBLING
// =========================================

const parent = document.querySelector("#parent");

const childBtn = document.querySelector("#childBtn");

parent.addEventListener("click", function () {

    console.log("Parent Clicked");

});

childBtn.addEventListener("click", function (event) {

    console.log("Child Button Clicked");

    // Comment this line to see bubbling
    // event.stopPropagation();

});




// =========================================
// EVENT DELEGATION
// =========================================

const fruitList = document.querySelector("#fruitList");

fruitList.addEventListener("click", function (event) {

    if (event.target.tagName === "LI") {

        alert(event.target.innerText);

        event.target.style.color = "red";

    }

});




// Dynamic Elements

const addFruit = document.querySelector("#addFruit");

let number = 1;

addFruit.addEventListener("click", function () {

    const li = document.createElement("li");

    li.innerText = "New Fruit " + number++;

    fruitList.appendChild(li);

});




// =========================================
// REMOVE EVENT LISTENER
// =========================================

const helloBtn = document.querySelector("#helloBtn");

const removeBtn = document.querySelector("#removeBtn");

function hello() {

    alert("Hello");

}

helloBtn.addEventListener("click", hello);

removeBtn.addEventListener("click", function () {

    helloBtn.removeEventListener("click", hello);

    alert("Listener Removed");

});