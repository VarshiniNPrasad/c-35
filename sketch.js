var ball;
var database,ballPosition;

function setup(){
  database=firebase.database();
    
  createCanvas(500,500);
  ball = createSprite(250,250,10,10);
  ball.shapeColor = "red";

 //Reading the DB
 //1.Refer to the node - .ref()
 //2.create listener - .on()
 //3.retrieve- .val()
 //4.save it
  var ballP=database.ref('ball/position');
  ballP.on("value",readPosition)


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
  //writing the data
  //1.Refer to DB - .ref()
  //2.update .set() .update()
   database.ref('ball/position').set({
     x:ballPosition.x+x,
     y:ballPosition.y+y
   })
}

function readPosition(data){
  ballPosition = data.val(); //x,y value from DATABASE
  console.log(ballPosition);

  //giving DB values to ball Sprite
  ball.x=ballPosition.x;
  ball.y=ballPosition.y;
}