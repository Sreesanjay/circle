import{a as _,u as y,r as t,bf as E,j as e,bg as U,m as C,i as b,Q as N,o as F,aO as O,a_ as z,L as R,E as S,aP as P,bh as T,bi as $,bj as M,be as I}from"./index-LdwlfRLT.js";import{P as D}from"./PopupModal-Kadx0_NO.js";import{M as v,F as A,f as B}from"./Toast-b9fehy-Y.js";import{I as V}from"./ImageCrop-0PrKhGe-.js";import{U as H}from"./ProfileUpload-Gv8EDRGF.js";import{u as q,S as G}from"./Skeleton-fic0kHLW.js";import"./index.esm-8nu0HV-1.js";import"./createBox-54ZdOs7e.js";import"./extendSxProp-1JFPkbRL.js";function Q({showUploadImage:a,setshowUploadImage:s}){const n=_(),{userProfile:l}=y(c=>c.user),[o,u]=t.useState(!1),[i,g]=t.useState(""),[d,p]=t.useState();t.useEffect(()=>{if(s(!1),d){const c=new File([d],"cover_img",{type:d.type});n(E(c))}},[d,n,s]);function x(){s(!1)}const f={width:"100%",height:"40px"},j={width:"100%",height:"40px",backgroundColor:"red"};function w(c){c.target.files&&(x(),g(URL.createObjectURL(c.target.files[0])),u(!0))}function r(){n(U()),x()}return e.jsxs(e.Fragment,{children:[e.jsx(V,{src:i,aspect:16/9,isCrop:o,setisCrop:u,setImage:p}),e.jsxs(v,{show:a,size:"md",onClose:x,popup:!0,children:[e.jsx(v.Header,{}),e.jsx(v.Body,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsx("h3",{className:"text-xl font-medium text-gray-900 dark:text-white",children:"Upload Cover Image"}),e.jsx("div",{children:e.jsx("div",{className:"mb-2",children:e.jsx(A,{id:"small-file-upload",sizing:"sm",style:f,onChange:w})})}),(l==null?void 0:l.cover_img)&&e.jsx("div",{className:"w-full",children:e.jsx(B,{style:j,onClick:r,children:"Delete"})})]})})]})]})}function Y(a,s=250){let n;return(...l)=>{clearTimeout(n),n=setTimeout(()=>{a(...l)},s)}}function J({openModal:a,setOpenModal:s,title:n}){const[l,o]=t.useState([]),u=C(),i=t.useRef(!1),[g,d]=t.useState(!1),p=t.useRef(0),x=q(()=>f("")),f=t.useCallback(async r=>{d(!0);const c=n==="Following"?`/users/following?search=${r}&page=${p.current}`:`/users/followers?search=${r}&page=${p.current}`;try{const m=await b.get(c,{withCredentials:!0});m.data&&(p.current=p.current+1,i.current?(i.current=!1,o(m.data.userList)):o(h=>[...h,...m.data.userList])),d(!1)}catch(m){const h=m;N.error(h.message),d(!1)}},[n]);async function j(r){d(!0);try{(await b.post("/users/unfollow",{id:r},{withCredentials:!0})).data&&o(m=>m.filter(h=>h.user_id!==r)),d(!1)}catch(c){const m=c;N.error(m.message),d(!1)}}t.useEffect(()=>{a&&(p.current=0,f(""))},[a,f]);const w=Y(r=>{f(r)},500);return e.jsxs(v,{show:a,size:"md",onClose:()=>{o([]),s(!1)},children:[e.jsx(v.Header,{children:e.jsx("div",{className:"space-y-6 text-center",children:n})}),e.jsx("div",{className:"h-screen overflow-y-scroll userList",ref:x,children:e.jsxs(v.Body,{children:[e.jsx("input",{type:"text",className:"rounded-md w-full",onChange:r=>{i.current=!0,p.current=0,w(r.target.value)}}),e.jsx("div",{className:"users-list",children:l&&l.map((r,c)=>e.jsxs("div",{className:"user-card my-4 bg-gray-100 p-2 rounded-md flex items-center gap-3 justify-between",children:[e.jsxs("div",{className:"left flex gap-3",onClick:()=>u(`/view-profile/${r.user_id}`),children:[r.profile_img?e.jsx("img",{src:r.profile_img,alt:"",className:"w-10 rounded-md"}):e.jsx("h1",{className:"p-2 px-4 rounded-md bg-gray-400",children:r.email[0].toUpperCase()}),e.jsxs("div",{className:"name",children:[e.jsx("h1",{children:r.username}),e.jsx("p",{className:"text-sm text-gray-600",children:r.fullname})]})]}),n==="Following"&&e.jsx("button",{className:"bg-primary hover:bg-primary-hover px-2 py-1 rounded-md text-white",onClick:()=>j(r.user_id),children:"Unfollow"})]},c))}),g&&e.jsx(G,{})]})})]})}function W(){const[a,s]=t.useState(),[n,l]=t.useState(""),[o,u]=t.useState(!1);return t.useEffect(()=>{(async()=>{try{const i=await b.get("/profile/connection-count",{withCredentials:!0});i.data&&s({followers:i.data.connectionCount.followers,following:i.data.connectionCount.following})}catch(i){N(i.message)}})()},[]),e.jsxs("div",{className:"friend-list flex w-full justify-around sm-pe-7",children:[e.jsx(J,{openModal:o,setOpenModal:u,title:n}),e.jsxs("div",{className:"wrapper flex flex-col items-center",onClick:()=>{l("Following"),u(!0)},children:[e.jsx("h1",{children:a==null?void 0:a.following}),e.jsx("h3",{children:"Following"})]}),e.jsxs("div",{className:"wrapper flex flex-col items-center",onClick:()=>{l("Followers"),u(!0)},children:[e.jsx("h1",{children:a==null?void 0:a.followers}),e.jsx("h3",{children:"Followers"})]})]})}function X(){const a=C(),[s,n]=t.useState([]);return t.useEffect(()=>{(async()=>{try{const l=await b.get("/users/close-friends",{withCredentials:!0});l.data&&n(l.data.userList)}catch(l){const o=l;N.error(o.message)}})()},[]),e.jsxs("div",{className:"flex gap-3",children:[s.length===0&&e.jsxs("div",{className:"flex flex-col gap-5 text-sm w-full pt-5",children:[e.jsx("h1",{className:"text-center",children:"You dont have any close friends"}),e.jsx("button",{className:"bg-gray-700 py-2 rounded-md",onClick:()=>a("/manage-account/close-friends"),children:"Add Close friends"})]}),s&&s.map((l,o)=>e.jsx("div",{className:"",children:l.profile_img?e.jsx("img",{src:l.profile_img,alt:"",className:"w-10 rounded-md"}):e.jsx("h1",{className:"p-2 px-4 rounded-md bg-gray-400",children:l.email[0].toUpperCase()})},o))]})}function Z(){const{user:a}=y(n=>n.auth),{userProfile:s}=y(n=>n.user);return e.jsx("div",{className:"md:grid md:grid-cols-6 h-full p-5",children:e.jsxs("div",{className:"profile-section col-span-4",children:[e.jsx("h1",{className:"font-medium text-lg mb-5",children:"View Profile"}),e.jsxs("div",{className:"wrapper grid grid-cols-4 mb-4",children:[e.jsx("h1",{className:"key font-medium col-span-4 sm:col-span-1",children:"Full Name"}),e.jsx("h1",{className:"value sm:col-span-3",children:s==null?void 0:s.fullname})]}),e.jsxs("div",{className:"wrapper grid grid-cols-4 mb-4",children:[e.jsx("h1",{className:"key font-medium col-span-4 sm:col-span-1",children:"Email"}),e.jsx("h1",{className:"value sm:col-span-3 text-sm",children:a==null?void 0:a.email})]}),e.jsxs("div",{className:"wrapper grid grid-cols-4 mb-4",children:[e.jsx("h1",{className:"key font-medium col-span-4 sm:col-span-1",children:"Username"}),e.jsx("h1",{className:"value sm:col-span-3 text-sm",children:s==null?void 0:s.username})]}),e.jsxs("div",{className:"wrapper grid grid-cols-4 mb-4",children:[e.jsx("h1",{className:"key font-medium col-span-4 sm:col-span-1",children:"Gender"}),e.jsx("h1",{className:"value sm:col-span-3 text-sm",children:s==null?void 0:s.gender})]}),e.jsxs("div",{className:"wrapper mb-4",children:[e.jsx("h1",{className:"key font-medium mb-2",children:"Bio"}),e.jsx("h1",{className:"value text-sm",children:s==null?void 0:s.bio})]})]})})}const K=t.lazy(()=>I(()=>import("./PostSection-i_fxLJgo.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]))),ee=t.lazy(()=>I(()=>import("./SavedSection-O05IvRZ8.js"),__vite__mapDeps([16,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])));function de(){const a=_(),{userProfile:s,isLoading:n,isError:l,isSuccess:o,errorMessage:u}=y(L=>L.user),i=C(),[g,d]=t.useState(!1),[p,x]=t.useState(!1),[f,j]=t.useState(!1),[w,r]=t.useState("hidden"),[c,m]=t.useState("PROFILE"),h=F();t.useEffect(()=>{l?N(u):o&&(s||d(!0)),a(O())},[l,u,o,s,a]),t.useEffect(()=>{a(z())},[a]);function k(){N.success("profile updated")}return e.jsxs(e.Fragment,{children:[e.jsx(Q,{showUploadImage:p,setshowUploadImage:x}),e.jsx(H,{showUploadProfile:f,setshowUploadProfile:j}),e.jsx(D,{modalState:g,message:"Profile updation pending. update now?",posText:"Update Now",negText:"Later",successCallback:k,cancelCallback:null}),n?e.jsx(R,{}):e.jsxs("section",{className:"user-profile flex flex-col items-center sm:items-start",children:[e.jsxs("section",{className:"cover-photo",children:[e.jsx("button",{onClick:()=>x(!0),className:"add-cover-btn p-2 shadow-lg",children:e.jsx(S,{size:25})}),s!=null&&s.cover_img?e.jsx("img",{src:s==null?void 0:s.cover_img,className:"object-cover"}):e.jsx("div",{className:"default-cover",children:e.jsx("img",{src:"https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg",alt:""})})]}),e.jsxs("section",{className:"header bg-gray-900 flex flex-col items-center sm:flex-row sm:items-end w-full pb-1 shadow-2xl",children:[e.jsxs("div",{className:"left-area sm:ms-20 pb-2",children:[e.jsxs("div",{className:"profile-img relative",onMouseOverCapture:()=>r("block"),onMouseOutCapture:()=>r("hidden"),children:[e.jsx("button",{className:`edit-profileImg w-full h-full absolute top-0 ${w}`,onClick:()=>j(!0),children:e.jsx(S,{size:30})}),s!=null&&s.profile_img?e.jsx("img",{src:s==null?void 0:s.profile_img,alt:"",className:"w-full shadow-lg rounded-md"}):e.jsx("img",{src:"https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg",alt:"",className:"w-full shadow-lg rounded-md"})]}),e.jsxs("div",{className:"flex justify-center items-center gap-2",children:[e.jsx("h1",{className:"text-center mt-3 text-xl font-medium",children:s==null?void 0:s.username}),(s==null?void 0:s.isVerified)&&e.jsx("p",{className:"text-blue-600 text-xl",children:e.jsx(P,{})})]})]}),e.jsxs("div",{className:"right-nav grow ps-7 sm:ps-14 flex",children:[e.jsxs("div",{className:`flex flex-col items-center  hover:bg-gray-800 rounded-md p-2 mt-2 sm:me-9 ${h.pathname==="/profile"&&"bg-gray-800"}`,onClick:()=>{i("/profile"),m("PROFILE")},children:[e.jsx(T,{size:28}),e.jsx("h3",{className:"",children:"Profile"})]}),e.jsxs("div",{className:`flex flex-col items-center hover:bg-gray-700 rounded-md p-2 mt-2 sm:me-9 ${h.pathname==="/profile/post"&&"bg-gray-800"} `,onClick:()=>{i("/profile/post"),m("POST")},children:[e.jsx($,{size:28}),e.jsx("h3",{className:"",children:"Posts"})]}),e.jsxs("div",{className:`flex flex-col items-center hover:bg-gray-700 rounded-md p-2 mt-2 sm:me-9  ${h.pathname==="/profile/saved-post"&&"bg-gray-800"}`,onClick:()=>{i("/profile/saved-post"),m("SAVED")},children:[e.jsx(M,{size:28}),e.jsx("h3",{className:"",children:"Saved"})]})]})]}),e.jsxs("section",{className:"profile-body min-h-screen w-full md:grid md:grid-cols-12",children:[e.jsxs("div",{className:"left-section col-span-3 px-5 bg-gray-800 shadow-xl py-5",children:[e.jsx(W,{}),e.jsx("hr",{className:"my-3"}),e.jsx("div",{className:"flex items-center mb-3 justify-between",children:e.jsx("h1",{className:"font-medium text-center",children:"Close Friends"})}),e.jsx(X,{})]}),e.jsxs("div",{className:"right-section col-span-9 pt-5 px-3",children:[c==="PROFILE"&&e.jsx(Z,{}),c==="POST"&&e.jsx(K,{}),c==="SAVED"&&e.jsx(ee,{})]})]})]})]})}export{de as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/PostSection-i_fxLJgo.js","assets/index-LdwlfRLT.js","assets/index-I3tyCPlP.css","assets/PostModal-hSlz-boC.js","assets/Toast-b9fehy-Y.js","assets/index.esm-8nu0HV-1.js","assets/index.esm-fxG2GSUi.js","assets/usehandleError-BlJHFfAW.js","assets/Badge-smbJa9oh.js","assets/Typography-VqADIHGh.js","assets/extendSxProp-1JFPkbRL.js","assets/PostModal-qOpLdxIh.css","assets/Skeleton-fic0kHLW.js","assets/createBox-54ZdOs7e.js","assets/Skeleton-KofQWI2B.css","assets/ImageListItem-iqYqcl3N.js","assets/SavedSection-O05IvRZ8.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
