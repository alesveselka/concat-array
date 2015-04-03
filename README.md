Concat file array
=================

CLI utility for concatenating content of array of files

Install
-------

```bash
$ npm install concat-file-array --save-dev
```

Usage
-----

```bash
concat-file-array -r src/js/ -package.json,source -o output.js
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
Examples
--------

For following examples assume following file structure:

```
|--js
|   |--src
|       |--fileA.js
|       |--fileB.js
|
|--public
|   |--js
|
|--package.json
```

```package.json``` file has field ```source``` with value holding array of files to contatenate:

```
{
    "source":[
        "fileA.js",
        "fileB.js"
    ]
}
```

You can use either list comma-separated files which content you want to concatenate ...
```bash
concat-file-array -f js/src/fileA.js,js/src/fileB.js
```

... or you can specify file that holds the array of files instead of listing the files directly to command line. The name option expect comma-separated name of JSON file, and the field-name refering to the array of files (\<file-name\>,\<field-name\>):
```bash
concat-file-array -r js/src/ -n package.json,source
```

If you don't want to write full path to each file, you can specify root directory which will be prepended to each file path:
```bash
concat-file-array -r js/src/ -f fileA.js,fileB.js
```

Without specifying output file, ```output.txt``` will be generated and concatenated result will be written into it. Optionally you can specify output file in option ```--output``` or shortcut ```-o```
```bash
concat-file-array -r js/src/ -n package.json,source -o public/js/output.js
```
