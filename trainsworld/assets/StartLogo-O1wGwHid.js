import{$i as e,$r as t,Ac as n,Ad as r,Ai as i,Ar as a,As as o,Bd as s,Bi as c,Br as l,Cc as u,Ci as d,Cm as f,Co as p,Cr as m,Cs as h,Cu as g,Dc as _,Di as v,Do as y,Dr as b,Ea as x,Ef as S,Ei as C,Er as w,Fi as T,Fr as E,Fu as D,Gc as O,Gd as k,Gr as A,Hi as j,Hm as M,Hr as N,Ia as P,Ii as ee,Ir as te,Jd as F,Ji as ne,Jm as re,Jr as ie,Km as ae,Kr as oe,Ku as se,Li as ce,Lr as le,Md as ue,Mi as I,Mr as de,Mt as fe,Mu as pe,Nr as me,Od as he,Om as ge,Oo as _e,Or as ve,Ou as ye,Pi as L,Qd as be,Qr as xe,Qu as Se,Rm as Ce,Rr as we,Sc as Te,Si as R,St as Ee,Su as De,Tc as Oe,Td as ke,Ti as Ae,Tr as je,Ur as Me,Vi as Ne,Vm as Pe,Vr as Fe,Wc as Ie,Wf as Le,Wm as Re,Wr as ze,Xi as Be,Xm as Ve,Xr as He,Xu as Ue,Yd as z,Yi as We,Yr as Ge,Zi as B,Zr as Ke,_d as qe,_i as Je,_l as Ye,_r as Xe,a as Ze,ai as Qe,am as $e,ap as et,ar as tt,b as nt,bc as rt,bi as it,bu as at,cd as ot,ci as st,co as ct,cs as lt,dd as ut,di as dt,dr as ft,ea as pt,ei as mt,fc as ht,fd as gt,fu as _t,gi as vt,gr as yt,ha as bt,hc as xt,hi as St,hr as Ct,hu as wt,i as Tt,ic as Et,ii as Dt,ir as Ot,ji as kt,kc as At,kd as jt,ki as Mt,kl as Nt,km as Pt,kr as Ft,ld as It,li as Lt,md as Rt,mi as zt,na as Bt,ni as Vt,nl as Ht,nr as Ut,o as Wt,of as Gt,oi as Kt,ol as qt,or as Jt,pa as Yt,pl as Xt,pm as Zt,pr as Qt,ps as V,qi as $t,qm as en,qr as tn,ra as nn,rl as rn,ro as an,rr as on,s as sn,sr as cn,ti as ln,tl as un,tr as dn,ud as fn,ui as pn,vc as mn,vr as hn,wa as gn,wc as _n,wd as vn,wo as yn,wr as bn,ws as xn,xd as Sn,xi as H,xu as Cn,za as wn,zm as Tn,zr as En}from"./terrain-D8SROCXp.js";var Dn=1e3;function On(e,t,n){return e.line&&e.line.length>=4?e.line:n??kn(e,t)}function kn(e,t){let n=Math.max(0,e.length)/2*t,r=Math.cos(e.heading)*n,i=Math.sin(e.heading)*n;return[-r,-i,r,i]}function An(e,t,n,r,i,a,o){return Math.hypot(e.x-r.x,e.y-r.y)<=100*o||Mn(e.x,e.y,t,r.x,r.y,i)<=50*o||(t!==n||i!==a)&&Mn(e.x,e.y,n,r.x,r.y,a)<=50*o}function jn(e){let t=0;for(let n=0;n+1<e.length;n+=2)t=Math.max(t,Math.hypot(e[n],e[n+1]));return t}function Mn(e,t,n,r,i,a){let o=Math.max(1,n.length/2-1),s=Math.max(1,a.length/2-1),c=1/0;for(let l=0;l<o;l++){let o=n.length>2?l+1:l,u=e+n[l*2],d=t+n[l*2+1],f=e+n[o*2],p=t+n[o*2+1];for(let e=0;e<s;e++){let t=a.length>2?e+1:e,n=Nn(u,d,f,p,r+a[e*2],i+a[e*2+1],r+a[t*2],i+a[t*2+1]);n<c&&(c=n)}}return c}function Nn(e,t,n,r,i,a,o,s){let c=n-e,l=r-t,u=o-i,d=s-a,f=e-i,p=t-a,m=c*c+l*l,h=c*u+l*d,g=u*u+d*d,_=c*f+l*p,v=u*f+d*p,y=m*g-h*h,b=0,x=0;return m<1e-12&&g<1e-12?Math.hypot(f,p):(m<1e-12?x=Math.max(0,Math.min(1,v/g)):g<1e-12?b=Math.max(0,Math.min(1,-_/m)):(b=y>1e-9*m*g?Math.max(0,Math.min(1,(h*v-g*_)/y)):0,x=(h*b+v)/g,x<0?(x=0,b=Math.max(0,Math.min(1,-_/m))):x>1&&(x=1,b=Math.max(0,Math.min(1,(h-_)/m)))),Math.hypot(f+b*c-x*u,p+b*l-x*d))}function Pn(e,t=[],n=()=>1){let r=e.length,i=Array.from({length:r},(e,t)=>t),a=e=>{for(;i[e]!==e;)e=i[e]=i[i[e]];return e},o=e.map(e=>n(e.y)),s=e.map((e,t)=>kn(e,o[t])),c=e.map((e,t)=>On(e,o[t],s[t])),l=100*o.reduce((e,t)=>Math.max(e,t),1);e.forEach((e,t)=>{l=Math.max(l,2*Math.max(jn(c[t]),jn(s[t]))+50*o[t])});let u=t=>`${Math.floor(e[t].x/l)},${Math.floor(e[t].y/l)}`,d=new Map;for(let e=0;e<r;e++){let t=u(e),n=d.get(t);n?n.push(e):d.set(t,[e])}for(let t=0;t<r;t++){let n=Math.floor(e[t].x/l),r=Math.floor(e[t].y/l);for(let l=n-1;l<=n+1;l++)for(let n=r-1;n<=r+1;n++)for(let r of d.get(`${l},${n}`)??[]){if(r<=t)continue;let n=e[t],l=e[r],u=(o[t]+o[r])/2;if(!An(n,c[t],s[t],l,c[r],s[r],u))continue;let d=a(t),f=a(r);d!==f&&(i[Math.max(d,f)]=Math.min(d,f))}}if(t.length){let n=new Map(e.map((e,t)=>[e.id,t]));for(let[e,r]of t){let t=n.get(e),o=n.get(r);if(t===void 0||o===void 0)continue;let s=a(t),c=a(o);s!==c&&(i[Math.max(s,c)]=Math.min(s,c))}}let f=new Map,p=[],m=new Map;for(let t=0;t<r;t++){let n=a(t),r=m.get(n);r===void 0&&m.set(n,r=p.push([])-1),p[r].push(e[t].id),f.set(e[t].id,r)}return{of:f,members:p}}function Fn(e,t){let n=e.of.get(t);return n===void 0?[t]:e.members[n]}var In=.002,Ln=10*Math.PI/180;function Rn(e,t,n){let r=e.length/2,i=!1;for(let a=0,o=r-1;a<r;o=a++){let r=e[2*a],s=e[2*a+1],c=e[2*o],l=e[2*o+1];s>n!=l>n&&t<r+(c-r)*(n-s)/(l-s)&&(i=!i)}return i}function zn(e,t,n,r,i){let a=r.length/2,o=e.length/2;for(let i=0;i<a;i++)if(Rn(e,t+r[2*i],n+r[2*i+1]))return!0;for(let s=0;s<Math.max(1,a-1);s++){let c=a>1?s+1:s,l=t+r[2*s],u=n+r[2*s+1],d=t+r[2*c],f=n+r[2*c+1];for(let t=0;t<o;t++){let n=(t+1)%o;if(Nn(l,u,d,f,e[2*t],e[2*t+1],e[2*n],e[2*n+1])<=i)return!0}}return!1}function Bn(e,t,n=()=>1){return e.map(e=>{let r=e.corners,i=r.length/2;if(i<3)return[];let a=1/0,o=1/0,s=-1/0,c=-1/0,l=0;for(let e=0;e<i;e++)a=Math.min(a,r[2*e]),s=Math.max(s,r[2*e]),o=Math.min(o,r[2*e+1]),c=Math.max(c,r[2*e+1]),l+=r[2*e+1]/i;let u=n(l),d=8*u,f=[];for(let e of t){let t=Math.max(0,e.length)*1.5*u+d;e.x<a-t||e.x>s+t||e.y<o-t||e.y>c+t||zn(r,e.x,e.y,On(e,n(e.y)),d)&&f.push(e.id)}return f})}function Vn(e,t,n=()=>1){let r=[];for(let i of Bn(e,t,n))for(let e=1;e<i.length;e++)r.push([i[e-1],i[e]]);return r}var Hn=null,Un=``,Wn=[];function Gn(e,t,n,r){if(!t?.length)return e;let i=t.map(e=>e.corners.join(`,`)).join(`|`);return(n!==Hn||i!==Un)&&(Hn=n,Un=i,Wn=Vn(t,n,r)),Wn.length?[...e,...Wn]:e}var Kn=15*Math.PI/180;function qn(e){let t=e.line;if(t&&t.length>=4){let e=t[t.length-2]-t[0],n=t[t.length-1]-t[1];if(e||n)return Math.atan2(n,e)}return e.heading}function Jn(e,t){let n=((e-t)%Math.PI+Math.PI)%Math.PI;return Math.min(n,Math.PI-n)}function Yn(e){let t=e.map(qn),n=[],r=-1,i=-1;for(let a=0;a<e.length;a++){let o=[],s=0;for(let n=0;n<e.length;n++)Jn(t[a],t[n])<=Kn&&(o.push(n),s+=e[n].length);(o.length>r||o.length===r&&s>i)&&([n,r,i]=[o,o.length,s])}return t[n.reduce((t,n)=>e[n].length>e[t].length?n:t)]}function Xn(e,t=()=>1){let n=e.filter(e=>e.length>0);if(!n.length)return null;let r=Yn(n),i=Math.cos(r),a=Math.sin(r),o=1/0,s=-1/0,c=1/0,l=-1/0,u=0;for(let e of n){let r=On(e,t(e.y));u+=e.y/n.length;for(let t=0;t+1<r.length;t+=2){let n=e.x+r[t],u=e.y+r[t+1],d=n*i+u*a,f=-n*a+u*i;o=Math.min(o,d),s=Math.max(s,d),c=Math.min(c,f),l=Math.max(l,f)}}let d=23*t(u);return o-=d,s+=d,c-=d,l+=d,[[o,c],[s,c],[s,l],[o,l]].flatMap(([e,t])=>[e*i-t*a,e*a+t*i])}function Zn(e,t,n=Ln){let r=Math.PI/2,i=Math.round((e-t)/r),a=e-t-i*r;return Math.abs(a)<=n?t+i*r:null}function Qn(e,t,n,r=Ln){let i=t.x-e.x,a=t.y-e.y;return i||a?Zn(Math.atan2(a,i),n,r):null}function $n(e,t,n){let r=Math.cos(t),i=Math.sin(t),a=(n.x-e.x)*r+(n.y-e.y)*i;return{x:e.x+r*a,y:e.y+i*a}}function er(e,t,n,r){let i=Math.cos(t),a=Math.sin(t),o=Math.cos(r),s=Math.sin(r),c=i*s-a*o;if(Math.abs(c)<1e-9)return null;let l=((n.x-e.x)*s-(n.y-e.y)*o)/c;return{x:e.x+i*l,y:e.y+a*l}}function tr(e,t,n){let r=((Math.atan2(t.y-e.y,t.x-e.x)-n)%Math.PI+Math.PI)%Math.PI;return Math.min(r,Math.PI-r)}function nr(e,t,n,r,i=Ln,a=1/0){let o=t?Qn(t,e,r,i):null,s=n?Qn(n,e,r,i):null;if(o!==null&&s!==null){let r=er(t,o,n,s);return r&&Math.hypot(r.x-e.x,r.y-e.y)<=a?r:tr(t,e,o)<=tr(n,e,s)?$n(t,o,e):$n(n,s,e)}return o===null?s===null?e:$n(n,s,e):$n(t,o,e)}function rr(e){let t=e.length/2,n=0;for(let r=0,i=t-1;r<t;i=r++)n+=e[2*i]*e[2*r+1]-e[2*r]*e[2*i+1];return Math.abs(n)/2}var ir=2,ar=2.5,or=[`#f6d6c4`,`#f2e9d0`,`#d6e3cc`,`#cfe0ee`,`#efd4dd`,`#e4d9c4`,`#f5e4a8`];function sr(e,t){let n=e.length/2,r=e[0],i=e[1],a=e[2]-r,o=e[3]-i,s=Math.hypot(a,o)||1;a/=s,o/=s;let c=0,l=0;for(let t=0;t<n;t++)c+=e[2*t]/n,l+=e[2*t+1]/n;let u=(c-r)*-o+(l-i)*a>=0?1:-1,d=-o*u,f=a*u,p=(e,n)=>((e-r)*a+(n-i)*o)/t,m=(e,n)=>((e-r)*d+(n-i)*f)/t,h=[],g=1/0,_=-1/0,v=1/0,y=-1/0;for(let t=0;t<n;t++){let n=p(e[2*t],e[2*t+1]),r=m(e[2*t],e[2*t+1]);h.push(n,r),g=Math.min(g,n),_=Math.max(_,n),v=Math.min(v,r),y=Math.max(y,r)}return{ux:a,uy:o,vx:d,vy:f,toU:p,toV:m,back:(e,n)=>[r+(a*e+d*n)*t,i+(o*e+f*n)*t],pts:h,u0:g,u1:_,v0:v,v1:y}}function cr(e,t,n){let r=sr(e,t),i=n.map(e=>lr(e,r)),a=0;for(let e=r.u0+ar/2;e<r.u1;e+=ar)for(let t=r.v0+ar/2;t<r.v1;t+=ar)ur(r.pts,e,t)&&(i.some(n=>fr(n,e,t)<8)||a++);return Math.round(a*ar*ar/ir)}function lr(e,t){let n=[];for(let r=0;r+1<e.length;r+=2)n.push(t.toU(e[r],e[r+1]),t.toV(e[r],e[r+1]));return n}function ur(e,t,n){let r=e.length/2,i=!1;for(let a=0,o=r-1;a<r;o=a++){let r=e[2*a],s=e[2*a+1],c=e[2*o],l=e[2*o+1];s>n!=l>n&&t<r+(c-r)*(n-s)/(l-s)&&(i=!i)}return i}function dr(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c>0?Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c)):0;return Math.hypot(n+l*o-e,r+l*s-t)}function fr(e,t,n){if(e.length<4)return e.length>=2?Math.hypot(e[0]-t,e[1]-n):1/0;let r=1/0;for(let i=0;i+3<e.length;i+=2)r=Math.min(r,dr(t,n,e[i],e[i+1],e[i+2],e[i+3]));return r}var pr=8,mr=2**21,hr=2**22,gr=class{recs=new Map;grid=new Map;cell=100;out=null;frameKey=``;lastInput=null;linkKeys=[];linkPairs=[];calls=0;stamp=0;uids=0;lastWorked=-1;update(e,t,n,r){let i=e.length,a=++this.calls;this.out&&r!==this.frameKey&&this.reset(),this.frameKey=r;let o=this.diffLinks(t);if(this.out&&e===this.lastInput&&!o.length)return this.lastWorked=0,this.out;this.lastInput=e;let s=this.recs.size,c=[],l=[],u=[],d=Array(i),f=0,p=!1,m=-1;for(let r=0;r<i;r++){let i=e[r],o=this.recs.get(i.id);if(!o)o=this.make(i,n),this.recs.set(i.id,o),c.push(o);else if(o.seen===a)return this.reset(),this.fallback(e,t,n);else f++,o.idx<=m&&(p=!0),m=o.idx,(o.x!==i.x||o.y!==i.y||o.heading!==i.heading||o.length!==i.length||o.line!==i.line)&&(l.push(o),u.push(i));o.seen=a,d[r]=o}let h=[];if(s>f)for(let e of this.recs.values())e.seen!==a&&h.push(e);let g=c.length+l.length+h.length;if(p||s>0&&g*pr>i+pr)return this.reset(),this.update(e,t,n,r);if(!g&&!o.length&&this.out)return this.lastWorked=0,this.out;for(let e=0;e<i;e++)d[e].idx=e;this.lastWorked=s===0?-1:g;let _=++this.stamp,v=[],y=e=>{if(e&&e.mark!==_){e.mark=_;for(let t of e.members)!t.gone&&t.mark!==_&&(t.mark=_,v.push(t))}};for(let e of h)e.gone=!0;for(let e of h)this.gridRemove(e),this.recs.delete(e.id),y(e.comp);for(let e of l)y(e.comp),this.gridRemove(e);let b=l.concat(c);l.forEach((e,t)=>this.fill(e,u[t],n)),this.place(b);for(let e of c)e.mark!==_&&(e.mark=_,v.push(e));for(let e of l)e.mark!==_&&(e.mark=_,v.push(e));if(t.length&&b.length+h.length){let e=new Map;for(let[n,r]of t)(e.get(n)??e.set(n,[]).get(n)).push(r),(e.get(r)??e.set(r,[]).get(r)).push(n);for(let t of b)for(let n of e.get(t.id)??[])y(this.recs.get(n)?.comp??null);for(let t of h)for(let n of e.get(t.id)??[])y(this.recs.get(n)?.comp??null)}for(let e of o)y(this.recs.get(e)?.comp??null);for(let e of b)this.reach(e,y);for(let e of v)e.parent=e;let x=e=>{for(;e.parent!==e;)e.parent=e.parent.parent,e=e.parent;return e},S=(e,t)=>{let n=x(e),r=x(t);n!==r&&(n.parent=r)},C=this.cell;for(let e of v){let t=Math.floor(e.x/C),n=Math.floor(e.y/C);for(let r=t-1;r<=t+1;r++)for(let t=n-1;t<=n+1;t++){let n=this.grid.get(_r(r,t));if(n)for(let t of n)t.uid>e.uid&&t.mark===_&&(e.idx<t.idx?vr(e,t):vr(t,e))&&S(e,t)}}for(let[i,a]of t){let o=this.recs.get(i),s=this.recs.get(a);if(o&&s){if(o.mark===_!=(s.mark===_))return this.reset(),this.update(e,t,n,r);o.mark===_&&S(o,s)}}let w=new Map;for(let e of v){let t=x(e),n=w.get(t);n||w.set(t,n={members:[],out:0,index:0,mark:0}),n.members.push(e),e.comp=n}return this.renumber(d)}renumber(e){let t=this.calls,n=new Map,r=[];for(let i of e){let e=i.comp;e.out!==t&&(e.out=t,e.index=r.length,r.push([])),r[e.index].push(i.id),n.set(i.id,e.index)}return this.out={of:n,members:r}}reset(){this.recs.clear(),this.grid.clear(),this.cell=100,this.out=null,this.lastInput=null,this.linkKeys=[],this.linkPairs=[]}fallback(e,t,n){return this.lastWorked=-1,Pn(e,t,n)}make(e,t){let n={id:e.id,x:0,y:0,heading:0,length:0,k:1,line:void 0,pts:[],seg:[],ext:0,idx:-1,uid:++this.uids,seen:0,mark:0,comp:null,cell:0,gone:!1};return n.parent=n,this.fill(n,e,t),n}fill(e,t,n){e.x=t.x,e.y=t.y,e.heading=t.heading,e.length=t.length,e.k=n(t.y),e.line=t.line,e.seg=kn(t,e.k),e.pts=On(t,e.k,e.seg),e.ext=Math.max(jn(e.pts),jn(e.seg))}reachOf(e){return Math.max(100*Math.max(1,e.k),2*e.ext+50*e.k)}place(e){let t=this.cell;for(let n of e)t=Math.max(t,this.reachOf(n));if(t>this.cell){this.cell=t,this.grid.clear();for(let e of this.recs.values())this.gridAdd(e)}else for(let t of e)this.gridAdd(t)}gridAdd(e){e.cell=_r(Math.floor(e.x/this.cell),Math.floor(e.y/this.cell));let t=this.grid.get(e.cell);t?t.push(e):this.grid.set(e.cell,[e])}gridRemove(e){let t=this.grid.get(e.cell);if(!t)return;let n=t.indexOf(e);n>=0&&t.splice(n,1),t.length||this.grid.delete(e.cell)}reach(e,t){let n=Math.floor(e.x/this.cell),r=Math.floor(e.y/this.cell);for(let i=n-1;i<=n+1;i++)for(let n=r-1;n<=r+1;n++){let r=this.grid.get(_r(i,n));if(r)for(let n of r)n!==e&&(e.idx<n.idx?vr(e,n):vr(n,e))&&t(n.comp)}}diffLinks(e){let t=e.map(([e,t])=>`${e}\u0000${t}`),n=[];if(t.length!==this.linkKeys.length||t.some((e,t)=>e!==this.linkKeys[t])){let r=new Set(this.linkKeys),i=new Set(t);this.linkPairs.forEach((e,t)=>{i.has(this.linkKeys[t])||n.push(e[0],e[1])}),e.forEach((e,i)=>{r.has(t[i])||n.push(e[0],e[1])})}return this.linkKeys=t,this.linkPairs=e.map(([e,t])=>[e,t]),n}};function _r(e,t){return(e+mr)*hr+(t+mr)}function vr(e,t){return An(e,e.pts,e.seg,t,t.pts,t.seg,(e.k+t.k)/2)}var yr=typeof location>`u`?`1`:new URLSearchParams(location.search).get(`patch`)??`1`,br=new gr,xr=new gr,Sr=(e,t)=>e.members.length===t.members.length&&e.of.size===t.of.size&&[...t.of].every(([t,n])=>e.of.get(t)===n)&&t.members.every((t,n)=>t.join()===e.members[n].join()),Cr=``,wr={of:new Map,members:[]},Tr=``,Er={of:new Map,members:[]},Dr=e=>et().kind+e.map(e=>`${e.id}:${e.x}:${e.y}:${e.heading}:${e.length}:${e.line?Array.from(e.line).join(`;`):``}`).join(`|`),Or=Ce(()=>{let e=V.value?.save.stations??[],t=Gn(V.value?.save.links??[],V.value?.save.buildings,e,h);if(yr===`0`){let n=Dr(e)+`/`+t.join(`|`);return n!==Cr&&(Cr=n,wr=Pn(e,t,h)),wr}let n=br.update(e,t,h,et().kind);return yr===`check`&&!Sr(n,Pn(e,t,h))&&console.error(`T-1380 check: the complexes patched from changes differ from a whole build`),n}),kr=Ce(()=>{if(!(V.value?.save.links??[]).length&&!V.value?.save.buildings?.length)return Or.value;let e=V.value?.save.stations??[];if(yr===`0`){let t=Dr(e);return t!==Tr&&(Tr=t,Er=Pn(e,[],h)),Er}let t=xr.update(e,[],h,et().kind);return yr===`check`&&!Sr(t,Pn(e,[],h))&&console.error(`T-1380 check: the distance groups patched from changes differ from a whole build`),t}),Ar=e=>Fn(Or.value,e),jr=e=>{let t=Or.peek().of.get(e);return t===void 0?e:`c${t}`},Mr=Pe(null);Tn(()=>{D.value,Mr.peek()!==null&&(Mr.value=null)});function Nr(e){D.value={kind:`station`,station:e},Mr.value=e}function Pr(e){return Mr.value!==e}function Fr(e,t){let n=Lr.map,r=n?._camera?.transform??n?.transform;return typeof r?.isLocationOccluded==`function`?r.isLocationOccluded({lng:e,lat:t}):d(Lr.overlay?.cam,e,t)}var Ir=Pe(0),Lr={map:null,overlay:null,tools:null,edgeEditor:null,nodeDrag:null};function Rr(e,t){let n=zr(e);if(n===null)return 0;let r=V.value?.lineStats[e];return r?.rows?(n===0?y(e):_e(e)?.counts)?.[Zt(r.hours??$e,r.periods,bt(r))]??0:p(e,n)?.[t]??0}function zr(e){let t=V.value,n=t?.lineStats[e],r=t?ct(t).get(e):void 0;return n&&r?x(gn(r.stops),Math.floor(bt(n)/86400)):null}var Br=new Set,Vr=Ce(()=>{let e=V.value,t=new Set;if(e)for(let n in e.lineStats){let r=e.lineStats[n],i=Zt(r.hours??$e,3,bt(r)),a=Rr(n,i);(r.status!==`running`||!(a>0)||r.autoS?.[i]===0&&zr(n)===0)&&t.add(n)}return(Br.size!==t.size||![...t].every(e=>Br.has(e)))&&(Br=t),Br}),Hr=e=>Vr.value.has(e),Ur=``;Tn(()=>{Ur=f(`lineRunning.idle`)});var Wr=`M14.2 8c0-.6-.6-1-1.4-1H9.7L6.6 2.3H5.2L6.8 7H3.7L2.5 5.5h-1l.8 2.5-.8 2.5h1l1.2-1.5h3.1L5.2 13.7h1.4L9.7 9h3.1c.8 0 1.4-.4 1.4-1z`,Gr={"":12,sm:12,lg:18},Kr={"":20,sm:16,lg:30},qr={"":5,sm:4,lg:7},Jr=240,Yr=Pe(0),Xr=null,Zr=``,Qr=new Map,$r=new Set;function ei(){Zr=``,Qr.clear(),Yr.value++}function ti(){matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener(`change`,()=>{ei(),ti()},{once:!0})}function ni(e){let t=e.fontfaces;if(!t)return ei();let n=[];for(let e of t)for(let t of(e.unicodeRange||`U+0-10FFFF`).split(`,`)){let e=/U\+([0-9A-F?]+)(?:-([0-9A-F]+))?/i.exec(t.trim());if(!e)continue;let r=parseInt(e[1].replace(/\?/g,`0`),16),i=e[2]?parseInt(e[2],16):parseInt(e[1].replace(/\?/g,`F`),16);n.push([r,i])}let r=e=>{for(let t of e){let e=t.codePointAt(0);if(n.some(([t,n])=>e>=t&&e<=n))return!0}return!1},i=!1;for(let e of Qr.keys())r(e.split(`|`).slice(3).join(`|`))&&(Qr.delete(e),i=!0);i&&ii()}var ri=!1;function ii(){ri||(ri=!0,setTimeout(()=>{ri=!1,Yr.value++},50))}typeof document<`u`&&(document.addEventListener(`tw-fontchange`,ei),document.fonts?.addEventListener?.(`loadingdone`,ni),typeof matchMedia<`u`&&ti());function ai(e,t,n=1){if(typeof document>`u`||!e||(Xr??=document.createElement(`canvas`).getContext(`2d`),!Xr))return null;Zr||=getComputedStyle(document.body).fontFamily;let r=devicePixelRatio*n,i=`${Zr}|${t}|${r}|${e}`,a=Qr.get(i);if(a!==void 0)return a;let o=`700 ${Jr}px ${Zr}`;Xr.font=o,Xr.textBaseline=`alphabetic`;let s=Xr.measureText(e),c=Gr[t]/Jr,l=Kr[t],u=Xr.measureText(`I`),d=(u.actualBoundingBoxRight+u.actualBoundingBoxLeft)*c,f=Math.max(l,s.width*c+2*qr[t]),p=l/2+(s.actualBoundingBoxAscent-s.actualBoundingBoxDescent)/2*c,m=r>0?Math.round(p*r)/r:p,h={w:f,h:l,x:f/2-(s.actualBoundingBoxRight-s.actualBoundingBoxLeft)/2*c,y:m,top:m-p,iw:(s.actualBoundingBoxRight+s.actualBoundingBoxLeft)*c,ih:(s.actualBoundingBoxAscent+s.actualBoundingBoxDescent)/2*c,stem:d},g=[h.w,h.x,h.y,h.top].every(Number.isFinite)&&s.width>0;if(document.fonts&&!document.fonts.check(o,e)){let t=`${o}|${e}`;$r.has(t)||($r.add(t),document.fonts.load(o,e).then(()=>{for(let t of Qr.keys())t.endsWith(`|${e}`)&&Qr.delete(t);ii()},()=>void 0))}return Qr.set(i,g?h:null),g?h:null}function oi(e,t){if(typeof document>`u`||!e||(Xr??=document.createElement(`canvas`).getContext(`2d`),!Xr))return null;Zr||=getComputedStyle(document.body).fontFamily,Xr.font=`700 ${Jr}px ${Zr}`,Xr.textBaseline=`alphabetic`;let n=t/Jr,r=/^[ -~À-ɏ]+$/.test(e),i=Xr.measureText(r?`H`:e),a=i.actualBoundingBoxAscent*n,o=r?0:i.actualBoundingBoxDescent*n;return Number.isFinite(a+o)?{up:a,down:o}:null}function si(e,t,n=1){if(typeof document>`u`||!e)return null;Zr||=getComputedStyle(document.body).fontFamily;let r=Qr.get(`${Zr}|${t}|${devicePixelRatio*n}|${e}`);if(r!==void 0)return r;if(ci.set(`${t}|${n}|${e}`,[e,t,n]),!li){li=!0;let e=t=>{let n=performance.now()+8,r=0;for(let[e,[i,a,o]]of ci){if(r++&&(t&&!t.didTimeout?t.timeRemaining()<1:performance.now()>n))break;ci.delete(e),ai(i,a,o)}ci.size?ui(e):(li=!1,ii())};ui(e)}return null}var ci=new Map,li=!1,ui=e=>typeof requestIdleCallback==`function`?requestIdleCallback(e,{timeout:500}):setTimeout(e,16),di=.18,fi=.94,pi=1.14,mi=2.4,hi=1.5;function gi(e,t){let{h:n,top:r}=e;if(t===`square`){let t=fi*n,i=Math.max(t,e.w-(n-t));return{w:i,h:n,x:e.x+(i-e.w)/2,y:e.y,rect:{y:r+(n-t)/2,w:i,h:t,r:t*di}}}if(t===`diamond`){let t=pi*n,i=.06*n,a=Math.max(t,e.iw+2*(e.ih+.12*n)),o=r+n/2,s=t/2-i,c=[i,t/2,a-t/2,a-i].map(e=>e.toFixed(2)),l=(o-s).toFixed(2),u=(o+s).toFixed(2),d=o.toFixed(2);return{w:a,h:n,x:e.x+(a-e.w)/2,y:e.y,path:{d:`M${c[0]} ${d}L${c[1]} ${l}L${c[2]} ${l}L${c[3]} ${d}L${c[2]} ${u}L${c[1]} ${u}Z`,stroke:2*i}}}if(t===`outline`){let t=Math.max(e.stem,mi);return{w:e.w,h:n,x:e.x,y:e.y,rect:{x:t/2,y:r+t/2,w:e.w-t,h:n-t,r:(n-t)/2,ring:t}}}let i=t===`pill`?Math.max(e.w,hi*n):e.w;return{w:i,h:n,x:e.x+(i-e.w)/2,y:e.y,rect:{y:r,w:i,h:n,r:n/2}}}var _i=`http://www.w3.org/2000/svg`;function vi(e,t,n=`circle`){let r=ai(e,t);if(!r){let t=document.createElement(`span`);return t.textContent=e,t}let i=gi(r,n),a=document.createElementNS(_i,`svg`);a.style.width=i.w+`px`,a.style.height=i.h+`px`;let o;if(i.path)o=document.createElementNS(_i,`path`),o.setAttribute(`d`,i.path.d),o.setAttribute(`stroke-width`,String(i.path.stroke));else{o=document.createElementNS(_i,`rect`);let e=i.rect;e.ring!==void 0&&(o.setAttribute(`class`,`ring`),o.setAttribute(`x`,String(e.x)),o.setAttribute(`stroke-width`,String(e.ring)));for(let[t,n]of[[`y`,e.y],[`width`,e.w],[`height`,e.h],[`rx`,e.r]])o.setAttribute(t,String(n))}let s=document.createElementNS(_i,`text`);return s.setAttribute(`x`,String(i.x)),s.setAttribute(`y`,String(i.y)),s.textContent=e,a.append(o,s),a}var yi=[`ferry`,`tram`,`train`,`hsr`,`bus`],bi={ferry:`#0e8c96`,tram:`#72c2f2`,train:`#1e3ce6`,hsr:`#1d2a8c`,bus:`#9145d2`};function xi(e){switch(e){case`ferry`:return f(`transitModes.ferry`);case`tram`:return f(`transitModes.tram`);case`train`:return f(`transitModes.train`);case`hsr`:return f(`transitModes.hsr`);case`bus`:return f(`transitModes.bus`)}}var Si=()=>wt.value.transitModes;function Ci(e){switch(Ee(e)){case`ferry`:return`ferry`;case`bus`:return`bus`;case`tram`:return`tram`;case`fast`:return`hsr`;case`rail`:return`train`;default:return null}}var wi=new WeakMap;function Ti(e){let t=V.value;if(!t)return null;let n=`${t.version}|${S.value}`,r=wi.get(e.lines);if(r?.at===n)return r;let i=lt(t),a=ct(t),o=e.purposes?.get(`longer`)?.lines,s=new Map,c=new Map,l=(e,t,n,r)=>{let i=e.get(t);i||e.set(t,i=[0,0,0,0,0]),i[n]+=r};for(let[t,n]of e.lines){let e=Ci(t);if(!e)continue;let r=yi.indexOf(e),u=n.stops?.length===n.boardings.length?n.stops:a.get(t)?.stops;if(!u||u.length!==n.boardings.length)continue;let d=o?.get(t)?.boardings;for(let e=0;e<u.length;e++){let t=i.get(u[e]),a=t?P(t):null;if(!a)continue;let o=d?.[e]??0;l(s,a,r,Math.max(0,n.boardings[e]-o)),o>0&&l(c,a,r,o)}}let u={at:n,within:s,between:c};return wi.set(e.lines,u),u}var Ei=e=>{let t=e?e.reduce((e,t)=>e+t,0):0;return!e||!(t>0)?null:Object.fromEntries(yi.map((n,r)=>[n,e[r]/t]))};function Di(e,t,n=!1){if(!Si()||!e||!t)return null;let r=Ti(e);return r?Ei((n?r.between:r.within).get(t)):null}function Oi(e){let t=[0,0,0,0,0];for(let{shares:n,rail:r}of e)n&&r>0&&yi.forEach((e,i)=>t[i]+=n[e]*r);return Ei(t)}function ki(e){let t=V.value;if(!Si()||!t)return null;let n=lt(t),r=[0,0,0,0,0];for(let t of e){let e=[0,0,0,0,0];for(let r of t.legs){let t=r.kind===`ride`?Ci(r.line):null;if(!t)continue;let i=0;for(let e=1;e<r.stations.length;e++){let t=n.get(r.stations[e-1]),a=n.get(r.stations[e]);t&&a&&(i+=wn(t.lng,t.lat,a.lng,a.lat))}e[yi.indexOf(t)]+=i}let i=e.reduce((e,t)=>e+t,0);i>0&&e.forEach((e,n)=>r[n]+=t.share*e/i)}return Ei(r)}function Ai(e,t){return Si()?Oi([...e].map(e=>{let n=t.get(e);return{shares:Di(n,e),rail:n?.railTripsPerDay??0}})):null}function ji(e,t){return yi.filter(e=>t[e]>0).map(n=>({mode:n,name:xi(n),n:e*t[n],colour:bi[n]}))}var Mi=0;Array.isArray;function U(e,t,n,r,i,a){t||={};var o,s,c=t;if(`ref`in c&&typeof e!=`function`)for(s in c={},t)s==`ref`?o=t[s]:c[s]=t[s];var l={type:e,props:c,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Mi,__i:-1,__u:0};return(i||a)&&(l.__source=i,l.__self=a),Ve.vnode&&Ve.vnode(l),l}var Ni=`M1.75 1.5v1.2M6.75 1.5v1.2M1.75 4.2v1.3a2.5 2.5 0 005 0V4.2`,Pi=`M3.58 13.5Q3.22 13.5 3 13.33Q2.77 13.16 2.73 12.88Q2.68 12.6 2.84 12.25L6.86 3.32Q7.06 2.88 7.34 2.69Q7.63 2.5 7.99 2.5Q8.34 2.5 8.63 2.69Q8.91 2.88 9.11 3.32L13.15 12.25Q13.32 12.6 13.27 12.89Q13.23 13.18 13.01 13.34Q12.8 13.5 12.45 13.5Q12.02 13.5 11.78 13.29Q11.55 13.09 11.36 12.66L10.37 10.36L11.2 10.89H4.76L5.58 10.36L4.61 12.66Q4.41 13.1 4.19 13.3Q3.98 13.5 3.58 13.5ZM7.96 4.74 5.83 9.82 5.43 9.33H10.53L10.14 9.82L7.99 4.74Z`,Fi={auto:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,stroke:`none`,d:Pi})}),minus:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4 8h8`})}),plus:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4 8h8M8 4v8`})}),pencil:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M10.5 3l2.5 2.5L6 12.5H3.5V10z`})}),brush:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M13.5 2.5L7.6 8.4M7.6 8.4c-1.7-.5-3.4.7-3.4 2.6 0 1.1-.6 1.8-1.7 2.2 2.6 1 6 .3 6.3-2.6z`})}),rings:()=>U(`svg`,{class:`rings-icon`,viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`1.2`}),U(`circle`,{cx:`8`,cy:`8`,r:`3.8`}),U(`circle`,{cx:`8`,cy:`8`,r:`6.3`})]}),check:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M3.5 8.5l3 3 6-7`})}),cycle:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M12.8 6.5A5 5 0 004 5M3.2 9.5A5 5 0 0012 11M4 2v3h3M12 14v-3H9`})}),locate:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`3.5`}),U(`path`,{d:`M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3`})]}),follow:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`3.5`}),U(`circle`,{class:`solid`,cx:`8`,cy:`8`,r:`1.4`}),U(`path`,{d:`M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3`})]}),pause:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`stroke2`,d:`M5.5 3.5v9M10.5 3.5v9`})}),play1:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,d:`M5 3.5l7 4.5-7 4.5z`})}),slower:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,d:`M13.5 4L8 8l5.5 4zM8 4L2.5 8 8 12z`})}),play2:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,d:`M2.5 4l5.5 4-5.5 4zM8 4l5.5 4L8 12z`})}),play3:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,d:`M1.5 5l4 3-4 3zM6 5l4 3-4 3zM10.5 5l4 3-4 3z`})}),track:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.5 10.5l8-8M5.5 13.5l8-8M3 9l4 4M6 6l4 4M9 3l4 4`})}),station:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M1.5 8h3.5M11 8h3.5`}),U(`circle`,{cx:`8`,cy:`8`,r:`3`})]}),interchange:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4.5 1.5h3v7h7v3h-7v3h-3v-3h-3v-3h3z`})}),trackDisplay:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M2.5 10.5l8-8M5.5 13.5l8-8M3 9l4 4M6 6l4 4M9 3l4 4`}),U(`path`,{class:`yline`,d:`M8 15l7-7`})]}),stationDisplay:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M4.5 1.5h3v7h7v3h-7v3h-3v-3h-3v-3h3z`}),U(`circle`,{class:`udot`,cx:`6`,cy:`10`,r:`4.6`})]}),bubble:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`circle`,{class:`bubble`,cx:`8`,cy:`8`,r:`5.5`})}),keepPlacing:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M2 12.5l4-6 3 3 5-6.5`}),U(`circle`,{class:`solid`,cx:`6`,cy:`6.5`,r:`1.4`}),U(`circle`,{class:`solid`,cx:`9`,cy:`9.5`,r:`1.4`}),U(`circle`,{class:`solid`,cx:`14`,cy:`3`,r:`1.4`})]}),snapReal:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:Ni}),U(`path`,{d:`M1.5 14.5c5 0 10-4 13-12`})]}),snapRoads:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:Ni}),U(`path`,{d:`M1.4 12.2L2.4 12.1L3.4 11.9L4.3 11.6L5.3 11.2L6.3 10.6L7.2 9.8L8.2 8.8L9.1 7.8L10 6.5L10.8 5.1L11.6 3.5L12.4 1.7M7.5 15.2L8.9 14.3L10.3 13.2L11.5 12L12.7 10.6L13.8 9L14.9 7.3`}),U(`path`,{d:`M1.5 14.5c5 0 10-4 13-12`,"stroke-width":`1`,"stroke-dasharray":`1.6 1.4`})]}),snapStreets:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:Ni}),U(`path`,{d:`M1.5 12L12 1.5M4.5 15L15 4.5`}),U(`path`,{d:`M3 13.5L13.5 3`,"stroke-width":`1`,"stroke-dasharray":`1.6 1.4`})]}),snapBeside:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:Ni}),U(`path`,{d:`M1.4 12.9L2.5 12.8L3.6 12.6L4.6 12.3L5.7 11.8L6.7 11.1L7.7 10.3L8.7 9.3L9.6 8.2L10.6 6.9L11.4 5.4L12.2 3.8L13 1.9`}),U(`path`,{d:`M6.5 14.9L7.9 14.2L9.2 13.2L10.4 12.1L11.6 10.8L12.7 9.4L13.8 7.8L14.7 6L15.2 5.1`,"stroke-dasharray":`2 1.6`})]}),terrain:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 13.5L6 6l2.4 3.4L10.6 6.5l3.9 7z`})}),autoLevel:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M1.5 13.5h3M4.5 13.5l3-6h7M12 5l2.5 2.5L12 10`}),U(`path`,{d:`M7.5 10.5v3M11 10.5v3`})]}),autoRamp:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M1.5 12.5h2.5l3-6h2l3 6h2.5`}),U(`circle`,{class:`solid`,cx:`8`,cy:`12.5`,r:`1.6`})]}),tracks1:()=>U(`svg`,{class:`tracks`,viewBox:`0 0 20 20`,children:U(`path`,{d:`M10 3v14`})}),tracks2:()=>U(`svg`,{class:`tracks`,viewBox:`0 0 20 20`,children:U(`path`,{d:`M6 3v14M14 3v14`})}),tracks4:()=>U(`svg`,{class:`tracks`,viewBox:`0 0 20 20`,children:U(`path`,{d:`M4 3v14M8 3v14M12 3v14M16 3v14`})}),undo:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M5.5 4L2.5 7l3 3M3 7h6.5a3.5 3.5 0 010 7H7`})}),anchor:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`3.2`,r:`1.6`}),U(`path`,{d:`M8 4.8v9.7M5.2 7.2h5.6M2.7 9.6c.4 2.9 2.6 4.9 5.3 4.9s4.9-2 5.3-4.9`})]}),redo:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M10.5 4l3 3-3 3M13 7H6.5a3.5 3.5 0 000 7H9`})}),cross:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4.5 4.5l7 7M11.5 4.5l-7 7`})}),eye:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M1.5 8c1.6-2.9 3.8-4.4 6.5-4.4s4.9 1.5 6.5 4.4c-1.6 2.9-3.8 4.4-6.5 4.4S3.1 10.9 1.5 8z`}),U(`circle`,{cx:`8`,cy:`8`,r:`2`})]}),question:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M5.3 5.6a2.7 2.7 0 1 1 3.8 2.5c-.7.3-1.1.9-1.1 1.6v.8`}),U(`circle`,{class:`solid`,cx:`8`,cy:`13`,r:`.7`})]}),help:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`6.2`}),U(`path`,{d:`M6.2 6.3a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.6`}),U(`circle`,{class:`solid`,cx:`8`,cy:`11.6`,r:`.5`})]}),discord:()=>U(`svg`,{viewBox:`0 0 24 24`,children:U(`path`,{class:`solid`,style:`stroke:none`,d:`M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z`})}),kofi:()=>U(`svg`,{viewBox:`0 0 24 24`,children:[U(`path`,{class:`solid`,style:`stroke:none`,d:`M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z`}),U(`path`,{style:`fill:#ff5e5b;stroke:none`,d:`M12.819 12.459c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z`})]}),uturn:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M5 13.5V7a3.25 3.25 0 0 1 6.5 0v4.5M8.8 9.2l2.7 2.8 2.7-2.8`})}),boardBoth:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`circle`,{cx:`8`,cy:`8`,r:`5.5`})}),boardOnly:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`11`,y:`2.5`,width:`3.5`,height:`11`,rx:`1`}),U(`path`,{d:`M1.5 8H9M6.5 5.5L9 8l-2.5 2.5`})]}),alightOnly:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`11`,y:`2.5`,width:`3.5`,height:`11`,rx:`1`}),U(`path`,{d:`M9 8H1.5M4 5.5L1.5 8 4 10.5`})]}),allStops:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M8 1.5v13M5 3.5h6M5 6.5h6M5 9.5h6M5 12.5h6`})}),related:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M6 1.5v13M10 1.5v8c0 1.8 1 3 3 5`}),U(`rect`,{x:`3.5`,y:`4.5`,width:`9`,height:`3.5`,rx:`1.75`})]}),arrowUp:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M8 14V2.5M3.5 7 8 2.5 12.5 7`})}),doubleUp:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 3h13M1.5 6h13M8 9v6M5 12h6`})}),addPoint:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M1.5 13.5l4.5-3M10 10.5l4.5 3M12 1.5v5M9.5 4h5`}),U(`rect`,{x:`6`,y:`8.5`,width:`4`,height:`4`})]}),bus:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`3`,y:`2.5`,width:`10`,height:`9`,rx:`2`}),U(`path`,{d:`M3 7h10M5.5 11.5v2M10.5 11.5v2`}),U(`circle`,{class:`solid`,cx:`5.5`,cy:`9.3`,r:`.7`}),U(`circle`,{class:`solid`,cx:`10.5`,cy:`9.3`,r:`.7`})]}),brt:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.5 1.5v13M13.5 1.5v13M8 2v2M8 7v2M8 12v2`})}),tram:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`3.5`,y:`4`,width:`9`,height:`7.5`,rx:`1.8`}),U(`path`,{d:`M3.5 8h9M5.5 4V1.5h5V4M5 13.8l1.2-2.3M11 13.8l-1.2-2.3`}),U(`circle`,{class:`solid`,cx:`5.8`,cy:`9.8`,r:`.7`}),U(`circle`,{class:`solid`,cx:`10.2`,cy:`9.8`,r:`.7`})]}),ferry:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M2.5 8.5h11l-1.8 3H4.3zM5 8.5V6h5.5l1 2.5M7 6V4`}),U(`path`,{d:`M1.5 13.8c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0`})]}),waves:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 4.8c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0M1.5 8.5c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0M1.5 12.2c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0`})}),bin:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.5 4.5h11M6.5 4.5V2.5h3v2M4 4.5l.8 9h6.4l.8-9M6.8 7v4M9.2 7v4`})}),marquee:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.5 5.5v-3h3M10.5 2.5h3v3M13.5 10.5v3h-3M5.5 13.5h-3v-3M7 7l5 2-2 .8L9 12z`})}),switchOff:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`5.5`}),U(`path`,{d:`M4.1 11.9l7.8-7.8`})]}),switchOn:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`5.5`}),U(`path`,{d:`M5.3 8.3l1.8 1.8 3.6-3.9`})]}),wrench:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M13.2 4.6a3.3 3.3 0 01-4.4 3.6L3.9 13.1a1.3 1.3 0 01-1.9-1.9l4.9-4.9a3.3 3.3 0 013.6-4.4L8.6 4l.5 2.4 2.4.5z`})}),route:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M2.5 12.5l4-6 4 3 3-6.5`}),U(`circle`,{class:`solid`,cx:`2.5`,cy:`12.5`,r:`1.5`}),U(`circle`,{class:`solid`,cx:`6.5`,cy:`6.5`,r:`1.5`}),U(`circle`,{class:`solid`,cx:`10.5`,cy:`9.5`,r:`1.5`}),U(`circle`,{class:`solid`,cx:`13.5`,cy:`3`,r:`1.5`})]}),building:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 5.5h13l-2-3h-9zM4 5.5v5M12 5.5v5M1.5 10.5h13M1.5 13.5h13`})}),money:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`1.5`,y:`3.5`,width:`10`,height:`6.5`}),U(`circle`,{cx:`6.5`,cy:`6.75`,r:`1.4`}),U(`circle`,{class:`bg`,cx:`11.5`,cy:`11.5`,r:`3`}),U(`circle`,{cx:`11.5`,cy:`11.5`,r:`1.2`})]}),save:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.5 2.5h9l2 2v9h-11zM5 2.5v3.5h5v-3.5M4.5 13.5v-4.5h7v4.5`})}),copy:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`5.5`,y:`5.5`,width:`8`,height:`8`,rx:`1`}),U(`path`,{d:`M10.5 3.5v-1h-8v8h1`})]}),marey:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 2.5h13M1.5 13.5h13M2 13.5l4-11M7.5 2.5l4 11M10 13.5l4-11`})}),timetable:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`2.5`,y:`2.5`,width:`11`,height:`11`,rx:`1`}),U(`path`,{d:`M2.5 5.5h11M5.5 5.5v8M7.5 8h4M7.5 10.5h3`})]}),calendar:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`2.5`,y:`3.5`,width:`11`,height:`11.5`,rx:`1`}),U(`path`,{d:`M2.5 6.5h11M5.5 2v3M10.5 2v3`})]}),goOut:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.5 8h10M9 4.5L12.5 8 9 11.5`})}),chevron:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M6 3.5L10.5 8 6 12.5`})}),leaveGroup:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`1.5`,y:`2.5`,width:`8`,height:`11`,rx:`1`}),U(`path`,{d:`M6.5 8h8M12 5.5L14.5 8 12 10.5`})]}),goBack:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M13.5 8h-10M7 4.5L3.5 8 7 11.5`})}),pin:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M8 14.5s4.5-4.2 4.5-7.6a4.5 4.5 0 00-9 0c0 3.4 4.5 7.6 4.5 7.6z`}),U(`circle`,{cx:`8`,cy:`6.8`,r:`1.6`})]}),globe:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`6`}),U(`path`,{d:`M2 8h12M8 2c-2.2 2-2.2 10 0 12M8 2c2.2 2 2.2 10 0 12`})]}),walk:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`9.5`,cy:`2.8`,r:`1.3`}),U(`path`,{d:`M9.5 5.2l-1.8 3 2.3 2.3v3.7M7.7 8.2L5.3 9.4M9.6 6.4l2.4 1.8M7.7 8.2L6.2 14`})]}),ride:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M1.8 11.2V8.4l1.6-3.4h9.2l1.6 3.4v2.8zM1.8 8.4h12.4`}),U(`circle`,{cx:`4.8`,cy:`11.4`,r:`1.3`,class:`bg`}),U(`circle`,{cx:`11.2`,cy:`11.4`,r:`1.3`,class:`bg`})]}),train:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{x:`3`,y:`2.5`,width:`10`,height:`8.5`,rx:`2`}),U(`path`,{d:`M3 6.8h10M5.8 11l-1.9 2.9M10.2 11l1.9 2.9`}),U(`circle`,{class:`solid`,cx:`5.6`,cy:`9`,r:`.7`}),U(`circle`,{class:`solid`,cx:`10.4`,cy:`9`,r:`.7`})]}),highSpeed:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 11.5h9.6c2 0 3.4-.7 3.4-1.7 0-1.4-3-3.9-6.8-4.3H1.5zM9 5.8l1.6 2.6h2.8M1.5 13.8h13`})}),plane:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:Wr})}),alert:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`8`,r:`6.2`}),U(`path`,{d:`M8 4.6v3.2`}),U(`circle`,{class:`solid`,stroke:`none`,cx:`8`,cy:`11.1`,r:`1.4`})]}),cities:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 14h13M3 14V7h3.5v7M6.5 14V2.5h3.5V14M10 14V8h3v6`})}),home:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2 7.5L8 2l6 5.5M3.8 6v7.8h3V9.8h2.4v4h3V6`})}),homeOn:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,d:`M8 2L2 7.5h1.8v6.3h3V9.8h2.4v4h3V7.5H14z`})}),star:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{class:`solid`,d:`M8 1.5l1.9 4.1 4.5.5-3.4 3 1 4.4L8 11.3l-4 2.2 1-4.4-3.4-3 4.5-.5z`})}),cloud:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4.6 12.5h7a2.6 2.6 0 00.3-5.2 3.9 3.9 0 00-7.5-.9 2.9 2.9 0 00.2 6.1z`})}),cloudOff:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4.6 12.5h7a2.6 2.6 0 00.3-5.2 3.9 3.9 0 00-7.5-.9 2.9 2.9 0 00.2 6.1zM2.5 2.5l11 11`})}),download:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M8 2.5v7.5M4.8 7l3.2 3.2L11.2 7M2.5 11v2.5h11V11`})}),history:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M2.9 9.2a5.2 5.2 0 1 0 .9-4.6M3 2.5v2.6h2.6M8 5.2V8.3l2.1 1.4`})}),person:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`8`,cy:`5.2`,r:`2.9`}),U(`path`,{d:`M2.4 14.2c.6-3 2.9-4.6 5.6-4.6s5 1.6 5.6 4.6`})]}),medal:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M4.5 1.5h7L9.3 6.6M4.5 1.5l2.2 5.1`}),U(`circle`,{cx:`8`,cy:`10.3`,r:`3.9`}),U(`circle`,{class:`solid`,cx:`8`,cy:`10.3`,r:`1.4`})]}),trophy:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4.5 2.5h7v3.5a3.5 3.5 0 01-7 0zM4.5 3.8H2.5c0 2 .8 3.2 2.3 3.4M11.5 3.8h2c0 2-.8 3.2-2.3 3.4M8 9.5v2.5M5.5 13.5h5`})}),people:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`circle`,{cx:`5.8`,cy:`5.4`,r:`2.4`}),U(`path`,{d:`M1.5 13.5c.4-2.7 2.1-4.2 4.3-4.2s3.9 1.5 4.3 4.2M10.4 3.2a2.4 2.4 0 010 4.4M11.9 9.6c1.4.6 2.3 1.9 2.6 3.9`})]}),share:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M8 10V2.5M4.8 5.5L8 2.3l3.2 3.2M3 8.5v5h10v-5`})}),link:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M6.4 9.6l3.2-3.2M7.2 4.8l1.3-1.3a2.6 2.6 0 013.7 3.7l-1.3 1.3M8.8 11.2l-1.3 1.3a2.6 2.6 0 01-3.7-3.7l1.3-1.3`})}),heart:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M8 13.8S2 10.3 2 6.1A3.1 3.1 0 018 5a3.1 3.1 0 016 1.1c0 4.2-6 7.7-6 7.7z`})}),bookmark:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M4 2.5h8v11L8 10.5l-4 3z`})}),flag:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M3.5 14.5v-12M3.5 2.5h9l-2 3 2 3h-9`})}),foldMap:()=>U(`svg`,{viewBox:`0 0 16 16`,children:U(`path`,{d:`M1.5 4l4-1.5 5 2 4-1.5v9.5l-4 1.5-5-2-4 1.5zM5.5 2.5V12M10.5 4.5V14`})}),bug:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M6.2 4.8a1.8 1.8 0 013.6 0`}),U(`rect`,{x:`4.8`,y:`4.8`,width:`6.4`,height:`9.2`,rx:`3.2`}),U(`path`,{d:`M8 7.6V14M4.8 8.6H2.4M4.8 11.6l-2.2 1.5M11.2 8.6h2.4M11.2 11.6l2.2 1.5M5.3 6.3L3.4 4.6M10.7 6.3l1.9-1.7`})]}),computer:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`rect`,{class:`screen`,x:`1.5`,y:`2.5`,width:`13`,height:`8.5`,rx:`1`}),U(`path`,{d:`M8 11v2.5M5 13.8h6`})]}),gear:()=>U(`svg`,{viewBox:`0 0 16 16`,children:[U(`path`,{d:`M6.83 3.14L7.09 1.26L8.91 1.26L9.17 3.14L10.61 3.74L12.13 2.59L13.41 3.87L12.26 5.39L12.86 6.83L14.74 7.09L14.74 8.91L12.86 9.17L12.26 10.61L13.41 12.13L12.13 13.41L10.61 12.26L9.17 12.86L8.91 14.74L7.09 14.74L6.83 12.86L5.39 12.26L3.87 13.41L2.59 12.13L3.74 10.61L3.14 9.17L1.26 8.91L1.26 7.09L3.14 6.83L3.74 5.39L2.59 3.87L3.87 2.59L5.39 3.74z`}),U(`circle`,{cx:`8`,cy:`8`,r:`2.2`})]})};function Ii({line:e,size:t=``,plain:n,pick:r,gone:i,tip:a,rim:o}){let c=n?void 0:t=>{t.stopPropagation(),r?r(e):D.value={kind:`line`,line:e.id}};Yr.value;let l=Hi(),u=fe(e.id),d=si(e.letter,t,l.value),f=d&&gi(d,u),p=Hr(e.id);return U(`span`,{ref:l.ref,class:`chip `+t+(n?``:` link`)+(u===`square`?` square`:``)+(u===`outline`?` ring`:``)+(p?` idle`:``)+(o?` rimmed`:``),style:{"--c":e.colour,"--ct":s(e.colour),visibility:i?`hidden`:void 0},"data-tip":n?void 0:(a??e.name)+(p?`
`+Ur:``),onClick:c,children:f?U(`svg`,{style:{width:f.w+`px`,height:f.h+`px`},children:[o&&U(Vi,{b:f}),U(Bi,{b:f}),U(`text`,{x:f.x,y:f.y,children:e.letter})]}):U(`span`,{children:e.letter})})}function Li({shape:e}){Yr.value;let t=gi({w:12,h:12,x:0,y:0,top:0,iw:0,ih:0,stem:ai(`I`,``)?.stem??2},e);return U(`svg`,{class:`shape-icon`,style:{width:t.w+`px`,height:t.h+`px`},"aria-hidden":`true`,children:U(Bi,{b:t})})}var Ri={circle:`widgets.circle`,square:`widgets.square`,diamond:`widgets.diamond`,outline:`widgets.outline`};function zi({value:e,onChange:t,colour:n,tips:r}){return U(`div`,{class:`group shapes`,role:`radiogroup`,style:n?{"--c":n}:void 0,children:gt.map(n=>U(`button`,{class:`btn`+(n===e?` on`:``),role:`radio`,"aria-checked":n===e,"aria-label":f(Ri[n]),"data-tip":r?.(n),onClick:()=>t(n),children:U(Li,{shape:n})}))})}var Bi=({b:e})=>e.path?U(`path`,{d:e.path.d,"stroke-width":e.path.stroke}):e.rect.ring===void 0?U(`rect`,{y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r}):U(`rect`,{class:`ring`,x:e.rect.x,y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r,"stroke-width":e.rect.ring}),Vi=({b:e})=>e.path?U(`path`,{class:`bullet-rim`,d:e.path.d,"stroke-width":e.path.stroke+2}):e.rect.ring===void 0?U(`rect`,{class:`bullet-rim`,y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r,"stroke-width":2}):U(`rect`,{class:`bullet-rim`,x:e.rect.x,y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r,"stroke-width":e.rect.ring+2});function Hi(){let e=Re(null),t=ut.value,[n,r]=ae(null),i=n??t;return M(()=>{let t=e.current?.currentCSSZoom;typeof t==`number`&&t>0&&Math.abs(t-i)>1e-6&&r(t)}),{ref:e,value:i}}function Ui(e){e&&(e.classList.remove(`shake`),e.offsetWidth,e.classList.add(`shake`))}function Wi(e){let t=t=>e.jump?t.ctrlKey?20:t.shiftKey?5:1:1,n=e.jump&&!Gt()?e.jumpUnit?f(`widgets.jumpUnit`,{unit:e.jumpUnit}):f(`widgets.jump`):void 0,r=e=>e&&n?e+`
`+n:e??n,i=Re(null),a=()=>Ui(i.current),o=t=>{let n=e.onStep(t);n===!1?(an(),a()):n instanceof Promise&&n.then(e=>{e===!1&&a()})};return U(`span`,{ref:i,class:`stepper`+(e.wide?` wide`:``),onAnimationEnd:()=>i.current?.classList.remove(`shake`),children:[U(`button`,{class:`btn`,"aria-label":f(`widgets.less`,{label:e.label}),"data-tip":r(e.tipDown),onClick:e=>o(-t(e)),children:U(Fi.minus,{})}),e.type?U(Gi,{label:e.label,type:{...e.type,set:t=>{e.type.set(t)===!1&&(an(),a())}},children:e.value}):U(`span`,{class:`v`,"data-tip":e.tipValue,children:e.value}),U(`button`,{class:`btn`,"aria-label":f(`widgets.more`,{label:e.label}),"data-tip":r(e.tipUp),onClick:e=>o(t(e)),children:U(Fi.plus,{})})]})}function Gi(e){let[t,n]=ae(null),r=Re(!1),i=Re(!1),a=e=>{e&&i.current&&(i.current=!1,e.focus(),e.select())},o=()=>{if(r.current)return;r.current=!0;let i=parseFloat((t??``).replace(/[^0-9.\-]/g,``));n(null),Number.isFinite(i)&&e.type.set(i)};return t===null?U(`button`,{class:`v typed`,"data-tip":e.type.tip,"aria-label":f(`widgets.type`,{label:e.label}),onClick:()=>{r.current=!1,i.current=!0,n(e.type.text)},children:e.children}):U(`input`,{class:`v typing`,ref:a,value:t,inputMode:`decimal`,"aria-label":e.label,onInput:e=>n(e.currentTarget.value),onBlur:o,onKeyDown:e=>{e.key===`Enter`&&o(),e.key===`Escape`&&(r.current=!0,n(null))}})}function Ki(e){return U(`div`,{class:`group`,children:e.options.map(([t,n])=>U(`button`,{class:`btn`+(t===e.value?` on`:``),"data-tip":e.tips?.(t),disabled:e.disabled?.(t),onClick:()=>e.onChange(t),children:n}))})}function qi(e){return U(`label`,{class:`check`,"data-tip":e.tip,children:[U(`input`,{type:`checkbox`,checked:e.checked,"aria-label":e.label,onChange:t=>e.onChange(t.target.checked)}),e.children]})}function Ji({sort:e,cols:t,hand:n}){let r=e.value,i=t=>{let i=!n&&r.key===t.key,a=U(`i`,{class:`sort-arrow`+(i?r.dir>0?` up`:` down`:``)});return U(`button`,{class:`sort-btn`+(t.beside?t.cls?` `+t.cls:``:t.cls?` val `+t.cls:` grow`)+(i?` on`:``),"data-tip":t.tip,onClick:()=>{n?.(),e.value=i?{key:t.key,dir:r.dir===1?-1:1}:{key:t.key,dir:t.first}},children:[t.cls&&!t.left&&!t.beside&&a,t.label,(!t.cls||t.left||t.beside)&&a]},t.key)},a=t.filter(e=>e.beside);return a.length?U(`div`,{class:`sort-head`,children:[U(`span`,{class:`sort-lead`,children:[i(t[0]),a.map(i)]}),t.slice(1).filter(e=>!e.beside).map(i)]}):U(`div`,{class:`sort-head`,children:t.map(i)})}function Yi({tip:e,children:t}){return U(`li`,{class:`alert bad`,children:[U(`span`,{class:`alert-mark`,children:U(Fi.alert,{})}),U(`div`,{class:`alert-body`,"data-tip":e,children:t})]})}function Xi(e){return U(`li`,{class:e.bold?`b`:``,children:[U(`span`,{class:`grow`,children:e.label}),e.children!==void 0&&U(`span`,{class:`val`,children:e.children})]})}function Zi({children:e}){return U(`div`,{class:`inspector-actions`,children:e})}function Qi({parts:e,kind:t,label:n}){return U(`div`,{class:`bar `+t,role:`img`,"aria-label":n,children:e.map(e=>e.share>0&&U(`i`,{class:`seg`+(e.cls?` `+e.cls:``),style:{width:100*e.share+`%`,...e.colour&&{background:e.colour}},"data-tip":e.tip}))})}function $i({train:e,shares:t}){return t?U(re,{children:ji(e,t).map(e=>U(`i`,{class:`seg`,style:{width:e.n+`%`,background:e.colour}},e.mode))}):U(`i`,{class:`seg seg-train`,style:{width:e+`%`}})}function ea({value:e,onPick:t,tip:n,levels:r=qe}){return U(`div`,{class:`group levels`,children:r.map(r=>U(`button`,{class:`btn lv`+(r===e?` on`:``),style:{"--lc":vn[r],"--lk":s(vn[r])},"data-tip":n(r),"aria-label":f(`widgets.level`,{level:un(r)}),"aria-pressed":r===e,onClick:()=>t(r),children:un(r)}))})}function ta({hidden:e,onToggle:t}){return U(`div`,{class:`group levels level-toggles`,children:qe.map(n=>U(`button`,{class:`btn lv`+(e.has(n)?``:` on`),style:{"--lc":vn[n],"--lk":s(vn[n])},"aria-label":f(`widgets.level`,{level:un(n)}),"aria-pressed":!e.has(n),onClick:()=>t(n),children:un(n)}))})}function na({value:e,onPick:t,single:n=!0,children:r}){return U(`div`,{class:`group tb-count`,role:`group`,"aria-label":f(`toolBar.trackCount`),children:[n&&U(`button`,{class:`btn icon`+(e===1?` on`:``),"aria-label":f(`toolBar.singleTrack`),"aria-pressed":e===1,"data-tip":f(`toolBar.singleTrack`),onClick:()=>t(1),children:U(Fi.tracks1,{})}),U(`button`,{class:`btn icon`+(e===2?` on`:``),"aria-label":f(`toolBar.doubleTrack`),"aria-pressed":e===2,"data-tip":f(`toolBar.doubleTrack`),onClick:()=>t(2),children:U(Fi.tracks2,{})}),r]})}function ra({on:e,off:t,onText:n}){return U(`span`,{class:`swap-label`,children:[U(`span`,{class:e?`off`:void 0,"aria-hidden":e,children:t}),U(`span`,{class:e?void 0:`off`,"aria-hidden":!e,children:n})]})}function ia({built:e}){return e?null:U(`p`,{class:`blueprint-tag`,children:f(`widgets.blueprint`)})}var aa=!1;typeof window<`u`&&(window.addEventListener(`blur`,()=>aa=!0),document.addEventListener(`pointermove`,()=>aa=!1,{capture:!0,passive:!0}));var oa=()=>aa,sa=e=>e.key===`Shift`||e.key===`Control`||e.key===`Alt`||e.key===`Meta`||e.key===`OS`||e.key===`AltGraph`,ca=/\u0002([^|\u0003]*)\|([^|\u0003]*)(?:\|([^\u0003]*))?\u0003/,la=(e,t,n)=>`\u0002${e.replace(/[\u0002\u0003|]/g,``)}|${t}${n?`|`+n:``}\u0003`,ua=/^\u0004(\|?)([^\u0005]*)\u0005$/,da=(e,t=!1,n)=>`\u0004${t?`|`:``}${e.map((e,t)=>n?`${e}@${n[t]>0?n[t]:0}`:e).join(`;`)}\u0005`,fa=/^\u000e([^\u001f]*)\u001f([^\u001f]*)$/,pa=(e,t)=>`\u000e${e.replace(/[\u0000-\u001f]/g,` `)}\u001f${t.replace(/[\u0000-\u001f]/g,` `)}`,ma=6,ha=9,ga=328;function _a(e,t,n){let r=()=>{let t=document.createElement(`b`);e.append(t)},i=t.length*15+ha;n&&i<=ga&&(e.style.width=`${i}px`),n&&r(),t.forEach((t,i)=>{let[a,o]=t.split(`@`);if(o!==void 0&&!(Number(o)>0))return;n&&i>0&&r();let s=document.createElement(`i`);s.style.background=a,o!==void 0&&(s.style.flex=`${o} 1 0`),e.append(s)}),n&&r()}var va=/^\u0006([^\u0006]*)\u0006$/,ya=e=>`\u0006${e.map(e=>e.join(``)).join(``)}\u0006`,ba=/^\u0007(\d+)/,xa=(e,t)=>`\u0007${e}${t}`;function Sa(e,t){let n=t.split(``).map(e=>e.split(``).map(e=>{let t=ba.exec(e);return t?{span:Number(t[1]),text:e.slice(t[0].length)}:{span:1,text:e}})),r=Math.max(1,...n.map(e=>e.reduce((e,t)=>e+t.span,0)));e.style.gridTemplateColumns=`repeat(${r}, auto)`;for(let t of n)if(t.length===1&&!t[0].text){let t=document.createElement(`div`);t.className=`tip-gap`,t.style.gridColumn=`span ${r}`,e.append(t)}else t.forEach((t,n)=>{let r=Ea(t.text);n>0&&r.classList.add(`num`),t.span>1&&(r.style.gridColumn=`span ${t.span}`),e.append(r)})}var Ca=`\b`,wa=e=>Ca+e,Ta=e=>`
`+wa(e);function Ea(e){let t=document.createElement(`div`);if(e.startsWith(Ca))return t.className=`tip-muted`,Aa(t,e.slice(1)),t;let n=ua.exec(e);if(n)return t.className=n[1]?`tip-strip stops`:`tip-strip`,_a(t,n[2].split(`;`),!!n[1]),t;let r=fa.exec(e);if(r){t.className=`tip-ends`;for(let e of[r[1],r[2]]){let n=document.createElement(`span`);n.textContent=e,t.append(n)}return t}let i=va.exec(e);if(i)return t.className=`tip-grid`,Sa(t,i[1]),t;let a=e.split(ca);for(let e=0;e<a.length&&(a[e]&&Ma(t,a[e]),!(e+3>=a.length));e+=4){let n=document.createElement(a[e+1]?`span`:`i`);if(a[e+1]){n.className=`chip sm tip-chip`,n.style.setProperty(`--c`,a[e+2]),n.style.setProperty(`--ct`,s(a[e+2]));let t=a[e+3];Rt(t)?n.append(vi(a[e+1],`sm`,t)):n.textContent=a[e+1]}else n.className=`tip-swatch`,n.style.background=a[e+2];t.append(n)}return t}function Da(e){for(let t of e.querySelectorAll(`.tip-strip.stops`)){let e=t.querySelectorAll(`i`).length,n=t.querySelectorAll(`b`);if(n.length<3)continue;let r=n[0].getBoundingClientRect().width+2;if(!((t.clientWidth-n.length*r)/e>=ma)){t.classList.add(`dense`);for(let e=1;e<n.length-1;e++)n[e].remove()}}}var Oa=/\(((?:Ctrl\+|Shift\+)?(?:[A-Z0-9/,.]|Esc|Enter|Delete|Space|Backspace|Caps Lock|Tab)|\/ or Ctrl\+F)\)/,ka=/(−\$[\d.,]+[KMBT]?)/;function Aa(e,t){let n=t.split(ka);for(let t=0;t<n.length;t++){if(!n[t])continue;if(t%2==0){e.append(n[t]);continue}let r=document.createElement(`span`);r.className=`money-neg`,r.textContent=n[t],e.append(r)}}var ja=RegExp(` ?`+Oa.source,`g`);function Ma(e,t){Gt()&&(t=t.replace(ja,``));let n=t.split(Oa);for(let t=0;t<n.length;t++){if(t%2==0){Aa(e,n[t]);continue}let r=document.createElement(`span`),i=document.createElement(`span`);r.className=`tip-hint`,i.className=`tip-key`,i.textContent=n[t],r.append(`(`,i,`)`),e.append(r)}}function Na(){let e=document.createElement(`div`);e.className=`tool-tag ui-tag`,e.setAttribute(`role`,`tooltip`),e.setAttribute(`popover`,`manual`),e.style.display=`none`,document.body.appendChild(e);let t=null,n=``,r=0,i=0,a=()=>{t&&u.disconnect(),t=null,n=``,e.style.display=`none`},o=!1,s=()=>{let t=e.offsetWidth,n=e.offsetHeight;if(o){let a=Math.max(4,Math.min(innerWidth-4-t,r-t/2)),o=Math.max(4,i-36-n);e.style.transform=`translate(${Math.round(a)}px, ${Math.round(o)}px)`;return}let a=r+14,s=i+16;a+t>innerWidth-4&&(a=Math.max(4,r-10-t)),s+n>innerHeight-4&&(s=Math.max(4,i-10-n)),e.style.transform=`translate(${Math.round(a)}px, ${Math.round(s)}px)`},c=()=>{let r=t?.getAttribute(`data-tip`)??``;if(!r||!t?.isConnected)return a();let i=r!==n;i&&(n=r,e.replaceChildren(...r.split(`
`).filter(e=>!(e.startsWith(Ca)&&Gt())).map(Ea))),e.style.display===`none`&&l(),e.style.display=``,i&&Da(e),s()},l=()=>{typeof e.showPopover==`function`&&(e.matches(`:popover-open`)&&e.hidePopover(),e.showPopover())},u=new MutationObserver(c),d=e=>{if(e.pointerType===`touch`)return;if(o=!1,e.buttons)return a();r=e.clientX,i=e.clientY;let s=(e.target instanceof Element?e.target:null)?.closest(`[data-tip], [title]`)??null;if(s?.hasAttribute(`title`)){let e=s.getAttribute(`title`);s.removeAttribute(`title`),e&&!s.hasAttribute(`data-tip`)&&s.setAttribute(`data-tip`,e)}if(s!==t){if(t&&u.disconnect(),t=s,n=``,!t)return a();u.observe(t,{attributes:!0,attributeFilter:[`data-tip`]})}c()};document.addEventListener(`pointermove`,d,{capture:!0,passive:!0}),document.addEventListener(`pointerover`,d,{capture:!0,passive:!0}),document.addEventListener(`pointerdown`,a,!0),document.addEventListener(`wheel`,a,{capture:!0,passive:!0}),document.addEventListener(`scroll`,a,!0),document.addEventListener(`keydown`,e=>sa(e)||a(),!0),document.documentElement.addEventListener(`pointerleave`,e=>e.pointerType===`touch`||oa()||a());let f=null,p=!1,m=0,h=()=>{f&&clearTimeout(f.timer),f=null};document.addEventListener(`pointerdown`,e=>{if(h(),clearTimeout(m),p=!1,e.pointerType!==`touch`)return;let a=e.target instanceof Element?e.target.closest(`[data-tip]`):null;if(!a)return;let s=e.clientX,l=e.clientY;f={x:s,y:l,found:a,timer:setTimeout(()=>{f=null,a.isConnected&&(t=a,n=``,r=s,i=l,o=!0,p=!0,c())},500)}},!0),document.addEventListener(`pointermove`,e=>{f&&e.pointerType===`touch`&&Math.hypot(e.clientX-f.x,e.clientY-f.y)>10&&h()},{capture:!0,passive:!0});let g=e=>{h(),e?.isConnected?(t=e,n=``,o=!0,c(),m=setTimeout(a,3e3)):o&&t&&(m=setTimeout(a,1500))};document.addEventListener(`pointerup`,e=>{let t=e.pointerType===`touch`?f:null;t&&(r=t.x,i=t.y),g(t?.found)},!0),document.addEventListener(`pointercancel`,()=>g(),!0),document.addEventListener(`click`,e=>{p&&(p=!1,e.preventDefault(),e.stopPropagation())},!0),document.addEventListener(`contextmenu`,e=>{p&&e.preventDefault()},!0)}function Pa(e,t,n,r,i,a,o){let s=[e,``,t,n,``];return Object.defineProperty(s,1,{get:()=>f(r),enumerable:!0}),Object.defineProperty(s,4,{get:()=>f(a&&Gt()?a:i)+(o?Ta(f(o)):``),enumerable:!0}),s}var Fa=[Pa(`track`,Fi.track,`1`,`toolKeys.track`,`toolKeys.trackTip`),Pa(`station`,Fi.station,`2`,`toolKeys.station`,`toolKeys.stationTip`),Pa(`delete`,Fi.bin,`3`,`toolKeys.delete`,`toolKeys.deleteTip`,void 0,`common.shiftSkip`),Pa(`blueprint`,Fi.marquee,`4`,`toolKeys.select`,`toolKeys.selectTip`,`toolKeys.selectTipTouch`)],Ia=Object.fromEntries(Fa.map(([e,,,t])=>[t,e])),La={n:`newLine`,s:`editStops`,c:`construct`,g:`addPassed`},Ra={b:`build`,l:`lines`,a:`stations`,f:`money`,y:`cities`},za=e=>Object.keys(Ra).find(t=>Ra[t]===e)?.toUpperCase(),Ba=e=>/^Digit[1-7]$/.test(e)?qe[Number(e[5])-1]:null,Va=e=>`Shift+${qe.indexOf(e)+1}`;function Ha(e){De(()=>{let t=ot.peek();Lr.tools?.exit(),t!==e&&e!==`select`&&(ot.value=e,g(e)&&_t())})}var Ua=()=>({lines:new Map,hideEdges:new Set,edges:new Map,hideStations:new Set,stations:[],colours:new Map,track:[],lineStrokes:[],hideLines:new Set,rawStations:[]}),Wa=e=>!e.lines.size&&!e.hideEdges.size&&!e.edges.size&&!e.hideStations.size&&!e.stations.length&&!e.colours.size&&!e.track.length&&!e.lineStrokes.length&&!e.hideLines.size&&!e.rawStations.length;function Ga(e,t){let n=e.lines,r=e.track,i=[],a=new Map;for(let e=0;e<n.count;e++){let r=n.colour[e];if(!t.get(r)?.edges?.has(n.edge[e]))continue;i.push(e);let o=a.get(r);o||a.set(r,o=new Set),o.add(n.edge[e])}let o=new Map;for(let[e,n]of t)if(n.edges)for(let t of n.edges){if(a.get(e)?.has(t))continue;let n=o.get(t);n?n.push(e):o.set(t,[e])}let s=[];if(o.size)for(let e=0;e<r.count;e++)for(let t of o.get(r.edge[e])??[])s.push(e,t);let c=i.length+s.length/2,l=new Uint8Array(2*c).fill(255),u=new Int16Array(6*c),d={seg:new Float32Array(4*c),colour:new Uint32Array(c),edge:new Uint32Array(c),level:new Float32Array(c),flags:new Float32Array(c),dist:new Float32Array(c),lane:l,band:u,count:c},f=0;for(let e of i)d.seg.set(n.seg.subarray(4*e,4*e+4),4*f),d.colour[f]=n.colour[e],d.edge[f]=n.edge[e],d.level[f]=n.level[e],d.flags[f]=n.flags[e],n.lane&&l.set(n.lane.subarray(2*e,2*e+2),2*f),n.band&&u.set(n.band.subarray(6*e,6*(e+1)),6*f),f++;for(let e=0;e<s.length;e+=2){let n=s[e],i=s[e+1],a=t.get(i).look,o=r.flags[n],c=!!(o&1);d.seg.set(r.seg.subarray(4*n,4*n+4),4*f),d.colour[f]=i,d.edge[f]=r.edge[n],d.level[f]=r.level[n],d.flags[f]=(a.running&&!c?0:2|(c?1|o&64:0))|(a.fast?o&256:0)|(a.tram?o&on:0)|o&Ut,r.lane&&l.set(r.lane.subarray(2*n,2*n+2),2*f),f++}return d}function Ka(e,t){let n=e.lines,r=new Set;for(let e=0;e<n.count;e++)n.colour[e]===t&&r.add(n.edge[e]);return r}function qa(e,t,n,r){let i=e.lines,a=n===0?0:r-2;if(!i.stretch||r<3||n!==0&&n!==r-1)return null;let o=new Set,s=new Set;for(let e=0;e<i.count;e++)i.colour[e]===t&&(i.stretch[e]===a?s:o).add(i.edge[e]);return s.size?o:null}function Ja(e,t,n,r){let i=e.lines;if(!i.stretch)return null;let a=new Set,o=!1;for(let e=0;e<i.count;e++){if(i.colour[e]!==t)continue;let s=i.stretch[e];s>=n&&s<r?a.add(i.edge[e]):o=!0}return o&&a.size?a:null}var Ya=(e,t)=>(e+4)*32*256+(t+4)*32;function Xa(e,t,n,r,i,a){let o=e.flags[t];if(n.built&&(o&=~(65|(r?2:0))),n.off===!0&&o&1&&(o|=64),n.off===!1&&(o&=-65),n.kind!==void 0&&(o&=~(256|on|dn),n.kind===1&&!r&&(o|=256),n.kind>=2&&(o|=on|(n.kind===4&&!r?dn:0))),e.flags[t]=o,n.level){let[r,o]=n.level,s=a?i/a:0,c=a?(i+1)/a:1;e.level[t]=Ya(Math.round(r+(o-r)*s),Math.round(r+(o-r)*c))}n.tracks&&(e.lane[2*t]=e.lane[2*t+1]=n.tracks===2?255:0)}function Za(e,t){let n=new Map;for(let[e,r]of t)r.oneWay!==void 0&&n.set(e,r.oneWay);if(!n.size)return null;let r=e.track,i=new Map;for(let e=0;e<r.count;e++)n.has(r.edge[e])&&(i.get(r.edge[e])??i.set(r.edge[e],[]).get(r.edge[e])).push(e);let a=e.oneWayTrack??new Float32Array,o=[],s=(e,t)=>{for(let n of i.values())for(let i of n){let n=r.seg[4*i],a=r.seg[4*i+1],o=r.seg[4*i+2]-n,s=r.seg[4*i+3]-a,c=o*o+s*s,l=c>0?Math.max(0,Math.min(1,((e-n)*o+(t-a)*s)/c)):0;if(Math.hypot(n+l*o-e,a+l*s-t)<=1e-4*Math.sqrt(c||1)+1e-9)return!0}return!1};for(let e=0;e+11<=a.length;e+=11)s(a[e],a[e+1])||o.push(e);let c=[],l=[];for(let[e,a]of n)if(a===1||a===2){let n=i.get(e),o=t.get(e)?.ends;n?.length&&o&&l.push({a:o[0],b:o[1],way:a,strokes:Qa(r,n)})}if(l.length){let t=[];for(let n=0;n<e.stationCount;n++)t.push([e.stations[n*3],e.stations[n*3+1]]);for(let n=0;n+1<e.junctions.length;n+=2)t.push([e.junctions[n],e.junctions[n+1]]);Ft(l,t,c)}let u=new Float32Array(o.length*11+c.length);return o.forEach((e,t)=>u.set(a.subarray(e,e+11),t*11)),u.set(c,o.length*11),u}function Qa(e,t){let n=t.length,r=new Uint8Array(2*n).fill(255),i=new Int16Array(6*n),a={seg:new Float32Array(4*n),colour:new Uint32Array(n),edge:new Uint32Array(n),level:new Float32Array(n),flags:new Float32Array(n),dist:new Float32Array(n),lane:r,band:i,count:n};return t.forEach((t,n)=>{a.seg.set(e.seg.subarray(4*t,4*t+4),4*n),a.colour[n]=e.colour[t],a.edge[n]=e.edge[t],a.level[n]=e.level[t],a.flags[n]=e.flags[t],a.dist[n]=e.dist[t],e.lane&&r.set(e.lane.subarray(2*t,2*t+2),2*n),e.band&&i.set(e.band.subarray(6*t,6*(t+1)),6*n)}),a}function $a(e){let t=e.reduce((e,t)=>e+t.count,0),n={seg:new Float32Array(4*t),colour:new Uint32Array(t),edge:new Uint32Array(t),level:new Float32Array(t),flags:new Float32Array(t),dist:new Float32Array(t),lane:new Uint8Array(2*t).fill(255),band:new Int16Array(6*t),count:t},r=0;for(let t of e)n.seg.set(t.seg.subarray(0,4*t.count),4*r),n.colour.set(t.colour.subarray(0,t.count),r),n.edge.set(t.edge.subarray(0,t.count),r),n.level.set(t.level.subarray(0,t.count),r),n.flags.set(t.flags.subarray(0,t.count),r),n.dist.set(t.dist.subarray(0,t.count),r),t.lane&&n.lane.set(t.lane.subarray(0,2*t.count),2*r),t.band&&n.band.set(t.band.subarray(0,6*t.count),6*r),r+=t.count;return n}function eo(e,t){let n=[],r=[...t.track];if(t.lines.size&&n.push(Ga(e,t.lines)),t.edges.size){for(let[i,a]of[[e.lines,!0],[e.track,!1]]){let e=[];for(let n=0;n<i.count;n++)t.edges.has(i.edge[n])&&!(a&&t.lines.has(i.colour[n]))&&e.push(n);e.length&&(a?n:r).push(Qa(i,e))}for(let[e,i]of[[n,!0],[r.slice(t.track.length),!1]])for(let n of e){let e=new Map,r=new Map,a=e=>n.colour[e]+`:`+n.edge[e];for(let e=0;e<n.count;e++)t.edges.has(n.edge[e])&&r.set(a(e),(r.get(a(e))??0)+1);for(let o=0;o<n.count;o++){let s=t.edges.get(n.edge[o]);if(!s)continue;let c=e.get(a(o))??0;e.set(a(o),c+1),Xa(n,o,s,i,c,r.get(a(o)))}}}n.push(...t.lineStrokes);let i=e=>e.filter(e=>e.count),a=i(n),o=i(r);return{lines:a.length?a.length===1?a[0]:$a(a):null,track:o.length?o.length===1?o[0]:$a(o):null}}function to(e){let t=e.length,n=new Float32Array(Math.max(1,t)*3),r=new Float32Array(Math.max(1,t)*2),i=new Float32Array(Math.max(1,t)*4),a=new Float32Array(Math.max(1,t)*26);return e.forEach((e,t)=>{let o=Qe(e.ways,0,e.plat/2*e.perM);n.set([e.lx,e.ly,(e.built?0:2)|4|(e.side?Me|(e.side<0?A:0):0)|(e.mid?ze:0)|(e.tram?ie:0)],t*3),r.set([o.ax,o.ay],t*2),i.set([o.mx,o.my,o.phi,6*e.perM],t*4),a.set(Dt(o),t*26)}),{st:n,axis:r,shape:i,line:a,count:t}}function no(e,t){let n=t.length,r={st:new Float32Array(n*3),axis:new Float32Array(n*2),shape:new Float32Array(n*4),line:new Float32Array(n*26),count:n};return t.forEach((t,n)=>{r.st.set(e.stations.subarray(t*3,t*3+3),n*3),e.stationAxis&&r.axis.set(e.stationAxis.subarray(t*2,t*2+2),n*2),e.stationShape&&r.shape.set(e.stationShape.subarray(t*4,t*4+4),n*4),e.stationLine&&e.stationLine.length>=(t+1)*26&&r.line.set(e.stationLine.subarray(t*26,(t+1)*26),n*26)}),r}function ro(e){let t=e.reduce((e,t)=>e+t.count,0),n={st:new Float32Array(Math.max(1,t)*3),axis:new Float32Array(Math.max(1,t)*2),shape:new Float32Array(Math.max(1,t)*4),line:new Float32Array(Math.max(1,t)*26),count:t},r=0;for(let t of e)n.st.set(t.st.subarray(0,t.count*3),r*3),n.axis.set(t.axis.subarray(0,t.count*2),r*2),n.shape.set(t.shape.subarray(0,t.count*4),r*4),n.line.set(t.line.subarray(0,t.count*26),r*26),r+=t.count;return n}var io=new WeakMap;function ao(e,t){let n=io.get(e);if(n)return n;let r=new Map,i=e.seg,a=e.flags,o=e.level,s=e.edge,c=e.lane,l=-1,u=0;for(let n=0;n<e.count;n++){let e=t[n];e!==l&&(l>=0&&r.set(l,u),l=e,u=r.get(l)??17);let d=4*n;u=Math.imul(u,31)+(i[d]*16|0)|0,u=Math.imul(u,31)+(i[d+1]*16|0)|0,u=Math.imul(u,31)+(i[d+2]*16|0)|0,u=Math.imul(u,31)+(i[d+3]*16|0)|0,u=Math.imul(u,31)+a[n]*7+o[n]+s[n]*3+(c?c[2*n]+c[2*n+1]*256:0)|0}return l>=0&&r.set(l,u),io.set(e,r),r}function oo(e){ao(e.track,e.track.edge),ao(e.lines,e.lines.colour)}var so=(e,t)=>{let n=new Set;for(let[r,i]of e)t.get(r)!==i&&n.add(r);for(let r of t.keys())e.has(r)||n.add(r);return n};function co(e,t){let n=so(ao(e.track,e.track.edge),ao(t.track,t.track.edge)),r=so(ao(e.lines,e.lines.colour),ao(t.lines,t.lines.colour)),i=[],a=[];for(let t=0;t<e.track.count;t++)n.has(e.track.edge[t])&&i.push(t);for(let t=0;t<e.lines.count;t++)(r.has(e.lines.colour[t])||n.has(e.lines.edge[t]))&&a.push(t);let o=(e,t)=>[e.stations[t*3],e.stations[t*3+1],e.stations[t*3+2],e.stationShape?.[t*4+3]??0,e.stationAxis?.[t*2]??0,e.stationAxis?.[t*2+1]??0].join(`,`),s=new Map(e.stationIds.map((e,t)=>[e,t])),c=new Map(t.stationIds.map((e,t)=>[e,t])),l=[],u=[];for(let[n,r]of c){let i=s.get(n);(i===void 0||o(e,i)!==o(t,r))&&l.push(Number(n))}for(let[n,r]of s){let i=c.get(n);(i===void 0||o(e,r)!==o(t,i))&&u.push(r)}let d=new Map;for(let n=0;n*4+3<e.lineColours.length&&n*4+3<t.lineColours.length;n++)[0,1,2].some(r=>e.lineColours[n*4+r]!==t.lineColours[n*4+r])&&d.set(n,[e.lineColours[n*4],e.lineColours[n*4+1],e.lineColours[n*4+2]]);return{hideEdges:[...n],hideLines:[...r],hideStations:l,track:i.length?[Qa(e.track,i)]:[],lineStrokes:a.length?[Qa(e.lines,a)]:[],stations:u.length?no(e,u):null,colours:d}}function lo(e){let t=document.createElement(`div`);return t.className=`tool-marks`,e.getContainer().appendChild(t),t}function uo(e,t,n,r=0,i=0,a=!0){let o=Number.isFinite(t)&&Number.isFinite(n),s=o?``:`hidden`;if(e.style.visibility!==s&&(e.style.visibility=s),!o)return!1;let c=`translate(${a?Math.round(t+r):t+r}px, ${a?Math.round(n+i):n+i}px)`;return e.style.transform!==c&&(e.style.transform=c),!0}function fo(e,t,n,r,i=0){return e>=-i&&t>=-i&&e<=n+i&&t<=r+i}var po=(e=!1)=>{let t=t=>e?t.peek():t.value;return{mode:t(fn)?`tram`:t(Cn)?`hsr`:`rail`,count:t(pe)?4:t(se)?1:2}},mo=.6,ho=(e,t,r=!1,i=!1)=>n(t===`busway`?`busway`:t===`tram`?go():t===`hsr`?`highSpeed`:`regular`,e)*(r?2:i?mo:1),go=()=>Se.value&&!Ue.value?`streetTram`:`tram`,_o=(e,t)=>ge(e,{minimumFractionDigits:t===`hsr`?2:1,maximumFractionDigits:t===`hsr`?2:1})+`x`,vo=(e,t,n=!1,r=!1)=>_o(ho(e,t,n,r),t),yo=(e,t,n=!1,r=!1)=>Math.round(Ye(75*ho(e,t,n,r))*10)/10;function bo(e,t,n,r=!1,i=!1){let a=(e,t,r=2)=>nt({built:!0,tracks:r,hsr:t,lengthM:1e3,levelMin:e,levelMax:e},n),o=a(1,!1);return o>0?a(e,t===`hsr`,i?1:2)/o*(r?2:1)*(t===`busway`?At.busway.upkeep:t===`tram`?At[go()].upkeep:1):1}function xo(e,t,n,r=!1,i=!1){return n?rn(_o(bo(e,t,n,r,i),t)):``}function So(e,t,n,r=!1,i=!1){return[`${Ht(e)} (${Va(e)})`,f(`trackPrice.cost`,{mult:vo(e,t,r,i),price:qt(yo(e,t,r,i)),unit:Ie()}),xo(e,t,n,r,i)].filter(Boolean).join(`
`)}var Co=`#7fb3e0`,wo=`M8 1.8v12.4M5 4.8l3-3 3 3M5 11.2l3 3 3-3`,To=`M3.5 3.8L7.7 8l-4.2 4.2M8.5 3.8L12.7 8l-4.2 4.2`;function Eo(e,t,n=.5){let r=document.createElement(`span`);if(r.textContent=e,t){let[e,i,a]=F(t);r.className=`tag-chip`,r.style.setProperty(`--chip-bg`,`rgba(${e},${i},${a},${n})`),r.style.padding=`0 3px`,r.style.borderRadius=`2px`}return r}var Do=`#f2c200`,Oo=`#8fd97a`;function ko(e){return e<.995?[Oo,.3+.2*Math.min(1,(1-e)/.5)]:[Do,.2+.6*Math.min(1,Math.max(0,e-1)/1.5)]}function Ao(e){let t=ko(e);if(!t)return;let[n,r,i]=F(t[0]);return`rgba(${n},${r},${i},${t[1]})`}function jo(e,t){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);n.setAttribute(`viewBox`,`0 0 16 16`),n.setAttribute(`class`,`tag-icon`),n.setAttribute(`aria-label`,t);let r=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return r.setAttribute(`d`,e),n.append(r),n}function Mo(e,...t){let n=document.createElement(`span`);n.className=`tag-fact`,n.append(jo(wo,f(`trackTagRows.level`)));for(let r of[e,...t]){let e=Math.max(-3,Math.min(3,Math.round(r)));n.append(Eo(un(e),vn[e]))}return n}var No={1:`M10 3v14`,2:`M6 3v14M14 3v14`,4:`M4 3v14M8 3v14M12 3v14M16 3v14`},Po={1:`toolBar.singleTrack`,2:`toolBar.doubleTrack`,4:`toolBar.quadTrack`};function Fo(e=po(!0).mode,t=po(!0).count){let n=jo(No[t],f(Po[t]));return n.setAttribute(`viewBox`,`2 2 16 16`),n.classList.add(`tracks`),n.style.color=ue[e],n}function Io(e){let t=document.createElement(`span`);return t.className=`tag-fact`,t.append(jo(To,f(`trackTagRows.speedLimit`)),Eo(Nt(e),be(e))),t}function Lo(e,t=`train`){let n=document.createElement(`span`);return n.className=`tag-fact`,n.append(...Ro(Pt(`trackTagRows.fastest`,{vehicle:t,speed:Eo(Nt(e),be(e))}))),n}function Ro(e){return[e].flat(1/0).filter(e=>e!=null&&e!==!1).map(e=>typeof e==`object`?e:String(e))}var zo=`M1.5 13.5L6 6l2.4 3.4L10.6 6.5l3.9 7z`,Bo=`M1.5 6.5q1.6-1.6 3.25 0t3.25 0 3.25 0 3.25 0M1.5 10.5q1.6-1.6 3.25 0t3.25 0 3.25 0 3.25 0`,Vo=e=>e.toFixed(Math.abs(e*10-Math.round(e*10))>1e-9?2:1);function Ho(e,t=1){if(!e)return null;let n=[3,2,1].find(t=>(e[t]??0)>=1);if(n===void 0)return null;let r=document.createElement(`span`);return r.className=`tag-fact`,r.append(jo(zo,f(`trackTagRows.terrain`)),Eo(f(`trackTagRows.terrainAdds`,{terrain:Ze[n],mult:Vo(Wt[n]*t)}),Tt[n],.6)),r}function Uo(e,t=1){if(!e||(e[4]??0)<1)return null;let n=document.createElement(`span`);return n.className=`tag-fact`,n.append(jo(Bo,f(`trackTagRows.water`)),Eo(f(`trackTagRows.waterAdds`,{mult:Vo(sn*t)}),Co,.6)),n}var Wo=`M5 1.5L3.5 14.5M11 1.5l1.5 13M8 2v2.2M8 6.9v2.2M8 11.8V14`,Go=`#c9b28a`,Ko=`#c98a76`,qo=.75;function Jo(e,t,n,r){let i=0,a=0;for(let e=0;e<4;e++)i+=n[e]??0,a+=(n[e]??0)*Wt[e];let o=i>0?a/i:0,s=ho(1,r)-ho(0,r),c=ho(-2,r)-ho(0,r)-o*ho(1,r),l=75*t*Math.min(s,c);return l>0&&e<=l?{best:`ground`,share:e/l}:{best:c<s?`down`:`up`,share:1}}function Yo(e){let t=.6;return e.best===`down`?[Ko,t]:e.best===`up`?[Go,t]:[Go,t*(1-qo*(1-e.share))]}function Xo(e){let t=0,n=0;for(let r=3;r+2<e.length;r+=3){let i=Math.hypot(e[r]-e[r-3],e[r+1]-e[r-2]);t+=i,Math.round((e[r+2]+e[r-1])/16)===0&&(n+=i)}return t>0?n/t:1}function Zo(e,t){let n=e?.[5]??0;if(!e||n<1)return null;let[r,i]=Yo(Jo(e[6]??0,t,e,It.peek())),a=document.createElement(`span`);return a.className=`tag-fact`,a.append(jo(Wo,f(`trackTagRows.roads`)),Eo(f(`trackTagRows.roadsAdd`,{verbose:at.peek(),count:Number(n.toPrecision(3)),cost:Xt((e[6]??0)*1e6)}),r,i)),a}function Qo(e,t=!1){let n=document.createElement(`span`);return n.className=(t?`chip sm`:`chip`)+(fe(e.id)===`outline`?` ring`:``)+(Vr.peek().has(e.id)?` idle`:``),n.style.setProperty(`--c`,e.colour),n.style.setProperty(`--ct`,s(e.colour)),n.append(vi(e.letter,t?`sm`:``,fe(e.id))),n}function $o(e,t){let n=document.createElement(`div`);return n.className=`tag-lines`,n.append(...e.map(e=>{let n=Qo(e),r=t?.(e)??null;if(r===null)return n;let i=document.createElement(`span`);return i.className=`bullet-heading`,i.append(n,es(e.colour,r)),i})),n}function es(e,t){let n=document.createElement(`span`);return n.className=`heading-chevron`,n.style.color=e,n.style.transform=`rotate(${t.toFixed(1)}deg)`,n.innerHTML=`<svg viewBox="0 0 14 14" width="16" height="16" style="display:block;overflow:visible"><path d="M3 3.5 L10 7 L3 10.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,n}function ts(...e){let t=document.createElement(`div`);return t.className=`tag-facts`,t.append(...e),t}var ns=160,rs=320;function is(e,t,n={terrain:1,water:1}){let r=(...e)=>{let t=document.createElement(`div`);return t.append(...e),t},i=[];if(!e.ok){let t=r(_(e.issues)||f(`trackTagRows.cannotPlace`));t.style.color=`var(--bad)`,i.push(t)}let a=e.verts.length/4,o=1/0;if(e.speeds?.length)for(let t of e.speeds)t>=0&&(o=Math.min(o,t));else for(let t=1;t<a-1;t++)e.verts[t*4+2]>0&&(o=Math.min(o,e.verts[t*4+3]));if(Number.isFinite(o)||(o=Cn.peek()?rs:ns),e.ok){let t=ko(e.mult);i.push(r(...Ro(Pt(`trackTagRows.lengthCost`,{length:O(e.lengthM),mult:Eo(`${e.mult.toFixed(2)}x`,t?.[0]??null,t?.[1]),cost:Xt(e.cost*1e6)}))))}e.ok&&e.noFlyover&&i.push(r(f(`trackTagRows.noFlyover`)));let[s,...c]=as(e.pts,t);i.push(ts(Fo(),Mo(s,...c),Io(o)));let l=[Ho(e.ground,n.terrain),Uo(e.ground,n.water),Zo(e.ground,e.lengthM/1e3*Xo(e.pts))].filter(e=>e!==null);return l.length&&i.push(ts(...l)),i}function as(e,t){let n=e.length/3;if(n<1)return[t];let r=e[2]/8,i=e[(n-1)*3+2]/8,a=-1/0,o=1/0;for(let t=2;t<e.length;t+=3)a=Math.max(a,e[t]/8),o=Math.min(o,e[t]/8);let s=[r];return a>Math.max(r,i)+.25&&s.push(a),o<Math.min(r,i)-.25&&s.push(o),s.push(i),[...new Set(s.map(Math.round))]}var os=5e3,ss=300;function cs(e,t){return e>0&&(e<os||t>160.5&&t<319.5)}function ls(e){let t=[],n=e.length/4;for(let r=1;r<n-1;){let i=e[r*4+2],a=r+1;for(;a<n-1&&i>0&&Math.abs(e[a*4+2]-i)<.5;)a++;let o=e[r*4+3];if(cs(i,o)){let n=r+a-1>>1;t.push({x:e[n*4],y:e[n*4+1],kmh:o})}r=a}return t}function us(e){let t=[];for(let n=0;e&&n+3<e.length;n+=4)cs(e[n+2],e[n+3])&&t.push({x:e[n],y:e[n+1],kmh:e[n+3]});return t}function ds(e){let t=[];for(let n=0;e&&n+2<e.length;n+=3)t.push({x:e[n],y:e[n+1],kmh:e[n+2]});return t}function fs(e,t,n){let r=`${t}|${n??``}`;e.dataset.curve===r&&e.firstChild||(e.dataset.curve=r,e.replaceChildren(Eo(Nt(t),n??be(t))))}function ps(e,t,n,r,i){let a=[];for(let o of e){let[e,s]=t(o.x,o.y);if(!fo(e,s,n,r,40)||a.some(([t,n])=>Math.abs(t-e)<64&&Math.abs(n-s)<22))continue;if(a.length>=ss)break;a.push([e,s]);let c=i(a.length-1);fs(c,o.kmh,o.colour),c.classList.toggle(`centred`,!!o.centred),uo(c,e,s,o.centred?0:8,o.centred?0:6)}return a.length}var ms=class{box;els=[];constructor(e){this.box=e}place(e,t,n,r){let i=ps(e,t,n,r,e=>{let t=this.els[e];return t||(t=this.els[e]=document.createElement(`div`),t.className=`pi-label`,this.box.appendChild(t)),t.style.display=``,t});for(let e=i;e<this.els.length;e++)this.els[e].style.display=`none`}},hs=100;function gs(e,t){return Math.hypot((e[0]-t[0])*111320*Math.cos(e[1]*Math.PI/180),(e[1]-t[1])*111320)}var _s=e=>e.at??[e.lng,e.lat];function vs(e){let t=hs/111320,n=new Map,r=e=>`${Math.floor(e[0]*Math.cos(e[1]*Math.PI/180)/t)},${Math.floor(e[1]/t)}`;for(let t of e)for(let e of t.stops){let i=r(_s(e)),a=n.get(i);a||n.set(i,a=[]),a.push({line:t.line,s:e})}let i=[],a=new Set;for(let r of e)for(let e of r.stops){let o=_s(e),s=Math.floor(o[0]*Math.cos(o[1]*Math.PI/180)/t),c=Math.floor(o[1]/t);for(let t=-1;t<=1;t++)for(let l=-1;l<=1;l++)for(let u of n.get(`${s+t},${c+l}`)??[]){if(u.line===r.line||e.station>=0==u.s.station>=0)continue;let t=gs(o,_s(u.s));if(t>hs||t<1)continue;let[n,s]=e.station>=0?[u.s,e]:[e,u.s],c=`${n.id}|${s.id}`,l=`${s.id}|${n.id}`;if(a.has(c)||a.has(l))continue;a.add(c);let d=[n.lng,n.lat],f=s.station>=0?_s(s):[s.lng,s.lat];i.push(e.station>=0?u.line:r.line,d[0],d[1],f[0],f[1])}}return i}var ys=new WeakMap;function bs(e){let t=ys.get(e);if(t)return t;let n=[],r=new Map,i=new Set;for(let t of e.save.lines){let a=e.lineStats[t.id]?.bus;if(a){if(a.ferry)continue;i.add(t.id);for(let e of a.stops)n.push({stop:{id:e.id,line:t.num,lineId:t.id,lng:e.lng,lat:e.lat,station:e.station,built:a.built},p:_s(e),lines:[t.id]})}else for(let e of new Set(t.stops))(r.get(e)??r.set(e,[]).get(e)).push(t.id)}let a={places:[],placeOf:new Map,links:[]};if(ys.set(e,a),!n.length)return a;for(let t of e.save.stations)n.push({station:t.id,p:[t.lng,t.lat],lines:r.get(t.id)??[]});let o=300/111320,s=e=>Math.floor(e/o),c=(e,t)=>Math.floor(e*Math.cos((t+.5)*o*Math.PI/180)/o),l=new Map;n.forEach((e,t)=>{let n=s(e.p[1]),r=`${n},${c(e.p[0],n)}`;(l.get(r)??l.set(r,[]).get(r)).push(t)});let u=Int32Array.from(n,(e,t)=>t),d=e=>{for(;u[e]!==e;)e=u[e]=u[u[e]];return e},f=(e,t)=>!!e.stop&&!!t.stop&&e.stop.line===t.stop.line,p=[];n.forEach((e,t)=>{let r=s(e.p[1]);for(let i=-1;i<=1;i++){let a=c(e.p[0],r+i);for(let o=-1;o<=1;o++)for(let s of l.get(`${r+i},${a+o}`)??[]){if(s<=t)continue;let r=gs(e.p,n[s].p);r<=300&&p.push([t,s,r])}}});for(let[e,t,r]of p)r<=hs&&!f(n[e],n[t])&&(u[d(e)]=d(t));let m=new Map;n.forEach((e,t)=>{let n=d(t),r=m.get(n)??m.set(n,{stations:[],lines:[],members:[],stop:!1}).get(n);r.members.push(t),e.stop?r.stop=!0:r.stations.push(e.station);for(let t of e.lines)r.lines.includes(t)||r.lines.push(t)});let h=new Map,g=[];for(let[e,t]of m){if(!t.stop)continue;h.set(e,a.places.length);let r=t.members.flatMap(e=>n[e].stop??[]);for(let e of r)a.placeOf.set(e.id,a.places.length);a.places.push({stops:r,stations:t.stations,lines:t.lines,walks:[]}),g.push(t.members)}let _=new Map;for(let[e,t,r]of p){let i=d(e),a=d(t);if(i===a||!h.has(i)&&!h.has(a)||r>(m.get(i).stations.length&&m.get(a).stations.length?300:150))continue;let o=i<a?`${i},${a}`:`${a},${i}`,s=_.get(o)??_.set(o,{m:1/0}).get(o);s.m=Math.min(s.m,r),n[e].stop&&n[t].stop&&(!s.stop||r<s.stop[2])&&(s.stop=[e,t,r])}for(let[e,t]of _){let[r,o]=e.split(`,`).map(Number),s=!1;for(let[e,n]of[[r,o],[o,r]]){let r=h.get(e),i=m.get(e).lines,o=m.get(n);r!==void 0&&o.lines.some(e=>!i.includes(e))&&(s=!0,a.places[r].walks.push({place:h.get(n)??-1,stations:o.stations,m:t.m}))}let c=m.get(r),l=m.get(o),u=c.lines.some(e=>i.has(e)&&l.lines.includes(e));s&&t.stop&&!u&&a.links.push({a:n[t.stop[0]].stop,b:n[t.stop[1]].stop,walk:!0})}for(let e of a.places)e.walks.sort((e,t)=>e.m-t.m);return g.forEach(e=>{let t=e.filter(e=>n[e].stop&&n[e].stop.station<0);if(t.length<2)return;let r=[];for(let e=0;e<t.length;e++)for(let i=e+1;i<t.length;i++){let a=n[t[e]],o=n[t[i]];if(f(a,o))continue;let s=gs([a.stop.lng,a.stop.lat],[o.stop.lng,o.stop.lat]);s<=hs&&r.push([s,t[e],t[i]])}r.sort((e,t)=>e[0]-t[0]);let i=new Map,o=e=>{let t=i.get(e);return t===void 0||t===e?e:o(t)};for(let[e,t,s]of r){let r=o(t),c=o(s);r!==c&&(i.set(r,c),e>=1&&a.links.push({a:n[t].stop,b:n[s].stop,walk:!1}))}}),a}function xs(e,t){let n=new Map(e.save.stations.map(e=>[e.id,e])),r=new Set(e.save.links.map(([e,t])=>e<t?`${e}|${t}`:`${t}|${e}`)),i=[];for(let e of t){let t=e.map(e=>n.get(e)).filter(e=>e!==void 0);if(t.length<2||!t.some(e=>e.brt))continue;let a=[];for(let e=0;e<t.length;e++)for(let n=e+1;n<t.length;n++)a.push([gs([t[e].lng,t[e].lat],[t[n].lng,t[n].lat]),e,n]);a.sort((e,t)=>e[0]-t[0]);let o=t.map((e,t)=>t),s=e=>o[e]===e?e:o[e]=s(o[e]);for(let[,e,n]of a){let a=s(e),c=s(n);if(a===c)continue;o[a]=c;let[l,u]=[t[e],t[n]];(l.brt||u.brt)&&!r.has(l.id<u.id?`${l.id}|${u.id}`:`${u.id}|${l.id}`)&&i.push([l,u])}}return i}function Ss(e,t){let n=bs(e),r=n.placeOf.get(t);return r===void 0?null:n.places[r]}var Cs=200,ws=10;function Ts(e,t){let n=111320*Math.cos(e[1]*Math.PI/180),r=111320,i=1/0;for(let a=0;a+3<t.length;a+=2){let o=(t[a]-e[0])*n,s=(t[a+1]-e[1])*r,c=(t[a+2]-t[a])*n,l=(t[a+3]-t[a+1])*r,u=c*c+l*l,d=u?Math.max(0,Math.min(1,-(o*c+s*l)/u)):0;i=Math.min(i,Math.hypot(o+d*c,s+d*l))}return i}function Es(e,t,n){let r=new Set,i=new Set,a=[];for(let n of e){if(n.kind!==1)continue;let e=null,i=Cs;for(let r of t){let t=gs([n.lng,n.lat],[r.lng,r.lat]);t<=i&&(i=t,e=r)}e&&(r.add(e.id),a.push(n.lng,n.lat,e.lng,e.lat))}for(let t of n){let n=!1;for(let r of e)if(r.kind===3&&Ts([r.lng,r.lat],t.routeLL)<=ws&&(n=!0),r.kind!==1)for(let e of t.stops){let t=_s(e),i=gs([r.lng,r.lat],t);i>hs||(n=!0,i>=1&&a.push(r.lng,r.lat,t[0],t[1]))}n&&i.add(t.line)}return{stations:[...r],buses:[...i],links:a}}var Ds={light:{land:`#f3eee5`,water:`#b7d9d6`,park:`#d3e0c4`,road:`#ffffff`,label:`#aaa7a3`,basemapMix:`#6e5b48`,casing:`#ffffff`,mapInk:he,stationInk:he,offRail:`#9aa3ae`,offMid:`#f2f4f7`,offFade:`#ffffff`,outside:`#182536`,outsideOpacity:.075,inactive:`#182536`,inactiveOpacity:.11,thumbTrack:`#b9b4ad`,markInk:he,markBlueprint:`#2f62b3`,realMain:`#6f7b93`,realOther:`#9ea6b5`,realMetro:`#9577a6`,realFreight:`#8c7a66`,realAbandoned:`#a39a8c`,realOpacity:.15,realStationOpacity:.85,realDotOpacity:.36,walkers:`#a4a19d`,lot:`#e7e3dc`,lotLine:`#c4beb4`,fullTrack:`#c0392b`,ghost:`#000000`,tramWire:`#ffffff`,brtLane:`#ffffff`},dark:{land:`#292520`,water:`#2b4762`,park:`#2b3727`,road:`#443e36`,label:`#6a655e`,basemapMix:`#efe4d3`,casing:`#141517`,mapInk:`#e6e4e0`,stationInk:`#8f8b85`,offRail:`#6c747e`,offMid:`#383e46`,offFade:`#383e46`,outside:`#000000`,outsideOpacity:.35,inactive:`#000000`,inactiveOpacity:.225,thumbTrack:`#6f6b66`,markInk:`#e6e4e0`,markBlueprint:`#8db6ee`,realMain:`#97a2b8`,realOther:`#7a8291`,realMetro:`#a98ec2`,realFreight:`#9c8a74`,realAbandoned:`#7d766b`,realOpacity:.3,realStationOpacity:.85,realDotOpacity:.42,walkers:`#b8b3ac`,lot:`#39352f`,lotLine:`#625b52`,fullTrack:`#f0584f`,ghost:`#e6e4e0`,tramWire:`#e6e4e0`,brtLane:`#ffffff`}},Os=e=>({"fill-color":e.outside,"fill-opacity":e.outsideOpacity,"fill-antialias":!1}),ks=()=>Ds[ye.peek()];Tn(()=>{let e=Ds[ye.value],t=document.documentElement.style;t.setProperty(`--map-land`,e.land),t.setProperty(`--map-ink`,e.mapInk),t.setProperty(`--map-casing`,e.casing)});var As=[256,2048,16384,131072],js=16,Ms=4096,Ns=(e,t)=>Math.imul(e,2654435761)^Math.imul(t,2246822519),Ps=class{side;cx;cy;used;start;items;big;mask;constructor(e,t,n){this.side=n;let r=0,i=new Int32Array(t*4),a=new Uint8Array(t),o=0;for(let s=0;s<t;s++){let t=e[s*4],c=e[s*4+1],l=e[s*4+2],u=e[s*4+3],d=Math.floor(Math.min(t,l)/n),f=Math.floor(Math.max(t,l)/n),p=Math.floor(Math.min(c,u)/n),m=Math.floor(Math.max(c,u)/n),h=(f-d+1)*(m-p+1);h<=js?(i[s*4]=d,i[s*4+1]=p,i[s*4+2]=f,i[s*4+3]=m,r+=h):(a[s]=1,o++)}let s=16;for(;s<r*1.5;)s*=2;this.mask=s-1,this.cx=new Int32Array(s),this.cy=new Int32Array(s),this.used=new Uint8Array(s);let c=new Int32Array(s+1),l=new Int32Array(r),u=0;for(let e=0;e<t;e++)if(!a[e])for(let t=i[e*4];t<=i[e*4+2];t++)for(let n=i[e*4+1];n<=i[e*4+3];n++){let e=this.insert(t,n);c[e+1]++,l[u++]=e}for(let e=0;e<s;e++)c[e+1]+=c[e];this.start=c;let d=c.slice(0,s);this.items=new Int32Array(r),u=0;for(let e=0;e<t;e++){if(a[e])continue;let t=(i[e*4+2]-i[e*4]+1)*(i[e*4+3]-i[e*4+1]+1);for(let n=0;n<t;n++)this.items[d[l[u++]]++]=e}this.big=new Int32Array(o);for(let e=0,n=0;e<t;e++)a[e]&&(this.big[n++]=e)}insert(e,t){for(let n=Ns(e,t)&this.mask;;n=n+1&this.mask){if(!this.used[n])return this.used[n]=1,this.cx[n]=e,this.cy[n]=t,n;if(this.cx[n]===e&&this.cy[n]===t)return n}}find(e,t){for(let n=Ns(e,t)&this.mask;this.used[n];n=n+1&this.mask)if(this.cx[n]===e&&this.cy[n]===t)return n;return-1}near(e,t,n,r){for(let e=0;e<this.big.length;e++)r(this.big[e]);let i=this.side;for(let a=Math.floor((e-n)/i);a<=Math.floor((e+n)/i);a++)for(let e=Math.floor((t-n)/i);e<=Math.floor((t+n)/i);e++){let t=this.find(a,e);if(!(t<0))for(let e=this.start[t];e<this.start[t+1];e++)r(this.items[e])}}},Fs=class{base;map;extra;ids;constructor(e,t,n,r){this.base=e,this.map=t,this.extra=n,this.ids=r}near(e,t,n,r){let i=this.map,a=this.ids;this.base.near(e,t,n,e=>{let t=i[e];t>=0&&r(t)}),this.extra?.near(e,t,n,e=>r(a[e]))}};function Is(e){typeof requestIdleCallback==`function`?requestIdleCallback(e,{timeout:1e3}):setTimeout(e,50)}var Ls=class e{box;count;levels=[];boxes=null;from=null;constructor(e,t){this.box=e,this.count=t}for(e){let t=As.findIndex(t=>2*e<=t);return t<0||!(e>=0)?null:this.level(t)||(this.count>=Ms?this.levels[t]=new Ps(this.boxes??=this.box(),this.count,As[t]):(this.levels[t]||(this.levels[t]=`asked`,Is(()=>this.levels[t]=new Ps(this.boxes??=this.box(),this.count,As[t]))),null))}level(e){let t=this.levels[e];if(t&&t!==`asked`)return t;if(t||!this.from)return null;let n=this.carry(e);return n&&(this.levels[e]=n),n}static carried(t,n,r,i,a){let o=new e(r,i);if(t.from){for(let e=0;e<As.length;e++)(t.from.old.levels[e]instanceof Ps||t.from.old.levels[e]instanceof Fs)&&t.level(e);t.from=null}return t.levels.some(e=>e&&e!==`asked`)&&(o.from={old:t,runs:n,itemBox:a}),o}carry(e){let t=this.from,n=t.old.levels[e];if(!n||n===`asked`)return null;if(!t.step){let e=new Int32Array(t.old.count).fill(-1),n=[],r=t.runs;for(let t=0;t<r.length;t+=3){let i=r[t],a=r[t+1],o=r[t+2];if(o>=0)for(let t=0;t<a;t++)e[o+t]=i+t;else for(let e=0;e<a;e++)n.push(i+e)}t.step=e,t.fresh=n}let r=t.step,i=n instanceof Fs?n.base:n,a=n instanceof Fs?n.map:null,o=[];if(n instanceof Fs)for(let e of n.ids)r[e]>=0&&o.push(r[e]);for(let e of t.fresh)o.push(e);if(o.length>Math.max(4096,this.count/8))return null;let s=new Int32Array(a?a.length:t.old.count);for(let e=0;e<s.length;e++){let t=a?a[e]:e;s[e]=t>=0?r[t]:-1}let c=t.itemBox?null:this.boxes??=this.box(),l=new Float64Array(o.length*4);return o.forEach((e,n)=>{if(c)for(let t=0;t<4;t++)l[n*4+t]=c[e*4+t];else t.itemBox(e,l,n*4)}),new Fs(i,s,o.length?new Ps(l,o.length,As[e]):null,Int32Array.from(o))}verify(e=64){let t=[];for(let n=0;n<As.length;n++){let r=this.level(n);if(!(r instanceof Fs))continue;let i=this.boxes??=this.box(),a=new Ps(i,this.count,As[n]);for(let o=0;o<e&&this.count;o++){let s=Math.floor(o*this.count/e),c=(i[s*4]+i[s*4+2])/2,l=(i[s*4+1]+i[s*4+3])/2,u=As[n]/4,d=new Set,f=new Set;if(r.near(c,l,u,e=>d.add(e)),a.near(c,l,u,e=>f.add(e)),d.size!==f.size||[...f].some(e=>!d.has(e))){t.push(`level ${n}`);break}}}return t}},W={lines:new Set,levels:0,stationLevel:e=>void 0,nodeLevel:e=>void 0,blueprints:!1,v:0},Rs=new Set,zs=e=>void Rs.add(e);function Bs(e){if(e===W.blueprints)return!1;W.blueprints=e,W.v++;for(let e of Rs)e();return!0}function Vs(e,t,n,r){let i=t===W.levels&&e.size===W.lines.size&&[...e].every(e=>W.lines.has(e));return W.stationLevel=n,W.nodeLevel=r,!i&&(W.lines=e,W.levels=t,W.v++,!0)}var Hs=.08;function Us(e,t=W.levels){if(!t)return 1;let n=Math.max(-3,Math.min(3,e)),r=Math.floor(n),i=n-r,a=e=>e>3||!(t&1<<e+3)?1:Hs;return a(r)*(1-i)+a(r+1)*i}var Ws=e=>!!(W.levels&1<<Math.max(-3,Math.min(3,Math.round(e)))+3);function Gs(e){if(!W.levels)return!1;let t=Math.floor(e/256),n=e-t*256;return Math.max(Us(t/32-4),Us(n/32-4))<.5}var Ks=new WeakMap,qs=`float levelShown(float z) {
  if (u_level_hide == 0) return 1.0;
  float c = clamp(z, -3.0, 3.0), lo = floor(c);
  int a = int(lo) + 3, b = min(a + 1, 6);
  float sa = ((u_level_hide >> a) & 1) != 0 ? ${Hs.toFixed(2)} : 1.0;
  float sb = ((u_level_hide >> b) & 1) != 0 ? ${Hs.toFixed(2)} : 1.0;
  return mix(sa, sb, c - lo);
}`,Js=Le(`marks`),Ys=[[9,7],[12,11],[15,15]],Xs=[[11,3.5],[13,5],[15,7]],Zs=9,Qs=11,$s=11,ec=.85,tc=.3,nc=.9,rc=6;function ic(e){return[e>=Zs?Mt(e,Ys):0,e>=Qs?Kt(e):0,e>=$s?Mt(e,Xs):0]}var ac=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform vec3 u_r;            // radius in device px: loud badge, quiet badge, ramp mark
uniform float u_rw[12];    // T-3899, T-3914: the track's drawn width (device px) for a ramp end, by tier: rail, tram, high speed, each built single, blueprint single, built double, blueprint double
uniform float u_thick;       // a ramp end's thickness, device px
uniform float u_ends;        // 1: ramp ends are drawn (the track level view)
uniform float u_ramps;       // 0: no marks on ramps and portals
uniform float u_flat;        // 0: no marks on flat crossings and junctions
uniform int u_level_hide;    // T-3420: the levels switched off (drawn faint, T-3560), a bit each from level -3
uniform int u_no_bp;         // 1: blueprint marks are not drawn (Settings' Show blueprints)
in vec4 a_mark;              // x, y, shape, angle
in vec2 a_style;             // tier (0 built, 1 blueprint), level
out vec2 v_p;
flat out vec4 v_m;
flat out vec2 v_s;
flat out float v_r;
flat out float v_fade;
void main() {
  int shape = int(a_mark.z + 0.5);
  bool ramp = shape == 2 || shape == 3;
  bool rend = shape == 8;
  float r = rend ? (u_ends > 0.5 && u_ramps > 0.5 ? u_rw[int(a_style.x + 0.5)] : 0.0) : ramp ? u_r.z : (a_style.x > 0.5 ? u_r.x : u_r.y);
  if (u_ramps < 0.5 && ramp) r = 0.0;
  if (u_flat < 0.5 && (shape == 0 || shape == 1)) r = 0.0;
  if (u_no_bp == 1 && (rend ? (int(a_style.x + 0.5) & 1) == 1 : a_style.x > 0.5)) r = 0.0;
  v_fade = ((u_level_hide >> (clamp(int(round(a_style.y)), -3, 3) + 3)) & 1) != 0 ? ${Hs.toFixed(2)} : 1.0;
  if (r <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float rq = rend ? length(vec2(0.5625 * r, 0.5 * u_thick)) + 2.0 : ramp ? 1.8 * r + 3.0 : r + 3.0;
  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 2.0 - 1.0;
  vec4 c = project(a_mark.xy);
  v_m = a_mark;
  // T-2031: the ramp's direction as drawn on screen (y down), so it follows a turned map
  if (ramp || rend) {
    vec4 c2 = project(a_mark.xy + 10.0 * vec2(cos(a_mark.w), sin(a_mark.w)));
    vec2 d = (c2.xy / c2.w - c.xy / c.w) * vec2(u_viewport.x, -u_viewport.y);
    v_m.w = atan(d.y, d.x);
  }
  vec2 p = corner * rq;
  c.xy += vec2(p.x, -p.y) / (u_viewport * 0.5) * c.w;
  gl_Position = c;
  v_p = p;
  v_s = a_style;
  v_r = r;
}`,oc=`#version 300 es
precision highp float;
uniform vec3 u_ink;          // built marks
uniform vec3 u_bp;           // blueprint marks
uniform vec3 u_fill;         // the badge, and the halo round a ramp mark
uniform vec3 u_bad;
uniform float u_dpr;
uniform float u_quiet;
uniform vec3 u_level_colours[7];
uniform float u_thick;       // a ramp end's thickness, device px
in vec2 v_p;
flat in vec4 v_m;
flat in vec2 v_s;
flat in float v_r;
flat in float v_fade;
out vec4 o;
float cov(float d) { return clamp(0.5 - d, 0.0, 1.0); }
float seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0));
}
// signed distance to a convex quadrilateral, corners in order, negative inside
float quad(vec2 p, vec2 a, vec2 b, vec2 c, vec2 e) {
  vec2 v[4] = vec2[4](a, b, c, e);
  float d = dot(p - a, p - a), s = 1.0;
  for (int i = 0; i < 4; i++) {
    int j = i == 0 ? 3 : i - 1;
    vec2 ed = v[j] - v[i], w = p - v[i];
    vec2 q = w - ed * clamp(dot(w, ed) / dot(ed, ed), 0.0, 1.0);
    d = min(d, dot(q, q));
    bvec3 k = bvec3(p.y >= v[i].y, p.y < v[j].y, ed.x * w.y > ed.y * w.x);
    if (all(k) || all(not(k))) s = -s;
  }
  return s * sqrt(d);
}
void mark() {
  int shape = int(v_m.z + 0.5);
  bool blueprint = v_s.x > 0.5;
  float r = v_r;
  vec3 ink = blueprint ? u_bp : u_ink;
  if (shape == 8) {
    // across the track: a rectangle 9/8 of its width long, in the track's own colour at this height
    vec2 dir = vec2(cos(v_m.w), sin(v_m.w));
    vec2 q = vec2(dot(v_p, dir), dot(v_p, vec2(-dir.y, dir.x)));
    vec2 e = abs(q) - vec2(0.5 * u_thick, 0.5625 * r);
    float d = length(max(e, 0.0)) + min(max(e.x, e.y), 0.0);
    float lh = clamp(3.0 - v_s.y, 0.0, 6.0);
    int lo = int(floor(lh));
    vec3 lc = mix(u_level_colours[lo], u_level_colours[min(lo + 1, 6)], lh - float(lo));
    float a = cov(d) * ${nc.toFixed(2)};
    vec3 col = mix(lc, u_ink, ${tc.toFixed(2)});
    o = vec4(col * a, a);
    return;
  }
  if (shape == 2 || shape == 3) {
    // along the track: u along the ramp toward its far level, v across it
    vec2 dir = vec2(cos(v_m.w), sin(v_m.w));
    vec2 q = vec2(dot(v_p, dir), dot(v_p, vec2(-dir.y, dir.x)));
    // T-3189: a trapezoid, its narrow side a quarter of the long one, so it is not read as a one-way chevron
    float d = quad(q, vec2(-0.65 * r, -r), vec2(-0.65 * r, r), vec2(0.65 * r, 0.25 * r), vec2(0.65 * r, -0.25 * r));
    float rim = max(1.0, 1.1 * u_dpr);
    float halo = 1.4 * u_dpr;
    vec3 lc = u_level_colours[clamp(3 - int(round(v_s.y)), 0, 6)];
    float body = cov(d), edge = cov(abs(d + rim * 0.5) - rim * 0.5), outer = cov(d - halo);
    vec3 col = mix(u_fill, mix(lc, ink, edge), body);
    float a = outer * (blueprint ? 1.0 : u_quiet);
    o = vec4(col * a, a);
    return;
  }
  float d = length(v_p) - r;
  float ring = cov(abs(d + (blueprint ? 1.5 : 1.0) * u_dpr * 0.5) - (blueprint ? 1.5 : 1.0) * u_dpr * 0.5);
  float g = max(0.8 * u_dpr, 0.1 * r);
  float k = 0.4 * r;
  float glyph;
  if (shape == 1) {
    // a fork: a stem below, two arms up
    vec2 hub = vec2(0.0, 0.1 * r);
    glyph = cov(min(seg(v_p, vec2(0.0, 0.55 * r), hub), min(seg(v_p, hub, vec2(-0.42 * r, -0.55 * r)), seg(v_p, hub, vec2(0.42 * r, -0.55 * r)))) - g);
  } else if (shape == 7) {
    // T-3562: a loop with its two ends crossing at the top and leaving it, up and to each side
    vec2 c0 = vec2(0.0, 0.12 * r);
    float lp = abs(length(v_p - c0) - 0.32 * r) - g;
    float tails = min(seg(v_p, vec2(0.12 * r, -0.2 * r), vec2(0.62 * r, -0.55 * r)), seg(v_p, vec2(-0.12 * r, -0.2 * r), vec2(-0.62 * r, -0.55 * r)));
    glyph = cov(min(lp, tails - g));
  } else if (shape == 5 || shape == 6) {
    // T-3164: two arrows on one line, pointing at each other or apart; the right one, mirrored
    vec2 q = vec2(abs(v_p.x), v_p.y);
    bool into = shape == 5;
    float tip = into ? 0.2 * r : 0.64 * r, back = into ? 0.7 * r : 0.14 * r;
    float wing = tip + (into ? 0.26 : -0.26) * r;
    glyph = cov(min(seg(q, vec2(tip, 0.0), vec2(back, 0.0)), min(seg(q, vec2(tip, 0.0), vec2(wing, 0.24 * r)), seg(q, vec2(tip, 0.0), vec2(wing, -0.24 * r)))) - g);
  } else {
    float over = cov(seg(v_p, vec2(-k, -k), vec2(k, k)) - g);
    float under = cov(seg(v_p, vec2(-k, k), vec2(k, -k)) - g);
    // T-3062: trams crossing: the train's stroke is whole and the tram's is cut short of it, a gap each
    // side; two tram tracks: both strokes cut short of the centre
    int trams = int(round((v_s.y - round(v_s.y)) * 10.0));
    float gap = max(1.3 * u_dpr, 0.16 * r);
    if (trams == 1) {
      under *= clamp(abs(v_p.x - v_p.y) * 0.7071 - (g + gap) + 0.5, 0.0, 1.0);
    } else if (trams == 2) {
      float hole = clamp(length(v_p) - (g + gap) * 1.05 + 0.5, 0.0, 1.0);
      over *= hole;
      under *= hole;
    }
    glyph = max(over, under);
  }
  ink = shape == 4 || shape == 5 || shape == 6 ? u_bad : u_level_colours[clamp(3 - int(round(v_s.y)), 0, 6)];
  vec3 col = mix(u_fill, ink, max(ring, glyph));
  float a = cov(d) * (blueprint ? 1.0 : u_quiet);
  o = vec4(col * a, a);
}
void main() {
  mark();
  o *= v_fade;
}`,sc=class{gl;prog=null;u={};built=null;drawing=null;marks=new Float32Array;init(e){this.gl=e,this.built=this.drawing=null,this.prog=v(e,ac,oc,`grade marks`),this.prog&&(this.u=L(e,this.prog,[...R,`u_viewport`,`u_r`,`u_ink`,`u_bp`,`u_fill`,`u_bad`,`u_dpr`,`u_quiet`,`u_level_colours`,`u_flat`,`u_ramps`,`u_level_hide`,`u_no_bp`,`u_rw`,`u_ends`,`u_thick`]))}upload(e,t){let n=this.gl;if(e&&(n.deleteVertexArray(e.vao),n.deleteBuffer(e.buf)),!t?.length||!this.prog)return null;let r=n.createVertexArray(),i=n.createBuffer();n.bindVertexArray(r),n.bindBuffer(n.ARRAY_BUFFER,i),n.bufferData(n.ARRAY_BUFFER,t,n.STATIC_DRAW);for(let[e,t,r]of[[`a_mark`,4,0],[`a_style`,2,16]]){let i=n.getAttribLocation(this.prog,e);n.enableVertexAttribArray(i),n.vertexAttribPointer(i,t,n.FLOAT,!1,24,r),n.vertexAttribDivisor(i,1)}return n.bindVertexArray(null),n.bindBuffer(n.ARRAY_BUFFER,null),{vao:r,buf:i,count:t.length/6}}setNetwork(e){this.marks=e??new Float32Array,this.built=this.upload(this.built,e)}setPreview(e){let t=e;if(e&&this.marks.length){let n=[];for(let t=0;t<e.length;t+=6){let r=e[t+2],i=!1;if(r===0||r===1)for(let n=0;n<this.marks.length&&!i;n+=6)i=Math.abs(this.marks[n]-e[t])<rc&&Math.abs(this.marks[n+1]-e[t+1])<rc;if(!i)for(let r=0;r<6;r++)n.push(e[t+r])}t=new Float32Array(n)}this.drawing=this.upload(this.drawing,t)}get previewing(){return!!this.drawing}draw(e,t,n,r,i,a,o,s,c){let l=c===`built`?this.built:this.drawing;if(!l||Js)return;let[u,d,f]=ic(n);if(!u&&!d&&!f)return;let p=this.gl,m=this.u,h=ks();p.useProgram(this.prog),I(p,m,e),p.uniform2f(m.u_viewport,t[0],t[1]),p.uniform3f(m.u_r,u*r,d*r,f*r),p.uniform3fv(m.u_ink,z(h.markInk)),p.uniform3fv(m.u_bp,z(h.markBlueprint)),p.uniform3fv(m.u_fill,z(h.casing)),p.uniform3fv(m.u_bad,z(Sn)),p.uniform1f(m.u_dpr,r),p.uniform1f(m.u_quiet,ec),p.uniform3fv(m.u_level_colours,i),p.uniform1f(m.u_flat,+!!a),p.uniform1f(m.u_ramps,+!!o),p.uniform1i(m.u_level_hide,W.levels),p.uniform1f(m.u_ends,s&&f>0?1:0),s&&p.uniform1fv(m.u_rw,s.w),p.uniform1f(m.u_thick,s?s.thick:0),p.uniform1i(m.u_no_bp,c===`built`&&W.blueprints?1:0),p.bindVertexArray(l.vao),p.drawArraysInstanced(p.TRIANGLE_STRIP,0,4,l.count),p.bindVertexArray(null)}};function cc(e,t,n,r,i){let[a,o,s]=ic(i),c=wt.peek().flatMarks,l=wt.peek().rampMarks,u=-1,d=1/0,f=new Float64Array(2);for(let i=0;i<t.length;i+=6){let p=t[i+2],m=p===2||p===3;if(!c&&(p===0||p===1)||!l&&m||p===8||Ws(t[i+5]))continue;let h=m?s:t[i+4]>.5?a:o;if(h<=0)continue;e.toScreenInto(t[i],t[i+1],f);let g=Math.hypot(f[0]-n,f[1]-r);g<=Math.max(h,5)+1&&g<d&&([u,d]=[i,g])}return u}function lc(e,t){let n=e[t+2],r=e[t+5],i=e[t+4]>.5,a=[];return n===2?a.push(f(`gradeMarks.rampUp`,{level:un(r)})):n===3?a.push(f(`gradeMarks.rampDown`,{level:un(r)})):n===4?a.push(f(`gradeMarks.badCross`)):n===5?a.push(f(`gradeMarks.converging`)):n===6?a.push(f(`gradeMarks.diverging`)):n===7?a.push(f(`gradeMarks.repeatTrack`)):(a.push(f(n===1?`gradeMarks.junction`:`gradeMarks.crossing`)),n===0&&ee(e[t+5])===1&&a.push(f(`gradeMarks.tramYields`)),a.push(Mo(r))),i&&n!==4&&a.push(f(`gradeMarks.blueprint`)),a}var uc=new Set,dc=!1;function fc(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length;uc.size&&uc.clear();let a=pc(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s=0,c=0,l=0;if(r&&(a=xc(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return hc(a,o,s,c,l),o}function pc(e,t,n,r,i){let a=null;if(i===nl(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=$c(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=$c(i/r|0,e[i],e[i+1],a);return a&&Kc(a,a.next)&&(el(a),a=a.next),a}function mc(e,t=e){let n=t===e,r=e,i;do i=!1,r!==r.next&&(uc.size===0||!uc.has(r))&&(Kc(r,r.next)||q(r.prev,r,r.next)===0)?((n||r===t)&&(t=r.prev),dc=!0,el(r),r=r.prev,i=!0):(n||r!==t)&&(r=r.next,i=!n);while(i||r!==t);return t}function hc(e,t,n,r,i){i&&zc(e,n,r,i);let a=e,o=!1;for(;e.prev!==e.next;){let s=e.prev,c=e.next;if(q(s,e,c)<0&&(i?_c(e,n,r,i):gc(e)))t.push(s.i,e.i,c.i),el(e),e=c,a=c;else if(e=c,e===a){if(dc=!1,e=mc(e),dc){a=e;continue}if(!o){e=vc(e,t),a=e,o=!0;continue}yc(e,t,n,r,i);break}}}function gc(e){let t=e.prev,n=e,r=e.next,i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&(i!==m.x||s!==m.y)&&Wc(i,s,a,c,o,l,m.x,m.y)&&q(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function _c(e,t,n,r){let i=e.prev,a=e,o=e.next,s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Hc(p,m,t,n,r),v=Hc(h,g,t,n,r),y=e.prevZ;for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==o&&(s!==y.x||u!==y.y)&&Wc(s,u,c,d,l,f,y.x,y.y)&&q(y.prev,y,y.next)>=0)return!1;y=y.prevZ}let b=e.nextZ;for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==o&&(s!==b.x||u!==b.y)&&Wc(s,u,c,d,l,f,b.x,b.y)&&q(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function vc(e,t){let n=e,r=!1;do{let i=n.prev,a=n.next.next;qc(i,n,n.next,a,!1)&&Xc(i,a)&&Xc(a,i)&&(t.push(i.i,n.i,a.i),el(n),el(n.next),n=e=a,r=!0),n=n.next}while(n!==e);return r?mc(n):n}function yc(e,t,n,r,i){let a=e;do{let e=a.next.next;for(;e!==a.prev;){if(a.i!==e.i&&Gc(a,e)){let o=Qc(a,e);a=mc(a,a.next),o=mc(o,o.next),hc(a,t,n,r,i),hc(o,t,n,r,i);return}e=e.next}a=a.next}while(a!==e)}var bc=!1;function xc(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=pc(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&uc.add(o),i.push(Uc(o))}i.sort(Sc),Oc(e.length/r,t.length),kc(n,n),bc=!0;for(let e=0;e<i.length;e++)n=Cc(i[e],n);return bc=!1,mc(n)}function Sc(e,t){return e.x-t.x||e.y-t.y||(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x)}function Cc(e,t){let n=Nc(e,t);if(!n)return t;let r=Qc(n,e),i=r.next;return kc(n,i.next),mc(r,r.next),mc(n,n.next)}var wc=16,G=new Float64Array,Tc=0,Ec=[],Dc=[];function Oc(e,t){let n=Math.ceil((e+2*t)/wc)+t+2;G.length<n*4&&(G=new Float64Array(n*4)),Tc=0}function kc(e,t){let n=e;do{let e=Tc++;Ec[e]=n;let r=n.x,i=n.y,a=n.x,o=n.y,s=0;do{let t=n.next;n.z=e,t.x<r&&(r=t.x),t.x>a&&(a=t.x),t.y<i&&(i=t.y),t.y>o&&(o=t.y),n=t}while(++s<wc&&n!==t);Dc[e]=n;let c=e*4;G[c]=r,G[c+1]=i,G[c+2]=a,G[c+3]=o}while(n!==t)}function Ac(e,t){let n=e.z*4;t.x<G[n]&&(G[n]=t.x),t.y<G[n+1]&&(G[n+1]=t.y),t.x>G[n+2]&&(G[n+2]=t.x),t.y>G[n+3]&&(G[n+3]=t.y)}function jc(e){let t=Dc[e];for(;t.prev.next!==t;)t=t.next;return Dc[e]=t,t}function Mc(e){let t=Ec[e];for(;t.prev.next!==t;)t=t.next;return Ec[e]=t,t}function Nc(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Kc(e,n))return n;for(let t=0,s=0;t<Tc;t++,s+=4){if(i<G[s+1]||i>G[s+3]||G[s]>r||G[s+2]<=a)continue;let c=jc(t);n=Mc(t);do{if(n.prev.next===n){if(Kc(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}}n=n.next}while(n!==c)}if(!o)return null;let s=o.x,c=o.y,l=Math.min(i,c),u=Math.max(i,c),d=1/0;for(let t=0,f=0;t<Tc;t++,f+=4){if(G[f+2]<s||G[f]>r||G[f+3]<l||G[f+1]>u)continue;let p=jc(t);n=Mc(t);do{if(n.prev.next===n&&r>=n.x&&n.x>=s&&r!==n.x&&Wc(i<c?r:a,i,s,c,i<c?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);(Xc(n,e)||n.y===i&&n.next.y===i&&n.next.x>r)&&(t<d||t===d&&(n.x>o.x||n.x===o.x&&Pc(o,n)))&&(o=n,d=t)}n=n.next}while(n!==p)}return o}function Pc(e,t){return q(e.prev,e,t.prev)<0&&q(t.next,e,e.next)<0}var K=[],Fc=[],Ic=new Uint32Array,Lc=new Uint32Array,Rc=new Uint32Array(256);function zc(e,t,n,r){let i=e,a=0;do i.z=Hc(i.x,i.y,t,n,r),K[a++]=i,i=i.next;while(i!==e);Bc(a);let o=null;for(let e=0;e<a;e++){let t=K[e];t.prevZ=o,o&&(o.nextZ=t),o=t}o.nextZ=null,K.fill(null,0,a),Fc.fill(null,0,a)}function Bc(e){if(e<=32)for(let t=1;t<e;t++){let e=K[t],n=e.z,r=t-1;for(;r>=0&&K[r].z>n;)K[r+1]=K[r],r--;K[r+1]=e}else{Ic.length<e&&(Ic=new Uint32Array(e),Lc=new Uint32Array(e),Fc=Array(e));for(let t=0;t<e;t++)Ic[t]=K[t].z;Vc(e,K,Ic,Fc,Lc,0),Vc(e,Fc,Lc,K,Ic,8),Vc(e,K,Ic,Fc,Lc,16),Vc(e,Fc,Lc,K,Ic,24)}}function Vc(e,t,n,r,i,a){Rc.fill(0);for(let t=0;t<e;t++)Rc[n[t]>>>a&255]++;let o=0;for(let e=0;e<256;e++){let t=Rc[e];Rc[e]=o,o+=t}for(let o=0;o<e;o++){let e=n[o],s=Rc[e>>>a&255]++;r[s]=t[o],i[s]=e}}function Hc(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Uc(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Wc(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Gc(e,t){let n=Kc(e,t)&&q(e.prev,e,e.next)>0&&q(t.prev,t,t.next)>0;return e.next.i!==t.i&&(n||Xc(e,t)&&Xc(t,e)&&(q(e.prev,e,t.prev)!==0||q(e,t.prev,t)!==0))&&!Yc(e,t)&&(n||Zc(e,t))}function q(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Kc(e,t){return e.x===t.x&&e.y===t.y}function qc(e,t,n,r,i=!0){let a=q(e,t,n),o=q(e,t,r),s=q(n,r,e),c=q(n,r,t);return(a>0&&o<0||a<0&&o>0)&&(s>0&&c<0||s<0&&c>0)?!0:i?!!(a===0&&Jc(e,n,t)||o===0&&Jc(e,r,t)||s===0&&Jc(n,e,r)||c===0&&Jc(n,t,r)):!1}function Jc(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Yc(e,t){let n=Math.min(e.x,t.x),r=Math.max(e.x,t.x),i=Math.min(e.y,t.y),a=Math.max(e.y,t.y),o=e;do{let s=o.next;if(o.x>r&&s.x>r||o.x<n&&s.x<n||o.y>a&&s.y>a||o.y<i&&s.y<i)o=s;else{if(o.i!==e.i&&s.i!==e.i&&o.i!==t.i&&s.i!==t.i&&qc(o,s,e,t))return!0;o=s}}while(o!==e);return!1}function Xc(e,t){return q(e.prev,e,e.next)<0?q(e,t,e.next)>=0&&q(e,e.prev,t)>=0:q(e,t,e.prev)<0||q(e,e.next,t)<0}function Zc(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do{let e=n.next;n.y>a!=e.y>a&&i<(e.x-n.x)*(a-n.y)/(e.y-n.y)+n.x&&(r=!r),n=e}while(n!==e);return r}function Qc(e,t){let n=tl(e.i,e.x,e.y),r=tl(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function $c(e,t,n,r){let i=tl(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function el(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ),bc&&Ac(e.prev,e.next)}function tl(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null}}function nl(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var rl=Pe(null),il=Pe(new Map),al=Ce(()=>{let e=V.value,t=e?.save.buildings??[];if(!e||!t.length)return new Map;let n=Bn(t,e.save.stations,h);return new Map(t.map((e,t)=>[e.id,n[t]]))});function ol(e){let t=new Set(e);for(let e of V.value?.save.buildings??[])if((al.value.get(e.id)??[]).some(e=>t.has(e)))return e;return null}function sl(e,t){for(let n of V.peek()?.save.buildings??[])if(Rn(n.corners,e,t))return n;return null}function cl(e){return V.peek()?.save.buildings?.find(t=>t.id===e)??null}var ll=14,ul=[15,15.5],dl=[16.8,17],fl=9,pl=[249/255,247/255,243/255],ml=()=>ye.peek()===`dark`?2:1.5,hl=32,gl=`#version 300 es
precision highp float;
${H}
in vec3 a_p;       // local x, y, strength
out float v_a;
void main() {
  v_a = a_p.z;
  gl_Position = project(a_p.xy);
}`,_l=`#version 300 es
precision highp float;
uniform vec3 u_rgb;
uniform float u_alpha;
in float v_a;
out vec4 o;
void main() {
  float a = v_a * u_alpha;
  o = vec4(u_rgb * a, a);
}`,vl=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform float u_half;    // half the rim's width, device px
in vec4 a_seg;           // local a, b
in float a_strength;
out float v_a;
out float v_d;           // device px across the rim from its middle
void main() {
  vec2 half_vp = u_viewport * 0.5;
  vec4 a = project(a_seg.xy), b = project(a_seg.zw);
  vec2 sa = a.xy / a.w * half_vp, sb = b.xy / b.w * half_vp;
  vec2 d = sb - sa;
  float len = length(d);
  if (len < 1e-6) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 u = d / len, n = vec2(-u.y, u.x);
  float w = u_half + 1.0;
  // square ends, so two edges meeting at a corner close it
  float along = (gl_VertexID & 1) == 0 ? -u_half : len + u_half;
  float across = gl_VertexID < 2 ? -w : w;
  vec2 s = sa + u * along + n * across;
  v_d = across;
  v_a = a_strength;
  gl_Position = vec4(s / half_vp * a.w, a.z, a.w);
}`,yl=`#version 300 es
precision highp float;
uniform vec3 u_rgb;
uniform float u_alpha;
uniform float u_half;
in float v_a;
in float v_d;
out vec4 o;
void main() {
  float cover = clamp(u_half + 0.5 - abs(v_d), 0.0, 1.0);
  float a = cover * v_a * u_alpha;
  if (a <= 0.0) discard;
  o = vec4(u_rgb * a, a);
}`,bl=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
in vec4 a_quad;          // middle, half its length along it (vector)
in vec4 a_dim;           // half depth (local), then per kind: a shop's colour and glyph; a cell's full flag
out vec2 v_p;            // in its frame, device px
out vec2 v_s;            // from its middle on the screen, device px, y up
flat out vec2 v_half;    // half its size, device px
flat out vec3 v_meta;
void main() {
  vec2 half_vp = u_viewport * 0.5;
  vec4 c = project(a_quad.xy);
  vec2 n = length(a_quad.zw) > 0.0 ? normalize(vec2(-a_quad.w, a_quad.z)) * a_dim.x : vec2(0.0);
  vec4 e = project(a_quad.xy + a_quad.zw), q = project(a_quad.xy + n);
  vec2 cs = c.xy / c.w * half_vp;
  vec2 axis = e.xy / e.w * half_vp - cs, nrm = q.xy / q.w * half_vp - cs;
  float len = length(axis), dep = length(nrm);
  if (len < 1e-6 || dep < 1e-6) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 along = axis / len, across = nrm / dep;
  v_half = vec2(len, dep);
  v_meta = a_dim.yzw;
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  v_p = corner * (v_half + 1.0);
  vec2 off = along * v_p.x + across * v_p.y;
  v_s = off;
  c.xy += off / half_vp * c.w;
  gl_Position = c;
}`,xl=`#version 300 es
precision highp float;
uniform vec3 u_fill[${or.length}];
uniform float u_alpha;
uniform float u_glyph;   // 0-1: glyphs shown
uniform float u_dpr;
in vec2 v_p;
in vec2 v_s;
flat in vec2 v_half;
flat in vec3 v_meta;
out vec4 o;
float box(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float ring(vec2 p, float r, float w) { return abs(length(p) - r) - w; }
float glyph(vec2 p, int k) {
  if (k == 0) {
    // a cup: its body and a handle
    float body = box(p - vec2(-0.15, -0.05), vec2(0.42, 0.5));
    float handle = max(ring(p - vec2(0.3, 0.0), 0.25, 0.09), 0.3 - p.x);
    return min(body, handle);
  }
  if (k == 1) {
    // a bag: its body and a handle over it
    float body = box(p - vec2(0.0, -0.2), vec2(0.6, 0.48));
    float handle = max(ring(p - vec2(0.0, 0.28), 0.28, 0.08), 0.28 - p.y);
    return min(body, handle);
  }
  if (k == 2) {
    // a bowl: the lower half of a disc under a rim
    float bowl = max(length(p - vec2(0.0, 0.1)) - 0.7, p.y - 0.1);
    float rim = box(p - vec2(0.0, 0.14), vec2(0.82, 0.07));
    return min(bowl, rim);
  }
  // a book, open: two pages
  return min(box(p - vec2(-0.34, 0.0), vec2(0.3, 0.5)), box(p - vec2(0.34, 0.0), vec2(0.3, 0.5)));
}
void main() {
  float d = box(v_p, v_half);
  float cover = clamp(0.5 - d, 0.0, 1.0);
  if (cover <= 0.0) discard;
  int c = int(v_meta.x + 0.5);
  vec3 fill = u_fill[c], rim = fill * 0.84;
  float edge = clamp(d + max(1.0, 0.75 * u_dpr) + 0.5, 0.0, 1.0);
  vec3 col = mix(fill, rim, edge);
  float side = 2.0 * min(v_half.x, v_half.y);
  if (u_glyph > 0.0 && side >= ${fl.toFixed(1)} * u_dpr) {
    float r = 0.32 * side;
    float g = glyph(v_s / r, int(v_meta.y + 0.5)) * r;
    col = mix(col, rim * 0.92, u_glyph * clamp(0.5 - g, 0.0, 1.0));
  }
  float a = cover * u_alpha;
  o = vec4(col * a, a);
}`,Sl=`#version 300 es
precision highp float;
uniform vec3 u_rgb;
uniform vec3 u_bad;
uniform float u_dpr;
uniform float u_alpha;
in vec2 v_p;
in vec2 v_s;
flat in vec2 v_half;
flat in vec3 v_meta;
out vec4 o;
void main() {
  if (abs(v_p.x) > v_half.x + 0.5 || abs(v_p.y) > v_half.y + 0.5) discard;
  vec2 g = mod(gl_FragCoord.xy, 4.0 * u_dpr) - 2.0 * u_dpr;
  float a = clamp(1.0 * u_dpr + 0.5 - length(g), 0.0, 1.0) * u_alpha;
  if (a <= 0.0) discard;
  o = vec4((v_meta.x > 0.5 ? u_bad : u_rgb) * a, a);
}`,Cl=`#version 300 es
precision highp float;
uniform vec4 u_bbox;     // CSS px, y down: left, top, right, bottom
uniform vec2 u_css;
void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), gl_VertexID < 2 ? 0.0 : 1.0);
  vec2 s = mix(u_bbox.xy, u_bbox.zw, corner);
  gl_Position = vec4(s.x / u_css.x * 2.0 - 1.0, 1.0 - s.y / u_css.y * 2.0, 0.0, 1.0);
}`,wl=`#version 300 es
precision highp float;
uniform vec2 u_pts[${hl}]; // the outline, CSS px, y down
uniform int u_n;
uniform float u_dpr;
uniform float u_height;  // the canvas, device px
uniform vec3 u_ink;
uniform float u_rim;     // the rim's reach outside the outline, CSS px
uniform float u_outline;
uniform float u_glow;
out vec4 o;
void main() {
  vec2 p = vec2(gl_FragCoord.x, u_height - gl_FragCoord.y) / u_dpr;
  float d = 1e9;
  bool odd = false;
  for (int i = 0; i < ${hl}; i++) {
    if (i >= u_n) break;
    vec2 a = u_pts[i], b = u_pts[i + 1 < u_n ? i + 1 : 0];
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-9), 0.0, 1.0);
    d = min(d, length(a + ab * t - p));
    if ((a.y > p.y) != (b.y > p.y) && p.x < a.x + (b.x - a.x) * (p.y - a.y) / (b.y - a.y)) odd = !odd;
  }
  if (odd) discard;
  d -= u_rim;
  float line = clamp(u_outline + 0.5 - d, 0.0, 1.0);
  float t = clamp((d - u_outline) / u_glow, 0.0, 1.0);
  float s = max(line, 0.35 * (1.0 - t) * (1.0 - t));
  o = vec4(u_ink * s, s);
}`;function Tl(e){Tn(()=>{e.renderer.floors.setSkip(rl.value?.id??null),e.invalidate()})}function El(t,n,r){if(!Dl.shownAt(t.renderer.floors.zoom)||!V.peek()?.save.buildings?.length)return null;let i=t.screenToLocal(n,r);if(!i)return null;let a=xn(...e(i[0],i[1]));return sl(a.x,a.y)}var Dl=class{gl;fillProg;edgeProg;shopProg;cellProg;selProg;fu={};eu={};su={};cu={};xu={};fillVao=null;edgeVao=null;shopVao=null;cellVao=null;cellBuf=null;bufs=[];fillCount=0;markCount=0;edgeCount=0;shopCount=0;cellCount=0;buildings=[];skip=null;hallKey=``;shopColours=new Float32Array(or.flatMap(e=>F(e).map(e=>e/255)));selPts=new Float32Array(64);off=!1;init(e){this.gl=e,this.fillVao=this.edgeVao=this.shopVao=this.cellVao=this.cellBuf=null,this.bufs=[],this.hallKey=``;let t=[v(e,gl,_l,`building floors`),v(e,vl,yl,`building floors`),v(e,bl,xl,`building floors`),v(e,bl,Sl,`building floors`),v(e,Cl,wl,`building floors`)];this.off=t.some(e=>!e),!this.off&&([this.fillProg,this.edgeProg,this.shopProg,this.cellProg,this.selProg]=t,this.fu=L(e,this.fillProg,[...R,`u_rgb`,`u_alpha`]),this.eu=L(e,this.edgeProg,[...R,`u_viewport`,`u_half`,`u_rgb`,`u_alpha`]),this.su=L(e,this.shopProg,[...R,`u_viewport`,`u_fill`,`u_alpha`,`u_glyph`,`u_dpr`]),this.cu=L(e,this.cellProg,[...R,`u_viewport`,`u_rgb`,`u_bad`,`u_dpr`,`u_alpha`]),this.xu=L(e,this.selProg,[`u_bbox`,`u_css`,`u_pts`,`u_n`,`u_dpr`,`u_height`,`u_ink`,`u_rim`,`u_outline`,`u_glow`]),this.upload())}setNetwork(e){this.buildings=e??[],this.hallKey=``,this.gl&&this.upload()}setSkip(e){e!==this.skip&&(this.skip=e,this.gl&&this.upload())}get drawn(){return this.skip===null?this.buildings:this.buildings.filter(e=>e.id!==this.skip)}upload(){let e=this.gl;for(let t of[this.fillVao,this.edgeVao,this.shopVao,this.cellVao])t&&e.deleteVertexArray(t);for(let t of this.bufs)e.deleteBuffer(t);this.cellBuf&&e.deleteBuffer(this.cellBuf),this.fillVao=this.edgeVao=this.shopVao=this.cellVao=this.cellBuf=null,this.bufs=[],this.fillCount=this.markCount=this.edgeCount=this.shopCount=this.cellCount=0,this.hallKey=``;let t=this.drawn;if(!t.length||this.off)return;let n=[],r=[],i=[],a=[],o=[...t].sort((e,t)=>Number(!e.members.length)-Number(!t.members.length));for(let e of o){let t=e.corners.length/2;if(t<3)continue;let o=e.members.length?1:.5,s=n.length/3;for(let r=0;r<t;r++)n.push(e.corners[2*r],e.corners[2*r+1],o);for(let t of fc(Array.from(e.corners)))r.push(s+t);e.members.length&&(this.markCount=r.length);for(let n=0;n<t;n++){let r=(n+1)%t;i.push(e.corners[2*n],e.corners[2*n+1],e.corners[2*r],e.corners[2*r+1],o)}let c=e.shops;for(let t=0;t+6<=c.length;t+=6){let n=c[t+2]*e.perM,r=c[t+3]*e.perM;a.push(c[t],c[t+1],e.ux*n,e.uy*n,r,c[t+4],c[t+5],0)}}if(!r.length)return;let s=(t,n=e.ARRAY_BUFFER)=>{let r=e.createBuffer();return e.bindBuffer(n,r),e.bufferData(n,t,e.STATIC_DRAW),this.bufs.push(r),r};this.fillVao=e.createVertexArray(),e.bindVertexArray(this.fillVao),s(new Float32Array(n));let c=e.getAttribLocation(this.fillProg,`a_p`);e.enableVertexAttribArray(c),e.vertexAttribPointer(c,3,e.FLOAT,!1,12,0),s(new Uint32Array(r),e.ELEMENT_ARRAY_BUFFER),this.fillCount=r.length,e.bindVertexArray(null),this.edgeVao=e.createVertexArray(),e.bindVertexArray(this.edgeVao),s(new Float32Array(i));let l=e.getAttribLocation(this.edgeProg,`a_seg`),u=e.getAttribLocation(this.edgeProg,`a_strength`);e.enableVertexAttribArray(l),e.vertexAttribPointer(l,4,e.FLOAT,!1,20,0),e.vertexAttribDivisor(l,1),e.enableVertexAttribArray(u),e.vertexAttribPointer(u,1,e.FLOAT,!1,20,16),e.vertexAttribDivisor(u,1),this.edgeCount=i.length/5,e.bindVertexArray(null),a.length&&(this.shopVao=e.createVertexArray(),e.bindVertexArray(this.shopVao),s(new Float32Array(a)),this.quadAttribs(this.shopProg),this.shopCount=a.length/8,e.bindVertexArray(null)),this.cellVao=e.createVertexArray(),e.bindVertexArray(this.cellVao),this.cellBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.cellBuf),e.bufferData(e.ARRAY_BUFFER,32,e.DYNAMIC_DRAW),this.quadAttribs(this.cellProg),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null)}quadAttribs(e){let t=this.gl;for(let[n,r]of[[`a_quad`,0],[`a_dim`,16]]){let i=t.getAttribLocation(e,n);t.enableVertexAttribArray(i),t.vertexAttribPointer(i,4,t.FLOAT,!1,32,r),t.vertexAttribDivisor(i,1)}}static shownAt(e){return e>=13}zoom=0;draw(e,t,n,r){if(this.zoom=r,!this.fillCount||!this.fillVao||!this.edgeVao||r<13)return;let i=this.gl,a=Math.min(1,(r-13)/1);i.useProgram(this.fillProg),I(i,this.fu,e),i.uniform3fv(this.fu.u_rgb,pl),i.uniform1f(this.fu.u_alpha,a*(r<ll?.6:1)),i.bindVertexArray(this.fillVao),i.drawElements(i.TRIANGLES,this.fillCount,i.UNSIGNED_INT,0);let o=Ol(ul,r);this.shopCount&&this.shopVao&&o>0&&(i.useProgram(this.shopProg),I(i,this.su,e),i.uniform2f(this.su.u_viewport,t[0],t[1]),i.uniform3fv(this.su.u_fill,this.shopColours),i.uniform1f(this.su.u_alpha,o),i.uniform1f(this.su.u_glyph,Ol(dl,r)),i.uniform1f(this.su.u_dpr,n),i.bindVertexArray(this.shopVao),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,4,this.shopCount)),i.useProgram(this.edgeProg),I(i,this.eu,e),i.uniform2f(this.eu.u_viewport,t[0],t[1]),i.uniform1f(this.eu.u_half,ml()*vt(r)*n/2),i.uniform3fv(this.eu.u_rgb,z(ks().stationInk)),i.uniform1f(this.eu.u_alpha,a),i.bindVertexArray(this.edgeVao),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,4,this.edgeCount),i.bindVertexArray(null)}markStencil(e){if(!this.markCount||!this.fillVao)return!1;let t=this.gl;return t.enable(t.STENCIL_TEST),t.stencilMask(128),t.stencilFunc(t.ALWAYS,128,128),t.stencilOp(t.KEEP,t.KEEP,t.REPLACE),t.colorMask(!1,!1,!1,!1),t.useProgram(this.fillProg),I(t,this.fu,e),t.uniform3fv(this.fu.u_rgb,pl),t.uniform1f(this.fu.u_alpha,1),t.bindVertexArray(this.fillVao),t.drawElements(t.TRIANGLES,this.markCount,t.UNSIGNED_INT,0),t.bindVertexArray(null),t.colorMask(!0,!0,!0,!0),t.stencilMask(255),t.disable(t.STENCIL_TEST),!0}drawHall(e,t,n,r,i){let a=!!i&&r>=ll;if(Al(a?i:null),!a||!this.cellVao||!this.cellBuf)return;let o=i.map(e=>`${e.id}:${Math.round(e.waiting)}:${+!!e.full}:${[...e.spill].join(`,`)}`).join(`|`);if(o!==this.hallKey){this.hallKey=o;let e=[],t=new Map(i.map(e=>[e.id,e]));for(let n of this.drawn){let r=t.get(n.id),i=n.cells,a=i.length/4;if(!r||r.waiting<1||!a||!n.room)continue;let o=Math.min(a,Math.max(1,Math.round(a*r.waiting/n.room))),s=[];for(let e=0;e<a;e++)r.spill.has(i[e*4+2])&&s.push(e);for(let e=0;e<a&&s.length<o;e++)r.spill.has(i[e*4+2])||s.push(e);let c=2*n.perM;for(let t=0;t<o&&t<s.length;t++){let a=s[t]*4;e.push(i[a],i[a+1],n.ux*c,n.uy*c,c,+!!r.full,0,0)}}if(this.cellCount=e.length/8,this.cellCount){let t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.cellBuf),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.DYNAMIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}}if(!this.cellCount)return;let s=this.gl,c=ks();s.useProgram(this.cellProg),I(s,this.cu,e),s.uniform2f(this.cu.u_viewport,t[0],t[1]),s.uniform3fv(this.cu.u_rgb,z(c.walkers)),s.uniform3fv(this.cu.u_bad,z(Sn)),s.uniform1f(this.cu.u_dpr,n),s.uniform1f(this.cu.u_alpha,1),s.bindVertexArray(this.cellVao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,4,this.cellCount),s.bindVertexArray(null)}drawSelected(e,t,n,r,i,a){if(!e.size||i<ll||this.off)return;let o=this.gl,s=n[0]/r,c=n[1]/r,l=this.xu,u=ml()*vt(i)/2,d=u+2+6+1;for(let i of this.drawn){if(!i.members.some(t=>e.has(t)))continue;let f=Math.min(hl,i.corners.length/2),p=1/0,m=1/0,h=-1/0,g=-1/0;for(let e=0;e<f;e++){let[n,r]=t(i.corners[2*e],i.corners[2*e+1]);if(!Number.isFinite(n+r))return;this.selPts[2*e]=n,this.selPts[2*e+1]=r,p=Math.min(p,n),h=Math.max(h,n),m=Math.min(m,r),g=Math.max(g,r)}p=Math.max(0,p-d),m=Math.max(0,m-d),h=Math.min(s,h+d),g=Math.min(c,g+d),!(h<=p||g<=m)&&(o.useProgram(this.selProg),o.uniform4f(l.u_bbox,p,m,h,g),o.uniform2f(l.u_css,s,c),o.uniform2fv(l.u_pts,this.selPts),o.uniform1i(l.u_n,f),o.uniform1f(l.u_dpr,r),o.uniform1f(l.u_height,n[1]),o.uniform3fv(l.u_ink,a),o.uniform1f(l.u_rim,u),o.uniform1f(l.u_outline,2),o.uniform1f(l.u_glow,6),o.drawArrays(o.TRIANGLE_STRIP,0,4))}}};function Ol([e,t],n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var kl=``;function Al(e){let t=e?e.map(e=>`${e.id}:${Math.round(e.waiting)}`).join(`,`):``;t!==kl&&(kl=t,il.value=new Map((e??[]).map(e=>[e.id,Math.round(e.waiting)])))}var jl=new Float64Array(6);function Ml(e,t,n){let r=e.camMatrix;if(!r)return null;let i=0,a=0;if(e.globe){let r=e.screenToLocal(t,n);if(!r)return null;[i,a]=r}else if(r[3]!==0||r[7]!==0)return null;let o=1e3,s=jl;e.toScreenInto(i,a,s,0),e.toScreenInto(i+o,a,s,2),e.toScreenInto(i,a+o,s,4);let c=(s[2]-s[0])/o,l=(s[3]-s[1])/o,u=(s[4]-s[0])/o,d=(s[5]-s[1])/o,f=c*d-u*l,p=Math.min(Math.hypot(c,l),Math.hypot(u,d));if(!f||!Number.isFinite(f)||!(p>0))return null;let m=t-s[0],h=n-s[1];return[i+(d*m-u*h)/f,a+(c*h-l*m)/f,1.25/p]}var Nl=new WeakMap,J=new Int32Array(1024),Pl=new WeakMap,Fl=new Uint8Array,Il=new WeakMap;function Ll(e,t,n=!1){let r=t.patch;if(e&&r&&e.serial===r.base)for(let[i,a,o,s]of[[`track`,e.track,t.track,r.track],[`lines`,e.lines,t.lines,r.lines]]){let e=Nl.get(a.seg);if(!e||e.count!==a.count||Nl.has(o.seg))continue;let t=o.seg,r=Ls.carried(e.levels,s,()=>t,o.count);Nl.set(t,{count:o.count,levels:r});let c=n?r.verify():[];c.length&&console.error(`T-1030 check: the ${i} pick grid carried over differs from one built anew at ${c.join(`, `)}`)}}function Rl(e,t,n,r,i){let a=Pl.get(e);if(a&&a.count===t&&a.lx===n&&a.ly===r&&a.reach===i)return J.length<a.m&&(J=new Int32Array(a.idx.length)),J.set(a.idx.subarray(0,a.m)),a.m;let o=Nl.get(e);(!o||o.count!==t)&&Nl.set(e,o={count:t,levels:new Ls(()=>e,t)});let s=o.levels.for(i);if(!s)return-1;let c=0;s.near(n,r,i,e=>{if(c===J.length){let e=new Int32Array(J.length*2);e.set(J),J=e}J[c++]=e});let l=0;if(c*32>t){Fl.length<t&&(Fl=new Uint8Array(t));for(let e=0;e<c;e++)Fl[J[e]]=1;for(let e=t-1;e>=0;e--)Fl[e]&&(Fl[e]=0,J[l++]=e)}else{let e=J.subarray(0,c).sort().reverse();for(let t=0;t<c;t++)(!l||e[t]!==e[l-1])&&(e[l++]=e[t])}return Pl.set(e,{count:t,lx:n,ly:r,reach:i,m:l,idx:J.slice(0,l)}),l}var zl=16/32767,Bl=64/32767,Vl=new WeakMap;function Y(e,t,n,r,i,a,o,s=0,c,l,u=0,d){let f=Math.sqrt(a),p=jl,m=Ml(e,r,i);if(!m&&e.globe)return[-1,a];let h=m?m[0]:0,g=m?m[1]:0,_=m?m[2]:0,v=o&&s>0&&o.length>=n*6?o:null,y=v?e.renderer.bandMPx:0,b=0;if(v){let e=Vl.get(v);if(!e){let t=0,n=0;for(let e=0;e<v.length;e+=6)t=Math.max(t,Math.abs(v[e]),Math.abs(v[e+1])),n=Math.max(n,Math.abs(v[e+4]),Math.abs(v[e+5]));Vl.set(v,e=[t*zl,n*Bl])}b=e[0]+e[1]*y/s}let x=null,S=0,C=Ks.get(t),w=-1,T=1/0;if(d)x=d,S=d.length;else if(m){let e=0;if(l&&u){let t=Il.get(l);if(t!==void 0)e=t;else{for(let t=0;t<l.length;t++)l[t]>e&&(e=l[t]);Il.set(l,e)}}S=Rl(t,n,h,g,(Math.max(f,.5*e*u)+b*s+1)*_),S>=0&&(x=J)}for(let o=x?0:n-1,d=x?S:-1;o!==d;o+=x?1:-1){let n=x?x[o]:o;if(c&&!c(n)||C?.(n))continue;let d=l&&u?Math.max(f,.5*l[n]*u):f,b=d+1,S=v?v[n*6]*zl*s+v[n*6+4]*Bl*y:0,E=v?v[n*6+1]*zl*s+v[n*6+5]*Bl*y:0,D=Math.max(Math.abs(S),Math.abs(E));if(m){let e=(b+D)*_,r=t[n*4],i=t[n*4+1],a=t[n*4+2],o=t[n*4+3];if(r>h+e&&a>h+e||r<h-e&&a<h-e||i>g+e&&o>g+e||i<g-e&&o<g-e)continue}e.toScreenInto(t[n*4],t[n*4+1],p,0),e.toScreenInto(t[n*4+2],t[n*4+3],p,2);let O=p[0],k=p[1],A=p[2],j=p[3],M=b+D;if(O>r+M&&A>r+M||O<r-M&&A<r-M||k>i+M&&j>i+M||k<i-M&&j<i-M)continue;let N=A-O,P=j-k;if(D){let e=Math.hypot(N,P)||1;O+=P/e*S,k+=-N/e*S,A+=P/e*E,j+=-N/e*E,N=A-O,P=j-k}let ee=N*N+P*P,te=ee?Math.max(0,Math.min(1,((r-O)*N+(i-k)*P)/ee)):0,F=(O+te*N-r)**2+(k+te*P-i)**2;if(!v){if(F<Math.max(a,d*d))return[n,F];continue}let ne=.5*u*(l?l[n]:1)*(1-Math.min(1,s/Math.max(u,1e-9))*(v[n*6+2]+v[n*6+3])/65534);if(F<=ne*ne)return[n,F,!0];F<Math.max(a,d*d)&&F<T&&(w=n,T=F)}return w>=0?[w,T]:[-1,a]}function Hl(e,t,n,r,i){let a=e.renderer.net;if(!a||!e.camMatrix||!e.renderer.slotPx)return[];let o=Math.max(7,e.renderer.laneReachPx),s=o*o+1,c=a.lines,l=e.renderer.lineWidths,u=e.renderer.slotPx,d=[];r?.kind===`line`&&d.push(e=>String(c.colour[e])===r.line),e.renderer.hasBlueprint&&d.push(e=>!!(c.flags[e]&1)),d.push(()=>!0);let f=[],p=e.renderer.pickBandPx;for(let r of d)for(;f.length<i;){let[i,,a]=Y(e,c.seg,c.count,t,n,s,e.renderer.pickBand,p,e=>r(e)&&!f.includes(String(c.colour[e])),l,u);if(i<0||p>0&&f.length>0&&!a)break;f.push(String(c.colour[i]))}if(e.renderer.buses.any&&f.length<i)for(let r of e.renderer.buses.linesAt(e,t,n,i-f.length,e=>f.includes(String(e))))f.push(String(r));return f}var Ul=16,Wl=new WeakMap;function Gl(e){let t=Wl.get(e);return t||Wl.set(e,t=Kl(e)),t}function Kl(e){let t=e.lineTable,n=e.samples,r=t.length/4,i=e=>Math.max(1,Math.ceil((e-1)/Ul)),a=0;for(let e=0;e<r;e++)a+=i(Math.max(1,t[e*4+1]));let o=new Int32Array(r+1),s=new Float32Array(a*4),c=0;for(let i=0;i<r;i++){o[i]=c;let r=t[i*4],a=Math.max(1,t[i*4+1]);for(let t=0;t===0||t*Ul<a-1;t++){let i=1/0,o=1/0,l=-1/0,u=-1/0;for(let s=t*Ul;s<=Math.min(a-1,(t+1)*Ul);s++){let t=n[(r+s)*2],c=n[(r+s)*2+1];t<i&&(i=t),t>l&&(l=t),c<o&&(o=c),c>u&&(u=c);let d=s<a-1?e.sampleBend?.[r+s]??0:0,f=d%32,p=(d-f)/32;for(let a=1;a<=f&&e.bends;a++){let d=a/(f+1),m=t+(n[(r+s+1)*2]-t)*d+e.bends[(p+a-1)*2],h=c+(n[(r+s+1)*2+1]-c)*d+e.bends[(p+a-1)*2+1];m<i&&(i=m),m>l&&(l=m),h<o&&(o=h),h>u&&(u=h)}}s[c*4]=i,s[c*4+1]=o,s[c*4+2]=l,s[c*4+3]=u,c++}}return o[r]=c,{first:o,box:s,mark:new Uint8Array(c)}}function ql(e,t,n,r){let i=Gl(e),a=i.box,o=i.mark;for(let e=0;e<o.length;e++)o[e]=+(a[e*4]-r<=t&&a[e*4+2]+r>=t&&a[e*4+1]-r<=n&&a[e*4+3]+r>=n);return i}function Jl(e,t,n,r,i){let a=i-r;if(a<0||!e.meta[n*4+1])return!1;let o=u(n);if(o*4+3>=e.lineTable.length)return!0;let{geo:s,d:c}=bn(e,n,Ct(e,n,a)),l=e.lineTable[s*4+1],d=e.lineTable[s*4+2],f=e.lineTable[s*4+3],p=t.first[s],m=t.first[s+1]-p;if(!(f>0)||l<2)return t.mark[p]===1;let h=Math.max(1,cn(e.lineCars?.[o]??8))*20+30,g=e=>Math.min(m-1,Math.floor(Math.min(Math.floor(Math.max(0,Math.min(d,e))/f),l-2)/Ul));for(let e=g(c-h),n=g(c+h);e<=n;e++)if(t.mark[p+e])return!0;return!1}var Yl=new WeakMap;function Xl(e){let t=Yl.get(e.flags);if(t)return t;let n=[];for(let t=e.count-1;t>=0;t--)e.flags[t]&1&&n.push(t);return Yl.set(e.flags,t=Int32Array.from(n)),t}function Zl(e,t,n){let r=e.renderer.net;if(!r||!e.camMatrix)return-1;let i=Math.max(7,e.renderer.laneReachPx),a=i*i+1,[o]=e.renderer.hasBlueprint?Y(e,r.track.seg,r.track.count,t,n,a,void 0,0,void 0,null,0,Xl(r.track)):[-1];return o<0&&([o]=Y(e,r.track.seg,r.track.count,t,n,a)),o>=0?r.track.edge[o]:-1}function Ql(e,t,n,r,i){let a=t.lines,o=[];for(let t=0;t<16;t++){let[t,s]=Y(e,a.seg,a.count,n,r,i,e.renderer.pickBand,e.renderer.pickBandPx,e=>!o.some(t=>t.num===a.colour[e]),e.renderer.lineWidths,e.renderer.slotPx);if(t<0)break;o.push({num:a.colour[t],i:t,d:s})}return o}function $l(e,t){let n=e.map(e=>({...e,r:Math.sqrt(e.d),s:t?t(e.num,e.i):0})).sort((e,t)=>e.r-t.r||e.num-t.num),r=[];for(let e=0;e<n.length;){let t=e+1;for(;t<n.length&&n[t].r-n[e].r<=2;)t++;r.push(...n.slice(e,t).sort((e,t)=>t.s-e.s||e.num-t.num)),e=t}return r}var eu=null,tu=6;function nu(e,t,n,r,i,a,o){let s=eu&&eu.net===t?e.toScreen(eu.x,eu.y):null,c=s&&Math.hypot(n-s[0],r-s[1])<=tu?eu:null,l=c?a?.kind===`line`?c.order.findIndex(e=>String(e.num)===a.line):a?.kind===`track`&&a.edge===c.edge?c.order.length:-1:-1;if(c&&l>=0){let e=(l+1)%(c.order.length+ +(c.edge>=0));return e===c.order.length?{kind:`track`,edge:c.edge}:{kind:`line`,line:String(c.order[e].num)}}let u=$l(Ql(e,t,n,r,i),o),d=u.map(({num:e,i:t})=>({num:e,i:t}));if(e.renderer.busesShown)for(let t of e.renderer.buses.linesAt(e,n,r,16,e=>d.some(t=>t.num===e)))d.push({num:t,i:-1});if(d.length>1){let i=e.screenToLocal(n,r);eu=i?{net:t,x:i[0],y:i[1],order:d,edge:u.length?t.lines.edge[u[0].i]:-1}:null;let o=a?.kind===`line`?d.findIndex(e=>String(e.num)===a.line):-1;return{kind:`line`,line:String(d[+(o===0)].num)}}eu=null}function ru(e,t,n,r,i=null,a=!1,o){let s=e.renderer.net;if(!s||!e.camMatrix)return null;let c=Math.max(7,e.renderer.laneReachPx),l=c*c+1,d=e.renderer.stationAt(t,n,(t,n)=>e.toScreen(t,n),7);if(d>=0){let r=s.stationIds[d];if(a&&i?.kind===`station`&&i.station===r){let[i]=Y(e,s.track.seg,s.track.count,t,n,l),a=i>=0?s.track.edge[i]:-1;if(a>=0&&!V.peek()?.edges.some(e=>e.id===a&&(String(e.a)===r||String(e.b)===r)))return{kind:`track`,edge:a}}return{kind:`station`,station:r}}if(r&&!e.renderer.trainsHidden){let r=Yt.now(),a=e.renderer,o=a.trips,c=i?.kind===`train`?a.tripIndex(i.profile,i.dep-a.tripsEpoch):-1,l=Ml(e,t,n),d=l?ql(s,l[0],l[1],(Math.sqrt(50)+1)*l[2]+3*a.laneShiftM+a.passShiftM+a.bandReach*a.bandShiftM+32*a.bandOn+1):null;for(let i=a.tripCount-(c>=0?0:1);i>=0;i--){let l=i===a.tripCount?c:i;if(i<a.tripCount&&l===c)continue;let f=o[l*2],p=o[l*2+1]+a.tripsEpoch+a.tripLag(l);if(d&&!Jl(s,d,f,p,r)||W.lines.has(u(f)))continue;let h=je(s,f,p,r,a.tripEnds?a.tripEnds[l]+a.tripsEpoch:-1/0,a.laneShiftM,a.bandShiftM,a.sampleBand,a.bandOn,a.passShiftM,a.tripBays??void 0,l*4);if(!h||a.tripOnOffLevel(h))continue;if(a.detailedTrains){let r=Math.max(1,cn(s.lineCars?.[h.line]??8));for(let i=0;i<r;i++){let r=m(s,h,i),[a,o]=e.toScreen(...r.back),[c,l]=e.toScreen(...r.front),u=c-a,d=l-o,g=Math.hypot(u,d)||1,_=Math.max(0,Math.min(1,((t-a)*u+(n-o)*d)/(g*g)));if((a+_*u-t)**2+(o+_*d-n)**2<50)return{kind:`train`,line:String(h.line),profile:f,dep:p}}continue}let[g,_]=e.toScreen(h.x,h.y);if((g-t)**2+(_-n)**2<50)return{kind:`train`,line:String(h.line),profile:f,dep:p}}}let f=e.renderer.lineWidths,p=e.renderer.slotPx,h=e.renderer.pickBandPx,g=e.renderer.pickBand,[_,,v]=e.renderer.slotPx&&i?.kind===`line`?Y(e,s.lines.seg,s.lines.count,t,n,l,g,h,e=>String(s.lines.colour[e])===i.line,f,p):[-1,0],y=e.renderer.hasBlueprint,b=h>0&&!v?-1:_;if(b<0&&y&&e.renderer.slotPx&&([b]=Y(e,s.lines.seg,s.lines.count,t,n,l,g,h,void 0,f,p,Xl(s.lines))),b<0&&y){let[r]=Y(e,s.track.seg,s.track.count,t,n,l,void 0,0,void 0,null,0,Xl(s.track));if(r>=0)return{kind:`track`,edge:s.track.edge[r]}}b<0&&e.renderer.slotPx&&([b]=Y(e,s.lines.seg,s.lines.count,t,n,l,g,h,void 0,f,p));let x=b>=0?String(s.lines.colour[b]):null;if(x&&a){let r=nu(e,s,t,n,l,i,o);if(r)return r}if(x&&(i?.kind!==`line`||i.line!==x))return{kind:`line`,line:x};for(let r=s.junctionIds.length-1;r>=0;r--){if(W.levels){let e=W.nodeLevel(s.junctionIds[r]);if(e!==void 0&&Ws(e))continue}if(e.toScreenInto(s.junctions[r*2],s.junctions[r*2+1],jl,0),(jl[0]-t)**2+(jl[1]-n)**2<50)return{kind:`junction`,node:s.junctionIds[r]}}let[S]=Y(e,s.track.seg,s.track.count,t,n,l);if(S>=0)return{kind:`track`,edge:s.track.edge[S]};if(e.renderer.busesShown){let r=iu(e,t,n);if(r)return r;let c=e.renderer.buses.lineAt(e,t,n);if(c>=0)return a&&nu(e,s,t,n,l,i,o)||{kind:`line`,line:String(c)}}if(x)return{kind:`line`,line:x};let C=e.renderer.lotAt(t,n,(t,n)=>e.toScreen(t,n));if(C>=0)return{kind:`station`,station:s.stationIds[e.renderer.lots.lots[C*10+8]]};let w=El(e,t,n),T=w&&al.peek().get(w.id)?.[0];return T?{kind:`station`,station:T}:null}function iu(e,t,n){let r=e.renderer.buses.stopAt(e,t,n),i=V.peek();if(!r||r.id===void 0||r.id<0||!i)return null;let a=i.save.lines.find(e=>e.num===r.line),o=a&&i.lineStats[a.id]?.bus?.stops.find(e=>e.id===r.id);return o?o.station>=0?i.save.stations.some(e=>e.id===String(o.station))?{kind:`station`,station:String(o.station)}:null:{kind:`busStop`,stop:String(o.id),at:[o.lng,o.lat]}:null}function au(e,t,n,r){let i=e.toScreen(t,n),a=e.toScreen(t+10*Math.cos(r),n-10*Math.sin(r)),o=a[0]-i[0],s=a[1]-i[1];return o||s?Math.atan2(s,o)*180/Math.PI:null}function ou(e){return e===null?``:`linear-gradient(${(e+(yn.peek()?180:0)).toFixed(1)}deg, #fff 50%, var(--c) 50%)`}function su(e){let t=e*Math.PI/180,n=yn.peek()?1:-1,r=-Math.sin(t)*n,i=Math.cos(t)*n;return{x1:.5-.5*r,y1:.5-.5*i,x2:.5+.5*r,y2:.5+.5*i}}var cu=class{moving;at=0;constructor(e){this.moving=e}due(){return!this.moving()||performance.now()-this.at>=100}done(){this.at=performance.now()}},lu=class{crowds;dotCrowds;wait;dotWait;placed=null;hall=[];memberOf=null;at={t:NaN,board:null};any=!1;constructor(e){let t=Math.max(1,e);this.crowds=new Float32Array(t*4),this.wait=new Float32Array(t*2),this.dotCrowds=new Float32Array(t*2),this.dotWait=new Float32Array(t)}get stationOfQueue(){return this.placed?.station??null}update(e,t,n,r){if((!this.placed||this.placed.board!==t||this.placed.net!==e)&&(this.placed=uu(e,t)),this.at.board===t&&Math.abs(n-this.at.t)<1)return this.any;let i=this.crowds,a=this.wait;i.fill(0),a.fill(0);let{station:o,side:s,sides:c}=this.placed,l=!1;for(let e=0;e<t.queueCount;e++){let r=o[e];if(r<0)continue;let i=rt(t,e,n),c=s[e]>0?0:1;a[r*2+c]+=i,i>=1&&(l=!0)}let u=e.buildings??[],d=this.membersOf(e),f=u.map(e=>({id:e.id,waiting:0,full:!1,spill:new Set,room:e.room,members:e.members.length})),p=t=>c[t]===3?ht(e.stationLength?.[t]??0):2*ht(e.stationLength?.[t]??0);for(let t=0;t<e.stationCount;t++){let e=d[t];if(e<0||!c[t])continue;let n=p(t),r=c[t]===3?Math.max(0,a[t*2]-n)+Math.max(0,a[t*2+1]-n):Math.max(0,a[t*2]+a[t*2+1]-n);r>0&&(f[e].waiting+=r,f[e].spill.add(t))}for(let e of f)e.full=e.waiting>=e.room;this.hall=f;for(let t=0;t<e.stationCount;t++){if(!c[t])continue;let n=ht(e.stationLength?.[t]??0),r=d[t]>=0?f[d[t]].full:!0;if(c[t]===3)i[t*4]=Math.min(1,a[t*2]/n),i[t*4+1]=Math.min(1,a[t*2+1]/n),i[t*4+2]=i[t*4]>=1&&r?1:0,i[t*4+3]=i[t*4+1]>=1&&r?1:0;else{let e=Math.min(1,(a[t*2]+a[t*2+1])/(2*n)),o=e>=1&&r?1:0;i.set([e,e,o,o],t*4)}}let m=this.dotCrowds,h=this.dotWait;m.fill(0),h.fill(0);for(let t=0;t<e.stationCount;t++){if(!c[t])continue;let n=d[t];if(n>=0){let r=f[n].room/Math.max(1,f[n].members),o=c[t]===3?Math.max(a[t*2],a[t*2+1]):(a[t*2]+a[t*2+1])/2;m[t*2]=Math.min(1,o/(ht(e.stationLength?.[t]??0)+r)),(i[t*4+2]>0||i[t*4+3]>0)&&(m[t*2+1]=1)}else m[t*2]=Math.max(i[t*4],i[t*4+1]),(i[t*4+2]>0||i[t*4+3]>0)&&(m[t*2+1]=1);h[t]=a[t*2]+a[t*2+1]}return r(i,m),this.at={t:n,board:t},this.any=l,l}membersOf(e){if(this.memberOf?.net===e)return this.memberOf.of;let t=new Int32Array(Math.max(1,e.stationCount)).fill(-1);return(e.buildings??[]).forEach((e,n)=>{for(let r of e.members)t[r]=n}),this.memberOf={net:e,of:t},t}queueShare(e,t){let n=this.placed;return!n||n.net!==t||e<0||e>=n.station.length||n.station[e]<0?null:this.crowds[n.station[e]*4+(n.side[e]>0?0:1)]}dot(e){return e<0||e>=this.dotWait.length?null:{waiting:this.dotWait[e],share:this.dotCrowds[e*2]}}};function uu(e,t){let n=new Map;e.stationIds.forEach((e,t)=>n.set(Number(e),t));let r=new Int32Array(t.queueCount),i=new Int8Array(t.queueCount),a=new Uint8Array(Math.max(1,e.stationCount));for(let o=0;o<t.queueCount;o++){let s=o*12,c=n.get(t.queues[s])??-1;if(r[o]=c,c<0)continue;let l=t.queues[s+1],u=t.queues[s+2],d=t.queues[s+3],[f,p]=ft(e,l,d-5),[m,h]=ft(e,l,d+5),g=((m-f)*(e.stationAxis?.[c*2]??1)+(h-p)*(e.stationAxis?.[c*2+1]??0))*(u===1?-1:1)*(e.keep??1);i[o]=g>=0?1:-1,a[c]|=i[o]>0?1:2}return{station:r,side:i,sides:a,board:t,net:e}}var du=8,fu=.35,pu=1.3,mu=1,hu=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform float u_time;
uniform float u_r;           // a box's white half width, device px
in vec4 a_path;              // from, to (local units)
in vec4 a_when;              // set off, arrival, riders, (line)
out vec2 v_p;
flat out float v_r;
void main() {
  float span = a_when.y - a_when.x;
  if (!(u_time >= a_when.x && u_time < a_when.y) || span <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 at = mix(a_path.xy, a_path.zw, (u_time - a_when.x) / span);
  v_r = u_r * clamp(sqrt(a_when.z / ${250 .toFixed(1)}), ${fu.toFixed(2)}, ${pu.toFixed(2)});
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  v_p = corner * (v_r + 1.5);
  vec4 c = project(at);
  c.xy += v_p / (u_viewport * 0.5) * c.w;
  gl_Position = c;
}`,gu=`#version 300 es
precision highp float;
uniform vec3 u_fill;
uniform vec3 u_rim;
uniform float u_rim_px;
in vec2 v_p;
flat in float v_r;
out vec4 o;
void main() {
  float d = length(v_p);
  float a = clamp(v_r + u_rim_px - d + 0.5, 0.0, 1.0);
  if (a <= 0.0) discard;
  vec3 c = mix(u_rim, u_fill, clamp(v_r - d + 0.5, 0.0, 1.0));
  o = vec4(c * a, a);
}`,_u=class{gl;prog=null;u={};vao=null;pathBuf=null;whenBuf=null;count=0;data=new Float32Array;src={board:null,net:null};buildMs=0;init(e){if(this.gl=e,this.prog=v(e,hu,gu,`transfer bubbles`),this.prog){this.u=L(e,this.prog,[...R,`u_viewport`,`u_time`,`u_r`,`u_fill`,`u_rim`,`u_rim_px`]),this.vao=e.createVertexArray(),this.pathBuf=e.createBuffer(),this.whenBuf=e.createBuffer(),e.bindVertexArray(this.vao);for(let[t,n]of[[`a_path`,this.pathBuf],[`a_when`,this.whenBuf]]){let r=e.getAttribLocation(this.prog,t);r<0||(e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array(4),e.DYNAMIC_DRAW),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,4,e.FLOAT,!1,0,0),e.vertexAttribDivisor(r,1))}e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null)}}sync(e,t,n){if(e===this.src.board&&t===this.src.net)return;this.src={board:e,net:t};let r=performance.now(),i=0,a=new Float32Array,o=new Float32Array(4),s=new Float32Array(4);if(e&&t&&n&&e.pulseFrom.length===e.pulses.length){let r=new Map;t.stationIds.forEach((e,t)=>r.set(Number(e),t));let c=t.stations,l=t.stationShape,u=e=>c[e*3]+(l?.[e*4]??0),d=e=>c[e*3+1]+(l?.[e*4+1]??0),f=e.pulses,p=e.pulseFrom,m=e.queues,h=new Int32Array(f.length/2).fill(-1);for(let t=0;t<e.queueCount;t++){let e=n[t];if(e<0)continue;let a=t*12,o=m[a+10],s=o+m[a+11];for(let t=o;t<s;t++){if(!(p[t*2+1]>=mu)||!(f[t*2+1]>=1))continue;let n=r.get(p[t*2]);n!==void 0&&n!==e&&(h[t]=n,i++)}}a=new Float32Array(i*du),o=new Float32Array(Math.max(1,i)*4),s=new Float32Array(Math.max(1,i)*4);let g=0;for(let t=0;t<e.queueCount;t++){let e=n[t];if(e<0)continue;let r=t*12,i=m[r+10],c=i+m[r+11];for(let t=i;t<c;t++){let n=h[t];if(n<0)continue;let i=p[t*2+1],c=g*du,l=g*4;a[c]=o[l]=u(n),a[c+1]=o[l+1]=d(n),a[c+2]=o[l+2]=u(e),a[c+3]=o[l+3]=d(e),a[c+4]=s[l]=f[t*2]-i,a[c+5]=s[l+1]=f[t*2],a[c+6]=s[l+2]=f[t*2+1],a[c+7]=s[l+3]=m[r+1],g++}}}this.data=a,this.count=i;let c=this.gl;c&&this.pathBuf&&this.whenBuf&&(c.bindBuffer(c.ARRAY_BUFFER,this.pathBuf),c.bufferData(c.ARRAY_BUFFER,o,c.DYNAMIC_DRAW),c.bindBuffer(c.ARRAY_BUFFER,this.whenBuf),c.bufferData(c.ARRAY_BUFFER,s,c.DYNAMIC_DRAW),c.bindBuffer(c.ARRAY_BUFFER,null)),this.buildMs=performance.now()-r}get size(){return this.count}draw(e,t,n,r,i,a,o){if(!this.count||!this.prog)return;let s=this.gl,c=this.u;s.useProgram(this.prog),I(s,c,e),s.uniform2f(c.u_viewport,t[0],t[1]),s.uniform1f(c.u_time,n),s.uniform1f(c.u_r,r),s.uniform3fv(c.u_fill,i),s.uniform3fv(c.u_rim,a),s.uniform1f(c.u_rim_px,o),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,4,this.count),s.bindVertexArray(null),this.last={m:Array.from(e.m),t:n,r,w:t[0],h:t[1]}}last=null;hide(){this.last=null}at(e,t){let n=this.last,r=this.data;if(!n||!this.count)return null;let i=n.m,a=e*n.w,o=t*n.h,s=null,c=1/0;for(let e=0;e<this.count;e++){let t=e*du,l=r[t+4],u=r[t+5];if(!(n.t>=l&&n.t<u))continue;let d=(n.t-l)/(u-l),f=r[t]+(r[t+2]-r[t])*d,p=r[t+1]+(r[t+3]-r[t+1])*d,m=i[0]*f+i[4]*p+i[12],h=i[1]*f+i[5]*p+i[13],g=i[3]*f+i[7]*p+i[15],_=(m/g+1)/2*n.w,v=(1-h/g)/2*n.h,y=n.r*Math.max(fu,Math.min(pu,Math.sqrt(r[t+6]/250)))+2,b=Math.hypot(_-a,v-o);b<=y&&b<c&&(c=b,s={riders:r[t+6],line:r[t+7]})}return s}},vu=.45,yu=1.4,bu=.6,xu=.75,Su=1,Cu=.3,wu=16,Tu=1.15,Eu=1.5,Du=2.6,Ou=1,ku=2,Au=4,ju=3.2,Mu=.6,Nu=8,Pu=16,Fu=.4,Iu=`0.3`,Lu=1.5,Ru=4.5,zu=.5,Bu=16,Vu=32,Hu=`vec3(0.663, 0.804, 0.953)`,Uu=12,Wu=4,Gu=1.5,Ku=64,qu=128,Ju=1,Yu=1,Xu=5,Zu=40,Qu=.8,$u=3,ed=50,td=9,nd=`#version 300 es
precision highp float;
precision highp int;
${H}
uniform vec2 u_viewport;
uniform float u_width;       // device px across (the corridor's edge in pass 2)
uniform float u_add;         // the casing beyond the line, device px (pass 0)
uniform float u_extra;       // added to the selected line
uniform int u_pass;          // 0 casing, 1 colour, 2 corridor outline (drawn three times, see draw())
uniform int u_sel;
uniform int u_hot;
uniform int u_lit[${wu}];   // T-2993: lines the bus tool's route will change with, u_lit_n of them
uniform int u_lit_n;
uniform int u_only;          // -1 every line, -2 the selected line, -3 the dashed transfer lines and connectors alone (drawn last, over the lines), else that line only
uniform float u_dim;
uniform float u_alpha;       // the corridor's
uniform vec3 u_casing_rgb;
uniform vec3 u_rail_rgb;
uniform float u_rail;        // a blueprint's rail beyond the colour, device px a side
uniform float u_px_per_unit; // device px a local unit spans
in vec4 a_seg;
in vec4 a_info;
in float a_w;                // T-2274: the Traffic view's width by riders, a share of the line's own
in float a_col;              // T-2452: the Speed or Profit view's colour packed as a_info.z; -1 the line's own, -2 plain track
uniform vec3 u_track_rgb;
uniform float u_xfer;        // T-2982: 1 draws the transfer lines (colour pass only)
uniform float u_xfer_w;      // their width, device px
uniform vec3 u_xfer_rgb;
uniform float u_xfer_alpha;
uniform int u_lit_links[${Bu}]; // T-3890: the connectors lit (a transfer line's place in linkStops, its a_info.z)
uniform int u_lit_links_n;
uniform int u_no_bp;         // 1: blueprint pieces are not drawn (Settings' Show blueprints)
uniform int u_lane_kind;     // T-3944: pass 5 draws the blueprint's new lanes (0), the constructed ones (1) or the blueprint's free ones (2)
uniform vec3 u_lane_rgb;     // the constructed lanes' border
uniform float u_lane_edge;   // the new lanes' band's edge in the rail's colour, device px
uniform float u_lane_period; // their dash and gap, device px
uniform float u_lane_in;     // with no stencil, the band's inner edge as a width beyond the line's own; under -1e5 with one
out vec3 v_color;
flat out float v_in;         // T-3944: half that width, device px; -1 for none
flat out float v_edge;       // the band's edge, device px, where it has one (the new lanes'), else 0
out float v_alpha;
out vec4 v_cap;
out float v_dash;            // T-2194: device px along a ferry's route, -1 elsewhere
flat out float v_period;
void main() {
  int id = int(a_info.x + 0.5);
  int flags = int(a_info.y + 0.5);
  bool bp = (flags & ${Ou}) != 0;
  bool mute = (flags & ${Pu}) != 0;
  bool sel = id == u_sel && !mute;
  bool lit = false;
  for (int k = 0; k < ${wu}; k++) if (k < u_lit_n && u_lit[k] == id) lit = true;
  bool xfer = (flags & ${Nu}) != 0;
  bool lane = (flags & ${Ku}) != 0;
  if ((u_only >= 0 && id != u_only) || (u_only == -2 && (!sel || xfer)) || (u_only == -3 && !xfer) || (xfer && u_only != -3) || (u_pass == 2 && (flags & 30) != 0)
      || (xfer && (u_pass != 1 || u_xfer < 0.5)) || (u_no_bp == 1 && bp) || (lane != (u_pass == 5)) || (lane && u_lane_kind != (!bp ? 1 : (flags & ${qu}) != 0 ? 2 : 0))) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  bool hotLink = false;
  if (xfer && a_info.z >= 0.0) for (int k = 0; k < ${Bu}; k++) if (k < u_lit_links_n && u_lit_links[k] == int(a_info.z + 0.5)) hotLink = true;
  bool paint = u_pass == 1 && !bp && !xfer && !mute;
  float p = paint && a_col >= 0.0 ? a_col : a_info.z;
  vec3 own = vec3(floor(p / 65536.0), mod(floor(p / 256.0), 256.0), mod(p, 256.0)) / 255.0;
  vec3 col = mute ? mix(own, u_xfer_rgb, ${Iu}) : paint && a_col < -1.5 ? u_track_rgb : own;
  float w = xfer ? u_xfer_w : u_pass < 2 ? u_width * a_w + (u_pass == 0 ? u_add : 0.0) + (sel || lit ? u_extra : 0.0)
    : lane ? u_width * a_w + u_add + (sel || lit ? u_extra : 0.0) : u_width;
  if (u_pass == 0 && bp) w += 2.0 * u_rail;
  float faint = 1.0;
  if (u_pass < 2) {
    // thinner than a pixel (zoomed far out): a pixel wide and fainter, as the rail strokes are
    faint = clamp(w, 0.05, 1.0);
    w = max(w, 1.0);
  }
  float along = float(gl_VertexID & 1);
  float side = gl_VertexID < 2 ? -1.0 : 1.0;
  vec4 c0 = project(a_seg.xy);
  vec4 c1 = project(a_seg.zw);
  vec2 half_vp = u_viewport * 0.5;
  vec2 s0 = c0.xy / c0.w * half_vp;
  vec2 s1 = c1.xy / c1.w * half_vp;
  vec2 dir = s1 - s0;
  float len = length(dir);
  dir = len > 1e-6 ? dir / len : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  vec4 c = along < 0.5 ? c0 : c1;
  vec2 off = nrm * side * w * 0.5 + dir * (along * 2.0 - 1.0) * w * 0.5;
  c.xy += off / half_vp * c.w;
  gl_Position = c;
  float ext = (along * 2.0 - 1.0) * w * 0.5, ua = along * len + ext;
  v_cap = vec4(ua, len - ua, side * w * 0.5, w * 0.5);
  v_in = lane && u_lane_in > -1e5 ? 0.5 * (u_width * a_w + u_lane_in + (sel || lit ? u_extra : 0.0)) : -1.0;
  v_period = lane ? u_lane_period : xfer ? max(${Ru.toFixed(1)} * w, 5.0) : max(${ju.toFixed(1)} * w, 6.0);
  v_dash = (u_pass == 1 && (flags & 10) != 0) || (lane && (!bp || (flags & ${qu}) != 0)) ? a_info.w * u_px_per_unit + ua : -1.0;
  v_alpha = faint * (u_pass == 2 ? u_alpha : (sel ? 1.0 : mute ? ${Fu} : u_dim)) * (xfer ? (hotLink ? 1.0 : u_xfer_alpha) : 1.0);
  v_edge = lane && u_lane_kind == 0 ? u_lane_edge : 0.0;
  if (lane) v_color = u_lane_kind == 0 ? ${Hu} : u_lane_kind == 2 ? u_rail_rgb : u_lane_rgb;
  else if (u_pass == 0) v_color = bp ? u_rail_rgb : u_casing_rgb;
  else if (xfer) v_color = u_xfer_rgb;
  else {
    v_color = col;
    if (u_pass == 1) {
      if (bp) v_color = mix(v_color, vec3(1.0), 0.45);
      if (id == u_hot || lit) v_color = mix(v_color, vec3(1.0), ${Cu});
    }
  }
}`,rd=`#version 300 es
precision highp float;
in vec3 v_color;
in float v_alpha;
in vec4 v_cap;
in float v_dash;
flat in float v_period;
flat in float v_in;
flat in float v_edge;
uniform vec3 u_rail_rgb;
out vec4 o;
void main() {
  float past = -min(v_cap.x, v_cap.y);
  if (v_in > 0.0 && (past > 0.0 ? length(vec2(past, v_cap.z)) : abs(v_cap.z)) < v_in) discard;
  float a = past > 0.0 ? clamp(0.5 - (length(vec2(past, v_cap.z)) - v_cap.w), 0.0, 1.0) * v_alpha : v_alpha;
  if (v_dash >= 0.0) {
    // a ferry's dash, its ends softened over a pixel
    float f = mod(v_dash, v_period), on = ${Mu.toFixed(2)} * v_period;
    a *= clamp(min(f, on - f) + 0.5, 0.0, 1.0);
  }
  if (a <= 0.0) discard;   // the stencil passes must not mark a cap's empty corners
  vec3 col = v_color;
  // T-3944: the new lanes' band takes the rail's colour along its outer edge
  if (v_edge > 0.0) col = mix(col, u_rail_rgb, clamp((past > 0.0 ? length(vec2(past, v_cap.z)) : abs(v_cap.z)) - (v_cap.w - v_edge) + 0.5, 0.0, 1.0));
  o = vec4(col * a, a);
}`,id=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform vec2 u_r;            // a ring's outer radius and an end's half side, device px
uniform vec3 u_rail_rgb;
uniform float u_rings;       // 0: the ends only
uniform float u_keep;        // T-3297: 1 where buses keep right, -1 left
uniform int u_lit_stops[${Vu}]; // T-3890: the stops lit (their places in the stops' buffer), u_lit_stops_n of them
uniform int u_lit_stops_n;
uniform int u_no_bp;         // 1: blueprint stops are not drawn
uniform int u_base;          // the first stop this pass draws, in that buffer
in vec4 a_stop;              // x, y, 1 a ring + 2 a blueprint's, the colour packed
in vec2 a_way;               // the local direction a one-way stop's buses go, else 0
out vec2 v_p;
flat out vec2 v_nrm;         // T-3147: the side of the way buses keep to (u_keep, T-3297), clip space; 0 for both ways
flat out vec3 v_color;
flat out float v_end;
flat out float v_r;
void main() {
  int code = int(a_stop.z + 0.5);
  bool ring = (code & 1) != 0, bp = (code & 2) != 0;
  if (u_no_bp == 1 && bp) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  if (ring && u_rings < 0.5) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float r = ring ? u_r.x : u_r.y;
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  vec2 off = corner * (r + 2.0);
  vec4 c = project(a_stop.xy);
  vec4 c0 = c;
  c.xy += off / (u_viewport * 0.5) * c.w;
  gl_Position = c;
  v_p = off;
  v_r = r;
  v_end = ring ? 0.0 : 1.0;
  v_nrm = vec2(0.0);
  if (ring && dot(a_way, a_way) > 0.0) {
    vec4 c1 = project(a_stop.xy + a_way);
    vec2 d = (c1.xy / c1.w - c0.xy / c0.w) * (u_viewport * 0.5);
    if (length(d) > 1e-6) { d = normalize(d); v_nrm = vec2(d.y, -d.x) * u_keep; }
  }
  float p = a_stop.w;
  v_color = bp ? u_rail_rgb : vec3(floor(p / 65536.0), mod(floor(p / 256.0), 256.0), mod(p, 256.0)) / 255.0;
  for (int k = 0; k < ${Vu}; k++) if (k < u_lit_stops_n && u_lit_stops[k] == gl_InstanceID + u_base) v_color = mix(v_color, vec3(1.0), ${Cu});
}`,ad=`#version 300 es
precision highp float;
uniform vec3 u_fill;
uniform float u_rim;         // device px
in vec2 v_p;
flat in vec2 v_nrm;
flat in vec3 v_color;
flat in float v_end;
flat in float v_r;
out vec4 o;
void main() {
  float d;
  if (v_end > 0.5) {
    float cr = 0.36 * v_r;       // the bus bullet's corner share of the side (BUS_CORNER, ui/bullet.ts) x 2
    vec2 q = abs(v_p) - vec2(v_r - cr);
    d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - cr;
  } else d = length(v_p) - v_r;
  float cover = clamp(0.5 - d, 0.0, 1.0);
  if (cover <= 0.0) discard;
  vec3 fillc = u_fill;
  if (v_nrm != vec2(0.0)) fillc = mix(u_fill, v_color, clamp(dot(v_p, v_nrm) + 0.5, 0.0, 1.0));
  vec3 c = mix(fillc, v_color, clamp(d + u_rim + 0.5, 0.0, 1.0));
  o = vec4(c * cover, cover);
}`,od=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform vec3 u_size;         // the route's half width, the arrow's half width, its casing, device px
uniform float u_every;       // every this many-th arrow is drawn
uniform float u_m_px;        // device px a ground metre spans
uniform float u_clear;       // device px from a stop's middle an arrow's back keeps clear of
uniform int u_sel;
uniform int u_hot;
uniform float u_dim;
uniform int u_no_bp;         // 1: blueprint arrows are not drawn
in vec4 a_arrow;             // x, y, direction
in vec4 a_arrow2;            // colour packed, line, its place in its line's arrows, metres to its nearest stop
in float a_bp;
out vec2 v_p;
flat out vec3 v_color;
flat out float v_alpha;
void main() {
  float w = u_size.y, l = 0.8 * w, t = 2.0 * u_size.x;   // a chevron stroked as thick as the route
  if ((u_no_bp == 1 && a_bp > 0.5) || mod(a_arrow2.z, u_every) > 0.5 || a_arrow2.w * u_m_px < u_clear + 0.5 * l) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec4 c0 = project(a_arrow.xy);
  vec4 c1 = project(a_arrow.xy + a_arrow.zw);
  vec2 half_vp = u_viewport * 0.5;
  vec2 dir = c1.xy / c1.w * half_vp - c0.xy / c0.w * half_vp;
  dir = length(dir) > 1e-6 ? normalize(dir) : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 2.0 - 1.0;
  vec2 p = corner * (vec2(0.5 * (l + t), w + 0.5 * t) + u_size.z + 1.0);
  c0.xy += (dir * p.x + nrm * p.y) / half_vp * c0.w;
  gl_Position = c0;
  v_p = p;
  int id = int(a_arrow2.y + 0.5);
  float q = a_arrow2.x;
  vec3 col = vec3(floor(q / 65536.0), mod(floor(q / 256.0), 256.0), mod(q, 256.0)) / 255.0;
  if (a_bp > 0.5) col = mix(col, vec3(1.0), 0.45);
  if (id == u_hot) col = mix(col, vec3(1.0), ${Cu});
  v_color = col;
  v_alpha = id == u_sel ? 1.0 : u_dim;
}`,sd=`#version 300 es
precision highp float;
uniform vec3 u_size;
uniform vec3 u_casing_rgb;
in vec2 v_p;
flat in vec3 v_color;
flat in float v_alpha;
out vec4 o;
void main() {
  float w = u_size.y, l = 0.8 * w, t = 2.0 * u_size.x;
  // a chevron, its point ahead, its stroke as thick as the route
  vec2 q = vec2(v_p.x, abs(v_p.y));
  vec2 pa = q - vec2(0.5 * l, 0.0), ba = vec2(-l, w);
  float d = length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)) - 0.5 * t;
  float body = clamp(0.5 - d, 0.0, 1.0);
  // its casing only off the route, whose own casing is under it
  float rim = q.y > u_size.x ? clamp(0.5 - (d - u_size.z), 0.0, 1.0) : body;
  float a = rim * v_alpha;
  if (a <= 0.0) discard;
  o = vec4(mix(u_casing_rgb, v_color, body / max(rim, 1e-3)) * a, a);
}`,cd=.45,ld=e=>{let[t,n,r]=F(e);return t*65536+n*256+r},ud=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),dd=class{gl=null;segProg=null;stopProg=null;su={};pu={};segVao=null;stopVao=null;stationStopVao=null;arrowProg=null;au={};arrowVao=null;arrows=0;bufs=[];lines=[];version=0;transfers=0;links=0;walks=0;linkSrc=[];byId=new Map;built=null;onGpu=null;last=null;litList=new Int32Array(wu);init(e){this.gl=e,this.segProg=C(e,nd,rd),this.stopProg=C(e,id,ad),this.su=L(e,this.segProg,[...R,`u_viewport`,`u_width`,`u_add`,`u_extra`,`u_pass`,`u_sel`,`u_hot`,`u_lit`,`u_lit_n`,`u_only`,`u_dim`,`u_alpha`,`u_casing_rgb`,`u_rail_rgb`,`u_rail`,`u_px_per_unit`,`u_track_rgb`,`u_xfer`,`u_xfer_w`,`u_xfer_rgb`,`u_xfer_alpha`,`u_lit_links`,`u_lit_links_n`,`u_lane_kind`,`u_lane_rgb`,`u_lane_period`,`u_lane_in`,`u_lane_edge`,`u_no_bp`]),this.pu=L(e,this.stopProg,[...R,`u_viewport`,`u_r`,`u_rail_rgb`,`u_rings`,`u_fill`,`u_rim`,`u_keep`,`u_lit_stops`,`u_lit_stops_n`,`u_base`,`u_no_bp`]),this.arrowProg=C(e,od,sd),this.au=L(e,this.arrowProg,[...R,`u_viewport`,`u_size`,`u_every`,`u_m_px`,`u_clear`,`u_sel`,`u_hot`,`u_dim`,`u_casing_rgb`,`u_no_bp`]),this.arrowVao=e.createVertexArray(),this.segVao=e.createVertexArray(),this.stopVao=e.createVertexArray(),this.stationStopVao=e.createVertexArray(),this.bufs=[],this.onGpu=null}muted=-1;setMuted(e){return e!==this.muted&&(this.muted=e,this.built=null,this.version++,!0)}over=null;lastW=null;lastHide=new Set;setAhead(e){return!e&&!this.over?!1:(this.over=e,this.set(this.lastW,this.lastHide))}set(e,t=new Set){this.lastW=e,this.lastHide=t;let n=[],r=[];if(e){for(let r of e.save.lines){let i=e.lineStats[r.id]?.bus;if(!i||i.routeLL.length<4||t.has(r.num))continue;let a=[],o=[],s=[],c=[];if(!i.ferry)for(let e of i.stops)a.push(e.lng,e.lat,e.kind),s.push(e.id),e.at&&(e.at[0]!==e.lng||e.at[1]!==e.lat)&&c.push(e.lng,e.lat,e.at[0],e.at[1]);for(let e of i.ferry?.ports??[])o.push(...e.landing,...e.berth);let l=i.ferry?i.ferry.ports.flatMap(e=>e.berth):i.stops.flatMap(e=>[e.lng,e.lat]),u=e.lineStats[r.id],d=l.length/2,f=u.status===`running`&&Math.max(r.tph.high,r.tph.medium,r.tph.low)>0&&u.stopS.length===2&&u.stopS.every(e=>e.length===d);n.push({id:r.num,colour:r.colour,built:i.built,route:i.routeLL,street:i.streetLL,stops:a,stopIds:s,transfers:c,ferry:!!i.ferry,brt:!!i.brt,lanes:i.lanes??[],spurs:o,marks:l,stopS:f?u.stopS:null,oneWay:!!u.loop&&u.oneWay,ways:u.oneWayAt??{}})}for(let[e,r]of this.over??[]){let i=n.findIndex(t=>t.id===e),a=i>=0?n[i]:null;if(!a&&r.colour===void 0||t.has(e))continue;let o={id:e,colour:r.colour??a.colour,built:a?.built??!1,route:r.route,street:[],stops:[],stopIds:[],transfers:[],ferry:!!r.ferry||!!a?.ferry,brt:a?.brt??!1,lanes:[],spurs:r.ferry?.spurs??[],marks:r.ferry?.marks??[],stopS:null,oneWay:!1,ways:{}};i>=0?n[i]=o:n.push(o)}let i=vs(e.save.lines.flatMap(t=>{let n=e.lineStats[t.id]?.bus;return n&&!n.ferry?[{line:t.num,stops:n.stops}]:[]})),a=new Map(n.map(e=>[e.id,e]));for(let e=0;e+4<i.length;e+=5)a.get(i[e])?.transfers.push(i[e+1],i[e+2],i[e+3],i[e+4]);for(let t of bs(e).links){let e=a.get(t.a.line),n=a.get(t.b.line);e&&n&&r.push({at:[t.a.lng,t.a.lat,t.b.lng,t.b.lat],lines:[t.a.line,t.b.line],stops:[t.a.id,t.b.id],bp:!e.built||!n.built,walk:t.walk})}for(let[t,n]of xs(e,kr.peek()?.members??[]))r.push({at:[t.lng,t.lat,n.lng,n.lat],lines:[-2,-2],stops:[t.num,n.num],bp:!t.built||!n.built,walk:!0})}let i=this.lines,a=(e,t)=>e===t||!!e&&!!t&&e.length===t.length&&e.every((e,n)=>ud(e,t[n]));return this.linkSrc.length===r.length&&this.linkSrc.every((e,t)=>ud(e.at,r[t].at)&&ud(e.stops,r[t].stops)&&e.bp===r[t].bp)&&i.length===n.length&&i.every((e,t)=>{let r=n[t];return e.id===r.id&&e.colour===r.colour&&e.built===r.built&&e.brt===r.brt&&e.oneWay===r.oneWay&&ud(e.lanes,r.lanes)&&ud(e.route,r.route)&&ud(e.street,r.street)&&ud(e.stops,r.stops)&&ud(e.transfers,r.transfers)&&ud(e.spurs,r.spurs)&&ud(e.marks,r.marks)&&a(e.stopS,r.stopS)})?!1:(this.lines=n,this.linkSrc=r,this.links=r.filter(e=>!e.walk).length,this.walks=r.length-this.links,this.transfers=n.reduce((e,t)=>e+t.transfers.length/4,0),this.byId=new Map(n.map(e=>[e.id,e])),this.built=null,this.version++,!0)}get any(){return this.lines.length>0}has(e){return this.byId.has(e)}local(e){if(this.built&&this.built.a===e)return this.built;let t=this.linkSrc.length,n=0;for(let e of this.lines){t+=e.route.length/2-1+e.spurs.length/4+e.transfers.length/4,n+=e.street.length/2+e.stops.length/3;for(let n=0;n+1<e.lanes.length;n+=2+2*e.lanes[n+1])t+=Math.max(0,e.lanes[n+1]-1)}let r=new Float32Array(t*4),i=new Float32Array(t*4),a=[],o=[],s=[],c=[],l=[],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[],y=[],b=[],x=new Map,S=new Float64Array(t),C=new Map,T=0;for(let t of this.lines){let n=t.id===this.muted,w=ld(t.colour),E=n?Pu|(t.ferry?ku:0):(t.built?0:Ou)|(t.ferry?ku:0),D=t.built?0:2,O=NaN,k=NaN,A=0,j=0,M=T;for(let n=0;n+1<t.route.length;n+=2){let[a,o]=pt(t.route[n],t.route[n+1],e);A+=o,n>0&&(r.set([O,k,a,o],T*4),i.set([t.id,E,w,j],T*4),S[T]=j,j+=Math.hypot(a-O,o-k),T++),O=a,k=o}C.set(t.id,[M,T-M]);for(let a=0;!n&&a+3<t.spurs.length;a+=4){let[n,o]=pt(t.spurs[a],t.spurs[a+1],e),[s,c]=pt(t.spurs[a+2],t.spurs[a+3],e);r.set([n,o,s,c],T*4),i.set([t.id,E&-3|Au,w,0],T*4),T++}x.set(t.id,$t(A/(t.route.length/2),e));for(let r=0;!n&&r+1<t.street.length;r+=2){let[n,i]=pt(t.street[r],t.street[r+1],e);a.push(n,i,1+D,w),s.push(t.id),p.push(-1),_.push(0,0)}for(let r=0;!n&&r+2<t.stops.length;r+=3){let n=t.stops[r+2],i=n===0||n===1&&(r===0||r+3>=t.stops.length),[x,S]=pt(t.stops[r],t.stops[r+1],e),C=t.ways[String(t.stopIds[r/3])],T=!i&&C!==void 0?[Math.cos(C),-Math.sin(C)]:[0,0];i?((n===1?u:o).push(x,S,D,w),(n===1?f:c).push(t.id),(n===1?b:v).push(0,0),(n===1?g:m).push(t.stopIds[r/3])):((n===1?l:a).push(x,S,1+D,w),(n===1?d:s).push(t.id),(n===1?y:_).push(...T),(n===1?h:p).push(t.stopIds[r/3]))}}let E=T;for(let t of this.lines)for(let n=0;t.id!==this.muted&&n+3<t.transfers.length;n+=4){let[a,o]=pt(t.transfers[n],t.transfers[n+1],e),[s,c]=pt(t.transfers[n+2],t.transfers[n+3],e);r.set([a,o,s,c],T*4),i.set([t.id,Nu,-1,0],T*4),T++}let D=[];for(let t of this.linkSrc){if(t.lines.includes(this.muted))continue;let[n,a]=pt(t.at[0],t.at[1],e),[o,s]=pt(t.at[2],t.at[3],e);r.set([n,a,o,s],T*4),i.set([-5,Nu|(t.bp?Ou:0),D.length/2,0],T*4),D.push(t.stops[0],t.stops[1]),T++}let O=T;for(let t of this.lines){if(t.id===this.muted)continue;let n=t.lanes,a=ld(t.colour);for(let o=0;o+1<n.length;o+=2+2*n[o+1]){let s=n[o],c=n[o+1],l=Ku|(s<2?Ou:0)|(s===1?qu:0),u=0,d=0,f=0;for(let s=0;s<c;s++){let[c,p]=pt(n[o+2+2*s],n[o+3+2*s],e);s>0&&(r.set([u,d,c,p],T*4),i.set([t.id,l,a,f],T*4),f+=Math.hypot(c-u,p-d),T++),u=c,d=p}}}let k=[];for(let t of this.lines){let n=C.get(t.id);if(!t.oneWay||!n||!n[1]||t.id===this.muted)continue;let i=x.get(t.id)??1,a=100*w*i,o=ld(t.colour),s=n[0]+n[1]-1,c=S[s]+Math.hypot(r[s*4+2]-r[s*4],r[s*4+3]-r[s*4+1]),l=[];for(let n=0;n+1<t.marks.length;n+=2)l.push(pt(t.marks[n],t.marks[n+1],e));for(let n=0;n+1<t.street.length;n+=2)l.push(pt(t.street[n],t.street[n+1],e));for(let e=0;(e+.5)*a<c;e++){let s=(e+.5)*a,[c,u]=hd(r,S,n,s),[d,f]=hd(r,S,n,s-Uu*i),[p,m]=hd(r,S,n,s+Uu*i),h=Math.hypot(p-d,m-f);if(!(h>0))continue;let g=1/0;for(let e of l)g=Math.min(g,Math.hypot(e[0]-c,e[1]-u));k.push(c,u,(p-d)/h,(m-f)/h,o,t.id,e,g/i,+!t.built)}}let A=(a.length+o.length+l.length+u.length)/4;return this.built={a:e,seg:r,info:i,count:T,pickCount:E,stops:Float32Array.from([...a,...o,...l,...u]),stopCount:A,plainCount:(a.length+o.length)/4,stopLine:Int32Array.from([...s,...c,...d,...f]),stopId:Int32Array.from([...p,...m,...h,...g]),stopWay:Float32Array.from([..._,...v,...y,...b]),stopEnd:Uint8Array.from([...s.map(()=>0),...c.map(()=>1),...d.map(()=>0),...f.map(()=>1)]),k:x,cum:S,range:C,stopAlong:new Map,arrows:new Float32Array(k),linkStops:D,laneFirst:O},this.built}upload(e){let t=this.gl;for(let e of this.bufs)t.deleteBuffer(e);this.bufs=[];let n=(e,n,r,i)=>{let a=t.createBuffer();this.bufs.push(a),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,e.length?e:new Float32Array(r),t.STATIC_DRAW);let o=t.getAttribLocation(i,n);o<0||(t.enableVertexAttribArray(o),t.vertexAttribPointer(o,r,t.FLOAT,!1,0,0),t.vertexAttribDivisor(o,1))};t.bindVertexArray(this.segVao),n(e.seg,`a_seg`,4,this.segProg),n(e.info,`a_info`,4,this.segProg),n(this.segWidths(e),`a_w`,1,this.segProg),this.wBuf=this.bufs[this.bufs.length-1],this.widthsFor=e,n(new Float32Array(e.count).fill(-1),`a_col`,1,this.segProg),this.cBuf=this.bufs[this.bufs.length-1],this.coloursFor=[e],t.bindVertexArray(this.stopVao),n(e.stops,`a_stop`,4,this.stopProg);let r=this.bufs[this.bufs.length-1];n(e.stopWay,`a_way`,2,this.stopProg);let i=this.bufs[this.bufs.length-1];t.bindVertexArray(this.stationStopVao);for(let[n,a,o]of[[`a_stop`,r,4],[`a_way`,i,2]]){let r=t.getAttribLocation(this.stopProg,n);r<0||(t.bindBuffer(t.ARRAY_BUFFER,a),t.enableVertexAttribArray(r),t.vertexAttribPointer(r,o,t.FLOAT,!1,0,e.plainCount*o*4),t.vertexAttribDivisor(r,1))}if(e.arrows.length){t.bindVertexArray(this.arrowVao);let n=t.createBuffer();this.bufs.push(n),t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,e.arrows,t.STATIC_DRAW);for(let[e,n,r]of[[`a_arrow`,4,0],[`a_arrow2`,4,4],[`a_bp`,1,8]]){let i=t.getAttribLocation(this.arrowProg,e);i<0||(t.enableVertexAttribArray(i),t.vertexAttribPointer(i,n,t.FLOAT,!1,36,r*4),t.vertexAttribDivisor(i,1))}}t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.onGpu=e}draw(e,t,n,r,i,a){if(this.last=null,!this.lines.length||!this.gl||!this.segProg)return;let o=this.gl,s=this.local(t);if(!s.count)return;this.onGpu!==s&&this.upload(s),this.widthsFor!==s&&this.wBuf&&(o.bindBuffer(o.ARRAY_BUFFER,this.wBuf),o.bufferData(o.ARRAY_BUFFER,this.segWidths(s),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,null),this.widthsFor=s);let c=[s,a.paint,a.paint===`speed`?a.phases:null,a.paint===`speed`?a.meta:null,a.paint===`profit`?this.profit:null];this.cBuf&&(c.length!==this.coloursFor.length||c.some((e,t)=>e!==this.coloursFor[t]))&&(o.bindBuffer(o.ARRAY_BUFFER,this.cBuf),o.bufferData(o.ARRAY_BUFFER,this.segColours(s,a),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,null),this.coloursFor=c);let l=a.wLine*vu*(a.paint===`level`?cd:1),u=this.su;o.useProgram(this.segProg),o.uniform1i(this.su.u_no_bp,+!!W.blueprints),I(o,u,e),o.uniform2f(u.u_viewport,n[0],n[1]),o.uniform1i(u.u_sel,a.sel),o.uniform1i(u.u_hot,a.hot),this.litList.fill(-1),a.lit.slice(0,wu).forEach((e,t)=>this.litList[t]=e),o.uniform1iv(u.u_lit,this.litList),o.uniform1i(u.u_lit_n,Math.min(a.lit.length,wu)),o.uniform1f(u.u_dim,a.dim),o.uniform1f(u.u_extra,a.wSel*vu),o.uniform3fv(u.u_casing_rgb,a.casingRgb),o.uniform3fv(u.u_rail_rgb,a.rail),o.uniform3fv(u.u_track_rgb,a.trackRgb),o.uniform1f(u.u_rail,Math.max(1*i,a.railShare*l)),o.uniform1f(u.u_px_per_unit,B(r)*i),o.uniform1f(u.u_xfer,+(r>=13)),o.uniform1f(u.u_xfer_w,Lu*i),o.uniform3fv(u.u_xfer_rgb,z(a.shades.mapInk)),o.uniform1f(u.u_xfer_alpha,zu);let d=new Set(a.litStops),f=[];for(let e=0;e<s.linkStops.length&&f.length<Bu;e+=2)(d.has(s.linkStops[e])||d.has(s.linkStops[e+1]))&&f.push(e/2);let p=new Int32Array(Bu).fill(-1);if(p.set(f),o.uniform1iv(u.u_lit_links,p),o.uniform1i(u.u_lit_links_n,f.length),o.bindVertexArray(this.segVao),this.byId.has(a.sel)&&a.sel!==this.muted&&!this.byId.get(a.sel).ferry&&(o.getParameter(o.STENCIL_BITS)??0)>0){let e=1200*(s.k.get(a.sel)??1)*B(r)*i,t=.5*Su*i;o.uniform1i(u.u_pass,2),o.uniform1i(u.u_only,a.sel),o.uniform1f(u.u_alpha,1),o.enable(o.STENCIL_TEST),o.clearStencil(0),o.clear(o.STENCIL_BUFFER_BIT),o.colorMask(!1,!1,!1,!1),o.stencilOp(o.KEEP,o.KEEP,o.REPLACE);for(let[n,r]of[[1,e+t*2],[0,Math.max(0,e-t*2)]])r<=0||(o.stencilFunc(o.ALWAYS,n,255),o.uniform1f(u.u_width,r),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count));o.colorMask(!0,!0,!0,!0),o.stencilFunc(o.EQUAL,1,255),o.stencilOp(o.KEEP,o.KEEP,o.ZERO),o.uniform1f(u.u_alpha,xu),o.uniform1f(u.u_width,e+t*2),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count),o.disable(o.STENCIL_TEST)}let m=e=>{o.uniform1i(u.u_only,e),o.uniform1f(u.u_width,l),o.uniform1i(u.u_pass,0),o.uniform1f(u.u_add,a.casing*bu),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count),o.uniform1i(u.u_pass,1),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count)};m(-1),this.byId.has(a.sel)&&m(-2),s.laneFirst<s.count&&!this.traffic&&a.paint!==`level`&&r>=11&&this.drawLanes(s,a,l,i,r),r>=13&&(o.uniform1i(u.u_only,-3),o.uniform1f(u.u_width,l),o.uniform1i(u.u_pass,1),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count));let h=Math.max(Du*i,l*Tu),g=Math.max(Du*1.25*i,l*Eu);if(o.bindVertexArray(null),this.arrows=s.arrows.length/td,this.arrows&&r>=12&&!a.paint){let t=this.au,c=B(r)*$t(0,s.a)*i;o.useProgram(this.arrowProg),o.uniform1i(this.au.u_no_bp,+!!W.blueprints),I(o,t,e),o.uniform2f(t.u_viewport,n[0],n[1]),o.uniform3f(t.u_size,.5*l,.5*l+Math.max(Wu*i,Gu*l),a.casing*bu),o.uniform1f(t.u_every,ve(c,i,w,ed)),o.uniform1f(t.u_m_px,c),o.uniform1f(t.u_clear,Math.max(Du*1.25*i,l*Eu)+2*i),o.uniform1i(t.u_sel,a.sel),o.uniform1i(t.u_hot,a.hot),o.uniform1f(t.u_dim,a.dim),o.uniform3fv(t.u_casing_rgb,a.casingRgb),o.bindVertexArray(this.arrowVao),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,this.arrows),o.bindVertexArray(null)}this.style=a;let _=r>=13,v=r>=11;if(v&&s.stopCount){if(this.litAt=[],a.litStops.length){let e=new Set(a.litStops);for(let t=0;t<s.stopCount&&this.litAt.length<Vu;t++)e.has(s.stopId[t])&&this.litAt.push(t)}this.stopPass(e,n,a,l,h,g,_,this.stopVao,s.plainCount,0),this.last={rings:_,ends:v,ringR:h/i,endR:g/i}}}style=null;drawLanes(e,t,n,r,i){let a=this.gl,o=this.su,s=(a.getParameter(a.STENCIL_BITS)??0)>0;a.uniform1i(o.u_pass,5),a.uniform1i(o.u_only,-1),a.uniform1f(o.u_width,n),a.uniform3fv(o.u_lane_rgb,z(t.shades.brtLane)),a.uniform1f(o.u_lane_period,Zu*$t(0,e.a)*B(i)*r);let c=t.casing*bu,l=Math.max(r,t.railShare*n),u=Ju*r,d=Math.max($u*r,Qu*n);a.uniform1f(o.u_lane_edge,l);let f=Yu*r,p=[[0,c,c+2*d],[2,c+2*(d-l),c+2*d]];n*yu>=Xu*r&&p.unshift([1,-2*(f+u),-2*f]);for(let[t,n,r]of p){if(a.uniform1i(o.u_lane_kind,t),a.uniform1f(o.u_lane_in,s?-1e6:n),s){a.enable(a.STENCIL_TEST),a.clearStencil(0),a.clear(a.STENCIL_BUFFER_BIT),a.colorMask(!1,!1,!1,!1),a.stencilOp(a.KEEP,a.KEEP,a.REPLACE);for(let[t,i]of[[1,r],[0,n]])a.stencilFunc(a.ALWAYS,t,255),a.uniform1f(o.u_add,i),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.count);a.colorMask(!0,!0,!0,!0),a.stencilFunc(a.EQUAL,1,255),a.stencilOp(a.KEEP,a.KEEP,a.ZERO)}a.uniform1f(o.u_add,r),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.count),s&&a.disable(a.STENCIL_TEST)}}drawStationStops(e,t,n){let r=this.built,i=this.style,a=this.last;this.gl&&this.stopProg&&r&&i&&a&&r.stopCount!==r.plainCount&&this.onGpu===r&&this.stopPass(e,t,i,i.wLine*vu,a.ringR*n,a.endR*n,a.rings,this.stationStopVao,r.stopCount-r.plainCount,r.plainCount)}litAt=[];litList32=new Int32Array(Vu);stopPass(e,t,n,r,i,a,o,s,c,l){if(!c)return;let u=this.gl,d=this.pu;u.useProgram(this.stopProg),u.uniform1i(this.pu.u_no_bp,+!!W.blueprints),I(u,d,e),this.litList32.fill(-1),this.litList32.set(this.litAt),u.uniform1iv(d.u_lit_stops,this.litList32),u.uniform1i(d.u_lit_stops_n,this.litAt.length),u.uniform1i(d.u_base,l),u.uniform2f(d.u_viewport,t[0],t[1]),u.uniform2f(d.u_r,i,a),u.uniform3fv(d.u_rail_rgb,n.rail),u.uniform3fv(d.u_fill,n.fill),u.uniform1f(d.u_rim,Math.max(1,.45*r)),u.bindVertexArray(s),u.uniform1f(d.u_rings,+!!o),u.uniform1f(d.u_keep,yn.peek()?1:-1),u.drawArraysInstanced(u.TRIANGLE_STRIP,0,4,c),u.bindVertexArray(null)}lineAt(e,t,n){if(!this.lines.length)return-1;let r=this.local(Ne());if(!r.pickCount)return-1;let[i]=Y(e,r.seg,r.pickCount,t,n,37);return i<0?-1:r.info[i*4]}linesAt(e,t,n,r,i){if(!this.lines.length)return[];let a=this.local(Ne()),o=[];for(;o.length<r&&a.pickCount;){let[r]=Y(e,a.seg,a.pickCount,t,n,37,void 0,0,e=>!i(a.info[e*4])&&!o.includes(a.info[e*4]));if(r<0)break;o.push(a.info[r*4])}return o}stretchAt(e,t,n,r){let i=this.local(Ne()),a=i.range.get(r),o=e.screenToLocal(t,n);if(!a||!a[1]||!o)return-1;let s=this.stopsAlong(i,r);return s?_d(s,md(i,a,o[0],o[1])):-1}stopsAlong(e,t){let n=this.byId.get(t),r=e.range.get(t);if(!n||!r||!r[1])return null;let i=e.stopAlong.get(t);if(!i){i=[];let a=r[0];for(let t=0;t+1<n.marks.length;t+=2){let[o,s]=pt(n.marks[t],n.marks[t+1],e.a),[c,l]=pd(e,a,r[0]+r[1],o,s);i.push(c),a=l}e.stopAlong.set(t,i)}return i}setTraffic(e){e!==this.traffic&&(this.traffic=e,this.widthsFor=null,this.version++)}traffic=null;widthsFor=null;wBuf=null;segWidths(e){let t=new Float32Array(e.count).fill(1);for(let n=e.laneFirst;n<e.count;n++)this.byId.get(e.info[n*4])?.brt&&(t[n]=yu);let n=this.traffic;if(!n){for(let n of this.lines){let r=n.brt&&e.range.get(n.id);r&&t.fill(yu,r[0],r[0]+r[1])}return t}for(let[r,i]of n){let n=e.range.get(r),a=n&&this.stopsAlong(e,r);if(n&&a&&i.length===a.length-1)for(let r=n[0];r<n[0]+n[1];r++){let n=e.cum[r]+.5*Math.hypot(e.seg[r*4+2]-e.seg[r*4],e.seg[r*4+3]-e.seg[r*4+1]);t[r]=(i[_d(a,n)]??vu)/vu}}return t}setProfit(e){e!==this.profit&&(this.profit=e,this.version++)}profit=null;cBuf=null;coloursFor=[];keyframes=null;segColours(e,t){let n=new Float32Array(e.count).fill(-1);if(!t.paint)return n;if(t.paint===`level`)return n.fill(ld(vn[0]));t.paint===`speed`&&(this.keyframes={phases:t.phases,meta:t.meta});for(let r of this.lines){let i=e.range.get(r.id),a=i&&this.stopsAlong(e,r.id);if(!r.built||!i||!a)continue;for(let t=i[0]+i[1];t<e.pickCount&&e.info[t*4]===r.id;t++)n[t]=-2;let o=this.profit?.get(r.id)?.ratio;for(let s=i[0];s<i[0]+i[1];s++){let i=e.cum[s]+.5*Math.hypot(e.seg[s*4+2]-e.seg[s*4],e.seg[s*4+3]-e.seg[s*4+1]),c=_d(a,i),l=null;t.paint===`speed`?(l=gd(r,c,a[c+1]>a[c]?(i-a[c])/(a[c+1]-a[c]):.5,t.phases,t.meta),n[s]=l===null?-2:ld(be(l))):(l=o&&c<o.length&&o[c]<1e29?o[c]:null,n[s]=l===null?-2:ld(k(l)))}}return n}speedAt(e,t,n,r){let i=this.local(Ne()),a=this.byId.get(r),o=i.range.get(r),s=e.screenToLocal(t,n),c=a&&this.stopsAlong(i,r);if(!a||!o||!c||!s||!this.keyframes)return null;let l=md(i,o,s[0],s[1]),u=_d(c,l);return gd(a,u,c[u+1]>c[u]?Math.max(0,Math.min(1,(l-c[u])/(c[u+1]-c[u]))):.5,this.keyframes.phases,this.keyframes.meta)}stopAt(e,t,n){let r=this.last,i=this.built;if(!r||!i||!i.stopCount)return null;let a=fd;for(let o=i.stopCount-1;o>=0;o--){let s=i.stopEnd[o]===1;if(s?!r.ends:!r.rings)continue;e.toScreenInto(i.stops[o*4],i.stops[o*4+1],a,0);let c=(s?r.endR:r.ringR)+3;if((a[0]-t)**2+(a[1]-n)**2<=c*c)return{line:i.stopLine[o],end:s,id:i.stopId[o]}}return null}},fd=new Float64Array(2);function pd(e,t,n,r,i){let a=1/0,o=0,s=t;for(let c=t;c<n;c++){let t=e.seg[c*4],n=e.seg[c*4+1],l=e.seg[c*4+2]-t,u=e.seg[c*4+3]-n,d=l*l+u*u,f=d?Math.max(0,Math.min(1,((r-t)*l+(i-n)*u)/d)):0,p=Math.hypot(t+f*l-r,n+f*u-i);p<a&&(a=p,o=e.cum[c]+f*Math.sqrt(d),s=c)}return[o,s]}var md=(e,t,n,r)=>pd(e,t[0],t[0]+t[1],n,r)[0];function hd(e,t,n,r){let i=n[0],a=n[0]+n[1]-1;for(;i<a;){let e=i+a+1>>1;t[e]<=r?i=e:a=e-1}let o=e[i*4],s=e[i*4+1],c=e[i*4+2]-o,l=e[i*4+3]-s,u=Math.hypot(c,l),d=u>0?Math.max(0,Math.min(1,(r-t[i])/u)):0;return[o+d*c,s+d*l]}function gd(e,t,n,r,i){let a=e.stopS,o=a?.[0].length??0;if(!a||t<0||t>o-2)return null;let s=null;for(let c of[0,1]){let l=_n(e.id,c,Te[1])*4,u=i[l],d=i[l+1];if(!(d>0))continue;let f=c===0?t:o-2-t,p=c===0?n:1-n,m=a[c][f]+p*(a[c][f+1]-a[c][f]);s=Math.max(s??0,Xe(r,u,d,m))}return s}function _d(e,t){let n=-1;for(let r of e)r<=t&&n++;return Math.max(0,Math.min(e.length-2,n))}function vd(e,t,n=null){let r=e.save.lines.find(e=>e.num===t);if(!r)return f(`busLayer.line`,{num:t});let i=Object.assign(document.createElement(`span`),{textContent:r.name}),a=Qo(r,!0);if(n===null)return ts(a,i);let o=Object.assign(document.createElement(`span`),{className:`bullet-heading`});return o.append(a,es(r.colour,n)),ts(o,i)}function yd(e){let t=document.createElement(`span`);return t.className=`tag-vehicle`,t.setAttribute(`aria-label`,f(e===`ferry`?`busLayer.ferryLine`:`busLayer.busLine`)),en(Fi[e](),t),t}function bd(e,t,n=[]){let r=e.save.lines.find(e=>e.num===t),i=r?e.lineStats[r.id]?.bus:void 0,a=!i||i.built,o=vd(e,t);typeof o!=`string`&&o.append(yd(i?.ferry?`ferry`:`bus`));let s=i&&!i.ferry&&i.lanes.length>0&&i.lanes[0]<2?[f(`busLayer.brtBlueprint`)]:[];return a?[o,...s,...n]:[o,f(`busLayer.notRunning`),...s]}function xd(e,t,n,r,i){let a=e.save.lines.find(e=>e.num===t),o=a&&r!==void 0&&r>=0?e.lineStats[a.id]?.oneWayAt[String(r)]:void 0,s=o!==void 0&&i?a&&e.lineStats[a.id]?.bus?.stops.find(e=>e.id===r):void 0,c=r!==void 0&&r>=0?[...new Set(Ss(e,r)?.stops.map(e=>e.line)??[])].filter(e=>e!==t):[];return[f(n?`busLayer.endOfLine`:`busLayer.busStop`),vd(e,t,s&&i&&o!==void 0?au(i,s.x,s.y,o):null),...c.map(t=>vd(e,t))]}var Sd=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
in vec4 a_lot;     // centre (local), half its length along it as a vector (local)
in vec4 a_dim;     // half length m, half depth m, bays, flags
out vec2 v_p;      // in the lot's frame, px
flat out vec4 v_dim; // half length m, half depth m, bays, px a metre
flat out float v_alpha;
void main() {
  vec2 half_vp = u_viewport * 0.5;
  vec4 c = project(a_lot.xy);
  vec4 e = project(a_lot.xy + a_lot.zw);
  vec4 q = project(a_lot.xy + vec2(-a_lot.w, a_lot.z));
  vec2 cs = c.xy / c.w * half_vp;
  vec2 axis = e.xy / e.w * half_vp - cs, nrm = q.xy / q.w * half_vp - cs;
  float len = length(axis);
  if (len < 1e-6) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 along = axis / len, across = length(nrm) > 1e-6 ? normalize(nrm) : vec2(-along.y, along.x);
  float k = len / a_dim.x;
  int flags = int(a_dim.w + 0.5);
  v_alpha = (flags & 2) != 0 ? 0.3 : (flags & 1) != 0 ? 0.6 : 1.0;
  v_dim = vec4(a_dim.xyz, k);
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  v_p = corner * (a_dim.xy * k + 1.0);
  c.xy += (along * v_p.x + across * v_p.y) / half_vp * c.w;
  gl_Position = c;
}`,Cd=`#version 300 es
precision highp float;
uniform vec3 u_fill;
uniform vec3 u_line;
uniform float u_dpr;
in vec2 v_p;
flat in vec4 v_dim;
flat in float v_alpha;
out vec4 o;
// how far a point is from the nearest of lines every \`step\` m, px
float grid(float m, float step, float k) { return abs(fract(m / step + 0.5) - 0.5) * step * k; }
void main() {
  float k = v_dim.w, hl = v_dim.x, hd = v_dim.y;
  float edge = max(abs(v_p.x) - hl * k, abs(v_p.y) - hd * k);
  float cover = clamp(0.5 - edge, 0.0, 1.0);
  if (cover <= 0.0) discard;
  float lw = max(0.75, 0.6 * u_dpr);
  float ink = clamp(lw + 0.5 + edge, 0.0, 1.0);
  vec2 m = v_p / k + vec2(hl, hd);
  // a bay: a row of spaces, the aisle, a row; spaces' side lines across each row
  float t = mod(m.y, ${16 .toFixed(1)});
  float inRow = t < ${5 .toFixed(1)} || t > ${11 .toFixed(1)} ? 1.0 : 0.0;
  float spaces = smoothstep(2.5 * u_dpr, 4.5 * u_dpr, ${E.toFixed(1)} * k) * inRow * clamp(0.5 * lw + 0.5 - grid(m.x, ${E.toFixed(1)}, k), 0.0, 1.0);
  // the line where two bays' rows meet back to back
  float heads = m.y > 1.0 && m.y < 2.0 * hd - 1.0 ? smoothstep(4.0 * u_dpr, 8.0 * u_dpr, ${16 .toFixed(1)} * k) * clamp(0.5 * lw + 0.5 - grid(m.y, ${16 .toFixed(1)}, k), 0.0, 1.0) : 0.0;
  vec3 col = mix(u_fill, u_line, max(ink, max(spaces, heads)));
  float a = cover * v_alpha;
  o = vec4(col * a, a);
}`,wd=class{gl;prog=null;u={};vao=null;buf=null;count=0;lots=new Float32Array;init(e){this.gl=e,this.vao=this.buf=null,this.count=0,this.prog=v(e,Sd,Cd,`car parks`),this.prog&&(this.u=L(e,this.prog,[...R,`u_viewport`,`u_fill`,`u_line`,`u_dpr`]))}setNetwork(e){let t=this.gl;if(this.lots=e??new Float32Array,this.vao&&t.deleteVertexArray(this.vao),this.buf&&t.deleteBuffer(this.buf),this.vao=this.buf=null,this.count=this.lots.length/10,this.count&&this.prog){this.vao=t.createVertexArray(),this.buf=t.createBuffer(),t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.buf),t.bufferData(t.ARRAY_BUFFER,this.lots,t.STATIC_DRAW);for(let[e,n]of[[`a_lot`,0],[`a_dim`,16]]){let r=t.getAttribLocation(this.prog,e);t.enableVertexAttribArray(r),t.vertexAttribPointer(r,4,t.FLOAT,!1,40,n),t.vertexAttribDivisor(r,1)}t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null)}}draw(e,t,n){if(!this.count||!this.vao)return;let r=this.gl,i=this.u,a=ks();r.useProgram(this.prog),I(r,i,e),r.uniform2f(i.u_viewport,t[0],t[1]),r.uniform3fv(i.u_fill,z(a.lot)),r.uniform3fv(i.u_line,z(a.lotLine)),r.uniform1f(i.u_dpr,n),r.bindVertexArray(this.vao),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,this.count),r.bindVertexArray(null)}at(e,t,n){for(let r=this.count-1;r>=0;r--){let i=r*10,a=this.lots,[o,s]=n(a[i],a[i+1]),[c,l]=n(a[i]+a[i+2],a[i+1]+a[i+3]),[u,d]=n(a[i]-a[i+3]*a[i+5]/a[i+4],a[i+1]+a[i+2]*a[i+5]/a[i+4]),f=c-o,p=l-s,m=u-o,h=d-s,g=Math.hypot(f,p),_=Math.hypot(m,h);if(g<1e-6||_<1e-6)continue;let v=((e-o)*f+(t-s)*p)/g,y=((e-o)*m+(t-s)*h)/_;if(Math.abs(v)<=g+1&&Math.abs(y)<=_+1)return r}return-1}},Td=e=>e<4?-1:e-e%4+1-e%4,Ed=.3,Dd=1200,Od=900,kd=150,Ad=10,jd=1,Md=2**26,Nd=.2,Pd=300,Fd=5,Id=class{lag=new Float32Array;prevS=new Float64Array;waitRes=new Int32Array;waitFrom=new Float64Array;waiting=!1;trips=null;epoch=NaN;net=null;guardedTrack=new Uint8Array;guardedAll=new Uint8Array;guarded=new Uint8Array;trackBase=new Uint8Array;allBase=new Uint8Array;baysFor=null;crossOn=new Map;moveIdx=new Map;moveRes=[];movePairs=new Set;nCross=0;tauCache=new Map;tauPhases=null;singleOn=new Map;singleCache=new Map;singlePhases=null;singleHeld=0;singleLetOn=0;lastTime=NaN;nextIndex=new Map;guardedCount=0;heldCount=0;conflictHeld=0;conflictWaitMax=0;conflictLongest=0;conflictWaits=0;conflictWaitSum=0;conflictLetThrough=0;boxes=null;seen=new Uint8Array;placeLog=null;log=null;passStops=new Map;passThrough=new Map;passedBy=0;crossings=!Le(`crossWait`);singles=!Le(`singleWait`);singleWait=new Set;resetCounts(){this.conflictLongest=0,this.conflictWaits=0,this.conflictWaitSum=0,this.conflictLetThrough=0,this.passedBy=0,this.singleLetOn=0}setNetwork(e){if(e===this.net)return;this.net=e,this.passStops.clear(),this.passThrough.clear();let t=e.passing;if(t)for(let e=0;e+7<=t.length;e+=7){let n=t[e];if(t[e+4]===1){let r=[t[e+1],t[e+2],t[e+3],t[e+5],t[e+6]],i=this.passStops.get(n);i?i.push(...r):this.passStops.set(n,r)}else{let r=this.passThrough.get(n);r?r.set(t[e+3],t[e+1]):this.passThrough.set(n,new Map([[t[e+3],t[e+1]]]))}}this.crossOn.clear(),this.moveIdx.clear(),this.moveRes=[],this.movePairs.clear(),this.tauCache.clear(),this.singleOn.clear(),this.singleCache.clear(),this.boxes=null;let n=e.pathTable,r=e.pathEntry,i=e.lineTable.length/4|0;if(this.guardedTrack=new Uint8Array(i),this.guardedAll=new Uint8Array(i),this.guarded=this.guardedTrack,!n||!r)return;this.readConflicts(e.conflicts);let a=e.meta.length/680,o=e=>a>0&&e>=a?e-a:e,s=new Map,c=new Set;for(let e=0;e<i&&2*e+1<n.length;e++){let t=n[2*e],i=n[2*e+1],a=o(e);for(let e=t;e<t+i;e++){let t=r[e];for(let e of[t,t^1]){let t=s.get(e);t===void 0?s.set(e,a):t!==a&&c.add(e)}}}for(let t=0;t<i&&2*t+1<n.length;t++){let i=n[2*t],a=n[2*t+1],s=o(t);if(!((e.lineCars?.[s]??8)<1))for(let e=i;e<i+a;e++){if(c.has(r[e])||c.has(r[e]^1)){this.guardedTrack[s]=this.guardedAll[s]=1;break}(this.crossOn.has(r[e]>>1)||e+1<i+a&&(this.moveIdx.has(r[e]*Md+r[e+1])||this.moveIdx.has((r[e+1]^1)*Md+(r[e]^1))))&&(this.guardedAll[s]=1)}}this.singles&&this.readSingles(e.singles,i);for(let t of this.singleOn.keys())(e.lineCars?.[o(t)]??8)>=1&&(this.guardedTrack[o(t)]=this.guardedAll[o(t)]=1);this.trackBase=this.guardedTrack.slice(),this.allBase=this.guardedAll.slice(),this.baysFor=null;let l=this.boxes=new Float32Array(i*4);for(let t=0;t<i;t++){if((e.lineCars?.[t]??8)<1)continue;let n=e.lineTable[t*4],r=e.lineTable[t*4+1],i=1/0,a=1/0,s=-1/0,c=-1/0;for(let t=n;t<n+r;t++){let n=e.samples[t*2],r=e.samples[t*2+1];n<i&&(i=n),n>s&&(s=n),r<a&&(a=r),r>c&&(c=r)}l.set([i,a,s,c],t*4);let u=o(t);u!==t&&r>0&&l.set([Math.min(i,l[u*4]),Math.min(a,l[u*4+1]),Math.max(s,l[u*4+2]),Math.max(c,l[u*4+3])],u*4)}}readSingles(e,t){let n=this.net,r=n.pathTable,i=n.pathEntry,a=n.pathFrom,o=n.pathLen;if(!e||!e[0]||!a||!o)return;let s=new Map,c=[];for(let t=0,n=1;t<e[0];t++){let r=e[n++];c.push(e[n]);for(let i=0;i<r;i++)s.set(e[n+i],t);n+=r}for(let e=0;e<t&&2*e+1<r.length;e++){let t=r[2*e],n=r[2*e+1],l=[];for(let e=t;e<t+n;){let r=s.get(i[e]>>1);if(r===void 0){e++;continue}let u=e,d=-1;for(;u<t+n&&s.get(i[u]>>1)===r;)i[u]>>1===c[r]&&(d=i[u]&1),u++;d>=0&&l.push(r,a[e],a[u-1]+o[u-1],d),e=u}l.length&&this.singleOn.set(e,l)}}readConflicts(e){if(this.nCross=0,!e||!e.length)return;let t=0,n=e[t++];for(let r=0;r<n;r++,t+=4)for(let[n,i]of[[e[t],e[t+1]],[e[t+2],e[t+3]]]){let e=this.crossOn.get(n);e?e.push(r,i):this.crossOn.set(n,[r,i])}this.nCross=n;let r=e[t++]??0,i=new Map,a=[],o=(e,t,r)=>{let a=t*Md+r,o=this.moveIdx.get(a);if(o===void 0){o=this.moveRes.length,this.moveIdx.set(a,o);let t=i.get(e);t===void 0&&i.set(e,t=n+i.size),this.moveRes.push(t)}return o};for(let n=0;n<r;n++,t+=5)a.push(o(e[t],e[t+1],e[t+2]),o(e[t],e[t+3],e[t+4]));let s=this.moveRes.length;for(let e=0;e<a.length;e+=2)this.movePairs.add(a[e]*s+a[e+1]),this.movePairs.add(a[e+1]*s+a[e])}placeLines(e){let t=e.bays??null;if(t===this.baysFor||this.trackBase.length!==this.guardedTrack.length)return!1;if(this.baysFor=t,this.guardedTrack.set(this.trackBase),this.guardedAll.set(this.allBase),!t)return!0;let n=this.guardedTrack.length,r=this.net?.lineCars;for(let i=0;i<e.trips.length/2;i++){if(t[i*4+2]<4)continue;let a=u(e.trips[i*2]);a<n&&(r?.[a]??8)>=1&&(this.guardedTrack[a]=this.guardedAll[a]=1)}return!0}remap(e){let t=e.trips.length/2,n=new Float32Array(t),r=new Float64Array(t).fill(NaN),i=new Int32Array(t).fill(-1),a=new Float64Array(t),o=this.trips;if(o&&this.lag.length){let s=new Map;for(let e=0;e<this.lag.length;e++)(this.lag[e]>0||!Number.isNaN(this.prevS[e]))&&s.set(`${o[e*2]}|${Math.round((o[e*2+1]+this.epoch)*100)}`,e);if(s.size)for(let o=0;o<t;o++){let t=s.get(`${e.trips[o*2]}|${Math.round((e.trips[o*2+1]+e.epoch)*100)}`);t!==void 0&&(n[o]=this.lag[t],r[o]=this.prevS[t],i[o]=this.waitRes[t],a[o]=this.waitFrom[t]+this.epoch-e.epoch)}}this.lag=n,this.prevS=r,this.waitRes=i,this.waitFrom=a,this.trips=e.trips,this.epoch=e.epoch,this.nextIndex.clear();for(let n=0;n<t;n++){let t=u(e.trips[n*2]);this.guardedAll[t]&&this.nextIndex.set((t*2+Oe(e.trips[n*2]))*1e7+Math.round(e.trips[n*2+1]*100),n)}}update(e){let t=this.net;if(!t||!t.pathTable||!t.pathEntry||!t.pathFrom||!t.pathLen)return!1;let n=this.crossings&&e.close!==!1;this.guarded=n?this.guardedAll:this.guardedTrack,(this.placeLines(e)||e.trips!==this.trips||e.epoch!==this.epoch)&&this.remap(e),!n&&this.waiting&&(this.waitRes.fill(-1),this.waiting=!1),this.waiting=n;let r=e.time-this.lastTime;this.lastTime=e.time;let i=this.lag,a=this.prevS,o=!1;if(!(r>=0&&r<=Od)){for(let e=0;e<i.length;e++)i[e]&&(i[e]=0,o=!0);a.fill(NaN),this.waitRes.fill(-1)}let s=r>=0&&r<=Od?Ed*r:0,c=e.time-e.epoch,l=t.pathTable,d=t.pathEntry,f=t.pathFrom,p=t.pathLen,m=t.meta,h=[],g=[],_=[],v=[],y=e.trips.length/2,b=-150,x=e.w+kd,S=e.h+kd,C=this.seen.length===this.guarded.length?this.seen.fill(2):this.seen=new Uint8Array(this.guarded.length).fill(2),w=this.boxes;for(let n=0;n<y;n++){let r=e.trips[n*2],l=u(r),d=i[n],f=d>s?d-s:0;if(this.guarded[l]&&C[l]===2&&(C[l]=1,e.project&&w)){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of[[w[l*4],w[l*4+1]],[w[l*4+2],w[l*4+1]],[w[l*4],w[l*4+3]],[w[l*4+2],w[l*4+3]]]){let s=e.project(a,o);t=Math.min(t,s[0]),r=Math.max(r,s[0]),n=Math.min(n,s[1]),i=Math.max(i,s[1])}Number.isFinite(t+r+n+i)&&(r<b||t>x||i<b||n>S)&&(C[l]=0)}if(!this.guarded[l]||!C[l]){d&&(i[n]=f,o=!0),a[n]=NaN;continue}let p=c-e.trips[n*2+1]-f,y=e.ends?e.ends[n]:-1/0;if(m[r*4+1]<.5||p<0||p>m[r*4+2]&&c>y){d!==f&&(i[n]=f,o=!0),a[n]=NaN;continue}let T=Ct(t,r,p),{geo:E,d:D}=bn(t,r,T);if(e.project&&!(this.singles&&(this.singleOn.has(l)||this.singleOn.has(E)))){let r=t.lineTable[E*4],s=t.lineTable[E*4+1],c=t.lineTable[E*4+3],l=r+Math.max(0,Math.min(s-1,Math.round(D/c))),u=e.project(t.samples[l*2],t.samples[l*2+1]),p=u[0],m=u[1];if(!(p>=b&&p<=x&&m>=b&&m<=S)){d!==f&&(i[n]=f,o=!0),a[n]=NaN;continue}}h.push(n),g.push(T),_.push(Math.min(Math.max(1,cn(t.lineCars?.[l]??8))*20,m[r*4+3])/2),v.push(p),d!==f&&(i[n]=f,o=!0)}if(this.guardedCount=h.length,this.heldCount=0,this.conflictHeld=0,this.conflictWaitMax=0,h.length<2)return h.length&&(a[h[0]]=g[0]),o;this.singleWait.clear(),this.singles&&this.singleOn.size&&this.holdOnSingles(e,h,g,_,v)&&(o=!0),n&&(this.crossOn.size||this.moveRes.length)&&this.holdAtConflicts(e,h,g,_,v)&&(o=!0);let T=new Map,E=g.slice();for(let n=0;n<h.length;n++){let r=h[n],i=e.trips[r*2],o=u(i),{geo:s,gr:c}=bn(t,i,0);if(!this.guardedTrack[o]&&v[n]>=m[i*4+2]||e.bays&&e.bays[r*4+2]>=0&&v[n]>=tt(t,i))continue;let y=m[i*4+3],b=l[s*2],x=l[s*2+1],S=a[r],C=Math.min(g[n],Number.isNaN(S)?g[n]:S)-_[n],w=g[n]+_[n]+30+10,E=c===0?C:y-w,D=c===0?w:y-C,O=zd(f,b,b+x,E)-1;for(O<b&&(O=b);O<b+x&&f[O]<=D;O++){let e=p[O];if(f[O]+e<E)continue;let t=c===0?d[O]:d[O]^1,r=c===0?f[O]:y-f[O]-e;Rd(T,t,n,-r,e)}}let D=[];for(let e of T.values()){if(e.length<2*Ld)continue;let t=e.length/Ld,n=Array.from({length:t},(e,t)=>t),r=n.map(t=>{let n=e[t*Ld],r=a[h[n]];return(Number.isNaN(r)?g[n]:Math.min(r,g[n]))+e[t*Ld+1]+_[n]});n.sort((t,n)=>r[n]-r[t]||e[t*Ld]-e[n*Ld]);let i=[];for(let t of n)for(let n=0;n<Ld;n++)i.push(e[t*Ld+n]);D.push(i)}let O=(e,t,n)=>{let r=E[e]+t-_[e];return r<n&&r+2*_[e]>0?Math.max(r,0):1/0},k=this.passStops.size?this.outerAt(e,h,g,_):null,A=(t,n)=>{let r=e.trips[h[t]*2],i=e.trips[h[n]*2];return k[t]>=0&&!!this.passThrough.get(u(i))?.has(k[t])||k[n]>=0&&!!this.passThrough.get(u(r))?.has(k[n])};k&&this.waitForPassing(e,h,g,k,v,c)&&(o=!0);let j=k?D.map(e=>{for(let t=0;t<e.length;t+=Ld)if(k[e[t]]>=0)return!0;return!1}):null;for(let e=0;e<6;e++){let t=!1;if(D.forEach((n,r)=>{let i=1/0;for(let a=0;a<n.length;a+=Ld){let o=n[a],s=n[a+1],c=n[a+2],l=i;if(j?.[r]){l=1/0;for(let t=0;t<a;t+=Ld)A(o,n[t])?e===0&&this.passedBy++:l=Math.min(l,O(n[t],n[t+1],n[t+2]))}if(l<1/0){let e=l-30-s-_[o];E[o]>e+1e-6&&(E[o]=e,t=!0)}i=Math.min(i,O(o,s,c))}}),!t)break}e.bays&&this.holdForPlaces(e,h,g,_,v,E);for(let n=0;n<h.length;n++){let r=h[n],s=e.trips[r*2];if(E[n]<g[n]-.001){let a=Bd(t,s,Math.max(0,E[n]),v[n]),l=Math.min(Dd,c-e.trips[r*2+1]-a);l>i[r]&&(i[r]=l,o=!0),this.heldCount++}if(a[r]=E[n]<g[n]-.001?Ct(t,s,c-e.trips[r*2+1]-i[r]):g[n],i[r]>0&&e.ends&&e.nexts){let t=e.trips[r*2+1]+m[s*4+2]+i[r],n=e.nexts[r];if(t>e.ends[r]&&Number.isFinite(n)){let e=e=>this.nextIndex.get((u(s)*2+e)*1e7+Math.round(n*100)),r=e(1-Oe(s))??e(Oe(s));r!==void 0&&i[r]<Math.min(Dd,t-n)&&(i[r]=Math.min(Dd,t-n),o=!0)}}}return o}holdForPlaces(e,t,n,r,i,o){let s=e.bays,c=this.net,l=c.meta,u=this.prevS,d=t.map((t,n)=>i[n]>=tt(c,e.trips[t*2])),f=new Set;for(let e=0;e<t.length;e++){let i=t[e]*4;d[e]&&s[i+2]>=4?f.add(s[i+2]):s[i]>=4&&n[e]-r[e]<Math.max(a(s[i+1]),2*r[e]+5)&&f.add(Td(s[i]))}if(f.size)for(let c=0;c<t.length;c++){let p=t[c],m=e.trips[p*2],h=p*4,g=s[h+2];if(g<4||!f.has(g)||d[c])continue;let _=!1;for(let e=0;e<t.length&&!_;e++){if(e===c||this.singleWait.has(t[e]))continue;let i=t[e]*4;_=s[i+2]===g&&d[e]||Td(s[i])===g&&n[e]-r[e]<Math.max(a(s[i+1]),2*r[e]+5)}if(!_)continue;let v=l[m*4+3]-Math.max(a(s[h+3]),2*r[c]+5)-50-30-r[c];(Number.isNaN(u[p])?n[c]:u[p])>v+1||o[c]>v&&(this.placeLog&&this.placeLog.length<40&&this.placeLog.push({t:e.time,i:p,place:g,s:+n[c].toFixed(0),L:l[m*4+3],lag:this.lag[p],who:t.map((t,a)=>[t,s[t*4],s[t*4+2],+!!d[a],+(n[a]-r[a]).toFixed(0),+i[a].toFixed(0),+this.lag[t].toFixed(0),e.trips[t*2]]).filter(e=>Td(e[1])===g||e[2]===g)}),o[c]=Math.max(0,v))}}holdAtConflicts(e,t,n,r,i){let a=this.net,o=a.pathTable,s=a.pathEntry,c=a.pathFrom,l=a.pathLen,d=a.meta,f=this.lag,p=this.prevS,m=this.waitRes,h=this.waitFrom;this.tauPhases!==a.phases&&(this.tauCache.clear(),this.tauPhases=a.phases);let g=e.time-e.epoch,_=t.map(t=>(a.lineCars?.[u(e.trips[t*2])]??8)%1===Ot),v=new Map,y=(e,t,n,r)=>{let i=v.get(e);i?i.push(t,n,r):v.set(e,[t,n,r])};for(let i=0;i<t.length;i++){let u=t[i],f=e.trips[u*2],{geo:m,gr:h}=bn(a,f,0),g=d[f*4+3],_=o[m*2],v=o[m*2+1],b=p[u],x=n[i],S=r[i],C=Math.min(x,Number.isNaN(b)?x:b)-S-Ad,w=x+3*S+40+Ad+1,T=h===0?C:g-w,E=h===0?w:g-C,D=zd(c,_,_+v,T)-1;for(D<_&&(D=_);D<_+v&&c[D]<=E;D++){let e=l[D];if(c[D]+e<T)continue;let t=s[D],n=h===0?c[D]:g-c[D]-e,r=this.crossOn.get(t>>1);if(r)for(let a=0;a<r.length;a+=2){let o=r[a+1]*e,s=n+((h===0?t:t^1)&1?e-o:o);s>C&&s<=w&&y(r[a],i,t>>1,s)}if(D+1<_+v){let e=h===0?c[D+1]:g-c[D+1];if(e>C&&e<=w){let t=this.moveIdx.get(h===0?s[D]*Md+s[D+1]:(s[D+1]^1)*Md+(s[D]^1));t!==void 0&&y(this.moveRes[t],i,t,e)}}}}let b=(n,i)=>{let o=t[n],s=e.trips[o*2],[c,l]=this.tauAt(a,s,i,r[n]),u=e.trips[o*2+1]+f[o];return[u+c,e.ends&&l>=d[s*4+2]-.001?Math.max(u+l,e.ends[o]):u+l]},x=!1,S=this.moveRes.length,C=[],w=[],T=new Map,E=new Set,D=(n,i)=>p[t[n]]>i-r[n]-20+2||this.tauAt(a,e.trips[t[n]*2],i,r[n])[0]===0;for(let e of v.values())for(let t=0;t<e.length;t+=3)D(e[t],e[t+2])&&E.add(e[t]);for(let r=0,o=!0;o&&r<3;r++){o=!1,this.conflictHeld=0,this.conflictWaitMax=0;for(let[r,s]of v){if(s.length<6)continue;let c=r<this.nCross,l=(e,t)=>c?e!==t:this.movePairs.has(e*S+t),u=!1;for(let e=3;e<s.length&&!u;e+=3)for(let t=0;t<e&&!u;t+=3)u=l(s[e+1],s[t+1]);if(!u)continue;C.length=0,w.length=0;for(let e=0;e<s.length;e+=3){let n=s[e],i=s[e+2],a=t[n],[o,c]=b(n,i);D(n,i)?(C.push(n,s[e+1],-1/0,c),m[a]===r&&(m[a]=-1)):w.push(e,o)}if(!w.length)continue;let d=Array.from({length:w.length/2},(e,t)=>t),p=e=>+!E.has(s[w[e*2]]),v=e=>+!!_[s[w[e*2]]];d.sort((e,t)=>v(e)-v(t)||p(e)-p(t)||w[e*2+1]-w[t*2+1]||w[e*2]-w[t*2]);for(let c of d){let u=w[c*2],d=s[u],p=s[u+1],v=s[u+2],y=t[d],S=e.trips[y*2],[E,D]=b(d,v),O=D-E,k=T.get(d);if(k&&k[0]!==r&&k[1]<D){E<g&&g-E<=240&&f[y]<=480&&(f[y]=Math.min(Dd,f[y]+g-E),i[d]=g-e.trips[y*2+1]-f[y],n[d]=Ct(a,S,i[d]),x=o=!0);continue}let A=E;for(let e=!0,t=0;e&&t<8;t++){e=!1;for(let t=0;t<C.length;t+=4)C[t+3]<=A||C[t]===d||!l(p,C[t+1])||(_[d]?_[C[t]]?A=C[t+3]:C[t+2]<A+O&&(A=C[t+3],e=!0):_[C[t]]||(A=C[t+3]))}if(A<=E+1e-6){C.push(d,p,E,E+O),m[y]===r&&this.endWait(y,E),k?.[0]===r&&T.delete(d);continue}if((!k||E<k[1])&&(T.set(d,[r,E]),k?.[0]!==r&&(o=!0)),m[y]<0&&(h[y]=E),m[y]=r,A-h[y]>240||f[y]>480){if(C.push(d,p,E,E+O),h[y]!==-1/0){this.conflictLetThrough++;let i=E-h[y];if(i>this.conflictLongest&&(this.conflictLongest=i),this.log){let i=[];for(let r=0;r<C.length-4;r+=4)C[r+3]>E&&l(p,C[r+1])&&i.push(e.trips[t[C[r]]*2],+(C[r+3]-g).toFixed(0),+n[C[r]].toFixed(0));this.log.push({res:r,p:S,s:+n[d].toFixed(0),sx:+v.toFixed(0),wait:+(A-h[y]).toFixed(0),by:i})}h[y]=-1/0}T.get(d)?.[0]===r&&T.delete(d);continue}let j=Math.min(A,g)-E;if(j>0){let t=Math.min(Dd,f[y]+j);t-f[y]>.001&&(o=!0),t!==f[y]&&(f[y]=t,x=!0),i[d]=g-e.trips[y*2+1]-f[y],n[d]=Ct(a,S,i[d])}C.push(d,p,A,A+O),A<=g?(this.endWait(y,A),T.get(d)?.[0]===r&&T.delete(d)):E<=g&&(this.conflictHeld++,this.conflictWaitMax=Math.max(this.conflictWaitMax,g-h[y]))}}}for(let e=0;e<t.length;e++){let n=t[e];m[n]>=0&&h[n]!==-1/0&&!T.has(e)&&(m[n]=-1)}return x}holdOnSingles(e,t,n,r,i){let a=this.net,o=a.meta,s=this.lag,c=this.prevS;this.singlePhases!==a.phases&&(this.singleCache.clear(),this.singlePhases=a.phases);let l=e.time-e.epoch;this.singleHeld=0;let u=new Map;for(let n=0;n<t.length;n++){let i=t[n],d=e.trips[i*2],{geo:f,gr:p}=bn(a,d,0),m=this.singleOn.get(f);if(!m)continue;let h=o[d*4+3],g=e.trips[i*2+1]+s[i];for(let e=p===0?0:m.length-4;e>=0&&e<m.length;e+=p===0?4:-4){let t=p===0?m[e+1]:h-m[e+2],o=p===0?m[e+2]:h-m[e+1],[s,f]=this.singleSpan(a,d,t,o,r[n]);if(g+f<=l||f<=s)continue;let _=c[i],v=Ct(a,d,s),y=!Number.isNaN(_)&&_>v+jd,b=u.get(m[e]),x=[n,m[e+3]^p,g+s,g+f,+!!y];b?b.push(...x):u.set(m[e],x);break}}let d=!1;for(let r of u.values()){if(r.length<10)continue;let o=!1;for(let e=5;e<r.length&&!o;e+=5)o=r[e+1]!==r[1];if(!o)continue;let c=[],u=[];for(let e=0;e<r.length;e+=5)r[e+4]?c.push(r[e],r[e+1],-1/0,r[e+3]):u.push(e);u.sort((e,t)=>r[e+2]-r[t+2]||r[e]-r[t]);for(let o of u){let u=r[o],f=r[o+1],p=r[o+2],m=r[o+3]-p,h=t[u],g=p;for(let e=!0,t=0;e&&t<8;t++){e=!1;for(let t=0;t<c.length;t+=4)c[t+1]===f||c[t+3]+Fd<=g||c[t+2]>=g+m+Fd||(g=c[t+3]+Fd,e=!0)}g>p+1e-6&&s[h]+Math.min(g,l)-p>Dd&&(this.singleLetOn++,g=p),c.push(u,f,g,g+m);let _=Math.min(g,l)-p;_>0&&(g>l&&(this.singleHeld++,this.singleWait.add(h)),s[h]+=_,d=!0,i[u]=l-e.trips[h*2+1]-s[h],n[u]=Ct(a,e.trips[h*2],i[u]))}}return d}singleSpan(e,t,n,r,i){let a=t*2**27+Math.round(n*2),o=this.singleCache.get(a*2),s=this.singleCache.get(a*2+1);if(o!==void 0&&s!==void 0)return[o,s];let c=e.phases,l=e.meta[t*4],u=e.meta[t*4+1],d=e.meta[t*4+2],f=(n+r)/2,p=NaN,m=NaN;for(let e=l;e<l+u;e++){let t=c[e*4],i=c[e*4+2],a=c[e*4+3],o=e+1<l+u?c[(e+1)*4]:d,s=c[e*4+1],h=t;if(i!==0||a!==0){if(!(a<0)||t+i/-a>=o-.001)continue;h=t+i/-a,s+=i*i/(2*-a)}s>=n-Pd&&s<=Math.min(n+Pd,f)?p=o:Number.isNaN(m)&&s>=Math.max(r-Pd,f)&&s<=r+Pd&&(m=h)}return Number.isNaN(p)&&(p=n-i-20<=Ct(e,t,0)+jd?0:Bd(e,t,n-i-20+jd,d)),Number.isNaN(m)&&(m=r+i+Ad>=Ct(e,t,d)-jd?d:Bd(e,t,r+i+Ad,d)),this.singleCache.set(a*2,p),this.singleCache.set(a*2+1,m),[p,m]}outerAt(e,t,n,r){let i=this.net.meta,a=new Int32Array(t.length).fill(-1);for(let o=0;o<t.length;o++){let s=e.trips[t[o]*2],c=this.passStops.get(u(s));if(!c||bn(this.net,s,0).geo!==u(s))continue;let l=Oe(s)===0,d=i[s*4+3],f=n[o],p=r[o];for(let e=0;e<c.length;e+=5){let t=l?c[e]:d-c[e],n=c[e+1],[r,i]=l?[c[e+3],c[e+4]]:[c[e+4],c[e+3]];if(f-p>=t-n-Nd*r&&f+p<=t+n+i){a[o]=c[e+2];break}}}return a}waitForPassing(e,t,n,r,i,a){let o=this.net,s=o.meta,c=this.lag,l=!1;for(let d=0;d<t.length;d++){let f=r[d];if(f<0)continue;let p=t[d],m=e.trips[p*2],h=this.passStops.get(u(m)),g=s[m*4+3],_=Oe(m)===0,v=NaN;for(let e=0;e<h.length;e+=5)if(h[e+2]===f){v=_?h[e]:g-h[e];break}let y=this.keyAt(m,v-1),b=n[d]-v;if(y<0)continue;let x=c[p];for(let r=0;r<t.length;r++){let i=t[r];if(c[i]<=x)continue;let l=e.trips[i*2],d=this.passThrough.get(u(l))?.get(f);if(d===void 0)continue;let p=Oe(l)===0?d:s[l*4+3]-d;n[r]>=p+b||Ct(o,l,a-e.trips[i*2+1])<p+b||this.keyAt(l,p-1)===y&&(x=c[i])}if(x<=c[p])continue;let S=e.trips[p*2+1],C=e=>Math.abs(Ct(o,m,a-S-e)-n[d])<.5,w=c[p],T=Math.min(x,Dd);if(!C(T)){for(let e=0;e<12;e++){let e=(w+T)/2;C(e)?w=e:T=e}T=w}T>c[p]&&(c[p]=T,i[d]=a-S-T,l=!0)}return l}keyAt(e,t){let n=this.net,r=n.pathTable,i=n.pathEntry,a=n.pathFrom,o=n.pathLen,{geo:s,gr:c}=bn(n,e,0),l=r[s*2],u=r[s*2+1],d=c===0?t:n.meta[e*4+3]-t,f=zd(a,l,l+u,d)-1;return f<l||d>a[f]+o[f]?-1:c===0?i[f]:i[f]^1}endWait(e,t){let n=t-this.waitFrom[e];this.waitRes[e]>=0&&n>0&&n<1/0&&(this.conflictWaits++,this.conflictWaitSum+=n,n>this.conflictLongest&&(this.conflictLongest=n)),this.waitRes[e]=-1}tauAt(e,t,n,r){let i=t*2**27+Math.round(n*2),a=this.tauCache.get(i*2),o=this.tauCache.get(i*2+1);if(a!==void 0&&o!==void 0)return[a,o];let s=e.meta[t*4+2],c=n-r-20,l=n+r+Ad,u=c<=Ct(e,t,0)+jd?0:Bd(e,t,c+jd,s),d=l>=Ct(e,t,s)-jd?s:Bd(e,t,l,s);return this.tauCache.set(i*2,u),this.tauCache.set(i*2+1,d),[u,d]}},Ld=3;function Rd(e,t,n,r,i){let a=e.get(t);if(a){for(let e=0;e<a.length;e+=Ld)if(a[e]===n)return;a.push(n,r,i)}else e.set(t,[n,r,i])}function zd(e,t,n,r){for(;t<n;){let i=t+n>>1;e[i]<=r?t=i+1:n=i}return t}function Bd(e,t,n,r){let i=e.phases,a=e.meta[t*4],o=e.meta[t*4+1];if(!o)return r;let s=a,c=a+o-1;for(;s<c;){let e=s+c+1>>1;i[e*4+1]<=n?s=e:c=e-1}let l=i[s*4],u=i[s*4+1],d=i[s*4+2],f=i[s*4+3],p=Math.max(0,n-u),m;if(d===0&&f===0)m=s+1<a+o?i[(s+1)*4]-l:0;else if(Math.abs(f)<1e-9)m=p/d;else{let e=d*d+2*f*p;m=e<=0?f<0?d/-f:0:(-d+Math.sqrt(e))/f}return Math.min(r,l+Math.max(0,m))}var Vd=.75,Hd=.7,Ud=.71,Wd=1.24,Gd=2,Kd=.17,qd=.11,Jd=.7,X=2048,Z=1024,Yd=.6,Xd=`0.14`,Zd=10,Qd=7,$d=e=>`vec2 q[13]; ${Array.from({length:13},(t,n)=>`q[${n}] = ${e}${n>>1}.${n&1?`zw`:`xy`};`).join(` `)}`,ef=e=>`flat ${e} vec4 v_at;\nflat ${e} highp int v_inst;`,tf=`vec2 centrePoint(int inst, int i, vec2 node, vec2 mid, vec2 along, vec2 across) {
  int t = inst * 13 + i;
  vec2 P = texelFetch(u_stline, ivec2(t % ${X}, t / ${X}), 0).xy;
  vec4 h = project(node + P);
  vec2 s = h.xy / h.w * (u_viewport * 0.5) - mid;
  return vec2(dot(s, along), dot(s, across));
}`,nf=Math.floor(2048/Zd),rf=6,af=`0.3`,of=(e,t)=>{let n=e=>`vec3(${F(e).map(e=>(e/255).toFixed(4)).join(`, `)})`;return[`v_color = ${n(e[0][1])};`,...e.slice(1).map(([r,i],a)=>`v_color = mix(v_color, ${n(i)}, clamp((${t} - ${e[a][0].toFixed(4)}) / ${(r-e[a][0]).toFixed(4)}, 0.0, 1.0));`)].join(`
    `)},sf=of(r,`a_speed`),cf=of(jt,`pv`),lf=.5,uf=1.5,df=`0.15`,ff=`0.6`,pf=`bool selectedLine(int c) {
  if (c == u_sel_line) return true;
  for (int i = 0; i < 16; i++) {
    if (i >= u_sel_n) break;
    if (u_sel_set[i] == c) return true;
  }
  return false;
}`,mf=`#version 300 es
precision highp float;
precision highp int;
${H}
uniform vec2 u_viewport;
uniform vec3 u_width;        // normal, extra when selected, each track's once apart (T-658)
uniform float u_casing;      // extra px for the casing pass, 0 for the colour pass
uniform vec3 u_casing_rgb;   // white, or dark in the dark theme (game/shades.ts)
uniform float u_cap;         // > 0: no wider than this (px), the track drawn through stations (T-236)
uniform int u_kind;          // 0 track, 1 lines, 2 preview
uniform int u_sel_line;
uniform int u_sel_n;         // T-1812: more lines drawn selected, a selected group's: how many, and which
uniform int u_sel_set[16];
uniform int u_sel_edge;
uniform ivec2 u_hot;         // the hovered line and bare track edge, -1 none (T-730)
uniform highp sampler2D u_ahead_lines; // T-4145: per line id (LINES_W wide), 1: drawn ahead of the network (map/lineAhead.ts), its network strokes not
uniform highp sampler2D u_ahead_edges; // per edge id (TEX_W wide), 1: neither track nor lines on it drawn from the network
uniform ivec2 u_ahead_n;     // how many line and edge ids those cover, 0 none
uniform int u_ahead;         // T-4114: 1 for the passes drawing the strokes ahead
uniform int u_only_sel;
uniform int u_bp_part;       // T-695: 0 every stroke, 1 all but blueprint, 2 blueprint only
uniform vec4 u_lanes;        // T-658: 4 m in px, how far the tracks have parted (0-1), how far the
                             // stroke has grown to their width (0-1), a blueprint track's width apart
uniform int u_lane_mode;     // 0 one stroke, 1 the band under both tracks, 2 the right track, 3 the left
uniform float u_pass_off;    // T-2233: px from the centre line to a passing station's outer track, 0 not drawn
uniform float u_dim;        // line strokes other than the selected line's: share of full strength (T-233)
uniform vec2 u_mute;        // T-2058 prototype: those strokes' width share (0 as built) and colour mixed to the casing's
uniform int u_by_level;
uniform int u_by_speed;
uniform int u_by_profit;      // T-2420: coloured by u_profit, per edge id (TEX_W wide), u_profit_n of them
uniform highp sampler2D u_profit;
uniform int u_profit_n;
uniform vec3 u_level_colours[7];
uniform vec3 u_track;
uniform vec3 u_bad;
uniform vec3 u_sel;
uniform vec2 u_bp;           // blueprint track (T-322): its middle's width and each rail's (px)
uniform vec3 u_bp_mid;       // its middle, light blue
uniform vec3 u_bp_rail;      // its two rails, dark blue
uniform vec3 u_bp_off_mid;   // the same switched off (T-333): cold grey rails round a nearly white
uniform vec3 u_bp_off_rail;  // middle in the light theme, dim in the dark one (game/shades.ts)
uniform vec3 u_bp_off_fade;  // what its other colours are mixed towards
uniform highp sampler2D u_line_colours;
uniform int u_full_pass;     // T-819: 1 the pass drawing a red band this much (px) wider than the
uniform float u_full_px;     // casing under the lines on track at capacity, nothing else; 2 (T-1284) the
uniform float u_full_out;    // casing's colour this much (px) wider again, and the red band in dashes
uniform float u_full_dash;   // of this period (px), so it reads on a red line; a crowded band's red edges (T-2184) are drawn with its colour pass
uniform vec3 u_full_rgb;
uniform int u_ghost;         // T-1038: 1 for the preview pass, whose placement strokes are the ghost
uniform int u_ghost_layer;   // T-1054: -1 the other strokes; 0 a ghost's outline, 1 its rails, 2 its middle
uniform vec3 u_ghost_rgb;    // the outline
uniform vec2 u_ghost_min;    // the ghost's least width across its rails (px), and its outline's both sides together
uniform vec3 u_hsr;          // T-1097: high-speed strokes' width as a multiple (one stroke, built), and the
                             // stroke widths (px) between which its centre line comes in (a tram's wires too)
uniform vec3 u_wire;         // T-2927: a tram's wires on built track and lines (T-3006: white)
uniform float u_band;        // T-1799: how far lines sharing track are drawn side by side (0-1)
uniform int u_band_traffic;  // 1: the Traffic view's bands, each its riders' width (a_wmul.yz)
uniform float u_band_gap;    // T-2126: px of casing between bands side by side
uniform float u_band_m;     // T-2132: px a metre of ground is drawn, for a band's metres to its ribbon's middle
uniform int u_level_hide;   // T-3420: the levels not drawn, a bit each from level -3; a line not drawn has its colour's alpha 0
in vec4 a_seg;
in uint a_colour;
in uint a_edge;
in float a_level;
in float a_flags;
in float a_speed;
in vec3 a_wmul;            // width as a multiple of the line width (riders, T-084), 1 otherwise; the
                           // Traffic view's band shift at its start and end, line widths left (T-1799)
in vec2 a_lane;             // T-658: how far apart its two tracks are at its start and end, 0-1
in vec2 a_full;             // T-819, T-1160: in the traffic view, the line segment's mark: below 0 track at capacity, above 0 its busiest hour's load over the rated load (T-2236), 0 none; and local units along its run to its start (T-2184)
in vec4 a_band;             // T-1799: its band's shift left at its start and end (share of 16 line widths), 1 - its width share at both
in vec2 a_band_m;           // T-2132: metres left from its track to its ribbon's middle at its start and end (share of 64)
out vec3 v_color;
out float v_alpha;
out vec4 v_cap;             // px: along from the segment's start, along to its end, across, half the width
flat out vec4 v_stripe;     // T-817: high-speed track's centre line, its colour and half width (px), 0 none
flat out float v_stripe_only; // 1: only that line is drawn (bare track between its parted tracks)
flat out vec4 v_wire;       // T-2927: a tram's wires, their colour and how far each one's middle is from the centre (px)
flat out float v_wire_hw;   // and each one's half width (px), 0 none
flat out float v_wire_dash; // T-3378: a busway's centre line dashed at this period (px), 0 solid
flat out float v_road;      // T-3378: 1 on a built busway, drawn as a road the bus lines under it show through
flat out float v_dash;      // T-1284: the red band's dash period (px), 0 for every other stroke
out float v_along;          // T-2184: px along the stroke's run, so dashes keep one length round curves
flat out vec4 v_inner;      // T-2184: a band's red edges over its neighbours: its colour's half width, the red's and the rim's px, strength; 0 none
flat out float v_aa;        // T-2183: a band's colour's half width (px), its sides smoothed so the gap between bands keeps its width; 0 none
${pf}
${qs}
void main() {
  v_inner = vec4(0.0);
  v_aa = 0.0;
  int flags = int(a_flags + 0.5);
  bool hsr = (flags & 256) != 0;
  bool tram = (flags & 4096) != 0;
  // T-3378: a busway, drawn as tram track (its flag is set too) in a road's grey with a dashed white centre line
  bool busway = (flags & 16384) != 0;
  bool striped = hsr;
  v_stripe = vec4(0.0);
  v_stripe_only = 0.0;
  v_wire = vec4(0.0);
  v_wire_hw = 0.0;
  v_wire_dash = 0.0;
  v_road = 0.0;
  v_dash = u_full_pass == 1 ? u_full_dash : 0.0;
  // T-3420: a line the player hid, and track and lines on a hidden level, a ramp fading toward it
  if (u_kind == 1 && texelFetch(u_line_colours, ivec2(int(a_colour) % ${Z}, int(a_colour) / ${Z}), 0).a < 0.5) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  if (u_ahead == 0 && u_kind != 2 && int(a_edge) < u_ahead_n.y && texelFetch(u_ahead_edges, ivec2(int(a_edge) % ${X}, int(a_edge) / ${X}), 0).r > 0.5) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  if (u_kind == 1 && u_ahead == 0 && int(a_colour) < u_ahead_n.x && texelFetch(u_ahead_lines, ivec2(int(a_colour) % ${Z}, int(a_colour) / ${Z}), 0).r > 0.5) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float shown0 = 1.0, shown1 = 1.0;
  if (u_level_hide != 0 && u_kind != 2) {
    float hq = floor(a_level / 256.0);
    shown0 = levelShown(hq / 32.0 - 4.0);
    shown1 = levelShown((a_level - hq * 256.0) / 32.0 - 4.0);
  }
  bool sel = (u_kind == 1 && selectedLine(int(a_colour))) || (u_kind == 0 && int(a_edge) == u_sel_edge);
  bool blueprint = (flags & 1) != 0;
  bool placement = (flags & 32) != 0;
  // the ghost is drawn as blueprint track in three layers, outline then rails then middle (T-1054)
  bool ghost = u_ghost == 1 && placement;
  if (ghost ? u_ghost_layer < 0 : u_ghost_layer >= 0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // blueprint track is two dark blue rails either side of a light blue middle (T-322, Anita): the
  // rails are its casing pass, drawn for every segment before any middle, so the joints are clean;
  // the middle is a line wide, so a line planned along it fills it and the rails show either side
  bool bpTrack = blueprint && !placement && u_kind == 0;
  bool swOff = (flags & 64) != 0;
  // (T-3378: a built busway has no casing: the bus lines are drawn under the track, and show through its road)
  if ((u_only_sel == 1 && !sel) || (u_casing > 0.0 && blueprint && !placement && !bpTrack) || (busway && u_kind == 0 && u_casing > 0.0 && !blueprint && !placement) || (u_bp_part == 1 && blueprint) || (u_bp_part == 2 && !blueprint)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // a line planned along blueprint fills the track's middle (T-331: narrower than a line now)
  bool bpLine = blueprint && !placement && u_kind == 1;
  // double track as its two tracks close in (T-658): first the stroke grows to the pair's width
  // (u_lanes.z), then the two tracks part inside it (u_lanes.y), so its outline never jumps
  // a turn-back crossover (T-658d) goes from one track to the other: drawn once, as a track
  bool turnback = (flags & 128) != 0;
  if (turnback && (u_lane_mode != 2 || u_casing > 0.0)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // a passing station's outer track (T-2233): one track, its lane how far out along its bow
  bool passing = (flags & 1024) != 0;
  if (passing && (u_pass_off <= 0.0 || u_casing > 0.0 || u_lane_mode == 1 || u_lane_mode == 3)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float lfm = turnback || (passing && u_lane_mode == 2) ? 1.0 : passing ? 0.0 : max(a_lane.x, a_lane.y), G = u_lanes.x, t = u_lanes.y;
  // a station's split on single track (T-3212) widens only once double track's two tracks part
  // (Anita: no thickening before the tracks show); further out it is single track's width
  bool split = (flags & 8192) != 0;
  float lfw = split ? lfm * t : lfm;
  bool bpShape = bpTrack || bpLine || ghost;
  float lt = (blueprint && !placement) || ghost ? u_lanes.w : u_width.z * (tram ? ${Vd.toFixed(2)} : 1.0);
  float tw = tram ? ${Vd.toFixed(2)} : 1.0;
  // (T-3580: a line's Traffic view width is its riders' alone, the same on single and double track)
  bool trafficLine = u_kind == 1 && u_band_traffic == 1;
  float tk = tram || turnback || passing || trafficLine ? 1.0 : mix(mix(${Ud.toFixed(2)}, ${Wd.toFixed(2)}, lfw), 1.0, u_lanes.z);
  float core = bpShape ? u_bp.x * tw * tk + 2.0 * u_bp.y : u_width.x * tw * tk;
  int id = gl_VertexID;
  float along = float(id & 1);
  // lines sharing track side by side (T-1799): each a band narrower than a line, shifted across;
  // every casing is drawn before any colour, so the bands get one outline round them all. In the
  // Traffic view each band is its riders' width (a_wmul.yz the shifts); through a station's box
  // (u_cap) every view takes the Line view's slots, a line wide each before the cap
  float bandOn = u_kind == 1 ? u_band : 0.0;
  bool shared = bandOn > 0.0 && max(a_band.z, a_band.w) > 0.0;
  bool tBand = u_band_traffic == 1 && u_cap <= 0.0;
  float wmul = shared && u_cap > 0.0 ? 1.0 : a_wmul.x;
  float bandW = tBand ? 1.0 : 1.0 - bandOn * mix(a_band.z, a_band.w, along);
  // (T-3533: bare track is never drawn narrower than its two tracks' outer edges, G + lt, from the first zoom
  // they would be; a line keeps the ramp, its width is its riders' in the Traffic view)
  float grow = (u_kind == 0 ? 1.0 : u_lanes.z) * max(0.0, lfw * (G + lt) - core * (bpShape ? 1.0 : wmul));
  float extra = sel ? u_width.y : 0.0;
  bool muted = u_kind == 1 && u_mute.x > 0.0 && !sel;
  if (muted) bandW *= u_mute.x;
  bool full = u_full_pass == 1 || u_full_pass == 2;
  bool fullOut = u_full_pass == 2;
  // a crowded stretch on a band of shared track: its red edges drawn after every
  // line's colour (pass 3), over the bands beside it, since under the ribbon's casing they would not show
  bool waitIn = shared && tBand && a_full.x > 0.0;
  // (T-2347: drawn with the line's colour, in the line's own order, so no line's edges lie over a line above it)
  bool late = waitIn && u_kind == 1 && u_casing <= 0.0 && u_only_sel == 0 && u_full_pass == 0;
  if (late) v_dash = u_full_dash;
  if (full && (!(u_kind == 1 && a_full.x != 0.0) || waitIn)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float fs = a_full.x < 0.0 ? 1.0 : a_full.x > 0.0 ? ${lf.toFixed(3)} + ${.5.toFixed(3)} * clamp((a_full.x - ${1 .toFixed(3)}) / ${.5.toFixed(3)}, 0.0, 1.0) : 0.0;
  float cas = full ? u_casing + u_full_px + ${df} * u_width.x * wmul + (fullOut ? u_full_out : 0.0) : u_casing;
  float w, lane_off = 0.0;
  if (u_lane_mode == 0) {
    w = (ghost ? core
      : bpTrack ? u_bp.x * tw * tk + extra + (u_casing > 0.0 ? 2.0 * u_bp.y : 0.0)
      : bpLine ? u_bp.x * tw * tk * bandW + extra + cas
      : u_width.x * wmul * tk * (hsr ? u_hsr.x : 1.0) * (tram ? ${Vd.toFixed(2)} : 1.0) * bandW + extra + cas) + grow;
    // T-2126: a band of shared track a pixel narrower in colour than its slot, the casing showing between
    // (none for a line easing out of the ribbon to its full width)
    if (shared && u_casing <= 0.0 && !full) {
      w = max(1.0, w - u_band_gap * clamp(mix(a_band.z, a_band.w, along) / ${(1-de).toFixed(2)}, 0.0, 1.0));
    }
  } else {
    // the gap opens from the middle while the pair's width stays: each track is half of what is
    // left; the band under both is the pair's width, or the traffic width behind them (Anita,
    // 2026-10-19)
    float gap = t * (G - lt);
    // (a split takes single track's widths and its tracks part with the gap, so it opens out of
    // single track's width instead of jumping to the pair's)
    float wl = lfm > 0.0 && !split ? 0.5 * (max(core, G + lt) - gap) : mix(core, lt, t);
    float half_ = 0.5 * (gap + wl);
    lane_off = split ? t * half_ : half_;
    float band = max(core * (bpShape ? 1.0 : wmul), lfw * 2.0 * half_ + wl);
    bool casing = u_casing > 0.0;
    bool keep = u_lane_mode == 1
      ? !ghost && (casing ? !bpTrack : (u_kind == 1 && !blueprint) || (striped && u_kind == 0))
      : (casing ? bpTrack : true) && (u_lane_mode == 2 || lfm > 0.0);
    if (!keep) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    w = u_lane_mode == 1 ? band + extra + cas
      : ghost ? wl
      : bpTrack || bpLine ? (casing ? wl : max(0.0, wl - 2.0 * u_bp.y))
      : wl;
    if (u_cap > 0.0 && u_lane_mode > 1) w = min(w, 0.5 * u_cap);
  }
  // T-3378: a built busway is one road as wide as double track's two tracks (G + lt) once they would part
  if (busway && u_kind == 0 && (u_lane_mode == 0 || u_lane_mode == 2) && !bpShape && !ghost) w = max(w, G + lt + extra + cas);
  if (u_cap > 0.0) w = min(w, u_cap);
  if (ghost) {
    w = max(w, u_ghost_min.x);
    w = u_ghost_layer == 0 ? w + u_ghost_min.y : u_ghost_layer == 2 ? max(0.0, w - 2.0 * u_bp.y) : w;
  }
  // thinner than a pixel (zoomed far out, T-205): a pixel wide and fainter, rather than broken up
  float faint = clamp(w, 0.05, 1.0);
  float floorPx = 1.0;
  if (u_kind == 0 && !(tram || turnback || passing)) {
    floorPx = mix(1.0, ${Gd.toFixed(1)}, lfw * (1.0 - u_lanes.z));
    // a blueprint's middle and a ghost's inner layer sit between rails of their own
    if ((bpShape && u_casing <= 0.0 && !ghost) || (ghost && u_ghost_layer == 2)) floorPx = max(1.0, floorPx - 2.0 * u_bp.y);
  }
  w = max(w, floorPx);
  if (late) {
    float hr = 0.5 * (u_full_px + ${df} * w), ho = 0.5 * u_full_out;
    v_inner = vec4(0.5 * w, hr, ho, fs);
    w += 2.0 * (hr + ho);
  } else if (shared && u_casing <= 0.0 && !full && u_lane_mode == 0) {
    // (half a pixel more each side, for the smoothed edge)
    v_aa = 0.5 * w;
    w += 1.0;
  }
  float side = id < 2 ? -1.0 : 1.0;
  vec4 c0 = project(a_seg.xy);
  vec4 c1 = project(a_seg.zw);
  vec2 half_vp = u_viewport * 0.5;
  vec2 s0 = c0.xy / c0.w * half_vp;
  vec2 s1 = c1.xy / c1.w * half_vp;
  vec2 dir = s1 - s0;
  float len = length(dir);
  dir = len > 1e-6 ? dir / len : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  vec4 c = along < 0.5 ? c0 : c1;
  vec2 off = nrm * side * w * 0.5 + dir * (along * 2.0 - 1.0) * w * 0.5;
  // a line's strokes run in its run 0's direction (T-319); each of its two tracks takes the line's
  // colour, so the stroke is the same whichever side trains keep to (the train shader's u_keep)
  float lv = along < 0.5 ? a_lane.x : a_lane.y;
  if (turnback) lv = 2.0 * lv - 1.0;
  if (passing) off += nrm * ((flags & 2048) != 0 ? 1.0 : -1.0) * mix(u_lane_mode == 2 ? lane_off : 0.0, u_pass_off, lv);
  else if (u_lane_mode > 1) off -= nrm * (u_lane_mode == 2 ? 1.0 : -1.0) * lv * lane_off;
  // the slot in line widths from the ribbon's middle, and the middle in metres from the track, each
  // at the zoom in view (T-2132); through a station's box (u_cap) the bands close up as they narrow to fit
  if (bandOn > 0.0) {
    float toMid = mix(a_band_m.x, a_band_m.y, along) * ${64 .toFixed(1)} * u_band_m;
    off += nrm * bandOn * (tBand ? u_width.x * mix(a_wmul.y, a_wmul.z, along) + toMid
      : (u_width.x * mix(a_band.x, a_band.y, along) * ${16 .toFixed(1)} + toMid) * (u_cap > 0.0 ? min(1.0, u_cap / (${de.toFixed(2)} * u_width.x)) : 1.0));
  }
  c.xy += off / half_vp * c.w;
  gl_Position = c;
  // round caps (T-673): the quad runs half a width past each end; the fragment shader rounds it
  float ext = (along * 2.0 - 1.0) * w * 0.5, ua = along * len + ext;
  v_cap = vec4(ua, len - ua, side * w * 0.5, w * 0.5);
  v_along = a_full.y * len / max(length(a_seg.zw - a_seg.xy), 1e-9) + ua;
  // Blueprint is solid but lighter (T-311): the colour mixed towards white, opaque, because
  // segments overlap at every joint and see-through blueprint would show a bead there. Lines
  // that do not run (faded) stay see-through.
  bool bp = blueprint && !placement;
  v_alpha = (!placement && !bp && (flags & 2) != 0 ? 0.55 : 1.0) * faint * (u_kind == 1 && !sel ? u_dim : 1.0) * (along < 0.5 ? shown0 : shown1);
  // the height at this end (levelCode in network.ts), its colour blended between the whole levels either side
  float lq0 = floor(a_level / 256.0);
  float lh = clamp(3.0 - ((along < 0.5 ? lq0 : a_level - lq0 * 256.0) / 32.0 - 4.0), 0.0, 6.0);
  int lo = int(floor(lh));
  vec3 lc = mix(u_level_colours[lo], u_level_colours[min(lo + 1, 6)], lh - float(lo));
  bool bpMid = false;
  if (ghost && u_ghost_layer < 2) v_color = u_ghost_layer == 0 ? u_ghost_rgb : u_bp_rail;
  // T-1152: a weaker edge towards the casing's colour, not see-through, which would bead at the joints
  else if (u_casing > 0.0) v_color = bpTrack ? (swOff ? u_bp_off_rail : u_bp_rail) : placement && !ghost ? u_sel : fullOut ? u_casing_rgb : full ? mix(u_casing_rgb, u_full_rgb, fs) : u_casing_rgb;
  else if ((flags & 16) != 0) v_color = u_bad;
  else if ((u_kind == 2 && !placement) || u_by_level == 1) v_color = lc;
  else if (u_by_speed == 1) {
    ${sf}
  }
  // T-3130: a ghost has no profit (its edge id, all ones, read as -1 found the texture's zero: deep red)
  else if (u_by_profit == 1 && !placement) {
    int ei = int(a_edge);
    float pv = ei < u_profit_n ? texelFetch(u_profit, ivec2(ei % ${X}, ei / ${X}), 0).x : 1e30;
    if (pv > 1e29) v_color = u_track;
    else {
      ${cf}
    }
  }
  else if (placement) v_color = ghost ? u_bp_mid : vec3(1.0);
  else if (u_kind == 0 && bpTrack && !sel) { v_color = swOff ? u_bp_off_mid : u_bp_mid; bpMid = true; }
  else if (u_kind == 0) v_color = sel ? u_sel : busway ? mix(u_track, u_casing_rgb, 0.3) : u_track;
  else v_color = texelFetch(u_line_colours, ivec2(int(a_colour) % ${Z}, int(a_colour) / ${Z}), 0).rgb;
  // other blueprint colours (a planned line, a selected blueprint, by height or speed) lighter
  if (bp && !bpMid && u_casing <= 0.0) v_color = swOff ? mix(v_color, u_bp_off_fade, 0.8) : mix(v_color, vec3(1.0), 0.45);
  bool hot = (u_kind == 1 && int(a_colour) == u_hot.x) || (u_kind == 0 && int(a_edge) == u_hot.y);
  if (hot && u_casing <= 0.0) v_color = mix(v_color, vec3(1.0), ${af});
  if (muted && u_casing <= 0.0) v_color = mix(v_color, u_casing_rgb, u_mute.y);
  // high-speed track (T-817): a thin centre line along the stroke, light on built track (dark in
  // the dark theme), the rail colour on blueprint; once its tracks part, the stroke's own colour
  // between them
  vec3 rail = bpTrack ? (swOff ? u_bp_off_rail : u_bp_rail) : ghost ? u_bp_rail : placement ? u_sel : u_casing_rgb;
  // T-1097: on a narrow built stroke no centre line, which would leave little of the colour
  float hs = u_lane_mode == 0 ? (bpShape || placement ? max(0.3, 0.18 * w) : 0.18 * w * smoothstep(u_hsr.y, u_hsr.z, w)) : max(0.3, 0.08 * G);
  if (striped && u_casing <= 0.0 && u_lane_mode < 2 && !full && (!ghost || u_ghost_layer == 2) && hs >= 0.1) {
    v_stripe = vec4(u_lane_mode == 0 ? rail : (bpTrack || placement ? rail : v_color), hs);
    v_stripe_only = u_lane_mode == 1 && u_kind == 0 ? 1.0 : 0.0;
  }
  // T-2927: a tram's two wires, coming in as high-speed track's centre line does; one along each track
  // once they part (blueprint's only then: between its rails there is no room for two more lines)
  if (tram && u_casing <= 0.0 && u_lane_mode != 1 && !(bpShape && u_lane_mode == 0) && !full && !late && (!ghost || u_ghost_layer == 2)) {
    float hw = max(${(Jd/2).toFixed(2)}, ${(qd/2).toFixed(3)} * w) * (u_lane_mode > 1 ? 1.0 : smoothstep(u_hsr.y, u_hsr.z, w));
    if (hw >= 0.1) {
      v_wire = vec4(bpShape || placement ? rail : u_wire, u_lane_mode == 0 ? ${Kd.toFixed(3)} * w : 0.0);
      v_wire_hw = hw;
    }
    if (busway) {
      v_road = bpShape || placement ? 0.0 : 1.0;
      v_wire.w = 0.0;
      v_wire_dash = max(6.0, 12.0 * u_band_m);
    }
  }
  // T-1125: a line at capacity a little darker under its red edge, as strong as the edge (T-1152)
  if (u_kind == 1 && a_full.x != 0.0 && u_casing <= 0.0 && !full) v_color = mix(v_color, vec3(0.0), ${Xd} * fs);
  // the band behind a line's two tracks, pale so they stand out on it
  if (u_lane_mode == 1 && u_casing <= 0.0) v_color = mix(v_color, u_casing_rgb, 0.6 * t);
}`,hf=`#version 300 es
precision highp float;
in vec3 v_color;
in float v_alpha;
in vec4 v_cap;
flat in vec4 v_stripe;
flat in float v_stripe_only;
flat in vec4 v_wire;
flat in float v_wire_hw;
flat in float v_wire_dash;
flat in float v_road;
flat in float v_dash;
in float v_along;
flat in vec4 v_inner;
flat in float v_aa;
uniform vec3 u_full_rgb;
uniform vec3 u_casing_rgb;
uniform float u_full_out;
out vec4 o;
void main() {
  float past = -min(v_cap.x, v_cap.y);
  // T-2184, T-2347: a crowded band's quad is its colour's width plus its red edges (v_inner.x the colour's half width)
  bool edge = v_inner.x > 0.0 && abs(v_cap.z) >= v_inner.x;
  float hw = v_inner.x > 0.0 ? v_inner.x : v_cap.w;
  float a = past > 0.0 ? clamp(0.5 - (length(vec2(past, v_cap.z)) - hw), 0.0, 1.0) * v_alpha : v_alpha;
  if (v_dash > 0.0 && (v_inner.x <= 0.0 || edge) && mod(v_along, v_dash) > 0.6 * v_dash) discard;
  vec3 c = v_color;
  // the red edges, as a line's own outside its casing, in a rim of the casing's colour
  if (edge) {
    // (no round caps: at a run's end, where the band's width changes, they would ring it)
    float d = abs(v_cap.z);
    if (past > 0.0) discard;
    a = v_alpha;
    c = mix(u_casing_rgb, u_full_rgb, v_inner.w * clamp(v_inner.x + v_inner.y + 0.5 - d, 0.0, 1.0));
    a *= clamp(v_inner.x + v_inner.y + v_inner.z + 0.5 - d, 0.0, 1.0);
  }
  if (v_aa > 0.0) {
    // T-2223: the cap as round as the sides, not half a pixel fatter (it pinched the gap at every
    // joint), and a sharp ramp, so a gap falling between two pixels still leaves them 70% casing
    float d = v_aa + 0.5 - (past > 0.0 ? length(vec2(past, v_cap.z)) : abs(v_cap.z));
    a = v_alpha * clamp(1.6 * d - 0.5, 0.0, 1.0);
  }
  if (v_stripe.w > 0.0) {
    float s = clamp(v_stripe.w + 0.5 - abs(v_cap.z), 0.0, 1.0);
    c = mix(c, v_stripe.rgb, s);
    if (v_stripe_only > 0.5) { c = v_stripe.rgb; a *= s; }
  }
  float wire = v_wire_hw > 0.0 && (v_wire_dash <= 0.0 || mod(v_along, v_wire_dash) < 0.5 * v_wire_dash) ? clamp(v_wire_hw + 0.5 - abs(abs(v_cap.z) - v_wire.w), 0.0, 1.0) : 0.0;
  c = mix(c, v_wire.rgb, wire);
  // T-3378: a built busway's road: its kerbs solid, between them see-through, so a bus line under it shows; its dashes solid
  if (v_road > 0.5) {
    float kerb = max(1.0, 0.15 * v_cap.w);
    float k = clamp(abs(v_cap.z) - (v_cap.w - kerb) + 0.5, 0.0, 1.0);
    a *= max(max(0.3, k), wire);
  }
  o = vec4(c * a, a);
}`,gf=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform vec2 u_radius;   // dot radius, ordinary and transfer (px)
uniform float u_line;    // a line's width (px): a station covers the lines through it
uniform float u_ring;    // its dark rim (px)
uniform float u_boxes;   // 1: platforms along the track; 0: dots (zoomed out)
uniform highp int u_no_bp; // 1: blueprint stations are not drawn (Settings' Show blueprints)
uniform vec2 u_fixed;   // a box's half width (T-204, T-239): px at BOX_WIDTH_ZOOM, and local
                         // units per px there; the width on the ground, and the least on screen (T-553)
uniform float u_pass_half; // a box with passing tracks is at least this wide either side, px (T-2233)
uniform highp int u_pass; // stations: 0 every one but the selected, 1 the selected only
uniform highp int u_layer; // 0 the dark shape, 1 the white inside the rim, 2 riders waiting (T-219)
uniform highp int u_room; // 1: the waiting rooms joined to the boxes instead (T-1416)
uniform highp int u_bld;  // T-2219: 1 only stations in no station building, 2 only those in one, 0 all
uniform float u_pixel;
in vec3 a_st;
in vec2 a_axis;          // half the platform along its track at its middle, local units
in vec4 a_shape;         // the platform's middle from the node (xy), half the turn along it (z, not read), half its true width (w), local units
in float a_sel;          // 1 drawn selected, -1 not drawn (on a hidden level, T-3420)
in vec4 a_crowd;         // riders waiting (T-219): how full the platform's + and - side is (0-1),
                         // and whether that side is full (zw)
in vec2 a_dcrowd;        // zoomed out (T-228): the station's fullest platform side, 0-1, and 1 if
                         // it is full
uniform highp sampler2D u_stline; // RG32F, per station 13 texels: its track's centre line from the node (T-254)
out vec2 v_p;            // in the platform's frame at its middle, px
flat out vec3 v_size;    // half length, half width; 1 a waiting room, 3 a terminal
flat out float v_dot;    // the dot's radius, 0 for a platform
flat out float v_alpha;
flat out vec4 v_crowd;
flat out vec4 v_scr;     // a dot's frame on the screen (T-553): where its x and y axes point, as
                         // (x.x, y.x, x.y, y.y) with the screen's y up, so a pie can start at 12 o'clock
flat out float v_lane;   // 1 on double track: a platform each side of its two tracks close in (T-658); 2 with passing tracks (T-2249);
                         // a one-track station (T-3332): +-(10 + how far its band's middle is off the centre line, px), + or - its side
uniform vec4 u_one;      // T-3332, T-3615: the track a one-track station's bar covers from the centre line, away from its platform's side and towards it, px; rail (xy) and tram (zw)
uniform vec4 u_one_mid;  // T-3540: the same on track drawn as one (ST_ONE_MID)
flat out vec2 v_bulge;   // a one-track station's bulge: how far it sticks out and its half length, px, 0 none
uniform highp int u_hot_st[16]; // the hovered stations (T-730), u_hot_n of them
uniform highp int u_hot_n;
flat out float v_hot;
// for the fragment shader's centre line (T-254, T-3192): the station's node (local units) and its
// platform's middle on the screen (px, y up), and the station's index in u_stline; -1 a straight
// line v_size.x either side of the middle
${ef(`out`)}
${tf}
// the point of the centre line t along it from its middle (stationGeometry.ts centreAt)
vec2 centreAt(vec2 q[13], float t) {
  float total = 0.0;
  for (int i = 0; i < 12; i++) total += length(q[i + 1] - q[i]);
  float step = total / ${12 .toFixed(1)};
  if (step < 1e-6) return q[6];
  float u = t / step + ${6 .toFixed(1)};
  int f = int(clamp(floor(u), 0.0, ${11 .toFixed(1)}));
  return mix(q[f], q[f + 1], u - float(f));
}
void main() {
  v_hot = 0.0;
  for (int k = 0; k < 16; k++) if (k < u_hot_n && u_hot_st[k] == gl_InstanceID) v_hot = 1.0;
  // T-3420, T-3560: a station on a switched-off level (a_sel -1) is drawn faint, without its crowd
  float lvFade = a_sel < -0.5 ? ${Hs.toFixed(2)} : 1.0;
  v_dot = 0.0;
  v_bulge = vec2(0.0);
  v_scr = vec4(1.0, 0.0, 0.0, 1.0);
  v_crowd = a_crowd;
  int flags = int(a_st.z + 0.5);
  // 2: double track with passing tracks (T-2249)
  v_lane = (flags & 16) != 0 ? ((flags & ${oe}) != 0 ? 2.0 : 1.0) : 0.0;
  v_alpha = ((flags & 8) != 0 ? 0.3 : (flags & 2) != 0 ? 0.6 : 1.0) * lvFade; // 8: a blueprint switched off (T-333)
  vec2 half_vp = u_viewport * 0.5;
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  bool boxes = u_boxes > 0.5;
  bool sel = a_sel > 0.5;
  bool noCrowd = !boxes || (flags & 2) != 0 || max(a_crowd.x, a_crowd.y) <= 0.0 || lvFade < 1.0;
  bool noAnnex = u_room > 0 && (!boxes || (flags & 32) == 0);
  bool inBld = (flags & ${N}) != 0;
  if ((u_no_bp == 1 && (flags & 2) != 0) || (u_pass == 1) != sel || (u_layer == 2 && noCrowd) || noAnnex || (u_bld == 1 && inBld) || (u_bld == 2 && !inBld)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // zoomed out a dot's pie is its platforms' crowd (T-228, T-553): the fullest side's share, and
  // whether it is full
  if (!boxes) v_crowd = vec4(a_dcrowd, 0.0, 0.0);
  // T-3540: a station on single track has one platform, filled as its fuller side (as its dot is)
  else if ((flags & ${tn}) != 0) v_crowd = vec4(vec2(max(a_crowd.x, a_crowd.y)), vec2(max(a_crowd.z, a_crowd.w)));
  vec2 mid = a_st.xy + a_shape.xy;
  vec4 c = project(mid);
  vec4 e = project(mid + a_axis);
  vec4 q = project(mid + vec2(-a_axis.y, a_axis.x));
  vec2 cs = c.xy / c.w * half_vp;
  vec2 axis = e.xy / e.w * half_vp - cs, nrm = q.xy / q.w * half_vp - cs;
  float len = length(axis);
  vec2 along = len > 1e-6 ? axis / len : vec2(1.0, 0.0);
  vec2 across = length(nrm) > 1e-6 ? normalize(nrm) : vec2(-along.y, along.x);
  v_scr = vec4(along.x, across.x, along.y, across.y);
  float axisLoc = length(a_axis);
  // a box is as wide on the ground as a plain line and its rim are at BOX_WIDTH_ZOOM less a
  // quarter, whatever lines are drawn wider (T-239), so its length and width scale together and
  // it keeps one shape from there in; further out it keeps that width on screen (T-553)
  float perLoc = axisLoc > 1e-9 ? len / axisLoc : 0.0;
  float hw = max(max(a_shape.w, u_fixed.x * u_fixed.y) * perLoc, boxes ? u_fixed.x : 0.0);
  // T-3540: a tram stop's box narrower
  bool tramBox = (flags & ${ie}) != 0;
  if (tramBox) hw *= ${Ke.toFixed(2)};
  // wide enough for its outer tracks' trains (T-2233)
  if (boxes && (flags & ${oe}) != 0) hw = max(hw, u_pass_half);
  // a dot covers a plain line through it as drawn now
  float cover = 0.3 * u_line + u_ring + u_pixel;
  float hl = max(len, hw);
  // zoomed out every station is its own dot at its platform's middle (T-313)
  if (!boxes) v_dot = max(((flags & 1) != 0 ? u_radius.y : u_radius.x) * ((flags & ${ie}) != 0 ? ${Hd.toFixed(2)} : 1.0), cover);
  float lo, hi, xl, xh;
  // the quad's offset from the platform's middle and its axes on screen (a waiting room's own)
  vec2 shift = vec2(0.0), ra = along, rn = across;
  v_at = vec4(a_st.xy, cs);
  v_inst = -1;
  if (v_dot > 0.0) {
    v_size = vec3(hl, hw, 0.0);
    lo = -v_dot - 1.0;
    hi = v_dot + 1.0;
    xl = -v_dot - 1.0;
    xh = v_dot + 1.0;
  } else {
    // the track's own line along the platform (T-254, Anita: "ideally we actually fit the
    // track"), in the frame at the middle; the band is hw either side of it, the quad round it
    vec2 q[13];
    float total = 0.0;
    vec2 mn = vec2(1e20), mx = vec2(-1e20);
    v_inst = gl_InstanceID;
    for (int i = 0; i < 13; i++) {
      q[i] = centrePoint(gl_InstanceID, i, a_st.xy, cs, along, across);
      if (i > 0) total += length(q[i] - q[i - 1]);
      mn = min(mn, q[i]);
      mx = max(mx, q[i]);
    }
    hl = max(0.5 * total, hw);
    // never shorter than it is wide: the end stretches carry on
    float ext = hl - 0.5 * total;
    v_size = vec3(hl, hw, 0.0);
    // T-3332: a one-track station: a thin bar on its track with a bulge at the middle on its side (the
    // fragment shader moves the band and adds the bulge; the quad keeps room for both)
    float room = hw;
    // (a one-platform station's bar: its middle across, signed, and half width; its waiting room joins it)
    vec2 oneBar = vec2(0.0, hw);
    if ((flags & ${Me}) != 0) {
      // (T-3615: sized by its box, as stationGeometry.ts oneBar; T-3540: on track drawn as one)
      vec4 cov4 = (flags & ${ze}) != 0 ? u_one_mid : u_one;
      vec2 cov = tramBox ? cov4.zw : cov4.xy;
      float span = cov.x + cov.y, ends = max(${(2*En).toFixed(2)} * hw, span), bump = max(${(2*we).toFixed(2)} * hw + span, ends);
      vec3 bar = vec3(0.5 * ends - cov.x, 0.5 * ends, bump - ends);
      v_size.y = bar.y;
      v_bulge = vec2(bar.z, ${le.toFixed(2)} * hl);
      v_lane = ((flags & ${A}) != 0 ? -1.0 : 1.0) * (10.0 + bar.x);
      room = bar.x + bar.y + bar.z;
      oneBar = vec2(((flags & ${A}) != 0 ? -1.0 : 1.0) * bar.x, bar.y);
    }
    lo = mn.y - room - ext - 1.0;
    hi = mx.y + room + ext + 1.0;
    xl = mn.x - room - ext - 1.0;
    xh = mx.x + room + ext + 1.0;
    // a terminal's buffer stop end is drawn thick (T-1416, T-1527, the fragment shader)
    if ((flags & 256) != 0 && (flags & 512) != 0) {
      v_size.z = 3.0;
      lo -= ${He.toFixed(2)} * u_ring;
      hi += ${He.toFixed(2)} * u_ring;
    }
    if (u_room > 0) {
      // T-1416: the waiting room, joined to the box's side at its middle, its inner edge inside the
      // box's rim so the two are one white shape with one outline, on the side facilityPlace.ts
      // picked (T-1528). As stationGeometry.ts stationAnnexes. Its riders stand in it from its
      // middle out (T-219's fill).
      vec2 qm = q[6];
      vec2 dl = q[7] - q[5];
      dl = length(dl) > 1e-6 ? normalize(dl) : vec2(1.0, 0.0);
      vec2 nl = vec2(-dl.y, dl.x);
      if (nl.y * ((flags & 64) != 0 ? 1.0 : -1.0) < 0.0) nl = -nl;
      float l = clamp(0.35 * hl, 1.2 * hw, 2.5 * hw), d = hw, at = 0.0;
      float edge = min(min(dot(centreAt(q, at - l) - qm, nl), dot(centreAt(q, at) - qm, nl)), dot(centreAt(q, at + l) - qm, nl));
      vec2 rc = qm + dl * at + nl * (edge + dot(nl, vec2(0.0, oneBar.x)) + oneBar.y - 2.0 * u_ring - u_pixel + d);
      shift = along * rc.x + across * rc.y;
      ra = along * dl.x + across * dl.y;
      rn = along * nl.x + across * nl.y;
      v_scr = vec4(ra.x, rn.x, ra.y, rn.y);
      v_inst = -1;
      v_size = vec3(l, d, float(u_room));
      lo = -d - 1.0;
      hi = d + 1.0;
      xl = -l - 1.0;
      xh = l + 1.0;
      v_lane = 0.0;
      v_bulge = vec2(0.0);
      v_crowd = vec4(vec2(max(a_crowd.x, a_crowd.y)), vec2(max(a_crowd.z, a_crowd.w)));
    }
  }
  v_p = vec2(corner.x < 0.0 ? xl : xh, corner.y < 0.0 ? lo : hi);
  c.xy += (shift + ra * v_p.x + rn * v_p.y) / half_vp * c.w;
  gl_Position = c;
}`,_f=`#version 300 es
precision highp float;
${H}
uniform vec2 u_viewport;
uniform float u_ring;
uniform float u_bridge;  // the white's half width, local units
uniform highp int u_pass;
uniform highp int u_no_bp; // 1: links to a blueprint station are not drawn
in vec4 a_ends;          // its two ends, local units
in vec2 a_bflag;         // drawn selected (both stations are), faded (either is a blueprint)
out vec2 v_p;
flat out vec3 v_size;
flat out float v_dot;
flat out float v_alpha;
flat out vec4 v_crowd;
flat out vec4 v_scr;
flat out float v_lane;
flat out vec2 v_bulge;
uniform highp int u_hot_st[16]; // the bridges between hovered stations (T-730)
uniform highp int u_hot_n;
flat out float v_hot;
${ef(`out`)}
void main() {
  v_hot = 0.0;
  for (int k = 0; k < 16; k++) if (k < u_hot_n && u_hot_st[k] == gl_InstanceID) v_hot = 1.0;
  v_dot = 0.0;
  v_lane = 0.0;
  v_bulge = vec2(0.0);
  v_scr = vec4(1.0, 0.0, 0.0, 1.0);
  v_crowd = vec4(0.0);
  v_alpha = a_bflag.y > 0.5 ? 0.6 : 1.0;
  vec2 half_vp = u_viewport * 0.5;
  vec4 c0 = project(a_ends.xy), c1 = project(a_ends.zw);
  vec4 cx = project(a_ends.xy + vec2(u_bridge, 0.0));
  vec2 s0 = c0.xy / c0.w * half_vp, s1 = c1.xy / c1.w * half_vp;
  float len = length(s1 - s0);
  if ((u_pass == 1) != (a_bflag.x > 0.5) || len < 1e-3 || (u_no_bp == 1 && a_bflag.y > 0.5)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 u = (s1 - s0) / len, n = vec2(-u.y, u.x);
  float hw = length(cx.xy / cx.w * half_vp - s0) + u_ring, hl = 0.5 * len;
  v_size = vec3(hl, hw, 0.0);
  // a straight centre line (the stations' polyline frame, T-254)
  v_at = vec4(0.0);
  v_inst = -1;
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  v_p = corner * vec2(hl + 1.0, hw + 1.0);
  vec4 c = project(0.5 * (a_ends.xy + a_ends.zw));
  c.xy += (u * v_p.x + n * v_p.y) / half_vp * c.w;
  gl_Position = c;
}`,vf=`#version 300 es
precision highp float;
uniform float u_ring;
uniform vec3 u_ink;
uniform vec3 u_bad;
uniform vec3 u_crowd_rgb;
uniform highp int u_layer;
uniform float u_tint;    // 1: dots show their crowds as pies (T-228, T-553)
uniform float u_mask;    // 1: the white only marks the stencil (the track drawn through it, T-236)
uniform vec3 u_lanes;    // T-658: 4 m in px, how far double track's two tracks have parted (0-1), their narrowing close in (T-713)
uniform float u_pass_in; // T-2249: px from the centre line to a passing station's outer track's inner edge, 0 none drawn
uniform vec2 u_viewport;
uniform highp sampler2D u_stline;
${H}
in vec2 v_p;
flat in vec3 v_size;
flat in float v_dot;
flat in float v_alpha;
flat in vec4 v_crowd;
flat in vec4 v_scr;
flat in float v_lane;
flat in vec2 v_bulge;
flat in float v_hot;
${ef(`in`)}
${tf}
out vec4 o;
${Fe}
// blueprint track's colours (renderer.ts BP_RAIL_RGB, BP_MID_RGB); a blueprint station is drawn at alpha 0.6
#define BP_RIM vec3(0.184, 0.384, 0.702)
#define BP_FILL vec3(0.663, 0.804, 0.953)
void main() {
  bool bp = v_alpha > 0.45 && v_alpha < 0.99;
  // along and across the platform's own centre line (T-254), as the vertex shader has it; a dot's own frame
  vec2 f = v_p;
  if (v_dot <= 0.0) {
    vec2 q[13];
    for (int i = 0; i < 13; i++) {
      q[i] = v_inst < 0 ? vec2(-v_size.x + 2.0 * v_size.x * float(i) / ${12 .toFixed(1)}, 0.0)
        : centrePoint(v_inst, i, v_at.xy, v_at.zw, v_scr.xz, v_scr.yw);
    }
    f = polyFrame(v_p, q);
    // T-3332: a one-track station's band, off the centre line towards its side
    if (abs(v_lane) > 2.5) f.y -= sign(v_lane) * (abs(v_lane) - 10.0);
  }
  float d = v_dot > 0.0 ? length(v_p) - v_dot : boxSdf(f, v_size.xy);
  // T-3332: the bulge on a one-track station's side, a box from the bar's inner edge out
  if (v_dot <= 0.0 && v_bulge.x > 0.0) {
    float bl = v_bulge.y;
    d = min(d, boxSdf(vec2(f.x, f.y - sign(v_lane) * 0.5 * v_bulge.x), vec2(bl, v_size.y + 0.5 * v_bulge.x)));
  }
  float inner = clamp(0.5 - d - u_ring, 0.0, 1.0);
  // T-1416, T-1527: a terminal's buffer stop, the platform's -axis end where the track ends, is a
  // dark bar wider than the box so it shows past a train standing in it; v_size.z 1 a waiting
  // room, 3 a buffer stop
  bool terminal = v_dot <= 0.0 && v_size.z > 2.5;
  float cap = terminal ? ${Ge.toFixed(2)} * u_ring : u_ring;
  if (terminal) {
    inner *= clamp(f.x + v_size.x - cap + 0.5, 0.0, 1.0);
    d = min(d, boxSdf(vec2(f.x + v_size.x - 0.5 * cap, f.y), vec2(0.5 * cap, v_size.y + ${He.toFixed(2)} * u_ring)));
  }
  float outer = clamp(0.5 - d, 0.0, 1.0);
  if (u_layer == 0) {
    // the whole shape dark, painted white inside the rim next; a blueprint (faded to 0.6, T-2930)
    // is blueprint track's blue: a dark blue rim round a light blue fill
    float a = (v_alpha < 0.99 && !bp ? outer - inner : outer) * (bp ? 1.0 : v_alpha);
    o = vec4(mix(bp ? BP_RIM : u_ink, vec3(1.0), ${ff} * v_hot) * a, a);
  } else if (u_layer == 1) {
    // marking where the track is drawn over the station (T-236): the white's inside, no colour
    if (u_mask > 0.5) {
      if (inner < 0.5 || v_dot > 0.0) discard;
      o = vec4(0.0);
      return;
    }
    float a = inner * (bp ? 1.0 : v_alpha);
    // a dot (zoomed out) shows its platforms' crowd as a pie (T-228, T-553): the white fills
    // clockwise from 12 o'clock with the crowd grey by the fullest side's share, red once full
    vec3 col = bp ? BP_FILL : vec3(1.0);
    float share = clamp(v_crowd.x, 0.0, 1.0);    if (v_dot > 0.0 && u_tint > 0.5 && share > 0.0) {
      vec2 s = vec2(dot(v_p, v_scr.xy), dot(v_p, v_scr.zw));
      float turn = atan(s.x, s.y);
      if (turn < 0.0) turn += 6.2831853;
      float r = length(s);
      float cover = share > 0.995 ? 1.0 : clamp(share * 6.2831853 * r - turn * r + 0.5, 0.0, 1.0) * clamp(turn * r + 0.5, 0.0, 1.0);
      col = mix(col, v_crowd.y > 0.5 ? u_bad : u_crowd_rgb, cover);
    }
    o = vec4(col * a, a);
  } else {
    // riders waiting (T-219): each side's half of the platform fills from its middle outwards, as
    // far as its share of the room to stand there, like a train's gauge; red once full (T-559);
    // right up to the rim (T-1121)
    vec2 p = f;
    float reach = v_size.x - (terminal && p.x < 0.0 ? cap : u_ring);
    // close in on double track (T-658) each side's riders stand on their own platform, from its
    // track out to the rim: the + side's trains travel along the axis, keeping right, so their
    // track and platform are on the + side
    // a one-track station (T-3332): its one platform's riders over the whole of its half box
    bool one = abs(v_lane) > 2.5;
    vec4 cr = !one ? v_crowd : v_lane < 0.0 ? v_crowd.yyww : v_crowd.xxzz;
    float tl = one ? 0.0 : u_lanes.y * min(v_lane, 1.0);
    float yin = tl * (0.5 + 0.5 * ${Yd.toFixed(1)} * u_lanes.z) * u_lanes.x;
    // at a passing station (T-2249) on the island between the running track and the outer one,
    // where trains on both stop
    float yout = v_lane > 1.5 && v_lane < 2.5 && u_pass_in > 0.0 ? max(u_pass_in, yin + 1.0) : 1e9;
    float ap = inner * clamp(p.y - yin + 0.5, 0.0, 1.0) * clamp(yout - p.y + 0.5, 0.0, 1.0) * clamp(cr.x * reach - abs(p.x) + 0.5, 0.0, 1.0);
    float am = inner * clamp(0.5 - p.y - yin, 0.0, 1.0) * clamp(yout + p.y + 0.5, 0.0, 1.0) * clamp(cr.y * reach - abs(p.x) + 0.5, 0.0, 1.0);
    o = vec4((cr.z > 0.5 ? u_bad : u_crowd_rgb) * ap + (cr.w > 0.5 ? u_bad : u_crowd_rgb) * am, ap + am);
  }
}`,yf=`#version 300 es
precision highp float;
uniform vec4 u_bbox;     // CSS px, y down: left, top, right, bottom
uniform vec2 u_css;      // the canvas, CSS px
void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), gl_VertexID < 2 ? 0.0 : 1.0);
  vec2 s = mix(u_bbox.xy, u_bbox.zw, corner);
  gl_Position = vec4(s.x / u_css.x * 2.0 - 1.0, 1.0 - s.y / u_css.y * 2.0, 0.0, 1.0);
}`,bf=`#version 300 es
precision highp float;
uniform highp sampler2D u_shapes; // per shape SEL_STRIDE texels: middle, along; across, half length, half width; dot radius; its centre line in its frame (T-254)
uniform int u_count;
uniform float u_dpr;
uniform float u_height;  // the canvas, device px
uniform vec3 u_ink;
uniform float u_outline; // CSS px
uniform float u_glow;
out vec4 o;
${Fe}
void main() {
  vec2 p = vec2(gl_FragCoord.x, u_height - gl_FragCoord.y) / u_dpr;
  float d = 1e9;
  for (int i = 0; i < u_count; i++) {
    int k = i * ${Zd};
    vec4 a = texelFetch(u_shapes, ivec2(k, 0), 0);
    vec4 b = texelFetch(u_shapes, ivec2(k + 1, 0), 0);
    vec4 c2 = texelFetch(u_shapes, ivec2(k + 2, 0), 0);
    float dotR = c2.x;
    vec2 r = p - a.xy;
    if (dotR > 0.0) { d = min(d, length(r) - dotR); continue; }
    // nowhere nearer than its middle's distance less its half length and width: skip the line
    if (length(r) - max(b.z, c2.z) - max(b.w, c2.w + abs(c2.y)) > d) continue;
    // its own centre line (T-254)
    ${Array.from({length:Qd},(e,t)=>`vec4 t${t} = texelFetch(u_shapes, ivec2(k + ${3+t}, 0), 0);`).join(`
    `)}
    ${$d(`t`)}
    vec2 pf = polyFrame(vec2(dot(r, a.zw), dot(r, b.xy)), q);
    d = min(d, boxSdf(pf, b.zw));
    // T-3332: a one-track station's bulge: its middle across (y), half length (z), half width (w)
    if (c2.w > 0.0) d = min(d, boxSdf(vec2(pf.x, pf.y - c2.y), c2.zw));
  }
  float line = clamp(u_outline + 0.5 - d, 0.0, 1.0);
  float t = clamp((d - u_outline) / u_glow, 0.0, 1.0);
  float s = max(line, 0.35 * (1.0 - t) * (1.0 - t));
  o = vec4(u_ink * s, s);
}`,xf=`
uniform float u_time;        // game seconds since the render epoch
uniform highp sampler2D u_phases;  // RGBA32F: t, s, v, a
uniform highp sampler2D u_meta;    // RGBA32F per profile: first phase, count, trip s, length m
uniform highp sampler2D u_samples; // RG32F: run 0 of each line, x/y local units
uniform highp sampler2D u_lines;   // RGBA32F per line: first sample, count, length m, step m
uniform highp sampler2D u_bend_at; // R32F per sample: its bend points' first times 32 plus their count (T-4075, network.ts bendAt)
uniform highp sampler2D u_bends;   // RG32F per bend point: its offset from the straight between its samples
uniform int u_back_base;           // T-3250: lines in the table (0 none); row base + line is that line's return run on its own way back, where it has one
in vec2 a_trip;              // profile, departure - epoch (s)
in float a_end;              // drawn until - epoch (s): standing at the terminal for its next departure (T-206)
in float a_lag;              // drawn this many seconds behind its timetable (T-1965, trainGuard.ts)

ivec2 tc(int i, int w) { return ivec2(i % w, i / w); }

// set by trainDist: how far through a stand after its first stop the train is (0-1), else -1
float g_stand = -1.0;
// set by trainDist: a return run drawn along its own way back (T-3250), as a run 0 of its own row
bool g_own = false;

/** The point at distance d (m) along run 0 of a line (L from the line table). */
vec2 lineAt(vec4 L, float d) {
  float first = L.x, count = L.y, len = L.z, step = L.w;
  float dd = clamp(d, 0.0, len);
  float i0 = clamp(floor(dd / step), 0.0, max(count - 2.0, 0.0));
  float seg = max(min(step, len - i0 * step), 1e-3);
  float f = clamp((dd - i0 * step) / seg, 0.0, 1.0);
  int si = int(first + i0);
  vec2 p0 = texelFetch(u_samples, tc(si, ${X}), 0).xy;
  vec2 p1 = texelFetch(u_samples, tc(si + 1, ${X}), 0).xy;
  vec2 p = mix(p0, p1, f);
  // T-4075: where the track bends between the two, through its bend points
  int code = int(texelFetch(u_bend_at, tc(si, ${X}), 0).x + 0.5);
  if (code > 0) {
    int m = code & 31, start = code >> 5;
    float u = f * float(m + 1);
    int j = min(int(floor(u)), m);
    vec2 a = j > 0 ? texelFetch(u_bends, tc(start + j - 1, ${X}), 0).xy : vec2(0.0);
    vec2 b = j < m ? texelFetch(u_bends, tc(start + j, ${X}), 0).xy : vec2(0.0);
    p += mix(a, b, u - float(j));
  }
  return p;
}

/** The train's distance along run 0 of its line now; false if it is not on the track. */
bool trainDist(out vec4 L, out float d, out int line) {
  int prof = int(a_trip.x + 0.5);
  vec4 M = texelFetch(u_meta, tc(prof, ${X}), 0);
  float tau = u_time - a_trip.y - a_lag;
  if (M.y < 0.5 || tau < 0.0 || (tau > M.z && u_time > a_end)) return false;
  int lo = int(M.x), hi = int(M.x + M.y) - 1;
  for (int k = 0; k < 18; k++) {
    if (lo >= hi) break;
    int mid = (lo + hi + 1) / 2;
    if (texelFetch(u_phases, tc(mid, ${X}), 0).x <= tau) lo = mid; else hi = mid - 1;
  }
  vec4 p = texelFetch(u_phases, tc(lo, ${X}), 0);
  float tt = max(tau - p.x, 0.0);
  if (p.w < 0.0) tt = min(tt, p.z / -p.w);
  float s = p.y + p.z * tt + 0.5 * p.w * tt * tt;
  if (lo > int(M.x) && lo < int(M.x + M.y) - 1) {
    vec4 p1 = texelFetch(u_phases, tc(lo + 1, ${X}), 0);
    if (p.z == 0.0 && p.w == 0.0) g_stand = clamp((tau - p.x) / max(p1.x - p.x, 1e-3), 0.0, 1.0);
    // braking into a stand: not there yet, though the stretch ahead may already be the next one
    else if (p.w < 0.0 && p1.z == 0.0 && p1.w == 0.0) g_stand = 0.0;
  }
  line = prof / 170;
  int run = (prof / 85) % 2;
  d = run == 0 ? s : M.w - s;
  L = texelFetch(u_lines, tc(line, ${Z}), 0);
  if (run == 1 && u_back_base > 0 && line < u_back_base) {
    vec4 B = texelFetch(u_lines, tc(u_back_base + line, ${Z}), 0);
    if (B.y > 1.5) { L = B; d = s; g_own = true; }
  }
  return true;
}`,Sf=`#version 300 es
precision highp float;
precision highp int;
${H}
uniform vec2 u_viewport;
uniform float u_px_per_unit;
uniform vec2 u_min_px;      // minimum length, width in px
uniform bool u_detail;
uniform float u_dpr;
uniform highp sampler2D u_cars;
uniform highp sampler2D u_line_colours;
uniform highp sampler2D u_fill;  // RG32F per sample: how full run 0's and run 1's trains are (T-084)
uniform highp sampler2D u_loads;   // R32F: riders aboard each trip of the hour per stretch (T-164)
uniform highp sampler2D u_stretch; // R32F per sample: its stop-to-stop stretch, run 0's numbering; -1 none
uniform int u_sel_line;            // stop editing (T-233): the edited line's trains stay as they are,
uniform int u_sel_n;               // T-1812: and a selected group's lines
uniform int u_sel_set[16];
uniform float u_dim;               // the others' share of full strength
uniform vec2 u_sel_trip;           // the selected train (T-242): profile, departure - epoch; x < 0 none
uniform highp int u_pass;          // 0 every train but the selected, 1 the selected's halo, 2 the selected
uniform float u_psi0;              // the anchor's isometric latitude (T-307): k = cosh(u_psi0 - y * PSI_PER_UNIT)
uniform highp sampler2D u_lane_tex; // RGBA32F per sample: how far apart its track's two tracks are, 0-1 (T-658), its line's band's shift (T-1799, line widths left of run 0) and metres to its ribbon's middle (T-2132)
uniform vec2 u_lane;               // px from the centre line to a track's once parted, how far parted (0-1)
uniform float u_bands;             // px a band's shift of one line width is drawn, 0 none (T-1799)
uniform float u_bands_m;           // and of a metre to its ribbon's middle (T-2132)
uniform vec2 u_passing;            // T-2233: px from the centre line to a passing station's outer track, 1 drawn there
uniform float u_keep;              // T-3297: 1 where trains keep right of their travel, -1 left
uniform int u_level_hide;          // T-3420: the levels not drawn (the strokes' u_level_hide), and per sample its height in levels
uniform highp sampler2D u_slevel;
out float v_alpha;
in vec2 a_load;               // this trip's first load in u_loads or -1, seconds to its last stop
in vec4 a_stand;              // its stand at the terminal (T-1785): from, until - epoch (s), the next
                              // trip's first load in u_loads or -1, else its riders leaving or -1
in vec4 a_bay;                // where it stands at its ends (T-2980, terminalBays.ts \`assignBays\`)
${pf}
${xf}
${qs}
out vec2 v_uv;
flat out float v_k;
out vec2 v_px;
out vec3 v_color;
out vec3 v_empty;
out float v_fill;
out float v_front;
out vec2 v_consist;
out float v_detail;
out float v_cab;
flat out float v_boat;

/** How far apart the two tracks are at distance d along run 0 (laneAt in network.ts), the
 * line's band's shift and metres there (bandAt), and m past a passing platform it stops at (T-2233). */
vec4 laneAt(vec4 L, float d) {
  float dd = clamp(d, 0.0, L.z);
  float i0 = clamp(floor(dd / L.w), 0.0, max(L.y - 2.0, 0.0));
  float f = clamp((dd - i0 * L.w) / max(min(L.w, L.z - i0 * L.w), 1e-3), 0.0, 1.0);
  int si = int(L.x + i0);
  return mix(texelFetch(u_lane_tex, tc(si, ${X}), 0), texelFetch(u_lane_tex, tc(si + (L.y > 1.5 ? 1 : 0), ${X}), 0), f);
}
/** A train's shift across, px: on its own track (T-658), or \`across\` of the way to it (-1 the other
 * track, T-2980), its band (T-1799, T-2132), and onto a passing station's outer track where it stops
 * (T-2233, network.ts \`passingTracks\`). */
float shiftAt(vec4 lb, float side, float across) {
  float base = side * across * u_lane.y * lb.x * u_lane.x + lb.y * u_bands + lb.z * u_bands_m;
  return mix(base, side * u_passing.x, u_passing.y * (1.0 - smoothstep(0.0, ${100 .toFixed(1)}, lb.w)));
}

// T-2980, set in main: its run and that run's length, m
int g_run = 0;
float g_len = 0.0;

/** A place distance of a_bay (terminalBays.ts bayP): below 0 is a through end's, \`-p - 1\` m. */
float bayP(float v) { return v < 0.0 ? -v - 1.0 : v; }
/** The nearest its middle may be to a run's end (terminalBays.ts endClear, T-3053). */
float endClear(float v, float trainM) { return v < 0.0 ? max(0.0, trainM * 0.5 + v + 1.0) : trainM * 0.5; }

/** The point \`d\` m along run 0, carried on straight past either end (into a terminal's siding). */
vec2 lineAtX(vec4 L, float d) {
  float k = min(20.0, L.z);
  if (d > L.z && k > 1e-3) { vec2 a = lineAt(L, L.z); return a + (a - lineAt(L, L.z - k)) * (d - L.z) / k; }
  if (d < 0.0 && k > 1e-3) { vec2 a = lineAt(L, 0.0); return a + (a - lineAt(L, k)) * -d / k; }
  return lineAt(L, d);
}

/** T-2980: how far across to its own track the point \`x\` m along run 0 of a train \`trainM\` long is
 * drawn (1 its own, -1 the other, between on a crossover or a siding's lead): crossing the scissors
 * into a dead end's other platform or out of it, leaving a through platform over the crossover
 * behind it, or into a terminal's siding and out to the other platform. */
float acrossAt(float x, float trainM) {
  float q = g_run == 0 ? g_len - x : x, r = g_run == 0 ? x : g_len - x;
  float sc = a_bay.x < 0.0 ? -1.0 : mod(a_bay.x, 4.0), ec = a_bay.z < 0.0 ? -1.0 : mod(a_bay.z, 4.0);
  if (r < q) {
    if (sc < 0.5 || sc > 1.5) return 1.0;
    float p = max(bayP(a_bay.y), trainM + 5.0);
    return mix(-1.0, 1.0, smoothstep(p, p + ${50 .toFixed(1)}, r));
  }
  if (ec > 0.5 && ec < 1.5) {
    float p = max(bayP(a_bay.w), trainM + 5.0);
    return mix(-1.0, 1.0, smoothstep(p, p + ${50 .toFixed(1)}, q));
  }
  return 1.0;
}

void main() {
  vec4 L;
  float d;
  int line;
  // the selected train is drawn last, over the others, with its halo under it (T-242)
  bool chosen = u_sel_trip.x >= 0.0 && abs(a_trip.x - u_sel_trip.x) < 0.5 && abs(a_trip.y - u_sel_trip.y) < 0.01;
  if ((u_pass == 0) == chosen || !trainDist(L, d, line)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // T-3420: a hidden line's trains
  if (texelFetch(u_line_colours, ivec2(line % ${Z}, line / ${Z}), 0).a < 0.5) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float rawCars = texelFetch(u_cars, tc(line, ${Z}), 0).x;
  // a tram (T-2926): its sections as a whole number plus a half; 2.4 m across, sections end to end
  bool tram = rawCars >= 1.0 && fract(rawCars) > 0.25;
  if (tram) rawCars = floor(rawCars);
  // a bus (T-1464): one car under a full car's length, which is its value here; narrower than a train.
  // A boat (T-2194): below 0, its length in cars; one hull, 8 m across
  bool boat = rawCars < 0.0;
  bool bus = !boat && rawCars < 0.99;
  float cars = boat ? 1.0 : max(1.0, rawCars);
  // T-2957: a bus is one straight body; its minimum on-screen size is 0.65 as long (Anita undid the extra 10%, 2026-11-10)
  const float BUS_LEN = 0.65;
  float carM = boat ? -rawCars * 20.0 : bus ? rawCars * 20.0 : 20.0;
  v_boat = boat ? 1.0 : 0.0;
  int car = u_detail ? gl_VertexID / 6 : 0;
  if (float(car) >= cars) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float totalM = min(cars * carM, L.z);
  float pitchM = totalM / cars;
  int prof = int(a_trip.x + 0.5);
  vec4 M = texelFetch(u_meta, tc(prof, ${X}), 0);
  g_run = g_own ? 0 : (prof / 85) % 2;
  g_len = M.w;
  // T-3053: at a through end it stands with its middle at the stop, so up to half its length past the line's end
  float cLo = endClear(g_run == 0 ? a_bay.y : a_bay.w, totalM);
  float centre = clamp(d, cLo, max(cLo, L.z - endClear(g_run == 0 ? a_bay.w : a_bay.y, totalM)));
  d = centre;
  float offsetM = u_detail ? (float(car) + 0.5) * pitchM - totalM * 0.5 : 0.0;
  float carD = u_detail ? centre + offsetM : d;
  // T-3420, T-3560: a car on a switched-off level is drawn faint
  float lvShown = 1.0;
  if (u_level_hide != 0) {
    int sl = int(L.x + clamp(floor(clamp(carD, 0.0, L.z) / max(L.w, 1e-6)), 0.0, max(L.y - 1.0, 0.0)));
    lvShown = levelShown(texelFetch(u_slevel, tc(sl, ${X}), 0).x);
  }
  vec2 p = lineAtX(L, carD);
  // local units per metre of ground where the train is (T-307: mercator's scale, 1 / cos(lat))
  float kM = cosh(u_psi0 - p.y * ${c.toExponential(9)});
  // Both representations share the same width: splitting into cars must not shrink the train.
  // a bus (T-1798) is drawn 1.4 times its size from a distance and 1.2 times its real one close up
  vec2 px = max(bus ? u_min_px * vec2(0.77 * BUS_LEN, 0.77) : boat ? u_min_px * vec2(1.0, 1.3) : tram ? u_min_px * vec2(0.75, 0.885) : u_min_px, vec2(cars * carM, bus ? 2.5 : boat ? 8.0 : tram ? 2.4 : 3.0) * kM * u_px_per_unit * (bus ? 1.2 : 1.0));
  if (u_detail) px.x = max(bus ? 2.8 * BUS_LEN * u_dpr : 2.0 * u_dpr, pitchM * (bus ? 1.2 : 1.0) * kM * u_px_per_unit - (tram ? 0.0 : max(1.5 * u_dpr, kM * u_px_per_unit)));
  // on its own track as double track parts (T-658): narrowing to its true 3 m, so two trains
  // passing never touch, and keeping to its side of its direction of travel (T-319, u_keep)
  vec4 lb = laneAt(L, carD);
  float lane = u_lane.y * lb.x;
  px.y = mix(px.y, (tram ? 2.4 : 3.0) * kM * u_px_per_unit, lane);
  // Heading along the chord between the train's two ends (as its bogies sit on the track), not
  // the sample segment under its centre, which turns in steps on curves (T-047).
  float h = max(0.5 * px.x / u_px_per_unit / kM, 1.0);
  vec2 back = lineAtX(L, carD - h), front = lineAtX(L, carD + h);
  vec4 c = project(p);
  vec4 cb = project(back);
  vec4 cf = project(front);
  vec2 half_vp = u_viewport * 0.5;
  vec2 bs = cb.xy / cb.w * half_vp, fs = cf.xy / cf.w * half_vp;
  vec2 sdir = fs - bs;
  float sl = length(sdir);
  sdir = sl > 1e-6 ? sdir / sl : vec2(1.0, 0.0);
  vec2 nrm = vec2(-sdir.y, sdir.x);
  // T-2182: its two ends each shifted by the band there, so a train easing sideways with its band
  // turns with it rather than sliding crabwise
  float side = (g_run == 0 ? -1.0 : 1.0) * u_keep;
  vec4 lbb = laneAt(L, carD - h), lbf = laneAt(L, carD + h);
  float shB = shiftAt(lbb, side, acrossAt(carD - h, totalM)), shF = shiftAt(lbf, side, acrossAt(carD + h, totalM));
  if (shB != shF) {
    bs += nrm * shB;
    fs += nrm * shF;
    vec2 sd = fs - bs;
    float sl2 = length(sd);
    if (sl2 > 1e-6) {
      sdir = sd / sl2;
      nrm = vec2(-sdir.y, sdir.x);
      sl = sl2;
    }
    // (the ends back in the frame of the train's own centre, unshifted, for the bend below)
    float shC0 = shiftAt(lb, side, acrossAt(carD, totalM));
    bs -= nrm * shC0;
    fs -= nrm * shC0;
  }
  // A train as one pill bends with its track (T-189): along the circle through its two ends and
  // its middle, as a station's platform does (SHAPE_GLSL); a car close up bends along its own (a tram's
  // street corner is tighter than a car is long, T-4075). k: curvature, 1/px, towards +nrm; ends: where
  // the ends lie across the frame.
  float k = 0.0, ends = 0.0;
  if (!bus && sl > 1e-3) {
    float hc = 0.5 * sl, s = dot(c.xy / c.w * half_vp - 0.5 * (bs + fs), nrm);
    k = clamp(-2.0 * s / (hc * hc + s * s), -2.0 / px.x, 2.0 / px.x);
    ends = -s;
  }
  // Two independent triangles per car, so adjacent cars never share a strip across a bend.
  int tri = gl_VertexID % 6;
  int id = u_detail ? (tri == 0 ? 0 : tri == 1 ? 1 : tri == 2 ? 2 : tri == 3 ? 2 : tri == 4 ? 1 : 3) : gl_VertexID;
  vec2 corner = vec2(float(id & 1) * 2.0 - 1.0, id < 2 ? -1.0 : 1.0);
  // 1 px larger than the train all round, so the soft edge is never cut by the quad (T-047).
  vec2 halfq = px * 0.5 + 1.0;
  // The halo (T-242): room for the outline, the ring and the glow round the whole consist; bent no
  // tighter than its reach, so the bend's centre never falls inside it.
  if (u_pass == 1) {
    float reach = ${(rf+6+4).toFixed(1)} * u_dpr;
    halfq += reach;
    k = clamp(k, -0.8 / halfq.y, 0.8 / halfq.y);
  }
  vec2 q = vec2(corner.x * halfq.x * (1.0 + halfq.y * abs(k)), corner.y < 0.0 ? min(0.0, ends) - halfq.y : max(0.0, ends) + halfq.y);
  float shift = shiftAt(lb, side, acrossAt(carD, totalM));
  c.xy += (sdir * q.x + nrm * (q.y + shift)) / half_vp * c.w;
  gl_Position = c;
  v_uv = q;
  v_k = k;
  v_px = px;
  vec3 lc = texelFetch(u_line_colours, ivec2(line % ${Z}, line / ${Z}), 0).rgb;
  v_color = lc * 0.48;
  v_alpha = (selectedLine(line) ? 1.0 : u_dim) * lvShown;
  // How full it is (T-084): the stretch it runs, from the sample ahead of it on its way.
  int run = (int(a_trip.x + 0.5) / 85) % 2;
  float i = floor(clamp(d, 0.0, L.z) / L.w) + (g_run == 0 ? 1.0 : 0.0);
  int si = int(L.x + clamp(i, 0.0, L.y - 1.0));
  vec2 f = texelFetch(u_fill, tc(si, ${X}), 0).xy;
  v_fill = run == 0 ? f.x : f.y;
  // Its own load from the boarding account where there is one (T-164); the fill above then only
  // says whether train loads are shown for this line. Empty once at its last stop, then filling
  // over its stand there with its next trip's riders (T-1785), as the platform empties.
  float st = texelFetch(u_stretch, tc(si, ${X}), 0).x;
  if (v_fill >= 0.0 && a_load.x >= 0.0 && st >= 0.0) {
    float aboard;
    if (u_time - a_trip.y - a_lag >= a_load.y) {
      float f = clamp((u_time - a_stand.x) / max(a_stand.y - a_stand.x, 1.0), 0.0, 1.0);
      aboard = f * (a_stand.z >= 0.0 ? texelFetch(u_loads, tc(int(a_stand.z + st + 0.5), ${X}), 0).x : max(a_stand.w, 0.0));
    } else {
      aboard = texelFetch(u_loads, tc(int(a_load.x + st + 0.5), ${X}), 0).x;
      // standing at a stop: from the load it came in with to the one it leaves with (T-1785); a
      // stand between stops has the same stretch behind it as ahead
      int sb = int(L.x + clamp(i + (g_run == 0 ? -2.0 : 2.0), 0.0, L.y - 1.0));
      float back = texelFetch(u_stretch, tc(sb, ${X}), 0).x;
      if (g_stand >= 0.0 && back >= 0.0 && abs(back - st) > 0.5) {
        float came = texelFetch(u_loads, tc(int(a_load.x + st + (run == 0 ? -1.0 : 1.0) + 0.5), ${X}), 0).x;
        aboard = mix(came, aboard, g_stand);
      }
    }
    // a boat holds its size's cars' riders (T-3892: told by its length, map/network.ts BOAT_CAR), a bus a third of a
    // car's (T-2195, T-2919, game/boarding.ts capacity)
    float held = boat ? (rawCars > -1.5 ? ${o[0].cars.toFixed(1)} : rawCars > -3.0 ? ${o[1].cars.toFixed(1)} : ${o[2].cars.toFixed(1)}) : bus ? ${Et.toFixed(6)} : cars;
    float seats = ${44 .toFixed(1)} * held, rated = ${160 .toFixed(1)} * held, crush = ${240 .toFixed(1)} * held;
    // T-2186: 1 at the rated load, then the second band to 2 at crush (game/boarding.ts gauge)
    v_fill = aboard <= seats ? 0.5 * aboard / seats : aboard <= rated ? 0.5 + 0.5 * (aboard - seats) / (rated - seats) : min(1.99, 1.0 + (aboard - rated) / (crush - rated));
    // packed to crush (the account never goes past it: whoever does not fit waits) draws with the
    // red edge, so a full train stands out from one nearly full (T-207)
    if (aboard >= crush - 0.5) v_fill = 2.0;
  } else {
    // no account for this train (its line's stops just changed, or demand is not in yet): no
    // gauge, rather than the forecast's average train in its place (T-230, Anita); striped as
    // "not worked out yet" where its line shows loads (T-324), never solid like a full train
    v_fill = v_fill >= 0.0 || v_fill < -1.5 ? -2.0 : -1.0;
  }
  v_empty = mix(lc, vec3(1.0), 0.18);
  v_front = g_run == 0 ? 1.0 : -1.0;
  v_consist = vec2(u_detail ? totalM * kM * u_px_per_unit : px.x, offsetM * kM * u_px_per_unit);
  v_detail = u_detail ? 1.0 : 0.0;
  v_cab = u_detail && (g_run == 0 ? float(car) == cars - 1.0 : car == 0) ? 1.0 : 0.0;
}`,Cf=`#version 300 es
precision highp float;
in vec2 v_uv;
flat in float v_k;
in vec2 v_px;
in vec3 v_color;
in vec3 v_empty;
in float v_fill;
in float v_front;
in vec2 v_consist;
in float v_detail;
in float v_cab;
in float v_alpha;
flat in float v_boat;
uniform float u_dpr;
uniform vec3 u_bad;
uniform highp int u_pass;
uniform vec3 u_ink;
uniform vec3 u_band;
uniform bool u_hollow;
out vec4 o;
${Fe}
void main() {
  // along the train's bend and across it (T-189)
  vec2 p = arc(v_uv, v_k);
  float r = v_detail > 0.5 || v_boat > 0.5 ? min(2.0 * u_dpr, v_px.y * 0.22) : v_px.y * 0.5;
  vec2 q = abs(p) - (v_px * 0.5 - r);
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  if (v_boat > 0.5) {
    // a boat's hull (T-2194): its front third narrows to a point
    float hx = v_px.x * 0.5, hy = v_px.y * 0.5, bow = hx - min(0.66 * v_px.x, 1.6 * v_px.y);
    vec2 n = normalize(vec2(hy, hx - bow));
    d = max(d, dot(vec2(p.x * v_front - bow, abs(p.y) - hy), n));
  }
  if (u_pass == 1) {
    // the selected train's halo (T-242), from the train out: an outline in the map ink as a
    // selected station has (T-189), a band in the casing's colour, a ring of the same shape in the
    // ink, and a soft glow beyond it; dark, then white, in the light theme (T-543)
    float ol = ${2 .toFixed(1)} * u_dpr, gap = ${rf.toFixed(1)} * u_dpr, gw = ${6 .toFixed(1)} * u_dpr;
    float edge = clamp(ol + 0.5 - d, 0.0, 1.0);
    float ring = clamp(1.25 * u_dpr + 0.5 - abs(d - gap), 0.0, 1.0);
    float t = clamp((d - gap - 1.25 * u_dpr) / gw, 0.0, 1.0);
    float glow = d > gap ? 0.35 * (1.0 - t) * (1.0 - t) : 0.0;
    float white = d > ol && d < gap ? 0.9 : 0.0;
    float s = max(max(edge, ring), glow);
    o = vec4(u_ink, 1.0) * s + vec4(u_band, 1.0) * white * (1.0 - s);
    return;
  }
  float a = clamp(0.5 - d, 0.0, 1.0) * v_alpha;
  vec3 core = v_color;
  vec3 rim = vec3(1.0);
  if (v_fill >= 0.0) {
    float back = (p.x + v_consist.y) * v_front + v_consist.x * 0.5;
    core = mix(v_empty, v_color, clamp(min(v_fill, 1.0) * v_consist.x - back + 0.5, 0.0, 1.0));
    if (v_fill > 1.0) core = mix(core, mix(v_color, u_bad, 0.65), clamp((v_fill - 1.0) * v_consist.x - back + 0.5, 0.0, 1.0));
    if (v_fill > 1.995) rim = u_bad;
  } else if (v_fill < -1.5) {
    // riders not worked out yet (T-324): diagonal stripes of the line colour and white
    float w = max(2.0, 2.0 * u_dpr);
    core = mod(p.x + p.y, 2.0 * w) < w ? v_empty : vec3(1.0);
  }
  // A front cab reads as a train once each car is large enough to see it.
  if (v_detail > 0.5 && v_px.x > 18.0 * u_dpr) {
    bool cab = v_cab > 0.5 && p.x * v_front > v_px.x * 0.30 && abs(p.y) < v_px.y * 0.30;
    if (cab) core *= 0.55;
  }
  // a full train's red edge is wider than the white one, so it reads at a glance (T-207; T-218,
  // Anita: "not super noticeable", 50% thicker than T-207's 2.6 px)
  float rimW = v_fill > 1.995 ? 3.9 : 1.7;
  // the start menu's logo (T-1567): white inside a rim of the line's colour
  if (u_hollow) { core = vec3(1.0); rim = v_color / 0.48; rimW = max(1.7, 0.28 * v_px.y); }
  vec3 col = mix(core, rim, clamp(d + rimW, 0.0, 1.0));
  o = vec4(col * a, a);
}`,wf=`#version 300 es
precision highp float;
precision highp int;
${xf}
out vec2 v_pos;
void main() {
  vec4 L;
  float d;
  int line;
  v_pos = trainDist(L, d, line) ? lineAt(L, d) : vec2(1e9);
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`,Tf=`#version 300 es
precision mediump float;
out vec4 o;
void main() { o = vec4(0.0); }`,Ef=3600,Df=z(`#77746f`),Of=z(Sn),kf=z(`#a9cdf3`),Af=z(`#2f62b3`),jf=.16,Mf=.75,Nf=[[10,3],[11,5.25],[12,6],[15,9]],Pf=[[9,.85],[12,3.9],[15,6.6]].map(([e,t])=>[e,t*me]),Ff=[[9,1.4],[11,1.25],[13,1]],If=[3,5],Lf=new Int32Array(16),Rf=e=>new Float32Array(Math.max(1,e)*4).fill(-1);function zf(e,t,n){let r=Math.min(n?.length??0,16);for(let e=0;e<r;e++)Lf[e]=n[e];e.uniform1i(t.u_sel_n,r),e.uniform1iv(t.u_sel_set,Lf)}function Bf(e,t){return!t||t.length!==e.length?e:e.map((e,n)=>t[n]>=0?t[n]:e)}var Vf=.2,Hf=[1.25,1.75],Uf=Le(`muteThin`)?null:[.45,.5],Wf=!Le(`bandGap`),Gf=!Le(`bays`),Kf=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)};function qf(e){let t=4*$t(0)*B(e),n=Math.max(0,Math.min(1,(t-4)/3)),r=Math.max(0,Math.min(1,(t-7)/3)),i=1-Vf*Math.max(0,Math.min(1,(t-10)/6));return{gap:t,grow:n,t:r,narrow:i,share:Yd*i,reach:n>0?.5*(1+Yd*i)*t:0}}function Jf(e,t){let n=qf(e),r=n.gap/4,i=Mt(e,Nf)*(1-n.t)+3*r*n.t,a=Math.max(6*r,i+l);return{off:a,half:a+i/2+t+1,mPx:r}}var Yf=14,Xf=z(`#a4a19d`),Zf=.3;function Qf(e){let t=new Float32Array(e*3);for(let n=0;n<e;n++)t[n*3]=1;return t}function $f(e,t,n,r=0){let i=new Float32Array(Math.max(1,t)*2),a=e.seg,o=0;for(let s=r,c=0;c<t;s++,c++)c>0&&(e.colour[s]!==e.colour[s-1]||e.edge[s]!==e.edge[s-1]||a[s*4]!==a[s*4-2]||a[s*4+1]!==a[s*4-1])&&(o=0),n&&(i[c*2]=n(s)),i[c*2+1]=o,o+=Math.hypot(a[s*4+2]-a[s*4],a[s*4+3]-a[s*4+1]);return i}var ep=[`seg`,`colour`,`edge`,`level`,`flags`,`speed`,`lane`,`band`],tp=.25,np=e=>e<10?2:+(e<12),rp=1e3;function ip(e,t,n){let r=t*6,i=n*6;for(let t=0;t<6;t++)if(e[i+t]!==e[r+t])return!0;return e[r]!==e[r+1]||e[r+2]!==e[r+3]||e[r+4]!==e[r+5]}var ap=8,op=10,sp=512;function cp(e,t){let n=Math.max(1,Math.ceil(t/16)),r=[new Float32Array(n*4)],i=r[0];for(let r=0;r<n;r++){let n=1/0,a=1/0,o=-1/0,s=-1/0;for(let i=r*16,c=Math.min(t,i+16)*4;i*4<c;i++){let t=i*4;n=Math.min(n,e[t],e[t+2]),o=Math.max(o,e[t],e[t+2]),a=Math.min(a,e[t+1],e[t+3]),s=Math.max(s,e[t+1],e[t+3])}i[r*4]=n,i[r*4+1]=a,i[r*4+2]=o,i[r*4+3]=s}for(let e=i;e.length/4>ap;){let t=Math.ceil(e.length/4/ap),n=new Float32Array(t*4);for(let r=0;r<t;r++){let t=1/0,i=1/0,a=-1/0,o=-1/0;for(let n=r*ap;n<Math.min(e.length/4,(r+1)*ap);n++)t=Math.min(t,e[n*4]),i=Math.min(i,e[n*4+1]),a=Math.max(a,e[n*4+2]),o=Math.max(o,e[n*4+3]);n.set([t,i,a,o],r*4)}r.push(n),e=n}return r}function lp(e,t){let n=[];for(let r=0;r<e.length;r+=2){let i=n.length;i&&n[i-2]+n[i-1]>=e[r]-t?n[i-1]=e[r]+e[r+1]-n[i-2]:n.push(e[r],e[r+1])}return n}function up(e,t,n,r,i,a,o=0){let s=[],c=!0,l=(e,t)=>{let n=s.length;n&&s[n-2]+s[n-1]>=e?s[n-1]=t-s[n-2]:s.push(e,t-e)},u=(s,d)=>{let f=e[s],p=16*ap**s,m=d*p,h=Math.min(t,m+p);if(m>=h)return;let g=0,_=0,v=0,y=0,b=0;for(let e=0;e<4;e++){let[t,o]=n(f[d*4+(e&1?2:0)],f[d*4+(e&2?3:1)]);if(t!==t||o!==o){g=_=v=y=0,b=-1;break}t<-a&&g++,t>r+a&&_++,o<-a&&v++,o>i+a&&y++,t>=-a&&t<=r+a&&o>=-a&&o<=i+a&&b++}if(g===4||_===4||v===4||y===4)c=!1;else if(s<=o||b===4)l(m,h);else for(let t=d*ap;t<Math.min(e[s-1].length/4,(d+1)*ap);t++)u(s-1,t)},d=e.length-1;for(let t=0;t<e[d].length/4;t++)u(d,t);return c?null:s}function dp(e,t,n,r=0,i=1/0){let a=e.count,o=e.seg,s=e.stretch,c=e.band,l=[];for(let u=0;r<a;u++){if((u&255)==255&&performance.now()>i)return r;let d=r+1;for(;d<a&&d-r<sp;d++){let n=d*4;if(Math.abs(o[n]-o[n-2])+Math.abs(o[n+1]-o[n-1])>.001||e.colour[d]!==e.colour[r]||e.edge[d]!==e.edge[r]||e.level[d]!==e.level[r]||e.flags[d]!==e.flags[r]||s&&s[d]!==s[r]||c&&(ip(c,r,d)||e.flags[r]&512)||t&&Math.abs(t[d]-t[r])>op)break}n[r]=1/0;let f=e=>e<d?o[e*4]:o[e*4-2],p=e=>e<d?o[e*4+1]:o[e*4-1];for(l.push(r,d,1/0);l.length;){let e=l.pop(),t=l.pop(),r=l.pop();if(t-r<2)continue;let i=f(r),a=p(r),s=f(t)-i,c=p(t)-a,u=s*s+c*c,d=r+1,m=-1;for(let e=r+1;e<t;e++){let t=o[e*4]-i,n=o[e*4+1]-a,r=u>0?Math.max(0,Math.min(1,(t*s+n*c)/u)):0,l=t-r*s,f=n-r*c,p=l*l+f*f;p>m&&(m=p,d=e)}let h=Math.min(Math.sqrt(m),e);n[d]=h,l.push(r,d,h,d,t,h)}r=d}return a}function fp(e,t,n,r){let i=e.count,a=0;for(let e=0;e<i;e++)t[e]>n&&a++;let o=new Uint32Array(a);for(let e=0,r=0;e<i;e++)t[e]>n&&(o[r++]=e);let s=new Float32Array(a*4),c=new Uint32Array(a),l=new Uint32Array(a),u=new Float32Array(a),d=new Float32Array(a),f=r?new Float32Array(a):void 0,p=e.lane?new Uint8Array(a*2):void 0,m=e.stretch?new Float32Array(a):void 0,h=e.band?new Int16Array(a*6):void 0;return{strokes:{seg:s,colour:c,edge:l,level:u,flags:d,speed:f,dist:new Float32Array,stretch:m,lane:p,band:h,count:a},first:o,fill:(t,n)=>{for(let g=t;g<Math.min(n,a);g++){let t=o[g],n=(g+1<a?o[g+1]:i)-1;if(s[g*4]=e.seg[t*4],s[g*4+1]=e.seg[t*4+1],s[g*4+2]=e.seg[n*4+2],s[g*4+3]=e.seg[n*4+3],c[g]=e.colour[t],l[g]=e.edge[t],u[g]=e.level[t],d[g]=e.flags[t],f&&(f[g]=r[t]),m&&(m[g]=e.stretch[t]),p&&(p[g*2]=e.lane[t*2],p[g*2+1]=e.lane[n*2+1]),h){let r=e.band,i=g*6,a=t*6,o=n*6;h[i]=r[a],h[i+1]=r[o+1],h[i+2]=r[a+2],h[i+3]=r[o+3],h[i+4]=r[a+4],h[i+5]=r[o+5]}}}}}var pp=4096,mp=class{gl;vao;count=0;wmulBuf;fullBuf;bufs=[];cap=0;seg=new Float32Array;colour=new Uint32Array;edge=new Uint32Array;level=new Float32Array;flags=new Float32Array;speed=new Float32Array;lane=new Uint8Array;wmul=new Float32Array;full=new Float32Array;band=new Int16Array;constructor(e,t){this.gl=e,this.vao=e.createVertexArray(),e.bindVertexArray(this.vao);let n=(n,r,i,a=!1,o=!1,s=0)=>{let c=t(n),l=e.createBuffer();return this.bufs.push(l),c<0||(e.bindBuffer(e.ARRAY_BUFFER,l),e.enableVertexAttribArray(c),a?e.vertexAttribIPointer(c,r,i,s,0):e.vertexAttribPointer(c,r,i,o,s,0),e.vertexAttribDivisor(c,1)),l};n(`a_seg`,4,e.FLOAT),n(`a_colour`,1,e.UNSIGNED_INT,!0),n(`a_edge`,1,e.UNSIGNED_INT,!0),n(`a_level`,1,e.FLOAT),n(`a_flags`,1,e.FLOAT),n(`a_speed`,1,e.FLOAT),n(`a_lane`,2,e.UNSIGNED_BYTE,!1,!0),this.wmulBuf=n(`a_wmul`,3,e.FLOAT),this.fullBuf=n(`a_full`,2,e.FLOAT);let r=n(`a_band`,4,e.SHORT,!1,!0,12),i=t(`a_band_m`);i>=0&&(e.bindBuffer(e.ARRAY_BUFFER,r),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.SHORT,!0,12,8),e.vertexAttribDivisor(i,1)),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null)}grow(e){let t=this.gl,n=Math.max(pp,this.cap);for(;n<e;)n*=2;this.cap=n,this.seg=new Float32Array(n*4),this.colour=new Uint32Array(n),this.edge=new Uint32Array(n),this.level=new Float32Array(n),this.flags=new Float32Array(n),this.speed=new Float32Array(n),this.lane=new Uint8Array(n*2),this.wmul=new Float32Array(n*3),this.full=new Float32Array(n*2),this.band=new Int16Array(n*6);let r=[16,4,4,4,4,4,2,12,8,12];this.bufs.forEach((e,i)=>{t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,n*r[i],t.DYNAMIC_DRAW)})}fill(e,t,n){let r=this.gl;n>this.cap&&this.grow(n);let{seg:i,colour:a,edge:o,level:s,flags:c,speed:l,lane:u,wmul:d,full:f,band:p}=this,m=0;for(let n=0;n<t.length;n+=2){let r=t[n],h=t[n+1];hp(i,m*4,e.seg,r*4,h*4),hp(a,m,e.colour,r,h),hp(o,m,e.edge,r,h),hp(s,m,e.level,r,h),hp(c,m,e.flags,r,h),hp(l,m,e.speed,r,h),e.lane&&hp(u,m*2,e.lane,r*2,h*2),e.wmul&&hp(d,m*3,e.wmul,r*3,h*3),e.full&&hp(f,m*2,e.full,r*2,h*2),e.band&&hp(p,m*6,e.band,r*6,h*6),m+=h}if(e.lane||u.fill(255,0,n*2),!e.wmul){d.fill(0,0,n*3);for(let e=0;e<n;e++)d[e*3]=1}e.full||f.fill(0,0,n*2),e.band||p.fill(0,0,n*6);let h=[i,a,o,s,c,l,u,d,f,p],g=[4,1,1,1,1,1,2,3,2,6];this.bufs.forEach((e,t)=>{r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferSubData(r.ARRAY_BUFFER,0,h[t],0,n*g[t])}),r.bindBuffer(r.ARRAY_BUFFER,null),this.count=n}dispose(){let e=this.gl;e.deleteVertexArray(this.vao);for(let t of this.bufs)e.deleteBuffer(t);this.bufs=[],this.count=0}};function hp(e,t,n,r,i){if(i>48)e.set(n.subarray(r,r+i),t);else for(let a=0;a<i;a++)e[t+a]=n[r+a]}function gp(e,t,n,r,i=e.res){let a=e.gl,o=n===`r32f`?1:n===`rg32f`?2:4,s=Math.max(1,Math.ceil(t.length/o)),c=Math.max(1,Math.ceil(s/r)),l=n===`rgba8`?new Uint8Array(r*c*4):new Float32Array(r*c*o);l.set(t);let u=a.createTexture();return a.bindTexture(a.TEXTURE_2D,u),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.pixelStorei(a.UNPACK_ALIGNMENT,4),n===`r32f`?a.texImage2D(a.TEXTURE_2D,0,a.R32F,r,c,0,a.RED,a.FLOAT,l):n===`rg32f`?a.texImage2D(a.TEXTURE_2D,0,a.RG32F,r,c,0,a.RG,a.FLOAT,l):n===`rgba32f`?a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,r,c,0,a.RGBA,a.FLOAT,l):a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,r,c,0,a.RGBA,a.UNSIGNED_BYTE,l),i.push({del:()=>a.deleteTexture(u)}),u}function Q(e,t,n=e.res){let r=e.gl,i=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,null),n.push({del:()=>r.deleteBuffer(i)}),i}function $(e,t,n,r,i,a,o,s=!1){let c=e.gl,l=c.getAttribLocation(t,n);l<0||(c.bindBuffer(c.ARRAY_BUFFER,r),c.enableVertexAttribArray(l),s?c.vertexAttribIPointer(l,i,a,0,0):c.vertexAttribPointer(l,i,a,!1,0,0),c.vertexAttribDivisor(l,o))}function _p(e,t,n=e.res,r,i){let a=e.gl,o=a.createVertexArray();n.push({del:()=>a.deleteVertexArray(o)}),a.bindVertexArray(o);let s=e.strokeProg,c=t.count,l=[],u=r&&c&&r.old.attribs?.length===ep.length?r:null,d=(t,r,i,o)=>{let s=r*i,d;if(!c)d=Q(e,o,n);else if(!u)d=Q(e,t(0,c),n);else{d=a.createBuffer(),n.push({del:()=>a.deleteBuffer(d)}),a.bindBuffer(a.COPY_WRITE_BUFFER,d),a.bufferData(a.COPY_WRITE_BUFFER,c*s,a.STATIC_DRAW),a.bindBuffer(a.COPY_READ_BUFFER,u.old.attribs[l.length].buf);let e=u.runs;for(let n=0;n<e.length;n+=3)e[n+2]>=0?a.copyBufferSubData(a.COPY_READ_BUFFER,a.COPY_WRITE_BUFFER,e[n+2]*s,e[n]*s,e[n+1]*s):a.bufferSubData(a.COPY_WRITE_BUFFER,e[n]*s,t(e[n],e[n+1]));a.bindBuffer(a.COPY_READ_BUFFER,null),a.bindBuffer(a.COPY_WRITE_BUFFER,null)}return l.push({buf:d,bytes:s}),d},f=(e,t)=>(n,r)=>e.subarray(n*t,(n+r)*t),p=t.speed,m=p?(e,n)=>Bf(p.subarray(e,e+n),t.trainSpeed?.length===p.length?t.trainSpeed.subarray(e,e+n):void 0):(e,t)=>new Float32Array(t).fill(160);$(e,s,`a_seg`,d(f(t.seg,4),4,4,new Float32Array(4)),4,a.FLOAT,1),$(e,s,`a_colour`,d(f(t.colour,1),1,4,new Uint32Array(1)),1,a.UNSIGNED_INT,1,!0),$(e,s,`a_edge`,d(f(t.edge,1),1,4,new Uint32Array(1)),1,a.UNSIGNED_INT,1,!0),$(e,s,`a_level`,d(f(t.level,1),1,4,new Float32Array(1)),1,a.FLOAT,1),$(e,s,`a_flags`,d(f(t.flags,1),1,4,new Float32Array(1)),1,a.FLOAT,1),$(e,s,`a_speed`,d(m,1,4,new Float32Array(1).fill(160)),1,a.FLOAT,1);let h=Q(e,i?.wmul??Qf(Math.max(1,c)),n);$(e,s,`a_wmul`,h,3,a.FLOAT,1);let g;if(i?.full instanceof Float32Array)g=Q(e,i.full,n);else if(i?.full===`later`)g=a.createBuffer(),n.push({del:()=>a.deleteBuffer(g)}),a.bindBuffer(a.ARRAY_BUFFER,g),a.bufferData(a.ARRAY_BUFFER,Math.max(1,c)*8,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,null);else if(u){g=a.createBuffer(),n.push({del:()=>a.deleteBuffer(g)}),a.bindBuffer(a.COPY_WRITE_BUFFER,g),a.bufferData(a.COPY_WRITE_BUFFER,c*8,a.STATIC_DRAW),a.bindBuffer(a.COPY_READ_BUFFER,u.old.fullBuf);let e=u.runs;for(let n=0;n<e.length;n+=3)e[n+2]>=0?a.copyBufferSubData(a.COPY_READ_BUFFER,a.COPY_WRITE_BUFFER,e[n+2]*8,e[n]*8,e[n+1]*8):a.bufferSubData(a.COPY_WRITE_BUFFER,e[n]*8,$f(t,e[n+1],void 0,e[n]));a.bindBuffer(a.COPY_READ_BUFFER,null),a.bindBuffer(a.COPY_WRITE_BUFFER,null)}else g=Q(e,$f(t,c),n);$(e,s,`a_full`,g,2,a.FLOAT,1);let _=t.lane,v=d(_?f(_,2):(e,t)=>new Uint8Array(t*2).fill(255),2,1,new Uint8Array(2).fill(255)),y=a.getAttribLocation(s,`a_lane`);y>=0&&(a.bindBuffer(a.ARRAY_BUFFER,v),a.enableVertexAttribArray(y),a.vertexAttribPointer(y,2,a.UNSIGNED_BYTE,!0,0,0),a.vertexAttribDivisor(y,1));let b=t.band,x=d(b?f(b,6):(e,t)=>new Int16Array(t*6),6,2,new Int16Array(6));for(let[e,t,n]of[[`a_band`,4,0],[`a_band_m`,2,8]]){let r=a.getAttribLocation(s,e);r<0||(a.bindBuffer(a.ARRAY_BUFFER,x),a.enableVertexAttribArray(r),a.vertexAttribPointer(r,t,a.SHORT,!0,12,n),a.vertexAttribDivisor(r,1))}return a.bindVertexArray(null),a.bindBuffer(a.ARRAY_BUFFER,null),{vao:o,count:c,wmulBuf:h,fullBuf:g,attribs:l,res:n}}function vp(e,t,n,r){if(!n?.attribs||!r.count)return;let i=e.gl,a=r.count,o=[r.seg,r.colour,r.edge,r.level,r.flags,r.speed?Bf(r.speed,r.trainSpeed):new Float32Array(a).fill(160),r.lane??new Uint8Array(a*2).fill(255),r.band??new Int16Array(a*6)],s=[];n.attribs.forEach(({buf:e,bytes:t},n)=>{let r=new Uint8Array(a*t),c=o[n];i.bindBuffer(i.COPY_READ_BUFFER,e),i.getBufferSubData(i.COPY_READ_BUFFER,0,r);let l=new Uint8Array(c.buffer,c.byteOffset,c.byteLength);(l.length!==r.length||l.some((e,t)=>e!==r[t]))&&s.push(ep[n])}),i.bindBuffer(i.COPY_READ_BUFFER,null),s.length&&console.error(`T-1028 check: the ${t} strokes patched on the GPU differ from the network's in ${s.join(`, `)}`)}function yp(e,t,n){if(!t||!n.count)return;let r=e.gl,i=$f(n,n.count),a=new Float32Array(i.length);r.bindBuffer(r.COPY_READ_BUFFER,t.fullBuf),r.getBufferSubData(r.COPY_READ_BUFFER,0,a),r.bindBuffer(r.COPY_READ_BUFFER,null);let o=new Uint32Array(i.buffer),s=new Uint32Array(a.buffer);o.some((e,t)=>e!==s[t])&&console.error(`T-2403 check: the track's a_full patched by runs differs from a whole one`)}function bp(e,t,n,r,i,a,o,s,c,l){if(!t||!t.count)return null;let u=e.lodOf.get(t);u||e.lodOf.set(t,u={boxes:null,speed:void 0,sig:null,sigAt:0,working:!1,bands:new Map,making:null});let d=t,f=u.boxes,p=null,m=Math.ceil(i+Math.log2(a)-1e-6);if(e.strokeLod&&o===0&&m<15&&(u.sig&&u.sigAt>=n.count||Tp(e,t,u,n))){let i=u.bands.get(m)??wp(e,t,u,n,m,r);i&&i.vao.count<t.count&&(r&&i.v!==e.perSegV&&(i.v=e.perSegV,i.wm=Sp(e,i.first),i.fu=Cp(e,i.strokes,i.first,0,i.first.length,e.linesFull),Op(e,i.vao.wmulBuf,i.wm??Qf(i.first.length)),Op(e,i.vao.fullBuf,i.fu)),d=i.vao,f=i.boxes,p=i)}if(!e.strokeCull||i<7)return{vao:d,ranges:null};d===t&&(f=u.boxes??=cp(n.seg,n.count));let h=up(f,d.count,s,c,l,48,np(i));if(!h)return{vao:d,ranges:null};let g=0;for(let e=1;e<h.length;e+=2)g+=h[e];if(!g)return{vao:d,ranges:h};if(!e.strokeGather||g>4e4)return{vao:d,ranges:lp(h,512)};let _=e.gathers.get(t);_||e.gathers.set(t,_=new mp(e.gl,t=>e.strokeLoc[t]));let v=p?.strokes??n;return _.fill({seg:v.seg,colour:v.colour,edge:v.edge,level:v.level,flags:v.flags,speed:xp(e,v),lane:v.lane,band:v.band,wmul:r?p?p.wm:e.linesWmul:null,full:r?p?p.fu:e.linesFull:null},h,g),{vao:_,ranges:null}}function xp(e,t){let n=e.speedShown.get(t);return n||e.speedShown.set(t,n=t.speed?Bf(t.speed,t.trainSpeed?.length===t.speed.length?t.trainSpeed:void 0):new Float32Array(t.count).fill(160)),n}function Sp(e,t){let n=e.linesWmul;if(!n)return null;let r=t.length,i=n.length/3,a=new Float32Array(r*3);for(let e=0;e<r;e++){let o=t[e],s=(e+1<r?t[e+1]:i)-1;a[e*3]=n[o*3],a[e*3+1]=n[o*3+1],a[e*3+2]=n[s*3+2]}return a}function Cp(e,t,n,r,i,a,o){let s=$f(t,i-r,a?e=>a[n[e]*2]:void 0,r);if(!o){if(r===0&&i===n.length)return s;o=new Float32Array(Math.max(1,n.length)*2)}return o.set(s.subarray(0,(i-r)*2),r*2),o}function wp(e,t,n,r,i,a){if(n.making!==null)return null;n.making=i;let o=performance.now(),s=fp(r,n.sig,tp/B(i),n.speed??null),c=s.strokes.count,l=s.strokes,u=s.first,d=16384,f=0,p=0,m=null,h=-1,g=null,_=null,v=null,y=e=>{for(;e<c&&e>0&&l.colour[e]===l.colour[e-1]&&l.edge[e]===l.edge[e-1]&&l.seg[e*4]===l.seg[e*4-2]&&l.seg[e*4+1]===l.seg[e*4-1];)e++;return Math.min(e,c)},b=()=>{if(f===0)s.fill(p,p+d),p+=d,p>=c&&(f=1,p=0);else if(f===1)m=cp(l.seg,c),a&&(h=e.perSegV,g=Sp(e,u),_=e.linesFull),v=new Float32Array(Math.max(1,c)*2),f=2;else if(f===2){let t=y(Math.min(c,p+d));Cp(e,l,u,p,t,a?_:null,v),p=t,p>=c&&(f=3)}else{let t=[],r=_p(e,l,t,null,{wmul:g,full:v});return n.bands.set(i,{vao:r,strokes:l,first:u,boxes:m,v:h,res:t,wm:a?g:null,fu:a?v:null}),n.making=null,!0}return!1},x=()=>{if(e.lodOf.get(t)!==n)return;let r=performance.now(),i=!1;for(;!i&&performance.now()-r<8;)i=b();e.lodMs+=performance.now()-r,i||setTimeout(x,0)};return e.lodMs+=performance.now()-o,setTimeout(x,0),null}function Tp(e,t,n,r){if(n.working)return!1;n.working=!0;let i=()=>{if(e.lodOf.get(t)!==n)return;let a=performance.now();n.speed===void 0&&(n.speed=r.speed?Bf(r.speed,r.trainSpeed):null),n.sig??=new Float32Array(r.count),n.sigAt=dp(r,n.speed,n.sig,n.sigAt,a+8),e.lodMs+=performance.now()-a,n.sigAt<r.count?setTimeout(i,0):n.working=!1};return setTimeout(i,0),!1}function Ep(e,t,n){let r=e.gl,i=t.attribs,a=(t,i,a,o,s,c=!1,l=!1,u=0,d=0)=>{let f=e.strokeLoc[t];f<0||(r.bindBuffer(r.ARRAY_BUFFER,i),c?r.vertexAttribIPointer(f,a,o,u,n*s+d):r.vertexAttribPointer(f,a,o,l,u,n*s+d))};a(`a_seg`,i[0].buf,4,r.FLOAT,16),a(`a_colour`,i[1].buf,1,r.UNSIGNED_INT,4,!0),a(`a_edge`,i[2].buf,1,r.UNSIGNED_INT,4,!0),a(`a_level`,i[3].buf,1,r.FLOAT,4),a(`a_flags`,i[4].buf,1,r.FLOAT,4),a(`a_speed`,i[5].buf,1,r.FLOAT,4),a(`a_lane`,i[6].buf,2,r.UNSIGNED_BYTE,2,!1,!0),a(`a_band`,i[7].buf,4,r.SHORT,12,!1,!0,12),a(`a_band_m`,i[7].buf,2,r.SHORT,12,!1,!0,12,8),a(`a_wmul`,t.wmulBuf,3,r.FLOAT,12),a(`a_full`,t.fullBuf,2,r.FLOAT,8),r.bindBuffer(r.ARRAY_BUFFER,null)}function Dp(e){for(let t of e.lodOf.values())for(let e of t.bands.values())for(let t of e.res)t.del();e.lodOf.clear();for(let t of e.gathers.values())t.dispose();e.gathers.clear()}function Op(e,t,n){let r=e.gl;r.bindBuffer(r.ARRAY_BUFFER,t),r.bufferSubData(r.ARRAY_BUFFER,0,n),r.bindBuffer(r.ARRAY_BUFFER,null)}var kp=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID & 1) << 2) - 1.0, float((gl_VertexID & 2) << 1) - 1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,Ap=`#version 300 es
precision highp float;
uniform sampler2D u_tex;
out vec4 o;
void main() {
  o = texelFetch(u_tex, ivec2(gl_FragCoord.xy), 0);
}`,jp=12,Mp=class{gl;layers;prog;uTex;samples;drawFb=[];resolveFb=[];tex=[];rbs=[];w=0;h=0;key=[];keyObj=null;redraws=0;constructor(e,t){this.gl=e,this.layers=t,this.prog=C(e,kp,Ap),this.uTex=e.getUniformLocation(this.prog,`u_tex`),this.samples=Math.min(e.getParameter(e.SAMPLES)??0,e.getParameter(e.MAX_SAMPLES)??0)}stale(e,t,n,r){let i=this.key,a=e===this.w&&t===this.h&&r===this.keyObj&&i.length===n.length;for(let e=0;a&&e<n.length;e++)a=i[e]===n[e];return!a&&((e!==this.w||t!==this.h)&&this.allocate(e,t),this.key=n,this.keyObj=r,!0)}clear(){this.key=[]}allocate(e,t){let n=this.gl;this.free(),this.w=e,this.h=t;let r=r=>{let i=n.createRenderbuffer();return n.bindRenderbuffer(n.RENDERBUFFER,i),this.samples>1?n.renderbufferStorageMultisample(n.RENDERBUFFER,this.samples,r,e,t):n.renderbufferStorage(n.RENDERBUFFER,r,e,t),this.rbs.push(i),i},i=r(n.DEPTH24_STENCIL8);n.bindRenderbuffer(n.RENDERBUFFER,null);for(let a=0;a<this.layers;a++){if(this.samples>1){let e=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,r(n.RGBA8)),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,i),this.drawFb.push(e)}let a=n.createTexture();n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,1,n.RGBA8,e,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),this.tex.push(a);let o=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,o),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,a,0),this.samples<=1&&(n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,i),this.drawFb.push(o)),this.resolveFb.push(o)}n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null)}free(){let e=this.gl;for(let t of new Set([...this.drawFb,...this.resolveFb]))e.deleteFramebuffer(t);for(let t of this.tex)e.deleteTexture(t);for(let t of this.rbs)e.deleteRenderbuffer(t);this.drawFb=[],this.resolveFb=[],this.tex=[],this.rbs=[],this.w=this.h=0}begin(e){let t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.drawFb[e]),t.viewport(0,0,this.w,this.h),t.clearColor(0,0,0,0),t.clearStencil(0),t.clear(t.COLOR_BUFFER_BIT|t.STENCIL_BUFFER_BIT),this.redraws+=+(e===0)}end(e,t){let n=this.gl;this.samples>1&&(n.bindFramebuffer(n.READ_FRAMEBUFFER,this.drawFb[e]),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,this.resolveFb[e]),n.blitFramebuffer(0,0,this.w,this.h,0,0,this.w,this.h,n.COLOR_BUFFER_BIT,n.NEAREST)),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t[0],t[1])}draw(e){let t=this.gl;t.useProgram(this.prog),t.activeTexture(t.TEXTURE0+jp),t.bindTexture(t.TEXTURE_2D,this.tex[e]),t.uniform1i(this.uTex,jp),t.bindVertexArray(null),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)}};function Np(e,t,n,r,a,o,s){let c=e.gl;e.quiet=!1,e.releaseStaged(n);let l=e.net;if(!l)return null;(e.hiddenFor!==l||e.hiddenV!==W.v)&&e.applyHidden(l);let u=e.sync(n);e.bubbles.hide();let d=l.anchor??Ne(),f=i(t,d);e.cam=t;let p=s??[c.drawingBufferWidth,c.drawingBufferHeight],m=B(r)*a;e.timer.begin(),c.disable(c.DEPTH_TEST),c.disable(c.STENCIL_TEST),c.disable(c.CULL_FACE),c.enable(c.BLEND),c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA);let h=o.lineScale??1,g=Mt(r,Pf)*a*h,_=Mt(r,[[9,.4],[12,1.8],[15,3]])*a*h,v=Mt(r,[[9,.5],[12,2.1],[15,3]])*a*h,y=Mt(r,[[9,.6],[12,2],[15,2.4]])*a*h,b=r>=14,x=r<9,S=b?vt(r):ln(r),C=Mt(15,Pf),w=vt(15),E=b&&e.passing?Jf(r,S):null;e.passShiftM=E?E.off/E.mPx:0;let D=qf(r),O=g/a,k=D.share*D.gap,A=e=>{let t=e?Vd:1,n=e?1:Ud+(1-Ud)*D.grow,r=e?1:Wd+(1-Wd)*D.grow,i=O*t*r,a=.5*(i+D.grow*Math.max(0,D.gap+k*t-i))+S;return{single:.5*Math.max(O*t*n,k*t)+S,inner:(1-D.t)*a,outer:a}},j=A(!1),M=A(!0),N={inner:j.inner,outer:j.outer,innerTram:M.inner,outerTram:M.outer},P={inner:j.single,outer:j.single,innerTram:M.single,outerTram:M.single};e.stationStyle={boxes:b,radius:zt(r),linePx:O,ringPx:S,boxLinePx:C,boxRingPx:w,hidden:x,...E?{passHalfPx:E.half}:{},one:N,oneMid:P};let ee=Kp(e,t,d,p[0]/a,p[1]/a),te=T(t),F=te?(te[0]-d.merc[0])*ce:l.stations[0]??0,ne=te?(te[1]-d.merc[1])*ce:l.stations[1]??0,re=l.stationCount>0&&b&&e.hasStencil,ie=$t(ne,d),ae=2*((b&&l.stationCount?Je(F,ne,{mx:0,my:0,ax:ie,ay:0,phi:0},6*ie,ee,e.stationStyle,!1).halfWidth:0)-S),oe=Math.max(1,Zf*ae)*a,se=e.strokeCache&&!e.gl.isContextLost()&&Math.max(p[0],p[1])<=e.cacheMax?s?e.snapCache??=new Mp(c,2):e.mainCache??=new Mp(c,2):null,le=!s&&e.buses.any;s||(e.busesShown=le);let ue=o.showStations===!1;return e.stationsOff=ue,{cam:t,time:n,zoom:r,dpr:a,opt:o,view:s,gl:c,n:l,uTime:u,a:d,lc:f,vp:p,pxPerUnit:m,k:h,wLine:g,wTrack:_,wSel:v,casing:y,boxes:b,hidden:x,ring:S,boxLinePx:C,boxRingPx:w,pass:E,project:ee,midX:F,midY:ne,through:re,boxWhite:ae,trackCap:oe,cache:se,buses:le,stationsOff:ue,redraw:!se||se.stale(p[0],p[1],[r,a,...f.m,...f.globe,...f.plane,...f.at,h,+!!o.byLevel,+!!o.bySpeed,+!!o.byProfit,o.selLine,(o.selLines??[]).reduce((e,t)=>e*31+t+1|0,7),o.selEdge,o.hotLine??-1,o.hotEdge??-1,(o.hotBuses??[]).reduce((e,t)=>e*31+t+1|0,7),(o.hotStops??[]).reduce((e,t)=>e*31+t+1|0,7),o.dimOthers??1,o.flatMarks===!1?0:1,o.rampMarks===!1?0:1,le?e.buses.version:-1,+!!re,e.uploads,+!!e.strokeCull,+!!e.strokeLod,+!!e.strokeGather,+!!e.lineBands,+!!ue,W.v],ks())}}function Pp(e,t){let{zoom:n,dpr:r,opt:i,n:a,a:o,lc:s,vp:c,wLine:l,wSel:u,casing:d,cache:f,buses:p,stationsOff:m,redraw:h}=t;if(e.quiet=!0,f&&h&&f.begin(0),h&&!m&&e.floors.draw(s,c,r,n),h&&!m&&n>=14&&e.lots.draw(s,c,r),h&&p){let t=ks();e.buses.draw(s,o,c,n,r,{wLine:l,casing:d,wSel:u,rail:Af,railShare:jf,sel:i.selLine,hot:i.hotLine??-1,lit:i.hotBuses??[],litStops:i.hotStops??[],dim:i.dimOthers??1,shades:t,fill:z(t.casing),casingRgb:z(t.casing),paint:i.byLevel?`level`:i.bySpeed?`speed`:i.byProfit?`profit`:null,phases:a.phases,meta:a.meta,trackRgb:Df})}}function Fp(e,t){let{zoom:n,dpr:r,opt:i,gl:a,lc:o,vp:s,k:c,wLine:l,pass:u}=t;a.useProgram(e.strokeProg);let d=e.strokeU;I(a,d,o),a.uniform2f(d.u_viewport,s[0],s[1]),a.uniform1i(d.u_sel_line,i.selLine),zf(a,d,i.selLines),a.uniform1i(d.u_sel_edge,i.selEdge),a.uniform2i(d.u_hot,i.hotLine??-1,i.hotEdge??-1),a.uniform2i(d.u_ahead_n,e.aheadLinesTex?e.aheadN[0]:0,e.aheadEdgesTex?e.aheadN[1]:0),a.activeTexture(a.TEXTURE14),a.bindTexture(a.TEXTURE_2D,e.aheadLinesTex),a.uniform1i(d.u_ahead_lines,14),a.activeTexture(a.TEXTURE15),a.bindTexture(a.TEXTURE_2D,e.aheadEdgesTex),a.uniform1i(d.u_ahead_edges,15),a.activeTexture(a.TEXTURE0),a.uniform1i(d.u_ahead,0),a.uniform1i(d.u_level_hide,W.levels);let f=Uf&&(i.dimOthers??1)<1?Uf:null;a.uniform1f(d.u_dim,f?1:i.dimOthers??1),a.uniform2f(d.u_mute,f?.[0]??0,f?.[1]??0),a.uniform1i(d.u_by_level,+!!i.byLevel),a.uniform1i(d.u_by_speed,+!!i.bySpeed),a.uniform1i(d.u_by_profit,i.byProfit&&e.profitTex?1:0),a.uniform1i(d.u_profit_n,e.profitTex?e.profitN:0),a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.profitTex),a.uniform1i(d.u_profit,12),e.slotPx=i.byLevel||i.bySpeed||i.byProfit?0:l/r;let p=qf(n),m=!e.lineBands||i.byLevel||i.bySpeed||i.byProfit||e.trafficWidths&&!e.trafficBands?0:Kf(Hf[0],Hf[1],l/r)*(1-p.grow);e.bandPx=m*l/r,e.bandShiftM=e.bandPx/(B(n)*$t(0)),e.bandOn=m,e.bandMPx=m*B(n)*$t(0),a.uniform1f(d.u_band,m),a.uniform1f(d.u_band_m,B(n)*$t(0)*r),a.uniform1i(d.u_band_traffic,+!!e.trafficWidths),a.uniform1f(d.u_band_gap,Wf?1*r:0),a.uniform3fv(d.u_level_colours,e.levelColours),a.uniform3fv(d.u_track,Df),a.uniform3fv(d.u_bad,Of);let h=ks();a.uniform3fv(d.u_sel,z(h.mapInk)),a.uniform3fv(d.u_casing_rgb,z(h.casing));let g=e.anyFull,_=Mt(n,[[9,.3],[12,.6],[15,1]])*r*c;a.uniform1i(d.u_full_pass,0),a.uniform1f(d.u_full_px,1.75*_),a.uniform1f(d.u_full_out,1*_),a.uniform1f(d.u_full_dash,16*r),a.uniform3fv(d.u_full_rgb,z(h.fullTrack)),a.uniform1i(d.u_ghost,0),a.uniform3fv(d.u_ghost_rgb,z(h.ghost)),a.uniform1i(d.u_ghost_layer,-1),a.uniform2f(d.u_ghost_min,4*r,2*r),a.uniform3f(d.u_hsr,Mt(n,Ff),If[0]*r,If[1]*r),a.uniform3fv(d.u_wire,z(h.tramWire));let v=Math.max(1,Mf*Math.max(1,jf*l/r))*r,y=Math.max(0,Mf*(l+2*Math.max(1,jf*l/r)*r)-2*v);a.uniform2f(d.u_bp,y,v),a.uniform3fv(d.u_bp_mid,kf),a.uniform3fv(d.u_bp_rail,Af),a.uniform3fv(d.u_bp_off_mid,z(h.offMid)),a.uniform3fv(d.u_bp_off_rail,z(h.offRail)),a.uniform3fv(d.u_bp_off_fade,z(h.offFade)),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,e.tex.colours),a.uniform1i(d.u_line_colours,2),e.laneReachPx=p.reach,e.laneShiftM=2*p.t;let b=p.gap*r;return a.uniform4f(d.u_lanes,b,p.t,p.grow,p.share*b),a.uniform1f(d.u_pass_off,u?u.off*r:0),{u:d,mute:f,lanes:p,bandOn:m,shades:h,fullPass:g,bpMid:y,bpRail:v,G:b,modes:p.t>0?[1,2,3]:[0]}}function Ip(e,t){let{zoom:n,dpr:r,opt:i,gl:a,n:o,vp:s,wLine:c,wTrack:l,wSel:u,casing:d,pass:f,project:p,redraw:m,u:h,lanes:g,fullPass:_,G:v,modes:y}=t,b=new Map;if(m){e.strokeInstances=0;for(let[t,i,a]of[[e.track,o.track,!1],[e.lines,o.lines,!0]]){let o=bp(e,t,i,a,n,r,g.grow,p,s[0]/r,s[1]/r);t&&o&&b.set(t,o)}}let x=(t,n,r,i,o=0)=>{if(!t||!t.count)return;let{vao:s,ranges:l}=b.get(t)??{vao:t,ranges:null};a.uniform1i(h.u_kind,n),a.uniform3f(h.u_width,r,u,g.share*v*r/c),a.uniform1f(h.u_cap,o),a.bindVertexArray(s.vao);let f=()=>{if(!l)a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,s.count),e.strokeInstances+=s.count;else for(let t=0;t<l.length;t+=2)Ep(e,s,l[t]),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,l[t+1]),e.strokeInstances+=l[t+1]},p=o>0?[[0,0,0]]:[[d,0,0],[0,0,0]];n===1&&_&&o===0&&p.unshift([d,0,2],[d,0,1]),i&&p.push(...o>0?[[0,1,0]]:[[d,1,0],[0,1,0]]);for(let[e,t,n]of p){a.uniform1f(h.u_casing,e),a.uniform1i(h.u_only_sel,t),a.uniform1i(h.u_full_pass,n);for(let e of y)o>0&&e===1||n&&e>1||(a.uniform1i(h.u_lane_mode,e),f())}l&&Ep(e,s,0),a.uniform1i(h.u_full_pass,0),a.uniform1i(h.u_lane_mode,0)};return{stroke:x,trackStrokes:(t=0)=>{for(let n of e.hasBlueprint?W.blueprints?[1]:[1,2]:[0]){a.uniform1i(h.u_bp_part,n);let r=n===2?0:t;x(e.track,0,i.byLevel||i.bySpeed||i.byProfit?c:l,i.selEdge>=0,r),e.aheadTrackVao&&(a.uniform1i(h.u_ahead,1),x(e.aheadTrackVao,0,i.byLevel||i.bySpeed||i.byProfit?c:l,i.selEdge>=0,r),a.uniform1i(h.u_ahead,0)),!i.byLevel&&!i.bySpeed&&!i.byProfit&&(x(e.lines,1,c,i.selLine>=0||!!i.selLines?.length,r),e.aheadVao&&(a.uniform1i(h.u_ahead,1),x(e.aheadVao,1,c,i.selLine>=0||!!i.selLines?.length,r),a.uniform1i(h.u_ahead,0)))}a.uniform1i(h.u_bp_part,0),t>0&&f&&x(e.turnback,0,l,!1,t)}}}function Lp(e){let{wLine:t,lanes:n,G:r,bpMid:i,bpRail:a,dpr:o,zoom:s}=e,c=Ud+(1-Ud)*n.grow,l=Wd+(1-Wd)*n.grow,u=r*(1+n.share),d=Math.max(t*l,u),f=[t*c,i*c+2*a,d,Math.max(i*l+2*a,u)],p=t*Vd,m=i*Vd+2*a,h=(e,t)=>e+n.grow*Math.max(0,r+t-e),g=[p,m,h(p,n.share*r*Vd),h(m,n.share*r)],_=Mt(s,Ff),v=[t*c*_,f[1],t*l*_+n.grow*Math.max(0,r*(1+n.share)-t*l),f[3]];return{w:[...f,...g,...v],thick:Math.max(o,d/8)}}function Rp(e,t){let{zoom:n,dpr:r,opt:i,gl:a,lc:o,vp:s,wLine:c,wTrack:l,pass:u,through:d,trackCap:f,cache:p,redraw:m,u:h,mute:g,lanes:_,bandOn:v,shades:y,bpMid:b,bpRail:x,G:S,stroke:C,trackStrokes:w}=t;if(m){if(e.highlight){a.uniform1i(h.u_kind,2),a.uniform1f(h.u_cap,0),a.uniform1i(h.u_only_sel,0),a.uniform1f(h.u_casing,.01*r),a.uniform1i(h.u_lane_mode,+(_.t>0)),a.bindVertexArray(e.highlight.vao);for(let[t,n]of[[10,y.mapInk],[6,y.casing]])a.uniform3fv(h.u_sel,z(n)),a.uniform3f(h.u_width,Math.max(b+2*x,c)+t*r,0,_.share*S+t*r),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.highlight.count);if(e.refused){a.bindVertexArray(e.refused.vao);for(let[t,n]of[[10,y.fullTrack],[6,y.casing]])a.uniform3fv(h.u_sel,z(n)),a.uniform3f(h.u_width,Math.max(b+2*x,c)+t*r,0,_.share*S+t*r),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.refused.count)}a.uniform3fv(h.u_sel,z(y.mapInk)),a.uniform1i(h.u_lane_mode,0)}w(),(_.t>0||u)&&C(e.turnback,0,l,!1),e.marks.draw(o,s,n,r,e.levelColours,i.flatMarks!==!1,i.rampMarks!==!1,i.byLevel?Lp(t):null,`built`),!i.byLevel&&!i.bySpeed&&!i.byProfit&&!e.trafficWidths&&e.oneWay.draw(o,s,n,r,{wLine:c,band:v,mPx:B(n)*$t(0)*r,sel:g?i.selLine:-1}),e.oneWayTrack.draw(o,s,n,r,{wLine:c*1.8,band:0,mPx:B(n)*$t(0)*r,sel:-1,rgb:z(ks().mapInk)})}p&&(m&&(p.end(0,s),d&&(p.begin(1),a.useProgram(e.strokeProg),w(f),a.uniform1f(h.u_cap,0),p.end(1,s))),p.draw(0)),zp(e,t)}function zp(e,t){let{zoom:n,dpr:r,opt:i,gl:a,lc:o,vp:s,wLine:c,u:l,modes:u,stroke:d}=t;if(e.placed.length||e.preview?.count||e.marks.previewing){a.useProgram(e.strokeProg),a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.profitTex),a.activeTexture(a.TEXTURE0),a.uniform1i(l.u_ghost,1);for(let t of[...e.placed,e.preview])if(d(t,2,c,!1),t?.count){a.uniform1f(l.u_casing,0),a.uniform1f(l.u_cap,0),a.uniform1i(l.u_only_sel,0),a.bindVertexArray(t.vao);for(let e=0;e<3;e++){a.uniform1i(l.u_ghost_layer,e);for(let e of u)e!==1&&(a.uniform1i(l.u_lane_mode,e),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,t.count))}a.uniform1i(l.u_ghost_layer,-1),a.uniform1i(l.u_lane_mode,0)}a.uniform1i(l.u_ghost,0),e.marks.draw(o,s,n,r,e.levelColours,i.flatMarks!==!1,i.rampMarks!==!1,i.byLevel?Lp(t):null,`drawing`),e.preview&&e.oneWayGhost.draw(o,s,n,r,{wLine:c*1.8,band:0,mPx:B(n)*$t(0)*r,sel:-1,rgb:z(ks().mapInk)})}}function Bp(e,t){let{zoom:n,dpr:r,opt:i,gl:a,n:o,uTime:s,lc:c,vp:l,wLine:u,wTrack:d,boxes:f,hidden:p,ring:m,boxLinePx:h,boxRingPx:g,pass:_,project:v,midX:y,midY:b,through:x,boxWhite:S,trackCap:C,cache:w,buses:T,stationsOff:E,u:D,lanes:O,shades:k,trackStrokes:A}=t;if(E||e.floors.drawHall(c,l,r,n,e.board&&!p?e.crowds.hall:null),(o.stationCount||e.standCount)&&!E){Jp(e,o,i.groups??null);let t=(i.selStations??[]).filter(e=>e>=0&&e<o.stationCount),T=t.join(`,`),E=i.selStation!==e.selectedStation||T!==e.selectedAlsoKey;e.selectedStation=i.selStation,T!==e.selectedAlsoKey&&(e.selectedAlso=new Set(t),e.selectedAlsoKey=T),Yp(e,o),E&&e.onSelectionDrawn();let[j,M]=e.stationStyle.radius.map(e=>e*r),N=e.stationU;a.useProgram(e.stationProg),I(a,N,c),a.uniform2f(N.u_viewport,l[0],l[1]),a.uniform2f(N.u_radius,j,M),a.uniform1f(N.u_ring,m*r),a.uniform3fv(N.u_ink,e.ink),a.uniform3fv(N.u_bad,Of),a.uniform3fv(N.u_crowd_rgb,Xf),a.uniform1f(N.u_line,u),a.uniform3f(N.u_lanes,O.gap*r,O.t,O.narrow),a.uniform1f(N.u_boxes,+!!f),a.uniform1i(N.u_no_bp,+!!W.blueprints);let P=(i.hotStations??[]).filter(e=>e>=0&&e<o.stationCount);e.hotList.fill(-1),P.slice(0,16).forEach((t,n)=>e.hotList[n]=t),a.uniform1iv(N.u_hot_st,e.hotList),a.uniform1i(N.u_hot_n,Math.min(P.length,16)),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,e.tex.stationLine),a.uniform1i(N.u_stline,11),a.activeTexture(a.TEXTURE0);let ee=Bt(15)/r;a.uniform2f(N.u_fixed,(xe({boxLinePx:h,boxRingPx:g})-(i.boxShrinkPx??0))*r,ee),a.uniform1f(N.u_pass_half,(_?_.half-(i.boxShrinkPx??0):0)*r);for(let[t,n]of[[N.u_one,e.stationStyle.one],[N.u_one_mid,e.stationStyle.oneMid]])a.uniform4f(t,(n?.inner??0)*r,(n?.outer??0)*r,(n?.innerTram??0)*r,(n?.outerTram??0)*r);let F=0;if(_){let e=O.gap*r,t=O.share*e*d/u,n=O.t>0?.5*(Math.max(d,e+t)-O.t*(e-t)):d;F=Math.max(0,_.off*r-.5*Math.max(n,r))}a.uniform1f(N.u_pass_in,F),a.bindVertexArray(e.stationVao),a.uniform1f(N.u_pixel,r),a.uniform1i(N.u_layer,0);let ne=f&&e.bridgeProg?(o.stationLinkIdx?.length??0)/2:0;ne&&(Gp(e,c,l,m*r,te*r*ee),e.hotPairs(e.bridgeU,o.stationLinkIdx,P));let re=!f&&e.bridgeProg&&e.connVao?e.connPairs.length/2:0;if(re){let[t,n]=v(y,b),[i,a]=v(y+1,b),o=Math.max(1e-9,Math.hypot(i-t,a-n));Gp(e,c,l,m*r,(mt(e.stationStyle)-m)/o),e.hotPairs(e.bridgeU,e.connPairs,P)}let ie=(t,n)=>{a.useProgram(e.bridgeProg),a.uniform1i(e.bridgeU.u_pass,t),a.uniform1i(e.bridgeU.u_layer,n),a.bindVertexArray(e.connVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,re)};e.crowdsShown=!!e.board&&!p;let ae=!1;if(e.crowdsShown){let t=performance.now();e.moving&&t-e.crowdsAt<100?ae=e.crowdsAny:(e.crowdsAt=t,ae=e.crowdsAny=e.crowds.update(o,e.board,s,(t,n)=>{e.crowdBuf&&Op(e,e.crowdBuf,t),e.dotCrowdBuf&&Op(e,e.dotCrowdBuf,n)}))}let oe=ae&&f;a.useProgram(e.stationProg),a.uniform1f(N.u_tint,ae&&!f?1:0),a.uniform1f(N.u_mask,0),(x||f&&e.hasStencil)&&(a.clearStencil(0),a.clear(a.STENCIL_BUFFER_BIT));let se=f&&e.hasStencil&&e.floors.markStencil(c);a.useProgram(e.stationProg);let ce=(t,n,r,i=!0)=>{if(a.useProgram(e.stationProg),a.uniform1i(N.u_pass,t),a.uniform1i(N.u_layer,n),a.bindVertexArray(e.stationVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,o.stationCount),e.standCount&&e.standVao&&t===0&&(a.uniform1i(N.u_hot_n,0),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,e.standLineTex),a.bindVertexArray(e.standVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.standCount),a.bindTexture(a.TEXTURE_2D,e.tex.stationLine),a.activeTexture(a.TEXTURE0),a.uniform1i(N.u_hot_n,Math.min(P.length,16)),a.bindVertexArray(e.stationVao)),i&&f&&e.annexes){for(let[t,n]of[[1,32]])e.annexes&n&&(a.uniform1i(N.u_room,t),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,o.stationCount));a.uniform1i(N.u_room,0)}ne&&r&&(a.useProgram(e.bridgeProg),a.uniform1i(e.bridgeU.u_pass,t),a.uniform1i(e.bridgeU.u_layer,n),a.bindVertexArray(e.bridgeVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,ne))},le=t=>{if(!se)return ce(t,0,!0);a.useProgram(e.stationProg),a.uniform1i(N.u_bld,1),ce(t,0,!0),a.enable(a.STENCIL_TEST),a.stencilMask(0),a.stencilFunc(a.EQUAL,0,128),a.useProgram(e.stationProg),a.uniform1i(N.u_bld,2),ce(t,0,!1),a.useProgram(e.stationProg),a.uniform1i(N.u_bld,0),a.stencilMask(255),a.disable(a.STENCIL_TEST)};for(let t of[0,1])if(!(t===0&&p)){if(t===1){let t=e.selectedShapes(v);if(!t.length)break;se&&e.floors.drawSelected(new Set(e.selectedDrawn()),v,l,r,n,e.ink),qp(e,se?e.selectedShapes(v,!0):t,r,l)}re&&ie(t,0),le(t),re&&ie(t,1),ce(t,1,!0),f&&(x&&(a.enable(a.STENCIL_TEST),a.stencilMask(127),a.stencilFunc(a.ALWAYS,t+1,255),a.stencilOp(a.KEEP,a.KEEP,a.REPLACE),a.colorMask(!1,!1,!1,!1),a.useProgram(e.stationProg),a.uniform1f(N.u_mask,1),ne&&(a.useProgram(e.bridgeProg),a.uniform1f(e.bridgeU.u_mask,1)),ce(t,1,!0,!1),a.useProgram(e.stationProg),a.uniform1f(N.u_mask,0),ne&&(a.useProgram(e.bridgeProg),a.uniform1f(e.bridgeU.u_mask,0)),a.colorMask(!0,!0,!0,!0),a.stencilMask(255),a.disable(a.STENCIL_TEST)),oe&&ce(t,2,!1),x&&(a.enable(a.STENCIL_TEST),a.stencilFunc(a.EQUAL,t+1,127),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),w?w.draw(1):(a.useProgram(e.strokeProg),A(C),a.uniform1f(D.u_cap,0)),a.disable(a.STENCIL_TEST)))}let ue=e.crowds.stationOfQueue;e.crowdsShown&&f&&ue&&(e.bubbles.sync(e.board,o,ue),e.bubbles.draw(c,l,s,.5*S*r,z(k.walkers),z(k.casing),r))}T&&!E&&e.buses.drawStationStops(c,l,r)}function Vp(e,t){let{cam:n,time:r,zoom:i,dpr:a,opt:o,gl:s,n:c,uTime:l,a:u,lc:d,vp:f,pxPerUnit:p,k:m,pass:h,project:g,lanes:_}=t;if(e.trainsHidden=i<10,o.showTrains&&e.tripCount&&!e.trainsHidden){e.detailedTrains=i>=14&&!o.hollowTrains;let t=Mt(i,Nf)*a*m;Up(e,r,n,u,g,f[0]/a,f[1]/a,i>=Yf),s.useProgram(e.trainProg),s.uniform1i(e.trainU.u_hollow,+!!o.hollowTrains),s.useProgram(e.trainProg),I(s,e.trainU,d),s.uniform2f(e.trainU.u_viewport,f[0],f[1]),s.uniform1f(e.trainU.u_time,l),s.uniform1f(e.trainU.u_px_per_unit,p),s.uniform1f(e.trainU.u_psi0,j(u)),s.uniform2f(e.trainU.u_min_px,t*2.2/.75,t),Xp(e,e.trainU),s.uniform1i(e.trainU.u_line_colours,2),s.uniform1i(e.trainU.u_sel_line,o.selLine),zf(s,e.trainU,o.selLines),s.uniform1f(e.trainU.u_dim,o.dimOthers??1),s.activeTexture(s.TEXTURE6),s.bindTexture(s.TEXTURE_2D,e.tex.fill),s.uniform1i(e.trainU.u_fill,6),s.uniform3fv(e.trainU.u_bad,Of),s.uniform1i(e.trainU.u_detail,+!!e.detailedTrains),s.uniform1f(e.trainU.u_dpr,a),s.activeTexture(s.TEXTURE7),s.bindTexture(s.TEXTURE_2D,e.tex.cars),s.uniform1i(e.trainU.u_cars,7),s.activeTexture(s.TEXTURE8),s.bindTexture(s.TEXTURE_2D,e.loadTex),s.uniform1i(e.trainU.u_loads,8),s.activeTexture(s.TEXTURE9),s.bindTexture(s.TEXTURE_2D,e.tex.stretch),s.uniform1i(e.trainU.u_stretch,9),s.activeTexture(s.TEXTURE10),s.bindTexture(s.TEXTURE_2D,e.tex.lane),s.uniform1i(e.trainU.u_lane_tex,10),s.uniform2f(e.trainU.u_lane,_.gap*a*.5,_.t),s.uniform1f(e.trainU.u_bands,e.bandPx*a),s.uniform1f(e.trainU.u_bands_m,e.bandMPx*a),s.uniform2f(e.trainU.u_passing,h?h.off*a:0,+!!h),s.uniform1f(e.trainU.u_keep,e.net?.keep??1),s.uniform1i(e.trainU.u_level_hide,W.levels),W.levels&&!e.tex.slevel&&e.putTexture(`slevel`,e.sampleLevels(c),`r32f`,X),s.activeTexture(s.TEXTURE13),s.bindTexture(s.TEXTURE_2D,e.tex.slevel),s.uniform1i(e.trainU.u_slevel,13),s.bindVertexArray(e.trainVao);let v=o.selTrain;s.uniform2f(e.trainU.u_sel_trip,v?v.profile:-1,v?v.dep-e.tripEpoch:0);let y=ks();s.uniform3fv(e.trainU.u_ink,z(y.mapInk)),s.uniform3fv(e.trainU.u_band,z(y.casing)),s.uniform1i(e.trainU.u_pass,0);let b=()=>s.drawArraysInstanced(e.detailedTrains?s.TRIANGLES:s.TRIANGLE_STRIP,0,e.detailedTrains?6*e.maxCars:4,e.tripCount);b(),v&&(s.uniform1i(e.trainU.u_pass,1),s.uniform1i(e.trainU.u_detail,0),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,4,e.tripCount),s.uniform1i(e.trainU.u_pass,2),s.uniform1i(e.trainU.u_detail,+!!e.detailedTrains),b())}}function Hp(e,t,n,r,i,a,o){let s=Np(e,t,n,r,i,a,o);if(!s)return;Pp(e,s);let c={...s,...Fp(e,s)},l={...c,...Ip(e,c)};Rp(e,l),Bp(e,l),Vp(e,l);let u=s.gl;u.bindVertexArray(null),u.activeTexture(u.TEXTURE0),e.timer.end(),e.quiet=!1}function Up(e,t,n,r,i,a,o,s){let c=performance.now();Wp(e,t,n,r,i,a,o,s),e.guardMs=performance.now()-c}function Wp(e,t,n,r,i,a,o,s){let c=e.lagDirty;if(e.lagDirty=!1,e.follow){let l=n.globe?null:Be(n.merc,ne(r)),u=e.guardOut,d=l?(e,t)=>(Ae(l,e,t,a,o,u),u):i;c=e.guard.update({time:t,epoch:e.tripEpoch,trips:e.trips,ends:e.tripEnds,nexts:e.tripNexts,bays:e.tripBays,project:d,w:a,h:o,close:s})||c}else e.guard.lag.some(e=>e!==0)&&(e.guard.lag.fill(0),c=!0);if(!c||e.guard.lag.length!==e.tripCount||!e.tripCount)return;let l=e.gl;l.bindBuffer(l.ARRAY_BUFFER,e.lagBuf),l.bufferSubData(l.ARRAY_BUFFER,0,e.guard.lag),l.bindBuffer(l.ARRAY_BUFFER,null)}function Gp(e,t,n,r,i){let a=e.gl,o=e.bridgeU;a.useProgram(e.bridgeProg),I(a,o,t),a.uniform2f(o.u_viewport,n[0],n[1]),a.uniform1f(o.u_ring,r),a.uniform1f(o.u_bridge,i),a.uniform3fv(o.u_ink,e.ink),a.uniform3fv(o.u_bad,Of),a.uniform3fv(o.u_crowd_rgb,Xf),a.uniform1f(o.u_mask,0),a.uniform1i(o.u_no_bp,+!!W.blueprints)}function Kp(e,t,n,r,i){if(!t.globe){let e=Be(t.merc,ne(n));return(t,n)=>{let a=[0,0];return Ae(e,t,n,r,i,a),a}}return(e,a)=>{let o=[0,0];return kt(t,n.merc[0]+e/ce,n.merc[1]+a/ce,r,i,o),o}}function qp(e,t,n,r){let i=e.gl,a=Math.min(t.length,nf),o=e.selData,s=1/0,c=1/0,l=-1/0,u=-1/0;for(let e=0;e<a;e++){let n=t[e],r=e*Zd*4;o.fill(0,r,r+Zd*4),o.set([n.x,n.y,n.ux,n.uy,n.nx,n.ny,n.halfLength,n.halfWidth,n.dot,...n.bulge?[n.bulge.cy,n.bulge.hl,n.bulge.hw]:[]],r),n.dot>0||o.set(st(n),r+12);let i=(n.dot>0?n.dot:Math.max(n.halfLength,n.bulge?.hl??0)+n.halfWidth+(n.bulge?n.bulge.hw+Math.abs(n.bulge.cy):0))+9;s=Math.min(s,n.x-i),c=Math.min(c,n.y-i),l=Math.max(l,n.x+i),u=Math.max(u,n.y+i)}let d=r[0]/n,f=r[1]/n;if(s=Math.max(0,s),c=Math.max(0,c),l=Math.min(d,l),u=Math.min(f,u),l<=s||u<=c)return;i.activeTexture(i.TEXTURE10),i.bindTexture(i.TEXTURE_2D,e.selTex),i.texSubImage2D(i.TEXTURE_2D,0,0,0,a*Zd,1,i.RGBA,i.FLOAT,o,0);let p=e.selU;i.useProgram(e.selProg),i.uniform1i(p.u_shapes,10),i.uniform1i(p.u_count,a),i.uniform4f(p.u_bbox,s,c,l,u),i.uniform2f(p.u_css,d,f),i.uniform1f(p.u_dpr,n),i.uniform1f(p.u_height,r[1]),i.uniform3fv(p.u_ink,e.ink),i.uniform1f(p.u_outline,2),i.uniform1f(p.u_glow,6),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.activeTexture(i.TEXTURE0)}function Jp(e,t,n){if(e.groupSrc.groups===n&&e.groupSrc.net===t)return;e.groupSrc={groups:n,net:t};let r=t.stations,i=t.stationShape,a=e=>[r[e*3]+(i?.[e*4]??0),r[e*3+1]+(i?.[e*4+1]??0)],o=[],s=new Int32Array(Math.max(1,t.stationCount)).fill(-1),c=new Set;if(n){let e=new Map(t.stationIds.map((e,t)=>[e,t]));c=new Set((V.peek()?.save.stations??[]).filter(e=>e.brt).map(e=>e.id)),n.members.forEach((n,r)=>{let i=n.map(t=>e.get(t)).filter(e=>e!==void 0);for(let e of i)s[e]=r;for(let[e,n]of Lt(i.map(a)))!c.has(t.stationIds[i[e]])&&!c.has(t.stationIds[i[n]])&&o.push(i[e],i[n])})}let l=t.stationLinkIdx;for(let e=0;l&&e<l.length/2;e++){let n=l[e*2],r=l[e*2+1];(s[n]<0||s[n]!==s[r]||c.has(t.stationIds[n])||c.has(t.stationIds[r]))&&o.push(n,r)}e.connPairs=Int32Array.from(o);let u=o.length/2,d=e.connEnds=new Float32Array(Math.max(1,u)*4);for(let e=0;e<u;e++)d.set([...a(o[e*2]),...a(o[e*2+1])],e*4);for(let t of e.connRes)t.del();if(e.connRes=[],e.connVao=null,e.connFlagBuf=null,e.gl&&e.bridgeProg){let t=e.gl,n=e.connVao=t.createVertexArray();e.connRes.push({del:()=>t.deleteVertexArray(n)}),t.bindVertexArray(n),$(e,e.bridgeProg,`a_ends`,Q(e,d,e.connRes),4,t.FLOAT,1),e.connFlagBuf=Q(e,new Float32Array(Math.max(1,u)*2),e.connRes),$(e,e.bridgeProg,`a_bflag`,e.connFlagBuf,2,t.FLOAT,1),t.bindVertexArray(null)}e.selDrawnKey=``}function Yp(e,t){let n=`${e.selectedStation}/${e.selectedAlsoKey}/${W.v}`;if(n===e.selDrawnKey)return;e.selDrawnKey=n;let r=new Float32Array(Math.max(1,t.stationCount));for(let n=0;n<t.stationCount;n++)r[n]=e.stationHidden(n)?-1:+!!e.drawnSelected(n);e.stationSelBuf&&Op(e,e.stationSelBuf,r);let i=n=>{let r=new Float32Array(Math.max(2,n.length));for(let i=0;i<n.length/2;i++){let a=n[i*2],o=n[i*2+1];r[i*2]=e.drawnSelected(a)&&e.drawnSelected(o)?1:0,r[i*2+1]=(Math.round(t.stations[a*3+2])|Math.round(t.stations[o*3+2]))&2?1:0}return r},a=t.stationLinkIdx;a?.length&&e.bridgeFlagBuf&&Op(e,e.bridgeFlagBuf,i(a)),e.connPairs.length&&e.connFlagBuf&&Op(e,e.connFlagBuf,i(e.connPairs))}function Xp(e,t){let n=e.gl,r=(e,t,r)=>{n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(r,e)};r(3,e.tex.phases,t.u_phases),r(4,e.tex.meta,t.u_meta),r(0,e.tex.samples,t.u_samples),r(5,e.tex.bendAt,t.u_bend_at),r(14,e.tex.bends,t.u_bends),r(1,e.tex.lines,t.u_lines),n.uniform1i(t.u_back_base,e.net?Jt(e.net.lineTable,e.net.meta):0),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,e.tex.colours)}var Zp=class{gl;strokeProg;stationProg;trainProg;strokeU;stationU;trainU;probeProg=null;probeU={};marks=new sc;oneWay=new b;oneWayTrack=new b;oneWayGhost=new b;lots=new wd;floors=new Dl;res=[];previewRes=[];track=null;lines=null;turnback=null;preview=null;highlightRes=[];refusedRes=[];refused=null;highlight=null;stationVao=null;trainVao=null;probeVao=null;tripBuf=null;endBuf=null;loadBuf=null;standBuf=null;lagBuf=null;bayBuf=null;lagDirty=!1;guard=new Id;follow=!Le(`follow`);tripLag(e){return this.follow&&e>=0?this.guard.lag[e]??0:0}loadTex=null;profitTex=null;profitN=0;profitData=null;tex={phases:null,meta:null,samples:null,bendAt:null,bends:null,lines:null,colours:null,fill:null,cars:null,stretch:null,stationLine:null,lane:null,slevel:null};board=null;crowds=new lu(0);crowdBuf=null;dotCrowdBuf=null;tripIndex(e,t){let n=this.trips;for(let r=0;r<n.length;r+=2)if(n[r]===e&&Math.abs(n[r+1]-t)<.01)return r/2;return-1}crowdsShown=!1;moving=!1;crowdsAt=0;crowdsAny=!1;maxCars=8;detailedTrains=!1;stationShapeBuf=null;stationStyle={boxes:!1,radius:zt(12),linePx:0,ringPx:vt(12),boxLinePx:Mt(15,Pf),boxRingPx:vt(15)};trainsHidden=!1;stationsOff=!1;selectedStation=-1;selectedAlso=new Set;selectedAlsoKey=``;stationSelBuf=null;selDrawnKey=``;groupSrc={groups:null,net:null};bridgeProg;bridgeU={};bridgeVao=null;bridgeFlagBuf=null;connPairs=new Int32Array;connEnds=new Float32Array;connVao=null;connFlagBuf=null;connRes=[];selProg;selU={};selTex=null;selData=new Float32Array(nf*Zd*4);drawnShapeOf(e,t){return this.stationShapeOf(e,t)}selectedBridges(e){let n=this.net;if(!n)return[];let r=[];if(!this.stationStyle.boxes){let n=this.connPairs,i=this.connEnds,a=mt(this.stationStyle);for(let o=0;o<n.length/2;o++){if(!this.drawnSelected(n[o*2])||!this.drawnSelected(n[o*2+1]))continue;let s=t(i[o*4],i[o*4+1],i[o*4+2],i[o*4+3],e,this.stationStyle);s&&r.push({...s,halfWidth:a})}return r}let i=n.stationLinkIdx,a=n.stationLinks;if(!i||!a)return r;for(let n=0;n<i.length/2;n++){if(!this.drawnSelected(i[n*2])||!this.drawnSelected(i[n*2+1]))continue;let o=t(a[n*4],a[n*4+1],a[n*4+2],a[n*4+3],e,this.stationStyle);o&&r.push(o)}return r}stationShapeOf(e,t,n=!1){let r=this.net,i=Math.round(r.stations[e*3+2]),a=i&8192?i&16384?-1:1:0;return Je(r.stations[e*3],r.stations[e*3+1],Qt(r,e),r.stationShape?.[e*4+3]??0,t,this.stationStyle,!!(i&1),!n&&!!(i&1024),n?0:a,{tram:(i&ie)!==0,mid:(i&ze)!==0})}hotList=new Int32Array(16);hotPairs(e,t,n){let r=0;if(this.hotList.fill(-1),n.length>1)for(let e=0;e*2<t.length&&r<16;e++)n.includes(t[e*2])&&n.includes(t[e*2+1])&&(this.hotList[r++]=e);this.gl.uniform1iv(e.u_hot_st,this.hotList),this.gl.uniform1i(e.u_hot_n,r)}drawnSelected(e){return e===this.selectedStation||this.selectedAlso.has(e)}stationAt(e,t,n,r=7){let i=this.net;if(!i||this.stationsOff)return-1;let a=!this.stationStyle.boxes,[o,s]=n(0,0),[c,l]=n(1e3,0),[u,d]=n(0,1e3),[f,p]=n(1e3,1e3),m=(c-o)/1e3,h=(l-s)/1e3,g=(u-o)/1e3,_=(d-s)/1e3,v=Math.abs(f-(c+u-o))+Math.abs(p-(l+d-s))<.01?this.stationReachNow(i):null,y=1.01*Math.max(Math.hypot(m,h),Math.hypot(g,_)),b=v?St(this.stationStyle,v.halfWidth,y)+r+2:0;for(let c of this.stationStyle.hidden?[!0]:[!0,!1]){let l=-1,u=1/0;for(let d=i.stationCount-1;d>=0;d--){if(this.drawnSelected(d)!==c||this.stationHidden(d))continue;let f=!a&&!!(i.stations[d*3+2]&32);if(v){let n=i.stations[d*3],r=i.stations[d*3+1],a=v.r[d]*y+b*(f?3:1),c=o+m*n+g*r,l=s+h*n+_*r;if(Math.abs(c-e)>a||Math.abs(l-t)>a)continue}let p=this.drawnShapeOf(d,n);if(!Vt(p,e,t,r)&&!(f&&this.annexesOf(d,p).some(n=>Vt(n.shape,e,t,r))))continue;if(!a)return d;let x=Math.hypot(e-p.x,t-p.y);x<u&&([l,u]=[d,x])}if(l>=0)return l}return-1}reachOf=null;stationReachNow(e){if(this.reachOf?.net===e)return this.reachOf;let t=new Float32Array(e.stationCount),n=e.stationShape,r=0;for(let i=0;i<e.stationCount;i++){let a=Qt(e,i),o=Dt(a),s=Math.hypot(a.mx,a.my)+Math.hypot(a.ax,a.ay);for(let e=0;e+1<o.length;e+=2)s=Math.max(s,Math.hypot(o[e],o[e+1]));t[i]=s,r=Math.max(r,n?.[i*4+3]??0)}return this.reachOf={net:e,r:t,halfWidth:r},this.reachOf}selectedDrawn(){let e=this.net;if(!e)return[];let t=new Set;for(let n of[this.selectedStation,...this.selectedAlso])n>=0&&n<e.stationCount&&t.add(n);return[...t]}selectedShapes(e,t=!1){let n=[];for(let r of this.selectedDrawn()){if(t&&Math.round(this.net.stations[r*3+2])&2048)continue;let i=this.drawnShapeOf(r,e);n.push(i,...this.annexesOf(r,i).map(e=>e.shape))}return n.concat(this.selectedBridges(e))}annexesOf(e,t){return this.stationStyle.boxes?pn(t,Math.round(this.net.stations[e*3+2]),this.stationStyle.ringPx):[]}upgradeAt(e,t,n,r){let i=this.net;if(!i||this.stationsOff||!this.stationStyle.boxes||e<0||e>=i.stationCount)return 0;let a=this.drawnShapeOf(e,r);for(let r of this.annexesOf(e,a))if(Vt(r.shape,t,n,1)&&r.kind===1)return nn.waitingRoom;let o=Math.round(i.stations[e*3+2]);if(o&256&&o&512&&Vt(a,t,n,2)){let[e]=dt(a,t,n);if(e<2.5*this.stationStyle.ringPx+2-a.halfLength)return nn.terminal}if(!Vt(a,t,n,2)){let i=this.lotAt(t,n,r);if(i>=0&&this.lots.lots[i*10+8]===e)return nn.parkRide}return 0}lotAt(e,t,n){return this.stationStyle.boxes&&!this.stationsOff?this.lots.at(e,t,n):-1}selectedStationAt(e,t,n,r=2){if(this.stationsOff)return-1;for(let i of this.selectedDrawn()){let a=this.drawnShapeOf(i,n);if(a&&Vt(a,e,t,r))return i}return-1}onSelectionDrawn=()=>{};slotPx=0;busesShown=!1;laneReachPx=0;laneShiftM=0;passShiftM=0;passing=!1;hadSamplePass=!1;bandPx=0;bandShiftM=0;bandOn=0;bandMPx=0;get pickBand(){return this.trafficBands?.pick??this.net?.lines.band}get pickBandPx(){return this.trafficBands?this.bandPx*4:this.bandPx}get sampleBand(){return this.trafficBands?.sample??this.net?.sampleBand}get bandReach(){return this.trafficBands?this.trafficReach:8}trafficBands=null;trafficReach=0;lineWidths=null;hasBlueprint=!1;annexes=0;levelColours=new Float32Array([3,2,1,0,-1,-2,-3].flatMap(e=>[...z(vn[e])]));get ink(){return z(ks().stationInk)}timer;hasStencil=!1;cacheMax=0;tripsBy=new Map;tripEpoch=NaN;tripVersion=-1;tripCount=0;trips=new Float32Array;tripEnds=null;tripNexts=null;tripBays=null;net=null;bubbles=new _u;buses=new dd;get gpuMs(){return this.timer?.ms??null}epoch=NaN;rebases=0;cam=null;onEpoch=()=>{};strokeCache=!Le(`strokeCache`);mainCache=null;snapCache=null;uploads=0;quiet=!1;strokeCull=!Le(`strokeCull`);strokeLod=!Le(`strokeLod`);lodOf=new Map;strokeGather=!Le(`strokeGather`);lineBands=!1;trafficWidths=!1;gathers=new Map;speedShown=new WeakMap;linesWmul=null;linesFull=null;perSegV=0;strokeInstances=0;lodMs=0;strokeLoc={};init(e){this.gl=e,this.mainCache=this.snapCache=null;let t=e;if(!t.twCounted){t.twCounted=!0;for(let n of[`bufferData`,`bufferSubData`,`copyBufferSubData`,`texImage2D`,`texSubImage2D`,`deleteBuffer`,`deleteTexture`,`deleteVertexArray`]){let r=t[n];t[n]=(...t)=>(this.quiet||this.uploads++,r.apply(e,t))}}this.profitTex=null,this.profitData&&this.setProfit(this.profitData),this.strokeProg=C(e,mf,hf);for(let t of[`a_seg`,`a_colour`,`a_edge`,`a_level`,`a_flags`,`a_speed`,`a_lane`,`a_wmul`,`a_full`,`a_band`,`a_band_m`])this.strokeLoc[t]=e.getAttribLocation(this.strokeProg,t);this.stationProg=C(e,gf,vf),this.marks.init(e),this.oneWay.init(e),this.oneWayTrack.init(e),this.oneWayGhost.init(e),this.lots.init(e),this.floors.init(e),this.bubbles.init(e),this.buses.init(e),this.trainProg=C(e,Sf,Cf),this.hasStencil=(e.getParameter(e.STENCIL_BITS)??0)>0,this.cacheMax=Math.min(e.getParameter(e.MAX_RENDERBUFFER_SIZE)??0,e.getParameter(e.MAX_TEXTURE_SIZE)??0),this.strokeU=L(e,this.strokeProg,[...R,`u_viewport`,`u_width`,`u_casing`,`u_casing_rgb`,`u_cap`,`u_kind`,`u_sel_line`,`u_sel_n`,`u_sel_set`,`u_sel_edge`,`u_hot`,`u_only_sel`,`u_bp_part`,`u_lanes`,`u_lane_mode`,`u_pass_off`,`u_dim`,`u_by_level`,`u_by_speed`,`u_by_profit`,`u_profit`,`u_profit_n`,`u_level_colours`,`u_track`,`u_bad`,`u_sel`,`u_bp`,`u_bp_mid`,`u_bp_rail`,`u_bp_off_mid`,`u_bp_off_rail`,`u_bp_off_fade`,`u_line_colours`,`u_full_pass`,`u_full_px`,`u_full_out`,`u_full_dash`,`u_full_rgb`,`u_full_inside`,`u_ghost`,`u_ghost_layer`,`u_ghost_rgb`,`u_ghost_min`,`u_hsr`,`u_wire`,`u_band`,`u_band_traffic`,`u_band_gap`,`u_band_m`,`u_mute`,`u_level_hide`,`u_ahead_lines`,`u_ahead_edges`,`u_ahead_n`,`u_ahead`]),this.stationU=L(e,this.stationProg,[...R,`u_viewport`,`u_radius`,`u_ring`,`u_ink`,`u_line`,`u_boxes`,`u_fixed`,`u_pass_half`,`u_pass_in`,`u_pass`,`u_layer`,`u_pixel`,`u_bad`,`u_crowd_rgb`,`u_tint`,`u_mask`,`u_stline`,`u_lanes`,`u_hot_st`,`u_hot_n`,`u_room`,`u_bld`,`u_one`,`u_one_mid`,`u_no_bp`]),this.bridgeProg=C(e,_f,vf),this.bridgeU=L(e,this.bridgeProg,[...R,`u_viewport`,`u_ring`,`u_bridge`,`u_pass`,`u_layer`,`u_ink`,`u_bad`,`u_crowd_rgb`,`u_mask`,`u_hot_st`,`u_hot_n`,`u_no_bp`]),e.useProgram(this.bridgeProg),e.uniform1i(e.getUniformLocation(this.bridgeProg,`u_stline`),11),this.selProg=C(e,yf,bf),this.selU=L(e,this.selProg,[`u_bbox`,`u_css`,`u_shapes`,`u_count`,`u_dpr`,`u_height`,`u_ink`,`u_outline`,`u_glow`]),this.selTex=gp(this,this.selData,`rgba32f`,nf*Zd,[]),this.trainU=L(e,this.trainProg,[...R,`u_viewport`,`u_time`,`u_px_per_unit`,`u_min_px`,`u_phases`,`u_meta`,`u_samples`,`u_bend_at`,`u_bends`,`u_lines`,`u_back_base`,`u_line_colours`,`u_fill`,`u_bad`,`u_detail`,`u_dpr`,`u_cars`,`u_loads`,`u_stretch`,`u_sel_line`,`u_sel_n`,`u_sel_set`,`u_dim`,`u_sel_trip`,`u_pass`,`u_ink`,`u_band`,`u_psi0`,`u_lane_tex`,`u_lane`,`u_hollow`,`u_bands`,`u_bands_m`,`u_passing`,`u_keep`,`u_level_hide`,`u_slevel`]),this.timer=new it(e),this.tripBuf=e.createBuffer(),this.endBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.endBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1e9]),e.DYNAMIC_DRAW),this.loadBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.loadBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,0]),e.DYNAMIC_DRAW),this.standBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.standBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,-1]),e.DYNAMIC_DRAW),this.lagBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.lagBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array(1),e.DYNAMIC_DRAW),this.bayBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.bayBuf),e.bufferData(e.ARRAY_BUFFER,Rf(1),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null),this.loadTex=gp(this,new Float32Array(1),`r32f`,X,[])}setProfit(e){let t=this.gl;this.profitData=e,t&&(this.profitTex&&t.deleteTexture(this.profitTex),this.profitTex=e?.length?gp(this,e,`r32f`,X,[]):null,this.profitN=this.profitTex?e.length:0)}checkPatch=!1;patched=0;gpuDump(){let e={};for(let[t,n]of[[`track`,this.track],[`lines`,this.lines]])n?.attribs?.forEach(({buf:r,bytes:i},a)=>e[`${t}.${ep[a]}`]=[r,Math.max(1,n.count)*i]);return e}setLayers(e){let t=this.net;if(!t||!this.lines)return;this.layersSrc=e;let n=this.lines,r=!!e&&e.lineWidth.length===n.count,i=r&&e.bands&&e.bands.seg.length===n.count*2?e.bands:null,a=null;if(r){a=new Float32Array(n.count*3);for(let t=0;t<n.count;t++)a[t*3]=e.lineWidth[t],i&&(a[t*3+1]=i.seg[t*2],a[t*3+2]=i.seg[t*2+1])}if(n.count&&Op(this,n.wmulBuf,a??Qf(n.count)),this.lineWidths=r?e.lineWidth:null,this.linesWmul=a,this.trafficWidths=!!e?.traffic,i!==this.trafficBands){if(this.trafficBands=i,this.trafficReach=0,i)for(let e=0;e<i.sample.length;e+=2)this.trafficReach=Math.max(this.trafficReach,Math.abs(i.sample[e]));this.putLane(t)}this.perSegV++;let o=Math.max(1,t.samples.length/2);((t,n,r)=>{let i=this.gl,a=r===`r32f`?1:2,s=Math.max(1,Math.ceil(o/X)),c=new Float32Array(X*s*a);c.set(n.subarray(0,Math.min(n.length,c.length))),r===`rg32f`&&!e&&c.fill(-1),i.bindTexture(i.TEXTURE_2D,t),i.texSubImage2D(i.TEXTURE_2D,0,0,0,X,s,r===`r32f`?i.RED:i.RG,i.FLOAT,c)})(this.tex.fill,e?e.fill:new Float32Array(o*2),`rg32f`)}setFull(e,t){let n=this.fullEdges;((!e||!e.size)!=(!n||!n.size)||e&&n&&(e.size!==n.size||![...e].every(e=>n.has(e)))||t!==this.fullTraffic)&&(this.fullEdges=e,this.fullTraffic=t,this.writeFull())}fullEdges=null;fullTraffic=!1;fullKeys=new Map;fullDrawn=``;fullStretch(e,t){return this.fullTraffic?this.fullKeys.get(e*4096+t)??null:null}writeFull(){let e=this.lines,t=this.net,n=new Map,r=this.board,i=this.fullTraffic?r?.crowdStretches:void 0;for(let e=0;r&&i&&e<i.length;e+=2){let t=e/2;n.set(i[e]*4096+i[e+1],{load:r.crowdLoads[t]??0,hour:r.crowdHours[t]??0})}let a=`${+!!t}/${e?.count}/${[...this.fullEdges??[]].join(`,`)}/${[...n].map(([e,t])=>`${e}:${t.load}:${t.hour}`).join(`,`)}`;if(this.fullKeys=n,!e||!e.count||!t||a===this.fullDrawn)return;this.fullDrawn=a;let o=this.fullEdges,s=t.lines.stretch,c=!1,l=$f(t.lines,e.count,e=>{if(o?.size&&o.has(t.lines.edge[e]))return c=!0,-1;let r=n.size&&s?n.get(t.lines.colour[e]*4096+s[e]):void 0,i=r?r.load:0;return i!==0&&(c=!0),i});this.anyFull=c,Op(this,e.fullBuf,l),this.linesFull=l,this.perSegV++}anyFull=!1;setNetwork(e){let t=this.gl;this.dropPlaced();let n=this.net,r=e.patch,i=r&&n&&n!==e&&n.serial===r.base&&this.track?.count===r.oldTrack&&this.lines?.count===r.oldLines?r:null;i&&this.patched++;for(let e of this.res)e.del();this.res=[],this.probeVao=null,this.net=e,this.guard.setNetwork(e),this.marks.setNetwork(e.marks),this.oneWay.setNetwork(e.oneWay),this.oneWayTrack.setNetwork(e.oneWayTrack),this.chevronsAhead=!1,this.lots.setNetwork(e.lots),this.floors.setNetwork(e.buildings);let a=this.track,o=this.lines;this.track=_p(this,e.track,[],i&&a?{old:a,runs:i.track}:null),this.lines=_p(this,e.lines,[],i&&o?{old:o,runs:i.lines}:null,{full:`later`});for(let e of[...a?.res??[],...o?.res??[]])e.del();Dp(this),this.linesWmul=this.linesFull=null,this.perSegV++,i&&this.checkPatch&&(vp(this,`track`,this.track,e.track),vp(this,`lines`,this.lines,e.lines),yp(this,this.track,e.track)),this.fullDrawn=``,this.writeFull(),this.turnback=e.turnbacks?.count?_p(this,e.turnbacks):null,this.hasBlueprint=e.track.count>0&&!!(e.track.flags[e.track.count-1]&1),this.annexes=0;for(let t=0;t<e.stationCount;t++)this.annexes|=e.stations[t*3+2]&32;this.lineWidths=null;let s=new Set(i?.same??[]),c=(e,t,n)=>{t&&[t].flat().every(e=>s.has(e))&&this.tex[e]||this.putTexture(e,...n())};c(`phases`,`phases`,()=>[e.phases.length?e.phases:new Float32Array(4),`rgba32f`,X]),c(`meta`,`meta`,()=>[e.meta.length?e.meta:new Float32Array(4),`rgba32f`,X]),c(`samples`,`samples`,()=>[e.samples.length?e.samples:new Float32Array(2),`rg32f`,X]),c(`bendAt`,[`samples`,`sampleBend`],()=>[e.sampleBend?.length?e.sampleBend:new Float32Array(Math.max(1,e.samples.length/2)),`r32f`,X]),c(`bends`,`bends`,()=>[e.bends?.length?e.bends:new Float32Array(2),`rg32f`,X]);let l=this.trafficBands!==null;this.trafficBands=null;let u=e.samplePass?!s.has(`samplePass`):this.hadSamplePass;this.hadSamplePass=!!e.samplePass,this.passing=!1;for(let t=0;t<e.stationCount&&!this.passing;t++)this.passing=(e.stations[t*3+2]&oe)!==0;(l||u||!(s.has(`sampleLane`)&&s.has(`sampleBand`)&&this.tex.lane))&&this.putLane(e),c(`lines`,`lineTable`,()=>[e.lineTable.length?e.lineTable:new Float32Array(4),`rgba32f`,Z]),c(`colours`,`lineColours`,()=>[this.shownColours(e),`rgba8`,Z]),this.hiddenFor=null,c(`fill`,null,()=>[new Float32Array(Math.max(1,e.samples.length/2)*2).fill(-1),`rg32f`,X]);let d=e.lineCars??new Float32Array(Math.max(1,e.lineTable.length/4)).fill(8);this.maxCars=Math.max(1,...d),c(`cars`,`lineCars`,()=>[d,`r32f`,Z]),c(`stretch`,`sampleStretch`,()=>{if(e.sampleStretch)return[e.sampleStretch,`r32f`,X];let t=Math.max(1,e.samples.length/2),n=new Float32Array(t).fill(-1);if(e.sampleStroke&&e.lines.stretch)for(let r=0;r<t;r++){let t=e.sampleStroke[r];t>=0&&(n[r]=e.lines.stretch[t])}return[n,`r32f`,X]}),this.crowds=new lu(e.stationCount),this.stationVao=t.createVertexArray();let f=this.stationVao;if(this.res.push({del:()=>t.deleteVertexArray(f)}),t.bindVertexArray(this.stationVao),$(this,this.stationProg,`a_st`,Q(this,e.stations.length?e.stations:new Float32Array(3)),3,t.FLOAT,1),$(this,this.stationProg,`a_axis`,Q(this,e.stationAxis?.length?e.stationAxis:new Float32Array(Math.max(1,e.stationCount)*2)),2,t.FLOAT,1),this.stationShapeBuf=Q(this,e.stationShape?.length?e.stationShape:new Float32Array(Math.max(1,e.stationCount)*4)),!e.stationLine||e.stationLine.length<e.stationCount*26){let t=new Float32Array(e.stationCount*26);for(let n=0;n<e.stationCount;n++)t.set(Dt(Qt(e,n,!1)),n*26);e.stationLine=t}c(`stationLine`,`stationLine`,()=>[e.stationLine.length?e.stationLine:new Float32Array(2),`rg32f`,X]),$(this,this.stationProg,`a_shape`,this.stationShapeBuf,4,t.FLOAT,1),this.stationSelBuf=Q(this,new Float32Array(Math.max(1,e.stationCount))),$(this,this.stationProg,`a_sel`,this.stationSelBuf,1,t.FLOAT,1),this.groupSrc={groups:null,net:null},this.crowdBuf=Q(this,this.crowds.crowds),this.dotCrowdBuf=Q(this,this.crowds.dotCrowds),$(this,this.stationProg,`a_dcrowd`,this.dotCrowdBuf,2,t.FLOAT,1),$(this,this.stationProg,`a_crowd`,this.crowdBuf,4,t.FLOAT,1),this.selectedAlso=new Set,this.selectedAlsoKey=``,this.selDrawnKey=``;let p=e.stationLinkIdx?.length??0;this.bridgeVao=t.createVertexArray();let m=this.bridgeVao;this.res.push({del:()=>t.deleteVertexArray(m)}),t.bindVertexArray(m),$(this,this.bridgeProg,`a_ends`,Q(this,p?e.stationLinks:new Float32Array(4)),4,t.FLOAT,1),this.bridgeFlagBuf=Q(this,new Float32Array(Math.max(1,p/2)*2)),$(this,this.bridgeProg,`a_bflag`,this.bridgeFlagBuf,2,t.FLOAT,1),this.trainVao=t.createVertexArray();let h=this.trainVao;this.res.push({del:()=>t.deleteVertexArray(h)}),t.bindVertexArray(this.trainVao),$(this,this.trainProg,`a_trip`,this.tripBuf,2,t.FLOAT,1),$(this,this.trainProg,`a_end`,this.endBuf,1,t.FLOAT,1),$(this,this.trainProg,`a_load`,this.loadBuf,2,t.FLOAT,1),$(this,this.trainProg,`a_stand`,this.standBuf,4,t.FLOAT,1),$(this,this.trainProg,`a_lag`,this.lagBuf,1,t.FLOAT,1),$(this,this.trainProg,`a_bay`,this.bayBuf,4,t.FLOAT,1),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),(!Wa(this.ahead)||this.aheadDrawn)&&this.buildAhead()}ahead=Ua();aheadVao=null;aheadTrackVao=null;aheadRes=[];aheadLinesTex=null;aheadEdgesTex=null;aheadN=[0,0];standVao=null;standLineTex=null;standCount=0;aheadDrawn=!1;chevronsAhead=!1;setAhead(e,t=!0){this.ahead=e,t&&this.buildAhead()}netVersion=-1;buildAhead(){let e=this.gl;for(let e of this.aheadRes)e.del();this.aheadRes=[],this.aheadVao=this.aheadTrackVao=this.aheadLinesTex=this.aheadEdgesTex=this.standVao=this.standLineTex=null,this.aheadN=[0,0],this.standCount=0;let t=this.net,n=this.ahead;if(this.aheadDrawn=!!t&&!Wa(n),t&&!Wa(n)){let r=eo(t,n);r.lines&&(this.aheadVao=_p(this,r.lines,this.aheadRes)),r.track&&(this.aheadTrackVao=_p(this,r.track,this.aheadRes));let i=[...[...n.lines].filter(([,e])=>e.edges).map(([e])=>e),...n.hideLines],a=[...n.hideEdges,...n.edges.keys()],o=e=>{let t=0;for(let n of e)t=Math.max(t,n+1);let n=new Float32Array(Math.max(1,t));for(let t of e)t>=0&&(n[t]=1);return[n,t]};if(i.length){let[e,t]=o(i);this.aheadLinesTex=gp(this,e,`r32f`,Z,this.aheadRes),this.aheadN[0]=t}if(a.length){let[e,t]=o(a);this.aheadEdgesTex=gp(this,e,`r32f`,X,this.aheadRes),this.aheadN[1]=t}if((n.stations.length||n.rawStations.length)&&this.stationProg){let t=ro([...n.stations.length?[to(n.stations)]:[],...n.rawStations]);this.standVao=e.createVertexArray();let r=this.standVao;this.aheadRes.push({del:()=>e.deleteVertexArray(r)}),e.bindVertexArray(r),$(this,this.stationProg,`a_st`,Q(this,t.st,this.aheadRes),3,e.FLOAT,1),$(this,this.stationProg,`a_axis`,Q(this,t.axis,this.aheadRes),2,e.FLOAT,1),$(this,this.stationProg,`a_shape`,Q(this,t.shape,this.aheadRes),4,e.FLOAT,1),$(this,this.stationProg,`a_sel`,Q(this,new Float32Array(Math.max(1,t.count)),this.aheadRes),1,e.FLOAT,1),$(this,this.stationProg,`a_dcrowd`,Q(this,new Float32Array(Math.max(1,t.count)*2),this.aheadRes),2,e.FLOAT,1),$(this,this.stationProg,`a_crowd`,Q(this,new Float32Array(Math.max(1,t.count)*4),this.aheadRes),4,e.FLOAT,1),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.standLineTex=gp(this,t.line.length>=26?t.line:new Float32Array(2),`rg32f`,X,this.aheadRes),this.standCount=t.count}}let r=t&&!Wa(n)?Za(t,n.edges):null;r?(this.oneWayTrack.setNetwork(r),this.chevronsAhead=!0):this.chevronsAhead&&=(this.oneWayTrack.setNetwork(t?.oneWayTrack),!1),t&&this.tex.colours&&this.putTexture(`colours`,this.shownColours(t),`rgba8`,Z),t&&this.hiddenFor===t&&this.hideStations(t),this.uploads++}hideStations(e){if(this.stationHid=new Uint8Array(e.stationCount),W.levels)for(let t=0;t<e.stationCount;t++){let n=W.stationLevel(e.stationIds[t]);n!==void 0&&Ws(n)&&(this.stationHid[t]=1)}if(W.blueprints)for(let t=0;t<e.stationCount;t++)e.stations[t*3+2]&2&&(this.stationHid[t]=1);for(let t of this.ahead.hideStations){let n=hn(e,String(t));n>=0&&(this.stationHid[n]=1)}this.selDrawnKey=``}setService(e,t){let n=this.net;n&&(n.phases=e,n.meta=t,this.putTexture(`phases`,e.length?e:new Float32Array(4),`rgba32f`,X),this.putTexture(`meta`,t.length?t:new Float32Array(4),`rgba32f`,X))}texRes={};putLane(e){let t=Math.max(1,e.samples.length/2),n=e.sampleLane,r=this.trafficBands?.sample??e.sampleBand,i=new Float32Array(t*4);for(let a=0;a<t;a++)i[a*4]=n?.length?n[a]??1:1,i[a*4+1]=r?.[a*2]??0,i[a*4+2]=r?.[a*2+1]??0,i[a*4+3]=e.samplePass?.[a]??1e9;this.putTexture(`lane`,i,`rgba32f`,X)}putTexture(e,t,n,r){for(let t of this.texRes[e]??[])t.del();let i=[];this.tex[e]=gp(this,t,n,r,i),this.texRes[e]=i}setPreview(e){this.previewSrc=e,this.uncached(()=>{for(let e of this.previewRes)e.del();this.previewRes=[],this.preview=e&&e.count?_p(this,e,this.previewRes):null,this.marks.setPreview(e?.marks),this.oneWayGhost.setNetwork(e?.chevrons)})}uncached(e){let t=this.quiet;this.quiet=!0;try{e()}finally{this.quiet=t}}keepPreviewAsPlaced(){this.preview&&this.placed.push(this.preview),this.placedRes.push(...this.previewRes),this.preview=null,this.previewRes=[],this.previewSrc=null,this.uncached(()=>{this.marks.setPreview(void 0),this.oneWayGhost.setNetwork(void 0)})}addPlaced(e){e.count&&this.uncached(()=>this.placed.push(_p(this,e,this.placedRes)))}hiddenFor=null;hiddenV=-1;stationHid=new Uint8Array;shownColours(e){let t=[...this.ahead.lines].filter(([,e])=>!e.edges).map(([e])=>e);if(!W.lines.size&&!t.length&&!this.ahead.colours.size)return e.lineColours;let n=e.lineColours.length;for(let e of this.ahead.colours.keys())n=Math.max(n,e*4+4);let r=new Uint8Array(n);r.set(e.lineColours);for(let[e,t]of this.ahead.colours)r.set(t,e*4),r[e*4+3]||(r[e*4+3]=255);for(let e of[...W.lines,...t])e*4+3<r.length&&(r[e*4+3]=0);return r}stationHidden(e){return this.stationHid[e]===1}sampleLv=null;tripOnOffLevel(e){let t=this.net;if(!W.levels||!this.sampleLv||!t)return!1;let n=e.gr===0?e.s:t.lineTable[e.geo*4+2]-e.s;return Us(yt(t,this.sampleLv,e.geo,n))<.5}sampleLevels(e){let t=Math.max(1,e.samples.length/2),n=new Float32Array(t),r=e.sampleStroke,i=0;for(let a=0;a<t;a++){let t=r?r[a]:-1;t>=0&&t<e.lines.count&&(i=Math.floor(e.lines.level[t]/256)/32-4),n[a]=i}return n}applyHidden(e){if(this.hiddenFor=e,this.hiddenV=W.v,this.tex.colours&&this.putTexture(`colours`,this.shownColours(e),`rgba8`,Z),this.hideStations(e),this.sampleLv=W.levels?this.sampleLevels(e):null,this.sampleLv)this.putTexture(`slevel`,this.sampleLv,`r32f`,X);else if(this.tex.slevel){for(let e of this.texRes.slevel??[])e.del();this.texRes.slevel=[],this.tex.slevel=null}let t=e.lines,n=e.track;if(W.lines.size||W.levels||W.blueprints){let e=W.blueprints;Ks.set(t.seg,n=>W.lines.has(t.colour[n])||Gs(t.level[n])||e&&!!(t.flags[n]&1)),W.levels||e?Ks.set(n.seg,t=>Gs(n.level[t])||e&&!!(n.flags[t]&1)):Ks.delete(n.seg)}else Ks.delete(t.seg),Ks.delete(n.seg)}dropPlaced(){this.uncached(()=>{for(let e of this.placedRes)e.del()}),this.placedRes=[],this.placed=[]}placed=[];placedRes=[];setHighlight(e){this.highlightSrc=e;for(let e of this.highlightRes)e.del();this.highlightRes=[],this.highlight=e&&e.count?_p(this,e,this.highlightRes):null}setRefused(e){this.refusedSrc=e;for(let e of this.refusedRes)e.del();this.refusedRes=[],this.refused=e&&e.count?_p(this,e,this.refusedRes):null}layersSrc=null;refusedSrc=null;previewSrc=null;highlightSrc=null;restore(){this.res=[],this.texRes={};for(let e of Object.keys(this.tex))this.tex[e]=null;this.track=this.lines=null,this.lodOf.clear(),this.previewRes=[],this.placedRes=[],this.placed=[],this.highlightRes=[],this.refusedRes=[],this.connRes=[],this.connVao=this.connFlagBuf=null,this.probeProg=this.probeVao=null,this.tripEpoch=NaN,this.tripVersion=-1,this.init(this.gl);let e=this.net,t=this.layersSrc;e&&(this.setNetwork(e),t&&this.setLayers(t)),this.setPreview(this.previewSrc),this.setHighlight(this.highlightSrc),this.setRefused(this.refusedSrc)}staged=[];stage(e,t,n,r=!1){this.staged.push({version:e,at:t,since:performance.now(),apply:n,trips:[],loads:r})}flushStaged(){for(;this.staged.length;)this.putStaged(this.staged.shift())}stagedAt=NaN;putStaged(e){this.stagedAt=e.at,e.apply();for(let t of e.trips)this.putTrips(...t)}releaseStaged(e){let t=performance.now(),n=r=>{let i=this.staged[r];return e<i.at?!1:t-i.since>2e3?!0:i.loads?i.trips.some(e=>e[3])||r+1<this.staged.length&&n(r+1):i.trips.length>0};for(;this.staged.length&&n(0);)this.putStaged(this.staged.shift())}setTrips(...e){let t=e[1];for(let n=this.staged.length-1;n>=0;n--)if(this.staged[n].version<=t){this.staged[n].trips.push(e);return}this.putTrips(...e)}putTrips(e,t,n,r,i,a,o){let s=this.tripsBy.get(e);if(s&&s.version>t)return;let c=r?xt(e,r):void 0;this.tripsBy.set(e,{version:t,data:n,ends:i&&i.length===n.length/2?i:void 0,nexts:a&&a.length===n.length/2?a:void 0,bays:Gf&&o&&o.length===n.length/2*4?o:void 0,board:c&&c.trips===n.length/2?c:void 0}),e===this.tripEpoch&&(this.tripVersion=-1)}sync(e){let t=Math.floor(e/Ef)*Ef;if(t!==this.epoch){this.epoch=t,this.rebases++;for(let e of this.tripsBy.keys())e<t&&this.tripsBy.delete(e);this.onEpoch(t)}let n=this.tripsBy.get(t);if(n&&(this.tripEpoch!==t||this.tripVersion!==n.version)){let e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,this.tripBuf),e.bufferData(e.ARRAY_BUFFER,n.data.length?n.data:new Float32Array(2),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.endBuf),e.bufferData(e.ARRAY_BUFFER,n.ends?.length?n.ends:new Float32Array(Math.max(1,n.data.length/2)).fill(-1e9),e.DYNAMIC_DRAW);let r=n.board?n.board.offs:new Float32Array(Math.max(1,n.data.length/2)*2).fill(-1);e.bindBuffer(e.ARRAY_BUFFER,this.loadBuf),e.bufferData(e.ARRAY_BUFFER,r.length?r:new Float32Array([-1,0]),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.standBuf),e.bufferData(e.ARRAY_BUFFER,n.board?mn(n.board,n.data,n.nexts??null):new Float32Array(Math.max(1,n.data.length/2)*4).fill(-1),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.bayBuf),e.bufferData(e.ARRAY_BUFFER,n.bays?.length?n.bays:Rf(n.data.length/2),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.lagBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array(Math.max(1,n.data.length/2)),e.DYNAMIC_DRAW),this.lagDirty=!0,e.bindBuffer(e.ARRAY_BUFFER,null),n.board?.loads.length&&(this.loadTex&&e.deleteTexture(this.loadTex),this.loadTex=gp(this,n.board.loads,`r32f`,X,[])),this.board=n.board??null,this.fullTraffic&&this.writeFull(),this.tripEpoch=t,this.tripVersion=n.version,this.tripCount=n.data.length/2,this.trips=n.data,this.tripEnds=n.ends??null,this.tripNexts=n.nexts??null,this.tripBays=n.bays??null}return e-this.tripEpoch}get tripsEpoch(){return this.tripEpoch}stillWaitMs(e,t,n,r){let i=rp;if(r.showTrains&&this.tripCount&&e>=10){let r=B(e)/Math.cos(t*Math.PI/180);i=Math.min(i,500/(100*n*r))}return this.board&&e>=9&&(i=Math.min(i,5e3/n)),i}draw(e,t,n,r,i,a){Hp(this,e,t,n,r,i,a)}guardMs=0;guardOut=[0,0];queueShare(e){return this.crowdsShown&&this.net?this.crowds.queueShare(e,this.net):null}dotCrowd(e){return this.crowdsShown&&!this.stationStyle.boxes?this.crowds.dot(e):null}probe(e){let t=this.gl;this.probeProg||(this.probeProg=C(t,wf,Tf,[`v_pos`]),this.probeU=L(t,this.probeProg,[`u_time`,`u_phases`,`u_meta`,`u_samples`,`u_bend_at`,`u_bends`,`u_lines`,`u_back_base`])),this.releaseStaged(e);let n=this.sync(e),r=this.tripCount;this.probeVao||(this.probeVao=t.createVertexArray(),t.bindVertexArray(this.probeVao),$(this,this.probeProg,`a_trip`,this.tripBuf,2,t.FLOAT,0),$(this,this.probeProg,`a_end`,this.endBuf,1,t.FLOAT,0),$(this,this.probeProg,`a_lag`,this.lagBuf,1,t.FLOAT,0),t.bindVertexArray(null));let i=Q(this,new Float32Array(Math.max(1,r)*2),[]);t.useProgram(this.probeProg),t.uniform1f(this.probeU.u_time,n),Xp(this,this.probeU),t.bindVertexArray(this.probeVao),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,i),t.enable(t.RASTERIZER_DISCARD),t.beginTransformFeedback(t.POINTS),t.drawArrays(t.POINTS,0,r),t.endTransformFeedback(),t.disable(t.RASTERIZER_DISCARD),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,null),t.bindVertexArray(null);let a=new Float32Array(r*2);return t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,i),t.getBufferSubData(t.TRANSFORM_FEEDBACK_BUFFER,0,a),t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,null),t.deleteBuffer(i),a}},Qp=Bt(15),$p=We(0,0,-1),em=74,tm=2,nm=9.9/.75/B(15),rm=14,im=.9,am=10,om=6,sm=16,cm=.22,lm=.9,um=1.5,dm=12,fm=[{dx:0,strokes:[{pts:[[-70,0],[10,0,{r:30}],[10,96,{rev:!0}],[10,0],[40,0],[40,56],[64,56]],stops:[[10,68]],colour:1},{pts:[[-12,68],[34,68]],colour:1,bare:!0},{pts:[[114,52],[78,52,{r:18}],[78,0,{r:18}],[114,0,{r:18}],[114,53,{rev:!0}],[114,0],[144,0],[144,56,{rev:!0}],[144,0],[162,0]],stops:[[144,30]],colour:2},{circle:[146,80,10],colour:11,bare:!0},{pts:[[150,0],[176,0],[176,56],[214,56],[214,0],[250,0],[250,28],[226,28,{r:14}],[226,56,{r:14}],[252,56]],stops:[[195,56]],colour:4}]},{dx:78,strokes:[{pts:[[0,56],[0,0],[27,0],[27,44,{rev:!0}],[27,0],[54,0],[54,56]],colour:7},{pts:[[50,0],[120,0,{r:18}],[120,52,{r:18}],[80,52,{r:18}],[80,0,{r:18}],[140,0],[140,56],[164,56]],stops:[[100,52]],colour:0},{pts:[[180,96],[180,0],[242,0],[242,52,{r:18}],[206,52,{r:18}],[206,0,{r:18}],[242,0],[244,96]],stops:[[196,0],[211,42]],colour:5},{pts:[[272,96],[272,30]],colour:11},{circle:[272,12,9],colour:11,bare:!0}]}];function pm(e){let t=e.length,n=t=>e[t][2]?.rev?0:e[t][2]?.r??dm,r=(e,t)=>{let n=Math.hypot(t[0]-e[0],t[1]-e[1]);return[(t[0]-e[0])/n,(t[1]-e[1])/n]},i=Array(t).fill(0),a=Array(t).fill(0);for(let o=1;o<t-1;o++){let t=r(e[o-1],e[o]),s=r(e[o],e[o+1]);i[o]=Math.acos(Math.max(-1,Math.min(1,t[0]*s[0]+t[1]*s[1]))),a[o]=n(o)>0&&i[o]>.001&&i[o]<Math.PI-.001?n(o)*Math.tan(i[o]/2):0}let o=a.slice();for(let n=0;n+1<t;n++){let t=Math.hypot(e[n+1][0]-e[n][0],e[n+1][1]-e[n][1]);if(o[n]+o[n+1]>t){let e=t/(o[n]+o[n+1]);o[n]*=e,o[n+1]*=e}}let s=[[e[0][0],e[0][1]]],c=[];for(let n=1;n<t-1;n++){let[t,a]=e[n];if(o[n]<=0){e[n][2]?.rev&&c.push(s.length),s.push([t,a]);continue}let l=r(e[n-1],e[n]),u=r(e[n],e[n+1]),d=o[n]/Math.tan(i[n]/2),f=[t-l[0]*o[n],a-l[1]*o[n]],p=l[0]*u[1]-l[1]*u[0]>0,m=p?-l[1]:l[1],h=p?l[0]:-l[0],g=f[0]+m*d,_=f[1]+h*d,v=Math.atan2(f[1]-_,f[0]-g),y=Math.max(2,Math.ceil(i[n]/(Math.PI/36)));for(let e=0;e<=y;e++){let t=v+(p?1:-1)*i[n]*(e/y);s.push([g+d*Math.cos(t),_+d*Math.sin(t)])}}return s.push([e[t-1][0],e[t-1][1]]),{p:s,revs:c}}var mm=class{p;closed;cum=[0];constructor(e,t){this.p=e,this.closed=t;for(let t=1;t<e.length;t++)this.cum.push(this.cum[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]))}get length(){return this.cum[this.cum.length-1]}at(e){let t=this.length;e=this.closed?(e%t+t)%t:Math.max(0,Math.min(t,e));let n=1;for(;n<this.cum.length-1&&this.cum[n]<e;)n++;let r=(e-this.cum[n-1])/Math.max(1e-9,this.cum[n]-this.cum[n-1]);return[this.p[n-1][0]+(this.p[n][0]-this.p[n-1][0])*r,this.p[n-1][1]+(this.p[n][1]-this.p[n-1][1])*r]}near(e){let t=0,n=1/0;for(let r=1;r<this.p.length;r++){let[i,a]=this.p[r-1],[o,s]=this.p[r],c=o-i,l=s-a,u=c*c+l*l,d=u>0?Math.max(0,Math.min(1,((e[0]-i)*c+(e[1]-a)*l)/u)):0,f=Math.hypot(i+c*d-e[0],a+l*d-e[1]);f<n-1e-9&&([n,t]=[f,this.cum[r-1]+d*Math.sqrt(u)])}return t}},hm=84,gm=22,_m=[60,72,75,80,90,100,120,144,150,180,200,225,240,300,360,400,450,600,720,900,1200,1800,3600];function vm(e){let t=[],n=0;for(let r=0;r+1<e.length;r++){let i=e[r].leave,a=e[r+1].arrive-i,o=196/im;if(a>=o){let e=rm/im,r=(a-o)/rm;t.push(n,i,0,im,n+e,i+o/2,rm,0,n+e+r,i+a-o/2,rm,-.9),n+=2*e+r}else{let e=Math.sqrt(im*Math.max(a,.01)),r=e/im;t.push(n,i,0,im,n+r,i+a/2,e,-.9),n+=2*r}r+2<e.length&&(n+=e[r+1].rev?om:am)}return{ph:t,t:n}}function ym(){let e=(e,t,n)=>{let r=e[1]*lm;return[um*(e[0]+t+cm*r),um*(r-n*hm)]},t=nm/Qp,n=fm.flatMap((n,r)=>n.strokes.map(i=>{let a,o=[],s=!1;if(i.circle){let[t,o,c]=i.circle,[l,u]=e([t,o],n.dx,r);a=Array.from({length:73},(e,t)=>[l+um*c*Math.sin(t*Math.PI/36),u-um*c*Math.cos(t*Math.PI/36)]),s=!0}else{let t=pm(i.pts);a=t.p.map(t=>e(t,n.dx,r)),o=t.revs}let c=new mm(a,s),l=c.length,u=[],d=e=>u.push({arrive:e,leave:e,rev:!1}),f=em/2/Qp;s?(d(0),d(l)):(d(f),d(l-f));for(let t of i.stops??[])d(c.near(e(t,n.dx,r)));for(let e of o)u.push({arrive:c.cum[e]-t,leave:c.cum[e]+t,rev:!0});return u.sort((e,t)=>e.arrive-t.arrive),{path:c,stops:u,colour:i.colour,bare:!!i.bare}})),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let e of n)for(let[t,n]of e.path.p)r=Math.min(r,t),i=Math.max(i,t),a=Math.min(a,n),o=Math.max(o,n);let s=i-r+44,c=o-a+44,l=e=>[(e[0]-r+gm)*Qp,(o-e[1]+gm)*Qp],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[],y=[],b=[],x=[],S=[],C=[],w=[],T=[],E=[],D=(e,t,n)=>{let r=n=>{let r=[];for(let i=0;i<=30;i++){let a=t+n*i*2;if(!e.closed&&(a<0||a>e.length))break;r.push(...e.at(a),0)}return Float32Array.from(r)},i=Qe((n?[r(n)]:[r(1),r(-1)]).filter(e=>e.length>=6),0,em/2-Qp*tm),a=e.at(t);S.push(a[0],a[1],4),C.push(i.ax,i.ay),w.push(i.mx,i.my,i.phi,6),T.push(...Array.from(Dt(i))),E.push(String(E.length))};n.forEach((e,t)=>{let n=e.path.p.map(l),r=new mm(n,e.path.closed),i=r.length;for(let e=1;e<n.length;e++)u.push(n[e-1][0],n[e-1][1],n[e][0],n[e][1]),d.push(t),f.push(r.cum[e-1]);let a=p.length/2,o=Math.ceil(i/2)+1;for(let e=0;e<o;e++)p.push(...r.at(Math.min(i,e*2)));m.push(a,o,i,2),h.push(...F(ke[e.colour]),255),g.push(1),_.push(String(t));let s=e.stops.map(e=>({arrive:e.arrive*Qp,leave:e.leave*Qp,rev:e.rev}));s.forEach((t,n)=>{e.bare||t.rev||e.path.closed&&n===s.length-1||(!e.path.closed&&(n===0||n===s.length-1)?D(r,n===0?Qp*tm:i-Qp*tm,n===0?1:-1):D(r,t.arrive))});let c=vm(s),S=vm(s.map(e=>({arrive:i-e.leave,leave:i-e.arrive,rev:e.rev})).reverse()),C=Math.max(c.t,S.t),w=_m.find(e=>e>=2*(C+sm))??3600;for(let[e,n]of[[0,c],[1,S]]){let r=_n(t,e,0);y[r*4]=v.length/4,y[r*4+1]=n.ph.length/4,y[r*4+2]=n.t,y[r*4+3]=i,v.push(...n.ph)}let T=t*.37%1*w;for(let n=T-2*w;!e.bare&&n<3600+w;n+=w)b.push(_n(t,0,0),n),x.push(n+w/2),b.push(_n(t,1,0),n+w/2),x.push(n+w)});for(let e=0;e<n.length*680;e++)y[e]??=0;let O=S;for(let e=0;e<O.length/3;e++)for(let t=0;t<O.length/3;t++)e!==t&&Math.hypot(O[e*3]-O[t*3],O[e*3+1]-O[t*3+1])<em&&(O[e*3+2]=Math.round(O[e*3+2])|1);let k=d.length,A={seg:new Float32Array,colour:new Uint32Array,edge:new Uint32Array,level:new Float32Array,flags:new Float32Array,dist:new Float32Array,count:0},j={seg:new Float32Array(u),colour:new Uint32Array(d),edge:new Uint32Array(k).fill(4294967295),level:new Float32Array(k),flags:new Float32Array(k),dist:new Float32Array(f),count:k},M=E.length;return{track:A,lines:j,lineIds:_,lineColours:new Uint8Array(h),stations:new Float32Array(S),stationAxis:new Float32Array(C),stationShape:new Float32Array(w),stationLine:new Float32Array(T),stationIds:E,stationCount:M,stationLength:new Float32Array(M).fill(em),junctions:new Float32Array,junctionIds:[],phases:new Float32Array(v),meta:new Float32Array(y),samples:new Float32Array(p),lineTable:new Float32Array(m),lineCars:new Float32Array(g),edgePts:new Map,anchor:$p,trips:new Float32Array(b),ends:new Float32Array(x),w:s,h:c,mx:$p.merc[0]+s/2*Qp/40075016.686,my:$p.merc[1]+c/2*Qp/40075016.686,period:3600}}var bm=10.5,xm=1.05,Sm=.75,Cm={showTrains:!0,byLevel:!1,selLine:-1,selEdge:-1,selStation:-1,flatMarks:!1,hollowTrains:!0,boxShrinkPx:1},wm={frames:0,drawMs:0,setupMs:0,firstAt:0,stop:()=>{}};window.twLogo=wm;function Tm(){let e=Re(null);return M(()=>{let t=performance.now(),n=e.current,r=n?.getContext(`webgl2`,{antialias:!0,premultipliedAlpha:!0,alpha:!0,stencil:!1});if(!n||!r)return;let i=new Zp;try{i.init(r)}catch{return}let a=ym();i.setNetwork(a),i.setTrips(0,1,a.trips,void 0,a.ends);let o=1,s=0,c=performance.now(),l=matchMedia(`(prefers-reduced-motion: reduce)`).matches,u=()=>{let e=Math.max(120,Math.min(window.innerWidth-32,1400));o=Sm*Math.min(xm,e/a.w);let t=window.devicePixelRatio||1,r=a.w*o,i=a.h*o;n.style.width=r+`px`,n.style.height=i+`px`,n.width=Math.round(r*t),n.height=Math.round(i*t)},d=()=>{if(s=l?0:requestAnimationFrame(d),r.isContextLost())return;let e=performance.now(),t=(window.devicePixelRatio||1)*o,u=n.width,f=n.height,p=512*2**15*t,m=2*p/u,h=2*p/f,g=[m,0,0,0,0,-h,0,0,0,0,1,0,-a.mx*m,a.my*h,0,1],_=(300+(e-c)/1e3*bm)%a.period;r.viewport(0,0,u,f),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),i.draw({merc:g,globe:null,plane:[0,0,0,1],t:0},_,15,t,Cm),wm.frames++,wm.drawMs+=performance.now()-e};u(),wm.setupMs=performance.now()-t,wm.firstAt=performance.now();let f=()=>{u(),l&&d()};return window.addEventListener(`resize`,f),d(),wm.stop=()=>cancelAnimationFrame(s),()=>{cancelAnimationFrame(s),window.removeEventListener(`resize`,f),r.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),U(`canvas`,{ref:e,class:`start-logo`,role:`img`,"aria-label":`trainsworld`})}export{Ro as $,ra as $t,W as A,Rn as An,Na as At,hs as B,Nn as Bn,Yi as Bt,rl as C,Mr as Cn,La as Ct,fc as D,cr as Dn,Ba as Dt,il as E,sr as En,Ia as Et,Ls as F,nr as Fn,wa as Ft,ms as G,ea as Gt,bs as H,qi as Ht,Is as I,Qn as In,xa as It,cs as J,Qi as Jt,Eo as K,ta as Kt,ks as L,Dn as Ln,da as Lt,zs as M,Xn as Mn,pa as Mt,Bs as N,$n as Nn,ya as Nt,cc as O,In as On,Ha as Ot,Vs as P,rr as Pn,Ta as Pt,es as Q,Wi as Qt,Ds as R,Fn as Rn,oa as Rt,cl as S,Nr as Sn,oo as St,ol as T,yr as Tn,Fa as Tt,gs as U,Ii as Ut,Ss as V,ia as Vt,Es as W,Fi as Wt,Mo as X,zi as Xt,ls as Y,Ki as Yt,ts as Z,Ji as Zt,Zl as _,Ir as _n,uo as _t,lf as a,Ai as an,ds as at,Tl as b,kr as bn,qa as bt,cu as c,Di as cn,Lo as ct,au as d,ai as dn,ho as dt,na as en,us as et,Ll as f,oi as fn,yo as ft,Y as g,Lr as gn,fo as gt,Ml as h,Fr as hn,lo as ht,uf as i,U as in,is as it,Ws as j,er as jn,la as jt,lc as k,Ln as kn,za as kt,ou as l,gi as ln,So as lt,ru as m,Rr as mn,po as mt,Zp as n,Gi as nn,$o as nt,bd as o,ji as on,Io as ot,Hl as p,Wr as pn,xo as pt,Ao as q,Xi as qt,qf as r,Ui as rn,ps as rt,xd as s,ki as sn,Fo as st,Tm as t,$i as tn,Qo as tt,su as u,Yr as un,vo as ut,Dl as v,Ar as vn,Ka as vt,al as w,jr as wn,Ra as wt,sl as x,Pr as xn,co as xt,El as y,Or as yn,Ja as yt,Os as z,On as zn,Zi as zt};