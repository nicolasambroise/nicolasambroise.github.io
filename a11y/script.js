// Add CSS file
let cssModal = document.getElementById('injected-css');
if (cssModal === null) {
  cssModal = document.createElement('link');
  cssModal.id = 'injected-css';
  cssModal.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(cssModal);
}
cssModal.href = 'https://nicolasambroise.github.io/a11y/js_modal.css?v=' + Date.now();

var jsModal = document.createElement('script');
jsModal.src = 'https://nicolasambroise.github.io/a11y/js_modal.js';
document.body.appendChild(jsModal);


var result_crit = "<p>test1</p>";
var result_nc = "<p>test2</p>";
var result_nth = "<p>test3</p>";
var result_dev = "<p>test4</p>";

let NIAmodalA11Y = document.createElement('div');
NIAmodalA11Y.setAttribute("id", "NIAmodalA11Y");
NIAmodalA11Y.innerHTML = '<h1>A11Y Review</h1><h2>Points critiques</h2>'+result_crit+'<h2>Points non-conforme</h2>'+result_nc+'<h2>Nice-to-have</h2>'+result_nth+'<h2>Problèmes dev</h2>'+result_dev+'<hr><h2>W3C</h2><p>Todo</p><h2>WAVE</h2><p>Todo</p><h2>Lighthouse</h2><p>Todo</p>';
document.body.appendChild(NIAmodalA11Y);

//const NIAmodalA11Y = document.querySelector("#NIAmodalA11Y");
modal.open(NIAmodalA11Y, { allowDrag: true });