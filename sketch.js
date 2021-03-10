
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime;
var forest,forestImg;
var gameState = "PLAY";
function preload(){
  
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  forestImg=loadImage("jungle.jpg");
}

function setup() {
  
createCanvas(600,300);
  
 forest=createSprite(300,300);
forest.addImage("forest",forestImg);
  forest.velocityX=-2;  
 
monkey= createSprite(50,26,20,20) ; 
ground= createSprite(500,280,1000,10) ; 
  
  ground.velocityX = -6
  
   monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
 
  score=0;
  survivalTime=0;
  
   bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground.visible=false;
  
  monkey.setCollider("circle",0,100,100);
 // monkey.debug = true;
}


function draw() {
  background("white");
  if (gameState==="PLAY"){
    
 
 
  if (forest.x < 80){
      forest.x = forest.width/2;
    }
    
   if (ground.x < 100){
      ground.x = ground.width/2;
    }
 
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -20;
    }
  monkey.velocityY = monkey.velocityY + 1.1
  
   if (monkey.isTouching(bananaGroup)){
    score=score+2;
   
     bananaGroup.destroyEach();
  }
   
  obstacles();
  food();

    if(obstacleGroup.isTouching(monkey)){ 
       gameState="END";
    
   forest.visible=false;
     
    }
  }
   if  (gameState==="END"){
    background("black");
      fill("red");
  textSize(28);
    text("GAME OVER",260,100,30);
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    forest.velocityX=0;
    
  }
 drawSprites();
  
   textSize(20);
 fill("black");
   text( "Score "+score,100,70);
  
  textSize(28);
  fill("black");
  survivalTime=Math.round(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
  
  
}

function obstacles(){
  
   if (frameCount % 100 === 0) {
    var obstacle = createSprite(650,240,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -8;
     obstacle.scale=0.25
     obstacle.lifetime=120;
   obstacleGroup.add(obstacle);
    obstacle.depth=monkey.depth;
     monkey.depth=monkey.depth+1;
     
     console.log(obstacle.depth);
      console.log(monkey.depth);
  }
}

function food(){
  
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,100,10,10);
     banana.y = Math.round(random(70,180));
    banana.addImage(bananaImage);
    banana.velocityX = -10;
    banana.scale=0.05;
      banana.lifetime=120;
    
   bananaGroup.add(banana);
}

}







