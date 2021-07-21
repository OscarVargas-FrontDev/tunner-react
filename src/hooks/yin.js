let yinThreshold = 0.15;
let yinProbability = 0;

export function Yin_pitchEstimation(inputBuffer, sampleRate) {

    let yinBuffer = new Float32Array(Math.floor(inputBuffer.length / 2));
    yinBuffer[0] = 1;
    let runningSum = 0;
    let pitchInHz = 0;
    let foundTau = false;
    let minTauValue;
    let minTau = 0;

    for (let tau = 1; tau < Math.floor(inputBuffer.length / 2); tau++) {
        yinBuffer[tau] = 0;
        for (let i = 0; i < Math.floor(inputBuffer.length / 2); i++)
            yinBuffer[tau] += Math.pow((inputBuffer[i] - 128) / 128 - (inputBuffer[i + tau] - 128) / 128, 2);
        runningSum += yinBuffer[tau];
        yinBuffer[tau] = yinBuffer[tau] * (tau / runningSum);
        if (tau > 1)
            if (foundTau)
                if (yinBuffer[tau] < minTauValue) {
                    minTauValue = yinBuffer[tau];
                    minTau = tau
                } else
                    break;
        else if (yinBuffer[tau] < yinThreshold) {
            foundTau = true;
            minTau = tau;
            minTauValue = yinBuffer[tau]
        }
    }

    if (minTau == 0) {
        yinProbability = 0;
        pitchInHz = 0
    } else {
        minTau += (yinBuffer[minTau + 1] - yinBuffer[minTau - 1]) / (2 * (2 * yinBuffer[minTau] - yinBuffer[minTau - 1] - yinBuffer[minTau + 1]));
        pitchInHz = sampleRate / minTau;
        yinProbability = 1 - minTauValue;
    }

    return pitchInHz;

};