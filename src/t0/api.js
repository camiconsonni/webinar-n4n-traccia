function post (url, body) {
  console.log('POST ' + url, body)
  return new Promise(function (resolve) {
    resolve({ success: true })
  })
}

module.export = {
  post
}