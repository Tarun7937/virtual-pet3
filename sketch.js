//Create variables here

var database ;
var foodstock;
var foodcount;
var lastfedtime;
var dog , dogimg1,dogimg2;
var bedroom,garden,washroom;

function preload()
{
  //load images here
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  bedroom = loadImage("images/Living Room.png");
  garden = loadImage("images/Garden.png");
  washroom= loadImage("images/Wash Room.png");

}

function setup() {
      createCanvas(500, 500);
      database = firebase.database();
      foodstock = database.ref('food');
      foodstock.on("value",readstock);

      readState =database.ref('gamestate');
      readState.on("value",function(data){
      gameState =data.val();
        })


      lasttimeRef = database.ref('fedtime');
      lasttimeRef.on("value",readtime);



      dog = createSprite(270,420,50,50);
      dog.addImage(dogimg1);
      dog.scale = 0.2
    
      foodobj = new Food()
      feedbutton = createButton("feed the dog");
      feedbutton.position(100,95);
      feedbutton.mousePressed(feedDog)
      
      addfoodbutton =  createButton("add food");
      addfoodbutton.position(200,95);
      addfoodbutton.mousePressed(addFood)

     

}


function draw() { 
  currentTime=hour();

  if(currentTime==(lastfedtime+1)){
    update("Playing");
    foodobj.garden();
  }else if(currentTime==(lastfedtime+2)){
    update("Sleeping");
    foodobj.bedroom();
  }else if(currentTime>(lastfedtime+2) && currentTime<+(lastfedtime+4)){
  update("Bathing");
  foodobj.washroom();
  }else{
    update("Hungry")
    foodobj.display();
  }
  
  if (gameState!="Hungry"){
    feedbutton.hide();
    addfoodbutton.hide();
    dog.remove();
  }else{
    feedbutton.show();
    addfoodbutton.show();
    dog.addImage(dogimg1);
  }

 



  drawSprites();
  //add styles here
 
  fill(255,255,254);
  textSize(15);
  if(lastfedtime>=12){
    text("Last Feed : "+ lastfedtime%12 + " PM", 350,30);
   }else if(lastfedtime==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastfedtime + " AM", 350,30);
   }
 


}
function readstock(data){
  foodcount = data.val()
  console.log(foodcount);
  foodobj.foodstock = foodcount;

}

function writestock (count){
      if(count<0 ){
        count = 0
      }else{

    //count = count - 1
    database.ref('/').update({food:count})
    }

}

function readtime(data){
  lastfedtime = data.val()
  foodobj.fedtime = lastfedtime;
  console.log(lastfedtime)
 // console.log(foodcount);


}

function writetime (lasttime){
    database.ref('/').update({fedtime:lasttime})
  }

function feedDog(){
  dog.addImage(dogimg2);
  foodobj.foodstock--
  foodobj.fedtime = hour();
  database.ref('/').update({
    fedtime:foodobj.fedtime,
    food:foodobj.foodstock
  })
 // writetime(foodobj.fedtime)
 // writestock(foodobj.foodstock)
}

function addFood(){
  dog.addImage(dogimg1);
console.log(foodobj.foodcount);
  foodobj.foodstock++
  writestock(foodobj.foodstock)

}
function readstate(){

}
function update (state){
  database.ref('/').update({gamestate:state})
}
