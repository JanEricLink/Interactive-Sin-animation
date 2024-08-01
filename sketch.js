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
let graphSelecter;
let sortedKeys;
let maxValue;

function setup() {
  angleMode(DEGREES);

  inputs();
  reset();
  //noLoop();
}

function draw() {
  //setTimeout(redraw, 0);

  getUserInputs();

  p1 = createVector(amp * 50 * sin(a), +amp * 50 * cos(a)).add(p0); //Point on Circle
  p2 = createVector(amp * 50 * sin(a), 0).add(p0); //Point on x-Achsis
  p3 = createVector(0, amp * 50 * cos(a)).add(p0); //Point on y-Achsis
  graphCalculation();

  points[p5.x] = p5.y;

  graphSelecter.input(changeToSelected);

  malmal();

  graphSelecter.position(10, 10);
  drawSelecter.position(10, 40);
  if (debugCheckbox.checked()) {
    debug();
  }

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
  for (var key in points) {
    switch (drawSelecter.selected()) {
      case "Dotted":
        strokeWeight(2);
        point(key, points[key]);
        break;
      case "Connected":
        strokeWeight(2);
        if (previousKey !== null) {
          if (
            graphSelecter.selected() != "Tangens" ||
            points[previousKey] > points[key]
          ) {
            line(previousKey, points[previousKey], key, points[key]);
          }
        }
        previousKey = key;
        break;
      case "Filled":
        strokeWeight(2);
        line(key, points[key], key, windowHeight / 2);
        break;
      default:
        break;
    }
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
  createCanvas(windowWidth, windowHeight - 1 / 3);
  p0 = createVector(150, height / 2);
  aStart = 90;
  amp = 1;
  freq = 1;
  len = ((windowWidth - amp * 50 - p0.x) * freq) / 360;
  ampSlider = createSlider(0.1, 2.5, 1, 0.1);
  ampSlider.position(width - 200, 30);
  freqSlider = createSlider(0.5, 20, 1, 0.5);
  freqSlider.position(width - 200, 80);
  graphSelecter = createSelect();
  graphSelecter.position(10, 10);
  graphSelecter.option("Sinus");
  graphSelecter.option("Cosinus");
  graphSelecter.option("Tangens");
  graphSelecter.selected("Sinus");
  drawSelecter = createSelect();
  drawSelecter.position(10, 40);
  drawSelecter.option("Dotted");
  drawSelecter.option("Connected");
  drawSelecter.option("Filled");
  drawSelecter.selected("Dotted");
  debugCheckbox = createCheckbox("Debug Mode");
  debugCheckbox.position(windowWidth - 120, windowHeight - 30);
}

function getUserInputs() {
  if (amp != ampSlider.value()) {
    reset();
    amp = ampSlider.value();
  }
  if (freq != freqSlider.value()) {
    reset();
    freq = freqSlider.value();
    len = ((windowWidth - amp * 50 - p0.x) * freq) / 360;
  }
}

function reset() {
  background(240);
  a = aStart;
  points = {};
}

function debug() {
  graphSelecter.position(10, 100);
  drawSelecter.position(10, 130);
  strokeWeight(1);
  stroke(255, 0, 0);
  text("Angle: " + a, 10, 20);
  text("p5.x: " + p5.x, 10, 40);
  text("FPS: " + round(frameRate(), 0), 10, 60);
  text("Maus Y Pos: " + round(mouseY), 10, windowHeight - 10);
  text("Maus X Pos: " + round(mouseX), 10, windowWidth - 30);
  text("len: " + len, 10, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ampSlider.position(windowWidth - 200, 30);
  freqSlider.position(windowWidth - 200, 80);
  len = ((windowWidth - amp * 50 - p0.x) * freq) / 360;
  debugCheckbox.position(windowWidth - 120, windowHeight - 30);
}

function changeToSelected() {
  switch (graphSelecter.selected()) {
    case "Sinus":
      //Custom Values for each graph here
      aStart = 90;
      reset();
      break;

    case "Cosinus":
      //Custom Values for each graph here
      aStart = 180;
      reset();
      break;

    case "Tangens":
      //Custom Values for each graph here
      aStart = 90;
      reset();
      break;

    default:
      print(
        "Es ist ein unbekannter fehler beim ändern des Graphen aufgetreten. Bitte Seite neu laden."
      );
      break;
  }
}

function graphCalculation() {
  switch (graphSelecter.selected()) {
    case "Sin":
      p4 = createVector(amp * 50, amp * 50 * cos(a)).add(p0); //Point on Verticalizer
      p5 = createVector((a - aStart) / freq + amp * 50, amp * 50 * cos(a)).add(
        p0
      ); //Point on Sin
      break;

    case "Cos":
      p4 = createVector(amp * 50, amp * 50 * cos(a)).add(p0); //Point on Verticalizer
      p5 = createVector((a - aStart) / freq + amp * 50, amp * 50 * cos(a)).add(
        p0
      ); //Point on cos
      break;

    case "Tan":
      let tanValue = tan(a - aStart);
      if (abs(tanValue) > maxValue) {
        tanValue = maxValue * Math.sign(tanValue);
      }
      p4 = createVector(amp * 50, amp * 50 * -tan(a - aStart)).add(p0); //Point on Verticalizer
      p5 = createVector(
        (a - aStart) / freq + amp * 50,
        amp * 50 * -tan(a - aStart)
      ).add(p0); //Point on Tan
      break;

    default:
      print(
        "Es ist ein unbekannter fehler beim ändern des Graphen aufgetreten. Bitte Seite neu laden."
      );
      break;
  }
}
