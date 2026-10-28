const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('realmeds/index.html','utf8');
const reference=JSON.parse(fs.readFileSync('realmeds/docs/faq/content-check.json','utf8'));
const section=html.match(/<section id="faq"[\s\S]*?<\/section>/)[0];
const clean=s=>s.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const qs=[...section.matchAll(/class="rm-faq-question collapsed"[^>]*>([\s\S]*?)<\/button>/g)].map(m=>clean(m[1]));
const ans=[...section.matchAll(/class="rm-faq-answer-body">([\s\S]*?)<\/div>/g)].map(m=>clean(m[1]));
assert.deepStrictEqual(qs,reference.questions);assert.deepStrictEqual(ans,reference.answers);
assert.deepStrictEqual([...section.matchAll(/class="rm-faq-number"[^>]*>(.*?)<\/span>/g)].map(m=>m[1]),['01','02','03','04','05','06','07']);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
const source=fs.readFileSync('C:/Users/HP/.codex/attachments/2a3a2838-2b65-4be1-a67b-15fd62cb76af/Pasted text.txt','utf8');
qs.forEach((q,i)=>{assert(source.includes(q));assert(source.includes(ans[i]));});
const code=fs.readFileSync('realmeds/docs/faq/faq.js','utf8');
function element(){const values=new Set();return{classList:{add:x=>values.add(x),remove:x=>values.delete(x),contains:x=>values.has(x),toggle:(x,v)=>v?values.add(x):values.delete(x)},events:{},attrs:{},addEventListener(k,fn){this.events[k]=fn},setAttribute(k,v){this.attrs[k]=v}};}
function scenario(reduced=false,supportsObserver=true,bootstrap=false){
 const items=Array.from({length:7},()=>{const el=element();el.answer=element();el.question=element();el.querySelector=s=>s.includes('answer')?el.answer:el.question;return el;});
 const root=element();root.querySelectorAll=()=>items;
 const media=element();media.matches=reduced;
 const pending=[];let observer;
 const win={matchMedia:()=>media};if(bootstrap)win.bootstrap={Collapse:{}};
 function Observer(fn){this.callback=fn;this.observe=()=>{};this.disconnect=()=>{this.disconnected=true;};observer=this;}
 if(supportsObserver)win.IntersectionObserver=Observer;
 vm.runInNewContext(code,{document:{querySelector:()=>root},window:win,IntersectionObserver:Observer,setTimeout:(fn,delay)=>{pending.push({fn,delay});return pending.length;},clearTimeout:()=>{}});
 return{items,root,media,pending,get observer(){return observer;}};
}
const animated=scenario();assert(animated.root.classList.contains('rm-faq-motion'));
animated.observer.callback([{isIntersecting:true}]);assert.deepStrictEqual(animated.pending.map(t=>t.delay),[0,130,260,390,520,650,780]);animated.pending.forEach(t=>t.fn());assert(animated.items.every(i=>i.classList.contains('is-visible')));assert(animated.root.classList.contains('rm-faq-started'));assert(animated.observer.disconnected);
animated.items[0].question.events.click();assert(animated.items[0].answer.classList.contains('show'));assert.equal(animated.items[0].question.attrs['aria-expanded'],'true');
animated.items[1].question.events.click();assert(!animated.items[0].answer.classList.contains('show'));assert(animated.items[1].answer.classList.contains('show'));
animated.items[1].question.events.click();assert(!animated.items[1].answer.classList.contains('show'));
const bs=scenario(false,true,true);bs.items[0].answer.events['show.bs.collapse']();assert(bs.items[0].classList.contains('is-open'));bs.items[0].answer.events['hide.bs.collapse']();assert(!bs.items[0].classList.contains('is-open'));
for(const s of [scenario(true),scenario(false,false)]){assert(s.items.every(i=>i.classList.contains('is-visible')));assert(!s.root.classList.contains('rm-faq-motion'));}
const keyboard=scenario();keyboard.root.events.focusin();assert(keyboard.items.every(i=>i.classList.contains('is-visible')));
console.log('PASS: Exact 7 question/answer pairs match source; numbering 01–07; unique IDs; reveal order/timing; line trigger; Bootstrap active-state events; fallback accordion toggling; keyboard reveal; reduced motion; unsupported observer fallback.');
