var map = new BMapGL.Map("allmap");
map.setMapStyleV2({
    styleId: 'ccff97869e9448f19f822123114357ae'
});
var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
map.enableScrollWheelZoom(true);

map.addEventListener("mousemove",function(e){
	//console.log(e.latlng.lat);
    document.getElementById("mouseInt_pos").innerText = "经度: " + Math.round(e.latlng.lng * 100) / 100 + "°E \n纬度: " + Math.round(e.latlng.lat * 100) / 100 + "°N \n";
    if (!cancel)
    {
        var mouseInt = 0.92 + 1.63 * Magnitude - 3.49 * Math.log10(getDistance(Lat, Lon, e.latlng.lat, e.latlng.lng));
        document.getElementById("mouseInt_Int").innerHTML = Math.round(mouseInt) <= 0 ? 0 : Math.round(mouseInt);
    }
});

function drawwave() {
    if ((Date.now() - sc_eewStartAt) / 1000 <= sc_eewint0time && !sc_eewcancel) {
        var sle = (Date.now() - sc_eewStartAt) * 4.0;
        sceewsWave.setRadius(sle);
        sceewpWave.setRadius(sle / 4.0 * 7.0);
        map.addOverlay(sceewpWave);
        map.addOverlay(sceewsWave);
        azooms();
    }
    if ((Date.now() - iclStartAt) / 1000 <= iclint0time + 60 && !iclcancel) {
        var sli = (Date.now() - iclStartAt) * 4.0;
        iclsWave.setRadius(sli);
        iclpWave.setRadius(sli / 4.0 * 7.0);
        map.addOverlay(iclpWave);
        map.addOverlay(iclsWave);
        azooms();
    }
}