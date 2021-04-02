// Grab wrapper nodes
var wrap = document.querySelector('.embla');
var viewPort = wrap.querySelector('.embla__viewport');

// Grab button nodes
var prevBtn = wrap.querySelector('.embla__prev');
var nextBtn = wrap.querySelector('.embla__next');

// Initialize the carousel
var embla = EmblaCarousel(viewPort, {loop: true});

// Add click listeners
prevBtn.addEventListener('click', embla.scrollPrev, false);
nextBtn.addEventListener('click', embla.scrollNext, false);
