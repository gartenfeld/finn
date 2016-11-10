(function() {
  var $caret = document.getElementById('caret');
  var $input = document.getElementById('search');
  var isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  var hasFocus = true;
  $input.onfocus = function() { hasFocus = true; };
  $input.onblur = function() { hasFocus = false; };
  $caret.blink = function() {
    $caret.style.opacity = 0.75;
    var delay = setTimeout(function() {
      $caret.style.opacity = 0;
      window.clearTimeout(delay);
    }, 400);
  };
  var timer = setInterval(function() {
    if ($input.value === '' && (!isMobile || !hasFocus)) {
      $caret.blink();
    }
  }, 2500);
})();
