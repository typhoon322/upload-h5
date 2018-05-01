// 获取登录信息
export function getToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return token;
}

