const terrainMaxDisplacement = 300;

function init() {
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    window.addEventListener('resize', resize, false);
    resize();
    
    let terrain = initTerrain(canvas),
        ship = new Ship(20, 0),
        readouts = new Readouts(ship, terrain);
    let things = [terrain, ship, readouts];
    let mainLoop = new MainLoop(things, canvas, ctx);
    mainLoop.start();
}

function initTerrain(canvas) {
    let t = new Terrain(canvas.width, terrainMaxDisplacement, 10, 1);
    t.initDrawing(0, canvas.height - terrainMaxDisplacement * 1, '#fff');
    return t;
}

function resize() {
    return [window.innerWidth, window.innerHeight];
}

window.addEventListener('load', init, false);
