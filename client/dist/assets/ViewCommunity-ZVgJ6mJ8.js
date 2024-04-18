import{H as O,u as M,m as U,a as H,r as a,I as T,i as P,Q as R,v as A,j as e,L as B,J as Z,K as $,f as V,P as G,h as Y,M as J,G as W,N as K,O as L,F as Q,S as X,U as ee,y as se,V as ae,W as te}from"./index-m-eWRAVj.js";import{F as ie}from"./index.esm-5AkatTaU.js";import{F as le}from"./index.esm-mYd38-lK.js";import{I as ne}from"./index.esm-1llS7C12.js";import{R as re}from"./Report-vUX28oJA.js";import{M as _}from"./Toast-KVdhVArs.js";import{I as ce}from"./ImageCrop-WxXaXkfb.js";import{P as oe}from"./PopupModal-pXmYe3SX.js";import{D as de}from"./DiscussionCard-AUVZG6p6.js";function xe(b){return O({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11V13H9V11H7ZM7 14V16H9V14H7ZM7 17V19H9V17H7Z"}}]})(b)}function ue({showModal:b,setShowModal:o,community:s,setCommunity:v}){const{isLoading:r,isSuccess:d,isError:p,errorMessage:h}=M(c=>c.community),n=U(),m=H(),[x,w]=a.useState([]),[f,u]=a.useState(!1),[N,y]=a.useState({community_name:"",topic:"",privacy:"public",about:""}),[i,D]=a.useState(),[k,S]=a.useState(""),[F,I]=a.useState("");a.useEffect(()=>{i&&(async()=>{const c=new File([i],"icon",{type:i.type}),g=await T(c);I(g)})()},[i]),a.useEffect(()=>{s&&y({community_name:s==null?void 0:s.community_name,topic:s==null?void 0:s.topic,privacy:s==null?void 0:s.privacy,about:s==null?void 0:s.about})},[s]),a.useEffect(()=>{(async()=>{var c;try{const g=await P.get("/manage-account/interest");g.data&&w(g.data.interest)}catch(g){const t=g;R.error((c=t.response)==null?void 0:c.data.message)}})()},[]);function E(c){const{name:g,value:t}=c.target;y({...N,[g]:t})}a.useEffect(()=>{p&&R.error(h),d&&o(!1),(p||d)&&m(A())},[p,d,m,h,n,o]);function l(c){c.target.files&&(S(URL.createObjectURL(c.target.files[0])),u(!0))}async function j(){if(N.community_name&&N.topic&&s){const c=await m(Z({formData:{...N,icon:F},id:s._id}));c.payload.community&&(v({...s,community_name:c.payload.community.community_name,topic:c.payload.community.topic,about:c.payload.community.about,privacy:c.payload.community.privacy,icon:c.payload.community.icon}),o(!1))}}return e.jsxs(e.Fragment,{children:[r?e.jsx(B,{}):e.jsxs(_,{show:b,size:"2xl",onClose:()=>{o(!1)},popup:!0,children:[e.jsx(_.Header,{children:e.jsx("div",{className:"p-4",children:"New Community"})}),e.jsxs(_.Body,{children:[e.jsxs("div",{className:"icon flex flex-col",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Choose icon"}),e.jsx("input",{type:"file",className:"rounded-md",onChange:l})]}),e.jsxs("div",{className:"input-group flex flex-col mt-4",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Community Name"}),e.jsx("input",{type:"text",name:"community_name",id:"",value:N.community_name,className:"rounded-md",onChange:E})]}),e.jsxs("div",{className:"flex gap-3 w-full justify-between",children:[e.jsxs("div",{className:"input-group flex flex-col mt-5 w-full",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Choose a Topic"}),e.jsx("select",{name:"topic",id:"",className:"rounded-md",onChange:E,value:N.topic,children:x.map((c,g)=>e.jsx("option",{value:c._id,children:c.interest},g))})]}),e.jsxs("div",{className:"input-group flex flex-col mt-5 mb-5 w-full",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"Privacy"}),e.jsxs("select",{name:"privacy",id:"",className:"rounded-md",onChange:E,value:N.privacy,children:[e.jsx("option",{value:"public",children:"Public"}),e.jsx("option",{value:"private",children:"Private"})]})]})]}),e.jsxs("div",{className:"input-group flex flex-col mt-5",children:[e.jsx("label",{htmlFor:"",className:"font-medium",children:"About"}),e.jsx("textarea",{name:"about",id:"",className:"rounded-md",value:N.about,onChange:E})]}),e.jsxs("div",{className:"btn py-5",children:[e.jsx("button",{className:"btn px-5 py-1 bg-red-700 hover:bg-red-500 rounded-md text-white",onClick:()=>{s&&y({community_name:s==null?void 0:s.community_name,topic:s.topic,privacy:s.privacy,about:s.about})},children:"Clear"}),e.jsx("button",{className:"btn px-5 py-1 bg-primary hover:bg-primary-hover ms-3 rounded-md text-white",onClick:j,children:"Update"})]})]})]}),e.jsx(ce,{src:k,aspect:1/1,isCrop:f,setisCrop:u,setImage:D})]})}function pe({openDrawer:b,setOpenDrawer:o,community:s,setCommunity:v,setUser:r}){const d=U(),[p,h]=a.useState([]),[n,m]=a.useState(""),[x,w]=a.useState(!1),[f,u]=a.useState(!1),[N,y]=a.useState(!1),{user:i}=M(l=>l.auth),[D,k]=a.useState(!1);a.useEffect(()=>{(async()=>{const l=s==null?void 0:s.members.filter(j=>j.status==="active").map(j=>j.user_id);if(l){const j=await $(l);j.members&&h(j.members)}})()},[s]),a.useEffect(()=>{s&&s.members.map(l=>(l.is_admin&&m(l.user_id),l))},[s]),a.useEffect(()=>{s&&i&&s.members.map(l=>(l.user_id===(i==null?void 0:i._id)&&w(!0),l))},[s,i]);async function S(l){const j={user_id:l,community_id:s==null?void 0:s._id};(await J(j)).member&&s&&(s.members=s==null?void 0:s.members.filter(g=>g.user_id!==l),v(s),h(g=>g.filter(t=>t.user_id!==l)),l===(i==null?void 0:i._id)&&(r(null),w(!1),s.privacy==="private"&&d("/community/recent_discussions")))}async function F(){(await P.put(`/community/remove/${s==null?void 0:s._id}`)).data&&(o(!1),R.success("community deleted"),d("/community/recent_discussions"))}function I(){k(!0)}function E(){k(!1)}return e.jsxs("div",{children:[e.jsx(oe,{modalState:D,message:"Are you sure you want to delete this community?",posText:"Delete",negText:"No",successCallback:F,cancelCallback:E}),e.jsxs(V,{anchor:"right",open:b,onClose:()=>o(!1),children:[e.jsx("div",{className:"btn text-3xl px-10 py-3 bg-gray-700 sm:hidden",onClick:()=>o(!1),children:e.jsx(ne,{})}),e.jsxs("div",{className:"container bg-gray-900 w-96 h-screen p-5 flex flex-col items-center",children:[e.jsx("div",{className:"icon h-28 w-28 bg-gray-700 rounded-full flex items-center justify-center relative",children:s!=null&&s.icon?e.jsx("img",{src:s.icon,alt:""}):e.jsx("h1",{className:"text-5xl text-white",children:s==null?void 0:s.community_name[0].toUpperCase()})}),e.jsx("h1",{className:"text-2xl text-white mt-5",children:s==null?void 0:s.community_name}),x&&e.jsxs("div",{className:"exit-report-btn py-3",children:[e.jsx("button",{className:"btn px-5 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md",onClick:()=>S(i==null?void 0:i._id),children:"Exit"}),(i==null?void 0:i._id)!==n?e.jsx("button",{className:"btn px-5 py-1 ms-3 bg-primary hover:bg-primary-hover text-white rounded-md",onClick:()=>{u(!0),o(!1)},children:"Report"}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn px-5 py-1 ms-3 bg-primary hover:bg-primary-hover text-white rounded-md",onClick:()=>{y(!0),o(!1)},children:"Edit"}),e.jsx("button",{className:"btn px-5 py-1 ms-3 bg-primary hover:bg-primary-hover text-white rounded-md",onClick:I,children:"Delete"})]})]}),e.jsxs("div",{className:"drawer-body w-full p-5 text-white pt-10",children:[e.jsx("h1",{className:"text-xl mb-5",children:"Members"}),e.jsx("div",{className:"members max-h-96 overflow-y-scroll",children:p&&p.map((l,j)=>e.jsxs("div",{className:"user-card mb-4 bg-gray-800 p-2 rounded-md flex justify-between items-center",children:[e.jsxs("div",{className:"profile flex gap-3",children:[l.profile_img?e.jsx("img",{src:l.profile_img,alt:"",className:"w-10 h-10"}):e.jsx(G,{email:l.email,size:"small"}),e.jsxs("div",{className:"name flex items-center",children:[e.jsx("h1",{className:"text-lg",children:l.username}),l.user_id===(i==null?void 0:i._id)&&e.jsx("p",{className:"",children:"(You)"})]})]}),e.jsx("div",{className:"actions",children:l.user_id===n?e.jsx("p",{className:"text-sm",children:"Admin"}):(i==null?void 0:i._id)===n&&e.jsx("div",{className:"remove",onClick:()=>S(l.user_id),children:e.jsx(Y,{size:25})})})]},j))})]})]})]}),s&&e.jsxs(e.Fragment,{children:[e.jsx(re,{openModal:f,setOpenModal:u,id:s._id,reported_type:"community"}),e.jsx(ue,{showModal:N,setShowModal:y,community:s,setCommunity:v})]})]})}function me({openDrawer:b,setOpenDrawer:o,community:s,setCommunity:v}){const r=H(),[d,p]=a.useState([]);a.useEffect(()=>{s&&(async()=>{var n;try{const m=await P.get(`/community/pending-request/${s._id}`);m.data.userList&&p(m.data.userList)}catch(m){const x=m;R.error((n=x.response)==null?void 0:n.data.message)}})()},[s]);async function h(n){s&&(await r(K({id:s._id,user_id:n}))).payload.member&&(p(x=>x.filter(w=>w.user_id!==n)),s&&v({...s,members:s.members.map(x=>(x.user_id===n&&(x.status="active"),x))}))}return e.jsx("div",{children:e.jsx(V,{anchor:"right",open:b,onClose:()=>o(!1),children:e.jsxs("div",{className:"container bg-gray-900 w-96 h-screen p-5 flex flex-col",children:[e.jsx("h1",{className:"text-xl text-white font-medium",children:"New Requests"}),d&&d.map(n=>e.jsxs("div",{className:"member-request-card w-full flex justify-between bg-gray-800 p-2 rounded-md",children:[e.jsxs("div",{className:"flex gap-3",children:[n.userProfile.profile_img?e.jsx("img",{src:n.userProfile.profile_img,alt:"",className:"w-10 h-10 rounded-full"}):e.jsx("div",{className:"w-10 h-10 bg-gray-900 rounded-full",children:e.jsx("h1",{children:n.userProfile.email[0]})}),e.jsx("h1",{className:"text-2xl text-slate-400",children:n.userProfile.username})]}),e.jsx("div",{className:"add-btn text-4xl text-white cursor-pointer",onClick:()=>h(n.user_id),children:e.jsx(W,{})})]}))]})})})}function he({openModal:b,setOpenModal:o,community:s,setDiscussion:v}){const{user:r}=M(n=>n.auth),[d,p]=a.useState("");async function h(){if(d&&r&&s){const n={user_id:r==null?void 0:r._id,community_id:s==null?void 0:s._id,content:d,content_type:"TEXT"},m=await L(n);m.discussion&&(R.success("new discussion added"),v(x=>[m.discussion,...x]),p(""),o(!1))}}return e.jsx(_,{show:b,size:"xl",onClose:()=>o(!1),popup:!0,children:e.jsxs(_.Body,{className:"bg-gray-800 border text-white",children:[e.jsx(_.Header,{}),e.jsx("h1",{className:"text-xl font-medium",children:"New Discussion"}),e.jsx("textarea",{name:"content",id:"",cols:60,rows:5,className:"rounded-md bg-gray-700 my-5 text-sm",onChange:n=>p(n.target.value),value:d}),e.jsxs("div",{className:"btn-group flex gap-3",children:[e.jsx("button",{className:"btn px-3 py-1 bg-red-600 hover:bg-red-800 rounded-md",onClick:()=>p(""),children:"Clear"}),e.jsx("button",{className:"btn px-3 py-1 bg-primary hover:bg-primary-hover rounded-md",onClick:()=>h(),children:"Submit"})]})]})})}function fe({showUploadImage:b,setshowUploadImage:o,community:s,setDiscussion:v}){const[r,d]=a.useState(null),[p,h]=a.useState(null),[n,m]=a.useState(""),{user:x}=M(u=>u.auth);a.useEffect(()=>{r&&h(URL.createObjectURL(r))},[r]);function w(){d(null),h(null),o(!1)}async function f(){if(r&&x&&s){const u=r.type.includes("image")?"IMAGE":"VIDEO",N={user_id:x==null?void 0:x._id,community_id:s,content:r,caption:n,content_type:"MEDIA",file_type:u},y=await L(N);y.discussion&&(R.success("new discussion added"),v(i=>[y.discussion,...i]),d(null),h(null),o(!1))}}return e.jsx(e.Fragment,{children:e.jsx(_,{show:b,size:"lg",onClose:w,popup:!0,children:e.jsxs(_.Body,{className:"bg-gray-900 border rounded-md",children:[e.jsx(_.Header,{}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-xl font-medium text-white",children:"Upload a image or video"}),e.jsxs("div",{children:[e.jsx("div",{className:"preview p-5",children:p&&(r!=null&&r.type.includes("image")?e.jsx("img",{src:p,alt:"",className:"h-56"}):e.jsx("video",{src:p,className:"h-56",autoPlay:!0}))}),e.jsx("input",{type:"file",name:"media",className:"bg-gray-700 w-full rounded-md",onChange:u=>{u.target.files&&d(u.target.files[0])}}),e.jsxs("div",{className:"grp my-5",children:[e.jsx("label",{htmlFor:"",className:"text-white",children:"Caption"}),e.jsx("textarea",{className:"w-full  bg-gray-700 rounded-md my-2 text-white",onChange:u=>m(u.target.value)})]}),e.jsxs("div",{className:"btn-group",children:[e.jsx("button",{className:"clear bg-red-600 px-4 py-2 rounded-md text-white",onClick:()=>{d(null),h(null)},children:"Clear"}),e.jsx("button",{className:"clear ms-3 bg-primary px-4 py-2 rounded-md text-white",onClick:f,children:"Submit"})]})]})]})]})})})}function Ee(){const b=U(),o=H(),[s,v]=a.useState(null),{user:r}=M(t=>t.auth),{id:d}=Q(),[p,h]=a.useState(!1),[n,m]=a.useState(!1),[x,w]=a.useState(!1),[f,u]=a.useState([]),[N,y]=a.useState(!1),[i,D]=a.useState("hidden"),k=a.useRef(null),[S,F]=a.useState({total_members:0,total_discussion:0,discussions_today:0}),{myCommunity:I,isSuccess:E,isError:l}=M(t=>t.community),[j,c]=a.useState(null);a.useEffect(()=>{s&&(async()=>{const t=await X(s._id);t.analytics&&F(t.analytics)})()},[s]);async function g(){if(s){let t=null;f.length&&s._id===f[0].community_id&&(t=f.length>0?f[f.length-1].createdAt:null);const C=await te(s._id,t);C.discussions&&u(t===null?C.discussions:[...f,...C.discussions])}}return a.useEffect(()=>{s&&g()},[s]),a.useEffect(()=>{if(s&&r){const t=s.members.filter(C=>C.user_id===(r==null?void 0:r._id));c(t[0])}},[s,r]),a.useEffect(()=>{d&&(async()=>{const t=await ee(d);v(t.community)})()},[d]),a.useEffect(()=>{o(se())},[o]),a.useEffect(()=>{o(A())},[E,l,o]),a.useEffect(()=>{const t=()=>{const C=document.body.clientHeight,q=window.scrollY,z=window.innerHeight;C-(q+z)<1&&g()};return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}},[o,f]),e.jsxs("section",{className:"view-community grid grid-cols-12 relative",children:[e.jsx("section",{className:`col-span-12 ${i} sm:block sm:col-span-5 md:col-span-5 lg:col-span-3 z-20`,onClick:()=>D("hidden"),children:e.jsxs("div",{className:"left-side-bar fixed overflow-y-scroll bg-gray-900 w-full sm:w-auto 2xl:w-96  pt-5 px-3",children:[e.jsx("h1",{className:"mb-8 text-2xl",children:"Community"}),e.jsx("div",{className:"discover-community w-full bg-gray-800 py-3 rounded-md hover:bg-gray-700 cursor-pointer",onClick:()=>b("/community/discover"),children:e.jsx("h1",{className:"text-center",children:"Discover Communities"})}),e.jsx("h1",{className:"your-community text-lg my-5",children:"Your Communities"}),I&&I.map((t,C)=>e.jsxs("div",{className:`community-choose-card mb-3 flex gap-3 overflow-hidden items-center ${t._id!==d?"bg-gray-800":"bg-gray-700"} hover:bg-gray-700 p-1 px-2 rounded-md cursor-pointer`,onClick:()=>{b(`/community/view/${t._id}`)},children:[e.jsx("div",{className:"icon w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg relative",children:t!=null&&t.icon?e.jsx("img",{src:t.icon,alt:""}):e.jsx("h1",{className:"text-xl",children:t==null?void 0:t.community_name[0].toUpperCase()})}),e.jsx("div",{className:"deatils",children:e.jsx("h1",{className:"text-lg",children:t.community_name})})]},C))]})}),e.jsxs("section",{className:"body col-span-12 sm:col-span-7 md:col-span-7 lg:col-span-9",children:[e.jsxs("header",{className:"header flex justify-between shadow-lg p-2 px-5",children:[e.jsxs("div",{className:"profile flex gap-3",children:[e.jsxs("div",{className:"icon h-16 w-28  rounded-md flex items-center justify-center relative",children:[s!=null&&s.icon?e.jsx("img",{src:s.icon,alt:"",className:"h-14 w-14 rounded-md"}):e.jsx("h1",{className:"text-2xl bg-gray-700 px-8 py-3 rounded-md",children:s==null?void 0:s.community_name[0].toUpperCase()}),e.jsx("button",{className:"sm:hidden cursor-pointer btn absolute z-20 w-full h-full",onClick:()=>D("block")})]}),e.jsx("h1",{className:"text-2xl",onClick:()=>h(!0),children:s==null?void 0:s.community_name})]}),j&&j.is_admin&&e.jsx("button",{className:"text-2xl",onClick:()=>m(!0),children:e.jsx(ie,{})})]}),e.jsxs("body",{className:"container grid grid-cols-12 p-5",children:[e.jsxs("section",{className:"discussion-section col-span-12 lg:col-span-8",children:[j?e.jsxs("div",{className:"new-discusssion flex items-center gap-3",children:[e.jsx("div",{className:"file-upload-button text-3xl text-primary ",onClick:()=>y(!0),children:e.jsx(le,{})}),e.jsx("input",{type:"hidden"}),e.jsx("button",{className:"new-text-discussion-input w-5/6 h-12 rounded bg-gray-700 flex justify-start items-center px-3 text-slate-500",onClick:()=>w(!0),children:"Write Something"}),e.jsx("div",{className:"send-icon",children:e.jsx(ae,{size:35})})]}):e.jsx("div",{className:"join-suggestion flex  bg-gray-900/25 text-gray-400 me-5 p-5",children:e.jsx("h1",{children:"Join this community to post discussions"})}),f.length!==0?e.jsx("div",{className:"discussions w-full flex flex-col items-center py-5 sm:p-5",ref:k,children:f==null?void 0:f.map((t,C)=>e.jsx(de,{discussion:t,setDiscussion:u,type:"DEFAULT"},C))}):e.jsxs("div",{className:"w-full h-1/2 flex justify-center items-center flex-col",children:[e.jsx("img",{src:"https://png.pngtree.com/svg/20161030/nodata_800056.png",className:"w-40",alt:""}),e.jsx("h1",{className:"text-gray-400",children:"No Discussions Yet"})]})]}),e.jsxs("div",{className:"right-section hidden lg:block sm:col-span-4 bg-gray-900 p-5 rounded-md",children:[e.jsx("h1",{className:"text-lg",children:"About"}),e.jsx("p",{className:"text-sm py-2 pb-5",children:s==null?void 0:s.about}),(s==null?void 0:s.privacy)==="public"?e.jsxs("div",{className:"",children:[e.jsx("h1",{className:"text-lg",children:"Public"}),e.jsx("p",{className:"text-sm py-2 pb-5",children:"Everyone can see discussions"})]}):e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex items-center gap-2 text-lg",children:[e.jsx(xe,{}),e.jsx("h1",{className:"text-lg",children:"Private"})]}),e.jsx("p",{className:"text-sm py-5",children:"Only the members of this community are allowed to see discussions"})]}),e.jsx("h1",{className:"text-lg",children:"Activity"}),e.jsx("div",{className:"analytics",children:e.jsxs("ul",{className:"flex flex-col gap-3 mt-5",children:[e.jsxs("li",{children:[S.discussions_today," ","Discussions today"]}),e.jsxs("li",{children:[S.total_discussion," Total discussions"," "]}),e.jsxs("li",{children:[S.total_members," members"]})]})})]})]})]}),e.jsx(pe,{openDrawer:p,setOpenDrawer:h,community:s,setCommunity:v,setUser:c}),e.jsx(me,{openDrawer:n,setOpenDrawer:m,community:s,setCommunity:v}),e.jsx(he,{openModal:x,setOpenModal:w,community:s,setDiscussion:u}),s&&e.jsx(fe,{showUploadImage:N,setshowUploadImage:y,community:s._id,setDiscussion:u})]})}export{Ee as default};