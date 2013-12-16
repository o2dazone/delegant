casper.test.begin('tests', 5, function suite(test){
  var msg;

  // load test.html
  casper.start('test.html', function() {
    this.evaluate(function(){
      delegant.bind('body','click');
      delegant.bind('body',['mouseover']);

      delegant.register('foo', function(){console.log('foo');});
      delegant.register('foo.bar', function(){console.log('bar');});
      delegant.register('foo.baz', function(){console.log('baz');});
      delegant.register('foo.moo', function(){console.log('moo');});
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
    this.clickLabel('Fire foo.baz');
    test.assertEquals(msg, 'baz');
    msg = null;
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




