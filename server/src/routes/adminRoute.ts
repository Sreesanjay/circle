import { Router } from "express";
import interestRoute from "./interestRoute";
const router: Router = Router();

router.use('/interest',interestRoute)

export default router;