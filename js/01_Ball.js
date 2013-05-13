jQuery(function($){

  console.log("01_Ball start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('01_Ball_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');


  // 四角形を描く
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(120, 20);
  ctx.lineTo(120, 120);
  ctx.lineTo(20, 120);
  ctx.closePath();
  ctx.stroke();
});