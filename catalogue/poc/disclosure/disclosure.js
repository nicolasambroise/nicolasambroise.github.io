// Inspiration de https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   disclosure-button.js
 *
 *   Desc:   Disclosure button widget that implements ARIA Authoring Best Practices
 */

'use strict';

/*
 *   @constructorDisclosureButton
 *
 *
 */
class DisclosureButton {
  constructor(buttonNode) {
	this.buttonNode = buttonNode;
	this.controlledNode = false;

	var id = this.buttonNode.getAttribute('aria-controls');

	if (id) {
	  this.controlledNode = document.getElementById(id);
	}

	this.buttonNode.setAttribute('aria-expanded', 'false');
	this.hideContent();

	this.buttonNode.addEventListener('click', this.onClick.bind(this));
	this.buttonNode.addEventListener('focus', this.onFocus.bind(this));
	this.buttonNode.addEventListener('blur', this.onBlur.bind(this));
	this.buttonNode.addEventListener('mouseover', this.onMouseEnter.bind(this)); // Addition
	this.buttonNode.addEventListener('mouseout', this.onMouseLeave.bind(this)); // Addition
	this.buttonNode.addEventListener('keydown', this.onKeydown.bind(this)); // Addition
  }

  showContent() {
	if (this.controlledNode) {
	  this.controlledNode.style.display = 'block';
	}
  }

  hideContent() {
	if (this.controlledNode) {
	  this.controlledNode.style.display = 'none';
	}
  }
  
  hideOThersContent(){ // Addition
	var parentElem = this.buttonNode.closest("ul,ol");
	if(parentElem) {
		var openedButtons = parentElem.querySelectorAll(
			'button.btn-disclosure[aria-expanded="true"][aria-controls]'
		);
		for (var i = 0; i < openedButtons.length; i++) {
			if(openedButtons[i] != this.buttonNode) {
				openedButtons[i].click();
			}
		}
	}
  }

  toggleExpand() {
	if (this.buttonNode.getAttribute('aria-expanded') === 'true') {
	  this.buttonNode.setAttribute('aria-expanded', 'false');
	  this.buttonNode.querySelector('.btn-icon svg.icon use').setAttribute('xlink:href', '#icon-arrow-down'); // Addition	  
	  this.hideContent();
	} else {
	  this.hideOThersContent();
	  this.buttonNode.setAttribute('aria-expanded', 'true');
	  this.buttonNode.querySelector('.btn-icon svg.icon use').setAttribute('xlink:href', '#icon-arrow-up'); // Addition		 
	  this.showContent();
	}
  }

  /* EVENT HANDLERS */

  onClick() {
	this.toggleExpand();
  }

  onFocus() {
	this.buttonNode.classList.add('focus');
  }

  onBlur() {
	this.buttonNode.classList.remove('focus');
  }
  
  onMouseEnter() { // Addition
	this.buttonNode.classList.add('hover');
  }

  onMouseLeave() { // Addition
	this.buttonNode.classList.remove('hover');
  }
  
  onKeydown(event) { // Addition
	if (event.key === 'Escape' && this.buttonNode.getAttribute('aria-expanded') === 'true') {
		this.toggleExpand();
	}
  }
}

/* Initialize Hide/Show Buttons */

window.addEventListener(
  'load',
  function () {
	var buttons = document.querySelectorAll(
	  'button.btn-disclosure[aria-expanded][aria-controls]' // Edition
	);

	for (var i = 0; i < buttons.length; i++) {
	  new DisclosureButton(buttons[i]);
	}
  },
  false
);
