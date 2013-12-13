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

    function evtFunc(e) {
      evtTarget = e.target;
      evtType = e.type;

      if ((evtObj = evtTarget.getAttribute('data-dele-' + evtType))) {
        if ((evtObj.indexOf('.')+1)) {
          evtObj = evtObj.split('.');
          evtObj = fn[evtObj[0][evtObj[1]]];
        } else {
          evtObj = fn[evtObj];
        }

        e.preventDefault();
        evtObj(evtTarget);
      }
    }

     var delegant = {
        bind: function(el,evt) {
          d.querySelector(el).addEventListener(
            evt, // type of event
            (function(e){evtFunc(e);}), // fire the "get data attribute" function and parse
            false // NO TOUCHING
          );
        },

        register: function(name, func) {
          if ((name.indexOf('.')+1)) {
            name = name.split('.');
            fn[name[0][name[1]]] = func;
          } else {
            fn[name] = func; //store the function into the delegant function object
          }
        }
     };

     return w.delegant = delegant;
  }());
}(window, document));