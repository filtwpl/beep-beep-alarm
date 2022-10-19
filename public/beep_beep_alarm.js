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
let screen_horizontal = 700;
let screen_vertical = screen_horizontal;
let fin_order = [];
let fin_index = 0;

let osc, freq, amp;

function setup() {
    let cnv = createCanvas(screen_horizontal, screen_vertical);
    background(255, 199, 216);
    //initiates the oscillator
    osc = new p5.Oscillator('sine');

    //creating the button and telling playOscillator to run after it's clicked
    button = createButton('play');
    button.position(20, 60);
    button.mousePressed(playOscillator);
}

// TODO: something here saying welcome to our study, tap to start maybe?

// this function handles the text display
function draw() {
    fill(255, 255, 255);
    textSize(32);
    if (trial_count <= max_trials) {
      text("Trials: " + trial_count + " out of " + max_trials, 10, 30);
    } else {
      background(255, 199, 216);
      button.remove();
      text("Congrats! Study completed.", 10, 30);
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

    amp = amplitudes[part];
    osc.amp(amp);
    osc.freq(freq);
    //this tells the oscillator to stop after...0.8 unit of time
    //lol its not measured in seconds idk what it means
    osc.stop(0.8);
    // replacing the console.log(freq) with an array (amp, freq) that
    // keeps track and shows at the end
    fin_order.push([amp, freq]);
    trial_count++;
    fin_index++;
  }

  // moving onto next part
  if (trial_count > max_trials) {
    textSize(16);
    text("Moving onto the next part! Press the button again when you're ready.", 20, 90);
    part++;
    trial_count = 0;
    frequencies = freqcpy;
    if (part == 2)
      frequencies = freqcpy2;
  }

  // print everything to console at end
  if (part == 3) {
    trial_count = 50; // trial_count > 30 triggers end of study
    console.log("finished");
    let str = "";
    for (var i=0; i<30; i++) {
      str += '(' + fin_order[i][0] + ", " + fin_order[i][1] + ')';
    }
    console.log(str);
  }
}