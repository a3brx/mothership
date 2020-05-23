/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

const supplyNumber = 5;

class MyVehicle extends CGFobject {

    constructor(scene, height) {
        super(scene);
        this.balloon = new MySphere(scene, 12, 6);
        this.board = new MyCylinder(scene, 6);
        this.texture = initTexture(this.scene, "zeppelin.png");

        this.flagShader = new CGFshader(this.scene.gl, "../shaders/flag.vert", "../shaders/flag.frag");
        this.flagTexture = new CGFtexture(this.scene, "../images/flag.jpg");
        this.flagShader.setUniformsValues({timeFactor: 0});

        this.black = initColor(this.scene, 33, 17, 19);
        this.supplies = [];
        for (let i = 0; i < supplyNumber; i++)
            this.supplies.push(new MySupply(scene));
        this.Rudders = [new MyPentagon(scene), new MyPentagon(scene), new MyPentagon(scene), new MyPentagon(scene)];
        this.propeller = new MyPropeller(scene, 6);
        this.flag = new MyPlane(scene, 20);
        this.time = 0;
        this.timeSum = 0;
        this.y = height;
        this.reset();
    }

    reset() {
        this.x = 0;
        this.z = 0;
        for (let i = 0; i < supplyNumber; i++)
            this.supplies[i].reset();
        this.rotation = 0;
        this.speed = 0;
        this.automatic = false;
    }

    update(factor, turn = 0, t) {
        let deltaTime = 0;
        if (this.time != 0) {
            deltaTime = (t - this.time) / 1000
        }
        this.timeSum += deltaTime * Math.pow(2, this.speed * 10);
        if (this.automatic) {
            this.autoPilot(deltaTime);
        } else {
            this.z += Math.cos(this.rotation) * this.speed * factor;
            this.x += Math.sin(this.rotation) * this.speed * factor;
            this.propeller.update(factor);
            this.turning = turn;
        }
        for (let i = 0; i < supplyNumber; i++)
            this.supplies[i].update(deltaTime);
        this.time = t;
    }

    toggleAutoPilot() {
        this.automatic = !this.automatic;
        if (this.automatic) {
            this.rotationPoint = [this.x + 5 * Math.cos(this.rotation), this.z - 5 * Math.sin(this.rotation)];
            this.turning = -1;
        } else {
            this.turning = 0;
        }
    }

    autoPilot(deltaTime) {
        this.x = this.rotationPoint[0] - 5 * Math.cos(this.rotation);
        this.z = this.rotationPoint[1] + 5 * Math.sin(this.rotation);
        this.rotation += (Math.PI * 2 / 5) * deltaTime;
    }

    drop() {
        for (let i = 0; i < supplyNumber; i++)
            if (this.supplies[i].state === SupplyStates.INACTIVE) {
                this.supplies[i].drop(this.x, this.y, this.z);
                break;
            }
    }

    turn(val) {
        if (!this.automatic)
            this.rotation += val;
    }

    accelerate(val) {
        if (this.automatic)
            return;

        this.speed += val;
        if (this.speed < 0)
            this.speed = 0;
        this.propeller.accelerate(val);
    }

    display(scale) {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation, 0, 1, 0);


        this.scene.setActiveShader(this.flagShader);
        this.flagTexture.bind(0);
        this.flagShader.setUniformsValues({timeFactor: this.timeSum});

        this.scene.pushMatrix();
        this.scene.scale(1.2 * scale, 0.35 * scale, 1.2 * scale);
        this.scene.translate(0, 0, -1.8);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.pushMatrix();
        this.scene.rotate(-3 * Math.PI / 8, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5 * scale, 1.5 * scale, 0.5 * scale);
        this.texture.apply();
        this.balloon.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5 * scale, 1 * scale, 0.5 * scale);
        this.scene.translate(0, 0.2, 0.9);
        this.scene.scale(0.15, 0.3, 0.2);
        this.black.apply();
        this.board.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.scale(0.2 * scale, 0.2 * scale, 0.2 * scale);

        this.scene.pushMatrix();
        this.scene.translate(1, 0, -6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.Rudders[0].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, -6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.Rudders[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, -6);
        this.scene.rotate(this.turning * Math.PI / 15, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.Rudders[2].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1, -6);
        this.scene.rotate(this.turning * Math.PI / 15, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.Rudders[3].display();
        this.scene.popMatrix();

        for (let i = -1; i <= 1; i += 2) {
            this.scene.pushMatrix();
            this.scene.translate(i * 1.5, -2.5, 0);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.propeller.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.translate(0, -2.5, -4.5);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.propeller.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.popMatrix();

        for (let i = 0; i < supplyNumber; i++)
            this.supplies[i].display(scale);
    }


}