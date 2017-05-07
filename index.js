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
        onError: () => {
            setTimeout(initDetection, 500);
        }
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
            timeout: 10000 //,
            //onExit: initDetection // restart detection when done capturing
        });
    }, 500);
}



