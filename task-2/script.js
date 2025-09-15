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
  return (document.querySelectorAll('img')).length;
}

// Виведення інформації на сторінку
document.querySelector('.data').textContent = `Date: ${getFormattedDate()}`;
document.querySelector('.number').textContent = `Number of images: ${getNumberOfImg()}`;

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
