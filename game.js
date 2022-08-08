var buttonColors=["red","blue","green","yellow"];
var pattern=[];
var userClickedPattern=[];
var gameStarted=false;
var level=0;

$(".btn").on("click",function(){
  if(!gameStarted) return;
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown",function(){
  if(!gameStarted){
    $("h1").text("Level 0");
    nextSequence();
    gameStarted=true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]!=pattern[currentLevel]){
    $("body").addClass("game-over");
    $("h1").text("Game Over! Press A key to start");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    resetEveryThing();
    return;
  }
  if(currentLevel==pattern.length-1){
    setTimeout(function(){
      level++;
      nextSequence();
    },1000);
  }
}

function playSound(color){
  var audio=new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function resetEveryThing(){
  gameStarted=false;
  level=0;
  pattern=[];
  userClickedPattern=[];
}

function nextSequence(){
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*3+1);
  var randomChosenColor=buttonColors[randomNumber];
  pattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("h1").text("Level "+level);
}
