"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
router.get("/getAll", async (_req, res) => {
    const controller = new UserController_1.default();
    const response = await controller.getAll();
    return res.send(response);
});
router.post("/create", async (req, res) => {
    const controller = new UserController_1.default();
    const response = await controller.create(req.body);
    return res.send(response);
});
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const controller = new UserController_1.default();
    const response = await controller.update(id, req.body);
    return res.send(response);
});
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const controller = new UserController_1.default();
    const response = await controller.remove(id);
    return res.send(response);
});
exports.default = router;
