function initTexture(scene, image) {
    let texture = new CGFappearance(scene);
    texture.setAmbient(10.0, 10.0, 10.0, 1);
    texture.setDiffuse(0.0, 0.0, 0.0, 1);
    texture.setSpecular(0.0, 0.0, 0.0, 1);
    texture.setShininess(1.0);
    texture.loadTexture('../images/' + image);
    texture.setTextureWrap('REPEAT', 'REPEAT');
    return texture;
}

