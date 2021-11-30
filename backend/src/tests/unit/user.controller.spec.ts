import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';

describe('The UserController', () => {
  let controller: UserController;

  const users = [
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
  ];

  const mockUserService = {
    createUser: jest.fn((createUserDTO) => {
      return {
        ...createUserDTO,
      };
    }),
    updateUser: jest.fn((updateUserDTO) => {
      return {
        ...updateUserDTO,
      };
    }),
    getAllUsers: jest.fn(() => users),
    getUserById: jest.fn((id) => {
      return users.find((user) => user.id === id);
    }),
    deleteUser: jest.fn((id) => {
      return users.find((user) => user.id === id);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('createUser function', () => {
    it('returns an object with the created user', async () => {
      const createUserDTO = {
        id: 1,
        nome: 'test name',
        idade: 25,
      };

      const result = await controller.createUser(createUserDTO);

      expect(typeof result).toBe('object');
      expect(result).toEqual(createUserDTO);
      expect(mockUserService.createUser).toHaveBeenCalled();
    });
  });

  describe('updateUser function', () => {
    it('returns an object with a message "User has been updated"', async () => {
      const updateUserDTO = {
        id: 1,
        nome: 'test name',
        idade: 25,
      };

      const result = await controller.updateUser(
        updateUserDTO.id,
        updateUserDTO,
      );

      expect(typeof result).toBe('object');
      expect(result).toEqual({ message: 'User has been updated' });
      expect(mockUserService.updateUser).toHaveBeenCalled();
    });
  });

  describe('getAllUsers function', () => {
    describe('when there are users', () => {
      it('returns an array of objects containing the users', async () => {
        const result = await controller.getAllUsers();

        expect(result).toEqual(users);
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
      });
    });
  });

  describe('deleteUser function', () => {
    describe('when the user exists', () => {
      it('returns an object with a message "User has been deleted"', async () => {
        const result = await controller.deleteUser(users[0].id);

        expect(typeof result).toBe('object');
        expect(result).toEqual({ message: 'User has been deleted' });
        expect(mockUserService.updateUser).toHaveBeenCalled();
      });
    });
  });

  describe('getUserById function', () => {
    describe('when the user exists', () => {
      it('returns an object with the user', async () => {
        const result = await controller.getUserById(users[0].id);

        expect(typeof result).toBe('object');
        expect(result).toEqual(users[0]);
        expect(mockUserService.getUserById).toHaveBeenCalled();
      });
    });
  });
});
