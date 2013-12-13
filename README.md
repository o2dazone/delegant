# delegant

An event delegation library


## Use Case

- You are binding lots of events on a page
- You want to decouple click events from your DOM
- You like to torture yourself with over-engineering


## Usage

Add a data attribute "data-del-click" property to your HTML. The value should be the name of your function you're registering in the Javascript. Functions can be namespaced if need be.

## Examples
HTML:
```html
<!doctype html>
<title>Delegant</title>
<head>
  <script type="text/javascript" src="delegant.js"></script>
</head>
<body>
<a href="#" class="foo" data-dele-click="foo">Click event #1</a>
<p class="foobar" data-dele-click="foo.bar">Click event #2 (Namespaced functions)</p>
<span class="nothing">Dont fire anything</span>

<script type="text/javascript">
  (function(){
    delegant.bind('body','click');

    delegant.register('foo', function(){console.log('YEAH! You clicked it!');})
    delegant.register('foo.bar', function(){console.log('YEAH! This function is namespaced!');})
  }());
</script>
</body>
</html>
```
