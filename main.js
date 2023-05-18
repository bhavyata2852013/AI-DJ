song = "";
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    image(video,0,0,600,500);

    if (scoreLeftwrist > 0.2) {
        fill("#006666");
    stroke("#006666");
    circle(leftwristx,leftwristy,20);
    inNumberleftwristy = Number(leftwristy);
    remove_decimal = floor(inNumberleftwristy);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume :" + volume;
    song.setVolume(volume);
    }

    if (scoreRightwrist > 0.2) {
        fill("#006666");
        stroke("#006666");
        circle(rightwristx,rightwristy,20);

        if (rightwristy > 0 && rightwristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
            song.rate(0.5);
        }

        else if (rightwristy > 100 && rightwristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed : 1x";
            song.rate(1);
        }

        else if (rightwristy > 200 && rightwristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed : 1.5x";
            song.rate(1.5);
        }
    
        else if (rightwristy > 300 && rightwristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed : 2x";
            song.rate(2);
        }

        else if (rightwristy > 400 && rightwristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed : 2.5x";
            song.rate(2.5);
        }
    }
}

function preload() {
    song = loadSound("music2.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("The model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;

        console.log("leftwristx = " + leftwristx + " leftwristy =" + leftwristy);
        console.log("rightwristx = " + rightwristx + " rightwristy =" + rightwristy);

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("scorLeftwrist :" + scoreLeftwrist);

        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("scorRightwrist :" + scoreRightwrist);
    }
}

leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;