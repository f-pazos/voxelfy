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
  	console.log( mesh );
	}

	reader.readAsArrayBuffer( file );
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial( {color: 0x00ff00 } );


var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function render(){

	requestAnimationFrame( render );

	cube.rotation.x += 0.03;
	cube.rotation.y += 0.03;

	renderer.render( scene, camera );
};

render();

/*var buf = fs.readFileSync('mesh.stl');
var mesh = parseSTL(buf);*/


