class MainLoop {
    constructor(things, canvas, ctx) {
        this.things = things;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    start() {
        this.lastTick = Date.now();
        this.tickAnimationFrame = requestAnimationFrame(this.tick.bind(this));
    }

    tick() {
        let now = Date.now(),
            dt = now - this.lastTick;
        this.lastTick = now;
        for (let t of this.things) {
            t.update(dt);
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let t of this.things) {
            this.ctx.save();
            this.ctx.beginPath();
            try {
                t.draw(this.ctx);
            } catch (e) {}
            this.ctx.closePath();
            this.ctx.restore();
        }
        this.tickAnimationFrame = requestAnimationFrame(this.tick.bind(this));        
    }

    pause() {
        cancelAnimationFrame(this.tickAnimationFrame);
    }
}
