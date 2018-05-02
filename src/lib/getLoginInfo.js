// 获取登录信息
export function getToken() {
  const token = localStorage.getItem("token");
  console.log(token);
  if(!token){
    return '';
  }
  return token;
}

