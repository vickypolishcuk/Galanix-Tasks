// Функція збереження даних у localStorage
function saveState(country, data, checkedData) {
  localStorage.setItem("lastCountry", country);
  localStorage.setItem("lastData", JSON.stringify(data));
  localStorage.setItem("checkedData", JSON.stringify(checkedData));
}

// Функція відновлення даних
function restoreState() {
  const lastCountry = localStorage.getItem("lastCountry");
  const lastData = JSON.parse(localStorage.getItem("lastData") || "[]");
  const checkedData = JSON.parse(localStorage.getItem("checkedData") || "[]");

  if (lastCountry && lastData.length > 0) {
    input.value = lastCountry;
    renderTable(lastData, checkedData);
  }
}

function renderTable(data, checkedData = []) {
  // Побудова шапки таблиці
  let table = `
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Назва університету</th>
          <th>Сайт</th>
          <th>Домен</th>
          <th>Зберегти в мій список</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Побудова рядків з даними у таблиці
  data.forEach((u, index) => {
    const checked = checkedData.includes(index) ? "checked" : "";
    table += `
      <tr>
        <td>${index + 1}</td>
        <td>${u.name}</td>
        <td><a href="${u.web_pages[0]}" target="_blank">${u.web_pages[0]}</a></td>
        <td>${u.domains.join(", ")}</td>
        <td><input type="checkbox" class="row-checkbox" data-index="${index}" ${checked}></td>
      </tr>
    `;
  });

  table += "</tbody></table>";
  resultsDiv.innerHTML = table;

  // Оновлення кількості обраних даних
  const checkboxes = document.querySelectorAll(".row-checkbox");
  const count = document.getElementById("selection-count");

  function updateCount() {
    const selected = Array.from(checkboxes).filter(cb => cb.checked).length;
    count.textContent = `Вибрано: ${selected}`;

    // Збереження стану чекбоксів
    const checkedData = Array.from(checkboxes)
      .map((cb, i) => (cb.checked ? i : -1))
      .filter(i => i !== -1);
    localStorage.setItem("checkedData", JSON.stringify(checkedData));
  }

  checkboxes.forEach(cb => cb.addEventListener("change", updateCount));
  updateCount();
}

const form = document.getElementById("form");
const input = document.getElementById("country");
const resultsDiv = document.getElementById("results");
const resetBtn = document.getElementById("reset");

// Обробник при натисканні "Надіслати"
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const country = input.value.trim();

  // Повідомити користувача, якщо поле для вводу пусте
  if (!country) {
    resultsDiv.innerHTML = "<p>Заповніть поле для вводу, будь ласка</p>";
    return;
  }

  try {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`); // надсилання запиту
    const data = await response.json(); // отримання даних

    // Якщо немає даних за заданим запитом
    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>Нічого не знайдено</p>";
      return;
    }

    // Завантаження таблиці та збереження даних
    renderTable(data);
    saveState(country, data, []);
  } catch (err) {
    resultsDiv.innerHTML = "<p>Помилка при отриманні даних</p>";
  }
});

// Кнопка скидання запиту
resetBtn.addEventListener("click", () => {
  input.value = "";
  resultsDiv.innerHTML = "";
  document.getElementById("selection-count").textContent = "";
  localStorage.removeItem("lastCountry");
  localStorage.removeItem("lastData");
  localStorage.removeItem("checkedData");
});

// Відновлення даних при перезавантаженні сторінки
window.addEventListener("load", () => {
  restoreState();
});
