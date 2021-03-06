/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initBackground();
        this.setUpdatePeriod(50);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 10, 0);
        this.ambient = new MyAmbient(this);
        this.vehicle = new MyVehicle(this, 10);
        this.billboard = new MyBillboard(this);

        //Initialize textures
        this.initTextures();

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayNormals = false;
        this.displayCylinder = false;
        this.displaySphere = false;

        this.displayTerrain = true;
        this.selectedMapTexture = 0;
        this.textureIds = {'Day': 0, 'Night': 1};
        this.speedFactor = 1;
        this.scaleFactor = 1;
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-5, 30, -40), vec3.fromValues(0, 10, 0));
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initBackground() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
    }

    initTextures() {
        this.earthTexture = initTexture(this, "earth.jpg");
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateMapTexture() {
        this.ambient.cubemap.setTexture(this.selectedMapTexture);
    }

    checkKeys(t) {
        let turning = 0;
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelerate(0.01);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelerate(-0.01);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(0.1);
            turning = -1;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-0.1);
            turning = 1;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
            this.billboard.resetSupplies();
        }
        if (this.gui.isKeyPressed("KeyL")) {
            this.vehicle.drop();
            this.billboard.incrementSupplies();
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.vehicle.toggleAutoPilot();
        }
        return turning;
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        let res = this.checkKeys(t);
        this.vehicle.update(this.speedFactor, res, t);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if (this.displayNormals) {
            this.cylinder.enableNormalViz();
            this.sphere.enableNormalViz();
        }
        if (this.displayCylinder) {
            this.earthTexture.apply();
            this.cylinder.display();
        }
        if (this.displaySphere) {
            this.earthTexture.apply();
            this.sphere.display();
        }

        this.vehicle.display(this.scaleFactor);
        this.billboard.display(12, 6.8, 16);
        if (this.displayTerrain)
            this.ambient.display();

        // ---- END Primitive drawing section
    }
}