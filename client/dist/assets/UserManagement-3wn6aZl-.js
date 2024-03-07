import{H as k,r,i as c,Q as o,j as e,L as E}from"./index-OvvBBrK8.js";import{B as p,T as a,P as S}from"./Toast-dnH8qWjo.js";import{A as U}from"./AdminSidebar-ahSbbMlK.js";import{F as R,N as M,V as T}from"./ViewReports-3DLWNtI7.js";import{I as H}from"./InputLabel-bG0w8onT.js";import"./index.esm-DHFw0uN6.js";import"./Menu-PrdCgJob.js";import"./index.esm-zDnZf6vX.js";function I(n){return k({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{id:"User"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{d:"M17.438,21.937H6.562a2.5,2.5,0,0,1-2.5-2.5V18.61c0-3.969,3.561-7.2,7.938-7.2s7.938,3.229,7.938,7.2v.827A2.5,2.5,0,0,1,17.438,21.937ZM12,12.412c-3.826,0-6.938,2.78-6.938,6.2v.827a1.5,1.5,0,0,0,1.5,1.5H17.438a1.5,1.5,0,0,0,1.5-1.5V18.61C18.938,15.192,15.826,12.412,12,12.412Z"}},{tag:"path",attr:{d:"M12,9.911a3.924,3.924,0,1,1,3.923-3.924A3.927,3.927,0,0,1,12,9.911Zm0-6.847a2.924,2.924,0,1,0,2.923,2.923A2.926,2.926,0,0,0,12,3.064Z"}}]}]}]})(n)}function Z(){const[n,g]=r.useState({total_users:0,todays_users:0,thismonth_users:0,this_year_users:0}),[d,y]=r.useState("RECENTLTY_JOINED"),[h,f]=r.useState(1),[N,m]=r.useState(!1),[x,u]=r.useState([]),[b,C]=r.useState(null),[v,j]=r.useState(!1);r.useEffect(()=>{(async()=>{try{m(!0);const s=await c.get(`/admin/user-management/userlist?page=${h}&&sort=${d}`,{withCredentials:!0});s.data&&(u(s.data.userList),m(!1))}catch(s){const t=s;m(!1),o.error(t.message)}})()},[h,d]),r.useEffect(()=>{(async()=>{try{const s=await c.get("/admin/user-management/analytics",{withCredentials:!0});s.data&&g(s.data.analytics)}catch(s){const t=s;o.error(t.message)}})()},[]);async function w(s){try{(await c.put(`/admin/user-management/block/${s}`,{},{withCredentials:!0})).data&&u(l=>l.map(i=>(i._id===s&&(i.is_blocked=!0),i)))}catch(t){const l=t;o.error(l.message)}}async function _(s){try{(await c.put(`/admin/user-management/unblock/${s}`,{},{withCredentials:!0})).data&&u(l=>l.map(i=>(i._id===s&&(i.is_blocked=!1),i)))}catch(t){const l=t;o.error(l.message)}}return e.jsx(e.Fragment,{children:N?e.jsx(E,{}):e.jsxs("section",{className:"user-management",children:[e.jsx(U,{}),e.jsxs("section",{className:"body md:ms-80 py-5",children:[e.jsx(p,{"aria-label":"Default breadcrumb example",children:e.jsx(p.Item,{href:"#",icon:I,children:"User Management"})}),e.jsxs("div",{className:"analytics flex justify-around gap-2 flex-wrap mt-5",children:[e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"Total Users"}),e.jsx("h1",{className:"text-4xl",children:n.total_users})]}),e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"New Users(Today)"}),e.jsx("h1",{className:"text-4xl",children:n.todays_users})]}),e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"New Users(This Month)"}),e.jsx("h1",{className:"text-4xl",children:n.thismonth_users})]}),e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"New Users (This Year)"}),e.jsx("h1",{className:"text-4xl",children:n.this_year_users})]})]}),e.jsxs("div",{className:"user-list pe-5 text-white",children:[e.jsx("h1",{className:"my-10",children:"User Management"}),e.jsxs("section",{className:"filter flex justify-between my-5",children:[e.jsx("div",{className:"sort",children:e.jsxs(R,{fullWidth:!0,children:[e.jsx(H,{variant:"standard",htmlFor:"uncontrolled-native",children:"Sort"}),e.jsxs(M,{defaultValue:d,inputProps:{name:"sort",id:"uncontrolled-native"},onChange:s=>y(s.target.value),children:[e.jsx("option",{value:"RECENTLTY_JOINED",children:"Recently Joined"}),e.jsx("option",{value:"OLDEST_MEMBERS",children:"Oldest Members"}),e.jsx("option",{value:"REPORTS",children:"Reports"}),e.jsx("option",{value:"USERNAME",children:"Username"})]})]})}),e.jsx("div",{className:"search",children:e.jsx("input",{type:"text",placeholder:"Search account",className:"rounded-md text-black"})})]}),e.jsxs(a,{hoverable:!0,children:[e.jsxs(a.Head,{children:[e.jsx(a.HeadCell,{children:"Si. No"}),e.jsx(a.HeadCell,{children:"Username"}),e.jsx(a.HeadCell,{children:"Email"}),e.jsx(a.HeadCell,{children:"Reports"}),e.jsx(a.HeadCell,{children:"View"}),e.jsx(a.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"Block"})})]}),e.jsx(a.Body,{className:"divide-y",children:x==null?void 0:x.map((s,t)=>e.jsxs(a.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800",children:[e.jsx(a.Cell,{className:"whitespace-nowrap font-medium text-gray-900 dark:text-white",children:t}),e.jsx(a.Cell,{children:s.username}),e.jsx(a.Cell,{children:s.email}),e.jsx(a.Cell,{children:s.reports.length}),e.jsx(a.Cell,{children:e.jsx("button",{className:"text-primary",onClick:()=>{C(s._id),j(!0)},children:"View"})}),e.jsx(a.Cell,{children:s.is_blocked?e.jsx("button",{onClick:()=>_(s._id),children:"Unblock"}):e.jsx("button",{onClick:()=>w(s._id),children:"Block"})})]},t))})]}),e.jsx("div",{className:"pagination",children:e.jsx(S,{currentPage:h,totalPages:n.total_users/10,onPageChange:s=>f(s)})})]})]}),e.jsx(T,{reportedId:b,openModal:v,setOpenModal:j})]})})}export{Z as default};