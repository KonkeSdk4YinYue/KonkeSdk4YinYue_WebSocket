import{c as B,x as $,n as d,t as P,a as b,f as u,v as j,I as D,w as _}from"./index-bf3f378e.js";import{h as C,q as f,H as N,s as R,E as U,J as q,A,i as z,b as n,g as F,S as H,m as S}from"./_plugin-vue_export-helper-4f5b7d1e.js";const[J,t]=B("image"),M={src:String,alt:String,fit:String,position:String,round:Boolean,block:Boolean,width:d,height:d,radius:d,lazyLoad:Boolean,iconSize:d,showError:P,errorIcon:b("photo-fail"),iconPrefix:String,showLoading:P,loadingIcon:b("photo")};var O=C({name:J,props:M,emits:["load","error"],setup(a,{emit:v,slots:s}){const i=f(!1),o=f(!0),r=f(),{$Lazyload:l}=N().proxy,x=R(()=>{const e={width:u(a.width),height:u(a.height)};return j(a.radius)&&(e.overflow="hidden",e.borderRadius=u(a.radius)),e});U(()=>a.src,()=>{i.value=!1,o.value=!0});const g=e=>{o.value&&(o.value=!1,v("load",e))},m=()=>{const e=new Event("load");Object.defineProperty(e,"target",{value:r.value,enumerable:!0}),g(e)},h=e=>{i.value=!0,o.value=!1,v("error",e)},w=(e,c,I)=>I?I():n(D,{name:e,size:a.iconSize,class:c,classPrefix:a.iconPrefix},null),E=()=>{if(o.value&&a.showLoading)return n("div",{class:t("loading")},[w(a.loadingIcon,t("loading-icon"),s.loading)]);if(i.value&&a.showError)return n("div",{class:t("error")},[w(a.errorIcon,t("error-icon"),s.error)])},k=()=>{if(i.value||!a.src)return;const e={alt:a.alt,class:t("img"),style:{objectFit:a.fit,objectPosition:a.position}};return a.lazyLoad?F(n("img",S({ref:r},e),null),[[H("lazy"),a.src]]):n("img",S({ref:r,src:a.src,onLoad:g,onError:h},e),null)},y=({el:e})=>{const c=()=>{e===r.value&&o.value&&m()};r.value?c():z(c)},L=({el:e})=>{e===r.value&&!i.value&&h()};return l&&$&&(l.$on("loaded",y),l.$on("error",L),q(()=>{l.$off("loaded",y),l.$off("error",L)})),A(()=>{z(()=>{var e;(e=r.value)!=null&&e.complete&&!a.lazyLoad&&m()})}),()=>{var e;return n("div",{class:t({round:a.round,block:a.block}),style:x.value},[k(),E(),(e=s.default)==null?void 0:e.call(s)])}}});const G=_(O);export{G as I};
