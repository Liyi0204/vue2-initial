
function computeTimer(startDay, endDay, isAdd = true, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let date = new Date();
  const DAY = 24 * 60 * 60 * 1000;
  const HOUR8 = 8 * 60 * 60 * 1000;
  let nowStamp = date.getTime();
  let todayStamp = parseInt(nowStamp / DAY) * DAY - HOUR8 // 东八区今天0点的时间戳

  let timer = {}
  timer.startTime = formatDate(new Date(todayStamp - startDay * DAY), fmt);
  timer.endTime = formatDate(new Date(todayStamp + (isAdd ? endDay : -endDay) * DAY - 1), fmt);
  return timer
}
// 获取月的天数
function getMonthDay(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}



// 获取地址栏参数
function getParams(name, url) {
  var oldAddress = url || decodeURI(window.location.href);
  var temp = oldAddress.split('?');
  var result = {};
  if (temp.length < 2) {
    return undefined;
  }
  var argStr = temp[1];
  if (undefined !== name) {
    // 先匹配在中间的情况
    var temp2 = argStr.match(name + "=(.*?)&");
    if (null !== temp2) {
      return temp2[1];
    }
    // 再匹配在结尾的情况
    temp2 = argStr.match(name + "=(.*?)$");
    if (null !== temp2) {
      return temp2[1];
    }
    // 什么都没匹配到
    return "";
  }
  var args = argStr.split('&');
  args.forEach(function (e) {
    if ("" === e) {
      return;
    }
    result[e.split("=")[0]] = e.split("=")[1];
  })
  return result;
}

// 格式化时间
function formatDate(date, fmt) {
  var isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if(isSafariBrowser){
    fmt.replace(/-/g, "/")
  }
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 防抖 相当于延迟调用 如搜索
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，单位是毫秒（ms）
 * 
 * @return {Function}     返回一个“防反跳”了的函数
 */
function debounce(fn, delay) {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 节流 防止同一方法被多次触发，如监听滚动条事件时
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */
function throttle(fn, threshhold) {
  var last
  var timer
  threshhold || (threshhold = 250)
  return function () {
    var context = this
    var args = arguments
    var now = +new Date()
    if (last && now < last + threshhold) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

function throttleNew(fn,wait){
    var pre = Date.now();
    return function(){
        var context = this;
        var args = arguments;
        var now = Date.now();
        if( now - pre >= wait){
            fn.apply(context,args);
            pre = Date.now();
        }
    }
}

/**
* 筛选日期段
* @param {String | Number} timer 筛选时间段
*/
function filterDateMethod(timer) {
  let obj = {
    startTime: "",
    endTime: ""
  };
  if (!timer) {
    return obj;
  }
  let date = new Date();
  let today = date.getDate() - 1;
  let weekday = date.getDay() == 0 ? 6 : date.getDay() - 1;
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let monthDay = 0
  if (timer == 'today') obj = computeTimer(0, 1)
  if (timer == 'week') obj = computeTimer(weekday, 7 - weekday)
  if (timer == 'lastWeek') obj = computeTimer(weekday + 7, weekday, false)
  if (timer == 'yesterday') obj = computeTimer(1, 0)
  if (timer == 'month') {
    monthDay = getMonthDay(year, month)
    obj = computeTimer(today, monthDay - today)
  }
  if (timer == 'lastMonth') {
    monthDay = getMonthDay(year, month - 1)
    obj = computeTimer(monthDay + today, today, false)
  }
  if (typeof timer == 'number') {
    obj = computeTimer(timer, 1)
  }
  return obj;
}

// 清空对象
function clearObj(obj) {
  for (let k in obj) {
    if (typeof obj[k] === "string") {
      obj[k] = "";
    }
    if (typeof obj[k] === "array") {
      obj[k] = [];
    }
    if (typeof obj[k] === "boolean") {
      obj[k] = false;
    }
    if (typeof obj[k] === "number") {
      obj[k] = 0;
    }
  }
}

// 浏览器名称
function getBrowser() {
  var UserAgent = navigator.userAgent.toLowerCase();
  var browser = null;
  var browserArray = {
    IE: window.ActiveXObject || "ActiveXObject" in window, // IE
    Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
    Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
    Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
    Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') == -1, // safari浏览器
    Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent) // 微信浏览器
  };
  for (var i in browserArray) {
    if (browserArray[i]) {
      browser = i;
    }
  }
  return browser;
}

// 操作系统
function getOsInfo() {
  var userAgent = navigator.userAgent.toLowerCase();
  var name = 'Unknown';
  var version = 'Unknown';
  if (userAgent.indexOf('win') > -1) {
    name = 'Windows';
    if (userAgent.indexOf('windows nt 5.0') > -1) {
      version = 'Windows 2000';
    } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
      version = 'Windows XP';
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {
      version = 'Windows Vista';
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      version = 'Windows 7';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
      version = 'Windows 8';
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {
      version = 'Windows 8.1';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
      version = 'Windows 10';
    } else {
      version = 'Unknown';
    }
  } else if (userAgent.indexOf('iphone') > -1) {
    name = 'iPhone';
  } else if (userAgent.indexOf('mac') > -1) {
    name = 'Mac';
  } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
    name = 'Unix';
  } else if (userAgent.indexOf('linux') > -1) {
    if (userAgent.indexOf('android') > -1) {
      name = 'Android';
    } else {
      name = 'Linux';
    }
  } else {
    name = 'Unknown';
  }
  return { name, version };
}
function encodingURI(str) {//这边要加toString()，不然有时候会报"str.replace() is not a function错误"
    return str.toString().replace("%", "\\%25").replace("+", "\\%2B")
        .replace(" ", "\\%20").replace("/", "\\%2F")
        .replace("?", "\\%3F").replace("#", "\\%23")
        .replace("&", "\\%26").replace("=", "\\%3D")
        .replace(":", "\\%3A");
}
export default {
  getParams,
  formatDate,
  debounce,
  throttle,
  throttleNew,
  filterDateMethod,
  clearObj,
  getBrowser,
  getOsInfo,
  encodingURI
}