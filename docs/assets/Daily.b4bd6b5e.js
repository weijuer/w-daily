import{_ as p,u as _,a as u,c as m,r as y,o as e,b as r,d as c,F as h,e as f,f as g,g as x,w as v,p as w,h as b}from"./index.47a39107.js";const k=a=>(w("data-v-1c0a5ba2"),a=a(),b(),a),B={class:"daily-page"},C={class:"grid daily-list"},D=k(()=>c("img",{class:"daily-card-img",src:"https://1source.unsplash.com/random/240x240/?nature,water",alt:""},null,-1)),I={__name:"Daily",setup(a){const l=_(),t=u();t.dispatch("daily/getDailyList");const o=m(()=>t.getters["daily/dailyList"]);function d(i){t.dispatch("daily/setCurrent",i),l.push({path:"/articles"})}return(i,L)=>{const n=y("w-card");return e(),r("section",B,[c("article",C,[(e(!0),r(h,null,f(g(o),s=>(e(),x(n,{key:s.id,title:"Daily: "+s.name,onClick:O=>d(s.id)},{default:v(()=>[D]),_:2},1032,["title","onClick"]))),128))])])}}};var F=p(I,[["__scopeId","data-v-1c0a5ba2"]]);export{F as default};
