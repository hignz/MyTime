!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports={getPlural:e=>e>1?"s":"",isToday:e=>(new Date).getDay()-1===e,isClassNow:(e,t,n)=>new Date(`01/01/1990 ${n}`)>=new Date(`01/01/1990 ${e}`)&&new Date(`01/01/1990 ${n}`)<=new Date(`01/01/1990 ${t}`),isClassApporaching:(e,t)=>{const n=Math.floor((Date.parse(`01/01/1990 ${e}`)-Date.parse(`01/01/1990 ${t}`))/6e4);return n<=20&&n>0},isClassOver:(e,t)=>new Date(`01/01/1990 ${e}`)-new Date(`01/01/1990 ${t}`)<0,fetchCourseCodes:async e=>{fetch("https://itsligo-utils.herokuapp.com/api/allcourses").then(e=>e.json()).then(t=>{console.time("getCourses()"),document.getElementById("loader").style.display="none";const n=document.getElementById("courses-datalist"),o=document.createDocumentFragment();let a;for(let e=0;e<t.length;e+=1)(a=document.createElement("option")).text=t[e].course,a.value=t[e].title||t[e].course,a.setAttribute("data-value",t[e].course),o.append(a);n.append(o),"function"==typeof e&&e(),console.timeEnd("getCourses()")}).catch(e=>{console.error(e)})},getSelectedValue:()=>{const e=document.getElementById("courses").value,t=document.querySelector(`#courses-datalist option[value='${e}']`);return null===t?"":t.dataset.value},alertCheck:()=>{localStorage.getItem("visted")||""===window.location.hash||(localStorage.setItem("visted",!0),document.getElementById("alert").style.display="block")}}},function(e,t,n){"use strict";n.r(t);var o=n(0);const a=(e,t,n,a,l)=>{if(e>t){const c=Math.abs(new Date(`01/01/1990 ${e}`).getTime()-new Date(`01/01/1990 ${t}`).getTime())/6e4;if(c>0){const e=c>=60?`Break: ${c/60} hour${Object(o.getPlural)(c/60)}`:`Break: ${c} minutes`,s=document.createElement("a");s.innerHTML=e,s.className=`list-group-item item font-weight-bold ${Object(o.isToday)(l)&&Object(o.isClassOver)(t,a)?"text-muted":"text-success"}`,n.append(s)}}};function l(e,t){fetch(`https://itsligo-utils.herokuapp.com/api/timetable/${e}`).then(e=>e.json()).then(n=>{if(console.time("timetable"),document.getElementById("loader").style.display="none",n.empty)return document.getElementById("timetable-window").style.display="block",document.getElementById("course-title").textContent="No timetable data found",void(document.getElementById("courseinfo-direct-link").href=n.url);document.getElementById("courseinfo-direct-link").href=n.url,document.title=`MyTerm | ${decodeURIComponent(e)}`;const l=document.getElementById("timetable");document.getElementById("timetable-window").append(l),document.getElementById("course-title").textContent=decodeURIComponent(e);const c=document.createDocumentFragment();let s,d;const i=document.querySelector("#temp-main"),r=(new Date).toLocaleTimeString("en-GB");let u=document.importNode(i.content,!0);for(let e=0;e<n.data.length-2;e+=1)if(n.data[e].length){let l=0;const m=(u=document.importNode(i.content,!0)).querySelector("#card-main");m.id+=e,u.querySelector("#heading").id+=e;const p=u.querySelector("#header");p.id+=e,p.setAttribute("data-target",`#collapse${e}`),p.setAttribute("aria-controls",`collapse${e}`),p.className+=` ${Object(o.isToday)(e)?"text-danger font-weight-bold":"text-white"}`,p.innerHTML+=n.data[e][0].day,(d=u.querySelector("#collapse")).id+=e;const y=u.querySelector("#class-total-badge");y.id+=e,y.innerHTML=n.data[e].length,y.className+=Object(o.isToday)(e)?" badge-danger":"",c.append(m),d=c.getElementById(`collapse${e}`),Object(o.isToday)(e)&&d.classList.add("show");for(let t=0;t<n.data[e].length;t+=1){const c=n.data[e][t];a(c.startTime,l,d,r,e),s=document.createElement("a");const i=c.name.split("/")[0].replace(/ GD & SD/,""),u=c.room.split(" (")[0],m=document.createElement("p");m.innerHTML=`${c.startTime} - ${c.endTime}<br>${i}<br>\n              ${u.split("-")[0]} - ${u.split("-")[1]}<br>\n              ${c.teacher.replace(",",", ")}`,m.classList.add("mb-0"),s.className="list-group-item item",Object(o.isToday)(e)&&(s.className+=` ${Object(o.isClassNow)(c.startTime,c.endTime,r)?"text-danger font-weight-bold":Object(o.isClassApporaching)(c.startTime,r)?"text-warning":Object(o.isClassOver)(c.endTime,r)?"text-muted":""}`),l=c.endTime,s.append(m),d.appendChild(s)}"function"==typeof t&&t()}l.append(c),console.timeEnd("timetable")}).catch(e=>{document.getElementById("timetable-window").style.display="block",document.getElementById("course-title").text="Invalid course entered",console.error(e)})}document.addEventListener("DOMContentLoaded",()=>{window.history&&window.history.pushState&&(window.onpopstate=(()=>{const{hash:e}=window.location;""===e&&window.location.reload()})),navigator.userAgent.includes("Snapchat")&&document.querySelector("#courseinfo-modal").modal("show");const e=document.getElementById("timetable-window"),t=document.getElementById("select-window"),n=document.getElementById("courses"),a=document.getElementById("searchBtn");n.addEventListener("keyup",()=>{console.log(a),0===n.value.length?a.disabled=!0:a.disabled=!1}),window.location.hash?(document.getElementById("select-window").style.display="none",l(encodeURIComponent(window.location.hash.substring(1)),()=>{e.style.display="block",Object(o.alertCheck)()}),Object(o.fetchCourseCodes)()):Object(o.fetchCourseCodes)(()=>{t.style.display="block"}),document.getElementById("searchBtn").addEventListener("click",()=>{const n=document.getElementById("timetable");for(;n.firstChild;)n.removeChild(n.firstChild);t.style.display="none",e.style.display="block";const a=Object(o.getSelectedValue)();window.location.hash="#"===a[0]?`#${a}`:a,l(encodeURIComponent(a)),Object(o.alertCheck)()},!1),document.getElementById("backBtn").addEventListener("click",()=>{document.title="MyTerm",e.style.display="none",t.style.display="block",window.history.pushState("",document.title,`${window.location.pathname}`)},!1)},!1)}]);