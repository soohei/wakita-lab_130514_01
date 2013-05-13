#////////////////////////////////
# CoffeeScriptでSpringクラスを実装
#////////////////////////////////

class Spring
  constructor: (ctx, node0, node1, restLength = 100, color = '#ffffff') ->
    # 変数定義

    @ctx = ctx
    @nd0 = node0
    @nd1 = node1
    @restLength = restLength
    @color = color
    @damping = 0.85
    @minLength = 1

    @init()

  # グラフィックエレメントを初期化
  init: ->
    @drawLine()

  # アップデート指示の基点
  update: ->
    # node間の距離を求める
    dx = @nd1.x - @nd0.x
    dy = @nd1.y - @nd0.y
    dist = Math.sqrt(dx*dx + dy*dy)
    if(dist < @minLength) then return

    # 力を計算
    f = @damping * (@restLength - dist) / dist
    fx = dx * f * 0.5
    fy = dy * f * 0.5

    # nodeに力を与える
    @nd0.fx -= fx
    @nd0.fy -= fy
    @nd1.fx += fx
    @nd1.fy += fy

  # 描画指示の基点
  rendar: ->
    @drawLine()

  # 2つのnode間の距離を求める
  getLength: ->
    num = Math.sqrt(Math.pow(@nd0.x - @nd1.x, 2) + Math.pow(@nd0.y - @nd1.y, 2))
    return num

  # 描画処理
  drawLine: ->
    @ctx.strokeStyle = @color
    @ctx.beginPath()
    @ctx.moveTo(@nd0.x, @nd0.y)
    @ctx.lineTo(@nd1.x, @nd1.y)
    @ctx.closePath()
    @ctx.stroke()

if(!window.soda) then window.soda = {}
window.soda.Spring = Spring