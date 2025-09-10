const request = require('supertest');
const app = require('../app');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middlewares/auth');
const sequelize = require('../config/database');

let token;
let createdUserIds = []; 

beforeAll(() => {
    token = jwt.sign({ id: 1, email: 'admin@test.com' }, SECRET_KEY);
});

afterAll(async () => {

    if (createdUserIds.length > 0) {
        await User.destroy({ where: { id: createdUserIds } });
    }
    await sequelize.close();
});

describe('User Controller & Routes', () => {

    describe('POST /users', () => {
        it('deve criar usuário com sucesso', async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'Teste', email: `teste${Date.now()}@test.com`, senha: '12345678' });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            createdUserIds.push(res.body.id);
        });

        it('deve criar usuário sem token', async () => {
            const res = await request(app)
                .post('/users')
                .send({ nome: 'Teste', email: `teste2${Date.now()}@test.com`, senha: '12345678' });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            createdUserIds.push(res.body.id);
        });

        it('deve falhar ao criar usuário com email inválido', async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'Teste', email: 'invalido', senha: '12345678' });

            expect(res.statusCode).toBe(422);
            expect(res.body.errors[0]).toHaveProperty('param', 'email');
            expect(res.body.errors[0]).toHaveProperty('msg', 'email inválido');
        });
    });

    describe('GET /users', () => {
        let userId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'ListaTeste', email: `lista${Date.now()}@test.com`, senha: '12345678' });
            userId = res.body.id;
            createdUserIds.push(userId);
        });

        it('deve retornar lista de usuários', async () => {
            const res = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /users/:id', () => {
        let userId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'GetTeste', email: `get${Date.now()}@test.com`, senha: '12345678' });
            userId = res.body.id;
            createdUserIds.push(userId);
        });

        it('deve retornar usuário pelo ID', async () => {
            const res = await request(app)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', userId);
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
        let userId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'PutTeste', email: `put${Date.now()}@test.com`, senha: '12345678' });
            userId = res.body.id;
            createdUserIds.push(userId);
        });

        it('deve atualizar usuário com sucesso', async () => {
            const res = await request(app)
                .put(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'Teste Atualizado', senha: '87654321' });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('nome', 'Teste Atualizado');
        });

        it('deve retornar 404 ao atualizar usuário inexistente', async () => {
            const res = await request(app)
                .put('/users/999999')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'Teste' });

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Usuário não encontrado');
        });
    });

    describe('PATCH /users/:id', () => {
        let userId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'PatchTeste', email: `patch${Date.now()}@test.com`, senha: '12345678' });
            userId = res.body.id;
            createdUserIds.push(userId);
        });

        it('deve atualizar parcialmente usuário com sucesso', async () => {
            const res = await request(app)
                .patch(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ email: `novo${Date.now()}@test.com` });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('email');
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
        let userId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'DeleteTeste', email: `delete${Date.now()}@test.com`, senha: '12345678' });
            userId = res.body.id;
            createdUserIds.push(userId);
        });

        it('deve deletar usuário com sucesso', async () => {
            const res = await request(app)
                .delete(`/users/${userId}`)
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
