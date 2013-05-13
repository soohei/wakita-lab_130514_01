jQuery(function($){

  console.log("01_Ball start");

  // canvas要素のノードオブジェクト
  var canvas = document.getElementById('01_Ball_canvas');
  // 2Dコンテキスト
  var ctx = canvas.getContext('2d');


  // 四角形を描く

  // 色の指定
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#333333';

  ctx.fillRect(20, 20, 100, 100);
  ctx.strokeRect(20, 20, 100, 100);
});