const CameraCapture = require('./src/camera-capture');
const CameraDetection = require('./src/camera-detection');


start();

function start(){
    initDetection();
}

function initDetection(){
    console.log('### initDetection()');
    CameraDetection.run({
        onDetectedMotion: initCapture,
        onError: initDetection
    });
}

function initCapture(){
    console.log('### initCapture()');

    // stop detection to avoid cam collision 
    console.log('Shutdown detection and start capturing...');
    CameraDetection.close();

    setTimeout(() => {
        // capture 
        CameraCapture.run({
            timelapse: 200,
            timeout: 1000,
            onExit: initDetection // restart detection when done capturing
        });
    }, 200);
}



