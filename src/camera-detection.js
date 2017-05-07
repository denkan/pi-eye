const PiMotion = require('node-pi-motion');
const _ = require('lodash');

var camera,
    closing = false;

const defaultOptions = {
  verbose: false,
  autorestart: false,

  throttle: 10000,
  night: false,
  sensitivity: 100,
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
    
    camera = new PiMotion(pimotionOptions(opts));

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

/**
 * Pick options except nulls
 */
function pimotionOptions(opts){
    opts = opts || {};
    const excludeParams = [
        'onReady',
        'onDetectedMotion',
        'onError'
    ];
    return _.pickBy(opts, (val,key) => excludeParams.indexOf(key)<0);
}


module.exports = {
    run: run,
    close: () => {
        camera && camera.close();
    }
}