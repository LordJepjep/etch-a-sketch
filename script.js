function renderGrid(size) {
  const containerDiv = document.querySelector(".container");
  containerDiv.append(createGrid(size));
}

function createGrid(size){
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
    box.style.backgroundColor = "red";
  });
}

function calculateBoxSize(size) {
  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight
  const shortestSide = Math.min(availableWidth, availableHeight);

  return Math.floor(shortestSide / size);
}

renderGrid(16);
