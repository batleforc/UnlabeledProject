(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{102:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(109),i=a(121),o=a(105),c=a(106);var s=function(e){var t=e.nextItem,a=e.prevItem;return r.a.createElement("nav",{className:"pagination-nav","aria-label":Object(o.b)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},r.a.createElement("div",{className:"pagination-nav__item"},a&&r.a.createElement(c.a,{className:"pagination-nav__link",to:a.permalink},r.a.createElement("div",{className:"pagination-nav__sublabel"},r.a.createElement(o.a,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")),r.a.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),r.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&r.a.createElement(c.a,{className:"pagination-nav__link",to:t.permalink},r.a.createElement("div",{className:"pagination-nav__sublabel"},r.a.createElement(o.a,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")),r.a.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},m=a(114),d=a(117),v=a(122);t.default=function(e){var t=e.content,a=e.sidebar,n=t.frontMatter,o=t.metadata,c=o.title,u=o.description,p=o.nextItem,g=o.prevItem,E=o.editUrl,b=n.hide_table_of_contents;return r.a.createElement(l.a,{title:c,description:u,wrapperClassName:"blog-wrapper"},t&&r.a.createElement("div",{className:"container margin-vert--lg"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col--3"},r.a.createElement(m.a,{sidebar:a})),r.a.createElement("main",{className:"col col--7"},r.a.createElement(i.a,{frontMatter:n,metadata:o,isBlogPostPage:!0},r.a.createElement(t,null)),r.a.createElement("div",null,E&&r.a.createElement(v.a,{editUrl:E})),(p||g)&&r.a.createElement("div",{className:"margin-vert--xl"},r.a.createElement(s,{nextItem:p,prevItem:g}))),!b&&t.toc&&r.a.createElement("div",{className:"col col--2"},r.a.createElement(d.a,{toc:t.toc})))))}},117:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(104);var i=function(e,t,a){var r=Object(n.useState)(void 0),l=r[0],i=r[1];Object(n.useEffect)((function(){function n(){var n=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=a}));if(t){if(t.getBoundingClientRect().top>=a){var n=e[e.indexOf(t)-1];return null!=n?n:t}return t}return e[e.length-1]}();if(n)for(var r=0,o=!1,c=document.getElementsByClassName(e);r<c.length&&!o;){var s=c[r],m=s.href,d=decodeURIComponent(m.substring(m.indexOf("#")+1));n.id===d&&(l&&l.classList.remove(t),s.classList.add(t),i(s),o=!0),r+=1}}return document.addEventListener("scroll",n),document.addEventListener("resize",n),n(),function(){document.removeEventListener("scroll",n),document.removeEventListener("resize",n)}}))},o=a(56),c=a.n(o),s="table-of-contents__link";function m(e){var t=e.toc,a=e.isChild;return t.length?r.a.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("a",{href:"#"+e.id,className:s,dangerouslySetInnerHTML:{__html:e.value}}),r.a.createElement(m,{isChild:!0,toc:e.children}))}))):null}t.a=function(e){var t=e.toc;return i(s,"table-of-contents__link--active",100),r.a.createElement("div",{className:Object(l.a)(c.a.tableOfContents,"thin-scrollbar")},r.a.createElement(m,{toc:t}))}},122:function(e,t,a){"use strict";a.d(t,"a",(function(){return v}));var n=a(0),r=a.n(n),l=a(105),i=a(3),o=a(7),c=a(104),s=a(61),m=a.n(s),d=function(e){var t=e.className,a=Object(o.a)(e,["className"]);return r.a.createElement("svg",Object(i.a)({fill:"currentColor",height:"1.2em",width:"1.2em",preserveAspectRatio:"xMidYMid meet",role:"img",viewBox:"0 0 40 40",className:Object(c.a)(m.a.iconEdit,t),"aria-label":"Edit page"},a),r.a.createElement("g",null,r.a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function v(e){var t=e.editUrl;return r.a.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener"},r.a.createElement(d,null),r.a.createElement(l.a,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}}}]);