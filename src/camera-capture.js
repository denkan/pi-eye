const RaspiCam = require("raspicam");
const moment = require('moment');

const opts = { 
    mode: "photo",
    output: "./shots/this-will-be-overwritten-with-current-date.jpg",
    encoding: "jpg",
    width: 640,
    height: 480,
    quality: 50,
    timeout: 10000,
    timelapse: 200,
    thumb: "none"
}

function init() {
    const folderName = moment().format('YYMMDD');
    const fileName = moment().format('HHmmss');
    opts.output = `./shots/${folderName}/${fileName}_%04d.jpg`;

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
