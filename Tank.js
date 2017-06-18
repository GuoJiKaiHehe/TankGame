/**
 * 
 * @param {[type]} x  [description]
 * @param {[type]} y [description]
 * @param {[type]} direct  1 上 2下 3 左  4 右
 * @param {[type]} type 0 是英雄，，1是Enemy
 * 
 */
function Tank(x , y , direct,type,speed){
    this.color="cyan";
    this.bullets=[];  //存放子弹；

    this.direct=direct == undefined ? 1 : direct;

    this.type=type == undefined ? 1 : type;

    this.speed=speed == undefined ? 2 : speed;

    this.isLive=true;   //生存

    /**
     *   坦克向上
     * @return {[type]} [description]
     */
     this.moveUp=function(){
        this.y -= this.speed;
        this.direct=1;

    
    }
     /**
     *   坦克向下
     * @return {[type]} [description]
     */
    
    this.moveDown=function(){
        this.y+=this.speed;
        this.direct=2;
        
      //  flash_map(this);
    }

     /**
     *   坦克向左边
     * @return {[type]} [description]
     */
    this.moveLeft=function(){
        this.x-=this.speed;
        this.direct=3;
       
    }

     /**
     *   坦克向右边
     * @return {[type]} [description]
     */
    this.moveRight=function(){
    this.x+=this.speed;
     this.direct= 4;
    
    }

    this.move=function(){
        //坦克移动；
        
    }
}