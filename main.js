const input = document.getElementById('input');
const color_picker = document.getElementById('color');
const vol_slider = document.getElementById('vol-slider')

var interval = null;
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
    var y = (height/2) + vol_slider.value * Math.sin(2 * (Math.PI) * freq * x * (0.5 * length));
    ctx.strokeStyle = color_picker.value //MAKE IT A GRADIENT (PART 4 SECTION 1 (END))
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter = counter + 1; //increases counter by 1 (to show how long interval has been run)
    if(counter > (timepernote/20)) {
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
    gainNode.gain.setValueAtTime(vol_slider.value, audioCtx.currentTime); // set volume to slider value right now
    setting = setInterval(() => {gainNode.gain.value = vol_slider.value}, 1) //sets volume to slider value every 1 millisecond
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime); //set frequency to PITCH right now
    setTimeout(() => { // 10 ms before timepernote:
        clearInterval(setting); // runs SETTING (interval above)
        gainNode.gain.value = 0; }, // sets volume to 0
        (timepernote-10));

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

