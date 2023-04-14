


document.addEventListener('DOMContentLoaded', function() {
  var App = function () {
    var MediaSize = {
      xl: 1200,
      lg: 992,
      md: 991,
      sm: 576
    };}
  var categoryScroll = {
    scrollCat: function () {
      var sidebarWrapper = document.querySelectorAll('.sidebar-wrapper li.active')[0];
      var sidebarWrapperTop = sidebarWrapper.offsetTop - 12;
      setTimeout(() => {
        const scroll = document.querySelector('.menu-categories');
        scroll.scrollTop = sidebarWrapperTop;
      }, 50);
    }
  }

  var inBuiltfunctionality = {
    mainCatActivateScroll: function () {

      if (document.querySelector('.menu-categories')) {

        const ps = new PerfectScrollbar('.menu-categories', {
          wheelSpeed: .5,
          swipeEasing: !0,
          minScrollbarLength: 40,
          maxScrollbarLength: 300
        });

      }
    },
    notificationScroll: function () {

      if (document.querySelector('.notification-scroll')) {
        const notificationS = new PerfectScrollbar('.notification-scroll', {
          wheelSpeed: .5,
          swipeEasing: !0,
          minScrollbarLength: 40,
          maxScrollbarLength: 300
        });
      }

    },
    preventScrollBody: function () {
      var nonScrollableElement = document.querySelectorAll('#sidebar, .user-profile-dropdown .dropdown-menu, .notification-dropdown .dropdown-menu,  .language-dropdown .dropdown-menu')

      var preventScrolling = function (e) {
        e = e || window.event;
        if (e.preventDefault)
          e.preventDefault();
        e.returnValue = false;

        nonScrollableElement.scrollTop -= e.wheelDeltaY;
      }

      nonScrollableElement.forEach(preventScroll => {

        preventScroll.addEventListener('mousewheel', preventScrolling);
        preventScroll.addEventListener('DOMMouseScroll', preventScrolling);

      });
    },
    searchKeyBind: function () {

      if (Dom.class.search) {
        Mousetrap.bind('ctrl+/', function () {
          document.body.classList.add('search-active');
          Dom.class.search.classList.add('show-search');
          Dom.class.searchOverlay.classList.add('show');
          Dom.class.searchForm.focus();
          return false;
        });
      }

    },
    bsTooltip: function () {
      var bsTooltip = document.querySelectorAll('.bs-tooltip')
      for (let index = 0; index < bsTooltip.length; index++) {
        var tooltip = new bootstrap.Tooltip(bsTooltip[index])
      }
    },
    bsPopover: function () {
      var bsPopover = document.querySelectorAll('.bs-popover')
      for (let index = 0; index < bsPopover.length; index++) {
        var popover = new bootstrap.Popover(bsPopover[index])
      }
    },
    onCheckandChangeSidebarActiveClass: function () {
      if (document.body.classList.contains('alt-menu')) {
        if (document.querySelector('.sidebar-wrapper [aria-expanded="true"]')) {
          document.querySelector('.sidebar-wrapper li.menu.active [aria-expanded="true"]').setAttribute('aria-expanded', 'false');
        }
      }
    },
    MaterialRippleEffect: function () {
      getAllBtn = document.querySelectorAll('button.btn, a.btn');

      getAllBtn.forEach(btn => {

        if (!btn.classList.contains('_no--effects')) {
          btn.classList.add('_effect--ripple');
        }

      });

      if (document.querySelector('._effect--ripple')) {
        Waves.attach('._effect--ripple', 'waves-light');
        Waves.init();
      }
    }
  }

  var _mobileResolution = {
    onRefresh: function () {
      var windowWidth = window.innerWidth;
      if (windowWidth <= MediaSize.md) {
        categoryScroll.scrollCat();
        toggleFunction.sidebar();
      }
    },

    onResize: function () {
      window.addEventListener('resize', function (event) {
        event.preventDefault();
        var windowWidth = window.innerWidth;
        if (windowWidth <= MediaSize.md) {
          toggleFunction.offToggleSidebarSubmenu();
        }
      });
    }

  }

  var _desktopResolution = {
    onRefresh: function () {
      var windowWidth = window.innerWidth;
      if (windowWidth > MediaSize.md) {
        categoryScroll.scrollCat();
        toggleFunction.sidebar();
        toggleFunction.onToggleSidebarSubmenu();
      }
    },

    onResize: function () {
      window.addEventListener('resize', function (event) {
        event.preventDefault();
        var windowWidth = window.innerWidth;
        if (windowWidth > MediaSize.md) {
          toggleFunction.onToggleSidebarSubmenu();
        }
      });
    }

  }
  function sidebarFunctionality() {
    function sidebarCloser() {

      if (window.innerWidth <= 991) {

        if (!document.querySelector('body').classList.contains('alt-menu')) {

          Dom.id.container.classList.add("sidebar-closed");
          Dom.class.overlay.classList.remove('show');
        } else {
          Dom.class.navbar.classList.remove("expand-header");
          Dom.class.overlay.classList.remove('show');
          Dom.id.container.classList.remove('sbar-open');
          Dom.main.classList.remove('sidebar-noneoverflow');
        }

      } else if (window.innerWidth > 991) {

        if (!document.querySelector('body').classList.contains('alt-menu')) {
          Dom.id.container.classList.remove("sidebar-closed");
          Dom.class.navbar.classList.remove("expand-header");

          Dom.class.overlay.classList.remove('show');
          Dom.id.container.classList.remove('sbar-open');
          Dom.main.classList.remove('sidebar-noneoverflow');
        } else {
          Dom.main.classList.add('sidebar-noneoverflow');
          Dom.id.container.classList.add("sidebar-closed");
          Dom.class.navbar.classList.add("expand-header");
          Dom.class.overlay.classList.add('show');
          Dom.id.container.classList.add('sbar-open');

          if (document.querySelector('.sidebar-wrapper [aria-expanded="true"]')) {
            document.querySelector('.sidebar-wrapper [aria-expanded="true"]').parentNode.querySelector('.collapse').classList.remove('show');
          }

        }
      }
    }

    function sidebarMobCheck() {
      if (window.innerWidth <= 991) {

        if (document.querySelector('.main-container').classList.contains('sbar-open')) {
          return;
        } else {
          sidebarCloser()
        }
      } else if (window.innerWidth > 991) {
        sidebarCloser();
      }
    }

    sidebarCloser();

    window.addEventListener('resize', function (event) {
      sidebarMobCheck();
    });

  }


  return {
    init: function (Layout) {
      toggleFunction.overlay();
      toggleFunction.search();
      toggleFunction.themeToggle(Layout);

      /*
          Desktop Resoltion fn
      */
      _desktopResolution.onRefresh();
      _desktopResolution.onResize();

      /*
          Mobile Resoltion fn
      */
      _mobileResolution.onRefresh();
      _mobileResolution.onResize();

      sidebarFunctionality();

      /*
          In Built Functionality fn
      */
      inBuiltfunctionality.mainCatActivateScroll();
      inBuiltfunctionality.notificationScroll();
      inBuiltfunctionality.preventScrollBody();
      inBuiltfunctionality.searchKeyBind();
      inBuiltfunctionality.bsTooltip();
      inBuiltfunctionality.bsPopover();
      inBuiltfunctionality.onCheckandChangeSidebarActiveClass();
      inBuiltfunctionality.MaterialRippleEffect();
    }
  }
  window.addEventListener('load', function () {
    App.init('layout');
  })

});
