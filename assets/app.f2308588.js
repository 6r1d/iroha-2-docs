import{d as u,K as i,o as _,D as d,a5 as E,b as r,E as l,L as s,C as P,I as m,_ as f,a6 as R,a7 as L,J as p,Q as c,a8 as g,u as D,v as T,l as x,a9 as O,aa as k,ab as w,ac as I,ad as V,ae as $,af as M,ag as S,ah as B,ai as F,aj as j,ak as N,al as K}from"./chunks/framework.7726510e.js";import{t as y}from"./chunks/theme.5c5b7999.js";const U={class:"sticky-container py-4"},W=u({__name:"LayoutCustom",setup(e){const{Layout:t}=y,a=i(()=>s(()=>import("./chunks/ShareFeedback.6977a042.js"),["assets/chunks/ShareFeedback.6977a042.js","assets/chunks/framework.7726510e.js","assets/chunks/vue-kakuyaku.243d24ba.js","assets/chunks/IconCheck.81cd86ee.js"])),n="https://164.92.190.45/feedback/form";return(v,A)=>(_(),d(r(t),null,E({_:2},[r(n)?{name:"sidebar-nav-before",fn:l(()=>[P("div",U,[m(r(a),{"feedback-url":r(n)},null,8,["feedback-url"])])]),key:"0"}:void 0]),1024))}});const z=f(W,[["__scopeId","data-v-12fc2a51"]]),G=i(()=>s(()=>import("./chunks/MermaidRender.1faf78c0.js"),["assets/chunks/MermaidRender.1faf78c0.js","assets/chunks/vue-kakuyaku.243d24ba.js","assets/chunks/framework.7726510e.js"])),H={components:{Mermaid:G},inheritAttrs:!1};function J(e,t,a,n,v,A){const C=p("Mermaid"),b=p("ClientOnly");return _(),d(b,null,{default:l(()=>[m(C,R(L(e.$attrs)),null,16)]),_:1})}const Q=f(H,[["render",J]]);const q={...y,Layout:z,enhanceApp({app:e}){e.component("MermaidRenderWrap",Q),e.component("CompatibilityMatrixTable",i(()=>s(()=>import("./chunks/CompatibilityMatrixTable.2bbc1b69.js"),["assets/chunks/CompatibilityMatrixTable.2bbc1b69.js","assets/chunks/vue-kakuyaku.243d24ba.js","assets/chunks/framework.7726510e.js","assets/chunks/CompatibilityMatrixTableIcon.vue_vue_type_style_index_0_lang.a7783f46.js","assets/chunks/IconCheck.81cd86ee.js"]))),e.component("CompatibilityMatrixTableIcon",i(async()=>s(()=>import("./chunks/CompatibilityMatrixTableIcon.af78c921.js"),["assets/chunks/CompatibilityMatrixTableIcon.af78c921.js","assets/chunks/CompatibilityMatrixTableIcon.vue_vue_type_style_index_0_lang.a7783f46.js","assets/chunks/IconCheck.81cd86ee.js","assets/chunks/framework.7726510e.js"])))}};function h(e){if(e.extends){const t=h(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const o=h(q),X=u({name:"VitePressApp",setup(){const{site:e}=D();return T(()=>{x(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),O(),k(),w(),o.setup&&o.setup(),()=>I(o.Layout)}});async function Y(){const e=ee(),t=Z();t.provide(V,e);const a=$(e.route);return t.provide(M,a),t.component("Content",S),t.component("ClientOnly",B),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:t,router:e,siteData:F}),{app:t,router:e,data:a}}function Z(){return j(X)}function ee(){let e=c,t;return N(a=>{let n=K(a);return e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),c&&(e=!1),s(()=>import(n),[])},o.NotFound)}c&&Y().then(({app:e,router:t,data:a})=>{t.go().then(()=>{g(t.route,a.site),e.mount("#app")})});export{Y as createApp};
