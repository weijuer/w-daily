import{_,u as p,a as u,c as y,r as h,o as s,b as o,d as r,F as m,e as g,f,g as v,w as k,p as w,h as x}from"./index.cbf54403.js";const C=t=>(w("data-v-1c0a5ba2"),t=t(),x(),t),B={class:"daily-page"},D={class:"grid daily-list"},I=C(()=>r("img",{class:"daily-card-img",src:"https://1source.unsplash.com/random/240x240/?nature,water",alt:""},null,-1)),L={setup(t){const i=p(),a=u();a.dispatch("daily/getDailyList");const l=y(()=>a.getters["daily/dailyList"]);function n(c){a.dispatch("daily/setCurrent",c),i.push({path:"/articles"})}return(c,S)=>{const d=h("w-card");return s(),o("section",B,[r("article",D,[(s(!0),o(m,null,g(f(l),e=>(s(),v(d,{key:e.id,title:"Daily: "+e.name,onClick:b=>n(e.id)},{default:k(()=>[I]),_:2},1032,["title","onClick"]))),128))])])}}};var j=_(L,[["__scopeId","data-v-1c0a5ba2"]]);export{j as default};
//# sourceMappingURL=Daily.c506f626.js.map