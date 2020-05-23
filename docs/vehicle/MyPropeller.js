class MyPropeller extends CGFobject {
    constructor(scene, slices, ratio = 2.5, minValue = 0.05) {
        super(scene);
        this.center = new MyUnitCircle(scene, slices);
        this.rotation = 0;
        this.ratio = ratio;
        this.minValue = minValue;
        this.speed = minValue;
    }

    update(factor) {
        this.rotation += factor * this.speed;
    }

    accelerate(val) {
        this.speed += val;
        if (this.speed < this.minValue)
            this.speed = this.minValue;
    }

    display() {
        this.center.display();
        this.scene.pushMatrix();
        for (let i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(i * Math.PI / 2 + this.rotation, 0, 1, 0);
            this.scene.translate(this.ratio + 1, 0, 0);
            this.scene.scale(this.ratio, 1, 1);
            this.center.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}