var $caret = document.getElementById('caret');
var $input = document.getElementById('search');

$caret.blink = function() {
  $caret.style.opacity = 0.75;
  var delay = setTimeout(function() {
    $caret.style.opacity = 0;
    window.clearTimeout(delay);
  }, 400);
};

var timer = setInterval(function() {
  if ($input.value === '') {
    $caret.blink();
  }
}, 2500);
