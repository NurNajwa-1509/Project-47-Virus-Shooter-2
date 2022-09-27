var bg,bgImg;
var player, shooterImg, shooter_shooting;
var virus2,virus2Img;
var virus1, virus1Img;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var virus1Group;

var bullets = 70;

var gameState = "fight"

function preload()
{
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  virus1Img = loadImage("assets/virus1.png");

  bgImg = loadImage("assets/bg.jpeg");

  virus2Img = loadAnimation("assets/virus2.png");
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,900,800)
bg.addImage(bgImg);
bg.scale = 1.2;
  
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300);

   virus2 = createSprite(780,60);
   virus2.addAnimation("virus2",virus2Img);
   virus2.scale = 0.1;

   //creating sprites to depict lives remaining
   heart1 = createSprite(300,40,20,20);
   heart1.visible = false;
    heart1.addImage("heart1",heart1Img);
    heart1.scale = 0.4;

    heart2 = createSprite(100,40,20,20);
    heart2.visible = false;
    heart2.addImage("heart2",heart2Img);
    heart2.scale = 0.4;

    heart3 = createSprite(1220,40,20,20);
    heart3.addImage("heart3",heart3Img);
    heart3.scale = 0.4;

   bulletGroup = new Group()
   virus1Group = new Group();
}

function draw() 
{
  if(gameState === "fight"){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0)
{
  player.y = player.y-30;
}
if(keyDown("DOWN_ARROW")||touches.length>0)
{
 player.y = player.y+30;
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space"))
{
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  bullet.lifetime = 48;
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space"))
{
  player.addImage(shooterImg);
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0)
{
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(virus1Group.isTouching(bulletGroup)){
  for(var i=0;i<virus1Group.length;i++){     
      
   if(virus1Group[i].isTouching(bulletGroup)){
        virus1Group[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}

//destroy zombie when player touches it
if(virus1Group.isTouching(player)){

 for(var i=0;i<virus1Group.length;i++){     
      
  if(virus1Group[i].isTouching(player)){
       virus1Group[i].destroy()
       } 
 
 }
}
 
 //calling the function to spawn virus
 enemy();
  }

drawSprites();

//destroy virus and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,90)
  virus1Group.destroyEach();
  player.destroy();

}

//destroy virus and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,80)
  virus1Group.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,80)
  virus1Group.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

textSize(50);
    stroke("black");
    fill("brown");
    text("#ELIMINATE COVID-19 ", 200,80);
}

//creating function to spawn virus
function enemy()
{
  if(frameCount % 70 === 0)
  {
    //giving random x and y positions for virus to appear
    virus1 = createSprite(random(1300,1100),random(100,500),40,40);
    virus1.addImage(virus1Img);
    virus1.scale = 0.20;
    virus1.velocityX = -3;
    virus1.debug= true;
    virus1.setCollider("rectangle",0,0,400,400);
    virus1.lifetime = 300;
   virus1Group.add(virus1);
  }
}