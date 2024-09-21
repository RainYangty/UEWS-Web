function getCookie(name) {
    // 拆分 cookie 字符串
    var cookieArr = document.cookie.split(";");
   
    // 循环遍历数组元素
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
       
        /* 删除 cookie 名称开头的空白并将其与给定字符串进行比较 */
        if(name == cookiePair[0].trim()) {
            // 解码cookie值并返回
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // 如果未找到，则返回null
    return null;
}

function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1     = lat1 * Math.PI / 180.0;
    var radLat2     = lat2 * Math.PI / 180.0;
    var a           = radLat1 - radLat2;
    var b           = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s           = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s  // 单位千米
}

//计算sub最大烈度
function calcMaxInt(calcMagnitude, calcDepth) {
    let numa = 1.65 * calcMagnitude;
    let numb = calcDepth < 10 ? 1.21 * Math.log10(10) : 1.21 * Math.log10(calcDepth);
    let maxInt = Math.round(numa / numb) < 12 ? Math.round(numa / numb) : 12.0;
    return (maxInt);
}

function calcint0time(calcMagnitude) {
    return Math.pow(10, (0.92 + 1.63 * calcMagnitude) / 3.49) / 4;
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

function azooms() {
    var bpoints = new Array();
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
    
    if (localInt >= 3.0)
    {
        bpoints.push(new BMapGL.Point(localLon, localLat));
        var view = map.getViewport(eval(bpoints));//eval(bpoints)
        var mapZoom = view.zoom;
        var centerPoint = view.center;
    }
    else
    {
        var mapZoom = 10;
        var view = map.getViewport(eval(bpoints));//eval(bpoints)
        var centerPoint = view.center;
    }
    map.centerAndZoom(centerPoint, mapZoom - 1);
}

var cencjson = "";
var icljson = "";
function getData() {
    if(listtype == "warings")
    {
        $.getJSON("https://mobile-new.chinaeew.cn/v1/earlywarnings?start_at=&updates=" + Date.now(), //https://mobile-new.chinaeew.cn/v1/earlywarnings?start_at=&updates=
        function (json) {
            if(icljson != json)
            {
                icljson = json;
                //cenc.play();
            }
            mainDepth = Math.round(json.data[0].depth * 10) / 10;
            mainEpicenter = json.data[0].epicenter;
            mainStartAt = TimestampToDate(json.data[0].startAt);
            mainMagnitude = Math.round(json.data[0].magnitude * 10) / 10;
            //写入数据
            mainMaxInt = calcMaxInt(mainMagnitude, mainDepth);
            $("#mainEpicenter").text(mainEpicenter);
            document.getElementById("mainDepth").innerHTML = mainDepth + '<font size="3">&nbsp;km</font>';
            document.getElementById("mainMagnitude").innerHTML = '<font size="4">M</font>' + mainMagnitude;
            $("#mainMaxInt").css("background-color", intColor[mainMaxInt].bkcolor);
            $("#mainLeft").css("background-color", intColor[mainMaxInt].bkcolor);
            document.getElementById("mainMaxInt").innerHTML = '<span style="position:relative; top:-2px">' + mainMaxInt + "</span>";
            $("#mainTime").text(mainStartAt);
            for (i = 2; i < 20; i++) {
                subTime = TimestampToDate(json.data[i - 1].startAt);
                subEpicenter = json.data[i - 1].epicenter;
                subMagnitude = Math.round(json.data[i - 1].magnitude * 10) / 10;
                subDepth = json.data[i - 1].depth;
                subMaxInt = calcMaxInt(subMagnitude, subDepth);
                calcSubEpicenterFontSize(subEpicenter, i - 1);
                $("#subTime" + i).text(subTime);
                $("#subEpicenter" + i).text(subEpicenter);
                $("#subMagnitude" + i).text("M" + subMagnitude);
                $("#subMaxInt" + i).text(subMaxInt);
                $("#subMaxInt" + i).css("background-color", intColor[subMaxInt].bkcolor);
                $("#subLeft" + i).css("background-color", intColor[subMaxInt].bkcolor);
            }
        })
    }
    else
    {
        $.getJSON("https://api.wolfx.jp/cenc_eqlist.json?" + Date.now(), function (json) {
            if(cencmd5 != json.md5)
            {
                cencjson = json;
                cenc.play();
                //music.loop =true;
                //music.playbackRate = 2;
                cencmd5 = json.md5;
            }
            mainType = json.No1.type;
            mainDepth = json.No1.depth;
            mainEpicenter = json.No1.location;
            mainStartAt = json.No1.time;
            mainMagnitude = Math.round(json.No1.magnitude * 10) / 10;
            mainTime = json.No1.time;
            //写入数据
            mainMaxInt = calcMaxInt(mainMagnitude, mainDepth);
            $("#mainEpicenter").text(mainEpicenter);
            document.getElementById("mainDepth").innerHTML = mainDepth + '<font size="3">&nbsp;km</font>';
            document.getElementById("mainMagnitude").innerHTML = '<font size="4">M</font>' + mainMagnitude;
            $("#mainMaxInt").css("background-color", intColor[mainMaxInt].bkcolor);
            $("#mainLeft").css("background-color", intColor[mainMaxInt].bkcolor);
            document.getElementById("mainMaxInt").innerHTML = '<span style="position:relative; top:-2px">' + mainMaxInt + "</span>";
            if (mainType == "automatic") {
                mainTime = mainTime + " 自动报";
            } else {
                mainTime = mainTime + " 正式报";
            }
            $("#mainTime").text(mainTime);
            for (i = 2; i < 20; i++) {
                subTime = eval("json.No" + i + ".time");
                subEpicenter = eval("json.No" + i + ".location");
                subMagnitude = Math.round(eval("json.No" + i + ".magnitude") * 10) / 10;
                subDepth = eval("json.No" + i + ".depth");
                subMaxInt = calcMaxInt(subMagnitude, subDepth);
                calcSubEpicenterFontSize(subEpicenter, i);
                $("#subTime" + i).text(subTime);
                $("#subEpicenter" + i).text(subEpicenter);
                $("#subMagnitude" + i).text("M" + subMagnitude);
                $("#subMaxInt" + i).text(subMaxInt);
                $("#subMaxInt" + i).css("background-color", intColor[subMaxInt].bkcolor);
                $("#subLeft" + i).css("background-color", intColor[subMaxInt].bkcolor);
            }
        })
    }
}