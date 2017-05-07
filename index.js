const CameraCapture = require('./src/camera-capture');
const CameraDetection = require('./src/camera-detection');


CameraDetection.run({
    onDetectedMotion: () => {
        CameraCapture.run({
            timelapse: 200,
            timeout: 1000
        });
    }
})

