/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quadCima = new MyQuad(scene);
        this.quadBaixo = new MyQuad(scene);
        this.quadFrente = new MyQuad(scene);
        this.quadTras = new MyQuad(scene);
        this.quadDireita = new MyQuad(scene);
        this.quadEsquerda = new MyQuad(scene);
        this.nightMode = false;
        this.initMaterials();
    }

    setNightMode(value) {
        if (value === this.nightMode)
            return;
        this.nightMode = value;
        this.initMaterials();
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let texture = new CGFappearance(this.scene);
        texture.setAmbient(10.0, 10.0, 10.0, 1);
        texture.setDiffuse(0.0, 0.0, 0.0, 1);
        texture.setSpecular(0.0, 0.0, 0.0, 1);
        texture.setShininess(1.0);
        if (this.nightMode)
            texture.loadTexture('../images/split_cubemap/night-' + image + '.png');
        else
            texture.loadTexture('../images/split_cubemap/' + image + '.png');
        texture.setTextureWrap(wrap1, wrap2);
        return texture;
    }

    initMaterials() {
        this.texRight = this.initTexture("right");
        this.texLeft = this.initTexture("left");
        this.texFront = this.initTexture("front");
        this.texBack = this.initTexture("back");
        this.texTop = this.initTexture("top");
        this.texBottom = this.initTexture("bottom");
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
        this.displayShape(this.quadCima, this.texTop);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.quadBaixo, this.texBottom);

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.displayShape(this.quadDireita, this.texRight);

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.displayShape(this.quadEsquerda, this.texLeft);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.displayShape(this.quadFrente, this.texFront);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.displayShape(this.quadTras, this.texBack);
    }


}