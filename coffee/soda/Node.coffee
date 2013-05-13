#////////////////////////////////
# CoffeeScriptでNodeクラスを実装
#////////////////////////////////

class Node
  constructor: (ctx, x, y, isFixed = false, isDraggable = false, backToDefPosition = false, radius = 5, color = '#ff0000') ->

    # 変数定義

    @ctx = ctx
    # 座標
    @x = x
    @y = y
    # 最初の位置
    @defX = x
    @defY = y
    # x, y方向へかかる力
    @fx = 0
    @fy = 0
    # 速度
    @vx = 0
    @vy = 0
    # 質量 (未使用)
    @mass = 1
    # 塗りつぶし色
    @color = color
    # 半径
    @radius = radius
    # 摩擦
    @friction = 0.85
    # 跳ね返り
    @bounce = 1
    # 位置を固定するか
    @isFixed = isFixed
    # ドラッグ可能か
    @isDraggable = isDraggable
    # ドラッグ中か
    @isDragging = false
    # 最初の座標に戻ろうとするか
    @backToDefPosition = backToDefPosition
    # 1フレーム毎の速度の最大値
    @maxSpeed = 15

    @init(false)

  # nodeを複製する関数
  duplicateNode: ->
    newNode = new Node(@x, @y, @isFixed, @draggable, @backToDefPosition, @radius, @color)
    newNode.vx = @vx
    newNode.vy = @vy
    newNode.fx = @fx
    newNode.fy = @fy
    newNode.mass = @mass
    newNode.friction = @friction
    newNode.bounce = @bounce;
    return newNode

  # アップデート指示の基点
  update: ->
    # 固定されている場合
    if(@isFixed) then return

    # ドラッグ中の場合
    if(@isDragging) then return

    # 速度の計算
    @vx = @vx * @friction + @fx
    @vy = @vy * @friction + @fy

    # 速度のノーマライズ
    dsq = @vx * @vx + @vy * @vy
    if(@dsq > @maxSpeed * @maxSpeed)
      norm = Math.sqrt(dsq) / @maxSpeed
      @vx /= norm
      @vy /= norm

  # 描画指示の基点
  rendar: ->
    # x,yに速度を加算する
    @x += @vx
    @y += @vy

    # 元あった座標へ帰ろうとする
    if(!@isFixed && !@isDragging && @backToDefPosition)
      minDiff = 0.125

      # xが最初の位置に戻ろうとする
      diffX = @defX - @x
      ease = 0.25
      @x += diffX * ease
      if(Math.abs(diffX) < minDiff) then x = @defX

      # yが最初の位置に戻ろうとする
      diffY = @defY - @y
      @y += diffY * ease
      if(Math.abs(diffY) < minDiff) then y = @defY

    # 描画
    @ctx.fillStyle = @color;
    @ctx.beginPath();
    @ctx.arc(@x, @y, @radius, 0, Math.PI * 2);
    @ctx.closePath();
    @ctx.fill();

  # ドラッグの状態をフラグに反映するsetter
  setIsDragging: (bool) ->
    @isDragging = bool

  # Nodeのグラフィックの初期化
  reset: ->
    @init()

  # Nodeのグラフィックパーツを描画する
  init: ->
    @ctx.fillStyle = @color;
    @ctx.beginPath();
    @ctx.arc(@x, @y, @radius, 0, Math.PI * 2);
    @ctx.closePath();
    @ctx.fill();

if(!window.soda) then window.soda = {}
window.soda.Node = Node