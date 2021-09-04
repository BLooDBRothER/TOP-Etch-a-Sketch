const count = document.querySelector(".count");
const slider = document.querySelector(".slider__input");
const hover = document.querySelector(".hover");

// Option button
const optionCnt = document.querySelector(".option");
const options = document.querySelectorAll(".option__each");
let borderBool = false;

function randNo(){
    return Math.floor(Math.random() * 255);
}

function returnRGB(value){
    return value.match(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)\)/);
}

// option function
function toggleBorders(){
    hover.classList.toggle("hover__border");
}

function calculateGray(elem){
    let clr = returnRGB(elem.style.backgroundColor);
    if(!clr || clr[1] !== clr[2] || clr[1] !== clr[3]){
        return `rgb(255, 255, 255)`;
    }
    return clr[1] <= 0 ? `rgb(255, 255, 255)` : `rgb(${clr[1]-25}, ${clr[1]-25}, ${clr[1]-25})`;
}

function calculateInvert(elem){
    let clr = returnRGB(elem.style.backgroundColor);
    if(!clr){
        return `rgb(255, 255, 255)`;
    }
    return `rgb(${255 - clr[1]}, ${255 - clr[2]}, ${255 - clr[3]})`;
}

function applyColor(elem){
    let color;
    switch(optionCnt.dataset.value){
        case "random":
            color = `rgb(${randNo()}, ${randNo()}, ${randNo()})`;
            break;
        case "gray":
            color = calculateGray(elem);
            break;
        case "invert":
            color = calculateInvert(elem);
            break;
    }
    elem.style.backgroundColor = color;
    document.documentElement.style.setProperty("--curr-color", color);
}

// event listener
function addListener(){
    let small = hover.querySelectorAll(".hover__small");
    small.forEach(each => {
        each.addEventListener("mouseenter", (e) => {
            applyColor(e.target);
        })
    });
}

slider.addEventListener("input", (e) => {
    let value = e.target.value;
    let total = value * value;
    count.innerText = `${value} x ${value} = ${total}`
    let html = "";
    console.log(borderBool);
    let template = `<div class= "hover__small"></div>`
    document.documentElement.style.setProperty("--repeat", `${value}`);
    for(let i=0; i<total; i++){
        html += template;
    }
    hover.innerHTML = html;
    addListener();
});

let prevOption = options[2];
options.forEach(option => {
    option.addEventListener("click", function(e) {
        if(this.classList.contains("option__border")){
            borderBool = !borderBool;
            this.classList.toggle("active");
            toggleBorders();
            return;
        }
        optionCnt.dataset.value = this.dataset.value;
        prevOption.classList.remove("active");
        this.classList.add("active");
        prevOption = this;
    })
});

addListener();