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

// Put Google Play availability at the same visual level as the Apple App Store status.
const heroActions=document.querySelector('.hero-actions');
if(heroActions&&!heroActions.querySelector('.android-release-cta')){
  const androidButton=document.createElement('a');
  androidButton.className='google-play-badge android-release-cta';
  androidButton.href='https://play.google.com/store/apps/details?id=ca.cloverbee.maker';
  androidButton.target='_blank';
  androidButton.rel='noopener noreferrer';
  androidButton.setAttribute('aria-label','Get CloverBee Maker on Google Play');
  androidButton.innerHTML='<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="194" height="75">';
  const compareButton=heroActions.querySelector('.button-ghost');
  heroActions.insertBefore(androidButton,compareButton||null);
}

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
    android.textContent='Available now on Google Play';
    trustStrip.appendChild(android);
  }
}

/*
 * Maker 1.0 release controls. Keep both platforms pending until the owner
 * approves release and the public store build passes physical-device checks.
 */
const RELEASE_CONFIG=Object.freeze({
  ios:Object.freeze({state:'pending',url:''}), // pending | live
  android:Object.freeze({state:'live',url:'https://play.google.com/store/apps/details?id=ca.cloverbee.maker'}) // pending | live
});

const iosIsLive=RELEASE_CONFIG.ios.state==='live'&&Boolean(RELEASE_CONFIG.ios.url);
const androidIsLive=RELEASE_CONFIG.android.state==='live'&&Boolean(RELEASE_CONFIG.android.url);

document.querySelectorAll('.release-cta').forEach(link=>{
  link.textContent=iosIsLive?'Download on the Apple App Store':'Apple App Store — Waiting for Review';
  link.href=iosIsLive?RELEASE_CONFIG.ios.url:'#availability';
  if(iosIsLive){
    link.target='_blank';
    link.rel='noopener noreferrer';
  }else{
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }
});

const iosStatus=document.querySelector('[data-ios-status]');
if(iosStatus){
  iosStatus.textContent=iosIsLive
    ?'Available on iPhone and iPad'
    :'Apple App Store · Waiting for Review';
}

const iosStoreCard=document.querySelector('.ios-store-card');
if(iosStoreCard){
  const title=iosStoreCard.querySelector('strong');
  const detail=iosStoreCard.querySelector('em');
  if(title)title.textContent=iosIsLive?'Download on the Apple App Store':'Waiting for Review';
  if(detail)detail.textContent=iosIsLive?'Available on iPhone and iPad':'Manual release; not yet public';
  if(iosIsLive){
    iosStoreCard.setAttribute('role','link');
    iosStoreCard.setAttribute('tabindex','0');
    iosStoreCard.addEventListener('click',()=>window.open(RELEASE_CONFIG.ios.url,'_blank','noopener,noreferrer'));
    iosStoreCard.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        window.open(RELEASE_CONFIG.ios.url,'_blank','noopener,noreferrer');
      }
    });
  }
}

const androidButton=document.querySelector('.android-release-cta');
if(androidButton){
  androidButton.href=androidIsLive?RELEASE_CONFIG.android.url:'#availability';
  if(androidIsLive){
    androidButton.target='_blank';
    androidButton.rel='noopener noreferrer';
  }
}

const androidStoreCard=document.querySelector('.android-store-card');
if(androidStoreCard){
  const title=androidStoreCard.querySelector('strong');
  const detail=androidStoreCard.querySelector('em');
  if(title)title.textContent=androidIsLive?'Get it on Google Play':'Store release pending';
  if(detail)detail.textContent=androidIsLive?'Available on Android':'Not publicly available';
  if(androidIsLive){
    androidStoreCard.href=RELEASE_CONFIG.android.url;
    androidStoreCard.target='_blank';
    androidStoreCard.rel='noopener noreferrer';
  }
}

const storeNote=document.querySelector('.store-note');
if(storeNote){
  storeNote.textContent=iosIsLive||androidIsLive
    ?'CloverBee Maker 1.0.0 is available on Google Play in Canada and the United States. The iPhone and iPad release remains in Apple review under manual release control.'
    :'iOS and Android are being prepared in parallel for a coordinated release. Each platform remains subject to its own review, physical-device checks and explicit owner approval. Neither app is publicly available.';
}

const hasHomepageAvailability=Boolean(document.querySelector('#availability'));
const finalEyebrow=hasHomepageAvailability?document.querySelector('.final-cta .eyebrow'):null;
const finalBody=hasHomepageAvailability?document.querySelector('.final-cta p:not(.eyebrow)'):null;
if(finalEyebrow)finalEyebrow.textContent=iosIsLive||androidIsLive?'Maker 1.0 availability':'Store release pending';
if(finalBody){
  finalBody.textContent=iosIsLive||androidIsLive
    ?'Install Maker 1.0 on Android today. The Apple App Store release is still waiting for review.'
    :'iOS and Android are being prepared in parallel. Public availability begins only after store approval, owner approval and final physical-device checks.';
}

document.querySelectorAll('.footer-contact span').forEach(span=>{
  if(span.textContent.includes('Pre-launch website')){
    span.textContent=iosIsLive||androidIsLive
      ?'© 2026 CloverBee Maker. Maker 1.0.'
      :'© 2026 CloverBee Maker. Store release pending.';
  }
});

// Public store URLs only enter structured data after the matching live switch.
const structuredData=document.querySelector('#maker-structured-data');
if(structuredData&&(iosIsLive||androidIsLive)){
  try{
    const data=JSON.parse(structuredData.textContent);
    const liveUrls=[iosIsLive?RELEASE_CONFIG.ios.url:null,androidIsLive?RELEASE_CONFIG.android.url:null].filter(Boolean);
    data.downloadUrl=liveUrls;
    data.installUrl=liveUrls;
    structuredData.textContent=JSON.stringify(data);
  }catch(error){
    console.error('Maker structured data could not be updated.',error);
  }
}
