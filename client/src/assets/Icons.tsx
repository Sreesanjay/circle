import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PortraitIcon from "@mui/icons-material/Portrait";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
const PRIMARY = "#388087";
export function Notification() {
     return (
          <>
               <IconButton>
                    <NotificationsNoneIcon
                         sx={{ fontSize: 35, color: PRIMARY }}
                    />
               </IconButton>
          </>
     );
}
export function VolumeOn({ size }: { size: number }) {
     return (
          <>
               <IconButton>
                    <VolumeDownIcon
                         sx={{ fontSize: { size }, color: PRIMARY }}
                    />
               </IconButton>
          </>
     );
}
export function LikeIcon({ size }: { size: number }) {
     return (
          <>
               <IconButton>
                    <FavoriteBorderIcon
                         sx={{ fontSize: { size }, color: "red" }}
                    />
               </IconButton>
          </>
     );
}
export function IconSend({ size }: { size: number }) {
     return (
          <>
               <IconButton>
                    <SendIcon sx={{ fontSize: { size }, color: PRIMARY }} />
               </IconButton>
          </>
     );
}
export function DislikeIcon({ size }: { size: number }) {
     return (
          <>
               <IconButton>
                    <FavoriteIcon sx={{ fontSize: { size }, color: "red" }} />
               </IconButton>
          </>
     );
}

export function VolumeOff({ size }: { size: number }) {
     return (
          <>
               <IconButton>
                    <VolumeOffIcon
                         sx={{ fontSize: { size }, color: PRIMARY }}
                    />
               </IconButton>
          </>
     );
}

export function HomeIcon() {
     return (
          <IconButton>
               <HomeOutlinedIcon sx={{ fontSize: 35, color: PRIMARY }} />
          </IconButton>
     );
}
export function AddIcon({ size }: { size: number }) {
     return (
          <IconButton>
               <AddCircleIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}
export function CloseXIcon({ size }: { size: number }) {
     return (
          <IconButton>
               <CloseIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}
export function CloseCircleIcon({ size }: { size: number }) {
     return (
          <IconButton>
               <HighlightOffIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}

export function EventIcon() {
     return (
          <IconButton>
               <EventAvailableOutlinedIcon
                    sx={{ fontSize: 35, color: PRIMARY }}
               />
          </IconButton>
     );
}
export function SearchIcon() {
     return (
          <IconButton>
               <SearchOutlinedIcon sx={{ color: PRIMARY }} />
          </IconButton>
     );
}

interface ProfileIconWithTextProps {
     email: string;
     size: string;
}
//profile icon  with first letter of email
export function ProfileIconWithText({ email, size }: ProfileIconWithTextProps) {
     const [firstLetter, setFirstLetter] = useState("");
     useEffect(() => {
          setFirstLetter(email[0]);
     }, [email]);
     return (
          <div
               className={`icon text-primary ${
                    size === "small"
                         ? "text-2xl"
                         : size === "medium"
                         ? "text-4xl py-1"
                         : size === "large"
                         ? "text-9xl px-8"
                         : null
               } bg-gray-200 hover:bg-gray-300 px-3 min-h-10 rounded-lg w-min`}
          >
               {firstLetter?.toUpperCase()}
          </div>
     );
}

export function UserIcon({ size }: { size: number }) {
     return (
          <IconButton>
               <AccountCircleOutlinedIcon
                    sx={{ fontSize: size, color: PRIMARY }}
               />
          </IconButton>
     );
}

export function RemoveIcon({ size }: { size: number }) {
     return (
          <IconButton>
               <DoDisturbOnIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}

export function IconSetting({ size }: { size: number }) {
     return (
          <IconButton>
               <SettingsIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}

export function DeleteBin({ size }: { size: number }) {
     return (
          <IconButton>
               <DeleteIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}
// edit icon with background hover
export function Edit({ size }: { size: number }) {
     return (
          <IconButton>
               <CreateIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}

export function ThreeDot({ size }: { size: number }) {
     return <MoreHorizIcon sx={{ fontSize: size, color: PRIMARY }} />;
}
export function ChatIcon({ size }: { size: number }) {
     return (
          <IconButton>
               <ChatBubbleOutlineIcon sx={{ fontSize: size, color: PRIMARY }} />
          </IconButton>
     );
}
export function EditPenIcon({ size }: { size: number }) {
     return <EditIcon sx={{ fontSize: size, color: PRIMARY }} />;
}

//profile icon
export function Profile({ size }: { size: number }) {
     return <PortraitIcon sx={{ fontSize: size, color: PRIMARY }} />;
}
export function PostIcon({ size }: { size: number }) {
     return <GridViewIcon sx={{ fontSize: size, color: PRIMARY }} />;
}
export function SavedIcon({ size }: { size: number }) {
     return <BookmarkBorderIcon sx={{ fontSize: size, color: PRIMARY }} />;
}

export default null;
