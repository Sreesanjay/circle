import{r as n,i as o,j as e}from"./index-LdwlfRLT.js";import{M as u}from"./ManageAccSidebar-uiqRrZUs.js";import{a as f}from"./index.esm-LoUFC4g4.js";import{u as x}from"./usehandleError-BlJHFfAW.js";import{B as l}from"./Toast-b9fehy-Y.js";import"./index.esm-8nu0HV-1.js";import"./Menu-qaUbVihn.js";function w(){const[a,c]=n.useState([]),i=x();n.useEffect(()=>{(async()=>{try{const s=await o.get("/manage-account/blocked-users",{withCredentials:!0});s.data&&c(s.data.userList)}catch(s){const r=s;r&&i(r)}})()},[]);async function m(s){try{(await o.get(`/users/unblock-user/${s}`,{withCredentials:!0})).data&&c(t=>t.filter(d=>d.user_id!==s))}catch(r){const t=r;t&&i(t)}}return e.jsxs("div",{className:"flex flex-col",children:[e.jsx(u,{}),e.jsxs("section",{className:"blocked-users p-5 m-0 sm:ms-64",children:[e.jsx(l,{"aria-label":"Default breadcrumb example",children:e.jsx(l.Item,{href:"#",icon:f,children:"Blocked Users"})}),a.length===0?e.jsxs("div",{className:"w-full h-96 flex flex-col justify-center items-center",children:[e.jsx("img",{src:"https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png",alt:"",className:"w-36"}),e.jsx("h1",{className:"text-gray-400",children:"No blocked users"})]}):e.jsx("div",{className:"user-list mt-5 flex flex-wrap gap-5",children:a&&a.map(s=>e.jsxs("div",{className:"user-card rounded-md shadow-md  w-40 p-2 flex flex-col items-center justify-center bg-gray-900",children:[e.jsx("img",{src:s.profile_img,alt:"",className:"rounded-md mb-2"}),e.jsx("h1",{children:s.username}),e.jsx("button",{className:"mt-5 mb-2 bg-primary hover:bg-primary-hover px-3 py-1 rounded-md text-white",onClick:()=>m(s.user_id),children:"Unblock"})]}))})]})]})}export{w as default};
