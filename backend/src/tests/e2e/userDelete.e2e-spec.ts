import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../../user/user.module';

describe('User', () => {
  let app: INestApplication;

  describe('/DELETE /user/:id', () => {
    describe('when the user id exists', () => {
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

    describe('when the user id does not exist', () => {
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

      it('returns an object with a message "User not found"', async () => {
        await request(app.getHttpServer()).post('/user').send(mockUser);

        mockUserModel.findOne.mockReturnValue(Promise.resolve(null));
        mockUserModel.findOneAndRemove.mockReturnValue(Promise.resolve(null));
        const response = await request(app.getHttpServer()).delete('/user/30');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
      });
    });
  });
});
