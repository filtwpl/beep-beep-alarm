/*
beep beep alarm by michelle, chelsea, william, and jacqs

amplitudes to test:
0.2, 0.6, 1

frequencies to test:
40, 300, 500, 800, 1000, 2000, 5000, 8000, 10000, 12000

*/
// variables
let frequencies = [40, 300, 500, 800, 1000, 2000, 5000, 8000, 10000, 12000];
let freqcpy = frequencies.map((x) => x);
let freqcpy2 = frequencies.map((x) => x);
let amplitudes = [0.2, 0.6, 1];
let trial_count = 0;
let max_trials = 10;
let part = 0; // corresponding to the 3 amplitudes each frequency is played at, so part 1 2 3
let max_parts = 3;
let trial_start = false;
let fin_order = [];
let fin_index = 0;
let button;
let end_of_study = false;

let osc, freq, amp;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  background(255, 199, 216);
  //initiates the oscillator
  osc = new p5.Oscillator("sine");

  fill(255, 255, 255);
  textSize(32);
  text(
    "Welcome to Our Frequency Study!",
    windowWidth / 2 - 250,
    windowHeight / 2 - 100
  );

  //creating instructions button
  // button_i = createButton('instr');
  // button_i.position = (200, 500);
  // button_i.size(80, 30);
  // button_i.style("font-size", "20px");

  //creating the button and telling playOscillator to run after it's clicked
  button = createButton("play");
  button.position(windowWidth / 2 - 100, windowHeight / 2 - 50);
  button.style("font-size", "40px");
  button.size(200, 100);
  button.mousePressed(playOscillator);

  // creating alarm button
  button_alarm = createButton("alarm");
  button_alarm.position(windowWidth / 2 - 100, windowHeight / 2 + 100);
  button_alarm.style("font-size", "40px");
  button_alarm.size(200, 100);
  button_alarm.mousePressed(playAlarm);
}

// TODO: something here saying welcome to our study, tap to start maybe?

// this function handles the text display
function draw() {
  fill(255, 255, 255);
  textSize(32);

  if (trial_start) {
    button.html("next trial");
    if (trial_count <= max_trials) {
      text(
        "Trials: " + trial_count + " out of " + max_trials,
        windowWidth / 2 - 130,
        windowHeight / 2 - 100
      );
    } else {
      background(255, 199, 216);
      button.remove();
      text(
        "Congrats! Study completed.",
        windowWidth / 2 - 190,
        windowHeight / 2 - 100
      );
    }
  }
}

// move forward in the trials by pressing space
function keyPressed() {
  if (keyCode === 32 && trial_start && !end_of_study) {
    playOscillator();
  }
}

// this function handles the sound logic and runs when the button is clicked
function playOscillator() {
  if (!trial_start) {
    trial_start = true;
  }

  if (trial_count <= max_trials && part < max_parts) {
    background(255, 199, 216);
    osc.start();
    // this is the logic chelsea wrote to randomize frequency!
    // it removes used frequencies from the array after each trial
    freq = random(frequencies);
    let freq_index = frequencies.indexOf(freq);
    frequencies.splice(freq_index, 1);
    console.log(trial_count);
    console.log(freq);

    if(trial_count == 10){
      osc.stop();
    }

    amp = amplitudes[part];
    osc.amp(amp);
    osc.freq(freq);
    //this tells the oscillator to stop after...0.8 unit of time
    //lol its not measured in seconds idk what it means
    osc.stop(0.8);
    // replacing the console.log(freq) with an array (amp, freq) that
    // keeps track and shows at the end
    if (trial_count != 10) {
      fin_order.push([amp, freq]);
      fin_index++;
      console.log(fin_order);
    }

    trial_count++;
  }

  // moving onto next part
  if (trial_count > max_trials) {
    textSize(32);
    text(
      "Moving onto the next part!",
      windowWidth / 2 - 190,
      windowHeight / 2 - 200
    );
    text(
      "Press the button when you're ready",
      windowWidth / 2 - 260,
      windowHeight / 2 - 160
    );
    part++;
    trial_count = 0;
    frequencies = freqcpy;
    if (part == 2) frequencies = freqcpy2;
  }

  // print everything to console at end
  if (part == 3) {
    trial_count = 50; // trial_count > 30 triggers end of study
    console.log("finished");
    let str = "";
    for (var i = 0; i < 30; i++) {
      str += "(" + fin_order[i][0] + ", " + fin_order[i][1] + ")";
    }
    console.log(str);
    end_of_study = true;
  }
}

function playAlarm(){
  playAlarmHelper(0);
}

function playAlarmHelper(num) {
  let freq0 = 800;
  let freq1 = 12000;
  let alarm = new p5.Oscillator("sine");
  let freq_to_play = freq0;
  alarm.start();
  alarm.amp(0.6);
  if (num % 2 == 1) {
    freq_to_play = freq1;
  }
  alarm.freq(freq_to_play);
  alarm.stop(0.3);
  console.log(freq_to_play);
  console.log(num);
  timer = setTimeout (() => {playAlarmHelper(num+1)}, 200);
  if (num >= 10) {
    clearTimeout(timer);
  }
}
