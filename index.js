/* Copyright (c) 2013 Wang Wenlin. See LICENSE for more information */

;(function () {
  var TCP = process.binding('tcp_wrap').TCP
    , _setKeepAlive = TCP.prototype.setKeepAlive
    , _shutdown = TCP.prototype.shutdown;

  TCP.prototype.setKeepAlive = function (enable) {
    var r = _setKeepAlive.apply(this, arguments);
    this._ka = enable;
    return r;
  };

  TCP.prototype.shutdown = function () {
    var r = _shutdown.apply(this, arguments);
    if (r && !this._ka)
      _setKeepAlive.call(this, true, 75); // 75 seconds
    return r;
  };
})();