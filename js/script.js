//Felipe Pazos
//Voxelfy, 8/15/2016
//File to take a provided STL file, and convert it to a voxel representation.

'use strict';

var parseSTL = require('parse-stl');
/*var fs = require( 'fs' )

var buf = fs.readFileSync( 'mesh.stl' );

console.log( buf );

var mesh = parseSTL( buf );*/

//Set JS to handleFileSelect when file input changes.
document.getElementById( 'files' ).addEventListener( 'change', 
	handleFileSelect, false);


function handleFileSelect( evt ){
	var files = evt.target.files; //FileList object
	var file = files[0]; //Select First File

	console.log( file );

	//Read in file as a binary string.
	var reader = new FileReader();

	reader.onload = function(e) {
  	var arrayBuffer = reader.result;
  	console.log( 'e', arrayBuffer );

  	var buf = Buffer.from( arrayBuffer );
  	console.log( 'f', buf );

  	var mesh = parseSTL( buf );
  	console.log( 'd', mesh );

	}

	reader.readAsArrayBuffer( file );

	console.log( 'a', reader );
	
	console.log( 'b', reader.result );

}

/*var buf = fs.readFileSync('mesh.stl');
var mesh = parseSTL(buf);*/


