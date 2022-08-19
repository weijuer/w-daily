/* empty css                                               */import{d as r,o as c,e as i,f as l,n as p,u as d,_ as u,g as v,h as m,i as n,a as g,w as h,j as _,p as x,k as f}from"./index.a0b67b69.js";const y={name:"Bubble"},b=Object.assign(y,{props:{type:String},setup(s){const e=s,t=r(()=>e.type?`bubble-${e.type}`:"");return(a,o)=>(c(),i("div",{class:p(["bubble",[d(t)]])},[l(a.$slots,"default")],2))}});CSS.paintWorklet.addModule(`data:application/javascript;charset=utf8,${encodeURIComponent(`

  class MagnetMatrixPaintWorklet {
    static get inputProperties() { return ['--mouse-x', '--mouse-y', '--magnet-color', '--magnet-size', '--magnet-gap', '--magnet-radius']; }

    paint(ctx, size, props) {
      let mouseX = parseInt(props.get('--mouse-x'))
      let mouseY = parseInt(props.get('--mouse-y'))
      // mouseX -= size.left;
      // mouseY -= size.top;
      const color = props.get('--magnet-color')
      const lineWidth = parseInt(props.get('--magnet-size'))
      const gap = parseInt(props.get('--magnet-gap'))
      const radius = parseInt(props.get('--magnet-radius'))
      ctx.lineCap = "round";
      for (let i = 0; i * gap < size.width; i++) {
        for (let j = 0; j * gap < size.height; j++) {
          const posX = i * gap
          const posY = j * gap
          const distance = Math.sqrt(Math.pow(posX - mouseX, 2) + Math.pow(posY - mouseY, 2))
          const width = distance < radius ? (1 - distance / radius * distance / radius) * gap * 0.4 : 0
          const startPosX = posX - width * 0.5
          const endPosX = posX + width * 0.5
          const rotate = Math.atan2(mouseY - posY, mouseX - posX)

          ctx.save()
          ctx.beginPath();
          ctx.translate(posX, posY);
          ctx.rotate(rotate);
          ctx.translate(-posX, -posY);
          ctx.moveTo(startPosX, posY);
          ctx.strokeStyle = color
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";
          ctx.lineTo(endPosX, posY);
          ctx.stroke()
          ctx.closePath()
          ctx.restore()
        }
      }
    }
  }

  registerPaint('magnet-matrix', MagnetMatrixPaintWorklet);
`)}`);const k=s=>(x("data-v-78c6e9d6"),s=s(),f(),s),P={class:"hero"},w={class:"avatar shadow shadow-moving"},X=k(()=>n("svg",{class:"icon svg-icon avatar-logo"},[n("use",{"xlink:href":"#icon-logo@2x"})],-1)),Y=_('<div class="nickname box-reflect" data-v-78c6e9d6>W.J</div><div class="description text-shadowing" data-v-78c6e9d6>Talking is cheap, show me the codes.</div><div class="links hidden" data-v-78c6e9d6><nav class="social-links" data-v-78c6e9d6><ul class="nav" data-v-78c6e9d6><li class="nav-item" data-v-78c6e9d6><a href data-v-78c6e9d6><svg class="icon svg-icon" data-v-78c6e9d6><use xlink:href="#icon-weixin" data-v-78c6e9d6></use></svg></a></li><li class="nav-item" data-v-78c6e9d6><a href data-v-78c6e9d6><svg class="icon svg-icon" data-v-78c6e9d6><use xlink:href="#icon-qq" data-v-78c6e9d6></use></svg></a></li><li class="nav-item" data-v-78c6e9d6><a href data-v-78c6e9d6><svg class="icon svg-icon" data-v-78c6e9d6><use xlink:href="#icon-weibo" data-v-78c6e9d6></use></svg></a></li></ul></nav></div>',3),I={name:"home"},M=Object.assign(I,{setup(s){const e=v();return m(()=>{e.value.addEventListener("mouseenter",function(t){let{left:a,top:o}=e.value.getBoundingClientRect();this.style.setProperty("--mouse-x",t.x-a),this.style.setProperty("--mouse-y",t.y-o)}),e.value.addEventListener("mousemove",function(t){let{left:a,top:o}=e.value.getBoundingClientRect();this.style.setProperty("--mouse-x",t.x-a),this.style.setProperty("--mouse-y",t.y-o)}),e.value.addEventListener("mouseleave",function(t){this.style.setProperty("--mouse-x",-999),this.style.setProperty("--mouse-y",-999)})}),(t,a)=>(c(),i("div",{ref_key:"home",ref:e,class:"home-page"},[n("div",P,[n("div",w,[g(d(b),{class:"bubble-moving"},{default:h(()=>[X]),_:1})]),Y])],512))}});var z=u(M,[["__scopeId","data-v-78c6e9d6"]]);export{z as default};
