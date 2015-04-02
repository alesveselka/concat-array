## concat file array

Concatenate content of array of files

A) concat-array -n package.source -o result.js // use name of JSON file and field-name containing array of files
B) concat-array -r src/resources/ -f file1.txt,file2.txt -o result.js // list array as comma-separated list

```js
var concat = require('concat')

concat(['a.css', 'b.css', 'c.css'], 'all.css', function (error) {
  // done
})
```

## Install

```bash
$ npm install concat-array
```
