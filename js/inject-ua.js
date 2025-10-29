// Injected into page context. Reads UA from its own src query parameter: ?ua=...
(function(){
  try{
    var src = (document.currentScript && document.currentScript.src) || '';
    var ua = '';
    if(src){
      try{
        var p = new URL(src).searchParams.get('ua');
        if(p) ua = decodeURIComponent(p);
      }catch(e){}
    }
    if(!ua){
      ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    }

    // Try defineProperty first, fallback to __defineGetter__ for older engines
    try{
      Object.defineProperty(navigator, 'userAgent', {
        get: function(){ return ua; },
        configurable: true
      });
    }catch(e){
      try{
        navigator.__defineGetter__('userAgent', function () { return ua; });
      }catch(e2){
        // last resort: override toString (best-effort)
        var _toString = Navigator.prototype && Navigator.prototype.toString;
        if(_toString && !_toString.__patchedByExtension){
          Navigator.prototype.toString = function(){ return ua; };
          Navigator.prototype.toString.__patchedByExtension = true;
        }
      }
    }
  }catch(e){
    // avoid breaking page
    console.error('inject-ua failed', e);
  }
})();
