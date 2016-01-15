(function() {

  // clickable wrapper
  document.getElementById('wrapper').onclick = function() {
    document.getElementById('nav-toggle').checked = false;
  };

  // sticky header nav
  var banner = document.getElementById('banner'),
      header = document.getElementById('header'),
      bottom = banner.getBoundingClientRect().bottom;

  window.addEventListener("scroll", function(event) {
    if (window.pageYOffset > bottom) {
      header.classList.add('fixed');
    }
    if (window.pageYOffset === 0 || window.pageYOffset <= bottom) {
      header.classList.remove('fixed');
    }
  });

})();
