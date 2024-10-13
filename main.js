const { app, BrowserWindow, net } = require('electron')
const { screen } = require('electron')
const { session } = require('electron')
const { Tray, Menu } = require('electron')
const ipcMain = require('electron').ipcMain;
const path = require('path')

var localLat, localLon, minint;

let notificationWindow, win;

function createWindow() {
    //当app准备好后，执行createWindow创建窗口
    win = new BrowserWindow({
        title: "Unofficial Earthquake Warning (Monitoring) System | 非官方地震预警系统",
        width: 1300,//窗口宽度
        height: 800,//窗口高度
        autoHideMenuBar: true,//自动隐藏菜单档
        alwaysOnTop: false,//置顶
        webPreferences: {
            //partition: String(+new Date())
        },

    })
    //加载一个远程页面
    win.loadURL('https://uews.rainyangty.top')
    //win.loadFile('./pages/main/index.html') // 加载自定义的HTML文件

    // 预警弹窗
    notificationWindow = new BrowserWindow({
        width: 350,
        height: 150,
        //parent: win, // 选择父元素，使自定义窗口与父窗口附着在一个窗口
        show: false,
        alwaysOnTop: true, // 始终置顶
        resizable: false, // 禁止调整窗口大小
        autoHideMenuBar: true,//自动隐藏菜单档
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true, // 允许渲染器进程使用Node.js
            contextIsolation: false,
            autofill: true,
            webSecurity: false
            //partition: String(+new Date())
        },
    })

    // 加载自定义样式文件
    notificationWindow.loadFile('./pages/notification/notification.html') // 加载自定义的HTML文件
    //notificationWindow.loadURL('https://uews.rainyangty.top/notification.html')
    // notificationWindow.loadURL('https://uews.rainyangty.top/notification.html')
    // 在这里设置窗口的位置，比如右下角
    notificationWindow.setPosition(screen.getPrimaryDisplay().workArea.width - 360, screen.getPrimaryDisplay().workArea.height - 140)
}

app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')
app.on('ready', () => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
            createCustomNotificationWindow()
        }
    })
    // 设置托盘
    //const tray = new Tray(path.join(path.dirname(app.getPath('exe')), '/resources/app.asar/src/image.png'))//发布使用

    const tray = new Tray('./src/image.png')

    tray.setToolTip("Unofficial Earthquake Warning (Monitoring) System | 非官方地震预警系统")

    const contextMenu = Menu.buildFromTemplate([
        {
            type: 'checkbox',
            label: '开机启动',
            checked: app.getLoginItemSettings().openAtLogin,
            click: function () {
                if (!app.isPackaged) {
                    app.setLoginItemSettings({
                        openAtLogin: !app.getLoginItemSettings().openAtLogin,
                        openAsHidden: true,
                        path: process.execPath
                    })
                } else {
                    app.setLoginItemSettings({
                        openAtLogin: !app.getLoginItemSettings().openAtLogin,
                        openAsHidden: true
                    })
                }
                console.log(app.getLoginItemSettings().openAtLogin)
                console.log(!app.isPackaged);

            }
        },
        {
            label: '试听音频',
            checked: app.getLoginItemSettings().openAtLogin,
            click: function () {
                notificationWindow.webContents.send('check', 'check')
            }
        },
        { label: '退出', role: 'quit' }
    ])

    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        try {
            win.show()
        }
        catch (error) {
            createWindow()
        }
    })
})

//兼容核心代码 2
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

/**
 * 兼容https非可信域
*/
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    log('certificate-error');
    //允许私有证书
    event.preventDefault()
    callback(true)
});

ipcMain.on('warning', function (event, arg) {
    notificationWindow.show()
    try {
        win.show()
    }
    catch (error) {
        createWindow()
    }

    console.log("warnings!")
});

ipcMain.on('cancel', function (event, arg) {
    console.log("cancel")
    notificationWindow.hide()
});

ipcMain.on('1', function (event, arg) {
    console.log(arg)
});

ipcMain.on("ask", function (event, arg) {
    console.log("ask")
    // 查询所有与设置的 URL 相关的所有 cookies.
    session.defaultSession.cookies.get({ url: 'https://uews.rainyangty.top' })
        .then((cookies) => {
            for (var i in cookies) {
                if (cookies[i].name == 'la') {
                    localLat = cookies[i].value
                    notificationWindow.webContents.send('Lat', localLat)
                    console.log(cookies[i].value)
                }
                if (cookies[i].name == 'ln') {
                    localLon = cookies[i].value
                    notificationWindow.webContents.send('Lon', localLon)
                }
                if (cookies[i].name == 'minint') {
                    minint = cookies[i].value
                    notificationWindow.webContents.send('int', minint)
                }
            }
            //session.defaultSession.cookies.set(cookies)
        }).catch((error) => {
            console.log(error)
        })
});

/* // 开机是否自启动
const isDevelopment = process.env.NODE_ENV == "development";
//注意：非开发环境
if (!isDevelopment) {
    if (process.platform === "darwin") {
        app.setLoginItemSettings({
            openAtLogin: true,//是否开机启动
            openAsHidden: true//是否隐藏主窗体，保留托盘位置
        });
    } else {
        app.setLoginItemSettings({
            openAtLogin: true,
            openAsHidden: true,
        });
    }
} */
