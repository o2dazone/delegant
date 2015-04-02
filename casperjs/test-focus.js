casper.test.begin('tests', 1, function suite(test){
  'use strict';
  var msg;

  casper.start('casperjs/test.html', function() {
    this.evaluate(function(){
      delegant.bind('body','focus');
      delegant.register('bloo', function(){console.log('moo');});
    });
  })

  .then(function() {
    this.mouseEvent('focus', '.moo');
    test.assertEquals(msg, 'moo');
    msg = null;
  })

  .on('remote.message', function(message) {
    msg = message;
  })

  .run(function() {
    test.done();
  });

});




