const {chromium,devices}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.ZEITREISE_PREVIEW||'http://localhost:3003';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const context=await browser.newContext({...devices['iPhone 13'],serviceWorkers:'block'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const audio=()=>page.locator('audio').first();const quiet=()=>page.getByRole('button',{name:'🔇 Leise',exact:true});
  const subs=()=>page.locator('[aria-label="Sprecheruntertitel"]');
  async function seek(seconds){await audio().evaluate((a,t)=>{a.currentTime=t;a.dispatchEvent(new Event('timeupdate'));},seconds);await page.waitForTimeout(500);}
  async function playing(){await page.waitForFunction(()=>{const a=document.querySelector('audio');return a&&!a.paused&&a.currentTime>.2;});}
  async function noOverflow(){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.ok(await page.evaluate(()=>{const text=document.querySelector('[aria-label="Sprecheruntertitel"]')?.getBoundingClientRect();const controls=document.querySelector('.player-controls')?.getBoundingClientRect();return !text||!controls||controls.top>=text.bottom-1;}),'Toolbar must not cover the reading window');}
  await page.goto(base+'/?start=1'); await page.waitForTimeout(750);
  await page.getByRole('button',{name:'Intro überspringen',exact:true}).click();
  await quiet().click();assert.equal(await audio().evaluate(a=>a.muted),true);
  assert.ok(await subs().isVisible());assert.ok(await subs().evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=20);
  await page.locator('.player-controls .play-control').click();await playing();
  await page.evaluate(()=>window.__quietAudio=document.querySelector('audio'));
  await seek(25);await page.locator('.player-controls .play-control').click();
  const time=await audio().evaluate(a=>a.currentTime),text=await subs().innerText();await page.waitForTimeout(450);
  assert.ok(Math.abs(await audio().evaluate(a=>a.currentTime)-time)<.05);assert.equal(await subs().innerText(),text);
  await page.getByRole('button',{name:'10 Sekunden zurückspulen',exact:true}).click();assert.ok(Math.abs(await audio().evaluate(a=>a.currentTime)-(time-10))<.1);
  await page.locator('.next-control').click();await playing();
  assert.ok(await page.evaluate(()=>window.__quietAudio===document.querySelector('audio')));assert.equal(await audio().evaluate(a=>a.muted),true);
  await noOverflow();await page.screenshot({path:'/tmp/zeitreise-quiet-e1-iphone.png',fullPage:true});
  await quiet().click();assert.equal(await audio().evaluate(a=>a.muted),false);assert.equal(await audio().evaluate(a=>a.paused),false);
  await quiet().click();await page.reload();await page.waitForTimeout(750);await page.getByRole('button',{name:'Intro überspringen',exact:true}).click();
  assert.equal(await quiet().getAttribute('aria-pressed'),'true');
  for(const ep of [2,3]){
   await page.goto(base+`/episode-${ep}/?start=1`);await page.waitForTimeout(750);
   await page.getByRole('button',{name:'Episode beginnen',exact:false}).click();await playing();
   assert.equal(await audio().evaluate(a=>a.muted),true);assert.equal(await quiet().getAttribute('aria-pressed'),'true');
   assert.ok(await subs().isVisible());await seek(25);
   await page.locator('.player-controls .play-control').click();const t=await audio().evaluate(a=>a.currentTime);await page.waitForTimeout(350);assert.ok(Math.abs(await audio().evaluate(a=>a.currentTime)-t)<.05);
   await page.getByRole('button',{name:'10 Sekunden zurückspulen',exact:true}).click();assert.ok(Math.abs(await audio().evaluate(a=>a.currentTime)-(t-10))<.1);
   await page.locator('.player-controls .play-control').click();await playing();
   await page.evaluate(()=>window.__quietAudio=document.querySelector('audio'));
   await page.locator('.next-control').click();await playing();assert.ok(await page.evaluate(()=>window.__quietAudio===document.querySelector('audio')));
   assert.equal(await audio().evaluate(a=>a.muted),true);await noOverflow();
   await page.screenshot({path:`/tmp/zeitreise-quiet-e${ep}-iphone.png`,fullPage:true});
  }
  // Episode 3's second scene contains a ten-second hold clip.
  await seek(20);assert.ok(await page.locator('video').count()>0);
  assert.equal(await page.locator('video').first().evaluate(v=>v.paused),true);
  await page.getByRole('button',{name:'10 Sekunden zurückspulen',exact:true}).click();
  await page.getByRole('button',{name:'10 Sekunden zurückspulen',exact:true}).click();
  await playing();await page.waitForTimeout(400);assert.equal(await page.locator('video').first().evaluate(v=>v.paused),false);
  const sync=await page.evaluate(()=>({a:document.querySelector('audio').currentTime,v:document.querySelector('video').currentTime}));assert.ok(Math.abs(sync.a-sync.v)<.65,JSON.stringify(sync));
  await page.setViewportSize({width:844,height:390});await noOverflow();
  await page.screenshot({path:'/tmp/zeitreise-quiet-landscape.png',fullPage:true});
  await page.setViewportSize({width:1920,height:1080});await noOverflow();
  await page.screenshot({path:'/tmp/zeitreise-quiet-desktop.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS: all 3 episodes, persisted quiet mode including intro/reload, same audio node, Weiter autoplay, pause, rewind, captions, video hold/restart/sync, iPhone/landscape/desktop, no overflow or JS errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
