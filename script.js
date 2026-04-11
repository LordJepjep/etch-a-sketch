let size = 16;
let color = "#000000";

function renderGrid(size) {
  const containerDiv = document.querySelector(".container");
  containerDiv.replaceChildren(); // empty container

  containerDiv.removeEventListener("mouseover", handleHover);
  containerDiv.addEventListener("mouseover", handleHover);
  containerDiv.append(createGrid(size));
  updateSizeDisplayText();
}

function createGrid(size) {
  const boxSize = calculateBoxSize(size);

  const fragment = new DocumentFragment();
  for (i = 0; i < size * size; i++) {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    if (size > 50) boxDiv.style.borderColor = "rgba(0, 0, 0, 0.5)";
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
  const colorPicker = document.querySelector("#color-picker");
  const isRandom = document.querySelector("#random-option").checked;
  const isDarken = document.querySelector("#darken-option").checked;

  if (isRandom) {
    colorPicker.value = getRandomColor();
    color = colorPicker.value;
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
  // Generates a random number, converts to base 16 (hex),
  // and pads with a zero if it's only one digit.
  const h = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
  return `#${h()}${h()}${h()}`;
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
  const sizeSlider = document.querySelector("#size-slider");
  size = sizeSlider.value;

  // if canceled, do nothing
  if (size !== undefined) {
    renderGrid(size);
  }
}

function clearGrid() {
  renderGrid(size);
}

function updateSizeDisplayText() {
  const sizeDisplay = document.querySelector(".size");
  sizeDisplay.textContent = size.toString() + " X " + size.toString();
}

const colorPicker = document.querySelector("#color-picker");
colorPicker.value = color;
colorPicker.addEventListener("change", (event) => {
  color = event.target.value;
});
colorPicker.select();

renderGrid(size);
