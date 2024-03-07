"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import morgan from "morgan"
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middlewares/errorHandler");
require("dotenv/config");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: "https://my-circle.online",
    credentials: true,
};
// app.use(morgan('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsConfig));
//routes
app.use('/api', userRoute_1.default);
app.use('/api/admin', adminRoute_1.default);
//error handler
app.use('*', errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
