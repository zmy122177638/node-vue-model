import http from "./axios";

/** 获取用户列表 */
export function getUserList(prams?: any) {
  return http('get', '/api/user/getList', prams, true);
}
