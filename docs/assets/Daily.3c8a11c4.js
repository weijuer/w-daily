import{_ as p,u as m,a as y,c as r,r as h,o as a,b as o,d as c,F as g,e as f,f as n,g as v,w as k}from"./index.15e372c7.js";const w={class:"daily-page"},x={class:"grid daily-list"},D=["src"],C={__name:"Daily",setup(B){const i=m(),e=y();e.dispatch("daily/getDailyList");const l=r(()=>e.getters["daily/dailyList"]),_=r(()=>`https://1source.unsplash.com/random/240x240/?nature,water&time=${Date.now()}`);function d(s){e.dispatch("daily/setCurrent",s),i.push({path:"/articles"})}return(s,L)=>{const u=h("w-card");return a(),o("section",w,[c("article",x,[(a(!0),o(g,null,f(n(l),t=>(a(),v(u,{key:t.id,title:"Daily: "+t.name,onClick:b=>d(t.id)},{default:k(()=>[c("img",{class:"daily-card-img",src:n(_),alt:""},null,8,D)]),_:2},1032,["title","onClick"]))),128))])])}}};var I=p(C,[["__scopeId","data-v-76f25b62"]]);export{I as default};
