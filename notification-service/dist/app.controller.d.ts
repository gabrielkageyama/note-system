import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    handleUserCreation(user: any): void;
    handleNoteUpdate(note: any): void;
    handleNoteCreation(note: any): void;
}
