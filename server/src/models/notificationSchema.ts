import mongoose, { Schema } from "mongoose";
import UserProfile from "./userProfile";
import { INotification } from "../Interfaces";
import { socketIo, activeUsers } from "../socket";

const notificationSchema: Schema<INotification> = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    message: {
        type: 'string',
        required: true,
    },
    sender_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    is_read: {
        type: Boolean,
        default: false
    }
});
notificationSchema.post<INotification>("save", async function (doc) {
    try {
        const reciever = activeUsers.find((item) => item.userId === doc.user_id.toString())
        if (reciever) {
            const user = await UserProfile.aggregate([
                {
                    $match: {
                        user_id: doc.sender_id
                    }
                },
                {

                    $lookup: {
                        from: "users",
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user',
                    }
                },
                {
                    $unwind: {
                        path: '$user'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        username: 1,
                        fullname: 1,
                        profile_img: 1,
                        email: '$user.email'
                    }
                }
            ])
            socketIo.to(reciever?.socketId).emit('recieve-notification', {
                _id: doc._id,
                user_id: doc.user_id,
                message: doc.message,
                createdAt: new Date(),
                is_read: doc.is_read,
                userProfile: user[0]
            })
        }
    } catch (err) {
        console.error(err)
    }
});

export default mongoose.model<INotification>("Notification", notificationSchema);