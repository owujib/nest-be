// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduelRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduelRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3001);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3001');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('signup', () => {
      it('should signup', async () => {
        const dto: AuthDto = {
          email: 'test@user.com',
          password: 'password',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
      it('should should through a a validation error', async () => {
        const dto: AuthDto = {
          email: 'test',
          password: 'password',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('should should through a bad request error if user exist', async () => {
        const dto: AuthDto = {
          email: 'test@user.com',
          password: 'password',
        };
        return pactum
          .spec()
          .post('/api/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
    });
    describe('signin', () => {
      it('should signin', () => {
        const dto: AuthDto = {
          email: 'test@user.com',
          password: 'password',
        };
        return pactum
          .spec()
          .post('/api/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('Bearer', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/api/user/me')
          .withHeaders({ Authorization: 'Bearer $S{Bearer}' })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it.todo('should signup');
    });
  });
  // describe('Bookmarks', () => {
  //   describe('get bookmarks', () => {
  //     it.todo('should signup');
  //   });
  //   describe('get bookmark by id', () => {
  //     it.todo('should signup');
  //   });
  //   describe('edit ', () => {
  //     it.todo('should signup');
  //   });
  //   describe('delete', () => {
  //     it.todo('should signup');
  //   });
  // });
});
