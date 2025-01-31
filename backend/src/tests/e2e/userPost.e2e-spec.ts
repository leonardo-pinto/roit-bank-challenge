// import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../../user/user.module';

describe('User', () => {
  let app: INestApplication;

  describe('/POST /user/', () => {
    describe('when the request body is not correct', () => {
      const mockUser = {
        nome: 'test name 3',
        idade: 25,
      };

      const mockUserModel = {
        save: jest.fn(() => mockUser),
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [UserModule],
        })
          .overrideProvider(getModelToken('User'))
          .useValue(mockUserModel)
          .compile();

        app = module.createNestApplication();
        await app.init();
      });

      afterEach(async () => {
        await app.close();
      });

      it('returns an object with a message "All fields are required"', async () => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send(mockUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('All fields are required');
      });
    });

    describe('when there is already an user with the id', () => {
      const mockUser1 = {
        id: 1,
        nome: 'test name1',
        idade: 40,
      };

      const mockUser2 = {
        id: 1,
        nome: 'test name2',
        idade: 40,
      };

      class mockUserModel {
        constructor(private data: any) {}
        save = jest.fn().mockResolvedValue(this.data);
        static findOne = jest.fn();
      }

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [UserModule],
        })
          .overrideProvider(getModelToken('User'))
          .useValue(mockUserModel)
          .compile();

        app = module.createNestApplication();
        await app.init();
      });

      afterEach(async () => {
        await app.close();
      });

      it('returns an object with a message "Id already exists"', async () => {
        mockUserModel.findOne.mockReturnValue(Promise.resolve(null));
        await request(app.getHttpServer()).post('/user').send(mockUser1);

        mockUserModel.findOne.mockReturnValue(Promise.resolve(mockUser1));
        const response = await request(app.getHttpServer())
          .post('/user')
          .send(mockUser2);

        expect(response.status).toBe(409);
        expect(response.body.message).toBe('Id already exists');
      });
    });
  });

  describe('when the user is created successfully', () => {
    const mockUser = {
      id: 1,
      nome: 'test name',
      idade: 40,
    };

    class mockUserModel {
      constructor(private data: any) {}
      save = jest.fn().mockResolvedValue(this.data);
      static findOne = jest.fn();
    }

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [UserModule],
      })
        .overrideProvider(getModelToken('User'))
        .useValue(mockUserModel)
        .compile();

      app = module.createNestApplication();
      await app.init();
    });

    afterEach(async () => {
      await app.close();
    });

    it('returns an object with the created user', async () => {
      mockUserModel.findOne.mockReturnValue(Promise.resolve(null));
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });
  });
});
