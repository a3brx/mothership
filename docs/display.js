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

function initColor(scene, r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let aux = new CGFappearance(scene);
    aux.setAmbient(5 * r, 5 * g, 5 * b, 1.0);
    aux.setDiffuse(0.0, 0.0, 0.0, 1);
    aux.setSpecular(0.0, 0.0, 0.0, 1);
    aux.setShininess(1.0);
    return aux;
}

