const count = document.querySelector(".count");
const slider = document.querySelector(".slider__input");
const hover = document.querySelector(".hover");

// Option button
const options = document.querySelectorAll(".option__each");
let borderBool = false;

// option function
function toggleBorders(){
    let small = hover.querySelectorAll(".hover__small");
    small.forEach(each => {
        each.classList.toggle("hover__border");
    });
}



slider.addEventListener("input", (e) => {
    let value = e.target.value;
    let total = value * value;
    count.innerText = `${value} x ${value} = ${total}`
    let html = "";
    console.log(borderBool);
    let template = `<div class="${borderBool? "hover__small hover__border" : "hover__small"}"></div>`
    document.documentElement.style.setProperty("--repeat", `${value}`);
    for(let i=0; i<total; i++){
        html += template;
    }
    hover.innerHTML = html;
});

options.forEach(option => {
    option.addEventListener("click", function(e) {
        if(this.classList.contains("option__border")){
            borderBool = !borderBool;
            this.classList.toggle("active");
            toggleBorders();
        }
    })
});

addListener();