const PiMotion = require('node-pi-motion');

var camera;

const defaultOptions = {
  verbose: true,
  autorestart: false,

  throttle: 200,
  night: false,
  sensitivty: 200,
  threshold : 10,
  sleep: 0.5, // sec

  onReady: null,
  onDetectedMotion: null,
  onError: null
}

function run(opts){
    opts = opts || {};
    opts = Object.assign(defaultOptions, opts);

    camera = new PiMotion(opts);

    camera.on('ready', function(){
        console.log('Camera ready to detect motions');
        opts.onReady && opts.onReady();
    });

    camera.on('DetectedMotion', function() {
        console.log('Motion detected!');
        opts.onDetectedMotion && opts.onDetectedMotion();
    });

    camera.on('error', function(err){
        console.log('Camera detection error:');
        console.error(err);
        opts.onError && opts.onError();
    });
} 

module.exports = {
    run: run,
    camera: camera
}