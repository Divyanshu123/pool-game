var tableWidth=975,tableHeight=550;
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var table = document.querySelector("#table");
var yellowBall = document.querySelectorAll(".yellow-ball");
var whiteBall = document.querySelector("#white-ball");
var blackBall = document.querySelector("#black-ball");
var redBall = document.querySelectorAll(".red-ball");
var allBalls = document.querySelectorAll(".balls");
var ballStick = document.querySelector("#stick");



class Game{
    constructor(ctx,balls,stick){
      this.ctx = ctx;
      this.balls = balls;
      this.stick = stick;
    }

    draw(){
      this.balls.draw();
      this.stick.draw();

    }

    update(){
      this.balls.update();
    }
}



class Stick{
  constructor(ctx,ballStick,whiteBall){
    this.ctx = ctx;
    this.stick = ballStick;
    this.whiteBall = whiteBall;
    this.length = 300;
    this.width = 150;
  }

  draw(){
     var x = this.whiteBall.position.x-this.length-20;
     var y = this.whiteBall.position.y;
     this.ctx.drawImage(this.stick,x,y,this.length,this.width);
  }
}

class Balls{
  constructor(ctx,balls,table,tableWidth,tableHeight){
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;
    this.radius = 30/2;
    this.balls = balls;
    this.whiteBall = this.balls[8];
    this.blackBall = this.balls[7];
    this.ctx = ctx;
    this.table = table;
    this.friction = .01;
    this.border = 50;

    this.balls[0].position = {x:600,y:275};
    this.balls[9].position = {x:630,y:260};
    this.balls[10].position = {x:630,y:290};
    this.balls[1].position = {x:660,y:245};
    this.balls[7].position = {x:660,y:275};
    this.balls[2].position = {x:660,y:305};
    this.balls[11].position = {x:690,y:230};
    this.balls[3].position = {x:690,y:260};
    this.balls[4].position = {x:690,y:290};
    this.balls[12].position = {x:690,y:320};
    this.balls[5].position = {x:720,y:215};
    this.balls[13].position = {x:720,y:245};
    this.balls[14].position = {x:720,y:275};
    this.balls[15].position = {x:720,y:305};
    this.balls[6].position = {x:720,y:335};
    this.balls[8].position = {x:270,y:275};
    for(let i=0;i<this.balls.length;i++){
      this.balls[i].vel = {x:0,y:0};
    }

  }

  draw(){
    this.ctx.drawImage(this.table,0,0,this.tableWidth,this.tableHeight);
    for(let i=0;i<this.balls.length;i++){
      if(this.balls[i].classList.contains("on-board"))ctx.drawImage(this.balls[i],this.balls[i].position.x-this.radius,this.balls[i].position.y-this.radius,2*this.radius,2*this.radius);
    }
  }


  update(){

    function isColliding(balls,i,j,radius){
      var distance = ((balls[i].position.x-balls[j].position.x)*(balls[i].position.x-balls[j].position.x))+((balls[i].position.y-balls[j].position.y)*
       (balls[i].position.y-balls[j].position.y));

       if(distance<=4*radius*radius) return true;
       else return false;
    }

    function boardIsRest(balls){
      for(var i=0;i<balls.length;i++){
        if(i==8)continue;
        if((Math.round(balls[i].vel.x)!=0 || Math.round(balls[i].vel.y)!=0) && balls[i].classList.contains("on-board")) return false;
      }
      return true;
    }

      if(!this.whiteBall.classList.contains("on-board") && boardIsRest(this.balls)){
        this.whiteBall.classList.add("on-board");
        this.whiteBall.position = {x:270,y:275};
        this.whiteBall.vel = {x:0,y:0};
      }

      function boardIsEmpty(balls){
        var a=0,b=0;
        for(var i=0;i<7;i++){
          if(balls.balls[i].classList.contains("on-board")) a=1;
        }
        for(var i=9;i<16;i++){
          if(balls.balls[i].classList.contains("on-board")) b=1;
        }
        if(a==0 || b==0) return true;
        return false;
      }

      if(!this.blackBall.classList.contains("on-board") && boardIsRest(this.balls) && !boardIsEmpty(this)){
        this.blackBall.classList.add("on-board");
        this.blackBall.position = {x:710,y:280};
        this.blackBall.vel = {x:0,y:0};
      }


    for(let i=0;i<this.balls.length;i++){


      this.balls[i].position.x = this.balls[i].position.x+this.balls[i].vel.x;
      this.balls[i].position.y = this.balls[i].position.y+this.balls[i].vel.y;

      if(this.balls[i].vel.x!=0) this.balls[i].vel.x-=this.friction*(this.balls[i].vel.x/(Math.sqrt(this.balls[i].vel.x*this.balls[i].vel.x+this.balls[i].vel.y*this.balls[i].vel.y)));
      if(this.balls[i].vel.y!=0) this.balls[i].vel.y-=this.friction*(this.balls[i].vel.y/(Math.sqrt(this.balls[i].vel.x*this.balls[i].vel.x+this.balls[i].vel.y*this.balls[i].vel.y)));


      if(this.balls[i].position.x*this.balls[i].position.x+this.balls[i].position.y*this.balls[i].position.y<=100*100) this.balls[i].classList.remove("on-board");
      if((this.balls[i].position.x-this.tableWidth)*(this.balls[i].position.x-this.tableWidth)+this.balls[i].position.y*this.balls[i].position.y<=100*100)this.balls[i].classList.remove("on-board");
      if((this.balls[i].position.x*this.balls[i].position.x)+(this.balls[i].position.y-this.tableHeight)*(this.balls[i].position.y-this.tableHeight)<=100*100)this.balls[i].classList.remove("on-board");
      if((this.balls[i].position.x-this.tableWidth)*(this.balls[i].position.x-this.tableWidth)+(this.balls[i].position.y-this.tableHeight)*(this.balls[i].position.y-this.tableHeight)<=100*100)this.balls[i].classList.remove("on-board");
      if((this.tableWidth/2 - this.balls[i].position.x)*(this.tableWidth/2 - this.balls[i].position.x)+(this.balls[i].position.y*this.balls[i].position.y)<=(this.border+this.radius+5)*(this.border+this.radius+5))this.balls[i].classList.remove("on-board");
      if((this.tableWidth/2 - this.balls[i].position.x)*(this.tableWidth/2 - this.balls[i].position.x)+((this.balls[i].position.y-this.tableHeight)*(this.balls[i].position.y-this.tableHeight))<=(this.border+this.radius+5)*(this.border+this.radius+5))this.balls[i].classList.remove("on-board");

      if(this.balls[i].position.x<=this.radius+this.border) this.balls[i].vel.x*=-1;
      if(this.balls[i].position.y<=this.radius+this.border) this.balls[i].vel.y*=-1;
      if(this.balls[i].position.y+this.radius+this.border >=this.tableHeight)this.balls[i].vel.y*=-1;
      if(this.balls[i].position.x+this.radius+this.border >= this.tableWidth) this.balls[i].vel.x*=-1;

      for(let j=i+1;j<this.balls.length;j++){
        if(this.balls[i].classList.contains("on-board")&& this.balls[j].classList.contains("on-board") && isColliding(this.balls,i,j,this.radius)){
          var obj1 = this.balls[i];
          var obj2 = this.balls[j];

          var vCollision = {x:obj2.position.x-obj1.position.x , y:obj2.position.y-obj1.position.y};
          var distance = Math.sqrt((obj2.position.x-obj1.position.x)*(obj2.position.x-obj1.position.x)+(obj2.position.y-obj1.position.y)*(obj2.position.y-obj1.position.y));
          var vCollisionNorm = { x:vCollision.x/distance, y: vCollision.y/distance};

          var vCollisionTang = {x:-vCollisionNorm.y, y:vCollisionNorm.x};

          var objOneNormVel = {x:(obj1.vel.x*vCollisionNorm.x+obj1.vel.y*vCollisionNorm.y)*vCollisionNorm.x, y:(obj1.vel.x*vCollisionNorm.x+obj1.vel.y*vCollisionNorm.y)*vCollisionNorm.y};
          var objOneTangVel = {x:(obj1.vel.x*vCollisionTang.x+obj1.vel.y*vCollisionTang.y)*vCollisionTang.x, y:(obj1.vel.x*vCollisionTang.x+obj1.vel.y*vCollisionTang.y)*vCollisionTang.y};
          var objTwoNormVel = {x:(obj2.vel.x*vCollisionNorm.x+obj2.vel.y*vCollisionNorm.y)*vCollisionNorm.x, y:(obj2.vel.x*vCollisionNorm.x+obj2.vel.y*vCollisionNorm.y)*vCollisionNorm.y};
          var objTwoTangVel = {x:(obj2.vel.x*vCollisionTang.x+obj2.vel.y*vCollisionTang.y)*vCollisionTang.x, y:(obj2.vel.x*vCollisionTang.x+obj2.vel.y*vCollisionTang.y)*vCollisionTang.y};

          obj1.vel = {x:objOneTangVel.x+objTwoNormVel.x, y:objOneTangVel.y+objTwoNormVel.y};
          obj2.vel = {x:objTwoTangVel.x+objOneNormVel.x, y:objTwoTangVel.y+objOneNormVel.y};
        }
      }

    }
  }
}

class EventHandler{
  constructor(balls,canvas){

    function boardIsRest(){
        for(var i=0;i<balls.balls.length;i++){
          if((Math.round(balls.balls[i].vel.x) != 0 || Math.round(balls.balls[i].vel.y)!=0)&&balls.balls[i].classList.contains("on-board")) return false;
        }
        return true;
      }
      document.addEventListener("click",event=>{

        if(boardIsRest()){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX-rect.left;
        var y = event.clientY-rect.top;
        console.log("X: "+x+" Y: "+y);
        var speed = 10;
        var striker = balls.whiteBall;
        striker.vel = {x:speed*(x-striker.position.x)/Math.sqrt((x-striker.position.x)*(x-striker.position.x)+(y-striker.position.y)*(y-striker.position.y)),
                       y:speed*(y-striker.position.y)/Math.sqrt((x-striker.position.x)*(x-striker.position.x)+(y-striker.position.y)*(y-striker.position.y))}
      }})
  }
}



var balls = new Balls(ctx,allBalls,table,tableWidth,tableHeight);
var stick = new Stick(ctx,ballStick,balls.whiteBall);
var game = new Game(ctx,balls,stick);
new EventHandler(balls,canvas);



function main(){

  game.update();
  ctx.clearRect(0,0,tableWidth,tableHeight);
  game.draw();
  requestAnimationFrame(main);
}

requestAnimationFrame(main);
