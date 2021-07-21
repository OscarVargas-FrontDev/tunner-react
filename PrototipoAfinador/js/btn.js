export default function activeBtn(className, idFontAws, mediaR) {
    document.addEventListener('click', e => {
        if (e.target.matches(className) || e.target.matches(`${className} *`)) {

            //Control de Clases e Icono ACTIVO INACTIVO
            document.querySelector(className).classList.toggle('is-active');
            if (document.querySelector(idFontAws).classList.contains("fa-microphone-slash")) {
                //State del MediaRecorder
                mediaR.start();
                console.log(mediaR);
                document.querySelector(idFontAws).classList.replace("fa-microphone-slash", "fa-microphone");
            } else {
                //State del MediaRecorder
                mediaR.stop();
                console.log(mediaR);
                document.querySelector(idFontAws).classList.replace("fa-microphone", "fa-microphone-slash");
            }
        }
    });
}