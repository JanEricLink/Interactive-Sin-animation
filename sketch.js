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
let ampSlider;
let freqSlider;
let sortedKeys;

function setup() {
  frameRate(60);
  angleMode(DEGREES);

  inputs();

  a = aStart;
  points = {};
}

function draw() {
  getInputs();

  p1 = createVector(amp * 50 * sin(a), +amp * 50 * cos(a)).add(p0); //Point on Circle
  p2 = createVector(amp * 50 * sin(a), 0).add(p0); //Point on x-Achsis
  p3 = createVector(0, amp * 50 * cos(a)).add(p0); //Point on y-Achsis
  p4 = createVector(amp * 50, amp * 50 * cos(a)).add(p0); //Point on Verticalizer
  p5 = createVector((a - aStart) / freq + amp * 50, amp * 50 * cos(a)).add(p0); //Point on Sin

  points[p5.x] = p5.y;

  malmal();

  debug();

  a += freq;
  if (a >= len * 360 + aStart) {
    reset();
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
  strokeWeight(1);
  text("Amplitude: " + amp, width - 200, 70);
  text("Frequenz: " + freq, width - 200, 120);

  let previousKey = null;
  for (const key in points) {
    strokeWeight(2);
    point(key, points[key]);
    strokeWeight(2);
    if (previousKey !== null) {
      line(previousKey, points[previousKey], key, points[key]);
    }
    previousKey = key;
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

function inputs() {
  createCanvas(800, 400);
  aStart = 90;
  len = 5;
  amp = 1;
  freq = 1;
  ampSlider = createSlider(0.1, 2.5, 1, 0.1);
  ampSlider.position(width - 200, 30);
  freqSlider = createSlider(0.1, 10, 1, 0.3);
  freqSlider.position(width - 200, 80);
  p0 = createVector(150, height / 2);
}

function getInputs() {
  if (amp != ampSlider.value()) {
    reset();
    amp = ampSlider.value();
  }
  if (freq != freqSlider.value()) {
    reset();
    freq = freqSlider.value();
  }
}

function reset() {
  background(240);
  points = {};
  a = aStart;
}

function debug() {
  strokeWeight(1);
  stroke(255, 0, 0);
  text(a, 0, 10);
  text(p5.x, 0, 20);
  text(frameRate(), 0, 40);
  text(mouseX, 10, height - 10);
  text(mouseY, 40, height - 10);
}
