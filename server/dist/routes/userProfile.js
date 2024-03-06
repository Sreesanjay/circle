"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userProfileController_1 = require("../controllers/userProfileController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.route('/')
    .get(authMiddleware_1.protect, userProfileController_1.getUserProfile)
    .put(authMiddleware_1.protect, userProfileController_1.updateProfile);
router.patch('/update-cover-img', authMiddleware_1.protect, userProfileController_1.updateCoverImg);
router.delete('/delete-cover-img', authMiddleware_1.protect, userProfileController_1.deleteCoverImg);
router.patch('/update-profile_img', authMiddleware_1.protect, userProfileController_1.updateProfileImg);
router.delete('/delete-profile_img', authMiddleware_1.protect, userProfileController_1.deleteProfileImg);
router.get('/connection-count', authMiddleware_1.protect, userProfileController_1.getConnectionCount);
router.get('/posts', authMiddleware_1.protect, userProfileController_1.getMyPosts);
router.get('/saved-posts', authMiddleware_1.protect, userProfileController_1.getSavedPosts);
router.get('/get-posts/:id', authMiddleware_1.protect, userProfileController_1.getUserPosts);
//verification
router.post('/createPayment', authMiddleware_1.protect, userProfileController_1.createPaymentRequest);
router.post('/add-verification', authMiddleware_1.protect, userProfileController_1.addVerification);
exports.default = router;
