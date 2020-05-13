/**
 * @description: 深度获取遍历器
 * @param {Array} property 需要深度遍历的参数
 * @param {Function} next 返回下一次遍历参数
 * @param {Function} cb 回调(可返回需要的数据)
 * @return: 回调返回的总数据
 */
export function _deepIterator(
  property: any,
  next: (item: any) => any,
  cb: (item: any) => any
): any[] {
  let result: any[] = [];
  function _deep(
    property: any,
    next: (item: any) => boolean,
    cb: (item: any) => any
  ) {
    const tostring = Object.prototype.toString;
    if (tostring.call(property) === "[object Array]") {
      property.forEach((item: any) => {
        const answer = cb(item);
        if (answer) result.push(answer);
        const nextProperty = next(item);
        if (nextProperty) {
          _deep(nextProperty, next, cb);
        }
      });
    }
  }
  _deep(property, next, cb);
  return result;
}
