/*
beep beep alarm by michelle, chelsea, william, and jacqs

amplitudes to test:
0.2, 0.6, 1

frequencies to test:
40, 300, 500, 800, 1000, 2000, 5000, 8000, 10000, 12000

*/
// variables
let frequencies = [40, 300, 500, 800, 1000, 2000, 5000, 8000, 10000, 12000];
let amplitudes = [0.2, 0.6, 1];
let trial_count = 0;
let max_trials = 10;
let part; // corresponding to the 3 amplitudes each frequency is played at, so part 1 2 3
let trial_start = false;
let screen_horizontal = 700;
let screen_vertical = screen_horizontal;

let osc, freq, amp;

function setup() {
    let cnv = createCanvas(screen_horizontal, screen_vertical);
    cnv.mousePressed(playOscillator);
    background(255, 199, 216);
    //initiates the oscillator
    osc = new p5.Oscillator('sine');

    //creating the button and telling playOscillator to run after it's clicked
    button = createButton('play');
    button.position(20, 50);
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
      text("Congrats! Study completed.", 10, 30);
    }
}

// this function handles the sound logic and runs when the button is clicked
function playOscillator() {
    if (!trial_start) {
      trial_start = true;
    }
    // TODO: implement amplitude logic (increment trials to 30?)
    //          right now amplitude is fixed at 0.5
    if(trial_count < max_trials) {
      background(255, 199, 216);
      osc.start();
      // this is the logic chelsea wrote to randomize frequency!
      // it removes used frequencies from the array after each trial
      freq = random(frequencies);
      let freq_index = frequencies.indexOf(freq);
      frequencies.splice(freq_index, 1);

      osc.amp(0.5);
      osc.freq(freq);
      //this tells the oscillator to stop after...0.8 unit of time
      //lol its not measured in seconds idk what it means
      osc.stop(0.8);
      console.log(freq);
    }
    trial_count++;
}