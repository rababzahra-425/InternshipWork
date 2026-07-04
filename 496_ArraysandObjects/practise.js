// Array methods (map, filter, reduce), object destructuring


//Array
const fruits = ["Apple", "Mango", "Orange"];
console.log(fruits);
console.log(fruits[0]); // Apple
console.log(fruits[1])
//adds to the end
const fruit = ["Apple", "Mango"];
fruit.push("Orange");
console.log(fruit);

//removes from the start
const fruitss = ["Apple", "Mango", "Orange"];
fruitss.pop();
console.log(fruitss);

//removers from the beginning
const fruitsss = ["Apple", "Mango", "Orange"];
fruitsss.shift();
console.log(fruitsss);

//add to the beginning
const fruitts = ["Mango", "Orange"];
fruitts.unshift("Apple");
console.log(fruitts);


//make a new new form an array
const numbers = [1,2,3,4];
const result = numbers.map(num => num * 2);
console.log(result);



const names = ["Ali","Ahmed","Sara"];
const upper = names.map(name => name.toUpperCase());
console.log(upper);


const products = [
    {name:"Laptop",price:1000},
    {name:"Phone",price:500}
];
const prices = products.map(product => product.price);
console.log(prices);
const numbbers = [1, 2, 3, 4];

const ressult = numbbers.map((num) => {
    console.log("Current Number:", num);

    const doubled = num * 2;

    console.log("After Multiply:", doubled);

    return doubled;
});

console.log("Final Result:", ressult);


//adds a condition to the array
const users = [
    {name:"Ali", active:true},
    {name:"Sara", active:false},
    {name:"Ahmed", active:true}
];
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);


//Reduce may values into one value(sum, avg)
const nuuumbers = [10,20,30];
const total = numbers.reduce((sum, num) => {
    return sum + num;
},0);
console.log(total);



const numberrs = [10,20,30];

const totaal = numberrs.reduce((sum,num)=>{

    console.log("Previous Sum:",sum);

    console.log("Current Number:",num);

    const newSum = sum + num;

    console.log("New Sum:",newSum);

    return newSum;

},0);

console.log(totaal);



//object destructing

const arr = {
    "name": "Rabab",
    "Rollno": 425
};

const {name , Rollno} = arr;
console.log(name);
console.log(Rollno);


const numbeers = [1,2,3];

const resuult = numbeers.map((num) => {
    debugger; // Execution yahan pause hogi
    return num * 2;
});