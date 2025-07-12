const card = document.getElementById('card');

let isDragging = false;
let isSpinning = true;
let needUpdate = true;
let lastX = 0;
let lastY = 0;
let rotX = 0;
let rotY = 0;
let rotZ = 0;

function updateRotation() {
  if(isSpinning){
    rotY += 0.15;
    needUpdate = true;
  }

  if(needUpdate){
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
    needUpdate = false;
  }
  requestAnimationFrame(updateRotation);
}
updateRotation();

function stopSpinning(){
  if (isSpinning){
    isSpinning = false;
  }
}

function startDrag(x, y) {
  stopSpinning();
  isDragging = true;

  lastX = x;
  lastY = y;
}

function dragTo(x, y) {
   if (!isDragging) return;

  const dx = x - lastX;
  const dy = y - lastY;

  rotY += dx * 0.5;
  rotX -= dy * 0.5;

  lastX = x;
  lastY = y;

  needUpdate = true;
}

function stopDrag() {
  isDragging = false;
}

// Mouse
card.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
window.addEventListener('mousemove', e => dragTo(e.clientX, e.clientY));
window.addEventListener('mouseup', stopDrag);

// Touch
card.addEventListener('touchstart', e => startDrag(e.touches[0].clientX, e.touches[0].clientY));
card.addEventListener('touchmove', e => dragTo(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
card.addEventListener('touchend', stopDrag);

// Keyboard
window.addEventListener('keydown', e => {
  stopSpinning();

  const step = 5;
  switch (e.key.toLowerCase()) {
    case 'arrowup':
    case 'w': rotX -= step; break;
    case 'arrowdown':
    case 's': rotX += step; break;
    case 'arrowleft':
    case 'a': rotY -= step; break;
    case 'arrowright':
    case 'd': rotY += step; break;
    default: return;
  }
  needUpdate = true;
});

