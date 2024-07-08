var map = new BMapGL.Map("allmap");
map.setMapStyleV2({
    styleId: 'ccff97869e9448f19f822123114357ae'
});
var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.addControl(scaleCtrl);
map.enableScrollWheelZoom(true);
var _open = true;

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