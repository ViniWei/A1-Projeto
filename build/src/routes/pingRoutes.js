"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PingController_1 = __importDefault(require("../controllers/PingController"));
const router = express_1.default.Router();
router.get('/ping', async (req, res) => {
    const controller = new PingController_1.default();
    const response = await controller.getMessage();
    return res.send(response);
});
exports.default = router;
