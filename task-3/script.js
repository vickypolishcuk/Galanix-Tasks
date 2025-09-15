const form = document.getElementById("form");
const input = document.getElementById("country");
const resultsDiv = document.getElementById("results");
const resetBtn = document.getElementById("reset");

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

    // Якщо немає дених за заданим запитом
    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>Нічого не знайдено</p>";
      return;
    }

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
      table += `
        <tr>
          <td>${index + 1}</td>
          <td>${u.name}</td>
          <td><a href="${u.web_pages[0]}" target="_blank">${u.web_pages[0]}</a></td>
          <td>${u.domains.join(", ")}</td>
          <td><input type="checkbox" class="row-checkbox"></td>
        </tr>
      `;
    });

    table += "</tbody></table>";
    resultsDiv.innerHTML = table; // виведення таблиці

    // Оновлення кількості обраних даних
    const checkboxes = document.querySelectorAll(".row-checkbox");
    const count = document.getElementById("selection-count");

    function updateCount() {
      const selected = Array.from(checkboxes).filter(cb => cb.checked).length;
      count.textContent = `Вибрано: ${selected}`;
    }

    checkboxes.forEach(cb => cb.addEventListener("change", updateCount));
  
  } catch (err) {
    resultsDiv.innerHTML = "<p>Помилка при отриманні даних</p>";
  }
});

// Кнопка скидання запиту
resetBtn.addEventListener("click", () => {
  input.value = "";
  resultsDiv.innerHTML = "";
  document.getElementById("selection-count").textContent = "";
});