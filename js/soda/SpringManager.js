// Generated by CoffeeScript 1.4.0
(function() {
  var SpringManager;

  SpringManager = (function() {

    function SpringManager(ctx) {
      this.ctx = ctx;
      this.nodes = [];
      this.springs = [];
      this.init();
    }

    SpringManager.prototype.init = function() {
      this.nodes = [];
      return this.springs = [];
    };

    SpringManager.prototype.addNode = function(nd) {
      return this.nodes.push(nd);
    };

    SpringManager.prototype.addSpring = function(sp) {
      return this.springs.push(sp);
    };

    SpringManager.prototype.removeNode = function() {
      return this.nodes.splice(this.nodes.indexOf(nd), 1);
    };

    SpringManager.prototype.removeSpring = function(sp) {
      return this.springs.splice(this.springs.indexOf(sp), 1);
    };

    SpringManager.prototype.update = function() {
      this.updateSprings();
      this.updateNodes();
      this.rendarNodes();
      this.rendarSprings();
      return this.resetNodes();
    };

    SpringManager.prototype.applyForceToNodes = function(p) {
      return this.applyForceToNodesWithXY(p.x, p.y);
    };

    SpringManager.prototype.applyForceToNodesWithXY = function(x, y) {
      var i, nd, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        nd.fx += x;
        _results.push(nd.fy += y);
      }
      return _results;
    };

    SpringManager.prototype.applyGravity = function(x, y) {
      var i, nd, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        nd.fx += x * nd.mass;
        _results.push(nd.fy += y * nd.mass);
      }
      return _results;
    };

    SpringManager.prototype.closestNodeFromXY = function(x, y, isDraggable) {
      var closestNode, dist, dx, dy, i, minDist, nd, _i, _ref;
      if (isDraggable == null) {
        isDraggable = false;
      }
      closestNode = null;
      minDist = Infinity;
      dx = 0;
      dy = 0;
      dist = 0;
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        if (!isDraggable || (isDraggable && nd.isDraggable)) {
          dx = nd.x - x;
          dy = nd.y - y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            closestNode = nd;
          }
        }
      }
      return closestNode;
    };

    SpringManager.prototype.constraintNodes = function(rect) {
      var b, bool, i, l, nd, r, t, _i, _ref;
      t = rect.y;
      l = rect.x;
      r = rect.x + rect.width;
      b = rect.y + rect.height;
      bool = false;
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = nodes[i];
        if (nd.x < l) {
          nd.x = l;
          nd.vx *= nd.bounce;
          bool = true;
        } else if (nd.x > r) {
          nd.x = r;
          nd.vx *= nd.bounce;
          bool = true;
        }
        if (nd.y < t) {
          nd.y = t;
          nd.vy *= nd.bounce;
          bool = true;
        } else if (nd.y > b) {
          nd.y = b;
          nd.vy *= nd.bounce;
          bool = true;
        }
      }
      if (bool) {
        return rendarSprings();
      }
    };

    SpringManager.prototype.updateSprings = function() {
      var i, spring, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.springs.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        spring = this.springs[i];
        _results.push(spring.update());
      }
      return _results;
    };

    SpringManager.prototype.updateNodes = function() {
      var i, nd, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        _results.push(nd.update());
      }
      return _results;
    };

    SpringManager.prototype.rendarSprings = function() {
      var i, spring, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.springs.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        spring = this.springs[i];
        _results.push(spring.rendar());
      }
      return _results;
    };

    SpringManager.prototype.rendarNodes = function() {
      var i, nd, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        _results.push(nd.rendar());
      }
      return _results;
    };

    SpringManager.prototype.updateRendarNodes = function() {
      var i, nd, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        nd.update();
        _results.push(nd.rendar());
      }
      return _results;
    };

    SpringManager.prototype.resetNodes = function() {
      var i, nd, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.nodes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        nd = this.nodes[i];
        _results.push(nd.fx = nd.fy = 0);
      }
      return _results;
    };

    return SpringManager;

  })();

  if (!window.soda) {
    window.soda = {};
  }

  window.soda.SpringManager = SpringManager;

}).call(this);