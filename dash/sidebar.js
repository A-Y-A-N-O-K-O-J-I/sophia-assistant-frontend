document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const closeSidebar = document.getElementById('close-sidebar');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('overlay');

  hamburger.addEventListener('click', function () {
    mobileSidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeSidebar.addEventListener('click', function () {
    mobileSidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  overlay.addEventListener('click', function () {
    mobileSidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});
