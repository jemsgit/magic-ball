(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();function g(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var c={exports:{}},k=c.exports,y;function M(){return y||(y=1,function(o){(function(s,r){o.exports?o.exports=r(s,s.document):s.Shake=r(s,s.document)})(typeof window<"u"?window:k,function(s,r){function n(t){if(this.hasDeviceMotion="ondevicemotion"in s,this.options={threshold:15,timeout:1e3},typeof t=="object")for(var e in t)t.hasOwnProperty(e)&&(this.options[e]=t[e]);if(this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null,typeof r.CustomEvent=="function")this.event=new r.CustomEvent("shake",{bubbles:!0,cancelable:!0});else if(typeof r.createEvent=="function")this.event=r.createEvent("Event"),this.event.initEvent("shake",!0,!0);else return!1}return n.prototype.reset=function(){this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null},n.prototype.start=function(){this.reset(),this.hasDeviceMotion&&s.addEventListener("devicemotion",this,!1)},n.prototype.stop=function(){this.hasDeviceMotion&&s.removeEventListener("devicemotion",this,!1),this.reset()},n.prototype.devicemotion=function(t){var e=t.accelerationIncludingGravity,a,m,u=0,d=0,f=0;if(this.lastX===null&&this.lastY===null&&this.lastZ===null){this.lastX=e.x,this.lastY=e.y,this.lastZ=e.z;return}u=Math.abs(this.lastX-e.x),d=Math.abs(this.lastY-e.y),f=Math.abs(this.lastZ-e.z),(u>this.options.threshold&&d>this.options.threshold||u>this.options.threshold&&f>this.options.threshold||d>this.options.threshold&&f>this.options.threshold)&&(a=new Date,m=a.getTime()-this.lastTime.getTime(),m>this.options.timeout&&(s.dispatchEvent(this.event),this.lastTime=new Date)),this.lastX=e.x,this.lastY=e.y,this.lastZ=e.z},n.prototype.handleEvent=function(t){if(typeof this[t.type]=="function")return this[t.type](t)},n})}(c)),c.exports}var b=M();const E=g(b),D=90,p=["Ваша давняя мечта сбудется.","Новое путешествие наполнит вашу жизнь непередаваемыми воспоминаниями.","Незнакомец скоро войдет в вашу жизнь поделиться с вами своим счастьем.","В ближайшем будущем вас ждут волнующие события.","У очень привлекательного человека есть для вас сообщение.","Прими свое прошлое без сожалений. Справляйся с настоящим уверенно. Смотри в глаза будущему без страха.","Вовремя начатые действия помогут вам противостоять судьбе.","Спроси себя, что из сделанного сегодня приблизит тебя к тому, кем ты хочешь стать завтра.","Один человек ищет дорогу к вашему сердцу.","Все согласны с тем, что вы лучший.","Удача благоволит смелым.","Хочешь быть счатливым? Действуй.","Если вы чувствуете, что правы, будьте тверды в своих намерениях.","Если вы чувствуете, что за это стоит бороться, боритесь.","Красивый, умный и любящий человек войдет в вашу жизнь.","Будьте осторожны, вашим врагом может оказаться сомнительный друг.","Верный друг встанет на вашу защиту.","Синица в руке лучше, чем журавль в небе.","Вас ждет начало нового пути.","Помните, что настоящему другу нужно ваше время, а не деньги.","В ближайшем будущем вам предстоит в чем-то рискнуть.","Игрок потеряет не только то, что имеет, но и то, чего у него нет.","Золотой шанс свалится на вас в этом месяце.","Крепкая дружба часто важнее страстного романа.","Хорошее время, чтобы завершить старые дела.","Ваша интуиция пытается вам что-то подсказать.","Скоро вы познакомитесь с человеком, который станет вам другом на всю жизнь.","Впереди вас ждет безграничное счастье.","Легкое сердце поможет вам пройти через все сложные времена.","С Новым годом вас ждут новые перспективы.","Человек никогда не бывает слишком стар, чтобы учиться.","Вас ждет приятный сюрприз.","От вас потребуется небольшое пожертвование. Это станет правильным решением.","Ваша улыбка откроет вам многие двери.","Вас ждет долгое путешествие, которые оправдает ваши ожидания.","Занимайтесь тем, что вы любите. Остальное встанет на свои места.","По-настоящему богатая жизнь невозможна без любви."];console.log(E);const i=document.querySelector("#ball"),h=document.querySelector("#answer"),l=document.querySelector("#answer-text"),v=document.querySelector("#logo");let L;function S(){clearTimeout(L),h==null||h.classList.add("hide"),v==null||v.classList.add("hide"),i==null||i.classList.add("shake"),L=setTimeout(()=>{let o=Math.round(Math.random()*(p.length-1));const s=p[o]||p[0];s.length>D?l==null||l.classList.add("small-font"):l==null||l.classList.remove("small-font"),l.innerText=s,h==null||h.classList.remove("hide"),i==null||i.classList.remove("slide-in-elliptic-top-fwd"),i==null||i.classList.remove("shake")},1200)}i==null||i.addEventListener("click",S);var O=new E({threshold:15,timeout:400});O.start();window.addEventListener("shake",S,!1);