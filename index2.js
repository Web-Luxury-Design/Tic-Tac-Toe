const btns=document.querySelectorAll(".restartButton")
const GeneratorContainer=document.querySelector(".generator_bubble")
let interval;

const generatorBubbles=()=>{
    GeneratorContainer.style.visibility="visible"
    const bubble=document.createElement("span")
    const ContainerBubbles=document.querySelector(".generator_bubble")
    ContainerBubbles.appendChild(bubble)
    bubble.classList.add("bubble")
    let size=Math.floor(Math.random()*150)+50;
    let direction=Math.floor(Math.random()*100);
    bubble.style.width=size +"px";
    bubble.style.height=size +"px";
    bubble.style.left=direction +"%";
    bubble.style.top=direction +50+"%";

    let orientation=Math.random()*1 <0.4 ? 1 : -1
    bubble.style.setProperty("--left", Math.random()*100*orientation+50 +"%")
    setTimeout(()=>{
        bubble.remove()
    },5000)
}
btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        GeneratorContainer.style.visibility="hidden"
        clearInterval(interval)
    })
})
