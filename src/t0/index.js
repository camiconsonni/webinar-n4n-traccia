const API = require('./api.js')

async function newVisit(timestamp) {
  try {
    const res = await API.post(
      'https://www.fantozziefigli.com/services/new-visit',
      { timestamp }
    )
    return res.success
  } catch (e) {
    console.error(e)
  }
}

module.exports = newVisit