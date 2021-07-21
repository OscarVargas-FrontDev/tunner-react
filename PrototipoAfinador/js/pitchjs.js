import { Yin_pitchEstimation } from "./yin.js";
import table from "../FrequencyTable.js";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

//Vinculaciones para Web Audio
let audioContext = null;
let analyser = null;
let buflen = 2048;
//Vinculaciones para deteccion de Tono
let pitch;
let pitchHistory = [];
let limitPitchHist = 10;
let buf = new Float32Array(buflen);
let octave = 4;
let frequency;
let cent = 0;
let numNote = 69;
let noteName = "LA";
//Vinculacion para Animation Frame
let rafID;
//Vinculacion para el DOM
let $note = document.getElementById("note");
let $octave = document.getElementById("octave");
let $pitchElem = document.getElementById("pitch");
let $cent = document.getElementById("cent");
let $indicator = document.getElementById("indicator");

//Menejo del Exito
const handleSuccess = (stream) => {

    //-------------Manejo del Audio con API Web Audio-------------
    audioContext = new AudioContext();

    let source = audioContext.createMediaStreamSource(stream);

    let biquadfil = audioContext.createBiquadFilter();
    biquadfil.type = "lowpass";

    analyser = audioContext.createAnalyser();
    analyser.fftSize = buflen;

    source.connect(analyser);
    source.connect(biquadfil);
    //-------------Actualizacion de Frecuencia para Tonos-------------
    updatePitch();

}

/**
 * 
 * @param {Number} frequency
 * 
 * Nos devuelve el numero de nota basado en el numero de NOTA MIDI
 * 69 -> LA 440
 * La ecuacion se deriva de la formula 440*r^d
 * donde 440 es la frecuencia de Referencia LA-440,
 * r es la razon 12√2,
 * d es la distancia entre la nota en cuestion y el LA-440.
 *  
 * @returns Number
 */
const noteFromPitch = (frequency) => {

    let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum + 69);

}

const noteNamefromNote = (note) => {

    if (note >= 24 && note <= 83) {

        let nota = table.find(nota => {
            let numeros = nota.octavas.map(octava => octava.numero);
            return numeros.includes(note);
        });
        return nota.name;
    }

    return console.log("Frecuencia no registrable");

}

/**
 * 
 * @param {Number} note 
 * Nos devuelve la frecuencia de una nota basado en La 440 como referencia
 * mediante la formula 440*r^d
 * donde 440 es la frecuencia de Referencia LA-440
 * r es la razon 12√2
 * d es la distancia entre la nota en cuestion y el LA-440
 * @returns Number
 */

const frequencyFromNoteNumber = (note) => {

    return Math.round(440 * Math.pow(2, (note - 69) / 12) * 1000) / 1000;

}

//Formula de Calculo de Centecimas
const centsOffFromPitch = (frequency, note) => {

    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));

}

const octaveFromPitch = (frequency) => {

    if (frequency >= table[0].octavas[0].frecuencia && frequency <= table[11].octavas[0].frecuencia) {
        return 1;
    }
    if (frequency >= table[0].octavas[1].frecuencia && frequency <= table[11].octavas[1].frecuencia) {
        return 2;
    }
    if (frequency >= table[0].octavas[2].frecuencia && frequency <= table[11].octavas[2].frecuencia) {
        return 3;
    }
    if (frequency >= table[0].octavas[3].frecuencia && frequency <= table[11].octavas[3].frecuencia) {
        return 4;
    }
    if (frequency >= table[0].octavas[4].frecuencia && frequency <= table[11].octavas[4].frecuencia) {
        return 5;
    }

}

function updatePitch() {

    analyser.getFloatTimeDomainData(buf);
    let autoCorrelation = Yin_pitchEstimation(buf, audioContext.sampleRate);

    if (autoCorrelation != -1) {
        pitch = autoCorrelation;

        if (pitchHistory.length > limitPitchHist) pitchHistory.shift();
        if (pitchHistory.length && Math.abs(pitch / 2 - pitchHistory[pitchHistory.length - 1]) < limitPitchHist)
            pitch = pitch / 2;

        pitchHistory.push(pitch);
        let sortedPitchHistory = pitchHistory.slice(0).sort((a, b) => a - b);
        pitch = sortedPitchHistory[Math.floor(sortedPitchHistory.length - 1 / 2)];
        numNote = noteFromPitch(pitch);
        cent = centsOffFromPitch(pitch, numNote) || cent;
        frequency = frequencyFromNoteNumber(numNote) > 1500 ? 440 : frequencyFromNoteNumber(numNote);
        octave = octaveFromPitch(pitch) || octave;
        noteName = noteNamefromNote(numNote) || noteName;
        $pitchElem.innerText = frequency;
        $cent.innerText = cent;
        $note.innerText = noteName;
        $octave.innerText = octave;
        console.log(numNote);

        if (cent <= 10 && cent >= -10) {

            $indicator.innerText = "Afinado";

        } else if (cent < 10) {

            $indicator.innerText = "Subir";

        } else

            $indicator.innerText = "Bajar";

        if (pitchHistory.length < limitPitchHist) {

            rafID = window.requestAnimationFrame(updatePitch);

        } else {

            setTimeout(() => {
                rafID = window.requestAnimationFrame(updatePitch);
            }, 70);

        }



    } else {
        $pitchElem.innerText = "--";
    }

}

navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess);