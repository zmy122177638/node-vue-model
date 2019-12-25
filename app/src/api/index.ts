import http from "./axios";

/** 获取用户列表 */
export function getUserList(prams?: any) {
  return http("get", "/api/user/getList", prams);
}

/** 新增用户 */
export function addUserItem(prams?: any) {
  return http("post", "/api/user/addUser", prams);
}

/** 账号登录 */
export function accountSign(prams?: any) {
  return http("get", "/api/user/login", prams);
}
