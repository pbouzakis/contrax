#!/usr/bin/env node
var fs = require("fs");
var contrax = require("..")

function sourceFrom(file) {
    return fs.readFileSync("./" + file, { encoding: "utf8" });
}

var src = sourceFrom(process.argv[2]);
var result = contrax(src);

console.log("Interfaces found.\n");
console.log(JSON.stringify(result, null, 4));
