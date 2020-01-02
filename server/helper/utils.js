module.exports = {
  /** 是否查询成功 */
  isQuerySuccess(result) {
    return Array.isArray(result) && !!result.length
  }
}