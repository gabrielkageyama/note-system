"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const note_schema_1 = require("../../Schemas/note.schema");
const user_schema_1 = require("../../Schemas/user.schema");
const cache_manager_1 = require("@nestjs/cache-manager");
const microservices_1 = require("@nestjs/microservices");
const rabbitConstant_1 = require("./rabbitConstant");
let NoteService = class NoteService {
    cacheManager;
    rmqClient;
    noteModel;
    userModel;
    constructor(cacheManager, rmqClient, noteModel, userModel) {
        this.cacheManager = cacheManager;
        this.rmqClient = rmqClient;
        this.noteModel = noteModel;
        this.userModel = userModel;
    }
    async getNote(user, noteId) {
        return this.noteModel.findById(noteId);
    }
    async getUserNotes(user) {
        const cachedNotes = await this.cacheManager.get('notes');
        if (!cachedNotes) {
            const cachedNotes = await this.cacheManager.set('notes', {
                notes: user.notes,
            });
            return cachedNotes;
        }
        return cachedNotes;
    }
    async createNote(user, dto) {
        const noteCreator = await this.userModel.findOne({
            username: user.username,
        });
        if (!noteCreator) {
            throw new common_1.ForbiddenException('Unable to create note');
        }
        const note = new this.noteModel({
            ...dto,
            noteCreator: user,
        });
        await note.save();
        this.rmqClient.emit('note-created', note);
        noteCreator.notes.push(note);
        await noteCreator.save();
        await this.cacheManager.del('notes');
        return note;
    }
    async updateNote(user, dto, noteId) {
        const updatedNote = await this.noteModel.findByIdAndUpdate(noteId, {
            ...dto,
        });
        await this.cacheManager.del('notes');
        return updatedNote;
    }
    async deleteNote(user, noteId) {
        const note = await this.noteModel.findById(noteId);
        if (!note || note.noteCreator.username != user.username) {
            throw new common_1.ForbiddenException('Unable to delete desired information');
        }
        await this.cacheManager.del('notes');
        await note.deleteOne(noteId);
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(rabbitConstant_1.NOTIFICATION_SERVICE)),
    __param(2, (0, mongoose_1.InjectModel)(note_schema_1.Note.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object, microservices_1.ClientProxy,
        mongoose_2.Model,
        mongoose_2.Model])
], NoteService);
//# sourceMappingURL=note.service.js.map