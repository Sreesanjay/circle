import{m as y,u as f,a as g,r,ae as N,ac as v,j as e,af as b,A as C,D as S,P as I,Y as _,ag as k,ah as z,i as E,Q as A}from"./index-ngpxSBwB.js";import{I as V,a as M}from"./index.esm-hta1o9gH.js";import{C as $}from"./Toast-zCjXuh_L.js";import"./index.esm-a0seUomB.js";function P(){const o=y(),{myStory:c,isSuccess:d}=f(s=>s.story),{userProfile:n}=f(s=>s.user),a=g(),[x,h]=r.useState([]),[m,l]=r.useState(!1),[u,j]=r.useState(0);r.useEffect(()=>{a(N())},[a]),r.useEffect(()=>{d&&a(v())},[d,a]);function p(s){a(z(s))}async function w(s){try{const t=await E.get(`/story/get-viewers-list/${s}`,{withCredentials:!0});t.data&&(h(t.data.userList),l(!0))}catch(t){A(t.message)}}return e.jsxs("section",{className:"sm:p-5 flex bg-gray-800 justify-center w-screen",children:[e.jsxs("div",{className:"story-card rounded-md relative w-screen sm:w-1/4 sm:min-w-96",children:[e.jsxs("div",{className:"header p-3 flex gap-3 absolute z-20",children:[e.jsx(b,{size:"small"}),e.jsx("h1",{children:n==null?void 0:n.username}),e.jsx("div",{className:"absolute left-5 top-5",onClick:()=>o("/add-story"),children:e.jsx(C,{size:30})})]}),e.jsx($,{indicators:!1,slideInterval:1e4,onSlideChange:s=>{s!==u&&(l(!1),j(s))},children:c==null?void 0:c.map(s=>e.jsxs("div",{className:`story ${s.background} h-full flex items-center justify-center rounded-md flex-wrap ${s.visibility==="CLOSE_FRIENDS"?"border":""}`,children:[s.story_type==="TEXT"?e.jsx("h1",{className:`text-${s.color} text-2xl`,children:s.content}):e.jsx("img",{src:s.content,alt:"",className:""}),e.jsxs("div",{className:"footer absolute min-h-5 w-full bottom-0 px-5 py-1",children:[e.jsxs("div",{className:"flex",children:[m?e.jsxs("button",{className:"flex items-center",onClick:()=>l(!1),children:[s.story_viewers.length,"Views",e.jsx(V,{className:"text-2xl"})]}):e.jsxs("button",{className:"flex items-center",onClick:()=>w(s._id),children:[s.story_viewers.length,"Views",e.jsx(M,{className:"text-2xl"})]}),e.jsx("button",{className:"cursor-pointer ms-5",onClick:()=>p(s._id),children:e.jsx(S,{size:25})})]}),m&&e.jsx("div",{className:"viewers bg-gray-600 py-4 ps-2 shadow-md rounded-md",children:x&&x.map(t=>{var i;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"user-card mb-2 flex items-center justify-between",children:[e.jsxs("div",{className:"left flex",children:[t!=null&&t.profile_img?e.jsx("img",{src:t==null?void 0:t.profile_img,alt:"",style:{},className:"w-9 rounded-lg"}):e.jsx(I,{email:((i=t.email)==null?void 0:i.email)||"",size:"small"}),e.jsx("h1",{className:"ms-2 text-white",children:t.username})]}),s&&s.likes.includes(t.user_id)?e.jsx(_,{size:45}):null]})})})})]})]}))})]}),e.jsx("div",{className:"close-icon absolute right-5",onClick:()=>o("/"),children:e.jsx(k,{size:45})})]})}export{P as default};