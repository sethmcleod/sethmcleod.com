(function() {

  // remove no-fouc class
  document.documentElement.removeAttribute('class');

  // clickable wrapper
  document.getElementById('wrapper').onclick = function() {
    document.getElementById('nav-toggle').checked = false;
  };

  // sticky header nav
  var banner = document.getElementById('banner'),
      header = document.getElementById('header'),
      email = document.getElementById('email'),
      bottom = banner.getBoundingClientRect().bottom;

  window.addEventListener("scroll", function(event) {
    if (window.pageYOffset > bottom) {
      header.classList.add('fixed');
    }
    if (window.pageYOffset === 0 || window.pageYOffset <= bottom) {
      header.classList.remove('fixed');
    }
  });

  email.addEventListener('click', function(event) {
    copyTextToClipboard('me@sethmcleod.com');
  });

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying email was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy email');
    }

    document.body.removeChild(textArea);
  }

})();
