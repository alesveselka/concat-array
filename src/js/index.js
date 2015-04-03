#!/usr/bin/env node

var fs = require("fs"),
    args = process.argv,
    nameIndex = args.indexOf('-n') > args.indexOf('--name') ? args.indexOf('-n') : args.indexOf('--name'),
    filesIndex = args.indexOf('-f') > args.indexOf('--files') ? args.indexOf('-f') : args.indexOf('--files'),
    output = null,
    root = null,
    index = 0,
    filesLength = 0,
    fileNames = null;

/**
 * Read file by name passed in
 * @param {string} fileName
 * @private
 */
function _readFile(fileName)
{
    fs.readFile(fileName,_onReadFileComplete.bind(this,fileName));
}

/**
 * Read file complete handler
 * @param {string} file
 * @param {Error} error
 * @param {Buffer} data
 * @private
 */
function _onReadFileComplete(file,error,data)
{
    if (error) {throw error;}

    _printProgress((index-1)/filesLength);

    if (data) fs.appendFile(output,data,_onAppendFileComplete.bind(this,file));
}

/**
 * Print progress
 * @param {number} progress
 * @private
 */
function _printProgress(progress)
{
    progress = parseInt((progress >= 1.0 ? 1.0 : progress) * 100);

    var out = process.stdout,
        dots = "..........",
        spaces = "          ",
        dotLength = Math.floor(progress / 10);

    out.clearLine();
    out.cursorTo(0);
    out.write("Progress: "+dots.substr(0,dotLength)+spaces.substr(0,10-dotLength)+" "+progress + "%");

    if (progress === 100) out.write("\nConcat complete, output file: "+root+output);
}

/**
 * Append file complete handler
 * @param {string} file
 * @param {Error} error
 * @private
 */
function _onAppendFileComplete(file,error)
{
    if (error) {throw error;}

    if (index < filesLength) _readFile(root + fileNames[index++]);
    else _printProgress(1);
}

/**
 * File write complete handler
 * @param {Error} error
 * @private
 */
function _onFileWriteComplete(error)
{
    if (error) {throw error;}

    _readFile(root + fileNames[index++]);
}

/**
 * Resolve file names
 * @private
 */
function _resolveFileNames()
{
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
}

/**
 * Concat
 * @private
 */
function _concat()
{
    _resolveFileNames();

    // If file names exist, start concat
    if (fileNames && fileNames.length)
    {
        process.stdout.write("Concatenating array of files started.\r");

        var rootIndex = args.indexOf('-r') > args.indexOf('--root') ? args.indexOf('-r') : args.indexOf('--root'),
            outputIndex = args.indexOf('-o') > args.indexOf('--output') ? args.indexOf('-o') : args.indexOf('--output');

        output = outputIndex > -1 ? args[outputIndex+1] : "output.txt";
        root = rootIndex > -1 ? args[rootIndex+1] : "";
        filesLength = fileNames.length;

        // First write 'empty' content to the output file to clear it out
        fs.writeFile(output,"",_onFileWriteComplete);
    }
    else
    {
        throw Error("Couldn't resolve name of files to concatenate.");
    }
}
_concat();
