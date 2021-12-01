// import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../../user/user.module';

describe('User', () => {
  let app: INestApplication;

  describe('/GET /users', () => {
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
        nome: 'test name 1',
        idade: 25,
      };

      const mockUserModel = {
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
        const response = await request(app.getHttpServer()).get(
          `/user/${mockUser.id}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
      });
    });
  });

  describe('/POST /users/', () => {
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

  describe('/DELETE /users/:id', () => {
    describe('when there user id exists', () => {
      const mockUser = {
        id: 1,
        nome: 'test name1',
        idade: 40,
      };

      class mockUserModel {
        constructor(private data: any) {}
        save = jest.fn().mockResolvedValue(this.data);
        static findOne = jest.fn();
        static findOneAndRemove = jest.fn();
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

      it('returns an object with a message "User has been deleted"', async () => {
        mockUserModel.findOne.mockReturnValue(Promise.resolve(null));
        await request(app.getHttpServer()).post('/user').send(mockUser);

        mockUserModel.findOne.mockReturnValue(Promise.resolve(mockUser));
        mockUserModel.findOneAndRemove.mockReturnValue(
          Promise.resolve(mockUser),
        );
        const response = await request(app.getHttpServer()).delete(
          `/user/${mockUser.id}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User has been deleted');
      });
    });
  });
});
