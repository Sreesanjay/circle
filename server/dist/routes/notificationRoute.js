"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.protect, notificationController_1.getUnreadNotifications);
router.put('/:id', authMiddleware_1.protect, notificationController_1.readNotificaiton);
exports.default = router;
