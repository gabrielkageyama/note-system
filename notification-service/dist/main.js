"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const rmqUrl = process.env.RABBITMQ_URL;
    if (!rmqUrl) {
        throw new Error('RABBITMQ_URL is required');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [rmqUrl],
            queue: 'notes-queue',
            queueOptions: { durable: true },
        },
    });
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [rmqUrl],
            queue: 'users-queue',
            queueOptions: { durable: true },
        },
    });
    await app.startAllMicroservices();
}
bootstrap();
//# sourceMappingURL=main.js.map