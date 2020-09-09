import{S as t,i as e,s,e as a,t as o,c as n,a as r,k as l,d as p,b as c,f as i,g as h,D as u,o as m,h as g,H as d,j as f,A as b,B as _,p as $,q as k,n as y,x as P,y as v,z as w,C as x}from"./client.ffc5caad.js";import{d as j,a as L}from"./_api.5f596b86.js";import"./showdown.20a62d9b.js";import{L as N}from"./ListPagination.013a8ebb.js";import{P as C}from"./PostList.d419e488.js";function E(t){let e,s;return{c(){e=a("script"),s=o('cookieconsent.run({\n        notice_banner_type: "headline",\n        consent_type: "express",\n        palette: "light",\n        language: "en",\n        website_name: "https://blog.threefold.io/",\n        cookies_policy_url: "https://wiki.threefold.io/#/privacypolicy"\n      });'),this.h()},l(t){e=n(t,"SCRIPT",{type:!0});var a=r(e);s=l(a,'cookieconsent.run({\n        notice_banner_type: "headline",\n        consent_type: "express",\n        palette: "light",\n        language: "en",\n        website_name: "https://blog.threefold.io/",\n        cookies_policy_url: "https://wiki.threefold.io/#/privacypolicy"\n      });'),a.forEach(p),this.h()},h(){c(e,"type","text/javascript")},m(t,a){i(t,e,a),h(e,s)},d(t){t&&p(e)}}}function I(t){return{c:y,l:y,m:y,p:y,i:y,o:y,d:y}}function q(t){let e,s,o,l;const h=new C({props:{posts:t[10],username:t[3]}}),u=new N({props:{articlesCount:t[2],articlesPerPage:t[1].posts_per_page,objectPath:"/blog/"+t[3]+"/posts",page:t[4]}});return{c(){e=a("div"),P(h.$$.fragment),s=g(),o=a("div"),P(u.$$.fragment),this.h()},l(t){e=n(t,"DIV",{class:!0});var a=r(e);v(h.$$.fragment,a),a.forEach(p),s=f(t),o=n(t,"DIV",{class:!0});var l=r(o);v(u.$$.fragment,l),l.forEach(p),this.h()},h(){c(e,"class","row"),c(o,"class","row")},m(t,a){i(t,e,a),w(h,e,null),i(t,s,a),i(t,o,a),w(u,o,null),l=!0},p(t,e){const s={};1&e&&(s.posts=t[10]),8&e&&(s.username=t[3]),h.$set(s);const a={};4&e&&(a.articlesCount=t[2]),2&e&&(a.articlesPerPage=t[1].posts_per_page),8&e&&(a.objectPath="/blog/"+t[3]+"/posts"),16&e&&(a.page=t[4]),u.$set(a)},i(t){l||(b(h.$$.fragment,t),b(u.$$.fragment,t),l=!0)},o(t){_(h.$$.fragment,t),_(u.$$.fragment,t),l=!1},d(t){t&&p(e),x(h),t&&p(s),t&&p(o),x(u)}}}function D(t){return{c:y,l:y,m:y,p:y,i:y,o:y,d:y}}function S(t){let e,s,a,o,n,r=t[1].cookie_consent_popup&&E(),l={ctx:t,current:null,token:null,pending:D,then:q,catch:I,value:10,blocks:[,,,]};return u(o=t[0],l),{c(){r&&r.c(),e=m(),s=g(),a=m(),l.block.c(),this.h()},l(t){const o=d('[data-svelte="svelte-144l6me"]',document.head);r&&r.l(o),e=m(),o.forEach(p),s=f(t),a=m(),l.block.l(t),this.h()},h(){document.title="Blog"},m(t,o){r&&r.m(document.head,null),h(document.head,e),i(t,s,o),i(t,a,o),l.block.m(t,l.anchor=o),l.mount=(()=>a.parentNode),l.anchor=a,n=!0},p(s,[a]){if((t=s)[1].cookie_consent_popup?r||((r=E()).c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),l.ctx=t,1&a&&o!==(o=t[0])&&u(o,l));else{const e=t.slice();e[10]=l.resolved,l.block.p(e,a)}},i(t){n||(b(l.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const e=l.blocks[t];_(e)}n=!1},d(t){r&&r.d(t),p(e),t&&p(s),t&&p(a),l.block.d(t),l.token=null,l=null}}}async function B({host:t,path:e,params:s,query:a}){console.log("params in posts index",JSON.stringify(s));let o=parseInt(a.page);o||this.redirect(302,`${s.theuser}/posts?page=1`);let n=await j(s.theuser);o>0&&o--,console.log(n.length);let r=n.length;const l=await L(s.theuser);let p=l.posts_per_page||5,c=o*p,i=o*p+p;return{path:e,posts:n.slice(c,i),totalPostsLength:r,metadata:l}}function V(t,e,s){let a,{posts:o=[]}=e,{metadata:n}=e,{totalPostsLength:r}=e,{path:l}=e;const{preloading:p,page:c,session:i}=$();k(t,c,t=>s(7,a=t)),console.log("in posts index",a.params);let{username:h=a.params.theuser}=e,{pageNum:u=a.query.page}=e;return t.$set=(t=>{"posts"in t&&s(0,o=t.posts),"metadata"in t&&s(1,n=t.metadata),"totalPostsLength"in t&&s(2,r=t.totalPostsLength),"path"in t&&s(6,l=t.path),"username"in t&&s(3,h=t.username),"pageNum"in t&&s(4,u=t.pageNum)}),[o,n,r,h,u,c,l]}export default class extends t{constructor(t){super(),e(this,t,V,S,s,{posts:0,metadata:1,totalPostsLength:2,path:6,username:3,pageNum:4})}}export{B as preload};