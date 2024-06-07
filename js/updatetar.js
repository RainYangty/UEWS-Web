var script = document.createElement('script');
script.type = 'text/javascript';
// 传参callback给后端，后端返回时执行这个在前端定义的回调函数
script.src = 'http://127.0.0.1/static/addbuttom.js?' + Date.now();
document.head.appendChild(script);