    var correctKey = "", 
        timer,
        init = "The library is just across the road.";

    function loadSM(){
      soundManager.setup({
        url: 'swf/',
        onready: function() {
          loadSound("voice/ASDF1.ogg");
        }
      });
    }

    function loadSound(source){
      soundManager.createSound({
        id: 'mySound',
        url: source,
        autoLoad: true,
        autoPlay: false,
        onload: function() {
          soundManager.play('mySound');
        },
        onfinish: function() {
          soundManager.play('mySound');
        },
        volume: 50
      });
    }

    function loadSentence(sentence) {
      
      var wrappedText = wrapString(sentence, 36, "\n"); 
      var lines = wrappedText.split('\n');

      var textLines = [];
      for (var i = 0; i < lines.length; i++) {
        lineChars = lines[i].split('');
        dict = { "chars" : lineChars };
        textLines.push(dict);
      };

      loadLetters(textLines);
      getFirstCharacter();

    };

    function getFirstCharacter() {
      $firstChar = $('.character.hidden').first();

      if ($firstChar.length > 0) {
        $firstChar.attr('class','character current');
        correctKey = $firstChar.text().toLowerCase();
        timer = setInterval(function() {blinker($firstChar);},2000)
      } else {
        loadAnother()
      }
    };

    function loadAnother() {
      soundManager.pause('mySound');
      soundManager.destroySound('mySound');
      var entry = items[Math.floor(Math.random()*items.length)];
      mp3 = entry['mp3'];
      en = entry['en'];
      cn = entry['cn'];
      $('.line').fadeOut(500);
      $('div.translation').text(cn);
      loadSound('voice/NCE/'+mp3);
      loadSentence(en);
    }

    function blinker(elem) {
        elem.fadeOut(400);
        elem.fadeIn(400);
    }

    function loadLetters(content) {

      for (var l=0; l < content.length; l++) {
        var charSet = content[l].chars;
          $newLine = $('<div></div>', {class: "line"});
          $('div.sentence').append($newLine);

        // insert DIV for line and set it to a variable
        for (var c=0; c < charSet.length; c++) {
          var oneChar = charSet[c];

          $newChar = $('<div></div>', {
            text: oneChar,
            class: checkAlpha(oneChar)
          });

          $newChar.appendTo($newLine);
          $newChar.hide().delay(((10*l)+c)*5).fadeIn(200); 

        };
      };
    };

    function checkAlpha(char) {
      return /^[a-zA-Z]$/.test(char) ? "character hidden" : "character apparent";
    };

    function wrapString(str, limit, lineBreak) {
      if (str.length>limit) {
          var p=limit;
          while (p>0 && str[p]!=' ') {p--;}; // find first space within limit
          if (p>0) {
              var left = str.substring(0, p); // a compliant line
              var right = str.substring(p+1); // the remainder
              return left + lineBreak + wrapString(right, limit, lineBreak); // recursively solve the remainder
          };
      }
      return str;
    };

    window.onkeyup = function(e) {

      var key = e.keyCode ? e.keyCode : e.which;
  
      var pressed = String.fromCharCode(key).toLowerCase();

      if (pressed == correctKey) {
        clearInterval(timer);
        $firstChar.attr('class', 'character apparent');
        getFirstCharacter();
      } else {
          if (key != 32) {flashScreen();}
      }
    }

    function flashScreen () {
      $('html').animate({backgroundColor: "#FFC2D6"}, 50)
               .animate({backgroundColor: "transparent"}, 50);
    }

    $(document).unbind('keydown').bind('keydown', function (event) {
      if (event.keyCode === 8) {
        event.preventDefault(); // This is a jQuery method, remember to load jQuery first!
      }
    });