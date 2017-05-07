const RaspiCam = require("raspicam");
const moment = require('moment');
const _ = require('lodash');

var camera;

const defaultOptions = { 
    mode: "photo",
    output: "./shots/this-will-be-overwritten-with-current-date.jpg",
    encoding: "jpg",
    width: 640,
    height: 480,
    quality: 50,
    timeout: 10000,
    timelapse: 200,
    thumb: "none",

    onStart: null,
    onRead: null,
    onExit: null
}

function run(opts) {
    opts = opts || {};
    opts = Object.assign(defaultOptions, opts);

    const folderName = moment().format('YYMMDD');
    const fileName = moment().format('HHmmss');
    opts.output = `./shots/${folderName}/${fileName}_%04d.jpg`;

    if(camera){
        console.log('Capturing already in progress...');
        return;
    }

    camera = new RaspiCam(raspicamOptions(opts));

    camera.on("start", function( err, timestamp ){
        console.log("Capture photo started at " + timestamp );
        opts.onStart && opts.onStart(err, timestamp);
    });

    camera.on("read", function( err, timestamp, filename ){
        console.log("Capture photo image captured with filename: " + filename );
        opts.onRead && opts.onRead(err, timestamp, filename);
    });

    camera.on("exit", function( timestamp ){
        console.log("Capture photo child process has exited at " + timestamp );
        opts.onExit && opts.onExit(timestamp);
    });

    camera.start();
    console.log('Capture initting done...');
}


/**
 * Pick options except nulls
 */
function raspicamOptions(opts){
    opts = opts || {};
    return _.pickBy(opts, (val) => val !== null);
}

module.exports = {
    run: run,
    camera: camera
}
