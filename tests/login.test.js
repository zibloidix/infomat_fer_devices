const request = require('supertest');
const app = require('../app');

const user = {
  "email": "user@email.com",
  "password": "123"
}

describe('Test auth service', () => {

  test('Login user', async (done) => {
    await request(app)
      .post('/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        const { token } = res.body;
        user.token = token;
        done();
      })
  });

  test('Read devices', async (done) => {
    await request(app)
      .get('/devices')
      .set('Authorization', `Bearer ${user.token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => { 
        done() 
      });
  });

  test('Logout user', async (done) => {
    await request(app)
      .post('/logout')
      .send({ email: user.email })
      .expect(200)
      .then( res => {
        done();
      });
  });

  test('Can not read devices without auth token', async (done) => {
    await request(app)
      .get('/devices')
      .expect(401)
      .then( res => { 
        done() 
      });
  });
  
});


