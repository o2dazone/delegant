casper.test.begin('tests', 1, function suite(test){
  'use strict';
  var msg;

  casper.start('casperjs/test.html', function() {
    this.evaluate(function(){
      delegant.bind('body',['mouseover']);
      delegant.register('foo.moo', function(){console.log('moo');});
    });
  })

  .then(function() {
    this.mouseEvent('mouseover', '.moo');
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




