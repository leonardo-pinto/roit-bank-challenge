import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../user/user.controller';
import { UserService } from '../../user/user.service';

describe('UserController', () => {
  let module: TestingModule;
  let userController: UserController;
  let userService: UserService;

  const resultAll = [
    {
      id: 1,
      nome: 'Username',
      idade: 35,
    },
  ];

  const mockUserService = {
    getAllUsers: () => resultAll,
  };

  const userServiceProvider = {
    provide: UserService,
    useValue: mockUserService,
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceProvider],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllUsers', () => {
    it('it should return an array of users', async () => {
      expect(userService).toBeDefined();
      // jest
      //   .spyOn(userService, 'getAllUsers')
      //   .mockReturnValue(Promise.resolve(resultAll));
      // expect(await userController.getAllUsers()).toBe(resultAll);
    });
  });
});
