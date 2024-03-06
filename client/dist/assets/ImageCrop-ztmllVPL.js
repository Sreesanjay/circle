import{r as E,R as p,j as y}from"./index-HNWM3XXZ.js";import{M as k,f as P}from"./Toast-YAWujjSQ.js";const Y={x:0,y:0,width:0,height:0,unit:"px"},b=(c,e,t)=>Math.min(Math.max(c,e),t),K=(...c)=>c.filter(e=>e&&typeof e=="string").join(" "),$=(c,e)=>c===e||c.width===e.width&&c.height===e.height&&c.x===e.x&&c.y===e.y&&c.unit===e.unit;function R(c,e,t){return c.unit==="%"?{...Y,...c,unit:"%"}:{unit:"%",x:c.x?c.x/e*100:0,y:c.y?c.y/t*100:0,width:c.width?c.width/e*100:0,height:c.height?c.height/t*100:0}}function v(c,e,t){return c.unit?c.unit==="px"?{...Y,...c,unit:"px"}:{unit:"px",x:c.x?c.x*e/100:0,y:c.y?c.y*t/100:0,width:c.width?c.width*e/100:0,height:c.height?c.height*t/100:0}:{...Y,...c,unit:"px"}}function I(c,e,t,o,n,i=0,h=0,l=o,a=n){const r={...c};let d=Math.min(i,o),w=Math.min(h,n),g=Math.min(l,o),s=Math.min(a,n);e&&(e>1?(d=h?h*e:d,w=d/e,g=l*e):(w=i?i/e:w,d=w*e,s=a/e)),r.y<0&&(r.height=Math.max(r.height+r.y,w),r.y=0),r.x<0&&(r.width=Math.max(r.width+r.x,d),r.x=0);const m=o-(r.x+r.width);m<0&&(r.x=Math.min(r.x,o-d),r.width+=m);const u=n-(r.y+r.height);if(u<0&&(r.y=Math.min(r.y,n-w),r.height+=u),r.width<d&&((t==="sw"||t=="nw")&&(r.x-=d-r.width),r.width=d),r.height<w&&((t==="nw"||t=="ne")&&(r.y-=w-r.height),r.height=w),r.width>g&&((t==="sw"||t=="nw")&&(r.x-=g-r.width),r.width=g),r.height>s&&((t==="nw"||t=="ne")&&(r.y-=s-r.height),r.height=s),e){const D=r.width/r.height;if(D<e){const x=Math.max(r.width/e,w);(t==="nw"||t=="ne")&&(r.y-=x-r.height),r.height=x}else if(D>e){const x=Math.max(r.height*e,d);(t==="sw"||t=="nw")&&(r.x-=x-r.width),r.width=x}}return r}function B(c,e,t,o){const n={...c};return e==="ArrowLeft"?o==="nw"?(n.x-=t,n.y-=t,n.width+=t,n.height+=t):o==="w"?(n.x-=t,n.width+=t):o==="sw"?(n.x-=t,n.width+=t,n.height+=t):o==="ne"?(n.y+=t,n.width-=t,n.height-=t):o==="e"?n.width-=t:o==="se"&&(n.width-=t,n.height-=t):e==="ArrowRight"&&(o==="nw"?(n.x+=t,n.y+=t,n.width-=t,n.height-=t):o==="w"?(n.x+=t,n.width-=t):o==="sw"?(n.x+=t,n.width-=t,n.height-=t):o==="ne"?(n.y-=t,n.width+=t,n.height+=t):o==="e"?n.width+=t:o==="se"&&(n.width+=t,n.height+=t)),e==="ArrowUp"?o==="nw"?(n.x-=t,n.y-=t,n.width+=t,n.height+=t):o==="n"?(n.y-=t,n.height+=t):o==="ne"?(n.y-=t,n.width+=t,n.height+=t):o==="sw"?(n.x+=t,n.width-=t,n.height-=t):o==="s"?n.height-=t:o==="se"&&(n.width-=t,n.height-=t):e==="ArrowDown"&&(o==="nw"?(n.x+=t,n.y+=t,n.width-=t,n.height-=t):o==="n"?(n.y+=t,n.height-=t):o==="ne"?(n.y+=t,n.width-=t,n.height-=t):o==="sw"?(n.x-=t,n.width+=t,n.height+=t):o==="s"?n.height+=t:o==="se"&&(n.width+=t,n.height+=t)),n}const M={capture:!0,passive:!1};let N=0;const f=class C extends E.PureComponent{constructor(){super(...arguments),this.docMoveBound=!1,this.mouseDownOnCrop=!1,this.dragStarted=!1,this.evData={startClientX:0,startClientY:0,startCropX:0,startCropY:0,clientX:0,clientY:0,isResize:!0},this.componentRef=E.createRef(),this.mediaRef=E.createRef(),this.initChangeCalled=!1,this.instanceId=`rc-${N++}`,this.state={cropIsActive:!1,newCropIsBeingDrawn:!1},this.onCropPointerDown=e=>{const{crop:t,disabled:o}=this.props,n=this.getBox();if(!t)return;const i=v(t,n.width,n.height);if(o)return;e.cancelable&&e.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const h=e.target.dataset.ord,l=!!h;let a=e.clientX,r=e.clientY,d=i.x,w=i.y;if(h){const g=e.clientX-n.x,s=e.clientY-n.y;let m=0,u=0;h==="ne"||h=="e"?(m=g-(i.x+i.width),u=s-i.y,d=i.x,w=i.y+i.height):h==="se"||h==="s"?(m=g-(i.x+i.width),u=s-(i.y+i.height),d=i.x,w=i.y):h==="sw"||h=="w"?(m=g-i.x,u=s-(i.y+i.height),d=i.x+i.width,w=i.y):(h==="nw"||h=="n")&&(m=g-i.x,u=s-i.y,d=i.x+i.width,w=i.y+i.height),a=d+n.x+m,r=w+n.y+u}this.evData={startClientX:a,startClientY:r,startCropX:d,startCropY:w,clientX:e.clientX,clientY:e.clientY,isResize:l,ord:h},this.mouseDownOnCrop=!0,this.setState({cropIsActive:!0})},this.onComponentPointerDown=e=>{const{crop:t,disabled:o,locked:n,keepSelection:i,onChange:h}=this.props,l=this.getBox();if(o||n||i&&t)return;e.cancelable&&e.preventDefault(),this.bindDocMove(),this.componentRef.current.focus({preventScroll:!0});const a=e.clientX-l.x,r=e.clientY-l.y,d={unit:"px",x:a,y:r,width:0,height:0};this.evData={startClientX:e.clientX,startClientY:e.clientY,startCropX:a,startCropY:r,clientX:e.clientX,clientY:e.clientY,isResize:!0},this.mouseDownOnCrop=!0,h(v(d,l.width,l.height),R(d,l.width,l.height)),this.setState({cropIsActive:!0,newCropIsBeingDrawn:!0})},this.onDocPointerMove=e=>{const{crop:t,disabled:o,onChange:n,onDragStart:i}=this.props,h=this.getBox();if(o||!t||!this.mouseDownOnCrop)return;e.cancelable&&e.preventDefault(),this.dragStarted||(this.dragStarted=!0,i&&i(e));const{evData:l}=this;l.clientX=e.clientX,l.clientY=e.clientY;let a;l.isResize?a=this.resizeCrop():a=this.dragCrop(),$(t,a)||n(v(a,h.width,h.height),R(a,h.width,h.height))},this.onComponentKeyDown=e=>{const{crop:t,disabled:o,onChange:n,onComplete:i}=this.props;if(o)return;const h=e.key;let l=!1;if(!t)return;const a=this.getBox(),r=this.makePixelCrop(a),d=(navigator.platform.match("Mac")?e.metaKey:e.ctrlKey)?C.nudgeStepLarge:e.shiftKey?C.nudgeStepMedium:C.nudgeStep;if(h==="ArrowLeft"?(r.x-=d,l=!0):h==="ArrowRight"?(r.x+=d,l=!0):h==="ArrowUp"?(r.y-=d,l=!0):h==="ArrowDown"&&(r.y+=d,l=!0),l){e.cancelable&&e.preventDefault(),r.x=b(r.x,0,a.width-r.width),r.y=b(r.y,0,a.height-r.height);const w=v(r,a.width,a.height),g=R(r,a.width,a.height);n(w,g),i&&i(w,g)}},this.onHandlerKeyDown=(e,t)=>{const{aspect:o=0,crop:n,disabled:i,minWidth:h=0,minHeight:l=0,maxWidth:a,maxHeight:r,onChange:d,onComplete:w}=this.props,g=this.getBox();if(i||!n)return;if(e.key==="ArrowUp"||e.key==="ArrowDown"||e.key==="ArrowLeft"||e.key==="ArrowRight")e.stopPropagation(),e.preventDefault();else return;const s=(navigator.platform.match("Mac")?e.metaKey:e.ctrlKey)?C.nudgeStepLarge:e.shiftKey?C.nudgeStepMedium:C.nudgeStep,m=v(n,g.width,g.height),u=B(m,e.key,s,t),D=I(u,o,t,g.width,g.height,h,l,a,r);if(!$(n,D)){const x=R(D,g.width,g.height);d(D,x),w&&w(D,x)}},this.onDocPointerDone=e=>{const{crop:t,disabled:o,onComplete:n,onDragEnd:i}=this.props,h=this.getBox();this.unbindDocMove(),!(o||!t)&&this.mouseDownOnCrop&&(this.mouseDownOnCrop=!1,this.dragStarted=!1,i&&i(e),n&&n(v(t,h.width,h.height),R(t,h.width,h.height)),this.setState({cropIsActive:!1,newCropIsBeingDrawn:!1}))},this.onDragFocus=()=>{var e;(e=this.componentRef.current)==null||e.scrollTo(0,0)}}get document(){return document}getBox(){const e=this.mediaRef.current;if(!e)return{x:0,y:0,width:0,height:0};const{x:t,y:o,width:n,height:i}=e.getBoundingClientRect();return{x:t,y:o,width:n,height:i}}componentDidUpdate(e){const{crop:t,onComplete:o}=this.props;if(o&&!e.crop&&t){const{width:n,height:i}=this.getBox();n&&i&&o(v(t,n,i),R(t,n,i))}}componentWillUnmount(){this.resizeObserver&&this.resizeObserver.disconnect()}bindDocMove(){this.docMoveBound||(this.document.addEventListener("pointermove",this.onDocPointerMove,M),this.document.addEventListener("pointerup",this.onDocPointerDone,M),this.document.addEventListener("pointercancel",this.onDocPointerDone,M),this.docMoveBound=!0)}unbindDocMove(){this.docMoveBound&&(this.document.removeEventListener("pointermove",this.onDocPointerMove,M),this.document.removeEventListener("pointerup",this.onDocPointerDone,M),this.document.removeEventListener("pointercancel",this.onDocPointerDone,M),this.docMoveBound=!1)}getCropStyle(){const{crop:e}=this.props;if(e)return{top:`${e.y}${e.unit}`,left:`${e.x}${e.unit}`,width:`${e.width}${e.unit}`,height:`${e.height}${e.unit}`}}dragCrop(){const{evData:e}=this,t=this.getBox(),o=this.makePixelCrop(t),n=e.clientX-e.startClientX,i=e.clientY-e.startClientY;return o.x=b(e.startCropX+n,0,t.width-o.width),o.y=b(e.startCropY+i,0,t.height-o.height),o}getPointRegion(e,t,o,n){const{evData:i}=this,h=i.clientX-e.x,l=i.clientY-e.y;let a;n&&t?a=t==="nw"||t==="n"||t==="ne":a=l<i.startCropY;let r;return o&&t?r=t==="nw"||t==="w"||t==="sw":r=h<i.startCropX,r?a?"nw":"sw":a?"ne":"se"}resolveMinDimensions(e,t,o=0,n=0){const i=Math.min(o,e.width),h=Math.min(n,e.height);return!t||!i&&!h?[i,h]:t>1?i?[i,i/t]:[h*t,h]:h?[h*t,h]:[i,i/t]}resizeCrop(){const{evData:e}=this,{aspect:t=0,maxWidth:o,maxHeight:n}=this.props,i=this.getBox(),[h,l]=this.resolveMinDimensions(i,t,this.props.minWidth,this.props.minHeight);let a=this.makePixelCrop(i);const r=this.getPointRegion(i,e.ord,h,l),d=e.ord||r;let w=e.clientX-e.startClientX,g=e.clientY-e.startClientY;(h&&d==="nw"||d==="w"||d==="sw")&&(w=Math.min(w,-h)),(l&&d==="nw"||d==="n"||d==="ne")&&(g=Math.min(g,-l));const s={unit:"px",x:0,y:0,width:0,height:0};r==="ne"?(s.x=e.startCropX,s.width=w,t?(s.height=s.width/t,s.y=e.startCropY-s.height):(s.height=Math.abs(g),s.y=e.startCropY-s.height)):r==="se"?(s.x=e.startCropX,s.y=e.startCropY,s.width=w,t?s.height=s.width/t:s.height=g):r==="sw"?(s.x=e.startCropX+w,s.y=e.startCropY,s.width=Math.abs(w),t?s.height=s.width/t:s.height=g):r==="nw"&&(s.x=e.startCropX+w,s.width=Math.abs(w),t?(s.height=s.width/t,s.y=e.startCropY-s.height):(s.height=Math.abs(g),s.y=e.startCropY+g));const m=I(s,t,r,i.width,i.height,h,l,o,n);return t||C.xyOrds.indexOf(d)>-1?a=m:C.xOrds.indexOf(d)>-1?(a.x=m.x,a.width=m.width):C.yOrds.indexOf(d)>-1&&(a.y=m.y,a.height=m.height),a.x=b(a.x,0,i.width-a.width),a.y=b(a.y,0,i.height-a.height),a}renderCropSelection(){const{ariaLabels:e=C.defaultProps.ariaLabels,disabled:t,locked:o,renderSelectionAddon:n,ruleOfThirds:i,crop:h}=this.props,l=this.getCropStyle();if(h)return p.createElement("div",{style:l,className:"ReactCrop__crop-selection",onPointerDown:this.onCropPointerDown,"aria-label":e.cropArea,tabIndex:0,onKeyDown:this.onComponentKeyDown,role:"group"},!t&&!o&&p.createElement("div",{className:"ReactCrop__drag-elements",onFocus:this.onDragFocus},p.createElement("div",{className:"ReactCrop__drag-bar ord-n","data-ord":"n"}),p.createElement("div",{className:"ReactCrop__drag-bar ord-e","data-ord":"e"}),p.createElement("div",{className:"ReactCrop__drag-bar ord-s","data-ord":"s"}),p.createElement("div",{className:"ReactCrop__drag-bar ord-w","data-ord":"w"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-nw","data-ord":"nw",tabIndex:0,"aria-label":e.nwDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"nw"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-n","data-ord":"n",tabIndex:0,"aria-label":e.nDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"n"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-ne","data-ord":"ne",tabIndex:0,"aria-label":e.neDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"ne"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-e","data-ord":"e",tabIndex:0,"aria-label":e.eDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"e"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-se","data-ord":"se",tabIndex:0,"aria-label":e.seDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"se"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-s","data-ord":"s",tabIndex:0,"aria-label":e.sDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"s"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-sw","data-ord":"sw",tabIndex:0,"aria-label":e.swDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"sw"),role:"button"}),p.createElement("div",{className:"ReactCrop__drag-handle ord-w","data-ord":"w",tabIndex:0,"aria-label":e.wDragHandle,onKeyDown:a=>this.onHandlerKeyDown(a,"w"),role:"button"})),n&&p.createElement("div",{className:"ReactCrop__selection-addon",onPointerDown:a=>a.stopPropagation()},n(this.state)),i&&p.createElement(p.Fragment,null,p.createElement("div",{className:"ReactCrop__rule-of-thirds-hz"}),p.createElement("div",{className:"ReactCrop__rule-of-thirds-vt"})))}makePixelCrop(e){const t={...Y,...this.props.crop||{}};return v(t,e.width,e.height)}render(){const{aspect:e,children:t,circularCrop:o,className:n,crop:i,disabled:h,locked:l,style:a,ruleOfThirds:r}=this.props,{cropIsActive:d,newCropIsBeingDrawn:w}=this.state,g=i?this.renderCropSelection():null,s=K("ReactCrop",n,d&&"ReactCrop--active",h&&"ReactCrop--disabled",l&&"ReactCrop--locked",w&&"ReactCrop--new-crop",i&&e&&"ReactCrop--fixed-aspect",i&&o&&"ReactCrop--circular-crop",i&&r&&"ReactCrop--rule-of-thirds",!this.dragStarted&&i&&!i.width&&!i.height&&"ReactCrop--invisible-crop",o&&"ReactCrop--no-animate");return p.createElement("div",{ref:this.componentRef,className:s,style:a},p.createElement("div",{ref:this.mediaRef,className:"ReactCrop__child-wrapper",onPointerDown:this.onComponentPointerDown},t),i?p.createElement("svg",{className:"ReactCrop__crop-mask",width:"100%",height:"100%"},p.createElement("defs",null,p.createElement("mask",{id:`hole-${this.instanceId}`},p.createElement("rect",{width:"100%",height:"100%",fill:"white"}),o?p.createElement("ellipse",{cx:`${i.x+i.width/2}${i.unit}`,cy:`${i.y+i.height/2}${i.unit}`,rx:`${i.width/2}${i.unit}`,ry:`${i.height/2}${i.unit}`,fill:"black"}):p.createElement("rect",{x:`${i.x}${i.unit}`,y:`${i.y}${i.unit}`,width:`${i.width}${i.unit}`,height:`${i.height}${i.unit}`,fill:"black"}))),p.createElement("rect",{fill:"black",fillOpacity:.5,width:"100%",height:"100%",mask:`url(#hole-${this.instanceId})`})):void 0,g)}};f.xOrds=["e","w"],f.yOrds=["n","s"],f.xyOrds=["nw","ne","se","sw"],f.nudgeStep=1,f.nudgeStepMedium=10,f.nudgeStepLarge=100,f.defaultProps={ariaLabels:{cropArea:"Use the arrow keys to move the crop selection area",nwDragHandle:"Use the arrow keys to move the north west drag handle to change the crop selection area",nDragHandle:"Use the up and down arrow keys to move the north drag handle to change the crop selection area",neDragHandle:"Use the arrow keys to move the north east drag handle to change the crop selection area",eDragHandle:"Use the up and down arrow keys to move the east drag handle to change the crop selection area",seDragHandle:"Use the arrow keys to move the south east drag handle to change the crop selection area",sDragHandle:"Use the up and down arrow keys to move the south drag handle to change the crop selection area",swDragHandle:"Use the arrow keys to move the south west drag handle to change the crop selection area",wDragHandle:"Use the up and down arrow keys to move the west drag handle to change the crop selection area"}};let A=f;const O=({src:c,aspect:e,isCrop:t,setisCrop:o,setImage:n})=>{const i={width:"150px",height:"40px"},[h,l]=E.useState(),[a,r]=E.useState(),d=E.useRef(null),w=async(m,u)=>new Promise(D=>{const x=document.createElement("canvas"),H=m.naturalWidth/m.width,S=m.naturalHeight/m.height;x.width=u.width,x.height=u.height;const X=x.getContext("2d");X&&(X.drawImage(m,u.x*H,u.y*S,u.width*H,u.height*S,0,0,u.width,u.height),x.toBlob(_=>{_&&D(_)},"image/jpeg"))});async function g(){if(a&&d.current){const m=await w(d.current,a);n(m),o(!1)}}function s(){o(!1)}return y.jsx(y.Fragment,{children:y.jsxs(k,{show:t,onClose:()=>o(!1),children:[y.jsx(k.Header,{children:"Image crop"}),y.jsx(k.Body,{children:y.jsx("div",{className:"space-y-6",children:y.jsx(A,{crop:h,onChange:(m,u)=>l(u),onComplete:m=>r(m),aspect:e&&e,children:y.jsx("img",{src:c,alt:"",ref:d,className:"h-96"})})})}),y.jsx(k.Footer,{children:y.jsxs("div",{className:"w-full flex gap-5",children:[y.jsx(P,{onClick:()=>g(),style:i,children:"Crop"}),y.jsx(P,{color:"gray",onClick:()=>s(),style:i,children:"Decline"})]})})]})})},U=O;export{U as I};
