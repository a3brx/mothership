const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
        this.reset();
        this.initFaces();
        this.bottomPosition = 0.2;
    }

    initFaces() {
        this.top = new MyQuad(this.scene);
        this.bottom = new MyQuad(this.scene);
        this.front = new MyQuad(this.scene);
        this.back = new MyQuad(this.scene);
        this.right = new MyQuad(this.scene);
        this.left = new MyQuad(this.scene);
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(10.0, 10.0, 10.0, 1);
        this.texture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(1.0);
        this.texture.loadTexture('images/box.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
    }

    displayShape(shape, color) {
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        color.apply();
        shape.display();
        this.scene.popMatrix();
    }

    drop(x, y, z) {
        this.state = SupplyStates.FALLING;
        this.velocity = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    reset() {
        this.state = SupplyStates.INACTIVE;
        this.velocity = 0;
    }

    land() {
        this.y = this.bottomPosition;
        this.state = SupplyStates.LANDED;
    }

    update() {
        if (this.state === SupplyStates.FALLING) {
            this.velocity += 0.01;
            this.y -= this.velocity;
            if (this.y <= this.bottomPosition)
                this.land();
        }
    }

    display(scale) {
        this.bottomPosition = 0.2*scale;
        if (this.state === SupplyStates.INACTIVE)
            return;
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4 * scale, 0.4 * scale, 0.4 * scale);

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.displayShape(this.top, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.bottom, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.displayShape(this.right, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.displayShape(this.left, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.displayShape(this.front, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.displayShape(this.back, this.texture);

        this.scene.popMatrix();
    }
}