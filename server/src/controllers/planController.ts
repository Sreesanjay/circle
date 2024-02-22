import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import Plan from "../models/planSchema";



/**
 * @desc function for creatig a new plan
 * @route POST /api/admin/pans
 * @access private
 */
export const createPlan: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { amount, discription, type, duration } = req.body;
        if (!amount || !discription || !type || !duration) {
            res.status(400);
            return next(new Error('Invalid payloads'))
        }


        const newPlan = await new Plan({ amount, discription, type, duration }).save();
        if (newPlan) {
            res.status(201).json({
                status: "created",
                message: "New plan created",
                newPlan
            })
        }

    }
)

/**
 * @desc function for fetching plans.
 * @route GET /api/admin/pans
 * @access private
 */
export const getPlans: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { planType } = req.query;

        if (!planType) {
            res.status(400);
            return next(new Error('Invalid plan type'))
        }

        const plan = await Plan.find({ type: planType, is_active: true});

        if (plan) {
            res.status(201).json({
                status: "created",
                message: "plans fetched",
                plan
            })
        }

    }
)

/**
 * @desc function for deactivating a plan.
 * @route PUT /api/admin/pans/deactivate
 * @access private
 */
export const deactivatePlan: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            return next(new Error('Plan not found'))
        }
        const plan = await Plan.findOneAndUpdate({ _id: id }, { $set: { is_active: false } }, { new: true })
        if (plan) {
            res.status(200).json({
                status: "ok",
                message: "plans deactivated",
                plan
            })
        }

    }
)


/**
 * @desc function for activating a plan.
 * @route PUT /api/admin/pans/activate
 * @access private
 */
export const activatePlan: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            return next(new Error('Plan not found'))
        }
        const plan = await Plan.findOneAndUpdate({ _id: id }, { $set: { is_active: true } }, { new: true })
        if (plan) {
            res.status(200).json({
                status: "ok",
                message: "plans activated",
                plan
            })
        }

    }
)