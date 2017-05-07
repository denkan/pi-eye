const RaspiCam = require("raspicam");


const opts = { 
    mode: "photo",
    output: "./shots/%Y-%m-%d/photo-%H-%M-%s.jpg",
    encoding: "jpg",
    width: 640,
    height: 480,
    quality: 90,
    thumb: "120x90:50",
    timeout: 10000,
    timelapse: 200
}

function init() {
    const camera = new RaspiCam(opts);

    camera.on("start", function( err, timestamp ){
        console.log("photo started at " + timestamp );
    });

    camera.on("read", function( err, timestamp, filename ){
        console.log("photo image captured with filename: " + filename );
    });

    camera.on("exit", function( timestamp ){
        console.log("photo child process has exited at " + timestamp );
    });

    camera.start();
    console.log('initting done...');
}

module.exports = {
    init: init    
}
