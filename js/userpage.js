const closeBtn = document.querySelector(".close-btn"),
        section = document.querySelector("section");

closeBtn.addEventListener("click", () =>
    section.classList.remove("active")
);

window.onresize = function() {
    setTimeout(function () {
        backcenter();
    }, 100);
};  


if (getCookie("la") == null || getCookie("ln") == null || getCookie("mouseintopen") == null) 
{
    _open = false;
    document.getElementById("warninginfo").innerHTML = "请在加载完毕后左下角打开设置并记录当前位置经纬度坐标（仅支持东北半球，请勿输入英文），否则将关闭倒计时功能(将以cookie形式存储在本地); 若点击\"地震报告\"时无声音，需要点开左下角并选择\"音频修复\"以确保能播放音频(每次打开均需点击一次)";
    section.classList.add("active");
}
else 
{
    document.getElementById("ln").value              = getCookie("ln");
    document.getElementById("la").value              = getCookie("la");
    document.getElementById("minint").value          = getCookie("minint") == null ? 3 : getCookie("minint");
    minint                                           = getCookie("minint") == null ? 3 : getCookie("minint");
    document.getElementById("delay-serverip").value  = getCookie("delay");
    delayip                                          = getCookie("delay") == null || getCookie("delay") == '' ? null : getCookie("delay");
    mouseintopen                                     = getCookie("mouseintopen") == 'true' ? true : false;
    document.getElementById("mouseintopen").checked  = mouseintopen;
    
    var point = new BMapGL.Point(getCookie("ln"), getCookie("la"));
    var marker = new BMapGL.Marker(point, { icon: custumIcon });        // 创建标注   
    map.addOverlay(marker);                     // 将标注添加到地图中
    if(delayip != null)
    {
        //$("#delay").css("color", "#46BC67");
        scanserver();
        setInterval(scanserver, 10000);
    }
    else
    {
        $("#delay").css("color", "#fa5151");
    }
}

if ($(window).width() < 800) 
{
    document.getElementById("warninginfo").innerHTML = "网页显示异常，请尝试调大网页宽度";

    section.classList.add("active");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>网页显示异常，请尝试调大网页宽度或高度" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据以及icl相关数据，地震速报信息来源为中国地震台网速报公开数据";
}
else if ($(window).width() < 360 || $(window).height() < 160) 
{
    document.getElementById("warninginfo").innerHTML = "网页显示异常，请尝试调大网页宽度或高度";

    section.classList.add("active");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + " <br>网页显示异常，请尝试调大网页宽度或高度" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据以及icl相关数据，地震速报信息来源为中国地震台网速报公开数据";
    $("#list-background").css("visibility", "hidden");
    $("#list").css("visibility", "hidden");
}
if ($(window).width() < 1000)
{
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
else 
{
    $("#list-background").css("visibility", "visible");
    $("#list").css("visibility", "visible");
    //document.getElementById("loading_Text2").innerHTML = "Unoffical Earthquake Warning System" + " <br>提示：首次使用或长时间未使用时，加载时间可能会较长，请确保您的系统时间准确" + "<br>免责申明：本网站不会自行对众发布地震预警/地震速报信息。其地震预警信息来源为四川地震局公开的“紧急地震信息”地震预警数据，地震速报信息来源为中国地震台网速报公开数据";
}

document.ontouchmove = function (e) {
    e.preventDefault();
}

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
        $("#epidis").css("visibility", "hidden");
        ifmarker = false;
    }
    
}

backcenter();