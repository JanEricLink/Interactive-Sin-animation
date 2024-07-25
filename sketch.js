let a;
let aStart;
let p0;
let p1;
let p2;
let p3;
let p4;
let p5;
let points;
let len;
let amp;
let freq;

function setup() {
  frameRate(60);
  angleMode(DEGREES);

  //Settings
  createCanvas(800, 400);
  aStart = 90;
  len = 2;
  amp = 1;
  freq = 5;
  p0 = createVector(150, height / 2);

  a = aStart;
  points = {};
}

function draw() {
  p1 = createVector(amp * 50 * sin(a), +amp * 50 * cos(a)).add(p0); //Point on Circle
  p2 = createVector(amp * 50 * sin(a), 0).add(p0); //Point on x-Achsis
  p3 = createVector(0, amp * 50 * cos(a)).add(p0); //Point on y-Achsis
  p4 = createVector(amp * 50, amp * 50 * cos(a)).add(p0); //Point on Verticalizer
  p5 = createVector((a - aStart) / freq + amp * 50, amp * 50 * cos(a)).add(p0); //Point on Sin

  points[p5.x] = p5.y;

  malmal();

  strokeWeight(1);
  text(a, 0, 10);
  text(p5.x, 0, 20);
  text(frameRate(), 0, 40);
  text(mouseX, 10, height - 10);
  text(mouseY, 40, height - 10);

  a += freq;
  if (a >= len * 360 + aStart) {
    points = {};
    a = aStart;
  }
}

function malmal() {
  background(240);

  stroke(color(0, 0, 0)); //Schwarz
  strokeWeight(1);
  line(0, p0.y, width, p0.y);
  line(p0.x, 0, p0.x, height);
  line(p0.x + amp * 50, 0, p0.x + amp * 50, height);
  strokeWeight(2);
  noFill();
  circle(p0.x, p0.y, amp * 100);
  strokeWeight(5);
  point(p0);

  stroke(color(0, 255, 0)); //Grün
  strokeWeight(2);

  stroke(color(0, 0, 255)); //Blau
  strokeWeight(5);
  point(p2);
  point(p3);
  strokeWeight(2);
  line(p1.x, p1.y, p2.x, p2.y);
  line(p1.x, p1.y, p3.x, p3.y);

  for (key in points) {
    strokeWeight(2);
    point(key, points[key]);
    strokeWeight(2);
    line(key - 1, points[key - 1], key, points[key]);
  }

  stroke(color(255, 0, 0)); //Rot
  strokeWeight(5);
  point(p1);
  point(p4);
  point(p5);
  strokeWeight(2);
  line(p1.x, p1.y, p0.x, p0.y);
  line(p1.x, p1.y, p4.x, p4.y);
  line(p5.x, p5.y, p4.x, p4.y);
}
