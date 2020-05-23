class MyUnitCircle extends CGFobject {
    constructor(scene, slices) {
        super(scene);

        this.slices = slices;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        
        this.vertices.push(0,0,0);
        
        var ang = (Math.PI*2)/this.slices;
        for(let i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(ang*i), 0, -Math.sin(ang*i));
            this.indices.push(i+1, 0, ((i+1)%this.slices)+1);
            this.indices.push(((i+1)%this.slices)+1,0,i+1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

