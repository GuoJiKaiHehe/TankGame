var booms={};
var boom_timer=null;
function draw_boom(bx,by) {
   // alert('')
    var context = mapCxt;      
    //context.clearRect(0,0,640,480);
    //context.save();
    context.translate(bx,by); 
      // context.clearRect(0,0,640,480);
    var rg = context.createRadialGradient(0, 0, 0, 100,0,100);
    rg.addColorStop(0, '#ff0');
    rg.addColorStop(1, '#f00');
    context.lineCap = "round";
    context.strokeStyle=rg;
   
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
    
   // context.restore();
    //boom_timer=setTimeout(draw_boom,50);
}

function spread(boom){
    boom.start+=5;
    if(boom.height>3){
        boom.height-=3;
        boom.angle+=1;
    }   
}

function boom(id,ctx,start,height,angle,width){
    this.id=id;
    this.ctx=ctx;
    this.start=start;
    this.height=height;
    this.angle=angle;
    this.width=width;
    this.maxheight=3*(start+height);
}

function drawLine(boom){
    if(boom.start+boom.height<boom.maxheight){
        boom.ctx.lineWidth = boom.width;
        boom.ctx.save();
        boom.ctx.rotate(Math.PI*2/360*boom.angle)
        boom.ctx.beginPath();
        
        boom.ctx.moveTo(boom.start,0);
        
        boom.ctx.lineTo(boom.start+boom.height,0)
        boom.ctx.stroke();
        boom.ctx.restore();
    }
}

function random(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}