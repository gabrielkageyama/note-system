import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { MailTemplates } from 'templates/mailTemplates';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mailTemplate: MailTemplates) {}

  @MessagePattern('user-created')
  handleUserCreation(@Payload() user: any){

    this.appService.sendEmail(this.mailTemplate.userCreationTemplate(user));
  }

  @MessagePattern('note-updated')
  handleNoteUpdate(@Payload() noteAndUser: Array<any>){
    const note = noteAndUser[0];
    const user = noteAndUser[1];
    const changes = noteAndUser[2];


    this.appService.sendEmail(this.mailTemplate.noteUpdateTemplate(user, note, changes));
    
  }

  @MessagePattern('note-created')
  handleNoteCreation(@Payload() noteAndUser: Array<any>){
    const note = noteAndUser[0];
    const user = noteAndUser[1];

    this.appService.sendEmail(this.mailTemplate.noteCreationTemplate(user, note));

  }
}
