if ('Notification' in window)
    Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
            sendMsg("请打开系统通知权限以及时收到预警信息喵", -1);
            return;
        }
        sendMsg("系统通知权限已打开惹喵", 10000);
    });
else
    sendMsg("本设备不支持通知喵", -1);

function sendNotification(title, body, icon, callback) {
    // 先检查浏览器是否支持
    if (!('Notification' in window)) {
        // IE浏览器不支持发送Notification通知!
        return;
    }
    
    if (Notification.permission === 'denied') {
        // 如果用户已拒绝显示通知
        return;
    }
    
    if (Notification.permission === 'granted') {
        //用户已授权，直接发送通知
        notify();
    } else {
        // 默认，先向用户询问是否允许显示通知
        Notification.requestPermission(function(permission) {
            // 如果用户同意，就可以直接发送通知
            if (permission === 'granted') {
                notify();
            }
        });
    }

    function notify() {
        let notification = new Notification(title, {
            icon: icon,
            body: body
        });
        notification.onclick = function() {
            callback && callback();
            console.log('单击通知框')
        }
        notification.onclose = function() {
            console.log('关闭通知框');
        };
    }
}
