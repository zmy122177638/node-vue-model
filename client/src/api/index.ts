import http from "./axios";

/** 注册 */
export function addUserItem(prams?: any) {
  return http("post", "api/user/register", prams);
}

/** 账号登录 */
export function accountSign(prams?: any) {
  return http("post", "api/user/login", prams);
}
