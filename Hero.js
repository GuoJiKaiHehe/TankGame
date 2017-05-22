 
 function Hero(x,y,direct,speed){
    Tank.call(this);  //继承坦克类；
    this.x=x;
    this.y=y;
    this.dir=direct ? direct : 1 ;
    this.type = 0 ;
    this.speed=speed ? speed : 4;
    this.color="orange";
       
   
        
}




/*function EnemyTank(x,y,dir){
   //  // tank.call(this,x,y,dir);
   // this=new Hero(x,y,dir);
   // this.tank(x,y,dir)
   this._extends(new Hero(x,y,dir));
}*/

/*Object.prototype._extends=function(obj){
    for(var attr in obj){
        this[attr]=obj[attr];
    }
}*/