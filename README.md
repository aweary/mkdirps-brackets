# mkdirp-brackets

A small utility that uses `mkdirp`, `async`, and `bracket-expansion` to allow for bracketed file paths when using `mkdirp`.
## Installation

## Usage

Anyone familiar with using a `mkdir -p` in a shell will be familiar with the bracket expansion syntax. It allows for the creation of multiple subdirectories at once.
For example, if you wanted to created a basic `src` folder for a frontend project, you could do:

```js
var mkdirp = require('mkdirp-brackets');

mkdirp('src/{styles,scripts}', function(err){
    if(err) throw err;
});

```

This will created `src`, `src/styles` and `src/scripts`.
