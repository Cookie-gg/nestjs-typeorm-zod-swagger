import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { mocks } from '~/mocks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '~/libs/typeorm';
import { TestResponse } from '~/types/api';
import { AppModule } from '~/app.module';
import { Auth } from '~/domain/models/auth';
import { UserService } from '~/services';
import { UserEntity } from '~/domain/entities/user';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication;
  let req: request.SuperTest<request.Test>;
  let service: UserService;
  let token: string;
  let refreshToken: string;
  const { password } = mocks.user.user;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({ ...config, entities: [UserEntity] }), AppModule],
    }).compile();
    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    req = request(app.getHttpServer());
    service = moduleFixture.get<UserService>(UserService);
    service.clear();
    await service.create(mocks.user.user);
  });

  afterAll(async () => {
    await service.delete(mocks.user.user.uid);
    await app.close();
  });

  it('/auth (POST)', async () => {
    const { uid: uniqueInfo } = mocks.user.user;
    const res: TestResponse<Auth> = await req.post('/auth').send({ uniqueInfo, password });
    token = res.body.token;
    refreshToken = res.body.refreshToken;
    Object.values([token, refreshToken]).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
  });

  it('/auth/status (Get)', async () => {
    const res: TestResponse<Auth> = await req.get('/auth/status').set('authorization', `bearer ${token}`);
    token = res.body.token;
    refreshToken = res.body.refreshToken;
    Object.values([token, refreshToken]).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
  });

  it('/auth/refresh (Get)', async () => {
    const res: TestResponse<Auth> = await req.get('/auth/refresh').set('authorization', `bearer ${refreshToken}`);
    token = res.body.token;
    refreshToken = res.body.refreshToken;
    Object.values([token, refreshToken]).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
  });
});
