const smallImg = [
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
  ['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
];
 
function DrawArray(size, arr) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      ctx.fillStyle = arr[i][j];
      ctx.fillRect(j * (canvas.width / size),
        i * (canvas.width / size),
        (canvas.width / size),
        (canvas.width / size));
    }
  }
}

function CurrentColor() {
  return window.getComputedStyle(document.getElementById('current_color'), null).getPropertyValue('background-color');
}

function SetPoint(arr, x, y) {
  Array.from(arr)[x][y] = CurrentColor();
}

function SetLine(arr, x0, y0, x1, y1) {
  const deltaX = Math.abs(x1 - x0);
  const deltaY = Math.abs(y1 - y0);
  const stepX = (x0 < x1) ? 1 : -1;
  const stepY = (y0 < y1) ? 1 : -1;
  let err = deltaX - deltaY;

  while (true) {
    SetPoint(arr, x0, y0);
    if ((x0 === x1) && (y0 === y1)) break;
    const e2 = 2 * err;
    if (e2 > -deltaY) { err -= deltaY; x0 += stepX; }
    if (e2 < deltaX) { err += deltaX; y0 += stepY; }
  }
}

function ColorPicker(event, arr) {
  document.getElementById('prev_color').style.background = CurrentColor();
  localStorage.setItem('prev_color', CurrentColor());
  document.getElementById('current_color').style.background = arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)];
  localStorage.setItem('current_color', CurrentColor());
}

function FillingBlock(arr, newColor, oldColor, x, y) {
  if (x >= 0 && x < arr.length && y >= 0 && y < arr.length
    && arr[x][y] === oldColor && arr[x][y] !== newColor) {
    arr[x][y] = newColor;

    FillingBlock(arr, newColor, oldColor, x + 1, y);
    FillingBlock(arr, newColor, oldColor, x - 1, y);
    FillingBlock(arr, newColor, oldColor, x, y + 1);
    FillingBlock(arr, newColor, oldColor, x, y - 1);
  }
}

window.onload = () => {
  document.getElementById('current_color').style.background = localStorage.getItem('current_color') ? localStorage.getItem('current_color') : '#fff';
  document.getElementById('prev_color').style.background = localStorage.getItem('prev_color') ? localStorage.getItem('prev_color') : '#fff';

  const arr = localStorage.getItem('canvas') ? JSON.parse(localStorage.getItem('canvas')) : smallImg;
  DrawArray(4, arr);
  const canvas = document.getElementById('canvas');

  let startX;
  let startY;

  canvas.addEventListener('mousedown', (event) => {
    startX = Math.floor(event.offsetY / 128);
    startY = Math.floor(event.offsetX / 128);

    switch (document.getElementsByClassName('active')[0].children[1].innerHTML) {
      case 'Pencil':
        SetPoint(arr, startX, startY);
        DrawArray(4, arr);
        break;
      case 'Choose color':
        ColorPicker(event, arr);
        break;
      case 'Paint bucket':
        FillingBlock(arr, CurrentColor(), arr[startX][startY], startX, startY);
        DrawArray(4, arr);
        break;
      default:
        break;
    }
    localStorage.setItem('canvas', JSON.stringify(arr));
  });

  canvas.addEventListener('mousemove', (event) => {
    if (event.which === 1 && document.getElementsByClassName('active')[0].children[1].innerHTML === 'Pencil') {
      SetLine(arr, startX, startY,
        Math.floor(event.offsetY / 128), Math.floor(event.offsetX / 128));
      DrawArray(4, arr);
      localStorage.setItem('canvas', JSON.stringify(arr));
    }
  });
};

Array.from(document.getElementsByClassName('tools-item')).forEach((element) => {
  element.addEventListener('click', () => {
    document.getElementsByClassName('active')[0].classList.remove('active');

    element.classList.add('active');
  });
});

Array.from(document.getElementsByClassName('change')).forEach((element) => {
  element.addEventListener('click', () => {
    if (element.children[0].id !== 'prev_color') {
      document.getElementById('prev_color').style.background = CurrentColor();
      localStorage.setItem('prev_color', CurrentColor());
      document.getElementById('current_color').style.background = window.getComputedStyle(element.children[0], null).getPropertyValue('background-color');
      localStorage.setItem('current_color', CurrentColor());
    } else {
      document.getElementById('current_color').style.background = window.getComputedStyle(element.children[0], null).getPropertyValue('background-color');
    }
  });
});

document.getElementById('color_input').onchange = (event) => {
  document.getElementById('prev_color').style.background = CurrentColor();
  localStorage.setItem('prev_color', CurrentColor());
  document.getElementById('current_color').style.background = event.currentTarget.value;
  localStorage.setItem('current_color', CurrentColor());
};  

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '66':
      document.getElementsByClassName('active')[0].classList.remove('active');
      document.getElementsByClassName('toolsitem')[0].classList.add('active');
      break;
    case '80':
      document.getElementsByClassName('active')[0].classList.remove('active');
      document.getElementsByClassName('toolsitem')[2].classList.add('active');
      break;
    case '67':
      document.getElementsByClassName('active')[0].classList.remove('active');
      document.getElementsByClassName('toolsitem')[1].classList.add('active');
      break;
}
});