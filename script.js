const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.site-nav');
const resourceToggle=document.querySelector('.nav-dropdown-toggle');
const resourceMenu=document.querySelector('.nav-dropdown');

if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
}

if(resourceToggle&&resourceMenu){
  resourceToggle.addEventListener('click',(event)=>{
    event.stopPropagation();
    const open=resourceMenu.classList.toggle('open');
    resourceToggle.setAttribute('aria-expanded',String(open));
  });
  document.addEventListener('click',()=>{
    resourceMenu.classList.remove('open');
    resourceToggle.setAttribute('aria-expanded','false');
  });
}

if(nav){
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    resourceMenu?.classList.remove('open');
    resourceToggle?.setAttribute('aria-expanded','false');
  }));
}

document.querySelectorAll('a[href="privacy.html"]').forEach(a=>{a.href='/maker/privacy.html';});

// Keep two launch-relevant facts visible in the hero as well as in their detailed sections.
const trustStrip=document.querySelector('.trust-strip');
if(trustStrip){
  if(!trustStrip.querySelector('[data-highlight="branding"]')){
    const branding=document.createElement('li');
    branding.dataset.highlight='branding';
    branding.textContent='Use your own business logo';
    trustStrip.appendChild(branding);
  }
  if(!trustStrip.querySelector('[data-highlight="android"]')){
    const android=document.createElement('li');
    android.dataset.highlight='android';
    android.textContent='Android / Google Play pending';
    trustStrip.appendChild(android);
  }
}

/*
 * Maker 1.0 release switch.
 * Keep state at `review` and appStoreUrl empty until Jordon manually releases
 * Maker and the public build passes the release-day smoke test.
 */
const RELEASE_CONFIG=Object.freeze({
  state:'review', // review | live
  appStoreUrl:''
});

const isLive=RELEASE_CONFIG.state==='live'&&Boolean(RELEASE_CONFIG.appStoreUrl);

document.querySelectorAll('.release-cta').forEach(link=>{
  link.textContent=isLive?'Download on the App Store':'App Store release pending';
  link.href=isLive?RELEASE_CONFIG.appStoreUrl:'#availability';
  if(isLive){
    link.target='_blank';
    link.rel='noopener noreferrer';
  }else{
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }
});

const iosStatus=document.querySelector('[data-ios-status]');
if(iosStatus){
  iosStatus.textContent=isLive
    ?'Available on iPhone and iPad'
    :'iPhone and iPad Build 7 submitted to Apple App Review';
}

const iosStoreCard=document.querySelector('.ios-store-card');
if(iosStoreCard){
  const title=iosStoreCard.querySelector('strong');
  const detail=iosStoreCard.querySelector('em');
  if(title)title.textContent=isLive?'Download on the App Store':'Submitted to Apple App Review';
  if(detail)detail.textContent=isLive?'Available on iPhone and iPad':'Manual release after approval';
  if(isLive){
    iosStoreCard.setAttribute('role','link');
    iosStoreCard.setAttribute('tabindex','0');
    iosStoreCard.addEventListener('click',()=>window.open(RELEASE_CONFIG.appStoreUrl,'_blank','noopener,noreferrer'));
    iosStoreCard.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        window.open(RELEASE_CONFIG.appStoreUrl,'_blank','noopener,noreferrer');
      }
    });
  }
}

const storeNote=document.querySelector('.store-note');
if(storeNote){
  storeNote.textContent=isLive
    ?'Maker 1.0 is available on the Apple App Store. Google Play release remains pending and Android availability will be announced separately.'
    :'Maker 1.0 is in Apple App Review. Public availability begins only after approval and Jordon’s manual release. Google Play release remains pending organization publishing setup.';
}

const finalEyebrow=document.querySelector('.final-cta .eyebrow');
const finalBody=document.querySelector('.final-cta p:not(.eyebrow)');
if(finalEyebrow)finalEyebrow.textContent=isLive?'Maker 1.0 is live':'Maker 1.0 is in App Review';
if(finalBody){
  finalBody.textContent=isLive
    ?'Maker 1.0 brings the complete Free + Paid small-business workflow to iPhone and iPad.'
    :'Build 7 has been submitted to Apple. Public availability begins after approval, manual release and a final smoke test of the live App Store build.';
}

document.querySelectorAll('.footer-contact span').forEach(span=>{
  if(span.textContent.includes('Pre-launch website')){
    span.textContent=isLive
      ?'© 2026 CloverBee Maker. Maker 1.0.'
      :'© 2026 CloverBee Maker. Maker 1.0 — Apple App Review.';
  }
});

// The public App Store URL only enters structured data in the live state.
const structuredData=document.querySelector('#maker-structured-data');
if(structuredData&&isLive){
  try{
    const data=JSON.parse(structuredData.textContent);
    data.downloadUrl=RELEASE_CONFIG.appStoreUrl;
    data.installUrl=RELEASE_CONFIG.appStoreUrl;
    structuredData.textContent=JSON.stringify(data);
  }catch(error){
    console.error('Maker structured data could not be updated.',error);
  }
}
