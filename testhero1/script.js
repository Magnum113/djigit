const phrases = [
  "увеличивают конверсию на 10%",
  "растят поток заказов на 100 в день",
  "сокращают путь до заявки на 37%",
  "поднимают повторные продажи на 24%",
  "окупаются за 4 месяца"
];

const track = document.querySelector("[data-rotator-track]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (track) {
  let index = 0;
  let activeItem = track.querySelector(".hero-test__rotator-item");

  const syncRotatorHeight = () => {
    const probe = document.createElement("span");
    probe.className = "hero-test__rotator-item hero-test__rotator-item--measure";
    track.append(probe);

    let maxHeight = 0;

    phrases.forEach((phrase) => {
      probe.textContent = phrase;
      maxHeight = Math.max(maxHeight, Math.ceil(probe.getBoundingClientRect().height));
    });

    probe.remove();
    track.style.minHeight = `${maxHeight}px`;

    if (track.parentElement) {
      track.parentElement.style.minHeight = `${maxHeight}px`;
    }
  };

  const swapPhrase = () => {
    index = (index + 1) % phrases.length;

    const nextItem = document.createElement("span");
    nextItem.className = "hero-test__rotator-item is-entering";
    nextItem.textContent = phrases[index];
    track.append(nextItem);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        activeItem.classList.add("is-leaving");
        activeItem.classList.remove("is-active");
        nextItem.classList.remove("is-entering");
        nextItem.classList.add("is-active");
      });
    });

    window.setTimeout(() => {
      activeItem.remove();
      activeItem = nextItem;
    }, prefersReducedMotion.matches ? 0 : 680);
  };

  syncRotatorHeight();
  window.addEventListener("resize", syncRotatorHeight);
  window.setInterval(swapPhrase, prefersReducedMotion.matches ? 2200 : 2800);
}
