let smallArr =[['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'],
['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
['#FFEB3B', '#FFC107', '#FFC107', '#FFEB3B'],
['#00BCD4', '#FFEB3B', '#FFEB3B', '#00BCD4'];


function CurrentColor() {
  return window.getComputedStyle( document.getElementById('curretColor') , null).getPropertyValue( 'background-color' );
}

function Pencil(event, arr) {
  arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)] = window.getComputedStyle( document.getElementById('curretColor') , null).getPropertyValue( 'background-color' );
  return arr;
}

function ColorPalette (arr) {
  document.getElementById('curretColor').style.background = arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)];
  return arr;
}

function Filling(arr) {
  arr.forEach((row) => {
      row.forEach((elem, index, rowItem) => {
          row[index] = CurrentColor();
      })
  });

  console.log(arr);
  return arr;
}

window.onload = () => {
let arr = localStorage.getItem('canvas') ? JSON.parse(localStorage.getItem('canvas')) : smallImg;
drawArray(4, arr);
let canvas = document.getElementById('canvas');

canvas.addEventListener('click', (event) => {
  switch(document.getElementsByClassName('pencil')[0].children[1].innerHTML) {
      case 'Pencil':
          arr = Pencil(event, arr)
          break;
      case 'Choose color':
          arr = ColorPalette(arr)
          break;
      case 'Paint bucket':
          arr = Filling(arr)
          break;
      default :
          break;
  }

  drawArray(4, arr);
  localStorage.setItem('canvas', JSON.stringify(arr));
});

canvas.addEventListener('mousemove', (event) => {
  if (event.which === 1 && document.getElementsByClassName('pencil')[0].children[1].innerHTML === 'Pencil') {
      arr[Math.floor(event.offsetY / 128)][Math.floor(event.offsetX / 128)] = CurrentColor();
      drawArray(4, arr);
      localStorage.setItem('canvas', JSON.stringify(arr));
  }
});
}

Array.from(document.getElementsByClassName("toolsb")).forEach(element => {
  element.addEventListener("click", () => {
      if (document.getElementsByClassName("pencil")[0]) {
          document.getElementsByClassName("pencil")[0].classList.remove("pencil");
      }

      element.classList.add("pencil");
rray.from(document.getElementsByClassName('change')).forEach(element => {
  element.addEventListener("click", () => {
      if (element.children[0].id !== 'prevColor') {
          document.getElementById('prevColor').style.background = CurrentColor()
          document.getElementById('curretColor').style.background = window.getComputedStyle( element.children[0] , null).getPropertyValue( 'background-color' );
      } else {
          document.getElementById('curretColor').style.background = window.getComputedStyle( element.children[0] , null).getPropertyValue( 'background-color' );
      }
  });
});
function drawArray(size, arr) 
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




  