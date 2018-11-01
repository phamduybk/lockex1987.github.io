'use strict';
var app = angular.module('comics',['ngAnimate', 'ngStorage']);

app.controller('ComicViewerController', ['$scope',
                                         '$timeout',
                                         '$http',
                                         '$location',
                                         '$sce',
                                         '$localStorage',
                                         function($scope,
                                                  $timeout,
                                                  $http,
                                                  $location,
                                                  $sce,
                                                  $localStorage) {

  $scope.$storage = $localStorage;
  if (!$scope.$storage.hasOwnProperty('mobileTutorDismissed')) {
    $('.comic-viewer-mobile-wrapper').removeClass('comic-viewer-wrapper-initial');
  }
  $scope.hideMobileBanner = function() {
    $('.comic-viewer-mobile-wrapper').hide();
    $scope.$storage.mobileTutorDismissed = true;
  }
  // To prevent a FOUC, we'll hide our main content until angular gets this far
  $('.comic-viewer-wrapper').removeClass('hide-until-angular');
  $scope.domainName = 'dc';
  $scope.currentPanel = -1;
  $scope.currentPage = $location.$$search.page ? parseInt($location.$$search.page, 10) - 1 : 0;
  $scope.secondSelectedPage = -1;
  $scope.currentPageString = $location.$$search.page ? $location.$$search.page : "1";
  $scope.bufferPage = 0;
  $scope.bufferAnimatesFromRight = true;
  $scope.animating = false;
  $scope.lastBufferSwap = 0;
  $scope.zoom = 1;
  $scope.maxZoom = 5;
  $scope.zoomShown = false;

  $scope.initialWidth = 0;
  $scope.initialHeight = 0;
  $scope.pageOffset = 49;

  $scope.sideBySideMode = false;
  $scope.apiLoaded = false;
  $scope.pagesShown = false;
  $scope.settingsShown = ($scope.$storage.hasOwnProperty('settingsShown') ?
    $scope.$storage.settingsShown :
    true);;
  $scope.panelByPanelMode = ($scope.$storage.hasOwnProperty('panelByPanelMode') ?
    $scope.$storage.panelByPanelMode :
    true);
  $scope.infoShown = false;

  $scope.imgOneSrc = null;
  $scope.imgTwoSrc = null;
  $scope.imgThreeSrc = null;
  $scope.imgFourSrc = null;

  $scope.assetPreloadCount = 0;

  $scope.nid = $location.url().split("/")[2];

  $scope.apiEndpoint = '/api/reader/';

  if ($location.$$absUrl.indexOf("reader-preview") !== -1)
    $scope.apiEndpoint = '/api/reader-preview/';

  console.log($scope.apiEndpoint + $scope.nid);

  // HuyenNV edits
  //$http.get('https://www.dccomics.com/api/reader/434359') // $scope.apiEndpoint + $scope.nid
  //.success(function(data, status, headers, config) {


    // HuyenNV fixs data
    var data = {
      "title": "THE IMMORTAL MEN #1",
      "content": "<p>\u201cTHE END OF FOREVER\u201d part one! There is a secret history to the DC Universe of heroes who have protected humanity from the shadows since the dawn of time\u2026and who can live forever. Enter the Immortal Men! The team, headed by the Immortal Man, has waged a secret war against the House of Conquest for countless years\u2014but Conquest has dealt a devastating blow. When their base of operations, known as the Campus, is savagely attacked, the Immortal Men must seek out their last hope\u2014an emerging metahuman known as Caden Park! Caden\u2019s emerging powers may be able to ensure the Immortal Men\u2019s survival\u2014but will Conquest get to him first?&nbsp;<\/p><div>[dc-custom:reader_link:434359]<\/div>",
      "forKids": false,
      "pages": [{
          "page": 0,
          "image": "images/TIMM_1_preview_Dylux-1_5a988aaa8df8e5.34301042.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-1_5a988aaa8df8e5.34301042.jpg?itok=PXvuwCKj",
          "panels": [],
          "standalone": 0
      }, {
          "page": 1,
          "image": "images/TIMM_1_preview_Dylux-2_5a988ac2264c69.21456080.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-2_5a988ac2264c69.21456080.jpg?itok=4B5mj5dy",
          "panels": [{
              "x": 0.068333333333333,
              "y": 0.064763995609221,
              "width": 0.405,
              "height": 0.20087815587267
          }, {
              "x": 0.49833333333333,
              "y": 0.065861690450055,
              "width": 0.41333333333333,
              "height": 0.2019758507135
          }, {
              "x": 0.068333333333333,
              "y": 0.27991218441273,
              "width": 0.47,
              "height": 0.20746432491767
          }, {
              "x": 0.485,
              "y": 0.27991218441273,
              "width": 0.42833333333333,
              "height": 0.21086717892426
          }, {
              "x": 0.066666666666667,
              "y": 0.49506037321625,
              "width": 0.41166666666667,
              "height": 0.20307354555434
          }, {
              "x": 0.49833333333333,
              "y": 0.49615806805708,
              "width": 0.41166666666667,
              "height": 0.19978046103183
          }, {
              "x": 0.07,
              "y": 0.7145993413831,
              "width": 0.41,
              "height": 0.19978046103183
          }, {
              "x": 0.5,
              "y": 0.71240395170143,
              "width": 0.46333333333333,
              "height": 0.26125137211855
          }],
          "standalone": 0
      }, {
          "page": 2,
          "image": "images/TIMM_1_preview_Dylux-3_4_5a988b0aea4167.04539945.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-3_4_5a988b0aea4167.04539945.jpg?itok=F9Ft-0Kc",
          "panels": [{
              "x": 0.085,
              "y": 0.20518358531317,
              "width": 0.46166666666667,
              "height": 0.3548596112311
          }, {
              "x": 0.70333333333333,
              "y": 0.26781857451404,
              "width": 0.21666666666667,
              "height": 0.32397408207343
          }, {
              "x": 0.071666666666667,
              "y": 0.084233261339093,
              "width": 0.105,
              "height": 0.27861771058315
          }, {
              "x": 0.62333333333333,
              "y": 0.58747300215983,
              "width": 0.36833333333333,
              "height": 0.37149028077754
          }],
          "standalone": 0
      }, {
          "page": 3,
          "image": "images/TIMM_1_preview_Dylux-5_5a988b46d3ba02.94515193.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-5_5a988b46d3ba02.94515193.jpg?itok=qB95rxzk",
          "panels": [{
              "x": 0.066666666666667,
              "y": 0.059210526315789,
              "width": 0.445,
              "height": 0.55592105263158
          }, {
              "x": 0.525,
              "y": 0.06030701754386,
              "width": 0.39666666666667,
              "height": 0.26425438596491
          }, {
              "x": 0.525,
              "y": 0.33662280701754,
              "width": 0.39333333333333,
              "height": 0.28399122807018
          }, {
              "x": 0.068333333333333,
              "y": 0.62280701754386,
              "width": 0.85333333333333,
              "height": 0.14473684210526
          }, {
              "x": 0.063333333333333,
              "y": 0.77631578947368,
              "width": 0.90166666666667,
              "height": 0.19407894736842
          }],
          "standalone": 0
      }, {
          "page": 4,
          "image": "images/TIMM_1_preview_Dylux-6_5a988b7f7ff2f0.28269566.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-6_5a988b7f7ff2f0.28269566.jpg?itok=rbYs0PpQ",
          "panels": [{
              "x": 0.061666666666667,
              "y": 0.055921052631579,
              "width": 0.85333333333333,
              "height": 0.21600877192982
          }, {
              "x": 0.06,
              "y": 0.28289473684211,
              "width": 0.41833333333333,
              "height": 0.44517543859649
          }, {
              "x": 0.49,
              "y": 0.28179824561404,
              "width": 0.425,
              "height": 0.44188596491228
          }, {
              "x": 0.061666666666667,
              "y": 0.73464912280702,
              "width": 0.90166666666667,
              "height": 0.2390350877193
          }],
          "standalone": 0
      }, {
          "page": 5,
          "image": "images/TIMM_1_preview_Dylux-7_5a988bac533598.16485247.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-7_5a988bac533598.16485247.jpg?itok=hkXaUib3",
          "panels": [],
          "standalone": 0
      }, {
          "page": 6,
          "image": "images/TIMM_1_preview_Dylux-8_5a988bc1e56008.89737665.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/TIMM_1_preview_Dylux-8_5a988bc1e56008.89737665.jpg?itok=SUsbY46Y",
          "panels": [],
          "standalone": 0
      }, {
          "page": 7,
          "image": "images/NAOH_8page_advertorial_fnl_Page_1_5a208679b5f2f6.85333434.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_1_5a208679b5f2f6.85333434.jpg?itok=-dNpxDwl",
          "panels": [],
          "standalone": 1
      }, {
          "page": 8,
          "image": "images/NAOH_8page_advertorial_fnl_Page_2_5a2086b852df51.95827874.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_2_5a2086b852df51.95827874.jpg?itok=yxR0Duk_",
          "panels": [],
          "standalone": 0
      }, {
          "page": 9,
          "image": "images/NAOH_8page_advertorial_fnl_Page_3_5a2086cc93e759.94875668.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_3_5a2086cc93e759.94875668.jpg?itok=IYJksC0M",
          "panels": [],
          "standalone": 0
      }, {
          "page": 10,
          "image": "images/NAOH_8page_advertorial_fnl_Page_4_5a2086fe797fd4.23918535.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_4_5a2086fe797fd4.23918535.jpg?itok=JpRVmZUa",
          "panels": [],
          "standalone": 0
      }, {
          "page": 11,
          "image": "images/NAOH_8page_advertorial_fnl_Page_5_5a2087105ee962.25319330.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_5_5a2087105ee962.25319330.jpg?itok=n5JqlonY",
          "panels": [],
          "standalone": 0
      }, {
          "page": 12,
          "image": "images/NAOH_8page_advertorial_fnl_Page_6_5a208729162ae8.10747209.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_6_5a208729162ae8.10747209.jpg?itok=XlzkqvPf",
          "panels": [],
          "standalone": 0
      }, {
          "page": 13,
          "image": "images/NAOH_8page_advertorial_fnl_Page_7_5a208739b3ce54.51054095.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_7_5a208739b3ce54.51054095.jpg?itok=4HoAUdRN",
          "panels": [],
          "standalone": 0
      }, {
          "page": 14,
          "image": "images/NAOH_8page_advertorial_fnl_Page_8_5a20875726e358.81031457.jpg",
          "thumb": "https:\/\/www.dccomics.com\/sites\/default\/files\/styles\/comic_reader_thumbnail\/public\/comic_reader\/NAOH_8page_advertorial_fnl_Page_8_5a20875726e358.81031457.jpg?itok=cerIIhE0",
          "panels": [],
          "standalone": 0
      }]
  };

    $scope.pages = data.pages;

    // If we deep-link further than we have pages, revert to the first page.
    if ($scope.currentPage > $scope.pages.length) {
      $scope.currentPage = 0;
      $scope.currentPageString = "1";
    }

    var content = data.content;
    $scope.meta = {
                    title: data.title,
                    body: content.replace(/\[dc-custom[^\]]*]/g, '')
                  }
    $scope.meta.body = $sce.trustAsHtml($scope.meta.body);
    $scope.forKids = data.forKids;
    document.title = data.title;

    /* START OMNITURE */

    s.prop1="DC Comics.us";
    s.eVar1="DC Comics.us";
    s.pageName="DC Reader: " + data.title;
    s.channel="Informational";
    s.prop2="Blog";
    s.eVar2="Blog";
    s.prop3="Comics";
    s.eVar3="Comics";
    s.prop4="Comic Product";
    s.eVar4="Comic Product";
    var s_code=s.t();
    if(s_code) {
      document.write(s_code);
    }

    /* END OMNITURE */

    var lastPageWasLeft = false;
    for (var i = 0; i < $scope.pages.length; i++) {
      if ($scope.pages[i].panels == null) {
        // for simplicity sake, replace null's with empty arrays here
        // since javascript doesn't degrade nulls nicely
        $scope.pages[i].panels = [];
      }
      if ($scope.pages[i].standalone) {
        $scope.pages[i].isRightPage = false;
        lastPageWasLeft = false;
      }
      else if (!lastPageWasLeft) {
        $scope.pages[i].isRightPage = false;
        lastPageWasLeft= true;
      }
      else {
        $scope.pages[i].isRightPage = true;
        lastPageWasLeft = false;
      }
    }
    $.each($scope.pages, function(i, page){
      var img = $('<img>').appendTo('body').hide();
      img.get(0).src = page.image;
      img.load(function(){
        $scope.$apply(function() {
          $scope.assetPreloadCount++;
          if ($scope.assetPreloadCount == $scope.pages.length) {
            $scope.updatePageImages();
            $scope.updateBufferPageImages();
            $scope.apiLoaded = true;
            $scope.initializeDomainTheme();
          }
        });
      });
    });
  
  // HuyenNV fixs the JSON
  /*
  })
  .error(function(data, status, headers, config) {
    // log error
    $scope.message = 'Failed to load panels data.';
    console.log($scope.message);
  });*/

  $scope.initializeDomainTheme = function() {
    var url = $location.host();

    // HuyenNV edits (add following line)
    $('html, body').addClass('dc-comics');

    if (url.indexOf('dccomics') > -1) {
      $('html, body').addClass('dc-comics');
      $scope.domainName = 'dc';
    }

    if (url.indexOf('mad') > -1) {
      $('html, body').addClass('mad-magazine');
      $scope.domainName = 'madmagazine';
    }

    if (url.indexOf('vertigo') > -1) {
      $('html, body').addClass('vertigo-comics');
      $scope.domainName = 'vertigo';
    }
  }

  $scope.isShowingSideBySidePages = function(buffer, selector) {
    if (selector && $(selector).parent().hasClass('comic-viewer-buffer'))
      buffer = true;
    var relevantPage = $scope.currentPage;
    if (buffer)
      relevantPage = $scope.bufferPage;
    //Should return false without error on initial load before pages come in
    if (!$scope.pages) return false;
    return  $scope.sideBySideMode &&  // Two page mode selected
            relevantPage < $scope.pages.length - 1 && // There is a potential next page
            !$scope.pages[relevantPage].standalone && // The page isn't standalone
            !$scope.pages[relevantPage + 1].standalone // The next page isn't standalone
  }

  $scope.previousPageWasShowingSideBySidePages = function(buffer) {
    return  $scope.sideBySideMode &&  // Two page mode selected
            $scope.currentPage > 1 && // There are two potential previous pages
            !$scope.pages[$scope.currentPage - 1].standalone && // The previous page isn't standalone
            !$scope.pages[$scope.currentPage - 2].standalone // two pages ago isn't standalone
  }

  $scope.toggleSideBySideMode = function() {
    $scope.sideBySideMode = !$scope.sideBySideMode;
    $scope.$storage.sideBySideMode = $scope.sideBySideMode;
    if ($scope.sideBySideMode) {
      $('#comic-viewer-img2').removeClass('no-swap');
      $('#comic-viewer-img4').removeClass('no-swap');
    }
    else {
      //Prevent double swap events for 1-up comics
      $('#comic-viewer-img2').addClass('no-swap');
      $('#comic-viewer-img4').addClass('no-swap');
    }
    $scope.updatePageImages();
    $scope.updatePageString();
    $scope.resetImageView(false);
  }

  $scope.handleKeyPress = function($event) {
    // Left Arrow
    if ($event.keyCode == 37) {
      $scope.panToPreviousPanel();
    }

    // Right Arrow or Space Bar
    else if ($event.keyCode == 39 || $event.keyCode == 32) {
      $scope.panToNextPanel();
    }
  }

  $scope.unloadPages = function() {
    $('.comic-viewer-view .first-image').removeClass('comic-viewer-loaded');
    $('.comic-viewer-view .second-image').removeClass('comic-viewer-loaded');
    $('.comic-viewer-buffer .first-image').removeClass('comic-viewer-loaded');
    $('.comic-viewer-buffer .second-image').removeClass('comic-viewer-loaded');
  }

  $scope.pagesLoaded = function() {
    if (!$scope.sideBySideMode || !$scope.isShowingSideBySidePages()) {
      return $('.comic-viewer-view .first-image').hasClass('comic-viewer-loaded');
    }
    return $('.comic-viewer-view .first-image').hasClass('comic-viewer-loaded') &&
           $('.comic-viewer-view .second-image').hasClass('comic-viewer-loaded');
  }

  $scope.bufferLoaded = function() {
    if (!$scope.sideBySideMode || !$scope.isShowingSideBySidePages(true)) {
      return $('.comic-viewer-buffer .first-image').hasClass('comic-viewer-loaded');
    }
    return $('.comic-viewer-buffer .first-image').hasClass('comic-viewer-loaded') &&
           $('.comic-viewer-buffer .second-image').hasClass('comic-viewer-loaded');
  }


  $scope.pageBackwards = function() {
    $scope.unloadPages();
    if ($scope.previousPageWasShowingSideBySidePages())
      $scope.showPage($scope.currentPage - 2);
    else
      $scope.showPage($scope.currentPage - 1);
  }

  $scope.pageForwards = function() {
    $scope.unloadPages();
    if ($scope.isShowingSideBySidePages())
      $scope.showPage($scope.currentPage + 2);
    else
      $scope.showPage($scope.currentPage + 1);
  }

  /*
  Panels are side by side, so we'll need to cut anything on the x axis in half
  and shift anything in the second panel over by 50%
  */
  $scope.transformSideBySidePanels = function() {
    var leftPanels = $scope.pages[$scope.currentPage].panels;
    var rightPanels = $scope.pages[$scope.currentPage + 1].panels;
    for (var i = 0; i < leftPanels.length; i++) {
      var panel = leftPanels[i];
      panel.isRight = false;
      leftPanels[i] = panel;
    }

    for (var i = 0; i < rightPanels.length; i++) {
      var panel = rightPanels[i];
      panel.isRight = true;
      rightPanels[i] = panel;
    }

    return leftPanels.concat(rightPanels)
  }

  $scope.panToPreviousPanel = function() {
    if ($scope.animating) return;
    $scope.setZoom(1);
    $scope.hideAllPopovers();
    var panels = $scope.pages[$scope.currentPage].panels;
    if ($scope.isShowingSideBySidePages()){
      panels = $scope.transformSideBySidePanels();
    }
    if ($scope.currentPanel > 0 && $scope.panelByPanelMode) {
      $scope.currentPanel--;
      $scope.panToPanel(panels[$scope.currentPanel], true);
    }
    else if ($scope.currentPage > 0) {
      $scope.pageBackwards();
    }
  }

  $scope.panToNextPanel = function() {
    if ($scope.animating) return;
    $scope.setZoom(1);
    $scope.hideAllPopovers();
    var panels = $scope.pages[$scope.currentPage].panels;
    if ($scope.isShowingSideBySidePages()){
      panels = $scope.transformSideBySidePanels();
    }
    if ($scope.currentPanel <= panels.length - 2 && $scope.panelByPanelMode) {
      $scope.currentPanel++;
      $scope.panToPanel(panels[$scope.currentPanel], true);
    }
    else if ($scope.currentPage < $scope.pages.length - 1) {
      $scope.pageForwards();
    }
  }

  $scope.panToPanel = function(panel, animated) {
    var view = $('.comic-viewer-view .first-image');
    var second = null;
    var isRight = false;
    if ($scope.isShowingSideBySidePages()) {
      second = $('.comic-viewer-view .second-image');
      isRight = panel.isRight;
    }
    var transformed = $scope.transformRect(panel);
    var windowWidth = window.innerWidth;
    var viewportHeight = window.innerHeight - $scope.pageOffset;
    var phoneScale = false;
    if (windowWidth < 768) {
      //Double offset for phone class screens to account for second bar
      viewportHeight -= $scope.pageOffset;
      phoneScale = true && $scope.settingsShown;
    }
    var scale = Math.min((windowWidth - 20) / transformed.width, (viewportHeight - 20) /  transformed.height);
    var y = ((phoneScale ? window.innerHeight : viewportHeight) - transformed.height * scale ) / 2 - transformed.y * scale;
    var x = (windowWidth - transformed.width * scale) / 2 - transformed.x * scale;
    var secondX = x;
    if ($scope.isShowingSideBySidePages()) {
      if (isRight) {
        x -= second.get(0).naturalWidth * scale
      }
      else {
        secondX += view.get(0).naturalWidth * scale
      }
    }
    if (animated) {
      $scope.animating = true;
      $(view).animate({
        width: view.get(0).naturalWidth * scale,
        top: y,
        left: x
      }, 500, function() {
        $scope.$apply(function() {
          $scope.animating = false;
        });
      });
      if ($scope.isShowingSideBySidePages()) {
        $(second).animate({
          width: second.get(0).naturalWidth * scale,
          top: y,
          left: secondX
        }, 500);
      }
    }
    else {
      $(view).css({
        width: view.get(0).naturalWidth * scale,
        top: y,
        left: x
      });
      if ($scope.isShowingSideBySidePages()) {
        $(second).css({
          width: second.get(0).naturalWidth * scale,
          top: y,
          left: secondX
        });
      }
    }
  }

  $scope.hideSecondViewIfNeeded = function(buffer) {
    var second = $('.comic-viewer-view .second-image');
    if (buffer)
      second = $('.comic-viewer-buffer .second-image');
    if ($scope.isShowingSideBySidePages(buffer))
      second.css('visibility','visible');
    else
      second.css('visibility','hidden');
  }

  $scope.resetImageView = function(buffer, animated) {
    var view = $('.comic-viewer-view .first-image');
    if (buffer)
      view = $('.comic-viewer-buffer .first-image');
    var second = null;
    if ($scope.isShowingSideBySidePages(buffer))
      second = $('.comic-viewer-view .second-image');
    if ($scope.isShowingSideBySidePages(buffer) && buffer)
      second = $('.comic-viewer-buffer .second-image');
    $scope.hideSecondViewIfNeeded(buffer);
    var windowWidth = window.innerWidth;
    var viewportHeight = window.innerHeight - $scope.pageOffset;

    var phoneScale = false;
    if (windowWidth < 768) {
      //Double offset for phone class screens to account for second bar
      viewportHeight -= $scope.pageOffset;
      phoneScale = true && $scope.settingsShown;
    }

    var width = view.get(0).naturalWidth;
    var height = view.get(0).naturalHeight;
    if ($scope.isShowingSideBySidePages(buffer)) {
      width = view.get(0).naturalWidth + second.get(0).naturalWidth;
      height = Math.max(view.get(0).naturalHeight, view.get(0).naturalHeight);
    }
    var scaleToFit = Math.min(windowWidth / width, viewportHeight / height);
    if ($scope.zoom > 1)
      scaleToFit = scaleToFit * $scope.zoom;
    var aspectRatio = width / height;
    var y = ((phoneScale ? window.innerHeight : viewportHeight) - height * scaleToFit) / 2;
    var x = (windowWidth - width * scaleToFit) / 2;
    var twoPage = $scope.isShowingSideBySidePages(buffer);
    var leftWidth = view.get(0).naturalWidth * scaleToFit;
    var rightWidth = (twoPage ? second.get(0).naturalWidth * scaleToFit : 0);
    if ($scope.zoom > 1) {

      var zoomProperties = {
        width: Math.max(windowWidth, (twoPage ? leftWidth + rightWidth : leftWidth)),
        height: Math.max(leftWidth / aspectRatio, rightWidth / aspectRatio),
      }
      var scrollProperties = {
        scrollTop: -y,
        scrollLeft: -x
      }
      if (animated) {
        $('.comic-viewer-wrapper').animate(zoomProperties, 250);
        $('html, body').animate(scrollProperties, 250);
      }
      else {
        $('.comic-viewer-wrapper').css(zoomProperties);
        $('html, body').css(scrollProperties, 250);
      }

      x = Math.max(0, x);
      y = 0;
    }
    var properties = {
      width: view.get(0).naturalWidth * scaleToFit,
      top: y,
      left: x
    }
    var secondProperties = null;
    if (twoPage) {
      secondProperties = {
        width: second.get(0).naturalWidth * scaleToFit,
        top: y,
        left: x + view.get(0).naturalWidth * scaleToFit
      }
    }

    if (animated) {
      $scope.animating = true;
      view.animate(properties, 250, function() {
        $scope.$apply(function() {
          $scope.animating = false;
        });
      });
      if (secondProperties) {
        second.animate(secondProperties, 250);
      }
    }
    else {
      view.css(properties, 250);
      if (secondProperties) {
        second.css(secondProperties, 250);
      }
    }
  }
  $scope.setZoom = function(zoom) {
    $scope.zoom = zoom;
    $scope.resetImageView(true, false);
    if ($scope.zoom == 1) {
      $('body').addClass('no-zoom');
      $('.comic-viewer-wrapper').css({width: '100%',height: '100%'});
    }
    else {
      $('body').removeClass('no-zoom');
    }

  }

  $scope.zoomOut = function() {
    if ($scope.zoom > 1) {
      $scope.zoom -= 1;
      $scope.resetImageView(false, true);
    }
    if ($scope.zoom == 1) {
      $('body').addClass('no-zoom');
      $('.comic-viewer-wrapper').css({width: '100%',height: '100%'});
    }
  }

  $scope.zoomIn = function() {
    if ($scope.zoom < 5) {
      $scope.zoom += 1;
      $scope.panelByPanelMode = false;
      $scope.currentPanel = -1;
      $scope.resetImageView(false, true);
    }
    $('body').removeClass('no-zoom');
  }

  $scope.showPage = function(page) {
    if (page == $scope.bufferPage) return;
    var adjustedPage = page;
    if ($scope.sideBySideMode && $scope.pages[page].isRightPage) {
      adjustedPage = page - 1;
    }
    $scope.bufferAnimatesFromRight = adjustedPage > $scope.bufferPage;
    $scope.bufferPage = adjustedPage;
    $scope.updateBufferPageImages();
    $scope.currentPanel = -1;
  }

  $scope.updateBufferPageImages = function() {
    var one = $('#comic-viewer-img1');
    var two = $('#comic-viewer-img2');
    var three = $('#comic-viewer-img3');
    var four = $('#comic-viewer-img4');
    if (one.parent().hasClass('comic-viewer-buffer')) {
      if ($scope.imgOneSrc == $scope.pages[$scope.bufferPage].image) {
        $scope.reuseBuffer();
        return;
      }
      $scope.imgOneSrc = $scope.pages[$scope.bufferPage].image;
    }
    if (two.parent().hasClass('comic-viewer-buffer')) {
      if ($scope.pages.length <= $scope.bufferPage + 1)
        $scope.imgTwoSrc = null;
      else {
        if ($scope.imgTwoSrc == $scope.pages[$scope.bufferPage + 1].image) {
          $scope.reuseBuffer();
          return;
        }
        $scope.imgTwoSrc = $scope.pages[$scope.bufferPage + 1].image;
      }
    }
    if (three.parent().hasClass('comic-viewer-buffer')) {
      if ($scope.imgThreeSrc == $scope.pages[$scope.bufferPage].image) {
        $scope.reuseBuffer();
        return;
      }
      $scope.imgThreeSrc = $scope.pages[$scope.bufferPage].image;
    }
    if (four.parent().hasClass('comic-viewer-buffer')) {
      if ($scope.pages.length <= $scope.bufferPage + 1)
        $scope.imgTwoSrc = null;
      else {
        if ($scope.imgFourSrc == $scope.pages[$scope.bufferPage + 1].image) {
          $scope.reuseBuffer();
          return;
        }
        $scope.imgFourSrc = $scope.pages[$scope.bufferPage + 1].image;
      }
    }
  }

  $scope.reuseBuffer = function() {
    var one = $('#comic-viewer-img1');
    var two = $('#comic-viewer-img2');
    var three = $('#comic-viewer-img3');
    var four = $('#comic-viewer-img4');

    one.addClass('comic-viewer-loaded');
    two.addClass('comic-viewer-loaded');
    three.addClass('comic-viewer-loaded');
    four.addClass('comic-viewer-loaded');
    $scope.animateBufferIn(false);
  }

  $scope.updatePageImages = function() {
    if ($scope.sideBySideMode && $scope.pages[$scope.currentPage].isRightPage) {
      $scope.currentPage--;
    }
    var one = $('#comic-viewer-img1');
    var two = $('#comic-viewer-img2');
    var three = $('#comic-viewer-img3');
    var four = $('#comic-viewer-img4');
    if (one.parent().hasClass('comic-viewer-view')) {
      $scope.imgOneSrc = $scope.pages[$scope.currentPage].image;
    }
    if (two.parent().hasClass('comic-viewer-view')) {
      $scope.imgTwoSrc = ($scope.pages.length > $scope.currentPage + 1 ? $scope.pages[$scope.currentPage + 1].image : null);
    }
    if (three.parent().hasClass('comic-viewer-view')) {
      $scope.imgThreeSrc = $scope.pages[$scope.currentPage].image;
    }
    if (four.parent().hasClass('comic-viewer-view')) {
      $scope.imgFourSrc = ($scope.pages.length > $scope.currentPage + 1 ? $scope.pages[$scope.currentPage + 1].image : null);
    }
  }

  $scope.swapBuffer = function() {
    console.log(Date.now() - $scope.lastBufferSwap);
    if (Date.now() - $scope.lastBufferSwap < 600) return;
    var buffer = $('.comic-viewer-buffer');
    var view = $('.comic-viewer-view');
    buffer.removeClass('comic-viewer-buffer');
    view.removeClass('comic-viewer-view');
    buffer.addClass('comic-viewer-view');
    view.addClass('comic-viewer-buffer')
    $scope.updatePageImages();
    $scope.lastBufferSwap = Date.now();
  }

  $scope.pageImage = function(element, isRight) {
    if ($(element).parent().hasClass('comic-viewer-buffer')) {
      if (isRight)
        return $scope.pages[$scope.bufferPage + 1].image;
      return $scope.pages[$scope.bufferPage].image;
    }
    else {
      if (isRight)
        return $scope.pages[$scope.currentPage + 1].image;
      return $scope.pages[$scope.currentPage].image;
    }
  }

  $scope.animateBufferIn = function(checkForLoad) {
    if (checkForLoad && !$scope.bufferLoaded()) return; // wait until all pages are loaded before attempting to show the panel
    $scope.resetImageView(true);
    var buffer = $('.comic-viewer-buffer');
    var view = $('.comic-viewer-view');
    if ($scope.bufferAnimatesFromRight) {
      buffer.css('left', '100%');
    }
    else {
      buffer.css('left', '-100%');
    }
    $scope.animating = true;
    buffer.animate({
      left: 0,
      opacity: 1
    }, 510, function () {
      $scope.$apply(function() {
        $scope.currentPage = $scope.bufferPage;
        $scope.swapBuffer();
        $scope.updatePageString();
        $scope.animating = false;
      });
    });
    if ($scope.bufferAnimatesFromRight) {
      view.animate({
        left: '-100%',
        opacity: 0
      }, 500);
    }
    else {
      view.animate({
        left: '100%',
        opacity: 0
      }, 500);
    }
  }

  $scope.transformRect = function(rect) {
    if (!rect) return null;
    var img = $('.comic-viewer-view .first-image');
    return {
      x: rect.x * img.get(0).naturalWidth,
      y: rect.y * img.get(0).naturalHeight,
      width: rect.width * img.get(0).naturalWidth,
      height: rect.height * img.get(0).naturalHeight
    }
  }

  $scope.handleResize = function() {
    if (!$scope.apiLoaded) return;
    var panels = $scope.pages[$scope.currentPage].panels;
    if ($scope.isShowingSideBySidePages()){
      panels = $scope.transformSideBySidePanels();
    }
    if ($scope.currentPanel == -1) {
      $scope.resetImageView(false);
    }
    else {
      $scope.panToPanel(panels[$scope.currentPanel], true);
    }
  }

  $scope.updatePageString = function() {
    if ($scope.sideBySideMode &&
        !$scope.pages[$scope.currentPage].standalone &&
        $scope.currentPage + 1 < $scope.pages.length) {
      $scope.currentPageString = ($scope.currentPage + 1) + "/" + ($scope.currentPage + 2);
      $scope.secondSelectedPage = $scope.currentPage + 1;
    }
    else {
      $scope.secondSelectedPage = -1;
      $scope.currentPageString = $scope.currentPage + 1;
    }
  }
  $scope.hideAllPopovers = function() {
    if ($scope.infoShown) {
      $scope.toggleInfoPanel();
    }
    if ($scope.pagesShown) {
      $scope.togglePageUI();
    }
    if ($scope.zoomShown) {
      $scope.toggleZoomPanel();
    }
  }
  $scope.togglePageUI = function() {
    $scope.pagesShown = !$scope.pagesShown;
    if ($scope.pagesShown) {
      var offset = $($('.comic-viewer-inline-page')[$scope.currentPage]).position().left - 15;
      $('#comic-view-page-clipper').scrollLeft(offset);
    }
    if ($scope.pagesShown) {
      if ($scope.infoShown) {
        $scope.toggleInfoPanel();
      }
      if ($scope.zoomShown) {
        $scope.toggleZoomPanel();
      }
    }
  }

  $scope.toggleZoomPanel = function() {
    $scope.zoomShown = !$scope.zoomShown;
    if ($scope.zoomShown) {
      if ($scope.infoShown) {
        $scope.toggleInfoPanel();
      }
      if ($scope.pagesShown) {
        $scope.togglePageUI();
      }
    }
  }
  $scope.toggleSettingsUI = function() {
    $scope.settingsShown = !$scope.settingsShown;
    $scope.$storage.settingsShown = $scope.settingsShown;
    if ($scope.settingsShown) {
      $("#comic-viewer-settings").removeClass('collapsed');
      $("#comic-viewer-mobile-settings").removeClass('collapsed');
      $scope.pageOffset = 49;
    }
    else {
      $scope.hideAllPopovers();
      $("#comic-viewer-settings").addClass('collapsed');
      $("#comic-viewer-mobile-settings").addClass('collapsed');
      $scope.pageOffset = 0;
    }
    if ($scope.currentPanel != -1) {
      $scope.panToPanel(panels[$scope.currentPanel], true)
    }
    else {
      $scope.resetImageView(false, true);
    }
  }

  $scope.togglePanelByPanel = function() {
    $scope.panelByPanelMode = !$scope.panelByPanelMode;
    $scope.$storage.panelByPanelMode = $scope.panelByPanelMode;
    $scope.resetImageView(false);
    $scope.currentPanel = -1;
  }
  $scope.toggleInfoPanel = function() {
    $scope.infoShown = !$scope.infoShown;
    if ($scope.infoShown) {
      if ($scope.zoomShown) {
        $scope.toggleZoomPanel();
      }
      if ($scope.pagesShown) {
        $scope.togglePageUI();
      }
    }
  }

  if (!$scope.settingsShown) {
    $("#comic-viewer-settings").addClass('collapsed');
    $("#comic-viewer-mobile-settings").addClass('collapsed');
    $scope.pageOffset = 0;
  }

}])

app.directive('resize', function ($window) {
    return function ($scope, element) {
        var w = angular.element($window);
        $scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
            $scope.viewportHeight = newValue.h;
            $scope.windowWidth = newValue.w;
            $scope.maxZoom = ($scope.windowWidth < 768 ? 2 : 5);
            $scope.handleResize();
        }, true);

        w.bind('resize', function () {
            $scope.$apply();
        });
    }
});

app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.bind('load', function() {
              if ($(element).parent().hasClass('comic-viewer-buffer')) {
                if ($(element).hasClass('comic-viewer-needs-initialization')) {
                  $(element).addClass('comic-viewer-loaded');
                  $scope.resetImageView(true);
                  $(element).removeClass('comic-viewer-needs-initialization');
                }
                else {
                  $(element).addClass('comic-viewer-loaded');
                  $scope.resetImageView(true);
                  if (!$(element).hasClass('no-swap')) {
                    $scope.animateBufferIn(true);
                  }
                }
              }
              else {
                if ($(element).hasClass('comic-viewer-needs-initialization')) {
                  $(element).addClass('comic-viewer-loaded');
                  $scope.resetImageView(false);
                  $(element).removeClass('comic-viewer-needs-initialization');
                }
                else {
                  $(element).addClass('comic-viewer-loaded');
                  $scope.resetImageView(false);
                }
              }
            });
        }
    };
});
