const E=t=>Object.fromEntries(Object.entries(t).map(([n,e])=>n!=="i"&&e&&e!="0"&&[n,e]).filter(Boolean)),P=t=>Object.fromEntries(Object.keys(t).map(n=>{const e=t[n];return[n,Array.isArray(e)?e.map(s=>s==null?void 0:s.trim()):e===!!e?e:e==null?void 0:e.trim()]})),O=t=>{const[n="",...e]=t.split("|"),[s="",r]=n.split(":"),[o,i]=s.split("?");return{k:o,i:r,n:i==="",f:e}},k=t=>!!(t.o||t.r),y=(t,n)=>{let[e,s]=t.split(":");s||(s=e,e=n);const r=s.split("|"),[o,i,c,l,p,b]=r,u=r.filter(g=>g!==void 0).length;return u===1?{k:e,r:o}:u===2?{k:e,o,r:i}:u===3?{k:e,z:o,o:i,r:c}:{k:e,z:o,o:i,t:c,f:l,m:p,r:b}},j=/^\{.*\}$/,v=t=>Object.fromEntries(a(t).split(",").map(n=>n.split(":")).reduce((n,e)=>e.length===2?[...n,e.map(s=>s.trim())]:(n[n.length-1][1]+=","+e[0],n),[])),m=/(\{(?:[^{}]+|\{(?:[^{}]+)*\})*\})/g,a=t=>t.substring(1,t.length-1),h=(t,n=!0,e="",s="")=>t.split(m).map(r=>{if(!r.match(m))return r;const o=a(r);if(o.startsWith("{"))return y(a(o),s);const i=O(o);return s=i.k||s,!e&&(e=s),i}).map(r=>{if(typeof r=="string")return r;r.k||(r.k=e||"0");const o=P(r);return n?E(o):o}),A=(t,n,e)=>n.reduce((s,r)=>{var o,i;return(i=r.match(j)?(c=>{var l;return(l=c[s])!==null&&l!==void 0?l:c["*"]})(v(r)):(o=t[r])===null||o===void 0?void 0:o.call(t,s))!==null&&i!==void 0?i:s},e),w=(t,{z:n,o:e,t:s,f:r,m:o,r:i},c)=>{switch(n&&c==0?"zero":t.select(c)){case"zero":return n;case"one":return e;case"two":return s;case"few":return r??i;case"many":return o??i;default:return i}},_=/\?\?/g,R=(t,n,e,s)=>t.map(r=>{if(typeof r=="string")return r;const{k:o="0",f:i=[]}=r,c=s[o];if(k(r))return((typeof c=="boolean"?c?r.o:r.r:w(n,r,c))||"").replace(_,c);const l=i.length?A(e,i,c):c;return(""+(l??"")).trim()}).join(""),L=(t,n,e,s)=>{const r=s[0],o=r&&typeof r=="object"&&r.constructor===Object,i=s.length===1&&o?r:s;return R(t,n,e,i)},S=(t,n)=>t[n]||(t[n]=h(n)),T=(t,n)=>{const e={},s=new Intl.PluralRules(t);return(r,...o)=>L(S(e,r),s,n,o)};function I(t,n,e={}){return d(n,T(t,e))}const f=(t={},n)=>typeof t=="string"?n.bind(null,t):Object.assign(Object.defineProperty(()=>"","name",{writable:!0}),t),d=(t,n)=>new Proxy(f(t,n),{get:(e,s)=>s===Symbol.iterator?[][Symbol.iterator].bind(Object.values(e).map(r=>f(r,n))):d(e[s],n)}),V="nl",C=["en","nl"],G=t=>C.includes(t),z={},B={},W=t=>I(t,z[t],B[t]);export{B as a,z as b,G as c,V as d,W as i,C as l};
