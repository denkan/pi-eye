const PiMotion = require('node-pi-motion');

const defaultOptions = {
  verbose: true,
  autorestart: true,

  throttle: 200,
  night: false,
  sensitivty: 200,
  threshold : 10,
  sleep: 0.5, // sec

  onDetectedMotion: function(){}
}

function run(opts){
    opts = opts || {};
    opts = Object.assign(defaultOptions, opts);

    const nodePiMotion = new PiMotion(opts);

    nodePiMotion.on('ready', function(){
        console.log('Camera ready to detect motions');
    });

    nodePiMotion.on('DetectedMotion', function() {
        console.log('Motion detected!');
        opts.onDetectedMotion && opts.onDetectedMotion();
    });

    nodePiMotion.on('error', function(err){
        console.log('Camera detection error:');
        console.error(err);
    });
} 

module.exports = {
    run: run
}