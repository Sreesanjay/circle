import{u as y,m as E,r as o,a6 as T,a7 as R,a8 as F,i as u,Q as n,j as a,L,a9 as V}from"./index-HNWM3XXZ.js";import{A as j,H as v}from"./Toast-YAWujjSQ.js";import"./index.esm-EAmMpK27.js";function H(){const{userProfile:i}=y(e=>e.user),N=E(),{user:m}=y(e=>e.auth),[d,_]=o.useState(),[f,b]=o.useState(),[h,w]=o.useState(),[p,I]=o.useState(null),[r,S]=o.useState(),[g,l]=o.useState(""),[C,x]=o.useState(!1);o.useEffect(()=>{(async()=>{if(d){const e=new Date().getTime()+d.name,s=T(V,"docs/"+e);if(await R(s,d)){const c=await F(s);b(c)}}})()},[d]),o.useEffect(()=>{(async()=>{var e;try{const s=await u.get("/posts/plans?planType=VERIFICATION");I(s.data.plan)}catch(s){const t=s;t.response?n.error((e=t.response)==null?void 0:e.data.message):n.error(t.message)}})()},[]);async function A(e){var s;if(e.razorpay_order_id&&e.razorpay_payment_id&&e.razorpay_signature){x(!0);try{(await u.post("/profile/add-verification",{plan_id:r==null?void 0:r._id,amount:r==null?void 0:r.amount,document:f,document_type:h,payment:e})).data&&(x(!1),n.success("Your verification added successfully"),N("/profile"))}catch(t){const c=t;c.response?n.error((s=c.response)==null?void 0:s.data.message):n.error(c.message)}}}async function z(){var e;if(!f)l("Add id card image");else if(!h)l("Add id card type");else if(!r)l("Select a plan");else{l("");try{const s=await u.post("/profile/createPayment",{plan_id:r==null?void 0:r._id});if(s.data.order){const t={key:"rzp_test_qYNtji31kEDmBr",amount:s.data.order.amount,currency:"INR",name:"Payment razorpay",description:"Test Transaction",image:"https://example.com/your_logo",order_id:s.data.order.id,handler:function(D){A(D)},prefill:{name:i==null?void 0:i.username,email:m==null?void 0:m.email},theme:{color:"#3399cc"}};new window.Razorpay(t).open()}}catch(s){const t=s;t.response?n.error((e=t.response)==null?void 0:e.data.message):n.error(t.message)}}}return a.jsx(a.Fragment,{children:C?a.jsx(L,{}):a.jsx("section",{className:"verification p-5 w-full flex",children:a.jsxs("div",{className:"card sm:w-1/2 rounded-md p-5 left-section",children:[a.jsx("h1",{className:"text-2xl mb-5",children:"Account Verification"}),!(i!=null&&i.profile_img)&&a.jsxs(j,{color:"failure",icon:v,children:[a.jsx("span",{className:"font-medium",children:"Info alert!"})," ","Update Your profile image before continuing"]}),g&&a.jsxs(j,{color:"failure",icon:v,children:[a.jsx("span",{className:"font-medium",children:"Info alert!"})," ",g]}),a.jsxs("div",{className:"file flex flex-col mt-5",children:[a.jsx("label",{htmlFor:"",children:"Add a government approved ID Card Image"}),a.jsx("input",{type:"file",className:"bg-gray-600 w-min border mt-5",onChange:e=>{e.target.files&&_(e.target.files[0])}}),a.jsx("label",{htmlFor:"",className:"mt-8 mb-5 ",children:"Select Document type"}),a.jsxs("select",{name:"",id:"",className:"bg-gray-800 rounded-md",onChange:e=>{w(e.target.value)},children:[a.jsx("option",{value:"",children:"choose a dodument type"}),a.jsx("option",{value:"Adhar_card",children:"Adhar Card"}),a.jsx("option",{value:"Voter_id",children:"Voter Id"}),a.jsx("option",{value:"Driving_licence",children:"Driving licence"})]}),a.jsx("h1",{className:"mt-5",children:"Select a plan"}),p==null?void 0:p.map((e,s)=>a.jsxs("div",{className:`w-48 h-48 mt-5 bg-gray-900 rounded-md flex flex-col items-center p-3 shadow-lg ${(r==null?void 0:r._id)===e._id&&"border"}`,onClick:()=>S(e),children:[a.jsxs("h1",{className:"text-4xl",children:["₹",e.amount," "]}),a.jsxs("p",{children:["For"," ",Math.floor(e.duration/30)," ","Month"]}),a.jsx("small",{className:"text-center mt-5",children:e.discription})]},s)),a.jsxs("div",{className:"btn-group",children:[a.jsx("button",{className:"px-5 py-1 w-min bg-red-700 hover:bg-red-800 rounded-md mt-5",children:"Cancel"}),a.jsx("button",{className:"px-5 w-min  ms-5 py-1 bg-primary hover:bg-primary-hover rounded-md mt-10",onClick:z,children:"Submit"})]})]})]})})})}export{H as default};
