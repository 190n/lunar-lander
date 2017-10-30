const landingSiteBlendMargin = 20,
    minLandingSiteWidth = 40,
    maxLandingSiteWidth = 80;

class Terrain {
    constructor(width, maxDisplacement, iters, numLandingSites) {
        this.width = width;
        let terrain = [[0, 0], [width, 0]];
        for (let i = 0; i < iters; i++) {
            let newTerrain = [];
            for (let j = 0; j < terrain.length - 1; j++) {
                let p1 = terrain[j],
                    p2 = terrain[j + 1],
                    mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
                mid[1] += (Math.random() * 2 - 1) * maxDisplacement / Math.pow(2, i);
                newTerrain.push(p1);
                newTerrain.push(mid);
            }
            newTerrain.push(terrain[terrain.length - 1]);
            terrain = newTerrain;
        }
        this.points = terrain;
        this.buildHeightmap();
        this.landingSites = [];
        for (let i = 0; i < numLandingSites; i++) {
            let centerX = Math.random() * width / numLandingSites + i * width / numLandingSites,
                siteWidth = Math.random() * (maxLandingSiteWidth - minLandingSiteWidth) + minLandingSiteWidth;
            this.makeLandingSite(centerX, siteWidth);
            this.landingSites.push({centerX, width: siteWidth});
        }
    }

    static lerp(t0, t1, x0, x1, t) {
        if (t0 == t1 && x0 == x1) return x0;
        return (t - t0) / (t1 - t0) * (x1 - x0) + x0;
    }

    buildHeightmap() {
        let heightmap = [];
        for (let i = 0; i < this.width; i++) {
            let closest = this.getClosestPoints(i);
            heightmap[i] = Terrain.lerp(closest[0][0], closest[1][0], closest[0][1], closest[1][1], i);
        }
        this.heightmap = heightmap;
    }

    makeLandingSite(centerX, width) {
        centerX = Math.round(centerX);
        width = Math.round(width);
        let alt = this.heightmap[centerX];
        if (alt === undefined) return;
        for (let i = Math.floor(centerX - width / 2 - landingSiteBlendMargin); i <= Math.ceil(centerX + width / 2 + landingSiteBlendMargin); i++) {
            if (i < 0 || i >= this.width) continue;
            // borderline black magic
            let mulSite = Math.max(0, Math.min(1, 
                (i - centerX + width / 2 + landingSiteBlendMargin) / landingSiteBlendMargin,
                (-i + centerX + width / 2 + landingSiteBlendMargin) / landingSiteBlendMargin));
            let mulTerrain = 1 - mulSite;
            this.heightmap[i] = mulTerrain * this.heightmap[i] + mulSite * alt;
        }
    }

    getClosestPoints(x) {
        let l = 0, r = this.points.length - 1;
        while (true) {
            if (l > r) return null;
            let m = Math.floor((l + r) / 2);
            if (this.points[m][0] < x) {
                if (this.points[m + 1][0] > x) {
                    return [this.points[m], this.points[m + 1]];
                }
                l = m + 1;
                continue;
            }
            if (this.points[m][0] > x) {
                if (this.points[m - 1][0] < x) {
                    return [this.points[m - 1], this.points[m]];
                }
                r = m - 1;
                continue;
            }
            return [this.points[m], this.points[m]];
        }
    }

    initDrawing(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(ctx) {
        ctx.translate(this.x, this.y);
        ctx.moveTo(0, this.heightmap[0]);
        for (let i = 1; i < this.width; i++) {
            ctx.lineTo(i, this.heightmap[i]);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    update(dt) {
        
    }
}


