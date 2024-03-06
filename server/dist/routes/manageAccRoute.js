"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const accountManagementController_1 = require("../controllers/accountManagementController");
const userAuthController_1 = require("../controllers/userAuthController");
const router = (0, express_1.Router)();
router.route('/interest')
    .get(authMiddleware_1.protect, accountManagementController_1.getAllInterest)
    .post(authMiddleware_1.protect, accountManagementController_1.getMyInterest);
router.post('/interest/add-interest', authMiddleware_1.protect, accountManagementController_1.addInterest);
router.delete('/interest/:id', authMiddleware_1.protect, accountManagementController_1.deleteMyInterest);
router.post('/reset-password', authMiddleware_1.protect, userAuthController_1.resetPassword);
router.get('/blocked-users', authMiddleware_1.protect, accountManagementController_1.getBlockedUsers);
exports.default = router;
