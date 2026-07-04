// querySelector()

const heading = document.querySelector("#heading");

const description = document.querySelector(".description");

const changeBtn = document.querySelector("#changeText");

const themeBtn = document.querySelector("#toggleTheme");

const addBtn = document.querySelector("#addBox");

const container = document.querySelector("#boxContainer");



// Event 1

changeBtn.addEventListener("click", ()=>{

    heading.innerHTML="DOM Manipulation";

    description.textContent="Text successfully changed using JavaScript.";

});



// Event 2

themeBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

});



// Event 3

let count=1;

addBtn.addEventListener("click", ()=>{

    container.innerHTML += `
    
    <div class="box">

        Box ${count}

    </div>
    
    `;

    count++;

});



// querySelectorAll()

const buttons=document.querySelectorAll("button");

console.log(buttons);



// Loop through buttons

buttons.forEach((btn)=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.1)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});