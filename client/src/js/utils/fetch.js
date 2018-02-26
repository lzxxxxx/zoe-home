import 'whatwg-fetch'

function fetchData (url,{method = 'GET',headers={'Content-Type':'application/json'}, ...others}={}){
  //method,headers,body,
  if(!(url)){
    throw(new Error('请求地址未定义'));
  }
  return fetch(url,{//尾调用优化
    body: JSON.stringify(
      {
        user: 'admin',
        pw: 'a',
      }
    ),
    method: method,
    headers: headers,
    ...others
  })
}

export default fetchData;