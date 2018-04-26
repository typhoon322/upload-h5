// 获取登录信息
export function getToken() {
  const loginInfo = JSON.parse(localStorage.getItem('user'));
  if (loginInfo) {
    return loginInfo.token;
  }
  return null;
}

// 是否设置支付密码
export function isSetpayPassword() {
  const loginInfo = JSON.parse(localStorage.getItem('user'));
  if (loginInfo) {
    return loginInfo.payPassword;
  }
  return null;
}

