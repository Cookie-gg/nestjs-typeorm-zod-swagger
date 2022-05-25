import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '~/libs/typeorm';
import { mocks } from '~/mocks';
import { UserController } from '~/controllers';
import { UserModule } from '~/modules';
import { UserService } from '~/services';
import { UserEntity } from '~/domain/entities/user';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...config().database, entities: [UserEntity] }), UserModule],
    }).compile();
    await module.get<UserService>(UserService).clear();
    controller = module.get<UserController>(UserController);
  });

  afterAll(() => module.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.createUser(mocks.user.user);
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should get a user by unique data', async () => {
    const user = await controller.getUser({ id: mocks.user.user.uid });
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should update a user by unique data', async () => {
    const res = await controller.updateUser({ id: mocks.user.user.uid }, { name: mocks.user.updatedName });
    expect(res.affected).toBe(1);
  });

  it('should delete a user by unique data', async () => {
    const res = await controller.deleteUser({ id: mocks.user.user.uid });
    expect(res.affected).toBe(1);
  });
});
