# grunt-targethtml [![Build Status](https://travis-ci.org/srigi/grunt-targethtml.png)](https://travis-ci.org/srigi/grunt-targethtml)

Preproces HTML files by using *target tags* depending on current grunt target. This grunt plugin allows you to specify different sets of assets for `dev` or `release` versions of your HTML files.

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
targethtml: {
  dist: {
    files: {
      'dist/public/index.html': 'src/public/index.html'
    }
  }
},
```
This instructs `targethtml` to process source file `src/public/index.html` and store processed file into `dist/public/index.html`. Use *target tags* in your HTML files like this:

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
During processing `targethtml:dist`, `dist` section gets active and any other sections (other than `dist`) gets removed.

Resulting HTML code
```html
  <link rel="stylesheet" href="release.css">

  <script src="release.js"></script>
```

You could use the [if...] notation like we're used from the [if lt IE 9], but ironically that fails in IE.

### Version tags

Between *target tags* you can use simple templating by empovering *version tags* to pass custom variables. Version tags must be defined like this:

```html
<!--(if target dist)>
  <link rel="stylesheet" href="release.css?{{rlsdate}}">
<!(endif)-->

<!--(if target dist)>
  <script src="release.js?{{rlsdate}}"></script>
<!(endif)-->
```

Version tags helps you implement cache busting technique to update assets paths in production. Version tags are defined in `options` of `targethtml` task. You can effectively use Grunt's templating when definig values of version tags.

```js
targethtml: {
  dist: {
    options: {
      versionTags: {
        rlsdate: '<%= grunt.template.today("yyyymmdd") %>'
      }
    },
    files: {
      'dist/public/index.html': 'src/public/index.html'
    }
  }
}
```

Running `targethtml:dist` target will yield (at Jan 1st, 2013):

```html
  <link rel="stylesheet" href="release.css?20130101">
  <script src="release.js?20130101"></script>
```

Please note that you can use only string as names and values of *version tags*!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 8/31/12 - v0.1.0 - Initial release.
* 9/1/12 - v0.1.1 - Fixed naming issues
* 9/7/12 - v0.1.2 - Accept round braces in if statements for IE support
* 10/14/12 - v0.1.3 - Adjustments towards grunt file api
* 1/3/13 - v0.2.0 - Compatility with Grunt v0.4
* 1/29/13 - v0.2.1 - Compatility with new Grunt 0.4 file API
* 1/29/13 - v0.2.2 - Version tags

## License
Copyright (c) 2012 Ruben Stolk
Licensed under the MIT license.

[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started
