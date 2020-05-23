class MyAmbient extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cubemap = new MyUnitCubeQuad(this.scene);
        this.terrain = new MyTerrain(this.scene);
    }

    display() {
        let terrainScale = 50;

        // Draw terrain
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(terrainScale, terrainScale, 1);
        this.terrain.display();
        this.scene.popMatrix();

        // Draw cubemap
        this.scene.scale(terrainScale, terrainScale, terrainScale);
        this.cubemap.display();
    }
}