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
    if (isNaN(Number(document.getElementById("2").value)) || isNaN(Number(document.getElementById("1").value)) || document.getElementById("1").value < 0 || document.getElementById("1").value > 180 || document.getElementById("2").value > 90 || document.getElementById("2").value < 0 || document.getElementById("1").value == "" || document.getElementById("2").value == "") {
        document.getElementById("warninginfo").innerHTML = "输入不合规，请重新输入（仅支持东北半球，请勿输入英文）";
        section.classList.add("active");
    }
    else {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + 30);
        document.cookie = "la=" + document.getElementById("2").value + ";" + "expires=" + oDate;
        document.cookie = "ln=" + document.getElementById("1").value + ";" + "expires=" + oDate;
        document.cookie = "mouseintopen=" + document.getElementById("mouseintopen").checked + ";" + "expires=" + oDate;
        console.log("success");
        console.log(document.getElementById("mouseintopen").checked);
        window.location.href = 'index.html';
    }
}