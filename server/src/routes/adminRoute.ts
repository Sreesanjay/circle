import { Router } from "express";
import interestRoute from "./interestRoute";
import userManagementRoute from "./userManagementRoute";
const router: Router = Router();

router.use('/interest',interestRoute)
router.use('/user-management',userManagementRoute)

export default router;