/* WM Repairs social hub integration.
   Keep this filename if index.html already loads facebook-integration.js.
   The script now links to socials.html; it does not embed Facebook content.
*/
(function () {
  'use strict';

  const socialPage = 'socials.html';

  function makeLink(label, className, location) {
    const link = document.createElement('a');
    link.href = location || socialPage;
    link.className = className;
    link.textContent = label;
    return link;
  }

  function addDesktopNavigationLink() {
    const nav = document.querySelector('header nav');
    if (!nav || nav.querySelector('[data-wm-socials-nav="desktop"]')) return;

    const reviewsLink = nav.querySelector('a[href="#reviews"]');
    if (!reviewsLink) return;

    const link = makeLink('Where to Find Us', 'hover:text-wmGold transition-colors');
    link.dataset.wmSocialsNav = 'desktop';
    reviewsLink.insertAdjacentElement('afterend', link);
  }

  function addMobileNavigationLink() {
    const menu = document.getElementById('mobile-menu');
    if (!menu || menu.querySelector('[data-wm-socials-nav="mobile"]')) return;

    const contactLink = menu.querySelector('a[href="#contact"]');
    if (!contactLink) return;

    const link = makeLink(
      'Where to Find Us',
      'block py-2 text-white hover:text-wmGold font-medium border-b border-gray-700'
    );
    link.dataset.wmSocialsNav = 'mobile';
    contactLink.insertAdjacentElement('afterend', link);
  }

  function updateFollowAndConnectBox() {
    const heading = Array.from(document.querySelectorAll('h4')).find((item) =>
      item.textContent.trim().includes('Follow & Connect')
    );
    if (!heading) return;

    const socialBox = heading.parentElement;
    if (socialBox.dataset.wmSocialsUpdated === 'true') return;

    socialBox.innerHTML = `
      <h4 class="font-bold text-wmNavy flex items-center gap-2">
        <i class="fa-solid fa-share-nodes text-wmGold" aria-hidden="true"></i> Find Us Online
      </h4>
      <p class="text-gray-600 text-sm">Find both of our Facebook pages, our YouTube channel and Instagram in one place.</p>
      <a href="${socialPage}" class="w-full bg-wmGold hover:bg-wmGold-hover text-wmNavy font-extrabold py-3 px-4 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2">
        <i class="fa-solid fa-share-nodes" aria-hidden="true"></i> Where to Find Us
      </a>`;
    socialBox.dataset.wmSocialsUpdated = 'true';
  }

  function addFooterQuickLink() {
    const headings = Array.from(document.querySelectorAll('footer h4'));
    const quickLinksHeading = headings.find((item) => item.textContent.trim().includes('Quick Links'));
    if (!quickLinksHeading) return;

    const list = quickLinksHeading.parentElement.querySelector('ul');
    if (!list || list.querySelector('[data-wm-socials-footer]')) return;

    const item = document.createElement('li');
    const link = makeLink('Where to Find Us', 'hover:text-wmGold transition-colors');
    link.dataset.wmSocialsFooter = 'true';
    item.appendChild(link);
    list.appendChild(item);
  }

  function initialise() {
    addDesktopNavigationLink();
    addMobileNavigationLink();
    updateFollowAndConnectBox();
    addFooterQuickLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
