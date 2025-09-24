import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'Schemas/note.schema';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { User, UserSchema } from 'Schemas/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NOTIFICATION_SERVICE } from './rabbitConstant';


@Module({
    imports: [
        ClientsModule.registerAsync([
        {
            imports: [ConfigModule],
            name: NOTIFICATION_SERVICE,
            useFactory: async (configService: ConfigService) => ({
                transport: Transport.RMQ,
                options: {
                    urls: configService.get('RABBITMQ_URL'),
                    queue: 'notes-queue',
                },
                queueOptions: {
                    durable: true,
                }
            }),
            inject: [ConfigService]
        }]),
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema}]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
    exports: [MongooseModule],
    providers: [NoteService],
    controllers: [NoteController]
})
export class NoteModule {}
