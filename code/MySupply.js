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
        this.top = new MyQuad(this.scene);
        this.bottom = new MyQuad(this.scene);
        this.front = new MyQuad(this.scene);
        this.back = new MyQuad(this.scene);
        this.right = new MyQuad(this.scene);
        this.left = new MyQuad(this.scene);
        this.diamond = new MySphere(this.scene,4,1);

        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(10.0, 10.0, 10.0, 1);
        this.texture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(1.0);
        this.texture.loadTexture('../images/box.jpg');
        this.texture.setTextureWrap('REPEAT', 'REPEAT');

        this.diamondTexture = new CGFappearance(this.scene);
        this.diamondTexture.setAmbient(10.0, 10.0, 10.0, 1);
        this.diamondTexture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.diamondTexture.setSpecular(10.0, 10.0, 10.0, 1);
        this.diamondTexture.setShininess(2.0);
        this.diamondTexture.loadTexture('../images/diamond.jpg');
        this.diamondTexture.setTextureWrap('REPEAT', 'REPEAT');
    }

    displayShape(shape, color) {
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        color.apply();
        shape.display();
        this.scene.popMatrix();
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
            let speed = (10 - this.bottomPosition)/3;
            this.y -= speed*deltaTime;
            if (this.y <= this.bottomPosition)
                this.land();
        }
        if(this.state === SupplyStates.LANDED)
        {
            this.diamondRotation += (Math.PI/2)*0.05;
        }
    }

    bottomPositionFunction(scale)
    {
        return 0.141206 + 0.111809*scale + 0.03567839*(scale*scale);
    }

    displayFalling(scale)
    {
        this.bottomPosition = this.bottomPositionFunction(scale);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4 * scale, 0.4 * scale, 0.4 * scale);

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.top, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.displayShape(this.bottom, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.displayShape(this.right, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.displayShape(this.left, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.displayShape(this.front, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.displayShape(this.back, this.texture);

        this.scene.popMatrix();
    }


    displayLanded(scale)
    {
        this.bottomPosition = this.bottomPositionFunction(scale);
        this.y = this.bottomPosition;
        
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4 * scale, 0.4 * scale, 0.4 * scale);

        this.scene.pushMatrix();
        this.scene.translate(0,this.y*0.5,0);
        this.scene.rotate(this.diamondRotation,0,1,0);
        this.scene.scale(0.2*scale,0.2*scale,0.2*scale);
        this.displayShape(this.diamond,this.diamondTexture);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.bottom, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(1, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.right, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(-1, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.left, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.front, this.texture);

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayShape(this.back, this.texture);

        this.scene.popMatrix();
    }


    display(scale) {
        switch(this.state)
        {
            case SupplyStates.FALLING:
            this.displayFalling(scale);
            break;
            case SupplyStates.LANDED:
            this.displayLanded(scale);
            break;
        }   
    }
}