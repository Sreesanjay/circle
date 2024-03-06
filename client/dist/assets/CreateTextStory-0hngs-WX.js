import{m as C,a as w,r as o,u as p,ac as S,Q as f,j as e,ad as k}from"./index-HNWM3XXZ.js";import{B as a,a as E}from"./Toast-YAWujjSQ.js";import"./index.esm-EAmMpK27.js";function L(){const l=C(),c=w(),[t,j]=o.useState(""),[m,r]=o.useState("bg-slate-50"),[u,d]=o.useState("black"),[y,N]=o.useState("PUBLIC"),{userProfile:n}=p(s=>s.user),[x,i]=o.useState(""),{isSuccess:h,isError:b,errorMessage:g}=p(s=>s.story);function v(){i(""),t.length===0?i("story cannot be empty"):t.length>50?i("Story should be less than 50 characters"):c(k({story_type:"TEXT",content:t,visibility:y,background:m,color:u}))}return o.useEffect(()=>{c(S()),h&&(f("Success"),l("/")),b&&f.error(g)},[c,g,h,b,l]),e.jsxs("section",{className:"p-5 create-story",children:[e.jsxs(a,{"aria-label":"Default breadcrumb example",children:[e.jsx(a.Item,{onClick:()=>l("/"),icon:E,children:"Home"}),e.jsx(a.Item,{onClick:()=>l("/add-story"),children:"Add Story"}),e.jsx(a.Item,{children:"Create Story"})]}),e.jsxs("div",{className:"py-5 h-full grid grid-cols-12",children:[e.jsxs("section",{className:"form-area shadow-md p-5 col-span-12 md:col-span-4",children:[e.jsx("h1",{className:"text-xl font-medium mb-5",children:"Create Story"}),x&&e.jsx("span",{className:"text-red-600 text-sm",children:x}),e.jsx("textarea",{className:"w-full rounded-md h-32 bg-gray-800",onChange:s=>j(s.target.value)}),e.jsxs("div",{className:"flex flex-col my-3",children:[e.jsx("label",{htmlFor:"",children:"Visibility"}),e.jsxs("select",{name:"",id:"",className:"rounded-md bg-gray-800",onChange:s=>N(s.target.value),children:[e.jsx("option",{value:"PUBLIC",children:"Public"}),e.jsx("option",{value:"CLOSE_FRIENDS",children:"Close Friends"}),(n==null?void 0:n.account_type)==="PROFESSIONAL"&&e.jsx("option",{value:"SUBSCRIBER_ONLY",children:"Subscriber Only"})]})]}),e.jsxs("div",{className:"p-3 border mb-3 rounded-md",children:[e.jsx("h1",{className:"font-light mb-3",children:"Backgrounds"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500",onClick:()=>r("bg-gradient-to-r from-indigo-500 to-purple-500")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-500",onClick:()=>r("bg-gradient-to-r from-cyan-500 to-blue-500")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-gradient-to-r from-cyan-500 to-green-500",onClick:()=>r("bg-gradient-to-r from-cyan-500 to-green-500")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-slate-700",onClick:()=>r("bg-slate-700")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-yellow-500",onClick:()=>r("bg-yellow-500")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-slate-50",onClick:()=>r("bg-slate-50")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-cyan-500",onClick:()=>r("bg-cyan-500")})]})]}),e.jsxs("div",{className:"p-3 border mb-3 rounded-md",children:[e.jsx("h1",{className:"font-light mb-3",children:"Text Color"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-black",onClick:()=>d("black")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-white",onClick:()=>d("white")}),e.jsx("div",{className:"color rounded-full cursor-pointer border h-8 w-8 bg-red-500",onClick:()=>d("red-500")})]})]}),e.jsxs("div",{className:"sm:flex",children:[e.jsx("button",{className:"bg-red-500 py-2 px-3 rounded-md text-white max-w-56",onClick:()=>l("/add-story"),children:"Discard"}),e.jsx("button",{className:"bg-primary py-2 px-3 rounded-md text-white ms-3 max-w-56",onClick:()=>v(),children:"Add to story"})]})]}),e.jsx("section",{className:"preview col-span-12 md:col-span-8 flex justify-center",children:e.jsx("div",{className:`preview-story flex items-center justify-center w-2/5 h-full border rounded-md shadow-md ${m}`,children:e.jsx("h1",{className:`text-2xl text-${u}`,children:t})})})]})]})}export{L as default};
