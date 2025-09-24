import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NOTIFICATION_SERVICE } from './rabbitConstants';

@Module({ // create here the client to send sign up events
  imports: [
      ClientsModule.registerAsync([
      {
          imports: [ConfigModule],
          name: NOTIFICATION_SERVICE,
          useFactory: async (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                  urls: configService.get('RABBITMQ_URL'),
                  queue: 'users-queue',
                  queueOptions: {
                    durable: true
                  }
              },
          }),
          inject: [ConfigService]
      }]),
      UserModule, 
      JwtModule.register({})
    ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
