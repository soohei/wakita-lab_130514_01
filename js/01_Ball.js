jQuery(function($){

  console.log("01_Ball start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('01_Ball_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');


  // 円を描く

  // 色の指定
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#333333';

  ctx.beginPath();
  ctx.arc(70, 70, 50, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
});