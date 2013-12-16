casper.test.begin('tests', 1, function suite(test){
  'use strict';
  var msg;

  casper.start('casperjs/test.html', function() {
    this.evaluate(function(){
      delegant.bind('body',['blur']);
      delegant.register('merp.poo', function(){console.log('weeeeeeee');});
    });
  })

  .then(function() {
    this.mouseEvent('blur', '.moo');
    test.assertEquals(msg, 'weeeeeeee');
    msg = null;
  })

  .on('remote.message', function(message) {
    msg = message;
  })

  .run(function() {
    test.done();
  });

});




