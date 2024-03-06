import { Router } from "express";
import interestRoute from "./interestRoute";
import userManagementRoute from "./userManagementRoute";
import postManagementRoute from "./postManagementRoute";
import communityManagementRoute from "./communityManagementRoute";
import discussionManagementRoute from "./discussionManagementRoute";
import dashboardRoute from "./dashboardRoute";
import chatManagement from "./chatManagement";
import plansRoute from "./plansRoute";
import reportsRoute from "./reportsRoute";
const router: Router = Router();

router.use('/dashboard', dashboardRoute)
router.use('/reports', reportsRoute)
router.use('/interest', interestRoute)
router.use('/user-management', userManagementRoute)
router.use('/post-management', postManagementRoute)
router.use('/community-management', communityManagementRoute)
router.use('/discussion-management', discussionManagementRoute)
router.use('/chat-management', chatManagement)
router.use('/plans', plansRoute)

export default router;