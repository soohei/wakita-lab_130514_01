jQuery ($) ->
  # canvas要素のノードオブジェクト
  canvas = document.getElementById('04_Border_canvas')
  # 2Dコンテキスト
  ctx = canvas.getContext('2d')

  border = new Border(ctx)


#////////////////////////////////
# CoffeeScriptでBorderクラスを実装
#////////////////////////////////

class Border
  constructor: (ctx) ->
    # 変数定義

    @ctx = ctx
    @stageWidth = 960
    @stageHeight = 540
    @mng = null
    @nodeAr = []

    offsetX = 100
    nodeX = - offsetX
    nodeY = 240
    numNodes = 8
    nodePitch = (@stageWidth + offsetX * 2) / (numNodes - 1)
    nodeCount = 0

    # @prevAttackId = -1

    @mng = new soda.SpringManager(@ctx)

    # nodeを作って管理する
    for i in [0..numNodes-1]
      isFixed = i == 0 || i == numNodes - 1
      node = new soda.Node(@ctx, nodeX, nodeY, isFixed, !isFixed, true, 4, '#ff0000')
      nodeCount++
      nodeX += nodePitch
      @mng.addNode(node)
      @nodeAr.push(node)

    # nodeをspringに束ねていく
    for i in [1..@nodeAr.length-1]
      node1 = @nodeAr[i - 1]
      node2 = @nodeAr[i]
      spring = new soda.Spring(@ctx, node1, node2, nodePitch, '#333333')
      @mng.addSpring(spring)

    # onEnterFrameのかわり
    setInterval =>
      @loop()
    , 33

    # mouseEvent
    ref = @

    $('#04_Border_canvas').mousedown (e) ->
      rect = e.target.getBoundingClientRect()
      mouseX = e.pageX - rect.left
      mouseY = e.pageY - rect.top
      node = ref.mng.closestNodeFromXY(mouseX, mouseY, true)
      if(node)
        ref.draggingNode = node
        ref.draggingNode.setIsDragging(true)

        $('#04_Border_canvas').mousemove (e) ->
          mouseX = e.pageX - rect.left
          mouseY = e.pageY - rect.top
          node.x = mouseX
          node.y = mouseY

        $('#04_Border_canvas').mouseup (e) ->
          if(ref.draggingNode)
            ref.draggingNode.setIsDragging(false)
            ref.draggingNode = null
          $(this).unbind('mousemove')
          $(this).unbind('mouseup')


  # attack: (basePower) ->
  #   #アンプ
  #   amplifer = 1
  #   basePower = basePower * amplifer

  #   # 0と最後は除外されるようにする
  #   nodeId = 1 + parseInt((@nodeAr.length - 2) * Math.random())

  #   # 同じIDが連続でattackされないようにする
  #   while(@prevAttackId == nodeId)
  #     nodeId = 1 + parseInt((@nodeAr.length - 2) * Math.random())

  #   # 最後にattackしたidは記憶しておく
  #   @prevAttackId = nodeId

  #   node = @nodeAr[nodeId]

  #   power = - basePower * (Math.random() * 0.5 + 0.5)

  #   # 力の方向をランダムで振り分ける
  #   # if(Math.random() < 0.5) power = - power

  #   # nodeに速度を加算する
  #   node.vy += power

  # ループで処理される関数
  loop: ->
    @ctx.clearRect(0, 0, @stageWidth, @stageHeight)

    #managerの更新
    @mng.update()
    v = []
    for i in [0..@nodeAr.length-1]
      node = @nodeAr[i]
      p = { x: node.x, y: node.y }
      v.push(p)

    @ctx.beginPath()
    @ctx.moveTo(0, @stageHeight)
    @drawSpline(v)
    @ctx.lineTo(@stageWidth, @stageHeight)
    @ctx.lineTo(0, @stageHeight)
    @ctx.closePath()
    @ctx.stroke()

  # 以下スプライン補間で曲線を結ぶ式
  drawSpline: (v) ->
    @ctx.strokeStyle = '#ccc'
    if(v.length < 2) then return
    v.splice(0, 0 , v[0])
    v.push(v[v.length - 1])

    numSegments = 25 #曲線分割数（補完する数）
    for i in [0..v.length-3-1]
      p0 = v[i]
      p1 = v[i+1]
      p2 = v[i+2]
      p3 = v[i+3]
      @splineTo(p0, p1, p2, p3, numSegments)

  splineTo: (p0, p1, p2, p3, numSegments) ->
    for i in [0..numSegments-1]
      t = (i + 1) / numSegments
      x = @catmullRom(p0.x, p1.x, p2.x, p3.x, t)
      y = @catmullRom(p0.y, p1.y, p2.y, p3.y, t)
      @ctx.lineTo(
        x, y
      )

  catmullRom: (p0, p1, p2, p3, t) ->
    v0 = (p2 - p0) * 0.5
    v1 = (p3 - p1) * 0.5
    return (2 * p1 - 2 * p2 + v0 + v1) * t * t * t + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t * t + v0 * t + p1


if(!window.MY_NAMESPACE) then window.MY_NAMESPACE = {}
window.MY_NAMESPACE.Border = Border