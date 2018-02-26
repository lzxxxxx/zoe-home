import 'whatwg-fetch'

function fetchData (url,{method = 'GET',headers={'Content-Type':'application/json'}, ...others}={}){
  //method,headers,body,
  if(!(url)){
    throw(new Error('请求地址未定义'));
  }
  return fetch(url,{//尾调用优化
    method: method,
    headers: headers,
    ...others
  }).then(res => res.json()).then(res => alert(JSON.stringify(res)))
}

export default fetchData;