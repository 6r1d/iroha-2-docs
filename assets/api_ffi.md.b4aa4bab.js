import{_ as e,o as a,c as s,V as n}from"./chunks/framework.7726510e.js";const o="/iroha-2-docs/assets/ffi.5bfc24bc.png",m=JSON.parse('{"title":"Foreign Function Interfaces (FFI)","description":"","frontmatter":{},"headers":[],"relativePath":"api/ffi.md","lastUpdated":1693205053000}'),t={name:"api/ffi.md"},l=n(`<h1 id="foreign-function-interfaces-ffi" tabindex="-1">Foreign Function Interfaces (FFI) <a class="header-anchor" href="#foreign-function-interfaces-ffi" aria-label="Permalink to &quot;Foreign Function Interfaces (FFI)&quot;">​</a></h1><p>To reduce the sizes of smartcontracts, we provide a dynamic library in the execution environment. We shall detail how to link against that library and use the functions at a later date, but for now, let&#39;s explore how to include functions and trait implementations into that library.</p><h2 id="why-ffi" tabindex="-1">Why FFI <a class="header-anchor" href="#why-ffi" aria-label="Permalink to &quot;Why FFI&quot;">​</a></h2><p>A function is a rather abstract entity, and while most languages agree on what a function should do, the way in which said functions are represented is very different. Moreover, in some languages (like Rust), the consequences of calling a function, and the things that it is allowed to do are different. Because one can use any language to create a <a href="/iroha-2-docs/guide/blockchain/wasm.html">WASM smartcontract</a>, we need to level the playing field. This is where the concept of foreign function interface (FFI) comes in.</p><p>The main standard used today is the C application binary interface. It&#39;s simple, it&#39;s guaranteed to be available even in languages which can&#39;t compile to WASM, and it&#39;s stable. In principle, you could do everything manually, but Iroha provides you with a crate <code>iroha_ffi</code> which contains all you need to generate FFI-compliant functions out of your existing <code>Rust</code> API.</p><p>You can, of course, do this your way. The <code>iroha_ffi</code> crate merely generates the code that you would need to generate anyway. Writing the necessary boilerplate requires quite a bit of diligence and discipline. Every function call over the FFI boundary is <code>unsafe</code> with a potential to cause undefined behaviour. The method by which we managed to solve it, revolves around using <strong>robust</strong> <code>repr(C)</code> types.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>The only exception are pointers. The null check and the validity cannot be enforced globally, so raw pointers (as always) are only used in exceptional cases. Given that we provide wrappers around almost every instance of an object in the Iroha data model, you shouldn&#39;t have to use raw pointers at all.</p></div><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>Here is an example of generating a binding:</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-dark-dimmed"><code><span class="line"><span style="color:#ADBAC7;">#[derive(</span><span style="color:#F69D50;">FfiType</span><span style="color:#ADBAC7;">)]</span></span>
<span class="line"><span style="color:#F47067;">struct</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">DaysSinceEquinox</span><span style="color:#ADBAC7;">(</span><span style="color:#F69D50;">u32</span><span style="color:#ADBAC7;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ADBAC7;">#[ffi_export]</span></span>
<span class="line"><span style="color:#F47067;">impl</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">DaysSinceEquinox</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">pub</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">fn</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">update_value</span><span style="color:#ADBAC7;">(</span><span style="color:#F47067;">&amp;mut</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">self</span><span style="color:#ADBAC7;">, a</span><span style="color:#F47067;">:</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">&amp;</span><span style="color:#F69D50;">u8</span><span style="color:#ADBAC7;">) {</span></span>
<span class="line"><span style="color:#ADBAC7;">        </span><span style="color:#6CB6FF;">self</span><span style="color:#F47067;">.</span><span style="color:#6CB6FF;">0</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">=</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">*</span><span style="color:#ADBAC7;">a </span><span style="color:#F47067;">as</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">u32</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">    }</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre></div><p>The example above will generate the following binding with <code>DaysSinceEquinox</code> represented as an opaque pointer:</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-dark-dimmed"><code><span class="line"><span style="color:#F47067;">pub</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">extern</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">fn</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">DaysSinceEquinox__update_value</span><span style="color:#ADBAC7;">(handle</span><span style="color:#F47067;">:</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">*mut</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">DaysSinceEquinox</span><span style="color:#ADBAC7;">, a</span><span style="color:#F47067;">:</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">*const</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">u8</span><span style="color:#ADBAC7;">) </span><span style="color:#F47067;">-&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">FfiReturn</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#768390;">    // function implementation</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre></div><h2 id="ffi-binding-generation" tabindex="-1">FFI Binding Generation <a class="header-anchor" href="#ffi-binding-generation" aria-label="Permalink to &quot;FFI Binding Generation&quot;">​</a></h2><p>The <code>iroha_ffi</code> crate is used to generate functions that are callable via FFI. Given <code>Rust</code> structs and methods, they generate the <code>unsafe</code> code that you would need in order to cross the linking boundary.</p><p>A Rust type is converted into a robust <code>repr(C)</code> type that can cross the FFI boundary with <code>FfiType::into_ffi</code>. This goes the other way around as well: FFI <code>ReprC</code> type is converted into a <code>Rust</code> type via <code>FfiType::try_from_ffi</code>.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Note that the opposite conversion is fallible and can cause undefined behaviour. While we can make the best effort to avoid the most obvious mistakes, you must ensure the program&#39;s correctness on your end.</p></div><p>The diagram below uses the creation of a new domain as an example to show the conversion process (more on the name mangling semantics in a <a href="#name-mangling">separate section</a>).</p><p><img src="`+o+`" alt="Untitled"></p><p>The main traits that enable binding generation are <code>ReprC</code>, <code>FfiType</code> and <code>FfiConvert</code></p><table><thead><tr><th>Trait</th><th>Description</th></tr></thead><tbody><tr><td><code>ReprC</code></td><td>This trait represents a robust type that conforms to C ABI. The type can be safely shared across FFI boundaries.</td></tr><tr><td><code>FfiType</code></td><td>This trait defines a corresponding <code>ReprC</code> type for a given <code>Rust</code> type. The defined <code>ReprC</code> type is used in place of the <code>Rust</code> type in the API of the generated FFI function.</td></tr><tr><td><code>FfiConvert</code></td><td>This trait defines two methods <code>into_ffi</code> and <code>try_from_ffi</code> that are used to perform the conversion of the <code>Rust</code> type to or from <code>ReprC</code> type.</td></tr></tbody></table><p>Note that there is no ownership transfer over FFI except for opaque pointer types. All other types that carry ownership, such as <code>Vec&lt;T&gt;</code>, are cloned.</p><h3 id="name-mangling" tabindex="-1">Name Mangling <a class="header-anchor" href="#name-mangling" aria-label="Permalink to &quot;Name Mangling&quot;">​</a></h3><p>Note the use of double underscores in generated names of FFI objects:</p><ul><li><p>For the <code>inherent_fn</code> method defined on the <code>StructName</code> struct, the FFI name would be <code>StructName__inherent_fn</code>.</p></li><li><p>For the <code>MethodName</code> method from the <code>TraitName</code> trait in the <code>StructName</code> struct, the FFI name would be <code>StructName__TraitName__MethodName</code>.</p></li><li><p>To set the <code>field_name</code> field in the <code>StructName</code> struct, the FFI function name would be <code>StructName__set_field_name</code>.</p></li><li><p>To get the <code>field_name</code> field in the <code>StructName</code> struct, the FFI function name would be <code>StructName__field_name</code>.</p></li><li><p>To get the mutable <code>field_name</code> field in the <code>StructName</code> struct, the FFI function name would be <code>StrucuName__field_name_mut</code>.</p></li><li><p>For the freestanding <code>module_name::fn_name</code>, the FFI name would be <code>module_name::__fn_name</code>.</p></li><li><p>For the traits that are not generic and allow sharing their implementation in the FFI (see <code>Clone</code> below), the FFI name would be <code>module_name::__clone</code>.</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki github-dark-dimmed"><code><span class="line"><span style="color:#F47067;">impl</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">Clone</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">for</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">Type1</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">fn</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">clone</span><span style="color:#ADBAC7;">(</span><span style="color:#F47067;">&amp;</span><span style="color:#6CB6FF;">self</span><span style="color:#ADBAC7;">) </span><span style="color:#F47067;">-&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">Self</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span>
<span class="line"><span style="color:#F47067;">impl</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">Clone</span><span style="color:#ADBAC7;"> </span><span style="color:#F47067;">for</span><span style="color:#ADBAC7;"> </span><span style="color:#F69D50;">Type2</span><span style="color:#ADBAC7;"> {</span></span>
<span class="line"><span style="color:#ADBAC7;">    </span><span style="color:#F47067;">fn</span><span style="color:#ADBAC7;"> </span><span style="color:#DCBDFB;">clone</span><span style="color:#ADBAC7;">(</span><span style="color:#F47067;">&amp;</span><span style="color:#6CB6FF;">self</span><span style="color:#ADBAC7;">) </span><span style="color:#F47067;">-&gt;</span><span style="color:#ADBAC7;"> </span><span style="color:#6CB6FF;">Self</span><span style="color:#ADBAC7;">;</span></span>
<span class="line"><span style="color:#ADBAC7;">}</span></span></code></pre></div></li></ul>`,24),p=[l];function c(r,i,d,y,h,u){return a(),s("div",null,p)}const A=e(t,[["render",c]]);export{m as __pageData,A as default};
