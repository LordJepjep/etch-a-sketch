function createGrid(size) {
  const containerDiv = document.querySelector(".container");
  const boxSize = calculateBoxSize(size);
  console.log(boxSize);
  for (i = 0; i < size * size; i++) {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    boxDiv.style.width = boxSize + "px";
    boxDiv.style.height = boxSize + "px";
    // boxDiv.style.flexBasis = calculateBoxSize + "%";
    containerDiv.appendChild(boxDiv);
  }
}

function calculateBoxSize(size) {
  const containerWidth = window.screen.width * 0.9;
  const containerHeight = window.screen.height * 0.9;

  const shortestSide = Math.min(containerHeight, containerWidth);

  return Math.floor(shortestSide / size);
}

createGrid(16);
