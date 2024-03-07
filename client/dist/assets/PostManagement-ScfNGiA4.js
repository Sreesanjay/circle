import{r,i as o,Q as c,j as e,L as b}from"./index-ngpxSBwB.js";import{A as P}from"./AdminSidebar-4auBrOYe.js";import{B as p,T as t,P as E}from"./Toast-zCjXuh_L.js";import{F as T,N as L,V as R}from"./ViewReports-gCt21qDb.js";import{I as k}from"./InputLabel-5Gw9GoR-.js";import"./Menu-VqvCqOsO.js";import"./index.esm-hta1o9gH.js";import"./index.esm-a0seUomB.js";function V(){const[i,g]=r.useState({total_posts:0,todays_posts:0,thismonth_posts:0,this_year_posts:0}),[d,f]=r.useState("RECENTLTY_CREATED"),[h,y]=r.useState(1),[N,m]=r.useState(!1),[x,j]=r.useState([]),[C,_]=r.useState(null),[v,u]=r.useState(!1);r.useEffect(()=>{(async()=>{try{m(!0);const s=await o.get(`/admin/post-management/postlist?page=${h}&&sort=${d}`);s.data&&(j(s.data.postList),m(!1))}catch(s){const a=s;m(!1),c.error(a.message)}})()},[h,d]),r.useEffect(()=>{(async()=>{try{const s=await o.get("/admin/post-management/analytics",{withCredentials:!0});s.data&&g(s.data.analytics)}catch(s){const a=s;c.error(a.message)}})()},[]);async function w(s){try{(await o.delete(`/admin/post-management/remove/${s}`,{withCredentials:!0})).data&&j(n=>n.map(l=>(l._id===s&&(l.is_delete=!0),l)))}catch(a){const n=a;c.error(n.message)}}async function S(s){try{(await o.put(`/admin/post-management/undo-remove/${s}`,{},{withCredentials:!0})).data&&j(n=>n.map(l=>(l._id===s&&(l.is_delete=!1),l)))}catch(a){const n=a;c.error(n.message)}}return e.jsx(e.Fragment,{children:N?e.jsx(b,{}):e.jsxs("section",{className:"user-management",children:[e.jsx(P,{}),e.jsxs("section",{className:"body md:ms-80 py-5",children:[e.jsx(p,{"aria-label":"Default breadcrumb example",children:e.jsx(p.Item,{href:"#",children:"Post Management"})}),e.jsxs("div",{className:"analytics flex justify-around gap-2 flex-wrap mt-5",children:[e.jsxs("div",{className:"analytics-card ",children:[e.jsx("h1",{children:"Total Posts"}),e.jsx("h1",{className:"text-4xl",children:i.total_posts})]}),e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"New Posts(Today)"}),e.jsx("h1",{className:"text-4xl",children:i.todays_posts})]}),e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"New Posts(This Month)"}),e.jsx("h1",{className:"text-4xl",children:i.thismonth_posts})]}),e.jsxs("div",{className:"analytics-card",children:[e.jsx("h1",{children:"New Posts (This Year)"}),e.jsx("h1",{className:"text-4xl",children:i.this_year_posts})]})]}),e.jsxs("div",{className:"post-list pe-5",children:[e.jsx("h1",{className:"my-10",children:"User Management"}),e.jsxs("section",{className:"filter flex justify-between my-5",children:[e.jsx("div",{className:"sort",children:e.jsxs(T,{fullWidth:!0,children:[e.jsx(k,{variant:"standard",htmlFor:"uncontrolled-native",children:"Sort"}),e.jsxs(L,{defaultValue:d,inputProps:{name:"sort",id:"uncontrolled-native"},onChange:s=>f(s.target.value),children:[e.jsx("option",{value:"RECENTLTY_CREATED",children:"Recently Created"}),e.jsx("option",{value:"OLDEST_POST",children:"Oldest Posts"}),e.jsx("option",{value:"REPORTS",children:"Reports"}),e.jsx("option",{value:"LIKES",children:"Likes"}),e.jsx("option",{value:"LOWEST_LIKES",children:"Lowest Likes"})]})]})}),e.jsx("div",{className:"search",children:e.jsx("input",{type:"text",placeholder:"Search account",className:"rounded-md text-black"})})]}),e.jsxs(t,{hoverable:!0,children:[e.jsxs(t.Head,{children:[e.jsx(t.HeadCell,{children:"Si. No"}),e.jsx(t.HeadCell,{children:"content"}),e.jsx(t.HeadCell,{children:"username"}),e.jsx(t.HeadCell,{children:"likes"}),e.jsx(t.HeadCell,{}),e.jsx(t.HeadCell,{children:"Reports"}),e.jsx(t.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"Block"})})]}),e.jsx(t.Body,{className:"divide-y",children:x==null?void 0:x.map((s,a)=>e.jsxs(t.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800",children:[e.jsx(t.Cell,{className:"whitespace-nowrap font-medium text-gray-900 dark:text-white",children:a}),e.jsx(t.Cell,{children:e.jsx("a",{href:s.content,target:"_blank",children:s.content})}),e.jsx(t.Cell,{children:s.user_details.username}),e.jsx(t.Cell,{children:s.likes.length}),e.jsx(t.Cell,{children:e.jsx("button",{onClick:()=>{_(s._id),u(!0)},children:"View"})}),e.jsx(t.Cell,{children:s.reports.length}),e.jsx(t.Cell,{children:s.is_delete?e.jsx("button",{onClick:()=>S(s._id),children:"Undo"}):e.jsx("button",{onClick:()=>w(s._id),className:"text-red-600",children:"Delete"})})]},a))})]}),e.jsx("div",{className:"pagination",children:e.jsx(E,{currentPage:h,totalPages:Math.ceil(i.total_posts/10),onPageChange:s=>y(s)})})]})]}),e.jsx(R,{reportedId:C,openModal:v,setOpenModal:u})]})})}export{V as default};