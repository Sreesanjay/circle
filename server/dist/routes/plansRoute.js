"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const planController_1 = require("../controllers/planController");
const router = (0, express_1.Router)();
router.route('/')
    .get(authMiddleware_1.protectAdmin, planController_1.getPlans)
    .post(authMiddleware_1.protectAdmin, planController_1.createPlan);
router.put('/activate/:id', authMiddleware_1.protectAdmin, planController_1.activatePlan);
router.put('/deactivate/:id', authMiddleware_1.protectAdmin, planController_1.deactivatePlan);
exports.default = router;
