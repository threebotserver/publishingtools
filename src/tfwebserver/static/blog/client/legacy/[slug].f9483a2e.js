import{a as t,b as e,c as n,d as r,e as a,f as s,i,s as u,g as c,S as o,h as f,j as l,H as h,k as p,m as d,n as m,l as g,p as v,r as y,q as w,u as j,w as k,L as x,M as H}from"./client.70a3734d.js";import{d as R}from"./_api.6a806ef5.js";import{s as $}from"./showdown.a4d425aa.js";function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var n,s=r(t);if(e){var i=r(this).constructor;n=Reflect.construct(s,arguments,i)}else n=s.apply(this,arguments);return a(this,n)}}function E(t){var e,n,r,a,s=t[2].makeHtml(t[0].content)+"";return document.title=e=t[0].title,{c:function(){n=f("link"),r=l(),a=f("div"),this.h()},l:function(t){var e=h('[data-svelte="svelte-17jfwhl"]',document.head);n=p(e,"LINK",{rel:!0,href:!0}),e.forEach(d),r=m(t),a=p(t,"DIV",{class:!0}),g(a).forEach(d),this.h()},h:function(){v(n,"rel","stylesheet"),v(n,"href","//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.8/build/styles/default.min.css"),v(a,"class","content svelte-hmgdk5")},m:function(t,e){y(document.head,n),w(t,r,e),w(t,a,e),a.innerHTML=s},p:function(t,n){var r=j(n,1)[0];1&r&&e!==(e=t[0].title)&&(document.title=e),1&r&&s!==(s=t[2].makeHtml(t[0].content)+"")&&(a.innerHTML=s)},i:k,o:k,d:function(t){d(n),t&&d(r),t&&d(a)}}}function L(t){return M.apply(this,arguments)}function M(){return(M=t(e.mark(function t(n){var r,a,s,i,u,c;return e.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.params,n.query,a=r.theuser,s=r.slug,t.next=5,R(a);case 5:return i=t.sent,u=new Map,i.forEach(function(t){u.set(t.slug,JSON.stringify(t))}),c=u.get(s),t.abrupt("return",{thepage:JSON.parse(c)});case 10:case"end":return t.stop()}},t)}))).apply(this,arguments)}function S(t,e,n){var r,a=e.thepage,s=void 0===a?{}:a,i=x(),u=(i.preloading,i.page);i.session;H(t,u,function(t){return n(4,r=t)});var c=e.username,o=void 0===c?r.params.theuser:c,f={h1:"ui large header",h2:"ui medium header",ul:"ui list",li:"ui item"},l=(Object.keys(f).map(function(t){return{type:"output",regex:new RegExp("<".concat(t,"(.*)>"),"g"),replace:"<".concat(t,' class="').concat(f[t],'" $1>')}}),new $.Converter({metadata:!0}));return l.setFlavor("github"),t.$set=function(t){"thepage"in t&&n(0,s=t.thepage),"username"in t&&n(3,o=t.username)},t.$$.update=function(){1&t.$$.dirty&&l.makeHtml(s.content)},[s,u,l,o]}export default(function(t){n(r,o);var e=b(r);function r(t){var n;return s(this,r),n=e.call(this),i(c(n),t,S,E,u,{thepage:0,username:3}),n}return r}());export{L as preload};
