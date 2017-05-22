function Record(){}

Record.enemyTankSize=10;

Record.score=0;
Record.killedCount=0;
Record.init=function(){

}
Record.setIncKilled=function(){
   Record.killedCount++;
   killedCount=document.getElementById("killedCount");
   killedCount.innerHTML=Record.killedCount;
}
Record.timerDom=document.getElementById("timer");
Record.timerCount=0;
Record.timer=setInterval(function(){
    Record.timerCount++;
    seconds=parseInt(Record.timerCount%60);

    minute=parseInt(Record.timerCount/60);
    var timeStr=minute+"分"+seconds+"秒";
    Record.timerDom.innerHTML=timeStr;

}, 1000)