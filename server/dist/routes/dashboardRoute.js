"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminDashboardController_1 = require("../controllers/adminDashboardController");
const router = (0, express_1.Router)();
router.get('/analytics', authMiddleware_1.protectAdmin, adminDashboardController_1.getDashboardAnalytics);
router.get('/user-report/:year', authMiddleware_1.protectAdmin, adminDashboardController_1.getUserReport);
exports.default = router;
