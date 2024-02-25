import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPost } from "../../types";
import { getInsights } from "../../services/postService";
export default function Insights({
     openModal,
     setOpenModal,
     post,
}: {
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
     post: IPost;
}) {
     const [comment, setComment] = useState(0);

     useEffect(() => {
          (async () => {
               if (post) {
                    const response = await getInsights(post._id);

                    if (response) {
                         setComment(response.comment);
                    }
               }
          })();
     }, [post]);

     return (
          <div>
               <Modal
                    show={openModal}
                    size={"3xl"}
                    onClose={() => setOpenModal(false)}
               >
                    <Modal.Header>Insights</Modal.Header>
                    <Modal.Body>
                         <div className="space-y-6 grid grid-cols-2 h-full">
                              <div className="post col-span-2 sm:col-span-1">
                                   {post.type.includes("image") ? (
                                        <img
                                             src={post?.content}
                                             className="w-4/5 rounded-md"
                                        />
                                   ) : (
                                        <div className="relative">
                                             <video
                                                  className="w-full"
                                                  loop
                                                  muted
                                                  autoPlay
                                             >
                                                  <source
                                                       src={post?.content}
                                                       type="video/mp4"
                                                  />
                                                  Error Message
                                             </video>
                                        </div>
                                   )}
                              </div>
                              <div className="insights col-span-2 sm:col-span-1 h-full">
                                   <ul className="flex flex-col gap-6">
                                        <li>
                                             <div className="grid grid-cols-3">
                                                  <h1 className="col-span-2 font-medium text-xl">
                                                       Likes
                                                  </h1>
                                                  <h1 className="col-span-1 font-medium text-xl">
                                                       {post.likes.length}
                                                  </h1>
                                             </div>
                                        </li>
                                        <li>
                                             <div className="grid grid-cols-3">
                                                  <h1 className="col-span-2 font-medium text-xl">
                                                       Comments
                                                  </h1>
                                                  <h1 className="col-span-1 font-medium text-xl">
                                                       {comment}
                                                  </h1>
                                             </div>
                                        </li>
                                        <li>
                                             <div className="grid grid-cols-3">
                                                  <h1 className="col-span-2 font-medium text-xl">
                                                       Account Reached
                                                  </h1>
                                                  <h1 className="col-span-1 font-medium text-xl">
                                                       {post.impressions.length}
                                                  </h1>
                                             </div>
                                        </li>
                                        <li>
                                             <div className="grid grid-cols-3">
                                                  <h1 className="col-span-2 font-medium text-xl">
                                                       Clicks
                                                  </h1>
                                                  <h1 className="col-span-1 font-medium text-xl">
                                                       {post?.clicks?.length}
                                                  </h1>
                                             </div>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
               </Modal>
          </div>
     );
}
