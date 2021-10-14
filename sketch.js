var player;
var girl_running;
var bg, bgImage;
var ghost, ghostImg, treasureImg;
var ghostGroup, treasureGroup, spawnObject;
var edges, path;

var distance = 0;
var score = 0;
function preload() {
    girl_running = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png",
        "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png",
        "Run (9).png", "Run (10).png", "Run (11).png", "Run (12).png", "Run (14).png",
        "Run (15).png", "Run (16).png", "Run (17).png",
        "Run (18).png", "Run (19).png", "Run (20).png");
    bgImage = loadImage("bg.jpeg");
    ghostImage = loadImage("ghost-standing.png");
    treasureImg = loadImage("treasure.png");
}

function setup() {
    createCanvas(1300, 750);

    path = createSprite(100, 280);
    path.addImage(bgImage);
    path.velocityX = -5;

    player = createSprite(100, 588, 10, 10);
    player.addAnimation("girl_running", girl_running);
    player.scale = 0.5;

    ghostGroup = new Group();
    treasureGroup = new Group();
    
}

function draw() {
    background(0);

    path.velocityX = -(6 + 2 * distance/150);
    player.y = World.mouseY;

    //for continuous path.
    if(path.x < 0){
      path.x = width/2
    }

    edges = createEdgeSprites();
    player.collide(edges);

    spawnObject = Math.round(random(1, 2));
    if(World.frameCount % 200 === 0){
      if(spawnObject === 1){
        spawnGhost();
      }
      else{
        spawnTreasure();
      }
    }
    
    if(ghostGroup.isTouching(player)){
      ghostGroup.setVelocityXEach(0);
      ghostGroup.setLifetimeEach(-1);
      //path.velocityX = 0;
      //treasureGoup.setVelocityXEach(0);
      //treasureGroup.setLifetimeEach(-1);
    }

    if(treasureGroup.isTouching(player)){
      treasureGroup.setVelocityXEach(0);
      treasureGroup.setLifetimeEach(-1);
    }
    drawSprites();
}

function spawnGhost() {
    //write code here to spawn the ghost
    
      var ghost = createSprite(1200,Math.round(random(500,700)));
      ghost.addImage(ghostImage);
      ghost.scale = 0.5;
      ghost.velocityX = -(6 + 2 * distance/150);
      
       //assign lifetime to the variable
      ghost.lifetime = 200;
      
      //add each cloud to the group
      ghostGroup.add(ghost);
  
    
  }

  function spawnTreasure() {
    //write code here to spawn the ghost
 
      var treasure = createSprite(1200,420,40,10);
      treasure.y = Math.round(random(500,700));
      treasure.addImage(treasureImg);
      treasure.scale = 0.5;
      treasure.velocityX = -(6 + 2 * distance/150);
      
       //assign lifetime to the variable
       treasure.lifetime = 200;
      
      //add each cloud to the group
      treasureGroup.add(treasure);
    
    
  }

