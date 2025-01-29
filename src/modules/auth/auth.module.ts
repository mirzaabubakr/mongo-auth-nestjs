import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { LoggerModule } from '../logger/logger.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtModule, UserModule, LoggerModule.register('AuthModule')],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
