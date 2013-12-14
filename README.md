# delegant

An event delegation library

## Use Case
- You are binding lots of specific events to specific elements
- You're concerned with Javascript performance when it comes to events listeners.
- You're tired of setting up custom event delegation scaffolding for all your projects.

## Usage
Add a data attribute "data-dele-<evt type>" property to your HTML. The value should be the name of your function you're registering in the Javascript. Functions can be namespaced if need be. 
```html
<a href="#" data-dele-click="hello.world">Hello, World.</a>
```

In your Javascript, bind an event with delegant to the body (delegant.bind), and register an event with the value of your data attribute (data.register)
```javascript
delegant.bind('body','click'); // you're binding a click event on the body
delegant.register('hello.world', function(element, evt) {
  console.log('Hello, world.');
  console.log('You clicked on ' + element);
  console.log('With the event type ' + evt.type);
});
```

## How To
Take a look at the [examples/simple.html](examples/simple.html) and [examples/complex.html](examples/complex.html) to get working examples.

## Drawbacks
Binding a single data-dele type to an object does not "delegate" to it's children. It specifically checks for that event on that element. If you bind a hover event to the body, it is not going to fire on all the children of the body. It will only fire on body. Because of this, you may add more markup than you need for simple event delegation, and you should probably roll your own at that point.
