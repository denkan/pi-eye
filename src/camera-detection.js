const PiMotion = require('node-pi-motion');

var camera,
    closing = false;

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

    closing = false;
    
    camera = new PiMotion(opts);

    camera.on('ready', function(){
        if(closing) return;
        console.log('Camera ready to detect motions');
        opts.onReady && opts.onReady();
    });

    camera.on('DetectedMotion', function() {
        if(closing) return;
        console.log('Motion detected!');
        opts.onDetectedMotion && opts.onDetectedMotion();
    });

    camera.on('error', function(err){
        if(closing) return;
        console.log('Camera detection error:');
        console.error(err);
        opts.onError && opts.onError();
    });
} 

function close(){
    if(closing) return;
    if(camera){
        console.log('Detection closing...');
        camera.close();
        closing = true;

    } else {
        console.log('Detection: Nothing to close')
    }
}

module.exports = {
    run: run,
    close: () => {
        camera && camera.close();
    }
}