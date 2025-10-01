import { MailerService } from '@nestjs-modules/mailer';
export declare class AppService {
    private mailService;
    constructor(mailService: MailerService);
    mailNoteUpdate(emailOptions: any): Promise<any>;
    mailNoteCreation(): void;
    mailUserCreation(): void;
}
