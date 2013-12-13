casper.test.begin('Clicks', 3, function suite(test){
  var msg;

  // load test.html
  casper.start('test.html', function() {
    this.evaluate(function(){
      delegant.bind('body','click');
      delegant.register('foo', function(){console.log('foo');});
      delegant.register('foo.bar', function(){console.log('foo bars!');});
    });
  })

  .then(function() {
    this.clickLabel('Fire foo');
    test.assertEquals(msg, 'foo');
    msg = null;
  })

  .then(function() {
    this.clickLabel('Fire foo.bar');
    test.assertEquals(msg, 'foo bars!');
    msg = null;
  })

  .then(function() {
    this.clickLabel('Dont fire anything');
    test.assertEquals(msg, null);
    msg = null;
  })

  .on('remote.message', function(message) {
    msg = message;
  })

  .run(function() {
    test.done();
  });

});




