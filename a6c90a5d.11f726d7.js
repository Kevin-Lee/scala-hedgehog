(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{63:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return d}));var n=a(2),r=a(6),i=(a(0),a(75)),o={title:"State-Based Property Testing Tutorial (Part 2 - Vars)",sidebar_label:"State-Based Testing (2)",slug:"/guides-state-tutorial-vars"},c={unversionedId:"guides/state-tutorial-vars",id:"guides/state-tutorial-vars",isDocsHomePage:!1,title:"State-Based Property Testing Tutorial (Part 2 - Vars)",description:"State-Based Property Testing Tutorial (Part 2 - Vars)",source:"@site/../generated-docs/target/mdoc/guides/state-tutorial-vars.md",permalink:"/scala-hedgehog/docs/guides-state-tutorial-vars",sidebar_label:"State-Based Testing (2)",sidebar:"docs",previous:{title:"State-Based Property Testing Tutorial",permalink:"/scala-hedgehog/docs/guides-state-tutorial"},next:{title:"Migration From ScalaCheck",permalink:"/scala-hedgehog/docs/guides-migration-from-scalacheck"}},l=[{value:"State-Based Property Testing Tutorial (Part 2 - Vars)",id:"state-based-property-testing-tutorial-part-2---vars",children:[]},{value:"Follow Along",id:"follow-along",children:[]},{value:"The Problem",id:"the-problem",children:[{value:"Model (take 1)",id:"model-take-1",children:[]},{value:"Gen",id:"gen",children:[]},{value:"Execute (take 1)",id:"execute-take-1",children:[]},{value:"Update",id:"update",children:[]},{value:"WTF",id:"wtf",children:[]},{value:"Model (take 2)",id:"model-take-2",children:[]},{value:"Execute (take 2)",id:"execute-take-2",children:[]},{value:"Ensure",id:"ensure",children:[]}]},{value:"Debugging",id:"debugging",children:[]},{value:"Resources",id:"resources",children:[]}],s={rightToc:l};function d(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"state-based-property-testing-tutorial-part-2---vars"},"State-Based Property Testing Tutorial (Part 2 - Vars)"),Object(i.b)("p",null,"This tutorial continues on from the ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"/scala-hedgehog/docs/guides-state-tutorial"}),"first tutorial"),"."),Object(i.b)("h2",{id:"follow-along"},"Follow Along"),Object(i.b)("p",null,"Please feel to play along and tinker with the code."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"$ ./sbt\n> example/runMain hedgehog.examples.state.CRTest\n")),Object(i.b)("h2",{id:"the-problem"},"The Problem"),Object(i.b)("p",null,"To start with let's define an interface/abstraction for something we want to\ntest against, part of a basic create/read/update/delete or ",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Create,_read,_update_and_delete"}),"CRUD")," store, which\nI'm calling ",Object(i.b)("inlineCode",{parentName:"p"},"CR")," as we only support create/read to simplify the example:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"trait CR {\n\n  def create(v: String): CRId\n\n  def read(id: CRId): Option[String]\n}\n\ncase class CRId(render: String)\n")),Object(i.b)("p",null,"NOTE: The big difference here from the previous ",Object(i.b)("inlineCode",{parentName:"p"},"KV")," is that the service is\nreturning it's own identifier instead of being passed on. That has implications\nfor testing the state with Hedgehog, which require something extra..."),Object(i.b)("h3",{id:"model-take-1"},"Model (take 1)"),Object(i.b)("p",null,"Similar to our previous example, this also seems fairly straight forward.\nBut we're about to hit a snag..."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"case class State(map: Map[CRId, String])\n")),Object(i.b)("p",null,"And our command input types:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"case class Create(value: String)\ncase class Read(id: CRId)\n")),Object(i.b)("p",null,"Now let's step throught the ",Object(i.b)("inlineCode",{parentName:"p"},"Command")," functions for ",Object(i.b)("inlineCode",{parentName:"p"},"create"),"/",Object(i.b)("inlineCode",{parentName:"p"},"read")," like\nbefore:"),Object(i.b)("h3",{id:"gen"},"Gen"),Object(i.b)("p",null,"Generation is fairly typical. Note that we can't really usefully create a\n",Object(i.b)("inlineCode",{parentName:"p"},"Read")," value until we have at least one value in ",Object(i.b)("inlineCode",{parentName:"p"},"State"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"def gen(s: State): Option[Gen[Create]] =\n  Some(for {\n    v <- Gen.string(Gen.ascii, Range.linear(1, 10))\n  } yield Create(v))\n\ndef gen(s: State): Option[Gen[Read]] =\n  s.map.keys.toList match {\n    case Nil =>\n      // We haven't created anything yet\n      None\n    case h :: t =>\n      Some(Gen.element(h, t).map(Read(_)))\n  }\n")),Object(i.b)("h3",{id:"execute-take-1"},"Execute (take 1)"),Object(i.b)("p",null,"So far everything lines up just like before:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"def execute(i: Create): Either[String, CRId] =\n  Right(cr.create(i.key, i.value))\n\ndef execute(i: Read): Either[String, Option[String]] =\n  Right(cr.read(i.key))\n")),Object(i.b)("h3",{id:"update"},"Update"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"def update(s: State, i: Create, o: Var[CRId]): State =\n  s.copy(map = s.map + (o -> i.value))\n\n// There are no side-effects for get, so nothing to do\ndef update(s: State, i: Read): State =\n  s\n")),Object(i.b)("p",null,"Hang on, what's that ",Object(i.b)("inlineCode",{parentName:"p"},"Var[CRid]")," doing?!? Why isn't it just a concrete ",Object(i.b)("inlineCode",{parentName:"p"},"CRId"),"?\nThat code doesn't even compile!"),Object(i.b)("h3",{id:"wtf"},"WTF"),Object(i.b)("p",null,'It turns out that Hedgehog forces a very clear separation for functions that\ncan access the "real world" state, and those that can\'t. The reasons for this\nare a little involved, but the basic idea is that we can generate a full\nsequence of commands up-front, without having called ',Object(i.b)("inlineCode",{parentName:"p"},"execute"),'. So the\nquestion/problem then becomes, how do we capture the "result" to be used in\n',Object(i.b)("inlineCode",{parentName:"p"},"gen"),", like we ",Object(i.b)("em",{parentName:"p"},"need")," to do for ",Object(i.b)("inlineCode",{parentName:"p"},"read"),"?"),Object(i.b)("p",null,"This is where ",Object(i.b)("inlineCode",{parentName:"p"},"Var")," and ",Object(i.b)("inlineCode",{parentName:"p"},"Environment")," come in. For each ",Object(i.b)("inlineCode",{parentName:"p"},"Command.execute"),",\nHedgehog allocates a unique ",Object(i.b)("inlineCode",{parentName:"p"},"Name")," (just a plain old incrementing ",Object(i.b)("inlineCode",{parentName:"p"},"Int"),"), and\npassed ",Object(i.b)("em",{parentName:"p"},"that"),' to the "pure" functions, like ',Object(i.b)("inlineCode",{parentName:"p"},"update")," and ",Object(i.b)("inlineCode",{parentName:"p"},"gen"),". It's only when\nwe need the ",Object(i.b)("em",{parentName:"p"},"concrete")," values do we get access to the ",Object(i.b)("inlineCode",{parentName:"p"},"Environment")," to look\nthem up."),Object(i.b)("p",null,"Here is the relevant data types, that should hopefully make more sense now?"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"case class Name(value: Int)\n\ncase class Environment(map: Map[Name, Any])\n\ncase class Var[A](name: Name) {\n  def get(env: Env): A =\n    env.map(name)\n}\n")),Object(i.b)("h3",{id:"model-take-2"},"Model (take 2)"),Object(i.b)("p",null,"So we will need to tweak our model and input slightly to use ",Object(i.b)("inlineCode",{parentName:"p"},"Var"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"case class State(map: Map[Var[CRId], String])\n\ncase class Read(id: Var[CRId])\n")),Object(i.b)("h3",{id:"execute-take-2"},"Execute (take 2)"),Object(i.b)("p",null,"So let's try that again. Note that we now use ",Object(i.b)("inlineCode",{parentName:"p"},"Environment")," in the ",Object(i.b)("inlineCode",{parentName:"p"},"Read"),"\nversion to ",Object(i.b)("inlineCode",{parentName:"p"},"get")," the concrete ",Object(i.b)("inlineCode",{parentName:"p"},"CRId")," returned from ",Object(i.b)("inlineCode",{parentName:"p"},"create"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"def execute(env: Environment, i: Create): Either[String, CRId] =\n  Right(cr.create(i.key, i.value))\n\ndef execute(env: Environment, i: Read): Either[String, Option[String]] =\n  Right(cr.read(i.key.get(env)))\n")),Object(i.b)("h3",{id:"ensure"},"Ensure"),Object(i.b)("p",null,"This is identical to ",Object(i.b)("inlineCode",{parentName:"p"},"KV"),", although notice we ",Object(i.b)("em",{parentName:"p"},"could")," use ",Object(i.b)("inlineCode",{parentName:"p"},"Environment")," here if\nwe needed to, unlike ",Object(i.b)("inlineCode",{parentName:"p"},"update"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"// Almost the reverse of update, for side-effect operations we may not observe anything just yet\ndef ensure(env: Environment, s0: State, s1: State, i: Create, o: CRId): Result =\n  Result.success\n\ndef ensure(env: Environment, s0: State, s1: State, i: Read, o: Option[String]): Result =\n  s1.map.get(i.key) ==== o\n")),Object(i.b)("h2",{id:"debugging"},"Debugging"),Object(i.b)("p",null,"Let's look at the output of a failed test again:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"Var(Name(0)) = Create(a)\nVar(Name(1)) = Create(b)\nVar(Name(2)) = Read(Var(Name(0)))\n")),Object(i.b)("p",null,"We can start to see that each command is shown to be assigning the result to a\nnew, unique ",Object(i.b)("inlineCode",{parentName:"p"},"Var"),". We aren't looking at the ",Object(i.b)("em",{parentName:"p"},"actual")," ",Object(i.b)("inlineCode",{parentName:"p"},"CRId")," values.  Hedgehog\n(currently) can't tell that ",Object(i.b)("inlineCode",{parentName:"p"},"Read")," doesn't actually return anything (useful)\nand so the ",Object(i.b)("inlineCode",{parentName:"p"},"Unit")," value is also asigned to a new ",Object(i.b)("inlineCode",{parentName:"p"},"Var"),"."),Object(i.b)("h2",{id:"resources"},"Resources"),Object(i.b)("p",null,"Unfortunately there isn't much documentation for this approach at the moment."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"http://www.cse.chalmers.se/~nicsma/papers/finding-race-conditions.pdf"}),"Finding Race Conditions in Erlang with QuickCheck and PULSE"),"\nHedgehog follows a vague description of this implementation which is mentioned\nin this paper."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://teh.id.au/posts/2017/07/15/state-machine-testing/index.html#parameterised-actions"}),"State machine testing with Hedgehog")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/scala-hedgehog/docs/guides-haskell-differences#state-vars"}),"Haskell Differences"))))}d.isMDXComponent=!0},75:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=r.a.createContext({}),d=function(e){var t=r.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=d(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=d(a),u=n,m=p["".concat(o,".").concat(u)]||p[u]||b[u]||i;return a?r.a.createElement(m,c(c({ref:t},s),{},{components:a})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var s=2;s<i;s++)o[s]=a[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"}}]);