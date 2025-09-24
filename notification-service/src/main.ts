import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as fs from 'fs';
console.log('cwd:', process.cwd());
console.log('__dirname:', __dirname);
console.log('.env exists (cwd):', fs.existsSync('.env'));
console.log('.env exists (__dirname + ../):', fs.existsSync(require('path').resolve(__dirname, '..', '.env')));
console.log('RABBITMQ_URL:', process.env.RABBITMQ_URL);



async function bootstrap() {
  
  const rmqUrl = process.env.RABBITMQ_URL;
  console.log('aaa ' + rmqUrl);
  if (!rmqUrl) {
    throw new Error('RABBITMQ_URL is required');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: 'notes-queue',
      queueOptions: {
        durable: true
      },
    },
  });
  
  await app.listen();
}
bootstrap();
