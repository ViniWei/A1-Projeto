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
const tsoa_1 = require("tsoa");
const UserModel_1 = require("../models/UserModel");
let UserController = class UserController {
    async create(body) {
        const data = new UserModel_1.UserModel({
            name: body.name,
            email: body.email,
            password: body.password
        });
        try {
            await data.save();
            return "Ok";
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async remove(id) {
        try {
            const user = await UserModel_1.UserModel.findByIdAndDelete(id);
            console.log("user:", user);
            if (!user) {
                return "User not found";
            }
            return "User deleted";
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
};
__decorate([
    (0, tsoa_1.Post)("/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Delete)("/remove/{id}"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, tsoa_1.Route)("users")
], UserController);
exports.default = UserController;
