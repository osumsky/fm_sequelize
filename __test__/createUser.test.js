const request = require('supertest');
const app = require('../app');
const appRequest = request(app);
const db = require('../models');
const yup = require('yup');

jest.setTimeout(15000);

const getUserData = () => ({
  firstName: 'Test1',
  lastName: 'Test2',
  email: `test${Date.now()}@gmail.com`,
  password: 'test123',
  birthday: '1999-11-11',
  isMale: true,
});
const user = getUserData();

beforeAll(() => {
  return db.sequelize.sync({ force: true });
});

afterAll(() => {
  return db.sequelize.close();
});

const schemaUser = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  birthday: yup.date(),
  isMale: yup.boolean(),
});

const schemaResponseSuccess = yup.object({
  data: yup.array().of(schemaUser),
});

describe('create user', () => {
  test('user create (post) successfully (expect code = 200)', async () => {
    const res = await appRequest.post('/api/users/').send(user);
    expect(res.statusCode).toBe(201);
    expect(schemaResponseSuccess.isValidSync(res.body)).toBe(true);
  });

  test('create (post) empty user (expect code = 400)', async () => {
    const res = await appRequest.post('/api/users/').send({});
    expect(res.statusCode).toBe(400);
  });

  test('create (post) existing user (expect code = 400)', async () => {
    const res = await appRequest.post('/api/users/').send(user);
    expect(res.statusCode).toBe(409);
  });
});

describe('get user/users', () => {
  test('get all users (expect code = 200)', async () => {
    const res = await appRequest.get('/api/users/');
    expect(res.statusCode).toBe(200);
  });

  test('get user by id (expect code = 200)', async () => {
    const res = await appRequest.get('/api/users/1');
    expect(res.statusCode).toBe(200);
  });

  test('get not existing user by id (expect code = 404)', async () => {
    const res = await appRequest.get('/api/users/1000');
    expect(res.statusCode).toBe(404);
  });

});
