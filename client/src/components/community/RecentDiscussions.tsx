import { useEffect, useRef, useState } from "react";
import { IDiscussion } from "../../types";
import { getRecentDiscussions } from "../../services/communityService";
import DiscussionCard from "./DiscussionCard";

export default function RecentDiscussions() {
     const [discussion, setDiscussion] = useState<IDiscussion[] | []>([]);
     const discussionRef = useRef<HTMLDivElement | null>(null);
     useEffect(() => {
          fetchDiscussion();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     async function fetchDiscussion() {
          let pagination: Date | null = null;
          pagination =
               discussion.length > 0
                    ? discussion[discussion.length - 1].createdAt
                    : null;
          const response = await getRecentDiscussions(pagination);
          if (response.discussions) {
               if (pagination === null) {
                    setDiscussion(response.discussions);
               } else {
                    setDiscussion([...discussion, ...response.discussions]);
               }
          }
     }

     //scroll handler
     useEffect(() => {
          const handleScroll = () => {
               const { current } = discussionRef;
               if (current) {
                    const { scrollTop, scrollHeight, clientHeight } = current;
                    if (scrollTop + clientHeight >= scrollHeight - 1) {
                         fetchDiscussion();
                    }
               }
          };

          const discussionElement = discussionRef.current;
          if (discussionElement) {
               discussionElement.addEventListener("scroll", handleScroll);
          }

          return () => {
               if (discussionElement) {
                    discussionElement.removeEventListener(
                         "scroll",
                         handleScroll
                    );
               }
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [discussion]);
     return (
          <div
               className="p-10 bg-gray-800 h-full overflow-y-scroll"
               ref={discussionRef}
          >
               {discussion.map((item, index) => {
                    return (
                         <DiscussionCard
                              discussion={item}
                              setDiscussion={setDiscussion}
                              key={index}
                              type={'RECENT'}
                         />
                    );
               })}
          </div>
     );
}
