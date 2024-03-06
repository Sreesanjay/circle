"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
router.get('/:id', authMiddleware_1.protectAdmin, reportController_1.getReports);
exports.default = router;
