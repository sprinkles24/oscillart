const input = document.getElementById('input');

var interval = null;
var amplitude = 40;
var reset = false;
var timepernote = 0;
var length = 0;


// define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;


var counter = 0;
function drawWave() {
    clearInterval(interval);
    counter = 0;
    if (reset) {
        ctx.clearRect(0, 0, width, height); // clears canvas
        x = 0;
        y = (height/2);
        ctx.moveTo(x, y); // moves pointer to left, middle
        ctx.beginPath();
    }
    interval = setInterval(line, 20); // runs every 20 milliseconds // gives interval ID attatched to variable, needed to stop interval
    reset = false

}


function line() { //draws line for sine wave
    var y = (height/2) + amplitude * Math.sin(2 * (Math.PI) * freq * x * (0.5 * length));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter = counter + 1; //increases counter by 1 (to show how long interval has been run)
    if(counter > (timpernote/20)) {
        clearInterval(interval); // stops interval after running timepern0te/20 times
    }
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
    freq = (pitch/10000);
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime); // set volume to 100 right now
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime); //set frequency to PITCH right now
    gainNode.gain.setValueAtTime(0, (audioCtx.currentTime + (timepernote/1000) - 0.1)); // set volume to 0 in 1 second

}

function handle() { //called when button is clicked in index.html
    reset = true
    audioCtx.resume(); // resumes sound
    gainNode.gain.value = 0; // volume = 0
    var usernotes = String(input.value); // inputted letter is now a string
    var noteslist = []
    length = usernotes.length
    timepernote = (6000 / length)

    for (i = 0; i < usernotes.length; i++) {
        noteslist.push(notenames.get(usernotes.charAt(i))) // note -> frequency, add frequency to noteslist
    }

    let j = 0;
    repeat = setInterval(() => {
        if (j<noteslist.length) {
            frequency(parseInt(noteslist[j]));
            drawWave();
        j++
        } else {
            clearInterval(repeat)
        }


    }, timepernote)

}

