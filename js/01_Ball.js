jQuery(function($){

  console.log("01_Ball start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('01_Ball_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');

  // Ballインスタンスを生成
  var ball = new Ball(ctx, 70, 70);
  ball.vx = 5;
  ball.vy = 5;

  // FPS30で実行するループ
  setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    ball.constrain(canvas.width, canvas.height);
    ball.draw();
  }, 33)
});

////////////////////////////////
// JSでクラスの定義
// 参考: http://soohei.net/441
////////////////////////////////

var Ball = function(ctx, x, y, radius, strokeColor, fillColor){
  this.initialize.apply(this, arguments);
}
Ball.prototype = {
  //コンストラクタ
  initialize: function(ctx, x, y, radius, strokeColor, fillColor) {
    this.ctx = ctx;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = (!isNaN(radius) && radius > 0) ? radius : 50;
    this.strokeColor = strokeColor ? strokeColor : '#ffffff';
    this.fillColor = fillColor ? fillColor : '#333333';
    this.draw();
  }
  ,
  update: function(){
    this.x += this.vx;
    this.y += this.vy;
  }
  ,
  constrain: function(w, h){
    if(this.x > w - this.radius){
      // 右にはみ出した
      this.x = w - this.radius;
      this.vx *= -1;
    }else if(this.x < this.radius){
      // 左にはみ出した
      this.x = this.radius;
      this.vx *= -1;
    }
    if(this.y > h - this.radius){
      // 下にはみ出した
      this.y = h - this.radius;
      this.vy *= -1;
    }else if(this.y < this.radius){
      // 上にはみ出した
      this.y = this.radius;
      this.vy *= -1;
    }
  }
  ,
  draw: function(){
    var ctx = this.ctx;

    // 円を描く

    // 色の指定
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}