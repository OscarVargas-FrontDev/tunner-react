import React, { useState, useEffect, useRef } from 'react';
import {Container} from '@material-ui/core';
import IndicatorNote from './IndicationNoteAndFreq/IndicatorNote';
import TunnerDisplay from './TunnerDisplay';
import Notas  from '../util/FrequencyTable';
import { Yin_pitchEstimation } from '../hooks/yin';
import {centsOffFromPitch,frequencyFromNoteNumber,noteFromPitch,noteNamefromNote,octaveFromPitch} from '../hooks/pitchjs';

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
let numNote = 69;

function Tunner() {
    //State
    const [turn, setTurn] = useState("off");
    const [frequency, setFrequency] = useState(Notas[9].octavas[3].frecuencia);
    const [cent, setCent] = useState(0);
    const [note, setNote] = useState(Notas[9].name);
    
    const requestRef = useRef();

    const handleTurnChange = () =>{

        if(turn === "on"){
            setTurn("off");
        }

        if(turn === "off"){
            setTurn("on");
            navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess);

        }
    };

    useEffect(() => {
        return () => cancelAnimationFrame(requestRef.current);
    },[]);

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

        function updatePitch(time) {

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
                setCent(centsOffFromPitch(pitch, numNote) || cent);
                setFrequency(frequencyFromNoteNumber(numNote));
                octave = octaveFromPitch(pitch, Notas) || octave;
                setNote(noteNamefromNote(numNote, Notas) || note);


                if (pitchHistory.length < limitPitchHist) {

                    requestRef.current = requestAnimationFrame(updatePitch);

                } else {

                    setTimeout(() => {
                        requestRef.current = requestAnimationFrame(updatePitch);
                    }, 70);
                }



            } else {
                console.log("--");
            }
        }
    }
  
    return (
        <Container maxWidth="sm">
            <IndicatorNote cent={cent} frequency={frequency} note={note}/>
            <TunnerDisplay turn={turn} onTurnChange={handleTurnChange}/>
        </Container>
    );

};


export default Tunner;