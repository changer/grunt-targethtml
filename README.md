# grunt-targethtml [![Build Status](https://travis-ci.org/srigi/grunt-targethtml.png)](https://travis-ci.org/srigi/grunt-targethtml)

Produces html-output depending on grunt target

## Getting Started

Install this grunt plugin by running this command in root of your project,

```bash
npm install grunt-targethtml
```
Then add this line to your project's `Gruntfile.js`.

```javascript
grunt.loadNpmTasks('grunt-targethtml');
```

## Documentation

Configure task in `Gruntfile.js`,

```javascript
grunt.initConfig({
  // ...other configs

  targethtml: {
    dist: {
      files: {
        'dist/public/index.html': 'src/public/index.html'
      }
    }
  },

  // ...other configs
});
```

Use conditional statements in your html based on grunt targets like:

```html
<!--(if target dev)><!-->
  <link rel="stylesheet" href="dev.css">
<!--<!(endif)-->

<!--(if target dev)><!-->
  <script src="dev.js"></script>
  <script>
    var less = { env:'development' };
  </script>
<!--<!(endif)-->


<!--(if target dist)>
  <link rel="stylesheet" href="release.css">
<!(endif)-->

<!--(if target dist)>
  <script src="release.js"></script>
<!(endif)-->
```

Note, that `dist` section is commented out - during development you are working with `dev` set of assets.
During processing `targethtml:dist`, comment tags defining `dist` section gets removed (section become uncommented) and any other sections (other than `dist`) gets removed completly.

The plugin also allows to modify multiple files within one target:

```javascript
grunt.initConfig({
  // ...other configs

  targethtml: {
    dist: {
      files: {
        'dist/public/index.html': 'src/public/index.html',
        'dist/public/mobile.html': 'src/public/mobile.html'
      }
    }
  },

  // ...other configs
});
```

Resulting HTML code
```html
  <link rel="stylesheet" href="release.css">

  <script src="release.js"></script>
```

You could use the [if...] notation like we're used from the [if lt IE 9], but ironically that fails in IE.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 8/31/12 - v0.1.0 - Initial release.
* 9/1/12 - v0.1.1 - Fixed naming issues
* 9/7/12 - v0.1.2 - Accept round braces in if statements for IE support
* 10/14/12 - v0.1.3 - Adjustments towards grunt file api
* 1/3/13 - v0.2.0 - Compatility with Grunt v0.4
* 2/25/13 - v0.2.1 - Fixed towards Grunt 0.4

## License
Copyright (c) 2012 Ruben Stolk
Licensed under the MIT license.

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started
