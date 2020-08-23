(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{62:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(6),o=(n(0),n(75)),i={id:"motivation",title:"Motivation",sidebar_label:"Motivation"},c={unversionedId:"motivation",id:"motivation",isDocsHomePage:!1,title:"Motivation",description:"Motivation",source:"@site/../generated-docs/target/mdoc/motivation.md",permalink:"/scala-hedgehog/docs/motivation",sidebar_label:"Motivation",sidebar:"docs",previous:{title:"Getting Started",permalink:"/scala-hedgehog/docs/getting-started"},next:{title:"Resources",permalink:"/scala-hedgehog/docs/resources"}},s=[{value:"Motivation",id:"motivation",children:[{value:"Design Considerations",id:"design-considerations",children:[]}]}],l={rightToc:s};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"motivation"},"Motivation"),Object(o.b)("p",null,"The background and motivation for Hedgehog in general is still best described by the original\nauthor in this excellent presenation:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"https://www.youtube.com/watch?v=AIv_9T0xKEo"}),"Gens N\u2019 Roses: Appetite for Reduction")," (",Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"https://slides.yowconference.com/yowlambdajam2017/Stanley-GensNRoses.pdf"}),"slides"),")")),Object(o.b)("p",null,"A very quick summary is that the original QuickCheck and it's derivatives (like ScalaCheck)\nseparate the generation of data from the shrinking, which results in something that cannot be\ncomposed easily. It turns out it's fairly simple to combine them in a single data-type."),Object(o.b)("p",null,"If you've used ScalaCheck before, it's exactly the same as writing your normal ",Object(o.b)("inlineCode",{parentName:"p"},"Gen")," functions,\nbut now those generated value will shrink without any extra information. Magic!"),Object(o.b)("h3",{id:"design-considerations"},"Design Considerations"),Object(o.b)("p",null,"As a general rule, the current Scala API is intended to be ",Object(o.b)("em",{parentName:"p"},"direct")," port of\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/hedgehogqa/haskell-hedgehog"}),"haskell-hedgehog"),", much like\n",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/rickynils/scalacheck"}),"scalacheck")," was for ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"http://hackage.haskell.org/package/QuickCheck"}),"QuickCheck"),".\nThe idea being that people familiar with one of the libraries will be comfortable with the other.\nIt also makes it easier not having to re-invent any wheels (or APIs).\nThere will obviously be exceptions where Scala forces us to make a different trade-off.\nSee ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/scala-hedgehog/docs/guides-haskell-differences"}),"haskell-differences")," for examples and more explanation."))}u.isMDXComponent=!0},75:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,h=p["".concat(i,".").concat(d)]||p[d]||b[d]||o;return n?a.a.createElement(h,c(c({ref:t},l),{},{components:n})):a.a.createElement(h,c({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);