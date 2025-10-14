// js/script.js
document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle && navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    mainNav.style.display = expanded ? 'none' : 'block';
  });

  // Cookie Banner (Speicherung in Cookie)
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  const rejectBtn = document.getElementById('rejectCookies');
  const COOKIE_NAME = 'fb_cookies_v1';

  function hasConsent(){ return document.cookie.split('; ').some(c=>c.split('=')[0]===COOKIE_NAME); }
  function setConsent(val){ document.cookie = COOKIE_NAME + "=" + val + "; path=/; max-age=" + (60*60*24*365); }

  if(cookieBanner && !hasConsent()){
    cookieBanner.hidden = false;
  } else if(cookieBanner){
    cookieBanner.hidden = true;
  }

  acceptBtn && acceptBtn.addEventListener('click', function(){
    setConsent('accepted');
    cookieBanner.hidden = true;
    // Hier: Dritt-Skripte laden (Analytics) — nur nach Zustimmung
  });
  rejectBtn && rejectBtn.addEventListener('click', function(){
    setConsent('rejected');
    cookieBanner.hidden = true;
  });

  // Formular-Feedback (disable Button bei Submit)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      // Grundprüfung
      const name = form.querySelector('#name');
      const message = form.querySelector('#message');
      const consent = form.querySelector('#consent');
      if(!name.value.trim() || !message.value.trim() || (consent && !consent.checked)){
        e.preventDefault();
        alert('Bitte fülle Name, Nachricht und die Einwilligung aus.');
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.disabled = true; btn.textContent = 'Sende…'; }
    });
  }
});
