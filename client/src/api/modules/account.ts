import request from "../axios";

/** 注册 */
export function addUserItem(data?: any) {
  return request({
    url: "api/user/register",
    method: 'post',
    data
  })
}

/** 账号登录 */
export function accountSign(data?: any) {
  return request({
    url: "api/user/login",
    method: 'post',
    data
  })
}

/** 用户信息 */
export function getUserInfo(params = {}) {
  return request({
    url: "api/user/info",
    method: 'get',
    params
  })
}