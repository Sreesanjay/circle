import { Breadcrumb } from "flowbite-react";
import ManageAccSidebar from "../../components/ManageAccountSidebar/ManageAccSidebar";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function AccountPage() {
     const navigate = useNavigate();
     const { userProfile } = useAppSelector((state) => state.user);
     return (
          <>
               <ManageAccSidebar />
               <section className="p-5 md:ms-64">
                    <Breadcrumb aria-label="Default breadcrumb example">
                         <Breadcrumb.Item icon={LiaUserFriendsSolid}>
                              Account
                         </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="body py-5">
                         <h1 className="text-2xl mb-5">Verify Account</h1>
                         <p className="text-sm">
                              Welcome to Circle! To ensure a safe and authentic
                              community, we have implemented a verification
                              process. This verification badge distinguishes
                              genuine accounts from impersonators and enhances
                              the credibility of users within our network.
                         </p>
                         <h1 className="pt-10 pb-4">
                              Why should you get verified?
                         </h1>
                         <p className="text-sm">
                              Verifying your account not only adds credibility
                              to your profile but also offers several benefits:
                         </p>

                         <ol
                              style={{ listStyleType: "lower-alpha" }}
                              className="p-5 text-sm"
                         >
                              <li className="mb-3">
                                   Enhanced Trust: Users are more likely to
                                   trust and engage with verified accounts,
                                   fostering meaningful interactions within our
                                   community.
                              </li>
                              <li className="mb-3">
                                   Credibility: A verification badge
                                   distinguishes your account as authentic,
                                   helping to build your reputation and
                                   credibility among peers.
                              </li>
                              {/* <li className="mb-3">
                                   Safety: Verification helps in reducing the
                                   risk of impersonation and protects users from
                                   fraudulent activities.
                              </li> */}
                         </ol>
                         {userProfile?.isVerified ? (
                              <button className="bg-gray-700 px-3 py-1 rounded-md">Already Verified</button>
                         ) : (
                              <button
                                   className="bg-primary hover:bg-primary-hover px-3 py-1 rounded-md"
                                   onClick={() =>
                                        navigate(
                                             "/manage-account/account/verify-account"
                                        )
                                   }
                              >
                                   Get Verification
                              </button>
                         )}
                    </div>
               </section>
          </>
     );
}
