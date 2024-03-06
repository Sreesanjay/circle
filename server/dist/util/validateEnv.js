"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    MONGO_CONNECTION_STRING: (0, envalid_1.str)(),
    JWT_ACCESSTOKEN_SECRET: (0, envalid_1.str)(),
    JWT_REFRESHTOKEN_SECRET: (0, envalid_1.str)(),
    RAZORPAY_KEY: (0, envalid_1.str)(),
    RAZORPAY_SECRET: (0, envalid_1.str)()
});
exports.default = env;
