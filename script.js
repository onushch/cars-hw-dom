const cars = [
  {
    brand: "BMW",
    model: "X5",
    year: 2018,
    fuel: "Дизель",
    garage: true,
    image: "https://hips.hearstapps.com/hmg-prod/images/2018-model-page-hero-leadgallery-1560286845.jpg",
    price: 50000,
    mileage: 40000
  },
  {
    brand: "Audi",
    model: "RS6",
    year: 2025,
    fuel: "Бензин",
    garage: false,
    image: "https://www.supercars.net/blog/wp-content/uploads/2024/08/2025-Audi-RS6-GT-3.jpg",
    price: 80000,
    mileage: 1000
  }
];

const carList = document.getElementById("car-list");
const form = document.getElementById("car-form");

let filterType = null;
let searchTerm = "";

function renderCars() {
  let filtered = [...cars];
  if (searchTerm) {
    filtered = filtered.filter(c =>
      c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  switch(filterType) {
    case "price": filtered.sort((a,b) => a.price - b.price); break;
    case "year": filtered.sort((a,b) => b.year - a.year); break;
    case "mileage": filtered.sort((a,b) => a.mileage - b.mileage); break;
    case "garage": filtered = filtered.filter(c => c.garage); break;
    case "notGarage": filtered = filtered.filter(c => !c.garage); break;
  }

  carList.innerHTML = "";
  filtered.forEach(car => {
    const card = document.createElement("div");
    card.className = "car";
    card.innerHTML = `
      <img src="${car.image}" alt="${car.brand}">
      <h3>${car.brand} ${car.model}</h3>
      <p>Рік: ${car.year} | Паливо: ${car.fuel}</p>
      <p>Пробіг: ${car.mileage} км | Ціна: $${car.price}</p>
      <p>${car.garage ? "В гаражі ✅" : "Не в гаражі ❌"}</p>
      <button class="delete">Видалити</button>
      <button class="edit-mileage">Редагувати пробіг</button>
      <button class="toggle-garage">Перемістити гараж/зняти</button>
    `;
    card.querySelector(".delete").onclick = () => { cars.splice(cars.indexOf(car),1); renderCars(); };
    card.querySelector(".edit-mileage").onclick = () => { const m=prompt("Новий пробіг:", car.mileage); if(m) car.mileage=Number(m); renderCars(); };
    card.querySelector(".toggle-garage").onclick = () => { car.garage = !car.garage; renderCars(); };
    carList.appendChild(card);
  });
}

form.onsubmit = e => {
  e.preventDefault();
  const newCar = {
    brand: document.getElementById("brand").value,
    model: document.getElementById("model").value,
    year: Number(document.getElementById("year").value),
    fuel: document.getElementById("fuel").value,
    garage: document.getElementById("garage").checked,
    image: document.getElementById("image").value,
    price: Number(prompt("Ціна авто:")),
    mileage: Number(prompt("Пробіг авто:"))
  };
  cars.push(newCar);
  renderCars();
  form.reset();
};

document.getElementById("sort-price").onclick = () => { filterType="price"; renderCars(); };
document.getElementById("sort-year").onclick = () => { filterType="year"; renderCars(); };
document.getElementById("sort-mileage").onclick = () => { filterType="mileage"; renderCars(); };
document.getElementById("garage-only").onclick = () => { filterType="garage"; renderCars(); };
document.getElementById("not-garage").onclick = () => { filterType="notGarage"; renderCars(); };
document.getElementById("search").oninput = e => { searchTerm = e.target.value; renderCars(); };

renderCars();
