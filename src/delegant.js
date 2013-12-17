/*!
 * Delegant
*/

(function(w,d){
  'use strict';

  /* AMD boilerplate from:
   * https://gist.github.com/fitzgen/951178
  */
  (typeof define === 'function' ? define : function (_, f) {
    if ( typeof exports === 'object' ) {
      f(exports);
    } else {
      f(this);
    }
  })(['exports'], function (exports) {

    var delegant = (function() {

      var
        evtTarget,
        obj,
        base, lname,
        fn = {}
      ;

      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      function findObj (obj, names) {
        for (var i = 0, len = names.length; i < len; i++) {
          obj = obj[names[i]];
          if (typeof(obj) === 'function' && i === len-1) return obj; // super hacky method of detecting its the last function im going to developer hell
        }
      }

      function evtFunc(e) {
        evtTarget = e.target;

        // overriding "obj" to save on allocation
        if ((obj = evtTarget.dataset['dele' + capitalize(e.type)])) {
          if (obj = findObj(fn, obj.split('.'))) {
            e.preventDefault();
            obj(evtTarget, e);
          }
        }
      }

      function addListener(el,evt) {
        d.querySelector(el).addEventListener(
          evt,
          (function(e){evtFunc(e);}),
          true
        );
      }

      delegant = {
        bind: function(el,evt) {
          return typeof evt === 'string' ?
            addListener(el,evt) :
            evt.forEach(function(evt) {
              addListener(el,evt);
            });
        },

        register: function(name, func){
          name = name.split('.');
          base = fn;
          lname = arguments.length === 2 ?
                  name.pop() :
                  false;

          for (var i = 0, len = name.length; i < len; i++) {
            base = base[name[i]] = base[name[i]] || {};
          }

          if (lname) base = base[lname] = func;
          base = fn;
        }
      };

      return w.delegant = delegant;
    }());
  });
}(window, document));