const prices = {
  flat: {
    econom: 8750,
    standard: 10480,
    elite: 14750,
  },
  house: {
    econom: 13175,
    standard: 14460,
    elite: 16540,
  },
};

let selectedType = "flat";
let selectedLevel = "econom";

const typeButtons = document.querySelectorAll("[data-type]");
const levelButtons = document.querySelectorAll("[data-level]");
const areaInput = document.getElementById("area_input");
const resultPrice = document.getElementById("result_price");

// Смена типа объекта
typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    typeButtons.forEach((b) => b.classList.remove("red_btn"));
    btn.classList.add("red_btn");
    selectedType = btn.getAttribute("data-type");
    calculate();
  });
});

// Смена уровня ремонта
levelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    levelButtons.forEach((b) => b.classList.remove("red_btn"));
    btn.classList.add("red_btn");
    selectedLevel = btn.getAttribute("data-level");
    calculate();
  });
});

// Подсчет при вводе площади
areaInput.addEventListener("input", calculate);

function calculate() {
  const area = parseFloat(areaInput.value.replace(",", "."));
  if (isNaN(area) || area <= 0) {
    resultPrice.textContent = "—";
    return;
  }
  const pricePerSq = prices[selectedType][selectedLevel];
  const total = area * pricePerSq;
  resultPrice.textContent = total.toLocaleString("ru-RU");
}
