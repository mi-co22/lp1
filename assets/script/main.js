$(function(){

  //ハンバーガーメニュー
  //--------------------------------------------


  //ハンバーガーボタンを $triggerに格納
  const $trigger = $('#hamburger');
  //グロナビを $gnavに格納
  const $gnav = $('#gnav');
  //ヘッダーのブレイクポイントを point_headerに格納
  const point_header = window.matchMedia('screen and (min-width: 1050px)');

  //ハンバーガーメニューボタンがクリックされた時
  $trigger.on('click',function(){
    //aria-expandedの値を変数expandedに格納
    const expanded = $(this).attr('aria-expanded');

    //もし expanded が 'false'だったら（メニューが非表示・開く操作）
    //【重要】ariaの値はbooleanではなく文字列なので評価式の記述が変わります
    if(expanded === 'false'){
      //対象メニューの展開ステートをtrueにし、labelを「閉じる」に変更
      $(this).attr('aria-expanded',true).attr('aria-label','メニューを閉じる');
      //メニューのhiddenステートをfalseにしてメニューを表示
      // $gnav.attr('aria-hidden',false).slideDown();
      $gnav.attr('aria-hidden', false).css('display', 'flex').hide().slideDown();

    //もし expanded が 'true'だったら（メニューが展開済・閉じる操作）
    }else {
      //対象メニューの展開ステートをfalseにし、labelを「開く」に変更
      $(this).attr('aria-expanded',false).attr('aria-label','メニューを開く');
      //メニューのhiddenステートをtrueにしてメニューを閉じる
      $gnav.attr('aria-hidden',true).slideUp();
    }
  });

  //ブレイクポイントをまたいだときの挙動
  //今回のグロナビはPC/SPソース共有なので、ブレイクポイントをまたいだ時にaria属性も動的に設定する必要がある。ハンバーガーはSPレイアウト時しか表示されないので992px以上の場合の処理は不要
  function checkBreakPoint() {
    //もし992px以上だったら
    if (point_header.matches) {
      //グロナビを表示
      $gnav.attr('aria-hidden',false).show();
    }else {
      //スマホレイアウトの初期状態にリセット
      $trigger.attr('aria-expanded',false).attr('aria-label','メニューを開く');
      $gnav.attr('aria-hidden',true).hide();
    }
  }
  point_header.addListener(checkBreakPoint);

});



const tabs = document.querySelectorAll('.js-tab')
function tabSwitch(){
  let tabsArray = Array.prototype.slice.call(tabs);
  let index = tabsArray.indexOf(this);
  const resetTab = function(){
    document.querySelector('.js-tab.is-active').classList.remove('is-active');
    document.querySelector('.js-tab[aria-selected=true]').removeAttribute('aria-selected');
    document.querySelectorAll('.js-tab').forEach((elm)=>{
      elm.tabIndex = -1;
    });
    document.querySelector('.js-tab__panel.is-active').classList.remove('is-active');
  }
  const setTab = function(tab,tabpanel) {
    tab.classList.add('is-active');
    tab.tabIndex = 0;
    tab.setAttribute('aria-selected',true);
    tabpanel.classList.add('is-active');
  }
  if (event.type == 'keyup') {
    if(event.key === 'ArrowRight') {
      if(tabsArray[index + 1]) {
        tabsArray[index + 1].focus();
        resetTab();
        setTab(tabsArray[index + 1],document.querySelectorAll('.js-tab__panel')[index + 1]);
        } else {
         tabsArray[0].focus();
         resetTab();
         setTab(tabsArray[0], document.querySelectorAll('.js-tab__panel')[0]);
        };
      };
    if(event.key === 'ArrowLeft') {
      if(tabsArray[index - 1]) {
         tabsArray[index - 1].focus();
         resetTab();
         setTab(tabsArray[index - 1], document.querySelectorAll('.js-tab__panel')[index - 1])
        } else {
         let lastTab =  tabsArray.pop();
         lastTab.focus();
         resetTab();
         setTab(lastTab, Array.prototype.slice.call(document.querySelectorAll('.js-tab__panel')).pop());
        };
      };
  }
	if (event.type == 'click')　{
    resetTab();
    setTab(this, document.querySelectorAll('.js-tab__panel')[index]);
  }
};

tabs.forEach((tab)=>{
  tab.addEventListener('click',tabSwitch);
  tab.addEventListener('keyup',tabSwitch);
});