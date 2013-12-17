casper.test.begin('tests', 4, function suite(test){
  'use strict';
  var msg;

  casper.start('casperjs/test.html', function() {
    this.evaluate(function(){
      delegant.bind('body','click');
      delegant.register('foo',                                function(){console.log('foo');});
      delegant.register('foo.bar',                            function(){console.log('bar');});
      delegant.register('foo.bar.baz.qux.quux.corge.grault',  function(){console.log('quux');});
      delegant.register('whoa.nice.test',                     function(){console.log('yeee');});
    });
  })

  .then(function() {
    this.clickLabel('Fire foo');
    test.assertEquals(msg, 'foo');
    msg = null;
  })

  .then(function() {
    this.clickLabel('Fire foo.bar');
    test.assertEquals(msg, 'bar');
    msg = null;
  })

  .then(function() {
    this.clickLabel('Dont fire anything');
    test.assertEquals(msg, null);
    msg = null;
  })

  .then(function() {
    this.clickLabel('Fire multi');
    test.assertEquals(msg, 'quux');
    msg = null;
  })

  .on('remote.message', function(message) {
    msg = message;
  })

  .run(function() {
    test.done();
  });

});




