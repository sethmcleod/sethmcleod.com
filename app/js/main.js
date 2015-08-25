document.getElementById('body-overlay').style['z-index'] = 999;
document.getElementById('body-overlay').onclick = function() {
  document.getElementById('nav-toggle').checked = false;
};
