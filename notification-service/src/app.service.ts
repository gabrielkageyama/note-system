import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private mailService: MailerService) {}

  async sendEmail(emailOptions){
    
    try {

      return await this.mailService.sendMail(emailOptions)
      
    } catch (error) {

      console.log(error)

    }
    
    
  }

  
}
