var trex,ground,trexrunning,ground1,ground2,cloud,cloudimg,CloudsGroup,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,ObstaclesGroup,count,trexcollider;

var gameOver,gameOverimg,restart,restart1;

var gamestate = "play"

 localStorage["Highscore"]=0;
 
function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  ground1=loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  trexcollider=loadImage("trex_collided.png")
  gameOverimg=loadImage("gameOver.png")
  restart1=loadImage("restart.png")
  
}


function setup() {
  createCanvas(600,200);
  
  trex=createSprite(50,180,20,50)
  trex.addAnimation("running",trexrunning)
  trex.addAnimation("colliding",trexcollider)
  trex.scale=0.5
  
  ground=createSprite(300,180,width,20)
  ground.addImage(ground1)
  
  ground2=createSprite(300,190,width,20)
  ground2.visible=false;
  
  ground.velocityX=-5
  
  CloudsGroup=new Group()
  ObstaclesGroup=new Group()
  count=0
  
  gameOver=createSprite(800,100)
  gameOver.addImage(gameOverimg)
  gameOver.scale=0.5
  
  restart=createSprite(800,140)
  restart.addImage(restart1)
  restart.scale=0.5
}

function draw() {
  background(180);
  text("score="+count,500,50)
  text("Highscore="+localStorage["Highscore"],300,50)
  if(gamestate==="play"){
  
   
  ground.velocityX = - (6 + 3*count/100);
  
  count=count+Math.round(getFrameRate()/60)
  
  if(keyDown("space")){
    trex.velocityY=-13
  }
  trex.velocityY=trex.velocityY+0.8
  if(ground.x<0){
    ground.x=ground.width/2
    
  } 
  
  
  spawnClouds();
  spawnObstacles();
  if(ObstaclesGroup.isTouching(trex)){
  gamestate="end"
  }  
    
    
  }
 else if(gamestate==="end") {
   ground.velocityX=0
   ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
   ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
   trex.velocityY=0
   trex.changeAnimation("colliding",trexcollider)
   gameOver.x=300
   restart.x=300
   
 }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
 trex.collide(ground2)   
  drawSprites();
}

function reset(){
  gamestate="play";
  gameOver.x=800
    restart.x=800
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
   trex.changeAnimation("running",trexrunning)
  if(localStorage["Highscore"]<count){
    localStorage["Highscore"]=count;
    
  }

  
count=0
  
}


function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round( random(1,6));
    
    //obstacle.addImage("obstacle" + rand);
    switch(rand){
       
      case 1:obstacle.addImage(obstacle1);
      break
      case 2:obstacle.addImage(obstacle2);
      break
      case 3:obstacle.addImage(obstacle3);
      break
      case 4:obstacle.addImage(obstacle4);
      break
      case 5:obstacle.addImage(obstacle5);
      break
      case 6:obstacle.addImage(obstacle6);
      break
      default:obstacle.addImage(obstacle6);
      break 
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}


