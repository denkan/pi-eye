const RaspiCam = require("raspicam");

const opts = { 
    mode: "photo",
    output: "./shots/photo.jpg",
    encoding: "jpg",
    width: 640,
    height: 480,
    quality: 90
}
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
