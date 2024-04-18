import{ak as F,bm as D,aC as P,b0 as G,al as q,bn as H,am as K,an as C,bo as V,bp as R,r as b,ao as z,ap as J,j as p,aq as Q,as as Y,aI as y,bq as Z}from"./index-m-eWRAVj.js";import{c as ee}from"./createBox-2xx0UrTx.js";function te(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function ne(t){return parseFloat(t)}const re=F("MuiBox",["root"]),ae=re,ie=D(),oe=ee({themeId:P,defaultTheme:ie,defaultClassName:ae.root,generateClassName:G.generate}),se=oe;function le(t){return q("MuiSkeleton",t)}F("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const ue=["animation","className","component","height","style","variant","width"];let k=t=>t,I,N,L,B;const ce=t=>{const{classes:e,variant:n,animation:r,hasChildren:u,width:f,height:c}=t;return Y({root:["root",n,r,u&&"withChildren",u&&!f&&"fitContent",u&&!c&&"heightAuto"]},le,e)},de=H(I||(I=k`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),fe=H(N||(N=k`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),he=K("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],n.animation!==!1&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const n=te(t.shape.borderRadius)||"px",r=ne(t.shape.borderRadius);return C({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:V(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${n}/${Math.round(r/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&R(L||(L=k`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),de),({ownerState:t,theme:e})=>t.animation==="wave"&&R(B||(B=k`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),fe,(e.vars||e).palette.action.hover)),me=b.forwardRef(function(e,n){const r=z({props:e,name:"MuiSkeleton"}),{animation:u="pulse",className:f,component:c="span",height:i,style:s,variant:l="text",width:o}=r,d=J(r,ue),h=C({},r,{animation:u,component:c,variant:l,hasChildren:!!d.children}),m=ce(h);return p.jsx(he,C({as:c,ref:n,className:Q(m.root,f),ownerState:h},d,{style:C({width:o,height:i},s)}))}),T=me;var ge="Expected a function",U=NaN,be="[object Symbol]",ve=/^\s+|\s+$/g,pe=/^[-+]0x[0-9a-f]+$/i,xe=/^0b[01]+$/i,ye=/^0o[0-7]+$/i,Ce=parseInt,ke=typeof y=="object"&&y&&y.Object===Object&&y,Oe=typeof self=="object"&&self&&self.Object===Object&&self,Se=ke||Oe||Function("return this")(),je=Object.prototype,Te=je.toString,we=Math.max,Ee=Math.min,w=function(){return Se.Date.now()};function Me(t,e,n){var r,u,f,c,i,s,l=0,o=!1,d=!1,h=!0;if(typeof t!="function")throw new TypeError(ge);e=A(e)||0,E(n)&&(o=!!n.leading,d="maxWait"in n,f=d?we(A(n.maxWait)||0,e):f,h="trailing"in n?!!n.trailing:h);function m(a){var g=r,v=u;return r=u=void 0,l=a,c=t.apply(v,g),c}function O(a){return l=a,i=setTimeout(x,e),o?m(a):c}function S(a){var g=a-s,v=a-l,_=e-g;return d?Ee(_,f-v):_}function M(a){var g=a-s,v=a-l;return s===void 0||g>=e||g<0||d&&v>=f}function x(){var a=w();if(M(a))return $(a);i=setTimeout(x,S(a))}function $(a){return i=void 0,h&&r?m(a):(r=u=void 0,c)}function W(){i!==void 0&&clearTimeout(i),l=0,r=s=u=i=void 0}function X(){return i===void 0?c:$(w())}function j(){var a=w(),g=M(a);if(r=arguments,u=this,s=a,g){if(i===void 0)return O(s);if(d)return i=setTimeout(x,e),m(s)}return i===void 0&&(i=setTimeout(x,e)),c}return j.cancel=W,j.flush=X,j}function E(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function $e(t){return!!t&&typeof t=="object"}function _e(t){return typeof t=="symbol"||$e(t)&&Te.call(t)==be}function A(t){if(typeof t=="number")return t;if(_e(t))return U;if(E(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=E(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace(ve,"");var n=xe.test(t);return n||ye.test(t)?Ce(t.slice(2),n?2:8):pe.test(t)?U:+t}var Re=Me;const Ie=Z(Re);var Ne=function(e,n,r){return e?Ie(n,e,r):n};function Ue(t,e){var n=b.useMemo(function(){var o,d,h,m;return{offset:(o=e==null?void 0:e.offset)!=null?o:0,debounce:(d=e==null?void 0:e.debounce)!=null?d:200,debounceOptions:(h=e==null?void 0:e.debounceOptions)!=null?h:{leading:!0},triggerOnNoScroll:(m=e==null?void 0:e.triggerOnNoScroll)!=null?m:!1}},[e==null?void 0:e.offset,e==null?void 0:e.debounce,e==null?void 0:e.debounceOptions,e==null?void 0:e.triggerOnNoScroll]),r=n.offset,u=n.triggerOnNoScroll,f=n.debounce,c=n.debounceOptions,i=b.useMemo(function(){return Ne(f,t,c)},[f,t]),s=b.useRef(null),l=b.useCallback(function(){if(s.current!=null){var o=s.current,d=Math.round(o.scrollTop+o.clientHeight),h=Math.round(o.scrollHeight-r);h<=d&&i()}else{var m=document.scrollingElement||document.documentElement,O=Math.round(m.scrollTop+window.innerHeight),S=Math.round(m.scrollHeight-r);S<=O&&i()}},[r,t,s.current]);return b.useEffect(function(){var o=s.current;return o!=null?o.addEventListener("scroll",l):window.addEventListener("scroll",l),u&&l(),function(){o!=null?o.removeEventListener("scroll",l):window.removeEventListener("scroll",l)}},[l,f]),s}function Ae(){return p.jsxs(se,{sx:{width:300},children:[p.jsx(T,{}),p.jsx(T,{animation:"wave"}),p.jsx(T,{animation:!1})]})}export{Ae as S,T as a,Ue as u};
