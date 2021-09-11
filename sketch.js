var PLAY=1;
var END=0;
var gameState = PLAY;

var BoyImage,Boy; 
var CityImage,City,invisiblePath;
var car1Image,car2Image,car1,car2;
var gameOverImage,gameOver;

var CarsGroup;

var score;

function preload(){

  BoyImage = loadImage("skateboarder.jpg");
  car1Image = loadImage("Car1.jpg");
  car2Image = loadImage("Car2.jpg");
  CityImage = loadImage("City.png");
  gameOverImage = loadImage("gameOver.png");

}

function setup() {
 createCanvas(600,200);

 Boy = createSprite(50,160,20,50);
 Boy.addImage("skateboarding", BoyImage);
 
 Boy.scale=0.5;

 City = createSprite(200,180,400,20);
 City.addImage("City",CityImage);
 City.x=City.width/2;

 gameOver = createSprite(300,100);
 gameOver.addImage("GAMEOVER",gameOverImg);

 gameOver.scale=0.5;

 invisiblePath = createSprite(200,190,400,10)
 invisiblePath.visible = false;

 CarsGroup = createGroup();

 Boy.setCollider("rectangle",0,0,Boy.width,Boy.height);
 Boy.debug = true;

 score = 0;

}

function draw() {
 background(180); 

 
 text("Score: "+ score, 500,50);

 if(gameState === PLAY){

  gameOver.visible = false;
  
  City.velocityX = -(4 + 3* score/100)
  
  score = score + Math.round(getFrameRate()/60);
  
  if (City.x < 0){
    City.x = City.width/2;
  }
  
  
  if(keyDown("space")&& Boy.y >= 100) {
      Boy.velocityY = -12;      
  }
  
  Boy.velocityY = Boy.velocityY + 0.8

   spawnCars();
    
   if(CarsGroup.isTouching(Boy)){
       
       gameState = END;

   }
 }
 else if (gameState === END) {
  gameOver.visible = true;
  
  City.velocityX = 0;
  Boy.velocityY = 0
  CarsGroup.setVelocityXEach(0);
 
  Boy.destroy();
  City.destroy();
  CarsGroup.destroyEach();

 }
 
  Boy.collide(invisiblePath);


 drawSprites();
}

function spawnCars(){
  if (frameCount % 60 === 0){
    var Cars = createSprite(600,165,10,40);
    Cars.velocityX = -(6 + score/100);
    
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: Cars.addImage(car1Image);
               break;
       case 2: Cars.addImage(car2Image);
               break;
       default: break;
     }           
  Cars.scale = 0.5;
  Cars.lifetime = 300;

  CarsGroup.add(Cars);
    
    }
  }
