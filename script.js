const card = document.getElementById('card');

let isDragging = false;
let isSpinning = true;
let needUpdate = true;
let lastX = 0;
let lastY = 0;
let rotX = 0;
let rotY = 0;
let rotZ = 0;

// Card Rotation
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

// Dragging
function startDrag(x, y) {
  isDragging = true;
  isSpinning = false;

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
  isSpinning = false;

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

// Projects
const projectCards = document.querySelectorAll('.project-card');
const grid = document.querySelector('.projects-grid');
const details = document.querySelector('.project-details');

const projectData = {
  'portfolio': {
    title: 'Portfolio',
    description: 'A personal site showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
    image: 'assets/portfolio.png'
  },
  'task-tracker': {
    title: 'Task Tracker',
    description: 'A Windows utility that customizes folder icons and tracks tasks. Built with C++ and Win32 APIs.',
    image: 'assets/task-tracker.png'
  },
  'opengl-engine': {
    title: 'OpenGL Engine',
    description: 'A modern C++ OpenGL engine/framework. Supports scenes, lights, PLY mesh loading',
    image: 'assets/opengl.png'
  }
};

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-project');
    const data = projectData[key];

    grid.classList.add('fade-out');
    setTimeout(() => {
      grid.style.display = 'none';
      grid.classList.remove('fade-out');

      details.innerHTML = `
<h3>${data.title}</h3>
<p>${data.description}</p>
<img src="${data.image}" alt="${data.title}" class="project-preview" />
<button id="back-to-grid">← Back to Projects</button>
`;
      details.classList.remove('hidden');
      details.classList.add('fade-out');
      details.offsetHeight; 
      details.classList.remove('fade-out');
    }, 300);
  });
});

document.addEventListener('click', e => {
  if (e.target.id === 'back-to-grid') {
    details.classList.add('fade-out');
    setTimeout(() => {
      details.classList.add('hidden');
      details.classList.remove('fade-out');

      grid.style.display = 'grid';
      grid.classList.add('fade-out');
      grid.offsetHeight;
      grid.classList.remove('fade-out');
    }, 300);
  }
});
