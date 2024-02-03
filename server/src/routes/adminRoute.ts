import { Router } from "express";
import interestRoute from "./interestRoute";
import userManagementRoute from "./userManagementRoute";
import postManagementRoute from "./postManagementRoute";
const router: Router = Router();

router.use('/interest',interestRoute)
router.use('/user-management',userManagementRoute)
router.use('/post-management',postManagementRoute)

export default router;