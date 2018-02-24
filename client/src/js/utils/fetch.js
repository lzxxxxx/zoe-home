import 'whatwg-fetch'

[...a] = [1,2,3];
({...a} = {a:2,b:3})
function fetchData (url,{method = 'POST',headers={'Content-Type':'application/json'}, ...others}={}){
  //method,headers,body,
  if(!(url)){
    throw(new Error('请求地址未定义'));
  }
  fetch(url,{
    user: 'admin',
    pw: 'a',
    method: method,
    headers: headers,
    ...others
  })
}

export default fetchData;