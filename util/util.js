function getDiffTime(recordTime, yearsFlag){
  if(recordTime){
    recordTime = new Date(parseFloat(recordTime)*1000)
    var m = 1000*60,
      h = m *60,
      d = h*24,
      now = new Date(),
      diff = now - recordTime,
      result = ''
    if (diff < 0){
      return result
    }
    var weeks = diff/(7*d),
      days = diff/d,
      hours = diff/h,
      minite = diff/m;
    if (weeks >= 1 || days > 1){
      var formate = 'MM-dd hh:mm'
      if (yearsFlag){
        formate = 'yyyy-MM-dd hh:mm'
      }
      return recordTime.format(formate)
    } else if(days == 1 || (hours < 24 && recordTime.getDate()!=now.getDate())){
      result = '昨天' + recordTime.format('hh:mm')
      return result
    } else if (hours > 1){
      return parseInt(hours)+'小时前'
    } else if (minite > 1){
      return parseInt(minite)+'分钟前'
    }else {
      return '刚刚'
    }
  }
  return ''
}

(function initTimeFormat(){
  Date.prototype.format = function(format){
    var _o = {
      "M+": this.getMonth()+1,
      "d+": this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth()+3)/3),
      'S': this.getMilliseconds()
    }
    if(/(y+)/.test(format)){
      format = format.replace(RegExp.$1, 
        (this.getFullYear()+'').substring(4-RegExp.$1.length))
    }
    for(var k in _o){
      if(new RegExp("("+k+")").test(format)){
        format = format.replace(RegExp.$1, 
            RegExp.$1.length == 1 ? _o[k]:
            ('00'+_o[k]).substring((''+_o[k]).length))
      }
    }
    return format
  }
})()

export {getDiffTime}