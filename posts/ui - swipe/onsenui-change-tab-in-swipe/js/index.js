ons.bootstrap()
  .controller('SwipeCtrl', function($scope) {
    // 検出するスワイプの速さの設定（小さいほうがゆっくり）
    Hammer.gestures.Swipe.defaults.swipeVelocityX = 0.01;
    $scope.swipe = function(direction) {
      var index = tab.getActiveTabIndex()
      if (direction === 'left') {
        if (index === 3) return;
        index += 1;
      } else if (direction === 'right') {
        if (index === 0) return;
        index -= 1;
      }
      tab.setActiveTab(index);
    }
  })