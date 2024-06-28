$("#warning_textbox").css("visibility", "visible");
$("#currentTime").css("color", "white");
var typ = '正式接口呐';
document.getElementById("warning_textbox").innerHTML = typ;

var drawseis = false;

//定义烈度配色
const intColor = {
    "0": {
        "bkcolor": "#2e2e2e"
    },
    "1": {
        "bkcolor": "#9edeff"
    },
    "2": {
        "bkcolor": "#76cbf6"
    },
    "3": {
        "bkcolor": "#3cbdff"
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

var map = new BMapGL.Map("allmap");
map.setMapStyleV2({
    styleId: 'ccff97869e9448f19f822123114357ae'
});
var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
map.enableScrollWheelZoom(true);
var _open = true;

const closeBtn = document.querySelector(".close-btn"),
        section = document.querySelector("section");

closeBtn.addEventListener("click", () =>
    section.classList.remove("active")
);

/*window.addEventListener("load", function () {
    setTimeout(function () {
        $("#loading_Background").fadeTo("slow", 0);
    }, 1000);*/
setTimeout(function () {
    $("#loading_Background").css("height", "0px");
    $("#loading_Background").css("width", "0px");
}, 2000)
//});

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

if (getCookie("la") == null) {
    _open = false;
    document.getElementById("warninginfo").innerHTML = "请在加载完毕后页面左下角输入当前位置经纬度坐标（仅支持东北半球，请勿输入英文），否则将关闭倒计时功能(将以cookie形式存储在本地)";

    section.classList.add("active");
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

});
document.getElementById("myBtn4").addEventListener("click", function () {
    $("#1").css("visibility", "hidden");
    $("#2").css("visibility", "hidden");
    $("#myBtn3").css("visibility", "hidden");
    $("#myBtn4").css("visibility", "hidden");
    $("#form-control-text").css("visibility", "visible");
    $("#form-control-text2").css("visibility", "visible");

});
document.getElementById("myBtn3").addEventListener("click", function () {
    if (isNaN(Number(document.getElementById("2").value)) || isNaN(Number(document.getElementById("1").value)) || document.getElementById("1").value < 0 || document.getElementById("1").value > 180 || document.getElementById("2").value > 90 || document.getElementById("2").value < 0 || document.getElementById("1").value == "" || document.getElementById("2").value == "") {
        document.getElementById("warninginfo").innerHTML = "输入不合规，请重新输入（仅支持东北半球，请勿输入英文）";

        section.classList.add("active");
    }
    else {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + 30);
        document.cookie = "la=" + document.getElementById("2").value + ";" + "expires=" + oDate;
        document.cookie = "ln=" + document.getElementById("1").value + ";" + "expires=" + oDate;
        console.log("success");
        window.location.href = 'index.html';
    }
});

document.getElementById("myBtn2").addEventListener("click", function () {
    backcenter();
});

document.getElementById("myBtn7").addEventListener("click", function () {
    window.location.href = 'http://127.0.0.1';
});

if ($(window).width() < 800) {
    document.getElementById("warninginfo").innerHTML = "网页显示异常，请尝试调大网页宽度";

    section.classList.add("active");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>网页显示异常，请尝试调大网页宽度或高度" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据以及icl相关数据，地震速报信息来源为中国地震台网速报公开数据";
}
else if ($(window).width() < 360 || $(window).height() < 160) {
    document.getElementById("warninginfo").innerHTML = "网页显示异常，请尝试调大网页宽度或高度";

    section.classList.add("active");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>网页显示异常，请尝试调大网页宽度或高度" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据以及icl相关数据，地震速报信息来源为中国地震台网速报公开数据";
    $("#list-background").css("visibility", "hidden");
    $("#list").css("visibility", "hidden");
}
if ($(window).width() < 1000) {
    document.getElementById("warninginfo").innerHTML = "鉴于宽度不足，将隐藏CENC地震速报栏";

    section.classList.add("active");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>鉴于宽度不足，将隐藏CENC地震速报栏" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据以及icl相关数据，地震速报信息来源为中国地震台网速报公开数据";
    $("#list-background").css("visibility", "hidden");
    $("#list").css("visibility", "hidden");
    $("#allmap").css("width", "100%");
    $("#allmap").css("height", "100%");
    $("#allmap").css("top", "0px");
    $("#allmap").css("left", "0px");
    $("html, body").css("height", "100%");
    $("html, body").css("width", "100%");
}
else {
    $("#list-background").css("visibility", "visible");
    $("#list").css("visibility", "visible");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据，地震速报信息来源为中国地震台网速报公开数据";
}

document.ontouchmove = function (e) {
    e.preventDefault();
}

var iclStartAt;
var iclLat;
var iclLon;
var iclDepth;
var iclMagnitude;
var iclEpicenter;
var icllastId;
var iclUpdates;
var iclmainMaxInt;
var iclarrivetime;
var systemTime;
var systemTimeStamp;
var currentTimeStamp;
var update = false;
var shake = false;
var centerIcon = new BMapGL.Icon("epicenter.png", new BMapGL.Size(50, 50));

var sc_eewStartAt;
var sc_eewLat;
var sc_eewLon;
var sc_eewDepth;
var sc_eewMagnitude;
var sc_eewEpicenter;
var sc_eewlastId;
var sc_eewUpdates;
var sc_eewmainMaxInt;
var sc_eewlocalname;
var sc_eewarrivetime;


var localLat = getCookie("la");
var localLon = getCookie("ln");
var minInt = 0.0;

var deltatime = 0;

var ifmarker = false;
var centerpointinfo = new BMapGL.Marker(new BMapGL.Point(107.79942839007867, 37.093496518166944), { icon: centerIcon });

function backcenter() {
    var cpoints = new Array();
    cpoints.push(new BMapGL.Point(130, 50));
    cpoints.push(new BMapGL.Point(75, 25));
    var cview = map.getViewport(eval(cpoints));
    var cmapZoom = cview.zoom;
    //var point = new BMapGL.Point(103.79942839007867, 36.093496518166944);
    //var centerpoint = new BMapGL.Marker(point, { icon: centerIcon });
    map.centerAndZoom(cview.center, cmapZoom);
    if(ifmarker)
    {
        map.removeOverlay(centerpointinfo);
        $("#eewmainBar").css("visibility", "hidden");
        ifmarker = false;
    }
    
}

window.onresize = function() {
    setTimeout(function () {
        backcenter();
    }, 100);
};  

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

var iclcancel = true;
var sc_eewcancel = true;

var sceewsWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), 0, { strokeColor: "#FFA500", fillColor: "#FFA500", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var sceewpWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), (0 / 4 * 7), { strokeColor: "#00FFFF", fillColor: "#242424", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var iclsWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), 0, { strokeColor: "#FFA500", fillColor: "#FFA500", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var iclpWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), (0 / 4 * 7), { strokeColor: "#00FFFF", fillColor: "#242424", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆

var warningtf = false;
function sceew() //四川地震局
{
    var starttime = Date.now();
    $.getJSON("https://api.wolfx.jp/sc_eew.json?" + Date.now(),//https://api.wolfx.jp/sc_eew.json
        function (json) {
            var endtime = Date.now();
            document.getElementById("latency").innerHTML = (endtime - starttime) + "ms";
            sc_eewLat = json.Latitude;
            sc_eewLon = json.Longitude;
            sc_eewDepth = json.Depth;
            sc_eewStartAt = Date.parse(new Date(json.OriginTime).toString());
            sc_eewUpdates = json.ReportNum;
            sc_eewEpicenter = json.HypoCenter;
            sc_eewMagnitude = json.Magunitude;
            sc_eewlocalname = json.HypoCenter;

            sc_eewMaxInt = calcMaxInt(sc_eewMagnitude, sc_eewDepth);

            distance = _open ? getDistance(sc_eewLat, sc_eewLon, localLat, localLon) : 0;
            sc_eewarrivetime = Math.round(distance / 4);
            if ((currentTimeStamp - sc_eewStartAt) / 1000 <= 60 + sc_eewarrivetime && (currentTimeStamp - sc_eewStartAt) / 1000 >= 0) {
                if (ifmarker)
                    backcenter();
                sc_eewcancel = false;
                $("#currentTime").css("color", "red");
                $("#textbox").css("background-color", "red");
                // countDown(sc_eewLat, sc_eewLon, sc_eewStartAt, sc_eewMagnitude, sc_eewMaxInt, sc_eewlocalname);
                $("#eewmainBar").css("visibility", "visible");
                if (iclcancel) {
                    document.getElementById("textbox").innerHTML = "地震预警(四川地震局) 第" + sc_eewUpdates + "报";
                    $("#eewmainBar2").css("visibility", "hidden");
                    document.getElementById("eewmainTime").innerHTML = TimestampToDate(sc_eewStartAt);
                    document.getElementById("eewmainEpicenter").innerHTML = sc_eewEpicenter;
                    if (sc_eewDepth != null) {
                        document.getElementById("eewmainDepth").innerHTML = Math.round(sc_eewDepth * 10) / 10 + '<font size="3">&nbsp;km</font>';
                    }
                    else {
                        document.getElementById("eewmainDepth").innerHTML = "深度未知";
                    }
                    document.getElementById("eewmainMagnitude").innerHTML = '<font size="4">M</font>' + (Math.round(sc_eewMagnitude * 100) / 100);
                    $("#eewmainMaxInt").css("background-color", intColor[sc_eewMaxInt].bkcolor);
                    document.getElementById("eewmainMaxInt").innerHTML = sc_eewMaxInt;
                }
                else {
                    document.getElementById("textbox").innerHTML = "icl" + iclUpdates + "报 " + "四川地震局" + sc_eewUpdates + "报";
                    $("#eewmainBar2").css("visibility", "visible");
                    document.getElementById("eewmainTime2").innerHTML = TimestampToDate(sc_eewStartAt);
                    document.getElementById("eewmainEpicenter2").innerHTML = sc_eewEpicenter;
                    if (sc_eewDepth != null) {
                        document.getElementById("eewmainDepth2").innerHTML = Math.round(sc_eewDepth * 10) / 10 + '<font size="3">&nbsp;km</font>';
                    }
                    else {
                        document.getElementById("eewmainDepth2").innerHTML = "深度未知";
                    }
                    document.getElementById("eewmainMagnitude2").innerHTML = '<font size="4">M</font>' + (Math.round(sc_eewMagnitude * 100) / 100);
                    $("#eewmainMaxInt2").css("background-color", intColor[sc_eewMaxInt].bkcolor);
                    document.getElementById("eewmainMaxInt2").innerHTML = sc_eewMaxInt;
                }
                //map.centerAndZoom(new BMapGL.Point(eewLon, eewLat), 12);
                var point = new BMapGL.Point(sc_eewLon, sc_eewLat);
                var centerpoint = new BMapGL.Marker(point, { icon: centerIcon });
                sceewsWave.setCenter(point);
                sceewpWave.setCenter(point);
                map.addOverlay(centerpoint);
                map.disableScrollWheelZoom();
                map.disableDragging();
                //setInterval(drawwave, 0.01, eewLon, eewLat, eewStartAt, "eew");
            }
            else if (!sc_eewcancel && iclcancel) {
                map.enableScrollWheelZoom();
                map.enableDragging();
                sceewsWave.setRadius(0);
                sceewpWave.setRadius(0 / 4 * 7);
                document.getElementById("textbox").innerHTML = "当前无生效中的地震预警";
                backcenter();
                sc_eewcancel = true;
                $("#currentTime").css("color", "white");
                $("#textbox").css("background-color", "#3b3b3b");
                $("#eewmainBar").css("visibility", "hidden");
                $("#eewmainBar2").css("visibility", "hidden");
                $("#countDown").css("visibility", "hidden");
                document.getElementById("seis_type").innerHTML = "本地最近测站";
                //map.removeOverlay(sWave);
                //map.removeOverlay(pWave);
                map.clearOverlays();
                drawseis = false;
                var point = new BMapGL.Point(localLon, localLat);
                var marker = new BMapGL.Marker(point);        // 创建标注   
                map.addOverlay(marker);                     // 将标注添加到地图中
                warningtf = false;
                //window.location.href = 'index.html';
            }
            else if (!iclcancel && !sc_eewcancel) {
                sceewsWave.setRadius(0);
                sceewpWave.setRadius(0 / 4 * 7);
                sc_eewcancel = true;
            }
        });
}

function getinfo(a)
{
    if (sc_eewcancel == true)
    {
        if(ifmarker)
        {
            map.removeOverlay(centerpointinfo);
            backcenter();
            ifmarker = false;
        }
        latitudeinfo = eval("cencjson.No" + a + ".latitude");
        longitudeinfo = eval("cencjson.No" + a + ".longitude");
        var pointinfo = new BMapGL.Point(longitudeinfo, latitudeinfo);
        centerpointinfo = new BMapGL.Marker(pointinfo, { icon: centerIcon });
        $("#eewmainBar").css("visibility", "visible");
        document.getElementById("eewmainTime").innerHTML = eval("cencjson.No" + a + ".time");
        document.getElementById("eewmainEpicenter").innerHTML = eval("cencjson.No" + a + ".location");
        document.getElementById("eewmainDepth").innerHTML = Math.round(eval("cencjson.No" + a + ".depth") * 10) / 10 + '<font size="3">&nbsp;km</font>';
        document.getElementById("eewmainMaxInt").innerHTML = eval("cencjson.No" + a + ".intensity");
        document.getElementById("eewmainMagnitude").innerHTML = '<font size="4">M</font>' + (Math.round(eval("cencjson.No" + a + ".magnitude") * 100) / 100);
        map.addOverlay(centerpointinfo);
        map.centerAndZoom(pointinfo, 10);
        ifmarker = true;
    }

}

function icl() //ICL地震预警网
{
    $.getJSON("https://mobile-new.chinaeew.cn/v1/earlywarnings?start_at=&updates=" + Date.now(), //https://mobile-new.chinaeew.cn/v1/earlywarnings?start_at=&updates=
        function (json) {
            iclLat = json.data[0].latitude;
            icllastId = json.data[0].eventId;
            iclLon = json.data[0].longitude;
            iclDepth = json.data[0].depth;
            iclStartAt = json.data[0].startAt;
            iclUpdates = json.data[0].updates;
            iclEpicenter = json.data[0].epicenter;
            iclMagnitude = json.data[0].magnitude;
            shake = true;
            iclMaxInt = calcMaxInt(iclMagnitude, iclDepth);

            distance = _open ? getDistance(iclLat, iclLon, localLat, localLon) : 0;
            iclarrivetime = Math.round(distance / 4);
            if ((currentTimeStamp - iclStartAt) / 1000 <= 60 + iclarrivetime) {
                iclcancel = false;
                $("#currentTime").css("color", "red");
                $("#textbox").css("background-color", "red");
                countDown()
                //countDown(iclLat, iclLon, iclStartAt, iclMagnitude, iclMaxInt, iclEpicenter);
                $("#eewmainBar").css("visibility", "visible");
                if (sc_eewcancel) {
                    $("#eewmainBar2").css("visibility", "hidden");
                    document.getElementById("textbox").innerHTML = "地震预警(icl) 第" + iclUpdates + "报";
                }
                else {
                    document.getElementById("textbox").innerHTML = "icl" + iclUpdates + "报 " + "四川地震局" + sc_eewUpdates + "报";
                }
                document.getElementById("eewmainTime").innerHTML = TimestampToDate(iclStartAt);
                document.getElementById("eewmainEpicenter").innerHTML = iclEpicenter;
                if (iclDepth != null) {
                    document.getElementById("eewmainDepth").innerHTML = Math.round(iclDepth * 10) / 10 + '<font size="3">&nbsp;km</font>';
                }
                else {
                    document.getElementById("eewmainDepth").innerHTML = "深度未知";
                }
                document.getElementById("eewmainMagnitude").innerHTML = '<font size="4">M</font>' + (Math.round(iclMagnitude * 100) / 100);
                $("#eewmainMaxInt").css("background-color", intColor[iclMaxInt].bkcolor);
                document.getElementById("eewmainMaxInt").innerHTML = iclMaxInt;
                //map.centerAndZoom(new BMapGL.Point(eewLon, eewLat), 12);
                var point = new BMapGL.Point(iclLon, iclLat);
                var centerpoint = new BMapGL.Marker(point, { icon: centerIcon });
                iclsWave.setCenter(point);
                iclpWave.setCenter(point);
                map.addOverlay(centerpoint);
                map.disableScrollWheelZoom();
                map.disableDragging();
                //setInterval(drawwave, 1000, iclLon, iclLat, iclStartAt, "icl");
            }
            else if (!iclcancel && sc_eewcancel) {
                map.enableScrollWheelZoom();
                map.enableDragging();
                iclsWave.setRadius(0);
                iclpWave.setRadius(0 / 4 * 7);
                document.getElementById("textbox").innerHTML = "当前无生效中的地震预警";
                backcenter();
                iclcancel = true;
                $("#currentTime").css("color", "white");
                $("#textbox").css("background-color", "#3b3b3b");
                $("#eewmainBar").css("visibility", "hidden");
                $("#eewmainBar2").css("visibility", "hidden");
                $("#countDown").css("visibility", "hidden");
                document.getElementById("seis_type").innerHTML = "本地最近测站";

                //map.removeOverlay(sWave);
                //map.removeOverlay(pWave);
                map.clearOverlays();
                drawseis = false;
                var point = new BMapGL.Point(localLon, localLat);
                var marker = new BMapGL.Marker(point);        // 创建标注   
                map.addOverlay(marker);                     // 将标注添加到地图中
                warningtf = false;
            }
            else if (!sc_eewcancel && !iclcancel) {
                iclsWave.setRadius(0);
                iclpWave.setRadius(0 / 4 * 7);
                iclcancel = true;
                warningtf = false;
            }
        });
}

function azooms() {
    var bpoints = new Array();
    bpoints.push(new BMapGL.Point(getCookie("ln"), getCookie("la")));
    if (!sc_eewcancel && !iclcancel) {
        bpoints.push(new BMapGL.Point(sc_eewLon, sc_eewLat));
        bpoints.push(new BMapGL.Point(iclLon, iclLat));
    }
    else if (!sc_eewcancel) {
        bpoints.push(new BMapGL.Point(sc_eewLon, sc_eewLat));
    }
    else if (!iclcancel) {
        bpoints.push(new BMapGL.Point(iclLon, iclLat));
    }
    var view = map.getViewport(eval(bpoints));//eval(bpoints)
    var mapZoom = view.zoom;
    var centerPoint = view.center;
    map.centerAndZoom(centerPoint, mapZoom - 1);
}

function drawwave() {
    if ((Date.now() - sc_eewStartAt) / 1000 <= sc_eewarrivetime + 60 && !sc_eewcancel) {
        var sle = (Date.now() - sc_eewStartAt) * 4.0;
        sceewsWave.setRadius(sle);
        sceewpWave.setRadius(sle / 4.0 * 7.0);
        map.addOverlay(sceewpWave);
        map.addOverlay(sceewsWave);
        azooms();
    }
    if ((Date.now() - iclStartAt) / 1000 <= iclarrivetime + 60 && !iclcancel) {
        var sli = (Date.now() - iclStartAt) * 4.0;
        iclsWave.setRadius(sli);
        iclpWave.setRadius(sli / 4.0 * 7.0);
        map.addOverlay(iclpWave);
        map.addOverlay(iclsWave);
        azooms();
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
    return s  // 单位千米
}

var localInt;
var feel;
var distance;
var ty = 0;
function countDown() {
    var Lat, Lon, StartAt, arrivetime, MaxInt, Epicenter, cancel;
    if (ty == 1 || ty == 3) {
        Lat = iclLat;
        Lon = iclLon;
        StartAt = iclStartAt;
        arrivetime = iclarrivetime;
        MaxInt = iclMaxInt;
        Epicenter = iclEpicenter;
        cancel = iclcancel;
        Magnitude = iclMagnitude;
    }
    else if (ty == 0 || ty == 2) {
        Lat = sc_eewLat;
        Lon = sc_eewLon;
        StartAt = sc_eewStartAt;
        arrivetime = sc_eewarrivetime;
        MaxInt = sc_eewmainMaxInt;
        Epicenter = sc_eewEpicenter;
        cancel = sc_eewcancel;
        Magnitude = sc_eewMagnitude;
    }
    distance = getDistance(Lat, Lon, localLat, localLon);
    timeMinus = currentTimeStamp - StartAt;
    timeMinusSec = timeMinus / 1000;
    localInt = 0.92 + 1.63 * Magnitude - 3.49 * Math.log10(distance);

    if (timeMinus <= 60000 * 60 + arrivetime * 60000 && _open && !cancel) {//&& localInt >= minInt
        $("#countDown").css("visibility", "visible");
        document.getElementById("seis_type").innerHTML = "震中最近测站";
        //setInterval(countdownRun, 1000, Lat, Lon, OriTime);
        if (!warningtf) {
            if (localInt >= 3.0 && localInt < 5.0) {
                warningtf = true;
                if (arrivetime * 60000 - 60000 * 10 - timeMinus >= 60000 * 4) {
                    var music = new Audio('audio/eew1.mp3');
                    music.play();
                }
            }
            else if (localInt >= 5.0) {
                warningtf = true;
                if (arrivetime * 60000 - 60000 * 10 - timeMinus >= 60000 * 4) {
                    var music = new Audio('audio/eew2.mp3');
                    music.play();
                }
            }
            else {
                warningtf = true;
                var music = new Audio('audio/update.mp3');
                music.play();
            }
        }
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
    }
}

var cd = 0;
var cdp = 0;

function countdownAudio() {
    if (warningtf && localInt >= 3.0) {
        if (cd == 61) {
            sixty.play();
        }
        else if (cd == 51) {
            fifty.play();
        }
        else if (cd == 41) {
            forty.play();
        }
        else if (cd == 31) {
            thirsty.play();
        }
        else if (cd == 21) {
            twenty.play();
        }
        else if (cd == 11) {
            ten.play();
        }
        else if (cd == 10) {
            nine.play();
        }
        else if (cd == 9) {
            eight.play();
        }
        else if (cd == 8) {
            seven.play();
        }
        else if (cd == 7) {
            six.play();
        }
        else if (cd == 6) {
            five.play();
        }
        else if (cd == 5) {
            four.play();
        }
        else if (cd == 4) {
            three.play();
        }
        else if (cd == 3) {
            two.play();
        }
        else if (cd == 2) {
            one.play();
        }
        else if (cd == 1) {
            arrive.play();
        }
        else {
            ding.play();
        }
    }
}

function countdownRun() {
    if (!_open) {
        return;
    }
    else if (sc_eewarrivetime - (Date.now() - sc_eewStartAt) / 1000 < iclarrivetime - (Date.now() - iclStartAt) / 1000 && !iclcancel && !sc_eewcancel && (Date.now() - sc_eewStartAt) / 1000 <= sc_eewarrivetime) {
        ty = 0;
        distance = getDistance(sc_eewLat, sc_eewLon, localLat, localLon);
        timeMinus = Date.now() - sc_eewStartAt;
        timeMinusSec = timeMinus / 1000;
        cd = Math.round(distance / 4 - timeMinusSec);
        cdp = Math.round(distance / 7 - timeMinusSec);
        if (cd <= 0) {
            cd = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        if (cdp <= 0) {
            cdp = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        else {
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波将抵达";
        }
        if (cd >= 999) cd = 999;
        if (cdp >= 999) cdp = 999;
        document.getElementById("countDown_SNumber").innerHTML = cd;
        document.getElementById("countDown_PNumber").innerHTML = cdp;
    }
    else if (sc_eewarrivetime - (Date.now() - sc_eewStartAt) / 1000 > iclarrivetime - (Date.now() - iclStartAt) / 1000 && !iclcancel && !sc_eewcancel && (Date.now() - iclStartAt) / 1000 <= iclarrivetime) {
        ty = 1;
        distance = getDistance(iclLat, iclLon, localLat, localLon);
        timeMinus = Date.now() - iclStartAt;
        timeMinusSec = timeMinus / 1000;
        cd = Math.round(distance / 4 - timeMinusSec);
        cdp = Math.round(distance / 7 - timeMinusSec);
        if (cd <= 0) {
            cd = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        if (cdp <= 0) {
            cdp = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        else {
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波将抵达";
        }
        if (cd >= 999) cd = 999;
        if (cdp >= 999) cdp = 999;
        document.getElementById("countDown_SNumber").innerHTML = cd;
        document.getElementById("countDown_PNumber").innerHTML = cdp;
    }
    else if ((Date.now() - iclStartAt) / 1000 > iclarrivetime && (Date.now() - sc_eewStartAt) / 1000 <= sc_eewarrivetime) {
        ty = 2;
        distance = getDistance(sc_eewLat, sc_eewLon, localLat, localLon);
        timeMinus = Date.now() - sc_eewStartAt;
        timeMinusSec = timeMinus / 1000;
        cd = Math.round(distance / 4 - timeMinusSec);
        cdp = Math.round(distance / 7 - timeMinusSec);
        if (cd <= 0) {
            cd = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        if (cdp <= 0) {
            cdp = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        else {
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波将抵达";
        }
        if (cd >= 999) cd = 999;
        if (cdp >= 999) cdp = 999;
        document.getElementById("countDown_SNumber").innerHTML = cd;
        document.getElementById("countDown_PNumber").innerHTML = cdp;
    }
    else if ((Date.now() - iclStartAt) / 1000 <= iclarrivetime && (Date.now() - sc_eewStartAt) / 1000 > sc_eewarrivetime) {
        ty = 3;
        distance = getDistance(iclLat, iclLon, localLat, localLon);
        timeMinus = Date.now() - iclStartAt;
        timeMinusSec = timeMinus / 1000;
        cd = Math.round(distance / 4 - timeMinusSec);
        cdp = Math.round(distance / 7 - timeMinusSec);
        if (cd <= 0) {
            cd = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        if (cdp <= 0) {
            cdp = "抵达";
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        }
        else {
            //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波将抵达";
        }
        if (cd >= 999) cd = 999;
        if (cdp >= 999) cdp = 999;
        document.getElementById("countDown_SNumber").innerHTML = cd;
        document.getElementById("countDown_PNumber").innerHTML = cdp;
    }
    else {
        cd = "抵达";
        cdp = "抵达";
        //document.getElementById("countDown_Text").innerHTML = feel + "<br>" + "地震横波已抵达";
        document.getElementById("countDown_SNumber").innerHTML = cd;
        document.getElementById("countDown_PNumber").innerHTML = cdp;
    }
    //console.log("countdownRun() 运行中");
}

backcenter();
setInterval(sceew, 2000);
setInterval(icl, 2000);
setInterval(drawwave, 100);
setInterval(settime, 100);
setInterval(countdownAudio, 1000);
setInterval(countdownRun, 1000);
setInterval(countDown, 1000);
setInterval(getcurrenttime, 10000);
$("#currentTime").css("color", "white");
