/*
beep beep alarm by michelle, chelsea, william, and jacqs

amplitudes to test:
0.2, 0.6, 1

frequencies to test:
40, 300, 500, 800, 1000, 2000, 5000, 8000, 10000, 12000

*/
// variables
var frequencies = [40, 300, 500, 800, 1000, 2000, 5000, 8000, 10000, 12000];
var amplitudes = [0.2, 0.6, 1];

let trial_count = 0;
let max_trials = 10;
let part; // corresponding to the 3 amplitudes each frequency is played at, so part 1 2 3
let trial_start = false;
let sound_played = false;

let screen_horizontal = 700;
let screen_vertical = screen_horizontal;

let osc, playing, freq, amp;

function preload() {
    soundFormats('mp3', 'ogg');
    // mySound = loadSound('assets/doorbell'); perhaps add each sound file to assets?
  }

function setup() {
    let cnv = createCanvas(screen_horizontal, screen_vertical);
    cnv.mousePressed(playOscillator);
    background(255, 199, 216);
    osc = new p5.Oscillator('sine');
}

// something here saying welcome to our study, tap to start maybe?

function draw() {
    fill(255, 255, 255);
    textSize(32);
    if (trial_count <= max_trials) {
      text("Trials: " + trial_count + " out of " + max_trials, 10, 30);
  
      if (!trial_start) {
        if (sound_played == false) {
            /* this is called to create a new sound. it would be cool if 
             * it could randomly generate a sound based on the frequencies
             * and amplitudes we want to test. i was thinking about using 
             * the "random" function but im not sure how to get it not to 
             * use the same freq/amp twice.
             */


            /* ok lol i think i figured out my dilemna in line 47. im just making 
             * freq pick randomly from an array of our values, then remove
             * the value it chose at the end of the trial. ive thought of the trials
             *  as "parts" ie subtrials. but the whole thing still runs 10 trials. if 
             * someone comes up with a better system to do this pls feel free to use
             * it !!
             */

            freq = random(frequencies);

            let freqIndex = frequencies.indexOf(freq);

            for (let i = 0; i < 3; i++) {
                amp = amplitudes[i];

                if (playing) {
                    // smooths transitions by 0.1 seconds
                    osc.freq(freq, 0.1);
                    osc.amp(amp, 0.1);

                    /* mouseReleased is supposed to be a function about accepting user input
                     * (if that is what we want to do), i had just copy pasted it from the 
                     * fitts test hw. im trying to figure out how to make it run each amp per
                     * trial, so i thought if i just put the mouseReleased function (soon to be
                     * some other function ab acceptin guser input) here it would accept user 
                     * input here. the trial_count-- is bc the real mousereleased function goes
                     * to the next trial and thats ot what id wanted to do when testing diff amps
                     * but if we decide to go another route in terms of structuring the trials
                     * this might be changed.
                     */
                    mouseReleased(); trial_count--;
                }
            }

            // removes that freq from the list
            frequencies.splice(freqIndex, 1);
        }
      }
    } else {
      text("Congrats! Study completed.", 10, 30);
    }
}

function playOscillator() {
    osc.start();
    playing = true;
}

// runs upon user input, the mousepressed wa scopy pasted but this should be 
// about collecting user input

function mousePressed() {
    // Accept user inputting perceived intensity
    
    // make sure input is valid
  
    // print results if we want to do that
  
    // Advances to the next trial
    trial_count++;
    background(0, 0, 0);

    osc.amp(0, 0.5);
    playing = false;

}