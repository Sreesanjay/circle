import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import API from "../../api";
import { userList } from "../../types";
import { ProfileIconWithText } from "../../assets/Icons";
type TReport = {
     _id: string;
     createdAt: string;
     reason: string;
     reported_type: string;
     userProfile: userList;
};
export default function ViewReports({
     reportedId,
     openModal,
     setOpenModal,
}: {
     reportedId: string | null;
     openModal: boolean;
     setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
     const [reports, setReports] = useState<TReport[] | []>([]);

     useEffect(() => {
          (async () => {
               const response = await API.get(`/admin/reports/${reportedId}`);
               if (response.data) {
                    setReports(response.data.reports);
               }
          })();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [reportedId]);
     return (
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
               <Modal.Header>Reports</Modal.Header>
               <Modal.Body>
                    {reports &&
                         reports.map((report, index) => {
                              return (
                                   <div
                                        className="report bg-gray-600 p-3 rounded-md mb-3 text-white"
                                        key={index}
                                   >
                                        <div className="header flex gap-5">
                                             <div className="profile-icon">
                                                  {report.userProfile
                                                       .profile_img ? (
                                                       <img
                                                            src={
                                                                 report
                                                                      .userProfile
                                                                      .profile_img
                                                            }
                                                            alt=""
                                                       />
                                                  ) : (
                                                       <ProfileIconWithText
                                                            size={"small"}
                                                            email={
                                                                 report
                                                                      .userProfile
                                                                      .email
                                                            }
                                                       />
                                                  )}
                                             </div>
                                             <h1 className="text-lg font-medium">
                                                  {report.userProfile.username}
                                             </h1>
                                        </div>
                                        <p className="py-5">{report.reason}</p>
                                   </div>
                              );
                         })}
               </Modal.Body>
          </Modal>
     );
}
