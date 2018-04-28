// 获取登录信息
export function getToken() {
  return JSON.parse(localStorage.getItem('token'));
}

