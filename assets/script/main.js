$(function () {
//-----------------------------------------------------
// ハンバーガーメニュー
//-----------------------------------------------------
const $trigger = $('#hamburger');
const $gnav = $('#gnav');
const point_header = window.matchMedia('screen and (min-width: 768px)');
const headerHeight = $('header').outerHeight() || 0; // ヘッダーの高さを取得

// ハンバーガーアイコンのクリック時の処理
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

// メニュー内リンクのクリック時の処理
$('.gnav__item a').on('click', function () {
    if (!point_header.matches) {
        $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
        $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
    }
});

// 画面幅に応じたメニューの表示切り替え
function checkBreakPoint() {
    if (point_header.matches) {
        $gnav.attr('aria-hidden', false).css('display', 'flex');
        $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
    } else {
        $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
        $gnav.attr('aria-hidden', true).hide();
    }
}

// 画面幅変更時にブレークポイントを確認
point_header.addListener(checkBreakPoint);
checkBreakPoint();

//-----------------------------------------------------
// スムーススクロール
//-----------------------------------------------------
$('a[href^="#"]').on('click', function (event) {

    const href = $(this).attr('href');
    if (href === '#' || href === '') return; // 空リンクの場合は終了

    const target = $(href === '#' ? 'html' : href);

    // メニュー関連の処理のみ実行（メニューを閉じる）
    if (!point_header.matches) {
        $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
        $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
    }


});
    //-----------------------------------------------------
    // タブ
    //-----------------------------------------------------

    const $tabs = $('.js-tab');

    function tabSwitch() {
        const index = $tabs.toArray().indexOf(this);

        const resetTab = function () {
            $('.js-tab.tab__button--active').removeClass('tab__button--active');
            $('.js-tab[aria-selected=true]').removeAttr('aria-selected');
            $tabs.attr('tabindex', -1);
            $('.js-tab__panel.tab__button--active').removeClass('tab__button--active');
        };

        const setTab = function (tab, tabpanel) {
            $(tab).addClass('tab__button--active');
            $(tab).attr('tabindex', 0);
            $(tab).attr('aria-selected', true);
            $(tabpanel).addClass('tab__button--active');
        };

        resetTab();
        setTab(this, $('.js-tab__panel').eq(index));
    }

    $tabs.on('click', tabSwitch);
});


