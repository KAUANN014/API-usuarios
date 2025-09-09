const request = require('supertest');
const app = require('../app');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middlewares/auth');
const sequelize = require('../config/database');

let token;
let createdUserId;

beforeAll(async () => {
  token = jwt.sign({ id: 1, email: 'admin@test.com' }, SECRET_KEY);
});



afterAll(async () => {

  if (createdUserId) {
    const user = await User.findByPk(createdUserId);
    if (user) await user.destroy();
  }
  await sequelize.close();
});

describe('User Controller & Routes', () => {

  describe('POST /users', () => {
    it('deve criar usuário com sucesso', async () => {
      const res = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'Teste', email: 'testeunitario@test.com', senha: '12345678' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      createdUserId = res.body.id;
    });

    it('deve falhar ao criar usuário com email inválido', async () => {
      const res = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'Teste', email: 'invalido', senha: '12345678' });

      expect(res.statusCode).toBe(422);
      expect(res.body.errors[0]).toHaveProperty('param', 'email');
    });

    it('deve falhar ao criar usuário sem token', async () => {
      const res = await request(app)
        .post('/users')
        .send({ nome: 'Teste', email: 'teste2@test.com', senha: '12345678' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error', 'Token não fornecido');
    });
  });

  describe('GET /users', () => {
    it('deve retornar lista de usuários', async () => {
      const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /users/:id', () => {
    it('deve retornar usuário pelo ID', async () => {
      const res = await request(app)
        .get(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', createdUserId);
    });

    it('deve retornar 404 se usuário não existir', async () => {
      const res = await request(app)
        .get('/users/999999')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuário não encontrado');
    });
  });

  describe('PUT /users/:id', () => {
    it('deve atualizar usuário com sucesso', async () => {
      const res = await request(app)
        .put(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'Teste Atualizado', senha: '87654321' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('nome', 'Teste Atualizado');
    });

    it('deve retornar 404 ao atualizar usuário inexistente', async () => {
      const res = await request(app)
        .put('/users/999999')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'X' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuário não encontrado');
    });
  });

  describe('PATCH /users/:id', () => {
    it('deve atualizar parcialmente usuário com sucesso', async () => {
      const res = await request(app)
        .patch(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'novoemail@test.com' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('email', 'novoemail@test.com');
    });

    it('deve retornar 404 ao atualizar parcialmente usuário inexistente', async () => {
      const res = await request(app)
        .patch('/users/999999')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'teste' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuário não encontrado');
    });
  });

  describe('DELETE /users/:id', () => {
    it('deve deletar usuário com sucesso', async () => {
      const res = await request(app)
        .delete(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Usuário deletado com sucesso');
    });

    it('deve retornar 404 ao deletar usuário inexistente', async () => {
      const res = await request(app)
        .delete('/users/999999')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'Usuário não encontrado');
    });
  });

});
