
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

// FIRST CALL TO BEGIN THE GAME
// $(document).click(function(){
//   if (!started) {
//
//     //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//     $("#instructions").remove();
//
//   }
// });
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#instructions").remove();

  }
});

//RESTART GAME AFTER GETTING WRONG ANSWER
function startOver(){
    $("#level-title").html("Game Over! "+ '<br>'+"You got out at Level "+level+'<br>'+"Press Any Key to Restart");
    gamePattern=[];
    level=0;
    started=false;
}
//Checks similarity between userClickedPattern and SequencePattern at every user Clivk
function checkAnswer(k){
    var i=k-1;
    if(userClickedPattern[i]!=gamePattern[i])
    {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $(document.body).addClass("game-over");
        setTimeout(function() {
           $(document.body).removeClass("game-over");
        }, 200);
        startOver();

    }
    else
    {
        console.log("RIGHT");
        if(k===gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }



}

//Just gives the button pressing effect
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
   }, 100);


}

//Plays sound when clicked or while showing the next button
function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

//stores the patter cliked by user

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length);
});


//Creates the random nextSequence
function nextSequence(){
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    setTimeout(function() {
                $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
                playSound(randomChosenColour);
            }, 500);


    //console.log(gamePattern);
}
