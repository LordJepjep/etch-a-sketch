let size = 16;
let color = "#000000";

function renderGrid(size) {
  const containerDiv = document.querySelector(".container");
  containerDiv.replaceChildren(); // empty container

  containerDiv.removeEventListener("mouseover", handleHover);
  containerDiv.addEventListener("mouseover", handleHover);
  containerDiv.append(createGrid(size));
}

function createGrid(size) {
  const boxSize = calculateBoxSize(size);

  const fragment = new DocumentFragment();
  for (i = 0; i < size * size; i++) {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    boxDiv.style.width = boxSize + "px";
    boxDiv.style.height = boxSize + "px";
    // boxDiv.style.flexBasis = calculateBoxSize + "%";
    fragment.appendChild(boxDiv);
  }
  return fragment;
}

function handleHover(e) {
  if (!e.target.classList.contains("box")) return;

  const box = e.target;
  // const colorPicker = document.querySelector("#color-picker");
  const isRandom = document.querySelector("#random-option").checked;
  const isDarken = document.querySelector("#darken-option").checked;

  if (isRandom) {
    color = getRandomColor();
    box.style.backgroundColor = color;
  } else {
    box.style.backgroundColor = color;
  }

  if (isDarken) {
    box.style.opacity = getNewOpacity(box.style.opacity);
  } else {
    box.style.opacity = "1"; // Reset to full if darken is off
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function getNewOpacity(opacity) {
  let currentOpacity = opacity === "" ? 0 : parseFloat(opacity);

  if (currentOpacity >= 1) return "1";

  const newOpacity = currentOpacity + 0.1;
  return newOpacity.toString();
}

function calculateBoxSize(size) {
  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight;
  const shortestSide = Math.min(availableWidth, availableHeight);

  return Math.floor(shortestSide / size);
}

function resizeGrid() {
  while (true) {
    let input = prompt("Enter the size of the grid (1-100): ");
    if (input === null) {
      break;
    }

    size = Number(input);

    if (!Number.isInteger(size) || size <= 0) {
      alert("Invalid number! Please input a number between 1-100!");
    } else if (size > 100) {
      alert("Number is too big! 100s is the limit!");
    } else break;
  }

  // if canceled, do nothing
  if (size !== undefined) {
    renderGrid(size);
  }
}

function clearGrid() {
  renderGrid(size);
}

const colorPicker = document.querySelector("#color-picker");
colorPicker.value = color;
colorPicker.addEventListener("change", (event) => {
  console.log(color, event.target.value);
  color = event.target.value;
});
colorPicker.select();

renderGrid(size);
