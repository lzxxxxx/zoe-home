/**
 * @param {any} timestamp 时间戳
 * @param {any} hasTime 只返回年月日还是具体到分钟
 */
function formatTime (timestamp, hasTime=true){
  if(!timestamp){
    throw new Error('时间戳没传');
    return;
  }
  if (!(timestamp.toString().length === 10 || timestamp.toString().length === 13)) {
    throw new Error('时间戳位数错误');
    return;
  }
  timestamp = (timestamp.toString()+'000').slice(0,13);
  let date = new Date(timestamp-0);
  return hasTime ? `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}` 
  : `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}

export default formatTime;