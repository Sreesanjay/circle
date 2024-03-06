"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activatePlan = exports.deactivatePlan = exports.getPlans = exports.createPlan = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const planSchema_1 = __importDefault(require("../models/planSchema"));
/**
 * @desc function for creatig a new plan
 * @route POST /api/admin/pans
 * @access private
 */
exports.createPlan = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, discription, type, duration } = req.body;
    if (!amount || !discription || !type || !duration) {
        res.status(400);
        return next(new Error('Invalid payloads'));
    }
    const newPlan = yield new planSchema_1.default({ amount, discription, type, duration }).save();
    if (newPlan) {
        res.status(201).json({
            status: "created",
            message: "New plan created",
            newPlan
        });
    }
}));
/**
 * @desc function for fetching plans.
 * @route GET /api/admin/pans
 * @access private
 */
exports.getPlans = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { planType } = req.query;
    if (!planType) {
        res.status(400);
        return next(new Error('Invalid plan type'));
    }
    const plan = yield planSchema_1.default.find({ type: planType, is_active: true });
    if (plan) {
        res.status(201).json({
            status: "created",
            message: "plans fetched",
            plan
        });
    }
}));
/**
 * @desc function for deactivating a plan.
 * @route PUT /api/admin/pans/deactivate
 * @access private
 */
exports.deactivatePlan = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('Plan not found'));
    }
    const plan = yield planSchema_1.default.findOneAndUpdate({ _id: id }, { $set: { is_active: false } }, { new: true });
    if (plan) {
        res.status(200).json({
            status: "ok",
            message: "plans deactivated",
            plan
        });
    }
}));
/**
 * @desc function for activating a plan.
 * @route PUT /api/admin/pans/activate
 * @access private
 */
exports.activatePlan = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('Plan not found'));
    }
    const plan = yield planSchema_1.default.findOneAndUpdate({ _id: id }, { $set: { is_active: true } }, { new: true });
    if (plan) {
        res.status(200).json({
            status: "ok",
            message: "plans activated",
            plan
        });
    }
}));
