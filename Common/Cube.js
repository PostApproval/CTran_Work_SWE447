
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
   // Front face
   0.0,  0.0,  0.0,
   0.5,  0.0,  0.0,
   0.5,  0.5,  0.0,
   0.0,  0.5,  0.0,
  
  // Back face
   0.5,  0.0, 0.0,
   0.5,  0.5, 0.0,
   0.5,  0.5, 0.5,
   0.5,  0.0, 0.5,
  
  // Top face
   0.5,  0.0,  0.5,
   0.0,  0.0,  0.5,
   0.0,  0.5,  0.5,
   0.5,  0.5,  0.5,
  
  // Bottom face
   0.0,  0.0,  0.5,
   0.0,  0.0,  0.0,
   0.0,  0.5,  0.0,
   0.0,  0.5,  0.5,
  
  // Right face
   0.0,  0.5,  0.0,
   0.5,  0.5,  0.0,
   0.5,  0.5,  0.5,
   0.0,  0.5,  0.5,
  
  // Left face
   0.0,  0.0,  0.5,
   0.5,  0.0,  0.5,
   0.0,  0.0,  0.0,
   0.5,  0.0,  0.0,
   ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
			
      0,  1,  3,      
	  3,  1,  2,    // front
	  
      7,  5,  4,
      6,  5,  7,	// back
	  
      8,  9,  11,
	  11,  9, 10,   // top
	  
	  12, 13, 15,
	  15, 13, 14,   // bottom
	  
      16, 17, 19,
	  19, 17, 18,   // right
	  
      20, 21, 22,
	  22, 21, 23,   // left
    ])
        
    };

	this.color = { 
        values : new Float32Array([
           // Add your list vertex positions here
   // Front face
   1.0,  0.0,  0.0, 1.0,
   1.0,  0.0,  0.0, 1.0,
   1.0,  0.0,  0.0, 1.0,
   1.0,  0.0,  0.0, 1.0,
  
  // Back face
   0.0,  1.0, 0.0, 1.0,
   0.0,  1.0, 0.0, 1.0,
   0.0,  1.0, 0.0, 1.0,
   0.0,  1.0, 0.0, 1.0,
  
  // Top face
   0.0,  0.0,  1.0, 1.0,
   0.0,  0.0,  1.0, 1.0,
   0.0,  0.0,  1.0, 1.0,
   0.0,  0.0,  1.0, 1.0,
  
  // Bottom face
   1.0,  1.0,  0.0,  1.0,
   1.0,  1.0,  0.0,  1.0,
   1.0,  1.0,  0.0,  1.0,
   1.0,  1.0,  0.0,  1.0,
  
  // Right face
   0.0,  1.0,  1.0, 1.0,
   0.0,  1.0,  1.0, 1.0,
   0.0,  1.0,  1.0, 1.0,
   0.0,  1.0,  1.0, 1.0,
  
  // Left face
   1.0,  0.0,  1.0, 1.0,
   1.0,  0.0,  1.0, 1.0,
   1.0,  0.0,  1.0, 1.0,
   1.0,  0.0,  1.0, 1.0,
   ]),
        numComponents : 4
    };
	
	
	this.indices.count = this.indices.values.length;
  
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    //color buff
    this.color.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.color.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.color.values, gl.STATIC_DRAW );
    this.color.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    gl.enableVertexAttribArray( this.color.attributeLoc );
	
    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
        gl.FLOAT, gl.FALSE, 0, 0 );
	    
	//color  
	gl.bindBuffer( gl.ARRAY_BUFFER, this.color.buffer );
        gl.vertexAttribPointer( this.color.attributeLoc, this.color.numComponents, gl.FLOAT, gl.FALSE, 0, 0 );
	    
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
