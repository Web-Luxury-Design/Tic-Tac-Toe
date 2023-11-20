const bubble=document.createElement("span")
const ContainerBubbles=document.querySelector(".generator_bubble")


ContainerBubbles.appendChild(bubble)
bubble.classList.add("bubble")

let size=Math.floor(Math.random()*150)+50;
let left=Math.floor(Math.random()*100);
bubble.style.width=size +"px";
bubble.style.height=size +"px";
bubble.style.left=left +"%";


