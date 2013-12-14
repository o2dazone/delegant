(function(){
  'use strict';

  delegant.bind('body','click');
  delegant.bind('body','focus');
  delegant.bind('body','blur');
  delegant.bind('body','mouseover');

  delegant.register('clickFunc', function(el, evt){
    console.log('innerHTML: ' + el.innerHTML + '\nEvent Type: ' + evt.type);
  });

  delegant.register('moo', function(){
    console.log('enter the moo');
  });

  delegant.register('foo.focus', function(el){
    if (el.tagName === 'INPUT')
      el.value = '';
  });

  delegant.register('foo.blur', function(el){
    if (el.tagName === 'INPUT' && el.value === '')
      el.value = 'Dont leave this input empty!';
  });

  delegant.register('foo.hovering', function(el){
    console.log('You just hovered over an ' + el.tagName + ' tag.');
  });



}());