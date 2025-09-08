import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
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
    
    @HttpCode(HttpStatus.OK)
    @Get('user-notes')
    getUserNotes( @GetUser() user: User){
        return this.noteService.getUserNotes(user);
    }
    
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getNote( @GetUser() user: User, @Param('id', ParseObjectIdPipe) noteId: Object ) {
        return this.noteService.getNote(user, noteId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create-note')
    createNote( @GetUser() user: User, @Body() dto: NoteDto ) {
        return this.noteService.createNote(user, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    updateNote( @GetUser() user: User, @Body() dto: UpdateNoteDto, @Param('id', ParseObjectIdPipe) noteId: Object ) {
        return this.noteService.updateNote(user, dto, noteId);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteNote( @GetUser() user: User, @Param('id', ParseObjectIdPipe) noteId: Object) {
        return this.noteService.deleteNote(user, noteId);
    }
}