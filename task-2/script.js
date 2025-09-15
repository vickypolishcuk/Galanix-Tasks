// Функція отримання й форматування поточної дати
function getFormattedDate() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Функція отримання кількості картинок на сторінці
function getNumberOfImg() {
  return containers.length - removedImages.length;
}

// Функція оновлення інформації
function updateUI() {
  document.querySelector('.data').textContent = `Date: ${getFormattedDate()}`;
  document.querySelector('.number').textContent = `Number of images: ${getNumberOfImg()}`;

  containers.forEach(c => c.classList.remove('first')); // видалення попередній класів

  // Визначення кількості колонок
  let columns = 4;
  if (window.innerWidth <= 500) {
    columns = 1;
  } else if (window.innerWidth <= 900) {
    columns = 2;
  }

  // Визначення перших картинок у рядку
  const visibleContainers = Array.from(containers).filter(c => c.style.display !== "none");
  visibleContainers.forEach((c, index) => {
    if (index % columns === 0) {
      c.classList.add('first'); // додавання до них класу
    }
  });
}

window.addEventListener('resize', updateUI);

// Локальне сховище видалених картинок
let removedImages = JSON.parse(localStorage.getItem("removedImages")) || [];
const containers = document.querySelectorAll(".img-container");

containers.forEach(container => {
  const btn = container.querySelector(".remove");
  const img = container.querySelector("img");
  const src = img.getAttribute("src");

  // Якщо ця картинка в списку видалених, то не показувати її
  if (removedImages.includes(src)) {
    container.style.display = "none";
  }
  // Обробник кліку на хрестик
  btn.addEventListener("click", () => {
    container.style.display = "none";
    if (!removedImages.includes(src)) {
      removedImages.push(src);
      localStorage.setItem("removedImages", JSON.stringify(removedImages));
      updateUI();
    }
  });
});

// Відновити всі картинки
document.getElementById("restore").addEventListener("click", () => {
  localStorage.removeItem("removedImages");
  removedImages = [];
  
  containers.forEach(container => {
    container.style.display = "inline-block";
  });
  updateUI();
});

updateUI();


// Змінні для відображення модального вікна й картинки
const galleryImages = document.querySelectorAll('.gallery img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

// Обробники для кожної картинки
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'block'; // відображаємо модалку
    modalImg.src = img.src; // відображаємо обрану картинку
  });
});

// Обробник для закриття картинки
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // не відображаємо модалку
});
