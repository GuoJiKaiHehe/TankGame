var map=document.getElementById('Map');  
var mapCxt=map.getContext('2d');
  /**
   *   地图大小  
   *   坦克不能重叠；
   */
function MyPanel(){}
MyPanel.imgPath="./boom.gif";
MyPanel.imgBoom=null;
MyPanel.boom=[];
MyPanel.timer=null;
MyPanel.isBoomFlag=true;
MyPanel.map=map;
MyPanel.mapCxt=mapCxt;
MyPanel.obstacles=[];
MyPanel.obstacleSize=2;
MyPanel.enemyTank=[];   //敌人数量；
MyPanel.enemyTankSize=Record.enemyTankSize;  //3
MyPanel.hero=null;
MyPanel.drawTank=function(x,y,direct,type){
  var  mapCxt=this.mapCxt;
    switch(type){
        case 0:
           mapCxt.fillStyle="orange";  //英雄
            break;
        case 1:
           mapCxt.fillStyle="cyan";
          
            break;
    }

     switch(direct){
        case 1:    // 上
        case 2:   // 下
             
             mapCxt.fillRect( x, y, 5 , 30);
             mapCxt.fillRect( x+15 , y,5,30);
             mapCxt.fillStyle="#0099FF";
             mapCxt.fillRect( x + 6, y + 5, 8 , 20);
             mapCxt.fillStyle="#000";
             mapCxt.arc( x + 10, y + 15,4,0,Math.PI*2,true);
             mapCxt.fill();
             mapCxt.strokeStyle="blue";
             mapCxt.lineWidth="1.5";
             //开始画炮筒
             mapCxt.beginPath();
             
             mapCxt.moveTo( x + 10, y + 15);
             if(direct == 1 ){
                 mapCxt.lineTo( x + 10 , y );
             }else if( direct == 2 ){
                mapCxt.lineTo( x + 10, y + 30);
             }
             mapCxt.closePath();
             mapCxt.stroke();
             //结束画炮筒
        break;
        case 3:  //左边
        case 4:  //右边
           
         
             mapCxt.fillRect(x , y,30,5);
             mapCxt.fillRect( x,  y + 15,30,5);

             //画身体
             mapCxt.fillStyle="#0099FF";
             mapCxt.fillRect( x + 5, y + 6,20,8);
             mapCxt.fillStyle="#000";
             mapCxt.arc( x + 15, y+10,4,0,Math.PI*2,true);
             mapCxt.fill();
             mapCxt.strokeStyle="blue";
             mapCxt.lineWidth="1.5";
             //结束画身体
             //
             //开始画炮筒
             mapCxt.beginPath();
             
             mapCxt.moveTo( x + 15, y + 10);
             if( direct == 4 ){
             mapCxt.lineTo( x+30, y+10);
             }else if( direct == 3){
                mapCxt.lineTo( x, y + 10);
              }
             mapCxt.closePath();
             mapCxt.stroke();
             //结束画炮筒
            break;
    } 
    //画障碍物；
    // this.drawObstacle();   

}
MyPanel.drawObstacle=function(){
    //长200  高50；
    //距离左边100
    for(var i=0;i<this.obstacleSize;i++){

    }
    this.fillRect();

}
/**
 *   画子弹；
 * @return {[type]} [description]
 */
MyPanel.drawBullet=function(bullet){
    // this.drawBullet(bts.get(j).getX(), bts.get(j).getY(), g, bts.get(j).getDirect(), bts.get(j));
    this.mapCxt.fillStyle=bullet.color;
    this.mapCxt.fillRect(bullet.x , bullet.y ,bullet.width , bullet.height );

}
MyPanel.drawBoom=function(){

}
MyPanel.start=function(){
    //开始 画板线程；
    this.timer=setTimeout(function(){

    }, 50);
}


MyPanel.init=function(){

    //初始化英雄；
    this.hero=new Hero(100,150, 1, 0 );
    
    //初始化敌人；
    for(var i=1;i<=this.enemyTankSize;i++){
        this.enemyTank.push(new EnemyTank( i * 30, 0 , 2 ,1,this));

    }
    this.paint();
    this.map.focus();
    this.keyPressed();
}

MyPanel.paint=function() {
    this.mapCxt.clearRect(0,0,400,300);
    if(this.hero.isLive){ //如果英雄 为真 就画；

        this.drawTank(this.hero.x , this.hero.y , this.hero.direct , this.hero.type);
        if(this.hero.bullets.length>0){
            //说明英雄有子弹了；循环画出子弹；
            for(var i=0;i<this.hero.bullets.length;i++){
                if(this.hero.bullets[i].isLive){
                    this.drawBullet(this.hero.bullets[i]);
                    //判断是否打中敌人；
                    for(var j=0;j<this.enemyTankSize;j++){
                        xs=this.hero.bullets[i].x; //子弹的x；
                        ys=this.hero.bullets[i].y;//子弹的 y
                        xe=this.enemyTank[j].x ;  //敌人的 x
                        ye=this.enemyTank[j].y  ; //敌人的y
                        this.isHited(xs, ys, xe, ye , this.enemyTank[j] ,j, this.hero.bullets[i] ,i );
                    }
                }else{
                    // alert('');
                    this.hero.bullets.splice(i,1);
                }
            }
        }
    }

    for( var i=0;i<this.enemyTankSize;i++){
        this.drawTank(this.enemyTank[i].x,this.enemyTank[i].y , this.enemyTank[i].direct , this.enemyTank[i].type);
        if(this.enemyTank[i].bullets.length>0){
            //代表有子弹了；
            var blsArr=this.enemyTank[i].bullets;
            for(var j=0;j<blsArr.length;j++){
                if(blsArr[j].isLive){
                     //是否打中英雄；
                     this.drawBullet(blsArr[j]);
                     xe=this.hero.x; //子弹的x；
                     ye=this.hero.y;//子弹的 y
                     xs=blsArr[j].x ;  //敌人的 x
                     ys=blsArr[j].y  ; //敌人的y
                     this.isHited(xs, ys, xe, ye ,this.hero ,i, blsArr[j],j );
                }else{
                    blsArr.splice(j,1);
                }

            }

        }
       
    }

    //判断是否有炸弹；
    if(this.boom.length > 0  ){
        this.baozha();
    }

}
MyPanel.isHited=function(xs, ys, xe, ye , tk ,j, bullet ,index ){
    //判断是否打中敌人；
    switch(tk.direct){
            case 1: //上
            case 2:  //下
                if(xs > xe  && ys > ye && xs < xe + 20 && ys < ye + 30){
                    //this.ets.get(index).getBls().setSize(0);
                    if(tk instanceof EnemyTank){
                       
                         tk.isLive=false; //坦克死亡；
                        this.enemyTank.splice(j,1); //移除坎坷
                        //tk.getBls().remove(bindex);
                       this.enemyTankSize--; //敌人坎坷数量减少；
                       Record.setIncKilled();

                      //  enSize--;
                        // Record.reduceEnemy();
                    }else{
                        //是英雄被击中了
                         if(this.hero.isLive){
                        this.hero.isLive=false; //打中我的子弹 死亡；
                        console.log('hero die')
                        alert('英雄死了！')
                        clearInterval(Record.timer);
                      //  System.out.println("hero die");
                        // Record.setMyLife(Record.getMyLife()-1);
                        }
                    }
                    bullet.isLive=false; //子弹死亡；
                    
                    this.boom.push(new Boom(xe+10 , ye+10 , this));  //添加炸弹；
                    
                }
                break;
            case 3:  //左边；
            case 4:  //右边；
                if(xs>xe  && ys>ye  && xs<xe+30 && ys<ye+20){
                    //this.ets.get(index).getBls().setSize(0);
                    if(tk instanceof EnemyTank){
                        //this.ets.remove(index);
                        //tk.getBls().remove(bindex);
                       this.enemyTank.splice(j,1); //移除坎坷
                        tk.isLive=false;
                        // enSize--;
                        this.enemyTankSize--;
                        Record.setIncKilled();
                        // Record.reduceEnemy();
                    }else{
                        if(this.hero.isLive){
                        this.hero.isLive=false;
                         console.log('hero die')
                          alert('英雄死了！')
                          clearInterval(Record.timer);
                      //  System.out.println("hero die");
                        // Record.setMyLife(Record.getMyLife()-1);
                        }
                    }
                    
                    bullet.isLive=false;
                    
                     this.boom.push(new Boom(xe+10 , ye+10 , this));  //添加炸弹；
                    
                }
                break;
        }

}


MyPanel.baozha=function(){
    //爆炸；
    for(var i=0;i<this.boom.length;i++){
        var _this=this;
        if(this.boom[i].isLive){
            // draw( _this.boom[i].x , _this.boom[i].y)
            if(_this.isBoomFlag){
                _this.isBoomFlag=false;
                //第一次爆炸；
               // alert(i);
                      _this.imgBoom=document.getElementById("boom");
                      _this.imgBoom.style.left=_this.boom[i].x+"px";
                      _this.imgBoom.style.top= _this.boom[i].y+"px" ;
                      _this.imgBoom.style.display="block";
                    /* (function(i){
                      
                       
                         //   alert(i);
                            _this.imgBoom=document.getElementById("boom");
                            console.log(_this.boom[i]);
                            // console.log('zhadan x:'+_this.boom[i].x+"zhadan y:"+ _this.boom[i].y)
                            _this.mapCxt.drawImage(_this.imgBoom, _this.boom[i].x , _this.boom[i].y , 30, 20);   
                    
                     })(i);*/

                    /* imgLoaded(this.imgPath,function(){

                     })*/
                             

            }else{
               // console.log(_this.imgBoom);
                     _this.imgBoom.style.left=_this.boom[i].x+"px";
                    _this.imgBoom.style.top= _this.boom[i].y+"px" ;   
                     _this.imgBoom.style.display="block";         
                 // _this.mapCxt.drawImage(_this.imgBoom, _this.boom[i].x , _this.boom[i].y , 30, 20);   
              

            }
           
           
          
        } else{
            this.boom.splice(i,1);
              _this.imgBoom.style.display="none";         
        }
       
    }
    
}


MyPanel.keyPressed=function(){
     var _this=this;
     var hero = this.hero;
     document.onkeydown=function(e){
     /*   keycode 87 = w W
          keycode 83 = s S 
          keycode 65 = a A 
          keycode 68 = d D 
          event.keyCode值為37﹐38﹐39﹐40對應按下的方向鍵分別是 左﹐上﹐右﹐下 
     */
    //32
    if(e.keyCode==32 || e.keyCode==74){  //发射子弹，空格；
      
        hero.bullets.push(new Bullet( hero.x,hero.y,hero.direct ,_this));
    }
    if(e.keyCode==37 || e.keyCode == 65){//zuo
       
        hero.moveLeft();
    }else if(e.keyCode==38 || e.keyCode == 87 ){//top
    
         hero.moveUp(); 
    }else if(e.keyCode==39 || e.keyCode == 68 ){// right
         
         hero.moveRight();
    }else if(e.keyCode==40 || e.keyCode == 83){// bottom
        
         hero.moveDown();
    }

 }

}
function draw(tank){
 
    if(tank.x<=0){
        tank.x=0;
    }else if(tank.x>=map.width-30){
        tank.x=map.width-30;
    }
    if(tank.y<=0){
        tank.y=0;
    }else if(tank.y>=map.height-30){
        tank.y=map.height-30;
    }
    
    switch(tank.dir){
        case 'up':
        case 'down':
             mapCxt.fillStyle="orange";
             mapCxt.fillRect(tank.x,tank.y,5,30);
             mapCxt.fillRect(tank.x+15,tank.y,5,30);
             mapCxt.fillStyle="#0099FF";
             mapCxt.fillRect(tank.x+6,tank.y+5,8,20);
             mapCxt.fillStyle="#000";
             mapCxt.arc(tank.x+10,tank.y+15,4,0,Math.PI*2,true);
             mapCxt.fill();
             mapCxt.strokeStyle="blue";
             mapCxt.lineWidth="1.5";
             //开始画炮筒
             mapCxt.beginPath();
             
             mapCxt.moveTo(tank.x+10,tank.y+15);
             if(tank.dir=='up'){
             mapCxt.lineTo(tank.x+10,tank.y);
             }else if(tank.dir=='down'){
                mapCxt.lineTo(tank.x+10,tank.y+30);
              }
             mapCxt.closePath();
             mapCxt.stroke();
             //结束画炮筒
        break;
        case 'left':
        case 'right':
           
             mapCxt.fillStyle="orange";
             mapCxt.fillRect(tank.x,tank.y,30,5);
             mapCxt.fillRect(tank.x,tank.y+15,30,5);

             //画身体
             mapCxt.fillStyle="#0099FF";
             mapCxt.fillRect(tank.x+5,tank.y+6,20,8);
             mapCxt.fillStyle="#000";
             mapCxt.arc(tank.x+15,tank.y+10,4,0,Math.PI*2,true);
             mapCxt.fill();
             mapCxt.strokeStyle="blue";
             mapCxt.lineWidth="1.5";
             //结束画身体
             //
             //开始画炮筒
             mapCxt.beginPath();
             
             mapCxt.moveTo(tank.x+15,tank.y+10);
             if(tank.dir=='right'){
             mapCxt.lineTo(tank.x+30,tank.y+10);
             }else if(tank.dir=='left'){
                mapCxt.lineTo(tank.x,tank.y+10);
              }
             mapCxt.closePath();
             mapCxt.stroke();
             //结束画炮筒
            break;
    } 
}







/*  if (this.map == null) return false;
    ctx=this.mapCxt;
    ctx.clearRect(0,0,640,480);
    ctx.save();
    ctx.translate(150,100); 
    var rg = ctx.createRadialGradient(0, 0, 0, 100,0,100);
    rg.addColorStop(0, '#ff0');
    rg.addColorStop(1, '#f00');
    ctx.lineCap = "round";
    ctx.strokeStyle=rg;

    for(var i=1;i<20;i++){
    if(booms[i] && booms[i].id){
        spread(booms[i]);
    }else{
        var start=random(5,15);
        var height=random(5,25);
        var angle=random(10,360);
        var width=random(1,3);
        booms[i]=new boom(i,context,start,height,angle,width);
    }
    drawLine(booms[i]);
    }

    ctx.restore();
   // setTimeout(draw,50);
   */