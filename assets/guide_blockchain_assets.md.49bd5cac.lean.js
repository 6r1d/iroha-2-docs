import{_ as s,o as a,c as i,I as n,V as e,J as r}from"./chunks/framework.7726510e.js";const _=JSON.parse('{"title":"Assets","description":"","frontmatter":{},"headers":[],"relativePath":"guide/blockchain/assets.md","lastUpdated":1693205053000}'),o={name:"guide/blockchain/assets.md"},d=e("",8),c=e("",4);function l(h,u,A,g,f,m){const t=r("MermaidRenderWrap");return a(),i("div",null,[d,n(t,{id:"mermaid_a3d76a1e8c22e2a4fec3e81161936e15807e50db5c7561e99c8404dda107b2ce13905a63e504fe8025fbd017689351a498e9e84078c427fce5506985540c3a9e",text:"classDiagram%0A%0Aclass%20Asset%0Aclass%20AssetDefinition%0A%0Aclass%20Id%20%7B%0A%20%20definition_id%0A%20%20account_id%0A%7D%0A%0Aclass%20Mintable%20%7B%0A%20%20%3C%3Cenumeration%3E%3E%0A%20%20Infinitely%0A%20%20Once%0A%20%20Not%0A%7D%0A%0Aclass%20AssetValue%20%7B%0A%20%20%3C%3Cenumeration%3E%3E%0A%20%20Quantity%0A%20%20BigQuantity%0A%20%20Fixed%0A%20%20Store%0A%7D%0A%0AAsset%20--%20AssetDefinition%0AAsset%20--%20Id%0AAssetDefinition%20--%20Mintable%0AAssetDefinition%20--%20AssetValue%20%0AAssetDefinition%20--%20Id%0A%0AAsset%20%3A%20id%20%7BId%7D%0AAsset%20%3A%20value%0A%0AAssetDefinition%20%3A%20id%20%7BId%7D%0AAssetDefinition%20%3A%20value_type%20%7BAssetValueType%7D%0AAssetDefinition%20%3A%20mintable%20%7BMintable%7D%0AAssetDefinition%20%3A%20metadata"}),c])}const b=s(o,[["render",l]]);export{_ as __pageData,b as default};
