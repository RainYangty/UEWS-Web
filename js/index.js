$("#currentTime").css("color", "white");

/*window.addEventListener("load", function () {
    setTimeout(function () {
        $("#loading_Background").fadeTo("slow", 0);
    }, 1000);*/
setTimeout(function () {
    $("#loading_Background").css("height", "0px");
    $("#loading_Background").css("width", "0px");
}, 2000)
//});

var localLat = getCookie("la");
var localLon = getCookie("ln");

function getcurrenttime() //同步时间
{
    var start = Date.now();
    $.getJSON("https://api.wolfx.jp/ntp.json?" + Date.now(),
        function (json) {
            systemTime = Date();
            systemTimeStamp = Date.now();
            deltatime = DateToTimestamp(json.CST.str) - Date.parse(new Date()) + (systemTimeStamp - start);
            // console.log(deltatime)
            if (deltatime / 1000 >= 10) {
                $("#warning_textbox").css("visibility", "visible");
                $("#currentTime").css("color", "red");
                document.getElementById("warning_textbox").innerHTML = "请校准系统时间";
            }
            else {
                $("#warning_textbox").css("visibility", "hidden");
                $("#currentTime").css("color", "white");
                //document.getElementById("warning_textbox").innerHTML = "内部测试";
            }
        });
}

function settime() //同步时间
{
    systemTime = Date();
    systemTimeStamp = Date.now();
    currentTimeStamp = Date.parse(new Date()) + deltatime;
    document.getElementById("currentTime").innerHTML = TimestampToDate(Date.parse(new Date()) + deltatime);
}

function scanserver()
{
    delayconnect = false;
    $("#delay").css("color", "#fa5151");
    $.getJSON(delayip + "/static/switch.json?" + Date.now(),function (json) {
        $("#delay").css("color", "#46BC67");
        delayconnect = true;
    });
    
}

//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度算法参考:https://github.com/CRooi/CEIV-1.0.0 598-691行
/* function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6371.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
} */

//backcenter();
getData();
setInterval(sceew, 2000);
setInterval(icl, 2000);
setInterval(drawwave, 500);
setInterval(settime, 1000);
setInterval(countdownAudio, 1000);
setInterval(countdownRun, 1000);
setInterval(countDown, 1000);
setInterval(getcurrenttime, 10000);
setInterval(getData, 5000);
$("#currentTime").css("color", "white");
