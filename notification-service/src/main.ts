import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  
  const rmqUrl = process.env.RABBITMQ_URL;
  
  if (!rmqUrl) {
    throw new Error('RABBITMQ_URL is required');
  }

  const app = await NestFactory.create(AppModule);


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: 'notes-queue',
      queueOptions: { durable: true },
    },
  });


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: 'users-queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
