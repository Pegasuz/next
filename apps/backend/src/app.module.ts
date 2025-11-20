import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExampleFeatureModule } from './modules/example-feature/example-feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USERNAME', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'postgres'),
        database: configService.get('DATABASE_NAME', 'app_db'),
        entities: [__dirname + '/**/*.entity.orm{.ts,.js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE', true),
        logging: configService.get('DATABASE_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    ExampleFeatureModule,
  ],
})
export class AppModule {}
