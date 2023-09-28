const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var ground;
var corda;
var bala;

var ligacao, ligacao1, ligacao2, ligacao3;

var botao;

var balaimg, omnom, omnomc, omnomnormal, omnomt;

var balao;

var scomendo, sbackground, striste, cortar, sopro;

var botao1, botao2, botao3;

var corda1, corda2, corda3;

var estrela1, estrela2, estrela3, estrelav;

function preload()
{
  balaimg = loadImage("bala.png");

  omnomnormal = loadAnimation("omnom.png");

  omnomc = loadAnimation("omnom2.png", "triste2.png");
  omnomc.looping = false;

  omnomt = loadAnimation("triste2.png");

  scomendo = loadSound("eating_sound.mp3");

  

  // sbackground = loadSound("");

  //striste = loadSound()

  sopro = loadSound("air.wav");

  cortar = loadSound("cut.mp3");

  estrela1 = loadImage("star.png");

  estrela2 = loadAnimation("star.png");

  estrelav = loadAnimation("g_star1.png");

  estrela3 = loadImage("one_star.png");
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;


  botao = createImg("botao.png");
  botao.position(223,20);
  botao.size(65,65);
  botao.mouseClicked(cortarcorda);
  
  botao1 = createImg("botao.png");
  botao1.position(1, 40);
  botao1.size(65,65);
  botao1.mouseClicked(cortarcorda1);

  botao2 = createImg("botao.png");
  botao2.position(20, 320);
  botao2.size(65,65);
  botao2.mouseClicked(cortarcorda2);

  botao3 = createImg("botao.png");
  botao3.position(350, 100);
  botao3.size(65,65);
  botao3.mouseClicked(cortarcorda3);

  balao = createImg("balloon.png");
  balao.position(350, 240);
  balao.size(115,100);
  balao.mouseClicked(soprador);

  ground = new Ground(200,680,600,20);

  corda = new Rope(7, {x:250, y:20});
  corda1 = new Rope(8, {x:15, y:70});
  corda2 = new Rope(6, {x:50, y:350 });
  corda3 = new Rope(8, {x:390 , y:140 });
  
  var bala_options = 
  {
    density: 0.001
  }
  
  bala = Bodies.circle(250,255,20, bala_options);

  Matter.Composite.add(corda.body, bala);

  ligacao = new Link(corda, bala);
  ligacao1 = new Link(corda1, bala);
  ligacao2 = new Link(corda2, bala);
  ligacao3 = new Link(corda3, bala);

  //criar o sprite  omnom
  omnom = createSprite(100, 620);
  omnom.addAnimation("normal", omnomnormal);
  omnom.addAnimation("comendo", omnomc);
  omnom.addAnimation("triste", omnomt);

  omnom.changeAnimation("normal");

  omnom.scale = 0.3;

  star = createSprite(200, 400);
  star.addImage(estrela1);
  star.scale = 0.02;

  barra = createSprite(450, 40);
  barra.addAnimation("vazio", estrelav);
  barra.addAnimation("cheio", estrela2);
  barra.scale = 0.1;
  


  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  ground.show();

  corda.show();
  corda1.show();
  corda2.show();
  corda3.show();
  
  
  if (bala != null) 
  {
   image(balaimg, bala.position.x, bala.position.y, 55, 55);
  }
 

  Engine.update(engine);
  

  //bixinho comer
  if (colisao(bala, omnom) == true)
  {
    //trocar a animação
    omnom.changeAnimation("comendo");
    omnom.scale = 0.6;
    scomendo.play();
  }

  //bala pode cair no chao, ele ficar triste
  if (colisao(bala, ground.body) == true)
  {
    omnom.changeAnimation("triste");

  }

  //if (colisao(bala, star, 40) == true)
  //{
    //star.visible = false;
    //barra.changeAnimation("cheio");
    
  //}

 
  //aparecer todos os sprites
  drawSprites();
   
}



function cortarcorda()
{
  corda.break();
  ligacao.detach();
  ligacao = null;
  cortar.play();

}

function cortarcorda1()
{
  corda1.break();
  ligacao1.detach();
  ligacao1 = null;
  cortar.play();

}

function cortarcorda2()
{
  corda2.break();
  ligacao2.detach();
  ligacao2 = null;
  cortar.play();

}

function cortarcorda3()
{
  corda3.break();
  ligacao3.detach();
  ligacao3 = null;
  cortar.play();

}





//colisao entre corpo e sprite

function colisao(body, sprite, x)
{
  if (body !=null)
  {

    //distancia entre os dois objetos
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x)
    {
      World.remove(engine.world, bala);
      bala = null;
      return true;
    }
    else
    {
      return false
    }

  }

  
}


function soprador()
{
  //1° x, y positivos e 2° x , y negativos 
  Matter.Body.applyForce(bala, {x:0 , y:0 }, {x:-0.05 , y:0 })

  sopro.play();
  
}