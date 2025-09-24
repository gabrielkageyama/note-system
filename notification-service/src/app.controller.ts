import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('note-created')
  handleNoteCreation(@Payload() note: any){

    console.log('Nota Criada em breve sera enviada por email a confirmação');
  }
}
