import{_,c as v,b as n,w as h,g as f,v as u,a as r,o as w,p as g,d as I,l as C,e as N}from"./_plugin-vue_export-helper-4f5b7d1e.js";import"./index-bf3f378e.js";/* empty css              *//* empty css              */import"./index-e990ab3d.js";import{F as L}from"./index-73da5595.js";import{_ as R}from"./nav-bar-1594fc52.js";import{R as b}from"./room-component-7b903318.js";import{S as D}from"./scene-action-light-component-699fb0c9.js";import{f as k,t as P,u as S,r as V}from"./api-308b1525.js";import{g as j}from"./urlparse-f25d0f77.js";import{a as m}from"./function-call-4776fd23.js";import{P as x}from"./index-fb04ff69.js";import"./use-route-2687c77d.js";import"./use-id-30d68b53.js";import"./use-touch-6a5c47ae.js";import"./index-ebd2fbba.js";import"./index-b5a1cd1d.js";import"./index-6a50b8f9.js";/* empty css              */import"./index-284dcd17.js";import"./index-3b5238ca.js";import"./index-a604daa8.js";const U={components:{SceneActionLight:D,RoomListPop:b},data(){return{devName:"",room_sel_show:!1,roomList:[],roomName:"",roomId:-1,devId:-1}},mounted(){this.getUrlParams()},methods:{getUrlParams(){let o=window.location.search;const e=j(o);console.log(e),e!=null&&"devId"in e&&(this.devId=e.devId,console.log(this.devId),this.devId!=null&&this.devId!=-1&&this.getDevInfo())},getDevInfo(){k({userDeviceId:this.devId}).then(o=>{var e;console.log(o),this.roomName=(e=o.data.userDeviceList[0])==null?void 0:e.roomName,this.roomId=o.data.userDeviceList[0].roomId,this.devName=o.data.userDeviceList[0].deviceName}).catch(o=>m(o))},onClickLeft(){window.__jsb.pop()},onClickRight(){if(this.devName==""){m("请输入设备名称");return}if(this.roomId==-1){m("请选择房间");return}P(this.devId,this.devName,this.roomId).then(o=>{window.__jsb.forwardEvent({eventName:"reload",eventData:"",fromPage:"devedit",toPage:""}),window.__jsb.pop()})},delDev(){S(this.devId).then(o=>{window.__jsb.forwardEvent({eventName:"reload",eventData:"",fromPage:"devedit",toPage:""}),window.__jsb.pop()}).catch(o=>{m(o)})},selRoom(){this.room_sel_show=!0,V().then(o=>{o.code==200?this.roomList=o.data.roomList:m(o.info)})},onRoomSelCancel(){this.room_sel_show=!1},onRoomSelConfirm(o){console.log("onRoomSelConfirm",o),this.roomName=o.roomName,this.roomId=o.roomId,this.room_sel_show=!1}}},a=o=>(g("data-v-66c278ba"),o=o(),I(),o),A={class:"home"},O=a(()=>r("div",{class:"name_hint"}," 设备名称 ",-1)),y=a(()=>r("div",{class:"name_hint"}," 房间 ",-1));function B(o,e,F,T,t,s){const d=R,l=L,c=C("RoomListPop"),p=x;return w(),v("div",A,[n(d,{class:"nav_bar",title:"编辑设备","right-text":"保存",onClickRight:s.onClickRight,onClickLeft:s.onClickLeft},null,8,["onClickRight","onClickLeft"]),O,n(l,{class:"input",modelValue:t.devName,"onUpdate:modelValue":e[0]||(e[0]=i=>t.devName=i),clearable:"",placeholder:"请输入设备名称"},null,8,["modelValue"]),y,n(l,{class:"input",modelValue:t.roomName,"onUpdate:modelValue":e[1]||(e[1]=i=>t.roomName=i),onClick:s.selRoom,"right-icon":"arrow ",readonly:"",placeholder:"请选择房间"},null,8,["modelValue","onClick"]),n(p,{show:t.room_sel_show,"onUpdate:show":e[2]||(e[2]=i=>t.room_sel_show=i),position:"bottom"},{default:h(()=>[n(c,{list:t.roomList,onOnCancal:s.onRoomSelCancel,onOnConfirm:s.onRoomSelConfirm},null,8,["list","onOnCancal","onOnConfirm"])]),_:1},8,["show"]),f(r("div",{class:"del_text",onClick:e[3]||(e[3]=(...i)=>s.delDev&&s.delDev(...i))},"删除设备",512),[[u,t.devId!=null&&t.devId!=-1]])])}const E=_(U,[["render",B],["__scopeId","data-v-66c278ba"]]);N(E).mount("#root");
