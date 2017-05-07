const RaspiCam = require("raspicam");
const moment = require('moment');
const _ = require('lodash');

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
    opts = Object.assign(opts, defaultOptions);

    const folderName = moment().format('YYMMDD');
    const fileName = moment().format('HHmmss');
    opts.output = `./shots/${folderName}/${fileName}_%04d.jpg`;

    const camera = new RaspiCam(raspicamOptions(opts));

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

function raspicamOptions(opts){
    opts = opts || {};
    const validKeys = [
        'mode', 'm',
        'output', 'o',
        'encoding', 'e',
        'width', 'w',
        'height', 'h',
        'quality', 'q',
        'timeout', 't',
        'timelapse', 'tl',
        'thumb'
    ];

    return _.pickBy(opts, (val, key) => validKeys.indexOf(key));
}

module.exports = {
    run: run
}
