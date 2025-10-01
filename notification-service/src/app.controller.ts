import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload, MessagePattern } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user-created')
  handleUserCreation(@Payload() user: any){

    this.appService.mailUserCreation();
  }

  @MessagePattern('note-updated')
  handleNoteUpdate(@Payload() noteAndUser: Array<any>){
    const note = noteAndUser[0];
    const user = noteAndUser[1];
    
    const emailOptions = {
      from: {
        name: 'Note System',
        address: process.env.EMAIL
      },
      to: user.email,
      subject: 'One of your notes was updated',
      text: 
      `Here are the details of the update:
      
      Title: ${note.title}
      User: ${user.username}
      Updated At: ${note.updatedAt}
      
      thx <3
      byee`
    }

    this.appService.mailNoteUpdate(emailOptions);
    
  }

  @MessagePattern('note-created')
  handleNoteCreation(@Payload() note: any){

    this.appService.mailNoteCreation();
  }
}
