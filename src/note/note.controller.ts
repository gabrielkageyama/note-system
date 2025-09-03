import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { JwtGuard } from "src/auth/guards";
import { GetUser } from "src/auth/decorators";
import { User } from "Schemas/user.schema";
import { NoteDto, UpdateNoteDto } from "./dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";


@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
    constructor(private noteService: NoteService) { }
    
    @Get(':id')
    getNote( @GetUser('') user: User, @Param('id', ParseObjectIdPipe) noteId: Object ) {
        return this.noteService.getNote(user, noteId);
    }

    @Get('user-notes')
    getUserNotes( @GetUser('') user: User){
        return this.noteService.getUserNotes(user);
    }
    
    @Post('create-note')
    createNote( @GetUser('') user: User, @Body() dto: NoteDto ) {
        return this.noteService.createNote(user, dto);
    }

    @Patch(':id')
    updateNote( @GetUser('') user: User, @Body() dto: UpdateNoteDto, @Param('id', ParseObjectIdPipe) noteId: Object ) {
        return this.noteService.updateNote(user, dto, noteId);
    }

    @Delete(':id')
    deleteNote( @GetUser('') user: User, @Param('id', ParseObjectIdPipe) noteId: Object) {
        return this.noteService.deleteNote(user, noteId);
    }
}