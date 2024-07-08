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

//载入警报声音
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
var custumIcon = new BMapGL.Icon("seis.png", new BMapGL.Size(10, 10));

var systemTime;
var systemTimeStamp;
var currentTimeStamp;
var update = false;
var shake = false;

var deltatime = 0;

var listtype = "warings";