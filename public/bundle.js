var app=function(){"use strict";function e(){}function t(e){return e()}function o(){return Object.create(null)}function a(e){e.forEach(t)}function n(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function r(e,t){e.appendChild(t)}function i(e,t,o){e.insertBefore(t,o||null)}function u(e){e.parentNode.removeChild(e)}function l(e){return document.createElement(e)}function c(e){return document.createTextNode(e)}function d(){return c(" ")}function m(e,t,o,a){return e.addEventListener(t,o,a),()=>e.removeEventListener(t,o,a)}function h(e,t,o){null==o?e.removeAttribute(t):e.setAttribute(t,o)}function f(e,t){t=""+t,e.data!==t&&(e.data=t)}let p;function v(e){p=e}const g=[],y=[],x=[],b=[],w=Promise.resolve();let q=!1;function k(e){x.push(e)}function I(){const e=new Set;do{for(;g.length;){const e=g.shift();v(e),j(e.$$)}for(;y.length;)y.pop()();for(let t=0;t<x.length;t+=1){const o=x[t];e.has(o)||(o(),e.add(o))}x.length=0}while(g.length);for(;b.length;)b.pop()();q=!1}function j(e){e.fragment&&(e.update(e.dirty),a(e.before_update),e.fragment.p(e.dirty,e.ctx),e.dirty=null,e.after_update.forEach(k))}const $=new Set;function E(e,t){e.$$.dirty||(g.push(e),q||(q=!0,w.then(I)),e.$$.dirty=o()),e.$$.dirty[t]=!0}function S(s,r,i,u,l,c){const d=p;v(s);const m=r.props||{},h=s.$$={fragment:null,ctx:null,props:c,update:e,not_equal:l,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:o(),dirty:null};let f=!1;var g,y,x;h.ctx=i?i(s,m,(e,t)=>{h.ctx&&l(h.ctx[e],h.ctx[e]=t)&&(h.bound[e]&&h.bound[e](t),f&&E(s,e))}):m,h.update(),f=!0,a(h.before_update),h.fragment=u(h.ctx),r.target&&(r.hydrate?h.fragment.l((x=r.target,Array.from(x.childNodes))):h.fragment.c(),r.intro&&((g=s.$$.fragment)&&g.i&&($.delete(g),g.i(y))),function(e,o,s){const{fragment:r,on_mount:i,on_destroy:u,after_update:l}=e.$$;r.m(o,s),k(()=>{const o=i.map(t).filter(n);u?u.push(...o):a(o),e.$$.on_mount=[]}),l.forEach(k)}(s,r.target,r.anchor),I()),v(d)}class C{$destroy(){var t,o;o=1,(t=this).$$.fragment&&(a(t.$$.on_destroy),t.$$.fragment.d(o),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={}),this.$destroy=e}$on(e,t){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(t),()=>{const e=o.indexOf(t);-1!==e&&o.splice(e,1)}}$set(){}}function N(e,t,o){const a=Object.create(e);return a.option=t[o],a.i=o,a}function T(e){var t,o,a,n,s,m,p,v,g,y,x,b,w,q,k,I,j,$,E,S,C=e.common.origin[0],N=e.common.origin[1],T=e.common.origin[2];return{c(){t=l("h1"),o=c(e.result),a=d(),n=l("div"),s=l("a"),m=c("Tweet"),p=c("\n        or  \n      "),(v=l("div")).innerHTML='<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F10xengineers.netlify.com%2F&src=sdkpreparse" class="fb-xfbml-parse-ignore">\n\t\t\t          Share\n\t\t\t        </a>',g=d(),y=l("i"),x=c(C),b=d(),w=l("a"),q=c(N),k=d(),I=c(T),j=d(),($=l("script")).textContent='window.twttr = (function(d, s, id) {\n        var js,\n          fjs = d.getElementsByTagName(s)[0],\n          t = window.twttr || {};\n        if (d.getElementById(id)) return t;\n        js = d.createElement(s);\n        js.id = id;\n        js.src = "https://platform.twitter.com/widgets.js";\n        fjs.parentNode.insertBefore(js, fjs);\n\n        t._e = [];\n        t.ready = function(f) {\n          t._e.push(f);\n        };\n\n        return t;\n      })(document, "script", "twitter-wjs");',E=d(),(S=l("script")).textContent='(function(d, s, id) {\n        var js,\n          fjs = d.getElementsByTagName(s)[0];\n        if (d.getElementById(id)) return;\n        js = d.createElement(s);\n        js.id = id;\n        js.src =\n          "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";\n        fjs.parentNode.insertBefore(js, fjs);\n      })(document, "script", "facebook-jssdk");',h(s,"class","twitter-share-button"),h(s,"href","https://twitter.com/intent/tweet"),s.dataset.size="large",s.dataset.text=e.share,s.dataset.url="https://10xengineers.netlify.com/",s.dataset.hashtags="10xEngineer",s.dataset.related="skirani, cajotafer, cvander, dhh, addyosmani",h(v,"class","fb-share-button"),v.dataset.href="https://10xengineers.netlify.com/",v.dataset.layout="button",v.dataset.size="large",h(n,"class","flex svelte-1z0666y"),h(w,"href","https://twitter.com/skirani/status/1149302828420067328"),h(y,"class","spacing svelte-1z0666y")},m(e,u){i(e,t,u),r(t,o),i(e,a,u),i(e,n,u),r(n,s),r(s,m),r(n,p),r(n,v),i(e,g,u),i(e,y,u),r(y,x),r(y,b),r(y,w),r(w,q),r(y,k),r(y,I),i(e,j,u),i(e,$,u),i(e,E,u),i(e,S,u)},p(e,t){e.result&&f(o,t.result),e.share&&(s.dataset.text=t.share)},d(e){e&&(u(t),u(a),u(n),u(g),u(y),u(j),u($),u(E),u(S))}}}function z(t){var o,a,n,s,f,p,v,g=t.common.robot;return{c(){var e;o=l("h2"),a=c(g),n=d(),(s=l("form")).innerHTML='<div id="recaptcha"></div> <br> <input type="submit" value="Submit">',f=d(),p=l("script"),h(s,"action",""),h(s,"method","POST"),h(p,"src","https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"),p.defer=!0,v=m(s,"submit",(e=t.handleSubmit,function(t){return t.preventDefault(),e.call(this,t)}))},m(e,t){i(e,o,t),r(o,a),i(e,n,t),i(e,s,t),i(e,f,t),i(e,p,t)},p:e,d(e){e&&(u(o),u(n),u(s),u(f),u(p)),v()}}}function _(e){for(var t,o,a,n,s=e.questions[e.count].q,m=e.questions[e.count].r,p=[],v=0;v<m.length;v+=1)p[v]=L(N(e,m,v));return{c(){t=l("h2"),o=c(s),a=d(),n=l("div");for(var e=0;e<p.length;e+=1)p[e].c();h(n,"class","btn-container flex spacing svelte-1z0666y")},m(e,s){i(e,t,s),r(t,o),i(e,a,s),i(e,n,s);for(var u=0;u<p.length;u+=1)p[u].m(n,null)},p(e,t){if(e.count&&s!==(s=t.questions[t.count].q)&&f(o,s),e.questions||e.count){m=t.questions[t.count].r;for(var a=0;a<m.length;a+=1){const o=N(t,m,a);p[a]?p[a].p(e,o):(p[a]=L(o),p[a].c(),p[a].m(n,null))}for(;a<p.length;a+=1)p[a].d(1);p.length=m.length}},d(e){e&&(u(t),u(a),u(n)),function(e,t){for(let o=0;o<e.length;o+=1)e[o]&&e[o].d(t)}(p,e)}}}function A(t){var o,a,n,s,f,p,v,g,y,x,b,w,q,k,I,j,$,E,S=t.common.quote,C=t.common.qAuthor,N=t.common.title,T=t.common.button,z=t.common.changeLang;return{c(){o=l("p"),a=l("q"),n=c(S),s=d(),f=l("br"),p=d(),v=c(C),g=d(),y=l("h1"),x=c(N),b=d(),w=l("div"),q=l("button"),k=c(T),I=d(),j=l("a"),$=c(z),h(a,"cite","https://twitter.com/skirani/status/1149302828420067328"),h(q,"class","svelte-1z0666y"),h(w,"class","btn-container flex spacing svelte-1z0666y"),h(j,"href",t.common.changeLangLink),E=m(q,"click",t.handleStart)},m(e,t){i(e,o,t),r(o,a),r(a,n),r(o,s),r(o,f),r(o,p),r(o,v),i(e,g,t),i(e,y,t),r(y,x),i(e,b,t),i(e,w,t),r(w,q),r(q,k),i(e,I,t),i(e,j,t),r(j,$)},p:e,d(e){e&&(u(o),u(g),u(y),u(b),u(w),u(I),u(j)),E()}}}function L(e){var t,o,a,n,s,p,v=e.option.text;return{c(){t=l("button"),o=c(v),a=d(),t.dataset.value=n=e.option.value,t.dataset.validate=s=e.option.robot,h(t,"class","svelte-1z0666y"),p=m(t,"click",e.handleClick)},m(e,n){i(e,t,n),r(t,o),r(t,a)},p(e,a){e.count&&v!==(v=a.option.text)&&f(o,v),e.count&&n!==(n=a.option.value)&&(t.dataset.value=n),e.count&&s!==(s=a.option.robot)&&(t.dataset.validate=s)},d(e){e&&u(t),p()}}}function M(t){var o,a,n,s,m,f,p,v,g,y,x,b,w,q,k=t.common.createdBy,I=t.common.contribute;function j(e){return!1===e.started?A:!1===e.finished&&!1===e.robot?_:!1===e.finished&&!0===e.robot?z:!0===e.finished?T:void 0}var $=j(t),E=$&&$(t);return{c(){o=l("div"),a=d(),n=l("main"),E&&E.c(),s=d(),m=l("address"),f=c(k),p=d(),(v=l("a")).textContent="Cajotafer",g=c("\n  |\n  "),(y=l("a")).textContent="Twitter",x=c("\n  | "),b=c(I),w=d(),(q=l("a")).textContent="Github",h(o,"id","fb-root"),h(v,"href","https://cajotafer.com"),h(y,"href","https://twitter.com/cajotafer"),h(q,"href","https://github.com/cajotafer/10xengineers"),h(m,"class","spacing svelte-1z0666y")},m(e,t){i(e,o,t),i(e,a,t),i(e,n,t),E&&E.m(n,null),i(e,s,t),i(e,m,t),r(m,f),r(m,p),r(m,v),r(m,g),r(m,y),r(m,x),r(m,b),r(m,w),r(m,q)},p(e,t){$===($=j(t))&&E?E.p(e,t):(E&&E.d(1),(E=$&&$(t))&&(E.c(),E.m(n,null)))},i:e,o:e,d(e){e&&(u(o),u(a),u(n)),E&&E.d(),e&&(u(s),u(m))}}}function Y(e,t,o){let{texts:a,lang:n}=t;const{common:s,questions:r,resultText:i,shareText:u}=a;let l=0,c=0,d=!1,m=!1,h=!1,f="",p="";function v(e){let t=0;if(45===e)t=10;else{let o=42;for(let a=9;a>0;a--){if(e>=o){t=a;break}o-=3}}o("result",f=i(t)),o("share",p=u(t)),o("finished",m=!0)}return e.$set=(e=>{"texts"in e&&o("texts",a=e.texts),"lang"in e&&o("lang",n=e.lang)}),{texts:a,lang:n,common:s,questions:r,count:l,started:d,finished:m,robot:h,result:f,share:p,handleStart:function(){o("started",d=!0)},handleSubmit:function(){o("robot",h=!1),o("count",l+=1),l===r.length&&v(c)},handleClick:function(e){e.target.blur(),c+=parseInt(e.target.dataset.value),"true"===e.target.dataset.validate?o("robot",h=!0):o("count",l+=1),l===r.length&&v(c)}}}const B=location.pathname;let D="/es"===B?{quote:"Si tienes a un 10x engineer como parte de tus primeros ingenieros, incrementas las posibilidades de éxito de tu startup significativamente.",qAuthor:"Shekhar Kirani",title:"¿Eres un 10x Engineer?",button:"Iniciar Test",robot:"Sólo debemos asegurarnos 🤖",origin:["El origen del 10x Engineers Test is ","este hilo de Shekhar Kirani en twitter"," que fue fuertemente rechazado por la comunidad. Si no sabes de que estamos hablando, echa un vistazo."],createdBy:"Creado por",contribute:"Contribuye en",changeLang:"Change to english 🇬🇧",changeLangLink:"https://10xengineers.netlify.com"}:{quote:"If you have a 10x engineer as part of your first few engineers, you increase the odds of your startup success significantly.",qAuthor:"Shekhar Kirani",title:"Are you a 10x Engineer?",button:"Start Test",robot:"We just want to make sure 🤖",origin:["The origin of the 10x Engineers Test is ","this thread of Shekhar Kirani"," that was highly rejected by the community. If you don't know about this,just take a look."],createdBy:"Created by",contribute:"Contribute on",changeLang:"Cambiar a español 🇪🇸",changeLangLink:"https://10xengineers.netlify.com/es"},P="/es"===B?[{q:"¿Qué piensas de las reuniones?",r:[{value:1,text:"Las reuniones son necesarias para construir una startup saludable y desarrollar la comunicación."},{value:3,text:"Pienso que son una pérdida de tiempo, se discuten cosas obvias."},{value:3,text:'Solo asisto a "Reuniones de personal" convocadas por el gerente para discutir características y estado de producto.'}]},{q:"¿Qué tal tus tiempos en la oficina? ¿Eres responsable con eso?",r:[{value:3,text:"Mis tiempos son muy irregulares, me gusta programar hasta tarde así que llego tarde a la oficina."},{value:2,text:"Mis tiempos a veces son irregulares pero siempre trato de estar a tiempo."},{value:1,text:"Mis tiempos son muy regulares, aún cuando programo hasta tarde, conozco mis responsabilidades."}]},{q:"¿Cuál de estas opciones te describe mejor?",r:[{value:3,text:"Prefiero trabajar cuando hay pocas personas al rededor. No soy visible en reuniones de muchas manos."},{value:1,text:"Prefiero trabajar en un ambiente tranquilo. Compartir mis opiniones es importante."},{value:1,text:"Me enfoco en mi trabajo (quizás con música) y me gusta compartir opiniones y descubrimientos."}]},{q:"Estilo preferido",r:[{value:2,text:"El fondo de pantalla de mi laptop normalmente es un paisaje, suelo cambiar los valores por defecto."},{value:3,text:"El fondo de pantalla de mi laptop es negro y siempre cambio los valores por defecto."},{value:1,text:"No recuerdo el fondo de pantalla de mi laptop, seguramente es el por defecto."}]},{q:"¿Tu teclado tiene teclas desgastadas?",r:[{value:2,text:"Si, las teclas a, s, d y w."},{value:2,text:"Si, las teclas q, w, e y r."},{value:3,text:"Si, las teclas i, f y x."},{value:3,text:"No."},{value:3,text:"No, cada año compro una laptop nueva."}]},{q:"¿Recuerdas lo que programas?",r:[{value:1,text:"Entiendo el código y para mí es fácil encontrar lo que sea pero no conozco cada línea."},{value:3,text:"Conozco cada línea de código que está en producción, así que soluciono errores en horas en lugar de días."},{value:2,text:"Conozco cada línea de código que está en el entorno de pruebas y así no hay conflictos en producción."},{value:1,text:"No soy un robot.",robot:!0}]},{q:"¿Eres un ingeniero full-stack?",r:[{value:3,text:"Si, código es código, no importa si es front-end, back-end, API, base de datos, serverless, etc. Rara vez hago trabajo de UI."},{value:2,text:"Si, además me especializo en ciertas tecnologías."},{value:1,text:"No, puedo programar lo que sea pero también hago trabajo de UI... espera, pero front-end y UI están relacionados, ¿o no?"},{value:1,text:"No."}]},{q:'¿Puedes convertir "pensamientos" a "código" en tu mente y escribirlos de manera iterativa?',r:[{value:3,text:"Si, es lo que siempre hago."},{value:2,text:"Si, si lo que pienso es fácil."},{value:1,text:"No."}]},{q:"Dado un requerimiento de producto, ¿puedes desarrollarlo en una o dos sesiones de 4 a 6 horas con un café y sin distracciones?",r:[{value:2,text:"Pero ni me gusta el café."},{value:3,text:"Por supuesto, estoy haciendo este test justo antes de la segunda sesión."},{value:3,text:"Hagamos que sea una sesión de 3 horas."},{value:1,text:"Obviamente depende de la complejidad del requerimiento."}]},{q:"¿Buscas ayuda en la documentación de clases o métodos?",r:[{value:1,text:"Si, a pesar de mi conocimiento a veces necesito ayuda, es normal."},{value:2,text:"splice() o slice()?"},{value:3,text:"Los sé de memoria. Escribo código tan fácil como escribo español, sin descansos, sin pausa, sólo escribo."},{value:2,text:"¡Te dije que no soy un robot!",robot:!0}]},{q:"¿Estás aprendiendo nuevos frameworks, lenguajes primero que cualquiera en la compañía?, ¿Lo lees, configuras y experimentas antes que otros?",r:[{value:1,text:"Sólo los fines de semana si tengo tiempo."},{value:2,text:"Estoy trabajando, no de vacaciones."},{value:3,text:"Eso describe exactamente mi vida."}]},{q:"¿Te gusta enseñar a otros y compartir tu experiencia?",r:[{value:3,text:"Toma mucho tiempo enseñar o discutir con otros, mejor lo haría yo mismo."},{value:1,text:"¡Claro! compartir conocimiento es necesario para que el equipo mejore y el producto final."}]},{q:"¿Escribes código de calidad, sabes exactamente como debe evolucionar y tienes un modelo mental de toda la estructura general?",r:[{value:3,text:"Si."},{value:2,text:"Algunas veces no puedo hacer algo y me veo obligado a usar un truco temporalmente."},{value:1,text:"No del todo, me encargo de definir estándares y documentar."}]},{q:"¿Cuál de estas opciones define mejor la forma en la que preparas documentación?",r:[{value:3,text:"Escribo como máximo un documento de diseño, el resto está en el código."},{value:2,text:"Mi código está auto-documentado."},{value:2,text:"Todo necesita una documentación adecuada para un mejor mantenimiento."}]},{q:"¿Tu vida es miserable con los procesos, reuniones, entrenamientos y otras actividades sin valor añadido en tu trabajo?",r:[{value:3,text:"Si, estoy considerando buscar otro trabajo."},{value:2,text:"Aunque no me gusta, mi vida no es miserable."},{value:1,text:"No, todo eso es parte del trabajo y tiene un importante valor no técnico."}]}]:[{q:"What do you think about meetings?",r:[{value:1,text:"Meetings are necessary to build a healthy startup and develop the team communication."},{value:3,text:"I think it is a waste of time and obvious things are being discussed."},{value:3,text:'I only attend "Staff meetings" called by the manager to discuss features and status.'}]},{q:"How about timing in the office? are you responsible with that?",r:[{value:3,text:"My timing is highly irregular, I am a late-night coder and come late to the office."},{value:2,text:"My timing is sometimes irregular but I always try to be on time."},{value:1,text:"My timing is highly regular, even I like to code late-night, I know my responsibilities."}]},{q:"Which one does describe you better?",r:[{value:3,text:"I prefer to work when very few folks are around. I am not visible in all-hands meetings."},{value:1,text:"I prefer to work in a quiet environment. To share opinions and discoveries is important."},{value:1,text:"I focus on my work (maybe listening music) and I like to share my opinions and discoveries."}]},{q:"Preferred style",r:[{value:2,text:"My laptop screen background is normally a landscape, I often change defaults."},{value:3,text:"My laptop screen background color is black, I always change defaults."},{value:1,text:"I don't remember my laptop screen background, surely is the default."}]},{q:"Does your keyboard have worn keys?",r:[{value:2,text:"Yes, keys such as a, s, d and w."},{value:2,text:"Yes, keys such as q, w, e and r."},{value:3,text:"Yes, keys such as i, f and x."},{value:3,text:"No."},{value:3,text:"No, I buy a new laptop every year."}]},{q:"Do you remember your code?",r:[{value:1,text:"I understand the code and is easy for me to find something but I don't know every line."},{value:3,text:"I know every line of code that has gone into production so I fix bugs in hours vs days."},{value:2,text:"I know every line of code that has gone into sandbox so I don't fix bugs in production."},{value:1,text:"I am not a robot.",robot:!0}]},{q:"Are you a full-stack engineer?",r:[{value:3,text:"Yes, code is code, I don't care whether it is front-end, back-end, API, database, serverless, etc. and I rarely do UI work."},{value:2,text:"Yes, even I am specialized in certain technologies."},{value:1,text:"No, I can code anything but I also do UI work... wait, but front-end and UI are related, isn't it?."},{value:1,text:"No."}]},{q:'Can you convert "thought" into "code" in your mind and write it in an iterative fashion?',r:[{value:3,text:"Yes, I always do this."},{value:2,text:"Yes, if that thought is easy to code."},{value:1,text:"No."}]},{q:"Given a product feature, can write that entire feature in one or two sittings of 4 to 6 hours with a caffeinated drink without distraction?",r:[{value:2,text:"I don't like caffeinated drinks dude."},{value:3,text:"Of course, I am doing this test before the second sitting."},{value:3,text:"Let's make it a 3 hours sitting."},{value:1,text:"Obviously that depends of the product feature complexity."}]},{q:"Do you look at help documentation of classes or methods?",r:[{value:1,text:"Yes, even I have great knowledge, sometimes I need some help, it's normal."},{value:2,text:"splice() or slice()?"},{value:3,text:"I know it in memory and can recall from memory. I write code at the same ease as writing English. No breaks, no pause, just type."},{value:2,text:"I told you I am not a robot!",robot:!0}]},{q:"Are you learning new frameworks, languages ahead of everyone in the company? Do you gobble up, setup, experiment before anyone is getting started?",r:[{value:1,text:"Only on weekends if I have the time."},{value:2,text:"I am working, not vacationing."},{value:3,text:"This is my life story."}]},{q:"Do you like to teach others and share your experience?",r:[{value:3,text:"It takes too long to teach or discuss with others, I would rather do it myself."},{value:1,text:"Of course! to share knowledge is necessary to have a better team so a better product."}]},{q:"Do you write quality code and know exactly how the code has to evolve, and have a mental model of overall code structure?",r:[{value:3,text:"Yes."},{value:2,text:'Sometimes I can\'t do some things and I have to find a "hack" temporarily.'},{value:1,text:"Not at all, to make sure I define standards and document."}]},{q:"Which one does describe better the way to write documentation?",r:[{value:3,text:"I write at most one design document, and the rest is in the code."},{value:2,text:"My code is self-documented."},{value:2,text:"Everything needs the proper documentation to better maintenance."}]},{q:"Is your life miserable with the process, meetings, training, and other non-value-added activities in your job?",r:[{value:3,text:"Yes, I'm considering looking for another job."},{value:2,text:"Even I don't like that, my life is not miserable."},{value:1,text:"No, all of that is part of the job and have some important non-technical values."}]}],O="/es"===B?function(e){let t=0;switch(e){case 10:t=`¡Eres un ${e}x Engineer! 🤑 ¡Apple ya viene por ti!`;case 0:t="No estoy seguro de que seas un ingeniero, créeme... esfuerzate 😒";default:t=`¡Eres un ${e}x Engineer! 🤔 y eso no es suficiente.`}return t}:function(e){let t=0;switch(e){case 10:t=`You are a ${e}x Engineer! 🤑 Apple must hire you!`;case 0:t="I'm not sure you are an engineer, you have to effort... trust me 😒";default:t=`You are a ${e}x Engineer! 🤔 That is not enough.`}return t},H="/es"===B?function(e){let t=0;switch(e){case 10:t=`Soy un ${e}x Engineer! 🤑 Apple, ahí voy! Haz el test aquí ->`;case 0:t="Creo que mi vida necesita algunos cambios. 🤐 Quizás esto no es lo mío. Haz el test aquí ->";default:t=`Soy un ${e}x Engineer! Que pena 🙄. Haz el test aquí ->`}return t}:function(e){let t=0;switch(e){case 10:t=`I'm a ${e}x Engineer! 🤑 I'm preparing my CV! Do the test here ->`;case 0:t="I think my professional life needs some change. 🤐 Maybe I am not an engineer. Do the test here ->";default:t=`I'm a ${e}x Engineer! What a shame 🙄. Do the test here ->`}return t};return new class extends C{constructor(e){super(),S(this,e,Y,M,s,["texts","lang"])}}({target:document.body,props:{texts:{common:D,questions:P,resultText:O,shareText:H}}})}();
//# sourceMappingURL=bundle.js.map
