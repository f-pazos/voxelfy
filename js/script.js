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

  	//Create mesh object to render in three.js
  	var geoMesh = new THREE.Geometry();

  	var coords = mesh.positions;

  	var i = 0;

  	var max = [0,0,0];

  	//Take in 3 vertices of a triangle each iteration.
  	while (i+2 < coords.length){
  		var v1 = coords[i];
  		var v2 = coords[i+1];
  		var v3 = coords[i+2];

  		var verts = [v1, v2, v3]

  		//Check each vertex to keep track of maximum boudnaries.
  		for (var a = 0; a < 3; a++){
  			for (var j =0; j < 3; j++){
  				if(Math.abs(verts[j][a]) > max[a] ){
  					max[a] = Math.abs(verts[j][a]);
  				}
  			}
  		}

  		//Add each individual triangular face and vertex to three.js geometry.
  		v1 = new THREE.Vector3( v1[0], v1[1], v1[2] );
  		v2 = new THREE.Vector3( v2[0], v2[1], v2[2] );
		v3 = new THREE.Vector3( v3[0], v3[1], v3[2] );

		geoMesh.vertices.push( v1 );
		geoMesh.vertices.push( v2 );
		geoMesh.vertices.push( v3 );

		geoMesh.faces.push( new THREE.Face3( i, i+1, i+2 ) );

		//increment loop.
  		i += 3
  		}

  	geoMesh.computeFaceNormals();
  	geoMesh.computeVertexNormals();



  	//Create geometry from Mesh.
	var threeGeometry = new THREE.Mesh( geoMesh, new THREE.MeshNormalMaterial() );

	console.log( scene );

	//Remove any object from the scene and add ours.
	scene.children = [];
	scene.add( threeGeometry );

	  //Find the actual max from the mesh, and rescale camera accordingly.
  	var largestDimension = Math.max( max[0], max[1], max[2] );
	camera.position.z = 3 * largestDimension;
	console.log( camera );

	}

	reader.readAsArrayBuffer( file );
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial();


var sceneObject = new THREE.Mesh( geometry, material );
scene.add( sceneObject );

camera.position.z = 5;

render();

function render(){

	requestAnimationFrame( render );

	scene.children[0].rotation.x += 0.01;
	scene.children[0].rotation.y += 0.01;

	renderer.render( scene, camera );
};


/*var buf = fs.readFileSync('mesh.stl');
var mesh = parseSTL(buf);*/


