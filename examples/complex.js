(function(){
  'use strict';

  // Single-event binding
  delegant.bind('body','mouseover');

  // Multi-event binding
  delegant.bind('body', ['click', 'focus', 'blur']);

  delegant.register('clickFunc', function(el, evt){
    console.log('innerHTML: ' + el.innerHTML + '\nEvent Type: ' + evt.type);
  });

  delegant.register('moo', function(){
    console.log('enter the moo');
  });

  delegant.register('foo.focus', function(el){
    el.value = '';
  });

  delegant.register('foo.blur', function(el){
    if (el.value === '') el.value = 'Dont leave this input empty!';
  });

  delegant.register('foo.hovering', function(el){
    console.log('You just hovered over an ' + el.tagName + ' tag.');
  });

}());