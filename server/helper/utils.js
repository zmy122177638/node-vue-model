/**
 * @description 提取Object属性
 * @param {*} target 目标源
 * @param {*} extract 从目标按需求提取属性
 */
const extractProperty = function (target, extract = { includes: [], excludes: [] }) {
  const { includes = [], excludes = [] } = extract
  target = deepClone(target)
  let result = Array.isArray(target) ? [] : {}
  if (includes.length > 0) {
    includes.forEach(propertyKey => {
      Reflect.set(result, propertyKey,target[propertyKey])
    })
    return result
  }
  if (excludes.length > 0) {
    excludes.forEach(propertyKey => {
      Reflect.deleteProperty(target, propertyKey)
    })
    return target
  }
  return target
}
/**
 * @description 深拷贝
 * @param {*} target 目标源
 */
const deepClone = function (target) {
  let result
  const typeStr = Object.prototype.toString.call(target)
  if (typeStr === '[object Array]') {
    result = []
    for (let i = 0; i < target.length; i++) {
      result.push(deepClone(target[i]))
    }
  } else if (typeStr === '[object Object]') {
    result = {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key])
      }
    }
  } else {
    result = target
  }
  return result
}
module.exports = {
  extractProperty,
  deepClone
}