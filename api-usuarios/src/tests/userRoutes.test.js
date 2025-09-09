const userController = require('../controllers/userController');
const userService = require('../services/userService');
const httpMocks = require('node-mocks-http');
jest.mock('../services/userService');

describe('User Controller', () => {
  describe('createUser', () => {
    it('deve criar usuário com sucesso', async () => {
      const req = httpMocks.createRequest({
        body: { nome: 'Kauan', email: 'kauan@email.com', senha: '12345678' }
      });
      const res = httpMocks.createResponse();
      userService.createUser.mockResolvedValue({ id: 1, nome: 'Kauan', email: 'kauan@email.com' });

      await userController.createUser(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toHaveProperty('id', 1);
    });

    it('deve retornar erro se service falhar', async () => {
      const req = httpMocks.createRequest({ body: {} });
      const res = httpMocks.createResponse();
      userService.createUser.mockRejectedValue(new Error('Falha'));

      await userController.createUser(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toHaveProperty('error', 'Falha');
    });
  });
});