const msgsDom = document.querySelector(".msgs");
function showeew(Time, Epicenter, Depth, Magnitude, MaxInt)
{
    const newMsgDom = document.createElement("div");
    newMsgDom.innerText = msg;
    newMsgDom.classList.add("msg");
    //newMsgDom.classList.add(type);
    msgsDom.appendChild(newMsgDom);
    if (duration >= 0)
        setTimeout(() => {
            newMsgDom.remove();
        }, duration);
}