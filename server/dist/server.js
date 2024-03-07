"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_1 = __importDefault(require("./socket"));
const PORT = validateEnv_1.default.PORT;
mongoose_1.default.connect(validateEnv_1.default.MONGO_CONNECTION_STRING).then(() => {
    console.log("mongodb connected");
    const server = app_1.default.listen(PORT, () => console.log(`server running on port ${PORT}`));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const io = socket_1.default.getIo(server);
});
