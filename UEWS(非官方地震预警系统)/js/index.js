//定义烈度配色
const intColor = {
    "0": {
        "bkcolor": "#2e2e2e"
    },
    "1": {
        "bkcolor": "#9bc4e4"
    },
    "2": {
        "bkcolor": "#00a0f1"
    },
    "3": {
        "bkcolor": "#0062f5"
    },
    "4": {
        "bkcolor": "#46BC67"
    },
    "5": {
        "bkcolor": "#12994E"
    },
    "6": {
        "bkcolor": "#F6B72D"
    },
    "7": {
        "bkcolor": "#FF8400"
    },
    "8": {
        "bkcolor": "#fa5151"
    },
    "9": {
        "bkcolor": "#f4440d"
    },
    "10": {
        "bkcolor": "#ff000d"
    },
    "11": {
        "bkcolor": "#c20007"
    },
    "12": {
        "bkcolor": "#fd2fc2"
    }
};

var map = new BMapGL.Map("allmap");
map.setMapStyleV2({
    styleId: 'ccff97869e9448f19f822123114357ae'
});
map.centerAndZoom(new BMapGL.Point(107.79942839007867, 37.093496518166944), 12);
var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
map.enableScrollWheelZoom(true);
setTimeout('map.centerAndZoom(new BMapGL.Point(107.79942839007867, 37.093496518166944), 5)', 1000);
var _open = true;


window.addEventListener("load", function () {
    setTimeout(function () {
        $("#loading_Background").fadeTo("slow", 0);
    }, 1000);
    setTimeout(function () {
        $("#loading_Background").css("height", "0px");
        $("#loading_Background").css("width", "0px");
    }, 2000)
});

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

if (getCookie("la") == null) {
    open = false;
    alert("请在加载完毕后页面左下角输入当前位置经纬度坐标（仅支持东北半球，请勿输入英文），否则将关闭倒计时功能(将以cookie形式存储在本地)");
    $("#1").css("visibility", "visible");
    $("#2").css("visibility", "visible");
    $("#myBtn3").css("visibility", "visible");
    $("#form-control-text").css("visibility", "hidden");
    $("#form-control-text2").css("visibility", "hidden");
}
else {
    $("#1").css("visibility", "hidden");
    $("#2").css("visibility", "hidden");
    $("#form-control-text").css("visibility", "visible");
    $("#form-control-text2").css("visibility", "visible");
    document.getElementById("form-control-text").innerHTML = getCookie("ln") + "°E";
    document.getElementById("form-control-text2").innerHTML = getCookie("la") + "°N";
    var point = new BMapGL.Point(getCookie("ln"), getCookie("la"));
    var marker = new BMapGL.Marker(point);        // 创建标注   
    map.addOverlay(marker);                     // 将标注添加到地图中
}

document.getElementById("myBtn").addEventListener("click", function () {
    $("#1").css("visibility", "visible");
    $("#2").css("visibility", "visible");
    $("#myBtn3").css("visibility", "visible");
    $("#myBtn4").css("visibility", "visible");
    $("#form-control-text").css("visibility", "hidden");
    $("#form-control-text2").css("visibility", "hidden");

})

document.getElementById("myBtn4").addEventListener("click", function () {
    $("#1").css("visibility", "hidden");
    $("#2").css("visibility", "hidden");
    $("#myBtn3").css("visibility", "hidden");
    $("#myBtn4").css("visibility", "hidden");
    $("#form-control-text").css("visibility", "visible");
    $("#form-control-text2").css("visibility", "visible");

})

document.getElementById("myBtn3").addEventListener("click", function () {
    if (isNaN(Number(document.getElementById("2").value)) || isNaN(Number(document.getElementById("1").value)) || document.getElementById("1").value < 0 || document.getElementById("1").value > 180 || document.getElementById("2").value > 90 || document.getElementById("2").value < 0 || document.getElementById("1").value == "" || document.getElementById("2").value == "") {
        alert("输入不合规，请重新输入（仅支持东北半球，请勿输入英文）");
    }
    else {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + 30);
        document.cookie = "la=" + document.getElementById("2").value + ";" + "expires=" + oDate;
        document.cookie = "ln=" + document.getElementById("1").value + ";" + "expires=" + oDate;
        console.log("success");
        window.location.href = 'index.html';
    }
})

document.getElementById("myBtn2").addEventListener("click", function () {
    map.centerAndZoom(new BMapGL.Point(107.79942839007867, 37.093496518166944), 5);
})

if ($(window).width() < 800) {
    alert("网页显示异常，请尝试调大网页宽度");
    document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>网页显示异常，请尝试调大网页宽度或高度" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据，地震速报信息来源为中国地震台网速报公开数据";
}
else if ($(window).width() < 360 || $(window).height() < 160) {
    alert("网页显示异常，请尝试调大网页宽度或高度");
    document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>网页显示异常，请尝试调大网页宽度或高度" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据，地震速报信息来源为中国地震台网速报公开数据";
    $("#list").css("visibility", "hidden");
}
if ($(window).width() < 1000) {
    alert("鉴于宽度不足，将隐藏CENC地震速报栏");
    document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>鉴于宽度不足，将隐藏CENC地震速报栏" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据，地震速报信息来源为中国地震台网速报公开数据";
    $("#list").css("visibility", "hidden");
    $("#allmap").css("width", "100%");
    $("#allmap").css("height", "100%");
    $("#allmap").css("top", "0px");
    $("#allmap").css("left", "0px");
    $("html, body").css("height", "100%");
    $("html, body").css("width", "100%");
}
else {
    $("#list").css("visibility", "visible");
    document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据，地震速报信息来源为中国地震台网速报公开数据";
}

document.ontouchmove = function (e) {
    e.preventDefault();
}

var systemTime;
var systemTimeStamp;
var currentTimeStamp;
var update = false;
var shake = false;
var centerIcon = new BMapGL.Icon("epicenter.png", new BMapGL.Size(50, 50));

var eqsum = 0;

var eewStartAt;
var eewLat;
var eewLon;
var eewDepth;
var eewMagnitude;
var eewEpicenter;
var eewlastId;
var eewUpdates;
var eewmainMaxInt;
var eewlocalname;


var localLat = getCookie("la");
var localLon = getCookie("ln");

var deltatime = 0;

//计算sub最大烈度
function calcMaxInt(calcMagnitude, calcDepth) {
    let numa = 1.65 * calcMagnitude;
    let numb = calcDepth < 10 ? 1.21 * Math.log10(10) : 1.21 * Math.log10(calcDepth);
    let maxInt = Math.round(numa / numb) < 12 ? Math.round(numa / numb) : 12.0;
    return (maxInt);
}

function TimestampToDate(Timestamp) {
    let now = new Date(Timestamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}

function DateToTimestamp(_Date) {
    return new Date(_Date).getTime();
}

function getcurrenttime() //同步时间
{
    var start = Date.now();
    $.getJSON("https://api.wolfx.jp/ntp.json?" + Date.now(),
        function (json) {
            systemTime = Date();
            systemTimeStamp = Date.now();
            deltatime = DateToTimestamp(json.CST.str) - Date.parse(new Date()) + (systemTimeStamp - start);
            // console.log(deltatime)
        })
}

function settime() //同步时间
{
    systemTime = Date();
    systemTimeStamp = Date.now();
    currentTimeStamp = Date.parse(new Date()) + deltatime;
    document.getElementById("currentTime").innerHTML = TimestampToDate(Date.parse(new Date()) + deltatime);
}

var eewcancel = true;

var sWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), 0, { strokeColor: "#FFA500", fillColor: "#FFA500", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var pWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), (0 / 4 * 7), { strokeColor: "#00FFFF", fillColor: "#242424", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆

function sceew() //四川地震局
{
    $.getJSON("https://api.wolfx.jp/sc_eew.json?" + Date.now(),//https://api.wolfx.jp/sc_eew.json
        function (json) {
            eewLat = json.Latitude;
            eewLon = json.Longitude;
            eewDepth = json.Depth;
            eewStartAt = Date.parse(new Date(json.OriginTime).toString());
            eewUpdates = json.ReportNum;
            eewEpicenter = json.HypoCenter;
            eewMagnitude = json.Magunitude;
            eewlocalname = json.HypoCenter;

            eewMaxInt = calcMaxInt(eewMagnitude, eewDepth);

            distance = _open ? getDistance(eewLat, eewLon, localLat, localLon) : 0;
            arrivetime = Math.round(distance / 4);
            if ((currentTimeStamp - eewStartAt) / 1000 <= 60 + arrivetime) {
                eewcancel = false;
                document.getElementById("textbox").innerHTML = "地震预警(四川地震局) 第" + eewUpdates + "报";
                $("#currentTime").css("color", "red");
                $("#textbox").css("background-color", "red");
                countDown(eewLat, eewLon, eewStartAt, eewMagnitude, eewMaxInt, eewlocalname);
                $("#eewmainBar").css("visibility", "visible");
                $("#eewmainBar2").css("visibility", "hidden");
                document.getElementById("eewmainTime").innerHTML = TimestampToDate(eewStartAt);
                document.getElementById("eewmainEpicenter").innerHTML = eewEpicenter;
                if (eewDepth != null) {
                    document.getElementById("eewmainDepth").innerHTML = Math.round(eewDepth * 10) / 10 + '<font size="3">&nbsp;km</font>';
                }
                else {
                    document.getElementById("eewmainDepth").innerHTML = "深度未知";
                }
                document.getElementById("eewmainMagnitude").innerHTML = '<font size="4">M</font>' + (Math.round(eewMagnitude * 100) / 100);
                $("#eewmainMaxInt").css("background-color", intColor[eewMaxInt].bkcolor);
                document.getElementById("eewmainMaxInt").innerHTML = eewMaxInt;
                //map.centerAndZoom(new BMapGL.Point(eewLon, eewLat), 12);
                var point = new BMapGL.Point(eewLon, eewLat);
                var centerpoint = new BMapGL.Marker(point, { icon: centerIcon });
                map.addOverlay(centerpoint);
                map.disableScrollWheelZoom();
                map.disableDragging();

            }
            else if (!eewcancel) {
                map.enableScrollWheelZoom();
                map.enableDragging();
                sWave.setRadius(0);
                pWave.setRadius(0 / 4 * 7);
                eqsum -= 1;
                document.getElementById("textbox").innerHTML = "当前无生效中的地震预警";
                map.centerAndZoom(new BMapGL.Point(107.79942839007867, 37.093496518166944), 5);
                eewcancel = true;
                $("#currentTime").css("color", "white");
                $("#textbox").css("background-color", "#3b3b3b");
                $("#eewmainBar").css("visibility", "hidden");
                $("#eewmainBar2").css("visibility", "hidden");
                $("#countDown").css("visibility", "hidden");
                //map.removeOverlay(sWave);
                //map.removeOverlay(pWave);
                map.clearOverlays();
                var point = new BMapGL.Point(localLon, localLat);
                var marker = new BMapGL.Marker(point);        // 创建标注   
                map.addOverlay(marker);                     // 将标注添加到地图中
                window.location.href = 'index.html';
            }
        })
}

function azooms(type) {
    var bpoints = new Array();
    bpoints.push(new BMapGL.Point(getCookie("ln"), getCookie("la")));
    bpoints.push(new BMapGL.Point(eewLon, eewLat));
    var view = map.getViewport(eval(bpoints));
    var mapZoom = view.zoom;
    var centerPoint = view.center;
    map.centerAndZoom(centerPoint, mapZoom - 1);
}

function drawwave() {
    Lon = eewLon;
    Lat = eewLat;
    StartAt = eewStartAt;
    type = "eew";
    if (type == "eew" && eewcancel) {
        return;
    }
    eqsum = 1;
    if ((currentTimeStamp - StartAt) / 1000 <= arrivetime + 60) {
        var startATStamp = StartAt;
        var sl = (currentTimeStamp - startATStamp) / 1000 * 4000;
        var point = new BMapGL.Point(Lon, Lat);
        sWave.setRadius(sl);
        pWave.setRadius(sl / 4 * 7);
        sWave.setCenter(point);
        pWave.setCenter(point);
        map.addOverlay(pWave);
        map.addOverlay(sWave)
        azooms(type);
    }
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

function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;  // 单位千米
}

var localInt;
var feel;
var distance;
function countDown(Lat, Lon, OriTime, Magnitude, MaxInt, localName) {
    distance = getDistance(Lat, Lon, localLat, localLon);
    timeMinus = currentTimeStamp - OriTime;
    timeMinusSec = timeMinus / 1000;
    localInt = 0.92 + 1.63 * Magnitude - 3.49 * Math.log10(distance);

    if (timeMinus <= 60000 * 60 + arrivetime * 60000 && localInt >= 3.0 && _open) {

        $("#countDown").css("visibility", "visible");
        if (localInt < 0) {
            localInt = "0.0"
        } else if (localInt >= 0 && localInt < 12) {
            localInt = localInt.toFixed(1);
        } else if (localInt >= 12) {
            localInt = "12.0"
        }
        if (localInt >= MaxInt) localInt = MaxInt;
        if (localInt < 1.0) {
            feel = "无震感";
        } else if (localInt >= 1.0 && localInt < 2.0) {
            feel = "震感微弱";
        } else if (localInt >= 2.0 && localInt < 3.0) {
            feel = "高楼层有震感";
        } else if (localInt >= 3.0 && localInt < 4.0) {
            feel = "震感较强";
        } else if (localInt >= 4.0 && localInt < 5.0) {
            feel = "震感强烈";
        } else if (localInt >= 5.0) {
            feel = "震感极强";
        }
        $("#eewMaxInt").css("background-color", intColor[Math.round(localInt) <= 0 ? 0 : Math.round(localInt)].bkcolor);
        document.getElementById("eewMaxInt").innerHTML = Math.round(localInt) <= 0 ? 0 : Math.round(localInt);
        document.getElementById("countDown_LocalName").innerHTML = '<span style="position: relative; top: 3px;"><ion-icon name="navigate-circle-outline"></ion-icon></span>' + localName + "<br>&nbsp;预估烈度" + localInt + "度";
    }
}

function countdownRun() {
    Lat = eewLat;
    Lon = eewLon;
    OriTime = eewStartAt;
    if (!_open) {
        return;
    }
    //console.log("countdownRun() 运行中");
    distance = getDistance(Lat, Lon, localLat, localLon);
    timeMinus = currentTimeStamp - OriTime;
    timeMinusSec = timeMinus / 1000;
    cd = Math.round(distance / 4 - timeMinusSec);
    if (cd <= 0) {
        cd = "抵达";
        document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
    }
    else {
        document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波将抵达";
    }
    if (cd >= 999) cd = 999;
    document.getElementById("countDown_Number").innerHTML = cd;
}

setInterval(sceew, 2000);
setInterval(settime, 1000);
setInterval(getcurrenttime, 10000);
setInterval(drawwave, 1000);
setInterval(countdownRun, 1000);
$("#currentTime").css("color", "white");