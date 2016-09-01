//Felipe Pazos
//Voxelfy, 8/15/2016
//File to take a provided STL file, and convert it to a voxel representation.

'use strict';

var parseSTL = require('parse-stl');


//Set JS to handleFileSelect when file input changes.
document.getElementById( 'files' ).addEventListener( 'change', 
	handleFileSelect, false);


var mesh = null;

/********************************/
/* Handle new file selection.   */
/********************************/

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

	console.log( stlScene );

	//Remove any object from the scene and add ours.
	stlScene.children = [];
	stlScene.add( threeGeometry );

	  //Find the actual max from the mesh, and rescale camera accordingly.
  var largestDimension = Math.max( max[0], max[1], max[2] );
	stlCamera.position.z = 3 * largestDimension;

	}

	reader.readAsArrayBuffer( file );
}


/***************************************/
/* Create scene to render STL preview. */
/***************************************/

//Create a THREE.js scene to render the STL file.

var stlScene = new THREE.Scene();
var stlCamera = new THREE.PerspectiveCamera( 75, window.innerWidth  / window.innerHeight, 0.1, 1000 );

var stlRenderer = new THREE.WebGLRenderer();
//Set width to 90 percent of half the screen.
stlRenderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( stlRenderer.domElement );

var stlGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var stlMaterial = new THREE.MeshNormalMaterial();


var stlObject = new THREE.Mesh( stlGeometry, stlMaterial );
stlScene.add( stlObject );

stlCamera.position.z = 5;

renderSTL();

function renderSTL(){

	requestAnimationFrame( renderSTL );

	stlScene.children[0].rotation.x += 0.01;
	stlScene.children[0].rotation.y += 0.01;

	stlRenderer.render( stlScene, stlCamera );
};


/***********************************************/
/* Create second scene to render voxel output. */
/***********************************************/

var voxScene = new THREE.Scene();
var voxCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var voxRenderer = new THREE.WebGLRenderer();

voxRenderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( voxRenderer.domElement );

var voxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var voxMaterial = new THREE.MeshNormalMaterial();

var voxObject = new THREE.Mesh( voxGeometry, voxMaterial );
voxScene.add( voxObject );

voxCamera.position.z = 7;

renderVOX();

function renderVOX(){

  requestAnimationFrame( renderVOX );

  voxScene.children[0].rotation.x += 0.01;
  voxScene.children[0].rotation.y -= 0.01;

  voxRenderer.render( voxScene, voxCamera );

}
