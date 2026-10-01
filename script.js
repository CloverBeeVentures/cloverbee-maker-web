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

/*
 * Maker 1.0 release switch.
 * Keep this branch in `review` until the owner manually releases Maker and the
 * public App Store build passes the release-day smoke test. Then change to
 * `live` and set APP_STORE_URL to the public listing before deployment.
 */
const RELEASE_STATE='review'; // review | live
const APP_STORE_URL='';

function setText(selector,text){
  const el=document.querySelector(selector);
  if(el)el.textContent=text;
}

function setLink(el,text,href){
  if(!el)return;
  el.textContent=text;
  el.href=href;
}

function replaceContaining(rootSelector,needle,replacement){
  document.querySelectorAll(rootSelector).forEach(el=>{
    if(el.textContent.includes(needle))el.textContent=replacement;
  });
}

// Current product truth: pricing and Square are no longer beta/planned features.
const pricingLead=document.querySelector('.pricing-heading p:last-child');
if(pricingLead){
  pricingLead.innerHTML='Canadian launch pricing. One Maker app, one business account. <strong>No ads on Free or Paid.</strong>';
}

const squareHeading=document.querySelector('#payments h2');
if(squareHeading)squareHeading.textContent='Square payment handoff is built into Maker 1.0.';

const squareBody=document.querySelector('#payments h2 + p');
if(squareBody){
  squareBody.textContent='Start from a Maker sale or order, send the exact CAD balance to Square Point of Sale, complete the payment in Square, and return to Maker. A validated success is recorded once and the Maker balance updates automatically.';
}

const squareFine=document.querySelector('#payments .fine-print');
if(squareFine){
  squareFine.textContent='Square remains the payment processor. Maker remains the source of truth for products, inventory, orders, customers and business records. Square Point of Sale must be installed and configured separately.';
}

replaceContaining('.comparison-table td','Planned at launch','Included');

// The old concept art stays only until the genuine App Store screenshot assets are
// copied into the website repository. Do not describe it as a real screenshot.
setText('.maker-concept .preview-label','Maker interface preview');
const stack=document.querySelector('.maker-phone-stack');
if(stack)stack.setAttribute('aria-label','Maker interface previews');

// iOS/Android platform status for the release-prep site.
const mobileHeading=document.querySelector('.mobile-section h2');
if(mobileHeading)mobileHeading.textContent='Made for the workshop, market table and delivery run.';

const mobileChecks=document.querySelectorAll('.mobile-section .large-checks li');
if(mobileChecks[0])mobileChecks[0].textContent='iPhone and iPad release candidate submitted to Apple App Review';
if(mobileChecks[1])mobileChecks[1].textContent='Free and Maker Paid ship together in the same iOS app';

const storeCards=document.querySelectorAll('.store-card');
if(storeCards[0]){
  const strong=storeCards[0].querySelector('strong');
  const em=storeCards[0].querySelector('em');
  if(strong)strong.textContent=RELEASE_STATE==='live'?'Available on the App Store':'Submitted to Apple App Review';
  if(em)em.textContent=RELEASE_STATE==='live'?'iPhone & iPad':'Manual release after approval';
}
if(storeCards[1]){
  const strong=storeCards[1].querySelector('strong');
  const em=storeCards[1].querySelector('em');
  if(strong)strong.textContent='Google Play release follows iOS';
  if(em)em.textContent='Android organization publishing setup in progress';
}

const storeNote=document.querySelector('.store-note');
if(storeNote){
  storeNote.textContent=RELEASE_STATE==='live'
    ?'Maker 1.0 is live on the Apple App Store. Android availability will be announced separately.'
    :'Maker 1.0 is in Apple App Review. This is not yet a download badge; public availability begins only after approval and the owner’s manual release.';
}

const heroActions=document.querySelector('.hero-copy .hero-actions');
const storeComing=document.querySelector('.store-coming');
if(heroActions&&storeComing){
  heroActions.insertAdjacentElement('afterend',storeComing);
  if(storeNote)storeComing.insertAdjacentElement('afterend',storeNote);
}

// Replace every old early-access/beta CTA with the correct release-state action.
const oldCtas=document.querySelectorAll(
  'a[href^="mailto:developer@cloverbeemaker.ca"][href*="Early%20Access"],a[href^="mailto:developer@cloverbeemaker.ca"][href*="Free%20Early%20Access"],a[href^="mailto:developer@cloverbeemaker.ca"][href*="Paid%20Early%20Access"],a[href="/beta.html"]'
);
oldCtas.forEach(a=>{
  if(RELEASE_STATE==='live'&&APP_STORE_URL){
    setLink(a,'Download on the App Store',APP_STORE_URL);
    a.target='_blank';
    a.rel='noopener noreferrer';
  }else{
    setLink(a,'App Store release pending','#availability');
    a.removeAttribute('target');
    a.removeAttribute('rel');
  }
});

if(storeComing)storeComing.id='availability';

const finalEyebrow=document.querySelector('.final-cta .eyebrow');
const finalHeading=document.querySelector('.final-cta h2');
const finalBody=document.querySelector('.final-cta p:not(.eyebrow)');
const finalButton=document.querySelector('.final-cta .button');
if(finalEyebrow)finalEyebrow.textContent=RELEASE_STATE==='live'?'Maker 1.0 is live':'Maker 1.0 is in App Review';
if(finalHeading)finalHeading.textContent='Focus on what you make. Keep the business side under control.';
if(finalBody){
  finalBody.textContent=RELEASE_STATE==='live'
    ?'Maker 1.0 brings the complete Free + Paid small-business workflow to iPhone and iPad.'
    :'Build 7 has been submitted to Apple. Public availability begins after approval, manual release and a final smoke test of the live App Store build.';
}
if(finalButton){
  if(RELEASE_STATE==='live'&&APP_STORE_URL){
    setLink(finalButton,'Download on the App Store',APP_STORE_URL);
  }else{
    setLink(finalButton,'App Store release pending','#availability');
  }
}

// Footer release state.
document.querySelectorAll('.footer-contact span').forEach(span=>{
  if(span.textContent.includes('Pre-launch website')){
    span.textContent=RELEASE_STATE==='live'
      ?'© 2026 CloverBee Maker. Maker 1.0.'
      :'© 2026 CloverBee Maker. Maker 1.0 — Apple App Review.';
  }
});
