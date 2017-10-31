const readoutsX = 18,
    readoutsY = 18,
    readoutsFontSize = 18,
    readoutsLineSep = 12;

class Readouts {
    constructor(ship, terrain) {
        this.ship = ship;
        this.terrain = terrain;
    }

    update(dt) {

    }

    draw(ctx) {
        ctx.font = `bold ${readoutsFontSize}px "Iosevka Term", Consolas, Monaco, monospace`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

        let elevation = this.terrain.heightmap[Math.round(this.ship.x * scaleFactor)];
        
        let lines = [
            `V ${Math.round(-this.ship.dy * 100) / 100}`,
            `H ${Math.round(Math.abs(this.ship.dx) * 100) / 100}`,
            `TOTAL ${Math.round(Math.sqrt(this.ship.dx ** 2 + this.ship.dy ** 2) * 100) / 100}`,
            `ALT ${Math.round(this.terrain.heightmap[Math.round(this.ship.x * scaleFactor)] - this.terrain.y - this.ship.y * scaleFactor * 100) / 100}`,
            `THRO ${Math.round(this.ship.throttle * 100)}%`
        ];
        let y = readoutsY;
        
        for (let l of lines) {
            ctx.fillText(l, readoutsX, y);
            y += readoutsFontSize + readoutsLineSep;
        }
    }
}
