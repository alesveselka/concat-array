#!/usr/bin/env node

var fs = require("fs"),
    concat = require("concat"),
    args = process.argv,
    nameIndex = args.indexOf('-n') > args.indexOf('--name') ? args.indexOf('-n') : args.indexOf('--name'),
    filesIndex = args.indexOf('-f') > args.indexOf('--files') ? args.indexOf('-f') : args.indexOf('--files'),
    output = null,
    fileNames = null,
    i = 0,
    l = 0,
    root = null;

// Resolve file names either from 'files' argument passed in ...
if (filesIndex > -1)
{
    fileNames = args[filesIndex+1].split(",");
}
// ... or from 'name' argument
else if (nameIndex > -1)
{
    var names = args[nameIndex+1].split(",");
    fileNames = require(require("path").resolve(names[0]))[names[1]];
}

// If file names exist, start concat
if (fileNames && fileNames.length)
{
    var rootIndex = args.indexOf('-r') > args.indexOf('--root') ? args.indexOf('-r') : args.indexOf('--root'),
        outputIndex = args.indexOf('-o') > args.indexOf('--output') ? args.indexOf('-o') : args.indexOf('--output');

    output = outputIndex > -1 ? args[outputIndex+1] : "output.txt";

    // If root is passed in, prepend it before each file name
    if (rootIndex > -1)
    {
        root = args[rootIndex+1];
        l = fileNames.length;

        for (;i<l;i++) fileNames[i] = root + fileNames[i];
    }

    concat(fileNames,output,function (error)
    {
        if(error)
        {
            console.error(error);
            process.exit(2);
            return;
        }

        process.exit(0);
    });
}
else
{
    throw Error("Couldn't resolve name of files to concatenate.");
}
