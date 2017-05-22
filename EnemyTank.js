function EnemyTank(x , y , direct,type,mp){
    Tank.call(this);  //继承坦克类；
    this.mp=mp;
    this.x=x;
    this.y=y;
    this.direct=direct ? direct : 1 ;
    
    this.speed=3;
    this.color="orange";
    var count=0;
    var _this=this;
     var randInc=Math.random().toFixed(1);
     if(randInc<0.2){
        randInc=0.2;
     }else if(randInc<0.4){
        randInc=0.4;
     }else if(randInc<0.8){
          randInc=0.8;
     }
     randInc=randInc*100;
    this.timer=setInterval(function(){
        //开始线程；
        // 50-100
       


      count+=randInc;   
        switch(_this.direct){
            case 1:
             
                    _this.y-=_this.speed;
             
                break;
            case 2:
                
                    _this.y+=_this.speed;
           
                break;
            case 3:
              
                    _this.x-=_this.speed;
               
                break;
            case 4:
                
                    _this.x+=_this.speed;
             
                break;
                
        }
                

         if(count%1500==0){
             _this.direct=Math.ceil(Math.random()*4);
        }
          //发射子弹
          
          if(count%3000==0){
            // var randSecond=Math.ceil(Math.random()*4);

            _this.bullets.push(new Bullet(_this.x,_this.y,_this.direct,_this.mp));
          } 

        if(_this.y<0){
            _this.y=0;
        }
        if(_this.y>300-20){
            _this.y=300-20;
        }
        if(_this.x<0){
            _this.x=0;
        }
        if(_this.x>400-20){
            _this.x=400-20;
        }
        if(count>99999){
            count=0;
        }
      
        

        _this.mp.paint();
    }, 100)
}