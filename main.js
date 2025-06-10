const input = document.getElementById('input');

// define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.widthl
var height = ctx.canvas.height;


var counter = 0;
function drawWave() {
    counter = 0


}




var amplitude = 40;
function line() { //draws line for sine wave
    var y = (height/2) + amplitude * (2 * (Math.PI) * freq * x);
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
}




// create web audio api elements
const audioCtx = new AudioContext(); // audioCtx pauses/plays computer speakers
const gainNode = audioCtx.createGain(); // gainNode controls volume of audioCtx


// create Oscillator node
const oscillator = audioCtx.createOscillator(); // oscillator plays frequencies based on graph
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";
///////////

oscillator.start();
gainNode.gain.value = 0; // volume = 0
/////////// 

notenames = new Map();
notenames.set("C", 261.6); // (key, value)
notenames.set("D", 293.7);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("G", 392);
notenames.set("A", 440);
notenames.set("B", 493.9);



///////////
function frequency(pitch) { // plays note for 1 sec
    freq = pitch / 10000;
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime); // set volume to 100 right now
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime); //set frequency to PITCH right now
    gainNode.gain.setValueAtTime(0, (audioCtx.currentTime + 1)); // set volume to 0 in 1 second

}

function handle() { //called when button is clicked in index.html
    audioCtx.resume(); // resumes sound
    gainNode.gain.value = 0; // volume = 0
    var usernotes = String(input.value); // inputted letter is now a string
    frequency(notenames.get(usernotes)); // calls frequency, PITCH is the value of USERNOTES from the Map NOTENAMES
}

