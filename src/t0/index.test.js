jest.mock('./api.js')

const newVisit = require('./index')
it('test newVisit API call', () => {
   expect.assertions(1)
   return newVisit(new Date()).then(res => expect(res).toEqual(true))
})