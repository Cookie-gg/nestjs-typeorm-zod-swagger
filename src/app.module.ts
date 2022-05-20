import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, AuthModule } from '~/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '~/libs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV !== 'production',
      envFilePath: process.env.NODE_ENV === 'production' ? `.env.${process.env.NODE_ENV}` : undefined,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({ ...configService.get('database') }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
