jQuery(function($){

  console.log("01_Ball start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('01_Ball_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');

  // Ballインスタンスを生成
  var ball = new Ball(ctx, 70, 70, 50, '#ffffff', '#333333');
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
    this.radius = radius;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.draw();
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