import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user-created')
  handleUserCreation(@Payload() user: any){

    console.log('User criado com sucesso, confirmação será enviada por email')
  }

  @MessagePattern('note-updated')
  handleNoteUpdate(@Payload() note: any){

    console.log('Nota editada em breve sera enviado os detalhes por email')
  }

  @MessagePattern('note-created')
  handleNoteCreation(@Payload() note: any){

    console.log('Nota Criada em breve sera enviada por email a confirmação');
  }
}
