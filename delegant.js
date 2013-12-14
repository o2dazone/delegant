/*!
 * Delegant 0.1
 * Written by Brandon Murry
 *
*/

(function(w,d){
  'use strict';

  var delegant = (function() {

    var
      evtTarget,
      evtType,
      evtObj,
      fn = {}
    ;

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function evtFunc(e) {
      evtTarget = e.target;
      evtType = e.type;

      if ((evtObj = evtTarget.dataset['dele' + capitalize(evtType)])) {
        if ((evtObj.indexOf('.')+1)) {
          evtObj = evtObj.split('.');
          evtObj = fn[evtObj[0]][evtObj[1]];
        } else {
          evtObj = fn[evtObj];
        }

        e.preventDefault();
        evtObj(evtTarget, e);
      }
    }

    var delegant = {
      bind: function(el,evt) {
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
          fn[name] = func; //store the function into the delegant function object
        }
      }
    };

    return w.delegant = delegant;
  }());
}(window, document));