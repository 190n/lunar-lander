const scaleFactor = 5,
    moonGravity = 1.62,
    landerMass = 16000,
    maxThrust = 45000,
    maxAccel = maxThrust / landerMass,
    halfPi = Math.PI / 2,
    projectionStep = 0.05,
    projectionCount = 500;

class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rot = 0;
        this.rotSpeed = 0;
        this.dx = 0;
        this.dy = 0;
        this.img = new Image();
        this.img.src = 'ship.png';
        this.throttle = 0;
        this.throttleChange = 0;
        this.rotationControl = 0;
        window.addEventListener('keydown', e => {
            if (e.key == 'z') this.throttle = 1;
            else if (e.key == 'x') this.throttle = 0;
            if (e.key == 'Shift') this.throttleChange = 1;
            else if (e.key == 'Control') this.throttleChange = -1;

            if (e.key == 'a') this.rotationControl = -1;
            else if (e.key == 'd') this.rotationControl = 1;
        }, false);

        window.addEventListener('keyup', e => {
            if (e.key == 'Shift' || e.key == 'Control') this.throttleChange = 0;
            if (e.key == 'a' || e.key == 'd') this.rotationControl = 0;
        }, false);
    }

    update(dt) {
        let seconds = dt / 1000;
        this.dy += moonGravity * seconds;
        this.throttle = Math.min(1, Math.max(0, this.throttle + this.throttleChange * seconds));
        let accel = this.throttle * maxAccel,
            accelX = accel * Math.cos(this.rot - halfPi),
            accelY = accel * Math.sin(this.rot - halfPi);
        this.dx += accelX * seconds;
        this.dy += accelY * seconds;
        this.x += this.dx * seconds;
        this.y += this.dy * seconds;
        this.rotSpeed += this.rotationControl * seconds * 4;
        this.rot += this.rotSpeed * seconds;
        this.rebuildProjection();
        this.rebuildProjectionEngine();
    }

    rebuildProjection() {
        this.projection = [this.projectionStep([this.x, this.y, this.dx, this.dy])];
        for (let i = 0; i < projectionCount - 1; i++) {
            this.projection.push(this.projectionStep(this.projection[i]));
        }
    }

    projectionStep(p) {
        // item of this.projection:
        // 0: x coordinate
        // 1: y coordinate
        // 2: x speed
        // 3: y speed
        let [x, y, dx, dy] = p;
        x += dx * projectionStep;
        dy += moonGravity * projectionStep;
        y += dy * projectionStep;
        return [x, y, dx, dy];
    }

    rebuildProjectionEngine() {
        this.projectionEngine = [this.projectionEngineStep([this.x, this.y, this.dx, this.dy, this.rot])];
        for (let i = 0; i < projectionCount - 1; i++) {
            this.projectionEngine.push(this.projectionEngineStep(this.projectionEngine[i]));
        }
    }

    projectionEngineStep(p) {
        // 0: x coordinate
        // 1: y coordinate
        // 2: x speed
        // 3: y speed
        // 4: rotation
        // throttle, rotational speed based on current
        let [x, y, dx, dy, rot] = p;
        let accel = this.throttle * maxAccel,
            accelX = accel * Math.cos(rot - halfPi),
            accelY = accel * Math.sin(rot - halfPi);
        rot += this.rotSpeed * projectionStep;
        dx += accelX * projectionStep;
        dy += accelY * projectionStep + moonGravity * projectionStep;
        x += dx * projectionStep;
        y += dy * projectionStep;
        return [x, y, dx, dy, rot];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x * scaleFactor, this.y * scaleFactor);
        for (let p of this.projection) {
            ctx.lineTo(p[0] * scaleFactor, p[1] * scaleFactor);
        }
        ctx.strokeStyle = 'rgba(64, 192, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x * scaleFactor, this.y * scaleFactor);
        for (let p of this.projectionEngine) {
            ctx.lineTo(p[0] * scaleFactor, p[1] * scaleFactor);
        }
        ctx.strokeStyle = 'rgba(255, 128, 128, 0.5)';
        ctx.stroke();
        ctx.closePath();

        ctx.translate(this.x * scaleFactor, this.y * scaleFactor);
        ctx.rotate(this.rot);
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    }
}
