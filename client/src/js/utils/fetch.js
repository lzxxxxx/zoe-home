import 'whatwg-fetch'

async function fetchData (url,{method = 'GET',headers={'Content-Type':'application/json'}, ...others}={}){
  //method,headers,body,
  if(!(url)){
    throw(new Error('请求地址未定义'));
  }
  let res = await fetch(url,{//尾调用优化
    method: method,
    headers: headers,
    ...others
  })
  return res.json()
}

export default fetchData;