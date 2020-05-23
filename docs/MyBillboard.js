class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.nSuppliesDelivered = 0;
        this.support = new MyQuad(scene);
        this.board = new MyQuad(scene);

        this.black = initColor(this.scene, 50, 50, 50);
        this.text = initTexture(this.scene, "billboard-text.jpg");
        this.texture = initTexture(this.scene, "billboard.jpg");
        this.progressShader = initShader(this.scene.gl, "billboard", {uSampler2: 1});
    }

    resetSupplies() {
        this.nSuppliesDelivered = 0;
    }

    incrementSupplies() {
        this.nSuppliesDelivered++;
    }

    display(x, y, z) {
        this.scene.pushMatrix();
        this.scene.translate(x, y, z);

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
        this.scene.popMatrix();
    }
}