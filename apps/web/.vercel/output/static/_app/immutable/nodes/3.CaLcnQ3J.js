import{s as j,n as d,c as k}from"../chunks/scheduler.B3kXyu8W.js";import{S as q,i as A,e as u,t as g,s as C,c as v,a as E,b,d as m,f as w,g as H,h,j as $,k as S}from"../chunks/index.M_k6ra4C.js";import{p as x}from"../chunks/stores.Dq3yG_9G.js";function y(r){var _;let t,o=(((_=r[0].error)==null?void 0:_.message)||r[0].data.unexpectedError)+"",n,l,s,i=r[0].data.goHome+"",c,f;return{c(){t=u("h1"),n=g(o),l=C(),s=u("a"),c=g(i),this.h()},l(e){t=v(e,"H1",{});var a=E(t);n=b(a,o),a.forEach(m),l=w(e),s=v(e,"A",{href:!0});var p=E(s);c=b(p,i),p.forEach(m),this.h()},h(){H(s,"href",f="/"+r[0].data.locale)},m(e,a){h(e,t,a),$(t,n),h(e,l,a),h(e,s,a),$(s,c)},p(e,[a]){var p;a&1&&o!==(o=(((p=e[0].error)==null?void 0:p.message)||e[0].data.unexpectedError)+"")&&S(n,o),a&1&&i!==(i=e[0].data.goHome+"")&&S(c,i),a&1&&f!==(f="/"+e[0].data.locale)&&H(s,"href",f)},i:d,o:d,d(e){e&&(m(t),m(l),m(s))}}}function z(r,t,o){let n;return k(r,x,l=>o(0,n=l)),[n]}class G extends q{constructor(t){super(),A(this,t,z,y,j,{})}}export{G as component};
