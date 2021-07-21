import activeBtn from "./js/btn.js";

const canvas = document.querySelector('.visualizer');
const canvasCtx = canvas.getContext("2d");
let GlobalIdAnimaticion;

const handleSucces = (stream) => {
    console.log(stream);
    const options = { mimeType: 'audio/webm' };
    const mediaRecorder = new MediaRecorder(stream, options);
    visualize(stream, mediaRecorder);
    /* mediaRecorder.addEventListener('dataavailable', function(e) {
        e.data.arrayBuffer()
            .then(buffer => audioContext.decodeAudioData(buffer))
            .then(audioBuffer => visualize(audioBuffer));
    }); */
    activeBtn(".record", "#icon-mic", mediaRecorder);

}

const visualize = (stream, mediaRecorder) => {

    mediaRecorder.addEventListener("start", e => {
        draw();
    })
    mediaRecorder.addEventListener("stop", e => {
        console.log("cancel");
        cancelAnimationFrame(GlobalIdAnimaticion);
    })

    console.log("/--------Visualize-------/");
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(dataArray);

    source.connect(analyser);



    function draw() {
        console.log(dataArray);
        const WIDTH = canvas.width
        const HEIGHT = canvas.height;
        console.log(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        GlobalIdAnimaticion = requestAnimationFrame(draw);


        canvasCtx.fillStyle = 'rgb(49, 49, 49)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(49, 180, 47)';

        canvasCtx.beginPath();

        let sliceWidth = WIDTH * 1.0 / bufferLength;
        let x = 0;


        for (let i = 0; i < bufferLength; i++) {

            let v = dataArray[i] / 128.0;
            let y = v * HEIGHT / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();

    }
};

const filterData = audioBuffer => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const samples = 70; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i; // the location of the first sample in the block
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
        }
        filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
}
const normalizeData = filteredData => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n * multiplier);
}
const drawLineSegment = (ctx, x, y, width, isEven) => {
    ctx.lineWidth = 1; // how thick the line is
    ctx.strokeStyle = "#212121"; // what color our line is
    ctx.beginPath();
    y = isEven ? y : -y;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
    ctx.lineTo(x + width, 0);
    ctx.stroke();
};



navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSucces);