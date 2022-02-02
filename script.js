var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

var canvas3 = document.getElementById('canvas3');
var ctx3 = canvas3.getContext('2d');


var width = 500, height = width;
canvas.width = width, canvas.height = height;
canvas2.width = width, canvas2.height = height;
canvas3.width = width, canvas3.height = height;


var tFix = 0;
var tFix2 = null;
var circle = {
  radius: 120,
  x: width/2,
  y: height/2
}

var mouse = {
  x: null,
  y: null,

  nx: null,
  ny: null,

  hover: false
}

var triangle = {
  adj: null,
  opp: null,
  hyp: null,
  
  angle: null,
  radian: null
}

var point = {
  x: 0,
  y: 0
}

function border() { 
  ctx.beginPath();
  ctx3.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx3.globalAlpha = 0.2;

  ctx3.moveTo(circle.x-circle.radius, circle.y)
  ctx3.lineTo(circle.x+circle.radius, circle.y)

  ctx3.moveTo(circle.x, circle.y-circle.radius)
  ctx3.lineTo(circle.x, circle.y+circle.radius)

  ctx3.stroke();
  ctx.stroke();
}
border();

function length(a, b, opt) {
  return Math.sqrt(Math.pow((b.y-0), 2) + Math.pow((b.x-0), 2));
}

function degreed(angle) {
    return angle * 180 / Math.PI;
}

function update(x, y) {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  ctx2.beginPath();
  ctx2.arc(x, y, 4, 0, 2 * Math.PI);
  ctx2.stroke();
  print();
}

function print() {
  ctx2.beginPath();
  ctx2.moveTo(circle.x, circle.y);
  ctx2.lineTo(mouse.nx, circle.y);
  triangle.adj = Math.sqrt(Math.pow((mouse.nx-point.x), 2));

  ctx2.moveTo(mouse.nx, mouse.ny);
  ctx2.lineTo(mouse.nx, circle.y);

  ctx2.moveTo(mouse.nx, mouse.ny);
  ctx2.lineTo(circle.x, circle.y);
  triangle.hyp = Math.sqrt(Math.pow((mouse.y-point.y), 2) + Math.pow((mouse.x-point.x), 2))

  triangle.radian = Math.atan2(mouse.x, mouse.y)+Math.PI/2;
  triangle.angle = degreed(triangle.radian);
  ctx2.stroke()

  document.getElementById('console').innerHTML = 'Original X: ' + mouse.nx + ' Original Y: ' + mouse.ny;

  document.getElementById('console2').innerHTML = 'Translated X: ' + mouse.x + ' Translated Y: ' + mouse.y;

  document.getElementById('console3').innerHTML = 'Radian: ' + triangle.radian;

  document.getElementById('console4').innerHTML = 'Angle: ' + triangle.angle;

  document.getElementById('console5').innerHTML = 'Hyptonuse: ' + triangle.hyp;



  ctx2.beginPath();
  if(tFix2 !== true) {
    ctx2.arc(circle.x, circle.y, triangle.hyp*0.2, tFix, triangle.radian);
  } else {
    ctx2.arc(circle.x, circle.y, triangle.hyp*0.2, tFix, triangle.radian, true);  
  }
  ctx2.stroke();
}

document.addEventListener('mousemove', function(e) {
  mouse.x = (e.clientX - (width/2))*(0-1), mouse.y = (e.clientY - (height/2));
  if(length(circle, mouse) < circle.radius) {
    mouse.nx = e.clientX, mouse.ny = e.clientY;
    if((mouse.x > 0 && mouse.y > 0)) {
      tFix = Math.PI;
      tFix2 = true;
    } else if((mouse.x < 0 && mouse.y < 0)) {
      tFix = 0;
      tFix2 = true;
    }
    if(mouse.x < 0 && mouse.y > 0) {
      tFix = 0;
      tFix2 = false;
    } else if(mouse.x > 0 && mouse.y < 0) {
      tFix = Math.PI;
      tFix2 = false;
    }
    update(mouse.nx, mouse.ny);
  }
});
