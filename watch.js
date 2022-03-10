img = ""
status7 = ""
objects = [];

function preload() {
    img = loadImage("watch.jpg")
}

function setup() {
    canvas = createCanvas(774, 424);
    canvas.center();
    detector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("detectionstatus").innerHTML = "Status = Detecting Objects";
}

function modelLoaded() {
    console.log("modelloaded");
    detector.detect(img, gotResults);
    status7 = true;
}

function draw() {
    image(img, 0, 0, 774, 424);
    if (status7 != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("detectionstatus").innerHTML = "Status = Objects Detected";
            percentage = floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + "" + percentage + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        document.getElementById("detectioncount").innerHTML = "Number of Objects is =" + objects.length;
    }
}

function bye(){
    window.location = "home.html"
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}