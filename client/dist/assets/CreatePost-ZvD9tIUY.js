import{a as A,u as N,m as H,r as a,i as O,Q as n,aj as C,j as e,L as V,ak as D}from"./index-HNWM3XXZ.js";import{B as y,b as M,F as W}from"./Toast-YAWujjSQ.js";import{b as _}from"./index.esm-DQmzv7Q0.js";import{H as Q}from"./HomeSidebar-8UZ_x72W.js";import{u as T}from"./usehandleError-hR0czRqK.js";import{I as q}from"./ImageCrop-ztmllVPL.js";import{B as z}from"./Badge-hv67m0pK.js";import"./index.esm-EAmMpK27.js";import"./index.esm-XEDylsE1.js";import"./Menu-q_J-cn-4.js";import"./index.esm-CPPNc4xu.js";function re(){const i=A(),{isLoading:I,isSuccess:c,isError:d,errorMessage:m}=N(s=>s.post),p=H(),[l,u]=a.useState([]),S=T(),{userProfile:w}=N(s=>s.user),[f,x]=a.useState([]),[E,F]=a.useState(""),[r,h]=a.useState(),[g,L]=a.useState("public"),[P,j]=a.useState(""),[R,b]=a.useState(!1);a.useEffect(()=>{(async()=>{try{const s=await O.get("/manage-account/interest",{withCredentials:!0});s.data&&(u(s.data.interest),u(s.data.interest))}catch(s){const t=s;t&&S(t)}})()},[w]);function U(s){if(s.target.files){if(s.target.files[0].type.startsWith("image/"))j(URL.createObjectURL(s.target.files[0])),b(!0);else if(s.target.files[0].type.startsWith("video/")){const t=new Blob([s.target.files[0]],{type:s.target.files[0].type});h(t)}}}a.useEffect(()=>{j("")},[r]);function B(){r?i(D({content:r,visibility:g,caption:E,tags:f})):n("error")}return a.useEffect(()=>{c&&(n("New post created"),i(C()),p("/")),d&&(n.error(m),i(C()))},[c,d,m,i,p]),e.jsx(e.Fragment,{children:I?e.jsx(V,{}):e.jsxs(e.Fragment,{children:[e.jsx(q,{src:P,aspect:1/1,isCrop:R,setisCrop:b,setImage:h}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(Q,{}),e.jsxs("section",{className:"create-post md:ms-80 p-5",children:[e.jsx(y,{"aria-label":"Default breadcrumb example",children:e.jsx(y.Item,{icon:_,children:"Create Post"})}),e.jsx("h1",{className:"text-2xl font-medium mb-5",children:"Create new Post"}),e.jsxs("div",{className:"body grid grid-cols-4 ",children:[e.jsxs("div",{className:"preview-section col-span-4 lg:col-span-2",children:[e.jsxs("div",{className:"mb-2 block pe-10 text-white",children:[e.jsx(M,{htmlFor:"file-upload",value:"Upload file"}),e.jsx(W,{id:"file-upload",className:"h-24 ",onChange:U})]}),e.jsx("img",{src:r?URL.createObjectURL(r):void 0,alt:""})]}),e.jsx("div",{className:"form-section col-span-4 lg:col-span-2",children:e.jsxs("div",{className:"form",children:[e.jsxs("div",{className:"form-control flex flex-col lg:pe-16 mb-4",children:[e.jsx("label",{htmlFor:"",children:"Add Caption"}),e.jsx("textarea",{className:"rounded-md bg-gray-800",onChange:s=>F(s.target.value)})]}),e.jsxs("div",{className:"form-control flex flex-col lg:pe-16 mb-3",children:[e.jsx("label",{htmlFor:"",children:"Visibility"}),e.jsx("select",{name:"",id:"",className:"rounded-md bg-gray-800",defaultValue:g,onChange:s=>L(s.target.value),children:e.jsx("option",{value:"public",children:"Public"})})]}),e.jsxs("div",{className:"form-control flex flex-col lg:pe-16",children:[e.jsx("label",{htmlFor:"",children:"Tags"}),e.jsx("div",{className:"selected-tags flex gap-5 my-5 flex-wrap",children:f.map((s,t)=>{const v=l.find(o=>o._id===s);return e.jsx(z,{badgeContent:e.jsx("button",{onClick:()=>x(o=>o.filter(k=>k!==s)),children:"-"}),color:"success",children:v&&v.interest},t)})}),e.jsxs("select",{name:"",id:"",className:"rounded-md bg-gray-800",onChange:s=>x(t=>[...t,s.target.value]),children:[e.jsx("option",{value:""}),l&&l.map((s,t)=>e.jsx("option",{value:s._id,children:s.interest},t))]})]}),e.jsx("div",{className:"form-buttons",children:e.jsx("button",{className:"bg-primary hover:bg-primary-hover px-5 py-1 rounded-md text-white mt-5",onClick:B,children:"Upload"})})]})})]})]})]})]})})}export{re as default};
