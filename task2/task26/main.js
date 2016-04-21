 var  canvas=document.getElementById("myCanvas"),
        elements={
            context:canvas.getContext("2d"),
            canvasWidth : canvas.width,
            canvasHeight : canvas.height,
            createButtons: document.querySelectorAll(".createShip"),
            startButtons : document.querySelectorAll(".startFly"),
            stopButtons : document.querySelectorAll(".stopFly"),
            destroyButtons : document.querySelectorAll(".destroyShip"),
            control:document.querySelector(".control"),
            playAnimation:true,
            ships : []
 };
//绘制初始图形
function draw(){
              var canvas1 = document.getElementById("myCanvas1");
              var context1 = canvas1.getContext("2d");
              context1.beginPath();
              context1.arc(450,324,30,0,2*Math.PI,true);
              context1.fillStyle="#FFA74F";
             context1.fill();//绘制圆
             context1.closePath();
             for(var i=1;i<5;i++){
                    context1.beginPath();
                    context1.arc(450,324,75*i,0,2*Math.PI,true);
                    context1.strokeStyle="#00BB00";
                    context1.stroke();//绘制圆
                    context1.closePath();

             }
}
//创建飞船函数
function createShip(index){
        var context=elements.context,
              x=495+75*index;
        context.beginPath();
        context.fillStyle="#00BB00";
        context.fillRect(x,324,60,20);
        context.fill();
        context.closePath();
        elements.ships.push(new Shape(450,324,75*index,10,index));
}
//获取飞船信息函数
function Shape (x, y,radius,angle,index) {
            this.x = x;
            this.y = y;
            this.radius=radius;
            this.angle = angle;
            this.index=index;
}
//摧毁飞船函数
function destroyShip(index){
    var context=elements.context,
          canvasWidth=elements.canvasWidth,
          canvasHeight=elements.canvasHeight,
          ships=elements.ships;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for(var j=0;j<ships.length;j++){
          if(ships[j].index==index){
                ships.splice(j,1);
          }
    }
    for(var i=0;i<ships.length;i++){
        context.beginPath();
        context.fillStyle="#00BB00";
        context.fillRect(ships[i].x,ships[i].y,60,20);
        context.fill();
        context.closePath();
    }

}
//控制台鼠标点击事件处理程序
function buttonClick(){
        var target=event.target;
        if(target.nodeName="BUTTON"){
                var index=parseInt(target.parentNode.id.replace(/.+-(\d)/,"$1"));
                switch (target.className){
                  case "createShip":
                          createShip(index-1);
                          break;
                    case "startFly":
                           animate(index-1)();
                           break;
                    case "stopFly":
                    case "destroyShip":
                          destroyShip(index-1);
                }
        }
}
//给控制台绑定鼠标点击事件处理程序
elements.control.onclick=buttonClick;
//飞船飞行动画
function animate(index) {
             return function shipFly(){
                    var ships=elements.ships,
                          shipsLength = ships.length,
                          context=elements.context,
                          canvasWidth = elements.canvasWidth,
                          canvasHeight = elements.canvasHeight,
                          x,
                          y;
                   context.clearRect(0, 0, canvasWidth, canvasHeight);
                   for (var i = 0; i < shipsLength; i++) {
                          if(ships[i].index==index){
                                var tempShip=ships[i];
                                x = ships[i].x+(ships[i].radius*Math.cos(ships[i].angle*(Math.PI/180)));
                                y = ships[i].y+(ships[i].radius*Math.sin(ships[i].angle*(Math.PI/180)));
                                      ships[i].angle += 10;
                                if (ships[i].angle > 360) {
                                      ships[i].angle = 0;
                                }
                          }else{
                                x=ships[i].x;
                                y=ships[i].y;
                          }
                          context.beginPath();
                          context.fillStyle="#00BB00";
                          context.fillRect(x,y,60,20);
                          context.fill();
                          context.closePath();
                   }
                   if (elements.playAnimation) {
                          setTimeout(animate(index), 33);
                    }
              }
}

 function init() {
            var canvas = elements.canvas,
                  context = elements.context,
                  canvasWidth = elements.canvasWidth,
                  canvasHeight = elements.canvasHeight,
                  createButton = elements.createButtons,
                  startButtons = elements.startButtons,
                  stopButtons = elements.stopButtons;
            shapes.push(new Shape(150, 150, 100,5));
            shapes.push(new Shape(300, 300, 100,10));



            startButton.onclick=function() {
                    this.disabled="disabled";
                    stopButton.disabled="";
                    playAnimation = true;
                    animate();
            };
            stopButton.onclick=function() {
                    this.disabled="disabled";
                    startButton.disabled="";
                    playAnimation = false;
            };
            animate();
}
draw();