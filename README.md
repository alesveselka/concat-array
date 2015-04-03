Concat file array
=================

### CLI utility for concatenating content of array of files

Install
-------

```bash
$ npm install concat-file-array --save-dev
```

Usage
-----

```bash
$ concat-file-array -r src/js/ -package.json,source -o output.js
```

Available options:
```
    -r, --root          Root directory of source files. If you don't want to specify
                        directory in each of the concatenated files, specify root that
                        will be prepended to each file name.
    -f, --files         Comma-separated list of files to concatenate.
    -n, --name          Name of JSON file containing array of files to concatenate,
                        and comma-separated JSON-field-name holding the array.
    -o, --output        Name of file where resulting concatenated content will be
                        written into.
```
