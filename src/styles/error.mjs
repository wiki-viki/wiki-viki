const MAX_CLOVERS = 50;
const CLOVER_CREATION_INTERVAL = 300;

let clovers = [];
let cloverCounter = 0;
let lastTime = 0;
let animationFrameId;

export const createClover = () => {
  if (clovers.length < MAX_CLOVERS) {
    const clover = {
      id: cloverCounter++,
      top: Math.floor(Math.random() * -100),
      left: Math.floor(Math.random() * window.innerWidth),
      opacity: 1,
      size: Math.random() * 10 + 10,
    };
    clovers.push(clover);
    updateClovers();
  }
};

export const updateClovers = () => {
  const cloversContainer = document.getElementById('clovers-container');

  if (!cloversContainer) {
    return;
  }

  cloversContainer.innerHTML = '';

  clovers.forEach((clover) => {
    const cloverElement = document.createElement('img');
    cloverElement.src = '/image/wikiviki-clover.png';
    cloverElement.alt = 'wikiviki';
    cloverElement.width = clover.size;
    cloverElement.height = clover.size;
    cloverElement.style.position = 'absolute';
    cloverElement.style.top = `${clover.top}px`;
    cloverElement.style.left = `${clover.left}px`;
    cloverElement.style.opacity = clover.opacity;
    cloversContainer.appendChild(cloverElement);

    clover.top += 0.8 + Math.random() * 0.5;
  });

  clovers = clovers.filter((clover) => {
    return clover.top < window.innerHeight;
  });
};

export const animate = (time) => {
  if (time - lastTime > CLOVER_CREATION_INTERVAL) {
    createClover();
    lastTime = time;
  }

  updateClovers();
  animationFrameId = requestAnimationFrame(animate);
};

export const startAnimation = () => {
  animationFrameId = requestAnimationFrame(animate);
};

export const stopAnimation = () => {
  cancelAnimationFrame(animationFrameId);
};

startAnimation();
