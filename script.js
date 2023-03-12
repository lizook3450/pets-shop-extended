const items = [
  {
    title: "25 пионовидных тюльпана",
    description: "Подарить тюльпаны на цветочном языке означает - подарить пожелания процветания, радости и счастья.",
    tags: ["tulips"],
    price: 2500,
    img: "./img/1.jpg",
    rating: 4.4,
  },
  {
    title: "Букет из 25 пионовидных тюльпанов в дизайнерской упаковке",
    description: "Уникальный и неповторимый сорт таких тюльпанов, точно не оставит получателя равнодушным, а букет подарит много восхитительных эмоций.",
    tags: ["tulips"],
    price: 3900,
    img: "./img/2.jpg",
    rating: 3.1,
  },
  {
    title: "Кенийские кустовые розы",
    description: "Кенийские кустовые розы",
    tags: ["roses"],
    price: 3000,
    img: "./img/3.jpg",
    rating: 5.0,
  },
  {
    title: "Композиция в коробке «Капучино»",
    description: "Оригинальная композиция в составе с уникальной розой сорта капучино.",
    tags: ["roses", "Flowers in a box"],
    price: 5060,
    img: "./img/4.jpg",
    rating: 4.7,
  },
  {
    title: "Композиция с персиковыми пионовидными розами и маттиолой",
    description: "Идеально подходит в качестве подарка для коллеги, мамы или сестры.",
    tags: ["roses", "Flowers in a box"],
    price: 3700,
    img: "./img/5.jpg",
    rating: 4.9,
  },
  {
    title: "Pink flowers",
    description: "Весенний букет из свежих цветов.",
    tags: ["roses"],
    price: 4500,
    img: "./img/6.jpg",
    rating: 3.2,
  },
  {
    title: "Букет клубники в шоколаде",
    description: "Если хотите насладиться сочной клубникой в белом и в молочном бельгийском шоколаде, это именно то, что вы искали.",
    tags: ["strawberry", "chocolate"],
    price: 2900,
    img: "./img/8.jpg",
    rating: 3.9,
  },
  {
    title: "Стильный букет с клубникой",
    description: "Райское наслаждение клубника в белом и молочном шоколаде с кокосовой стружкой , красные розы и огромное ассорти ягод : малина, ежевика , голубика , красная смородина",
    tags: ["roses", "strawberry", "chocolate"],
    price: 3500,
    img: "./img/7.jpg",
    rating: 3.4,
  },
  {
    title: "Корзина с ирисами",
    description: "Милая корзина с ирисами",
    tags: ["irises", "Flowers in a box"],
    price: 4100,
    img: "./img/9.jpg",
    rating: 3.8,
  },
  {
    title: "Белая магнолия",
    description: "Чувственный, наполненный нежностью подарочный набор.",
    tags: ["box"],
    price: 21000,
    img: "./img/10.jpg",
    rating: 3.2,
  },
  {
    title: "Подарочный набор: «Офелия», коробочка макарон и открытка",
    description: "Подарочный набор с нашей популярной цветочной композицией «Офелия», пирожные макарон (5 шт) и открытка в ассортименте",
    tags: ["box", "roses"],
    price: 4900,
    img: "./img/11.jpg",
    rating: 3.7,
  },
  {
    title: "Лавандовое счастье",
    description: "Готовый подарочный набор дарит лавандовую нежность и безмятежность",
    tags: ["box"],
    price: 2700,
    img: "./img/12.jpg",
    rating: 4.1,
  },
];
let currentState = [...items];
const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");
function renderItems(arr) { 
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}
function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;
  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }
  const tagsHolder = item.querySelector(".tags");
  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });
  return item;
}
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
function applySearch(){
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = items.filter((el)=>
  el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a,b)=>sortByAlphabet(a,b));
  sortControl.selectedIndex = 0;
  renderItems(currentState);
}
searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) =>{
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a,b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a,b) => a.price - b.price);
      break;
    } case "rating": {
      currentState.sort((a,b) => b.rating - a.rating);
      break;
    } case "alphabet": {
      currentState.sort((a,b) => sortByAlphabet(a,b));
      break;
    }
  }
  renderItems(currentState);
});




