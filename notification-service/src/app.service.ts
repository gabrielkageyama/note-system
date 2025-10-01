import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private mailService: MailerService) {}

  async mailNoteUpdate(emailOptions){
    
    try {

      return await this.mailService.sendMail(emailOptions)
      
    } catch (error) {

      console.log(error)

    }
    
    
  }

  mailNoteCreation(){
    console.log('Nota Criada em breve sera enviada por email a confirmação');
  }

  mailUserCreation(){
    console.log('User criado com sucesso, confirmação será enviada por email')
  }
}
