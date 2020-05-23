/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {

    constructor(scene) {
        super(scene);
        this.face = new MyQuad(scene);
        this.texture = 0;
        this.initMaterials();
    }

    setTexture(value) {
        if (value === this.texture)
            return;
        this.texture = value;
        this.initMaterials();
    }

    initMaterials() {
        this.texRight = initTexture(this.scene, "cubemap/" + this.texture + "/right.png");
        this.texLeft = initTexture(this.scene, "cubemap/" + this.texture + "/left.png");
        this.texFront = initTexture(this.scene, "cubemap/" + this.texture + "/front.png");
        this.texBack = initTexture(this.scene, "cubemap/" + this.texture + "/back.png");
        this.texTop = initTexture(this.scene, "cubemap/" + this.texture + "/top.png");
        this.texBottom = initTexture(this.scene, "cubemap/" + this.texture + "/bottom.png");
    }

    displayShape(shape, color) {
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        color.apply();
        shape.display();
        this.scene.popMatrix();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.texTop);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.texBottom);

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.displayShape(this.face, this.texRight);

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.displayShape(this.face, this.texLeft);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.displayShape(this.face, this.texFront);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.displayShape(this.face, this.texBack);
    }


}