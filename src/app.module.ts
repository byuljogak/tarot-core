import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/validate';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { Config } from './schemas/config.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { TarotModule } from './modules/tarot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config, true>) => ({
        secret: configService.get<Config['jwt']>('jwt').secret,
      }),
      global: true,
    }),
    TarotModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
