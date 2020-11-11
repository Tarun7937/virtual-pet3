class Food {
    constructor()
    
{
    this.foodstock = 0;
    this.fedtime = 0;
    this.image = loadImage("images/milk.png");
   
}
display(){
    background("blue");
    var x =50 , y=100
        imageMode(CENTER);
        image(this.image,720,220,70,70)
    if(this.foodstock!=0){
        for(var i  = 0; i <this.foodstock;i++){
            if(i%10==0){
                x=50;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
    
}
bedroom(){
    background(bedroom,200,200,200,200);}

    garden(){
        background(garden,550,500,200,200);
    
    }
    washroom(){
        background(washroom,550,500,200,200);
    
    }


}