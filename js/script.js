//Felipe Pazos
//Voxelfy, 8/15/2016
//File to take a provided STL file, and convert it to a voxel representation.

'use strict';

var parseSTL = require('parse-stl');
var fs = require('fs');

var buf = fs.readFileSync('mesh.stl');
var mesh = parseSTL(buf);

console.log(mesh);

