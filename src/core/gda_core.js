let Vector = window.p5.Vector;

export class Point2D {
    constructor(x, y, label = null) {
        this.x = x
        this.y = y
        this.label = label
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }

    distance(other) {
        return Point2D.distance(this, other)
    }

    set(x,y) {
        this.x = x
        this.y = y
    }

    add(other) {
        this.x += other.x
        this.y += other.y
    }

    static add(p1, p2) {
        return new Point2D(p1.x + p2.x,p1.y + p2.y)
    }

    toVector() {
        return new Vector(this.x, this.y)
    }

    toArray() {
        return [this.x, this.y]
    }
}

export class Point3D {
    constructor(x, y, z, label = null) {
        this.x = x
        this.y = y
        this.z = z
        this.label = label
    }

    set(x,y,z) {
        if (x !== undefined) this.x = x
        if (y !== undefined) this.y = y
        if (z !== undefined) this.z = z
    }

    draw(p5, manager) {

        p5.push()
        let x = 10 * this.x
        let y = 10 * this.y
        let z = 10 * this.z

        p5.fill('red')

        p5.ellipse(x, y, 2)
        p5.ellipse(x, -z, 2)
        p5.line(x, y, x, -z)

        p5.pop()
    }
}


export class InfiniteLine2D {
    constructor(p1, p2, stroke='black', strokeWeight = 1) {
        this.p1 = p1;
        this.p2 = p2;
        this.stroke = stroke
        this.strokeWeight = strokeWeight
    }

    setP1(x,y) {
        this.p1.set(x,y)
    }

    draw(p5, manager) {
        let strokeWeight = this.strokeWeight
        if (manager) strokeWeight /= manager.getZoomLevel()

        let p1 = this.p1.toVector()
        let p2 = this.p2.toVector()

        let dia_len = new Vector(p5.windowWidth, p5.windowHeight).mag();
        if (manager) dia_len /= manager.getZoomLevel()
        let dir_v = Vector.sub(p2, p1).setMag(dia_len);
        let norm
        if (manager) norm = new Vector(dir_v.y, -dir_v.x).setMag(5 / manager.getZoomLevel())
        let lp1 = Vector.add(p1, dir_v);
        let lp2 = Vector.sub(p1, dir_v);

        p5.stroke(this.stroke)
        p5.strokeWeight(strokeWeight)

        p5.line(lp1.x, lp1.y, lp2.x, lp2.y);
        if (manager) p5.textSize(12 / manager.getZoomLevel())
        if (manager)p5.text('word', norm.x, norm.y);
    }

    static fromAngle(p1, angle) {
        let x = Math.cos(angle)
        let y = Math.sin(angle)
        return new InfiniteLine2D(p1, Point2D.add(p1, new Point2D(x,y)))
    }
}