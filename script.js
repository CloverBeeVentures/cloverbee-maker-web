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

document.querySelectorAll(
  'a[href^="mailto:developer@cloverbeemaker.ca"][href*="Early%20Access"],a[href^="mailto:developer@cloverbeemaker.ca"][href*="Free%20Early%20Access"],a[href^="mailto:developer@cloverbeemaker.ca"][href*="Paid%20Early%20Access"]'
).forEach(a=>{a.href='/beta.html';a.textContent='Join the Beta';});

const fc=document.querySelector('.final-cta .button');
if(fc&&fc.getAttribute('href')?.includes('Early%20Access')){fc.href='/beta.html';fc.textContent='Join the Beta';}

const heroActions=document.querySelector('.hero-copy .hero-actions');
const storeComing=document.querySelector('.store-coming');
const storeNote=document.querySelector('.store-note');
if(heroActions&&storeComing){
  heroActions.insertAdjacentElement('afterend',storeComing);
  if(storeNote)storeComing.insertAdjacentElement('afterend',storeNote);
}