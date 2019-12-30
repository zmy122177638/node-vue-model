module.exports = {
  isQuerySuccess(result) {
    return Array.isArray(result) && !!result.length
  }
}