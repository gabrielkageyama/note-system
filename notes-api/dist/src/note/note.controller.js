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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const note_service_1 = require("./note.service");
const guards_1 = require("../auth/guards");
const decorators_1 = require("../auth/decorators");
const user_schema_1 = require("../../Schemas/user.schema");
const dto_1 = require("./dto");
const mongoose_1 = require("@nestjs/mongoose");
let NoteController = class NoteController {
    noteService;
    constructor(noteService) {
        this.noteService = noteService;
    }
    getUserNotes(user) {
        return this.noteService.getUserNotes(user);
    }
    getNote(user, noteId) {
        console.log(user);
        return this.noteService.getNote(user, noteId);
    }
    createNote(user, dto) {
        console.log(user);
        return this.noteService.createNote(user, dto);
    }
    updateNote(user, dto, noteId) {
        console.log(user);
        return this.noteService.updateNote(user, dto, noteId);
    }
    deleteNote(user, noteId) {
        return this.noteService.deleteNote(user, noteId);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('user-notes'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "getUserNotes", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(':id'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', mongoose_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        Object]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "getNote", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('create-note'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        dto_1.NoteDto]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "createNote", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)(':id'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', mongoose_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        dto_1.UpdateNoteDto,
        Object]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "updateNote", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', mongoose_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        Object]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "deleteNote", null);
exports.NoteController = NoteController = __decorate([
    (0, common_1.UseGuards)(guards_1.JwtGuard),
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
//# sourceMappingURL=note.controller.js.map