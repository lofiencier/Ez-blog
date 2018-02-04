export function initFormatDate(){
    if(Date.prototype.format===undefined){
        console.log("这里会重建多少次？");
        Date.prototype.format = function(format) {
            var date = {
                   "M+": this.getMonth() + 1,
                   "d+": this.getDate(),
                   "h+": this.getHours(),
                   "m+": this.getMinutes(),
                   "s+": this.getSeconds(),
                   "q+": Math.floor((this.getMonth() + 3) / 3),
                   "S+": this.getMilliseconds()
            };
            if (/(y+)/i.test(format)) {
                   format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                   if (new RegExp("(" + k + ")").test(format)) {
                          format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                   }
            }
            return format;
        }
    }
}

export function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}

export function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

export function setCookie(name,value,time)
{
var strsec = getsec(time);
var exp = new Date();
exp.setTime(exp.getTime() + strsec*1);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
