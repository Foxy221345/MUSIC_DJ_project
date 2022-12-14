song1="";
song2="";

leftWristX=0;
LeftWristY=0;

rightWristX=0;
rightWristY=0;

score_left_wrist=0;
score_right_wrist=0;

song1_status="";
song2_status="";

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,450);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
 
    song1_status= song1.isPlaying();
    console.log("song1_status= "+ song1_status);
 song2_status=song2.isPlaying();
 console.log("song1_status= "+ song1_status);
    fill("#8442a1");
    stroke("#561e6e");

    if(score_left_wrist>0.2)
{

circle(leftWristX, leftWristY,20);

song2.stop();
if(song1_status==false)
{
 song1.play();
 document.getElementById("song").innerHTML="playing Harry Potter Theme";
}
}

if(score_right_wrist>0.2)
{

circle(rightWristX, rightWristY,20);

song1.stop();

if(song2_status==false)
{

 song2.play();
 document.getElementById("song").innerHTML="playing Peter Pan Theme";
}
}
   

}

function modelLoaded()
{
    console.log("PoseNet model is initialized");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        //console.log("lefWristX = " + leftWristX+"leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        //console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("score_rightWristX = " + score_right_wrist );

    }
}

function play()
{ song.play();
  song.setVolume(1);
  song.rate(1); 
}
