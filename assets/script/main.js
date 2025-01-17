$(function () {
  //-----------------------------------------------------
  // ハンバーガーメニュー
  //-----------------------------------------------------
  const $trigger = $('#hamburger');
  const $gnav = $('#gnav');
  const point_header = window.matchMedia('screen and (min-width: 768px)');
  const headerHeight = $('header').outerHeight() || 0; // ヘッダーの高さを取得

  $trigger.on('click', function () {
    const expanded = $(this).attr('aria-expanded');
    if (expanded === 'false') {
      $(this).attr('aria-expanded', true).attr('aria-label', 'メニューを閉じる');
      $gnav
        .attr('aria-hidden', false)
        .css({ display: 'flex', overflow: 'hidden' })
        .hide()
        .stop(true, true)
        .slideDown();
    } else {
      $(this).attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
      $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
    }
  });

  $('.gnav__item a').on('click', function () {
    if (!point_header.matches) {
      $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
      $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
    }
  });

  function checkBreakPoint() {
    if (point_header.matches) {
      $gnav.attr('aria-hidden', false).css('display', 'flex');
      $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
    } else {
      $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
      $gnav.attr('aria-hidden', true).hide();
    }
  }

  point_header.addListener(checkBreakPoint);
  checkBreakPoint();

  //-----------------------------------------------------
  // スムーススクロール
  //-----------------------------------------------------
  $('a[href^="#"]').on('click', function (event) {
    const href = $(this).attr('href');
    if (href === '#' || href === '') return;

    const target = $(href === '#' ? 'html' : href);
    const adjust = headerHeight; // ヘッダーの高さ分を調整
    const speed = 400;
    const position = target.offset().top - adjust;

    $('html, body')
      .stop(true, true)
      .animate(
        { scrollTop: position },
        {
          duration: speed,
          easing: 'swing',
          complete: function () {
            if (!point_header.matches) {
              $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
              $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
            }
          },
        }
      );

    event.preventDefault();
  });


  //-----------------------------------------------------
  // タブ
  //-----------------------------------------------------

  const $tabs = $('.js-tab');

  function tabSwitch(event) {
    let $tabsArray = $tabs.toArray();
    let index = $tabsArray.indexOf(this);

    const resetTab = function () {
      $('.js-tab.is-active').removeClass('is-active');
      $('.js-tab[aria-selected=true]').removeAttr('aria-selected');
      $tabs.attr('tabindex', -1);
      $('.js-tab__panel.is-active').removeClass('is-active');
    };

    const setTab = function (tab, tabpanel) {
      $(tab).addClass('is-active');
      $(tab).attr('tabindex', 0);
      $(tab).attr('aria-selected', true);
      $(tabpanel).addClass('is-active');
    };

    if (event.type === 'keyup') {
      if (event.key === 'ArrowRight') {
        if ($tabsArray[index + 1]) {
          $($tabsArray[index + 1]).focus();
          resetTab();
          setTab($tabsArray[index + 1], $('.js-tab__panel').eq(index + 1));
        } else {
          $($tabsArray[0]).focus();
          resetTab();
          setTab($tabsArray[0], $('.js-tab__panel').eq(0));
        }
      }
      if (event.key === 'ArrowLeft') {
        if ($tabsArray[index - 1]) {
          $($tabsArray[index - 1]).focus();
          resetTab();
          setTab($tabsArray[index - 1], $('.js-tab__panel').eq(index - 1));
        } else {
          let lastTab = $tabsArray.pop();
          $(lastTab).focus();
          resetTab();
          setTab(lastTab, $('.js-tab__panel').last());
        }
      }
    }

    if (event.type === 'click') {
      resetTab();
      setTab(this, $('.js-tab__panel').eq(index));
    }
  }

  $tabs.on('click keyup', tabSwitch);
});


