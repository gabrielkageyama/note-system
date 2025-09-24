"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon = __importStar(require("argon2"));
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../Schemas/user.schema");
const mongoose_2 = require("mongoose");
const rabbitConstants_1 = require("./rabbitConstants");
const microservices_1 = require("@nestjs/microservices");
let AuthService = class AuthService {
    userModel;
    clientRmq;
    jwt;
    config;
    constructor(userModel, clientRmq, jwt, config) {
        this.userModel = userModel;
        this.clientRmq = clientRmq;
        this.jwt = jwt;
        this.config = config;
    }
    async login(dto) {
        const user = await this.userModel
            .findOne({ username: dto.username })
            .select('+hashPw');
        if (user) {
            const passwordCheck = await argon.verify(user.hashPw, dto.password);
            let lastLogin = new Date();
            await user.updateOne({ lastLogin: lastLogin });
            if (!passwordCheck) {
                throw new common_1.UnauthorizedException();
            }
            else {
                return this.signToken(user._id, user.email);
            }
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    logout() { }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = new this.userModel({
                username: dto.username,
                email: dto.email,
                hashPw: hash,
            });
            await user.save();
            await this.clientRmq.emit('user-created', user);
            return user;
        }
        catch (err) {
            console.error('Error creating user:', err);
            throw new common_1.ForbiddenException('Error while trying to create the user');
        }
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const jwtKey = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: jwtKey,
        });
        return {
            access_token: token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)(rabbitConstants_1.NOTIFICATION_SERVICE)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        microservices_1.ClientProxy,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map