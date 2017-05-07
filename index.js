const CameraCapture = require('./src/camera-capture');
const CameraDetection = require('./src/camera-detection');


start();

function start(){
    initDetection();
}

function initDetection(){
    CameraDetection.run({
        onDetectedMotion: initCapture
    });
}

function initCapture(){
    // stop detection to avoid cam collision 
    if(CameraDetection.camera){
        console.log('Shutdown detection and start capturing...');
        CameraDetection.camera.close()
    } ;

    setTimeout(() => {
        // capture 
        CameraCapture.run({
            timelapse: 200,
            timeout: 1000,
            onExit: initDetection // restart detection when done capturing
        });
    }, 5000);
}



