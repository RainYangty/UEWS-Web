function cwarnings()
{
    listtype = "warings";
    document.getElementById("list_type").innerText = "ICL历史预警";
    getData();
}

function ccenclist()
{
    listtype = "cenc";
    document.getElementById("list_type").innerText = "CENC测定列表";
    getData();
}

function definemu()
{
    var ding = new Audio('audio/countdown/ding.mp3');
    var sixty = new Audio('audio/countdown/60.mp3');
    var fifty = new Audio('audio/countdown/50.mp3');
    var forty = new Audio('audio/countdown/40.mp3');
    var thirsty = new Audio('audio/countdown/30.mp3');
    var twenty = new Audio('audio/countdown/20.mp3');
    var ten = new Audio('audio/countdown/10.mp3');
    var nine = new Audio('audio/countdown/9.mp3');
    var eight = new Audio('audio/countdown/8.mp3');
    var seven = new Audio('audio/countdown/7.mp3');
    var six = new Audio('audio/countdown/6.mp3');
    var five = new Audio('audio/countdown/5.mp3');
    var four = new Audio('audio/countdown/4.mp3');
    var three = new Audio('audio/countdown/3.mp3');
    var two = new Audio('audio/countdown/2.mp3');
    var one = new Audio('audio/countdown/1.mp3');
    var arrive = new Audio('audio/countdown/arrive.mp3');
    var cenc = new Audio('audio/cenc.mp3');
    cenc.play();
}