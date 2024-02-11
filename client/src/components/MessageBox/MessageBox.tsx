import { useAppSelector } from "../../app/hooks";
import { ProfileIconWithText } from "../../assets/Icons";
import { IMessage } from "../../types";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TimeAgo from "react-timeago";

export default function MessageBox({ message }: { message: IMessage }) {
     const { user } = useAppSelector((state) => state.auth);
     return (
          <div
               className={`
    flex gap-4 mb-3
    ${message.sender_id === user?._id ? "own" : "others"} `}
          >
               {message.sender_id !== user?._id && (
                    <div className="profile-img ">
                         {message.userDetails?.profile_img ? (
                              <img
                                   src={message.userDetails.profile_img}
                                   alt="dsfkajfhskadfh"
                                   className="w-8 h-8 rounded-full"
                              />
                         ) : (
                              <ProfileIconWithText
                                   size={"small"}
                                   email={message.userDetails?.email || ""}
                              />
                         )}
                    </div>
               )}
               <div className="body flex flex-col gap-2">
                    <div className="user_details flex justify-between items-baseline">
                         <h1>
                              {message.sender_id !== user?._id &&
                                   message.userDetails.username}
                         </h1>

                         <div className="text-xs font-light">
                              <TimeAgo
                                   date={message.createdAt || Date.now()}
                                   minPeriod={6}
                                   formatter={(
                                        value: number,
                                        unit: TimeAgo.Unit,
                                        suffix: TimeAgo.Suffix
                                   ) => {
                                        if (unit === "second")
                                             return "just now";
                                        const plural: string =
                                             value !== 1 ? "s" : "";
                                        return `${value} ${unit}${plural} ${suffix}`;
                                   }}
                              />
                         </div>
                    </div>
                    <div
                         className={`
         message relative py-3 w-min h-max min-w-60 max-w-96 rounded-md px-2
         ${
              message.sender_id === user?._id
                   ? "own bg-green-800"
                   : "others bg-gray-500"
         }`}
                    >
                         <p
                              className="max-w-96 pe-2"
                              style={{
                                   overflowWrap: "break-word",
                              }}
                         >
                              {message.content}
                         </p>
                         <div className="seen absolute right-1 bottom-0">
                              {message.sender_id === user?._id ? (
                                   message.read_by.length > 0 ? (
                                        <DoneAllIcon
                                             sx={{
                                                  fontSize: 15,
                                                  color: "blue",
                                             }}
                                        />
                                   ) : (
                                        <DoneAllIcon
                                             sx={{
                                                  fontSize: 15,
                                             }}
                                        />
                                   )
                              ) : null}
                         </div>
                    </div>
               </div>
          </div>
     );
}
