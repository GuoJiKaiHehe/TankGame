//子弹类；
function Bullet(x,y,dir,mp){
    // console.log(mp);
    this.mp = mp ;  //画板类；
    this.x=x;
    this.y=y;
    this.dir=dir;
    this.timer=null;  // 属于自己的线程；
    this.speed= 4;
    this.color='#000';  //子弹颜色，默认黑色；
    this.size=4;  //默认只能4发子弹；
    this.tank=null;
    this.isLive=true;  // 是否生存
    this.width = 2;
    this.height = 2;
      switch(this.dir){
            case 1:  //上
                this.x+=8;     
                break;
            case 2: //下
                   this.x+=8;
                   this.y+=30;
                
                break;
            case 3: //左边
                 
                   this.y+=8;
               
                break;
            case  4 : //右边
                     this.y+=8
                     this.x+=30;
              
                break;
        }

    this.move=function(){
        var speed =this.speed;
        switch(this.dir){
            case 1: //上
                this.y-=speed;     
                break;
            case 2://下
                   this.y+=speed;  
                
                break;
            case 3://左边
                 
                 this.x-=speed;  
              
          
                break;
            case  4 : //右边
                     this.x+=speed;  
              
                break;
        }
      //  console.log("子弹的x："+this.x+";子弹的y："+this.y);
  
     
    }
 
  
 var  _this=this;
   

this.timer=setInterval(function(){
    var y=_this.y;
    var x=_this.x;
   
        if(y <= 0 || x <= -3 || y >= 300 || x >= 400){
           // alert('')
            console.log("子弹死亡");
            _this.isLive=false; //死亡了；
            clearInterval(_this.timer); //清除线程；
           
        }else{
           _this.move(); 
        }
         
  },50);

   
  
}


