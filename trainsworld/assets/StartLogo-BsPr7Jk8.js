import{$f as e,$h as t,$o as n,$r as r,Ac as i,Af as a,Al as o,Ao as s,Ba as c,Bd as l,Bo as u,Bu as d,Cc as f,Cf as p,Co as m,Dc as h,Dd as g,Df as _,Dh as v,Dl as y,Do as b,Ds as x,Ec as S,Eo as C,Es as w,Fc as T,Fd as E,Fl as D,Fo as O,Fr as k,Fs as A,Gf as j,Go as M,Ha as N,Hc as P,Hf as ee,Hh as te,Hl as F,Hs as ne,Ic as re,Il as ie,Io as ae,Is as I,Jd as oe,Jo as se,La as ce,Lf as le,Lh as L,Ll as ue,Lo as de,Mc as fe,Md as pe,Ml as me,Mo as he,Mr as ge,Ms as _e,Nc as ve,Nd as ye,No as be,Ns as xe,Oc as Se,Oo as Ce,Ou as we,Pd as Te,Pf as Ee,Pl as De,Po as Oe,Ps as ke,Pt as Ae,Qa as je,Qi as Me,Ra as Ne,Rf as Pe,Ro as Fe,Rs as Ie,S as Le,Sf as Re,So as ze,Sr as Be,Ss as Ve,Tc as He,Tf as Ue,Ti as We,To as Ge,Ts as Ke,Ua as qe,Uf as Je,Uh as Ye,Uo as Xe,Va as Ze,Vf as Qe,Vl as $e,Vo as et,Vs as tt,Wd as nt,Wo as rt,Xa as it,Xo as at,Yo as ot,_o as st,_s as R,_u as ct,aa as lt,ac as ut,af as dt,ag as ft,as as pt,bc as mt,bi as ht,bo as gt,br as _t,bs as vt,c as yt,cg as bt,co as xt,cp as z,cs as St,dc as Ct,df as wt,dg as Tt,do as Et,dp as Dt,dr as Ot,ds as kt,eg as At,es as jt,fa as Mt,fo as Nt,fs as Pt,fu as Ft,gl as It,gs as Lt,ho as Rt,hs as zt,ic as Bt,ii as Vt,ip as Ht,jo as Ut,kc as Wt,ko as Gt,l as Kt,lf as qt,lg as Jt,lo as Yt,lr as Xt,mo as Zt,ms as B,mu as Qt,nc as $t,ng as en,no as tn,ns as nn,nu as rn,o as an,os as V,pa as on,po as sn,pu as cn,qa as ln,qo as un,rc as dn,rg as fn,rm as pn,ro as mn,ru as hn,s as gn,sg as _n,si as vn,sp as yn,ss as H,t as bn,to as xn,ts as Sn,ua as U,uo as Cn,us as wn,vm as Tn,vo as En,wc as Dn,wd as On,wf as kn,wi as An,wl as jn,wo as Mn,wt as Nn,wu as Pn,xc as Fn,xf as In,xi as Ln,xo as Rn,xs as zn,yh as Bn,yp as Vn,ys as W,za as Hn,zl as Un,zo as Wn,zp as Gn,zs as G}from"./cellIndex-BrrLmJau.js";var Kn=.002,qn=10*Math.PI/180;function Jn(e,t,n){let r=e.length/2,i=!1;for(let a=0,o=r-1;a<r;o=a++){let r=e[2*a],s=e[2*a+1],c=e[2*o],l=e[2*o+1];s>n!=l>n&&t<r+(c-r)*(n-s)/(l-s)&&(i=!i)}return i}function Yn(e,t,n,r,i){let a=r.length/2,o=e.length/2;for(let i=0;i<a;i++)if(Jn(e,t+r[2*i],n+r[2*i+1]))return!0;for(let s=0;s<Math.max(1,a-1);s++){let c=a>1?s+1:s,l=t+r[2*s],u=n+r[2*s+1],d=t+r[2*c],f=n+r[2*c+1];for(let t=0;t<o;t++){let n=(t+1)%o;if(fe(l,u,d,f,e[2*t],e[2*t+1],e[2*n],e[2*n+1])<=i)return!0}}return!1}function Xn(e,t){let n=e.corners,r=n.length/2;if(r<3)return null;let i=1/0,a=1/0,o=-1/0,s=-1/0,c=0;for(let e=0;e<r;e++)i=Math.min(i,n[2*e]),o=Math.max(o,n[2*e]),a=Math.min(a,n[2*e+1]),s=Math.max(s,n[2*e+1]),c+=n[2*e+1]/r;let l=t(c);return{c:n,x0:i,y0:a,x1:o,y1:s,k:l,tol:8*l}}function Zn(e,t,n){let r=Math.max(0,t.length)*1.5*e.k+e.tol;return t.x<e.x0-r||t.x>e.x1+r||t.y<e.y0-r||t.y>e.y1+r?!1:Yn(e.c,t.x,t.y,n,e.tol)}function Qn(e,t,n=()=>1){return e.map(e=>{let r=Xn(e,n);return r?t.filter(e=>Zn(r,e,i(e,n(e.y)))).map(e=>e.id):[]})}function $n(e,t,n=()=>1){let r=[];for(let i of Qn(e,t,n))for(let e=1;e<i.length;e++)r.push([i[e-1],i[e]]);return r}var er=null,tr=``,nr=[];function rr(e,t,n,r){if(!t?.length)return e;let i=t.map(e=>e.corners.join(`,`)).join(`|`);return(n!==er||i!==tr)&&(er=n,tr=i,nr=$n(t,n,r)),nr.length?[...e,...nr]:e}var ir=15*Math.PI/180;function ar(e){let t=e.line;if(t&&t.length>=4){let e=t[t.length-2]-t[0],n=t[t.length-1]-t[1];if(e||n)return Math.atan2(n,e)}return e.heading}function or(e,t){let n=((e-t)%Math.PI+Math.PI)%Math.PI;return Math.min(n,Math.PI-n)}function sr(e){let t=e.map(ar),n=[],r=-1,i=-1;for(let a=0;a<e.length;a++){let o=[],s=0;for(let n=0;n<e.length;n++)or(t[a],t[n])<=ir&&(o.push(n),s+=e[n].length);(o.length>r||o.length===r&&s>i)&&([n,r,i]=[o,o.length,s])}return t[n.reduce((t,n)=>e[n].length>e[t].length?n:t)]}function cr(e,t=()=>1){let n=e.filter(e=>e.length>0);if(!n.length)return null;let r=sr(n),a=Math.cos(r),o=Math.sin(r),s=1/0,c=-1/0,l=1/0,u=-1/0,d=0;for(let e of n){let r=i(e,t(e.y));d+=e.y/n.length;for(let t=0;t+1<r.length;t+=2){let n=e.x+r[t],i=e.y+r[t+1],d=n*a+i*o,f=-n*o+i*a;s=Math.min(s,d),c=Math.max(c,d),l=Math.min(l,f),u=Math.max(u,f)}}let f=23*t(d);return s-=f,c+=f,l-=f,u+=f,[[s,l],[c,l],[c,u],[s,u]].flatMap(([e,t])=>[e*a-t*o,e*o+t*a])}function lr(e,t,n=qn){let r=Math.PI/2,i=Math.round((e-t)/r),a=e-t-i*r;return Math.abs(a)<=n?t+i*r:null}function ur(e,t,n,r=qn){let i=t.x-e.x,a=t.y-e.y;return i||a?lr(Math.atan2(a,i),n,r):null}function dr(e,t,n){let r=Math.cos(t),i=Math.sin(t),a=(n.x-e.x)*r+(n.y-e.y)*i;return{x:e.x+r*a,y:e.y+i*a}}function fr(e,t,n,r){let i=Math.cos(t),a=Math.sin(t),o=Math.cos(r),s=Math.sin(r),c=i*s-a*o;if(Math.abs(c)<1e-9)return null;let l=((n.x-e.x)*s-(n.y-e.y)*o)/c;return{x:e.x+i*l,y:e.y+a*l}}function pr(e,t,n){let r=((Math.atan2(t.y-e.y,t.x-e.x)-n)%Math.PI+Math.PI)%Math.PI;return Math.min(r,Math.PI-r)}function mr(e,t,n,r,i=qn,a=1/0){let o=t?ur(t,e,r,i):null,s=n?ur(n,e,r,i):null;if(o!==null&&s!==null){let r=fr(t,o,n,s);return r&&Math.hypot(r.x-e.x,r.y-e.y)<=a?r:pr(t,e,o)<=pr(n,e,s)?dr(t,o,e):dr(n,s,e)}return o===null?s===null?e:dr(n,s,e):dr(t,o,e)}function hr(e){let t=e.length/2,n=0;for(let r=0,i=t-1;r<t;i=r++)n+=e[2*i]*e[2*r+1]-e[2*r]*e[2*i+1];return Math.abs(n)/2}var gr=2,_r=2.5,vr=[`#f6d6c4`,`#f2e9d0`,`#d6e3cc`,`#cfe0ee`,`#efd4dd`,`#e4d9c4`,`#f5e4a8`];function yr(e,t){let n=e.length/2,r=e[0],i=e[1],a=e[2]-r,o=e[3]-i,s=Math.hypot(a,o)||1;a/=s,o/=s;let c=0,l=0;for(let t=0;t<n;t++)c+=e[2*t]/n,l+=e[2*t+1]/n;let u=(c-r)*-o+(l-i)*a>=0?1:-1,d=-o*u,f=a*u,p=(e,n)=>((e-r)*a+(n-i)*o)/t,m=(e,n)=>((e-r)*d+(n-i)*f)/t,h=[],g=1/0,_=-1/0,v=1/0,y=-1/0;for(let t=0;t<n;t++){let n=p(e[2*t],e[2*t+1]),r=m(e[2*t],e[2*t+1]);h.push(n,r),g=Math.min(g,n),_=Math.max(_,n),v=Math.min(v,r),y=Math.max(y,r)}return{ux:a,uy:o,vx:d,vy:f,toU:p,toV:m,back:(e,n)=>[r+(a*e+d*n)*t,i+(o*e+f*n)*t],pts:h,u0:g,u1:_,v0:v,v1:y}}function br(e,t,n){let r=yr(e,t),i=n.map(e=>xr(e,r)),a=0;for(let e=r.u0+_r/2;e<r.u1;e+=_r)for(let t=r.v0+_r/2;t<r.v1;t+=_r)Sr(r.pts,e,t)&&(i.some(n=>wr(n,e,t)<8)||a++);return Math.round(a*_r*_r/gr)}function xr(e,t){let n=[];for(let r=0;r+1<e.length;r+=2)n.push(t.toU(e[r],e[r+1]),t.toV(e[r],e[r+1]));return n}function Sr(e,t,n){let r=e.length/2,i=!1;for(let a=0,o=r-1;a<r;o=a++){let r=e[2*a],s=e[2*a+1],c=e[2*o],l=e[2*o+1];s>n!=l>n&&t<r+(c-r)*(n-s)/(l-s)&&(i=!i)}return i}function Cr(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c>0?Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/c)):0;return Math.hypot(n+l*o-e,r+l*s-t)}function wr(e,t,n){if(e.length<4)return e.length>=2?Math.hypot(e[0]-t,e[1]-n):1/0;let r=1/0;for(let i=0;i+3<e.length;i+=2)r=Math.min(r,Cr(t,n,e[i],e[i+1],e[i+2],e[i+3]));return r}var Tr=64,Er=new WeakMap,Dr=new Set,Or=[];function kr(e,t){if(e===t)return Dr;let n=e?Er.get(e):void 0,r=Er.get(t);if(!n||!r||n.book!==r.book||n.seq>r.seq)return null;if(r.seq===n.seq+1)return r.book.ids.get(r.seq)??null;let i=new Set;for(let e=n.seq+1;e<=r.seq;e++){let t=r.book.ids.get(e);if(!t)return null;for(let e of t)i.add(e)}return i}var Ar=8,jr=2**21,Mr=2**22,Nr=class{recs=new Map;grid=new Map;cell=100;of=new Map;members=new Map;out=null;book={next:0,ids:new Map};frameKey=``;lastInput=null;linksIn=null;linkKeys=[];linkPairs=[];linksBy=new Map;apart=f;bldIn=null;blds=new Map;calls=0;stamp=0;lastWorked=-1;buildingFirst(e){let t;for(let n of this.blds.get(e)?.members??[])(!t||n.num<t.num)&&(t=n);return t?.id}ready(e){return!!this.out&&e===this.frameKey}update(e,t,n,r,i=f,a=Or){let o=++this.calls;if(this.out&&r!==this.frameKey&&this.reset(),this.frameKey=r,this.out&&e===this.lastInput&&this.sameInputs(t,i,a))return this.lastWorked=0,this.out;let s=e.length,c=this.recs.size,l=[],u=[],d=[],p=0;for(let r of e){let s=this.recs.get(r.id);if(!s)s=this.make(r,n),this.recs.set(r.id,s),l.push(s);else if(s.seen===o)return this.reset(),this.fallback(e,t,n,i,a);else p++,Fr(s,r)&&(u.push(s),d.push(r));s.seen=o}let m=[];if(c>p)for(let e of this.recs.values())e.seen!==o&&m.push(e);let h=l.length+u.length+m.length;return c>0&&h*Ar>s+Ar?(this.reset(),this.update(e,t,n,r,i,a)):(this.lastInput=e,!h&&this.out&&this.sameInputs(t,i,a)?(this.lastWorked=0,this.out):(this.lastWorked=c===0?-1:h,this.apply(l,u,d,m,t,n,i,a)))}patch(e,t,n,r,i=f,a=Or){if(!this.ready(r))throw Error(`ComplexBuilder.patch before a whole update in this frame`);let o=++this.calls;this.lastInput=null;let s=[],c=[],l=[],u=[];for(let[t,r]of e){let e=this.recs.get(t);if(e?.seen!==o){if(!r)e&&(e.seen=o,u.push(e));else if(e)e.seen=o,Fr(e,r)&&(c.push(e),l.push(r));else{let e=this.make(r,n);e.seen=o,this.recs.set(r.id,e),s.push(e)}}}let d=s.length+c.length+u.length;return!d&&this.sameInputs(t,i,a)?(this.lastWorked=0,this.out):(this.lastWorked=d,this.apply(s,c,l,u,t,n,i,a))}sameInputs(e,t,n){return e===this.linksIn&&t===this.apart&&n===this.bldIn}apply(e,t,n,r,i,a,o,s){let c=++this.stamp,l=[],u=[],d=e=>{if(e&&e.mark!==c){e.mark=c,u.push(e);for(let t of e.members)!t.gone&&t.mark!==c&&(t.mark=c,l.push(t))}},f=this.diffLinks(i);if(o!==this.apart){for(let e of o)this.apart.has(e)||f.push(...e.split(`|`));for(let e of this.apart)o.has(e)||f.push(...e.split(`|`));this.apart=o}for(let e of r)e.gone=!0;for(let e of r)this.gridRemove(e),this.recs.delete(e.id),d(e.comp);for(let e of t)d(e.comp),this.gridRemove(e);let p=t.concat(e);t.forEach((e,t)=>this.fill(e,n[t],a)),this.place(p);for(let t of e)t.mark!==c&&(t.mark=c,l.push(t));for(let e of t)e.mark!==c&&(e.mark=c,l.push(e));if(this.linksBy.size){for(let e of p)for(let t of this.linksBy.get(e.id)??[])d(this.recs.get(t)?.comp??null);for(let e of r)for(let t of this.linksBy.get(e.id)??[])d(this.recs.get(t)?.comp??null)}for(let e of f)d(this.recs.get(e)?.comp??null);this.syncBuildings(s,a,p,r,d);for(let e of p)this.reach(e,d);if(!l.length&&!r.length&&this.out)return this.out;for(let e of l)e.parent=e;let m=e=>{for(;e.parent!==e;)e.parent=e.parent.parent,e=e.parent;return e},h=(e,t)=>{let n=m(e),r=m(t);n!==r&&(n.parent=r)},g=this.cell;for(let e of l){let t=Math.floor(e.x/g),n=Math.floor(e.y/g);for(let r=t-1;r<=t+1;r++)for(let t=n-1;t<=n+1;t++){let n=this.grid.get(Pr(r,t));if(n)for(let t of n)t.num>e.num&&t.mark===c&&Rr(e,t)&&!this.isApart(e,t)&&h(e,t)}}for(let[e,t]of this.linkPairs){let n=this.recs.get(e),r=this.recs.get(t);if(n&&r){if(n.mark===c!=(r.mark===c))return this.rebuild(a);n.mark===c&&h(n,r)}}for(let e of this.blds.values()){let t=null,n=!1;for(let r of e.members)r.mark===c?t?h(r,t):t=r:n=!0;if(t&&n)return this.rebuild(a)}let _=new Map,v=[];for(let e of l){let t=m(e),n=_.get(t);n||(_.set(t,n={members:[],num:0,mark:0}),v.push(n)),n.members.push(e),e.comp=n}for(let e of u)this.members.delete(e.num);for(let e of v)e.members.length>1&&e.members.sort((e,t)=>e.num-t.num),e.num=e.members[0].num,this.members.set(e.num,e.members.map(e=>e.id));let y=new Set;for(let e of l)this.of.set(e.id,e.comp.num),y.add(e.id);for(let e of r)this.of.delete(e.id),y.add(e.id);return this.hand(y)}hand(e){let t={of:this.of,members:this.members},n=this.book,r=n.next++;return r>0&&(n.ids.set(r,e),n.ids.delete(r-Tr)),Er.set(t,{book:n,seq:r}),this.out=t}rebuild(e){let t=[];for(let e of this.recs.values())e.gone||t.push({id:e.id,x:e.x,y:e.y,heading:e.heading,length:e.length,...e.line?{line:e.line}:{}});let n=this.linksIn??[],r=this.apart,i=this.bldIn??Or,a=this.frameKey;return this.reset(),this.update(t,n,e,a,r,i)}reset(){this.recs.clear(),this.grid.clear(),this.cell=100,this.of=new Map,this.members=new Map,this.out=null,this.book={next:0,ids:new Map},this.lastInput=null,this.linksIn=null,this.linkKeys=[],this.linkPairs=[],this.linksBy=new Map,this.apart=f,this.bldIn=null,this.blds.clear()}fallback(e,t,n,r,i){return this.lastWorked=-1,He(e,rr(t,i,e,n),n,r)}isApart(e,t){return this.apart.size>0&&this.apart.has(Wt(e.id,t.id))}make(e,t){let n={id:e.id,num:Number(e.id),x:0,y:0,heading:0,length:0,k:1,line:void 0,pts:[],seg:[],ext:0,seen:0,mark:0,comp:null,cell:0,gone:!1,blds:null};return n.parent=n,this.fill(n,e,t),n}fill(e,t,n){e.x=t.x,e.y=t.y,e.heading=t.heading,e.length=t.length,e.k=n(t.y),e.line=t.line,e.seg=ve(t,e.k),e.pts=i(t,e.k,e.seg),e.ext=Math.max(Se(e.pts),Se(e.seg))}reachOf(e){return Math.max(100*Math.max(1,e.k),2*e.ext+50*e.k)}place(e){let t=this.cell;for(let n of e)t=Math.max(t,this.reachOf(n));if(t>this.cell){this.cell=t,this.grid.clear();for(let e of this.recs.values())this.gridAdd(e)}else for(let t of e)this.gridAdd(t)}gridAdd(e){e.cell=Pr(Math.floor(e.x/this.cell),Math.floor(e.y/this.cell));let t=this.grid.get(e.cell);t?t.push(e):this.grid.set(e.cell,[e])}gridRemove(e){let t=this.grid.get(e.cell);if(!t)return;let n=t.indexOf(e);n>=0&&t.splice(n,1),t.length||this.grid.delete(e.cell)}reach(e,t){let n=Math.floor(e.x/this.cell),r=Math.floor(e.y/this.cell);for(let i=n-1;i<=n+1;i++)for(let n=r-1;n<=r+1;n++){let r=this.grid.get(Pr(i,n));if(r)for(let n of r)n!==e&&(e.num<n.num?Rr(e,n):Rr(n,e))&&!this.isApart(e,n)&&t(n.comp)}}diffLinks(e){if(e===this.linksIn)return[];this.linksIn=e;let t=e.map(([e,t])=>`${e}|${t}`),n=[];if(t.length!==this.linkKeys.length||t.some((e,t)=>e!==this.linkKeys[t])){let r=new Set(this.linkKeys),i=new Set(t);this.linkPairs.forEach((e,t)=>{i.has(this.linkKeys[t])||n.push(e[0],e[1])}),e.forEach((e,i)=>{r.has(t[i])||n.push(e[0],e[1])}),this.linksBy=new Map;for(let[t,n]of e)(this.linksBy.get(t)??this.linksBy.set(t,[]).get(t)).push(n),(this.linksBy.get(n)??this.linksBy.set(n,[]).get(n)).push(t)}return this.linkKeys=t,this.linkPairs=e.map(([e,t])=>[e,t]),n}syncBuildings(e,t,n,r,i){let a=[],o=(e,t)=>{if(e.members.delete(t),t.blds){let n=t.blds.filter(t=>t!==e);t.blds=n.length?n:null}};if(e!==this.bldIn){let n=new Map(e.map(e=>[e.id,e]));for(let[e,t]of this.blds){let r=n.get(e)?.corners;if(r&&(r===t.corners||Lr(r,t.corners)))t.corners=r;else{for(let e of[...t.members])i(e.comp),o(t,e);this.blds.delete(e)}}for(let n of e)if(!this.blds.has(n.id)){let e={corners:n.corners,shape:Xn(n,t),members:new Set};this.blds.set(n.id,e),a.push(e)}this.bldIn=e}for(let e of r)if(e.blds)for(let t of e.blds)t.members.delete(e);for(let e of a)if(e.shape){for(let t of this.recs.values())Zn(e.shape,t,t.pts)&&(e.members.add(t),(t.blds??=[]).push(e));for(let t of e.members)i(t.comp)}if(this.blds.size)for(let e of n)for(let t of this.blds.values()){if(!t.shape||a.includes(t))continue;let n=t.members.has(e),r=Zn(t.shape,e,e.pts);if(n!==r){if(!r)o(t,e);else{t.members.add(e),(e.blds??=[]).push(t);for(let e of t.members)i(e.comp)}}}}};function Pr(e,t){return(e+jr)*Mr+(t+jr)}function Fr(e,t){return e.x!==t.x||e.y!==t.y||e.heading!==t.heading||e.length!==t.length||e.line!==t.line&&!Ir(e.line,t.line)}var Ir=(e,t)=>!!e&&!!t&&Lr(e,t);function Lr(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!Object.is(e[n],t[n]))return!1;return!0}function Rr(e,t){return h(e,e.pts,e.seg,t,t.pts,t.seg,(e.k+t.k)/2)}function zr(e,t,n,r,i=f,a=Or){let o=He(t,rr(n,a,t,r),r,i);if(e.of.size!==o.of.size||e.members.size!==o.members.size)return`sizes ${e.of.size}/${e.members.size} against ${o.of.size}/${o.members.size}`;for(let[t,n]of o.of)if(e.of.get(t)!==n)return`station ${t} in ${e.of.get(t)} against ${n}`;for(let[t,n]of o.members)if(e.members.get(t)?.join()!==n.join())return`complex ${t}: ${e.members.get(t)?.join()} against ${n.join()}`;return null}var Br=``,Vr={of:new Map,members:new Map},Hr=``,Ur={of:new Map,members:new Map},Wr=e=>Tn().kind+e.map(e=>`${e.id}:${e.x}:${e.y}:${e.heading}:${e.length}:${e.line?Array.from(e.line).join(`;`):``}`).join(`|`),Gr=``,Kr=f;function qr(){let e=U.value?.save.apart??[],t=e.join(`|`);return t!==Gr&&(Gr=t,Kr=e.length?Dn(e):f),Kr}var Jr=[],Yr=[],Xr=class{b=new Nr;from=null;get(e,t,n,r){let i=e?.save.stations??[],a=Tn().kind,o=e&&this.from&&this.b.ready(a)?mt(this.from,e):null,s=o?this.b.patch(Array.from(o.stations,([e,[,t]])=>[e,t??null]),t,T,a,n,r):this.b.update(i,t,T,a,n,r);if(this.from=e,Fn===`check`){let e=zr(s,i,t,T,n,r);e&&console.error(`T-1380 check: the ${t.length||r.length?`complexes`:`distance groups`} patched from changes differ from a whole build (${e})`)}return s}},Zr=new Xr,Qr=new Xr,$r=t(()=>{let e=U.value,t=e?.save.stations??[],n=e?.save.links??Jr,r=e?.save.buildings??Yr,i=qr();if(Fn===`0`){let e=rr(n,r,t,T),a=Wr(t)+`/`+e.join(`|`)+`/`+Gr;return a!==Br&&(Br=a,Vr=He(t,e,T,i)),Vr}return Zr.get(e,n,i,r)}),ei=t(()=>{if(!(U.value?.save.links??[]).length&&!U.value?.save.buildings?.length)return $r.value;let e=U.value?.save.stations??[],t=qr();if(Fn===`0`){let n=Wr(e)+`/`+Gr;return n!==Hr&&(Hr=n,Ur=He(e,[],T,t)),Ur}return Qr.get(U.value,Jr,t,Yr)}),ti=e=>S($r.value,e),ni=e=>{let t=$r.peek().of.get(e);return t===void 0?e:`c${t}`},ri=en(null);At(()=>{oe.value,ri.peek()!==null&&(ri.value=null)});function ii(e){oe.value={kind:`station`,station:e},ri.value=e}function ai(e){return ri.value!==e}function oi(e,t){let n=ci.map,r=n?._camera?.transform??n?.transform;return typeof r?.isLocationOccluded==`function`?r.isLocationOccluded({lng:e,lat:t}):St(ci.overlay?.cam,e,t)}var si=en(0),ci={map:null,overlay:null,tools:null,edgeEditor:null,nodeDrag:null};function li(e,t){let n=ui(e);if(n===null)return 0;let r=U.value?.lineStats[e];return r?.rows?(n===0?An(e):We(e)?.counts)?.[v(r.hours??Bn,r.periods,Ot(r))]??0:ht(e,n)?.[t]??0}function ui(e){let t=U.value,n=t?.lineStats[e],r=t?Vt(t).get(e):void 0;return n&&r?Be(_t(r.stops),Math.floor(Ot(n)/86400)):null}var di=new Set,fi=t(()=>{let e=U.value,t=new Set;if(e)for(let n in e.lineStats){let r=e.lineStats[n],i=v(r.hours??Bn,3,Ot(r)),a=li(n,i);(r.status!==`running`||!(a>0)||r.autoS?.[i]===0&&ui(n)===0)&&t.add(n)}return(di.size!==t.size||![...t].every(e=>di.has(e)))&&(di=t),di}),pi=e=>fi.value.has(e),mi=``;At(()=>{mi=L(`lineRunning.idle`)});var hi=`M14.2 8c0-.6-.6-1-1.4-1H9.7L6.6 2.3H5.2L6.8 7H3.7L2.5 5.5h-1l.8 2.5-.8 2.5h1l1.2-1.5h3.1L5.2 13.7h1.4L9.7 9h3.1c.8 0 1.4-.4 1.4-1z`,gi={"":12,sm:12,lg:18},_i={"":20,sm:16,lg:30},vi={"":5,sm:4,lg:7},yi=240,bi=en(0),xi=null,Si=``,Ci=new Map,wi=new Set;function Ti(){Si=``,Ci.clear(),bi.value++}function Ei(){matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener(`change`,()=>{Ti(),Ei()},{once:!0})}function Di(e){let t=e.fontfaces;if(!t)return Ti();let n=[];for(let e of t)for(let t of(e.unicodeRange||`U+0-10FFFF`).split(`,`)){let e=/U\+([0-9A-F?]+)(?:-([0-9A-F]+))?/i.exec(t.trim());if(!e)continue;let r=parseInt(e[1].replace(/\?/g,`0`),16),i=e[2]?parseInt(e[2],16):parseInt(e[1].replace(/\?/g,`F`),16);n.push([r,i])}let r=e=>{for(let t of e){let e=t.codePointAt(0);if(n.some(([t,n])=>e>=t&&e<=n))return!0}return!1},i=!1;for(let e of Ci.keys())r(e.split(`|`).slice(3).join(`|`))&&(Ci.delete(e),i=!0);i&&ki()}var Oi=!1;function ki(){Oi||(Oi=!0,setTimeout(()=>{Oi=!1,bi.value++},50))}typeof document<`u`&&(document.addEventListener(`tw-fontchange`,Ti),document.fonts?.addEventListener?.(`loadingdone`,Di),typeof matchMedia<`u`&&Ei());function Ai(e,t,n=1){if(typeof document>`u`||!e||(xi??=document.createElement(`canvas`).getContext(`2d`),!xi))return null;Si||=getComputedStyle(document.body).fontFamily;let r=devicePixelRatio*n,i=`${Si}|${t}|${r}|${e}`,a=Ci.get(i);if(a!==void 0)return a;let o=`700 ${yi}px ${Si}`;xi.font=o,xi.textBaseline=`alphabetic`;let s=xi.measureText(e),c=gi[t]/yi,l=_i[t],u=xi.measureText(`I`),d=(u.actualBoundingBoxRight+u.actualBoundingBoxLeft)*c,f=Math.max(l,s.width*c+2*vi[t]),p=l/2+(s.actualBoundingBoxAscent-s.actualBoundingBoxDescent)/2*c,m=r>0?Math.round(p*r)/r:p,h={w:f,h:l,x:f/2-(s.actualBoundingBoxRight-s.actualBoundingBoxLeft)/2*c,y:m,top:m-p,iw:(s.actualBoundingBoxRight+s.actualBoundingBoxLeft)*c,ih:(s.actualBoundingBoxAscent+s.actualBoundingBoxDescent)/2*c,stem:d},g=[h.w,h.x,h.y,h.top].every(Number.isFinite)&&s.width>0;if(document.fonts&&!document.fonts.check(o,e)){let t=`${o}|${e}`;wi.has(t)||(wi.add(t),document.fonts.load(o,e).then(()=>{for(let t of Ci.keys())t.endsWith(`|${e}`)&&Ci.delete(t);ki()},()=>void 0))}return Ci.set(i,g?h:null),g?h:null}function ji(e,t){if(typeof document>`u`||!e||(xi??=document.createElement(`canvas`).getContext(`2d`),!xi))return null;Si||=getComputedStyle(document.body).fontFamily,xi.font=`700 ${yi}px ${Si}`,xi.textBaseline=`alphabetic`;let n=t/yi,r=/^[ -~À-ɏ]+$/.test(e),i=xi.measureText(r?`H`:e),a=i.actualBoundingBoxAscent*n,o=r?0:i.actualBoundingBoxDescent*n;return Number.isFinite(a+o)?{up:a,down:o}:null}function Mi(e,t,n=1){if(typeof document>`u`||!e)return null;Si||=getComputedStyle(document.body).fontFamily;let r=Ci.get(`${Si}|${t}|${devicePixelRatio*n}|${e}`);if(r!==void 0)return r;if(Ni.set(`${t}|${n}|${e}`,[e,t,n]),!Pi){Pi=!0;let e=t=>{let n=performance.now()+8,r=0;for(let[e,[i,a,o]]of Ni){if(r++&&(t&&!t.didTimeout?t.timeRemaining()<1:performance.now()>n))break;Ni.delete(e),Ai(i,a,o)}Ni.size?Fi(e):(Pi=!1,ki())};Fi(e)}return null}var Ni=new Map,Pi=!1,Fi=e=>typeof requestIdleCallback==`function`?requestIdleCallback(e,{timeout:500}):setTimeout(e,16),Ii=.18,Li=.94,Ri=1.14,zi=2.4,Bi=1.5;function Vi(e,t){let{h:n,top:r}=e;if(t===`square`){let t=Li*n,i=Math.max(t,e.w-(n-t));return{w:i,h:n,x:e.x+(i-e.w)/2,y:e.y,rect:{y:r+(n-t)/2,w:i,h:t,r:t*Ii}}}if(t===`diamond`){let t=Ri*n,i=.06*n,a=Math.max(t,e.iw+2*(e.ih+.12*n)),o=r+n/2,s=t/2-i,c=[i,t/2,a-t/2,a-i].map(e=>e.toFixed(2)),l=(o-s).toFixed(2),u=(o+s).toFixed(2),d=o.toFixed(2);return{w:a,h:n,x:e.x+(a-e.w)/2,y:e.y,path:{d:`M${c[0]} ${d}L${c[1]} ${l}L${c[2]} ${l}L${c[3]} ${d}L${c[2]} ${u}L${c[1]} ${u}Z`,stroke:2*i}}}if(t===`outline`){let t=Math.max(e.stem,zi);return{w:e.w,h:n,x:e.x,y:e.y,rect:{x:t/2,y:r+t/2,w:e.w-t,h:n-t,r:(n-t)/2,ring:t}}}let i=t===`pill`?Math.max(e.w,Bi*n):e.w;return{w:i,h:n,x:e.x+(i-e.w)/2,y:e.y,rect:{y:r,w:i,h:n,r:n/2}}}var Hi=`http://www.w3.org/2000/svg`;function Ui(e,t,n=`circle`){let r=Ai(e,t);if(!r){let t=document.createElement(`span`);return t.textContent=e,t}let i=Vi(r,n),a=document.createElementNS(Hi,`svg`);a.style.width=i.w+`px`,a.style.height=i.h+`px`;let o;if(i.path)o=document.createElementNS(Hi,`path`),o.setAttribute(`d`,i.path.d),o.setAttribute(`stroke-width`,String(i.path.stroke));else{o=document.createElementNS(Hi,`rect`);let e=i.rect;e.ring!==void 0&&(o.setAttribute(`class`,`ring`),o.setAttribute(`x`,String(e.x)),o.setAttribute(`stroke-width`,String(e.ring)));for(let[t,n]of[[`y`,e.y],[`width`,e.w],[`height`,e.h],[`rx`,e.r]])o.setAttribute(t,String(n))}let s=document.createElementNS(Hi,`text`);return s.setAttribute(`x`,String(i.x)),s.setAttribute(`y`,String(i.y)),s.textContent=e,a.append(o,s),a}var Wi=[`ferry`,`tram`,`train`,`hsr`,`bus`],Gi={ferry:`#0e8c96`,tram:`#72c2f2`,train:`#1e3ce6`,hsr:`#1d2a8c`,bus:`#9145d2`};function Ki(e){switch(e){case`ferry`:return L(`transitModes.ferry`);case`tram`:return L(`transitModes.tram`);case`train`:return L(`transitModes.train`);case`hsr`:return L(`transitModes.hsr`);case`bus`:return L(`transitModes.bus`)}}var qi=()=>g.value.transitModes;function Ji(e){switch(Nn(e)){case`ferry`:return`ferry`;case`bus`:return`bus`;case`tram`:return`tram`;case`fast`:return`hsr`;case`rail`:return`train`;default:return null}}var Yi=new WeakMap;function Xi(e){let t=U.value;if(!t)return null;let n=`${t.version}|${Gn.value}`,r=Yi.get(e.lines);if(r?.at===n)return r;let i=lt(t),a=Vt(t),o=e.purposes?.get(`longer`)?.lines,s=new Map,c=new Map,l=(e,t,n,r)=>{let i=e.get(t);i||e.set(t,i=[0,0,0,0,0]),i[n]+=r};for(let[t,n]of e.lines){let e=Ji(t);if(!e)continue;let r=Wi.indexOf(e),u=n.stops?.length===n.boardings.length?n.stops:a.get(t)?.stops;if(!u||u.length!==n.boardings.length)continue;let d=o?.get(t)?.boardings;for(let e=0;e<u.length;e++){let t=i.get(u[e]),a=t?ge(t):null;if(!a)continue;let o=d?.[e]??0;l(s,a,r,Math.max(0,n.boardings[e]-o)),o>0&&l(c,a,r,o)}}let u={at:n,within:s,between:c};return Yi.set(e.lines,u),u}var Zi=e=>{let t=e?e.reduce((e,t)=>e+t,0):0;return!e||!(t>0)?null:Object.fromEntries(Wi.map((n,r)=>[n,e[r]/t]))};function Qi(e,t,n=!1){if(!qi()||!e||!t)return null;let r=Xi(e);return r?Zi((n?r.between:r.within).get(t)):null}function $i(e){let t=[0,0,0,0,0];for(let{shares:n,rail:r}of e)n&&r>0&&Wi.forEach((e,i)=>t[i]+=n[e]*r);return Zi(t)}function ea(e){let t=U.value;if(!qi()||!t)return null;let n=lt(t),r=[0,0,0,0,0];for(let t of e){let e=[0,0,0,0,0];for(let r of t.legs){let t=r.kind===`ride`?Ji(r.line):null;if(!t)continue;let i=0;for(let e=1;e<r.stations.length;e++){let t=n.get(r.stations[e-1]),a=n.get(r.stations[e]);t&&a&&(i+=k(t.lng,t.lat,a.lng,a.lat))}e[Wi.indexOf(t)]+=i}let i=e.reduce((e,t)=>e+t,0);i>0&&e.forEach((e,n)=>r[n]+=t.share*e/i)}return Zi(r)}function ta(e,t){return qi()?$i([...e].map(e=>{let n=t.get(e);return{shares:Qi(n,e),rail:n?.railTripsPerDay??0}})):null}function na(e,t){return Wi.filter(e=>t[e]>0).map(n=>({mode:n,name:Ki(n),n:e*t[n],colour:Gi[n]}))}var ra=0;Array.isArray;function K(e,t,n,r,i,a){t||={};var o,s,c=t;if(`ref`in c&&typeof e!=`function`)for(s in c={},t)s==`ref`?o=t[s]:c[s]=t[s];var l={type:e,props:c,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ra,__i:-1,__u:0};return(i||a)&&(l.__source=i,l.__self=a),Tt.vnode&&Tt.vnode(l),l}var ia=`M1.75 1.5v1.2M6.75 1.5v1.2M1.75 4.2v1.3a2.5 2.5 0 005 0V4.2`,aa=`M3.58 13.5Q3.22 13.5 3 13.33Q2.77 13.16 2.73 12.88Q2.68 12.6 2.84 12.25L6.86 3.32Q7.06 2.88 7.34 2.69Q7.63 2.5 7.99 2.5Q8.34 2.5 8.63 2.69Q8.91 2.88 9.11 3.32L13.15 12.25Q13.32 12.6 13.27 12.89Q13.23 13.18 13.01 13.34Q12.8 13.5 12.45 13.5Q12.02 13.5 11.78 13.29Q11.55 13.09 11.36 12.66L10.37 10.36L11.2 10.89H4.76L5.58 10.36L4.61 12.66Q4.41 13.1 4.19 13.3Q3.98 13.5 3.58 13.5ZM7.96 4.74 5.83 9.82 5.43 9.33H10.53L10.14 9.82L7.99 4.74Z`,oa={auto:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,stroke:`none`,d:aa})}),minus:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4 8h8`})}),plus:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4 8h8M8 4v8`})}),pencil:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M10.5 3l2.5 2.5L6 12.5H3.5V10z`})}),brush:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M13.5 2.5L7.6 8.4M7.6 8.4c-1.7-.5-3.4.7-3.4 2.6 0 1.1-.6 1.8-1.7 2.2 2.6 1 6 .3 6.3-2.6z`})}),rings:()=>K(`svg`,{class:`rings-icon`,viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`1.2`}),K(`circle`,{cx:`8`,cy:`8`,r:`3.8`}),K(`circle`,{cx:`8`,cy:`8`,r:`6.3`})]}),check:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M3.5 8.5l3 3 6-7`})}),cycle:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M12.8 6.5A5 5 0 004 5M3.2 9.5A5 5 0 0012 11M4 2v3h3M12 14v-3H9`})}),locate:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`3.5`}),K(`path`,{d:`M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3`})]}),follow:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`3.5`}),K(`circle`,{class:`solid`,cx:`8`,cy:`8`,r:`1.4`}),K(`path`,{d:`M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3`})]}),pause:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`stroke2`,d:`M5.5 3.5v9M10.5 3.5v9`})}),play1:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,d:`M5 3.5l7 4.5-7 4.5z`})}),slower:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,d:`M13.5 4L8 8l5.5 4zM8 4L2.5 8 8 12z`})}),play2:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,d:`M2.5 4l5.5 4-5.5 4zM8 4l5.5 4L8 12z`})}),play3:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,d:`M1.5 5l4 3-4 3zM6 5l4 3-4 3zM10.5 5l4 3-4 3z`})}),track:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.5 10.5l8-8M5.5 13.5l8-8M3 9l4 4M6 6l4 4M9 3l4 4`})}),station:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M1.5 8h3.5M11 8h3.5`}),K(`circle`,{cx:`8`,cy:`8`,r:`3`})]}),interchange:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4.5 1.5h3v7h7v3h-7v3h-3v-3h-3v-3h3z`})}),trackDisplay:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M2.5 10.5l8-8M5.5 13.5l8-8M3 9l4 4M6 6l4 4M9 3l4 4`}),K(`path`,{class:`yline`,d:`M8 15l7-7`})]}),stationDisplay:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M4.5 1.5h3v7h7v3h-7v3h-3v-3h-3v-3h3z`}),K(`circle`,{class:`udot`,cx:`6`,cy:`10`,r:`4.6`})]}),bubble:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`circle`,{class:`bubble`,cx:`8`,cy:`8`,r:`5.5`})}),keepPlacing:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M2 12.5l4-6 3 3 5-6.5`}),K(`circle`,{class:`solid`,cx:`6`,cy:`6.5`,r:`1.4`}),K(`circle`,{class:`solid`,cx:`9`,cy:`9.5`,r:`1.4`}),K(`circle`,{class:`solid`,cx:`14`,cy:`3`,r:`1.4`})]}),snapReal:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:ia}),K(`path`,{d:`M1.5 14.5c5 0 10-4 13-12`})]}),snapRoads:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:ia}),K(`path`,{d:`M1.4 12.2L2.4 12.1L3.4 11.9L4.3 11.6L5.3 11.2L6.3 10.6L7.2 9.8L8.2 8.8L9.1 7.8L10 6.5L10.8 5.1L11.6 3.5L12.4 1.7M7.5 15.2L8.9 14.3L10.3 13.2L11.5 12L12.7 10.6L13.8 9L14.9 7.3`}),K(`path`,{d:`M1.5 14.5c5 0 10-4 13-12`,"stroke-width":`1`,"stroke-dasharray":`1.6 1.4`})]}),snapStreets:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:ia}),K(`path`,{d:`M1.5 12L12 1.5M4.5 15L15 4.5`}),K(`path`,{d:`M3 13.5L13.5 3`,"stroke-width":`1`,"stroke-dasharray":`1.6 1.4`})]}),snapBeside:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:ia}),K(`path`,{d:`M1.4 12.9L2.5 12.8L3.6 12.6L4.6 12.3L5.7 11.8L6.7 11.1L7.7 10.3L8.7 9.3L9.6 8.2L10.6 6.9L11.4 5.4L12.2 3.8L13 1.9`}),K(`path`,{d:`M6.5 14.9L7.9 14.2L9.2 13.2L10.4 12.1L11.6 10.8L12.7 9.4L13.8 7.8L14.7 6L15.2 5.1`,"stroke-dasharray":`2 1.6`})]}),terrain:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 13.5L6 6l2.4 3.4L10.6 6.5l3.9 7z`})}),autoLevel:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M1.5 13.5h3M4.5 13.5l3-6h7M12 5l2.5 2.5L12 10`}),K(`path`,{d:`M7.5 10.5v3M11 10.5v3`})]}),autoRamp:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M1.5 12.5h2.5l3-6h2l3 6h2.5`}),K(`circle`,{class:`solid`,cx:`8`,cy:`12.5`,r:`1.6`})]}),tracks1:()=>K(`svg`,{class:`tracks`,viewBox:`0 0 20 20`,children:K(`path`,{d:`M10 3v14`})}),tracks2:()=>K(`svg`,{class:`tracks`,viewBox:`0 0 20 20`,children:K(`path`,{d:`M6 3v14M14 3v14`})}),tracks4:()=>K(`svg`,{class:`tracks`,viewBox:`0 0 20 20`,children:K(`path`,{d:`M4 3v14M8 3v14M12 3v14M16 3v14`})}),undo:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M5.5 4L2.5 7l3 3M3 7h6.5a3.5 3.5 0 010 7H7`})}),anchor:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`3.2`,r:`1.6`}),K(`path`,{d:`M8 4.8v9.7M5.2 7.2h5.6M2.7 9.6c.4 2.9 2.6 4.9 5.3 4.9s4.9-2 5.3-4.9`})]}),redo:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M10.5 4l3 3-3 3M13 7H6.5a3.5 3.5 0 000 7H9`})}),cross:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4.5 4.5l7 7M11.5 4.5l-7 7`})}),eye:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M1.5 8c1.6-2.9 3.8-4.4 6.5-4.4s4.9 1.5 6.5 4.4c-1.6 2.9-3.8 4.4-6.5 4.4S3.1 10.9 1.5 8z`}),K(`circle`,{cx:`8`,cy:`8`,r:`2`})]}),question:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M5.3 5.6a2.7 2.7 0 1 1 3.8 2.5c-.7.3-1.1.9-1.1 1.6v.8`}),K(`circle`,{class:`solid`,cx:`8`,cy:`13`,r:`.7`})]}),help:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`6.2`}),K(`path`,{d:`M6.2 6.3a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.6`}),K(`circle`,{class:`solid`,cx:`8`,cy:`11.6`,r:`.5`})]}),discord:()=>K(`svg`,{viewBox:`0 0 24 24`,children:K(`path`,{class:`solid`,style:`stroke:none`,d:`M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z`})}),kofi:()=>K(`svg`,{viewBox:`0 0 24 24`,children:[K(`path`,{class:`solid`,style:`stroke:none`,d:`M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z`}),K(`path`,{style:`fill:#ff5e5b;stroke:none`,d:`M12.819 12.459c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z`})]}),uturn:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M5 13.5V7a3.25 3.25 0 0 1 6.5 0v4.5M8.8 9.2l2.7 2.8 2.7-2.8`})}),boardBoth:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`circle`,{cx:`8`,cy:`8`,r:`5.5`})}),boardOnly:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`11`,y:`2.5`,width:`3.5`,height:`11`,rx:`1`}),K(`path`,{d:`M1.5 8H9M6.5 5.5L9 8l-2.5 2.5`})]}),alightOnly:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`11`,y:`2.5`,width:`3.5`,height:`11`,rx:`1`}),K(`path`,{d:`M9 8H1.5M4 5.5L1.5 8 4 10.5`})]}),allStops:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M8 1.5v13M5 3.5h6M5 6.5h6M5 9.5h6M5 12.5h6`})}),related:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M6 1.5v13M10 1.5v8c0 1.8 1 3 3 5`}),K(`rect`,{x:`3.5`,y:`4.5`,width:`9`,height:`3.5`,rx:`1.75`})]}),rename:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 4.5h6M1.5 8h6M1.5 11.5h6M12 2.5v11M10.5 2.5h3M10.5 13.5h3`})}),arrowUp:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M8 14V2.5M3.5 7 8 2.5 12.5 7`})}),doubleUp:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 3h13M1.5 6h13M8 9v6M5 12h6`})}),addPoint:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M1.5 13.5l4.5-3M10 10.5l4.5 3M12 1.5v5M9.5 4h5`}),K(`rect`,{x:`6`,y:`8.5`,width:`4`,height:`4`})]}),bus:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`3`,y:`2.5`,width:`10`,height:`9`,rx:`2`}),K(`path`,{d:`M3 7h10M5.5 11.5v2M10.5 11.5v2`}),K(`circle`,{class:`solid`,cx:`5.5`,cy:`9.3`,r:`.7`}),K(`circle`,{class:`solid`,cx:`10.5`,cy:`9.3`,r:`.7`})]}),brt:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.5 1.5v13M13.5 1.5v13M8 2v2M8 7v2M8 12v2`})}),tram:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`3.5`,y:`4`,width:`9`,height:`7.5`,rx:`1.8`}),K(`path`,{d:`M3.5 8h9M5.5 4V1.5h5V4M5 13.8l1.2-2.3M11 13.8l-1.2-2.3`}),K(`circle`,{class:`solid`,cx:`5.8`,cy:`9.8`,r:`.7`}),K(`circle`,{class:`solid`,cx:`10.2`,cy:`9.8`,r:`.7`})]}),ferry:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M2.5 8.5h11l-1.8 3H4.3zM5 8.5V6h5.5l1 2.5M7 6V4`}),K(`path`,{d:`M1.5 13.8c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0`})]}),waves:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 4.8c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0M1.5 8.5c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0M1.5 12.2c1.1-.7 2.1-.7 3.2 0s2.1.7 3.3 0 2.1-.7 3.2 0 2.1.7 3.3 0`})}),bin:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.5 4.5h11M6.5 4.5V2.5h3v2M4 4.5l.8 9h6.4l.8-9M6.8 7v4M9.2 7v4`})}),marquee:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.5 5.5v-3h3M10.5 2.5h3v3M13.5 10.5v3h-3M5.5 13.5h-3v-3M7 7l5 2-2 .8L9 12z`})}),switchOff:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`5.5`}),K(`path`,{d:`M4.1 11.9l7.8-7.8`})]}),switchOn:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`5.5`}),K(`path`,{d:`M5.3 8.3l1.8 1.8 3.6-3.9`})]}),wrench:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M13.2 4.6a3.3 3.3 0 01-4.4 3.6L3.9 13.1a1.3 1.3 0 01-1.9-1.9l4.9-4.9a3.3 3.3 0 013.6-4.4L8.6 4l.5 2.4 2.4.5z`})}),route:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M2.5 12.5l4-6 4 3 3-6.5`}),K(`circle`,{class:`solid`,cx:`2.5`,cy:`12.5`,r:`1.5`}),K(`circle`,{class:`solid`,cx:`6.5`,cy:`6.5`,r:`1.5`}),K(`circle`,{class:`solid`,cx:`10.5`,cy:`9.5`,r:`1.5`}),K(`circle`,{class:`solid`,cx:`13.5`,cy:`3`,r:`1.5`})]}),building:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 5.5h13l-2-3h-9zM4 5.5v5M12 5.5v5M1.5 10.5h13M1.5 13.5h13`})}),money:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`1.5`,y:`3.5`,width:`10`,height:`6.5`}),K(`circle`,{cx:`6.5`,cy:`6.75`,r:`1.4`}),K(`circle`,{class:`bg`,cx:`11.5`,cy:`11.5`,r:`3`}),K(`circle`,{cx:`11.5`,cy:`11.5`,r:`1.2`})]}),save:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.5 2.5h9l2 2v9h-11zM5 2.5v3.5h5v-3.5M4.5 13.5v-4.5h7v4.5`})}),copy:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`5.5`,y:`5.5`,width:`8`,height:`8`,rx:`1`}),K(`path`,{d:`M10.5 3.5v-1h-8v8h1`})]}),marey:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 2.5h13M1.5 13.5h13M2 13.5l4-11M7.5 2.5l4 11M10 13.5l4-11`})}),timetable:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`2.5`,y:`2.5`,width:`11`,height:`11`,rx:`1`}),K(`path`,{d:`M2.5 5.5h11M5.5 5.5v8M7.5 8h4M7.5 10.5h3`})]}),calendar:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`2.5`,y:`3.5`,width:`11`,height:`11.5`,rx:`1`}),K(`path`,{d:`M2.5 6.5h11M5.5 2v3M10.5 2v3`})]}),goOut:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.5 8h10M9 4.5L12.5 8 9 11.5`})}),chevron:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M6 3.5L10.5 8 6 12.5`})}),leaveGroup:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`1.5`,y:`2.5`,width:`8`,height:`11`,rx:`1`}),K(`path`,{d:`M6.5 8h8M12 5.5L14.5 8 12 10.5`})]}),goBack:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M13.5 8h-10M7 4.5L3.5 8 7 11.5`})}),pin:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M8 14.5s4.5-4.2 4.5-7.6a4.5 4.5 0 00-9 0c0 3.4 4.5 7.6 4.5 7.6z`}),K(`circle`,{cx:`8`,cy:`6.8`,r:`1.6`})]}),globe:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`6`}),K(`path`,{d:`M2 8h12M8 2c-2.2 2-2.2 10 0 12M8 2c2.2 2 2.2 10 0 12`})]}),walk:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`9.5`,cy:`2.8`,r:`1.3`}),K(`path`,{d:`M9.5 5.2l-1.8 3 2.3 2.3v3.7M7.7 8.2L5.3 9.4M9.6 6.4l2.4 1.8M7.7 8.2L6.2 14`})]}),ride:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M1.8 11.2V8.4l1.6-3.4h9.2l1.6 3.4v2.8zM1.8 8.4h12.4`}),K(`circle`,{cx:`4.8`,cy:`11.4`,r:`1.3`,class:`bg`}),K(`circle`,{cx:`11.2`,cy:`11.4`,r:`1.3`,class:`bg`})]}),train:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{x:`3`,y:`2.5`,width:`10`,height:`8.5`,rx:`2`}),K(`path`,{d:`M3 6.8h10M5.8 11l-1.9 2.9M10.2 11l1.9 2.9`}),K(`circle`,{class:`solid`,cx:`5.6`,cy:`9`,r:`.7`}),K(`circle`,{class:`solid`,cx:`10.4`,cy:`9`,r:`.7`})]}),highSpeed:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 11.5h9.6c2 0 3.4-.7 3.4-1.7 0-1.4-3-3.9-6.8-4.3H1.5zM9 5.8l1.6 2.6h2.8M1.5 13.8h13`})}),plane:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:hi})}),alert:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`8`,r:`6.2`}),K(`path`,{d:`M8 4.6v3.2`}),K(`circle`,{class:`solid`,stroke:`none`,cx:`8`,cy:`11.1`,r:`1.4`})]}),cities:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 14h13M3 14V7h3.5v7M6.5 14V2.5h3.5V14M10 14V8h3v6`})}),home:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2 7.5L8 2l6 5.5M3.8 6v7.8h3V9.8h2.4v4h3V6`})}),homeOn:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,d:`M8 2L2 7.5h1.8v6.3h3V9.8h2.4v4h3V7.5H14z`})}),star:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{class:`solid`,d:`M8 1.5l1.9 4.1 4.5.5-3.4 3 1 4.4L8 11.3l-4 2.2 1-4.4-3.4-3 4.5-.5z`})}),cloud:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4.6 12.5h7a2.6 2.6 0 00.3-5.2 3.9 3.9 0 00-7.5-.9 2.9 2.9 0 00.2 6.1z`})}),cloudOff:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4.6 12.5h7a2.6 2.6 0 00.3-5.2 3.9 3.9 0 00-7.5-.9 2.9 2.9 0 00.2 6.1zM2.5 2.5l11 11`})}),download:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M8 2.5v7.5M4.8 7l3.2 3.2L11.2 7M2.5 11v2.5h11V11`})}),history:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M2.9 9.2a5.2 5.2 0 1 0 .9-4.6M3 2.5v2.6h2.6M8 5.2V8.3l2.1 1.4`})}),person:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`8`,cy:`5.2`,r:`2.9`}),K(`path`,{d:`M2.4 14.2c.6-3 2.9-4.6 5.6-4.6s5 1.6 5.6 4.6`})]}),medal:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M4.5 1.5h7L9.3 6.6M4.5 1.5l2.2 5.1`}),K(`circle`,{cx:`8`,cy:`10.3`,r:`3.9`}),K(`circle`,{class:`solid`,cx:`8`,cy:`10.3`,r:`1.4`})]}),trophy:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4.5 2.5h7v3.5a3.5 3.5 0 01-7 0zM4.5 3.8H2.5c0 2 .8 3.2 2.3 3.4M11.5 3.8h2c0 2-.8 3.2-2.3 3.4M8 9.5v2.5M5.5 13.5h5`})}),people:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`circle`,{cx:`5.8`,cy:`5.4`,r:`2.4`}),K(`path`,{d:`M1.5 13.5c.4-2.7 2.1-4.2 4.3-4.2s3.9 1.5 4.3 4.2M10.4 3.2a2.4 2.4 0 010 4.4M11.9 9.6c1.4.6 2.3 1.9 2.6 3.9`})]}),share:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M8 10V2.5M4.8 5.5L8 2.3l3.2 3.2M3 8.5v5h10v-5`})}),link:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M6.4 9.6l3.2-3.2M7.2 4.8l1.3-1.3a2.6 2.6 0 013.7 3.7l-1.3 1.3M8.8 11.2l-1.3 1.3a2.6 2.6 0 01-3.7-3.7l1.3-1.3`})}),heart:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M8 13.8S2 10.3 2 6.1A3.1 3.1 0 018 5a3.1 3.1 0 016 1.1c0 4.2-6 7.7-6 7.7z`})}),bookmark:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M4 2.5h8v11L8 10.5l-4 3z`})}),flag:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M3.5 14.5v-12M3.5 2.5h9l-2 3 2 3h-9`})}),foldMap:()=>K(`svg`,{viewBox:`0 0 16 16`,children:K(`path`,{d:`M1.5 4l4-1.5 5 2 4-1.5v9.5l-4 1.5-5-2-4 1.5zM5.5 2.5V12M10.5 4.5V14`})}),bug:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M6.2 4.8a1.8 1.8 0 013.6 0`}),K(`rect`,{x:`4.8`,y:`4.8`,width:`6.4`,height:`9.2`,rx:`3.2`}),K(`path`,{d:`M8 7.6V14M4.8 8.6H2.4M4.8 11.6l-2.2 1.5M11.2 8.6h2.4M11.2 11.6l2.2 1.5M5.3 6.3L3.4 4.6M10.7 6.3l1.9-1.7`})]}),computer:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`rect`,{class:`screen`,x:`1.5`,y:`2.5`,width:`13`,height:`8.5`,rx:`1`}),K(`path`,{d:`M8 11v2.5M5 13.8h6`})]}),gear:()=>K(`svg`,{viewBox:`0 0 16 16`,children:[K(`path`,{d:`M6.83 3.14L7.09 1.26L8.91 1.26L9.17 3.14L10.61 3.74L12.13 2.59L13.41 3.87L12.26 5.39L12.86 6.83L14.74 7.09L14.74 8.91L12.86 9.17L12.26 10.61L13.41 12.13L12.13 13.41L10.61 12.26L9.17 12.86L8.91 14.74L7.09 14.74L6.83 12.86L5.39 12.26L3.87 13.41L2.59 12.13L3.74 10.61L3.14 9.17L1.26 8.91L1.26 7.09L3.14 6.83L3.74 5.39L2.59 3.87L3.87 2.59L5.39 3.74z`}),K(`circle`,{cx:`8`,cy:`8`,r:`2.2`})]})};function sa({line:t,size:n=``,plain:r,pick:i,gone:a,tip:o,rim:s}){let c=r?void 0:e=>{e.stopPropagation(),i?i(t):oe.value={kind:`line`,line:t.id}};bi.value;let l=pa(),u=Ae(t.id),d=Mi(t.letter,n,l.value),f=d&&Vi(d,u),p=pi(t.id);return K(`span`,{ref:l.ref,class:`chip `+n+(r?``:` link`)+(u===`square`?` square`:``)+(u===`outline`?` ring`:``)+(p?` idle`:``)+(s?` rimmed`:``),style:{"--c":t.colour,"--ct":e(t.colour),visibility:a?`hidden`:void 0},"data-tip":r?void 0:(o??t.name)+(p?`
`+mi:``),onClick:c,children:f?K(`svg`,{style:{width:f.w+`px`,height:f.h+`px`},children:[s&&K(fa,{b:f}),K(da,{b:f}),K(`text`,{x:f.x,y:f.y,children:t.letter})]}):K(`span`,{children:t.letter})})}function ca({shape:e}){bi.value;let t=Vi({w:12,h:12,x:0,y:0,top:0,iw:0,ih:0,stem:Ai(`I`,``)?.stem??2},e);return K(`svg`,{class:`shape-icon`,style:{width:t.w+`px`,height:t.h+`px`},"aria-hidden":`true`,children:K(da,{b:t})})}var la={circle:`widgets.circle`,square:`widgets.square`,diamond:`widgets.diamond`,outline:`widgets.outline`};function ua({value:e,onChange:t,colour:n,tips:r}){return K(`div`,{class:`group shapes`,role:`radiogroup`,style:n?{"--c":n}:void 0,children:Ue.map(n=>K(`button`,{class:`btn`+(n===e?` on`:``),role:`radio`,"aria-checked":n===e,"aria-label":L(la[n]),"data-tip":r?.(n),onClick:()=>t(n),children:K(ca,{shape:n})}))})}var da=({b:e})=>e.path?K(`path`,{d:e.path.d,"stroke-width":e.path.stroke}):e.rect.ring===void 0?K(`rect`,{y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r}):K(`rect`,{class:`ring`,x:e.rect.x,y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r,"stroke-width":e.rect.ring}),fa=({b:e})=>e.path?K(`path`,{class:`bullet-rim`,d:e.path.d,"stroke-width":e.path.stroke+2}):e.rect.ring===void 0?K(`rect`,{class:`bullet-rim`,y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r,"stroke-width":2}):K(`rect`,{class:`bullet-rim`,x:e.rect.x,y:e.rect.y,width:e.rect.w,height:e.rect.h,rx:e.rect.r,"stroke-width":e.rect.ring+2});function pa(){let e=ft(null),t=kn.value,[n,r]=_n(null),i=n??t;return fn(()=>{let t=e.current?.currentCSSZoom;typeof t==`number`&&t>0&&Math.abs(t-i)>1e-6&&r(t)}),{ref:e,value:i}}function ma(e){e&&(e.classList.remove(`shake`),e.offsetWidth,e.classList.add(`shake`))}function ha(e){let t=t=>e.jump?t.ctrlKey?20:t.shiftKey?5:1:1,n=e.jump&&!Vn()?e.jumpUnit?L(`widgets.jumpUnit`,{unit:e.jumpUnit}):L(`widgets.jump`):void 0,i=e=>e&&n?e+`
`+n:e??n,a=ft(null),o=()=>ma(a.current),s=t=>{let n=e.onStep(t);n===!1?(r(),o()):n instanceof Promise&&n.then(e=>{e===!1&&o()})};return K(`span`,{ref:a,class:`stepper`+(e.wide?` wide`:``),onAnimationEnd:()=>a.current?.classList.remove(`shake`),children:[K(`button`,{class:`btn`,"aria-label":L(`widgets.less`,{label:e.label}),"data-tip":i(e.tipDown),onClick:e=>s(-t(e)),children:K(oa.minus,{})}),e.type?K(ga,{label:e.label,type:{...e.type,set:t=>{e.type.set(t)===!1&&(r(),o())}},children:e.value}):K(`span`,{class:`v`,"data-tip":e.tipValue,children:e.value}),K(`button`,{class:`btn`,"aria-label":L(`widgets.more`,{label:e.label}),"data-tip":i(e.tipUp),onClick:e=>s(t(e)),children:K(oa.plus,{})})]})}function ga(e){let[t,n]=_n(null),r=ft(!1),i=ft(!1),a=e=>{e&&i.current&&(i.current=!1,e.focus(),e.select())},o=()=>{if(r.current)return;r.current=!0;let i=parseFloat((t??``).replace(/[^0-9.\-]/g,``));n(null),Number.isFinite(i)&&e.type.set(i)};return t===null?K(`button`,{class:`v typed`,"data-tip":e.type.tip,"aria-label":L(`widgets.type`,{label:e.label}),onClick:()=>{r.current=!1,i.current=!0,n(e.type.text)},children:e.children}):K(`input`,{class:`v typing`,ref:a,value:t,inputMode:`decimal`,"aria-label":e.label,onInput:e=>n(e.currentTarget.value),onBlur:o,onKeyDown:e=>{e.key===`Enter`&&o(),e.key===`Escape`&&(r.current=!0,n(null))}})}function _a(e){return K(`div`,{class:`group`,children:e.options.map(([t,n])=>K(`button`,{class:`btn`+(t===e.value?` on`:``),"data-tip":e.tips?.(t),disabled:e.disabled?.(t),onClick:()=>e.onChange(t),children:n}))})}function va(e){return K(`label`,{class:`check`,"data-tip":e.tip,children:[K(`input`,{type:`checkbox`,checked:e.checked,"aria-label":e.label,onChange:t=>e.onChange(t.target.checked)}),e.children]})}function ya({sort:e,cols:t,hand:n}){let r=e.value,i=t=>{let i=!n&&r.key===t.key,a=K(`i`,{class:`sort-arrow`+(i?r.dir>0?` up`:` down`:``)});return K(`button`,{class:`sort-btn`+(t.beside?t.cls?` `+t.cls:``:t.cls?` val `+t.cls:` grow`)+(i?` on`:``),"data-tip":t.tip,onClick:()=>{n?.(),e.value=i?{key:t.key,dir:r.dir===1?-1:1}:{key:t.key,dir:t.first}},children:[t.cls&&!t.left&&!t.beside&&a,t.label,(!t.cls||t.left||t.beside)&&a]},t.key)},a=t.filter(e=>e.beside);return a.length?K(`div`,{class:`sort-head`,children:[K(`span`,{class:`sort-lead`,children:[i(t[0]),a.map(i)]}),t.slice(1).filter(e=>!e.beside).map(i)]}):K(`div`,{class:`sort-head`,children:t.map(i)})}function ba({tip:e,children:t}){return K(`li`,{class:`alert bad`,children:[K(`span`,{class:`alert-mark`,children:K(oa.alert,{})}),K(`div`,{class:`alert-body`,"data-tip":e,children:t})]})}function xa(e){return K(`li`,{class:e.bold?`b`:``,children:[K(`span`,{class:`grow`,children:e.label}),e.children!==void 0&&K(`span`,{class:`val`,children:e.children})]})}function Sa({children:e}){return K(`div`,{class:`inspector-actions`,children:e})}function Ca({parts:e,kind:t,label:n}){return K(`div`,{class:`bar `+t,role:`img`,"aria-label":n,children:e.map(e=>e.share>0&&K(`i`,{class:`seg`+(e.cls?` `+e.cls:``),style:{width:100*e.share+`%`,...e.colour&&{background:e.colour}},"data-tip":e.tip}))})}function wa({train:e,shares:t}){return t?K(Jt,{children:na(e,t).map(e=>K(`i`,{class:`seg`,style:{width:e.n+`%`,background:e.colour}},e.mode))}):K(`i`,{class:`seg seg-train`,style:{width:e+`%`}})}function Ta({value:t,onPick:n,tip:r,levels:i=a}){return K(`div`,{class:`group levels`,children:i.map(i=>K(`button`,{class:`btn lv`+(i===t?` on`:``),style:{"--lc":le[i],"--lk":e(le[i])},"data-tip":r(i),"aria-label":L(`widgets.level`,{level:Ft(i)}),"aria-pressed":i===t,onClick:()=>n(i),children:Ft(i)}))})}function Ea({hidden:t,onToggle:n}){return K(`div`,{class:`group levels level-toggles`,children:a.map(r=>K(`button`,{class:`btn lv`+(t.has(r)?``:` on`),style:{"--lc":le[r],"--lk":e(le[r])},"aria-label":L(`widgets.level`,{level:Ft(r)}),"aria-pressed":!t.has(r),onClick:()=>n(r),children:Ft(r)}))})}function Da({value:e,onPick:t,single:n=!0,children:r}){return K(`div`,{class:`group tb-count`,role:`group`,"aria-label":L(`toolBar.trackCount`),children:[n&&K(`button`,{class:`btn icon`+(e===1?` on`:``),"aria-label":L(`toolBar.singleTrack`),"aria-pressed":e===1,"data-tip":L(`toolBar.singleTrack`),onClick:()=>t(1),children:K(oa.tracks1,{})}),K(`button`,{class:`btn icon`+(e===2?` on`:``),"aria-label":L(`toolBar.doubleTrack`),"aria-pressed":e===2,"data-tip":L(`toolBar.doubleTrack`),onClick:()=>t(2),children:K(oa.tracks2,{})}),r]})}function Oa({on:e,off:t,onText:n}){return K(`span`,{class:`swap-label`,children:[K(`span`,{class:e?`off`:void 0,"aria-hidden":e,children:t}),K(`span`,{class:e?void 0:`off`,"aria-hidden":!e,children:n})]})}function ka({built:e}){return e?null:K(`p`,{class:`blueprint-tag`,children:L(`widgets.blueprint`)})}var Aa=!1;typeof window<`u`&&(window.addEventListener(`blur`,()=>Aa=!0),document.addEventListener(`pointermove`,()=>Aa=!1,{capture:!0,passive:!0}));var ja=()=>Aa,Ma=e=>e.key===`Shift`||e.key===`Control`||e.key===`Alt`||e.key===`Meta`||e.key===`OS`||e.key===`AltGraph`,Na=/\u0002([^|\u0003]*)\|([^|\u0003]*)(?:\|([^\u0003]*))?\u0003/,Pa=(e,t,n)=>`\u0002${e.replace(/[\u0002\u0003|]/g,``)}|${t}${n?`|`+n:``}\u0003`,Fa=/^\u0004(\|?)([^\u0005]*)\u0005$/,Ia=(e,t=!1,n)=>`\u0004${t?`|`:``}${e.map((e,t)=>n?`${e}@${n[t]>0?n[t]:0}`:e).join(`;`)}\u0005`,La=/^\u000e([^\u001f]*)\u001f([^\u001f]*)$/,Ra=(e,t)=>`\u000e${e.replace(/[\u0000-\u001f]/g,` `)}\u001f${t.replace(/[\u0000-\u001f]/g,` `)}`,za=6,Ba=9,Va=328;function Ha(e,t,n){let r=()=>{let t=document.createElement(`b`);e.append(t)},i=t.length*15+Ba;n&&i<=Va&&(e.style.width=`${i}px`),n&&r(),t.forEach((t,i)=>{let[a,o]=t.split(`@`);if(o!==void 0&&!(Number(o)>0))return;n&&i>0&&r();let s=document.createElement(`i`);s.style.background=a,o!==void 0&&(s.style.flex=`${o} 1 0`),e.append(s)}),n&&r()}var Ua=/^\u0006([^\u0006]*)\u0006$/,Wa=e=>`\u0006${e.map(e=>e.join(``)).join(``)}\u0006`,Ga=/^\u0007(\d+)/,Ka=(e,t)=>`\u0007${e}${t}`;function qa(e,t){let n=t.split(``).map(e=>e.split(``).map(e=>{let t=Ga.exec(e);return t?{span:Number(t[1]),text:e.slice(t[0].length)}:{span:1,text:e}})),r=Math.max(1,...n.map(e=>e.reduce((e,t)=>e+t.span,0)));e.style.gridTemplateColumns=`repeat(${r}, auto)`;for(let t of n)if(t.length===1&&!t[0].text){let t=document.createElement(`div`);t.className=`tip-gap`,t.style.gridColumn=`span ${r}`,e.append(t)}else t.forEach((t,n)=>{let r=Za(t.text);n>0&&r.classList.add(`num`),t.span>1&&(r.style.gridColumn=`span ${t.span}`),e.append(r)})}var Ja=`\b`,Ya=e=>Ja+e,Xa=e=>`
`+Ya(e);function Za(t){let n=document.createElement(`div`);if(t.startsWith(Ja))return n.className=`tip-muted`,to(n,t.slice(1)),n;let r=Fa.exec(t);if(r)return n.className=r[1]?`tip-strip stops`:`tip-strip`,Ha(n,r[2].split(`;`),!!r[1]),n;let i=La.exec(t);if(i){n.className=`tip-ends`;for(let e of[i[1],i[2]]){let t=document.createElement(`span`);t.textContent=e,n.append(t)}return n}let a=Ua.exec(t);if(a)return n.className=`tip-grid`,qa(n,a[1]),n;let o=t.split(Na);for(let t=0;t<o.length&&(o[t]&&ro(n,o[t]),!(t+3>=o.length));t+=4){let r=document.createElement(o[t+1]?`span`:`i`);if(o[t+1]){r.className=`chip sm tip-chip`,r.style.setProperty(`--c`,o[t+2]),r.style.setProperty(`--ct`,e(o[t+2]));let n=o[t+3];_(n)?r.append(Ui(o[t+1],`sm`,n)):r.textContent=o[t+1]}else r.className=`tip-swatch`,r.style.background=o[t+2];n.append(r)}return n}function Qa(e){for(let t of e.querySelectorAll(`.tip-strip.stops`)){let e=t.querySelectorAll(`i`).length,n=t.querySelectorAll(`b`);if(n.length<3)continue;let r=n[0].getBoundingClientRect().width+2;if(!((t.clientWidth-n.length*r)/e>=za)){t.classList.add(`dense`);for(let e=1;e<n.length-1;e++)n[e].remove()}}}var $a=/\(((?:Ctrl\+|Shift\+)?(?:[A-Z0-9/,.]|Esc|Enter|Delete|Space|Backspace|Caps Lock|Tab)|\/ or Ctrl\+F)\)/,eo=/(−\$[\d.,]+[KMBT]?)/;function to(e,t){let n=t.split(eo);for(let t=0;t<n.length;t++){if(!n[t])continue;if(t%2==0){e.append(n[t]);continue}let r=document.createElement(`span`);r.className=`money-neg`,r.textContent=n[t],e.append(r)}}var no=RegExp(` ?`+$a.source,`g`);function ro(e,t){Vn()&&(t=t.replace(no,``));let n=t.split($a);for(let t=0;t<n.length;t++){if(t%2==0){to(e,n[t]);continue}let r=document.createElement(`span`),i=document.createElement(`span`);r.className=`tip-hint`,i.className=`tip-key`,i.textContent=n[t],r.append(`(`,i,`)`),e.append(r)}}function io(){let e=document.createElement(`div`);e.className=`tool-tag ui-tag`,e.setAttribute(`role`,`tooltip`),e.setAttribute(`popover`,`manual`),e.style.display=`none`,document.body.appendChild(e);let t=null,n=``,r=0,i=0,a=()=>{t&&u.disconnect(),t=null,n=``,e.style.display=`none`},o=!1,s=()=>{let t=e.offsetWidth,n=e.offsetHeight;if(o){let a=Math.max(4,Math.min(innerWidth-4-t,r-t/2)),o=Math.max(4,i-36-n);e.style.transform=`translate(${Math.round(a)}px, ${Math.round(o)}px)`;return}let a=r+14,s=i+16;a+t>innerWidth-4&&(a=Math.max(4,r-10-t)),s+n>innerHeight-4&&(s=Math.max(4,i-10-n)),e.style.transform=`translate(${Math.round(a)}px, ${Math.round(s)}px)`},c=()=>{let r=t?.getAttribute(`data-tip`)??``;if(!r||!t?.isConnected)return a();let i=r!==n;i&&(n=r,e.replaceChildren(...r.split(`
`).filter(e=>!(e.startsWith(Ja)&&Vn())).map(Za))),e.style.display===`none`&&l(),e.style.display=``,i&&Qa(e),s()},l=()=>{typeof e.showPopover==`function`&&(e.matches(`:popover-open`)&&e.hidePopover(),e.showPopover())},u=new MutationObserver(c),d=e=>{if(e.pointerType===`touch`)return;if(o=!1,e.buttons)return a();r=e.clientX,i=e.clientY;let s=(e.target instanceof Element?e.target:null)?.closest(`[data-tip], [title]`)??null;if(s?.hasAttribute(`title`)){let e=s.getAttribute(`title`);s.removeAttribute(`title`),e&&!s.hasAttribute(`data-tip`)&&s.setAttribute(`data-tip`,e)}if(s!==t){if(t&&u.disconnect(),t=s,n=``,!t)return a();u.observe(t,{attributes:!0,attributeFilter:[`data-tip`]})}c()};document.addEventListener(`pointermove`,d,{capture:!0,passive:!0}),document.addEventListener(`pointerover`,d,{capture:!0,passive:!0}),document.addEventListener(`pointerdown`,a,!0),document.addEventListener(`wheel`,a,{capture:!0,passive:!0}),document.addEventListener(`scroll`,a,!0),document.addEventListener(`keydown`,e=>Ma(e)||a(),!0),document.documentElement.addEventListener(`pointerleave`,e=>e.pointerType===`touch`||ja()||a());let f=null,p=!1,m=0,h=()=>{f&&clearTimeout(f.timer),f=null};document.addEventListener(`pointerdown`,e=>{if(h(),clearTimeout(m),p=!1,e.pointerType!==`touch`)return;let a=e.target instanceof Element?e.target.closest(`[data-tip]`):null;if(!a)return;let s=e.clientX,l=e.clientY;f={x:s,y:l,found:a,timer:setTimeout(()=>{f=null,a.isConnected&&(t=a,n=``,r=s,i=l,o=!0,p=!0,c())},500)}},!0),document.addEventListener(`pointermove`,e=>{f&&e.pointerType===`touch`&&Math.hypot(e.clientX-f.x,e.clientY-f.y)>10&&h()},{capture:!0,passive:!0});let g=e=>{h(),e?.isConnected?(t=e,n=``,o=!0,c(),m=setTimeout(a,3e3)):o&&t&&(m=setTimeout(a,1500))};document.addEventListener(`pointerup`,e=>{let t=e.pointerType===`touch`?f:null;t&&(r=t.x,i=t.y),g(t?.found)},!0),document.addEventListener(`pointercancel`,()=>g(),!0),document.addEventListener(`click`,e=>{p&&(p=!1,e.preventDefault(),e.stopPropagation())},!0),document.addEventListener(`contextmenu`,e=>{p&&e.preventDefault()},!0)}function ao(e,t,n,r,i,a,o){let s=[e,``,t,n,``];return Object.defineProperty(s,1,{get:()=>L(r),enumerable:!0}),Object.defineProperty(s,4,{get:()=>L(a&&Vn()?a:i)+(o?Xa(L(o)):``),enumerable:!0}),s}var oo=[ao(`track`,oa.track,`1`,`toolKeys.track`,`toolKeys.trackTip`),ao(`station`,oa.station,`2`,`toolKeys.station`,`toolKeys.stationTip`),ao(`delete`,oa.bin,`3`,`toolKeys.delete`,`toolKeys.deleteTip`,void 0,`common.shiftSkip`),ao(`blueprint`,oa.marquee,`4`,`toolKeys.select`,`toolKeys.selectTip`,`toolKeys.selectTipTouch`)],so=Object.fromEntries(oo.map(([e,,,t])=>[t,e])),co={n:`newLine`,s:`editStops`,c:`construct`,g:`addPassed`},lo={b:`build`,l:`lines`,a:`stations`,f:`money`,y:`cities`},uo=e=>Object.keys(lo).find(t=>lo[t]===e)?.toUpperCase(),fo=e=>/^Digit[1-7]$/.test(e)?a[Number(e[5])-1]:null,po=e=>`Shift+${a.indexOf(e)+1}`;function mo(e){Te(()=>{let t=In.peek();ci.tools?.exit(),t!==e&&e!==`select`&&(In.value=e,E(e)&&On())})}var ho=()=>({lines:new Map,hideEdges:new Set,edges:new Map,hideStations:new Set,stations:[],colours:new Map,track:[],lineStrokes:[],hideLines:new Set,rawStations:[]}),go=e=>!e.lines.size&&!e.hideEdges.size&&!e.edges.size&&!e.hideStations.size&&!e.stations.length&&!e.colours.size&&!e.track.length&&!e.lineStrokes.length&&!e.hideLines.size&&!e.rawStations.length;function _o(e,t){let n=e.lines,r=e.track,i=[],a=new Map;for(let e=0;e<n.count;e++){let r=n.colour[e];if(!t.get(r)?.edges?.has(n.edge[e]))continue;i.push(e);let o=a.get(r);o||a.set(r,o=new Set),o.add(n.edge[e])}let o=new Map;for(let[e,n]of t)if(n.edges)for(let t of n.edges){if(a.get(e)?.has(t))continue;let n=o.get(t);n?n.push(e):o.set(t,[e])}let s=[];if(o.size)for(let e=0;e<r.count;e++)for(let t of o.get(r.edge[e])??[])s.push(e,t);let c=i.length+s.length/2,l=new Uint8Array(2*c).fill(255),u=new Int16Array(6*c),d={seg:new Float32Array(4*c),colour:new Uint32Array(c),edge:new Uint32Array(c),level:new Float32Array(c),flags:new Float32Array(c),dist:new Float32Array(c),lane:l,band:u,count:c},f=0;for(let e of i)d.seg.set(n.seg.subarray(4*e,4*e+4),4*f),d.colour[f]=n.colour[e],d.edge[f]=n.edge[e],d.level[f]=n.level[e],d.flags[f]=n.flags[e],n.lane&&l.set(n.lane.subarray(2*e,2*e+2),2*f),n.band&&u.set(n.band.subarray(6*e,6*(e+1)),6*f),f++;for(let e=0;e<s.length;e+=2){let n=s[e],i=s[e+1],a=t.get(i).look,o=r.flags[n],c=!!(o&1);d.seg.set(r.seg.subarray(4*n,4*n+4),4*f),d.colour[f]=i,d.edge[f]=r.edge[n],d.level[f]=r.level[n],d.flags[f]=(a.running&&!c?0:2|(c?1|o&64:0))|(a.fast?o&256:0)|(a.tram?o&Hn:0)|o&Ne,r.lane&&l.set(r.lane.subarray(2*n,2*n+2),2*f),f++}return d}function vo(e,t){let n=e.lines,r=new Set;for(let e=0;e<n.count;e++)n.colour[e]===t&&r.add(n.edge[e]);return r}function yo(e,t,n,r){let i=e.lines,a=n===0?0:r-2;if(!i.stretch||r<3||n!==0&&n!==r-1)return null;let o=new Set,s=new Set;for(let e=0;e<i.count;e++)i.colour[e]===t&&(i.stretch[e]===a?s:o).add(i.edge[e]);return s.size?o:null}function bo(e,t,n,r){let i=e.lines;if(!i.stretch)return null;let a=new Set,o=!1;for(let e=0;e<i.count;e++){if(i.colour[e]!==t)continue;let s=i.stretch[e];s>=n&&s<r?a.add(i.edge[e]):o=!0}return o&&a.size?a:null}var xo=(e,t)=>(e+4)*32*256+(t+4)*32;function So(e,t,n,r,i,a){let o=e.flags[t];if(n.built&&(o&=~(65|(r?2:0))),n.off===!0&&o&1&&(o|=64),n.off===!1&&(o&=-65),n.kind!==void 0&&(o&=~(256|Hn|ce),n.kind===1&&!r&&(o|=256),n.kind>=2&&(o|=Hn|(n.kind===4&&!r?ce:0))),e.flags[t]=o,n.level){let[r,o]=n.level,s=a?i/a:0,c=a?(i+1)/a:1;e.level[t]=xo(Math.round(r+(o-r)*s),Math.round(r+(o-r)*c))}n.tracks&&(e.lane[2*t]=e.lane[2*t+1]=n.tracks===2?255:0)}function Co(e,t){let n=new Map;for(let[e,r]of t)r.oneWay!==void 0&&n.set(e,r.oneWay);if(!n.size)return null;let r=e.track,i=new Map;for(let e=0;e<r.count;e++)n.has(r.edge[e])&&(i.get(r.edge[e])??i.set(r.edge[e],[]).get(r.edge[e])).push(e);let a=e.oneWayTrack??new Float32Array,o=[],s=(e,t)=>{for(let n of i.values())for(let i of n){let n=r.seg[4*i],a=r.seg[4*i+1],o=r.seg[4*i+2]-n,s=r.seg[4*i+3]-a,c=o*o+s*s,l=c>0?Math.max(0,Math.min(1,((e-n)*o+(t-a)*s)/c)):0;if(Math.hypot(n+l*o-e,a+l*s-t)<=1e-4*Math.sqrt(c||1)+1e-9)return!0}return!1};for(let e=0;e+11<=a.length;e+=11)s(a[e],a[e+1])||o.push(e);let c=[],l=[];for(let[e,a]of n)if(a===1||a===2){let n=i.get(e),o=t.get(e)?.ends;n?.length&&o&&l.push({a:o[0],b:o[1],way:a,strokes:wo(r,n)})}if(l.length){let t=[];for(let n=0;n<e.stationCount;n++)t.push([e.stations[n*3],e.stations[n*3+1]]);for(let n=0;n+1<e.junctions.length;n+=2)t.push([e.junctions[n],e.junctions[n+1]]);Zt(l,t,c)}let u=new Float32Array(o.length*11+c.length);return o.forEach((e,t)=>u.set(a.subarray(e,e+11),t*11)),u.set(c,o.length*11),u}function wo(e,t){let n=t.length,r=new Uint8Array(2*n).fill(255),i=new Int16Array(6*n),a={seg:new Float32Array(4*n),colour:new Uint32Array(n),edge:new Uint32Array(n),level:new Float32Array(n),flags:new Float32Array(n),dist:new Float32Array(n),lane:r,band:i,count:n};return t.forEach((t,n)=>{a.seg.set(e.seg.subarray(4*t,4*t+4),4*n),a.colour[n]=e.colour[t],a.edge[n]=e.edge[t],a.level[n]=e.level[t],a.flags[n]=e.flags[t],a.dist[n]=e.dist[t],e.lane&&r.set(e.lane.subarray(2*t,2*t+2),2*n),e.band&&i.set(e.band.subarray(6*t,6*(t+1)),6*n)}),a}function To(e){let t=e.reduce((e,t)=>e+t.count,0),n={seg:new Float32Array(4*t),colour:new Uint32Array(t),edge:new Uint32Array(t),level:new Float32Array(t),flags:new Float32Array(t),dist:new Float32Array(t),lane:new Uint8Array(2*t).fill(255),band:new Int16Array(6*t),count:t},r=0;for(let t of e)n.seg.set(t.seg.subarray(0,4*t.count),4*r),n.colour.set(t.colour.subarray(0,t.count),r),n.edge.set(t.edge.subarray(0,t.count),r),n.level.set(t.level.subarray(0,t.count),r),n.flags.set(t.flags.subarray(0,t.count),r),n.dist.set(t.dist.subarray(0,t.count),r),t.lane&&n.lane.set(t.lane.subarray(0,2*t.count),2*r),t.band&&n.band.set(t.band.subarray(0,6*t.count),6*r),r+=t.count;return n}function Eo(e,t){let n=[],r=[...t.track];if(t.lines.size&&n.push(_o(e,t.lines)),t.edges.size){for(let[i,a]of[[e.lines,!0],[e.track,!1]]){let e=[];for(let n=0;n<i.count;n++)t.edges.has(i.edge[n])&&!(a&&t.lines.has(i.colour[n]))&&e.push(n);e.length&&(a?n:r).push(wo(i,e))}for(let[e,i]of[[n,!0],[r.slice(t.track.length),!1]])for(let n of e){let e=new Map,r=new Map,a=e=>n.colour[e]+`:`+n.edge[e];for(let e=0;e<n.count;e++)t.edges.has(n.edge[e])&&r.set(a(e),(r.get(a(e))??0)+1);for(let o=0;o<n.count;o++){let s=t.edges.get(n.edge[o]);if(!s)continue;let c=e.get(a(o))??0;e.set(a(o),c+1),So(n,o,s,i,c,r.get(a(o)))}}}n.push(...t.lineStrokes);let i=e=>e.filter(e=>e.count),a=i(n),o=i(r);return{lines:a.length?a.length===1?a[0]:To(a):null,track:o.length?o.length===1?o[0]:To(o):null}}function Do(e){let t=e.length,n=new Float32Array(Math.max(1,t)*3),r=new Float32Array(Math.max(1,t)*2),i=new Float32Array(Math.max(1,t)*4),a=new Float32Array(Math.max(1,t)*26);return e.forEach((e,t)=>{let o=rt(e.ways,0,e.plat/2*e.perM);n.set([e.lx,e.ly,(e.built?0:2)|4|(e.side?Ce|(e.side<0?s:0):0)|(e.mid?Gt:0)|(e.tram?be:0)],t*3),r.set([o.ax,o.ay],t*2),i.set([o.mx,o.my,o.phi,6*e.perM],t*4),a.set(Xe(o),t*26)}),{st:n,axis:r,shape:i,line:a,count:t}}function Oo(e,t){let n=t.length,r={st:new Float32Array(n*3),axis:new Float32Array(n*2),shape:new Float32Array(n*4),line:new Float32Array(n*26),count:n};return t.forEach((t,n)=>{r.st.set(e.stations.subarray(t*3,t*3+3),n*3),e.stationAxis&&r.axis.set(e.stationAxis.subarray(t*2,t*2+2),n*2),e.stationShape&&r.shape.set(e.stationShape.subarray(t*4,t*4+4),n*4),e.stationLine&&e.stationLine.length>=(t+1)*26&&r.line.set(e.stationLine.subarray(t*26,(t+1)*26),n*26)}),r}function ko(e){let t=e.reduce((e,t)=>e+t.count,0),n={st:new Float32Array(Math.max(1,t)*3),axis:new Float32Array(Math.max(1,t)*2),shape:new Float32Array(Math.max(1,t)*4),line:new Float32Array(Math.max(1,t)*26),count:t},r=0;for(let t of e)n.st.set(t.st.subarray(0,t.count*3),r*3),n.axis.set(t.axis.subarray(0,t.count*2),r*2),n.shape.set(t.shape.subarray(0,t.count*4),r*4),n.line.set(t.line.subarray(0,t.count*26),r*26),r+=t.count;return n}var Ao=new WeakMap;function jo(e,t){let n=Ao.get(e);if(n)return n;let r=new Map,i=e.seg,a=e.flags,o=e.level,s=e.edge,c=e.lane,l=-1,u=0;for(let n=0;n<e.count;n++){let e=t[n];e!==l&&(l>=0&&r.set(l,u),l=e,u=r.get(l)??17);let d=4*n;u=Math.imul(u,31)+(i[d]*16|0)|0,u=Math.imul(u,31)+(i[d+1]*16|0)|0,u=Math.imul(u,31)+(i[d+2]*16|0)|0,u=Math.imul(u,31)+(i[d+3]*16|0)|0,u=Math.imul(u,31)+a[n]*7+o[n]+s[n]*3+(c?c[2*n]+c[2*n+1]*256:0)|0}return l>=0&&r.set(l,u),Ao.set(e,r),r}function Mo(e){jo(e.track,e.track.edge),jo(e.lines,e.lines.colour)}var No=(e,t)=>{let n=new Set;for(let[r,i]of e)t.get(r)!==i&&n.add(r);for(let r of t.keys())e.has(r)||n.add(r);return n};function Po(e,t){let n=No(jo(e.track,e.track.edge),jo(t.track,t.track.edge)),r=No(jo(e.lines,e.lines.colour),jo(t.lines,t.lines.colour)),i=[],a=[];for(let t=0;t<e.track.count;t++)n.has(e.track.edge[t])&&i.push(t);for(let t=0;t<e.lines.count;t++)(r.has(e.lines.colour[t])||n.has(e.lines.edge[t]))&&a.push(t);let o=(e,t)=>[e.stations[t*3],e.stations[t*3+1],e.stations[t*3+2],e.stationShape?.[t*4+3]??0,e.stationAxis?.[t*2]??0,e.stationAxis?.[t*2+1]??0].join(`,`),s=new Map(e.stationIds.map((e,t)=>[e,t])),c=new Map(t.stationIds.map((e,t)=>[e,t])),l=[],u=[];for(let[n,r]of c){let i=s.get(n);(i===void 0||o(e,i)!==o(t,r))&&l.push(Number(n))}for(let[n,r]of s){let i=c.get(n);(i===void 0||o(e,r)!==o(t,i))&&u.push(r)}let d=new Map;for(let n=0;n*4+3<e.lineColours.length&&n*4+3<t.lineColours.length;n++)[0,1,2].some(r=>e.lineColours[n*4+r]!==t.lineColours[n*4+r])&&d.set(n,[e.lineColours[n*4],e.lineColours[n*4+1],e.lineColours[n*4+2]]);return{hideEdges:[...n],hideLines:[...r],hideStations:l,track:i.length?[wo(e.track,i)]:[],lineStrokes:a.length?[wo(e.lines,a)]:[],stations:u.length?Oo(e,u):null,colours:d}}function Fo(e){let t=document.createElement(`div`);return t.className=`tool-marks`,e.getContainer().appendChild(t),t}function Io(e,t,n,r=0,i=0,a=!0){let o=Number.isFinite(t)&&Number.isFinite(n),s=o?``:`hidden`;if(e.style.visibility!==s&&(e.style.visibility=s),!o)return!1;let c=`translate(${a?Math.round(t+r):t+r}px, ${a?Math.round(n+i):n+i}px)`;return e.style.transform!==c&&(e.style.transform=c),!0}function Lo(e,t,n,r,i=0){return e>=-i&&t>=-i&&e<=n+i&&t<=r+i}var Ro=(e=!1)=>{let t=t=>e?t.peek():t.value;return{mode:t(p)?`tram`:t(ye)?`hsr`:`rail`,count:t(nt)?4:t(dt)?1:2}},zo=.6,Bo=(e,t,n=!1,r=!1)=>F(t===`busway`?`busway`:t===`tram`?Vo():t===`hsr`?`highSpeed`:`regular`,e)*(n?2:r?zo:1),Vo=()=>wt.value&&!qt.value?`streetTram`:`tram`,Ho=(e,t)=>te(e,{minimumFractionDigits:t===`hsr`?2:1,maximumFractionDigits:t===`hsr`?2:1})+`x`,Uo=(e,t,n=!1,r=!1)=>Ho(Bo(e,t,n,r),t),Wo=(e,t,n=!1,r=!1)=>Math.round(we(75*Bo(e,t,n,r))*10)/10;function Go(e,t,n,r=!1,i=!1){let a=(e,t,r=2)=>Le({built:!0,tracks:r,hsr:t,lengthM:1e3,levelMin:e,levelMax:e},n),o=a(1,!1);return o>0?a(e,t===`hsr`,i?1:2)/o*(r?2:1)*(t===`busway`?$e.busway.upkeep:t===`tram`?$e[Vo()].upkeep:1):1}function Ko(e,t,n,r=!1,i=!1){return n?Qt(Ho(Go(e,t,n,r,i),t)):``}function qo(e,t,n,r=!1,i=!1){return[`${cn(e)} (${po(e)})`,L(`trackPrice.cost`,{mult:Uo(e,t,r,i),price:ct(Wo(e,t,r,i)),unit:rn()}),Ko(e,t,n,r,i)].filter(Boolean).join(`
`)}var Jo=`#7fb3e0`,Yo=`M8 1.8v12.4M5 4.8l3-3 3 3M5 11.2l3 3 3-3`,Xo=`M3.5 3.8L7.7 8l-4.2 4.2M8.5 3.8L12.7 8l-4.2 4.2`;function Zo(e,t,n=.5){let r=document.createElement(`span`);if(r.textContent=e,t){let[e,i,a]=yn(t);r.className=`tag-chip`,r.style.setProperty(`--chip-bg`,`rgba(${e},${i},${a},${n})`),r.style.padding=`0 3px`,r.style.borderRadius=`2px`}return r}var Qo=`#f2c200`,$o=`#8fd97a`;function es(e){return e<.995?[$o,.3+.2*Math.min(1,(1-e)/.5)]:[Qo,.2+.6*Math.min(1,Math.max(0,e-1)/1.5)]}function ts(e){let t=es(e);if(!t)return;let[n,r,i]=yn(t[0]);return`rgba(${n},${r},${i},${t[1]})`}function ns(e,t){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);n.setAttribute(`viewBox`,`0 0 16 16`),n.setAttribute(`class`,`tag-icon`),n.setAttribute(`aria-label`,t);let r=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return r.setAttribute(`d`,e),n.append(r),n}function rs(e,...t){let n=document.createElement(`span`);n.className=`tag-fact`,n.append(ns(Yo,L(`trackTagRows.level`)));for(let r of[e,...t]){let e=Math.max(-3,Math.min(3,Math.round(r)));n.append(Zo(Ft(e),le[e]))}return n}var is={1:`M10 3v14`,2:`M6 3v14M14 3v14`,4:`M4 3v14M8 3v14M12 3v14M16 3v14`},as={1:`toolBar.singleTrack`,2:`toolBar.doubleTrack`,4:`toolBar.quadTrack`};function os(e=Ro(!0).mode,t=Ro(!0).count){let n=ns(is[t],L(as[t]));return n.setAttribute(`viewBox`,`2 2 16 16`),n.classList.add(`tracks`),n.style.color=j[e],n}function ss(e){let t=document.createElement(`span`);return t.className=`tag-fact`,t.append(ns(Xo,L(`trackTagRows.speedLimit`)),Zo(d(e),Dt(e))),t}function cs(e,t=`train`){let n=document.createElement(`span`);return n.className=`tag-fact`,n.append(...ls(Ye(`trackTagRows.fastest`,{vehicle:t,speed:Zo(d(e),Dt(e))}))),n}function ls(e){return[e].flat(1/0).filter(e=>e!=null&&e!==!1).map(e=>typeof e==`object`?e:String(e))}var us=`M1.5 13.5L6 6l2.4 3.4L10.6 6.5l3.9 7z`,ds=`M1.5 6.5q1.6-1.6 3.25 0t3.25 0 3.25 0 3.25 0M1.5 10.5q1.6-1.6 3.25 0t3.25 0 3.25 0 3.25 0`,fs=e=>e.toFixed(Math.abs(e*10-Math.round(e*10))>1e-9?2:1);function ps(e,t=1){if(!e)return null;let n=[3,2,1].find(t=>(e[t]??0)>=1);if(n===void 0)return null;let r=document.createElement(`span`);return r.className=`tag-fact`,r.append(ns(us,L(`trackTagRows.terrain`)),Zo(L(`trackTagRows.terrainAdds`,{terrain:gn[n],mult:fs(yt[n]*t)}),an[n],.6)),r}function ms(e,t=1){if(!e||(e[4]??0)<1)return null;let n=document.createElement(`span`);return n.className=`tag-fact`,n.append(ns(ds,L(`trackTagRows.water`)),Zo(L(`trackTagRows.waterAdds`,{mult:fs(Kt*t)}),Jo,.6)),n}var hs=`M5 1.5L3.5 14.5M11 1.5l1.5 13M8 2v2.2M8 6.9v2.2M8 11.8V14`,gs=`#c9b28a`,_s=`#c98a76`,vs=.75;function ys(e,t,n,r){let i=0,a=0;for(let e=0;e<4;e++)i+=n[e]??0,a+=(n[e]??0)*yt[e];let o=i>0?a/i:0,s=Bo(1,r)-Bo(0,r),c=Bo(-2,r)-Bo(0,r)-o*Bo(1,r),l=75*t*Math.min(s,c);return l>0&&e<=l?{best:`ground`,share:e/l}:{best:c<s?`down`:`up`,share:1}}function bs(e){let t=.6;return e.best===`down`?[_s,t]:e.best===`up`?[gs,t]:[gs,t*(1-vs*(1-e.share))]}function xs(e){let t=0,n=0;for(let r=3;r+2<e.length;r+=3){let i=Math.hypot(e[r]-e[r-3],e[r+1]-e[r-2]);t+=i,Math.round((e[r+2]+e[r-1])/16)===0&&(n+=i)}return t>0?n/t:1}function Ss(e,t){let n=e?.[5]??0;if(!e||n<1)return null;let[r,i]=bs(ys(e[6]??0,t,e,Re.peek())),a=document.createElement(`span`);return a.className=`tag-fact`,a.append(ns(hs,L(`trackTagRows.roads`)),Zo(L(`trackTagRows.roadsAdd`,{verbose:pe.peek(),count:Number(n.toPrecision(3)),cost:Pn((e[6]??0)*1e6)}),r,i)),a}function Cs(t,n=!1){let r=document.createElement(`span`);return r.className=(n?`chip sm`:`chip`)+(Ae(t.id)===`outline`?` ring`:``)+(fi.peek().has(t.id)?` idle`:``),r.style.setProperty(`--c`,t.colour),r.style.setProperty(`--ct`,e(t.colour)),r.append(Ui(t.letter,n?`sm`:``,Ae(t.id))),r}function ws(e,t){let n=document.createElement(`div`);return n.className=`tag-lines`,n.append(...e.map(e=>{let n=Cs(e),r=t?.(e)??null;if(r===null)return n;let i=document.createElement(`span`);return i.className=`bullet-heading`,i.append(n,Ts(e.colour,r)),i})),n}function Ts(e,t){let n=document.createElement(`span`);return n.className=`heading-chevron`,n.style.color=e,n.style.transform=`rotate(${t.toFixed(1)}deg)`,n.innerHTML=`<svg viewBox="0 0 14 14" width="16" height="16" style="display:block;overflow:visible"><path d="M3 3.5 L10 7 L3 10.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,n}function Es(...e){let t=document.createElement(`div`);return t.className=`tag-facts`,t.append(...e),t}var Ds=160,Os=320;function ks(e,t,n={terrain:1,water:1}){let r=(...e)=>{let t=document.createElement(`div`);return t.append(...e),t},i=[];if(!e.ok){let t=r(Un(e.issues)||L(`trackTagRows.cannotPlace`));t.style.color=`var(--bad)`,i.push(t)}let a=e.verts.length/4,o=1/0;if(e.speeds?.length)for(let t of e.speeds)t>=0&&(o=Math.min(o,t));else for(let t=1;t<a-1;t++)e.verts[t*4+2]>0&&(o=Math.min(o,e.verts[t*4+3]));if(Number.isFinite(o)||(o=ye.peek()?Os:Ds),e.ok){let t=es(e.mult);i.push(r(...ls(Ye(`trackTagRows.lengthCost`,{length:hn(e.lengthM),mult:Zo(`${e.mult.toFixed(2)}x`,t?.[0]??null,t?.[1]),cost:Pn(e.cost*1e6)}))))}e.ok&&e.noFlyover&&i.push(r(L(`trackTagRows.noFlyover`)));let[s,...c]=As(e.pts,t);i.push(Es(os(),rs(s,...c),ss(o)));let l=[ps(e.ground,n.terrain),ms(e.ground,n.water),Ss(e.ground,e.lengthM/1e3*xs(e.pts))].filter(e=>e!==null);return l.length&&i.push(Es(...l)),i}function As(e,t){let n=e.length/3;if(n<1)return[t];let r=e[2]/8,i=e[(n-1)*3+2]/8,a=-1/0,o=1/0;for(let t=2;t<e.length;t+=3)a=Math.max(a,e[t]/8),o=Math.min(o,e[t]/8);let s=[r];return a>Math.max(r,i)+.25&&s.push(a),o<Math.min(r,i)-.25&&s.push(o),s.push(i),[...new Set(s.map(Math.round))]}var js=5e3,Ms=300;function Ns(e,t){return e>0&&(e<js||t>160.5&&t<319.5)}function Ps(e){let t=[],n=e.length/4;for(let r=1;r<n-1;){let i=e[r*4+2],a=r+1;for(;a<n-1&&i>0&&Math.abs(e[a*4+2]-i)<.5;)a++;let o=e[r*4+3];if(Ns(i,o)){let n=r+a-1>>1;t.push({x:e[n*4],y:e[n*4+1],kmh:o})}r=a}return t}function Fs(e){let t=[];for(let n=0;e&&n+3<e.length;n+=4)Ns(e[n+2],e[n+3])&&t.push({x:e[n],y:e[n+1],kmh:e[n+3]});return t}function Is(e){let t=[];for(let n=0;e&&n+2<e.length;n+=3)t.push({x:e[n],y:e[n+1],kmh:e[n+2]});return t}function Ls(e,t,n){let r=`${t}|${n??``}`;e.dataset.curve===r&&e.firstChild||(e.dataset.curve=r,e.replaceChildren(Zo(d(t),n??Dt(t))))}function Rs(e,t,n,r,i){let a=[];for(let o of e){let[e,s]=t(o.x,o.y);if(!Lo(e,s,n,r,40)||a.some(([t,n])=>Math.abs(t-e)<64&&Math.abs(n-s)<22))continue;if(a.length>=Ms)break;a.push([e,s]);let c=i(a.length-1);Ls(c,o.kmh,o.colour),c.classList.toggle(`centred`,!!o.centred),Io(c,e,s,o.centred?0:8,o.centred?0:6)}return a.length}var zs=class{box;els=[];constructor(e){this.box=e}place(e,t,n,r){let i=Rs(e,t,n,r,e=>{let t=this.els[e];return t||(t=this.els[e]=document.createElement(`div`),t.className=`pi-label`,this.box.appendChild(t)),t.style.display=``,t});for(let e=i;e<this.els.length;e++)this.els[e].style.display=`none`}},Bs={light:{land:`#f3eee5`,water:`#b7d9d6`,park:`#d3e0c4`,road:`#ffffff`,label:`#aaa7a3`,basemapMix:`#6e5b48`,casing:`#ffffff`,mapInk:Qe,stationInk:Qe,offRail:`#9aa3ae`,offMid:`#f2f4f7`,offFade:`#ffffff`,outside:`#182536`,outsideOpacity:.075,inactive:`#182536`,inactiveOpacity:.11,thumbTrack:`#b9b4ad`,markInk:Qe,markBlueprint:`#2f62b3`,realMain:`#6f7b93`,realOther:`#9ea6b5`,realMetro:`#9577a6`,realFreight:`#8c7a66`,realAbandoned:`#a39a8c`,realOpacity:.15,realStationOpacity:.85,realDotOpacity:.36,walkers:`#a4a19d`,lot:`#e7e3dc`,lotLine:`#c4beb4`,fullTrack:`#c0392b`,ghost:`#000000`,tramWire:`#ffffff`,brtLane:`#ffffff`},dark:{land:`#292520`,water:`#2b4762`,park:`#2b3727`,road:`#443e36`,label:`#6a655e`,basemapMix:`#efe4d3`,casing:`#141517`,mapInk:`#e6e4e0`,stationInk:`#8f8b85`,offRail:`#6c747e`,offMid:`#383e46`,offFade:`#383e46`,outside:`#000000`,outsideOpacity:.35,inactive:`#000000`,inactiveOpacity:.225,thumbTrack:`#6f6b66`,markInk:`#e6e4e0`,markBlueprint:`#8db6ee`,realMain:`#97a2b8`,realOther:`#7a8291`,realMetro:`#a98ec2`,realFreight:`#9c8a74`,realAbandoned:`#7d766b`,realOpacity:.3,realStationOpacity:.85,realDotOpacity:.42,walkers:`#b8b3ac`,lot:`#39352f`,lotLine:`#625b52`,fullTrack:`#f0584f`,ghost:`#e6e4e0`,tramWire:`#e6e4e0`,brtLane:`#ffffff`}},Vs=e=>({"fill-color":e.outside,"fill-opacity":e.outsideOpacity,"fill-antialias":!1}),Hs=()=>Bs[l.peek()];At(()=>{let e=Bs[l.value],t=document.documentElement.style;t.setProperty(`--map-land`,e.land),t.setProperty(`--map-ink`,e.mapInk),t.setProperty(`--map-casing`,e.casing)});var q={lines:new Set,levels:0,stationLevel:e=>void 0,nodeLevel:e=>void 0,blueprints:!1,v:0},Us=new Set,Ws=e=>void Us.add(e);function Gs(e){if(e===q.blueprints)return!1;q.blueprints=e,q.v++;for(let e of Us)e();return!0}function Ks(e,t,n,r){let i=t===q.levels&&e.size===q.lines.size&&[...e].every(e=>q.lines.has(e));return q.stationLevel=n,q.nodeLevel=r,!i&&(q.lines=e,q.levels=t,q.v++,!0)}var qs=.08;function Js(e,t=q.levels){if(!t)return 1;let n=Math.max(-3,Math.min(3,e)),r=Math.floor(n),i=n-r,a=e=>e>3||!(t&1<<e+3)?1:qs;return a(r)*(1-i)+a(r+1)*i}var Ys=e=>!!(q.levels&1<<Math.max(-3,Math.min(3,Math.round(e)))+3);function Xs(e){if(!q.levels)return!1;let t=Math.floor(e/256),n=e-t*256;return Math.max(Js(t/32-4),Js(n/32-4))<.5}var Zs=new WeakMap,Qs=`float levelShown(float z) {
  if (u_level_hide == 0) return 1.0;
  float c = clamp(z, -3.0, 3.0), lo = floor(c);
  int a = int(lo) + 3, b = min(a + 1, 6);
  float sa = ((u_level_hide >> a) & 1) != 0 ? ${qs.toFixed(2)} : 1.0;
  float sb = ((u_level_hide >> b) & 1) != 0 ? ${qs.toFixed(2)} : 1.0;
  return mix(sa, sb, c - lo);
}`,$s=pn(`marks`),ec=[[9,7],[12,11],[15,15]],tc=[[11,3.5],[13,5],[15,7]],nc=9,rc=11,ic=11,ac=.85,oc=.3,sc=.9,cc=6;function lc(e){return[e>=nc?B(e,ec):0,e>=rc?M(e):0,e>=ic?B(e,tc):0]}var uc=`#version 300 es
precision highp float;
${V}
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
  v_fade = ((u_level_hide >> (clamp(int(round(a_style.y)), -3, 3) + 3)) & 1) != 0 ? ${qs.toFixed(2)} : 1.0;
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
}`,dc=`#version 300 es
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
    float a = cov(d) * ${sc.toFixed(2)};
    vec3 col = mix(lc, u_ink, ${oc.toFixed(2)});
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
}`,fc=class{gl;prog=null;u={};built=null;drawing=null;marks=new Float32Array;init(e){this.gl=e,this.built=this.drawing=null,this.prog=Pt(e,uc,dc,`grade marks`),this.prog&&(this.u=W(e,this.prog,[...H,`u_viewport`,`u_r`,`u_ink`,`u_bp`,`u_fill`,`u_bad`,`u_dpr`,`u_quiet`,`u_level_colours`,`u_flat`,`u_ramps`,`u_level_hide`,`u_no_bp`,`u_rw`,`u_ends`,`u_thick`]))}upload(e,t){let n=this.gl;if(e&&(n.deleteVertexArray(e.vao),n.deleteBuffer(e.buf)),!t?.length||!this.prog)return null;let r=n.createVertexArray(),i=n.createBuffer();n.bindVertexArray(r),n.bindBuffer(n.ARRAY_BUFFER,i),n.bufferData(n.ARRAY_BUFFER,t,n.STATIC_DRAW);for(let[e,t,r]of[[`a_mark`,4,0],[`a_style`,2,16]]){let i=n.getAttribLocation(this.prog,e);n.enableVertexAttribArray(i),n.vertexAttribPointer(i,t,n.FLOAT,!1,24,r),n.vertexAttribDivisor(i,1)}return n.bindVertexArray(null),n.bindBuffer(n.ARRAY_BUFFER,null),{vao:r,buf:i,count:t.length/6}}setNetwork(e){this.marks=e??new Float32Array,this.built=this.upload(this.built,e)}setPreview(e){let t=e;if(e&&this.marks.length){let n=[];for(let t=0;t<e.length;t+=6){let r=e[t+2],i=!1;if(r===0||r===1)for(let n=0;n<this.marks.length&&!i;n+=6)i=Math.abs(this.marks[n]-e[t])<cc&&Math.abs(this.marks[n+1]-e[t+1])<cc;if(!i)for(let r=0;r<6;r++)n.push(e[t+r])}t=new Float32Array(n)}this.drawing=this.upload(this.drawing,t)}get previewing(){return!!this.drawing}draw(e,t,n,r,i,a,o,s,c){let l=c===`built`?this.built:this.drawing;if(!l||$s)return;let[u,d,f]=lc(n);if(!u&&!d&&!f)return;let p=this.gl,m=this.u,h=Hs();p.useProgram(this.prog),R(p,m,e),p.uniform2f(m.u_viewport,t[0],t[1]),p.uniform3f(m.u_r,u*r,d*r,f*r),p.uniform3fv(m.u_ink,z(h.markInk)),p.uniform3fv(m.u_bp,z(h.markBlueprint)),p.uniform3fv(m.u_fill,z(h.casing)),p.uniform3fv(m.u_bad,z(Ee)),p.uniform1f(m.u_dpr,r),p.uniform1f(m.u_quiet,ac),p.uniform3fv(m.u_level_colours,i),p.uniform1f(m.u_flat,+!!a),p.uniform1f(m.u_ramps,+!!o),p.uniform1i(m.u_level_hide,q.levels),p.uniform1f(m.u_ends,s&&f>0?1:0),s&&p.uniform1fv(m.u_rw,s.w),p.uniform1f(m.u_thick,s?s.thick:0),p.uniform1i(m.u_no_bp,c===`built`&&q.blueprints?1:0),p.bindVertexArray(l.vao),p.drawArraysInstanced(p.TRIANGLE_STRIP,0,4,l.count),p.bindVertexArray(null)}};function pc(e,t,n,r,i){let[a,o,s]=lc(i),c=g.peek().flatMarks,l=g.peek().rampMarks,u=-1,d=1/0,f=new Float64Array(2);for(let i=0;i<t.length;i+=6){let p=t[i+2],m=p===2||p===3;if(!c&&(p===0||p===1)||!l&&m||p===8||Ys(t[i+5]))continue;let h=m?s:t[i+4]>.5?a:o;if(h<=0)continue;e.toScreenInto(t[i],t[i+1],f);let g=Math.hypot(f[0]-n,f[1]-r);g<=Math.max(h,5)+1&&g<d&&([u,d]=[i,g])}return u}function mc(e,t){let n=e[t+2],r=e[t+5],i=e[t+4]>.5,a=[];return n===2?a.push(L(`gradeMarks.rampUp`,{level:Ft(r)})):n===3?a.push(L(`gradeMarks.rampDown`,{level:Ft(r)})):n===4?a.push(L(`gradeMarks.badCross`)):n===5?a.push(L(`gradeMarks.converging`)):n===6?a.push(L(`gradeMarks.diverging`)):n===7?a.push(L(`gradeMarks.repeatTrack`)):(a.push(L(n===1?`gradeMarks.junction`:`gradeMarks.crossing`)),n===0&&zn(e[t+5])===1&&a.push(L(`gradeMarks.tramYields`)),a.push(rs(r))),i&&n!==4&&a.push(L(`gradeMarks.blueprint`)),a}var hc=new Set,gc=!1;function _c(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length;hc.size&&hc.clear();let a=vc(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s=0,c=0,l=0;if(r&&(a=Ec(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return bc(a,o,s,c,l),o}function vc(e,t,n,r,i){let a=null;if(i===cl(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=al(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=al(i/r|0,e[i],e[i+1],a);return a&&Qc(a,a.next)&&(ol(a),a=a.next),a}function yc(e,t=e){let n=t===e,r=e,i;do i=!1,r!==r.next&&(hc.size===0||!hc.has(r))&&(Qc(r,r.next)||Y(r.prev,r,r.next)===0)?((n||r===t)&&(t=r.prev),gc=!0,ol(r),r=r.prev,i=!0):(n||r!==t)&&(r=r.next,i=!n);while(i||r!==t);return t}function bc(e,t,n,r,i){i&&Gc(e,n,r,i);let a=e,o=!1;for(;e.prev!==e.next;){let s=e.prev,c=e.next;if(Y(s,e,c)<0&&(i?Sc(e,n,r,i):xc(e)))t.push(s.i,e.i,c.i),ol(e),e=c,a=c;else if(e=c,e===a){if(gc=!1,e=yc(e),gc){a=e;continue}if(!o){e=Cc(e,t),a=e,o=!0;continue}wc(e,t,n,r,i);break}}}function xc(e){let t=e.prev,n=e,r=e.next,i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&(i!==m.x||s!==m.y)&&Xc(i,s,a,c,o,l,m.x,m.y)&&Y(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Sc(e,t,n,r){let i=e.prev,a=e,o=e.next,s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Jc(p,m,t,n,r),v=Jc(h,g,t,n,r),y=e.prevZ;for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==o&&(s!==y.x||u!==y.y)&&Xc(s,u,c,d,l,f,y.x,y.y)&&Y(y.prev,y,y.next)>=0)return!1;y=y.prevZ}let b=e.nextZ;for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==o&&(s!==b.x||u!==b.y)&&Xc(s,u,c,d,l,f,b.x,b.y)&&Y(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Cc(e,t){let n=e,r=!1;do{let i=n.prev,a=n.next.next;$c(i,n,n.next,a,!1)&&nl(i,a)&&nl(a,i)&&(t.push(i.i,n.i,a.i),ol(n),ol(n.next),n=e=a,r=!0),n=n.next}while(n!==e);return r?yc(n):n}function wc(e,t,n,r,i){let a=e;do{let e=a.next.next;for(;e!==a.prev;){if(a.i!==e.i&&Zc(a,e)){let o=il(a,e);a=yc(a,a.next),o=yc(o,o.next),bc(a,t,n,r,i),bc(o,t,n,r,i);return}e=e.next}a=a.next}while(a!==e)}var Tc=!1;function Ec(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=vc(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&hc.add(o),i.push(Yc(o))}i.sort(Dc),Nc(e.length/r,t.length),Pc(n,n),Tc=!0;for(let e=0;e<i.length;e++)n=Oc(i[e],n);return Tc=!1,yc(n)}function Dc(e,t){return e.x-t.x||e.y-t.y||(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x)}function Oc(e,t){let n=Rc(e,t);if(!n)return t;let r=il(n,e),i=r.next;return Pc(n,i.next),yc(r,r.next),yc(n,n.next)}var kc=16,J=new Float64Array,Ac=0,jc=[],Mc=[];function Nc(e,t){let n=Math.ceil((e+2*t)/kc)+t+2;J.length<n*4&&(J=new Float64Array(n*4)),Ac=0}function Pc(e,t){let n=e;do{let e=Ac++;jc[e]=n;let r=n.x,i=n.y,a=n.x,o=n.y,s=0;do{let t=n.next;n.z=e,t.x<r&&(r=t.x),t.x>a&&(a=t.x),t.y<i&&(i=t.y),t.y>o&&(o=t.y),n=t}while(++s<kc&&n!==t);Mc[e]=n;let c=e*4;J[c]=r,J[c+1]=i,J[c+2]=a,J[c+3]=o}while(n!==t)}function Fc(e,t){let n=e.z*4;t.x<J[n]&&(J[n]=t.x),t.y<J[n+1]&&(J[n+1]=t.y),t.x>J[n+2]&&(J[n+2]=t.x),t.y>J[n+3]&&(J[n+3]=t.y)}function Ic(e){let t=Mc[e];for(;t.prev.next!==t;)t=t.next;return Mc[e]=t,t}function Lc(e){let t=jc[e];for(;t.prev.next!==t;)t=t.next;return jc[e]=t,t}function Rc(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Qc(e,n))return n;for(let t=0,s=0;t<Ac;t++,s+=4){if(i<J[s+1]||i>J[s+3]||J[s]>r||J[s+2]<=a)continue;let c=Ic(t);n=Lc(t);do{if(n.prev.next===n){if(Qc(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}}n=n.next}while(n!==c)}if(!o)return null;let s=o.x,c=o.y,l=Math.min(i,c),u=Math.max(i,c),d=1/0;for(let t=0,f=0;t<Ac;t++,f+=4){if(J[f+2]<s||J[f]>r||J[f+3]<l||J[f+1]>u)continue;let p=Ic(t);n=Lc(t);do{if(n.prev.next===n&&r>=n.x&&n.x>=s&&r!==n.x&&Xc(i<c?r:a,i,s,c,i<c?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);(nl(n,e)||n.y===i&&n.next.y===i&&n.next.x>r)&&(t<d||t===d&&(n.x>o.x||n.x===o.x&&zc(o,n)))&&(o=n,d=t)}n=n.next}while(n!==p)}return o}function zc(e,t){return Y(e.prev,e,t.prev)<0&&Y(t.next,e,e.next)<0}var Bc=[],Vc=[],Hc=new Uint32Array,Uc=new Uint32Array,Wc=new Uint32Array(256);function Gc(e,t,n,r){let i=e,a=0;do i.z=Jc(i.x,i.y,t,n,r),Bc[a++]=i,i=i.next;while(i!==e);Kc(a);let o=null;for(let e=0;e<a;e++){let t=Bc[e];t.prevZ=o,o&&(o.nextZ=t),o=t}o.nextZ=null,Bc.fill(null,0,a),Vc.fill(null,0,a)}function Kc(e){if(e<=32)for(let t=1;t<e;t++){let e=Bc[t],n=e.z,r=t-1;for(;r>=0&&Bc[r].z>n;)Bc[r+1]=Bc[r],r--;Bc[r+1]=e}else{Hc.length<e&&(Hc=new Uint32Array(e),Uc=new Uint32Array(e),Vc=Array(e));for(let t=0;t<e;t++)Hc[t]=Bc[t].z;qc(e,Bc,Hc,Vc,Uc,0),qc(e,Vc,Uc,Bc,Hc,8),qc(e,Bc,Hc,Vc,Uc,16),qc(e,Vc,Uc,Bc,Hc,24)}}function qc(e,t,n,r,i,a){Wc.fill(0);for(let t=0;t<e;t++)Wc[n[t]>>>a&255]++;let o=0;for(let e=0;e<256;e++){let t=Wc[e];Wc[e]=o,o+=t}for(let o=0;o<e;o++){let e=n[o],s=Wc[e>>>a&255]++;r[s]=t[o],i[s]=e}}function Jc(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Yc(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Xc(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Zc(e,t){let n=Qc(e,t)&&Y(e.prev,e,e.next)>0&&Y(t.prev,t,t.next)>0;return e.next.i!==t.i&&(n||nl(e,t)&&nl(t,e)&&(Y(e.prev,e,t.prev)!==0||Y(e,t.prev,t)!==0))&&!tl(e,t)&&(n||rl(e,t))}function Y(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Qc(e,t){return e.x===t.x&&e.y===t.y}function $c(e,t,n,r,i=!0){let a=Y(e,t,n),o=Y(e,t,r),s=Y(n,r,e),c=Y(n,r,t);return(a>0&&o<0||a<0&&o>0)&&(s>0&&c<0||s<0&&c>0)?!0:i?!!(a===0&&el(e,n,t)||o===0&&el(e,r,t)||s===0&&el(n,e,r)||c===0&&el(n,t,r)):!1}function el(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function tl(e,t){let n=Math.min(e.x,t.x),r=Math.max(e.x,t.x),i=Math.min(e.y,t.y),a=Math.max(e.y,t.y),o=e;do{let s=o.next;if(o.x>r&&s.x>r||o.x<n&&s.x<n||o.y>a&&s.y>a||o.y<i&&s.y<i)o=s;else{if(o.i!==e.i&&s.i!==e.i&&o.i!==t.i&&s.i!==t.i&&$c(o,s,e,t))return!0;o=s}}while(o!==e);return!1}function nl(e,t){return Y(e.prev,e,e.next)<0?Y(e,t,e.next)>=0&&Y(e,e.prev,t)>=0:Y(e,t,e.prev)<0||Y(e,e.next,t)<0}function rl(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do{let e=n.next;n.y>a!=e.y>a&&i<(e.x-n.x)*(a-n.y)/(e.y-n.y)+n.x&&(r=!r),n=e}while(n!==e);return r}function il(e,t){let n=sl(e.i,e.x,e.y),r=sl(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function al(e,t,n,r){let i=sl(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function ol(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ),Tc&&Fc(e.prev,e.next)}function sl(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null}}function cl(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var ll=en(null),ul=en(new Map),dl=t(()=>{let e=U.value,t=e?.save.buildings??[];if(!e||!t.length)return new Map;let n=Qn(t,e.save.stations,T);return new Map(t.map((e,t)=>[e.id,n[t]]))});function fl(e){let t=new Set(e);for(let e of U.value?.save.buildings??[])if((dl.value.get(e.id)??[]).some(e=>t.has(e)))return e;return null}function pl(e,t){for(let n of U.peek()?.save.buildings??[])if(Jn(n.corners,e,t))return n;return null}function ml(e){return U.peek()?.save.buildings?.find(t=>t.id===e)??null}var hl=14,gl=[15,15.5],_l=[16.8,17],vl=9,yl=[249/255,247/255,243/255],bl=()=>l.peek()===`dark`?2:1.5,xl=32,Sl=`#version 300 es
precision highp float;
${V}
in vec3 a_p;       // local x, y, strength
out float v_a;
void main() {
  v_a = a_p.z;
  gl_Position = project(a_p.xy);
}`,Cl=`#version 300 es
precision highp float;
uniform vec3 u_rgb;
uniform float u_alpha;
in float v_a;
out vec4 o;
void main() {
  float a = v_a * u_alpha;
  o = vec4(u_rgb * a, a);
}`,wl=`#version 300 es
precision highp float;
${V}
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
}`,Tl=`#version 300 es
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
}`,El=`#version 300 es
precision highp float;
${V}
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
}`,Dl=`#version 300 es
precision highp float;
uniform vec3 u_fill[${vr.length}];
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
  if (u_glyph > 0.0 && side >= ${vl.toFixed(1)} * u_dpr) {
    float r = 0.32 * side;
    float g = glyph(v_s / r, int(v_meta.y + 0.5)) * r;
    col = mix(col, rim * 0.92, u_glyph * clamp(0.5 - g, 0.0, 1.0));
  }
  float a = cover * u_alpha;
  o = vec4(col * a, a);
}`,Ol=`#version 300 es
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
}`,kl=`#version 300 es
precision highp float;
uniform vec4 u_bbox;     // CSS px, y down: left, top, right, bottom
uniform vec2 u_css;
void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), gl_VertexID < 2 ? 0.0 : 1.0);
  vec2 s = mix(u_bbox.xy, u_bbox.zw, corner);
  gl_Position = vec4(s.x / u_css.x * 2.0 - 1.0, 1.0 - s.y / u_css.y * 2.0, 0.0, 1.0);
}`,Al=`#version 300 es
precision highp float;
uniform vec2 u_pts[${xl}]; // the outline, CSS px, y down
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
  for (int i = 0; i < ${xl}; i++) {
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
}`;function jl(e){At(()=>{e.renderer.floors.setSkip(ll.value?.id??null),e.invalidate()})}function Ml(e,t,n){if(!Nl.shownAt(e.renderer.floors.zoom)||!U.peek()?.save.buildings?.length)return null;let r=e.screenToLocal(t,n);if(!r)return null;let i=re(...Ie(r[0],r[1]));return pl(i.x,i.y)}var Nl=class{gl;fillProg;edgeProg;shopProg;cellProg;selProg;fu={};eu={};su={};cu={};xu={};fillVao=null;edgeVao=null;shopVao=null;cellVao=null;cellBuf=null;bufs=[];fillCount=0;markCount=0;edgeCount=0;shopCount=0;cellCount=0;buildings=[];skip=null;hallKey=``;shopColours=new Float32Array(vr.flatMap(e=>yn(e).map(e=>e/255)));selPts=new Float32Array(64);off=!1;init(e){this.gl=e,this.fillVao=this.edgeVao=this.shopVao=this.cellVao=this.cellBuf=null,this.bufs=[],this.hallKey=``;let t=[Pt(e,Sl,Cl,`building floors`),Pt(e,wl,Tl,`building floors`),Pt(e,El,Dl,`building floors`),Pt(e,El,Ol,`building floors`),Pt(e,kl,Al,`building floors`)];this.off=t.some(e=>!e),!this.off&&([this.fillProg,this.edgeProg,this.shopProg,this.cellProg,this.selProg]=t,this.fu=W(e,this.fillProg,[...H,`u_rgb`,`u_alpha`]),this.eu=W(e,this.edgeProg,[...H,`u_viewport`,`u_half`,`u_rgb`,`u_alpha`]),this.su=W(e,this.shopProg,[...H,`u_viewport`,`u_fill`,`u_alpha`,`u_glyph`,`u_dpr`]),this.cu=W(e,this.cellProg,[...H,`u_viewport`,`u_rgb`,`u_bad`,`u_dpr`,`u_alpha`]),this.xu=W(e,this.selProg,[`u_bbox`,`u_css`,`u_pts`,`u_n`,`u_dpr`,`u_height`,`u_ink`,`u_rim`,`u_outline`,`u_glow`]),this.upload())}setNetwork(e){this.buildings=e??[],this.hallKey=``,this.gl&&this.upload()}setSkip(e){e!==this.skip&&(this.skip=e,this.gl&&this.upload())}get drawn(){return this.skip===null?this.buildings:this.buildings.filter(e=>e.id!==this.skip)}upload(){let e=this.gl;for(let t of[this.fillVao,this.edgeVao,this.shopVao,this.cellVao])t&&e.deleteVertexArray(t);for(let t of this.bufs)e.deleteBuffer(t);this.cellBuf&&e.deleteBuffer(this.cellBuf),this.fillVao=this.edgeVao=this.shopVao=this.cellVao=this.cellBuf=null,this.bufs=[],this.fillCount=this.markCount=this.edgeCount=this.shopCount=this.cellCount=0,this.hallKey=``;let t=this.drawn;if(!t.length||this.off)return;let n=[],r=[],i=[],a=[],o=[...t].sort((e,t)=>Number(!e.members.length)-Number(!t.members.length));for(let e of o){let t=e.corners.length/2;if(t<3)continue;let o=e.members.length?1:.5,s=n.length/3;for(let r=0;r<t;r++)n.push(e.corners[2*r],e.corners[2*r+1],o);for(let t of _c(Array.from(e.corners)))r.push(s+t);e.members.length&&(this.markCount=r.length);for(let n=0;n<t;n++){let r=(n+1)%t;i.push(e.corners[2*n],e.corners[2*n+1],e.corners[2*r],e.corners[2*r+1],o)}let c=e.shops;for(let t=0;t+6<=c.length;t+=6){let n=c[t+2]*e.perM,r=c[t+3]*e.perM;a.push(c[t],c[t+1],e.ux*n,e.uy*n,r,c[t+4],c[t+5],0)}}if(!r.length)return;let s=(t,n=e.ARRAY_BUFFER)=>{let r=e.createBuffer();return e.bindBuffer(n,r),e.bufferData(n,t,e.STATIC_DRAW),this.bufs.push(r),r};this.fillVao=e.createVertexArray(),e.bindVertexArray(this.fillVao),s(new Float32Array(n));let c=e.getAttribLocation(this.fillProg,`a_p`);e.enableVertexAttribArray(c),e.vertexAttribPointer(c,3,e.FLOAT,!1,12,0),s(new Uint32Array(r),e.ELEMENT_ARRAY_BUFFER),this.fillCount=r.length,e.bindVertexArray(null),this.edgeVao=e.createVertexArray(),e.bindVertexArray(this.edgeVao),s(new Float32Array(i));let l=e.getAttribLocation(this.edgeProg,`a_seg`),u=e.getAttribLocation(this.edgeProg,`a_strength`);e.enableVertexAttribArray(l),e.vertexAttribPointer(l,4,e.FLOAT,!1,20,0),e.vertexAttribDivisor(l,1),e.enableVertexAttribArray(u),e.vertexAttribPointer(u,1,e.FLOAT,!1,20,16),e.vertexAttribDivisor(u,1),this.edgeCount=i.length/5,e.bindVertexArray(null),a.length&&(this.shopVao=e.createVertexArray(),e.bindVertexArray(this.shopVao),s(new Float32Array(a)),this.quadAttribs(this.shopProg),this.shopCount=a.length/8,e.bindVertexArray(null)),this.cellVao=e.createVertexArray(),e.bindVertexArray(this.cellVao),this.cellBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.cellBuf),e.bufferData(e.ARRAY_BUFFER,32,e.DYNAMIC_DRAW),this.quadAttribs(this.cellProg),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null)}quadAttribs(e){let t=this.gl;for(let[n,r]of[[`a_quad`,0],[`a_dim`,16]]){let i=t.getAttribLocation(e,n);t.enableVertexAttribArray(i),t.vertexAttribPointer(i,4,t.FLOAT,!1,32,r),t.vertexAttribDivisor(i,1)}}static shownAt(e){return e>=13}zoom=0;draw(e,t,n,r){if(this.zoom=r,!this.fillCount||!this.fillVao||!this.edgeVao||r<13)return;let i=this.gl,a=Math.min(1,(r-13)/1);i.useProgram(this.fillProg),R(i,this.fu,e),i.uniform3fv(this.fu.u_rgb,yl),i.uniform1f(this.fu.u_alpha,a*(r<hl?.6:1)),i.bindVertexArray(this.fillVao),i.drawElements(i.TRIANGLES,this.fillCount,i.UNSIGNED_INT,0);let o=Pl(gl,r);this.shopCount&&this.shopVao&&o>0&&(i.useProgram(this.shopProg),R(i,this.su,e),i.uniform2f(this.su.u_viewport,t[0],t[1]),i.uniform3fv(this.su.u_fill,this.shopColours),i.uniform1f(this.su.u_alpha,o),i.uniform1f(this.su.u_glyph,Pl(_l,r)),i.uniform1f(this.su.u_dpr,n),i.bindVertexArray(this.shopVao),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,4,this.shopCount)),i.useProgram(this.edgeProg),R(i,this.eu,e),i.uniform2f(this.eu.u_viewport,t[0],t[1]),i.uniform1f(this.eu.u_half,bl()*Sn(r)*n/2),i.uniform3fv(this.eu.u_rgb,z(Hs().stationInk)),i.uniform1f(this.eu.u_alpha,a),i.bindVertexArray(this.edgeVao),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,4,this.edgeCount),i.bindVertexArray(null)}markStencil(e){if(!this.markCount||!this.fillVao)return!1;let t=this.gl;return t.enable(t.STENCIL_TEST),t.stencilMask(128),t.stencilFunc(t.ALWAYS,128,128),t.stencilOp(t.KEEP,t.KEEP,t.REPLACE),t.colorMask(!1,!1,!1,!1),t.useProgram(this.fillProg),R(t,this.fu,e),t.uniform3fv(this.fu.u_rgb,yl),t.uniform1f(this.fu.u_alpha,1),t.bindVertexArray(this.fillVao),t.drawElements(t.TRIANGLES,this.markCount,t.UNSIGNED_INT,0),t.bindVertexArray(null),t.colorMask(!0,!0,!0,!0),t.stencilMask(255),t.disable(t.STENCIL_TEST),!0}drawHall(e,t,n,r,i){let a=!!i&&r>=hl;if(Il(a?i:null),!a||!this.cellVao||!this.cellBuf)return;let o=i.map(e=>`${e.id}:${Math.round(e.waiting)}:${+!!e.full}:${[...e.spill].join(`,`)}`).join(`|`);if(o!==this.hallKey){this.hallKey=o;let e=[],t=new Map(i.map(e=>[e.id,e]));for(let n of this.drawn){let r=t.get(n.id),i=n.cells,a=i.length/4;if(!r||r.waiting<1||!a||!n.room)continue;let o=Math.min(a,Math.max(1,Math.round(a*r.waiting/n.room))),s=[];for(let e=0;e<a;e++)r.spill.has(i[e*4+2])&&s.push(e);for(let e=0;e<a&&s.length<o;e++)r.spill.has(i[e*4+2])||s.push(e);let c=2*n.perM;for(let t=0;t<o&&t<s.length;t++){let a=s[t]*4;e.push(i[a],i[a+1],n.ux*c,n.uy*c,c,+!!r.full,0,0)}}if(this.cellCount=e.length/8,this.cellCount){let t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.cellBuf),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.DYNAMIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null)}}if(!this.cellCount)return;let s=this.gl,c=Hs();s.useProgram(this.cellProg),R(s,this.cu,e),s.uniform2f(this.cu.u_viewport,t[0],t[1]),s.uniform3fv(this.cu.u_rgb,z(c.walkers)),s.uniform3fv(this.cu.u_bad,z(Ee)),s.uniform1f(this.cu.u_dpr,n),s.uniform1f(this.cu.u_alpha,1),s.bindVertexArray(this.cellVao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,4,this.cellCount),s.bindVertexArray(null)}drawSelected(e,t,n,r,i,a){if(!e.size||i<hl||this.off)return;let o=this.gl,s=n[0]/r,c=n[1]/r,l=this.xu,u=bl()*Sn(i)/2,d=u+2+6+1;for(let i of this.drawn){if(!i.members.some(t=>e.has(t)))continue;let f=Math.min(xl,i.corners.length/2),p=1/0,m=1/0,h=-1/0,g=-1/0;for(let e=0;e<f;e++){let[n,r]=t(i.corners[2*e],i.corners[2*e+1]);if(!Number.isFinite(n+r))return;this.selPts[2*e]=n,this.selPts[2*e+1]=r,p=Math.min(p,n),h=Math.max(h,n),m=Math.min(m,r),g=Math.max(g,r)}p=Math.max(0,p-d),m=Math.max(0,m-d),h=Math.min(s,h+d),g=Math.min(c,g+d),!(h<=p||g<=m)&&(o.useProgram(this.selProg),o.uniform4f(l.u_bbox,p,m,h,g),o.uniform2f(l.u_css,s,c),o.uniform2fv(l.u_pts,this.selPts),o.uniform1i(l.u_n,f),o.uniform1f(l.u_dpr,r),o.uniform1f(l.u_height,n[1]),o.uniform3fv(l.u_ink,a),o.uniform1f(l.u_rim,u),o.uniform1f(l.u_outline,2),o.uniform1f(l.u_glow,6),o.drawArrays(o.TRIANGLE_STRIP,0,4))}}};function Pl([e,t],n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var Fl=``;function Il(e){let t=e?e.map(e=>`${e.id}:${Math.round(e.waiting)}`).join(`,`):``;t!==Fl&&(Fl=t,ul.value=new Map((e??[]).map(e=>[e.id,Math.round(e.waiting)])))}var Ll=new Float64Array(6);function Rl(e,t,n){let r=e.camMatrix;if(!r)return null;let i=0,a=0;if(e.globe){let r=e.screenToLocal(t,n);if(!r)return null;[i,a]=r}else if(r[3]!==0||r[7]!==0)return null;let o=1e3,s=Ll;e.toScreenInto(i,a,s,0),e.toScreenInto(i+o,a,s,2),e.toScreenInto(i,a+o,s,4);let c=(s[2]-s[0])/o,l=(s[3]-s[1])/o,u=(s[4]-s[0])/o,d=(s[5]-s[1])/o,f=c*d-u*l,p=Math.min(Math.hypot(c,l),Math.hypot(u,d));if(!f||!Number.isFinite(f)||!(p>0))return null;let m=t-s[0],h=n-s[1];return[i+(d*m-u*h)/f,a+(c*h-l*m)/f,1.25/p]}var zl=new WeakMap,Bl=new Int32Array(1024),Vl=new WeakMap,Hl=new Uint8Array,Ul=new WeakMap;function Wl(e,t,n=!1){let r=t.patch;if(e&&r&&e.serial===r.base)for(let[i,a,o,s]of[[`track`,e.track,t.track,r.track],[`lines`,e.lines,t.lines,r.lines]])on(`net.grids.`+i,()=>{let e=zl.get(a.seg);if(!e||e.count!==a.count||zl.has(o.seg))return;let t=o.seg,r=bn.carried(e.levels,s,()=>t,o.count);zl.set(t,{count:o.count,levels:r});let c=n?r.verify():[];c.length&&console.error(`T-1030 check: the ${i} pick grid carried over differs from one built anew at ${c.join(`, `)}`)})}function Gl(e,t,n,r,i){let a=Vl.get(e);if(a&&a.count===t&&a.lx===n&&a.ly===r&&a.reach===i)return Bl.length<a.m&&(Bl=new Int32Array(a.idx.length)),Bl.set(a.idx.subarray(0,a.m)),a.m;let o=zl.get(e);(!o||o.count!==t)&&zl.set(e,o={count:t,levels:new bn(()=>e,t)});let s=o.levels,c=on(`pick.level`,()=>s.for(i));if(!c)return-1;let l=0;c.near(n,r,i,e=>{if(l===Bl.length){let e=new Int32Array(Bl.length*2);e.set(Bl),Bl=e}Bl[l++]=e});let u=0;if(l*32>t){Hl.length<t&&(Hl=new Uint8Array(t));for(let e=0;e<l;e++)Hl[Bl[e]]=1;for(let e=t-1;e>=0;e--)Hl[e]&&(Hl[e]=0,Bl[u++]=e)}else{let e=Bl.subarray(0,l).sort().reverse();for(let t=0;t<l;t++)(!u||e[t]!==e[u-1])&&(e[u++]=e[t])}return Vl.set(e,{count:t,lx:n,ly:r,reach:i,m:u,idx:Bl.slice(0,u)}),u}var Kl=16/32767,ql=64/32767,Jl=new WeakMap;function Yl(e,t,n,r,i,a,o,s=0,c,l,u=0,d){let f=Math.sqrt(a),p=Ll,m=Rl(e,r,i);if(!m&&e.globe)return[-1,a];let h=m?m[0]:0,g=m?m[1]:0,_=m?m[2]:0,v=o&&s>0&&o.length>=n*6?o:null,y=v?e.renderer.bandMPx:0,b=0;if(v){let e=Jl.get(v);if(!e){let t=0,n=0;for(let e=0;e<v.length;e+=6)t=Math.max(t,Math.abs(v[e]),Math.abs(v[e+1])),n=Math.max(n,Math.abs(v[e+4]),Math.abs(v[e+5]));Jl.set(v,e=[t*Kl,n*ql])}b=e[0]+e[1]*y/s}let x=null,S=0,C=Zs.get(t),w=-1,T=1/0;if(d)x=d,S=d.length;else if(m){let e=0;if(l&&u){let t=Ul.get(l);if(t!==void 0)e=t;else{for(let t=0;t<l.length;t++)l[t]>e&&(e=l[t]);Ul.set(l,e)}}S=Gl(t,n,h,g,(Math.max(f,.5*e*u)+b*s+1)*_),S>=0&&(x=Bl)}for(let o=x?0:n-1,d=x?S:-1;o!==d;o+=x?1:-1){let n=x?x[o]:o;if(c&&!c(n)||C?.(n))continue;let d=l&&u?Math.max(f,.5*l[n]*u):f,b=d+1,S=v?v[n*6]*Kl*s+v[n*6+4]*ql*y:0,E=v?v[n*6+1]*Kl*s+v[n*6+5]*ql*y:0,D=Math.max(Math.abs(S),Math.abs(E));if(m){let e=(b+D)*_,r=t[n*4],i=t[n*4+1],a=t[n*4+2],o=t[n*4+3];if(r>h+e&&a>h+e||r<h-e&&a<h-e||i>g+e&&o>g+e||i<g-e&&o<g-e)continue}e.toScreenInto(t[n*4],t[n*4+1],p,0),e.toScreenInto(t[n*4+2],t[n*4+3],p,2);let O=p[0],k=p[1],A=p[2],j=p[3],M=b+D;if(O>r+M&&A>r+M||O<r-M&&A<r-M||k>i+M&&j>i+M||k<i-M&&j<i-M)continue;let N=A-O,P=j-k;if(D){let e=Math.hypot(N,P)||1;O+=P/e*S,k+=-N/e*S,A+=P/e*E,j+=-N/e*E,N=A-O,P=j-k}let ee=N*N+P*P,te=ee?Math.max(0,Math.min(1,((r-O)*N+(i-k)*P)/ee)):0,F=(O+te*N-r)**2+(k+te*P-i)**2;if(!v){if(F<Math.max(a,d*d))return[n,F];continue}let ne=.5*u*(l?l[n]:1)*(1-Math.min(1,s/Math.max(u,1e-9))*(v[n*6+2]+v[n*6+3])/65534);if(F<=ne*ne)return[n,F,!0];F<Math.max(a,d*d)&&F<T&&(w=n,T=F)}return w>=0?[w,T]:[-1,a]}function Xl(e,t,n,r,i){let a=e.renderer.net;if(!a||!e.camMatrix||!e.renderer.slotPx)return[];let o=Math.max(7,e.renderer.laneReachPx),s=o*o+1,c=a.lines,l=e.renderer.lineWidths,u=e.renderer.slotPx,d=[];r?.kind===`line`&&d.push(e=>String(c.colour[e])===r.line),e.renderer.hasBlueprint&&d.push(e=>!!(c.flags[e]&1)),d.push(()=>!0);let f=[],p=e.renderer.pickBandPx;for(let r of d)for(;f.length<i;){let[i,,a]=Yl(e,c.seg,c.count,t,n,s,e.renderer.pickBand,p,e=>r(e)&&!f.includes(String(c.colour[e])),l,u);if(i<0||p>0&&f.length>0&&!a)break;f.push(String(c.colour[i]))}if(e.renderer.buses.any&&f.length<i)for(let r of e.renderer.buses.linesAt(e,t,n,i-f.length,e=>f.includes(String(e))))f.push(String(r));return f}var Zl=16,Ql=new WeakMap;function $l(e){let t=Ql.get(e);return t||Ql.set(e,t=eu(e)),t}function eu(e){let t=e.lineTable,n=e.samples,r=t.length/4,i=e=>Math.max(1,Math.ceil((e-1)/Zl)),a=0;for(let e=0;e<r;e++)a+=i(Math.max(1,t[e*4+1]));let o=new Int32Array(r+1),s=new Float32Array(a*4),c=0;for(let i=0;i<r;i++){o[i]=c;let r=t[i*4],a=Math.max(1,t[i*4+1]);for(let t=0;t===0||t*Zl<a-1;t++){let i=1/0,o=1/0,l=-1/0,u=-1/0;for(let s=t*Zl;s<=Math.min(a-1,(t+1)*Zl);s++){let t=n[(r+s)*2],c=n[(r+s)*2+1];t<i&&(i=t),t>l&&(l=t),c<o&&(o=c),c>u&&(u=c);let d=s<a-1?e.sampleBend?.[r+s]??0:0,f=d%32,p=(d-f)/32;for(let a=1;a<=f&&e.bends;a++){let d=a/(f+1),m=t+(n[(r+s+1)*2]-t)*d+e.bends[(p+a-1)*2],h=c+(n[(r+s+1)*2+1]-c)*d+e.bends[(p+a-1)*2+1];m<i&&(i=m),m>l&&(l=m),h<o&&(o=h),h>u&&(u=h)}}s[c*4]=i,s[c*4+1]=o,s[c*4+2]=l,s[c*4+3]=u,c++}}return o[r]=c,{first:o,box:s,mark:new Uint8Array(c)}}function tu(e,t,n,r){let i=$l(e),a=i.box,o=i.mark;for(let e=0;e<o.length;e++)o[e]=+(a[e*4]-r<=t&&a[e*4+2]+r>=t&&a[e*4+1]-r<=n&&a[e*4+3]+r>=n);return i}function nu(e,t,n,r,i){let a=i-r;if(a<0||!e.meta[n*4+1])return!1;let o=D(n);if(o*4+3>=e.lineTable.length)return!0;let{geo:s,d:c}=Yt(e,n,je(e,n,a)),l=e.lineTable[s*4+1],u=e.lineTable[s*4+2],d=e.lineTable[s*4+3],f=t.first[s],p=t.first[s+1]-f;if(!(d>0)||l<2)return t.mark[f]===1;let m=Math.max(1,qe(e.lineCars?.[o]??8))*20+30,h=e=>Math.min(p-1,Math.floor(Math.min(Math.floor(Math.max(0,Math.min(u,e))/d),l-2)/Zl));for(let e=h(c-m),n=h(c+m);e<=n;e++)if(t.mark[f+e])return!0;return!1}var ru=new WeakMap;function iu(e){let t=ru.get(e.flags);if(t)return t;let n=[];for(let t=e.count-1;t>=0;t--)e.flags[t]&1&&n.push(t);return ru.set(e.flags,t=Int32Array.from(n)),t}function au(e,t,n){let r=e.renderer.net;if(!r||!e.camMatrix)return-1;let i=Math.max(7,e.renderer.laneReachPx),a=i*i+1,[o]=e.renderer.hasBlueprint?Yl(e,r.track.seg,r.track.count,t,n,a,void 0,0,void 0,null,0,iu(r.track)):[-1];return o<0&&([o]=Yl(e,r.track.seg,r.track.count,t,n,a)),o>=0?r.track.edge[o]:-1}function ou(e,t,n,r,i){let a=t.lines,o=[];for(let t=0;t<16;t++){let[t,s]=Yl(e,a.seg,a.count,n,r,i,e.renderer.pickBand,e.renderer.pickBandPx,e=>!o.some(t=>t.num===a.colour[e]),e.renderer.lineWidths,e.renderer.slotPx);if(t<0)break;o.push({num:a.colour[t],i:t,d:s})}return o}function su(e,t){let n=e.map(e=>({...e,r:Math.sqrt(e.d),s:t?t(e.num,e.i):0})).sort((e,t)=>e.r-t.r||e.num-t.num),r=[];for(let e=0;e<n.length;){let t=e+1;for(;t<n.length&&n[t].r-n[e].r<=2;)t++;r.push(...n.slice(e,t).sort((e,t)=>t.s-e.s||e.num-t.num)),e=t}return r}var cu=null,lu=6;function uu(e,t,n,r,i,a,o){let s=cu&&cu.net===t?e.toScreen(cu.x,cu.y):null,c=s&&Math.hypot(n-s[0],r-s[1])<=lu?cu:null,l=c?a?.kind===`line`?c.order.findIndex(e=>String(e.num)===a.line):a?.kind===`track`&&a.edge===c.edge?c.order.length:-1:-1;if(c&&l>=0){let e=(l+1)%(c.order.length+ +(c.edge>=0));return e===c.order.length?{kind:`track`,edge:c.edge}:{kind:`line`,line:String(c.order[e].num)}}let u=su(ou(e,t,n,r,i),o),d=u.map(({num:e,i:t})=>({num:e,i:t}));if(e.renderer.busesShown)for(let t of e.renderer.buses.linesAt(e,n,r,16,e=>d.some(t=>t.num===e)))d.push({num:t,i:-1});if(d.length>1){let i=e.screenToLocal(n,r);cu=i?{net:t,x:i[0],y:i[1],order:d,edge:u.length?t.lines.edge[u[0].i]:-1}:null;let o=a?.kind===`line`?d.findIndex(e=>String(e.num)===a.line):-1;return{kind:`line`,line:String(d[+(o===0)].num)}}cu=null}function du(e,t,n,r,i=null,a=!1,o){let s=e.renderer.net;if(!s||!e.camMatrix)return null;let c=Math.max(7,e.renderer.laneReachPx),l=c*c+1,u=e.renderer.stationAt(t,n,(t,n)=>e.toScreen(t,n),7);if(u>=0){let r=s.stationIds[u];if(a&&i?.kind===`station`&&i.station===r){let[i]=Yl(e,s.track.seg,s.track.count,t,n,l),a=i>=0?s.track.edge[i]:-1;if(a>=0&&!U.peek()?.edges.some(e=>e.id===a&&(String(e.a)===r||String(e.b)===r)))return{kind:`track`,edge:a}}return{kind:`station`,station:r}}if(r&&!e.renderer.trainsHidden){let r=Xt.now(),a=e.renderer,o=a.trips,c=i?.kind===`train`?a.tripIndex(i.profile,i.dep-a.tripsEpoch):-1,l=Rl(e,t,n),u=l?tu(s,l[0],l[1],(Math.sqrt(50)+1)*l[2]+3*a.laneShiftM+a.passShiftM+a.bandReach*a.bandShiftM+32*a.bandOn+1):null;for(let i=a.tripCount-(c>=0?0:1);i>=0;i--){let l=i===a.tripCount?c:i;if(i<a.tripCount&&l===c)continue;let d=o[l*2],f=o[l*2+1]+a.tripsEpoch,p=f+a.tripLag(l);if(u&&!nu(s,u,d,p,r)||q.lines.has(D(d)))continue;let m=Cn(s,d,p,r,a.tripEnds?a.tripEnds[l]+a.tripsEpoch:-1/0,a.laneShiftM,a.bandShiftM,a.sampleBand,a.bandOn,a.passShiftM,a.tripBays??void 0,l*4);if(!m||a.tripOnOffLevel(m))continue;if(a.detailedTrains){let r=Math.max(1,qe(s.lineCars?.[m.line]??8));for(let i=0;i<r;i++){let r=xt(s,m,i),[a,o]=e.toScreen(...r.back),[c,l]=e.toScreen(...r.front),u=c-a,p=l-o,h=Math.hypot(u,p)||1,g=Math.max(0,Math.min(1,((t-a)*u+(n-o)*p)/(h*h)));if((a+g*u-t)**2+(o+g*p-n)**2<50)return{kind:`train`,line:String(m.line),profile:d,dep:f}}continue}let[h,g]=e.toScreen(m.x,m.y);if((h-t)**2+(g-n)**2<50)return{kind:`train`,line:String(m.line),profile:d,dep:f}}}let d=e.renderer.lineWidths,f=e.renderer.slotPx,p=e.renderer.pickBandPx,m=e.renderer.pickBand,[h,,g]=e.renderer.slotPx&&i?.kind===`line`?Yl(e,s.lines.seg,s.lines.count,t,n,l,m,p,e=>String(s.lines.colour[e])===i.line,d,f):[-1,0],_=e.renderer.hasBlueprint,v=p>0&&!g?-1:h;if(v<0&&_&&e.renderer.slotPx&&([v]=Yl(e,s.lines.seg,s.lines.count,t,n,l,m,p,void 0,d,f,iu(s.lines))),v<0&&_){let[r]=Yl(e,s.track.seg,s.track.count,t,n,l,void 0,0,void 0,null,0,iu(s.track));if(r>=0)return{kind:`track`,edge:s.track.edge[r]}}v<0&&e.renderer.slotPx&&([v]=Yl(e,s.lines.seg,s.lines.count,t,n,l,m,p,void 0,d,f));let y=v>=0?String(s.lines.colour[v]):null;if(y&&a){let r=uu(e,s,t,n,l,i,o);if(r)return r}if(y&&(i?.kind!==`line`||i.line!==y))return{kind:`line`,line:y};for(let r=s.junctionIds.length-1;r>=0;r--){if(q.levels){let e=q.nodeLevel(s.junctionIds[r]);if(e!==void 0&&Ys(e))continue}if(e.toScreenInto(s.junctions[r*2],s.junctions[r*2+1],Ll,0),(Ll[0]-t)**2+(Ll[1]-n)**2<50)return{kind:`junction`,node:s.junctionIds[r]}}let[b]=Yl(e,s.track.seg,s.track.count,t,n,l);if(b>=0)return{kind:`track`,edge:s.track.edge[b]};if(e.renderer.busesShown){let r=fu(e,t,n);if(r)return r;let c=e.renderer.buses.lineAt(e,t,n);if(c>=0)return a&&uu(e,s,t,n,l,i,o)||{kind:`line`,line:String(c)}}if(y)return{kind:`line`,line:y};let x=e.renderer.lotAt(t,n,(t,n)=>e.toScreen(t,n));if(x>=0)return{kind:`station`,station:s.stationIds[e.renderer.lots.lots[x*10+8]]};let S=Ml(e,t,n),C=S&&dl.peek().get(S.id)?.[0];return C?{kind:`station`,station:C}:null}function fu(e,t,n){let r=e.renderer.buses.stopAt(e,t,n),i=U.peek();if(!r||r.id===void 0||r.id<0||!i)return null;let a=i.save.lines.find(e=>e.num===r.line),o=a&&i.lineStats[a.id]?.bus?.stops.find(e=>e.id===r.id);return o?o.station>=0?i.save.stations.some(e=>e.id===String(o.station))?{kind:`station`,station:String(o.station)}:null:{kind:`busStop`,stop:String(o.id),at:[o.lng,o.lat]}:null}function pu(e,t,n,r){let i=e.toScreen(t,n),a=e.toScreen(t+10*Math.cos(r),n-10*Math.sin(r)),o=a[0]-i[0],s=a[1]-i[1];return o||s?Math.atan2(s,o)*180/Math.PI:null}function mu(e){return e===null?``:`linear-gradient(${(e+(Ln.peek()?180:0)).toFixed(1)}deg, #fff 50%, var(--c) 50%)`}function hu(e){let t=e*Math.PI/180,n=Ln.peek()?1:-1,r=-Math.sin(t)*n,i=Math.cos(t)*n;return{x1:.5-.5*r,y1:.5-.5*i,x2:.5+.5*r,y2:.5+.5*i}}var gu=class{moving;at=0;constructor(e){this.moving=e}due(){return!this.moving()||performance.now()-this.at>=100}done(){this.at=performance.now()}},_u=class{crowds;dotCrowds;wait;dotWait;placed=null;hall=[];memberOf=null;at={t:NaN,board:null};any=!1;constructor(e){let t=Math.max(1,e);this.crowds=new Float32Array(t*4),this.wait=new Float32Array(t*2),this.dotCrowds=new Float32Array(t*2),this.dotWait=new Float32Array(t)}get stationOfQueue(){return this.placed?.station??null}update(e,t,n,r){if((!this.placed||this.placed.board!==t||this.placed.net!==e)&&(this.placed=vu(e,t)),this.at.board===t&&Math.abs(n-this.at.t)<1)return this.any;let i=this.crowds,a=this.wait;i.fill(0),a.fill(0);let{station:o,side:s,sides:c}=this.placed,l=!1;for(let e=0;e<t.queueCount;e++){let r=o[e];if(r<0)continue;let i=me(t,e,n),c=s[e]>0?0:1;a[r*2+c]+=i,i>=1&&(l=!0)}let u=e.buildings??[],d=this.membersOf(e),f=u.map(e=>({id:e.id,waiting:0,full:!1,spill:new Set,room:e.room,members:e.members.length})),p=t=>c[t]===3?jn(e.stationLength?.[t]??0):2*jn(e.stationLength?.[t]??0);for(let t=0;t<e.stationCount;t++){let e=d[t];if(e<0||!c[t])continue;let n=p(t),r=c[t]===3?Math.max(0,a[t*2]-n)+Math.max(0,a[t*2+1]-n):Math.max(0,a[t*2]+a[t*2+1]-n);r>0&&(f[e].waiting+=r,f[e].spill.add(t))}for(let e of f)e.full=e.waiting>=e.room;this.hall=f;for(let t=0;t<e.stationCount;t++){if(!c[t])continue;let n=jn(e.stationLength?.[t]??0),r=d[t]>=0?f[d[t]].full:!0;if(c[t]===3)i[t*4]=Math.min(1,a[t*2]/n),i[t*4+1]=Math.min(1,a[t*2+1]/n),i[t*4+2]=i[t*4]>=1&&r?1:0,i[t*4+3]=i[t*4+1]>=1&&r?1:0;else{let e=Math.min(1,(a[t*2]+a[t*2+1])/(2*n)),o=e>=1&&r?1:0;i.set([e,e,o,o],t*4)}}let m=this.dotCrowds,h=this.dotWait;m.fill(0),h.fill(0);for(let t=0;t<e.stationCount;t++){if(!c[t])continue;let n=d[t];if(n>=0){let r=f[n].room/Math.max(1,f[n].members),o=c[t]===3?Math.max(a[t*2],a[t*2+1]):(a[t*2]+a[t*2+1])/2;m[t*2]=Math.min(1,o/(jn(e.stationLength?.[t]??0)+r)),(i[t*4+2]>0||i[t*4+3]>0)&&(m[t*2+1]=1)}else m[t*2]=Math.max(i[t*4],i[t*4+1]),(i[t*4+2]>0||i[t*4+3]>0)&&(m[t*2+1]=1);h[t]=a[t*2]+a[t*2+1]}return r(i,m),this.at={t:n,board:t},this.any=l,l}membersOf(e){if(this.memberOf?.net===e)return this.memberOf.of;let t=new Int32Array(Math.max(1,e.stationCount)).fill(-1);return(e.buildings??[]).forEach((e,n)=>{for(let r of e.members)t[r]=n}),this.memberOf={net:e,of:t},t}queueShare(e,t){let n=this.placed;return!n||n.net!==t||e<0||e>=n.station.length||n.station[e]<0?null:this.crowds[n.station[e]*4+(n.side[e]>0?0:1)]}dot(e){return e<0||e>=this.dotWait.length?null:{waiting:this.dotWait[e],share:this.dotCrowds[e*2]}}};function vu(e,t){let n=new Map;e.stationIds.forEach((e,t)=>n.set(Number(e),t));let r=new Int32Array(t.queueCount),i=new Int8Array(t.queueCount),a=new Uint8Array(Math.max(1,e.stationCount));for(let o=0;o<t.queueCount;o++){let s=o*12,c=n.get(t.queues[s])??-1;if(r[o]=c,c<0)continue;let l=t.queues[s+1],u=t.queues[s+2],d=t.queues[s+3],[f,p]=ln(e,l,d-5),[m,h]=ln(e,l,d+5),g=((m-f)*(e.stationAxis?.[c*2]??1)+(h-p)*(e.stationAxis?.[c*2+1]??0))*(u===1?-1:1)*(e.keep??1);i[o]=g>=0?1:-1,a[c]|=i[o]>0?1:2}return{station:r,side:i,sides:a,board:t,net:e}}var yu=8,bu=.35,xu=1.3,Su=1,Cu=`#version 300 es
precision highp float;
${V}
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
  v_r = u_r * clamp(sqrt(a_when.z / ${250 .toFixed(1)}), ${bu.toFixed(2)}, ${xu.toFixed(2)});
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  v_p = corner * (v_r + 1.5);
  vec4 c = project(at);
  c.xy += v_p / (u_viewport * 0.5) * c.w;
  gl_Position = c;
}`,wu=`#version 300 es
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
}`,Tu=class{gl;prog=null;u={};vao=null;pathBuf=null;whenBuf=null;count=0;data=new Float32Array;src={board:null,net:null};buildMs=0;init(e){if(this.gl=e,this.prog=Pt(e,Cu,wu,`transfer bubbles`),this.prog){this.u=W(e,this.prog,[...H,`u_viewport`,`u_time`,`u_r`,`u_fill`,`u_rim`,`u_rim_px`]),this.vao=e.createVertexArray(),this.pathBuf=e.createBuffer(),this.whenBuf=e.createBuffer(),e.bindVertexArray(this.vao);for(let[t,n]of[[`a_path`,this.pathBuf],[`a_when`,this.whenBuf]]){let r=e.getAttribLocation(this.prog,t);r<0||(e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array(4),e.DYNAMIC_DRAW),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,4,e.FLOAT,!1,0,0),e.vertexAttribDivisor(r,1))}e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null)}}sync(e,t,n){if(e===this.src.board&&t===this.src.net)return;this.src={board:e,net:t};let r=performance.now(),i=0,a=new Float32Array,o=new Float32Array(4),s=new Float32Array(4);if(e&&t&&n&&e.pulseFrom.length===e.pulses.length){let r=new Map;t.stationIds.forEach((e,t)=>r.set(Number(e),t));let c=t.stations,l=t.stationShape,u=e=>c[e*3]+(l?.[e*4]??0),d=e=>c[e*3+1]+(l?.[e*4+1]??0),f=e.pulses,p=e.pulseFrom,m=e.queues,h=new Int32Array(f.length/2).fill(-1);for(let t=0;t<e.queueCount;t++){let e=n[t];if(e<0)continue;let a=t*12,o=m[a+10],s=o+m[a+11];for(let t=o;t<s;t++){if(!(p[t*2+1]>=Su)||!(f[t*2+1]>=1))continue;let n=r.get(p[t*2]);n!==void 0&&n!==e&&(h[t]=n,i++)}}a=new Float32Array(i*yu),o=new Float32Array(Math.max(1,i)*4),s=new Float32Array(Math.max(1,i)*4);let g=0;for(let t=0;t<e.queueCount;t++){let e=n[t];if(e<0)continue;let r=t*12,i=m[r+10],c=i+m[r+11];for(let t=i;t<c;t++){let n=h[t];if(n<0)continue;let i=p[t*2+1],c=g*yu,l=g*4;a[c]=o[l]=u(n),a[c+1]=o[l+1]=d(n),a[c+2]=o[l+2]=u(e),a[c+3]=o[l+3]=d(e),a[c+4]=s[l]=f[t*2]-i,a[c+5]=s[l+1]=f[t*2],a[c+6]=s[l+2]=f[t*2+1],a[c+7]=s[l+3]=m[r+1],g++}}}this.data=a,this.count=i;let c=this.gl;c&&this.pathBuf&&this.whenBuf&&(c.bindBuffer(c.ARRAY_BUFFER,this.pathBuf),c.bufferData(c.ARRAY_BUFFER,o,c.DYNAMIC_DRAW),c.bindBuffer(c.ARRAY_BUFFER,this.whenBuf),c.bufferData(c.ARRAY_BUFFER,s,c.DYNAMIC_DRAW),c.bindBuffer(c.ARRAY_BUFFER,null)),this.buildMs=performance.now()-r}get size(){return this.count}draw(e,t,n,r,i,a,o){if(!this.count||!this.prog)return;let s=this.gl,c=this.u;s.useProgram(this.prog),R(s,c,e),s.uniform2f(c.u_viewport,t[0],t[1]),s.uniform1f(c.u_time,n),s.uniform1f(c.u_r,r),s.uniform3fv(c.u_fill,i),s.uniform3fv(c.u_rim,a),s.uniform1f(c.u_rim_px,o),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,4,this.count),s.bindVertexArray(null),this.last={m:Array.from(e.m),t:n,r,w:t[0],h:t[1]}}last=null;hide(){this.last=null}at(e,t){let n=this.last,r=this.data;if(!n||!this.count)return null;let i=n.m,a=e*n.w,o=t*n.h,s=null,c=1/0;for(let e=0;e<this.count;e++){let t=e*yu,l=r[t+4],u=r[t+5];if(!(n.t>=l&&n.t<u))continue;let d=(n.t-l)/(u-l),f=r[t]+(r[t+2]-r[t])*d,p=r[t+1]+(r[t+3]-r[t+1])*d,m=i[0]*f+i[4]*p+i[12],h=i[1]*f+i[5]*p+i[13],g=i[3]*f+i[7]*p+i[15],_=(m/g+1)/2*n.w,v=(1-h/g)/2*n.h,y=n.r*Math.max(bu,Math.min(xu,Math.sqrt(r[t+6]/250)))+2,b=Math.hypot(_-a,v-o);b<=y&&b<c&&(c=b,s={riders:r[t+6],line:r[t+7]})}return s}},Eu=.45,Du=1.4,Ou=.6,ku=.75,Au=1,ju=.3,Mu=16,Nu=1.15,Pu=1.5,Fu=2.6,Iu=1,Lu=2,Ru=4,zu=3.2,Bu=.6,Vu=8,Hu=16,Uu=.4,Wu=`0.3`,Gu=1.5,Ku=4.5,qu=.5,Ju=16,Yu=32,Xu=`vec3(0.663, 0.804, 0.953)`,Zu=12,Qu=4,$u=1.5,ed=64,td=128,nd=1,rd=1,id=5,ad=40,od=.8,sd=3,cd=50,ld=9,ud=`#version 300 es
precision highp float;
precision highp int;
${V}
uniform vec2 u_viewport;
uniform float u_width;       // device px across (the corridor's edge in pass 2)
uniform float u_add;         // the casing beyond the line, device px (pass 0)
uniform float u_extra;       // added to the selected line
uniform int u_pass;          // 0 casing, 1 colour, 2 corridor outline (drawn three times, see draw())
uniform int u_sel;
uniform int u_hot;
uniform int u_lit[${Mu}];   // T-2993: lines the bus tool's route will change with, u_lit_n of them
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
uniform int u_lit_links[${Ju}]; // T-3890: the connectors lit (a transfer line's place in linkStops, its a_info.z)
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
  bool bp = (flags & ${Iu}) != 0;
  bool mute = (flags & ${Hu}) != 0;
  bool sel = id == u_sel && !mute;
  bool lit = false;
  for (int k = 0; k < ${Mu}; k++) if (k < u_lit_n && u_lit[k] == id) lit = true;
  bool xfer = (flags & ${Vu}) != 0;
  bool lane = (flags & ${ed}) != 0;
  if ((u_only >= 0 && id != u_only) || (u_only == -2 && (!sel || xfer)) || (u_only == -3 && !xfer) || (xfer && u_only != -3) || (u_pass == 2 && (flags & 30) != 0)
      || (xfer && (u_pass != 1 || u_xfer < 0.5)) || (u_no_bp == 1 && bp) || (lane != (u_pass == 5)) || (lane && u_lane_kind != (!bp ? 1 : (flags & ${td}) != 0 ? 2 : 0))) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  bool hotLink = false;
  if (xfer && a_info.z >= 0.0) for (int k = 0; k < ${Ju}; k++) if (k < u_lit_links_n && u_lit_links[k] == int(a_info.z + 0.5)) hotLink = true;
  bool paint = u_pass == 1 && !bp && !xfer && !mute;
  float p = paint && a_col >= 0.0 ? a_col : a_info.z;
  vec3 own = vec3(floor(p / 65536.0), mod(floor(p / 256.0), 256.0), mod(p, 256.0)) / 255.0;
  vec3 col = mute ? mix(own, u_xfer_rgb, ${Wu}) : paint && a_col < -1.5 ? u_track_rgb : own;
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
  v_period = lane ? u_lane_period : xfer ? max(${Ku.toFixed(1)} * w, 5.0) : max(${zu.toFixed(1)} * w, 6.0);
  v_dash = (u_pass == 1 && (flags & 10) != 0) || (lane && (!bp || (flags & ${td}) != 0)) ? a_info.w * u_px_per_unit + ua : -1.0;
  v_alpha = faint * (u_pass == 2 ? u_alpha : (sel ? 1.0 : mute ? ${Uu} : u_dim)) * (xfer ? (hotLink ? 1.0 : u_xfer_alpha) : 1.0);
  v_edge = lane && u_lane_kind == 0 ? u_lane_edge : 0.0;
  if (lane) v_color = u_lane_kind == 0 ? ${Xu} : u_lane_kind == 2 ? u_rail_rgb : u_lane_rgb;
  else if (u_pass == 0) v_color = bp ? u_rail_rgb : u_casing_rgb;
  else if (xfer) v_color = u_xfer_rgb;
  else {
    v_color = col;
    if (u_pass == 1) {
      if (bp) v_color = mix(v_color, vec3(1.0), 0.45);
      if (id == u_hot || lit) v_color = mix(v_color, vec3(1.0), ${ju});
    }
  }
}`,dd=`#version 300 es
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
    float f = mod(v_dash, v_period), on = ${Bu.toFixed(2)} * v_period;
    a *= clamp(min(f, on - f) + 0.5, 0.0, 1.0);
  }
  if (a <= 0.0) discard;   // the stencil passes must not mark a cap's empty corners
  vec3 col = v_color;
  // T-3944: the new lanes' band takes the rail's colour along its outer edge
  if (v_edge > 0.0) col = mix(col, u_rail_rgb, clamp((past > 0.0 ? length(vec2(past, v_cap.z)) : abs(v_cap.z)) - (v_cap.w - v_edge) + 0.5, 0.0, 1.0));
  o = vec4(col * a, a);
}`,fd=`#version 300 es
precision highp float;
${V}
uniform vec2 u_viewport;
uniform vec2 u_r;            // a ring's outer radius and an end's half side, device px
uniform vec3 u_rail_rgb;
uniform float u_rings;       // 0: the ends only
uniform float u_keep;        // T-3297: 1 where buses keep right, -1 left
uniform int u_lit_stops[${Yu}]; // T-3890: the stops lit (their places in the stops' buffer), u_lit_stops_n of them
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
  for (int k = 0; k < ${Yu}; k++) if (k < u_lit_stops_n && u_lit_stops[k] == gl_InstanceID + u_base) v_color = mix(v_color, vec3(1.0), ${ju});
}`,pd=`#version 300 es
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
}`,md=`#version 300 es
precision highp float;
${V}
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
  if (id == u_hot) col = mix(col, vec3(1.0), ${ju});
  v_color = col;
  v_alpha = id == u_sel ? 1.0 : u_dim;
}`,hd=`#version 300 es
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
}`,gd=.45,_d=e=>{let[t,n,r]=yn(e);return t*65536+n*256+r},vd=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),yd=(e,t)=>e===t||e.size===t.size&&[...e].every(e=>t.has(e)),bd=null;function xd(e){let t=bd;if(t&&!Ct()&&t.lines.length===e.length&&t.lines.every((t,n)=>t.line===e[n].line&&t.stops===e[n].stops))return t.out;let n=ut(e);return bd={lines:e.map(e=>({line:e.line,stops:e.stops})),out:n},n}var Sd=new WeakMap;function Cd(e,t,n){let r=[],i=[],a=[],o=[];if(!n.ferry)for(let e of n.stops)r.push(e.lng,e.lat,e.kind),a.push(e.id),e.at&&(e.at[0]!==e.lng||e.at[1]!==e.lat)&&o.push(e.lng,e.lat,e.at[0],e.at[1]);for(let e of n.ferry?.ports??[])i.push(...e.landing,...e.berth);let s=n.ferry?n.ferry.ports.flatMap(e=>e.berth):n.stops.flatMap(e=>[e.lng,e.lat]),c=s.length/2,l=t.status===`running`&&Math.max(e.tph.high,e.tph.medium,e.tph.low)>0&&t.stopS.length===2&&t.stopS.every(e=>e.length===c);return{id:e.num,colour:e.colour,built:n.built,route:n.routeLL,street:n.streetLL,stops:r,stopIds:a,transfers:o,ferry:!!n.ferry,brt:!!n.brt,lanes:n.lanes??[],spurs:i,marks:s,stopS:l?t.stopS:null,oneWay:!!t.loop&&t.oneWay,ways:t.oneWayAt??{}}}var wd=class{gl=null;segProg=null;stopProg=null;su={};pu={};segVao=null;stopVao=null;stationStopVao=null;arrowProg=null;au={};arrowVao=null;arrows=0;bufs=[];lines=[];version=0;transfers=0;links=0;walks=0;linkSrc=[];byId=new Map;built=null;onGpu=null;last=null;litList=new Int32Array(Mu);init(e){this.gl=e,this.segProg=kt(e,ud,dd),this.stopProg=kt(e,fd,pd),this.su=W(e,this.segProg,[...H,`u_viewport`,`u_width`,`u_add`,`u_extra`,`u_pass`,`u_sel`,`u_hot`,`u_lit`,`u_lit_n`,`u_only`,`u_dim`,`u_alpha`,`u_casing_rgb`,`u_rail_rgb`,`u_rail`,`u_px_per_unit`,`u_track_rgb`,`u_xfer`,`u_xfer_w`,`u_xfer_rgb`,`u_xfer_alpha`,`u_lit_links`,`u_lit_links_n`,`u_lane_kind`,`u_lane_rgb`,`u_lane_period`,`u_lane_in`,`u_lane_edge`,`u_no_bp`]),this.pu=W(e,this.stopProg,[...H,`u_viewport`,`u_r`,`u_rail_rgb`,`u_rings`,`u_fill`,`u_rim`,`u_keep`,`u_lit_stops`,`u_lit_stops_n`,`u_base`,`u_no_bp`]),this.arrowProg=kt(e,md,hd),this.au=W(e,this.arrowProg,[...H,`u_viewport`,`u_size`,`u_every`,`u_m_px`,`u_clear`,`u_sel`,`u_hot`,`u_dim`,`u_casing_rgb`,`u_no_bp`]),this.arrowVao=e.createVertexArray(),this.segVao=e.createVertexArray(),this.stopVao=e.createVertexArray(),this.stationStopVao=e.createVertexArray(),this.bufs=[],this.onGpu=null}muted=-1;setMuted(e){return e!==this.muted&&(this.muted=e,this.built=null,this.version++,!0)}over=null;lastW=null;lastHide=new Set;setAhead(e){return!e&&!this.over?!1:(this.over=e,this.set(this.lastW,this.lastHide))}set(e,t=new Set){let n=this.lastW,r=this.lastHide,i=ei.peek();return this.lastW=e,this.lastHide=t,e&&n&&e!==n&&!this.over&&i===this.lastGroups&&yd(t,r)&&Bt(e)===Bt(n)&&!this.drawnChanged(n,e)?(Ct()&&this.rebuilt(e,t)&&console.error(`T-4150 check: the bus layer kept differs from a whole build`),!1):(this.lastGroups=i,this.rebuilt(e,t))}lastGroups=null;drawnChanged(e,t){let n=mt(e,t);if(!n||n.links)return!0;for(let r of n.lines)if(e.lineStats[r]?.bus||t.lineStats[r]?.bus)return!0;let r=ei.peek();for(let[e,i]of n.stations.values()){if(e?.brt||i?.brt)return!0;let n=r?.of.get((i??e).id),a=n===void 0?void 0:r.members.get(n);if(a&&a.length>1&&a.some(e=>Me(t).get(e)?.brt))return!0}return!1}rebuilt(e,t){let n=[],r=[];if(e){for(let r of e.save.lines){let i=e.lineStats[r.id],a=i?.bus;if(!a||a.routeLL.length<4||t.has(r.num))continue;let o=Sd.get(i);(!o||o.l!==r||Ct())&&Sd.set(i,o={l:r,src:Cd(r,i,a)}),n.push({...o.src,transfers:o.src.transfers.slice()})}for(let[e,r]of this.over??[]){let i=n.findIndex(t=>t.id===e),a=i>=0?n[i]:null;if(!a&&r.colour===void 0||t.has(e))continue;let o={id:e,colour:r.colour??a.colour,built:a?.built??!1,route:r.route,street:[],stops:[],stopIds:[],transfers:[],ferry:!!r.ferry||!!a?.ferry,brt:a?.brt??!1,lanes:[],spurs:r.ferry?.spurs??[],marks:r.ferry?.marks??[],stopS:null,oneWay:!1,ways:{}};i>=0?n[i]=o:n.push(o)}let i=xd(e.save.lines.flatMap(t=>{let n=e.lineStats[t.id]?.bus;return n&&!n.ferry?[{line:t.num,stops:n.stops}]:[]})),a=new Map(n.map(e=>[e.id,e]));for(let e=0;e+4<i.length;e+=5)a.get(i[e])?.transfers.push(i[e+1],i[e+2],i[e+3],i[e+4]);for(let t of Bt(e).links){let e=a.get(t.a.line),n=a.get(t.b.line);e&&n&&r.push({at:[t.a.lng,t.a.lat,t.b.lng,t.b.lat],lines:[t.a.line,t.b.line],stops:[t.a.id,t.b.id],bp:!e.built||!n.built,walk:t.walk})}for(let[t,n]of $t(e,ei.peek()?.members.values()??[]))r.push({at:[t.lng,t.lat,n.lng,n.lat],lines:[-2,-2],stops:[t.num,n.num],bp:!t.built||!n.built,walk:!0})}let i=this.lines,a=(e,t)=>e===t||!!e&&!!t&&e.length===t.length&&e.every((e,n)=>vd(e,t[n]));return this.linkSrc.length===r.length&&this.linkSrc.every((e,t)=>vd(e.at,r[t].at)&&vd(e.stops,r[t].stops)&&e.bp===r[t].bp)&&i.length===n.length&&i.every((e,t)=>{let r=n[t];return e.id===r.id&&e.route===r.route&&e.stopS===r.stopS&&e.lanes===r.lanes&&e.street===r.street&&e.stops===r.stops&&e.marks===r.marks&&e.spurs===r.spurs&&e.colour===r.colour&&e.built===r.built&&e.brt===r.brt&&e.oneWay===r.oneWay&&vd(e.transfers,r.transfers)||e.id===r.id&&e.colour===r.colour&&e.built===r.built&&e.brt===r.brt&&e.oneWay===r.oneWay&&vd(e.lanes,r.lanes)&&vd(e.route,r.route)&&vd(e.street,r.street)&&vd(e.stops,r.stops)&&vd(e.transfers,r.transfers)&&vd(e.spurs,r.spurs)&&vd(e.marks,r.marks)&&a(e.stopS,r.stopS)})?!1:(this.lines=n,this.linkSrc=r,this.links=r.filter(e=>!e.walk).length,this.walks=r.length-this.links,this.transfers=n.reduce((e,t)=>e+t.transfers.length/4,0),this.byId=new Map(n.map(e=>[e.id,e])),this.built=null,this.version++,!0)}get any(){return this.lines.length>0}has(e){return this.byId.has(e)}local(e){if(this.built&&this.built.a===e)return this.built;let t=this.linkSrc.length,n=0;for(let e of this.lines){t+=e.route.length/2-1+e.spurs.length/4+e.transfers.length/4,n+=e.street.length/2+e.stops.length/3;for(let n=0;n+1<e.lanes.length;n+=2+2*e.lanes[n+1])t+=Math.max(0,e.lanes[n+1]-1)}let r=new Float32Array(t*4),i=new Float32Array(t*4),a=[],o=[],s=[],c=[],l=[],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[],y=[],b=[],x=new Map,S=new Float64Array(t),C=new Map,w=0;for(let t of this.lines){let n=t.id===this.muted,T=_d(t.colour),E=n?Hu|(t.ferry?Lu:0):(t.built?0:Iu)|(t.ferry?Lu:0),D=t.built?0:2,O=NaN,k=NaN,A=0,j=0,M=w;for(let n=0;n+1<t.route.length;n+=2){let[a,o]=G(t.route[n],t.route[n+1],e);A+=o,n>0&&(r.set([O,k,a,o],w*4),i.set([t.id,E,T,j],w*4),S[w]=j,j+=Math.hypot(a-O,o-k),w++),O=a,k=o}C.set(t.id,[M,w-M]);for(let a=0;!n&&a+3<t.spurs.length;a+=4){let[n,o]=G(t.spurs[a],t.spurs[a+1],e),[s,c]=G(t.spurs[a+2],t.spurs[a+3],e);r.set([n,o,s,c],w*4),i.set([t.id,E&-3|Ru,T,0],w*4),w++}x.set(t.id,_e(A/(t.route.length/2),e));for(let r=0;!n&&r+1<t.street.length;r+=2){let[n,i]=G(t.street[r],t.street[r+1],e);a.push(n,i,1+D,T),s.push(t.id),p.push(-1),_.push(0,0)}for(let r=0;!n&&r+2<t.stops.length;r+=3){let n=t.stops[r+2],i=n===0||n===1&&(r===0||r+3>=t.stops.length),[x,S]=G(t.stops[r],t.stops[r+1],e),C=t.ways[String(t.stopIds[r/3])],w=!i&&C!==void 0?[Math.cos(C),-Math.sin(C)]:[0,0];i?((n===1?u:o).push(x,S,D,T),(n===1?f:c).push(t.id),(n===1?b:v).push(0,0),(n===1?g:m).push(t.stopIds[r/3])):((n===1?l:a).push(x,S,1+D,T),(n===1?d:s).push(t.id),(n===1?y:_).push(...w),(n===1?h:p).push(t.stopIds[r/3]))}}let T=w;for(let t of this.lines)for(let n=0;t.id!==this.muted&&n+3<t.transfers.length;n+=4){let[a,o]=G(t.transfers[n],t.transfers[n+1],e),[s,c]=G(t.transfers[n+2],t.transfers[n+3],e);r.set([a,o,s,c],w*4),i.set([t.id,Vu,-1,0],w*4),w++}let E=[];for(let t of this.linkSrc){if(t.lines.includes(this.muted))continue;let[n,a]=G(t.at[0],t.at[1],e),[o,s]=G(t.at[2],t.at[3],e);r.set([n,a,o,s],w*4),i.set([-5,Vu|(t.bp?Iu:0),E.length/2,0],w*4),E.push(t.stops[0],t.stops[1]),w++}let D=w;for(let t of this.lines){if(t.id===this.muted)continue;let n=t.lanes,a=_d(t.colour);for(let o=0;o+1<n.length;o+=2+2*n[o+1]){let s=n[o],c=n[o+1],l=ed|(s<2?Iu:0)|(s===1?td:0),u=0,d=0,f=0;for(let s=0;s<c;s++){let[c,p]=G(n[o+2+2*s],n[o+3+2*s],e);s>0&&(r.set([u,d,c,p],w*4),i.set([t.id,l,a,f],w*4),f+=Math.hypot(c-u,p-d),w++),u=c,d=p}}}let O=[];for(let t of this.lines){let n=C.get(t.id);if(!t.oneWay||!n||!n[1]||t.id===this.muted)continue;let i=x.get(t.id)??1,a=100*Et*i,o=_d(t.colour),s=n[0]+n[1]-1,c=S[s]+Math.hypot(r[s*4+2]-r[s*4],r[s*4+3]-r[s*4+1]),l=[];for(let n=0;n+1<t.marks.length;n+=2)l.push(G(t.marks[n],t.marks[n+1],e));for(let n=0;n+1<t.street.length;n+=2)l.push(G(t.street[n],t.street[n+1],e));for(let e=0;(e+.5)*a<c;e++){let s=(e+.5)*a,[c,u]=Od(r,S,n,s),[d,f]=Od(r,S,n,s-Zu*i),[p,m]=Od(r,S,n,s+Zu*i),h=Math.hypot(p-d,m-f);if(!(h>0))continue;let g=1/0;for(let e of l)g=Math.min(g,Math.hypot(e[0]-c,e[1]-u));O.push(c,u,(p-d)/h,(m-f)/h,o,t.id,e,g/i,+!t.built)}}let k=(a.length+o.length+l.length+u.length)/4;return this.built={a:e,seg:r,info:i,count:w,pickCount:T,stops:Float32Array.from([...a,...o,...l,...u]),stopCount:k,plainCount:(a.length+o.length)/4,stopLine:Int32Array.from([...s,...c,...d,...f]),stopId:Int32Array.from([...p,...m,...h,...g]),stopWay:Float32Array.from([..._,...v,...y,...b]),stopEnd:Uint8Array.from([...s.map(()=>0),...c.map(()=>1),...d.map(()=>0),...f.map(()=>1)]),k:x,cum:S,range:C,stopAlong:new Map,arrows:new Float32Array(O),linkStops:E,laneFirst:D},this.built}upload(e){let t=this.gl;for(let e of this.bufs)t.deleteBuffer(e);this.bufs=[];let n=(e,n,r,i)=>{let a=t.createBuffer();this.bufs.push(a),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,e.length?e:new Float32Array(r),t.STATIC_DRAW);let o=t.getAttribLocation(i,n);o<0||(t.enableVertexAttribArray(o),t.vertexAttribPointer(o,r,t.FLOAT,!1,0,0),t.vertexAttribDivisor(o,1))};t.bindVertexArray(this.segVao),n(e.seg,`a_seg`,4,this.segProg),n(e.info,`a_info`,4,this.segProg),n(this.segWidths(e),`a_w`,1,this.segProg),this.wBuf=this.bufs[this.bufs.length-1],this.widthsFor=e,n(new Float32Array(e.count).fill(-1),`a_col`,1,this.segProg),this.cBuf=this.bufs[this.bufs.length-1],this.coloursFor=[e],t.bindVertexArray(this.stopVao),n(e.stops,`a_stop`,4,this.stopProg);let r=this.bufs[this.bufs.length-1];n(e.stopWay,`a_way`,2,this.stopProg);let i=this.bufs[this.bufs.length-1];t.bindVertexArray(this.stationStopVao);for(let[n,a,o]of[[`a_stop`,r,4],[`a_way`,i,2]]){let r=t.getAttribLocation(this.stopProg,n);r<0||(t.bindBuffer(t.ARRAY_BUFFER,a),t.enableVertexAttribArray(r),t.vertexAttribPointer(r,o,t.FLOAT,!1,0,e.plainCount*o*4),t.vertexAttribDivisor(r,1))}if(e.arrows.length){t.bindVertexArray(this.arrowVao);let n=t.createBuffer();this.bufs.push(n),t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,e.arrows,t.STATIC_DRAW);for(let[e,n,r]of[[`a_arrow`,4,0],[`a_arrow2`,4,4],[`a_bp`,1,8]]){let i=t.getAttribLocation(this.arrowProg,e);i<0||(t.enableVertexAttribArray(i),t.vertexAttribPointer(i,n,t.FLOAT,!1,36,r*4),t.vertexAttribDivisor(i,1))}}t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.onGpu=e}draw(e,t,n,r,i,a){if(this.last=null,!this.lines.length||!this.gl||!this.segProg)return;let o=this.gl,s=this.local(t);if(!s.count)return;this.onGpu!==s&&this.upload(s),this.widthsFor!==s&&this.wBuf&&(o.bindBuffer(o.ARRAY_BUFFER,this.wBuf),o.bufferData(o.ARRAY_BUFFER,this.segWidths(s),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,null),this.widthsFor=s);let c=[s,a.paint,a.paint===`speed`?a.phases:null,a.paint===`speed`?a.meta:null,a.paint===`profit`?this.profit:null];this.cBuf&&(c.length!==this.coloursFor.length||c.some((e,t)=>e!==this.coloursFor[t]))&&(o.bindBuffer(o.ARRAY_BUFFER,this.cBuf),o.bufferData(o.ARRAY_BUFFER,this.segColours(s,a),o.STATIC_DRAW),o.bindBuffer(o.ARRAY_BUFFER,null),this.coloursFor=c);let l=a.wLine*Eu*(a.paint===`level`?gd:1),u=this.su;o.useProgram(this.segProg),o.uniform1i(this.su.u_no_bp,+!!q.blueprints),R(o,u,e),o.uniform2f(u.u_viewport,n[0],n[1]),o.uniform1i(u.u_sel,a.sel),o.uniform1i(u.u_hot,a.hot),this.litList.fill(-1),a.lit.slice(0,Mu).forEach((e,t)=>this.litList[t]=e),o.uniform1iv(u.u_lit,this.litList),o.uniform1i(u.u_lit_n,Math.min(a.lit.length,Mu)),o.uniform1f(u.u_dim,a.dim),o.uniform1f(u.u_extra,a.wSel*Eu),o.uniform3fv(u.u_casing_rgb,a.casingRgb),o.uniform3fv(u.u_rail_rgb,a.rail),o.uniform3fv(u.u_track_rgb,a.trackRgb),o.uniform1f(u.u_rail,Math.max(1*i,a.railShare*l)),o.uniform1f(u.u_px_per_unit,I(r)*i),o.uniform1f(u.u_xfer,+(r>=13)),o.uniform1f(u.u_xfer_w,Gu*i),o.uniform3fv(u.u_xfer_rgb,z(a.shades.mapInk)),o.uniform1f(u.u_xfer_alpha,qu);let d=new Set(a.litStops),f=[];for(let e=0;e<s.linkStops.length&&f.length<Ju;e+=2)(d.has(s.linkStops[e])||d.has(s.linkStops[e+1]))&&f.push(e/2);let p=new Int32Array(Ju).fill(-1);if(p.set(f),o.uniform1iv(u.u_lit_links,p),o.uniform1i(u.u_lit_links_n,f.length),o.bindVertexArray(this.segVao),this.byId.has(a.sel)&&a.sel!==this.muted&&!this.byId.get(a.sel).ferry&&(a.stencil??(o.getParameter(o.STENCIL_BITS)??0)>0)){let e=1e3*(s.k.get(a.sel)??1)*I(r)*i,t=.5*Au*i;o.uniform1i(u.u_pass,2),o.uniform1i(u.u_only,a.sel),o.uniform1f(u.u_alpha,1),o.enable(o.STENCIL_TEST),o.clearStencil(0),o.clear(o.STENCIL_BUFFER_BIT),o.colorMask(!1,!1,!1,!1),o.stencilOp(o.KEEP,o.KEEP,o.REPLACE);for(let[n,r]of[[1,e+t*2],[0,Math.max(0,e-t*2)]])r<=0||(o.stencilFunc(o.ALWAYS,n,255),o.uniform1f(u.u_width,r),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count));o.colorMask(!0,!0,!0,!0),o.stencilFunc(o.EQUAL,1,255),o.stencilOp(o.KEEP,o.KEEP,o.ZERO),o.uniform1f(u.u_alpha,ku),o.uniform1f(u.u_width,e+t*2),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count),o.disable(o.STENCIL_TEST)}let m=e=>{o.uniform1i(u.u_only,e),o.uniform1f(u.u_width,l),o.uniform1i(u.u_pass,0),o.uniform1f(u.u_add,a.casing*Ou),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count),o.uniform1i(u.u_pass,1),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count)};m(-1),this.byId.has(a.sel)&&m(-2),s.laneFirst<s.count&&!this.traffic&&a.paint!==`level`&&r>=11&&this.drawLanes(s,a,l,i,r),r>=13&&(o.uniform1i(u.u_only,-3),o.uniform1f(u.u_width,l),o.uniform1i(u.u_pass,1),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,s.count));let h=Math.max(Fu*i,l*Nu),g=Math.max(Fu*1.25*i,l*Pu);if(o.bindVertexArray(null),this.arrows=s.arrows.length/ld,this.arrows&&r>=12&&!a.paint){let t=this.au,c=I(r)*_e(0,s.a)*i;o.useProgram(this.arrowProg),o.uniform1i(this.au.u_no_bp,+!!q.blueprints),R(o,t,e),o.uniform2f(t.u_viewport,n[0],n[1]),o.uniform3f(t.u_size,.5*l,.5*l+Math.max(Qu*i,$u*l),a.casing*Ou),o.uniform1f(t.u_every,sn(c,i,Et,cd)),o.uniform1f(t.u_m_px,c),o.uniform1f(t.u_clear,Math.max(Fu*1.25*i,l*Pu)+2*i),o.uniform1i(t.u_sel,a.sel),o.uniform1i(t.u_hot,a.hot),o.uniform1f(t.u_dim,a.dim),o.uniform3fv(t.u_casing_rgb,a.casingRgb),o.bindVertexArray(this.arrowVao),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,this.arrows),o.bindVertexArray(null)}this.style=a;let _=r>=13,v=r>=11;if(v&&s.stopCount){if(this.litAt=[],a.litStops.length){let e=new Set(a.litStops);for(let t=0;t<s.stopCount&&this.litAt.length<Yu;t++)e.has(s.stopId[t])&&this.litAt.push(t)}this.stopPass(e,n,a,l,h,g,_,this.stopVao,s.plainCount,0),this.last={rings:_,ends:v,ringR:h/i,endR:g/i}}}style=null;drawLanes(e,t,n,r,i){let a=this.gl,o=this.su,s=t.stencil??(a.getParameter(a.STENCIL_BITS)??0)>0;a.uniform1i(o.u_pass,5),a.uniform1i(o.u_only,-1),a.uniform1f(o.u_width,n),a.uniform3fv(o.u_lane_rgb,z(t.shades.brtLane)),a.uniform1f(o.u_lane_period,ad*_e(0,e.a)*I(i)*r);let c=t.casing*Ou,l=Math.max(r,t.railShare*n),u=nd*r,d=Math.max(sd*r,od*n);a.uniform1f(o.u_lane_edge,l);let f=rd*r,p=[[0,c,c+2*d],[2,c+2*(d-l),c+2*d]];n*Du>=id*r&&p.unshift([1,-2*(f+u),-2*f]);for(let[t,n,r]of p){if(a.uniform1i(o.u_lane_kind,t),a.uniform1f(o.u_lane_in,s?-1e6:n),s){a.enable(a.STENCIL_TEST),a.clearStencil(0),a.clear(a.STENCIL_BUFFER_BIT),a.colorMask(!1,!1,!1,!1),a.stencilOp(a.KEEP,a.KEEP,a.REPLACE);for(let[t,i]of[[1,r],[0,n]])a.stencilFunc(a.ALWAYS,t,255),a.uniform1f(o.u_add,i),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.count);a.colorMask(!0,!0,!0,!0),a.stencilFunc(a.EQUAL,1,255),a.stencilOp(a.KEEP,a.KEEP,a.ZERO)}a.uniform1f(o.u_add,r),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.count),s&&a.disable(a.STENCIL_TEST)}}drawStationStops(e,t,n){let r=this.built,i=this.style,a=this.last;this.gl&&this.stopProg&&r&&i&&a&&r.stopCount!==r.plainCount&&this.onGpu===r&&this.stopPass(e,t,i,i.wLine*Eu,a.ringR*n,a.endR*n,a.rings,this.stationStopVao,r.stopCount-r.plainCount,r.plainCount)}litAt=[];litList32=new Int32Array(Yu);stopPass(e,t,n,r,i,a,o,s,c,l){if(!c)return;let u=this.gl,d=this.pu;u.useProgram(this.stopProg),u.uniform1i(this.pu.u_no_bp,+!!q.blueprints),R(u,d,e),this.litList32.fill(-1),this.litList32.set(this.litAt),u.uniform1iv(d.u_lit_stops,this.litList32),u.uniform1i(d.u_lit_stops_n,this.litAt.length),u.uniform1i(d.u_base,l),u.uniform2f(d.u_viewport,t[0],t[1]),u.uniform2f(d.u_r,i,a),u.uniform3fv(d.u_rail_rgb,n.rail),u.uniform3fv(d.u_fill,n.fill),u.uniform1f(d.u_rim,Math.max(1,.45*r)),u.bindVertexArray(s),u.uniform1f(d.u_rings,+!!o),u.uniform1f(d.u_keep,Ln.peek()?1:-1),u.drawArraysInstanced(u.TRIANGLE_STRIP,0,4,c),u.bindVertexArray(null)}lineAt(e,t,n){if(!this.lines.length)return-1;let r=this.local(w());if(!r.pickCount)return-1;let[i]=Yl(e,r.seg,r.pickCount,t,n,37);return i<0?-1:r.info[i*4]}linesAt(e,t,n,r,i){if(!this.lines.length)return[];let a=this.local(w()),o=[];for(;o.length<r&&a.pickCount;){let[r]=Yl(e,a.seg,a.pickCount,t,n,37,void 0,0,e=>!i(a.info[e*4])&&!o.includes(a.info[e*4]));if(r<0)break;o.push(a.info[r*4])}return o}stretchAt(e,t,n,r){let i=this.local(w()),a=i.range.get(r),o=e.screenToLocal(t,n);if(!a||!a[1]||!o)return-1;let s=this.stopsAlong(i,r);return s?Ad(s,Dd(i,a,o[0],o[1])):-1}stopsAlong(e,t){let n=this.byId.get(t),r=e.range.get(t);if(!n||!r||!r[1])return null;let i=e.stopAlong.get(t);if(!i){i=[];let a=r[0];for(let t=0;t+1<n.marks.length;t+=2){let[o,s]=G(n.marks[t],n.marks[t+1],e.a),[c,l]=Ed(e,a,r[0]+r[1],o,s);i.push(c),a=l}e.stopAlong.set(t,i)}return i}setTraffic(e){e!==this.traffic&&(this.traffic=e,this.widthsFor=null,this.version++)}traffic=null;widthsFor=null;wBuf=null;segWidths(e){let t=new Float32Array(e.count).fill(1);for(let n=e.laneFirst;n<e.count;n++)this.byId.get(e.info[n*4])?.brt&&(t[n]=Du);let n=this.traffic;if(!n){for(let n of this.lines){let r=n.brt&&e.range.get(n.id);r&&t.fill(Du,r[0],r[0]+r[1])}return t}for(let[r,i]of n){let n=e.range.get(r),a=n&&this.stopsAlong(e,r);if(n&&a&&i.length===a.length-1)for(let r=n[0];r<n[0]+n[1];r++){let n=e.cum[r]+.5*Math.hypot(e.seg[r*4+2]-e.seg[r*4],e.seg[r*4+3]-e.seg[r*4+1]);t[r]=(i[Ad(a,n)]??Eu)/Eu}}return t}setProfit(e){e!==this.profit&&(this.profit=e,this.version++)}profit=null;cBuf=null;coloursFor=[];keyframes=null;segColours(e,t){let n=new Float32Array(e.count).fill(-1);if(!t.paint)return n;if(t.paint===`level`)return n.fill(_d(le[0]));t.paint===`speed`&&(this.keyframes={phases:t.phases,meta:t.meta});for(let r of this.lines){let i=e.range.get(r.id),a=i&&this.stopsAlong(e,r.id);if(!r.built||!i||!a)continue;for(let t=i[0]+i[1];t<e.pickCount&&e.info[t*4]===r.id;t++)n[t]=-2;let o=this.profit?.get(r.id)?.ratio;for(let s=i[0];s<i[0]+i[1];s++){let i=e.cum[s]+.5*Math.hypot(e.seg[s*4+2]-e.seg[s*4],e.seg[s*4+3]-e.seg[s*4+1]),c=Ad(a,i),l=null;t.paint===`speed`?(l=kd(r,c,a[c+1]>a[c]?(i-a[c])/(a[c+1]-a[c]):.5,t.phases,t.meta),n[s]=l===null?-2:_d(Dt(l))):(l=o&&c<o.length&&o[c]<1e29?o[c]:null,n[s]=l===null?-2:_d(Ht(l)))}}return n}speedAt(e,t,n,r){let i=this.local(w()),a=this.byId.get(r),o=i.range.get(r),s=e.screenToLocal(t,n),c=a&&this.stopsAlong(i,r);if(!a||!o||!c||!s||!this.keyframes)return null;let l=Dd(i,o,s[0],s[1]),u=Ad(c,l);return kd(a,u,c[u+1]>c[u]?Math.max(0,Math.min(1,(l-c[u])/(c[u+1]-c[u]))):.5,this.keyframes.phases,this.keyframes.meta)}stopAt(e,t,n){let r=this.last,i=this.built;if(!r||!i||!i.stopCount)return null;let a=Td;for(let o=i.stopCount-1;o>=0;o--){let s=i.stopEnd[o]===1;if(s?!r.ends:!r.rings)continue;e.toScreenInto(i.stops[o*4],i.stops[o*4+1],a,0);let c=(s?r.endR:r.ringR)+3;if((a[0]-t)**2+(a[1]-n)**2<=c*c)return{line:i.stopLine[o],end:s,id:i.stopId[o]}}return null}},Td=new Float64Array(2);function Ed(e,t,n,r,i){let a=1/0,o=0,s=t;for(let c=t;c<n;c++){let t=e.seg[c*4],n=e.seg[c*4+1],l=e.seg[c*4+2]-t,u=e.seg[c*4+3]-n,d=l*l+u*u,f=d?Math.max(0,Math.min(1,((r-t)*l+(i-n)*u)/d)):0,p=Math.hypot(t+f*l-r,n+f*u-i);p<a&&(a=p,o=e.cum[c]+f*Math.sqrt(d),s=c)}return[o,s]}var Dd=(e,t,n,r)=>Ed(e,t[0],t[0]+t[1],n,r)[0];function Od(e,t,n,r){let i=n[0],a=n[0]+n[1]-1;for(;i<a;){let e=i+a+1>>1;t[e]<=r?i=e:a=e-1}let o=e[i*4],s=e[i*4+1],c=e[i*4+2]-o,l=e[i*4+3]-s,u=Math.hypot(c,l),d=u>0?Math.max(0,Math.min(1,(r-t[i])/u)):0;return[o+d*c,s+d*l]}function kd(e,t,n,r,i){let a=e.stopS,o=a?.[0].length??0;if(!a||t<0||t>o-2)return null;let s=null;for(let c of[0,1]){let l=ie(e.id,c,De[1])*4,u=i[l],d=i[l+1];if(!(d>0))continue;let f=c===0?t:o-2-t,p=c===0?n:1-n,m=a[c][f]+p*(a[c][f+1]-a[c][f]);s=Math.max(s??0,tn(r,u,d,m))}return s}function Ad(e,t){let n=-1;for(let r of e)r<=t&&n++;return Math.max(0,Math.min(e.length-2,n))}function jd(e,t,n=null){let r=e.save.lines.find(e=>e.num===t);if(!r)return L(`busLayer.line`,{num:t});let i=Object.assign(document.createElement(`span`),{textContent:r.name}),a=Cs(r,!0);if(n===null)return Es(a,i);let o=Object.assign(document.createElement(`span`),{className:`bullet-heading`});return o.append(a,Ts(r.colour,n)),Es(o,i)}function Md(e){let t=document.createElement(`span`);return t.className=`tag-vehicle`,t.setAttribute(`aria-label`,L(e===`ferry`?`busLayer.ferryLine`:`busLayer.busLine`)),bt(oa[e](),t),t}function Nd(e,t,n=[]){let r=e.save.lines.find(e=>e.num===t),i=r?e.lineStats[r.id]?.bus:void 0,a=!i||i.built,o=jd(e,t);typeof o!=`string`&&o.append(Md(i?.ferry?`ferry`:`bus`));let s=i&&!i.ferry&&i.lanes.length>0&&i.lanes[0]<2?[L(`busLayer.brtBlueprint`)]:[];return a?[o,...s,...n]:[o,L(`busLayer.notRunning`),...s]}function Pd(e,t,n,r,i){let a=e.save.lines.find(e=>e.num===t),o=a&&r!==void 0&&r>=0?e.lineStats[a.id]?.oneWayAt[String(r)]:void 0,s=o!==void 0&&i?a&&e.lineStats[a.id]?.bus?.stops.find(e=>e.id===r):void 0,c=r!==void 0&&r>=0?[...new Set(dn(e,r)?.stops.map(e=>e.line)??[])].filter(e=>e!==t):[],l=!n&&r!==void 0&&r>=0?vn(e).get(String(r)):void 0;return[n?L(`busLayer.endOfLine`):l??L(`busLayer.busStop`),jd(e,t,s&&i&&o!==void 0?pu(i,s.x,s.y,o):null),...c.map(t=>jd(e,t))]}var Fd=`#version 300 es
precision highp float;
${V}
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
}`,Id=`#version 300 es
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
  float spaces = smoothstep(2.5 * u_dpr, 4.5 * u_dpr, ${gt.toFixed(1)} * k) * inRow * clamp(0.5 * lw + 0.5 - grid(m.x, ${gt.toFixed(1)}, k), 0.0, 1.0);
  // the line where two bays' rows meet back to back
  float heads = m.y > 1.0 && m.y < 2.0 * hd - 1.0 ? smoothstep(4.0 * u_dpr, 8.0 * u_dpr, ${16 .toFixed(1)} * k) * clamp(0.5 * lw + 0.5 - grid(m.y, ${16 .toFixed(1)}, k), 0.0, 1.0) : 0.0;
  vec3 col = mix(u_fill, u_line, max(ink, max(spaces, heads)));
  float a = cover * v_alpha;
  o = vec4(col * a, a);
}`,Ld=class{gl;prog=null;u={};vao=null;buf=null;count=0;lots=new Float32Array;init(e){this.gl=e,this.vao=this.buf=null,this.count=0,this.prog=Pt(e,Fd,Id,`car parks`),this.prog&&(this.u=W(e,this.prog,[...H,`u_viewport`,`u_fill`,`u_line`,`u_dpr`]))}setNetwork(e){let t=this.gl;if(this.lots=e??new Float32Array,this.vao&&t.deleteVertexArray(this.vao),this.buf&&t.deleteBuffer(this.buf),this.vao=this.buf=null,this.count=this.lots.length/10,this.count&&this.prog){this.vao=t.createVertexArray(),this.buf=t.createBuffer(),t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.buf),t.bufferData(t.ARRAY_BUFFER,this.lots,t.STATIC_DRAW);for(let[e,n]of[[`a_lot`,0],[`a_dim`,16]]){let r=t.getAttribLocation(this.prog,e);t.enableVertexAttribArray(r),t.vertexAttribPointer(r,4,t.FLOAT,!1,40,n),t.vertexAttribDivisor(r,1)}t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null)}}draw(e,t,n){if(!this.count||!this.vao)return;let r=this.gl,i=this.u,a=Hs();r.useProgram(this.prog),R(r,i,e),r.uniform2f(i.u_viewport,t[0],t[1]),r.uniform3fv(i.u_fill,z(a.lot)),r.uniform3fv(i.u_line,z(a.lotLine)),r.uniform1f(i.u_dpr,n),r.bindVertexArray(this.vao),r.drawArraysInstanced(r.TRIANGLE_STRIP,0,4,this.count),r.bindVertexArray(null)}at(e,t,n){for(let r=this.count-1;r>=0;r--){let i=r*10,a=this.lots,[o,s]=n(a[i],a[i+1]),[c,l]=n(a[i]+a[i+2],a[i+1]+a[i+3]),[u,d]=n(a[i]-a[i+3]*a[i+5]/a[i+4],a[i+1]+a[i+2]*a[i+5]/a[i+4]),f=c-o,p=l-s,m=u-o,h=d-s,g=Math.hypot(f,p),_=Math.hypot(m,h);if(g<1e-6||_<1e-6)continue;let v=((e-o)*f+(t-s)*p)/g,y=((e-o)*m+(t-s)*h)/_;if(Math.abs(v)<=g+1&&Math.abs(y)<=_+1)return r}return-1}},Rd=e=>e<4?-1:e-e%4+1-e%4,zd=.3,Bd=1200,Vd=900,Hd=150,Ud=10,Wd=1,Gd=2**26,Kd=.2,qd=300,Jd=5,Yd=class{lag=new Float32Array;prevS=new Float64Array;waitRes=new Int32Array;waitFrom=new Float64Array;waiting=!1;trips=null;epoch=NaN;net=null;guardedTrack=new Uint8Array;guardedAll=new Uint8Array;guarded=new Uint8Array;trackBase=new Uint8Array;allBase=new Uint8Array;baysFor=null;crossOn=new Map;moveIdx=new Map;moveRes=[];movePairs=new Set;nCross=0;tauCache=new Map;tauPhases=null;singleOn=new Map;singleCache=new Map;singlePhases=null;singleHeld=0;singleLetOn=0;lastTime=NaN;nextIndex=new Map;guardedCount=0;heldCount=0;conflictHeld=0;conflictWaitMax=0;conflictLongest=0;conflictWaits=0;conflictWaitSum=0;conflictLetThrough=0;boxes=null;seen=new Uint8Array;placeLog=null;log=null;passStops=new Map;passThrough=new Map;passedBy=0;crossings=!pn(`crossWait`);singles=!pn(`singleWait`);singleWait=new Set;resetCounts(){this.conflictLongest=0,this.conflictWaits=0,this.conflictWaitSum=0,this.conflictLetThrough=0,this.passedBy=0,this.singleLetOn=0}setNetwork(e){if(e===this.net)return;this.net=e,this.passStops.clear(),this.passThrough.clear();let t=e.passing;if(t)for(let e=0;e+7<=t.length;e+=7){let n=t[e];if(t[e+4]===1){let r=[t[e+1],t[e+2],t[e+3],t[e+5],t[e+6]],i=this.passStops.get(n);i?i.push(...r):this.passStops.set(n,r)}else{let r=this.passThrough.get(n);r?r.set(t[e+3],t[e+1]):this.passThrough.set(n,new Map([[t[e+3],t[e+1]]]))}}this.crossOn.clear(),this.moveIdx.clear(),this.moveRes=[],this.movePairs.clear(),this.tauCache.clear(),this.singleOn.clear(),this.singleCache.clear(),this.boxes=null;let n=e.pathTable,r=e.pathEntry,i=e.lineTable.length/4|0;if(this.guardedTrack=new Uint8Array(i),this.guardedAll=new Uint8Array(i),this.guarded=this.guardedTrack,!n||!r)return;this.readConflicts(e.conflicts);let a=e.meta.length/680,o=e=>a>0&&e>=a?e-a:e,s=new Map,c=new Set;for(let e=0;e<i&&2*e+1<n.length;e++){let t=n[2*e],i=n[2*e+1],a=o(e);for(let e=t;e<t+i;e++){let t=r[e];for(let e of[t,t^1]){let t=s.get(e);t===void 0?s.set(e,a):t!==a&&c.add(e)}}}for(let t=0;t<i&&2*t+1<n.length;t++){let i=n[2*t],a=n[2*t+1],s=o(t);if(!((e.lineCars?.[s]??8)<1))for(let e=i;e<i+a;e++){if(c.has(r[e])||c.has(r[e]^1)){this.guardedTrack[s]=this.guardedAll[s]=1;break}(this.crossOn.has(r[e]>>1)||e+1<i+a&&(this.moveIdx.has(r[e]*Gd+r[e+1])||this.moveIdx.has((r[e+1]^1)*Gd+(r[e]^1))))&&(this.guardedAll[s]=1)}}this.singles&&this.readSingles(e.singles,i);for(let t of this.singleOn.keys())(e.lineCars?.[o(t)]??8)>=1&&(this.guardedTrack[o(t)]=this.guardedAll[o(t)]=1);this.trackBase=this.guardedTrack.slice(),this.allBase=this.guardedAll.slice(),this.baysFor=null;let l=this.boxes=new Float32Array(i*4);for(let t=0;t<i;t++){if((e.lineCars?.[t]??8)<1)continue;let n=e.lineTable[t*4],r=e.lineTable[t*4+1],i=1/0,a=1/0,s=-1/0,c=-1/0;for(let t=n;t<n+r;t++){let n=e.samples[t*2],r=e.samples[t*2+1];n<i&&(i=n),n>s&&(s=n),r<a&&(a=r),r>c&&(c=r)}l.set([i,a,s,c],t*4);let u=o(t);u!==t&&r>0&&l.set([Math.min(i,l[u*4]),Math.min(a,l[u*4+1]),Math.max(s,l[u*4+2]),Math.max(c,l[u*4+3])],u*4)}}readSingles(e,t){let n=this.net,r=n.pathTable,i=n.pathEntry,a=n.pathFrom,o=n.pathLen;if(!e||!e[0]||!a||!o)return;let s=new Map,c=[];for(let t=0,n=1;t<e[0];t++){let r=e[n++];c.push(e[n]);for(let i=0;i<r;i++)s.set(e[n+i],t);n+=r}for(let e=0;e<t&&2*e+1<r.length;e++){let t=r[2*e],n=r[2*e+1],l=[];for(let e=t;e<t+n;){let r=s.get(i[e]>>1);if(r===void 0){e++;continue}let u=e,d=-1;for(;u<t+n&&s.get(i[u]>>1)===r;)i[u]>>1===c[r]&&(d=i[u]&1),u++;d>=0&&l.push(r,a[e],a[u-1]+o[u-1],d),e=u}l.length&&this.singleOn.set(e,l)}}readConflicts(e){if(this.nCross=0,!e||!e.length)return;let t=0,n=e[t++];for(let r=0;r<n;r++,t+=4)for(let[n,i]of[[e[t],e[t+1]],[e[t+2],e[t+3]]]){let e=this.crossOn.get(n);e?e.push(r,i):this.crossOn.set(n,[r,i])}this.nCross=n;let r=e[t++]??0,i=new Map,a=[],o=(e,t,r)=>{let a=t*Gd+r,o=this.moveIdx.get(a);if(o===void 0){o=this.moveRes.length,this.moveIdx.set(a,o);let t=i.get(e);t===void 0&&i.set(e,t=n+i.size),this.moveRes.push(t)}return o};for(let n=0;n<r;n++,t+=5)a.push(o(e[t],e[t+1],e[t+2]),o(e[t],e[t+3],e[t+4]));let s=this.moveRes.length;for(let e=0;e<a.length;e+=2)this.movePairs.add(a[e]*s+a[e+1]),this.movePairs.add(a[e+1]*s+a[e])}placeLines(e){let t=e.bays??null;if(t===this.baysFor||this.trackBase.length!==this.guardedTrack.length)return!1;if(this.baysFor=t,this.guardedTrack.set(this.trackBase),this.guardedAll.set(this.allBase),!t)return!0;let n=this.guardedTrack.length,r=this.net?.lineCars;for(let i=0;i<e.trips.length/2;i++){if(t[i*4+2]<4)continue;let a=D(e.trips[i*2]);a<n&&(r?.[a]??8)>=1&&(this.guardedTrack[a]=this.guardedAll[a]=1)}return!0}remap(e){let t=e.trips.length/2,n=new Float32Array(t),r=new Float64Array(t).fill(NaN),i=new Int32Array(t).fill(-1),a=new Float64Array(t),o=this.trips;if(o&&this.lag.length){let s=new Map;for(let e=0;e<this.lag.length;e++)(this.lag[e]>0||!Number.isNaN(this.prevS[e]))&&s.set(`${o[e*2]}|${Math.round((o[e*2+1]+this.epoch)*100)}`,e);if(s.size)for(let o=0;o<t;o++){let t=s.get(`${e.trips[o*2]}|${Math.round((e.trips[o*2+1]+e.epoch)*100)}`);t!==void 0&&(n[o]=this.lag[t],r[o]=this.prevS[t],i[o]=this.waitRes[t],a[o]=this.waitFrom[t]+this.epoch-e.epoch)}}this.lag=n,this.prevS=r,this.waitRes=i,this.waitFrom=a,this.trips=e.trips,this.epoch=e.epoch,this.nextIndex.clear();for(let n=0;n<t;n++){let t=D(e.trips[n*2]);this.guardedAll[t]&&this.nextIndex.set((t*2+ue(e.trips[n*2]))*1e7+Math.round(e.trips[n*2+1]*100),n)}}update(e){let t=this.net;if(!t||!t.pathTable||!t.pathEntry||!t.pathFrom||!t.pathLen)return!1;let n=this.crossings&&e.close!==!1;this.guarded=n?this.guardedAll:this.guardedTrack,(this.placeLines(e)||e.trips!==this.trips||e.epoch!==this.epoch)&&this.remap(e),!n&&this.waiting&&(this.waitRes.fill(-1),this.waiting=!1),this.waiting=n;let r=e.time-this.lastTime;this.lastTime=e.time;let i=this.lag,a=this.prevS,o=!1;if(!(r>=0&&r<=Vd)){for(let e=0;e<i.length;e++)i[e]&&(i[e]=0,o=!0);a.fill(NaN),this.waitRes.fill(-1)}let s=r>=0&&r<=Vd?zd*r:0,c=e.time-e.epoch,l=t.pathTable,u=t.pathEntry,d=t.pathFrom,f=t.pathLen,p=t.meta,m=[],h=[],g=[],_=[],v=e.trips.length/2,y=-150,b=e.w+Hd,x=e.h+Hd,S=this.seen.length===this.guarded.length?this.seen.fill(2):this.seen=new Uint8Array(this.guarded.length).fill(2),C=this.boxes;for(let n=0;n<v;n++){let r=e.trips[n*2],l=D(r),u=i[n],d=u>s?u-s:0;if(this.guarded[l]&&S[l]===2&&(S[l]=1,e.project&&C)){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of[[C[l*4],C[l*4+1]],[C[l*4+2],C[l*4+1]],[C[l*4],C[l*4+3]],[C[l*4+2],C[l*4+3]]]){let s=e.project(a,o);t=Math.min(t,s[0]),r=Math.max(r,s[0]),n=Math.min(n,s[1]),i=Math.max(i,s[1])}Number.isFinite(t+r+n+i)&&(r<y||t>b||i<y||n>x)&&(S[l]=0)}if(!this.guarded[l]||!S[l]){u&&(i[n]=d,o=!0),a[n]=NaN;continue}let f=c-e.trips[n*2+1]-d,v=e.ends?e.ends[n]:-1/0;if(p[r*4+1]<.5||f<0||f>p[r*4+2]&&c>v){u!==d&&(i[n]=d,o=!0),a[n]=NaN;continue}let w=je(t,r,f),{geo:T,d:E}=Yt(t,r,w);if(e.project&&!(this.singles&&(this.singleOn.has(l)||this.singleOn.has(T)))){let r=t.lineTable[T*4],s=t.lineTable[T*4+1],c=t.lineTable[T*4+3],l=r+Math.max(0,Math.min(s-1,Math.round(E/c))),f=e.project(t.samples[l*2],t.samples[l*2+1]),p=f[0],m=f[1];if(!(p>=y&&p<=b&&m>=y&&m<=x)){u!==d&&(i[n]=d,o=!0),a[n]=NaN;continue}}m.push(n),h.push(w),g.push(Math.min(Math.max(1,qe(t.lineCars?.[l]??8))*20,p[r*4+3])/2),_.push(f),u!==d&&(i[n]=d,o=!0)}if(this.guardedCount=m.length,this.heldCount=0,this.conflictHeld=0,this.conflictWaitMax=0,m.length<2)return m.length&&(a[m[0]]=h[0]),o;this.singleWait.clear(),this.singles&&this.singleOn.size&&this.holdOnSingles(e,m,h,g,_)&&(o=!0),n&&(this.crossOn.size||this.moveRes.length)&&this.holdAtConflicts(e,m,h,g,_)&&(o=!0);let w=new Map,T=h.slice();for(let n=0;n<m.length;n++){let r=m[n],i=e.trips[r*2],o=D(i),{geo:s,gr:c}=Yt(t,i,0);if(!this.guardedTrack[o]&&_[n]>=p[i*4+2]||e.bays&&e.bays[r*4+2]>=0&&_[n]>=Ze(t,i))continue;let v=p[i*4+3],y=l[s*2],b=l[s*2+1],x=a[r],S=Math.min(h[n],Number.isNaN(x)?h[n]:x)-g[n],C=h[n]+g[n]+30+10,T=c===0?S:v-C,E=c===0?C:v-S,O=Qd(d,y,y+b,T)-1;for(O<y&&(O=y);O<y+b&&d[O]<=E;O++){let e=f[O];if(d[O]+e<T)continue;let t=c===0?u[O]:u[O]^1,r=c===0?d[O]:v-d[O]-e;Zd(w,t,n,-r,e)}}let E=[];for(let e of w.values()){if(e.length<2*Xd)continue;let t=e.length/Xd,n=Array.from({length:t},(e,t)=>t),r=n.map(t=>{let n=e[t*Xd],r=a[m[n]];return(Number.isNaN(r)?h[n]:Math.min(r,h[n]))+e[t*Xd+1]+g[n]});n.sort((t,n)=>r[n]-r[t]||e[t*Xd]-e[n*Xd]);let i=[];for(let t of n)for(let n=0;n<Xd;n++)i.push(e[t*Xd+n]);E.push(i)}let O=(e,t,n)=>{let r=T[e]+t-g[e];return r<n&&r+2*g[e]>0?Math.max(r,0):1/0},k=this.passStops.size?this.outerAt(e,m,h,g):null,A=(t,n)=>{let r=e.trips[m[t]*2],i=e.trips[m[n]*2];return k[t]>=0&&!!this.passThrough.get(D(i))?.has(k[t])||k[n]>=0&&!!this.passThrough.get(D(r))?.has(k[n])};k&&this.waitForPassing(e,m,h,k,_,c)&&(o=!0);let j=k?E.map(e=>{for(let t=0;t<e.length;t+=Xd)if(k[e[t]]>=0)return!0;return!1}):null;for(let e=0;e<6;e++){let t=!1;if(E.forEach((n,r)=>{let i=1/0;for(let a=0;a<n.length;a+=Xd){let o=n[a],s=n[a+1],c=n[a+2],l=i;if(j?.[r]){l=1/0;for(let t=0;t<a;t+=Xd)A(o,n[t])?e===0&&this.passedBy++:l=Math.min(l,O(n[t],n[t+1],n[t+2]))}if(l<1/0){let e=l-30-s-g[o];T[o]>e+1e-6&&(T[o]=e,t=!0)}i=Math.min(i,O(o,s,c))}}),!t)break}e.bays&&this.holdForPlaces(e,m,h,g,_,T);for(let n=0;n<m.length;n++){let r=m[n],s=e.trips[r*2];if(T[n]<h[n]-.001){let a=$d(t,s,Math.max(0,T[n]),_[n]),l=Math.min(Bd,c-e.trips[r*2+1]-a);l>i[r]&&(i[r]=l,o=!0),this.heldCount++}if(a[r]=T[n]<h[n]-.001?je(t,s,c-e.trips[r*2+1]-i[r]):h[n],i[r]>0&&e.ends&&e.nexts){let t=e.trips[r*2+1]+p[s*4+2]+i[r],n=e.nexts[r];if(t>e.ends[r]&&Number.isFinite(n)){let e=e=>this.nextIndex.get((D(s)*2+e)*1e7+Math.round(n*100)),r=e(1-ue(s))??e(ue(s));r!==void 0&&i[r]<Math.min(Bd,t-n)&&(i[r]=Math.min(Bd,t-n),o=!0)}}}return o}holdForPlaces(e,t,n,r,i,a){let o=e.bays,s=this.net,c=s.meta,l=this.prevS,u=t.map((t,n)=>i[n]>=Ze(s,e.trips[t*2])),d=new Set;for(let e=0;e<t.length;e++){let i=t[e]*4;u[e]&&o[i+2]>=4?d.add(o[i+2]):o[i]>=4&&n[e]-r[e]<Math.max(Rt(o[i+1]),2*r[e]+5)&&d.add(Rd(o[i]))}if(d.size)for(let s=0;s<t.length;s++){let f=t[s],p=e.trips[f*2],m=f*4,h=o[m+2];if(h<4||!d.has(h)||u[s])continue;let g=!1;for(let e=0;e<t.length&&!g;e++){if(e===s||this.singleWait.has(t[e]))continue;let i=t[e]*4;g=o[i+2]===h&&u[e]||Rd(o[i])===h&&n[e]-r[e]<Math.max(Rt(o[i+1]),2*r[e]+5)}if(!g)continue;let _=c[p*4+3]-Math.max(Rt(o[m+3]),2*r[s]+5)-50-30-r[s];(Number.isNaN(l[f])?n[s]:l[f])>_+1||a[s]>_&&(this.placeLog&&this.placeLog.length<40&&this.placeLog.push({t:e.time,i:f,place:h,s:+n[s].toFixed(0),L:c[p*4+3],lag:this.lag[f],who:t.map((t,a)=>[t,o[t*4],o[t*4+2],+!!u[a],+(n[a]-r[a]).toFixed(0),+i[a].toFixed(0),+this.lag[t].toFixed(0),e.trips[t*2]]).filter(e=>Rd(e[1])===h||e[2]===h)}),a[s]=Math.max(0,_))}}holdAtConflicts(e,t,n,r,i){let a=this.net,o=a.pathTable,s=a.pathEntry,l=a.pathFrom,u=a.pathLen,d=a.meta,f=this.lag,p=this.prevS,m=this.waitRes,h=this.waitFrom;this.tauPhases!==a.phases&&(this.tauCache.clear(),this.tauPhases=a.phases);let g=e.time-e.epoch,_=t.map(t=>(a.lineCars?.[D(e.trips[t*2])]??8)%1===c),v=new Map,y=(e,t,n,r)=>{let i=v.get(e);i?i.push(t,n,r):v.set(e,[t,n,r])};for(let i=0;i<t.length;i++){let c=t[i],f=e.trips[c*2],{geo:m,gr:h}=Yt(a,f,0),g=d[f*4+3],_=o[m*2],v=o[m*2+1],b=p[c],x=n[i],S=r[i],C=Math.min(x,Number.isNaN(b)?x:b)-S-Ud,w=x+3*S+40+Ud+1,T=h===0?C:g-w,E=h===0?w:g-C,D=Qd(l,_,_+v,T)-1;for(D<_&&(D=_);D<_+v&&l[D]<=E;D++){let e=u[D];if(l[D]+e<T)continue;let t=s[D],n=h===0?l[D]:g-l[D]-e,r=this.crossOn.get(t>>1);if(r)for(let a=0;a<r.length;a+=2){let o=r[a+1]*e,s=n+((h===0?t:t^1)&1?e-o:o);s>C&&s<=w&&y(r[a],i,t>>1,s)}if(D+1<_+v){let e=h===0?l[D+1]:g-l[D+1];if(e>C&&e<=w){let t=this.moveIdx.get(h===0?s[D]*Gd+s[D+1]:(s[D+1]^1)*Gd+(s[D]^1));t!==void 0&&y(this.moveRes[t],i,t,e)}}}}let b=(n,i)=>{let o=t[n],s=e.trips[o*2],[c,l]=this.tauAt(a,s,i,r[n]),u=e.trips[o*2+1]+f[o];return[u+c,e.ends&&l>=d[s*4+2]-.001?Math.max(u+l,e.ends[o]):u+l]},x=!1,S=this.moveRes.length,C=[],w=[],T=new Map,E=new Set,O=(n,i)=>p[t[n]]>i-r[n]-20+2||this.tauAt(a,e.trips[t[n]*2],i,r[n])[0]===0;for(let e of v.values())for(let t=0;t<e.length;t+=3)O(e[t],e[t+2])&&E.add(e[t]);for(let r=0,o=!0;o&&r<3;r++){o=!1,this.conflictHeld=0,this.conflictWaitMax=0;for(let[r,s]of v){if(s.length<6)continue;let c=r<this.nCross,l=(e,t)=>c?e!==t:this.movePairs.has(e*S+t),u=!1;for(let e=3;e<s.length&&!u;e+=3)for(let t=0;t<e&&!u;t+=3)u=l(s[e+1],s[t+1]);if(!u)continue;C.length=0,w.length=0;for(let e=0;e<s.length;e+=3){let n=s[e],i=s[e+2],a=t[n],[o,c]=b(n,i);O(n,i)?(C.push(n,s[e+1],-1/0,c),m[a]===r&&(m[a]=-1)):w.push(e,o)}if(!w.length)continue;let d=Array.from({length:w.length/2},(e,t)=>t),p=e=>+!E.has(s[w[e*2]]),v=e=>+!!_[s[w[e*2]]];d.sort((e,t)=>v(e)-v(t)||p(e)-p(t)||w[e*2+1]-w[t*2+1]||w[e*2]-w[t*2]);for(let c of d){let u=w[c*2],d=s[u],p=s[u+1],v=s[u+2],y=t[d],S=e.trips[y*2],[E,D]=b(d,v),O=D-E,k=T.get(d);if(k&&k[0]!==r&&k[1]<D){E<g&&g-E<=240&&f[y]<=480&&(f[y]=Math.min(Bd,f[y]+g-E),i[d]=g-e.trips[y*2+1]-f[y],n[d]=je(a,S,i[d]),x=o=!0);continue}let A=E;for(let e=!0,t=0;e&&t<8;t++){e=!1;for(let t=0;t<C.length;t+=4)C[t+3]<=A||C[t]===d||!l(p,C[t+1])||(_[d]?_[C[t]]?A=C[t+3]:C[t+2]<A+O&&(A=C[t+3],e=!0):_[C[t]]||(A=C[t+3]))}if(A<=E+1e-6){C.push(d,p,E,E+O),m[y]===r&&this.endWait(y,E),k?.[0]===r&&T.delete(d);continue}if((!k||E<k[1])&&(T.set(d,[r,E]),k?.[0]!==r&&(o=!0)),m[y]<0&&(h[y]=E),m[y]=r,A-h[y]>240||f[y]>480){if(C.push(d,p,E,E+O),h[y]!==-1/0){this.conflictLetThrough++;let i=E-h[y];if(i>this.conflictLongest&&(this.conflictLongest=i),this.log){let i=[];for(let r=0;r<C.length-4;r+=4)C[r+3]>E&&l(p,C[r+1])&&i.push(e.trips[t[C[r]]*2],+(C[r+3]-g).toFixed(0),+n[C[r]].toFixed(0));this.log.push({res:r,p:S,s:+n[d].toFixed(0),sx:+v.toFixed(0),wait:+(A-h[y]).toFixed(0),by:i})}h[y]=-1/0}T.get(d)?.[0]===r&&T.delete(d);continue}let j=Math.min(A,g)-E;if(j>0){let t=Math.min(Bd,f[y]+j);t-f[y]>.001&&(o=!0),t!==f[y]&&(f[y]=t,x=!0),i[d]=g-e.trips[y*2+1]-f[y],n[d]=je(a,S,i[d])}C.push(d,p,A,A+O),A<=g?(this.endWait(y,A),T.get(d)?.[0]===r&&T.delete(d)):E<=g&&(this.conflictHeld++,this.conflictWaitMax=Math.max(this.conflictWaitMax,g-h[y]))}}}for(let e=0;e<t.length;e++){let n=t[e];m[n]>=0&&h[n]!==-1/0&&!T.has(e)&&(m[n]=-1)}return x}holdOnSingles(e,t,n,r,i){let a=this.net,o=a.meta,s=this.lag,c=this.prevS;this.singlePhases!==a.phases&&(this.singleCache.clear(),this.singlePhases=a.phases);let l=e.time-e.epoch;this.singleHeld=0;let u=new Map;for(let n=0;n<t.length;n++){let i=t[n],d=e.trips[i*2],{geo:f,gr:p}=Yt(a,d,0),m=this.singleOn.get(f);if(!m)continue;let h=o[d*4+3],g=e.trips[i*2+1]+s[i];for(let e=p===0?0:m.length-4;e>=0&&e<m.length;e+=p===0?4:-4){let t=p===0?m[e+1]:h-m[e+2],o=p===0?m[e+2]:h-m[e+1],[s,f]=this.singleSpan(a,d,t,o,r[n]);if(g+f<=l||f<=s)continue;let _=c[i],v=je(a,d,s),y=!Number.isNaN(_)&&_>v+Wd,b=u.get(m[e]),x=[n,m[e+3]^p,g+s,g+f,+!!y];b?b.push(...x):u.set(m[e],x);break}}let d=!1;for(let r of u.values()){if(r.length<10)continue;let o=!1;for(let e=5;e<r.length&&!o;e+=5)o=r[e+1]!==r[1];if(!o)continue;let c=[],u=[];for(let e=0;e<r.length;e+=5)r[e+4]?c.push(r[e],r[e+1],-1/0,r[e+3]):u.push(e);u.sort((e,t)=>r[e+2]-r[t+2]||r[e]-r[t]);for(let o of u){let u=r[o],f=r[o+1],p=r[o+2],m=r[o+3]-p,h=t[u],g=p;for(let e=!0,t=0;e&&t<8;t++){e=!1;for(let t=0;t<c.length;t+=4)c[t+1]===f||c[t+3]+Jd<=g||c[t+2]>=g+m+Jd||(g=c[t+3]+Jd,e=!0)}g>p+1e-6&&s[h]+Math.min(g,l)-p>Bd&&(this.singleLetOn++,g=p),c.push(u,f,g,g+m);let _=Math.min(g,l)-p;_>0&&(g>l&&(this.singleHeld++,this.singleWait.add(h)),s[h]+=_,d=!0,i[u]=l-e.trips[h*2+1]-s[h],n[u]=je(a,e.trips[h*2],i[u]))}}return d}singleSpan(e,t,n,r,i){let a=t*2**27+Math.round(n*2),o=this.singleCache.get(a*2),s=this.singleCache.get(a*2+1);if(o!==void 0&&s!==void 0)return[o,s];let c=e.phases,l=e.meta[t*4],u=e.meta[t*4+1],d=e.meta[t*4+2],f=(n+r)/2,p=NaN,m=NaN;for(let e=l;e<l+u;e++){let t=c[e*4],i=c[e*4+2],a=c[e*4+3],o=e+1<l+u?c[(e+1)*4]:d,s=c[e*4+1],h=t;if(i!==0||a!==0){if(!(a<0)||t+i/-a>=o-.001)continue;h=t+i/-a,s+=i*i/(2*-a)}s>=n-qd&&s<=Math.min(n+qd,f)?p=o:Number.isNaN(m)&&s>=Math.max(r-qd,f)&&s<=r+qd&&(m=h)}return Number.isNaN(p)&&(p=n-i-20<=je(e,t,0)+Wd?0:$d(e,t,n-i-20+Wd,d)),Number.isNaN(m)&&(m=r+i+Ud>=je(e,t,d)-Wd?d:$d(e,t,r+i+Ud,d)),this.singleCache.set(a*2,p),this.singleCache.set(a*2+1,m),[p,m]}outerAt(e,t,n,r){let i=this.net.meta,a=new Int32Array(t.length).fill(-1);for(let o=0;o<t.length;o++){let s=e.trips[t[o]*2],c=this.passStops.get(D(s));if(!c||Yt(this.net,s,0).geo!==D(s))continue;let l=ue(s)===0,u=i[s*4+3],d=n[o],f=r[o];for(let e=0;e<c.length;e+=5){let t=l?c[e]:u-c[e],n=c[e+1],[r,i]=l?[c[e+3],c[e+4]]:[c[e+4],c[e+3]];if(d-f>=t-n-Kd*r&&d+f<=t+n+i){a[o]=c[e+2];break}}}return a}waitForPassing(e,t,n,r,i,a){let o=this.net,s=o.meta,c=this.lag,l=!1;for(let u=0;u<t.length;u++){let d=r[u];if(d<0)continue;let f=t[u],p=e.trips[f*2],m=this.passStops.get(D(p)),h=s[p*4+3],g=ue(p)===0,_=NaN;for(let e=0;e<m.length;e+=5)if(m[e+2]===d){_=g?m[e]:h-m[e];break}let v=this.keyAt(p,_-1),y=n[u]-_;if(v<0)continue;let b=c[f];for(let r=0;r<t.length;r++){let i=t[r];if(c[i]<=b)continue;let l=e.trips[i*2],u=this.passThrough.get(D(l))?.get(d);if(u===void 0)continue;let f=ue(l)===0?u:s[l*4+3]-u;n[r]>=f+y||je(o,l,a-e.trips[i*2+1])<f+y||this.keyAt(l,f-1)===v&&(b=c[i])}if(b<=c[f])continue;let x=e.trips[f*2+1],S=e=>Math.abs(je(o,p,a-x-e)-n[u])<.5,C=c[f],w=Math.min(b,Bd);if(!S(w)){for(let e=0;e<12;e++){let e=(C+w)/2;S(e)?C=e:w=e}w=C}w>c[f]&&(c[f]=w,i[u]=a-x-w,l=!0)}return l}keyAt(e,t){let n=this.net,r=n.pathTable,i=n.pathEntry,a=n.pathFrom,o=n.pathLen,{geo:s,gr:c}=Yt(n,e,0),l=r[s*2],u=r[s*2+1],d=c===0?t:n.meta[e*4+3]-t,f=Qd(a,l,l+u,d)-1;return f<l||d>a[f]+o[f]?-1:c===0?i[f]:i[f]^1}endWait(e,t){let n=t-this.waitFrom[e];this.waitRes[e]>=0&&n>0&&n<1/0&&(this.conflictWaits++,this.conflictWaitSum+=n,n>this.conflictLongest&&(this.conflictLongest=n)),this.waitRes[e]=-1}tauAt(e,t,n,r){let i=t*2**27+Math.round(n*2),a=this.tauCache.get(i*2),o=this.tauCache.get(i*2+1);if(a!==void 0&&o!==void 0)return[a,o];let s=e.meta[t*4+2],c=n-r-20,l=n+r+Ud,u=c<=je(e,t,0)+Wd?0:$d(e,t,c+Wd,s),d=l>=je(e,t,s)-Wd?s:$d(e,t,l,s);return this.tauCache.set(i*2,u),this.tauCache.set(i*2+1,d),[u,d]}},Xd=3;function Zd(e,t,n,r,i){let a=e.get(t);if(a){for(let e=0;e<a.length;e+=Xd)if(a[e]===n)return;a.push(n,r,i)}else e.set(t,[n,r,i])}function Qd(e,t,n,r){for(;t<n;){let i=t+n>>1;e[i]<=r?t=i+1:n=i}return t}function $d(e,t,n,r){let i=e.phases,a=e.meta[t*4],o=e.meta[t*4+1];if(!o)return r;let s=a,c=a+o-1;for(;s<c;){let e=s+c+1>>1;i[e*4+1]<=n?s=e:c=e-1}let l=i[s*4],u=i[s*4+1],d=i[s*4+2],f=i[s*4+3],p=Math.max(0,n-u),m;if(d===0&&f===0)m=s+1<a+o?i[(s+1)*4]-l:0;else if(Math.abs(f)<1e-9)m=p/d;else{let e=d*d+2*f*p;m=e<=0?f<0?d/-f:0:(-d+Math.sqrt(e))/f}return Math.min(r,l+Math.max(0,m))}var ef={tiny:!1};typeof location<`u`&&new URLSearchParams(location.search).get(`slotRoom`)===`tiny`&&(ef.tiny=!0);var tf=1/8,nf=1<<19,rf=0;function af(e,t,n,r=1/0,i=0){if(e&&of(e,t))return e;if(e){let n=sf(e,t,i);if(n.end<=e.cap&&n.end<=r)return n}return lf(t,n,i)}function of(e,t){if(t.length/3!==e.at.size)return!1;for(let n=0;n<t.length;n+=3)if(e.first.get(t[n])!==t[n+1]||e.count.get(t[n])!==t[n+2])return!1;return!0}function sf(e,t,n){let r=new Map,i=new Map;for(let e=0;e<t.length;e+=3)r.set(t[e],t[e+1]),i.set(t[e],t[e+2]);let a=new Map,o=new Map,s=e.free.slice(),c=e.end;for(let[t,n]of e.at){let r=e.size.get(t),l=i.get(t);l!==void 0&&l<=r?(a.set(t,n),o.set(t,r)):c=cf(s,n,r,c)}for(let e=0;e<t.length;e+=3){let r=t[e],i=t[e+2]+Math.floor(t[e+2]*n);if(a.has(r))continue;let l=-1;for(let e=0;e<s.length;e+=2)s[e+1]>=i&&(l<0||s[e+1]<s[l+1])&&(l=e);l<0?(a.set(r,c),c+=i):(a.set(r,s[l]),s[l+1]===i?s.splice(l,2):(s[l]+=i,s[l+1]-=i)),o.set(r,i)}return{at:a,size:o,first:r,count:i,free:s,end:c,cap:e.cap,base:e.base,packed:!1}}function cf(e,t,n,r){let i=0;for(;i<e.length&&e[i]<t;)i+=2;return e.splice(i,0,t,n),i+2<e.length&&e[i]+e[i+1]===e[i+2]&&(e[i+1]+=e[i+3],e.splice(i+2,2)),i>0&&e[i-2]+e[i-1]===e[i]&&(e[i-1]+=e[i+1],e.splice(i,2),i-=2),e[i]+e[i+1]===r&&(r=e[i],e.splice(i,2)),r}function lf(e,t,n){let r=[];for(let t=0;t<e.length;t+=3)r.push(t);r.sort((t,n)=>e[t+1]-e[n+1]);let i=new Map,a=new Map,o=new Map,s=new Map,c=0,l=!0,u=0;for(let t of r){let r=e[t],d=e[t+1],f=e[t+2],p=f+Math.floor(f*n);(d!==c||p!==f)&&(l=!1),i.set(r,c),a.set(r,p),o.set(r,d),s.set(r,f),c+=p,u=Math.max(u,p)}let d=c+(ef.tiny?8:Math.max(4*t,c>>3,u+(u>>3)));return{at:i,size:a,first:o,count:s,free:[],end:c,cap:d,base:++rf,packed:l}}var uf=(e,t)=>t>0&&e>=t?(e-t)*2+1:e*2;function df(e,t){let n=[];for(let r=0;r*4+1<e.length;r++){let i=e[r*4+1];i>0&&n.push(uf(r,t),e[r*4],i)}return n}function ff(e,t,n){let r=e.slice();for(let i=0;i*4+1<e.length;i++)r[i*4]=e[i*4+1]>0?n.at.get(uf(i,t))??0:0;return r}function pf(e,t){let n=[];for(let r=0;r<t.length;r+=3){let i=t[r+1],a=t[r+1]+t[r+2]-1;for(;i<=a&&!(e[i]>0);)i++;if(i>a)continue;for(;!(e[a]>0);)a--;let o=Math.floor(e[i]/32),s=Math.floor(e[a]/32)+e[a]%32;n.push(t[r],o,s-o)}return n}function mf(e){let t=[];for(let n=0;(n+1)*680<=e.length;n++){let r=1/0,i=-1/0;for(let t=n*680;t<(n+1)*680;t+=4)e[t+1]>0&&(r=Math.min(r,e[t]),i=Math.max(i,e[t]+e[t+1]));i>r&&t.push(n,r,i-r)}return t}function hf(e,t){let n=e.slice();for(let r=0;(r+1)*680<=e.length;r++){let i=t.at.get(r),a=t.first.get(r)??0;for(let t=r*680;t<(r+1)*680;t+=4)n[t]=e[t+1]>0&&i!==void 0?i+e[t]-a:0}return n}function gf(e,t){for(let n=0;n<t.length;n+=3){let r=t[n]*680,i=0;for(let t=0;t<170;t++)i+=e[r+t*4+1];if(e[r]!==t[n+1]||i!==t[n+2])return!1}return!0}var _f={drop:typeof location<`u`&&new URLSearchParams(location.search).get(`trainNames`)===`drop`},vf=e=>e===`r32f`?1:e===`rg32f`?2:4,yf={r32f:[33326,6403],rg32f:[33328,33319],rgba32f:[34836,6408],rgba8:[32856,6408]},bf=e=>{let t=e;return new Uint32Array(t.buffer,t.byteOffset,t.length)},xf=(e,t)=>{if(!(e>0))return 0;let n=e+t*32;return n<1<<24?n:0},Sf=new Float32Array;function Cf(e,t,n,r,i){let a=t.first.get(n),o=t.count.get(n),s=e.srcs[0];if(!e.pack&&!e.shift&&s instanceof Float32Array&&e.per[0]===r&&(a+o)*r<=s.length)return s.subarray(a*r,(a+o)*r);Sf.length<o*r&&(Sf=new Float32Array(Math.max(o*r,Sf.length*2)));let c=Sf.subarray(0,o*r);if(e.pack)e.pack(c,a,o);else if(e.shift)for(let e=0;e<o;e++)c[e]=xf(s?.[a+e]??0,i);else if(c.fill(0),s)for(let e=0;e<o*r&&a*r+e<s.length;e++)c[e]=s[a*r+e];return c}function wf(e,t,n,r,i,a,o){let s=n.count.get(r),c=e.layout.first.get(r),l=n.first.get(r),u=t.shift?e.shift?.get(r)??0:0;if(t.shift&&u!==i){let n=e.srcs[0],r=t.srcs[0];if(!n||!r)return n!==r;for(let e=0;e<s;e++)if(xf(n[c+e],u)!==xf(r[l+e],i))return!0;return!1}for(let n=0;n<t.srcs.length;n++){let r=a[n],i=o[n];if(!r||!i){if(!r!=!i)return!0;continue}if(e.srcs[n]===t.srcs[n]&&c===l)continue;let u=t.per[n],d=c*u,f=l*u,p=s*u;if(d+p>r.length||f+p>i.length)return!0;for(let e=0;e<p;e++)if(r[d+e]!==i[f+e])return!0}return!1}function Tf(e,t,n,r,i,a,o){let s=yf[t][1],c=vf(t),l=Math.floor(r/n),u=r%n;if(u&&i){let t=Math.min(i,n-u);e.texSubImage2D(e.TEXTURE_2D,0,u,l,t,1,s,e.FLOAT,a,o),o+=t*c,i-=t,l++}let d=Math.floor(i/n);d&&(e.texSubImage2D(e.TEXTURE_2D,0,0,l,n,d,s,e.FLOAT,a,o),o+=d*n*c,i-=d*n,l+=d),i&&e.texSubImage2D(e.TEXTURE_2D,0,0,l,i,1,s,e.FLOAT,a,o)}function Ef(e,t,n,r,i,a,o){let s=e.gl,c=vf(n);if(t&&e.keepGl&&t.kind===n&&t.layout===i&&!t.dirty&&t.srcs.length===a.srcs.length&&t.srcs.every((e,t)=>e===a.srcs[t]))return t.wrote=new Set,t.compared=!1,t;let l=Math.max(1,Math.ceil(i.cap/r)),u=!!t&&e.keepGl&&t.kind===n&&t.rows>=l,d=!u||t.layout.base!==i.base;if(!u){t&&s.deleteTexture(t.tex);let a=s.createTexture();s.bindTexture(s.TEXTURE_2D,a),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.texImage2D(s.TEXTURE_2D,0,yf[n][0],r,l,0,yf[n][1],s.FLOAT,null),e.gpuBytes.alloc+=r*l*c*4,t={tex:a,kind:n,rows:l,layout:i,srcs:[],shift:null,dirty:null,wrote:`all`}}let f=t;s.bindTexture(s.TEXTURE_2D,f.tex),s.pixelStorei(s.UNPACK_ALIGNMENT,4);let p=a.shift?new Map:null;if(d){let e=a.srcs[0],t;if(i.packed&&!a.pack&&!a.shift&&e instanceof Float32Array&&a.per[0]===c&&e.length>=i.end*c)t=e;else{t=new Float32Array(i.end*c);for(let[e,n]of i.at){let r=a.shift?a.shift(e):0;p?.set(e,r),t.set(Cf(a,i,e,c,r),n*c)}}Tf(s,n,r,0,i.end,t,0),f.wrote=`all`,f.compared=!1}else{let e=new Set,t=o&&o.from.length===f.srcs.length&&o.from.every((e,t)=>e===f.srcs[t])?o.keys:null;f.compared=!t;let l=t?[]:f.srcs.map(e=>e?bf(e):null),u=t?[]:a.srcs.map(e=>e?bf(e):null);for(let[o,d]of i.at){let m=a.shift?a.shift(o):0;p?.set(o,m),!(f.layout.at.get(o)===d&&f.layout.count.get(o)===i.count.get(o)&&!f.dirty?.has(o)&&(t?!t.has(o):!wf(f,a,i,o,m,l,u)))&&(Tf(s,n,r,d,i.count.get(o),Cf(a,i,o,c,m),0),e.add(o))}f.wrote=e}return f.layout=i,f.srcs=a.srcs,f.shift=p,f.dirty=null,f}function Df(e,t,n,r,i,a){let o=e.gl,s=vf(t.kind);o.bindTexture(o.TEXTURE_2D,t.tex),o.pixelStorei(o.UNPACK_ALIGNMENT,4),t.dirty??=new Set;for(let e of i){let i=r.at.get(e),c=r.count.get(e);i!==void 0&&c!==void 0&&(Sf.length<c*s&&(Sf=new Float32Array(Math.max(c*s,Sf.length*2))),Tf(o,t.kind,n,i,c,Sf.subarray(0,c*s).fill(a),0),t.dirty.add(e))}}function Of(e,t,n,r,i){let a=e.gl,o=vf(t.kind),s=Math.max(1,Math.ceil(r.end/n)),c=a.createFramebuffer(),l=a.getParameter(a.READ_FRAMEBUFFER_BINDING);a.bindFramebuffer(a.READ_FRAMEBUFFER,c),a.framebufferTexture2D(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t.tex,0);let u=[];if(a.checkFramebufferStatus(a.READ_FRAMEBUFFER)!==a.FRAMEBUFFER_COMPLETE)u.push(-1);else{let e=new Float32Array(n*s*4);a.readPixels(0,0,n,s,a.RGBA,a.FLOAT,e);let t=new Uint32Array(e.buffer);for(let[e,n]of r.at){let a=bf(Cf(i,r,e,o,i.shift?i.shift(e):0)),s=r.count.get(e),c=!1;for(let e=0;e<s&&!c;e++)for(let r=0;r<o;r++)if(t[(n+e)*4+r]!==a[e*o+r]){c=!0;break}c&&u.push(e)}}return a.bindFramebuffer(a.READ_FRAMEBUFFER,l),a.deleteFramebuffer(c),u}var kf=32768,Af=e=>e+Math.max(Math.floor(e*jf.room),jf.min),jf={room:1/4,min:256,tail:.5,fit:1/32,reach:64,block:128};function Mf(){Object.assign(jf,{room:0,min:4,block:8,reach:4})}typeof location<`u`&&new URLSearchParams(location.search).get(`slotRoom`)===`tiny`&&Mf();var Nf=(e,t)=>(t+1<e.src.length?e.src[t+1]:e.count)-e.src[t];function Pf(e,t=Af(e)){let n=jf.block,r=e?Math.ceil(e/n):0,i=Math.floor((t-e)*(1-jf.tail)),a=new Int32Array(r),o=new Int32Array(r);for(let e=0;e<r;e++)a[e]=e*n,o[e]=e*n+Math.floor(i*e/r);return{src:a,gpu:o,count:e,end:r?o[r-1]+e-a[r-1]:0,cap:t}}function Ff(e,t){let n=0,r=e.src.length-1;for(;n<r;){let i=n+r+1>>1;e.src[i]<=t?n=i:r=i-1}return n}var If=(e,t)=>{let n=Ff(e,t);return e.gpu[n]+t-e.src[n]};function Lf(e,t,n,r){if(!(n<=0))for(let i=Ff(e,t),a=t,o=t+n;a<o;i++){let t=Math.min(o,e.src[i]+Nf(e,i));r(e.gpu[i]+a-e.src[i],a,t-a),a=t}}function Rf(e,t){let n=[];for(let r=0;r+1<t.length;r+=2){if(t[r+1]<=0)continue;let i=If(e,t[r]);n.push(i,If(e,t[r]+t[r+1]-1)+1-i)}return n}function zf(e){let t=[];for(let n=0;n<e.src.length;n++)t.push(e.gpu[n],e.src[n],Nf(e,n));return t}function Bf(e,t,n){let r=[],i=[],a=[],o=(e,t,n)=>{let o=r.length-1;o>=0&&i[o]+a[o]===t&&(e<0?r[o]<0:r[o]>=0&&r[o]+a[o]===e)?a[o]+=n:(r.push(e),i.push(t),a.push(n))};for(let n=0;n+2<t.length;n+=3){let r=t[n],i=t[n+1],a=t[n+2];i<=0||(a<0?o(-1,r,i):Lf(e,a,i,(e,t,n)=>o(e,r+t-a,n)))}Hf(r,a);let s=[];for(let e=0;e<r.length;e++)r[e]>=0&&s.push(e);let c=s.length,l=e=>e===0?0:r[s[e-1]]+a[s[e-1]],u=t=>t===c?e.cap:r[s[t]],d=new Float64Array(c+2),f=new Float64Array(c+1);for(let e=0,t=0;e<r.length;e++)r[e]>=0?(f[t+1]=f[t]+a[e],t++):d[t+1]+=a[e];for(let e=0;e<=c;e++)d[e+1]+=d[e];let p=(e,t)=>d[t+1]-d[e]+f[t]-f[e],m=new Int32Array(r.length).fill(-1),h=e=>e===0?0:s[e-1]+1,g=e=>e===c?r.length:s[e],_=[],v=-1,y=-1;for(let e=0;e<=c;e++){if(d[e+1]===d[e])continue;if(d[e+1]-d[e]<=u(e)-l(e)){let t=l(e);for(let n=h(e);n<g(e);n++)m[n]=t,t+=a[n];_.push(l(e),t);continue}let t=e,n=e,r=()=>u(n)-l(t)>=p(t,n)*(1+jf.fit),i=Math.max(jf.reach*(d[e+1]-d[e]),jf.reach*jf.block);for(;!r();){if(t===0&&n===c||p(t,n)>i)return null;(t>0?a[s[t-1]]:1/0)<=(n<c?a[s[n]]:1/0)?t--:n++,t<=y&&(t=Math.min(t,v))}let o=p(t,n),f=l(t),b=n===c?Math.min(u(n)-f,Math.ceil(o*9/8)+64):u(n)-f,x=b-o,S=x>>1,C=x-S,w=g(e),T=0;for(let e=h(t);e<g(n);e++)m[e]=f+T+Math.floor(C*T/o)+(e>=w?S:0),T+=a[e];for(;_.length&&_[_.length-2]>=f;)_.length-=2;_.push(f,f+b),v=t,y=n,e=n}let b=[],x=[],S=[];for(let e=0;e<r.length;e++){let t=m[e]>=0?m[e]:r[e];m[e]>=0&&S.push(t,i[e],a[e]);let n=b.length-1;n>=0&&x[n]+(i[e]-b[n])===t||(b.push(i[e]),x.push(t))}let C=0;for(let e=0;e<r.length;e++)C=Math.max(C,(m[e]>=0?m[e]:r[e])+a[e]);let w={src:Int32Array.from(b),gpu:Int32Array.from(x),count:n,end:C,cap:e.cap},T=[];for(let e=0;e<w.src.length;e++)T.push(w.gpu[e],Nf(w,e));for(let e=0;e<_.length;e+=2)T.push(_[e],_[e+1]-_[e]);let E=[];for(let t=0;t<e.src.length;t++)E.push(e.gpu[t],Nf(e,t));return{layout:w,spans:_,items:S,holes:Vf(E,T)}}function Vf(e,t){let n=e=>{let t=[];for(let n=0;n+1<e.length;n+=2)e[n+1]>0&&t.push([e[n],e[n]+e[n+1]]);return t.sort((e,t)=>e[0]-t[0])},r=n(e),i=n(t),a=[],o=0;for(let[e,t]of r){let n=e;for(;o<i.length&&i[o][1]<=n;)o++;for(let e=o;e<i.length&&i[e][0]<t&&n<t;e++)i[e][0]>n&&a.push(n,i[e][0]-n),n=Math.max(n,i[e][1]);n<t&&a.push(n,t-n)}return a}function Hf(e,t){let n=-1,r=!0;for(let t=0;t<e.length&&r;t++)e[t]>=0&&(r=e[t]>n,n=e[t]);if(r)return;let i=[];for(let t=0;t<e.length;t++)e[t]>=0&&i.push(t);let a=[...new Set(i.map(t=>e[t]))].sort((e,t)=>e-t),o=new Map(a.map((e,t)=>[e,t+1])),s=new Float64Array(a.length+1),c=new Int32Array(a.length+1).fill(-1),l=new Float64Array(i.length),u=new Int32Array(i.length).fill(-1);i.forEach((n,r)=>{let i=0,d=-1;for(let t=o.get(e[n])-1;t>0;t-=t&-t)s[t]>i&&(i=s[t],d=c[t]);l[r]=i+t[n],u[r]=d;for(let t=o.get(e[n]);t<=a.length;t+=t&-t)l[r]>s[t]&&(s[t]=l[r],c[t]=r)});let d=0;for(let e=1;e<i.length;e++)l[e]>l[d]&&(d=e);let f=new Set;for(;d>=0;d=u[d])f.add(i[d]);for(let t of i)f.has(t)||(e[t]=-1)}var Uf=.75,Wf=.7,Gf=.71,Kf=1.24,qf=2,Jf=.17,Yf=.11,Xf=.7,X=2048,Z=1024,Zf=.6,Qf=`0.14`,$f=10,ep=7,tp=e=>`vec2 q[13]; ${Array.from({length:13},(t,n)=>`q[${n}] = ${e}${n>>1}.${n&1?`zw`:`xy`};`).join(` `)}`,np=e=>`flat ${e} vec4 v_at;\nflat ${e} highp int v_inst;`,rp=`vec2 centrePoint(int inst, int i, vec2 node, vec2 mid, vec2 along, vec2 across) {
  int t = inst * 13 + i;
  vec2 P = texelFetch(u_stline, ivec2(t % ${X}, t / ${X}), 0).xy;
  vec4 h = project(node + P);
  vec2 s = h.xy / h.w * (u_viewport * 0.5) - mid;
  return vec2(dot(s, along), dot(s, across));
}`,ip=Math.floor(2048/$f),ap=6,op=`0.3`,sp=(e,t)=>{let n=e=>`vec3(${yn(e).map(e=>(e/255).toFixed(4)).join(`, `)})`;return[`v_color = ${n(e[0][1])};`,...e.slice(1).map(([r,i],a)=>`v_color = mix(v_color, ${n(i)}, clamp((${t} - ${e[a][0].toFixed(4)}) / ${(r-e[a][0]).toFixed(4)}, 0.0, 1.0));`)].join(`
    `)},cp=sp(Je,`a_speed`),lp=sp(ee,`pv`),up=.5,dp=1.5,fp=`0.15`,pp=`0.6`,mp=`bool selectedLine(int c) {
  if (c == u_sel_line) return true;
  for (int i = 0; i < 16; i++) {
    if (i >= u_sel_n) break;
    if (u_sel_set[i] == c) return true;
  }
  return false;
}`,hp=`#version 300 es
precision highp float;
precision highp int;
${V}
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
${mp}
${Qs}
void main() {
  v_inner = vec4(0.0);
  v_aa = 0.0;
  int flags = int(a_flags + 0.5);
  // T-4262: a slot of a network's set no segment holds (strokeSlots.ts F_HOLE)
  if ((flags & ${kf}) != 0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
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
  float lt = (blueprint && !placement) || ghost ? u_lanes.w : u_width.z * (tram ? ${Uf.toFixed(2)} : 1.0);
  float tw = tram ? ${Uf.toFixed(2)} : 1.0;
  // (T-3580: a line's Traffic view width is its riders' alone, the same on single and double track)
  bool trafficLine = u_kind == 1 && u_band_traffic == 1;
  float tk = tram || turnback || passing || trafficLine ? 1.0 : mix(mix(${Gf.toFixed(2)}, ${Kf.toFixed(2)}, lfw), 1.0, u_lanes.z);
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
  float fs = a_full.x < 0.0 ? 1.0 : a_full.x > 0.0 ? ${up.toFixed(3)} + ${.5.toFixed(3)} * clamp((a_full.x - ${1 .toFixed(3)}) / ${.5.toFixed(3)}, 0.0, 1.0) : 0.0;
  float cas = full ? u_casing + u_full_px + ${fp} * u_width.x * wmul + (fullOut ? u_full_out : 0.0) : u_casing;
  float w, lane_off = 0.0;
  if (u_lane_mode == 0) {
    w = (ghost ? core
      : bpTrack ? u_bp.x * tw * tk + extra + (u_casing > 0.0 ? 2.0 * u_bp.y : 0.0)
      : bpLine ? u_bp.x * tw * tk * bandW + extra + cas
      : u_width.x * wmul * tk * (hsr ? u_hsr.x : 1.0) * (tram ? ${Uf.toFixed(2)} : 1.0) * bandW + extra + cas) + grow;
    // T-2126: a band of shared track a pixel narrower in colour than its slot, the casing showing between
    // (none for a line easing out of the ribbon to its full width)
    if (shared && u_casing <= 0.0 && !full) {
      w = max(1.0, w - u_band_gap * clamp(mix(a_band.z, a_band.w, along) / ${(1-st).toFixed(2)}, 0.0, 1.0));
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
    floorPx = mix(1.0, ${qf.toFixed(1)}, lfw * (1.0 - u_lanes.z));
    // a blueprint's middle and a ghost's inner layer sit between rails of their own
    if ((bpShape && u_casing <= 0.0 && !ghost) || (ghost && u_ghost_layer == 2)) floorPx = max(1.0, floorPx - 2.0 * u_bp.y);
  }
  w = max(w, floorPx);
  if (late) {
    float hr = 0.5 * (u_full_px + ${fp} * w), ho = 0.5 * u_full_out;
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
      : (u_width.x * mix(a_band.x, a_band.y, along) * ${16 .toFixed(1)} + toMid) * (u_cap > 0.0 ? min(1.0, u_cap / (${st.toFixed(2)} * u_width.x)) : 1.0));
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
    ${cp}
  }
  // T-3130: a ghost has no profit (its edge id, all ones, read as -1 found the texture's zero: deep red)
  else if (u_by_profit == 1 && !placement) {
    int ei = int(a_edge);
    float pv = ei < u_profit_n ? texelFetch(u_profit, ivec2(ei % ${X}, ei / ${X}), 0).x : 1e30;
    if (pv > 1e29) v_color = u_track;
    else {
      ${lp}
    }
  }
  else if (placement) v_color = ghost ? u_bp_mid : vec3(1.0);
  else if (u_kind == 0 && bpTrack && !sel) { v_color = swOff ? u_bp_off_mid : u_bp_mid; bpMid = true; }
  else if (u_kind == 0) v_color = sel ? u_sel : busway ? mix(u_track, u_casing_rgb, 0.3) : u_track;
  else v_color = texelFetch(u_line_colours, ivec2(int(a_colour) % ${Z}, int(a_colour) / ${Z}), 0).rgb;
  // other blueprint colours (a planned line, a selected blueprint, by height or speed) lighter
  if (bp && !bpMid && u_casing <= 0.0) v_color = swOff ? mix(v_color, u_bp_off_fade, 0.8) : mix(v_color, vec3(1.0), 0.45);
  bool hot = (u_kind == 1 && int(a_colour) == u_hot.x) || (u_kind == 0 && int(a_edge) == u_hot.y);
  if (hot && u_casing <= 0.0) v_color = mix(v_color, vec3(1.0), ${op});
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
    float hw = max(${(Xf/2).toFixed(2)}, ${(Yf/2).toFixed(3)} * w) * (u_lane_mode > 1 ? 1.0 : smoothstep(u_hsr.y, u_hsr.z, w));
    if (hw >= 0.1) {
      v_wire = vec4(bpShape || placement ? rail : u_wire, u_lane_mode == 0 ? ${Jf.toFixed(3)} * w : 0.0);
      v_wire_hw = hw;
    }
    if (busway) {
      v_road = bpShape || placement ? 0.0 : 1.0;
      v_wire.w = 0.0;
      v_wire_dash = max(6.0, 12.0 * u_band_m);
    }
  }
  // T-1125: a line at capacity a little darker under its red edge, as strong as the edge (T-1152)
  if (u_kind == 1 && a_full.x != 0.0 && u_casing <= 0.0 && !full) v_color = mix(v_color, vec3(0.0), ${Qf} * fs);
  // the band behind a line's two tracks, pale so they stand out on it
  if (u_lane_mode == 1 && u_casing <= 0.0) v_color = mix(v_color, u_casing_rgb, 0.6 * t);
}`,gp=`#version 300 es
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
}`,_p=`#version 300 es
precision highp float;
${V}
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
${np(`out`)}
${rp}
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
  float lvFade = a_sel < -0.5 ? ${qs.toFixed(2)} : 1.0;
  v_dot = 0.0;
  v_bulge = vec2(0.0);
  v_scr = vec4(1.0, 0.0, 0.0, 1.0);
  v_crowd = a_crowd;
  int flags = int(a_st.z + 0.5);
  // 2: double track with passing tracks (T-2249)
  v_lane = (flags & 16) != 0 ? ((flags & ${Ut}) != 0 ? 2.0 : 1.0) : 0.0;
  v_alpha = ((flags & 8) != 0 ? 0.3 : (flags & 2) != 0 ? 0.6 : 1.0) * lvFade; // 8: a blueprint switched off (T-333)
  vec2 half_vp = u_viewport * 0.5;
  vec2 corner = vec2(float(gl_VertexID & 1) * 2.0 - 1.0, gl_VertexID < 2 ? -1.0 : 1.0);
  bool boxes = u_boxes > 0.5;
  bool sel = a_sel > 0.5;
  bool noCrowd = !boxes || (flags & 2) != 0 || max(a_crowd.x, a_crowd.y) <= 0.0 || lvFade < 1.0;
  bool noAnnex = u_room > 0 && (!boxes || (flags & 32) == 0);
  bool inBld = (flags & ${b}) != 0;
  if ((u_no_bp == 1 && (flags & 2) != 0) || (u_pass == 1) != sel || (u_layer == 2 && noCrowd) || noAnnex || (u_bld == 1 && inBld) || (u_bld == 2 && !inBld)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // zoomed out a dot's pie is its platforms' crowd (T-228, T-553): the fullest side's share, and
  // whether it is full
  if (!boxes) v_crowd = vec4(a_dcrowd, 0.0, 0.0);
  // T-3540: a station on single track has one platform, filled as its fuller side (as its dot is)
  else if ((flags & ${he}) != 0) v_crowd = vec4(vec2(max(a_crowd.x, a_crowd.y)), vec2(max(a_crowd.z, a_crowd.w)));
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
  bool tramBox = (flags & ${be}) != 0;
  if (tramBox) hw *= ${ae.toFixed(2)};
  // wide enough for its outer tracks' trains (T-2233)
  if (boxes && (flags & ${Ut}) != 0) hw = max(hw, u_pass_half);
  // a dot covers a plain line through it as drawn now
  float cover = 0.3 * u_line + u_ring + u_pixel;
  float hl = max(len, hw);
  // zoomed out every station is its own dot at its platform's middle (T-313)
  if (!boxes) v_dot = max(((flags & 1) != 0 ? u_radius.y : u_radius.x) * ((flags & ${be}) != 0 ? ${Wf.toFixed(2)} : 1.0), cover);
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
    if ((flags & ${Ce}) != 0) {
      // (T-3615: sized by its box, as stationGeometry.ts oneBar; T-3540: on track drawn as one)
      vec4 cov4 = (flags & ${Gt}) != 0 ? u_one_mid : u_one;
      vec2 cov = tramBox ? cov4.zw : cov4.xy;
      float span = cov.x + cov.y, ends = max(${(2*Mn).toFixed(2)} * hw, span), bump = max(${(2*m).toFixed(2)} * hw + span, ends);
      vec3 bar = vec3(0.5 * ends - cov.x, 0.5 * ends, bump - ends);
      v_size.y = bar.y;
      v_bulge = vec2(bar.z, ${ze.toFixed(2)} * hl);
      v_lane = ((flags & ${s}) != 0 ? -1.0 : 1.0) * (10.0 + bar.x);
      room = bar.x + bar.y + bar.z;
      oneBar = vec2(((flags & ${s}) != 0 ? -1.0 : 1.0) * bar.x, bar.y);
    }
    lo = mn.y - room - ext - 1.0;
    hi = mx.y + room + ext + 1.0;
    xl = mn.x - room - ext - 1.0;
    xh = mx.x + room + ext + 1.0;
    // a terminal's buffer stop end is drawn thick (T-1416, T-1527, the fragment shader)
    if ((flags & 256) != 0 && (flags & 512) != 0) {
      v_size.z = 3.0;
      lo -= ${O.toFixed(2)} * u_ring;
      hi += ${O.toFixed(2)} * u_ring;
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
}`,vp=`#version 300 es
precision highp float;
${V}
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
${np(`out`)}
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
}`,yp=`#version 300 es
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
${V}
in vec2 v_p;
flat in vec3 v_size;
flat in float v_dot;
flat in float v_alpha;
flat in vec4 v_crowd;
flat in vec4 v_scr;
flat in float v_lane;
flat in vec2 v_bulge;
flat in float v_hot;
${np(`in`)}
${rp}
out vec4 o;
${C}
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
  float cap = terminal ? ${Oe.toFixed(2)} * u_ring : u_ring;
  if (terminal) {
    inner *= clamp(f.x + v_size.x - cap + 0.5, 0.0, 1.0);
    d = min(d, boxSdf(vec2(f.x + v_size.x - 0.5 * cap, f.y), vec2(0.5 * cap, v_size.y + ${O.toFixed(2)} * u_ring)));
  }
  float outer = clamp(0.5 - d, 0.0, 1.0);
  if (u_layer == 0) {
    // the whole shape dark, painted white inside the rim next; a blueprint (faded to 0.6, T-2930)
    // is blueprint track's blue: a dark blue rim round a light blue fill
    float a = (v_alpha < 0.99 && !bp ? outer - inner : outer) * (bp ? 1.0 : v_alpha);
    o = vec4(mix(bp ? BP_RIM : u_ink, vec3(1.0), ${pp} * v_hot) * a, a);
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
    float yin = tl * (0.5 + 0.5 * ${Zf.toFixed(1)} * u_lanes.z) * u_lanes.x;
    // at a passing station (T-2249) on the island between the running track and the outer one,
    // where trains on both stop
    float yout = v_lane > 1.5 && v_lane < 2.5 && u_pass_in > 0.0 ? max(u_pass_in, yin + 1.0) : 1e9;
    float ap = inner * clamp(p.y - yin + 0.5, 0.0, 1.0) * clamp(yout - p.y + 0.5, 0.0, 1.0) * clamp(cr.x * reach - abs(p.x) + 0.5, 0.0, 1.0);
    float am = inner * clamp(0.5 - p.y - yin, 0.0, 1.0) * clamp(yout + p.y + 0.5, 0.0, 1.0) * clamp(cr.y * reach - abs(p.x) + 0.5, 0.0, 1.0);
    o = vec4((cr.z > 0.5 ? u_bad : u_crowd_rgb) * ap + (cr.w > 0.5 ? u_bad : u_crowd_rgb) * am, ap + am);
  }
}`,bp=`#version 300 es
precision highp float;
uniform vec4 u_bbox;     // CSS px, y down: left, top, right, bottom
uniform vec2 u_css;      // the canvas, CSS px
void main() {
  vec2 corner = vec2(float(gl_VertexID & 1), gl_VertexID < 2 ? 0.0 : 1.0);
  vec2 s = mix(u_bbox.xy, u_bbox.zw, corner);
  gl_Position = vec4(s.x / u_css.x * 2.0 - 1.0, 1.0 - s.y / u_css.y * 2.0, 0.0, 1.0);
}`,xp=`#version 300 es
precision highp float;
uniform highp sampler2D u_shapes; // per shape SEL_STRIDE texels: middle, along; across, half length, half width; dot radius; its centre line in its frame (T-254)
uniform int u_count;
uniform float u_dpr;
uniform float u_height;  // the canvas, device px
uniform vec3 u_ink;
uniform float u_outline; // CSS px
uniform float u_glow;
out vec4 o;
${C}
void main() {
  vec2 p = vec2(gl_FragCoord.x, u_height - gl_FragCoord.y) / u_dpr;
  float d = 1e9;
  for (int i = 0; i < u_count; i++) {
    int k = i * ${$f};
    vec4 a = texelFetch(u_shapes, ivec2(k, 0), 0);
    vec4 b = texelFetch(u_shapes, ivec2(k + 1, 0), 0);
    vec4 c2 = texelFetch(u_shapes, ivec2(k + 2, 0), 0);
    float dotR = c2.x;
    vec2 r = p - a.xy;
    if (dotR > 0.0) { d = min(d, length(r) - dotR); continue; }
    // nowhere nearer than its middle's distance less its half length and width: skip the line
    if (length(r) - max(b.z, c2.z) - max(b.w, c2.w + abs(c2.y)) > d) continue;
    // its own centre line (T-254)
    ${Array.from({length:ep},(e,t)=>`vec4 t${t} = texelFetch(u_shapes, ivec2(k + ${3+t}, 0), 0);`).join(`
    `)}
    ${tp(`t`)}
    vec2 pf = polyFrame(vec2(dot(r, a.zw), dot(r, b.xy)), q);
    d = min(d, boxSdf(pf, b.zw));
    // T-3332: a one-track station's bulge: its middle across (y), half length (z), half width (w)
    if (c2.w > 0.0) d = min(d, boxSdf(vec2(pf.x, pf.y - c2.y), c2.zw));
  }
  float line = clamp(u_outline + 0.5 - d, 0.0, 1.0);
  float t = clamp((d - u_outline) / u_glow, 0.0, 1.0);
  float s = max(line, 0.35 * (1.0 - t) * (1.0 - t));
  o = vec4(u_ink * s, s);
}`,Sp=`
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
}`,Cp=`#version 300 es
precision highp float;
precision highp int;
${V}
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
${mp}
${Sp}
${Qs}
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
  float kM = cosh(u_psi0 - p.y * ${Ke.toExponential(9)});
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
    float reach = ${(ap+6+4).toFixed(1)} * u_dpr;
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
    float held = boat ? (rawCars > -1.5 ? ${P[0].cars.toFixed(1)} : rawCars > -3.0 ? ${P[1].cars.toFixed(1)} : ${P[2].cars.toFixed(1)}) : bus ? ${It.toFixed(6)} : cars;
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
}`,wp=`#version 300 es
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
${C}
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
    float ol = ${2 .toFixed(1)} * u_dpr, gap = ${ap.toFixed(1)} * u_dpr, gw = ${6 .toFixed(1)} * u_dpr;
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
}`,Tp=`#version 300 es
precision highp float;
precision highp int;
${Sp}
out vec2 v_pos;
void main() {
  vec4 L;
  float d;
  int line;
  v_pos = trainDist(L, d, line) ? lineAt(L, d) : vec2(1e9);
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`,Ep=`#version 300 es
precision mediump float;
out vec4 o;
void main() { o = vec4(0.0); }`,Dp=3600,Op=z(`#77746f`),kp=z(Ee),Ap=z(`#a9cdf3`),jp=z(`#2f62b3`),Mp=.16,Np=.75,Pp=[[10,3],[11,5.25],[12,6],[15,9]],Fp=[[9,.85],[12,3.9],[15,6.6]].map(([e,t])=>[e,t*En]),Ip=[[9,1.4],[11,1.25],[13,1]],Lp=[3,5],Rp=new Int32Array(16),zp=e=>new Float32Array(Math.max(1,e)*4).fill(-1);function Bp(e,t,n){let r=Math.min(n?.length??0,16);for(let e=0;e<r;e++)Rp[e]=n[e];e.uniform1i(t.u_sel_n,r),e.uniform1iv(t.u_sel_set,Rp)}function Vp(e,t){if(!t||t.length!==e.length)return e;let n=new Float32Array(e.length);for(let r=0;r<e.length;r++){let i=t[r];n[r]=i>=0?i:e[r]}return n}var Hp=.2,Up=[1.25,1.75],Wp=pn(`muteThin`)?null:[.45,.5],Gp=!pn(`bandGap`),Kp=!pn(`bays`),qp=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)};function Jp(e){let t=4*_e(0)*I(e),n=Math.max(0,Math.min(1,(t-4)/3)),r=Math.max(0,Math.min(1,(t-7)/3)),i=1-Hp*Math.max(0,Math.min(1,(t-10)/6));return{gap:t,grow:n,t:r,narrow:i,share:Zf*i,reach:n>0?.5*(1+Zf*i)*t:0}}function Yp(e,t){let n=Jp(e),r=n.gap/4,i=B(e,Pp)*(1-n.t)+3*r*n.t,a=Math.max(6*r,i+Ge);return{off:a,half:a+i/2+t+1,mPx:r}}var Xp=14,Zp=z(`#a4a19d`),Qp=.3;function $p(e){let t=new Float32Array(e*3);for(let n=0;n<e;n++)t[n*3]=1;return t}function em(e,t,n,r=0){let i=new Float32Array(Math.max(1,t)*2),a=e.seg,o=0;for(let s=r,c=0;c<t;s++,c++)c>0&&(e.colour[s]!==e.colour[s-1]||e.edge[s]!==e.edge[s-1]||a[s*4]!==a[s*4-2]||a[s*4+1]!==a[s*4-1])&&(o=0),n&&(i[c*2]=n(s)),i[c*2+1]=o,o+=Math.hypot(a[s*4+2]-a[s*4],a[s*4+3]-a[s*4+1]);return i}var tm=[`seg`,`colour`,`edge`,`level`,`flags`,`speed`,`lane`,`band`],nm=.25,rm=e=>e<10?2:+(e<12),im=1e3;function am(e,t,n){let r=t*6,i=n*6;for(let t=0;t<6;t++)if(e[i+t]!==e[r+t])return!0;return e[r]!==e[r+1]||e[r+2]!==e[r+3]||e[r+4]!==e[r+5]}var om=8,sm=10,cm=512;function lm(e,t,n){let r=Math.max(1,Math.ceil(t/16)),i=[new Float32Array(r*4)],a=i[0],o=n?Math.max(0,Math.min(Math.floor(Math.min(n.upTo,t)/16),n.boxes[0].length/4,r)):0;o&&a.set(n.boxes[0].subarray(0,o*4));for(let n=o;n<r;n++){let r=1/0,i=1/0,o=-1/0,s=-1/0;for(let a=n*16,c=Math.min(t,a+16)*4;a*4<c;a++){let t=a*4;r=Math.min(r,e[t],e[t+2]),o=Math.max(o,e[t],e[t+2]),i=Math.min(i,e[t+1],e[t+3]),s=Math.max(s,e[t+1],e[t+3])}a[n*4]=r,a[n*4+1]=i,a[n*4+2]=o,a[n*4+3]=s}for(let e=a;e.length/4>om;){let t=Math.ceil(e.length/4/om),n=new Float32Array(t*4);for(let r=0;r<t;r++){let t=1/0,i=1/0,a=-1/0,o=-1/0;for(let n=r*om;n<Math.min(e.length/4,(r+1)*om);n++)t=Math.min(t,e[n*4]),i=Math.min(i,e[n*4+1]),a=Math.max(a,e[n*4+2]),o=Math.max(o,e[n*4+3]);n.set([t,i,a,o],r*4)}i.push(n),e=n}return i}function um(e,t){let n=[];for(let r=0;r<e.length;r+=2){let i=n.length;i&&n[i-2]+n[i-1]>=e[r]-t?n[i-1]=e[r]+e[r+1]-n[i-2]:n.push(e[r],e[r+1])}return n}function dm(e,t,n,r,i,a,o=0){let s=[],c=!0,l=(e,t)=>{let n=s.length;n&&s[n-2]+s[n-1]>=e?s[n-1]=t-s[n-2]:s.push(e,t-e)},u=(s,d)=>{let f=e[s],p=16*om**s,m=d*p,h=Math.min(t,m+p);if(m>=h)return;let g=0,_=0,v=0,y=0,b=0;for(let e=0;e<4;e++){let[t,o]=n(f[d*4+(e&1?2:0)],f[d*4+(e&2?3:1)]);if(t!==t||o!==o){g=_=v=y=0,b=-1;break}t<-a&&g++,t>r+a&&_++,o<-a&&v++,o>i+a&&y++,t>=-a&&t<=r+a&&o>=-a&&o<=i+a&&b++}if(g===4||_===4||v===4||y===4)c=!1;else if(s<=o||b===4)l(m,h);else for(let t=d*om;t<Math.min(e[s-1].length/4,(d+1)*om);t++)u(s-1,t)},d=e.length-1;for(let t=0;t<e[d].length/4;t++)u(d,t);return c?null:s}function fm(e,t,n,r=0,i=1/0,a=e.count){let o=e.count,s=e.seg,c=e.stretch,l=e.band,u=[];for(let d=0;r<a;d++){if((d&255)==255&&performance.now()>i)return r;let a=r+1;for(;a<o&&a-r<cm;a++){let n=a*4;if(Math.abs(s[n]-s[n-2])+Math.abs(s[n+1]-s[n-1])>.001||e.colour[a]!==e.colour[r]||e.edge[a]!==e.edge[r]||e.level[a]!==e.level[r]||e.flags[a]!==e.flags[r]||c&&c[a]!==c[r]||l&&(am(l,r,a)||e.flags[r]&512)||t&&Math.abs(t[a]-t[r])>sm)break}n[r]=1/0;let f=e=>e<a?s[e*4]:s[e*4-2],p=e=>e<a?s[e*4+1]:s[e*4-1];for(u.push(r,a,1/0);u.length;){let e=u.pop(),t=u.pop(),r=u.pop();if(t-r<2)continue;let i=f(r),a=p(r),o=f(t)-i,c=p(t)-a,l=o*o+c*c,d=r+1,m=-1;for(let e=r+1;e<t;e++){let t=s[e*4]-i,n=s[e*4+1]-a,r=l>0?Math.max(0,Math.min(1,(t*o+n*c)/l)):0,u=t-r*o,f=n-r*c,p=u*u+f*f;p>m&&(m=p,d=e)}let h=Math.min(Math.sqrt(m),e);n[d]=h,u.push(r,d,h,d,t,h)}r=a}return a}function pm(e,t){let n=e.seg,r=t*4,i=t-1;return Math.abs(n[r]-n[r-2])+Math.abs(n[r+1]-n[r-1])>.001||e.colour[t]!==e.colour[i]||e.edge[t]!==e.edge[i]||e.level[t]!==e.level[i]||e.flags[t]!==e.flags[i]||e.stretch&&e.stretch[t]!==e.stretch[i]?!0:!!e.band&&(am(e.band,i,t)||!!(e.flags[i]&512))}function mm(e,t,n,r){let i=e.count,a=new Float32Array(i),o=[],s=r.length;for(let t=0;t<n.length;t+=3){let c=n[t],l=n[t+1],u=n[t+2];if(u<0||l<1)continue;let d=c;if(d!==0&&!pm(e,d)||r[u]!==1/0)for(d++;d<c+l&&!pm(e,d);d++);let f=c+l;if(f!==i&&!pm(e,f)||u+l!==s&&r[u+l]!==1/0)for(f--;f>d&&!pm(e,f);f--);f<=d||(a.set(r.subarray(u+d-c,u+f-c),d),o.push(d,f,u+d-c))}let c=0,l=0;for(let n=0;n<=o.length;n+=3){let r=n<o.length?o[n]:i;r>l&&(c+=fm(e,t,a,l,1/0,r)-l),n<o.length&&(l=o[n+1])}return{sig:a,copied:o,worked:c}}function hm(e,t,n,r){let i=gm(e,t,n,r);return i.fill(0,i.strokes.count),i}function gm(e,t,n,r){let i=e.count,a=0;for(let e=0;e<i;e++)t[e]>n&&a++;let o=new Uint32Array(a);for(let e=0,r=0;e<i;e++)t[e]>n&&(o[r++]=e);let s=_m(e,a,r);return{strokes:s,first:o,fill:(t,n)=>vm(s,e,o,r,t,n)}}function _m(e,t,n){return{seg:new Float32Array(t*4),colour:new Uint32Array(t),edge:new Uint32Array(t),level:new Float32Array(t),flags:new Float32Array(t),speed:n?new Float32Array(t):void 0,dist:new Float32Array,stretch:e.stretch?new Float32Array(t):void 0,lane:e.lane?new Uint8Array(t*2):void 0,band:e.band?new Int16Array(t*6):void 0,count:t}}function vm(e,t,n,r,i,a){let o=e.count,s=t.count,{seg:c,colour:l,edge:u,level:d,flags:f}=e,p=e.speed,m=e.lane,h=e.stretch,g=e.band;for(let e=i;e<Math.min(a,o);e++){let i=n[e],a=(e+1<o?n[e+1]:s)-1;if(c[e*4]=t.seg[i*4],c[e*4+1]=t.seg[i*4+1],c[e*4+2]=t.seg[a*4+2],c[e*4+3]=t.seg[a*4+3],l[e]=t.colour[i],u[e]=t.edge[i],d[e]=t.level[i],f[e]=t.flags[i],p&&(p[e]=r[i]),h&&(h[e]=t.stretch[i]),m&&(m[e*2]=t.lane[i*2],m[e*2+1]=t.lane[a*2+1]),g){let n=t.band,r=e*6,o=i*6,s=a*6;g[r]=n[o],g[r+1]=n[s+1],g[r+2]=n[o+2],g[r+3]=n[s+3],g[r+4]=n[o+4],g[r+5]=n[s+5]}}}function ym(e,t,n,r,i,a){let o=i.strokes,s=i.first;if(!o.speed!=!r||!o.lane!=!e.lane||!o.stretch!=!e.stretch||!o.band!=!e.band)return null;let c=e.count,l=[],u=[],d=e=>{let t=0,n=s.length;for(;t<n;){let r=t+n>>1;s[r]<e?t=r+1:n=r}return t},f=0;for(let e=0;e<=a.length;e+=3){let r=e<a.length?a[e]:c,i=l.length;for(let e=f;e<r;e++)t[e]>n&&l.push(e);if(l.length>i&&u.push(i,l.length-i,-1),e===a.length)break;let o=a[e],p=a[e+1],m=a[e+2],h=d(m),g=d(m+p-o),_=l.length;for(let e=h;e<g;e++)l.push(s[e]-m+o);g>h&&u.push(_,g-h,h),f=p}let p=Uint32Array.from(l),m=_m(e,p.length,r);for(let t=0;t<u.length;t+=3){let n=u[t],i=u[t+1],a=u[t+2];a<0?vm(m,e,p,r,n,n+i):(m.seg.set(o.seg.subarray(a*4,(a+i)*4),n*4),m.colour.set(o.colour.subarray(a,a+i),n),m.edge.set(o.edge.subarray(a,a+i),n),m.level.set(o.level.subarray(a,a+i),n),m.flags.set(o.flags.subarray(a,a+i),n),m.speed&&m.speed.set(o.speed.subarray(a,a+i),n),m.stretch&&m.stretch.set(o.stretch.subarray(a,a+i),n),m.lane&&m.lane.set(o.lane.subarray(a*2,(a+i)*2),n*2),m.band&&m.band.set(o.band.subarray(a*6,(a+i)*6),n*6))}return{strokes:m,first:p,runs:Int32Array.from(u)}}var bm=4096,xm=class{gl;vao;count=0;wmulBuf;fullBuf;bufs=[];cap=0;seg=new Float32Array;colour=new Uint32Array;edge=new Uint32Array;level=new Float32Array;flags=new Float32Array;speed=new Float32Array;lane=new Uint8Array;wmul=new Float32Array;full=new Float32Array;band=new Int16Array;constructor(e,t){this.gl=e,this.vao=e.createVertexArray(),e.bindVertexArray(this.vao);let n=(n,r,i,a=!1,o=!1,s=0)=>{let c=t(n),l=e.createBuffer();return this.bufs.push(l),c<0||(e.bindBuffer(e.ARRAY_BUFFER,l),e.enableVertexAttribArray(c),a?e.vertexAttribIPointer(c,r,i,s,0):e.vertexAttribPointer(c,r,i,o,s,0),e.vertexAttribDivisor(c,1)),l};n(`a_seg`,4,e.FLOAT),n(`a_colour`,1,e.UNSIGNED_INT,!0),n(`a_edge`,1,e.UNSIGNED_INT,!0),n(`a_level`,1,e.FLOAT),n(`a_flags`,1,e.FLOAT),n(`a_speed`,1,e.FLOAT),n(`a_lane`,2,e.UNSIGNED_BYTE,!1,!0),this.wmulBuf=n(`a_wmul`,3,e.FLOAT),this.fullBuf=n(`a_full`,2,e.FLOAT);let r=n(`a_band`,4,e.SHORT,!1,!0,12),i=t(`a_band_m`);i>=0&&(e.bindBuffer(e.ARRAY_BUFFER,r),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.SHORT,!0,12,8),e.vertexAttribDivisor(i,1)),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null)}grow(e){let t=this.gl,n=Math.max(bm,this.cap);for(;n<e;)n*=2;this.cap=n,this.seg=new Float32Array(n*4),this.colour=new Uint32Array(n),this.edge=new Uint32Array(n),this.level=new Float32Array(n),this.flags=new Float32Array(n),this.speed=new Float32Array(n),this.lane=new Uint8Array(n*2),this.wmul=new Float32Array(n*3),this.full=new Float32Array(n*2),this.band=new Int16Array(n*6);let r=[16,4,4,4,4,4,2,12,8,12];this.bufs.forEach((e,i)=>{t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,n*r[i],t.DYNAMIC_DRAW)})}fill(e,t,n){let r=this.gl;n>this.cap&&this.grow(n);let{seg:i,colour:a,edge:o,level:s,flags:c,speed:l,lane:u,wmul:d,full:f,band:p}=this,m=0;for(let n=0;n<t.length;n+=2){let r=t[n],h=t[n+1];Sm(i,m*4,e.seg,r*4,h*4),Sm(a,m,e.colour,r,h),Sm(o,m,e.edge,r,h),Sm(s,m,e.level,r,h),Sm(c,m,e.flags,r,h),Sm(l,m,e.speed,r,h),e.lane&&Sm(u,m*2,e.lane,r*2,h*2),e.wmul&&Sm(d,m*3,e.wmul,r*3,h*3),e.full&&Sm(f,m*2,e.full,r*2,h*2),e.band&&Sm(p,m*6,e.band,r*6,h*6),m+=h}if(e.lane||u.fill(255,0,n*2),!e.wmul){d.fill(0,0,n*3);for(let e=0;e<n;e++)d[e*3]=1}e.full||f.fill(0,0,n*2),e.band||p.fill(0,0,n*6);let h=[i,a,o,s,c,l,u,d,f,p],g=[4,1,1,1,1,1,2,3,2,6];this.bufs.forEach((e,t)=>{r.bindBuffer(r.ARRAY_BUFFER,e),r.bufferSubData(r.ARRAY_BUFFER,0,h[t],0,n*g[t])}),r.bindBuffer(r.ARRAY_BUFFER,null),this.count=n}dispose(){let e=this.gl;e.deleteVertexArray(this.vao);for(let t of this.bufs)e.deleteBuffer(t);this.bufs=[],this.count=0}};function Sm(e,t,n,r,i){if(i>48)e.set(n.subarray(r,r+i),t);else for(let a=0;a<i;a++)e[t+a]=n[r+a]}var Cm=e=>e===`r32f`?1:e===`rg32f`?2:4;function wm(e,t,n,r,i=e.res){let a=e.gl,o=n===`r32f`?1:n===`rg32f`?2:4,s=Math.max(1,Math.ceil(t.length/o)),c=Math.max(1,Math.ceil(s/r)),l=n===`rgba8`?new Uint8Array(r*c*4):new Float32Array(r*c*o);l.set(t);let u=a.createTexture();return a.bindTexture(a.TEXTURE_2D,u),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.pixelStorei(a.UNPACK_ALIGNMENT,4),n===`r32f`?a.texImage2D(a.TEXTURE_2D,0,a.R32F,r,c,0,a.RED,a.FLOAT,l):n===`rg32f`?a.texImage2D(a.TEXTURE_2D,0,a.RG32F,r,c,0,a.RG,a.FLOAT,l):n===`rgba32f`?a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,r,c,0,a.RGBA,a.FLOAT,l):a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,r,c,0,a.RGBA,a.UNSIGNED_BYTE,l),i.push({del:()=>a.deleteTexture(u)}),u}var Tm={r32f:[33326,6403,5126],rg32f:[33328,33319,5126],rgba32f:[34836,6408,5126],rgba8:[32856,6408,5121]},Em=e=>e.byteOffset%4==0&&e.byteLength%4==0?new Uint32Array(e.buffer,e.byteOffset,e.byteLength/4):null;function Dm(e,t,n){let r=Em(e),i=Em(t),a=[],o=Math.ceil(Math.max(e.byteLength,t.byteLength)/4/n);if(!r||!i)return o?[0,o]:[];let s=r.length,c=i.length;for(let e=0;e<o;e++){let t=e*n,o=t+n,l=!1,u=Math.min(o,s,c);for(let e=t;e<u;e++)if(r[e]!==i[e]){l=!0;break}if(!l){for(let e=Math.max(t,u);e<Math.min(o,Math.max(s,c));e++)if((e<s?r[e]:0)!==(e<c?i[e]:0)){l=!0;break}}if(!l)continue;let d=a.length;d&&a[d-2]+a[d-1]===e?a[d-1]++:a.push(e,1)}return a}function Om(e,t,n,r,i,a){let o=e.gl,s=Cm(r),c=n.length,l=Math.max(1,Math.ceil(Math.max(1,Math.ceil(c/s))/i)),[u,d,f]=Tm[r],p;if(t&&t.kind===r&&t.width===i&&l<=t.rows&&e.keepGl){if(n===t.data&&!a)return t;p=a??Dm(t.data,n,r===`rgba8`?i:i*s)}else{let a=l+Math.max(4,l>>3),c=o.createTexture();o.bindTexture(o.TEXTURE_2D,c),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,u,i,a,0,d,f,null),e.gpuBytes.alloc+=i*a*s*(r===`rgba8`?1:4),t={tex:c,kind:r,width:i,rows:a,data:n},p=[0,l]}let m=i*s;o.bindTexture(o.TEXTURE_2D,t.tex),o.pixelStorei(o.UNPACK_ALIGNMENT,4);let h=r===`rgba8`?Uint8Array:Float32Array;for(let e=0;e+1<p.length;e+=2){let r=p[e],a=Math.min(t.rows,p[e]+p[e+1]),s=Math.max(r,Math.min(a,Math.floor(c/m)));if(s>r&&o.texSubImage2D(o.TEXTURE_2D,0,0,r,i,s-r,d,f,n,r*m),a>s){let e=new h((a-s)*m),t=s*m;t<c&&e.set(n.subarray(t,Math.min(c,a*m))),o.texSubImage2D(o.TEXTURE_2D,0,0,s,i,a-s,d,f,e,0)}}return t.data=n,t}function Q(e,t,n=e.res){let r=e.gl,i=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW),r.bindBuffer(r.ARRAY_BUFFER,null),n.push({del:()=>r.deleteBuffer(i)}),i}function $(e,t,n,r,i,a,o,s=!1){let c=e.gl,l=c.getAttribLocation(t,n);l<0||(c.bindBuffer(c.ARRAY_BUFFER,r),c.enableVertexAttribArray(l),s?c.vertexAttribIPointer(l,i,a,0,0):c.vertexAttribPointer(l,i,a,!1,0,0),c.vertexAttribDivisor(l,o))}function km(e,t,n=e.res,r,i){if(i?.room&&e.keepGl&&i.full!==`later`)return Lm(e,t,n,r??null,i);let a=e.gl,o=t.count,s=r&&o&&r.old.attribs?.length===tm.length&&!r.old.layout?r:null,c=Am(t,i),l=i?.full instanceof Float32Array?i.full:null,u=!i?.full||!!l&&!!i.fullKept,d=(t,r=!1)=>{let[i,l]=c[t];if(!o)return Q(e,Gm[t](),n);if(!s||r)return Q(e,i(0,o),n);let u=a.createBuffer();n.push({del:()=>a.deleteBuffer(u)}),a.bindBuffer(a.COPY_WRITE_BUFFER,u),a.bufferData(a.COPY_WRITE_BUFFER,o*l,a.STATIC_DRAW),a.bindBuffer(a.COPY_READ_BUFFER,Im(s.old,t));let d=s.runs;for(let e=0;e<d.length;e+=3)d[e+2]>=0?a.copyBufferSubData(a.COPY_READ_BUFFER,a.COPY_WRITE_BUFFER,d[e+2]*l,d[e]*l,d[e+1]*l):a.bufferSubData(a.COPY_WRITE_BUFFER,d[e]*l,i(d[e],d[e+1]));return a.bindBuffer(a.COPY_READ_BUFFER,null),a.bindBuffer(a.COPY_WRITE_BUFFER,null),u},f=[];for(let e=0;e<Um;e++)f.push(d(e));if(f.push(d(Um,!0)),i?.full===`later`){let e=a.createBuffer();n.push({del:()=>a.deleteBuffer(e)}),a.bindBuffer(a.ARRAY_BUFFER,e),a.bufferData(a.ARRAY_BUFFER,Math.max(1,o)*8,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,null),f.push(e)}else f.push(d(Wm,!u));return{...Mm(e,f,n),count:o,wmulPlain:!i?.wmul,wmulHeld:null}}function Am(e,t,n){let r=(e,t)=>(n,r)=>e.subarray(n*t,(n+r)*t),i=e.speed,a=e.lane,o=e.band,s=i?(t,n)=>Vp(i.subarray(t,t+n),e.trainSpeed?.length===i.length?e.trainSpeed.subarray(t,t+n):void 0):(e,t)=>new Float32Array(t).fill(160),c=t?.full instanceof Float32Array?t.full:null,l=t?.wmul??n;return[[r(e.seg,4),16],[r(e.colour,1),4],[r(e.edge,1),4],[r(e.level,1),4],[r(e.flags,1),4],[s,4],[a?r(a,2):(e,t)=>new Uint8Array(t*2).fill(255),2],[o?r(o,6):(e,t)=>new Int16Array(t*6),12],[l?r(l,3):(e,t)=>$p(t),12],[c?r(c,2):(t,n)=>jm(e,t,n),8]]}function jm(e,t,n){let r=e.seg,i=t;for(;i>0&&e.colour[i]===e.colour[i-1]&&e.edge[i]===e.edge[i-1]&&r[i*4]===r[i*4-2]&&r[i*4+1]===r[i*4-1];)i--;let a=em(e,t-i+n,void 0,i);return i===t?a:a.subarray((t-i)*2,(t-i+n)*2)}function Mm(e,t,n){let r=e.gl,i=e.strokeProg,a=r.createVertexArray();n.push({del:()=>r.deleteVertexArray(a)}),r.bindVertexArray(a),$(e,i,`a_seg`,t[0],4,r.FLOAT,1),$(e,i,`a_colour`,t[1],1,r.UNSIGNED_INT,1,!0),$(e,i,`a_edge`,t[2],1,r.UNSIGNED_INT,1,!0),$(e,i,`a_level`,t[3],1,r.FLOAT,1),$(e,i,`a_flags`,t[4],1,r.FLOAT,1),$(e,i,`a_speed`,t[5],1,r.FLOAT,1),$(e,i,`a_wmul`,t[Um],3,r.FLOAT,1),$(e,i,`a_full`,t[Wm],2,r.FLOAT,1);let o=r.getAttribLocation(i,`a_lane`);o>=0&&(r.bindBuffer(r.ARRAY_BUFFER,t[6]),r.enableVertexAttribArray(o),r.vertexAttribPointer(o,2,r.UNSIGNED_BYTE,!0,0,0),r.vertexAttribDivisor(o,1));for(let[e,n,a]of[[`a_band`,4,0],[`a_band_m`,2,8]]){let o=r.getAttribLocation(i,e);o<0||(r.bindBuffer(r.ARRAY_BUFFER,t[7]),r.enableVertexAttribArray(o),r.vertexAttribPointer(o,n,r.SHORT,!0,12,a),r.vertexAttribDivisor(o,1))}return r.bindVertexArray(null),r.bindBuffer(r.ARRAY_BUFFER,null),{vao:a,wmulBuf:t[Um],fullBuf:t[Wm],attribs:t.slice(0,Um).map((e,t)=>({buf:e,bytes:Pm[t]})),res:n}}var Nm=[[Float32Array,4],[Uint32Array,1],[Uint32Array,1],[Float32Array,1],[Float32Array,1],[Float32Array,1],[Uint8Array,2],[Int16Array,6],[Float32Array,3],[Float32Array,2]],Pm=[16,4,4,4,4,4,2,12,12,8],Fm=4,Im=(e,t)=>t<Um?e.attribs[t].buf:t===Um?e.wmulBuf:e.fullBuf;function Lm(e,t,n,r,i){let a=e.gl,o=t.count,s=typeof i.room==`number`?i.room:jf.room,c=r?.old.layout&&r.old.attribs?.length===tm.length?r.old:null,l=c?Bf(c.layout,r.runs,o):null,u=i.full instanceof Float32Array?i.full:null,d=null;if(c&&!c.wmulPlain&&c.wmulHeld){let e=c.wmulHeld,t=r.runs;d=new Float32Array(o*3);for(let n=0;n<t.length;n+=3)d.set(t[n+2]>=0?e.subarray(t[n+2]*3,(t[n+2]+t[n+1])*3):$p(t[n+1]),t[n]*3)}let f=Am(t,i,d);if(!l){let t=c&&c.layout.cap>=o+Math.floor(o*s/2)?c:null,r=Pf(o,t?t.layout.cap:o+Math.max(Math.floor(o*s),jf.min)),i=zf(r),l=[];for(let e=0;e<=Wm;e++){let o=t?Im(t,e):a.createBuffer();a.bindBuffer(a.COPY_WRITE_BUFFER,o),t?a.bufferSubData(a.COPY_WRITE_BUFFER,0,Rm(e,f[e][0],0,r.cap,i)):(n.push({del:()=>a.deleteBuffer(o)}),a.bufferData(a.COPY_WRITE_BUFFER,Rm(e,f[e][0],0,r.cap,i),a.STATIC_DRAW)),l.push(o)}return a.bindBuffer(a.COPY_WRITE_BUFFER,null),e.slotLayouts++,t?Object.assign(t,{count:o,drawn:r.end,layout:r,wmulPlain:!d,wmulHeld:d}):{...Mm(e,l,n),count:o,drawn:r.end,layout:r,wmulPlain:!d,wmulHeld:d}}let p=c;for(let e=0;e<=Wm;e++){a.bindBuffer(a.COPY_WRITE_BUFFER,Im(p,e));for(let t=0,n=0;t+1<l.spans.length;t+=2){let r=l.spans[t],i=l.spans[t+1],o=n;for(;n<l.items.length&&l.items[n]<i;)n+=3;i>r&&a.bufferSubData(a.COPY_WRITE_BUFFER,r*Pm[e],Rm(e,f[e][0],r,i,l.items,o,n))}if(e===Fm)for(let e=0;e+1<l.holes.length;e+=2)a.bufferSubData(a.COPY_WRITE_BUFFER,l.holes[e]*4,new Float32Array(l.holes[e+1]).fill(kf))}return a.bindBuffer(a.COPY_WRITE_BUFFER,null),p.count=o,p.layout=l.layout,p.drawn=l.layout.end,p.wmulHeld=d,p.wmulPlain=p.wmulPlain||!d,!p.wmulPlain&&!d&&(zm(e,p,p.wmulBuf,$p(o),3),p.wmulPlain=!0),u&&!i.fullKept&&zm(e,p,p.fullBuf,u.subarray(0,o*2),2),p}function Rm(e,t,n,r,i,a=0,o=i.length){let[s,c]=Nm[e];if(o-a===3&&i[a]===n&&i[a+2]===r-n)return t(i[a+1],i[a+2]);let l=new s((r-n)*c);e===Fm&&l.fill(kf);for(let e=a;e<o;e+=3)l.set(t(i[e+1],i[e+2]),(i[e]-n)*c);return l}function zm(e,t,n,r,i){let a=e.gl,o=t.layout;if(a.bindBuffer(a.ARRAY_BUFFER,n),!o)a.bufferSubData(a.ARRAY_BUFFER,0,r);else if(o.end){let e=new Float32Array(o.end*i);Lf(o,0,o.count,(t,n,a)=>e.set(r.subarray(n*i,(n+a)*i),t*i)),a.bufferSubData(a.ARRAY_BUFFER,0,e)}a.bindBuffer(a.ARRAY_BUFFER,null)}function Bm(e,t,n,r,i,a){let o=e.gl,s=t.layout;s?Lf(s,i,a,(e,t,i)=>o.bufferSubData(o.ARRAY_BUFFER,e*r*4,n.subarray(t*r,(t+i)*r))):o.bufferSubData(o.ARRAY_BUFFER,i*r*4,n.subarray(i*r,(i+a)*r))}function Vm(e,t,n,r){let i=e.gl,a=t.layout,o=new Uint8Array(t.count*r);if(i.bindBuffer(i.COPY_READ_BUFFER,n),!a)i.getBufferSubData(i.COPY_READ_BUFFER,0,o);else if(a.end){let e=new Uint8Array(a.end*r);i.getBufferSubData(i.COPY_READ_BUFFER,0,e),Lf(a,0,a.count,(t,n,i)=>o.set(e.subarray(t*r,(t+i)*r),n*r))}return i.bindBuffer(i.COPY_READ_BUFFER,null),o}function Hm(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++){let r=new Uint32Array(e[n].buffer,e[n].byteOffset,e[n].length),i=new Uint32Array(t[n].buffer,t[n].byteOffset,t[n].length);if(r.length!==i.length)return!1;for(let e=0;e<r.length;e++)if(r[e]!==i[e])return!1}return!0}var Um=tm.length,Wm=Um+1,Gm=[()=>new Float32Array(4),()=>new Uint32Array(1),()=>new Uint32Array(1),()=>new Float32Array(1),()=>new Float32Array(1),()=>new Float32Array(1).fill(160),()=>new Uint8Array(2).fill(255),()=>new Int16Array(6),()=>$p(1),()=>new Float32Array(2)];function Km(e,t){return t===0?e.length===0:e.length===3&&e[0]===0&&e[1]===t&&e[2]===0}function qm(e,t,n,r){if(!n?.attribs||!r.count)return;let i=e.gl,a=r.count,o=[r.seg,r.colour,r.edge,r.level,r.flags,r.speed?Vp(r.speed,r.trainSpeed):new Float32Array(a).fill(160),r.lane??new Uint8Array(a*2).fill(255),r.band??new Int16Array(a*6)],s=[];n.attribs.forEach(({buf:t,bytes:r},i)=>{let a=Vm(e,n,t,r),c=o[i],l=new Uint8Array(c.buffer,c.byteOffset,c.byteLength);(l.length!==a.length||l.some((e,t)=>e!==a[t]))&&s.push(tm[i])});let c=n.layout;if(c&&c.end){let e=new Float32Array(c.end),t=new Uint8Array(c.end);i.bindBuffer(i.COPY_READ_BUFFER,n.attribs[Fm].buf),i.getBufferSubData(i.COPY_READ_BUFFER,0,e),i.bindBuffer(i.COPY_READ_BUFFER,null),Lf(c,0,c.count,(e,n,r)=>t.fill(1,e,e+r));let r=0;for(let n=0;n<c.end;n++)!t[n]&&e[n]!==32768&&r++;r&&s.push(`${r} slots holding no segment not marked as holes`)}s.length&&console.error(`T-1028 check: the ${t} strokes patched on the GPU differ from the network's in ${s.join(`, `)}`)}function Jm(e,t,n,r=em(n,n.count),i){if(!t||!n.count)return;let a=(r,i)=>{let a=Math.round(i.length/Math.max(1,n.count)),o=Vm(e,t,r,a*4),s=new Uint32Array(i.buffer,i.byteOffset,n.count*a),c=new Uint32Array(o.buffer);return s.some((e,t)=>e!==c[t])};a(t.fullBuf,r.subarray(0,n.count*2))&&console.error(`T-2403 check: the ${i?`lines'`:`track's`} a_full patched by runs differs from a whole one`),i&&a(t.wmulBuf,i.subarray(0,n.count*3))&&console.error(`T-4262 check: the lines' a_wmul after a network differs from the plain widths`)}function Ym(e){let t=e.gl,n=!!t.getExtension(`EXT_color_buffer_float`),r=t.createFramebuffer(),i=t.getParameter(t.READ_FRAMEBUFFER_BINDING),a=[],o=0;for(let[i,s]of Object.entries(e.keptTex)){if(!s)continue;if(s.kind!==`rgba8`&&!n){a.push(`${i} (no float colour buffers to read it)`);continue}if(t.bindFramebuffer(t.READ_FRAMEBUFFER,r),t.framebufferTexture2D(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,s.tex,0),t.checkFramebufferStatus(t.READ_FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE){a.push(`${i} (not readable)`);continue}o++;let e=Cm(s.kind),c=s.data,l=c.length,u=Math.min(s.rows,Math.ceil(Math.max(1,Math.ceil(l/e))/s.width)+1),d=s.kind===`rgba8`,f=d?new Uint8Array(s.width*u*4):new Float32Array(s.width*u*4);t.readPixels(0,0,s.width,u,t.RGBA,d?t.UNSIGNED_BYTE:t.FLOAT,f);let p=new Float32Array(1),m=new Uint32Array(p.buffer),h=d?f:new Uint32Array(f.buffer),g=-1;for(let t=0;t<s.width*u&&g<0;t++)for(let n=0;n<e;n++){let r=t*e+n,i=r<l?c[r]:0;if(p[0]=i,(d?i:m[0])!==h[t*4+n]){g=r;break}}g>=0&&a.push(`${i} (from value ${g})`)}return t.bindFramebuffer(t.READ_FRAMEBUFFER,i),t.deleteFramebuffer(r),a.length&&console.error(`T-4262 check: the kept textures differ from what was put in them: ${a.join(`, `)}`),o}function Xm(e,t,n,r,i,a,o,s,c,l){if(!t||!t.count)return null;let u=e.lodOf.get(t);u||e.lodOf.set(t,u={boxes:null,speed:void 0,sig:null,sigAt:0,working:!1,bands:new Map,making:null});let d=t,f=u.boxes,p=null,m=Math.ceil(i+Math.log2(a)-1e-6);if(e.strokeLod&&o===0&&m<15&&(u.sig&&u.sigAt>=n.count||th(e,t,u,n))){let i=u.bands.get(m)??eh(e,t,u,n,m,r);i&&i.vao.count<t.count&&(u.drawn=m,u.drawnAt=e.strokeRedraws,r&&i.v!==e.perSegV&&(i.v=e.perSegV,i.wm=Qm(e,i.first),i.fu=$m(e,i.strokes,i.first,0,i.first.length,e.linesFull),zm(e,i.vao,i.vao.wmulBuf,i.wm??$p(i.first.length),3),zm(e,i.vao,i.vao.fullBuf,i.fu,2)),d=i.vao,f=i.boxes,p=i)}if(!e.strokeCull||i<7)return{vao:d,ranges:null};d===t&&!u.boxes&&(u.boxes=lm(n.seg,n.count,t.boxesFrom),t.boxesFrom&&e.checkPatch&&!Hm(u.boxes,lm(n.seg,n.count))&&console.error(`T-4262 check: the culling boxes kept from the last set differ from whole ones`),t.boxesFrom=void 0),d===t&&(f=u.boxes);let h=dm(f,d.count,s,c,l,48,rm(i));if(!h)return{vao:d,ranges:null};let g=0;for(let e=1;e<h.length;e+=2)g+=h[e];if(!g)return{vao:d,ranges:h};if(!e.strokeGather||g>4e4)return{vao:d,ranges:um(d.layout?Rf(d.layout,h):h,512)};let _=e.gathers.get(t);_||e.gathers.set(t,_=new xm(e.gl,t=>e.strokeLoc[t]));let v=p?.strokes??n;return _.fill({seg:v.seg,colour:v.colour,edge:v.edge,level:v.level,flags:v.flags,speed:Zm(e,v),lane:v.lane,band:v.band,wmul:r?p?p.wm:e.linesWmul:null,full:r?p?p.fu:e.linesFull:null},h,g),{vao:_,ranges:null}}function Zm(e,t){let n=e.speedShown.get(t);return n||e.speedShown.set(t,n=t.speed?Vp(t.speed,t.trainSpeed?.length===t.speed.length?t.trainSpeed:void 0):new Float32Array(t.count).fill(160)),n}function Qm(e,t){let n=e.linesWmul;if(!n)return null;let r=t.length,i=n.length/3,a=new Float32Array(r*3);for(let e=0;e<r;e++){let o=t[e],s=(e+1<r?t[e+1]:i)-1;a[e*3]=n[o*3],a[e*3+1]=n[o*3+1],a[e*3+2]=n[s*3+2]}return a}function $m(e,t,n,r,i,a,o){let s=em(t,i-r,a?e=>a[n[e]*2]:void 0,r);if(!o){if(r===0&&i===n.length)return s;o=new Float32Array(Math.max(1,n.length)*2)}return o.set(s.subarray(0,(i-r)*2),r*2),o}function eh(e,t,n,r,i,a){if(n.making!==null)return null;n.making=i;let o=performance.now(),s=gm(r,n.sig,nm/I(i),n.speed??null),c=s.strokes.count,l=s.strokes,u=s.first,d=16384,f=0,p=0,m=null,h=-1,g=null,_=null,v=null,y=e=>{for(;e<c&&e>0&&l.colour[e]===l.colour[e-1]&&l.edge[e]===l.edge[e-1]&&l.seg[e*4]===l.seg[e*4-2]&&l.seg[e*4+1]===l.seg[e*4-1];)e++;return Math.min(e,c)},b=()=>{if(f===0)s.fill(p,p+d),p+=d,p>=c&&(f=1,p=0);else if(f===1)m=lm(l.seg,c),a&&(h=e.perSegV,g=Qm(e,u),_=e.linesFull),v=new Float32Array(Math.max(1,c)*2),f=2;else if(f===2){let t=y(Math.min(c,p+d));$m(e,l,u,p,t,a?_:null,v),p=t,p>=c&&(f=3)}else{let t=[],r=km(e,l,t,null,{wmul:g,full:v,room:oh});return n.bands.set(i,{vao:r,strokes:l,first:u,boxes:m,v:h,res:t,wm:a?g:null,fu:a?v:null}),n.making=null,!0}return!1},x=()=>{if(e.lodOf.get(t)!==n)return;let r=performance.now(),i=!1;for(;!i&&performance.now()-r<8;)i=b();e.lodMs+=performance.now()-r,i||setTimeout(x,0)};return e.lodMs+=performance.now()-o,setTimeout(x,0),null}function th(e,t,n,r){if(n.working)return!1;n.working=!0;let i=()=>{if(e.lodOf.get(t)!==n)return;let a=performance.now();n.speed===void 0&&(n.speed=r.speed?Vp(r.speed,r.trainSpeed):null),n.sig??=new Float32Array(r.count),n.sigAt=fm(r,n.speed,n.sig,n.sigAt,a+8),e.lodMs+=performance.now()-a,n.sigAt<r.count?setTimeout(i,0):n.working=!1};return setTimeout(i,0),!1}function nh(e,t,n){let r=e.gl,i=t.attribs,a=(t,i,a,o,s,c=!1,l=!1,u=0,d=0)=>{let f=e.strokeLoc[t];f<0||(r.bindBuffer(r.ARRAY_BUFFER,i),c?r.vertexAttribIPointer(f,a,o,u,n*s+d):r.vertexAttribPointer(f,a,o,l,u,n*s+d))};a(`a_seg`,i[0].buf,4,r.FLOAT,16),a(`a_colour`,i[1].buf,1,r.UNSIGNED_INT,4,!0),a(`a_edge`,i[2].buf,1,r.UNSIGNED_INT,4,!0),a(`a_level`,i[3].buf,1,r.FLOAT,4),a(`a_flags`,i[4].buf,1,r.FLOAT,4),a(`a_speed`,i[5].buf,1,r.FLOAT,4),a(`a_lane`,i[6].buf,2,r.UNSIGNED_BYTE,2,!1,!0),a(`a_band`,i[7].buf,4,r.SHORT,12,!1,!0,12),a(`a_band_m`,i[7].buf,2,r.SHORT,12,!1,!0,12,8),a(`a_wmul`,t.wmulBuf,3,r.FLOAT,12),a(`a_full`,t.fullBuf,2,r.FLOAT,8),r.bindBuffer(r.ARRAY_BUFFER,null)}function rh(e,t){let n=e.lodOf.get(t);if(n)for(let e of n.bands.values())for(let t of e.res)t.del();e.lodOf.delete(t),e.gathers.get(t)?.dispose(),e.gathers.delete(t)}function ih(e,t,n,r,i,a){let o=e.lodOf.get(t);if(!o?.sig||o.working||o.sigAt<o.sig.length||o.making!==null)return null;let s=0;for(let e=0;e<i.length;e+=3)i[e+2]<0&&(s+=i[e+1]);if(s>Math.max(r.count/4,ah))return null;let c=performance.now(),l=r.speed?Vp(r.speed,r.trainSpeed?.length===r.speed.length?r.trainSpeed:void 0):null;if(!l!=!o.speed)return null;let{sig:u,copied:d,worked:f}=mm(r,l,i,o.sig),p={boxes:null,speed:l,sig:u,sigAt:r.count,working:!1,bands:new Map,making:null,drawn:o.drawn,drawnAt:o.drawnAt},m=o.drawnAt===e.strokeRedraws?o.drawn:void 0,h=[],g=0;for(let[t,n]of o.bands){let i=n.vao.layout&&t===m?ym(r,u,nm/I(t),l,n,d):null;if(!i){for(let e of n.res)e.del();continue}let o=i.strokes,s=i.first,c=o.count,f=sh(o,i.runs),_=a?Qm(e,s):null,v=$m(e,o,s,0,c,a?e.linesFull:null),y=[],b=km(e,o,y,{old:n.vao,runs:f},{wmul:_,full:v,fullKept:!0,room:oh}),x=n.res;if(b!==n.vao){for(let e of n.res)e.del();x=y}let S=c;for(let e=0;e<f.length;e+=3)if(f[e+2]!==f[e]){S=f[e];break}for(let e=0;e<f.length;e+=3)f[e+2]<0&&(g+=f[e+1]);let C={vao:b,strokes:o,first:s,boxes:lm(o.seg,c,{boxes:n.boxes,upTo:S}),v:a&&n.v===e.perSegV?-2:-1,res:x,wm:a?_:null,fu:a?v:null};p.bands.set(t,C),h.push(C)}if(e.lodOf.delete(t),e.gathers.get(t)?.dispose(),e.gathers.delete(t),e.lodOf.set(n,p),e.lodMs+=performance.now()-c,e.lodCarried={worked:f,of:r.count,wrote:g,bands:h.length,ms:performance.now()-c},e.checkPatch){let t=new Float32Array(r.count);fm(r,l,t),ch(t,u)||console.error(`T-4274 check: the significance carried through the edit differs from a whole one`);for(let[n,i]of p.bands){let o=hm(r,t,nm/I(n),l),s=[`seg`,`colour`,`edge`,`level`,`flags`,`speed`,`stretch`,`lane`,`band`].filter(e=>!ch(o.strokes[e],i.strokes[e]));ch(o.first,i.first)||s.push(`first`),s.length&&console.error(`T-4274 check: the simplified copy for zoom ${n} carried through the edit differs from a whole one in ${s.join(`, `)}`),qm(e,`zoom ${n} copy`,i.vao,i.strokes),a||Jm(e,i.vao,i.strokes,i.fu??$m(e,i.strokes,i.first,0,i.first.length,null))}}return h}var ah=2e4,oh=1/16;function sh(e,t){let n=[],r=e.seg,i=t=>e.colour[t]===e.colour[t-1]&&e.edge[t]===e.edge[t-1]&&r[t*4]===r[t*4-2]&&r[t*4+1]===r[t*4-1];for(let e=0;e<t.length;e+=3){let r=t[e],a=t[e+1],o=t[e+2];if(o>=0){let e=0;for(;e<a&&r+e>0&&i(r+e);)e++;e&&(n.push(r,e,-1),r+=e,a-=e,o+=e)}a>0&&n.push(r,a,o)}return Int32Array.from(n)}function ch(e,t){if(!e||!t)return!e==!t;if(e.byteLength!==t.byteLength)return!1;let n=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength);for(let e=0;e<n.length;e++)if(n[e]!==r[e])return!1;return!0}function lh(e,t,n){let r=e.gl;r.bindBuffer(r.ARRAY_BUFFER,t),r.bufferSubData(r.ARRAY_BUFFER,0,n),r.bindBuffer(r.ARRAY_BUFFER,null)}var uh=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID & 1) << 2) - 1.0, float((gl_VertexID & 2) << 1) - 1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`,dh=`#version 300 es
precision highp float;
uniform sampler2D u_tex;
out vec4 o;
void main() {
  o = texelFetch(u_tex, ivec2(gl_FragCoord.xy), 0);
}`,fh=12,ph=class{gl;layers;prog;uTex;samples;drawFb=[];resolveFb=[];tex=[];rbs=[];w=0;h=0;key=[];keyObj=null;redraws=0;constructor(e,t){this.gl=e,this.layers=t,this.prog=kt(e,uh,dh),this.uTex=e.getUniformLocation(this.prog,`u_tex`),this.samples=Math.min(e.getParameter(e.SAMPLES)??0,e.getParameter(e.MAX_SAMPLES)??0)}stale(e,t,n,r){let i=this.key,a=e===this.w&&t===this.h&&r===this.keyObj&&i.length===n.length;for(let e=0;a&&e<n.length;e++)a=i[e]===n[e];return!a&&((e!==this.w||t!==this.h)&&this.allocate(e,t),this.key=n,this.keyObj=r,!0)}clear(){this.key=[]}allocate(e,t){let n=this.gl;this.free(),this.w=e,this.h=t;let r=r=>{let i=n.createRenderbuffer();return n.bindRenderbuffer(n.RENDERBUFFER,i),this.samples>1?n.renderbufferStorageMultisample(n.RENDERBUFFER,this.samples,r,e,t):n.renderbufferStorage(n.RENDERBUFFER,r,e,t),this.rbs.push(i),i},i=r(n.DEPTH24_STENCIL8);n.bindRenderbuffer(n.RENDERBUFFER,null);for(let a=0;a<this.layers;a++){if(this.samples>1){let e=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,r(n.RGBA8)),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,i),this.drawFb.push(e)}let a=n.createTexture();n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,1,n.RGBA8,e,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),this.tex.push(a);let o=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,o),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,a,0),this.samples<=1&&(n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,i),this.drawFb.push(o)),this.resolveFb.push(o)}n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null)}free(){let e=this.gl;for(let t of new Set([...this.drawFb,...this.resolveFb]))e.deleteFramebuffer(t);for(let t of this.tex)e.deleteTexture(t);for(let t of this.rbs)e.deleteRenderbuffer(t);this.drawFb=[],this.resolveFb=[],this.tex=[],this.rbs=[],this.w=this.h=0}begin(e){let t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.drawFb[e]),t.viewport(0,0,this.w,this.h),t.clearColor(0,0,0,0),t.clearStencil(0),t.clear(t.COLOR_BUFFER_BIT|t.STENCIL_BUFFER_BIT),this.redraws+=+(e===0)}end(e,t){let n=this.gl;this.samples>1&&(n.bindFramebuffer(n.READ_FRAMEBUFFER,this.drawFb[e]),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,this.resolveFb[e]),n.blitFramebuffer(0,0,this.w,this.h,0,0,this.w,this.h,n.COLOR_BUFFER_BIT,n.NEAREST)),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t[0],t[1])}draw(e){let t=this.gl;t.useProgram(this.prog),t.activeTexture(t.TEXTURE0+fh),t.bindTexture(t.TEXTURE_2D,this.tex[e]),t.uniform1i(this.uTex,fh),t.bindVertexArray(null),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)}};function mh(e,t,r,i,a,o,s){let c=e.gl;e.quiet=!1,e.releaseStaged(r);let l=e.net;if(!l)return null;e.freshFill(),(e.hiddenFor!==l||e.hiddenV!==q.v)&&e.applyHidden(l);let d=e.sync(r);e.bubbles.hide();let f=l.anchor??w(),p=zt(t,f);e.cam=t;let m=s??[c.drawingBufferWidth,c.drawingBufferHeight],h=I(i)*a;e.timer.begin(),c.disable(c.DEPTH_TEST),c.disable(c.STENCIL_TEST),c.disable(c.CULL_FACE),c.enable(c.BLEND),c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA);let g=o.lineScale??1,_=B(i,Fp)*a*g,v=B(i,[[9,.4],[12,1.8],[15,3]])*a*g,y=B(i,[[9,.5],[12,2.1],[15,3]])*a*g,b=B(i,[[9,.6],[12,2],[15,2.4]])*a*g,x=i>=14,S=i<9,C=x?Sn(i):u(i),T=B(15,Fp),E=Sn(15),D=x&&e.passing?Yp(i,C):null;e.passShiftM=D?D.off/D.mPx:0;let O=Jp(i),k=_/a,A=O.share*O.gap,j=e=>{let t=e?Uf:1,n=e?1:Gf+(1-Gf)*O.grow,r=e?1:Kf+(1-Kf)*O.grow,i=k*t*r,a=.5*(i+O.grow*Math.max(0,O.gap+A*t-i))+C;return{single:.5*Math.max(k*t*n,A*t)+C,inner:(1-O.t)*a,outer:a}},M=j(!1),N=j(!0),P={inner:M.inner,outer:M.outer,innerTram:N.inner,outerTram:N.outer},ee={inner:M.single,outer:M.single,innerTram:N.single,outerTram:N.single};e.stationStyle={boxes:x,radius:n(i),linePx:k,ringPx:C,boxLinePx:T,boxRingPx:E,hidden:S,...D?{passHalfPx:D.half}:{},one:P,oneMid:ee};let te=Dh(e,t,f,m[0]/a,m[1]/a),F=vt(t),ne=F?(F[0]-f.merc[0])*Ve:l.stations[0]??0,re=F?(F[1]-f.merc[1])*Ve:l.stations[1]??0,ie=l.stationCount>0&&x&&e.hasStencil,ae=_e(re,f),oe=2*((x&&l.stationCount?nn(ne,re,{mx:0,my:0,ax:ae,ay:0,phi:0},6*ae,te,e.stationStyle,!1).halfWidth:0)-C),se=Math.max(1,Qp*oe)*a,ce=e.strokeCache&&!e.gl.isContextLost()&&Math.max(m[0],m[1])<=e.cacheMax?s?e.snapCache??=new ph(c,2):e.mainCache??=new ph(c,2):null,le=!s&&e.buses.any;s||(e.busesShown=le);let L=o.showStations===!1;return e.stationsOff=L,{cam:t,time:r,zoom:i,dpr:a,opt:o,view:s,gl:c,n:l,uTime:d,a:f,lc:p,vp:m,pxPerUnit:h,k:g,wLine:_,wTrack:v,wSel:y,casing:b,boxes:x,hidden:S,ring:C,boxLinePx:T,boxRingPx:E,pass:D,project:te,midX:ne,midY:re,through:ie,boxWhite:oe,trackCap:se,cache:ce,buses:le,stationsOff:L,redraw:!ce||ce.stale(m[0],m[1],[i,a,...p.m,...p.globe,...p.plane,...p.at,g,+!!o.byLevel,+!!o.bySpeed,+!!o.byProfit,o.selLine,(o.selLines??[]).reduce((e,t)=>e*31+t+1|0,7),o.selEdge,o.hotLine??-1,o.hotEdge??-1,(o.hotBuses??[]).reduce((e,t)=>e*31+t+1|0,7),(o.hotStops??[]).reduce((e,t)=>e*31+t+1|0,7),o.dimOthers??1,o.flatMarks===!1?0:1,o.rampMarks===!1?0:1,le?e.buses.version:-1,+!!ie,e.uploads,+!!e.strokeCull,+!!e.strokeLod,+!!e.strokeGather,+!!e.lineBands,+!!L,q.v],Hs())}}function hh(e,t){let{zoom:n,dpr:r,opt:i,n:a,a:o,lc:s,vp:c,wLine:l,wSel:u,casing:d,cache:f,buses:p,stationsOff:m,redraw:h}=t;if(e.quiet=!0,f&&h&&f.begin(0),h&&!m&&e.floors.draw(s,c,r,n),h&&!m&&n>=14&&e.lots.draw(s,c,r),h&&p){let p=Hs();e.buses.draw(s,o,c,n,r,{wLine:l,casing:d,wSel:u,rail:jp,railShare:Mp,sel:i.selLine,hot:i.hotLine??-1,lit:i.hotBuses??[],litStops:i.hotStops??[],dim:i.dimOthers??1,shades:p,fill:z(p.casing),casingRgb:z(p.casing),paint:i.byLevel?`level`:i.bySpeed?`speed`:i.byProfit?`profit`:null,phases:a.phases,meta:a.meta,trackRgb:Op,stencil:e.keepGl?f?!0:t.view?void 0:e.hasStencil:void 0})}}function gh(e,t){let{zoom:n,dpr:r,opt:i,gl:a,lc:o,vp:s,k:c,wLine:l,pass:u}=t;a.useProgram(e.strokeProg);let d=e.strokeU;R(a,d,o),a.uniform2f(d.u_viewport,s[0],s[1]),a.uniform1i(d.u_sel_line,i.selLine),Bp(a,d,i.selLines),a.uniform1i(d.u_sel_edge,i.selEdge),a.uniform2i(d.u_hot,i.hotLine??-1,i.hotEdge??-1),a.uniform2i(d.u_ahead_n,e.aheadLinesTex?e.aheadN[0]:0,e.aheadEdgesTex?e.aheadN[1]:0),a.activeTexture(a.TEXTURE14),a.bindTexture(a.TEXTURE_2D,e.aheadLinesTex),a.uniform1i(d.u_ahead_lines,14),a.activeTexture(a.TEXTURE15),a.bindTexture(a.TEXTURE_2D,e.aheadEdgesTex),a.uniform1i(d.u_ahead_edges,15),a.activeTexture(a.TEXTURE0),a.uniform1i(d.u_ahead,0),a.uniform1i(d.u_level_hide,q.levels);let f=Wp&&(i.dimOthers??1)<1?Wp:null;a.uniform1f(d.u_dim,f?1:i.dimOthers??1),a.uniform2f(d.u_mute,f?.[0]??0,f?.[1]??0),a.uniform1i(d.u_by_level,+!!i.byLevel),a.uniform1i(d.u_by_speed,+!!i.bySpeed),a.uniform1i(d.u_by_profit,i.byProfit&&e.profitTex?1:0),a.uniform1i(d.u_profit_n,e.profitTex?e.profitN:0),a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.profitTex),a.uniform1i(d.u_profit,12),e.slotPx=i.byLevel||i.bySpeed||i.byProfit?0:l/r;let p=Jp(n),m=!e.lineBands||i.byLevel||i.bySpeed||i.byProfit||e.trafficWidths&&!e.trafficBands?0:qp(Up[0],Up[1],l/r)*(1-p.grow);e.bandPx=m*l/r,e.bandShiftM=e.bandPx/(I(n)*_e(0)),e.bandOn=m,e.bandMPx=m*I(n)*_e(0),a.uniform1f(d.u_band,m),a.uniform1f(d.u_band_m,I(n)*_e(0)*r),a.uniform1i(d.u_band_traffic,+!!e.trafficWidths),a.uniform1f(d.u_band_gap,Gp?1*r:0),a.uniform3fv(d.u_level_colours,e.levelColours),a.uniform3fv(d.u_track,Op),a.uniform3fv(d.u_bad,kp);let h=Hs();a.uniform3fv(d.u_sel,z(h.mapInk)),a.uniform3fv(d.u_casing_rgb,z(h.casing));let g=e.anyFull,_=B(n,[[9,.3],[12,.6],[15,1]])*r*c;a.uniform1i(d.u_full_pass,0),a.uniform1f(d.u_full_px,1.75*_),a.uniform1f(d.u_full_out,1*_),a.uniform1f(d.u_full_dash,16*r),a.uniform3fv(d.u_full_rgb,z(h.fullTrack)),a.uniform1i(d.u_ghost,0),a.uniform3fv(d.u_ghost_rgb,z(h.ghost)),a.uniform1i(d.u_ghost_layer,-1),a.uniform2f(d.u_ghost_min,4*r,2*r),a.uniform3f(d.u_hsr,B(n,Ip),Lp[0]*r,Lp[1]*r),a.uniform3fv(d.u_wire,z(h.tramWire));let v=Math.max(1,Np*Math.max(1,Mp*l/r))*r,y=Math.max(0,Np*(l+2*Math.max(1,Mp*l/r)*r)-2*v);a.uniform2f(d.u_bp,y,v),a.uniform3fv(d.u_bp_mid,Ap),a.uniform3fv(d.u_bp_rail,jp),a.uniform3fv(d.u_bp_off_mid,z(h.offMid)),a.uniform3fv(d.u_bp_off_rail,z(h.offRail)),a.uniform3fv(d.u_bp_off_fade,z(h.offFade)),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,e.tex.colours),a.uniform1i(d.u_line_colours,2),e.laneReachPx=p.reach,e.laneShiftM=2*p.t;let b=p.gap*r;return a.uniform4f(d.u_lanes,b,p.t,p.grow,p.share*b),a.uniform1f(d.u_pass_off,u?u.off*r:0),{u:d,mute:f,lanes:p,bandOn:m,shades:h,fullPass:g,bpMid:y,bpRail:v,G:b,modes:p.t>0?[1,2,3]:[0]}}function _h(e,t){let{zoom:n,dpr:r,opt:i,gl:a,n:o,vp:s,wLine:c,wTrack:l,wSel:u,casing:d,pass:f,project:p,redraw:m,u:h,lanes:g,fullPass:_,G:v,modes:y}=t,b=new Map;if(m){e.strokeInstances=0,e.strokeRedraws++;for(let[t,i,a]of[[e.track,o.track,!1],[e.lines,o.lines,!0]]){let o=Xm(e,t,i,a,n,r,g.grow,p,s[0]/r,s[1]/r);t&&o&&b.set(t,o)}}let x=(t,n,r,i,o=0)=>{if(!t||!t.count)return;let{vao:s,ranges:l}=b.get(t)??{vao:t,ranges:null};a.uniform1i(h.u_kind,n),a.uniform3f(h.u_width,r,u,g.share*v*r/c),a.uniform1f(h.u_cap,o),a.bindVertexArray(s.vao);let f=()=>{if(!l)a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,s.drawn??s.count),e.strokeInstances+=s.drawn??s.count;else for(let t=0;t<l.length;t+=2)nh(e,s,l[t]),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,l[t+1]),e.strokeInstances+=l[t+1]},p=o>0?[[0,0,0]]:[[d,0,0],[0,0,0]];n===1&&_&&o===0&&p.unshift([d,0,2],[d,0,1]),i&&p.push(...o>0?[[0,1,0]]:[[d,1,0],[0,1,0]]);for(let[e,t,n]of p){a.uniform1f(h.u_casing,e),a.uniform1i(h.u_only_sel,t),a.uniform1i(h.u_full_pass,n);for(let e of y)o>0&&e===1||n&&e>1||(a.uniform1i(h.u_lane_mode,e),f())}l&&nh(e,s,0),a.uniform1i(h.u_full_pass,0),a.uniform1i(h.u_lane_mode,0)};return{stroke:x,trackStrokes:(t=0)=>{for(let n of e.hasBlueprint?q.blueprints?[1]:[1,2]:[0]){a.uniform1i(h.u_bp_part,n);let r=n===2?0:t;x(e.track,0,i.byLevel||i.bySpeed||i.byProfit?c:l,i.selEdge>=0,r),e.aheadTrackVao&&(a.uniform1i(h.u_ahead,1),x(e.aheadTrackVao,0,i.byLevel||i.bySpeed||i.byProfit?c:l,i.selEdge>=0,r),a.uniform1i(h.u_ahead,0)),!i.byLevel&&!i.bySpeed&&!i.byProfit&&(x(e.lines,1,c,i.selLine>=0||!!i.selLines?.length,r),e.aheadVao&&(a.uniform1i(h.u_ahead,1),x(e.aheadVao,1,c,i.selLine>=0||!!i.selLines?.length,r),a.uniform1i(h.u_ahead,0)))}a.uniform1i(h.u_bp_part,0),t>0&&f&&x(e.turnback,0,l,!1,t)}}}function vh(e){let{wLine:t,lanes:n,G:r,bpMid:i,bpRail:a,dpr:o,zoom:s}=e,c=Gf+(1-Gf)*n.grow,l=Kf+(1-Kf)*n.grow,u=r*(1+n.share),d=Math.max(t*l,u),f=[t*c,i*c+2*a,d,Math.max(i*l+2*a,u)],p=t*Uf,m=i*Uf+2*a,h=(e,t)=>e+n.grow*Math.max(0,r+t-e),g=[p,m,h(p,n.share*r*Uf),h(m,n.share*r)],_=B(s,Ip),v=[t*c*_,f[1],t*l*_+n.grow*Math.max(0,r*(1+n.share)-t*l),f[3]];return{w:[...f,...g,...v],thick:Math.max(o,d/8)}}function yh(e,t){let{zoom:n,dpr:r,opt:i,gl:a,lc:o,vp:s,wLine:c,wTrack:l,pass:u,through:d,trackCap:f,cache:p,redraw:m,u:h,mute:g,lanes:_,bandOn:v,shades:y,bpMid:b,bpRail:x,G:S,stroke:C,trackStrokes:w}=t;if(m){if(e.highlight){a.uniform1i(h.u_kind,2),a.uniform1f(h.u_cap,0),a.uniform1i(h.u_only_sel,0),a.uniform1f(h.u_casing,.01*r),a.uniform1i(h.u_lane_mode,+(_.t>0)),a.bindVertexArray(e.highlight.vao);for(let[t,n]of[[10,y.mapInk],[6,y.casing]])a.uniform3fv(h.u_sel,z(n)),a.uniform3f(h.u_width,Math.max(b+2*x,c)+t*r,0,_.share*S+t*r),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.highlight.count);if(e.refused){a.bindVertexArray(e.refused.vao);for(let[t,n]of[[10,y.fullTrack],[6,y.casing]])a.uniform3fv(h.u_sel,z(n)),a.uniform3f(h.u_width,Math.max(b+2*x,c)+t*r,0,_.share*S+t*r),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.refused.count)}a.uniform3fv(h.u_sel,z(y.mapInk)),a.uniform1i(h.u_lane_mode,0)}w(),(_.t>0||u)&&C(e.turnback,0,l,!1),e.marks.draw(o,s,n,r,e.levelColours,i.flatMarks!==!1,i.rampMarks!==!1,i.byLevel?vh(t):null,`built`),!i.byLevel&&!i.bySpeed&&!i.byProfit&&!e.trafficWidths&&e.oneWay.draw(o,s,n,r,{wLine:c,band:v,mPx:I(n)*_e(0)*r,sel:g?i.selLine:-1}),e.oneWayTrack.draw(o,s,n,r,{wLine:c*1.8,band:0,mPx:I(n)*_e(0)*r,sel:-1,rgb:z(Hs().mapInk)})}p&&(m&&(p.end(0,s),d&&(p.begin(1),a.useProgram(e.strokeProg),w(f),a.uniform1f(h.u_cap,0),p.end(1,s))),p.draw(0)),bh(e,t)}function bh(e,t){let{zoom:n,dpr:r,opt:i,gl:a,lc:o,vp:s,wLine:c,u:l,modes:u,stroke:d}=t;if(e.placed.length||e.preview?.count||e.marks.previewing){a.useProgram(e.strokeProg),a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.profitTex),a.activeTexture(a.TEXTURE0),a.uniform1i(l.u_ghost,1);for(let t of[...e.placed,e.preview])if(d(t,2,c,!1),t?.count){a.uniform1f(l.u_casing,0),a.uniform1f(l.u_cap,0),a.uniform1i(l.u_only_sel,0),a.bindVertexArray(t.vao);for(let e=0;e<3;e++){a.uniform1i(l.u_ghost_layer,e);for(let e of u)e!==1&&(a.uniform1i(l.u_lane_mode,e),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,t.count))}a.uniform1i(l.u_ghost_layer,-1),a.uniform1i(l.u_lane_mode,0)}a.uniform1i(l.u_ghost,0),e.marks.draw(o,s,n,r,e.levelColours,i.flatMarks!==!1,i.rampMarks!==!1,i.byLevel?vh(t):null,`drawing`),e.preview&&e.oneWayGhost.draw(o,s,n,r,{wLine:c*1.8,band:0,mPx:I(n)*_e(0)*r,sel:-1,rgb:z(Hs().mapInk)})}}function xh(e,t){let{zoom:n,dpr:r,opt:i,gl:a,n:o,uTime:s,lc:c,vp:l,wLine:u,wTrack:d,boxes:f,hidden:p,ring:m,boxLinePx:h,boxRingPx:g,pass:_,project:v,midX:y,midY:b,through:x,boxWhite:S,trackCap:C,cache:w,buses:T,stationsOff:E,u:D,lanes:O,shades:k,trackStrokes:A}=t;if(E||e.floors.drawHall(c,l,r,n,e.board&&!p?e.crowds.hall:null),(o.stationCount||e.standCount)&&!E){kh(e,o,i.groups??null);let t=(i.selStations??[]).filter(e=>e>=0&&e<o.stationCount),T=t.join(`,`),E=i.selStation!==e.selectedStation||T!==e.selectedAlsoKey;e.selectedStation=i.selStation,T!==e.selectedAlsoKey&&(e.selectedAlso=new Set(t),e.selectedAlsoKey=T),Ah(e,o),E&&e.onSelectionDrawn();let[j,M]=e.stationStyle.radius.map(e=>e*r),N=e.stationU;a.useProgram(e.stationProg),R(a,N,c),a.uniform2f(N.u_viewport,l[0],l[1]),a.uniform2f(N.u_radius,j,M),a.uniform1f(N.u_ring,m*r),a.uniform3fv(N.u_ink,e.ink),a.uniform3fv(N.u_bad,kp),a.uniform3fv(N.u_crowd_rgb,Zp),a.uniform1f(N.u_line,u),a.uniform3f(N.u_lanes,O.gap*r,O.t,O.narrow),a.uniform1f(N.u_boxes,+!!f),a.uniform1i(N.u_no_bp,+!!q.blueprints);let P=(i.hotStations??[]).filter(e=>e>=0&&e<o.stationCount);e.hotList.fill(-1),P.slice(0,16).forEach((t,n)=>e.hotList[n]=t),a.uniform1iv(N.u_hot_st,e.hotList),a.uniform1i(N.u_hot_n,Math.min(P.length,16)),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,e.tex.stationLine),a.uniform1i(N.u_stline,11),a.activeTexture(a.TEXTURE0);let ee=tt(15)/r;a.uniform2f(N.u_fixed,(de({boxLinePx:h,boxRingPx:g})-(i.boxShrinkPx??0))*r,ee),a.uniform1f(N.u_pass_half,(_?_.half-(i.boxShrinkPx??0):0)*r);for(let[t,n]of[[N.u_one,e.stationStyle.one],[N.u_one_mid,e.stationStyle.oneMid]])a.uniform4f(t,(n?.inner??0)*r,(n?.outer??0)*r,(n?.innerTram??0)*r,(n?.outerTram??0)*r);let te=0;if(_){let e=O.gap*r,t=O.share*e*d/u,n=O.t>0?.5*(Math.max(d,e+t)-O.t*(e-t)):d;te=Math.max(0,_.off*r-.5*Math.max(n,r))}a.uniform1f(N.u_pass_in,te),a.bindVertexArray(e.stationVao),a.uniform1f(N.u_pixel,r),a.uniform1i(N.u_layer,0);let F=f&&e.bridgeProg?(o.stationLinkIdx?.length??0)/2:0;F&&(Eh(e,c,l,m*r,Rn*r*ee),e.hotPairs(e.bridgeU,o.stationLinkIdx,P));let ne=!f&&e.bridgeProg&&e.connVao?e.connPairs.length/2:0;if(ne){let[t,n]=v(y,b),[i,a]=v(y+1,b),o=Math.max(1e-9,Math.hypot(i-t,a-n));Eh(e,c,l,m*r,(Wn(e.stationStyle)-m)/o),e.hotPairs(e.bridgeU,e.connPairs,P)}let re=(t,n)=>{a.useProgram(e.bridgeProg),a.uniform1i(e.bridgeU.u_pass,t),a.uniform1i(e.bridgeU.u_layer,n),a.bindVertexArray(e.connVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,ne)};e.crowdsShown=!!e.board&&!p;let ie=!1;if(e.crowdsShown){let t=performance.now();e.moving&&t-e.crowdsAt<100?ie=e.crowdsAny:(e.crowdsAt=t,ie=e.crowdsAny=e.crowds.update(o,e.board,s,(t,n)=>{e.crowdBuf&&lh(e,e.crowdBuf,t),e.dotCrowdBuf&&lh(e,e.dotCrowdBuf,n)}))}let ae=ie&&f;a.useProgram(e.stationProg),a.uniform1f(N.u_tint,ie&&!f?1:0),a.uniform1f(N.u_mask,0),(x||f&&e.hasStencil)&&(a.clearStencil(0),a.clear(a.STENCIL_BUFFER_BIT));let I=f&&e.hasStencil&&e.floors.markStencil(c);a.useProgram(e.stationProg);let oe=(t,n,r,i=!0)=>{if(a.useProgram(e.stationProg),a.uniform1i(N.u_pass,t),a.uniform1i(N.u_layer,n),a.bindVertexArray(e.stationVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,o.stationCount),e.standCount&&e.standVao&&t===0&&(a.uniform1i(N.u_hot_n,0),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,e.standLineTex),a.bindVertexArray(e.standVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,e.standCount),a.bindTexture(a.TEXTURE_2D,e.tex.stationLine),a.activeTexture(a.TEXTURE0),a.uniform1i(N.u_hot_n,Math.min(P.length,16)),a.bindVertexArray(e.stationVao)),i&&f&&e.annexes){for(let[t,n]of[[1,32]])e.annexes&n&&(a.uniform1i(N.u_room,t),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,o.stationCount));a.uniform1i(N.u_room,0)}F&&r&&(a.useProgram(e.bridgeProg),a.uniform1i(e.bridgeU.u_pass,t),a.uniform1i(e.bridgeU.u_layer,n),a.bindVertexArray(e.bridgeVao),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,F))},se=t=>{if(!I)return oe(t,0,!0);a.useProgram(e.stationProg),a.uniform1i(N.u_bld,1),oe(t,0,!0),a.enable(a.STENCIL_TEST),a.stencilMask(0),a.stencilFunc(a.EQUAL,0,128),a.useProgram(e.stationProg),a.uniform1i(N.u_bld,2),oe(t,0,!1),a.useProgram(e.stationProg),a.uniform1i(N.u_bld,0),a.stencilMask(255),a.disable(a.STENCIL_TEST)};for(let t of[0,1])if(!(t===0&&p)){if(t===1){let t=e.selectedShapes(v);if(!t.length)break;I&&e.floors.drawSelected(new Set(e.selectedDrawn()),v,l,r,n,e.ink),Oh(e,I?e.selectedShapes(v,!0):t,r,l)}ne&&re(t,0),se(t),ne&&re(t,1),oe(t,1,!0),f&&(x&&(a.enable(a.STENCIL_TEST),a.stencilMask(127),a.stencilFunc(a.ALWAYS,t+1,255),a.stencilOp(a.KEEP,a.KEEP,a.REPLACE),a.colorMask(!1,!1,!1,!1),a.useProgram(e.stationProg),a.uniform1f(N.u_mask,1),F&&(a.useProgram(e.bridgeProg),a.uniform1f(e.bridgeU.u_mask,1)),oe(t,1,!0,!1),a.useProgram(e.stationProg),a.uniform1f(N.u_mask,0),F&&(a.useProgram(e.bridgeProg),a.uniform1f(e.bridgeU.u_mask,0)),a.colorMask(!0,!0,!0,!0),a.stencilMask(255),a.disable(a.STENCIL_TEST)),ae&&oe(t,2,!1),x&&(a.enable(a.STENCIL_TEST),a.stencilFunc(a.EQUAL,t+1,127),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),w?w.draw(1):(a.useProgram(e.strokeProg),A(C),a.uniform1f(D.u_cap,0)),a.disable(a.STENCIL_TEST)))}let ce=e.crowds.stationOfQueue;e.crowdsShown&&f&&ce&&(e.bubbles.sync(e.board,o,ce),e.bubbles.draw(c,l,s,.5*S*r,z(k.walkers),z(k.casing),r))}T&&!E&&e.buses.drawStationStops(c,l,r)}function Sh(e,t){let{cam:n,time:r,zoom:i,dpr:a,opt:o,gl:s,n:c,uTime:l,a:u,lc:d,vp:f,pxPerUnit:p,k:m,pass:h,project:g,lanes:_}=t;if(e.trainsHidden=i<10,o.showTrains&&e.tripCount&&!e.trainsHidden){e.detailedTrains=i>=14&&!o.hollowTrains;let t=B(i,Pp)*a*m;wh(e,r,n,u,g,f[0]/a,f[1]/a,i>=Xp),s.useProgram(e.trainProg),s.uniform1i(e.trainU.u_hollow,+!!o.hollowTrains),s.useProgram(e.trainProg),R(s,e.trainU,d),s.uniform2f(e.trainU.u_viewport,f[0],f[1]),s.uniform1f(e.trainU.u_time,l),s.uniform1f(e.trainU.u_px_per_unit,p),s.uniform1f(e.trainU.u_psi0,x(u)),s.uniform2f(e.trainU.u_min_px,t*2.2/.75,t),jh(e,e.trainU),s.uniform1i(e.trainU.u_line_colours,2),s.uniform1i(e.trainU.u_sel_line,o.selLine),Bp(s,e.trainU,o.selLines),s.uniform1f(e.trainU.u_dim,o.dimOthers??1),s.activeTexture(s.TEXTURE6),s.bindTexture(s.TEXTURE_2D,e.tex.fill),s.uniform1i(e.trainU.u_fill,6),s.uniform3fv(e.trainU.u_bad,kp),s.uniform1i(e.trainU.u_detail,+!!e.detailedTrains),s.uniform1f(e.trainU.u_dpr,a),s.activeTexture(s.TEXTURE7),s.bindTexture(s.TEXTURE_2D,e.tex.cars),s.uniform1i(e.trainU.u_cars,7),s.activeTexture(s.TEXTURE8),s.bindTexture(s.TEXTURE_2D,e.loadTex),s.uniform1i(e.trainU.u_loads,8),s.activeTexture(s.TEXTURE9),s.bindTexture(s.TEXTURE_2D,e.tex.stretch),s.uniform1i(e.trainU.u_stretch,9),s.activeTexture(s.TEXTURE10),s.bindTexture(s.TEXTURE_2D,e.tex.lane),s.uniform1i(e.trainU.u_lane_tex,10),s.uniform2f(e.trainU.u_lane,_.gap*a*.5,_.t),s.uniform1f(e.trainU.u_bands,e.bandPx*a),s.uniform1f(e.trainU.u_bands_m,e.bandMPx*a),s.uniform2f(e.trainU.u_passing,h?h.off*a:0,+!!h),s.uniform1f(e.trainU.u_keep,e.net?.keep??1),s.uniform1i(e.trainU.u_level_hide,q.levels),q.levels&&!e.tex.slevel&&e.putLevels(e.sampleLevels(c)),s.activeTexture(s.TEXTURE13),s.bindTexture(s.TEXTURE_2D,e.tex.slevel),s.uniform1i(e.trainU.u_slevel,13),s.bindVertexArray(e.trainVao);let v=o.selTrain;s.uniform2f(e.trainU.u_sel_trip,v?v.profile:-1,v?v.dep-e.tripEpoch:0);let y=Hs();s.uniform3fv(e.trainU.u_ink,z(y.mapInk)),s.uniform3fv(e.trainU.u_band,z(y.casing)),s.uniform1i(e.trainU.u_pass,0);let b=()=>s.drawArraysInstanced(e.detailedTrains?s.TRIANGLES:s.TRIANGLE_STRIP,0,e.detailedTrains?6*e.maxCars:4,e.tripCount);b(),v&&(s.uniform1i(e.trainU.u_pass,1),s.uniform1i(e.trainU.u_detail,0),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,4,e.tripCount),s.uniform1i(e.trainU.u_pass,2),s.uniform1i(e.trainU.u_detail,+!!e.detailedTrains),b())}}function Ch(e,t,n,r,i,a,o){let s=mh(e,t,n,r,i,a,o);if(!s)return;hh(e,s);let c={...s,...gh(e,s)},l={...c,..._h(e,c)};yh(e,l),xh(e,l),Sh(e,l);let u=s.gl;u.bindVertexArray(null),u.activeTexture(u.TEXTURE0),e.timer.end(),e.quiet=!1}function wh(e,t,n,r,i,a,o,s){let c=performance.now();Th(e,t,n,r,i,a,o,s),e.guardMs=performance.now()-c}function Th(e,t,n,r,i,a,o,s){let c=e.lagDirty;if(e.lagDirty=!1,e.follow){let l=n.globe?null:A(n.merc,xe(r)),u=e.guardOut,d=l?(e,t)=>(wn(l,e,t,a,o,u),u):i;c=e.guard.update({time:t,epoch:e.tripEpoch,trips:e.trips,ends:e.tripEnds,nexts:e.tripNexts,bays:e.tripBays,project:d,w:a,h:o,close:s})||c}else e.guard.lag.some(e=>e!==0)&&(e.guard.lag.fill(0),c=!0);if(!c||e.guard.lag.length!==e.tripCount||!e.tripCount)return;let l=e.gl;l.bindBuffer(l.ARRAY_BUFFER,e.lagBuf),l.bufferSubData(l.ARRAY_BUFFER,0,e.guard.lag),l.bindBuffer(l.ARRAY_BUFFER,null)}function Eh(e,t,n,r,i){let a=e.gl,o=e.bridgeU;a.useProgram(e.bridgeProg),R(a,o,t),a.uniform2f(o.u_viewport,n[0],n[1]),a.uniform1f(o.u_ring,r),a.uniform1f(o.u_bridge,i),a.uniform3fv(o.u_ink,e.ink),a.uniform3fv(o.u_bad,kp),a.uniform3fv(o.u_crowd_rgb,Zp),a.uniform1f(o.u_mask,0),a.uniform1i(o.u_no_bp,+!!q.blueprints)}function Dh(e,t,n,r,i){if(!t.globe){let e=A(t.merc,xe(n));return(t,n)=>{let a=[0,0];return wn(e,t,n,r,i,a),a}}return(e,a)=>{let o=[0,0];return Lt(t,n.merc[0]+e/Ve,n.merc[1]+a/Ve,r,i,o),o}}function Oh(e,t,n,r){let i=e.gl,a=Math.min(t.length,ip),o=e.selData,s=1/0,c=1/0,l=-1/0,u=-1/0;for(let e=0;e<a;e++){let n=t[e],r=e*$f*4;o.fill(0,r,r+$f*4),o.set([n.x,n.y,n.ux,n.uy,n.nx,n.ny,n.halfLength,n.halfWidth,n.dot,...n.bulge?[n.bulge.cy,n.bulge.hl,n.bulge.hw]:[]],r),n.dot>0||o.set(un(n),r+12);let i=(n.dot>0?n.dot:Math.max(n.halfLength,n.bulge?.hl??0)+n.halfWidth+(n.bulge?n.bulge.hw+Math.abs(n.bulge.cy):0))+9;s=Math.min(s,n.x-i),c=Math.min(c,n.y-i),l=Math.max(l,n.x+i),u=Math.max(u,n.y+i)}let d=r[0]/n,f=r[1]/n;if(s=Math.max(0,s),c=Math.max(0,c),l=Math.min(d,l),u=Math.min(f,u),l<=s||u<=c)return;i.activeTexture(i.TEXTURE10),i.bindTexture(i.TEXTURE_2D,e.selTex),i.texSubImage2D(i.TEXTURE_2D,0,0,0,a*$f,1,i.RGBA,i.FLOAT,o,0);let p=e.selU;i.useProgram(e.selProg),i.uniform1i(p.u_shapes,10),i.uniform1i(p.u_count,a),i.uniform4f(p.u_bbox,s,c,l,u),i.uniform2f(p.u_css,d,f),i.uniform1f(p.u_dpr,n),i.uniform1f(p.u_height,r[1]),i.uniform3fv(p.u_ink,e.ink),i.uniform1f(p.u_outline,2),i.uniform1f(p.u_glow,6),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.activeTexture(i.TEXTURE0)}function kh(e,t,n){if(e.groupSrc.groups===n&&e.groupSrc.net===t)return;e.groupSrc={groups:n,net:t};let r=t.stations,i=t.stationShape,a=e=>[r[e*3]+(i?.[e*4]??0),r[e*3+1]+(i?.[e*4+1]??0)],o=[],s=new Int32Array(Math.max(1,t.stationCount)).fill(-1),c=new Set;if(n){let e=new Map(t.stationIds.map((e,t)=>[e,t]));c=new Set((U.peek()?.save.stations??[]).filter(e=>e.brt).map(e=>e.id));let r=new Set((U.peek()?.save.apart??[]).map(([e,t])=>e<t?`${e}|${t}`:`${t}|${e}`));n.members.forEach((n,i)=>{let l=n.map(t=>e.get(t)).filter(e=>e!==void 0);for(let e of l)s[e]=i;let u=(e,n)=>{let i=t.stationIds[l[e]],a=t.stationIds[l[n]];return r.has(i<a?`${i}|${a}`:`${a}|${i}`)};for(let[e,n]of se(l.map(a),r.size?u:void 0))!c.has(t.stationIds[l[e]])&&!c.has(t.stationIds[l[n]])&&o.push(l[e],l[n])})}let l=t.stationLinkIdx;for(let e=0;l&&e<l.length/2;e++){let n=l[e*2],r=l[e*2+1];(s[n]<0||s[n]!==s[r]||c.has(t.stationIds[n])||c.has(t.stationIds[r]))&&o.push(n,r)}e.connPairs=Int32Array.from(o);let u=o.length/2,d=e.connEnds=new Float32Array(Math.max(1,u)*4);for(let e=0;e<u;e++)d.set([...a(o[e*2]),...a(o[e*2+1])],e*4);for(let t of e.connRes)t.del();if(e.connRes=[],e.connVao=null,e.connFlagBuf=null,e.gl&&e.bridgeProg){let t=e.gl,n=e.connVao=t.createVertexArray();e.connRes.push({del:()=>t.deleteVertexArray(n)}),t.bindVertexArray(n),$(e,e.bridgeProg,`a_ends`,Q(e,d,e.connRes),4,t.FLOAT,1),e.connFlagBuf=Q(e,new Float32Array(Math.max(1,u)*2),e.connRes),$(e,e.bridgeProg,`a_bflag`,e.connFlagBuf,2,t.FLOAT,1),t.bindVertexArray(null)}e.selDrawnKey=``}function Ah(e,t){let n=`${e.selectedStation}/${e.selectedAlsoKey}/${q.v}`;if(n===e.selDrawnKey)return;e.selDrawnKey=n;let r=new Float32Array(Math.max(1,t.stationCount));for(let n=0;n<t.stationCount;n++)r[n]=e.stationHidden(n)?-1:+!!e.drawnSelected(n);e.stationSelBuf&&lh(e,e.stationSelBuf,r);let i=n=>{let r=new Float32Array(Math.max(2,n.length));for(let i=0;i<n.length/2;i++){let a=n[i*2],o=n[i*2+1];r[i*2]=e.drawnSelected(a)&&e.drawnSelected(o)?1:0,r[i*2+1]=(Math.round(t.stations[a*3+2])|Math.round(t.stations[o*3+2]))&2?1:0}return r},a=t.stationLinkIdx;a?.length&&e.bridgeFlagBuf&&lh(e,e.bridgeFlagBuf,i(a)),e.connPairs.length&&e.connFlagBuf&&lh(e,e.connFlagBuf,i(e.connPairs))}function jh(e,t){let n=e.gl,r=(e,t,r)=>{n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(r,e)};r(3,e.tex.phases,t.u_phases),r(4,e.tex.meta,t.u_meta),r(0,e.tex.samples,t.u_samples),r(5,e.tex.bendAt,t.u_bend_at),r(14,e.tex.bends,t.u_bends),r(1,e.tex.lines,t.u_lines),n.uniform1i(t.u_back_base,e.net?N(e.net.lineTable,e.net.meta):0),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,e.tex.colours)}var Mh=class{gl;strokeProg;stationProg;trainProg;strokeU;stationU;trainU;probeProg=null;probeU={};marks=new fc;oneWay=new Nt;oneWayTrack=new Nt;oneWayGhost=new Nt;lots=new Ld;floors=new Nl;res=[];previewRes=[];track=null;lines=null;turnback=null;preview=null;highlightRes=[];refusedRes=[];refused=null;highlight=null;stationVao=null;trainVao=null;probeVao=null;tripBuf=null;endBuf=null;loadBuf=null;standBuf=null;lagBuf=null;bayBuf=null;lagDirty=!1;guard=new Yd;follow=!pn(`follow`);tripLag(e){return this.follow&&e>=0?this.guard.lag[e]??0:0}loadTex=null;profitTex=null;profitN=0;profitData=null;tex={phases:null,meta:null,samples:null,bendAt:null,bends:null,lines:null,colours:null,fill:null,cars:null,stretch:null,stationLine:null,lane:null,slevel:null};board=null;crowds=new _u(0);crowdBuf=null;dotCrowdBuf=null;tripIndex(e,t){let n=this.trips;for(let r=0;r<n.length;r+=2)if(n[r]===e&&Math.abs(n[r+1]-t)<.01)return r/2;return-1}crowdsShown=!1;moving=!1;crowdsAt=0;crowdsAny=!1;maxCars=8;detailedTrains=!1;stationShapeBuf=null;stationStyle={boxes:!1,radius:n(12),linePx:0,ringPx:Sn(12),boxLinePx:B(15,Fp),boxRingPx:Sn(15)};trainsHidden=!1;stationsOff=!1;selectedStation=-1;selectedAlso=new Set;selectedAlsoKey=``;stationSelBuf=null;selDrawnKey=``;groupSrc={groups:null,net:null};bridgeProg;bridgeU={};bridgeVao=null;bridgeFlagBuf=null;connPairs=new Int32Array;connEnds=new Float32Array;connVao=null;connFlagBuf=null;connRes=[];selProg;selU={};selTex=null;selData=new Float32Array(ip*$f*4);drawnShapeOf(e,t){return this.stationShapeOf(e,t)}selectedBridges(e){let t=this.net;if(!t)return[];let n=[];if(!this.stationStyle.boxes){let t=this.connPairs,r=this.connEnds,i=Wn(this.stationStyle);for(let a=0;a<t.length/2;a++){if(!this.drawnSelected(t[a*2])||!this.drawnSelected(t[a*2+1]))continue;let o=Fe(r[a*4],r[a*4+1],r[a*4+2],r[a*4+3],e,this.stationStyle);o&&n.push({...o,halfWidth:i})}return n}let r=t.stationLinkIdx,i=t.stationLinks;if(!r||!i)return n;for(let t=0;t<r.length/2;t++){if(!this.drawnSelected(r[t*2])||!this.drawnSelected(r[t*2+1]))continue;let a=Fe(i[t*4],i[t*4+1],i[t*4+2],i[t*4+3],e,this.stationStyle);a&&n.push(a)}return n}stationShapeOf(e,t,n=!1){let r=this.net,i=Math.round(r.stations[e*3+2]),a=i&8192?i&16384?-1:1:0;return nn(r.stations[e*3],r.stations[e*3+1],it(r,e),r.stationShape?.[e*4+3]??0,t,this.stationStyle,!!(i&1),!n&&!!(i&1024),n?0:a,{tram:(i&be)!==0,mid:(i&Gt)!==0})}hotList=new Int32Array(16);hotPairs(e,t,n){let r=0;if(this.hotList.fill(-1),n.length>1)for(let e=0;e*2<t.length&&r<16;e++)n.includes(t[e*2])&&n.includes(t[e*2+1])&&(this.hotList[r++]=e);this.gl.uniform1iv(e.u_hot_st,this.hotList),this.gl.uniform1i(e.u_hot_n,r)}drawnSelected(e){return e===this.selectedStation||this.selectedAlso.has(e)}stationAt(e,t,n,r=7){let i=this.net;if(!i||this.stationsOff)return-1;let a=!this.stationStyle.boxes,[o,s]=n(0,0),[c,l]=n(1e3,0),[u,d]=n(0,1e3),[f,p]=n(1e3,1e3),m=(c-o)/1e3,h=(l-s)/1e3,g=(u-o)/1e3,_=(d-s)/1e3,v=Math.abs(f-(c+u-o))+Math.abs(p-(l+d-s))<.01?this.stationReachNow(i):null,y=1.01*Math.max(Math.hypot(m,h),Math.hypot(g,_)),b=v?jt(this.stationStyle,v.halfWidth,y)+r+2:0;for(let c of this.stationStyle.hidden?[!0]:[!0,!1]){let l=-1,u=1/0;for(let d=i.stationCount-1;d>=0;d--){if(this.drawnSelected(d)!==c||this.stationHidden(d))continue;let f=!a&&!!(i.stations[d*3+2]&32);if(v){let n=i.stations[d*3],r=i.stations[d*3+1],a=v.r[d]*y+b*(f?3:1),c=o+m*n+g*r,l=s+h*n+_*r;if(Math.abs(c-e)>a||Math.abs(l-t)>a)continue}let p=this.drawnShapeOf(d,n);if(!et(p,e,t,r)&&!(f&&this.annexesOf(d,p).some(n=>et(n.shape,e,t,r))))continue;if(!a)return d;let x=Math.hypot(e-p.x,t-p.y);x<u&&([l,u]=[d,x])}if(l>=0)return l}return-1}reachOf=null;stationReachNow(e){return this.reachOf?.net===e?this.reachOf:on(`station.reach`,()=>this.reachNow(e))}reachNow(e){let t=new Float32Array(e.stationCount),n=e.stationShape,r=0,i=this.reachOf,a=i?.net,o=e=>e?new Int32Array(e.buffer,e.byteOffset,e.length):null,s=o(a?.stationShape),c=o(n),l=o(a?.stationAxis),u=o(e.stationAxis),d=o(a?.stationLine),f=o(e.stationLine),p=(e,t,n,r,i)=>{if(!e||!t)return e===t;if((n+1)*i>e.length||(r+1)*i>t.length)return!1;for(let a=0;a<i;a++)if(e[n*i+a]!==t[r*i+a])return!1;return!0},m=(e,t)=>p(s,c,e,t,4)&&p(l,u,e,t,2)&&p(d,f,e,t,26),h=0,g=a?.stationIds,_=t=>{let n=e.stationIds[t];if(g[t+h]===n)return t+h;if(g[t+h+1]===n)return t+ ++h;if(g[t+h-1]===n)return t+--h;let r=mn(a,n);return r>=0&&(h=r-t),r};for(let o=0;o<e.stationCount;o++){r=Math.max(r,n?.[o*4+3]??0);let s=a?_(o):-1;if(s>=0&&m(s,o)){t[o]=i.r[s];continue}let c=it(e,o),l=Xe(c),u=Math.hypot(c.mx,c.my)+Math.hypot(c.ax,c.ay);for(let e=0;e+1<l.length;e+=2)u=Math.max(u,Math.hypot(l[e],l[e+1]));t[o]=u}return a&&(this.checkPatch||Ct())&&on(`dev.check.reach`,()=>{this.reachOf=null;let n=this.reachNow(e).r;Ih(n,t)||console.error(`T-4284 check: the stations' reach kept from the last network differs from a whole build`)}),this.reachOf={net:e,r:t,halfWidth:r},this.reachOf}selectedDrawn(){let e=this.net;if(!e)return[];let t=new Set;for(let n of[this.selectedStation,...this.selectedAlso])n>=0&&n<e.stationCount&&t.add(n);return[...t]}selectedShapes(e,t=!1){let n=[];for(let r of this.selectedDrawn()){if(t&&Math.round(this.net.stations[r*3+2])&2048)continue;let i=this.drawnShapeOf(r,e);n.push(i,...this.annexesOf(r,i).map(e=>e.shape))}return n.concat(this.selectedBridges(e))}annexesOf(e,t){return this.stationStyle.boxes?ot(t,Math.round(this.net.stations[e*3+2]),this.stationStyle.ringPx):[]}upgradeAt(e,t,n,r){let i=this.net;if(!i||this.stationsOff||!this.stationStyle.boxes||e<0||e>=i.stationCount)return 0;let a=this.drawnShapeOf(e,r);for(let r of this.annexesOf(e,a))if(et(r.shape,t,n,1)&&r.kind===1)return ne.waitingRoom;let o=Math.round(i.stations[e*3+2]);if(o&256&&o&512&&et(a,t,n,2)){let[e]=at(a,t,n);if(e<2.5*this.stationStyle.ringPx+2-a.halfLength)return ne.terminal}if(!et(a,t,n,2)){let i=this.lotAt(t,n,r);if(i>=0&&this.lots.lots[i*10+8]===e)return ne.parkRide}return 0}lotAt(e,t,n){return this.stationStyle.boxes&&!this.stationsOff?this.lots.at(e,t,n):-1}selectedStationAt(e,t,n,r=2){if(this.stationsOff)return-1;for(let i of this.selectedDrawn()){let a=this.drawnShapeOf(i,n);if(a&&et(a,e,t,r))return i}return-1}onSelectionDrawn=()=>{};slotPx=0;busesShown=!1;laneReachPx=0;laneShiftM=0;passShiftM=0;passing=!1;hadSamplePass=!1;bandPx=0;bandShiftM=0;bandOn=0;bandMPx=0;get pickBand(){return this.trafficBands?.pick??this.net?.lines.band}get pickBandPx(){return this.trafficBands?this.bandPx*4:this.bandPx}get sampleBand(){return this.trafficBands?.sample??this.net?.sampleBand}get bandReach(){return this.trafficBands?this.trafficReach:8}trafficBands=null;trafficReach=0;lineWidths=null;hasBlueprint=!1;annexes=0;levelColours=new Float32Array([3,2,1,0,-1,-2,-3].flatMap(e=>[...z(le[e])]));get ink(){return z(Hs().stationInk)}timer;hasStencil=!1;cacheMax=0;tripsBy=new Map;tripEpoch=NaN;tripVersion=-1;tripCount=0;trips=new Float32Array;tripEnds=null;tripNexts=null;tripBays=null;net=null;bubbles=new Tu;buses=new wd;get gpuMs(){return this.timer?.ms??null}epoch=NaN;rebases=0;cam=null;onEpoch=()=>{};strokeCache=!pn(`strokeCache`);mainCache=null;snapCache=null;uploads=0;quiet=!1;gpuBytes={up:0,copy:0,alloc:0};lodCarried=null;slotLayouts=0;keepGl=!pn(`keepGl`);strokeCull=!pn(`strokeCull`);strokeLod=!pn(`strokeLod`);lodOf=new Map;strokeGather=!pn(`strokeGather`);lineBands=!1;trafficWidths=!1;gathers=new Map;speedShown=new WeakMap;linesWmul=null;linesFull=null;perSegV=0;strokeRedraws=0;strokeInstances=0;lodMs=0;strokeLoc={};init(e){this.gl=e,this.mainCache=this.snapCache=null;let t=e;if(!t.twCounted){t.twCounted=!0;let n=e=>ArrayBuffer.isView(e)?e:null,r=(t,r)=>{let i=this.gpuBytes;if(t===`bufferData`){let e=n(r[1]);e?i.up+=e.byteLength:typeof r[1]==`number`&&(i.alloc+=r[1])}else if(t===`bufferSubData`){let e=n(r[2]);e&&(i.up+=typeof r[4]==`number`?r[4]*(e.BYTES_PER_ELEMENT??1):e.byteLength)}else if(t===`copyBufferSubData`)i.copy+=r[4];else if(t===`texImage2D`){let e=n(r[8]);e&&(i.up+=e.byteLength)}else if(t===`texSubImage2D`){let t=r[6]===e.RED?1:r[6]===e.RG?2:4;i.up+=r[4]*r[5]*t*(r[7]===e.FLOAT?4:1)}};for(let n of[`bufferData`,`bufferSubData`,`copyBufferSubData`,`texImage2D`,`texSubImage2D`,`deleteBuffer`,`deleteTexture`,`deleteVertexArray`]){let i=t[n];t[n]=(...t)=>(this.quiet||this.uploads++,r(n,t),i.apply(e,t))}}this.profitTex=null,this.profitData&&this.setProfit(this.profitData),this.strokeProg=kt(e,hp,gp);for(let t of[`a_seg`,`a_colour`,`a_edge`,`a_level`,`a_flags`,`a_speed`,`a_lane`,`a_wmul`,`a_full`,`a_band`,`a_band_m`])this.strokeLoc[t]=e.getAttribLocation(this.strokeProg,t);this.stationProg=kt(e,_p,yp),this.marks.init(e),this.oneWay.init(e),this.oneWayTrack.init(e),this.oneWayGhost.init(e),this.lots.init(e),this.floors.init(e),this.bubbles.init(e),this.buses.init(e),this.trainProg=kt(e,Cp,wp),this.hasStencil=(e.getParameter(e.STENCIL_BITS)??0)>0,this.cacheMax=Math.min(e.getParameter(e.MAX_RENDERBUFFER_SIZE)??0,e.getParameter(e.MAX_TEXTURE_SIZE)??0),this.strokeU=W(e,this.strokeProg,[...H,`u_viewport`,`u_width`,`u_casing`,`u_casing_rgb`,`u_cap`,`u_kind`,`u_sel_line`,`u_sel_n`,`u_sel_set`,`u_sel_edge`,`u_hot`,`u_only_sel`,`u_bp_part`,`u_lanes`,`u_lane_mode`,`u_pass_off`,`u_dim`,`u_by_level`,`u_by_speed`,`u_by_profit`,`u_profit`,`u_profit_n`,`u_level_colours`,`u_track`,`u_bad`,`u_sel`,`u_bp`,`u_bp_mid`,`u_bp_rail`,`u_bp_off_mid`,`u_bp_off_rail`,`u_bp_off_fade`,`u_line_colours`,`u_full_pass`,`u_full_px`,`u_full_out`,`u_full_dash`,`u_full_rgb`,`u_full_inside`,`u_ghost`,`u_ghost_layer`,`u_ghost_rgb`,`u_ghost_min`,`u_hsr`,`u_wire`,`u_band`,`u_band_traffic`,`u_band_gap`,`u_band_m`,`u_mute`,`u_level_hide`,`u_ahead_lines`,`u_ahead_edges`,`u_ahead_n`,`u_ahead`]),this.stationU=W(e,this.stationProg,[...H,`u_viewport`,`u_radius`,`u_ring`,`u_ink`,`u_line`,`u_boxes`,`u_fixed`,`u_pass_half`,`u_pass_in`,`u_pass`,`u_layer`,`u_pixel`,`u_bad`,`u_crowd_rgb`,`u_tint`,`u_mask`,`u_stline`,`u_lanes`,`u_hot_st`,`u_hot_n`,`u_room`,`u_bld`,`u_one`,`u_one_mid`,`u_no_bp`]),this.bridgeProg=kt(e,vp,yp),this.bridgeU=W(e,this.bridgeProg,[...H,`u_viewport`,`u_ring`,`u_bridge`,`u_pass`,`u_layer`,`u_ink`,`u_bad`,`u_crowd_rgb`,`u_mask`,`u_hot_st`,`u_hot_n`,`u_no_bp`]),e.useProgram(this.bridgeProg),e.uniform1i(e.getUniformLocation(this.bridgeProg,`u_stline`),11),this.selProg=kt(e,bp,xp),this.selU=W(e,this.selProg,[`u_bbox`,`u_css`,`u_shapes`,`u_count`,`u_dpr`,`u_height`,`u_ink`,`u_outline`,`u_glow`]),this.selTex=wm(this,this.selData,`rgba32f`,ip*$f,[]),this.trainU=W(e,this.trainProg,[...H,`u_viewport`,`u_time`,`u_px_per_unit`,`u_min_px`,`u_phases`,`u_meta`,`u_samples`,`u_bend_at`,`u_bends`,`u_lines`,`u_back_base`,`u_line_colours`,`u_fill`,`u_bad`,`u_detail`,`u_dpr`,`u_cars`,`u_loads`,`u_stretch`,`u_sel_line`,`u_sel_n`,`u_sel_set`,`u_dim`,`u_sel_trip`,`u_pass`,`u_ink`,`u_band`,`u_psi0`,`u_lane_tex`,`u_lane`,`u_hollow`,`u_bands`,`u_bands_m`,`u_passing`,`u_keep`,`u_level_hide`,`u_slevel`]),this.timer=new pt(e),this.tripBuf=e.createBuffer(),this.endBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.endBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1e9]),e.DYNAMIC_DRAW),this.loadBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.loadBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,0]),e.DYNAMIC_DRAW),this.standBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.standBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,-1]),e.DYNAMIC_DRAW),this.lagBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.lagBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array(1),e.DYNAMIC_DRAW),this.bayBuf=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.bayBuf),e.bufferData(e.ARRAY_BUFFER,zp(1),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null),this.loadTex=wm(this,new Float32Array(1),`r32f`,X,[])}setProfit(e){let t=this.gl;this.profitData=e,t&&(this.profitTex&&t.deleteTexture(this.profitTex),this.profitTex=e?.length?wm(this,e,`r32f`,X,[]):null,this.profitN=this.profitTex?e.length:0)}checkPatch=!1;patched=0;gpuDump(){let e={};for(let[t,n]of[[`track`,this.track],[`lines`,this.lines]])n?.attribs?.forEach(({buf:r,bytes:i},a)=>e[`${t}.${tm[a]}`]=[r,Math.max(1,n.drawn??n.count)*i]);return e}setLayers(e){let t=this.net,n=performance.now();if(!t||!this.lines)return;this.layersSrc=e;let r=this.lines,i=!!e&&e.lineWidth.length===r.count,a=i&&e.bands&&e.bands.seg.length===r.count*2?e.bands:null,o=null,s=0;if(i&&!(e.plain&&!a&&this.keepGl)){o=new Float32Array(r.count*3);for(let t=0;t<r.count;t++)o[t*3]=e.lineWidth[t],a&&(o[t*3+1]=a.seg[t*2],o[t*3+2]=a.seg[t*2+1])}o&&this.keepGl&&Lh(o)&&(o=null),s=Mt(`layers.set.wm`,s);let c=r.count>0&&(!this.keepGl||!!o||!r.wmulPlain)&&zh(this,r,o);if(s=Mt(`layers.set.write`,s),r.wmulPlain=!o,r.wmulHeld=o,this.lineWidths=i?e.lineWidth:null,this.linesWmul=o,this.trafficWidths=!!e?.traffic,a!==this.trafficBands){if(this.trafficBands=a,this.trafficReach=0,a)for(let e=0;e<a.sample.length;e+=2)this.trafficReach=Math.max(this.trafficReach,Math.abs(a.sample[e]));this.putLane(t)}s=Mt(`layers.set.lane`,s),(c||!this.keepGl)&&this.perSegV++;let l=e?.fillChanged,u=l&&this.fillSrc===l.from?{keys:l.keys,from:[l.from]}:null;this.fillSrc=e?e.fill:null,this.putTrain(`fill`,t,u),Mt(`layers.set.fill`,s),this.fillStale=!1,this.checkPatch&&this.keepGl&&this.checkTrains([`fill`,`lane`],t),this.layersMs=performance.now()-n}setFull(e,t){let n=this.fullEdges;((!e||!e.size)!=(!n||!n.size)||e&&n&&(e.size!==n.size||![...e].every(e=>n.has(e)))||t!==this.fullTraffic)&&(this.fullEdges=e,this.fullTraffic=t,this.writeFull())}fullEdges=null;fullTraffic=!1;fullKeys=new Map;fullDrawn=``;fullStretch(e,t){return this.fullTraffic?this.fullKeys.get(e*4096+t)??null:null}writeFull(){let e=this.lines,t=this.net,{keys:n,key:r}=this.fullInputs(),i=`${+!!t}/${e?.count}/${r}`;if(this.fullKeys=n,!e||!e.count||!t||i===this.fullDrawn)return;this.fullDrawn=i;let{out:a,any:o}=this.fullValues(t,n,null,null);this.anyFull=o,zm(this,e,e.fullBuf,a,2),this.linesFull=a,this.fullKey=r,this.perSegV++}fullKey=null;fullInputs(){let e=new Map,t=this.board,n=this.fullTraffic?t?.crowdStretches:void 0;for(let r=0;t&&n&&r<n.length;r+=2){let i=r/2;e.set(n[r]*4096+n[r+1],{load:t.crowdLoads[i]??0,hour:t.crowdHours[i]??0})}return{keys:e,key:`${[...this.fullEdges??[]].join(`,`)}/${[...e].map(([e,t])=>`${e}:${t.load}:${t.hour}`).join(`,`)}`}}fullValues(e,t,n,r){let i=e.lines,a=this.fullEdges,o=i.stretch,s=!!a?.size||t.size>0,c=s?e=>{if(a?.size&&a.has(i.edge[e]))return-1;let n=t.size&&o?t.get(i.colour[e]*4096+o[e]):void 0;return n?n.load:0}:void 0,l;if(n&&r){l=new Float32Array(Math.max(1,i.count)*2);for(let e=0;e<n.length;e+=3){let t=n[e],a=n[e+1],o=n[e+2];o>=0?l.set(r.subarray(o*2,(o+a)*2),t*2):l.set(em(i,a,c,t).subarray(0,a*2),t*2)}}else l=em(i,i.count,c);let u=!1;for(let e=0;s&&!u&&e<i.count;e++)u=l[e*2]!==0;return{out:l,kept:!!(n&&r),any:u}}anyFull=!1;setNetwork(e,t){let n=this.gl,r=performance.now();this.dropPlaced();let i=this.net,a=e.patch,o=a&&i&&i!==e&&i.serial===a.base&&this.track?.count===a.oldTrack&&this.lines?.count===a.oldLines?a:null;o&&this.patched++;for(let e of this.res)e.del();this.res=[],this.probeVao=null,this.net=e,this.guard.setNetwork(e),this.marks.setNetwork(e.marks),this.oneWay.setNetwork(e.oneWay),this.oneWayTrack.setNetwork(e.oneWayTrack),this.chevronsAhead=!1,this.lots.setNetwork(e.lots),this.floors.setNetwork(e.buildings);let s=this.track,c=this.lines,l=this.linesWmul,{keys:u,key:d}=this.fullInputs(),f=this.linesFull,p=this.keepGl&&o&&c&&f&&this.fullKey===d&&f.length===Math.max(1,c.count)*2?o.lines:null,m=this.fullValues(e,u,p,f);this.track=km(this,e.track,[],o&&s?{old:s,runs:o.track}:null,{room:!0}),this.lines=km(this,e.lines,[],o&&c?{old:c,runs:o.lines}:null,{full:m.out,fullKept:m.kept,room:!0});let h=this.lines===c&&!!o&&Km(o.lines,this.lines.count),g=[];for(let[t,n,r,i,a]of[[s,this.track,o?.track,e.track,!1],[c,this.lines,o?.lines,e.lines,!0]])if(t){if(t!==n||!r||!Km(r,n.count)){let e=this.lodOf.get(t)?.boxes;e&&r&&this.keepGl&&r[0]===0&&r[2]===0&&(n.boxesFrom={boxes:e,upTo:r[1]}),g.push([t,n,r,i,a])}if(t!==n)for(let e of t.res??[])e.del()}this.lines.count&&!this.lines.wmulPlain&&!this.lines.wmulHeld&&(zm(this,this.lines,this.lines.wmulBuf,$p(this.lines.count),3),this.lines.wmulPlain=!0),this.linesWmul=this.lines.wmulPlain?null:this.lines.wmulHeld??null,this.linesFull=e.lines.count?m.out:null,this.anyFull=m.any,this.fullKeys=u,this.fullKey=d,this.fullDrawn=e.lines.count?`1/${e.lines.count}/${d}`:``;let _=[];this.lodCarried=null;for(let[e,t,n,r,i]of g){let a=this.keepGl&&this.strokeLod&&n?ih(this,e,t,r,n,i):null;a?_.push(...a):rh(this,e)}(!h||!m.kept||this.linesWmul!==l)&&this.perSegV++;for(let e of _)e.v===-2&&(e.v=m.kept&&!this.linesWmul&&!l?this.perSegV:-1);if(o&&this.checkPatch){for(let e of _)e.fu&&e.v===this.perSegV&&Jm(this,e.vao,e.strokes,e.fu,e.wm??$p(e.strokes.count));qm(this,`track`,this.track,e.track),qm(this,`lines`,this.lines,e.lines),Jm(this,this.track,e.track),Jm(this,this.lines,e.lines,m.out,this.linesWmul??$p(this.lines.count)),m.kept&&!Ih(m.out,this.fullValues(e,u,null,null).out)&&console.error(`T-4262 check: the lines' traffic marks kept by runs differ from whole ones`)}this.uploads++,this.turnback=e.turnbacks?.count?km(this,e.turnbacks):null,this.hasBlueprint=e.track.count>0&&!!(e.track.flags[e.track.count-1]&1),this.annexes=0;for(let t=0;t<e.stationCount;t++)this.annexes|=e.stations[t*3+2]&32;this.lineWidths=null;let v=new Set(o?.same??[]),y=(e,t,n)=>{t&&[t].flat().every(e=>v.has(e))&&this.tex[e]||this.putTexture(e,...n())},b=performance.now(),x=this.keepGl,S=this.sampleSlots,C=this.bendSlots,w=N(e.lineTable,e.meta),T=df(e.lineTable,w);this.sampleSlots=af(x?S:null,T,X),x&&this.bendSlots&&this.sampleSlots===S&&v.has(`sampleBend`)&&v.has(`bends`)||(this.bendSlots=af(x?this.bendSlots:null,e.sampleBend?pf(e.sampleBend,T):[],X,nf));let E=this.phaseSlots;x&&E&&v.has(`meta`)||(this.phaseSlots=this.planPhases(e.meta));let D=o&&i&&t&&!t.all?Fh(i,e,t,o,C,this.bendSlots):null;this.trainNamed=D?{paths:t.paths.length,phases:t.phases.length,stretches:o.stretches.length,lanes:o.lanes.length}:null;for(let t of[`samples`,`bendAt`,`bends`,`phases`,`stretch`])this.putTrain(t,e,D?.[t]);let O=this.slotTex.samples.wrote,k=this.slotTex.stretch.wrote,A=this.fillStale?this.trainsWrote:null;this.trainsWrote=O===`all`||k===`all`||A===`all`?`all`:new Set([...A??[],...O,...k]),y(`lines`,null,()=>[ff(e.lineTable.length?e.lineTable:new Float32Array(4),w,this.sampleSlots),`rgba32f`,Z]),this.phaseSlots===E&&v.has(`meta`)&&this.tex.meta||this.putTexture(`meta`,hf(e.meta.length?e.meta:new Float32Array(4),this.phaseSlots),`rgba32f`,X),this.trafficBands=null,this.hadSamplePass=!!e.samplePass,this.passing=!1;for(let t=0;t<e.stationCount&&!this.passing;t++)this.passing=(e.stations[t*3+2]&Ut)!==0;this.putLane(e,D?.lane),this.trainMs=performance.now()-b,y(`colours`,`lineColours`,()=>[this.shownColours(e),`rgba8`,Z]),this.hiddenFor=null,this.fillStale=!0;let j=e.lineCars??new Float32Array(Math.max(1,e.lineTable.length/4)).fill(8);this.maxCars=Math.max(1,...j),y(`cars`,`lineCars`,()=>[j,`r32f`,Z]),this.crowds=new _u(e.stationCount),this.stationVao=n.createVertexArray();let M=this.stationVao;if(this.res.push({del:()=>n.deleteVertexArray(M)}),n.bindVertexArray(this.stationVao),$(this,this.stationProg,`a_st`,Q(this,e.stations.length?e.stations:new Float32Array(3)),3,n.FLOAT,1),$(this,this.stationProg,`a_axis`,Q(this,e.stationAxis?.length?e.stationAxis:new Float32Array(Math.max(1,e.stationCount)*2)),2,n.FLOAT,1),this.stationShapeBuf=Q(this,e.stationShape?.length?e.stationShape:new Float32Array(Math.max(1,e.stationCount)*4)),!e.stationLine||e.stationLine.length<e.stationCount*26){let t=new Float32Array(e.stationCount*26);for(let n=0;n<e.stationCount;n++)t.set(Xe(it(e,n,!1)),n*26);e.stationLine=t}y(`stationLine`,`stationLine`,()=>[e.stationLine.length?e.stationLine:new Float32Array(2),`rg32f`,X]),$(this,this.stationProg,`a_shape`,this.stationShapeBuf,4,n.FLOAT,1),this.stationSelBuf=Q(this,new Float32Array(Math.max(1,e.stationCount))),$(this,this.stationProg,`a_sel`,this.stationSelBuf,1,n.FLOAT,1),this.groupSrc={groups:null,net:null},this.crowdBuf=Q(this,this.crowds.crowds),this.dotCrowdBuf=Q(this,this.crowds.dotCrowds),$(this,this.stationProg,`a_dcrowd`,this.dotCrowdBuf,2,n.FLOAT,1),$(this,this.stationProg,`a_crowd`,this.crowdBuf,4,n.FLOAT,1),this.selectedAlso=new Set,this.selectedAlsoKey=``,this.selDrawnKey=``;let P=e.stationLinkIdx?.length??0;this.bridgeVao=n.createVertexArray();let ee=this.bridgeVao;this.res.push({del:()=>n.deleteVertexArray(ee)}),n.bindVertexArray(ee),$(this,this.bridgeProg,`a_ends`,Q(this,P?e.stationLinks:new Float32Array(4)),4,n.FLOAT,1),this.bridgeFlagBuf=Q(this,new Float32Array(Math.max(1,P/2)*2)),$(this,this.bridgeProg,`a_bflag`,this.bridgeFlagBuf,2,n.FLOAT,1),this.trainVao=n.createVertexArray();let te=this.trainVao;this.res.push({del:()=>n.deleteVertexArray(te)}),n.bindVertexArray(this.trainVao),$(this,this.trainProg,`a_trip`,this.tripBuf,2,n.FLOAT,1),$(this,this.trainProg,`a_end`,this.endBuf,1,n.FLOAT,1),$(this,this.trainProg,`a_load`,this.loadBuf,2,n.FLOAT,1),$(this,this.trainProg,`a_stand`,this.standBuf,4,n.FLOAT,1),$(this,this.trainProg,`a_lag`,this.lagBuf,1,n.FLOAT,1),$(this,this.trainProg,`a_bay`,this.bayBuf,4,n.FLOAT,1),n.bindVertexArray(null),n.bindBuffer(n.ARRAY_BUFFER,null),(!go(this.ahead)||this.aheadDrawn)&&this.buildAhead(),this.checkPatch&&this.keepGl&&(this.texturesRead=Ym(this),this.checkTrains([`samples`,`bendAt`,`bends`,`phases`,`stretch`,`lane`],e),gf(e.meta,mf(e.meta))||console.error(`T-4274 check: a line's phases do not start at its first profile's first phase`)),this.netMs=performance.now()-r}texturesRead=0;ahead=ho();aheadVao=null;aheadTrackVao=null;aheadRes=[];aheadLinesTex=null;aheadEdgesTex=null;aheadN=[0,0];standVao=null;standLineTex=null;standCount=0;aheadDrawn=!1;chevronsAhead=!1;setAhead(e,t=!0){this.ahead=e,t&&this.buildAhead()}netVersion=-1;buildAhead(){let e=this.gl;for(let e of this.aheadRes)e.del();this.aheadRes=[],this.aheadVao=this.aheadTrackVao=this.aheadLinesTex=this.aheadEdgesTex=this.standVao=this.standLineTex=null,this.aheadN=[0,0],this.standCount=0;let t=this.net,n=this.ahead;if(this.aheadDrawn=!!t&&!go(n),t&&!go(n)){let r=Eo(t,n);r.lines&&(this.aheadVao=km(this,r.lines,this.aheadRes)),r.track&&(this.aheadTrackVao=km(this,r.track,this.aheadRes));let i=[...[...n.lines].filter(([,e])=>e.edges).map(([e])=>e),...n.hideLines],a=[...n.hideEdges,...n.edges.keys()],o=e=>{let t=0;for(let n of e)t=Math.max(t,n+1);let n=new Float32Array(Math.max(1,t));for(let t of e)t>=0&&(n[t]=1);return[n,t]};if(i.length){let[e,t]=o(i);this.aheadLinesTex=wm(this,e,`r32f`,Z,this.aheadRes),this.aheadN[0]=t}if(a.length){let[e,t]=o(a);this.aheadEdgesTex=wm(this,e,`r32f`,X,this.aheadRes),this.aheadN[1]=t}if((n.stations.length||n.rawStations.length)&&this.stationProg){let t=ko([...n.stations.length?[Do(n.stations)]:[],...n.rawStations]);this.standVao=e.createVertexArray();let r=this.standVao;this.aheadRes.push({del:()=>e.deleteVertexArray(r)}),e.bindVertexArray(r),$(this,this.stationProg,`a_st`,Q(this,t.st,this.aheadRes),3,e.FLOAT,1),$(this,this.stationProg,`a_axis`,Q(this,t.axis,this.aheadRes),2,e.FLOAT,1),$(this,this.stationProg,`a_shape`,Q(this,t.shape,this.aheadRes),4,e.FLOAT,1),$(this,this.stationProg,`a_sel`,Q(this,new Float32Array(Math.max(1,t.count)),this.aheadRes),1,e.FLOAT,1),$(this,this.stationProg,`a_dcrowd`,Q(this,new Float32Array(Math.max(1,t.count)*2),this.aheadRes),2,e.FLOAT,1),$(this,this.stationProg,`a_crowd`,Q(this,new Float32Array(Math.max(1,t.count)*4),this.aheadRes),4,e.FLOAT,1),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.standLineTex=wm(this,t.line.length>=26?t.line:new Float32Array(2),`rg32f`,X,this.aheadRes),this.standCount=t.count}}let r=t&&!go(n)?Co(t,n.edges):null;r?(this.oneWayTrack.setNetwork(r),this.chevronsAhead=!0):this.chevronsAhead&&=(this.oneWayTrack.setNetwork(t?.oneWayTrack),!1),t&&this.tex.colours&&this.putTexture(`colours`,this.shownColours(t),`rgba8`,Z),t&&this.hiddenFor===t&&this.hideStations(t),this.uploads++}hideStations(e){if(this.stationHid=new Uint8Array(e.stationCount),q.levels)for(let t=0;t<e.stationCount;t++){let n=q.stationLevel(e.stationIds[t]);n!==void 0&&Ys(n)&&(this.stationHid[t]=1)}if(q.blueprints)for(let t=0;t<e.stationCount;t++)e.stations[t*3+2]&2&&(this.stationHid[t]=1);for(let t of this.ahead.hideStations){let n=mn(e,String(t));n>=0&&(this.stationHid[n]=1)}this.selDrawnKey=``}setService(e,t,n){let r=this.net;if(!r)return;let i=n&&!n.all?{keys:Ph(n.phases,!1),from:[r.phases]}:null;r.phases=e,r.meta=t,this.phaseSlots=this.planPhases(t),this.putTrain(`phases`,r,i),this.checkPatch&&this.keepGl&&this.checkTrains([`phases`],r),this.putTexture(`meta`,hf(t.length?t:new Float32Array(4),this.phaseSlots),`rgba32f`,X)}sampleSlots=null;bendSlots=null;phaseSlots=null;slotTex={};trainsWrote=`all`;texSent={};trainCompares={};trainNamed=null;netMs=0;trainMs=0;layersMs=0;fillSrc=null;stretchFor=null;planPhases(e){return af(this.keepGl?this.phaseSlots:null,mf(e),X,1/0,tf)}trainSrc(e,t){let n=this.sampleSlots,r=this.bendSlots,i=this.phaseSlots;if(!n||!r||!i)return null;switch(e){case`samples`:return[`rg32f`,n,{srcs:[t.samples],per:[2]}];case`bendAt`:return[`r32f`,n,{srcs:[t.sampleBend],per:[1],shift:e=>(r.at.get(e)??0)-(r.first.get(e)??0)}];case`bends`:return[`rg32f`,r,{srcs:[t.bends],per:[2]}];case`phases`:return[`rgba32f`,i,{srcs:[t.phases],per:[4]}];case`stretch`:return[`r32f`,n,{srcs:[this.stretchOf(t)],per:[1]}];case`lane`:{let e=t.sampleLane?.length?t.sampleLane:void 0,r=this.trafficBands?.sample??t.sampleBand,i=t.samplePass;return[`rgba32f`,n,{srcs:[e,r,i],per:[1,2,1],pack:(t,n,a)=>Nh(t,n,a,e,r,i)}]}case`fill`:return[`rg32f`,n,{srcs:[this.fillSrc??this.blankFill(Math.max(1,t.samples.length/2))],per:[2]}];case`slevel`:return[`r32f`,n,{srcs:[this.sampleLv??void 0],per:[1]}]}}putTrain(e,t,n){let r=this.trainSrc(e,t);if(!r)return;let i=this.gpuBytes.up,a=Ef(this,this.slotTex[e]??null,r[0],X,r[1],r[2],n);a.compared&&(this.trainCompares[e]=(this.trainCompares[e]??0)+1),this.slotTex[e]=a,this.tex[e]=a.tex,this.texSent[e]=(this.texSent[e]??0)+this.gpuBytes.up-i}checkTrains(e,t){let n=[];for(let r of e){let e=this.slotTex[r],i=this.trainSrc(r,t);if(!e||!i)continue;let a=Of(this,e,X,i[1],i[2]);a.length&&n.push(`${r} (${a.length} slots, keys ${a.slice(0,4).join(` `)})`)}n.length&&console.error(`T-4274 check: the trains' tables in slots differ from the network's: ${n.join(`, `)}`)}stretchOf(e){if(e.sampleStretch)return e.sampleStretch;if(this.stretchFor?.n===e)return this.stretchFor.v;let t=Math.max(1,e.samples.length/2),n=new Float32Array(t).fill(-1);if(e.sampleStroke&&e.lines.stretch)for(let r=0;r<t;r++){let t=e.sampleStroke[r];t>=0&&(n[r]=e.lines.stretch[t])}return this.stretchFor={n:e,v:n},n}putLevels(e){this.sampleLv=e,e&&this.net?this.putTrain(`slevel`,this.net):this.tex.slevel&&this.dropTexture(`slevel`)}texRes={};putLane(e,t){this.putTrain(`lane`,e,t)}fillStale=!1;blank=null;blankFill(e){return this.blank?.length!==e*2&&(this.blank=new Float32Array(e*2).fill(-1)),this.blank}freshFill(){let e=this.sampleSlots;if(!this.fillStale||!this.net||!e)return;this.fillStale=!1;let t=this.slotTex.fill,n=this.trainsWrote;if(!t||!this.keepGl||n===`all`||t.layout.base!==e.base||t.rows<Math.ceil(e.cap/2048)){this.fillSrc=null,this.putTrain(`fill`,this.net);return}let r=[];for(let[i,a]of e.at)(n.has(i)||t.layout.at.get(i)!==a||t.layout.count.get(i)!==e.count.get(i))&&r.push(i);r.length&&Df(this,t,X,e,r,-1)}keptTex={};putTexture(e,t,n,r,i){for(let t of this.texRes[e]??[])t.del();this.texRes[e]=[];let a=this.keptTex[e]??null;if(!this.keepGl){a&&this.gl.deleteTexture(a.tex),delete this.keptTex[e];let i=[];this.tex[e]=wm(this,t,n,r,i),this.texRes[e]=i;return}let o=this.gpuBytes.up,s=Om(this,a,t,n,r,i);this.texSent[e]=(this.texSent[e]??0)+this.gpuBytes.up-o,a&&s!==a&&this.gl.deleteTexture(a.tex),this.keptTex[e]=s,this.tex[e]=s.tex}dropTexture(e){for(let t of this.texRes[e]??[])t.del();this.texRes[e]=[];let t=this.keptTex[e];t&&this.gl.deleteTexture(t.tex),delete this.keptTex[e];let n=this.slotTex[e];n&&this.gl.deleteTexture(n.tex),delete this.slotTex[e],this.tex[e]=null}setPreview(e){this.previewSrc=e,this.uncached(()=>{for(let e of this.previewRes)e.del();this.previewRes=[],this.preview=e&&e.count?km(this,e,this.previewRes):null,this.marks.setPreview(e?.marks),this.oneWayGhost.setNetwork(e?.chevrons)})}uncached(e){let t=this.quiet;this.quiet=!0;try{e()}finally{this.quiet=t}}keepPreviewAsPlaced(){this.preview&&this.placed.push(this.preview),this.placedRes.push(...this.previewRes),this.preview=null,this.previewRes=[],this.previewSrc=null,this.uncached(()=>{this.marks.setPreview(void 0),this.oneWayGhost.setNetwork(void 0)})}addPlaced(e){e.count&&this.uncached(()=>this.placed.push(km(this,e,this.placedRes)))}hiddenFor=null;hiddenV=-1;stationHid=new Uint8Array;shownColours(e){let t=[...this.ahead.lines].filter(([,e])=>!e.edges).map(([e])=>e);if(!q.lines.size&&!t.length&&!this.ahead.colours.size)return e.lineColours;let n=e.lineColours.length;for(let e of this.ahead.colours.keys())n=Math.max(n,e*4+4);let r=new Uint8Array(n);r.set(e.lineColours);for(let[e,t]of this.ahead.colours)r.set(t,e*4),r[e*4+3]||(r[e*4+3]=255);for(let e of[...q.lines,...t])e*4+3<r.length&&(r[e*4+3]=0);return r}stationHidden(e){return this.stationHid[e]===1}sampleLv=null;tripOnOffLevel(e){let t=this.net;if(!q.levels||!this.sampleLv||!t)return!1;let n=e.gr===0?e.s:t.lineTable[e.geo*4+2]-e.s;return Js(xn(t,this.sampleLv,e.geo,n))<.5}sampleLevels(e){let t=Math.max(1,e.samples.length/2),n=new Float32Array(t),r=e.sampleStroke,i=0;for(let a=0;a<t;a++){let t=r?r[a]:-1;t>=0&&t<e.lines.count&&(i=Math.floor(e.lines.level[t]/256)/32-4),n[a]=i}return n}applyHidden(e){this.hiddenFor=e,this.hiddenV=q.v,this.tex.colours&&this.putTexture(`colours`,this.shownColours(e),`rgba8`,Z),this.hideStations(e),this.putLevels(q.levels?this.sampleLevels(e):null);let t=e.lines,n=e.track;if(q.lines.size||q.levels||q.blueprints){let e=q.blueprints;Zs.set(t.seg,n=>q.lines.has(t.colour[n])||Xs(t.level[n])||e&&!!(t.flags[n]&1)),q.levels||e?Zs.set(n.seg,t=>Xs(n.level[t])||e&&!!(n.flags[t]&1)):Zs.delete(n.seg)}else Zs.delete(t.seg),Zs.delete(n.seg)}dropPlaced(){this.uncached(()=>{for(let e of this.placedRes)e.del()}),this.placedRes=[],this.placed=[]}placed=[];placedRes=[];setHighlight(e){this.highlightSrc=e;for(let e of this.highlightRes)e.del();this.highlightRes=[],this.highlight=e&&e.count?km(this,e,this.highlightRes):null}setRefused(e){this.refusedSrc=e;for(let e of this.refusedRes)e.del();this.refusedRes=[],this.refused=e&&e.count?km(this,e,this.refusedRes):null}layersSrc=null;refusedSrc=null;previewSrc=null;highlightSrc=null;restore(){this.res=[],this.texRes={},this.keptTex={},this.slotTex={},this.sampleSlots=this.bendSlots=this.phaseSlots=null,this.fullKey=null;for(let e of Object.keys(this.tex))this.tex[e]=null;this.track=this.lines=null,this.lodOf.clear(),this.previewRes=[],this.placedRes=[],this.placed=[],this.highlightRes=[],this.refusedRes=[],this.connRes=[],this.connVao=this.connFlagBuf=null,this.probeProg=this.probeVao=null,this.tripEpoch=NaN,this.tripVersion=-1,this.init(this.gl);let e=this.net,t=this.layersSrc;e&&(this.setNetwork(e),t&&this.setLayers(t)),this.setPreview(this.previewSrc),this.setHighlight(this.highlightSrc),this.setRefused(this.refusedSrc)}staged=[];stage(e,t,n,r=!1){this.staged.push({version:e,at:t,since:performance.now(),apply:n,trips:[],loads:r})}flushStaged(){for(;this.staged.length;)this.putStaged(this.staged.shift())}stagedAt=NaN;putStaged(e){this.stagedAt=e.at,e.apply();for(let t of e.trips)this.putTrips(...t)}releaseStaged(e){let t=performance.now(),n=r=>{let i=this.staged[r];return e<i.at?!1:t-i.since>2e3?!0:i.loads?i.trips.some(e=>e[3])||r+1<this.staged.length&&n(r+1):i.trips.length>0};for(;this.staged.length&&n(0);)this.putStaged(this.staged.shift())}setTrips(...e){let t=e[1];for(let n=this.staged.length-1;n>=0;n--)if(this.staged[n].version<=t){this.staged[n].trips.push(e);return}this.putTrips(...e)}putTrips(e,t,n,r,i,a,o){let s=this.tripsBy.get(e);if(s&&s.version>t)return;let c=r?y(e,r):void 0;this.tripsBy.set(e,{version:t,data:n,ends:i&&i.length===n.length/2?i:void 0,nexts:a&&a.length===n.length/2?a:void 0,bays:Kp&&o&&o.length===n.length/2*4?o:void 0,board:c&&c.trips===n.length/2?c:void 0}),e===this.tripEpoch&&(this.tripVersion=-1)}sync(e){let t=Math.floor(e/Dp)*Dp;if(t!==this.epoch){this.epoch=t,this.rebases++;for(let e of this.tripsBy.keys())e<t&&this.tripsBy.delete(e);this.onEpoch(t)}let n=this.tripsBy.get(t);if(n&&(this.tripEpoch!==t||this.tripVersion!==n.version)){let e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,this.tripBuf),e.bufferData(e.ARRAY_BUFFER,n.data.length?n.data:new Float32Array(2),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.endBuf),e.bufferData(e.ARRAY_BUFFER,n.ends?.length?n.ends:new Float32Array(Math.max(1,n.data.length/2)).fill(-1e9),e.DYNAMIC_DRAW);let r=n.board?n.board.offs:new Float32Array(Math.max(1,n.data.length/2)*2).fill(-1);e.bindBuffer(e.ARRAY_BUFFER,this.loadBuf),e.bufferData(e.ARRAY_BUFFER,r.length?r:new Float32Array([-1,0]),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.standBuf),e.bufferData(e.ARRAY_BUFFER,n.board?o(n.board,n.data,n.nexts??null):new Float32Array(Math.max(1,n.data.length/2)*4).fill(-1),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.bayBuf),e.bufferData(e.ARRAY_BUFFER,n.bays?.length?n.bays:zp(n.data.length/2),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this.lagBuf),e.bufferData(e.ARRAY_BUFFER,new Float32Array(Math.max(1,n.data.length/2)),e.DYNAMIC_DRAW),this.lagDirty=!0,e.bindBuffer(e.ARRAY_BUFFER,null),n.board?.loads.length&&(this.loadTex&&e.deleteTexture(this.loadTex),this.loadTex=wm(this,n.board.loads,`r32f`,X,[])),this.board=n.board??null,this.fullTraffic&&this.writeFull(),this.tripEpoch=t,this.tripVersion=n.version,this.tripCount=n.data.length/2,this.trips=n.data,this.tripEnds=n.ends??null,this.tripNexts=n.nexts??null,this.tripBays=n.bays??null}return e-this.tripEpoch}get tripsEpoch(){return this.tripEpoch}stillWaitMs(e,t,n,r){let i=im;if(r.showTrains&&this.tripCount&&e>=10){let r=I(e)/Math.cos(t*Math.PI/180);i=Math.min(i,500/(100*n*r))}return this.board&&e>=9&&(i=Math.min(i,5e3/n)),i}draw(e,t,n,r,i,a){Ch(this,e,t,n,r,i,a)}guardMs=0;guardOut=[0,0];queueShare(e){return this.crowdsShown&&this.net?this.crowds.queueShare(e,this.net):null}dotCrowd(e){return this.crowdsShown&&!this.stationStyle.boxes?this.crowds.dot(e):null}probe(e){let t=this.gl;this.probeProg||(this.probeProg=kt(t,Tp,Ep,[`v_pos`]),this.probeU=W(t,this.probeProg,[`u_time`,`u_phases`,`u_meta`,`u_samples`,`u_bend_at`,`u_bends`,`u_lines`,`u_back_base`])),this.releaseStaged(e);let n=this.sync(e),r=this.tripCount;this.probeVao||(this.probeVao=t.createVertexArray(),t.bindVertexArray(this.probeVao),$(this,this.probeProg,`a_trip`,this.tripBuf,2,t.FLOAT,0),$(this,this.probeProg,`a_end`,this.endBuf,1,t.FLOAT,0),$(this,this.probeProg,`a_lag`,this.lagBuf,1,t.FLOAT,0),t.bindVertexArray(null));let i=Q(this,new Float32Array(Math.max(1,r)*2),[]);t.useProgram(this.probeProg),t.uniform1f(this.probeU.u_time,n),jh(this,this.probeU),t.bindVertexArray(this.probeVao),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,i),t.enable(t.RASTERIZER_DISCARD),t.beginTransformFeedback(t.POINTS),t.drawArrays(t.POINTS,0,r),t.endTransformFeedback(),t.disable(t.RASTERIZER_DISCARD),t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER,0,null),t.bindVertexArray(null);let a=new Float32Array(r*2);return t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,i),t.getBufferSubData(t.TRANSFORM_FEEDBACK_BUFFER,0,a),t.bindBuffer(t.TRANSFORM_FEEDBACK_BUFFER,null),t.deleteBuffer(i),a}};function Nh(e,t,n,r,i,a){for(let o=0;o<n;o++){let n=t+o;e[o*4]=r?r[n]??1:1,e[o*4+1]=i?.[n*2]??0,e[o*4+2]=i?.[n*2+1]??0,e[o*4+3]=a?.[n]??1e9}}function Ph(e,t){let n=new Set;for(let r of e)t?n.add(r*2).add(r*2+1):n.add(r);if(_f.drop)for(let e of n){n.delete(e);break}return n}function Fh(e,t,n,r,i,a){let o=Ph(n.paths,!0),s=new Set(o);if(a!==i)for(let[e,t]of a.at)i?.at.get(e)!==t&&s.add(e);let c=Ph(r.lanes,!0),l=Math.max(e.bends?.length??0,t.bends?.length??0)/2+32>=nf;return{samples:{keys:o,from:[e.samples]},...l?{}:{bendAt:{keys:s,from:[e.sampleBend]},bends:{keys:o,from:[e.bends]}},phases:{keys:Ph(n.phases,!1),from:[e.phases]},stretch:{keys:Ph(r.stretches,!0),from:[e.sampleStretch]},lane:{keys:c,from:[e.sampleLane?.length?e.sampleLane:void 0,e.sampleBand,e.samplePass]}}}function Ih(e,t){if(e.length!==t.length)return!1;let n=new Uint32Array(e.buffer,e.byteOffset,e.length),r=new Uint32Array(t.buffer,t.byteOffset,t.length);for(let e=0;e<n.length;e++)if(n[e]!==r[e])return!1;return!0}function Lh(e){for(let t=0;t<e.length;t+=3)if(e[t]!==1||e[t+1]!==0||e[t+2]!==0)return!1;return!0}var Rh=1024;function zh(e,t,n){let r=t.wmulPlain?null:t.wmulHeld;if(!e.keepGl||!r||!n||r.length!==n.length)return zm(e,t,t.wmulBuf,n??$p(t.count),3),!0;let i=Dm(r,n,Rh*3);if(!i.length)return!1;let a=e.gl;a.bindBuffer(a.ARRAY_BUFFER,t.wmulBuf);for(let r=0;r+1<i.length;r+=2)Bm(e,t,n,3,i[r]*Rh,Math.min(t.count,(i[r]+i[r+1])*Rh)-i[r]*Rh);return a.bindBuffer(a.ARRAY_BUFFER,null),!0}var Bh=tt(15),Vh=ke(0,0,-1),Hh=74,Uh=2,Wh=9.9/.75/I(15),Gh=14,Kh=.9,qh=10,Jh=6,Yh=16,Xh=.22,Zh=.9,Qh=1.5,$h=12,eg=[{dx:0,strokes:[{pts:[[-70,0],[10,0,{r:30}],[10,96,{rev:!0}],[10,0],[40,0],[40,56],[64,56]],stops:[[10,68]],colour:1},{pts:[[-12,68],[34,68]],colour:1,bare:!0},{pts:[[114,52],[78,52,{r:18}],[78,0,{r:18}],[114,0,{r:18}],[114,53,{rev:!0}],[114,0],[144,0],[144,56,{rev:!0}],[144,0],[162,0]],stops:[[144,30]],colour:2},{circle:[146,80,10],colour:11,bare:!0},{pts:[[150,0],[176,0],[176,56],[214,56],[214,0],[250,0],[250,28],[226,28,{r:14}],[226,56,{r:14}],[252,56]],stops:[[195,56]],colour:4}]},{dx:78,strokes:[{pts:[[0,56],[0,0],[27,0],[27,44,{rev:!0}],[27,0],[54,0],[54,56]],colour:7},{pts:[[50,0],[120,0,{r:18}],[120,52,{r:18}],[80,52,{r:18}],[80,0,{r:18}],[140,0],[140,56],[164,56]],stops:[[100,52]],colour:0},{pts:[[180,96],[180,0],[242,0],[242,52,{r:18}],[206,52,{r:18}],[206,0,{r:18}],[242,0],[244,96]],stops:[[196,0],[211,42]],colour:5},{pts:[[272,96],[272,30]],colour:11},{circle:[272,12,9],colour:11,bare:!0}]}];function tg(e){let t=e.length,n=t=>e[t][2]?.rev?0:e[t][2]?.r??$h,r=(e,t)=>{let n=Math.hypot(t[0]-e[0],t[1]-e[1]);return[(t[0]-e[0])/n,(t[1]-e[1])/n]},i=Array(t).fill(0),a=Array(t).fill(0);for(let o=1;o<t-1;o++){let t=r(e[o-1],e[o]),s=r(e[o],e[o+1]);i[o]=Math.acos(Math.max(-1,Math.min(1,t[0]*s[0]+t[1]*s[1]))),a[o]=n(o)>0&&i[o]>.001&&i[o]<Math.PI-.001?n(o)*Math.tan(i[o]/2):0}let o=a.slice();for(let n=0;n+1<t;n++){let t=Math.hypot(e[n+1][0]-e[n][0],e[n+1][1]-e[n][1]);if(o[n]+o[n+1]>t){let e=t/(o[n]+o[n+1]);o[n]*=e,o[n+1]*=e}}let s=[[e[0][0],e[0][1]]],c=[];for(let n=1;n<t-1;n++){let[t,a]=e[n];if(o[n]<=0){e[n][2]?.rev&&c.push(s.length),s.push([t,a]);continue}let l=r(e[n-1],e[n]),u=r(e[n],e[n+1]),d=o[n]/Math.tan(i[n]/2),f=[t-l[0]*o[n],a-l[1]*o[n]],p=l[0]*u[1]-l[1]*u[0]>0,m=p?-l[1]:l[1],h=p?l[0]:-l[0],g=f[0]+m*d,_=f[1]+h*d,v=Math.atan2(f[1]-_,f[0]-g),y=Math.max(2,Math.ceil(i[n]/(Math.PI/36)));for(let e=0;e<=y;e++){let t=v+(p?1:-1)*i[n]*(e/y);s.push([g+d*Math.cos(t),_+d*Math.sin(t)])}}return s.push([e[t-1][0],e[t-1][1]]),{p:s,revs:c}}var ng=class{p;closed;cum=[0];constructor(e,t){this.p=e,this.closed=t;for(let t=1;t<e.length;t++)this.cum.push(this.cum[t-1]+Math.hypot(e[t][0]-e[t-1][0],e[t][1]-e[t-1][1]))}get length(){return this.cum[this.cum.length-1]}at(e){let t=this.length;e=this.closed?(e%t+t)%t:Math.max(0,Math.min(t,e));let n=1;for(;n<this.cum.length-1&&this.cum[n]<e;)n++;let r=(e-this.cum[n-1])/Math.max(1e-9,this.cum[n]-this.cum[n-1]);return[this.p[n-1][0]+(this.p[n][0]-this.p[n-1][0])*r,this.p[n-1][1]+(this.p[n][1]-this.p[n-1][1])*r]}near(e){let t=0,n=1/0;for(let r=1;r<this.p.length;r++){let[i,a]=this.p[r-1],[o,s]=this.p[r],c=o-i,l=s-a,u=c*c+l*l,d=u>0?Math.max(0,Math.min(1,((e[0]-i)*c+(e[1]-a)*l)/u)):0,f=Math.hypot(i+c*d-e[0],a+l*d-e[1]);f<n-1e-9&&([n,t]=[f,this.cum[r-1]+d*Math.sqrt(u)])}return t}},rg=84,ig=22,ag=[60,72,75,80,90,100,120,144,150,180,200,225,240,300,360,400,450,600,720,900,1200,1800,3600];function og(e){let t=[],n=0;for(let r=0;r+1<e.length;r++){let i=e[r].leave,a=e[r+1].arrive-i,o=196/Kh;if(a>=o){let e=Gh/Kh,r=(a-o)/Gh;t.push(n,i,0,Kh,n+e,i+o/2,Gh,0,n+e+r,i+a-o/2,Gh,-.9),n+=2*e+r}else{let e=Math.sqrt(Kh*Math.max(a,.01)),r=e/Kh;t.push(n,i,0,Kh,n+r,i+a/2,e,-.9),n+=2*r}r+2<e.length&&(n+=e[r+1].rev?Jh:qh)}return{ph:t,t:n}}function sg(){let e=(e,t,n)=>{let r=e[1]*Zh;return[Qh*(e[0]+t+Xh*r),Qh*(r-n*rg)]},t=Wh/Bh,n=eg.flatMap((n,r)=>n.strokes.map(i=>{let a,o=[],s=!1;if(i.circle){let[t,o,c]=i.circle,[l,u]=e([t,o],n.dx,r);a=Array.from({length:73},(e,t)=>[l+Qh*c*Math.sin(t*Math.PI/36),u-Qh*c*Math.cos(t*Math.PI/36)]),s=!0}else{let t=tg(i.pts);a=t.p.map(t=>e(t,n.dx,r)),o=t.revs}let c=new ng(a,s),l=c.length,u=[],d=e=>u.push({arrive:e,leave:e,rev:!1}),f=Hh/2/Bh;s?(d(0),d(l)):(d(f),d(l-f));for(let t of i.stops??[])d(c.near(e(t,n.dx,r)));for(let e of o)u.push({arrive:c.cum[e]-t,leave:c.cum[e]+t,rev:!0});return u.sort((e,t)=>e.arrive-t.arrive),{path:c,stops:u,colour:i.colour,bare:!!i.bare}})),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let e of n)for(let[t,n]of e.path.p)r=Math.min(r,t),i=Math.max(i,t),a=Math.min(a,n),o=Math.max(o,n);let s=i-r+44,c=o-a+44,l=e=>[(e[0]-r+ig)*Bh,(o-e[1]+ig)*Bh],u=[],d=[],f=[],p=[],m=[],h=[],g=[],_=[],v=[],y=[],b=[],x=[],S=[],C=[],w=[],T=[],E=[],D=(e,t,n)=>{let r=n=>{let r=[];for(let i=0;i<=30;i++){let a=t+n*i*2;if(!e.closed&&(a<0||a>e.length))break;r.push(...e.at(a),0)}return Float32Array.from(r)},i=rt((n?[r(n)]:[r(1),r(-1)]).filter(e=>e.length>=6),0,Hh/2-Bh*Uh),a=e.at(t);S.push(a[0],a[1],4),C.push(i.ax,i.ay),w.push(i.mx,i.my,i.phi,6),T.push(...Array.from(Xe(i))),E.push(String(E.length))};n.forEach((e,t)=>{let n=e.path.p.map(l),r=new ng(n,e.path.closed),i=r.length;for(let e=1;e<n.length;e++)u.push(n[e-1][0],n[e-1][1],n[e][0],n[e][1]),d.push(t),f.push(r.cum[e-1]);let a=p.length/2,o=Math.ceil(i/2)+1;for(let e=0;e<o;e++)p.push(...r.at(Math.min(i,e*2)));m.push(a,o,i,2),h.push(...yn(Pe[e.colour]),255),g.push(1),_.push(String(t));let s=e.stops.map(e=>({arrive:e.arrive*Bh,leave:e.leave*Bh,rev:e.rev}));s.forEach((t,n)=>{e.bare||t.rev||e.path.closed&&n===s.length-1||(!e.path.closed&&(n===0||n===s.length-1)?D(r,n===0?Bh*Uh:i-Bh*Uh,n===0?1:-1):D(r,t.arrive))});let c=og(s),S=og(s.map(e=>({arrive:i-e.leave,leave:i-e.arrive,rev:e.rev})).reverse()),C=Math.max(c.t,S.t),w=ag.find(e=>e>=2*(C+Yh))??3600;for(let[e,n]of[[0,c],[1,S]]){let r=ie(t,e,0);y[r*4]=v.length/4,y[r*4+1]=n.ph.length/4,y[r*4+2]=n.t,y[r*4+3]=i,v.push(...n.ph)}let T=t*.37%1*w;for(let n=T-2*w;!e.bare&&n<3600+w;n+=w)b.push(ie(t,0,0),n),x.push(n+w/2),b.push(ie(t,1,0),n+w/2),x.push(n+w)});for(let e=0;e<n.length*680;e++)y[e]??=0;let O=S;for(let e=0;e<O.length/3;e++)for(let t=0;t<O.length/3;t++)e!==t&&Math.hypot(O[e*3]-O[t*3],O[e*3+1]-O[t*3+1])<Hh&&(O[e*3+2]=Math.round(O[e*3+2])|1);let k=d.length,A={seg:new Float32Array,colour:new Uint32Array,edge:new Uint32Array,level:new Float32Array,flags:new Float32Array,dist:new Float32Array,count:0},j={seg:new Float32Array(u),colour:new Uint32Array(d),edge:new Uint32Array(k).fill(4294967295),level:new Float32Array(k),flags:new Float32Array(k),dist:new Float32Array(f),count:k},M=E.length;return{track:A,lines:j,lineIds:_,lineColours:new Uint8Array(h),stations:new Float32Array(S),stationAxis:new Float32Array(C),stationShape:new Float32Array(w),stationLine:new Float32Array(T),stationIds:E,stationCount:M,stationLength:new Float32Array(M).fill(Hh),junctions:new Float32Array,junctionIds:[],phases:new Float32Array(v),meta:new Float32Array(y),samples:new Float32Array(p),lineTable:new Float32Array(m),lineCars:new Float32Array(g),edgePts:new Map,anchor:Vh,trips:new Float32Array(b),ends:new Float32Array(x),w:s,h:c,mx:Vh.merc[0]+s/2*Bh/40075016.686,my:Vh.merc[1]+c/2*Bh/40075016.686,period:3600}}var cg=10.5,lg=1.05,ug=.75,dg={showTrains:!0,byLevel:!1,selLine:-1,selEdge:-1,selStation:-1,flatMarks:!1,hollowTrains:!0,boxShrinkPx:1},fg={frames:0,drawMs:0,setupMs:0,firstAt:0,stop:()=>{}};window.twLogo=fg;function pg(){let e=ft(null);return fn(()=>{let t=performance.now(),n=e.current,r=n?.getContext(`webgl2`,{antialias:!0,premultipliedAlpha:!0,alpha:!0,stencil:!1});if(!n||!r)return;let i=new Mh;try{i.init(r)}catch{return}let a=sg();i.setNetwork(a),i.setTrips(0,1,a.trips,void 0,a.ends);let o=1,s=0,c=performance.now(),l=matchMedia(`(prefers-reduced-motion: reduce)`).matches,u=()=>{let e=Math.max(120,Math.min(window.innerWidth-32,1400));o=ug*Math.min(lg,e/a.w);let t=window.devicePixelRatio||1,r=a.w*o,i=a.h*o;n.style.width=r+`px`,n.style.height=i+`px`,n.width=Math.round(r*t),n.height=Math.round(i*t)},d=()=>{if(s=l?0:requestAnimationFrame(d),r.isContextLost())return;let e=performance.now(),t=(window.devicePixelRatio||1)*o,u=n.width,f=n.height,p=512*2**15*t,m=2*p/u,h=2*p/f,g=[m,0,0,0,0,-h,0,0,0,0,1,0,-a.mx*m,a.my*h,0,1],_=(300+(e-c)/1e3*cg)%a.period;r.viewport(0,0,u,f),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),i.draw({merc:g,globe:null,plane:[0,0,0,1],t:0},_,15,t,dg),fg.frames++,fg.drawMs+=performance.now()-e};u(),fg.setupMs=performance.now()-t,fg.firstAt=performance.now();let f=()=>{u(),l&&d()};return window.addEventListener(`resize`,f),d(),fg.stop=()=>cancelAnimationFrame(s),()=>{cancelAnimationFrame(s),window.removeEventListener(`resize`,f),r.getExtension(`WEBGL_lose_context`)?.loseContext()}},[]),K(`canvas`,{ref:e,class:`start-logo`,role:`img`,"aria-label":`trainsworld`})}export{ks as $,K as $t,pc as A,mr as An,Ya as At,zs as B,Ta as Bt,pl as C,Kn as Cn,mo as Ct,fl as D,cr as Dn,Ra as Dt,dl as E,fr as En,Pa as Et,Gs as F,ba as Ft,rs as G,ua as Gt,ts as H,xa as Ht,Ks as I,ka as It,ls as J,Oa as Jt,Es as K,ya as Kt,Hs as L,va as Lt,q as M,rr as Mn,Ia as Mt,Ys as N,ja as Nt,ul as O,dr as On,Wa as Ot,Ws as P,Sa as Pt,Rs as Q,ma as Qt,Bs as R,sa as Rt,jl as S,br as Sn,fo as St,ll as T,Jn as Tn,io as Tt,Ns as U,Ca as Ut,Zo as V,Ea as Vt,Ps as W,_a as Wt,Cs as X,wa as Xt,Fs as Y,Da as Yt,ws as Z,ga as Zt,Rl as _,ii as _n,Mo as _t,up as a,bi as an,Uo as at,Nl as b,kr as bn,oo as bt,Nd as c,hi as cn,Ko as ct,mu as d,ci as dn,Lo as dt,ta as en,Is as et,hu as f,si as fn,Io as ft,du as g,ai as gn,Po as gt,Xl as h,ei as hn,yo as ht,dp as i,Vi as in,qo as it,mc as j,ur as jn,Ka as jt,_c as k,hr as kn,Xa as kt,Pd as l,li as ln,Ro as lt,Wl as m,$r as mn,bo as mt,Mh as n,ea as nn,os as nt,uf as o,Ai as on,Bo as ot,pu as p,ti as pn,vo as pt,Ts as q,ha as qt,Jp as r,Qi as rn,cs as rt,zd as s,ji as sn,Wo as st,pg as t,na as tn,ss as tt,gu as u,oi as un,Fo as ut,Yl as v,ri as vn,co as vt,ml as w,qn as wn,uo as wt,Ml as x,yr as xn,so as xt,au as y,ni as yn,lo as yt,Vs as z,oa as zt};