import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';

const mockUser = {
  id: 5,
  nome: 'mock username',
  idade: 50,
};

const mockUsers = [
  {
    id: 1,
    nome: 'test name 1',
    idade: 25,
  },
  {
    id: 2,
    nome: 'test name 2',
    idade: 27,
  },
  {
    id: 3,
    nome: 'test name 3',
    idade: 43,
  },
];

class mockUserModel {
  constructor(private data: any) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn(() => mockUsers);
  static findOne = jest.fn(({ id, nome }) => {
    if (id) {
      return mockUsers.find((user) => user.id === id);
    }
    if (nome) {
      return mockUsers.find((user) => user.nome === nome);
    }
  });
  static findOneAndUpdate = jest.fn((_id, user) => {
    return {
      ...user,
    };
  });
  static findOneAndRemove = jest.fn(({ id }) => {
    return mockUsers.find((user) => user.id === id);
  });
}

describe('The UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getAllUsers function', () => {
    describe('when there are users', () => {
      it('returns an array of objects containing the users', async () => {
        const result = await service.getAllUsers();
        expect(result).toEqual(mockUsers);
      });
    });
  });

  describe('getUserById function', () => {
    describe('when there is a user with the given id', () => {
      it('returns an object with the user', async () => {
        const result = await service.getUserById(mockUsers[0].id);

        expect(typeof result).toBe('object');
        expect(result).toEqual(mockUsers[0]);
      });
    });
  });

  describe('getUserByName function', () => {
    describe('when there is a user with the given name', () => {
      it('returns an object with the user', async () => {
        const result = await service.getUserByName(mockUsers[0].nome);

        expect(typeof result).toBe('object');
        expect(result).toEqual(mockUsers[0]);
      });
    });
  });

  describe('deleteUser function', () => {
    describe('when there is a user with the given id', () => {
      it('returns an object with the user', async () => {
        const result = await service.deleteUser(mockUsers[1].id);

        expect(typeof result).toBe('object');
        expect(result).toEqual(mockUsers[1]);
      });
    });
  });

  describe('updateUser function', () => {
    describe('when there is a user with the given id', () => {
      it('returns an object with the user', async () => {
        const result = await service.updateUser(mockUser.id, mockUser);
        expect(typeof result).toBe('object');
        expect(result).toEqual(mockUser);
      });
    });
  });

  describe('createUser function', () => {
    it('returns an object with the created user', async () => {
      const result = await service.createUser(mockUser);
      expect(typeof result).toBe('object');
      expect(result).toEqual(mockUser);
    });
  });
});
