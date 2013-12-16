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
        fn = {}
      ;

      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      function evtFunc(e) {
        evtTarget = e.target;

        // "obj" is being reassigned numerous times in this function to save memory allocation
        if ((obj = evtTarget.dataset['dele' + capitalize(e.type)])) {
          obj = (obj.indexOf('.')+1) ?
                   fn[obj.split('.')[0]][obj.split('.')[1]] :
                   fn[obj];

          e.preventDefault();
          obj(evtTarget, e);
        }
      }

      delegant = {
        bind: function(el,evt) {
          var _this = this;
          return typeof evt === 'string' ?
                  this.addListener(el,evt) :
                  evt.forEach(function(evt) {
                    _this.addListener(el,evt);
                  });
        },

        addListener: function(el,evt) {
          d.querySelector(el).addEventListener(
            evt,
            (function(e){evtFunc(e);}),
            true
          );
        },

        register: function(name, func) {
          if ((name.indexOf('.')+1)) {
            name = name.split('.');
            fn[name[0]] = fn[name[0]] || {};
            fn[name[0]][name[1]] = func;
          } else {
            fn[name] = func;
          }
        }
      };

      return w.delegant = delegant;
    }());
  });
}(window, document));