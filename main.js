let smallArr =[['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4']];


function CurrentColor() {
  return window.getComputedStyle( document.getElementById('curretColor') , null).getPropertyValue( 'background-color' );
}

function Pencil(event, arr) {
  arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)] = window.getComputedStyle( document.getElementById('curretColor') , null).getPropertyValue( 'background-color' );
  
}

function ColorPalette (arr) {
  document.getElementById('curretColor').style.background = arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)];
  
}

function FillingBlock(arr, newColor, oldColor, x, y) {
  if (x >= 0 && x < arr.length && y >= 0 && y < arr.length && arr[x][y] === oldColor && arr[x][y] !== newColor) {
      arr[x][y] = newColor;

      FillingBlock(arr, newColor, oldColor, x + 1, y);
      FillingBlock(arr, newColor, oldColor, x - 1, y);
      FillingBlock(arr, newColor, oldColor, x, y + 1);
      FillingBlock(arr, newColor, oldColor, x, y - 1);
  }
}

window.onload = () => {
let arr = localStorage.getItem('canvas') ? JSON.parse(localStorage.getItem('canvas')) : smallArr ;
drawArr(4, arr);
let canvas = document.getElementById('canvas');

canvas.addEventListener('click', (event) => {
  switch(document.getElementsByClassName('pencil')[0].children[1].innerHTML) {
      case 'Pencil':
          Pencil(event, arr)
          drawArr(4, arr);  
          break;
      case 'Choose color':
           ColorPalette(arr)
          break;
      case 'Paint bucket':
      FillingBlock(arr, CurrentColor(), arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)], Math.floor(event.offsetY / 128), Math.floor(event.offsetX / 128));
      drawArr(4, arr); 
          break;
      default :
          break;
  }

 
  localStorage.setItem('canvas', JSON.stringify(arr));
});

canvas.addEventListener('mousemove', (event) => {
  if (event.which === 1 && document.getElementsByClassName('pencil')[0].children[1].innerHTML === 'Pencil') {
      arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)] = CurrentColor();
      drawArr(4, arr);
      localStorage.setItem('canvas', JSON.stringify(arr));
  }
});
}

Array.from(document.getElementsByClassName("toolsb")).forEach(element => {
  element.addEventListener("click", () => {
      if (document.getElementsByClassName("pencil")[0]) {
          document.getElementsByClassName("pencil")[0].classList.remove("pencil");
        element.classList.add("pencil");
    });
  });
Array.from(document.getElementsByClassName('change')).forEach(element => {
  element.addEventListener("click", () => {
      if (element.children[0].id !== 'prevColor') {
          document.getElementById('prevColor').style.background = CurrentColor()
          document.getElementById('curretColor').style.background = window.getComputedStyle( element.children[0] , null).getPropertyValue( 'background-color' );
      } else {
          document.getElementById('curretColor').style.background = window.getComputedStyle( element.children[0] , null).getPropertyValue( 'background-color' );
      }
  });
});
function drawArr(size, arr) 
{
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
          ctx.fillStyle = arr[i][j];
          ctx.fillRect(j * (canvas.width/size), i * (canvas.width/size), (canvas.width/size), (canvas.width/size));  
      }
  }
}


  