// import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../../user/user.module';

describe('User', () => {
  let app: INestApplication;

  describe('/PUT /user/:id', () => {
    describe('when the user id exists', () => {
      const mockUser = {
        id: 1,
        nome: 'test name1',
        idade: 40,
      };

      const updatedMockUser = {
        id: 1,
        nome: 'updated test name',
        idade: 41,
      };

      class mockUserModel {
        constructor(private data: any) {}
        save = jest.fn().mockResolvedValue(this.data);
        static findOne = jest.fn();
        static findOneAndUpdate = jest.fn();
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

      it('returns an object with a message "User has been updated"', async () => {
        await request(app.getHttpServer()).post('/user').send(mockUser);

        mockUserModel.findOne.mockReturnValue(Promise.resolve(mockUser));
        mockUserModel.findOneAndUpdate.mockReturnValue(
          Promise.resolve(mockUser),
        );
        const response = await request(app.getHttpServer())
          .put(`/user/${mockUser.id}`)
          .send(updatedMockUser);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User has been updated');
      });
    });
  });

  describe('when the user id does not exist', () => {
    const mockUser = {
      id: 1,
      nome: 'test name1',
      idade: 40,
    };

    const updatedMockUser = {
      id: 1,
      nome: 'updated test name',
      idade: 41,
    };

    class mockUserModel {
      constructor(private data: any) {}
      save = jest.fn().mockResolvedValue(this.data);
      static findOne = jest.fn();
      static findOneAndUpdate = jest.fn();
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
      mockUserModel.findOneAndUpdate.mockReturnValue(Promise.resolve(null));
      const response = await request(app.getHttpServer())
        .put(`/user/500`)
        .send(updatedMockUser);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });
});
