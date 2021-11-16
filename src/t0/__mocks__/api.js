function post(url, body) {
  return new Promise(function (resolve, reject) {
    if (!body.timestamp) reject(new Error('missing parameters'))
    resolve({ success: true })
  })
}

module.exports = {
  post
}