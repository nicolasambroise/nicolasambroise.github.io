// Inspiration de https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   tabs-manual.js : https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/
 *
 *   Desc:   Tablist widget that implements ARIA Authoring Practices
 */

'use strict';

class TabsManual {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];
    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab);
  }

  setSelectedTab(currentTab) {
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.add('is-active');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.remove('is-active');
      }
    }
  }

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

// Initialize tablist

window.addEventListener(
  'load',
  function () {
	  var tablists = document.querySelectorAll('[role=tablist]');
	  for (var i = 0; i < tablists.length; i++) {
		new TabsManual(tablists[i]);
		new toggleArrow(tablists[i]); // Addition
		new registerArrow(tablists[i]); // Addition
		new registerBlurTab(tablists[i]); // Addition
	  }
  });

// Addition
window.addEventListener("resize", function () {
  var tablists = document.querySelectorAll('[role=tablist]');
  for (var i = 0; i < tablists.length; i++) {
	toggleArrow(tablists[i]);
  }
});

// Addition
function toggleArrow(element){
	var tabslist_width = element.getBoundingClientRect().width;
	var tabswrapper_width = element.parentElement.getBoundingClientRect().width;
	console.log(tabslist_width +" - "+tabswrapper_width)
	if(tabslist_width > tabswrapper_width && !element.parentElement.classList.contains("tab-overflow")){
		element.parentElement.classList.add("tab-overflow");
	}
	else if(tabslist_width <= tabswrapper_width && element.parentElement.classList.contains("tab-overflow")){
		element.parentElement.classList.remove("tab-overflow");
	}
}

// Addition
function registerArrow(element){
	var previous = element.parentElement.querySelectorAll(".tabs-action--previous")[0];
	var next = element.parentElement.querySelectorAll(".tabs-action--next")[0];
	if(previous) previous.addEventListener("click", function () {element.parentElement.scrollLeft -= 100;});
	if(next) next.addEventListener("click", function () {element.parentElement.scrollLeft += 100;});
}

// Addition
function registerBlurTab(element){
	element.parentElement.addEventListener("scroll", function () {
	  blurTab(this)
	});
	blurTab(element.parentElement)
}

// Addition
function blurTab(el){
	var tabslist_width = el.getBoundingClientRect().width;
	  var scrollLeft = el.scrollLeft
	  var scrollWidth = el.scrollWidth
	  console.log(tabslist_width+ " - "+scrollLeft+" - "+scrollWidth)
	  if (scrollLeft + tabslist_width >= scrollWidth) {
		el.classList.add("scrollEndReached");
		el.classList.remove("scrollStartReached");
	  }
	  else if(scrollLeft == 0){
		el.classList.add("scrollStartReached");
		el.classList.remove("scrollEndReached");
	  }
	  else {
		el.classList.add("scrollStartReached");
		el.classList.add("scrollEndReached");
	  }
}