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


var mesh = null;

function handleFileSelect( evt ){
	var files = evt.target.files; //FileList object
	var file = files[0]; //Select First File

	console.log( file );

	//Read in file as a array buffer, then convert it to Node Buffer to feed into parseSTL.
	var reader = new FileReader();

	reader.onload = function(e) {
  	var arrayBuffer = reader.result;

  	var buf = Buffer.from( arrayBuffer );

  	mesh = parseSTL( buf );
  	console.log( "mesh updated." );
	}

	reader.readAsArrayBuffer( file );


}

/*var buf = fs.readFileSync('mesh.stl');
var mesh = parseSTL(buf);*/


