import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '~/libs/typeorm';
import { TestResponse } from '~/types/api';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserModule } from '~/modules/user';
import { UserEntity } from '~/domain/entities/user';
import { User } from '~/domain/models/user';
import { UserService } from '~/services';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...config().database, entities: [UserEntity] }), UserModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    moduleFixture.get<UserService>(UserService).clear();
    req = request(app.getHttpServer());
  });

  afterAll(() => app.close());

  it('/user (POST)', async () => {
    const res: TestResponse<User> = await req.post('/user').send(mocks.user.user);
    expect(res.body).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('/user:id (Get)', async () => {
    const res: TestResponse<User> = await req.get(`/user/${mocks.user.user.uid}`);
    expect(res.body).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('/user:id (Update)', async () => {
    const res: TestResponse<UpdateResult> = await req.put(`/user/${mocks.user.user.uid}`).send({
      ...mocks.user.user,
      name: mocks.user.updatedName,
    });
    expect(res.body.affected).toBe(1);
  });

  it('/user:id (Delete)', async () => {
    const res: TestResponse<DeleteResult> = await req.delete(`/user/${mocks.user.user.uid}`);
    expect(res.body.affected).toBe(1);
  });
});
