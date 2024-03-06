"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminInterestController_1 = require("../controllers/adminInterestController");
const router = (0, express_1.Router)();
router.route('/')
    .post(authMiddleware_1.protectAdmin, adminInterestController_1.newInterest)
    .get(authMiddleware_1.protectAdmin, adminInterestController_1.getAllInterest);
router.delete('/:id', authMiddleware_1.protectAdmin, adminInterestController_1.deleteInterest);
router.put('/:id', authMiddleware_1.protectAdmin, adminInterestController_1.updateInterest);
exports.default = router;
