const { ObjectId } = require('mongodb');
const request = require('supertest');
const app = require('../app');

const testUser = {
  lpu: ObjectId("5e4c3ed77c727d69e0209112"),
  email: "user@email.com",
  password: "123",
  token: ''
}

const newLpu = {
  _id: new ObjectId().toString(),
  code: '650000',
  name: 'Los Angeles Hospital'
};

const newUser = {
  _id: new ObjectId().toString(),
  lpu: newLpu._id.toString(),
  name: "Bruce Willis",
  position: "Police Officer - NYPD",
  email: "b.willis@nypd.com",
  phone: "911",
  password: 'DieHard1988'
};

const newDevice = {
    _id: new ObjectId().toString(),
    lpu: testUser.lpu.toString(),
    address: "1401 S Grand Ave",
    name: "Infomat 01",
    os: "Windows 7",
    screenWidth: 1024,
    screenHeight: 768,
    keyboard: false,
    webCamera: true
};

describe('Test all API routes', () => {

  test('Login user', async (done) => {
    await request(app)
      .post('/login')
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        const { token } = res.body;
        testUser.token = token;
        done();
      });
  });

  test('Create lpu', async (done) => {
    await request(app)
      .post('/lpus')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(newLpu)
      .expect('Content-Type', /json/)
      .expect(201)
      .then( res => {
        done(); 
      });
  });

  test('Create user', async (done) => {
    await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .then( res => {
        done();
      });
  });

  test('Update user', async (done) => {
    const updateUser = { name: 'Walter Bruce Willis' };
    await request(app)
      .patch(`/users/${newUser._id.toString()}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(updateUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        done();
      });
  });

  test('Delete user', async (done) => {
    await request(app)
      .delete(`/users/${newUser._id.toString()}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        done();
      });
  });

  test('Create device', async (done) => {
    await request(app)
      .post('/devices')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(newDevice)
      .expect('Content-Type', /json/)
      .expect(201)
      .then( res => {
        done();
      });
  });

  test('Update device', async (done) => {
    const updateDevice = { name: 'Infomat 02' };
    await request(app)
      .patch(`/devices/${newDevice._id.toString()}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(updateDevice)
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        done();
      });
      
  });

  test('Delete device', async (done) => {
    await request(app)
      .delete(`/devices/${newDevice._id.toString()}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        done();
      })
  });

  test('Update lpu', async (done) => {
    const updateLpu = { name: 'NY Hospital' };
    await request(app)
      .patch(`/lpus/${newLpu._id.toString()}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(updateLpu)
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        done(); 
      });
  });

  test('Delete lpu', async (done) => {
    await request(app)
      .delete(`/lpus/${newLpu._id.toString()}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .then( res => {
        done(); 
      });
  });

});
