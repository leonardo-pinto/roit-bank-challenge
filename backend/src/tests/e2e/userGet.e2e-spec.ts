// import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../../user/user.module';

describe('User', () => {
  let app: INestApplication;

  describe('/GET /user', () => {
    describe('when there are no users created', () => {
      const mockUserModel = {
        find: jest.fn(() => []),
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

      it('it returns an empty array with status code 200', async () => {
        const response = await request(app.getHttpServer()).get('/user');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });

    describe('when there are users created', () => {
      const mockUser = {
        id: 1,
        nome: 'test name 1',
        idade: 25,
      };

      const mockUserModel = {
        find: jest.fn(() => mockUser),
        findOne: jest.fn(() => mockUser),
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

      it('it returns an array with the users', async () => {
        await request(app.getHttpServer()).post('/user').send(mockUser);
        const response = await request(app.getHttpServer()).get('/user');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
      });
    });
  });

  describe('/GET /users/:id', () => {
    describe('when there are no user with the given id', () => {
      const mockUserModel = {
        findOne: jest.fn(() => null),
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

      it('returns an object with a message "User not found"', async () => {
        const response = await request(app.getHttpServer()).get('/user/1');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
      });
    });

    describe('when there is a user with the given id', () => {
      const mockUser = {
        id: 1,
        nome: 'test name',
        idade: 30,
      };

      class mockUserModel {
        constructor(private data: any) {}
        save = jest.fn().mockResolvedValue(this.data);
        static findOne = jest.fn(() => mockUser);
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

      it('returns an object with a message "User not found"', async () => {
        await request(app.getHttpServer()).post('/user').send(mockUser);

        const response = await request(app.getHttpServer()).get(
          `/user/${mockUser.id}`,
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
      });
    });
  });
});
