"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./service/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL || "";
(0, database_1.connect)(DATABASE_URL);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Working!");
});
app.use("/users/", UserRoutes_1.default);
app.use("/swagger", /* endereço do swagger */ swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: ".public/swagger.json",
    },
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
