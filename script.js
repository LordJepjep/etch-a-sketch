let size = 16;
let color = "black";

function renderGrid(size) {
  const containerDiv = document.querySelector(".container");
  containerDiv.replaceChildren(); // empty container
  containerDiv.append(createGrid(size));
}

function createGrid(size) {
  const boxSize = calculateBoxSize(size);

  const fragment = new DocumentFragment();
  for (i = 0; i < size * size; i++) {
    const boxDiv = document.createElement("div");
    addHoverEvent(boxDiv);
    boxDiv.classList.add("box");
    boxDiv.style.width = boxSize + "px";
    boxDiv.style.height = boxSize + "px";
    // boxDiv.style.flexBasis = calculateBoxSize + "%";
    fragment.appendChild(boxDiv);
  }
  return fragment;
}

function addHoverEvent(box) {
  box.addEventListener("mouseenter", () => {
    box.style.backgroundColor = color;
  });
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
