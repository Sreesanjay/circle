import{r as i,j as e,i as u,Q as c}from"./index-APfY0OkE.js";import{M as s}from"./Toast-UWSLTCrg.js";function b({openModal:h,setOpenModal:t,id:d,reported_type:m}){const[a,o]=i.useState(""),[n,l]=i.useState("");async function x(){if(a.length===0)l("reason should not be empty");else if(o.length>20)l("reason should be less than 20 characters");else try{const r=await u.post("/users/report",{id:d,reason:a,reported_type:m},{withCredentials:!0});r.data&&(t(!1),c(r.data.message))}catch(r){const p=r;c.error(p.message)}}return e.jsxs(s,{show:h,size:"xl",onClose:()=>t(!1),children:[e.jsx(s.Header,{children:"Report"}),e.jsxs(s.Body,{children:[e.jsx("label",{htmlFor:"",children:"Whats the reason?"}),e.jsx("br",{}),n&&e.jsx("span",{className:"text-red-600",children:n}),e.jsx("textarea",{className:"w-full h-32 rounded-md",onChange:r=>o(r.target.value)})]}),e.jsx(s.Footer,{children:e.jsx("button",{className:"bg-primary hover:bg-primary-hover px-5 py-1 rounded-md",onClick:()=>x(),children:"Report"})})]})}export{b as R};