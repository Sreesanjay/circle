import{u as y,m as N,a as g,r as i,i as E,Q as C,v,j as e,L as _,w as D,x as k,y as R,z as I,B as M,F as O,G as T}from"./index-tALA5zrJ.js";import{d as U}from"./Menu-NSL3OEsB.js";import{M as j}from"./Toast-R09rX9KI.js";import{D as Y}from"./DiscussionCard-UZdn9t2J.js";import"./index.esm-gWB3LAAE.js";import"./Report-xLLjgZIq.js";function F({showModal:t,setShowModal:a}){const{isLoading:c,isSuccess:l,isError:s,errorMessage:n}=y(x=>x.community),m=N(),r=g(),[d,p]=i.useState([]),[u,f]=i.useState({community_name:"",topic:null,privacy:"public",about:""});i.useEffect(()=>{(async()=>{var x;try{const h=await E.get("/manage-account/interest");h.data&&p(h.data.interest)}catch(h){const b=h;C.error((x=b.response)==null?void 0:x.data.message)}})()},[]);function o(x){const{name:h,value:b}=x.target;f({...u,[h]:b})}i.useEffect(()=>{s&&C.error(n),l&&a(!1),(s||l)&&r(v())},[s,l,r,n,m,a]);function S(){u.community_name&&u.topic&&r(D(u))}return e.jsx(e.Fragment,{children:c?e.jsx(_,{}):e.jsxs(j,{show:t,size:"2xl",onClose:()=>{a(!1)},popup:!0,children:[e.jsx(j.Header,{children:e.jsx("div",{className:"p-4",children:"New Community"})}),e.jsxs(j.Body,{children:[e.jsxs("div",{className:"input-group flex flex-col",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Community Name"}),e.jsx("input",{type:"text",name:"community_name",id:"",className:"rounded-md",onChange:o})]}),e.jsxs("div",{className:"flex gap-3 w-full justify-between",children:[e.jsxs("div",{className:"input-group flex flex-col mt-5 w-full",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Choose a Topic"}),e.jsx("select",{name:"topic",id:"",className:"rounded-md",onChange:o,children:d.map((x,h)=>e.jsx("option",{value:x._id,children:x.interest},h))})]}),e.jsxs("div",{className:"input-group flex flex-col mt-5 mb-5 w-full",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Privacy"}),e.jsxs("select",{name:"privacy",id:"",className:"rounded-md",onChange:o,children:[e.jsx("option",{value:"public",children:"Public"}),e.jsx("option",{value:"private",children:"Private"})]})]})]}),e.jsxs("div",{className:"input-group flex flex-col mt-5",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"About"}),e.jsx("textarea",{name:"about",id:"",className:"rounded-md"})]}),e.jsxs("div",{className:"btn py-5",children:[e.jsx("button",{className:"btn px-5 py-1 bg-red-700 hover:bg-red-500 rounded-md text-white",onClick:()=>{f({community_name:"",topic:null,privacy:"public",about:""})},children:"Clear"}),e.jsx("button",{className:"btn px-5 py-1 bg-primary hover:bg-primary-hover ms-3 rounded-md text-white",onClick:S,children:"Create"})]})]})]})})}function w({community:t,type:a}){var p;const c=N(),l=g(),{user:s}=y(u=>u.auth),[n,m]=i.useState([]),[r,d]=i.useState([]);return i.useEffect(()=>{var u,f;m((u=t.members)==null?void 0:u.filter(o=>o.status==="active").map(o=>o.user_id)),d((f=t.members)==null?void 0:f.filter(o=>o.status==="pending").map(o=>o.user_id))},[t.members]),e.jsxs("div",{className:"community-card  rounded-md w-72 h-min bg-gray-900 shadow-lg",children:[e.jsx("div",{className:"icon  w-full h-min",children:t.icon?e.jsx("img",{src:t.icon,alt:"",className:"w-full h-28 object-cover"}):e.jsx("div",{className:"icon-with-text h-full flex items-center justify-center bg-gray-700",children:e.jsx("h1",{className:"text-6xl w-full h-28 rounded-full  text-center flex justify-center items-center",children:typeof(t==null?void 0:t.community_name)=="string"&&((p=t.community_name[0])==null?void 0:p.toUpperCase())})})}),e.jsxs("div",{className:"body bg-gray-900 py-3 px-2 h-44 flex flex-col justify-between",children:[e.jsx("h1",{className:"title text-wrap text-lg font-medium text-center",children:t.community_name}),e.jsx("div",{className:"stat",children:e.jsxs("h1",{className:"text-center",children:[n==null?void 0:n.length," Members"]})}),a==="my_community"||n.includes(s==null?void 0:s._id)?e.jsx("button",{className:"view-community w-full py-2 rounded-md bg-primary hover:bg-primary",onClick:()=>c(`/community/view/${t._id}`),children:"View"}):r.includes(s==null?void 0:s._id)?e.jsx("button",{className:"view-community w-full py-2 rounded-md bg-primary",children:"Pending"}):e.jsx("button",{className:"view-community w-full py-2 rounded-md bg-primary hover:bg-primary",onClick:()=>l(k(t._id)),children:"Join"})]})]})}function $(){const t=g(),{myCommunity:a,isSuccess:c,isError:l}=y(s=>s.community);return i.useEffect(()=>{t(R())},[t]),i.useEffect(()=>{t(v())},[c,l,t]),e.jsx("section",{className:"your-community flex p-5 flex-wrap gap-5 justify-evenly bg-gray-800 min-h-full",children:a.map((s,n)=>e.jsx(w,{community:s,type:"my_community"},n))})}function P(){const t=g(),{community:a,isSuccess:c,isError:l}=y(n=>n.community),{user:s}=y(n=>n.auth);return i.useEffect(()=>{t(I())},[t]),i.useEffect(()=>{t(v())},[c,l,t]),e.jsx("section",{className:"your-community flex sm:p-5 flex-wrap gap-5 justify-evenly bg-gray-800 min-h-full",children:a.map((n,m)=>{if(!n.members.filter(d=>d.status==="active").map(d=>d.user_id).includes(s==null?void 0:s._id))return e.jsx(w,{community:n,type:"discover"},m)})})}function A(){const[t,a]=i.useState([]),c=i.useRef(null);i.useEffect(()=>{l()},[]);async function l(){let s=null;s=t.length>0?t[t.length-1].createdAt:null;const n=await M(s);n.discussions&&a(s===null?n.discussions:[...t,...n.discussions])}return i.useEffect(()=>{const s=()=>{const{current:m}=c;if(m){const{scrollTop:r,scrollHeight:d,clientHeight:p}=m;r+p>=d-1&&l()}},n=c.current;return n&&n.addEventListener("scroll",s),()=>{n&&n.removeEventListener("scroll",s)}},[t]),e.jsx("div",{className:" p-5 sm:p-10 bg-gray-800 h-full overflow-y-scroll",ref:c,children:t.map((s,n)=>e.jsx(Y,{discussion:s,setDiscussion:a,type:"RECENT"},n))})}function J(){const{tab:t}=O(),a=N(),[c,l]=i.useState("hidden"),[s,n]=i.useState(t.toUpperCase()),[m,r]=i.useState(!1);return e.jsxs("div",{className:"grid grid-cols-12",children:[e.jsx(F,{showModal:m,setShowModal:r}),e.jsxs("div",{className:"flex gap-2 col-span-12",children:[e.jsx("button",{className:"p-2 sm:hidden  flex rounded-sm mb-3",onClick:()=>l(c==="block"?"hidden":"block"),children:e.jsx(U,{})}),e.jsx("h1",{className:`${c==="block"?"hidden":"block"} sm:hidden text-xl mt-2`,children:"Community"})]}),e.jsxs("section",{className:`sidebar col-span-12 sm:col-span-3  bg-gray-900 flex flex-col p-5 py-8 ${c} sm:block`,children:[e.jsx("h1",{className:"text-2xl mb-10",children:"Community"}),e.jsxs("div",{className:"nav flex flex-col gap-3",onClick:()=>l(c==="block"?"hidden":"block"),children:[e.jsx("div",{className:`item hover:bg-gray-800 ${s==="RECENT_DISCUSSIONS"&&"bg-gray-800"}  rounded-md p-5 py-3`,onClick:()=>{n("RECENT_DISCUSSIONS"),a("/community/recent_discussions")},children:e.jsx("h2",{className:"text-lg",children:"Recent Discussions"})}),e.jsx("div",{className:`item hover:bg-gray-800 ${s==="DISCOVER"&&"bg-gray-800"}  rounded-md p-5 py-3`,onClick:()=>{n("DISCOVER"),a("/community/discover")},children:e.jsx("h2",{className:"text-lg",children:"Discover"})}),e.jsx("div",{className:`item hover:bg-gray-800 ${s==="YOUR_COMMUNITY"&&"bg-gray-800"}  rounded-md p-5 py-3`,onClick:()=>{n("YOUR_COMMUNITY"),a("/community/your_community")},children:e.jsx("h2",{className:"text-lg",children:"Your Community"})})]}),e.jsx("div",{className:"new-community mt-7 px-5 py-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-md",children:e.jsxs("button",{className:"text-lg flex gap-3",onClick:()=>r(!0),children:[e.jsx("div",{className:"text-primary",children:e.jsx(T,{})}),"Community"]})})]}),e.jsx("section",{className:"page-body col-span-12 sm:col-span-9 bg-blue-700",children:s==="RECENT_DISCUSSIONS"?e.jsx(A,{}):s==="DISCOVER"?e.jsx(P,{}):s==="YOUR_COMMUNITY"?e.jsx($,{}):null})]})}export{J as default};