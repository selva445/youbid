const request = require('supertest')
const app = require('../../server')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('http://localhost:6500/api/register')
      .send({"name":"test","email":"test13455@gmail.com","password":"1234567","confirmPassword":"123456"})
    expect(res.statusCode).toEqual(200)
 
  })
})