const shell = document.querySelector('.shell');
const menuBtn = document.querySelector('.menu-btn');
const menuWrap = document.querySelector('.menu-frame-wrap');
const overlay = document.querySelector('.shell-overlay');
const contentFrame = document.getElementById('contentFrame');
const badge = document.getElementById('chapterBadge');
const MOBILE_BREAKPOINT = 920;

function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function isMenuVisible() {
  if (!menuWrap || !shell) return true;

  if (isMobile()) {
    return menuWrap.classList.contains('open');
  }

  return !shell.classList.contains('menu-hidden');
}

function setMenuVisible(visible) {
  if (!menuWrap || !shell) return;

  if (isMobile()) {
    menuWrap.classList.toggle('open', visible);
    if (overlay) overlay.classList.toggle('open', visible);
    shell.classList.remove('menu-hidden');
    return;
  }

  menuWrap.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  shell.classList.toggle('menu-hidden', !visible);
}

function closeMenu() {
  setMenuVisible(false);
}

function applyResponsiveMenuState() {
  if (isMobile()) {
    setMenuVisible(false);
    return;
  }

  setMenuVisible(true);
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    setMenuVisible(!isMenuVisible());
  });
}

if (overlay) overlay.addEventListener('click', closeMenu);

window.openChapter = function (file, chapterLabel) {
  if (contentFrame) contentFrame.src = 'HTML/' + file;

  if (badge) {
    badge.textContent = chapterLabel === 'HOME' ? 'HOME' : 'Chapter ' + chapterLabel;
  }

  // URL에 챕터 이름을 붙이지 않고 기본 페이지 주소만 유지합니다.
  // history.replaceState(null, '', '/index.html');
      history.replaceState(null, '', '');

  if (isMobile()) closeMenu();

  const mf = document.getElementById('menuFrame');
  if (mf && mf.contentWindow && mf.contentWindow.setActiveMenu) {
    mf.contentWindow.setActiveMenu(file);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  applyResponsiveMenuState();

  // 해시값을 더 이상 사용하지 않으므로 초기 로딩 시에도 기본 페이지로 유지합니다.
  // 필요하면 추후 별도 로직으로 hash 기반 복원 기능을 추가할 수 있습니다.
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    setMenuVisible(false);
  } else {
    setMenuVisible(true);
  }
});


