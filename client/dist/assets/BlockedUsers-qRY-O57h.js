import{r as o,i as n,j as r}from"./index-OvvBBrK8.js";import{M as u}from"./ManageAccSidebar-ehU37naq.js";import{a as f}from"./index.esm-gPM3QNgQ.js";import{u as p}from"./usehandleError-Nph0rm8m.js";import{B as l}from"./Toast-dnH8qWjo.js";import"./index.esm-DHFw0uN6.js";import"./Menu-PrdCgJob.js";function w(){const[a,c]=o.useState([]),i=p();o.useEffect(()=>{(async()=>{try{const e=await n.get("/manage-account/blocked-users",{withCredentials:!0});e.data&&c(e.data.userList)}catch(e){const s=e;s&&i(s)}})()},[]);async function m(e){try{(await n.get(`/users/unblock-user/${e}`,{withCredentials:!0})).data&&c(t=>t.filter(d=>d.user_id!==e))}catch(s){const t=s;t&&i(t)}}return r.jsxs("div",{className:"flex flex-col",children:[r.jsx(u,{}),r.jsxs("section",{className:"blocked-users p-5 m-0 sm:ms-64",children:[r.jsx(l,{"aria-label":"Default breadcrumb example",children:r.jsx(l.Item,{href:"#",icon:f,children:"Blocked Users"})}),r.jsx("div",{className:"user-list mt-5 flex flex-wrap gap-5",children:a&&a.map(e=>r.jsxs("div",{className:"user-card rounded-md shadow-md  w-40 p-2 flex flex-col items-center justify-center bg-gray-900",children:[r.jsx("img",{src:e.profile_img,alt:"",className:"rounded-md mb-2"}),r.jsx("h1",{children:e.username}),r.jsx("button",{className:"mt-5 mb-2 bg-primary hover:bg-primary-hover px-3 py-1 rounded-md text-white",onClick:()=>m(e.user_id),children:"Unblock"})]}))})]})]})}export{w as default};