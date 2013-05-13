jQuery(function($){

  console.log("03_Bounce start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('03_Bounce_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');

  // ボールを2つつくる
  // 移動用
  var ball_1 = new Ball(ctx, 250, canvas.height * 0.5 - 100);
  // 目標位置用 (薄い色)
  var ball_2 = new Ball(ctx, canvas.width - 250, canvas.height * 0.5 + 100, 50, '#4d4d4d', '#262626');

  $(window).keydown(function(e){
    console.log(e.keyCode)
    if(e.keyCode == 32){ // スペースキーが押された
      ball_1.toX = ball_2.x;
      ball_1.toY = ball_2.y;
    }
  });

  // FPS30で実行するループ
  setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball_2.update();
    ball_2.draw();
    ball_1.update();
    ball_1.draw();
  }, 33);
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
    this.toX = x;
    this.toY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = (!isNaN(radius) && radius > 0) ? radius : 50;
    this.strokeColor = strokeColor ? strokeColor : '#ffffff';
    this.fillColor = fillColor ? fillColor : '#333333';

    this.draw();
  }
  ,
  update: function(){
    // 目標までの距離
    var disX = this.toX - this.x;
    var disY = this.toY - this.y;

    // 目標に十分近づいたら速度を与えない
    if(Math.abs(disX) < 0.25){
      disX = 0;
      this.x = this.toX;
    }
    if(Math.abs(disY) < 0.25){
      disY = 0;
      this.y = this.toY;
    }
    if(this.x == this.toX && this.y == this.toY){
      return;
    }

    // 速度を計算
    var accel = 20;
    var slow = 1.2;
    this.vx = (this.vx + disX / accel) / slow;
    this.vy = (this.vy + disY / accel) / slow;

    // 座標に速度を加算
    this.x += this.vx;
    this.y += this.vy;
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