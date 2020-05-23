/**
 * MyInterface
 * @constructor
 */
class MyInterface extends CGFinterface {
    constructor() {
        super();
        this.testMode = false;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;
        //​ disable the processKeyboard function
        this.processKeyboard = function () {
        };
        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        if (this.activeKeys[keyCode] === true && (keyCode == "KeyP" || keyCode == "KeyL")) {
            this.activeKeys[keyCode] = false;
            return true;
        }
        return this.activeKeys[keyCode] || false;
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        //Checkbox element in GUI
        if (this.testMode) {
            this.gui.add(this.scene, 'displayAxis').name('Display Axis');
            this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
            this.gui.add(this.scene, 'displayCylinder').name('Display Cylinder');
            this.gui.add(this.scene, 'displayNormals').name('Display Normals');
            this.gui.add(this.scene, 'nightMode').name('Night Mode');
        }
        this.gui.add(this.scene, 'selectedMapTexture', this.scene.textureIds).name('Selected Map Texture').onChange(this.scene.updateMapTexture.bind(this.scene));
        this.gui.add(this.scene, 'speedFactor', 0.1, 3);//.onChange(this.scene.onSpeedFactorChanged.bind(this.scene));
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3);

        this.initKeys();
        return true;
    }
}