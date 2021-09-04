const count = document.querySelector(".count");
const slider = document.querySelector(".slider__input");
const hover = document.querySelector(".hover");

// Option button
const optionCnt = document.querySelector(".option");
const options = document.querySelectorAll(".option__each");
const colorPallete = document.querySelector("input[type='color']");
const optionInfo = document.querySelector(".option__info");
let borderBool = false;

function randNo(){
    return Math.floor(Math.random() * 255);
}

function returnRGB(value){
    return value.match(/rgb\(([0-9]*), ([0-9]*), ([0-9]*)\)/);
}

function updatePsudoColor(prev1, prev2){
    document.documentElement.style.setProperty("--prev1-color", prev1);
    document.documentElement.style.setProperty("--prev2-color", prev2);
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

function clearColor(){
    let small = hover.querySelectorAll(".hover__small");
    small.forEach(each => {
        each.style.backgroundColor = "unset";
    });
    updatePsudoColor("unset", "unset");
}

let prev1=null, prev2=null;
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
        case "color":
            color = colorPallete.value;
            break;
    }
    optionInfo.innerText = color;
    elem.style.backgroundColor = color;
    document.documentElement.style.setProperty("--curr-color", color);
    updatePsudoColor(prev1, prev2);
    prev2 = prev1;
    prev1 = color;
}

// event listener
function addListener(){
    let small = hover.querySelectorAll(".hover__small");
    small.forEach(each => {
        each.addEventListener("mouseenter", (e) => {
            applyColor(e.target);
        });
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
        if(this.dataset.value === "clear"){
            clearColor();
            return;
        }
        optionCnt.dataset.value = this.dataset.value;
        prevOption.classList.remove("active");
        this.classList.add("active");
        prevOption = this;
    });
});

let prevTouch;
hover.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let elem = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if(!elem.classList.contains("hover__small") || prevTouch === elem) return;
    prevTouch = elem;
    applyColor(elem);
});

addListener();