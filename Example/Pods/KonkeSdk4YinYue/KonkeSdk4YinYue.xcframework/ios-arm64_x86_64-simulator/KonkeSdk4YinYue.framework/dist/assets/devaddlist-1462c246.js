import{_ as v,c as r,b as i,a,w as c,o as n,F as u,r as h,j as g,t as w,e as y}from"./_plugin-vue_export-helper-4f5b7d1e.js";import"./index-bf3f378e.js";import{G as I,a as b}from"./index-30038f31.js";import{_ as U}from"./nav-bar-1594fc52.js";import{g as k}from"./urlparse-f25d0f77.js";import{M as L}from"./api-308b1525.js";import{a as d}from"./function-call-4776fd23.js";import"./use-route-2687c77d.js";import"./use-touch-6a5c47ae.js";import"./index-fb04ff69.js";import"./index-a604daa8.js";const R=""+new URL("ic_dev_add_env-cc4a03d5.svg",import.meta.url).href,C=""+new URL("ic_dev_add_flootheart-bbb0b4a2.svg",import.meta.url).href,_=""+new URL("ic_dev_add_freshair-2dc786f1.svg",import.meta.url).href,D=""+new URL("ic_dev_add_host-ad2e924e.svg",import.meta.url).href,j=""+new URL("ic_dev_add_infrerad-57c910a0.svg",import.meta.url).href,x=""+new URL("ic_dev_add_light-463fdafe.svg",import.meta.url).href,P=""+new URL("ic_dev_add_motor-67b1b987.svg",import.meta.url).href;const A={name:"KonkeSdk4YinYueSrcApp",data(){return{data:[{typeId:280,icon:D,name:"灵悦主机"},{typeId:383,icon:x,name:"智能灯控"},{typeId:451,icon:C,name:"地暖面板"},{typeId:451,icon:_,name:"新风面板"},{typeId:451,icon:_,name:"空调面板"},{typeId:317,icon:P,name:"电动窗帘"},{typeId:552,icon:R,name:"环境传感器"},{typeId:315,icon:j,name:"红外遥控器"}]}},mounted(){this.getUrlParams()},methods:{getUrlParams(){let e=window.location.search;const t=k(e);console.log(t),t!=null&&"gatewayUserDeviceId"in t&&(this.gatewayUserDeviceId=t.gatewayUserDeviceId,console.log(this.devId))},onClickLeft(){window.__jsb.pop()},toDevHelp(e){e==280?this.scanQR():window.__jsb.push({route:"devhelp",params:{typeId:e,gatewayUserDeviceId:this.gatewayUserDeviceId}})},async scanQR(){this.plusPopoverVisible=!1;const{value:e}=await window.__jsb.scanQR();try{await L({qrCode:e}),window.__jsb.forwardEvent({eventName:"reload",fromPage:"devaddlist"}),d("绑定成功")}catch(t){d(t.info||"二维码错误")}}}},B={class:"home"},G={class:"name_group"},H=["src"],N={class:"dev_text"};function Q(e,t,V,E,m,s){const p=U,l=b,f=I;return n(),r("div",B,[i(p,{title:"选择设备",onClickLeft:s.onClickLeft},null,8,["onClickLeft"]),a("div",G,[i(f,{"column-num":4,border:!1},{default:c(()=>[(n(!0),r(u,null,h(m.data,o=>(n(),g(l,{key:o.typeId,onClick:F=>s.toDevHelp(o.typeId)},{default:c(()=>[a("img",{src:o.icon},null,8,H),a("div",N,w(o.name),1)]),_:2},1032,["onClick"]))),128))]),_:1})])])}const S=v(A,[["render",Q],["__scopeId","data-v-f7f0a095"]]);y(S).mount("#root");
