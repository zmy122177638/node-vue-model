import http from "./axios";

export function getUserList() {
  return http('get', 'http://localhost:3000/web/api/user/getList');
}
