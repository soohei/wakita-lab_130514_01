jQuery(function($){

  console.log("01_Ball start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('01_Ball_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');


  // canvasをクリックしたらBallをつくる
  var balls = [];

  $('#01_Ball_canvas').mousedown(function(e) {
    var rect = e.target.getBoundingClientRect();
    var mouseX = e.pageX - rect.left;
    var mouseY = e.pageY - rect.top;

    // Ballインスタンスを生成
    var radius = 40 + Math.random() * 100;
    var ball = new Ball(ctx, mouseX, mouseY, radius);
    ball.vx = (Math.random() - 0.5) * 40;
    ball.vy = (Math.random() - 0.5) * 40;

    // Ball管理用の配列に追加する
    balls.push(ball);
  });

  // FPS30で実行するループ
  setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < balls.length; i++){
      var ball = balls[i];
      ball.applyGravity(1);
      ball.update();
      ball.constrain(canvas.width, canvas.height);
    }
    for(var i = 0; i < balls.length; i++){
      for (var j = i + 1; j < balls.length; j++) {
        var ballA = balls[i];
        var ballB = balls[j];
        ballA.checkCollision(ballB);
      }
    }
    for(var i = 0; i < balls.length; i++){
      var ball = balls[i];
      ball.draw();
    }
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
    this.vx = 0;
    this.vy = 0;
    this.radius = (!isNaN(radius) && radius > 0) ? radius : 50;
    this.strokeColor = strokeColor ? strokeColor : '#ffffff';
    this.fillColor = fillColor ? fillColor : '#333333';

    // 壁に当たった時の減速
    this.bounce = 0.8;
    // 摩擦
    this.friction = 0.1;

    this.draw();
  }
  ,
  applyGravity: function(gravity){
    this.vy += gravity;
  }
  ,
  update: function(){
    // 摩擦の計算
    if(this.vx > this.friction){
      this.vx -= this.friction;
    }else if(this.vx < -this.friction){
      this.vx += this.friction;
    }
    if(this.vy > this.friction){
      this.vy -= this.friction;
    }else if(this.vy < -this.friction){
      this.vy += this.friction;
    }

    // 速度の加算
    this.x += this.vx;
    this.y += this.vy;
  }
  ,
  constrain: function(w, h){
    if(this.x > w - this.radius){
      // 右にはみ出した
      this.x = w - this.radius;
      this.vx *= -this.bounce;
    }else if(this.x < this.radius){
      // 左にはみ出した
      this.x = this.radius;
      this.vx *= -this.bounce;
    }
    if(this.y > h - this.radius){
      // 下にはみ出した
      this.y = h - this.radius;
      this.vy *= -this.bounce;
    }else if(this.y < this.radius){
      // 上にはみ出した
      // this.y = this.radius;
      // this.vy *= -this.bounce;
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
  ,
  // 他のボールとの衝突判定をする
  checkCollision: function(other)
  {
    var dis = this.getDistance(this, other);
    if (dis < (this.radius + other.radius)){
      // 中心方向とx軸との成す角を求める
      var disX = other.x - this.x;
      var disY = other.y - this.y;
      var theta = Math.atan(Math.abs(disY / disX));
      // 重なりを無くす
      var len = (this.radius + other.radius) - dis;
      other.x += len * disX / dis;
      other.y += len * disY / dis;
      // ベクトルをθ回転する
      var vu = this.vx * Math.cos(theta) - this.vy * Math.sin(theta);
      var vv = this.vx * Math.sin(theta) + this.vy * Math.cos(theta);
      var other_vu = other.vx * Math.cos(theta) - other.vy * Math.sin(theta);
      var other_vv = other.vx * Math.sin(theta) + other.vy * Math.cos(theta);
      // u方向のみ運動量保存則を適用（質量が同じと仮定し速度交換）
      var tmp = vu / 1;
      vu = other_vu / 1;
      other_vu = tmp;
      // ベクトルを -θ回転する
      this.vx = vu * Math.cos(theta) + vv * Math.sin(theta);
      this.vy = -vu * Math.sin(theta) + vv * Math.cos(theta);
      other.vx = other_vu * Math.cos(theta) + other_vv * Math.sin(theta);
      other.vy = -other_vu * Math.sin(theta) + other_vv * Math.cos(theta);
    }
  }
  ,
  // 2点間の距離を求める
  getDistance: function(p1, p2)
  {
    var disX = p1.x - p2.x;
    var disY = p1.y - p2.y;
    return Math.sqrt(disX * disX + disY * disY);
  }
}