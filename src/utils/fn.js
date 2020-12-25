import { Base64 } from 'js-base64';
export function fontSize(res) {
  let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
  if (!clientWidth) return;
  if (clientWidth <= 1112) {
    clientWidth = 1112
  }
  let fontSize = 100 * (clientWidth / 2650);
  return res*fontSize;
}
  // 用户名 密码使用
export function changeBase64(userCode, passWord) {
  return "Basic " + Base64.encode(userCode + ':' + passWord);
}
//存储session
export function setSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
// 设置LocalStorage
export function setLocalStorage(key, value) {
  let smap = { zhuanhuankey_local: value };
  let valstr = JSON.stringify(smap);
  localStorage.setItem(key, valstr);
}
// 获取LocalStorage
export function getLocalStorage(key) {
  let objstr = localStorage.getItem(key);
  if (objstr) {
    let obj = JSON.parse(objstr);
    return obj.zhuanhuankey_local;
  } else {
    return objstr;
  }
}
//获取session
export function getSessionStorage(key) {
  let objstr = sessionStorage.getItem(key);
  if (objstr) {
    let obj = JSON.parse(objstr);
    return obj;
  } else {
    return false;
  }
}
export function removeSession(key) {
  sessionStorage.removeItem(key);
}
export function removeLocal(key) {
  localStorage.removeItem(key);
}

// 数组分割字符串
export function arrayJoin(a) {
  let str = '';
  str = a.join(',');
  if(str.length > 0 && str[str.length-1] == ",") {
    str = str.substring(0,str.length-1);
  } else {
    str = str;
  }
  return str;
}

 
// 获取传入日期的的第一天
export function getCurrentMonthFirst(d){
  var date = new Date(d);
  date.setDate(1);
  var month = parseInt(date.getMonth()+1);
  var day = date.getDate();
  if (month < 10) {
      month = '0' + month
  }
  if (day < 10) {
      day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day;
}
// 获取传入日期的最后一天
export function getCurrentMonthLast(d){
    var date=new Date(d);
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    var lastTime = new Date(nextMonthFirstDay-oneDay);
    var month = parseInt(lastTime.getMonth()+1);
    var day = lastTime.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day;
}
   // 获取当前月的天数
export function getDays(indate) {
    var year = parseInt(indate.split("/")[0]);
    var month = parseInt(indate.split("/")[1]);
    var isrun = false;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) isrun = true;
    switch (month) {
      case 2:
        if (isrun) {
          return 29;
        } else {
          return 28;
        }
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      default:
        return 30;
    }
  }
  // 返回字符串格式的当前日期
  export function getCurrentDay(date2){
    // 获得月份
    let month = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : '0' + (date2.getMonth() + 1 );
    // 获得天
    let day = date2.getDate()>9?date2.getDate():'0'+date2.getDate();
    // time_pointer 是带横线的日期
    let time_pointer = date2.getFullYear() + "-" + month +  "-" + day;
    // time_pointer2 是带斜线的日期
    let time_pointer2 = date2.getFullYear() + "/" + month +  "/" + day;
    return {time_pointer,time_pointer2};
  }
  // 返回某个日期的后面的第七天
  export function getNextSeventhDay(date){
    // 后面的第七天的时间戳
    let date2 = new Date(new Date(date).getTime() + 86400000 * 6);
    // 获得月份
    let month = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : '0' + (date2.getMonth() + 1 );
    // 获得天
    let day = date2.getDate()>9?date2.getDate():'0'+date2.getDate();
    // time_pointer 是带横线的日期
    let time_pointer = date2.getFullYear() + "-" + month +  "-" + day;
    // time_pointer2 是带斜线的日期
    let time_pointer2 = date2.getFullYear() + "/" + month +  "/" + day;
    return {time_pointer,time_pointer2};
  }
  // 返回某个日期的前面的第七天
  export function getPreSeventhDay(date){
    // 后面的第七天的时间戳
    let date2 = new Date(new Date(date).getTime() - 86400000 * 6);
    // 获得月份
    let month = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : '0' + (date2.getMonth() + 1 );
    // 获得天
    let day = date2.getDate()>9?date2.getDate():'0'+date2.getDate();
    // time_pointer 是带横线的日期
    let time_pointer = date2.getFullYear() + "-" + month +  "-" + day;
    // time_pointer2 是带斜线的日期
    let time_pointer2 = date2.getFullYear() + "/" + month +  "/" + day;
    return {time_pointer,time_pointer2};
  }
  // 获取上一年的昨天
  export function getLastYearYestdy(date){
    var strYear = date.getFullYear() - 1;  
    var strMonth = date.getMonth()+1;
    var strDay = date.getDate();  
     
    // console.log('______,,,,',new Date(strYear+"/"+strMonth+"/"+strDay).getTime())
    return new Date(strYear+"/"+strMonth+"/"+strDay).getTime();
 }