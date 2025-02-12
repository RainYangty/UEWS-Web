var sceewsWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), 0, { strokeColor: "#FFA500", fillColor: "#FFA500", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var sceewpWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), (0 / 4 * 7), { strokeColor: "#00FFFF", fillColor: "#242424", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var iclsWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), 0, { strokeColor: "#FFA500", fillColor: "#FFA500", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆
var iclpWave = new BMapGL.Circle(new BMapGL.Point(107.79942839007867, 37.093496518166944), (0 / 4 * 7), { strokeColor: "#00FFFF", fillColor: "#242424", strokeWeight: 2, strokeOpacity: 0.5 }, "s"); //创建圆

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
var iclint0time;

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
var sc_eewint0time;

var ifmarker = false;
var centerpointinfo = new BMapGL.Marker(new BMapGL.Point(107.79942839007867, 37.093496518166944), { icon: centerIcon });

var centerIcon = new BMapGL.Icon("epicenter.png", new BMapGL.Size(50, 50));

var iclcancel = true;
var sc_eewcancel = true;

var warningtf = false;

function getinfo(a) {
    if (sc_eewcancel == true) {
        if (ifmarker) {
            map.removeOverlay(centerpointinfo);
            backcenter();
            ifmarker = false;
        }
        if (listtype == "warings") {
            a -= 1;
            latitudeinfo = icljson.data[a].latitude;
            longitudeinfo = icljson.data[a].longitude;
            var pointinfo = new BMapGL.Point(longitudeinfo, latitudeinfo);
            centerpointinfo = new BMapGL.Marker(pointinfo, { icon: centerIcon });
            $("#eewmainBar").css("visibility", "visible");
            document.getElementById("eewmainTime").innerHTML = TimestampToDate(icljson.data[a].startAt);
            document.getElementById("eewmainEpicenter").innerHTML = icljson.data[a].epicenter;
            document.getElementById("eewmainDepth").innerHTML = Math.round(icljson.data[a].depth * 10) / 10 + '<font size="3">&nbsp;km</font>';
            if (_open) {
                document.getElementById("epidis1").innerHTML = Math.round(getDistance(latitudeinfo, longitudeinfo, localLat, localLon) * 100) / 100 + '<font size="3">&nbsp;km</font>';
                $("#epidis").css("visibility", "visible");
            }
            document.getElementById("eewmainMaxInt").innerHTML = calcMaxInt(Math.round(icljson.data[a].magnitude * 10) / 10, Math.round(icljson.data[a].depth * 10) / 10);
            document.getElementById("eewmainMagnitude").innerHTML = '<font size="4">M</font>' + Math.round(icljson.data[0].magnitude * 10) / 10;
            map.addOverlay(centerpointinfo);
            map.centerAndZoom(pointinfo, 10);
            ifmarker = true;
        }
        else {
            latitudeinfo = eval("cencjson.No" + a + ".latitude");
            longitudeinfo = eval("cencjson.No" + a + ".longitude");
            var pointinfo = new BMapGL.Point(longitudeinfo, latitudeinfo);
            centerpointinfo = new BMapGL.Marker(pointinfo, { icon: centerIcon });
            $("#eewmainBar").css("visibility", "visible");
            document.getElementById("eewmainTime").innerHTML = eval("cencjson.No" + a + ".time");
            document.getElementById("eewmainEpicenter").innerHTML = eval("cencjson.No" + a + ".location");
            document.getElementById("eewmainDepth").innerHTML = Math.round(eval("cencjson.No" + a + ".depth") * 10) / 10 + '<font size="3">&nbsp;km</font>';
            if (_open) {
                document.getElementById("epidis1").innerHTML = Math.round(getDistance(latitudeinfo, longitudeinfo, localLat, localLon) * 100) / 100 + '<font size="3">&nbsp;km</font>';
                $("#epidis").css("visibility", "visible");
            }
            document.getElementById("eewmainMaxInt").innerHTML = eval("cencjson.No" + a + ".intensity");
            document.getElementById("eewmainMagnitude").innerHTML = '<font size="4">M</font>' + (Math.round(eval("cencjson.No" + a + ".magnitude") * 100) / 100);
            map.addOverlay(centerpointinfo);
            map.centerAndZoom(pointinfo, 10);
            ifmarker = true;
        }

    }

}

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
            sc_eewint0time = calcint0time(sc_eewMagnitude);
            if ((currentTimeStamp - sc_eewStartAt) / 1000 <= sc_eewint0time && (currentTimeStamp - sc_eewStartAt) / 1000 >= 0) {
                localInt = 0.92 + 1.63 * sc_eewMagnitude - 3.49 * Math.log10(distance);
                if (localInt >= minint)
                {
                    if (sc_eewarrivetime - ((currentTimeStamp - sc_eewStartAt) / 1000) <= 0)
                        sendNotification("地震预警(四川地震局) 第" + sc_eewUpdates + "报", "本地烈度达预警阈值, 已抵达, 注意避险!"); //发布通知
                    else
                        sendNotification("地震预警(四川地震局) 第" + sc_eewUpdates + "报", "本地烈度达预警阈值," + Math.round(sc_eewarrivetime - ((currentTimeStamp - sc_eewStartAt) / 1000)) + "s 后抵达, 注意避险!");
                }
                if (ifmarker)
                    backcenter();
                sc_eewcancel = false;
                $("#currentTime").css("color", "red");
                $("#textbox").css("background-color", "red");
                $("#eewmainBar").css("visibility", "visible");
                $("#mouseInt").css("visibility", "visible");
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
                $("#mouseInt").css("visibility", "hidden");
                //map.removeOverlay(sWave);
                //map.removeOverlay(pWave);
                map.clearOverlays();
                drawseis = false;
                var point = new BMapGL.Point(localLon, localLat);
                var marker = new BMapGL.Marker(point, { icon: custumIcon });        // 创建标注   
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

function nsspe() //Voronoi
{
    $.getJSON("http://154.37.214.206:5000/json?" + Date.now(), //http://154.37.214.206:5000/json?
        function (json) {
            nsspeLat = json.lat;
            nsspeLon = json.lon;
            nsspeStartAt = Date.parse(new Date(json.time).toString());
            if ((currentTimeStamp - nsspeStartAt) / 1000 <= 60 && (currentTimeStamp - nsspeStartAt) / 1000 >= 0 && devopen) {
                localInt = 0.92 + 1.63 * sc_eewMagnitude - 3.49 * Math.log10(distance);
                if (ifmarker)
                    backcenter();
                $("#nsspemainBar").css("visibility", "visible");
                $("#currentTime").css("color", "red");

                document.getElementById("nsspemainTime").innerHTML = TimestampToDate(nsspeStartAt);
                
                // document.getElementById("eewmainMaxInt").innerHTML = sc_eewMaxInt;
                map.centerAndZoom(new BMapGL.Point(nsspeLon, nsspeLat), 9);
                var point = new BMapGL.Point(nsspeLon, nsspeLat);
                var centerpoint = new BMapGL.Marker(point, { icon: centerIcon });
                map.addOverlay(centerpoint);
            }
        });
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
            iclint0time = calcint0time(iclMagnitude);
            if ((currentTimeStamp - iclStartAt) / 1000 <= iclint0time) {
                localInt = 0.92 + 1.63 * iclMagnitude - 3.49 * Math.log10(distance);
                if (localInt >= minint)
                {
                    if(iclarrivetime - (currentTimeStamp - iclStartAt) <= 0)
                        sendNotification("地震预警(icl) 第" + iclUpdates + "报", "本地烈度达预警阈值, 已抵达, 注意避险!"); //发布通知
                    else
                        sendNotification("地震预警(icl) 第" + iclUpdates + "报", "本地烈度达预警阈值, " + Math.round(iclarrivetime - (currentTimeStamp - iclStartAt) / 1000) + "s 后抵达, 注意避险!"); //发布通知
                }
                    
                iclcancel = false;
                $("#currentTime").css("color", "red");
                $("#textbox").css("background-color", "red");
                countDown()
                //countDown(iclLat, iclLon, iclStartAt, iclMagnitude, iclMaxInt, iclEpicenter);
                $("#eewmainBar").css("visibility", "visible");
                $("#mouseInt").css("visibility", "visible");
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
                $("#mouseInt").css("visibility", "hidden");
                document.getElementById("seis_type").innerHTML = "本地最近测站";

                //map.removeOverlay(sWave);
                //map.removeOverlay(pWave);
                map.clearOverlays();
                drawseis = false;
                var point = new BMapGL.Point(localLon, localLat);
                var marker = new BMapGL.Marker(point, { icon: custumIcon });        // 创建标注   
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

var localInt;
var feel;
var distance;
var ty = 0;
var int0time;
var Lat, Lon, StartAt, arrivetime, MaxInt, Epicenter, cancel;
function countDown() {
    if (ty == 1 || ty == 3) {
        Lat = iclLat;
        Lon = iclLon;
        StartAt = iclStartAt;
        arrivetime = iclarrivetime;
        MaxInt = iclMaxInt;
        Epicenter = iclEpicenter;
        cancel = iclcancel;
        Magnitude = iclMagnitude;
        int0time = iclint0time;
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
        int0time = sc_eewint0time;
    }
    distance = getDistance(Lat, Lon, localLat, localLon);
    timeMinus = currentTimeStamp - StartAt;
    timeMinusSec = timeMinus / 1000;
    localInt = 0.92 + 1.63 * Magnitude - 3.49 * Math.log10(distance);
    if (timeMinusSec <= int0time && _open && !cancel) {
        $("#countDown").css("visibility", "visible");
        //document.getElementById("seis_type").innerHTML = "震中最近测站";
        //setInterval(countdownRun, 1000, Lat, Lon, OriTime);
        if (!warningtf) {
            if (localInt >= 3.0 && localInt < 5.0) {
                warningtf = true;
                var music = new Audio('audio/eew0.mp3');
                music.play();
            }
            else if (localInt >= 5.0) {
                warningtf = true;
                var music = new Audio('audio/eew0.mp3');
                music.play();
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

    document.getElementById("mouseInt_lasttime").innerText = "预警结束: " + Math.round(int0time - timeMinusSec) + "s";
}

var cd = 0;
var cdp = 0;

function countdownAudio() {
    if (warningtf && localInt >= minint) {
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