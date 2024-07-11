const settingBtn = document.getElementById("settings"),
popup = document.querySelector(".popup"),
closeal = document.getElementById("close"),
field = popup.querySelector(".field"),
input = field.querySelector("input"),
okk = document.getElementById("ok");

function settings()
{
    popup.classList.toggle("show");
}
closeal.onclick = ()=>{
    settingBtn.click();
}

okk.onclick = ()=>{
    if (isNaN(Number(document.getElementById("minint").value)) || isNaN(Number(document.getElementById("la").value)) || isNaN(Number(document.getElementById("ln").value)) || document.getElementById("ln").value < 0 || document.getElementById("ln").value > 180 || document.getElementById("la").value > 90 || document.getElementById("la").value < 0 || document.getElementById("ln").value == "" || document.getElementById("la").value == "") {
        document.getElementById("warninginfo").innerHTML = "输入不合规，请重新输入";
        section.classList.add("active");
    }
    else {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + 30);
        document.cookie = "la=" + document.getElementById("la").value + ";" + "expires=" + oDate;
        document.cookie = "ln=" + document.getElementById("ln").value + ";" + "expires=" + oDate;
        document.cookie = "minint=" + Math.round(document.getElementById("minint").value * 10) / 10 + ";" + "expires=" + oDate;
        document.cookie = "mouseintopen=" + document.getElementById("mouseintopen").checked + ";" + "expires=" + oDate;
        document.cookie = "delay=" + document.getElementById("delay-serverip").value + ";" + "expires=" + oDate;
        console.log("success");
        console.log(document.getElementById("mouseintopen").checked);
        window.location.href = 'index.html';
    }
}