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
export const noteFromPitch = (frequency) => {

    let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum + 69);

}

export const noteNamefromNote = (note, table) => {

    if (note >= 24 && note <= 83) {

        let nota = table.find(nota => {
            let numeros = nota.octavas.map(octava => octava.numero);
            return numeros.includes(note);
        });
        return nota.name;
    }

    return;

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

export const frequencyFromNoteNumber = (note) => {

    return Math.round(440 * Math.pow(2, (note - 69) / 12) * 1000) / 1000;

}

//Formula de Calculo de Centecimas
export const centsOffFromPitch = (frequency, note) => {

    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));

}

export const octaveFromPitch = (frequency, table) => {

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