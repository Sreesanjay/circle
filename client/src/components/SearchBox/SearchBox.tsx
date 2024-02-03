import "./SearchBox.css";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Autocomplete from "@mui/material/Autocomplete";
// import { SearchIcon } from "../../assets/Icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
     const [search, setSearch] = useState("");
     const navigate = useNavigate();
     const [userData, setUserData] = useState<
          | {
                 user_id: string;
                 username: string;
                 fullname: string;
                 profile_img: string;
            }[]
          | []
     >([]);
     useEffect(() => {
          (async () => {
               try {
                    const response = await API.get(
                         `/users/user-search?search=${search}`,
                         { withCredentials: true }
                    );
                    if (response.data) {
                         setUserData(response.data.userData);
                    }
               } catch (error) {
                    const err = error as AxiosError<{
                         message?: string;
                         status?: string;
                    }>;
                    toast.error(err.message);
               }
          })();
     }, [search]);

     return (
          <div className="search-box">
               <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    className="search"
                    placeholder="Search"
                    value={search}
               />
               {userData.length > 0 && (
                    <div className="user-list-search absolute mt-2 py-2 bg-white w-72 shadow-md cursor-pointer">
                         {userData.map((user) => {
                              return (
                                   <div
                                        className="user h-12 flex px-3 gap-3 items-center mb-2"
                                        onClick={() => {
                                             setSearch("");
                                             navigate(
                                                  `/view-profile/${user.user_id}`
                                             );
                                        }}
                                   >
                                        <img
                                             src={user.profile_img}
                                             alt=""
                                             className="w-11 shadow rounded-md"
                                        />
                                        <div className="name leading-none">
                                             <h1>{user.username}</h1>
                                             <small>{user.fullname}</small>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               )}
               {/* <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                         id="free-solo-demo"
                         freeSolo
                         options={userData.map(
                              (user: { username: string }, index) =>
                                   index < 3 && user.username
                         )}
                         renderInput={(params) => (
                              <TextField
                                   {...params}
                                   label="Search"
                                   className="textfield"
                                   onChange={(e) => setSearch(e.target.value)}
                                   sx={{
                                        '& .MuiOutlinedInput-root': {
                                          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'transparent', // Or any other transparent color
                                          },
                                          borderColor: 'transparent', // Remove default border as well
                                        },
                                      }}
                                      onClick={()=>console.log("clicked")}
                              />
                         )}
                    />
               </Stack> */}
               {/* <label htmlFor="input" className="labelforsearch">
                    <SearchIcon />
               </label> */}
               {/* <div className="border" /> */}
          </div>
     );
}
