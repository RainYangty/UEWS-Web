var seisLat  = new Array();
var seisLon  = new Array();
var wss      = new Array();
var seisname = new Array();
var chart  = new Array();

chart.push(
    new Chart(document.getElementById('seis_chart0'), {
        type: 'line',
        data: {
        labels: [],
        datasets: [{
            data: [],
            borderWidth: 1,
            fill: false,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        }]
        },
        options: {
            plugins: {
                legend: false,
            },
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                },
                x: {
                    beginAtZero: true,
                    display: false
                },
            }
        }
    })
);

function updateseis()
{
    $.getJSON("https://api.wolfx.jp/seis_list.json?" + Date.now(),//https://api.wolfx.jp/sc_eew.json
        function (json) {
            //console.log(json);
            seisLat  = []
            seisLon  = []
            wss      = []
            seisname = []
            for(i in json)
            {
                wss.push(i);
                seisLat.push(eval("json." + i + ".latitude"));
                seisLon.push(eval("json." + i + ".longitude"));
                seisname.push("wolfx" + eval("json." + i + ".location"));
            }
            document.getElementById("seisLocate0").innerHTML = seisname[0];
            for (i = 1; i < wss.length; i++) {
                $("#seisBar" + Number(i - 1)).after('<div id="seisBar' + i + '"><div style="height:30px;width:300px;"><canvas id="seis_chart' + i + '"></canvas></div><div id="seisMaxInt' + i +'">-</div><div id="seisLocate' + i + '"></div>');
                chart.push(
                    new Chart(document.getElementById('seis_chart' + i), {
                        type: 'line',
                        data: {
                        labels: [],
                        datasets: [{
                            data: [],
                            borderWidth: 1,
                            fill: false,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)'
                        }]
                        },
                        options: {
                            plugins: {
                                legend: false,
                            },
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    display: false
                                },
                                x: {
                                    beginAtZero: true,
                                    display: false
                                },
                            }
                        }
                    })
                );
                document.getElementById("seisLocate" + i).innerHTML = seisname[i];
            }
        })
}
/*
CQ_BEB_00	重庆北碚	   29.8108	106.3945	300m	垂直向	RS1D	RED68
CQ_BEB_01	重庆北碚	   29.8108	106.3945	300m	三分向	BBVS-60	宽频带
SC_CHD_00	四川成都	   30.6753	104.0905	500m	三分向	FSS-3M	短周期
NM_EEDS_00	内蒙古鄂尔多斯	39.5946	109.7899	1180m	垂直向	 RS4D	 RD3C0
CQ_TOL_00	重庆铜梁	   29.8378	106.0632	305m	垂直向	RS1D	 R0EB1
GD_SHZ_00	广东深圳	   22.5315	113.9608	100m	垂直向	RS1D	 RC7FB
CQ_DAZ_00	重庆大足	   29.4821	105.7713	400m	三分向	LGT-4.5	AnyShake*/
//定义烈度配色
const intColor2 = {
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

function descend(x,y){
    return y[0] - x[0];  //按照数组的第1个值升序排列
}

function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift(); 
    });
    chart.update();
}
updateseis();
//setInterval(updateseis, 7200000);//2小时自动刷新测站列表
var t = true;
var localminnum = 1;
var localmin = getDistance(seisLat[1], seisLon[1], localLat, localLon);
min = getDistance(seisLat[1], seisLon[1], localLat, localLon);
console.log("最近地震站序号：" + localminnum);
var senum = localminnum;
var ws = null;
function conn_websocket()
{
    if (ws != null && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
        // 如果WebSocket正在连接或已经连接，则直接返回
        return;
    }
    if (ws != null && ws.readyState === WebSocket.CLOSING) {
        document.getElementById("warning_textbox").innerHTML = "重连中";
        // 如果WebSocket正在关闭中，则等待关闭完成后再重连
        setTimeout(conn_websocket, 1000);
        return;
    }

    // 关闭之前的WebSocket连接（如果存在）
    if (ws != null && ws.readyState === WebSocket.OPEN) {
        ws.close();
    }
    // 创建新的WebSocket连接
    ws = new WebSocket("wss://seis.wolfx.jp/all_seis");
    ws.onopen = function () {
        console.log("WebSocket 连接成功");
    };

    ws.onerror = function (evt) {
        $("#warning_textbox").css("visibility", "visible");
        $("#currentTime").css("color", "red");
        document.getElementById("warning_textbox").innerHTML = "地震站数据获取失败";
        ws.close();
    
    };

    ws.onmessage = function (e) {
        if(!drawseis)
        {
            for (i = 2; i < wss.length; i++)
            {
                if(getDistance(seisLat[i], seisLon[i], localLat, localLon) < min)
                {
                    localmin = getDistance(seisLat[i], seisLon[i], iclLat, iclLon);
                    localminnum = i;
                }
            }
            drawseis = true;
        }
        
    
        var json = eval("(" + e.data + ")");
        if (iclcancel && sc_eewcancel || !iclcancel && !sc_eewcancel)
        {
            if (json.type == wss[senum])
            {
                document.getElementById("seislocal").innerHTML = seisname[senum];
                document.getElementById("seispga").innerHTML = "最大加速度" + Math.floor(json.Max_PGA * 100) / 100;
                document.getElementById("seisint").innerHTML = "震度" + Math.floor(json.CalcShindo * 100) / 100 + " 加速度" + Math.floor(json.PGA * 100) / 100;
                document.getElementById("seisMaxInt").innerHTML = Math.floor(json.Shindo);
                $("#seisMaxInt").css("background-color", intColor2[json.Shindo].bkcolor);
            }
        }
        else
        {
            minnum = 1;
            min = getDistance(seisLat[1], seisLon[1], sc_eewLat, sc_eewLon);
            for (i = 2; i < wss.length; i++)
            {
                if(getDistance(seisLat[i], seisLon[i], sc_eewLat, sc_eewLon) < min)
                {
                    min = getDistance(seisLat[i], seisLon[i], iclLat, iclLon);
                    minnum = i;
                }
            }
            senum = minnum;
            //console.log("最近地震站序号：" + minnum);
            if (json.type == wss[senum])
            {
                document.getElementById("seislocal").innerHTML = seisname[minnum];
                document.getElementById("seispga").innerHTML = "最大加速度" + Math.floor(json.Max_PGA * 100) / 100;
                document.getElementById("seisint").innerHTML = "震度" + Math.floor(json.CalcShindo * 100) / 100 + " 加速度" + Math.floor(json.PGA * 100) / 100;
                document.getElementById("seisMaxInt").innerHTML = Math.floor(json.Shindo);
                $("#seisMaxInt").css("background-color", intColor2[json.Shindo].bkcolor);
            }
        }
        document.getElementById("seisMaxInt" + wss.indexOf(json.type)).innerHTML = Math.floor(json.Shindo);
        $("seisMaxInt" + wss.indexOf(json.type)).css("background-color", intColor2[json.Shindo].bkcolor);
    
        if (chart[wss.indexOf(json.type)].data.labels.length > 100)
        {
            removeData(chart[wss.indexOf(json.type)]);
        }
        addData(chart[wss.indexOf(json.type)], json.update_at, json.PGA);
    };

    ws.onclose = function () {
        console.log("WebSocket 连接关闭");
        // 仅在连接关闭时才尝试重新连接
        setTimeout(conn_websocket, 2000);
    };

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，这样服务端会抛异常。
    window.onbeforeunload = function() {
        ws.close();
        // 仅在连接关闭时才尝试重新连接
    }
}

conn_websocket();