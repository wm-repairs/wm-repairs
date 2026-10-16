/* WM Repairs Facebook integration.
   Add this file beside index.html and facebook.html, then load it with:
   <script src="facebook-integration.js"></script>
*/
(function () {
  'use strict';

  const pageOneUrl = 'https://www.facebook.com/people/WM-Repairs/61588560510118/';
  const sitePageUrl = 'facebook.html';

  function makeButton(label, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    button.addEventListener('click', window.showFacebookChoice);
    return button;
  }

  function addDesktopNavigationButton() {
    const nav = document.querySelector('header nav');
    if (!nav || nav.querySelector('[data-wm-facebook-nav="desktop"]')) return;

    const reviewsLink = nav.querySelector('a[href="#reviews"]');
    if (!reviewsLink) return;

    const button = makeButton(
      'View Facebook',
      'hover:text-wmGold transition-colors'
    );
    button.dataset.wmFacebookNav = 'desktop';
    reviewsLink.insertAdjacentElement('afterend', button);
  }

  function addMobileNavigationButton() {
    const menu = document.getElementById('mobile-menu');
    if (!menu || menu.querySelector('[data-wm-facebook-nav="mobile"]')) return;

    const reviewsLink = menu.querySelector('a[href="#reviews"]');
    if (!reviewsLink) return;

    const button = makeButton(
      'View Facebook',
      'block w-full text-left py-2 text-white hover:text-wmGold font-medium border-b border-gray-700'
    );
    button.dataset.wmFacebookNav = 'mobile';
    reviewsLink.insertAdjacentElement('afterend', button);
  }

  function replaceFollowFacebookButton() {
    const heading = Array.from(document.querySelectorAll('h4')).find((item) =>
      item.textContent.trim().includes('Follow & Connect')
    );
    if (!heading) return;

    const socialBox = heading.parentElement;
    const oldLink = socialBox.querySelector('a[href*="facebook.com/profile.php?id=61588560510118"]');
    if (!oldLink || oldLink.dataset.wmFacebookReplaced === 'true') return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2';
    button.innerHTML = '<i class="fa-brands fa-facebook-f" aria-hidden="true"></i><span>View Facebook</span>';
    button.addEventListener('click', window.showFacebookChoice);
    button.dataset.wmFacebookReplaced = 'true';
    oldLink.replaceWith(button);
  }

  function addChoiceModal() {
    if (document.getElementById('facebook-choice-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'facebook-choice-modal';
    modal.className = 'fixed inset-0 z-[100] bg-black/70 p-4 items-center justify-center';
    modal.style.display = 'none';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'facebook-choice-title');

    modal.innerHTML = `
      <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative" role="document">
        <button type="button" data-facebook-close aria-label="Close dialog" class="absolute top-3 right-3 w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 hover:text-wmNavy text-2xl">&times;</button>
        <div class="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center text-3xl mx-auto mb-4"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></div>
        <h2 id="facebook-choice-title" class="text-2xl font-black text-wmNavy text-center mb-2">How would you like to view Facebook?</h2>
        <p class="text-gray-600 text-sm text-center mb-6">Open WM Repairs on Facebook, or view both Facebook pages without leaving this website.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="${pageOneUrl}" target="_blank" rel="noopener noreferrer" data-facebook-close-link class="bg-[#1877F2] hover:bg-blue-700 text-white font-bold rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center transition-colors">
            <i class="fa-solid fa-arrow-up-right-from-square text-xl" aria-hidden="true"></i><span>Open Facebook</span><span class="text-xs font-normal text-blue-100">Opens in a new tab</span>
          </a>
          <a href="${sitePageUrl}" class="bg-wmGold hover:bg-wmGold-hover text-wmNavy font-bold rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center transition-colors">
            <i class="fa-solid fa-window-maximize text-xl" aria-hidden="true"></i><span>View on this site</span><span class="text-xs font-normal">See both Facebook pages</span>
          </a>
        </div>
        <p class="text-xs text-gray-500 text-center mt-5">Both pages have their own direct Facebook buttons on the website view.</p>
      </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.closest('[data-facebook-close]') || event.target.closest('[data-facebook-close-link]')) {
        window.hideFacebookChoice();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') window.hideFacebookChoice();
    });
  }

  window.showFacebookChoice = function () {
    const modal = document.getElementById('facebook-choice-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.classList.add('overflow-hidden');
    const closeButton = modal.querySelector('[data-facebook-close]');
    if (closeButton) closeButton.focus();
  };

  window.hideFacebookChoice = function () {
    const modal = document.getElementById('facebook-choice-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
  };

  function initialise() {
    addChoiceModal();
    addDesktopNavigationButton();
    addMobileNavigationButton();
    replaceFollowFacebookButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
