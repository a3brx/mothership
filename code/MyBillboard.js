class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.nSuppliesDelivered = 0;
        this.support = new MyQuad(scene);
        this.board = new MyQuad(scene);

        this.text = this.initTexture("billboard-text");

        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(5 * 0.2, 5 * 0.2, 5 * 0.2, 1.0);
        this.black.setDiffuse(0.0, 0.0, 0.0, 1);
        this.black.setSpecular(0.0, 0.0, 0.0, 1);
        this.black.setShininess(1.0);

        this.texture = this.initTexture("billboard");

        this.progressShader = new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");
        this.progressShader.setUniformsValues({uSampler2: 1});
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let texture = new CGFappearance(this.scene);
        texture.setAmbient(10.0, 10.0, 10.0, 1);
        texture.setDiffuse(0.0, 0.0, 0.0, 1);
        texture.setSpecular(0.0, 0.0, 0.0, 1);
        texture.setShininess(1.0);
        texture.loadTexture('images/' + image + '.jpg');
        texture.setTextureWrap(wrap1, wrap2);
        return texture;
    }

    resetSupplies() {
        this.nSuppliesDelivered = 0;
    }

    incrementSupplies() {
        this.nSuppliesDelivered++;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.text.apply();
        this.board.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.texture.apply();
        this.board.display();
        this.scene.popMatrix();

        this.black.apply();
        for (let j = -1; j < 2; j += 2) {
            for (let i = -1; i < 2; i += 2) {
                this.scene.pushMatrix();
                this.scene.scale(0.05, 1, 0.05);
                this.scene.translate(15 * i, -1, 0);
                this.scene.scale(1, j, 1);
                this.support.display();
                this.scene.popMatrix();
            }
        }

        this.progressShader.setUniformsValues({normScale: this.scaleFactor});
        this.progressShader.setUniformsValues({nSuppliesDelivered: this.nSuppliesDelivered});
        this.scene.setActiveShader(this.progressShader);
        this.scene.pushMatrix();
        this.scene.scale(1.5, 0.2, 1);
        this.scene.translate(0, -1, -0.001);
        this.board.display();
        this.scene.popMatrix();
    }
}