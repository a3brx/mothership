class MyTerrain extends CGFobject {
    constructor(scene, image = "../images/terrain.jpg", heightmap = "../images/heightmap.jpg") {
        super(scene);
        this.plane = new MyPlane(scene, 20);
        this.terrainShader = initShader(this.scene.gl, "terrain", {uSampler2: 1});
        this.color = new CGFtexture(this.scene, image);
        this.map = new CGFtexture(this.scene, heightmap);
    }

    display() {
        this.terrainShader.setUniformsValues({normScale: this.scaleFactor});
        this.scene.setActiveShader(this.terrainShader);
        this.color.bind(0);
        this.map.bind(1);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}