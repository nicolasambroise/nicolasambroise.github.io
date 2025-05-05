const initCarousel = (function() {
  let carousel;
  const slides = [];
  const indicators = [];
  const index = [];
 
  function init(config) {
    carousel = document.getElementById(config.id);	
	slides[carousel.id] = carousel.querySelectorAll('[role="tabpanel"]');
	indicators[carousel.id] = carousel.querySelectorAll(".cmp-carousel__indicators[role='tablist'] .cmp-carousel__indicator[role='tab']");
	  
	// Arrow
	carousel.querySelector(".cmp-carousel__action.cmp-carousel__action--next").addEventListener('click', function() { nextSlide(carousel.id);});
	carousel.querySelector(".cmp-carousel__action.cmp-carousel__action--previous").addEventListener('click', function() { prevSlide(carousel.id);});
	
	// Indicator
	new TabsManual(carousel.querySelector('[role="tablist"]'));
	for (const indicator of indicators[carousel.id]) {
		if(indicator.hasAttribute("aria-controls")){
			let target = indicator.getAttribute("aria-controls");
			for(let i=0; i< slides[carousel.id].length; i++){
				if(slides[carousel.id][i].id == target){
					indicator.addEventListener('click', function() {
						setSlides(carousel.id, i);
						//slides[carousel.id][i].focus();
					});
					break;
				}
			}
		}
	}
		
	// Initialisation
	index[carousel.id] = 0;		
	setSlides(carousel.id, index[carousel.id]);
  }

  function setSlides(carousel_id, new_current) {
	new_current = parseFloat(new_current);
	//console.log("setSlides["+new_current+"] : "+carousel_id);
	
	// Reset
    for (var i = slides[carousel_id].length - 1; i >= 0; i--) {
      slides[carousel_id][i].className = "cmp-carousel__item";
    }
	for (var i = indicators[carousel_id].length - 1; i >= 0; i--) {
      indicators[carousel_id][i].className = "cmp-carousel__indicator";
    }
	
	// Set Active 
    slides[carousel_id][new_current].classList.add('cmp-carousel__item--active');
	indicators[carousel_id][new_current].classList.add('cmp-carousel__indicator--active');
   
	// Update index
    index[carousel_id] = new_current;
  }

  function nextSlide(carousel_id) {
    //console.log("nextSlide :"+carousel_id)
    var new_current = index[carousel_id] + 1;
    if(new_current === slides[carousel_id].length) { new_current = 0;}
    setSlides(carousel_id, new_current)
  }

  function prevSlide(carousel_id) {
    //console.log("prevSlide :"+carousel_id)
    var new_current = index[carousel_id] - 1;
    if(new_current < 0) { new_current = slides[carousel_id].length-1;}
    setSlides(carousel_id, new_current);
  }

  return {
    init:init,
    next:nextSlide,
    prev:prevSlide,
    goto:setSlides
  };
});