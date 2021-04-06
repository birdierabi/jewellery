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

const dots = document.querySelector(".embla__dots");
const dotsArray = generateDotBtns(dots, embla);

function disablePrevNextBtns (prevBtn, nextBtn, embla) {
  return () => {
    if (embla.canScrollPrev()) {
      prevBtn.removeAttribute('disabled');
    } else {
      prevBtn.setAttribute('disabled', 'disabled');
    }
    if (embla.canScrollNext()) {
      nextBtn.removeAttribute('disabled');
    } else {
      nextBtn.setAttribute('disabled', 'disabled');
    }
  };
};

function setupDotBtns (dotsArray, embla) {
  dotsArray.forEach((dotNode, i) => {
    dotNode.addEventListener("click", () => embla.scrollTo(i), false);
  });
};

function generateDotBtns (dots, embla) {
  const template = document.getElementById("embla-dot-template").innerHTML;

  dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
  return [].slice.call(dots.querySelectorAll(".embla__dot"));
};

const selectDotBtn = (dotsArray, embla) => () => {
  const previous = embla.previousScrollSnap();
  const selected = embla.selectedScrollSnap();
  dotsArray[previous].classList.remove("is-selected");
  dotsArray[selected].classList.add("is-selected");
};

setupDotBtns(dotsArray, embla);

const setSelectedDotBtn = selectDotBtn(dotsArray, embla);

embla.on("select", setSelectedDotBtn);
embla.on("init", setSelectedDotBtn);
