import{u as te,a as De,r as h,i as ye,Q as ue,j as u,s as nt,P as se,b as we,c as je,R as A,d as Tn,D as An,e as Pn,f as Dn,E as ut,g as In,C as On,A as Hn,h as Bn,k as Fn,l as _e,m as Un,n as We,o as Vn,p as dt,q as Wn,t as ft,T as qn}from"./index-m-eWRAVj.js";import{c as Gn,a as Kn,b as Yn,r as ht,i as Xn,d as Jn,e as Zn,g as Qn,s as er,f as tr,h as nr,j as rr,k as ir,l as or}from"./chatService-pwmcj5v5.js";import{S as ar,M as He,L as pt}from"./Toast-KVdhVArs.js";import{P as sr}from"./PopupModal-pXmYe3SX.js";import{I as cr}from"./index.esm-1llS7C12.js";import{R as lr}from"./Report-vUX28oJA.js";import{I as ur}from"./ImageCrop-WxXaXkfb.js";import"./index.esm-5AkatTaU.js";function dr({chat:e,online:t}){var a,s,c,d,l;const{user:n}=te(m=>m.auth),r=De(),[o,i]=h.useState(null);return h.useEffect(()=>{(async()=>{try{if(!e.is_groupchat){const m=e.members.find(v=>v!==(n==null?void 0:n._id)),p=await ye.get(`/users/get-user-profile/${m}`,{withCredentials:!0});p.data&&i(p.data.userProfile)}}catch{ue.error("Internal error")}})()},[e,n]),u.jsxs("div",{className:"chat-user-card flex items-center bg-seconday-bg hover:bg-black p-2 rounded-md shadow-lg mb-2",onClick:()=>{r(nt(e))},children:[u.jsxs("div",{className:"profile-img relative w-min z-0",children:[e.is_groupchat?e!=null&&e.icon?u.jsx("img",{src:e==null?void 0:e.icon,alt:"dsfkajfhskadfh",className:"w-10 h-10"}):u.jsx(se,{size:"medium",email:e.chat_name||""}):o!=null&&o.profile_img?u.jsx("img",{src:o.profile_img,alt:"dsfkajfhskadfh",className:"w-10 h-10"}):u.jsx(se,{size:"medium",email:(o==null?void 0:o.email)||""}),!e.is_groupchat&&t&&u.jsx("div",{className:"active rounded-full w-3 h-3 bg-green-600 absolute bottom-0 right-0"})]}),u.jsxs("div",{className:"center-section px-2 flex flex-col justify-center",children:[u.jsx("h1",{className:"text-xl",children:e.is_groupchat?e.chat_name:o==null?void 0:o.username}),u.jsx("span",{className:"text-xs overflow-hidden text-nowrap max-w-48",children:(a=e==null?void 0:e.latest_message)!=null&&a.content?e.latest_message.is_delete?u.jsx("h1",{className:"text-gray-500 p-2 rounded-md",children:"This message has been deleted"}):u.jsxs(u.Fragment,{children:[(c=(s=e.latest_message)==null?void 0:s.userDetails)==null?void 0:c.username," ",":",((d=e.latest_message)==null?void 0:d.content_type)==="MEDIA"?"file":(l=e.latest_message)==null?void 0:l.content," "]}):null})]})]})}var rt={},fr=je;Object.defineProperty(rt,"__esModule",{value:!0});var Kt=rt.default=void 0,hr=fr(we()),pr=u,mr=(0,hr.default)((0,pr.jsx)("path",{d:"M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"}),"Attachment");Kt=rt.default=mr;function gr(e,t){t===void 0&&(t={});var n=t.insertAt;if(!(!e||typeof document>"u")){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",n==="top"&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}var vr=`.react-input-emoji--container {
  color: #4b4b4b;
  text-rendering: optimizeLegibility;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 21px;
  margin: 5px 10px;
  box-sizing: border-box;
  flex: 1 1 auto;
  font-size: 15px;
  font-family: sans-serif;
  font-weight: 400;
  line-height: 20px;
  min-height: 20px;
  min-width: 0;
  outline: none;
  width: inherit;
  will-change: width;
  vertical-align: baseline;
  border: 1px solid #eaeaea;
  margin-right: 0;
}

.react-input-emoji--wrapper {
  display: flex;
  overflow: hidden;
  flex: 1;
  position: relative;
  padding-right: 0;
  vertical-align: baseline;
  outline: none;
  margin: 0;
  padding: 0;
  border: 0;
}

.react-input-emoji--input {
  font-weight: 400;
  max-height: 100px;
  min-height: 20px;
  outline: none;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 1;
  width: 100%;
  user-select: text;
  padding: 9px 12px 11px;
  text-align: left;
}

.react-input-emoji--input img {
  vertical-align: middle;
  width: 18px !important;
  height: 18px !important;
  display: inline !important;
  margin-left: 1px;
  margin-right: 1px;
}

.react-input-emoji--overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
}

.react-input-emoji--placeholder {
  color: #a0a0a0;
  pointer-events: none;
  position: absolute;
  user-select: none;
  z-index: 2;
  left: 16px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: calc(100% - 22px);
}

.react-input-emoji--button {
  position: relative;
  display: block;
  text-align: center;
  padding: 0 10px;
  overflow: hidden;
  transition: color 0.1s ease-out;
  margin: 0;
  box-shadow: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
}

.react-input-emoji--button svg {
  fill: #858585;
}

.react-input-emoji--button__show svg {
  fill: #128b7e;
}

.react-emoji {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.react-emoji-picker--container {
  position: absolute;
  top: 0;
  width: 100%;
}

.react-emoji-picker--wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 435px;
  width: 352px;
  overflow: hidden;
  z-index: 10;
}

.react-emoji-picker {
  position: absolute;
  top: 0;
  left: 0;
  animation: slidein 0.1s ease-in-out;
}

.react-emoji-picker__show {
  top: 0;
}

.react-input-emoji--mention--container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.react-input-emoji--mention--list {
  background-color: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.react-input-emoji--mention--item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  background-color: transparent;
  width: 100%;
  margin: 0;
  border: 0;
}

.react-input-emoji--mention--item__selected {
  background-color: #eeeeee;
}

.react-input-emoji--mention--item--img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.react-input-emoji--mention--item--name {
  font-size: 16px;
  color: #333;
}

.react-input-emoji--mention--item--name__selected {
  color: green;
}

.react-input-emoji--mention--text {
  color: #039be5;
}

.react-input-emoji--mention--loading {
  background-color: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.react-input-emoji--mention--loading--spinner,
.react-input-emoji--mention--loading--spinner::after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

.react-input-emoji--mention--loading--spinner {
  margin: 1px auto;
  font-size: 2px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 0, 0, 0.1);
  border-right: 1.1em solid rgba(0, 0, 0, 0.1);
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.1);
  border-left: 1.1em solid rgba(0, 0, 0, 0.4);
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes slidein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
`;gr(vr);function br(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,i,a,s=[],c=!0,d=!1;try{if(i=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(l){d=!0,o=l}finally{try{if(!c&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(d)throw o}}return s}}function mt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function gt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?mt(Object(n),!0).forEach(function(r){_r(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):mt(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ge(){ge=function(){return t};var e,t={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(x,_,$){x[_]=$.value},i=typeof Symbol=="function"?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function d(x,_,$){return Object.defineProperty(x,_,{value:$,enumerable:!0,configurable:!0,writable:!0}),x[_]}try{d({},"")}catch{d=function(_,$,R){return _[$]=R}}function l(x,_,$,R){var E=_&&_.prototype instanceof S?_:S,D=Object.create(E.prototype),F=new K(R||[]);return o(D,"_invoke",{value:W(x,$,F)}),D}function m(x,_,$){try{return{type:"normal",arg:x.call(_,$)}}catch(R){return{type:"throw",arg:R}}}t.wrap=l;var p="suspendedStart",v="suspendedYield",g="executing",y="completed",w={};function S(){}function C(){}function L(){}var T={};d(T,a,function(){return this});var k=Object.getPrototypeOf,M=k&&k(k(q([])));M&&M!==n&&r.call(M,a)&&(T=M);var O=L.prototype=S.prototype=Object.create(T);function I(x){["next","throw","return"].forEach(function(_){d(x,_,function($){return this._invoke(_,$)})})}function V(x,_){function $(E,D,F,f){var j=m(x[E],x,D);if(j.type!=="throw"){var N=j.arg,U=N.value;return U&&typeof U=="object"&&r.call(U,"__await")?_.resolve(U.__await).then(function(Q){$("next",Q,F,f)},function(Q){$("throw",Q,F,f)}):_.resolve(U).then(function(Q){N.value=Q,F(N)},function(Q){return $("throw",Q,F,f)})}f(j.arg)}var R;o(this,"_invoke",{value:function(E,D){function F(){return new _(function(f,j){$(E,D,f,j)})}return R=R?R.then(F,F):F()}})}function W(x,_,$){var R=p;return function(E,D){if(R===g)throw new Error("Generator is already running");if(R===y){if(E==="throw")throw D;return{value:e,done:!0}}for($.method=E,$.arg=D;;){var F=$.delegate;if(F){var f=B(F,$);if(f){if(f===w)continue;return f}}if($.method==="next")$.sent=$._sent=$.arg;else if($.method==="throw"){if(R===p)throw R=y,$.arg;$.dispatchException($.arg)}else $.method==="return"&&$.abrupt("return",$.arg);R=g;var j=m(x,_,$);if(j.type==="normal"){if(R=$.done?y:v,j.arg===w)continue;return{value:j.arg,done:$.done}}j.type==="throw"&&(R=y,$.method="throw",$.arg=j.arg)}}}function B(x,_){var $=_.method,R=x.iterator[$];if(R===e)return _.delegate=null,$==="throw"&&x.iterator.return&&(_.method="return",_.arg=e,B(x,_),_.method==="throw")||$!=="return"&&(_.method="throw",_.arg=new TypeError("The iterator does not provide a '"+$+"' method")),w;var E=m(R,x.iterator,_.arg);if(E.type==="throw")return _.method="throw",_.arg=E.arg,_.delegate=null,w;var D=E.arg;return D?D.done?(_[x.resultName]=D.value,_.next=x.nextLoc,_.method!=="return"&&(_.method="next",_.arg=e),_.delegate=null,w):D:(_.method="throw",_.arg=new TypeError("iterator result is not an object"),_.delegate=null,w)}function H(x){var _={tryLoc:x[0]};1 in x&&(_.catchLoc=x[1]),2 in x&&(_.finallyLoc=x[2],_.afterLoc=x[3]),this.tryEntries.push(_)}function J(x){var _=x.completion||{};_.type="normal",delete _.arg,x.completion=_}function K(x){this.tryEntries=[{tryLoc:"root"}],x.forEach(H,this),this.reset(!0)}function q(x){if(x||x===""){var _=x[a];if(_)return _.call(x);if(typeof x.next=="function")return x;if(!isNaN(x.length)){var $=-1,R=function E(){for(;++$<x.length;)if(r.call(x,$))return E.value=x[$],E.done=!1,E;return E.value=e,E.done=!0,E};return R.next=R}}throw new TypeError(typeof x+" is not iterable")}return C.prototype=L,o(O,"constructor",{value:L,configurable:!0}),o(L,"constructor",{value:C,configurable:!0}),C.displayName=d(L,c,"GeneratorFunction"),t.isGeneratorFunction=function(x){var _=typeof x=="function"&&x.constructor;return!!_&&(_===C||(_.displayName||_.name)==="GeneratorFunction")},t.mark=function(x){return Object.setPrototypeOf?Object.setPrototypeOf(x,L):(x.__proto__=L,d(x,c,"GeneratorFunction")),x.prototype=Object.create(O),x},t.awrap=function(x){return{__await:x}},I(V.prototype),d(V.prototype,s,function(){return this}),t.AsyncIterator=V,t.async=function(x,_,$,R,E){E===void 0&&(E=Promise);var D=new V(l(x,_,$,R),E);return t.isGeneratorFunction(_)?D:D.next().then(function(F){return F.done?F.value:D.next()})},I(O),d(O,c,"Generator"),d(O,a,function(){return this}),d(O,"toString",function(){return"[object Generator]"}),t.keys=function(x){var _=Object(x),$=[];for(var R in _)$.push(R);return $.reverse(),function E(){for(;$.length;){var D=$.pop();if(D in _)return E.value=D,E.done=!1,E}return E.done=!0,E}},t.values=q,K.prototype={constructor:K,reset:function(x){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(J),!x)for(var _ in this)_.charAt(0)==="t"&&r.call(this,_)&&!isNaN(+_.slice(1))&&(this[_]=e)},stop:function(){this.done=!0;var x=this.tryEntries[0].completion;if(x.type==="throw")throw x.arg;return this.rval},dispatchException:function(x){if(this.done)throw x;var _=this;function $(j,N){return D.type="throw",D.arg=x,_.next=j,N&&(_.method="next",_.arg=e),!!N}for(var R=this.tryEntries.length-1;R>=0;--R){var E=this.tryEntries[R],D=E.completion;if(E.tryLoc==="root")return $("end");if(E.tryLoc<=this.prev){var F=r.call(E,"catchLoc"),f=r.call(E,"finallyLoc");if(F&&f){if(this.prev<E.catchLoc)return $(E.catchLoc,!0);if(this.prev<E.finallyLoc)return $(E.finallyLoc)}else if(F){if(this.prev<E.catchLoc)return $(E.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<E.finallyLoc)return $(E.finallyLoc)}}}},abrupt:function(x,_){for(var $=this.tryEntries.length-1;$>=0;--$){var R=this.tryEntries[$];if(R.tryLoc<=this.prev&&r.call(R,"finallyLoc")&&this.prev<R.finallyLoc){var E=R;break}}E&&(x==="break"||x==="continue")&&E.tryLoc<=_&&_<=E.finallyLoc&&(E=null);var D=E?E.completion:{};return D.type=x,D.arg=_,E?(this.method="next",this.next=E.finallyLoc,w):this.complete(D)},complete:function(x,_){if(x.type==="throw")throw x.arg;return x.type==="break"||x.type==="continue"?this.next=x.arg:x.type==="return"?(this.rval=this.arg=x.arg,this.method="return",this.next="end"):x.type==="normal"&&_&&(this.next=_),w},finish:function(x){for(var _=this.tryEntries.length-1;_>=0;--_){var $=this.tryEntries[_];if($.finallyLoc===x)return this.complete($.completion,$.afterLoc),J($),w}},catch:function(x){for(var _=this.tryEntries.length-1;_>=0;--_){var $=this.tryEntries[_];if($.tryLoc===x){var R=$.completion;if(R.type==="throw"){var E=R.arg;J($)}return E}}throw new Error("illegal catch attempt")},delegateYield:function(x,_,$){return this.delegate={iterator:q(x),resultName:_,nextLoc:$},this.method==="next"&&(this.arg=e),w}},t}function vt(e,t,n,r,o,i,a){try{var s=e[i](a),c=s.value}catch(d){n(d);return}s.done?t(c):Promise.resolve(c).then(r,o)}function bt(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function a(c){vt(i,r,o,a,s,"next",c)}function s(c){vt(i,r,o,a,s,"throw",c)}a(void 0)})}}function _r(e,t,n){return t=Er(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xr(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function yr(e,t){if(e==null)return{};var n=xr(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function oe(e,t){return jr(e)||br(e,t)||Xt(e,t)||Cr()}function Yt(e){return wr(e)||$r(e)||Xt(e)||kr()}function wr(e){if(Array.isArray(e))return qe(e)}function jr(e){if(Array.isArray(e))return e}function $r(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Xt(e,t){if(e){if(typeof e=="string")return qe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return qe(e,t)}}function qe(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function kr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Sr(e,t){if(typeof e!="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Er(e){var t=Sr(e,"string");return typeof t=="symbol"?t:String(t)}var Mr="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";function Jt(e){var t=Lr(e);return t&&(t=Yt(new Set(t)),t.forEach(function(n){e=Zt(e,n,Qt("",n))})),e}function Zt(e,t,n){return e.replace(new RegExp(t,"g"),n)}function Lr(e){return e.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g)}function Rr(e){var t,n=document.querySelector("em-emoji-picker");if(!n)return _t(e.native);var r=n==null||(t=n.shadowRoot)===null||t===void 0?void 0:t.querySelector('[title="'.concat(e.name,'"] > span > span'));if(!r)return _t(e.native);var o=Zt(r.style.cssText,'"',"'");return Qt(o,e.native)}function Qt(e,t){return'<img style="'.concat(e,'; display: inline-block" data-emoji="').concat(t,'" src="').concat(Mr,'" />')}function _t(e){return'<span class="width: 18px; height: 18px; display: inline-block; margin: 0 1px;">'.concat(e,"</span>")}function Ee(e){var t=document.createElement("div");t.innerHTML=e;var n=Array.prototype.slice.call(t.querySelectorAll("img"));return n.forEach(function(r){t.innerHTML=t.innerHTML.replace(r.outerHTML,r.dataset.emoji)}),t.innerHTML}function zr(e){var t=window.getSelection();if(t!==null){for(var n=document.createElement("div"),r=0,o=t.rangeCount;r<o;++r)n.appendChild(t.getRangeAt(r).cloneContents());n=Tr(n),e.clipboardData.setData("text",n.innerText),e.preventDefault()}}function Nr(e){var t,n;if(window.getSelection){if(t=window.getSelection(),t===null)return;if(t.getRangeAt&&t.rangeCount){n=t.getRangeAt(0),n.deleteContents();var r=document.createElement("div");r.innerHTML=e;for(var o=document.createDocumentFragment(),i,a;i=r.firstChild;)a=o.appendChild(i);n.insertNode(o),a&&(n=n.cloneRange(),n.setStartAfter(a),n.collapse(!0),t.removeAllRanges(),t.addRange(n))}}}function Tr(e){var t=Array.prototype.slice.call(e.querySelectorAll("img"));return t.forEach(function(n){n.outerHTML=n.dataset.emoji}),e}function xt(e){var t=e.text,n=e.html,r=t.length,o=(n.match(/<img/g)||[]).length;return r+o}function Ar(e){var t,n;document.createRange&&e.current&&(t=document.createRange(),t.selectNodeContents(e.current),t.collapse(!1),n=window.getSelection(),n&&(n.removeAllRanges(),n.addRange(t)))}function Pr(e){var t=e.innerHTML.replace(/<br\s*\/?>/gi,"[BR]"),n=t.replace(/<[^>]+>/g,""),r=n.replace(/\[BR\]/gi,"</br>");return r}function en(e){var t=h.useRef([]),n=h.useRef(""),r=h.useCallback(function(i){t.current.push(i)},[]),o=h.useCallback(function(i){var a=t.current.reduce(function(s,c){return c(s)},i);return a=Dr(a,e),n.current=a,a},[]);return{addSanitizeFn:r,sanitize:o,sanitizedTextRef:n}}function Dr(e,t){var n=document.createElement("div");n.innerHTML=e;var r;return t?r=Pr(n):r=n.innerText||"",r=r.replace(/\n/gi,""),r}function Ir(e){var t=e.ref,n=e.textInputRef,r=e.setValue,o=e.emitChange,i=en(!1),a=i.sanitize,s=i.sanitizedTextRef;h.useImperativeHandle(t,function(){return{get value(){return s.current},set value(c){r(c)},focus:function(){n.current!==null&&n.current.focus()},blur:function(){n.current!==null&&a(n.current.html),o()}}})}function Or(e,t,n){var r=h.useRef(null),o=h.useRef(n),i=h.useCallback(function(){if(e.current!==null){var s=r.current,c=e.current.size;(!s||s.width!==c.width||s.height!==c.height)&&typeof t=="function"&&t(c),r.current=c}},[t,e]),a=h.useCallback(function(s){typeof o.current=="function"&&o.current(s),typeof t=="function"&&i()},[i,t]);return h.useEffect(function(){e.current&&i()},[i,e]),a}var Hr=["placeholder","style","tabIndex","className","onChange"],Br=function(t,n){var r=t.placeholder,o=t.style,i=t.tabIndex,a=t.className,s=t.onChange,c=yr(t,Hr);h.useImperativeHandle(n,function(){return{appendContent:function(y){l.current&&l.current.focus(),Nr(y),l.current&&l.current.focus(),l.current&&d.current&&Ee(l.current.innerHTML)===""?d.current.style.visibility="visible":d.current&&(d.current.style.visibility="hidden"),l.current&&typeof s=="function"&&s(l.current.innerHTML)},set html(g){if(l.current&&(l.current.innerHTML=g),d.current){var y=Ee(g);y===""?d.current.style.visibility="visible":d.current.style.visibility="hidden"}typeof s=="function"&&l.current&&s(l.current.innerHTML)},get html(){return l.current?l.current.innerHTML:""},get text(){return l.current?l.current.innerText:""},get size(){return l.current?{width:l.current.offsetWidth,height:l.current.offsetHeight}:{width:0,height:0}},focus:function(){l.current&&l.current.focus()}}});var d=h.useRef(null),l=h.useRef(null);function m(g){if(g.key==="Enter"&&(g.shiftKey===!0||g.ctrlKey===!0)&&c.shouldReturn&&(g.preventDefault(),l.current)){l.current.innerHTML="".concat(l.current.innerHTML,"</br></br>"),Ar(l);return}g.key==="Enter"?c.onEnter(g):g.key==="ArrowUp"?c.onArrowUp(g):g.key==="ArrowDown"?c.onArrowDown(g):g.key.length===1&&d.current&&(d.current.style.visibility="hidden"),c.onKeyDown(g)}function p(){c.onFocus()}function v(g){c.onKeyUp(g);var y=l.current;if(d.current&&y){var w=Ee(y.innerHTML);w===""?d.current.style.visibility="visible":d.current.style.visibility="hidden"}typeof s=="function"&&l.current&&s(l.current.innerHTML)}return A.createElement("div",{className:"react-input-emoji--container",style:o},A.createElement("div",{className:"react-input-emoji--wrapper",onClick:p},A.createElement("div",{ref:d,className:"react-input-emoji--placeholder"},r),A.createElement("div",{ref:l,onKeyDown:m,onKeyUp:v,tabIndex:i,contentEditable:!0,className:"react-input-emoji--input".concat(a?" ".concat(a):""),onBlur:c.onBlur,onCopy:c.onCopy,onPaste:c.onPaste,"data-testid":"react-input-emoji--input"})))},Fr=h.forwardRef(Br);function yt(e){var t=e.showPicker,n=e.toggleShowPicker,r=e.buttonElement,o=e.buttonRef,i=h.useRef(null),a=h.useState(!1),s=oe(a,2),c=s[0],d=s[1];return h.useEffect(function(){var l,m,p,v;((l=o==null||(m=o.current)===null||m===void 0||(m=m.childNodes)===null||m===void 0?void 0:m.length)!==null&&l!==void 0?l:0)>2?(i.current.appendChild(o.current.childNodes[0]),d(!0)):((p=r==null||(v=r.childNodes)===null||v===void 0?void 0:v.length)!==null&&p!==void 0?p:0)>2&&(i.current.appendChild(r==null?void 0:r.childNodes[0]),d(!0))},[r==null?void 0:r.childNodes]),A.createElement("button",{ref:i,type:"button",className:"react-input-emoji--button".concat(t?" react-input-emoji--button__show":""),onClick:n},!c&&A.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",className:"react-input-emoji--button--icon"},A.createElement("path",{d:"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"}),A.createElement("path",{d:"M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"})))}function tn(e){return e&&e.__esModule?e.default:e}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Ie,z,nn,xe,rn,wt,Re={},on=[],Ur=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function ae(e,t){for(var n in t)e[n]=t[n];return e}function an(e){var t=e.parentNode;t&&t.removeChild(e)}function Ge(e,t,n){var r,o,i,a={};for(i in t)i=="key"?r=t[i]:i=="ref"?o=t[i]:a[i]=t[i];if(arguments.length>2&&(a.children=arguments.length>3?Ie.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(i in e.defaultProps)a[i]===void 0&&(a[i]=e.defaultProps[i]);return Me(e,a,r,o,null)}function Me(e,t,n,r,o){var i={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o??++nn};return o==null&&z.vnode!=null&&z.vnode(i),i}function re(){return{current:null}}function pe(e){return e.children}function ne(e,t){this.props=e,this.context=t}function me(e,t){if(t==null)return e.__?me(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?me(e):null}function sn(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return sn(e)}}function jt(e){(!e.__d&&(e.__d=!0)&&xe.push(e)&&!ze.__r++||wt!==z.debounceRendering)&&((wt=z.debounceRendering)||rn)(ze)}function ze(){for(var e;ze.__r=xe.length;)e=xe.sort(function(t,n){return t.__v.__b-n.__v.__b}),xe=[],e.some(function(t){var n,r,o,i,a,s;t.__d&&(a=(i=(n=t).__v).__e,(s=n.__P)&&(r=[],(o=ae({},i)).__v=i.__v+1,it(s,i,o,n.__n,s.ownerSVGElement!==void 0,i.__h!=null?[a]:null,r,a??me(i),i.__h),dn(r,i),i.__e!=a&&sn(i)))})}function cn(e,t,n,r,o,i,a,s,c,d){var l,m,p,v,g,y,w,S=r&&r.__k||on,C=S.length;for(n.__k=[],l=0;l<t.length;l++)if((v=n.__k[l]=(v=t[l])==null||typeof v=="boolean"?null:typeof v=="string"||typeof v=="number"||typeof v=="bigint"?Me(null,v,null,null,v):Array.isArray(v)?Me(pe,{children:v},null,null,null):v.__b>0?Me(v.type,v.props,v.key,null,v.__v):v)!=null){if(v.__=n,v.__b=n.__b+1,(p=S[l])===null||p&&v.key==p.key&&v.type===p.type)S[l]=void 0;else for(m=0;m<C;m++){if((p=S[m])&&v.key==p.key&&v.type===p.type){S[m]=void 0;break}p=null}it(e,v,p=p||Re,o,i,a,s,c,d),g=v.__e,(m=v.ref)&&p.ref!=m&&(w||(w=[]),p.ref&&w.push(p.ref,null,v),w.push(m,v.__c||g,v)),g!=null?(y==null&&(y=g),typeof v.type=="function"&&v.__k===p.__k?v.__d=c=ln(v,c,e):c=un(e,v,p,S,g,c),typeof n.type=="function"&&(n.__d=c)):c&&p.__e==c&&c.parentNode!=e&&(c=me(p))}for(n.__e=y,l=C;l--;)S[l]!=null&&(typeof n.type=="function"&&S[l].__e!=null&&S[l].__e==n.__d&&(n.__d=me(r,l+1)),hn(S[l],S[l]));if(w)for(l=0;l<w.length;l++)fn(w[l],w[++l],w[++l])}function ln(e,t,n){for(var r,o=e.__k,i=0;o&&i<o.length;i++)(r=o[i])&&(r.__=e,t=typeof r.type=="function"?ln(r,t,n):un(n,r,r,o,r.__e,t));return t}function Ne(e,t){return t=t||[],e==null||typeof e=="boolean"||(Array.isArray(e)?e.some(function(n){Ne(n,t)}):t.push(e)),t}function un(e,t,n,r,o,i){var a,s,c;if(t.__d!==void 0)a=t.__d,t.__d=void 0;else if(n==null||o!=i||o.parentNode==null)e:if(i==null||i.parentNode!==e)e.appendChild(o),a=null;else{for(s=i,c=0;(s=s.nextSibling)&&c<r.length;c+=2)if(s==o)break e;e.insertBefore(o,i),a=i}return a!==void 0?a:o.nextSibling}function Vr(e,t,n,r,o){var i;for(i in n)i==="children"||i==="key"||i in t||Te(e,i,null,n[i],r);for(i in t)o&&typeof t[i]!="function"||i==="children"||i==="key"||i==="value"||i==="checked"||n[i]===t[i]||Te(e,i,t[i],n[i],r)}function $t(e,t,n){t[0]==="-"?e.setProperty(t,n):e[t]=n==null?"":typeof n!="number"||Ur.test(t)?n:n+"px"}function Te(e,t,n,r,o){var i;e:if(t==="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||$t(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||$t(e.style,t,n[t])}else if(t[0]==="o"&&t[1]==="n")i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?r||e.addEventListener(t,i?Ct:kt,i):e.removeEventListener(t,i?Ct:kt,i);else if(t!=="dangerouslySetInnerHTML"){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if(t!=="href"&&t!=="list"&&t!=="form"&&t!=="tabIndex"&&t!=="download"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n!=null&&(n!==!1||t[0]==="a"&&t[1]==="r")?e.setAttribute(t,n):e.removeAttribute(t))}}function kt(e){this.l[e.type+!1](z.event?z.event(e):e)}function Ct(e){this.l[e.type+!0](z.event?z.event(e):e)}function it(e,t,n,r,o,i,a,s,c){var d,l,m,p,v,g,y,w,S,C,L,T=t.type;if(t.constructor!==void 0)return null;n.__h!=null&&(c=n.__h,s=t.__e=n.__e,t.__h=null,i=[s]),(d=z.__b)&&d(t);try{e:if(typeof T=="function"){if(w=t.props,S=(d=T.contextType)&&r[d.__c],C=d?S?S.props.value:d.__:r,n.__c?y=(l=t.__c=n.__c).__=l.__E:("prototype"in T&&T.prototype.render?t.__c=l=new T(w,C):(t.__c=l=new ne(w,C),l.constructor=T,l.render=qr),S&&S.sub(l),l.props=w,l.state||(l.state={}),l.context=C,l.__n=r,m=l.__d=!0,l.__h=[]),l.__s==null&&(l.__s=l.state),T.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=ae({},l.__s)),ae(l.__s,T.getDerivedStateFromProps(w,l.__s))),p=l.props,v=l.state,m)T.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(T.getDerivedStateFromProps==null&&w!==p&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(w,C),!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(w,l.__s,C)===!1||t.__v===n.__v){l.props=w,l.state=l.__s,t.__v!==n.__v&&(l.__d=!1),l.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach(function(k){k&&(k.__=t)}),l.__h.length&&a.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(w,l.__s,C),l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(p,v,g)})}l.context=C,l.props=w,l.state=l.__s,(d=z.__r)&&d(t),l.__d=!1,l.__v=t,l.__P=e,d=l.render(l.props,l.state,l.context),l.state=l.__s,l.getChildContext!=null&&(r=ae(ae({},r),l.getChildContext())),m||l.getSnapshotBeforeUpdate==null||(g=l.getSnapshotBeforeUpdate(p,v)),L=d!=null&&d.type===pe&&d.key==null?d.props.children:d,cn(e,Array.isArray(L)?L:[L],t,n,r,o,i,a,s,c),l.base=t.__e,t.__h=null,l.__h.length&&a.push(l),y&&(l.__E=l.__=null),l.__e=!1}else i==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=Wr(n.__e,t,n,r,o,i,a,c);(d=z.diffed)&&d(t)}catch(k){t.__v=null,(c||i!=null)&&(t.__e=s,t.__h=!!c,i[i.indexOf(s)]=null),z.__e(k,t,n)}}function dn(e,t){z.__c&&z.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(r){r.call(n)})}catch(r){z.__e(r,n.__v)}})}function Wr(e,t,n,r,o,i,a,s){var c,d,l,m=n.props,p=t.props,v=t.type,g=0;if(v==="svg"&&(o=!0),i!=null){for(;g<i.length;g++)if((c=i[g])&&"setAttribute"in c==!!v&&(v?c.localName===v:c.nodeType===3)){e=c,i[g]=null;break}}if(e==null){if(v===null)return document.createTextNode(p);e=o?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,p.is&&p),i=null,s=!1}if(v===null)m===p||s&&e.data===p||(e.data=p);else{if(i=i&&Ie.call(e.childNodes),d=(m=n.props||Re).dangerouslySetInnerHTML,l=p.dangerouslySetInnerHTML,!s){if(i!=null)for(m={},g=0;g<e.attributes.length;g++)m[e.attributes[g].name]=e.attributes[g].value;(l||d)&&(l&&(d&&l.__html==d.__html||l.__html===e.innerHTML)||(e.innerHTML=l&&l.__html||""))}if(Vr(e,p,m,o,s),l)t.__k=[];else if(g=t.props.children,cn(e,Array.isArray(g)?g:[g],t,n,r,o&&v!=="foreignObject",i,a,i?i[0]:n.__k&&me(n,0),s),i!=null)for(g=i.length;g--;)i[g]!=null&&an(i[g]);s||("value"in p&&(g=p.value)!==void 0&&(g!==m.value||g!==e.value||v==="progress"&&!g)&&Te(e,"value",g,m.value,!1),"checked"in p&&(g=p.checked)!==void 0&&g!==e.checked&&Te(e,"checked",g,m.checked,!1))}return e}function fn(e,t,n){try{typeof e=="function"?e(t):e.current=t}catch(r){z.__e(r,n)}}function hn(e,t,n){var r,o;if(z.unmount&&z.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||fn(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(i){z.__e(i,t)}r.base=r.__P=null}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&hn(r[o],t,typeof e.type!="function");n||e.__e==null||an(e.__e),e.__e=e.__d=void 0}function qr(e,t,n){return this.constructor(e,n)}function pn(e,t,n){var r,o,i;z.__&&z.__(e,t),o=(r=typeof n=="function")?null:n&&n.__k||t.__k,i=[],it(t,e=(!r&&n||t).__k=Ge(pe,null,[e]),o||Re,Re,t.ownerSVGElement!==void 0,!r&&n?[n]:o?null:t.firstChild?Ie.call(t.childNodes):null,i,!r&&n?n:o?o.__e:t.firstChild,r),dn(i,e)}Ie=on.slice,z={__e:function(e,t){for(var n,r,o;t=t.__;)if((n=t.__c)&&!n.__)try{if((r=n.constructor)&&r.getDerivedStateFromError!=null&&(n.setState(r.getDerivedStateFromError(e)),o=n.__d),n.componentDidCatch!=null&&(n.componentDidCatch(e),o=n.__d),o)return n.__E=n}catch(i){e=i}throw e}},nn=0,ne.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=ae({},this.state),typeof e=="function"&&(e=e(ae({},n),this.props)),e&&ae(n,e),e!=null&&this.__v&&(t&&this.__h.push(t),jt(this))},ne.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),jt(this))},ne.prototype.render=pe,xe=[],rn=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ze.__r=0;var Gr=0;function b(e,t,n,r,o){var i,a,s={};for(a in t)a=="ref"?i=t[a]:s[a]=t[a];var c={type:e,props:s,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--Gr,__source:r,__self:o};if(typeof e=="function"&&(i=e.defaultProps))for(a in i)s[a]===void 0&&(s[a]=i[a]);return z.vnode&&z.vnode(c),c}function Kr(e,t){try{window.localStorage[`emoji-mart.${e}`]=JSON.stringify(t)}catch{}}function Yr(e){try{const t=window.localStorage[`emoji-mart.${e}`];if(t)return JSON.parse(t)}catch{}}var ce={set:Kr,get:Yr};const Be=new Map,Xr=[{v:14,emoji:"🫠"},{v:13.1,emoji:"😶‍🌫️"},{v:13,emoji:"🥸"},{v:12.1,emoji:"🧑‍🦰"},{v:12,emoji:"🥱"},{v:11,emoji:"🥰"},{v:5,emoji:"🤩"},{v:4,emoji:"👱‍♀️"},{v:3,emoji:"🤣"},{v:2,emoji:"👋🏻"},{v:1,emoji:"🙃"}];function Jr(){for(const{v:e,emoji:t}of Xr)if(mn(t))return e}function Zr(){return!mn("🇨🇦")}function mn(e){if(Be.has(e))return Be.get(e);const t=Qr(e);return Be.set(e,t),t}const Qr=(()=>{let e=null;try{navigator.userAgent.includes("jsdom")||(e=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}))}catch{}if(!e)return()=>!1;const t=25,n=20,r=Math.floor(t/2);return e.font=r+"px Arial, Sans-Serif",e.textBaseline="top",e.canvas.width=n*2,e.canvas.height=t,o=>{e.clearRect(0,0,n*2,t),e.fillStyle="#FF0000",e.fillText(o,0,22),e.fillStyle="#0000FF",e.fillText(o,n,22);const i=e.getImageData(0,0,n,t).data,a=i.length;let s=0;for(;s<a&&!i[s+3];s+=4);if(s>=a)return!1;const c=n+s/4%n,d=Math.floor(s/4/n),l=e.getImageData(c,d,1,1).data;return!(i[s]!==l[0]||i[s+2]!==l[2]||e.measureText(o).width>=n)}})();var St={latestVersion:Jr,noCountryFlags:Zr};const Ke=["+1","grinning","kissing_heart","heart_eyes","laughing","stuck_out_tongue_winking_eye","sweat_smile","joy","scream","disappointed","unamused","weary","sob","sunglasses","heart"];let Y=null;function ei(e){Y||(Y=ce.get("frequently")||{});const t=e.id||e;t&&(Y[t]||(Y[t]=0),Y[t]+=1,ce.set("last",t),ce.set("frequently",Y))}function ti({maxFrequentRows:e,perLine:t}){if(!e)return[];Y||(Y=ce.get("frequently"));let n=[];if(!Y){Y={};for(let i in Ke.slice(0,t)){const a=Ke[i];Y[a]=t-i,n.push(a)}return n}const r=e*t,o=ce.get("last");for(let i in Y)n.push(i);if(n.sort((i,a)=>{const s=Y[a],c=Y[i];return s==c?i.localeCompare(a):s-c}),n.length>r){const i=n.slice(r);n=n.slice(0,r);for(let a of i)a!=o&&delete Y[a];o&&n.indexOf(o)==-1&&(delete Y[n[n.length-1]],n.splice(-1,1,o)),ce.set("frequently",Y)}return n}var gn={add:ei,get:ti,DEFAULTS:Ke},vn={};vn=JSON.parse('{"search":"Search","search_no_results_1":"Oh no!","search_no_results_2":"That emoji couldn’t be found","pick":"Pick an emoji…","add_custom":"Add custom emoji","categories":{"activity":"Activity","custom":"Custom","flags":"Flags","foods":"Food & Drink","frequent":"Frequently used","nature":"Animals & Nature","objects":"Objects","people":"Smileys & People","places":"Travel & Places","search":"Search Results","symbols":"Symbols"},"skins":{"1":"Default","2":"Light","3":"Medium-Light","4":"Medium","5":"Medium-Dark","6":"Dark","choose":"Choose default skin tone"}}');var ie={autoFocus:{value:!1},dynamicWidth:{value:!1},emojiButtonColors:{value:null},emojiButtonRadius:{value:"100%"},emojiButtonSize:{value:36},emojiSize:{value:24},emojiVersion:{value:14,choices:[1,2,3,4,5,11,12,12.1,13,13.1,14]},exceptEmojis:{value:[]},icons:{value:"auto",choices:["auto","outline","solid"]},locale:{value:"en",choices:["en","ar","be","cs","de","es","fa","fi","fr","hi","it","ja","kr","nl","pl","pt","ru","sa","tr","uk","vi","zh"]},maxFrequentRows:{value:4},navPosition:{value:"top",choices:["top","bottom","none"]},noCountryFlags:{value:!1},noResultsEmoji:{value:null},perLine:{value:9},previewEmoji:{value:null},previewPosition:{value:"bottom",choices:["top","bottom","none"]},searchPosition:{value:"sticky",choices:["sticky","static","none"]},set:{value:"native",choices:["native","apple","facebook","google","twitter"]},skin:{value:1,choices:[1,2,3,4,5,6]},skinTonePosition:{value:"preview",choices:["preview","search","none"]},theme:{value:"auto",choices:["auto","light","dark"]},categories:null,categoryIcons:null,custom:null,data:null,i18n:null,getImageURL:null,getSpritesheetURL:null,onAddCustomEmoji:null,onClickOutside:null,onEmojiSelect:null,stickySearch:{deprecated:!0,value:!0}};let X=null,P=null;const Fe={};async function Et(e){if(Fe[e])return Fe[e];const n=await(await fetch(e)).json();return Fe[e]=n,n}let Ue=null,bn=null,_n=!1;function Oe(e,{caller:t}={}){return Ue||(Ue=new Promise(n=>{bn=n})),e?ni(e):t&&!_n&&console.warn(`\`${t}\` requires data to be initialized first. Promise will be pending until \`init\` is called.`),Ue}async function ni(e){_n=!0;let{emojiVersion:t,set:n,locale:r}=e;if(t||(t=ie.emojiVersion.value),n||(n=ie.set.value),r||(r=ie.locale.value),P)P.categories=P.categories.filter(c=>!c.name);else{P=(typeof e.data=="function"?await e.data():e.data)||await Et(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/${t}/${n}.json`),P.emoticons={},P.natives={},P.categories.unshift({id:"frequent",emojis:[]});for(const c in P.aliases){const d=P.aliases[c],l=P.emojis[d];l&&(l.aliases||(l.aliases=[]),l.aliases.push(c))}P.originalCategories=P.categories}if(X=(typeof e.i18n=="function"?await e.i18n():e.i18n)||(r=="en"?tn(vn):await Et(`https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/i18n/${r}.json`)),e.custom)for(let c in e.custom){c=parseInt(c);const d=e.custom[c],l=e.custom[c-1];if(!(!d.emojis||!d.emojis.length)){d.id||(d.id=`custom_${c+1}`),d.name||(d.name=X.categories.custom),l&&!d.icon&&(d.target=l.target||l),P.categories.push(d);for(const m of d.emojis)P.emojis[m.id]=m}}e.categories&&(P.categories=P.originalCategories.filter(c=>e.categories.indexOf(c.id)!=-1).sort((c,d)=>{const l=e.categories.indexOf(c.id),m=e.categories.indexOf(d.id);return l-m}));let o=null,i=null;n=="native"&&(o=St.latestVersion(),i=e.noCountryFlags||St.noCountryFlags());let a=P.categories.length,s=!1;for(;a--;){const c=P.categories[a];if(c.id=="frequent"){let{maxFrequentRows:m,perLine:p}=e;m=m>=0?m:ie.maxFrequentRows.value,p||(p=ie.perLine.value),c.emojis=gn.get({maxFrequentRows:m,perLine:p})}if(!c.emojis||!c.emojis.length){P.categories.splice(a,1);continue}const{categoryIcons:d}=e;if(d){const m=d[c.id];m&&!c.icon&&(c.icon=m)}let l=c.emojis.length;for(;l--;){const m=c.emojis[l],p=m.id?m:P.emojis[m],v=()=>{c.emojis.splice(l,1)};if(!p||e.exceptEmojis&&e.exceptEmojis.includes(p.id)){v();continue}if(o&&p.version>o){v();continue}if(i&&c.id=="flags"&&!si.includes(p.id)){v();continue}if(!p.search){if(s=!0,p.search=","+[[p.id,!1],[p.name,!0],[p.keywords,!1],[p.emoticons,!1]].map(([y,w])=>{if(y)return(Array.isArray(y)?y:[y]).map(S=>(w?S.split(/[-|_|\s]+/):[S]).map(C=>C.toLowerCase())).flat()}).flat().filter(y=>y&&y.trim()).join(","),p.emoticons)for(const y of p.emoticons)P.emoticons[y]||(P.emoticons[y]=p.id);let g=0;for(const y of p.skins){if(!y)continue;g++;const{native:w}=y;w&&(P.natives[w]=p.id,p.search+=`,${w}`);const S=g==1?"":`:skin-tone-${g}:`;y.shortcodes=`:${p.id}:${S}`}}}}s&&fe.reset(),bn()}function xn(e,t,n){e||(e={});const r={};for(let o in t)r[o]=yn(o,e,t,n);return r}function yn(e,t,n,r){const o=n[e];let i=r&&r.getAttribute(e)||(t[e]!=null&&t[e]!=null?t[e]:null);return o&&(i!=null&&o.value&&typeof o.value!=typeof i&&(typeof o.value=="boolean"?i=i!="false":i=o.value.constructor(i)),o.transform&&i&&(i=o.transform(i)),(i==null||o.choices&&o.choices.indexOf(i)==-1)&&(i=o.value)),i}const ri=/^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;let Ye=null;function ii(e){return e.id?e:P.emojis[e]||P.emojis[P.aliases[e]]||P.emojis[P.natives[e]]}function oi(){Ye=null}async function ai(e,{maxResults:t,caller:n}={}){if(!e||!e.trim().length)return null;t||(t=90),await Oe(null,{caller:n||"SearchIndex.search"});const r=e.toLowerCase().replace(/(\w)-/,"$1 ").split(/[\s|,]+/).filter((s,c,d)=>s.trim()&&d.indexOf(s)==c);if(!r.length)return;let o=Ye||(Ye=Object.values(P.emojis)),i,a;for(const s of r){if(!o.length)break;i=[],a={};for(const c of o){if(!c.search)continue;const d=c.search.indexOf(`,${s}`);d!=-1&&(i.push(c),a[c.id]||(a[c.id]=0),a[c.id]+=c.id==s?0:d+1)}o=i}return i.length<2||(i.sort((s,c)=>{const d=a[s.id],l=a[c.id];return d==l?s.id.localeCompare(c.id):d-l}),i.length>t&&(i=i.slice(0,t))),i}var fe={search:ai,get:ii,reset:oi,SHORTCODES_REGEX:ri};const si=["checkered_flag","crossed_flags","pirate_flag","rainbow-flag","transgender_flag","triangular_flag_on_post","waving_black_flag","waving_white_flag"];function ci(e,t){return Array.isArray(e)&&Array.isArray(t)&&e.length===t.length&&e.every((n,r)=>n==t[r])}async function li(e=1){for(let t in[...Array(e).keys()])await new Promise(requestAnimationFrame)}function ui(e,{skinIndex:t=0}={}){const n=e.skins[t]||(t=0,e.skins[t]),r={id:e.id,name:e.name,native:n.native,unified:n.unified,keywords:e.keywords,shortcodes:n.shortcodes||e.shortcodes};return e.skins.length>1&&(r.skin=t+1),n.src&&(r.src=n.src),e.aliases&&e.aliases.length&&(r.aliases=e.aliases),e.emoticons&&e.emoticons.length&&(r.emoticons=e.emoticons),r}const di={activity:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:b("path",{d:"M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113"})}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M16.17 337.5c0 44.98 7.565 83.54 13.98 107.9C35.22 464.3 50.46 496 174.9 496c9.566 0 19.59-.4707 29.84-1.271L17.33 307.3C16.53 317.6 16.17 327.7 16.17 337.5zM495.8 174.5c0-44.98-7.565-83.53-13.98-107.9c-4.688-17.54-18.34-31.23-36.04-35.95C435.5 27.91 392.9 16 337 16c-9.564 0-19.59 .4707-29.84 1.271l187.5 187.5C495.5 194.4 495.8 184.3 495.8 174.5zM26.77 248.8l236.3 236.3c142-36.1 203.9-150.4 222.2-221.1L248.9 26.87C106.9 62.96 45.07 177.2 26.77 248.8zM256 335.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L164.7 283.3C161.6 280.2 160 276.1 160 271.1c0-8.529 6.865-16 16-16c4.095 0 8.189 1.562 11.31 4.688l64.01 64C254.4 327.8 256 331.9 256 335.1zM304 287.1c0 9.141-7.474 16-16 16c-4.094 0-8.188-1.564-11.31-4.689L212.7 235.3C209.6 232.2 208 228.1 208 223.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01C302.5 279.8 304 283.9 304 287.1zM256 175.1c0-9.141 7.473-16 16-16c4.094 0 8.188 1.562 11.31 4.688l64.01 64.01c3.125 3.125 4.688 7.219 4.688 11.31c0 9.133-7.468 16-16 16c-4.094 0-8.189-1.562-11.31-4.688l-64.01-64.01C257.6 184.2 256 180.1 256 175.1z"})})},custom:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:b("path",{d:"M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z"})}),flags:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:b("path",{d:"M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"})}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"})})},foods:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:b("path",{d:"M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9"})}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M481.9 270.1C490.9 279.1 496 291.3 496 304C496 316.7 490.9 328.9 481.9 337.9C472.9 346.9 460.7 352 448 352H64C51.27 352 39.06 346.9 30.06 337.9C21.06 328.9 16 316.7 16 304C16 291.3 21.06 279.1 30.06 270.1C39.06 261.1 51.27 256 64 256H448C460.7 256 472.9 261.1 481.9 270.1zM475.3 388.7C478.3 391.7 480 395.8 480 400V416C480 432.1 473.3 449.3 461.3 461.3C449.3 473.3 432.1 480 416 480H96C79.03 480 62.75 473.3 50.75 461.3C38.74 449.3 32 432.1 32 416V400C32 395.8 33.69 391.7 36.69 388.7C39.69 385.7 43.76 384 48 384H464C468.2 384 472.3 385.7 475.3 388.7zM50.39 220.8C45.93 218.6 42.03 215.5 38.97 211.6C35.91 207.7 33.79 203.2 32.75 198.4C31.71 193.5 31.8 188.5 32.99 183.7C54.98 97.02 146.5 32 256 32C365.5 32 457 97.02 479 183.7C480.2 188.5 480.3 193.5 479.2 198.4C478.2 203.2 476.1 207.7 473 211.6C469.1 215.5 466.1 218.6 461.6 220.8C457.2 222.9 452.3 224 447.3 224H64.67C59.73 224 54.84 222.9 50.39 220.8zM372.7 116.7C369.7 119.7 368 123.8 368 128C368 131.2 368.9 134.3 370.7 136.9C372.5 139.5 374.1 141.6 377.9 142.8C380.8 143.1 384 144.3 387.1 143.7C390.2 143.1 393.1 141.6 395.3 139.3C397.6 137.1 399.1 134.2 399.7 131.1C400.3 128 399.1 124.8 398.8 121.9C397.6 118.1 395.5 116.5 392.9 114.7C390.3 112.9 387.2 111.1 384 111.1C379.8 111.1 375.7 113.7 372.7 116.7V116.7zM244.7 84.69C241.7 87.69 240 91.76 240 96C240 99.16 240.9 102.3 242.7 104.9C244.5 107.5 246.1 109.6 249.9 110.8C252.8 111.1 256 112.3 259.1 111.7C262.2 111.1 265.1 109.6 267.3 107.3C269.6 105.1 271.1 102.2 271.7 99.12C272.3 96.02 271.1 92.8 270.8 89.88C269.6 86.95 267.5 84.45 264.9 82.7C262.3 80.94 259.2 79.1 256 79.1C251.8 79.1 247.7 81.69 244.7 84.69V84.69zM116.7 116.7C113.7 119.7 112 123.8 112 128C112 131.2 112.9 134.3 114.7 136.9C116.5 139.5 118.1 141.6 121.9 142.8C124.8 143.1 128 144.3 131.1 143.7C134.2 143.1 137.1 141.6 139.3 139.3C141.6 137.1 143.1 134.2 143.7 131.1C144.3 128 143.1 124.8 142.8 121.9C141.6 118.1 139.5 116.5 136.9 114.7C134.3 112.9 131.2 111.1 128 111.1C123.8 111.1 119.7 113.7 116.7 116.7L116.7 116.7z"})})},frequent:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[b("path",{d:"M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z"}),b("path",{d:"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"})]}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"})})},nature:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[b("path",{d:"M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8"}),b("path",{d:"M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235"})]}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",children:b("path",{d:"M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"})})},objects:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[b("path",{d:"M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z"}),b("path",{d:"M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789"})]}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",children:b("path",{d:"M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"})})},people:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[b("path",{d:"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"}),b("path",{d:"M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0"})]}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 432C332.1 432 396.2 382 415.2 314.1C419.1 300.4 407.8 288 393.6 288H118.4C104.2 288 92.92 300.4 96.76 314.1C115.8 382 179.9 432 256 432V432zM176.4 160C158.7 160 144.4 174.3 144.4 192C144.4 209.7 158.7 224 176.4 224C194 224 208.4 209.7 208.4 192C208.4 174.3 194 160 176.4 160zM336.4 224C354 224 368.4 209.7 368.4 192C368.4 174.3 354 160 336.4 160C318.7 160 304.4 174.3 304.4 192C304.4 209.7 318.7 224 336.4 224z"})})},places:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[b("path",{d:"M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5"}),b("path",{d:"M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z"})]}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z"})})},symbols:{outline:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:b("path",{d:"M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76"})}),solid:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:b("path",{d:"M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"})})}},fi={loupe:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:b("path",{d:"M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"})}),delete:b("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:b("path",{d:"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"})})};var Ae={categories:di,search:fi};function Xe(e){let{id:t,skin:n,emoji:r}=e;if(e.shortcodes){const s=e.shortcodes.match(fe.SHORTCODES_REGEX);s&&(t=s[1],s[2]&&(n=s[2]))}if(r||(r=fe.get(t||e.native)),!r)return e.fallback;const o=r.skins[n-1]||r.skins[0],i=o.src||(e.set!="native"&&!e.spritesheet?typeof e.getImageURL=="function"?e.getImageURL(e.set,o.unified):`https://cdn.jsdelivr.net/npm/emoji-datasource-${e.set}@14.0.0/img/${e.set}/64/${o.unified}.png`:void 0),a=typeof e.getSpritesheetURL=="function"?e.getSpritesheetURL(e.set):`https://cdn.jsdelivr.net/npm/emoji-datasource-${e.set}@14.0.0/img/${e.set}/sheets-256/64.png`;return b("span",{class:"emoji-mart-emoji","data-emoji-set":e.set,children:i?b("img",{style:{maxWidth:e.size||"1em",maxHeight:e.size||"1em",display:"inline-block"},alt:o.native||o.shortcodes,src:i}):e.set=="native"?b("span",{style:{fontSize:e.size,fontFamily:'"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'},children:o.native}):b("span",{style:{display:"block",width:e.size,height:e.size,backgroundImage:`url(${a})`,backgroundSize:`${100*P.sheet.cols}% ${100*P.sheet.rows}%`,backgroundPosition:`${100/(P.sheet.cols-1)*o.x}% ${100/(P.sheet.rows-1)*o.y}%`}})})}const hi=typeof window<"u"&&window.HTMLElement?window.HTMLElement:Object;class wn extends hi{static get observedAttributes(){return Object.keys(this.Props)}update(t={}){for(let n in t)this.attributeChangedCallback(n,null,t[n])}attributeChangedCallback(t,n,r){if(!this.component)return;const o=yn(t,{[t]:r},this.constructor.Props,this);this.component.componentWillReceiveProps?this.component.componentWillReceiveProps({[t]:o}):(this.component.props[t]=o,this.component.forceUpdate())}disconnectedCallback(){this.disconnected=!0,this.component&&this.component.unregister&&this.component.unregister()}constructor(t={}){if(super(),this.props=t,t.parent||t.ref){let n=null;const r=t.parent||(n=t.ref&&t.ref.current);n&&(n.innerHTML=""),r&&r.appendChild(this)}}}class pi extends wn{setShadow(){this.attachShadow({mode:"open"})}injectStyles(t){if(!t)return;const n=document.createElement("style");n.textContent=t,this.shadowRoot.insertBefore(n,this.shadowRoot.firstChild)}constructor(t,{styles:n}={}){super(t),this.setShadow(),this.injectStyles(n)}}var jn={fallback:"",id:"",native:"",shortcodes:"",size:{value:"",transform:e=>/\D/.test(e)?e:`${e}px`},set:ie.set,skin:ie.skin};class $n extends wn{async connectedCallback(){const t=xn(this.props,jn,this);t.element=this,t.ref=n=>{this.component=n},await Oe(),!this.disconnected&&pn(b(Xe,{...t}),this)}constructor(t){super(t)}}Z($n,"Props",jn);typeof customElements<"u"&&!customElements.get("em-emoji")&&customElements.define("em-emoji",$n);var Mt,Je=[],Lt=z.__b,Rt=z.__r,zt=z.diffed,Nt=z.__c,Tt=z.unmount;function mi(){var e;for(Je.sort(function(t,n){return t.__v.__b-n.__v.__b});e=Je.pop();)if(e.__P)try{e.__H.__h.forEach(Le),e.__H.__h.forEach(Ze),e.__H.__h=[]}catch(t){e.__H.__h=[],z.__e(t,e.__v)}}z.__b=function(e){Lt&&Lt(e)},z.__r=function(e){Rt&&Rt(e);var t=e.__c.__H;t&&(t.__h.forEach(Le),t.__h.forEach(Ze),t.__h=[])},z.diffed=function(e){zt&&zt(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(Je.push(t)!==1&&Mt===z.requestAnimationFrame||((Mt=z.requestAnimationFrame)||function(n){var r,o=function(){clearTimeout(i),At&&cancelAnimationFrame(r),setTimeout(n)},i=setTimeout(o,100);At&&(r=requestAnimationFrame(o))})(mi))},z.__c=function(e,t){t.some(function(n){try{n.__h.forEach(Le),n.__h=n.__h.filter(function(r){return!r.__||Ze(r)})}catch(r){t.some(function(o){o.__h&&(o.__h=[])}),t=[],z.__e(r,n.__v)}}),Nt&&Nt(e,t)},z.unmount=function(e){Tt&&Tt(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(r){try{Le(r)}catch(o){t=o}}),t&&z.__e(t,n.__v))};var At=typeof requestAnimationFrame=="function";function Le(e){var t=e.__c;typeof t=="function"&&(e.__c=void 0,t())}function Ze(e){e.__c=e.__()}function gi(e,t){for(var n in t)e[n]=t[n];return e}function Pt(e,t){for(var n in e)if(n!=="__source"&&!(n in t))return!0;for(var r in t)if(r!=="__source"&&e[r]!==t[r])return!0;return!1}function Pe(e){this.props=e}(Pe.prototype=new ne).isPureReactComponent=!0,Pe.prototype.shouldComponentUpdate=function(e,t){return Pt(this.props,e)||Pt(this.state,t)};var Dt=z.__b;z.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),Dt&&Dt(e)};var vi=z.__e;z.__e=function(e,t,n){if(e.then){for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return t.__e==null&&(t.__e=n.__e,t.__k=n.__k),r.__c(e,t)}vi(e,t,n)};var It=z.unmount;function Ve(){this.__u=0,this.t=null,this.__b=null}function kn(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function $e(){this.u=null,this.o=null}z.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&e.__h===!0&&(e.type=null),It&&It(e)},(Ve.prototype=new ne).__c=function(e,t){var n=t.__c,r=this;r.t==null&&(r.t=[]),r.t.push(n);var o=kn(r.__v),i=!1,a=function(){i||(i=!0,n.__R=null,o?o(s):s())};n.__R=a;var s=function(){if(!--r.__u){if(r.state.__e){var d=r.state.__e;r.__v.__k[0]=function m(p,v,g){return p&&(p.__v=null,p.__k=p.__k&&p.__k.map(function(y){return m(y,v,g)}),p.__c&&p.__c.__P===v&&(p.__e&&g.insertBefore(p.__e,p.__d),p.__c.__e=!0,p.__c.__P=g)),p}(d,d.__c.__P,d.__c.__O)}var l;for(r.setState({__e:r.__b=null});l=r.t.pop();)l.forceUpdate()}},c=t.__h===!0;r.__u++||c||r.setState({__e:r.__b=r.__v.__k[0]}),e.then(a,a)},Ve.prototype.componentWillUnmount=function(){this.t=[]},Ve.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function i(a,s,c){return a&&(a.__c&&a.__c.__H&&(a.__c.__H.__.forEach(function(d){typeof d.__c=="function"&&d.__c()}),a.__c.__H=null),(a=gi({},a)).__c!=null&&(a.__c.__P===c&&(a.__c.__P=s),a.__c=null),a.__k=a.__k&&a.__k.map(function(d){return i(d,s,c)})),a}(this.__b,n,r.__O=r.__P)}this.__b=null}var o=t.__e&&Ge(pe,null,e.fallback);return o&&(o.__h=null),[Ge(pe,null,t.__e?null:e.children),o]};var Ot=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};($e.prototype=new ne).__e=function(e){var t=this,n=kn(t.__v),r=t.o.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),Ot(t,e,r)):o()};n?n(i):i()}},$e.prototype.render=function(e){this.u=null,this.o=new Map;var t=Ne(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},$e.prototype.componentDidUpdate=$e.prototype.componentDidMount=function(){var e=this;this.o.forEach(function(t,n){Ot(e,n,t)})};var bi=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,_i=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,xi=typeof document<"u",yi=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/i:/fil|che|ra/i).test(e)};ne.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(ne.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var Ht=z.event;function wi(){}function ji(){return this.cancelBubble}function $i(){return this.defaultPrevented}z.event=function(e){return Ht&&(e=Ht(e)),e.persist=wi,e.isPropagationStopped=ji,e.isDefaultPrevented=$i,e.nativeEvent=e};var Bt={configurable:!0,get:function(){return this.class}},Ft=z.vnode;z.vnode=function(e){var t=e.type,n=e.props,r=n;if(typeof t=="string"){var o=t.indexOf("-")===-1;for(var i in r={},n){var a=n[i];xi&&i==="children"&&t==="noscript"||i==="value"&&"defaultValue"in n&&a==null||(i==="defaultValue"&&"value"in n&&n.value==null?i="value":i==="download"&&a===!0?a="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+t)&&!yi(n.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp)/.test(i)?i=i.toLowerCase():o&&_i.test(i)?i=i.replace(/[A-Z0-9]/,"-$&").toLowerCase():a===null&&(a=void 0),r[i]=a)}t=="select"&&r.multiple&&Array.isArray(r.value)&&(r.value=Ne(n.children).forEach(function(s){s.props.selected=r.value.indexOf(s.props.value)!=-1})),t=="select"&&r.defaultValue!=null&&(r.value=Ne(n.children).forEach(function(s){s.props.selected=r.multiple?r.defaultValue.indexOf(s.props.value)!=-1:r.defaultValue==s.props.value})),e.props=r,n.class!=n.className&&(Bt.enumerable="className"in n,n.className!=null&&(r.class=n.className),Object.defineProperty(r,"className",Bt))}e.$$typeof=bi,Ft&&Ft(e)};var Ut=z.__r;z.__r=function(e){Ut&&Ut(e),e.__c};const ki={light:"outline",dark:"solid"};class Ci extends Pe{renderIcon(t){const{icon:n}=t;if(n){if(n.svg)return b("span",{class:"flex",dangerouslySetInnerHTML:{__html:n.svg}});if(n.src)return b("img",{src:n.src})}const r=Ae.categories[t.id]||Ae.categories.custom,o=this.props.icons=="auto"?ki[this.props.theme]:this.props.icons;return r[o]||r}render(){let t=null;return b("nav",{id:"nav",class:"padding","data-position":this.props.position,dir:this.props.dir,children:b("div",{class:"flex relative",children:[this.categories.map((n,r)=>{const o=n.name||X.categories[n.id],i=!this.props.unfocused&&n.id==this.state.categoryId;return i&&(t=r),b("button",{"aria-label":o,"aria-selected":i||void 0,title:o,type:"button",class:"flex flex-grow flex-center",onMouseDown:a=>a.preventDefault(),onClick:()=>{this.props.onClick({category:n,i:r})},children:this.renderIcon(n)})}),b("div",{class:"bar",style:{width:`${100/this.categories.length}%`,opacity:t==null?0:1,transform:this.props.dir==="rtl"?`scaleX(-1) translateX(${t*100}%)`:`translateX(${t*100}%)`}})]})})}constructor(){super(),this.categories=P.categories.filter(t=>!t.target),this.state={categoryId:this.categories[0].id}}}class Si extends Pe{shouldComponentUpdate(t){for(let n in t)if(n!="children"&&t[n]!=this.props[n])return!0;return!1}render(){return this.props.children}}const ke={rowsPerRender:10};class Ei extends ne{getInitialState(t=this.props){return{skin:ce.get("skin")||t.skin,theme:this.initTheme(t.theme)}}componentWillMount(){this.dir=X.rtl?"rtl":"ltr",this.refs={menu:re(),navigation:re(),scroll:re(),search:re(),searchInput:re(),skinToneButton:re(),skinToneRadio:re()},this.initGrid(),this.props.stickySearch==!1&&this.props.searchPosition=="sticky"&&(console.warn("[EmojiMart] Deprecation warning: `stickySearch` has been renamed `searchPosition`."),this.props.searchPosition="static")}componentDidMount(){if(this.register(),this.shadowRoot=this.base.parentNode,this.props.autoFocus){const{searchInput:t}=this.refs;t.current&&t.current.focus()}}componentWillReceiveProps(t){this.nextState||(this.nextState={});for(const n in t)this.nextState[n]=t[n];clearTimeout(this.nextStateTimer),this.nextStateTimer=setTimeout(()=>{let n=!1;for(const o in this.nextState)this.props[o]=this.nextState[o],(o==="custom"||o==="categories")&&(n=!0);delete this.nextState;const r=this.getInitialState();if(n)return this.reset(r);this.setState(r)})}componentWillUnmount(){this.unregister()}async reset(t={}){await Oe(this.props),this.initGrid(),this.unobserve(),this.setState(t,()=>{this.observeCategories(),this.observeRows()})}register(){document.addEventListener("click",this.handleClickOutside),this.observe()}unregister(){document.removeEventListener("click",this.handleClickOutside),this.unobserve()}observe(){this.observeCategories(),this.observeRows()}unobserve({except:t=[]}={}){Array.isArray(t)||(t=[t]);for(const n of this.observers)t.includes(n)||n.disconnect();this.observers=[].concat(t)}initGrid(){const{categories:t}=P;this.refs.categories=new Map;const n=P.categories.map(o=>o.id).join(",");this.navKey&&this.navKey!=n&&this.refs.scroll.current&&(this.refs.scroll.current.scrollTop=0),this.navKey=n,this.grid=[],this.grid.setsize=0;const r=(o,i)=>{const a=[];a.__categoryId=i.id,a.__index=o.length,this.grid.push(a);const s=this.grid.length-1,c=s%ke.rowsPerRender?{}:re();return c.index=s,c.posinset=this.grid.setsize+1,o.push(c),a};for(let o of t){const i=[];let a=r(i,o);for(let s of o.emojis)a.length==this.getPerLine()&&(a=r(i,o)),this.grid.setsize+=1,a.push(s);this.refs.categories.set(o.id,{root:re(),rows:i})}}initTheme(t){if(t!="auto")return t;if(!this.darkMedia){if(this.darkMedia=matchMedia("(prefers-color-scheme: dark)"),this.darkMedia.media.match(/^not/))return"light";this.darkMedia.addListener(()=>{this.props.theme=="auto"&&this.setState({theme:this.darkMedia.matches?"dark":"light"})})}return this.darkMedia.matches?"dark":"light"}initDynamicPerLine(t=this.props){if(!t.dynamicWidth)return;const{element:n,emojiButtonSize:r}=t,o=()=>{const{width:a}=n.getBoundingClientRect();return Math.floor(a/r)},i=new ResizeObserver(()=>{this.unobserve({except:i}),this.setState({perLine:o()},()=>{this.initGrid(),this.forceUpdate(()=>{this.observeCategories(),this.observeRows()})})});return i.observe(n),this.observers.push(i),o()}getPerLine(){return this.state.perLine||this.props.perLine}getEmojiByPos([t,n]){const r=this.state.searchResults||this.grid,o=r[t]&&r[t][n];if(o)return fe.get(o)}observeCategories(){const t=this.refs.navigation.current;if(!t)return;const n=new Map,r=a=>{a!=t.state.categoryId&&t.setState({categoryId:a})},o={root:this.refs.scroll.current,threshold:[0,1]},i=new IntersectionObserver(a=>{for(const c of a){const d=c.target.dataset.id;n.set(d,c.intersectionRatio)}const s=[...n];for(const[c,d]of s)if(d){r(c);break}},o);for(const{root:a}of this.refs.categories.values())i.observe(a.current);this.observers.push(i)}observeRows(){const t={...this.state.visibleRows},n=new IntersectionObserver(r=>{for(const o of r){const i=parseInt(o.target.dataset.index);o.isIntersecting?t[i]=!0:delete t[i]}this.setState({visibleRows:t})},{root:this.refs.scroll.current,rootMargin:`${this.props.emojiButtonSize*(ke.rowsPerRender+5)}px 0px ${this.props.emojiButtonSize*ke.rowsPerRender}px`});for(const{rows:r}of this.refs.categories.values())for(const o of r)o.current&&n.observe(o.current);this.observers.push(n)}preventDefault(t){t.preventDefault()}unfocusSearch(){const t=this.refs.searchInput.current;t&&t.blur()}navigate({e:t,input:n,left:r,right:o,up:i,down:a}){const s=this.state.searchResults||this.grid;if(!s.length)return;let[c,d]=this.state.pos;const l=(()=>{if(c==0&&d==0&&!t.repeat&&(r||i))return null;if(c==-1)return!t.repeat&&(o||a)&&n.selectionStart==n.value.length?[0,0]:null;if(r||o){let m=s[c];const p=r?-1:1;if(d+=p,!m[d]){if(c+=p,m=s[c],!m)return c=r?0:s.length-1,d=r?0:s[c].length-1,[c,d];d=r?m.length-1:0}return[c,d]}if(i||a){c+=i?-1:1;const m=s[c];return m?(m[d]||(d=m.length-1),[c,d]):(c=i?0:s.length-1,d=i?0:s[c].length-1,[c,d])}})();if(l)t.preventDefault();else{this.state.pos[0]>-1&&this.setState({pos:[-1,-1]});return}this.setState({pos:l,keyboard:!0},()=>{this.scrollTo({row:l[0]})})}scrollTo({categoryId:t,row:n}){const r=this.state.searchResults||this.grid;if(!r.length)return;const o=this.refs.scroll.current,i=o.getBoundingClientRect();let a=0;if(n>=0&&(t=r[n].__categoryId),t&&(a=(this.refs[t]||this.refs.categories.get(t).root).current.getBoundingClientRect().top-(i.top-o.scrollTop)+1),n>=0)if(!n)a=0;else{const s=r[n].__index,c=a+s*this.props.emojiButtonSize,d=c+this.props.emojiButtonSize+this.props.emojiButtonSize*.88;if(c<o.scrollTop)a=c;else if(d>o.scrollTop+i.height)a=d-i.height;else return}this.ignoreMouse(),o.scrollTop=a}ignoreMouse(){this.mouseIsIgnored=!0,clearTimeout(this.ignoreMouseTimer),this.ignoreMouseTimer=setTimeout(()=>{delete this.mouseIsIgnored},100)}handleEmojiOver(t){this.mouseIsIgnored||this.state.showSkins||this.setState({pos:t||[-1,-1],keyboard:!1})}handleEmojiClick({e:t,emoji:n,pos:r}){if(this.props.onEmojiSelect&&(!n&&r&&(n=this.getEmojiByPos(r)),n)){const o=ui(n,{skinIndex:this.state.skin-1});this.props.maxFrequentRows&&gn.add(o,this.props),this.props.onEmojiSelect(o,t)}}closeSkins(){this.state.showSkins&&(this.setState({showSkins:null,tempSkin:null}),this.base.removeEventListener("click",this.handleBaseClick),this.base.removeEventListener("keydown",this.handleBaseKeydown))}handleSkinMouseOver(t){this.setState({tempSkin:t})}handleSkinClick(t){this.ignoreMouse(),this.closeSkins(),this.setState({skin:t,tempSkin:null}),ce.set("skin",t)}renderNav(){return b(Ci,{ref:this.refs.navigation,icons:this.props.icons,theme:this.state.theme,dir:this.dir,unfocused:!!this.state.searchResults,position:this.props.navPosition,onClick:this.handleCategoryClick},this.navKey)}renderPreview(){const t=this.getEmojiByPos(this.state.pos),n=this.state.searchResults&&!this.state.searchResults.length;return b("div",{id:"preview",class:"flex flex-middle",dir:this.dir,"data-position":this.props.previewPosition,children:[b("div",{class:"flex flex-middle flex-grow",children:[b("div",{class:"flex flex-auto flex-middle flex-center",style:{height:this.props.emojiButtonSize,fontSize:this.props.emojiButtonSize},children:b(Xe,{emoji:t,id:n?this.props.noResultsEmoji||"cry":this.props.previewEmoji||(this.props.previewPosition=="top"?"point_down":"point_up"),set:this.props.set,size:this.props.emojiButtonSize,skin:this.state.tempSkin||this.state.skin,spritesheet:!0,getSpritesheetURL:this.props.getSpritesheetURL})}),b("div",{class:`margin-${this.dir[0]}`,children:t||n?b("div",{class:`padding-${this.dir[2]} align-${this.dir[0]}`,children:[b("div",{class:"preview-title ellipsis",children:t?t.name:X.search_no_results_1}),b("div",{class:"preview-subtitle ellipsis color-c",children:t?t.skins[0].shortcodes:X.search_no_results_2})]}):b("div",{class:"preview-placeholder color-c",children:X.pick})})]}),!t&&this.props.skinTonePosition=="preview"&&this.renderSkinToneButton()]})}renderEmojiButton(t,{pos:n,posinset:r,grid:o}){const i=this.props.emojiButtonSize,a=this.state.tempSkin||this.state.skin,c=(t.skins[a-1]||t.skins[0]).native,d=ci(this.state.pos,n),l=n.concat(t.id).join("");return b(Si,{selected:d,skin:a,size:i,children:b("button",{"aria-label":c,"aria-selected":d||void 0,"aria-posinset":r,"aria-setsize":o.setsize,"data-keyboard":this.state.keyboard,title:this.props.previewPosition=="none"?t.name:void 0,type:"button",class:"flex flex-center flex-middle",tabindex:"-1",onClick:m=>this.handleEmojiClick({e:m,emoji:t}),onMouseEnter:()=>this.handleEmojiOver(n),onMouseLeave:()=>this.handleEmojiOver(),style:{width:this.props.emojiButtonSize,height:this.props.emojiButtonSize,fontSize:this.props.emojiSize,lineHeight:0},children:[b("div",{"aria-hidden":"true",class:"background",style:{borderRadius:this.props.emojiButtonRadius,backgroundColor:this.props.emojiButtonColors?this.props.emojiButtonColors[(r-1)%this.props.emojiButtonColors.length]:void 0}}),b(Xe,{emoji:t,set:this.props.set,size:this.props.emojiSize,skin:a,spritesheet:!0,getSpritesheetURL:this.props.getSpritesheetURL})]})},l)}renderSearch(){const t=this.props.previewPosition=="none"||this.props.skinTonePosition=="search";return b("div",{children:[b("div",{class:"spacer"}),b("div",{class:"flex flex-middle",children:[b("div",{class:"search relative flex-grow",children:[b("input",{type:"search",ref:this.refs.searchInput,placeholder:X.search,onClick:this.handleSearchClick,onInput:this.handleSearchInput,onKeyDown:this.handleSearchKeyDown,autoComplete:"off"}),b("span",{class:"icon loupe flex",children:Ae.search.loupe}),this.state.searchResults&&b("button",{title:"Clear","aria-label":"Clear",type:"button",class:"icon delete flex",onClick:this.clearSearch,onMouseDown:this.preventDefault,children:Ae.search.delete})]}),t&&this.renderSkinToneButton()]})]})}renderSearchResults(){const{searchResults:t}=this.state;return t?b("div",{class:"category",ref:this.refs.search,children:[b("div",{class:`sticky padding-small align-${this.dir[0]}`,children:X.categories.search}),b("div",{children:t.length?t.map((n,r)=>b("div",{class:"flex",children:n.map((o,i)=>this.renderEmojiButton(o,{pos:[r,i],posinset:r*this.props.perLine+i+1,grid:t}))})):b("div",{class:`padding-small align-${this.dir[0]}`,children:this.props.onAddCustomEmoji&&b("a",{onClick:this.props.onAddCustomEmoji,children:X.add_custom})})})]}):null}renderCategories(){const{categories:t}=P,n=!!this.state.searchResults,r=this.getPerLine();return b("div",{style:{visibility:n?"hidden":void 0,display:n?"none":void 0,height:"100%"},children:t.map(o=>{const{root:i,rows:a}=this.refs.categories.get(o.id);return b("div",{"data-id":o.target?o.target.id:o.id,class:"category",ref:i,children:[b("div",{class:`sticky padding-small align-${this.dir[0]}`,children:o.name||X.categories[o.id]}),b("div",{class:"relative",style:{height:a.length*this.props.emojiButtonSize},children:a.map((s,c)=>{const d=s.index-s.index%ke.rowsPerRender,l=this.state.visibleRows[d],m="current"in s?s:void 0;if(!l&&!m)return null;const p=c*r,v=p+r,g=o.emojis.slice(p,v);return g.length<r&&g.push(...new Array(r-g.length)),b("div",{"data-index":s.index,ref:m,class:"flex row",style:{top:c*this.props.emojiButtonSize},children:l&&g.map((y,w)=>{if(!y)return b("div",{style:{width:this.props.emojiButtonSize,height:this.props.emojiButtonSize}});const S=fe.get(y);return this.renderEmojiButton(S,{pos:[s.index,w],posinset:s.posinset+w,grid:this.grid})})},s.index)})})]})})})}renderSkinToneButton(){return this.props.skinTonePosition=="none"?null:b("div",{class:"flex flex-auto flex-center flex-middle",style:{position:"relative",width:this.props.emojiButtonSize,height:this.props.emojiButtonSize},children:b("button",{type:"button",ref:this.refs.skinToneButton,class:"skin-tone-button flex flex-auto flex-center flex-middle","aria-selected":this.state.showSkins?"":void 0,"aria-label":X.skins.choose,title:X.skins.choose,onClick:this.openSkins,style:{width:this.props.emojiSize,height:this.props.emojiSize},children:b("span",{class:`skin-tone skin-tone-${this.state.skin}`})})})}renderLiveRegion(){const t=this.getEmojiByPos(this.state.pos),n=t?t.name:"";return b("div",{"aria-live":"polite",class:"sr-only",children:n})}renderSkins(){const n=this.refs.skinToneButton.current.getBoundingClientRect(),r=this.base.getBoundingClientRect(),o={};return this.dir=="ltr"?o.right=r.right-n.right-3:o.left=n.left-r.left-3,this.props.previewPosition=="bottom"&&this.props.skinTonePosition=="preview"?o.bottom=r.bottom-n.top+6:(o.top=n.bottom-r.top+3,o.bottom="auto"),b("div",{ref:this.refs.menu,role:"radiogroup",dir:this.dir,"aria-label":X.skins.choose,class:"menu hidden","data-position":o.top?"top":"bottom",style:o,children:[...Array(6).keys()].map(i=>{const a=i+1,s=this.state.skin==a;return b("div",{children:[b("input",{type:"radio",name:"skin-tone",value:a,"aria-label":X.skins[a],ref:s?this.refs.skinToneRadio:null,defaultChecked:s,onChange:()=>this.handleSkinMouseOver(a),onKeyDown:c=>{(c.code=="Enter"||c.code=="Space"||c.code=="Tab")&&(c.preventDefault(),this.handleSkinClick(a))}}),b("button",{"aria-hidden":"true",tabindex:"-1",onClick:()=>this.handleSkinClick(a),onMouseEnter:()=>this.handleSkinMouseOver(a),onMouseLeave:()=>this.handleSkinMouseOver(),class:"option flex flex-grow flex-middle",children:[b("span",{class:`skin-tone skin-tone-${a}`}),b("span",{class:"margin-small-lr",children:X.skins[a]})]})]})})})}render(){const t=this.props.perLine*this.props.emojiButtonSize;return b("section",{id:"root",class:"flex flex-column",dir:this.dir,style:{width:this.props.dynamicWidth?"100%":`calc(${t}px + (var(--padding) + var(--sidebar-width)))`},"data-emoji-set":this.props.set,"data-theme":this.state.theme,"data-menu":this.state.showSkins?"":void 0,children:[this.props.previewPosition=="top"&&this.renderPreview(),this.props.navPosition=="top"&&this.renderNav(),this.props.searchPosition=="sticky"&&b("div",{class:"padding-lr",children:this.renderSearch()}),b("div",{ref:this.refs.scroll,class:"scroll flex-grow padding-lr",children:b("div",{style:{width:this.props.dynamicWidth?"100%":t,height:"100%"},children:[this.props.searchPosition=="static"&&this.renderSearch(),this.renderSearchResults(),this.renderCategories()]})}),this.props.navPosition=="bottom"&&this.renderNav(),this.props.previewPosition=="bottom"&&this.renderPreview(),this.state.showSkins&&this.renderSkins(),this.renderLiveRegion()]})}constructor(t){super(),Z(this,"handleClickOutside",n=>{const{element:r}=this.props;n.target!=r&&(this.state.showSkins&&this.closeSkins(),this.props.onClickOutside&&this.props.onClickOutside(n))}),Z(this,"handleBaseClick",n=>{this.state.showSkins&&(n.target.closest(".menu")||(n.preventDefault(),n.stopImmediatePropagation(),this.closeSkins()))}),Z(this,"handleBaseKeydown",n=>{this.state.showSkins&&n.key=="Escape"&&(n.preventDefault(),n.stopImmediatePropagation(),this.closeSkins())}),Z(this,"handleSearchClick",()=>{this.getEmojiByPos(this.state.pos)&&this.setState({pos:[-1,-1]})}),Z(this,"handleSearchInput",async()=>{const n=this.refs.searchInput.current;if(!n)return;const{value:r}=n,o=await fe.search(r),i=()=>{this.refs.scroll.current&&(this.refs.scroll.current.scrollTop=0)};if(!o)return this.setState({searchResults:o,pos:[-1,-1]},i);const a=n.selectionStart==n.value.length?[0,0]:[-1,-1],s=[];s.setsize=o.length;let c=null;for(let d of o)(!s.length||c.length==this.getPerLine())&&(c=[],c.__categoryId="search",c.__index=s.length,s.push(c)),c.push(d);this.ignoreMouse(),this.setState({searchResults:s,pos:a},i)}),Z(this,"handleSearchKeyDown",n=>{const r=n.currentTarget;switch(n.stopImmediatePropagation(),n.key){case"ArrowLeft":this.navigate({e:n,input:r,left:!0});break;case"ArrowRight":this.navigate({e:n,input:r,right:!0});break;case"ArrowUp":this.navigate({e:n,input:r,up:!0});break;case"ArrowDown":this.navigate({e:n,input:r,down:!0});break;case"Enter":n.preventDefault(),this.handleEmojiClick({e:n,pos:this.state.pos});break;case"Escape":n.preventDefault(),this.state.searchResults?this.clearSearch():this.unfocusSearch();break}}),Z(this,"clearSearch",()=>{const n=this.refs.searchInput.current;n&&(n.value="",n.focus(),this.handleSearchInput())}),Z(this,"handleCategoryClick",({category:n,i:r})=>{this.scrollTo(r==0?{row:-1}:{categoryId:n.id})}),Z(this,"openSkins",n=>{const{currentTarget:r}=n,o=r.getBoundingClientRect();this.setState({showSkins:o},async()=>{await li(2);const i=this.refs.menu.current;i&&(i.classList.remove("hidden"),this.refs.skinToneRadio.current.focus(),this.base.addEventListener("click",this.handleBaseClick,!0),this.base.addEventListener("keydown",this.handleBaseKeydown,!0))})}),this.observers=[],this.state={pos:[-1,-1],perLine:this.initDynamicPerLine(t),visibleRows:{0:!0},...this.getInitialState(t)}}}class ot extends pi{async connectedCallback(){const t=xn(this.props,ie,this);t.element=this,t.ref=n=>{this.component=n},await Oe(t),!this.disconnected&&pn(b(Ei,{...t}),this.shadowRoot)}constructor(t){super(t,{styles:tn(Cn)})}}Z(ot,"Props",ie);typeof customElements<"u"&&!customElements.get("em-emoji-picker")&&customElements.define("em-emoji-picker",ot);var Cn={};Cn=`:host {
  width: min-content;
  height: 435px;
  min-height: 230px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  --border-radius: 10px;
  --category-icon-size: 18px;
  --font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  --font-size: 15px;
  --preview-placeholder-size: 21px;
  --preview-title-size: 1.1em;
  --preview-subtitle-size: .9em;
  --shadow-color: 0deg 0% 0%;
  --shadow: .3px .5px 2.7px hsl(var(--shadow-color) / .14), .4px .8px 1px -3.2px hsl(var(--shadow-color) / .14), 1px 2px 2.5px -4.5px hsl(var(--shadow-color) / .14);
  display: flex;
}

[data-theme="light"] {
  --em-rgb-color: var(--rgb-color, 34, 36, 39);
  --em-rgb-accent: var(--rgb-accent, 34, 102, 237);
  --em-rgb-background: var(--rgb-background, 255, 255, 255);
  --em-rgb-input: var(--rgb-input, 255, 255, 255);
  --em-color-border: var(--color-border, rgba(0, 0, 0, .05));
  --em-color-border-over: var(--color-border-over, rgba(0, 0, 0, .1));
}

[data-theme="dark"] {
  --em-rgb-color: var(--rgb-color, 222, 222, 221);
  --em-rgb-accent: var(--rgb-accent, 58, 130, 247);
  --em-rgb-background: var(--rgb-background, 21, 22, 23);
  --em-rgb-input: var(--rgb-input, 0, 0, 0);
  --em-color-border: var(--color-border, rgba(255, 255, 255, .1));
  --em-color-border-over: var(--color-border-over, rgba(255, 255, 255, .2));
}

#root {
  --color-a: rgb(var(--em-rgb-color));
  --color-b: rgba(var(--em-rgb-color), .65);
  --color-c: rgba(var(--em-rgb-color), .45);
  --padding: 12px;
  --padding-small: calc(var(--padding) / 2);
  --sidebar-width: 16px;
  --duration: 225ms;
  --duration-fast: 125ms;
  --duration-instant: 50ms;
  --easing: cubic-bezier(.4, 0, .2, 1);
  width: 100%;
  text-align: left;
  border-radius: var(--border-radius);
  background-color: rgb(var(--em-rgb-background));
  position: relative;
}

@media (prefers-reduced-motion) {
  #root {
    --duration: 0;
    --duration-fast: 0;
    --duration-instant: 0;
  }
}

#root[data-menu] button {
  cursor: auto;
}

#root[data-menu] .menu button {
  cursor: pointer;
}

:host, #root, input, button {
  color: rgb(var(--em-rgb-color));
  font-family: var(--font-family);
  font-size: var(--font-size);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: normal;
}

*, :before, :after {
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.relative {
  position: relative;
}

.flex {
  display: flex;
}

.flex-auto {
  flex: none;
}

.flex-center {
  justify-content: center;
}

.flex-column {
  flex-direction: column;
}

.flex-grow {
  flex: auto;
}

.flex-middle {
  align-items: center;
}

.flex-wrap {
  flex-wrap: wrap;
}

.padding {
  padding: var(--padding);
}

.padding-t {
  padding-top: var(--padding);
}

.padding-lr {
  padding-left: var(--padding);
  padding-right: var(--padding);
}

.padding-r {
  padding-right: var(--padding);
}

.padding-small {
  padding: var(--padding-small);
}

.padding-small-b {
  padding-bottom: var(--padding-small);
}

.padding-small-lr {
  padding-left: var(--padding-small);
  padding-right: var(--padding-small);
}

.margin {
  margin: var(--padding);
}

.margin-r {
  margin-right: var(--padding);
}

.margin-l {
  margin-left: var(--padding);
}

.margin-small-l {
  margin-left: var(--padding-small);
}

.margin-small-lr {
  margin-left: var(--padding-small);
  margin-right: var(--padding-small);
}

.align-l {
  text-align: left;
}

.align-r {
  text-align: right;
}

.color-a {
  color: var(--color-a);
}

.color-b {
  color: var(--color-b);
}

.color-c {
  color: var(--color-c);
}

.ellipsis {
  white-space: nowrap;
  max-width: 100%;
  width: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sr-only {
  width: 1px;
  height: 1px;
  position: absolute;
  top: auto;
  left: -10000px;
  overflow: hidden;
}

a {
  cursor: pointer;
  color: rgb(var(--em-rgb-accent));
}

a:hover {
  text-decoration: underline;
}

.spacer {
  height: 10px;
}

[dir="rtl"] .scroll {
  padding-left: 0;
  padding-right: var(--padding);
}

.scroll {
  padding-right: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar {
  width: var(--sidebar-width);
  height: var(--sidebar-width);
}

.scroll::-webkit-scrollbar-track {
  border: 0;
}

.scroll::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.scroll::-webkit-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0);
}

.scroll::-webkit-scrollbar-thumb {
  min-height: 20%;
  min-height: 65px;
  border: 4px solid rgb(var(--em-rgb-background));
  border-radius: 8px;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--em-color-border-over) !important;
}

.scroll:hover::-webkit-scrollbar-thumb {
  background-color: var(--em-color-border);
}

.sticky {
  z-index: 1;
  background-color: rgba(var(--em-rgb-background), .9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  font-weight: 500;
  position: sticky;
  top: -1px;
}

[dir="rtl"] .search input[type="search"] {
  padding: 10px 2.2em 10px 2em;
}

[dir="rtl"] .search .loupe {
  left: auto;
  right: .7em;
}

[dir="rtl"] .search .delete {
  left: .7em;
  right: auto;
}

.search {
  z-index: 2;
  position: relative;
}

.search input, .search button {
  font-size: calc(var(--font-size)  - 1px);
}

.search input[type="search"] {
  width: 100%;
  background-color: var(--em-color-border);
  transition-duration: var(--duration);
  transition-property: background-color, box-shadow;
  transition-timing-function: var(--easing);
  border: 0;
  border-radius: 10px;
  outline: 0;
  padding: 10px 2em 10px 2.2em;
  display: block;
}

.search input[type="search"]::-ms-input-placeholder {
  color: inherit;
  opacity: .6;
}

.search input[type="search"]::placeholder {
  color: inherit;
  opacity: .6;
}

.search input[type="search"], .search input[type="search"]::-webkit-search-decoration, .search input[type="search"]::-webkit-search-cancel-button, .search input[type="search"]::-webkit-search-results-button, .search input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
}

.search input[type="search"]:focus {
  background-color: rgb(var(--em-rgb-input));
  box-shadow: inset 0 0 0 1px rgb(var(--em-rgb-accent)), 0 1px 3px rgba(65, 69, 73, .2);
}

.search .icon {
  z-index: 1;
  color: rgba(var(--em-rgb-color), .7);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.search .loupe {
  pointer-events: none;
  left: .7em;
}

.search .delete {
  right: .7em;
}

svg {
  fill: currentColor;
  width: 1em;
  height: 1em;
}

button {
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  cursor: pointer;
  color: currentColor;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}

#nav {
  z-index: 2;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: var(--sidebar-width);
  position: relative;
}

#nav button {
  color: var(--color-b);
  transition: color var(--duration) var(--easing);
}

#nav button:hover {
  color: var(--color-a);
}

#nav svg, #nav img {
  width: var(--category-icon-size);
  height: var(--category-icon-size);
}

#nav[dir="rtl"] .bar {
  left: auto;
  right: 0;
}

#nav .bar {
  width: 100%;
  height: 3px;
  background-color: rgb(var(--em-rgb-accent));
  transition: transform var(--duration) var(--easing);
  border-radius: 3px 3px 0 0;
  position: absolute;
  bottom: -12px;
  left: 0;
}

#nav button[aria-selected] {
  color: rgb(var(--em-rgb-accent));
}

#preview {
  z-index: 2;
  padding: calc(var(--padding)  + 4px) var(--padding);
  padding-right: var(--sidebar-width);
  position: relative;
}

#preview .preview-placeholder {
  font-size: var(--preview-placeholder-size);
}

#preview .preview-title {
  font-size: var(--preview-title-size);
}

#preview .preview-subtitle {
  font-size: var(--preview-subtitle-size);
}

#nav:before, #preview:before {
  content: "";
  height: 2px;
  position: absolute;
  left: 0;
  right: 0;
}

#nav[data-position="top"]:before, #preview[data-position="top"]:before {
  background: linear-gradient(to bottom, var(--em-color-border), transparent);
  top: 100%;
}

#nav[data-position="bottom"]:before, #preview[data-position="bottom"]:before {
  background: linear-gradient(to top, var(--em-color-border), transparent);
  bottom: 100%;
}

.category:last-child {
  min-height: calc(100% + 1px);
}

.category button {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;
  position: relative;
}

.category button > * {
  position: relative;
}

.category button .background {
  opacity: 0;
  background-color: var(--em-color-border);
  transition: opacity var(--duration-fast) var(--easing) var(--duration-instant);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.category button:hover .background {
  transition-duration: var(--duration-instant);
  transition-delay: 0s;
}

.category button[aria-selected] .background {
  opacity: 1;
}

.category button[data-keyboard] .background {
  transition: none;
}

.row {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.skin-tone-button {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 100%;
}

.skin-tone-button:hover {
  border-color: var(--em-color-border);
}

.skin-tone-button:active .skin-tone {
  transform: scale(.85) !important;
}

.skin-tone-button .skin-tone {
  transition: transform var(--duration) var(--easing);
}

.skin-tone-button[aria-selected] {
  background-color: var(--em-color-border);
  border-top-color: rgba(0, 0, 0, .05);
  border-bottom-color: rgba(0, 0, 0, 0);
  border-left-width: 0;
  border-right-width: 0;
}

.skin-tone-button[aria-selected] .skin-tone {
  transform: scale(.9);
}

.menu {
  z-index: 2;
  white-space: nowrap;
  border: 1px solid var(--em-color-border);
  background-color: rgba(var(--em-rgb-background), .9);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  transition-property: opacity, transform;
  transition-duration: var(--duration);
  transition-timing-function: var(--easing);
  border-radius: 10px;
  padding: 4px;
  position: absolute;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .05);
}

.menu.hidden {
  opacity: 0;
}

.menu[data-position="bottom"] {
  transform-origin: 100% 100%;
}

.menu[data-position="bottom"].hidden {
  transform: scale(.9)rotate(-3deg)translateY(5%);
}

.menu[data-position="top"] {
  transform-origin: 100% 0;
}

.menu[data-position="top"].hidden {
  transform: scale(.9)rotate(3deg)translateY(-5%);
}

.menu input[type="radio"] {
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  border: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  overflow: hidden;
}

.menu input[type="radio"]:checked + .option {
  box-shadow: 0 0 0 2px rgb(var(--em-rgb-accent));
}

.option {
  width: 100%;
  border-radius: 6px;
  padding: 4px 6px;
}

.option:hover {
  color: #fff;
  background-color: rgb(var(--em-rgb-accent));
}

.skin-tone {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.skin-tone:after {
  content: "";
  mix-blend-mode: overlay;
  background: linear-gradient(rgba(255, 255, 255, .2), rgba(0, 0, 0, 0));
  border: 1px solid rgba(0, 0, 0, .8);
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: inset 0 -2px 3px #000, inset 0 1px 2px #fff;
}

.skin-tone-1 {
  background-color: #ffc93a;
}

.skin-tone-2 {
  background-color: #ffdab7;
}

.skin-tone-3 {
  background-color: #e7b98f;
}

.skin-tone-4 {
  background-color: #c88c61;
}

.skin-tone-5 {
  background-color: #a46134;
}

.skin-tone-6 {
  background-color: #5d4437;
}

[data-index] {
  justify-content: space-between;
}

[data-emoji-set="twitter"] .skin-tone:after {
  box-shadow: none;
  border-color: rgba(0, 0, 0, .5);
}

[data-emoji-set="twitter"] .skin-tone-1 {
  background-color: #fade72;
}

[data-emoji-set="twitter"] .skin-tone-2 {
  background-color: #f3dfd0;
}

[data-emoji-set="twitter"] .skin-tone-3 {
  background-color: #eed3a8;
}

[data-emoji-set="twitter"] .skin-tone-4 {
  background-color: #cfad8d;
}

[data-emoji-set="twitter"] .skin-tone-5 {
  background-color: #a8805d;
}

[data-emoji-set="twitter"] .skin-tone-6 {
  background-color: #765542;
}

[data-emoji-set="google"] .skin-tone:after {
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, .4);
}

[data-emoji-set="google"] .skin-tone-1 {
  background-color: #f5c748;
}

[data-emoji-set="google"] .skin-tone-2 {
  background-color: #f1d5aa;
}

[data-emoji-set="google"] .skin-tone-3 {
  background-color: #d4b48d;
}

[data-emoji-set="google"] .skin-tone-4 {
  background-color: #aa876b;
}

[data-emoji-set="google"] .skin-tone-5 {
  background-color: #916544;
}

[data-emoji-set="google"] .skin-tone-6 {
  background-color: #61493f;
}

[data-emoji-set="facebook"] .skin-tone:after {
  border-color: rgba(0, 0, 0, .4);
  box-shadow: inset 0 -2px 3px #000, inset 0 1px 4px #fff;
}

[data-emoji-set="facebook"] .skin-tone-1 {
  background-color: #f5c748;
}

[data-emoji-set="facebook"] .skin-tone-2 {
  background-color: #f1d5aa;
}

[data-emoji-set="facebook"] .skin-tone-3 {
  background-color: #d4b48d;
}

[data-emoji-set="facebook"] .skin-tone-4 {
  background-color: #aa876b;
}

[data-emoji-set="facebook"] .skin-tone-5 {
  background-color: #916544;
}

[data-emoji-set="facebook"] .skin-tone-6 {
  background-color: #61493f;
}

`;function Mi(e){const t=h.useRef(null),n=h.useRef(null);return n.current&&n.current.update(e),h.useEffect(()=>(n.current=new ot({...e,ref:t}),()=>{n.current=null}),[]),A.createElement("div",{ref:t})}function Li(e){var t=e.theme,n=e.onSelectEmoji,r=e.disableRecent,o=e.customEmojis,i=e.language,a=h.useMemo(function(){var c=[];return r||c.push("frequent"),c=[].concat(Yt(c),["people","nature","foods","activity","places","objects","symbols","flags"]),c},[r]),s=h.useMemo(function(){if(i)return require("@emoji-mart/data/i18n/".concat(i??"en",".json"))},[i]);return A.createElement(Mi,{data:void 0,theme:t,previewPosition:"none",onEmojiSelect:n,custom:o,categories:a,set:"apple",i18n:s})}var Ri=h.memo(Li);function Vt(e){var t=e.showPicker,n=e.theme,r=e.handleSelectEmoji,o=e.disableRecent,i=e.customEmojis,a=e.position,s=e.language;return A.createElement("div",{className:"react-emoji-picker--container"},t&&A.createElement("div",{className:"react-emoji-picker--wrapper",onClick:function(d){return d.stopPropagation()},style:a==="below"?{top:"40px"}:{}},A.createElement("div",{className:"react-emoji-picker"},A.createElement(Ri,{theme:n,onSelectEmoji:r,disableRecent:o,customEmojis:i,language:s}))))}var zi=435,Ni=function(t){var n=t.theme,r=t.keepOpened,o=t.disableRecent,i=t.customEmojis,a=t.addSanitizeFn,s=t.addPolluteFn,c=t.appendContent,d=t.buttonElement,l=t.buttonRef,m=t.language,p=h.useState(!1),v=oe(p,2),g=v[0],y=v[1],w=h.useState(),S=oe(w,2),C=S[0],L=S[1],T=h.useState(),k=oe(T,2),M=k[0],O=k[1];h.useEffect(function(){a(Ee)},[a]),h.useEffect(function(){s(Jt)},[s]),h.useEffect(function(){function B(H){var J=H.target;J.classList.contains("react-input-emoji--button")||J.classList.contains("react-input-emoji--button--icon")||y(!1)}return document.addEventListener("click",B),function(){document.removeEventListener("click",B)}},[]);function I(B){B.stopPropagation(),B.preventDefault(),O(V(B)),y(function(H){return!H})}function V(B){var H=B.currentTarget,J=H.getBoundingClientRect(),K=zi;return J.top>=K?"above":"below"}function W(B){c(Rr(B)),r||y(function(H){return!H})}return h.useEffect(function(){var B;l!=null&&(B=l.current)!==null&&B!==void 0&&B.style?(l.current.style.position="relative",L(l.current)):d!=null&&d.style&&(d.style.position="relative",L(d))},[l,d]),C?Tn.createPortal(A.createElement(A.Fragment,null,A.createElement(Vt,{showPicker:g,theme:n,handleSelectEmoji:W,disableRecent:o,customEmojis:i,position:M,language:m}),A.createElement(yt,{showPicker:g,toggleShowPicker:I,buttonElement:C,buttonRef:l})),C):A.createElement(A.Fragment,null,A.createElement(Vt,{showPicker:g,theme:n,handleSelectEmoji:W,disableRecent:o,customEmojis:i,position:M,language:m}),A.createElement(yt,{showPicker:g,toggleShowPicker:I}))};function Ti(){var e=Sn();if(!e)return null;var t=e.text.substring(e.begin,e.end);return t||null}function Ai(){var e=Sn();e&&e.element.deleteData(e.begin,e.end-e.begin)}function Sn(){var e=Qe();if(!e)return null;var t=e.element,n=e.caretOffset,r=t.textContent,o=r.lastIndexOf("@");return o===-1||o>=n||o!==0&&r[o-1]!==" "?null:{begin:o,end:n,text:r,element:t}}function Qe(){var e=Pi();if(e===null)return null;var t=0;if(typeof window.getSelection<"u"){var n=window.getSelection().getRangeAt(0),r=n.cloneRange();r.selectNodeContents(e),r.setEnd(n.endContainer,n.endOffset),t=r.toString().length}else if(typeof document.selection<"u"&&document.selection.type!="Control"){var o=document.selection.createRange(),i=document.body.createTextRange();i.moveToElementText(e),i.setEndPoint("EndToEnd",o),t=i.text.length}return{element:e,caretOffset:t}}function Pi(){var e=document.getSelection().anchorNode;return(e==null?void 0:e.nodeType)==3?e:null}function Di(e){var t,n=h.useState(!1),r=oe(n,2),o=r[0],i=r[1],a=h.useState([]),s=oe(a,2),c=s[0],d=s[1],l=h.useState(null),m=oe(l,2),p=m[0],v=m[1],g=h.useCallback(function(){Ai(),d([])},[]),y=h.useCallback(bt(ge().mark(function C(){var L,T;return ge().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:if(L=Ti(),v(L),L!==null){M.next=6;break}d([]),M.next=12;break;case 6:return i(!0),M.next=9,e(L);case 9:T=M.sent,i(!1),d(T);case 12:case"end":return M.stop()}},C)})),[e]),w=h.useCallback(function(C){return(t=t||bt(ge().mark(function L(T){var k,M;return ge().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:if(typeof e=="function"){I.next=2;break}return I.abrupt("return");case 2:T.key==="Backspace"&&(k=Qe())!==null&&k!==void 0&&k.element.parentElement.hasAttribute("data-mention-id")?(M=Qe(),M.element.parentElement.remove()):["ArrowUp","ArrowDown","Esc","Escape"].includes(T.key)||y();case 3:case"end":return I.stop()}},L)}))).apply(this,arguments)},[y,e]),S=h.useCallback(function(){y()},[y]);return{mentionSearchText:p,mentionUsers:c,onKeyUp:w,onFocus:S,onSelectUser:g,loading:o}}var Ii=function(t,n){var r=t.users,o=t.mentionSearchText,i=t.onSelect,a=t.addEventListener,s=h.useState(0),c=oe(s,2),d=c[0],l=c[1];h.useImperativeHandle(n,function(){return{prevUser:function(){l(function(y){return y===0?0:y-1})},nextUser:function(){l(function(y){return y===r.length-1?r.length-1:y+1})}}}),h.useEffect(function(){l(0)},[r]);function m(g,y){return'<span class="react-input-emoji--mention--item--name__selected" data-testid="metion-selected-word">'.concat(g,"</span>").concat(y)}var p=h.useMemo(function(){var g=o?o.substring(1).toLocaleLowerCase():"";return r.map(function(y){var w=y.name;if(o&&o.length>1)if(y.name.toLowerCase().startsWith(g))w=m(y.name.substring(0,g.length),y.name.substring(g.length));else{var S=y.name.split(" ");w=S.map(function(C){return C.toLocaleLowerCase().startsWith(g)?m(C.substring(0,g.length),C.substring(g.length)):C}).join(" ")}return gt(gt({},y),{},{nameHtml:w})})},[o,r]);function v(g){return function(y){y.stopPropagation(),y.preventDefault(),i(g)}}return h.useEffect(function(){var g=a("enter",function(y){y.stopPropagation(),y.preventDefault(),i(p[d])});return function(){g()}},[a,i,d,p]),A.createElement("ul",{className:"react-input-emoji--mention--list","data-testid":"mention-user-list"},p.map(function(g,y){return A.createElement("li",{key:g.id},A.createElement("button",{type:"button",onClick:v(g),className:"react-input-emoji--mention--item".concat(d===y?" react-input-emoji--mention--item__selected":""),onMouseOver:function(){return l(y)}},A.createElement("img",{className:"react-input-emoji--mention--item--img",src:g.image}),A.createElement("div",{className:"react-input-emoji--mention--item--name",dangerouslySetInnerHTML:{__html:g.nameHtml}})))}))},Oi=h.forwardRef(Ii),Hi=function(t){var n=t.searchMention,r=t.addEventListener,o=t.appendContent,i=t.addSanitizeFn,a=h.useRef(null),s=h.useState(!1),c=oe(s,2),d=c[0],l=c[1],m=Di(n),p=m.mentionSearchText,v=m.mentionUsers,g=m.loading,y=m.onKeyUp,w=m.onFocus,S=m.onSelectUser;h.useEffect(function(){i(function(L){var T=document.createElement("div");T.innerHTML=L;var k=Array.prototype.slice.call(T.querySelectorAll(".react-input-emoji--mention--text"));return k.forEach(function(M){T.innerHTML=T.innerHTML.replace(M.outerHTML,"@[".concat(M.dataset.mentionName,"](userId:").concat(M.dataset.mentionId,")"))}),T.innerHTML})},[i]),h.useEffect(function(){l(v.length>0)},[v]),h.useEffect(function(){function L(){l(!1)}return document.addEventListener("click",L),function(){document.removeEventListener("click",L)}},[]),h.useEffect(function(){var L=r("keyUp",y);return function(){L()}},[r,y]),h.useEffect(function(){function L(k){switch(k.key){case"Esc":case"Escape":l(!1);break}}var T=r("keyDown",L);return function(){T()}},[r]),h.useEffect(function(){var L=r("focus",w);return function(){L()}},[r,w]),h.useEffect(function(){if(d){var L=r("arrowUp",function(k){k.stopPropagation(),k.preventDefault(),a.current.prevUser()}),T=r("arrowDown",function(k){k.stopPropagation(),k.preventDefault(),a.current.nextUser()});return function(){L(),T()}}},[r,d]);function C(L){S(),o('<span class="react-input-emoji--mention--text" data-mention-id="'.concat(L.id,'" data-mention-name="').concat(L.name,'">@').concat(L.name,"</span> "))}return A.createElement(A.Fragment,null,g?A.createElement("div",{className:"react-input-emoji--mention--container"},A.createElement("div",{className:"react-input-emoji--mention--loading"},A.createElement("div",{className:"react-input-emoji--mention--loading--spinner"},"Loading..."))):d&&A.createElement("div",{className:"react-input-emoji--mention--container",onClick:function(T){return T.stopPropagation()}},A.createElement(Oi,{ref:a,mentionSearchText:p,users:v,onSelect:C,addEventListener:r})))};function le(){var e=[];return{subscribe:function(n){return e.push(n),function(){e=e.filter(function(r){return r!==n})}},publish:function(n){e.forEach(function(r){return r(n)})},get currentListerners(){return e}}}function Bi(){var e=h.useMemo(function(){return{keyDown:le(),keyUp:le(),arrowUp:le(),arrowDown:le(),enter:le(),focus:le(),blur:le()}},[]),t=h.useCallback(function(n,r){return e[n].subscribe(r)},[e]);return{addEventListener:t,listeners:e}}function Fi(){var e=h.useRef([]),t=h.useCallback(function(r){e.current.push(r)},[]),n=h.useCallback(function(r){var o=e.current.reduce(function(i,a){return a(i)},r);return o},[]);return{addPolluteFn:t,pollute:n}}function Ui(e,t){var n=e.onChange,r=e.onEnter,o=e.shouldReturn,i=e.onResize,a=e.onClick,s=e.onFocus,c=e.onBlur,d=e.onKeyDown,l=e.theme,m=e.cleanOnEnter,p=e.placeholder,v=e.maxLength,g=e.keepOpened,y=e.inputClass,w=e.disableRecent,S=e.tabIndex,C=e.value,L=e.customEmojis,T=e.language,k=e.searchMention,M=e.buttonElement,O=e.buttonRef,I=e.borderRadius,V=e.borderColor,W=e.fontSize,B=e.fontFamily,H=h.useRef(null),J=Bi(),K=J.addEventListener,q=J.listeners,x=en(e.shouldReturn),_=x.addSanitizeFn,$=x.sanitize,R=x.sanitizedTextRef,E=Fi(),D=E.addPolluteFn,F=E.pollute,f=h.useCallback(function(){var G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";H.current!==null&&(H.current.html=Jt(G),R.current=G)},[R]),j=h.useCallback(function(G){f(G)},[f]),N=Or(H,i,n);Ir({ref:t,setValue:j,textInputRef:H,emitChange:N}),h.useEffect(function(){R.current!==C&&j(C)},[R,j,C]),h.useEffect(function(){function G(de){if(typeof v<"u"&&de.key!=="Backspace"&&H.current!==null&&xt(H.current)>=v&&de.preventDefault(),de.key==="Enter"&&H.current){de.preventDefault();var Nn=$(H.current.html);return N(R.current),typeof r=="function"&&q.enter.currentListerners.length===0&&r(Nn),m&&q.enter.currentListerners.length===0&&f(""),typeof d=="function"&&d(de.nativeEvent),!1}return typeof d=="function"&&d(de.nativeEvent),!0}var ee=K("keyDown",G);return function(){ee()}},[K,m,N,q.enter.currentListerners.length,v,r,d,$,R,f]),h.useEffect(function(){function G(){typeof a=="function"&&a(),typeof s=="function"&&s()}var ee=K("focus",G);return function(){ee()}},[K,a,s]),h.useEffect(function(){function G(){typeof c=="function"&&c()}var ee=K("blur",G);return function(){ee()}},[K,c]);function U(G){$(G),C!==R.current&&N(R.current)}function Q(G){typeof v<"u"&&H.current!==null&&xt(H.current)>=v||H.current!==null&&H.current.appendContent(G)}function zn(G){G.preventDefault();var ee;G.clipboardData&&(ee=G.clipboardData.getData("text/plain"),ee=F(ee),document.execCommand("insertHTML",!1,ee))}return A.createElement("div",{className:"react-emoji"},A.createElement(Hi,{searchMention:k,addEventListener:K,appendContent:Q,addSanitizeFn:_}),A.createElement(Fr,{ref:H,onCopy:zr,onPaste:zn,shouldReturn:o,onBlur:q.blur.publish,onFocus:q.focus.publish,onArrowUp:q.arrowUp.publish,onArrowDown:q.arrowDown.publish,onKeyUp:q.keyUp.publish,onKeyDown:q.keyDown.publish,onEnter:q.enter.publish,placeholder:p,style:{borderRadius:I,borderColor:V,fontSize:W,fontFamily:B},tabIndex:S,className:y,onChange:U}),A.createElement(Ni,{theme:l,keepOpened:g,disableRecent:w,customEmojis:L,addSanitizeFn:_,addPolluteFn:D,appendContent:Q,buttonElement:M,buttonRef:O,language:T}))}var En=h.forwardRef(Ui);En.defaultProps={theme:"auto",height:30,placeholder:"Type a message",borderRadius:21,borderColor:"#EAEAEA",fontSize:15,fontFamily:"sans-serif",tabIndex:0,shouldReturn:!1,customEmojis:[],language:void 0};var at={},Vi=je;Object.defineProperty(at,"__esModule",{value:!0});var et=at.default=void 0,Wi=Vi(we()),qi=u,Gi=(0,Wi.default)((0,qi.jsx)("path",{d:"m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z"}),"DoneAll");et=at.default=Gi;function Ce(e){const t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;const n=String(e).match(/\d+/g);if(n==null||n.length<=2)return t;{const[r,o,...i]=n.map(c=>parseInt(c)),a=[r,o-1,...i];return new Date(Date.UTC(...a))}}function Wt(e,t,n){const r=e!==1?t+"s":t;return e+" "+r+" "+n}function tt(){return tt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},tt.apply(this,arguments)}const ve=60,be=ve*60,he=be*24,Se=he*7,qt=he*30,Gt=he*365,Ki=()=>Date.now();function Yi({date:e,formatter:t=Wt,component:n="time",live:r=!0,minPeriod:o=0,maxPeriod:i=Se,title:a,now:s=Ki,...c}){const[d,l]=h.useState(s());h.useEffect(()=>{if(!r)return;const k=(()=>{const M=Ce(e).valueOf();if(!M)return console.warn("[react-timeago] Invalid Date provided"),0;const O=Math.round(Math.abs(d-M)/1e3),I=O<ve?1e3:O<be?1e3*ve:O<he?1e3*be:1e3*Se,V=Math.min(Math.max(I,o*1e3),i*1e3);return V?setTimeout(()=>{l(s())},V):0})();return()=>{k&&clearTimeout(k)}},[e,r,i,o,s,d]);const m=n,p=Ce(e).valueOf();if(!p)return null;const v=Math.round(Math.abs(d-p)/1e3),g=p<d?"ago":"from now",[y,w]=v<ve?[Math.round(v),"second"]:v<be?[Math.round(v/ve),"minute"]:v<he?[Math.round(v/be),"hour"]:v<Se?[Math.round(v/he),"day"]:v<qt?[Math.round(v/Se),"week"]:v<Gt?[Math.round(v/qt),"month"]:[Math.round(v/Gt),"year"],S=typeof a>"u"?typeof e=="string"?e:Ce(e).toISOString().substr(0,16).replace("T"," "):a,C=m==="time"?{...c,dateTime:Ce(e).toISOString()}:c,L=Wt.bind(null,y,w,g);return h.createElement(m,tt({},C,{title:S}),t(y,w,g,p,L,s))}function Xi({message:e,hanleDelete:t}){var c,d;const[n,r]=h.useState(!1),{user:o}=te(l=>l.auth);function i(){r(!0)}function a(){t(e._id)}function s(){r(!1)}return u.jsxs(u.Fragment,{children:[u.jsx(sr,{modalState:n,message:"Are you sure you want to delete this message?",posText:"Delete",negText:"No",successCallback:a,cancelCallback:s}),u.jsxs("div",{className:`
    message-box flex gap-4 mb-3 relative
    ${e.sender_id===(o==null?void 0:o._id)?"own":"others"}`,children:[!e.is_delete&&e.sender_id===(o==null?void 0:o._id)&&u.jsx("div",{className:"options mt-5",children:u.jsx("button",{onClick:i,children:u.jsx(An,{size:20})})}),e.sender_id!==(o==null?void 0:o._id)&&u.jsx("div",{className:"profile-img",children:(c=e.userDetails)!=null&&c.profile_img?u.jsx("img",{src:e.userDetails.profile_img,alt:"dsfkajfhskadfh",className:"w-8 h-8 rounded-full"}):u.jsx(se,{size:"small",email:((d=e.userDetails)==null?void 0:d.email)||""})}),e.is_delete?u.jsx("h1",{className:"bg-gray-700 text-gray-500 p-2 rounded-md",children:"This message has been deleted"}):u.jsxs("div",{className:"body flex flex-col gap-2",children:[u.jsxs("div",{className:"user_details flex justify-between items-baseline",children:[u.jsx("h1",{children:e.sender_id!==(o==null?void 0:o._id)&&e.userDetails.username}),u.jsx("div",{className:"text-xs font-light",children:u.jsx(Yi,{date:e.createdAt||Date.now(),minPeriod:6,formatter:(l,m,p)=>m==="second"?"just now":`${l} ${m}${l!==1?"s":""} ${p}`})})]}),u.jsxs("div",{className:`
         message relative py-3 w-min h-max min-w-60 max-w-96 rounded-md px-2
         ${e.sender_id===(o==null?void 0:o._id)?"own bg-green-800":"others bg-gray-500"}`,children:[e&&e.content_type==="MEDIA"?u.jsx("img",{src:e.content,alt:"",className:"w-96"}):u.jsx("p",{className:"max-w-96 pe-2",style:{overflowWrap:"break-word"},children:e.content}),u.jsx("div",{className:"seen absolute right-1 bottom-0",children:e.sender_id===(o==null?void 0:o._id)?e.read_by.length>0?u.jsx(et,{sx:{fontSize:15,color:"blue"}}):u.jsx(et,{sx:{fontSize:15}}):null})]})]})]})]})}var st={},Ji=je;Object.defineProperty(st,"__esModule",{value:!0});var Mn=st.default=void 0,Zi=Ji(we()),Qi=u,eo=(0,Zi.default)((0,Qi.jsx)("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");Mn=st.default=eo;function to({userDetails:e,setOpenDrawer:t,openDrawer:n,socket:r}){var _,$,R,E,D,F;const o=De(),[i,a]=h.useState(!1),{currentChat:s}=te(f=>f.socket),{user:c}=te(f=>f.auth),[d,l]=h.useState((s==null?void 0:s.chat_name)||""),m=h.useRef(null),[p,v]=h.useState(null),[g,y]=h.useState(""),[w,S]=h.useState(!1),[C,L]=h.useState(),[T,k]=h.useState(""),[M,O]=h.useState(!1),[I,V]=h.useState([]);h.useEffect(()=>{if(s!=null&&s.is_groupchat)v(s._id);else{const f=s==null?void 0:s.members.find(j=>j!==(c==null?void 0:c._id));v(f)}},[e]);const[W,B]=h.useState(!1);async function H(){if(d===(s==null?void 0:s.chat_name))return;const f=await Kn({chat_name:d,chat_id:s==null?void 0:s._id});f&&(ue(f.message),o(Fn(f.chat)),a(!1))}function J(f){f.target.files&&(y(URL.createObjectURL(f.target.files[0])),t(!1),S(!0))}async function K(f){var j;if(f&&s){const N=await Yn({chat_id:s==null?void 0:s._id,user:f});N.chat&&(o(_e(N.chat)),(j=r==null?void 0:r.current)==null||j.emit("new-chat",N.chat))}}async function q(f){var j;if(f&&s){const N=await ht({chat_id:s==null?void 0:s._id,user:f});N.chat&&(o(_e(N.chat)),(j=r==null?void 0:r.current)==null||j.emit("exit-chat",N.chat))}}h.useEffect(()=>{(async()=>{if(C&&s){const f=await Gn({chat_id:s._id,icon:C});f.chat&&o(Pn(f.chat))}})()},[C]),h.useEffect(()=>{(async()=>{var f;try{const j=await ye.get(`/users/user-search?search=${T}`,{withCredentials:!0});j.data&&V(j.data.userData.filter(N=>{if(!(s!=null&&s.members.includes(N.user_id)))return N}))}catch(j){const N=j;ue.error((f=N.response)==null?void 0:f.data.message)}})()},[T]);async function x(){var f;if(c!=null&&c._id&&s){const j=await ht({chat_id:s==null?void 0:s._id,user:c==null?void 0:c._id});j.chat&&(o(_e(j.chat)),(f=r==null?void 0:r.current)==null||f.emit("exit-chat",j.chat))}}return u.jsxs(u.Fragment,{children:[u.jsx(lr,{openModal:W,setOpenModal:B,id:p,reported_type:"group"}),u.jsx(ur,{src:g,aspect:1/1,isCrop:w,setisCrop:S,setImage:L}),u.jsxs(Dn,{anchor:"right",open:n,onClose:()=>t(!1),children:[u.jsx("div",{className:"btn text-3xl p-3 bg-gray-700 sm:hidden",onClick:()=>t(!1),children:u.jsx(cr,{})}),u.jsxs("div",{className:"chat-drawer bg-gray-700 overflow-y-scroll flex flex-col items-center pt-16",children:[u.jsxs("section",{className:"header flex flex-col items-center",children:[u.jsxs("div",{className:"profile-img relative",children:[u.jsx("div",{className:"img",children:s&&s.is_groupchat?s.icon?u.jsx("img",{src:s.icon,alt:"dsfkajfhskadfh",className:"w-24 h-24 rounded-full"}):u.jsx(se,{size:"large",email:(s==null?void 0:s.chat_name)||""}):e&&((_=e[0])!=null&&_.profile_img)?u.jsx("img",{src:e[0].profile_img,alt:"dsfkajfhskadfh",className:"w-24 h-24 rounded-full"}):u.jsx(se,{size:"large",email:e&&(($=e[0])==null?void 0:$.email)||""})}),u.jsx("div",{className:"edit-icon w-full h-full bg-gray-600 absolute top-0  justify-center items-center",children:u.jsx("div",{className:"h-min",onClick:()=>{var f;return(f=m.current)==null?void 0:f.click()},children:u.jsx(ut,{size:25})})})]}),u.jsx("input",{type:"file",className:"icon-input",ref:m,onChange:J}),u.jsx("div",{className:"name ",children:s!=null&&s.is_groupchat?u.jsxs("div",{className:"relative flex justify-center",children:[i?u.jsx("input",{type:"text",value:d,className:"mt-5 rounded-md",onChange:f=>l(f.target.value)}):u.jsx("h1",{className:"text-white text-center text-3xl mt-5",children:s==null?void 0:s.chat_name}),i?u.jsxs(u.Fragment,{children:[u.jsx("button",{className:"ms-3 mt-7 text-white rounded-md h-min bg-primary hover:bg-primary-hover",onClick:()=>H(),children:u.jsx(Mn,{})}),u.jsx("button",{className:"ms-3 text-white mt-7 rounded-md h-min bg-red-700 hover:bg-primary-hover",onClick:()=>a(!1),children:u.jsx(In,{})})]}):((R=s.admins)==null?void 0:R.includes(c==null?void 0:c._id))&&u.jsx("div",{className:"edit-group-name rounded-full absolute right-0 top-7 bottom-0 cursor-pointer",onClick:()=>a(!i),children:u.jsx(ut,{size:25})})]}):e&&u.jsxs(u.Fragment,{children:[u.jsx("h1",{className:"text-white text-center text-3xl mt-5",children:(E=e[0])==null?void 0:E.username}),u.jsx("h3",{className:"text-white text-center",children:(D=e[0])==null?void 0:D.fullname})]})})]}),u.jsxs("section",{className:"flex gap-5 pt-10",children:[s!=null&&s.is_groupchat?s.members.includes(c==null?void 0:c._id)&&u.jsx("button",{className:"exit-group px-4 py-1 rounded-md text-secondary bg-primary hover:bg-primary-hover",onClick:()=>{O(!1),x()},children:"Exit"}):u.jsx("button",{className:"exit-group px-4 py-1 rounded-md text-secondary bg-primary hover:bg-primary-hover",children:"Block"}),u.jsx("button",{className:"report px-4 py-1 rounded-md text-secondary bg-red-700",onClick:()=>B(!0),children:"Report"})]}),u.jsxs("div",{className:"members text-white w-full p-5 pt-10",children:[u.jsxs("h1",{className:"text-lg text-slate-200",children:["Members (",e==null?void 0:e.length,")"]}),u.jsxs("div",{className:"members-container",children:[s&&((F=s.admins)==null?void 0:F.includes(c==null?void 0:c._id))&&u.jsxs("button",{className:"add-member py-1 px-5 w-full text-left mt-5 rounded-md text-slate-400",onClick:()=>O(!M),children:[M?u.jsx(On,{size:25}):u.jsx(Hn,{size:25}),"Add Member"]}),M&&u.jsx("div",{className:"add-member-search mt-5",children:u.jsx("input",{type:"text",className:"search bg-seconday-bg border-none rounded-md w-full shadow-lg",onChange:f=>k(f.target.value),placeholder:"Add user",value:T})}),I.length>0&&u.jsx("div",{className:"user-list-search absolute mt-2 py-2 bg-seconday-bg w-80 shadow-md cursor-pointer z-20",children:I.map((f,j)=>u.jsxs("div",{className:"user h-12 flex px-3 gap-3 items-center mb-2",onClick:()=>{k(""),K(f.user_id)},children:[u.jsx("img",{src:f.profile_img,alt:"",className:"w-11 shadow rounded-md"}),u.jsxs("div",{className:"name leading-none",children:[u.jsx("h1",{children:f.username}),u.jsx("small",{children:f.fullname})]})]},j))}),u.jsx("div",{className:"user-list mt-5 ",children:e&&e.map((f,j)=>{var N;return u.jsxs("div",{className:"user h-12 flex px-3 gap-3 items-center mb-2 shadow-sm hover:bg-gray-600 rounded-md",onClick:()=>{k("")},children:[f.profile_img?u.jsx("img",{src:f.profile_img,alt:"",className:"w-11 shadow rounded-md"}):u.jsx(se,{email:f.email,size:"small"}),u.jsxs("div",{className:"name leading-none",children:[u.jsxs("h1",{children:[f.username,f.user_id===(c==null?void 0:c._id)&&" (You)"]}),u.jsx("small",{children:f.fullname})]}),s&&!((N=s.admins)!=null&&N.includes(c==null?void 0:c._id))||f.user_id!==(c==null?void 0:c._id)&&u.jsx("div",{className:"remove-icon",onClick:()=>q(f.user_id),children:u.jsx(Bn,{size:25})}),(s==null?void 0:s.admins.includes(f.user_id))&&u.jsx("span",{className:"text-xs",children:"Admin"})]},j)})})]})]})]})]})]})}function no({online:e,setSendMessage:t,receivedMessage:n,socket:r}){var R,E,D,F;const o=Un(),{user:i}=te(f=>f.auth),{currentChat:a}=te(f=>f.socket),[s,c]=h.useState(null),[d,l]=h.useState(""),[m,p]=h.useState([]),v=h.useRef(null),g=h.useRef(null),y=h.useRef(null),[w,S]=h.useState(!1),[C,L]=h.useState(!1),[T,k]=h.useState(!1),[M,O]=h.useState(!1),[I,V]=h.useState(null),[W,B]=h.useState(null);h.useEffect(()=>{(async()=>{try{if(a!=null&&a.members){const f=await ye.post("/chat/get-members",{members:a==null?void 0:a.members},{withCredentials:!0});f.data&&(a.is_groupchat?c(f.data.members):c(f.data.members.filter(j=>j.user_id!==(i==null?void 0:i._id))))}}catch{ue.error("Internal error")}})()},[a,i]),h.useEffect(()=>{(async()=>{if(a&&!(a!=null&&a.is_groupchat)){const f=a==null?void 0:a.members.find(N=>N!==(i==null?void 0:i._id)),j=await Xn(f);j.blocked&&V(j.blocked)}})()},[a]),h.useEffect(()=>{var f;(f=r==null?void 0:r.current)==null||f.on("block-chat",j=>{const N=a==null?void 0:a.members.find(U=>U===(i==null?void 0:i._id));j===N&&V("you were blocked by this user")})},[r==null?void 0:r.current]),h.useEffect(()=>{var f;(f=r==null?void 0:r.current)==null||f.on("unblock-chat",j=>{const N=a==null?void 0:a.members.find(U=>U===(i==null?void 0:i._id));j===N&&V(null)})},[r==null?void 0:r.current]),h.useEffect(()=>{n&&(n.chat_id===(a==null?void 0:a._id)?(p(f=>[...f,n]),(!n.read_by.includes(i==null?void 0:i._id)||n.sender_id!==(i==null?void 0:i._id))&&$(n._id)):ue.success(`You have a new message from ${n.userDetails.username}`))},[n]);const H=async()=>{if(a){S(!0);const f=await Qn(a==null?void 0:a._id,y.current);S(!1),f.messages.length>0&&(p(()=>[...f.messages,...m]),f.messages.map(j=>{(!j.read_by.includes(i==null?void 0:i._id)||j.sender_id!==(i==null?void 0:i._id))&&$(j._id)}))}};h.useEffect(()=>{y.current=null,p([]),B(null)},[a]),h.useEffect(()=>{a&&m.length===0&&y.current===null&&H()},[m]),h.useEffect(()=>{var f,j;a&&((f=r.current)!=null&&f.connected)&&((j=r==null?void 0:r.current)==null||j.emit("join-room",a==null?void 0:a._id))},[a,r]),h.useEffect(()=>{g.current&&m.length<=10&&(g.current.scrollTop=g.current.scrollHeight)},[m]);async function J(f){if(f.target.files){const j=await er(f.target.files[0]);j&&B({content:j,file_type:f.target.files[0].type})}}async function K(f){(await tr(f)).messages&&p(m.map(N=>{var U;return(U=r==null?void 0:r.current)==null||U.emit("deleteMessage",{chat_id:N.chat_id,message_id:N._id}),N._id===f&&(N.is_delete=!0),N}))}h.useEffect(()=>{var f;(f=r==null?void 0:r.current)==null||f.on("delete-message",({chat_id:j,message_id:N})=>{j===(a==null?void 0:a._id)&&p(m.map(U=>(U._id===N&&(U.is_delete=!0),U)))})},[r==null?void 0:r.current,a]);async function q(f){if(i&&(a!=null&&a._id)){let j;if(f==="file"?(j={sender_id:i==null?void 0:i._id,content:W==null?void 0:W.content,content_type:"MEDIA",file_type:W==null?void 0:W.file_type,chat_id:a==null?void 0:a._id},B(null)):f==="text"&&(j={sender_id:i==null?void 0:i._id,content:d,content_type:"TEXT",chat_id:a==null?void 0:a._id}),j){const N=await nr(j);N.newMessage&&(l(""),t({...N.newMessage,members:a.members}),p(U=>[...U,N.newMessage]))}}}function x(f){const j=f.target;m.length>1&&j.scrollTop===0&&m[0].chat_id===(a==null?void 0:a._id)&&(y.current=m[0].createdAt,H())}const _=f=>{l(f)};async function $(f){var N;const j=await Jn(f);j&&((N=r==null?void 0:r.current)==null||N.emit("read-message",j.messages))}return h.useEffect(()=>{var f,j;T?(f=r==null?void 0:r.current)==null||f.emit("typing",{room:a==null?void 0:a._id,user:i==null?void 0:i._id}):(j=r==null?void 0:r.current)==null||j.emit("typed",{room:a==null?void 0:a._id,user:i==null?void 0:i._id})},[T]),h.useEffect(()=>{var f;(f=r==null?void 0:r.current)==null||f.on("start-typing",j=>{j.room===(a==null?void 0:a._id)&&L(!0)})},[r==null?void 0:r.current,a]),h.useEffect(()=>{var f;(f=r==null?void 0:r.current)==null||f.on("stop-typing",j=>{j.room===(a==null?void 0:a._id)&&L(!1)})},[r==null?void 0:r.current,a]),h.useEffect(()=>{var f;(f=r==null?void 0:r.current)==null||f.on("read",j=>{p(N=>N.map(U=>(U._id===j._id&&(U={...U,read_by:j.read_by}),U)))})},[r==null?void 0:r.current]),u.jsxs(u.Fragment,{children:[a?u.jsxs("section",{className:"chatbox-container flex flex-col justify-between",children:[u.jsxs("section",{className:"header p-2 px-5 bg-gray-800 shadow-xl w-full flex",onClick:()=>{if(a.is_groupchat)O(!M);else{const f=a.members.find(j=>j!==(i==null?void 0:i._id));o(`/view-profile/${f}`)}},children:[u.jsxs("div",{className:"profile-img relative w-fit",children:[a.is_groupchat?a.icon?u.jsx("img",{src:a.icon,alt:"dsfkajfhskadfh",className:"w-16 h-16 rounded-full"}):u.jsx(se,{size:"medium",email:(a==null?void 0:a.chat_name)||""}):s&&((R=s[0])!=null&&R.profile_img)?u.jsx("img",{src:s[0].profile_img,alt:"dsfkajfhskadfh",className:"w-16 h-16 rounded-full"}):u.jsx(se,{size:"medium",email:s&&((E=s[0])==null?void 0:E.email)||""}),!a.is_groupchat&&e&&u.jsx("div",{className:"active rounded-full w-3 h-3 bg-green-400 absolute bottom-0 right-0"})]}),u.jsxs("div",{className:"name-info ms-3",children:[u.jsx("h1",{className:"text-2xl opacity-75      ",children:a.is_groupchat?a.chat_name:s&&((D=s[0])==null?void 0:D.username)}),C?u.jsx("span",{className:"text-xs",children:"Typing"}):a.is_groupchat&&u.jsxs("div",{className:"user-list flex gap-2 flex-nowrap",children:[a.members.includes(i==null?void 0:i._id)&&u.jsx("h1",{className:"text-xs text-gray-400",children:"you,"}),s==null?void 0:s.map((f,j)=>{if(j<2&&f.user_id!==(i==null?void 0:i._id))return u.jsx("h1",{className:"text-xs text-gray-400",children:f.username},j)}),s&&(s==null?void 0:s.length)>2?u.jsxs("span",{className:"text-xs text-gray-400",children:["and"," ",s.length-2," ","others"]}):null]})]})]}),u.jsxs("section",{className:"chat-body grow",ref:g,onScroll:f=>x(f),children:[w?u.jsxs("h1",{className:"message-loader text-center",children:["Chat history loading"," ",u.jsx(ar,{color:"info","aria-label":"Info spinner example "})]}):null,m&&m.map((f,j)=>u.jsx(Xi,{message:f,hanleDelete:K},j))]}),W?u.jsxs("div",{className:"file-box w-96 h-96 p-2 bg-gray-700 shadow-lg rounded-md",children:[W.file_type.includes("image")?u.jsx("img",{src:W.content,alt:""}):null,u.jsxs("div",{className:"footer py-3",children:[u.jsx("button",{className:"discard px-3 py-1 rounded-md bg-red-600",onClick:()=>{Zn(W.content),B(null)},children:"Discard"}),u.jsx("button",{className:"send px-3 py-1 rounded-md bg-primary ms-3",onClick:()=>q("file"),children:"Send"})]})]}):(F=a.removed_members)!=null&&F.includes(i==null?void 0:i._id)?u.jsx("div",{className:"py-3 w-full bg-slate-400",children:u.jsx("h1",{className:"text-center text-black",children:"You are no longer a member"})}):I?u.jsx("div",{className:"py-3 w-full bg-slate-400",children:u.jsx("h1",{className:"text-center text-black",children:I})}):u.jsxs("section",{className:"chat-sender flex items-center px-5 bg-gray-900 py-2",children:[u.jsx("div",{onClick:()=>{var f;return(f=v.current)==null?void 0:f.click()},className:"cursor-pointer",children:u.jsx(Kt,{})}),u.jsx(En,{value:d,onChange:f=>{_(f),k(!0),setTimeout(()=>{k(!1)},3e3)}}),u.jsx("div",{className:"send-button button cursor-pointer",onClick:()=>q("text"),children:"Send"}),u.jsx("input",{type:"file",name:"",accept:"image/*",id:"",ref:v,style:{display:"none"},onChange:J})]})]}):u.jsx("img",{src:"https://studio.uxpincdn.com/studio/wp-content/uploads/2023/04/Chat-User-Interface-Design.png.webp",alt:"",className:"h-full opacity-70"}),u.jsx("div",{children:u.jsx(to,{userDetails:s,setOpenDrawer:O,openDrawer:M,socket:r})})]})}var ct={},ro=je;Object.defineProperty(ct,"__esModule",{value:!0});var Ln=ct.default=void 0,io=ro(we()),oo=u,ao=(0,io.default)((0,oo.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");Ln=ct.default=ao;var lt={},so=je;Object.defineProperty(lt,"__esModule",{value:!0});var Rn=lt.default=void 0,co=so(we()),lo=u,uo=(0,co.default)((0,lo.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");Rn=lt.default=uo;function fo({openModal:e,setOpenModal:t,socket:n}){const r=De(),[o,i]=h.useState(""),{user:a}=te(w=>w.auth),[s,c]=h.useState(""),[d,l]=h.useState(""),[m,p]=h.useState([]),[v,g]=h.useState([]);h.useEffect(()=>{(async()=>{var w;try{const S=await ye.get(`/users/user-search?search=${o}`,{withCredentials:!0});S.data&&g(S.data.userData)}catch(S){const C=S;ue.error((w=C.response)==null?void 0:w.data.message)}})()},[o]);async function y(){var w;if(!s)l("chat name required");else if(m.length===0)l("Minimum 2 members required");else{const S={chat_name:s,members:m.map(L=>L.user_id)},C=await rr(S);C.chat&&(r(We(C.chat)),r(nt(C.chat)),(w=n==null?void 0:n.current)==null||w.emit("new-chat",C.chat),t(!1))}}return u.jsxs(He,{show:e,size:"md",onClose:()=>{p([]),t(!1)},children:[u.jsx(He.Header,{children:"Create group"}),u.jsxs(He.Body,{children:[d&&u.jsx("span",{className:"text-red-500",children:d}),u.jsxs("div",{className:"form-controle flex flex-col mb-3",children:[u.jsx("label",{htmlFor:"",children:"Group name"}),u.jsx("input",{type:"text",className:"rounded-md",onChange:w=>c(w.target.value)})]}),u.jsx("div",{className:"selected-users flex flex-wrap gap-3 mb-5 my-5",children:m&&m.map(w=>u.jsxs("div",{className:"user-badge bg-slate-100 px-2 rounded-md relative",children:[u.jsx("h1",{children:w.username}),u.jsx("div",{className:"absolute right-0 bottom-3",onClick:()=>p(S=>S.filter(C=>C.user_id!==C.user_id)),children:u.jsx(Rn,{className:"text-red-600"})})]}))}),u.jsx("input",{type:"text",className:"search rounded-md w-full",placeholder:"Search user",value:o,onChange:w=>i(w.target.value)}),u.jsxs("div",{className:"user-details mt-2 max-h-80 overflow-y-scroll",children:[v&&v.map((w,S)=>{if((a==null?void 0:a._id)!==w.user_id)return u.jsxs("div",{className:"user h-12 flex px-3 gap-3 items-center mb-2",onClick:()=>{i(""),p(C=>C.find(T=>T.user_id===w.user_id)?C:[...C,{user_id:w.user_id,username:w.username}])},children:[u.jsx("img",{src:w.profile_img,alt:"",className:"w-11 shadow rounded-md"}),u.jsxs("div",{className:"name leading-none",children:[u.jsx("h1",{children:w.username}),u.jsx("small",{children:w.fullname})]})]},S)}),u.jsx("button",{type:"button",className:"px-4 py-1 bg-primary  hover:bg-primary-hover rounded-md",onClick:y,children:"Create"})]})]})]})}function yo({socket:e}){const[t,n]=h.useState(""),r=Vn(),o=De(),{user:i}=te(k=>k.auth),{onlineUsers:a}=te(k=>k.socket),[s,c]=h.useState(null),[d,l]=h.useState(!1),[m,p]=h.useState(!1),[v,g]=h.useState(null),[y,w]=h.useState([]),{currentChat:S,chats:C}=te(k=>k.socket);h.useEffect(()=>{var k;s!==null&&(e!=null&&e.current)&&((k=e==null?void 0:e.current)==null||k.emit("send-message",s),o(dt(s)),c(null))},[s,e,S,o]),h.useEffect(()=>{var k;(k=e==null?void 0:e.current)==null||k.on("recieve-message",M=>{g(M)})},[e==null?void 0:e.current]),h.useEffect(()=>{var k;(k=e==null?void 0:e.current)==null||k.on("join-newchat",M=>{const O=C.find(I=>I._id===M._id);o(O!==void 0?We(M):_e(M))})},[e==null?void 0:e.current]),h.useEffect(()=>{var k;(k=e==null?void 0:e.current)==null||k.on("remove-chat",M=>{o(_e(M))})},[e==null?void 0:e.current]),h.useEffect(()=>{o(dt(v)),g(null)},[v,o]),h.useEffect(()=>{(async()=>{try{const k=await ye.get(`/users/user-search?search=${t}`,{withCredentials:!0});k.data&&w(k.data.userData)}catch(k){const M=k;ue.error(M.message)}})()},[t]),h.useEffect(()=>{C&&C.length===0&&(async()=>{const k=await ir();o(Wn(k))})()},[]),h.useEffect(()=>{r.pathname!=="/messages"&&o(ft())},[r,o]);async function L(k){var I;const M=await or(k);(I=e==null?void 0:e.current)==null||I.emit("new-chat",M),C.find(V=>V._id===M._id)||o(We(M)),o(nt(M))}const T=k=>{const M=k==null?void 0:k.members.find(I=>I!==(i==null?void 0:i._id));return!!(a==null?void 0:a.find(I=>M===I.userId))};return u.jsxs(u.Fragment,{children:[u.jsx(fo,{openModal:d,setOpenModal:l,socket:e}),u.jsxs("section",{className:"chat bg-red-400 grid grid-cols-12",children:[u.jsxs("div",{className:`chat-list ${S?"hidden":"block"} sm:block bg-primary-bg p-3 col-span-12 sm:col-span-5 md:col-span-3`,children:[u.jsxs("header",{className:"chat-header my-4 mb-7",children:[u.jsxs("div",{className:"flex items-center justify-between relative",children:[u.jsx("h1",{className:"chat-title my-5 mb-7 text-2xl",children:"Messages"}),u.jsx("div",{className:"cursor-pointer mb-5",onClick:()=>p(!m),children:u.jsx(qn,{size:35})}),m&&u.jsx("div",{className:"threedot-handle absolute right-0 top-12",onClick:()=>p(!1),children:u.jsx(pt,{className:"w-48",children:u.jsx(pt.Item,{onClick:()=>l(!0),children:"Create Group"})})})]}),u.jsx("input",{type:"text",className:"search bg-seconday-bg border-none rounded-md w-full shadow-lg",onChange:k=>n(k.target.value),placeholder:"Search",value:t}),y.length>0&&u.jsx("div",{className:"user-list-search absolute mt-2 py-2 bg-seconday-bg w-80 shadow-md cursor-pointer z-20",children:y.map((k,M)=>u.jsxs("div",{className:"user h-12 flex px-3 gap-3 items-center mb-2",onClick:()=>{n(""),L(k.user_id)},children:[u.jsx("img",{src:k.profile_img,alt:"",className:"w-11 shadow rounded-md"}),u.jsxs("div",{className:"name leading-none",children:[u.jsx("h1",{children:k.username}),u.jsx("small",{children:k.fullname})]})]},M))})]}),C&&C.map((k,M)=>{var O;if((O=k.latest_message)!=null&&O.content||k.is_groupchat)return u.jsx(dr,{chat:k,online:T(k)},M)})]}),u.jsxs("div",{className:`message-section ${S?"block":"hidden"}  sm:block bg-seconday-bg w-full col-span-12 sm:col-span-7 md:col-span-9 `,children:[u.jsx("div",{className:"back-arrow p-2 absolute md:hidden",onClick:()=>o(ft()),children:u.jsx(Ln,{})}),u.jsx(no,{online:T(S),setSendMessage:c,receivedMessage:v,socket:e})]})]})]})}export{yo as default};
