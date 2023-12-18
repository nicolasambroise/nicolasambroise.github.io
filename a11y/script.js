// Add JS & CSS files for custom dialog modal 
let cssModal = document.getElementById('injected-css');
if (cssModal === null) {
  cssModal = document.createElement('link');
  cssModal.id = 'injected-css';
  cssModal.rel = 'stylesheet';
  cssModal.href = 'https://nicolasambroise.github.io/a11y/js-modal.css?v=' + Date.now();
  document.getElementsByTagName('head')[0].appendChild(cssModal);
}

let jsModal = document.getElementById('injected-js');
if (jsModal === null) {
  jsModal = document.createElement('script');
  jsModal.id = 'injected-js';
  jsModal.src = 'https://nicolasambroise.github.io/a11y/js-modal.js?v=' + Date.now();
  document.getElementsByTagName('head')[0].appendChild(jsModal);
}

// Init result message
let result_crit = "<p>test1</p>";
let result_nc = "<p>test2</p>";
let result_nth = "<p>test3</p>";
let result_dev = "<p>test4</p>";



//  --- Script here ---





// Create the dialog Modal
let NIAmodalA11Y = document.createElement('div');
NIAmodalA11Y.setAttribute("id", "NIAmodalA11Y");
NIAmodalA11Y.innerHTML = '<h1>A11Y Review</h1><h2>Points critiques</h2>'+result_crit+'<h2>Points non-conforme</h2>'+result_nc+'<h2>Nice-to-have</h2>'+result_nth+'<h2>Problèmes dev</h2>'+result_dev+'<hr><h2>W3C</h2><p>Todo</p><h2>WAVE</h2><p>Todo</p><h2>Lighthouse</h2><p>Todo</p>';
document.body.appendChild(NIAmodalA11Y);

setTimeout(() => {
  modal.open(NIAmodalA11Y, { allowDrag: true })
}, 100);