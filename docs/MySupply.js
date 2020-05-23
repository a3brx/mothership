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
        this.bottomPosition = 0.3;
        this.diamondRotation = 0;
    }

    initFaces() {
        this.face = new MyQuad(this.scene);
        this.diamond = new MySphere(this.scene, 4, 1);
        this.boxTexture = initTexture(this.scene, "box.jpg");
        this.diamondTexture = initTexture(this.scene, "diamond.jpg");
    }

    displayShape(shape, texture) {
        texture.apply();
        shape.display();
    }

    drop(x, y, z) {
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    reset() {
        this.state = SupplyStates.INACTIVE;
    }

    land() {
        this.state = SupplyStates.LANDED;
    }

    update(deltaTime) {
        if (this.state === SupplyStates.FALLING) {
            let speed = (10 - this.bottomPosition) / 3;
            this.y -= speed * deltaTime;
            if (this.y <= this.bottomPosition)
                this.land();
            return;
        }
        if (this.state === SupplyStates.LANDED)
            this.diamondRotation += (Math.PI / 2) * 0.05;
    }

    bottomPositionFunction(scale) {
        return 0.141206 + 0.111809 * scale + 0.03567839 * (scale * scale);
    }

    displayFalling(scale) {
        this.bottomPosition = this.bottomPositionFunction(scale);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4 * scale, 0.4 * scale, 0.4 * scale);

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.popMatrix();
    }


    displayLanded(scale) {
        this.bottomPosition = this.bottomPositionFunction(scale);
        this.y = this.bottomPosition;

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4 * scale, 0.4 * scale, 0.4 * scale);

        this.scene.pushMatrix();
        this.scene.translate(0, this.y * 0.5, 0);
        this.scene.rotate(this.diamondRotation, 0, 1, 0);
        this.scene.scale(0.2 * scale, 0.2 * scale, 0.2 * scale);
        this.displayShape(this.diamond, this.diamondTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.face, this.boxTexture);
        this.scene.popMatrix();

        this.scene.popMatrix();
    }


    display(scale) {
        switch (this.state) {
            case SupplyStates.FALLING:
                this.displayFalling(scale);
                break;
            case SupplyStates.LANDED:
                this.displayLanded(scale);
                break;
        }
    }
}