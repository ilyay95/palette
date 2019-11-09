let smallArr =[];
let biggerArr = [];

fetch('./data/4x4.json')
.then(res => res.json())
.then(data => data.map(innerArr => {
    return innerArr.map(a => {
      return '#' + a
  })
}))
.then(data => smallArr = data)
.catch(err => console.error(err));

fetch('./data/32x32.json')
.then(res => res.json())
.then(data => data.map(innerArr => {
    return innerArr.map(a => {
      return `rgba(${a})`
  })
}))
.then(data => biggerArr = data)
.catch(err => console.error(err));

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function Img() {
  ctx.clearRect(0, 0, 512, 512);
  let img = new Image();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);
  }
  img.src = './data/image.png';
}

function pic4x4() {
  ctx.clearRect(0, 0, 512, 512);
  width = smallArr[0].length;
  height = smallArr.length; 
  scale = 1; 

  canvas.width = width * scale; 
  canvas.height = height * scale; 

  for(let i= 0; i< height; i++) {
      for(let a = 0; a < width; a++) {
        ctx.fillStyle = smallArr[i][a]; 
        ctx.fillRect(a * scale, i * scale, scale, scale); 
    }
  }
}

function pic32x32() {
  ctx.clearRect(0, 0, 512, 512);
  width = biggerArr[0].length;
  height = biggerArr.length;
  scale = 1; 

  canvas.width = width * scale; 
  canvas.height = height * scale; 

  for(let i = 0; i < height; i++) {
      for(let a = 0; a < width; a++) { 
        ctx.fillStyle = biggerArr[i][a]; 
        ctx.fillRect(a * scale, i * scale, scale, scale); 
    }
  }
}

