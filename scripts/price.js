const priceData = {
  flat: {
    econom: {
      works: [
        { name: "Черновая отделка", work: 438500, material: 297000 },
        { name: "Чистовая отделка", work: 755000, material: 397000 },
        { name: "Электромонтажные работы", work: 145500, material: 95000 },
        { name: "ХВС, ГВС, канализация", work: 97500, material: 50000 },
      ],
    },
    standard: {
      works: [
        { name: "Черновая отделка", work: 718000, material: 418000 },
        { name: "Чистовая отделка", work: 1238000, material: 637000 },
        { name: "Электромонтажные работы", work: 247500, material: 215000 },
        { name: "ХВС, ГВС, канализация", work: 158000, material: 187000 },
      ],
    },
    elite: {
      works: [
        { name: "Черновая отделка", work: 1168000, material: 485000 },
        { name: "Чистовая отделка", work: 1573000, material: 848000 },
        { name: "Электромонтажные работы", work: 474500, material: 397000 },
        { name: "ХВС, ГВС, канализация", work: 295000, material: 297000 },
      ],
    },
  },
  house: {
    econom: {
      works: [
        { name: "Черновая отделка", work: 438500, material: 397000 },
        { name: "Чистовая отделка", work: 755000, material: 412000 },
        { name: "Электромонтажные работы", work: 178000, material: 118000 },
        { name: "ХВС, ГВС", work: 112000, material: 57000 },
        { name: "Канализация", work: 21000, material: 18000 },
        { name: "Отопление", work: 103000, material: 117000 },
        { name: "Котельная", work: 98500, material: 145000 },
      ],
    },
    standard: {
      works: [
        { name: "Черновая отделка", work: 725000, material: 397000 },
        { name: "Чистовая отделка", work: 1245000, material: 618000 },
        { name: "Электромонтажные работы", work: 255000, material: 165000 },
        { name: "ХВС, ГВС", work: 97000, material: 73000 },
        { name: "Канализация", work: 23000, material: 24000 },
        { name: "Отопление", work: 121000, material: 125000 },
        { name: "Котельная", work: 98500, material: 160000 },
      ],
    },
    elite: {
      works: [
        { name: "Черновая отделка", work: 787000, material: 525000 },
        { name: "Чистовая отделка", work: 1855000, material: 1018000 },
        { name: "Электромонтажные работы", work: 320000, material: 298000 },
        { name: "ХВС, ГВС", work: 127000, material: 186000 },
        { name: "Канализация", work: 48000, material: 48000 },
        { name: "Отопление", work: 185000, material: 218000 },
        { name: "Котельная", work: 155000, material: 265000 },
      ],
    },
  },
};

let selectedType = "flat";
let selectedLevel = "econom";

const typeButtons = document.querySelectorAll("[data-type]");
const levelButtons = document.querySelectorAll("[data-level]");
const areaInput = document.getElementById("area_input");
const resultPrice = document.getElementById("result_price");
const tableBody = document.querySelector(".price_table tbody");

typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    typeButtons.forEach((b) => b.classList.remove("red_btn"));
    btn.classList.add("red_btn");
    selectedType = btn.dataset.type;
    calculate();
  });
});

levelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    levelButtons.forEach((b) => b.classList.remove("red_btn"));
    btn.classList.add("red_btn");
    selectedLevel = btn.dataset.level;
    calculate();
  });
});

areaInput.addEventListener("input", calculate);

function calculate() {
  const area = parseFloat(areaInput.value.replace(",", "."));
  if (isNaN(area) || area <= 0) {
    resultPrice.textContent = "—";
    return;
  }

  const works = priceData[selectedType][selectedLevel].works;
  let totalWork = 0;
  let totalMaterial = 0;

  tableBody.innerHTML = "";

  works.forEach((workItem) => {
    const scaledWork = (workItem.work / 100) * area;
    const scaledMaterial = (workItem.material / 100) * area;
    totalWork += scaledWork;
    totalMaterial += scaledMaterial;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${workItem.name}</td>
      <td>${scaledWork.toLocaleString("ru-RU")} р.</td>
      <td>${scaledMaterial.toLocaleString("ru-RU")} р.</td>
    `;
    tableBody.appendChild(row);
  });

  const totalRow = document.createElement("tr");
  totalRow.classList.add("total");
  totalRow.innerHTML = `
    <td>Итоговая сумма</td>
    <td><span id="result_price">${totalWork.toLocaleString(
      "ru-RU"
    )} р.</span></td>
    <td>${totalMaterial.toLocaleString("ru-RU")} р.</td>
  `;
  tableBody.appendChild(totalRow);
}

calculate();
