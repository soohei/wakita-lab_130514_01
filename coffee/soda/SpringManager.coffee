#////////////////////////////////
# CoffeeScriptでSpringManagerクラスを実装
#////////////////////////////////

class SpringManager
  constructor: (ctx) ->
    # 変数定義

    @ctx = ctx
    @nodes = []
    @springs = []
    @init();

  # 変数の初期化
  init: ->
    @nodes = []
    @springs = []

  # nodeの追加
  addNode: (nd) ->
    @nodes.push(nd)

  # springの追加
  addSpring: (sp) ->
    @springs.push(sp)

  # nodeの削除
  removeNode: ->
    @nodes.splice(@nodes.indexOf(nd), 1)

  # springの削除
  removeSpring: (sp) ->
    @springs.splice(@springs.indexOf(sp), 1)

  # アップデート指示の基点
  update: ()->
    @updateSprings()
    @updateNodes()
    @rendarNodes()
    @rendarSprings()
    @resetNodes()

  # 全てのnodeに力を加える
  applyForceToNodes: (p) ->
    @applyForceToNodesWithXY(p.x, p.y)

  # 全てのnodeに力を加える (続き)
  applyForceToNodesWithXY: (x, y) ->
    # 全てのnodeを走査する
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      # 力を加算する
      nd.fx += x
      nd.fy += y

  # 重力を与える
  applyGravity: (x, y) ->
    # 全てのnodeを走査する
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      # 力を加算する
      nd.fx += x * nd.mass
      nd.fy += y * nd.mass

  # 与えられたx,y座標に最も近いnodeを返す
  closestNodeFromXY: (x, y, isDraggable = false) ->
    closestNode = null
    minDist = Infinity;
    dx = 0
    dy = 0
    dist = 0
    # 全てのnodeを走査する
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      if(!isDraggable || (isDraggable && nd.isDraggable))
        #x,yとの距離を調べる
        dx = nd.x - x
        dy = nd.y - y
        dist = Math.sqrt(dx*dx + dy*dy)
        if(dist < minDist)
          minDist = dist
          closestNode = nd

    return closestNode

  # nodeが画面外に出ないようにする処理
  constraintNodes: (rect) ->
    t = rect.y;
    l = rect.x;
    r = rect.x + rect.width;
    b = rect.y + rect.height;
    bool = false;

    # 全てのnodeを走査する
    for i in [0 .. @nodes.length - 1]
      nd = nodes[i]

      # 跳ね返りの判定
      if(nd.x < l)
        nd.x = l
        nd.vx *= nd.bounce
        bool = true
      else if(nd.x > r)
        nd.x = r
        nd.vx *= nd.bounce
        bool = true

      if(nd.y < t)
        nd.y = t
        nd.vy *= nd.bounce
        bool = true
      else if(nd.y > b)
        nd.y = b
        nd.vy *= nd.bounce
        bool = true

    if(bool) then rendarSprings()

  # springのアップデート
  updateSprings: ->
    # 全てのspringを走査する
    for i in [0 .. @springs.length - 1]
      spring = @springs[i]
      spring.update()

  # nodeのアップデート
  updateNodes: ->
    # 全てのnodeを走査する
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      nd.update()

  # springの描画
  rendarSprings: ->
    for i in [0 .. @springs.length - 1]
      spring = @springs[i]
      spring.rendar()

  # nodeの描画
  rendarNodes: ->
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      nd.rendar()

  # nodeのアップデート、描画同時実行
  updateRendarNodes: ->
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      nd.update();
      nd.rendar();

  # nodeの力のリセット
  resetNodes: ->
    for i in [0 .. @nodes.length - 1]
      nd = @nodes[i]
      nd.fx = nd.fy = 0;

if(!window.soda) then window.soda = {}
window.soda.SpringManager = SpringManager

