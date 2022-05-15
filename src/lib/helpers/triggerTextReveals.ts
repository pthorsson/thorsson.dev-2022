export function triggerTextReveals(enabled: boolean) {
  const transitionElements = document.querySelectorAll('.-tt');

  if (!enabled) {
    transitionElements.forEach((element) => {
      element.classList.remove('-tt');
    });

    return;
  }

  transitionElements.forEach((element: HTMLElement) => {
    function onDone() {
      element.classList.remove('-tt');
      element.innerHTML = element.innerText;
    }

    element.innerHTML = element.innerText
      .trim()
      .split('')
      .map((l) => `<span>${l}</span>`)
      .join('');

    element.style.opacity = '1';
    const delay = Number(element.dataset.revealDelay) || 0;

    element.childNodes.forEach((span: HTMLSpanElement, i) => {
      setTimeout(() => {
        span.classList.add('-ttv');
        setLetter(span, i === element.childNodes.length - 1 ? onDone : null);
      }, 70 * (i + delay));
    });
  });
}

function getLetterTimings(letter: string) {
  const LETTER_TIMINGS = [
    'abcex',
    'fghij',
    'klmno',
    'pqrst',
    'uvwdy',
    'z/,.',
    '01234',
    '56789'
  ];

  return (LETTER_TIMINGS.findIndex((l) => l.includes(letter)) + 5) * 2;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setLetter(element: HTMLSpanElement, callback: (() => void) | null) {
  const letters = '0123456789abcdefghijklmnopqrstuvwxyz/-+?!';

  const originalLetter = element.innerText;
  const letterTiming = getLetterTimings(originalLetter.toLowerCase());

  let count = 0;
  const maxCount = letterTiming;

  updateLetter();

  function updateLetter() {
    count++;

    if (originalLetter === ' ') {
      return;
    }

    let newLetter = letters[randomInt(0, letters.length - 1)];

    while (newLetter === originalLetter || newLetter === element.dataset.mask) {
      newLetter = letters[randomInt(0, letters.length - 1)];
    }

    element.dataset.mask = newLetter;
    element.style.opacity = '0.2';

    setTimeout(() => {
      if (count === maxCount) {
        element.dataset.mask = originalLetter;
        element.style.opacity = '1';
        setTimeout(() => {
          callback?.();
        }, 800);
      } else {
        updateLetter();
      }
    }, count * 10);
  }
}
