function Boom(x , y , mp){
    this.x=x;
    this.y=y;
    this.mp=mp;

    this.isLive=true;
    this.baozha=function(){

    }
    this.count=0;
    var _this=this;
    this.timer=setInterval(function(){
        _this.count++;
        if(_this.count>=30){
          _this.isLive=false;
          clearInterval(_this.timer);  
          _this.mp.paint();  
        }
        _this.mp.paint();
      //  console.log('zhengzaihua')
    }, 20);
}