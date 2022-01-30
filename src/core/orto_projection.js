import {InfiniteLine2D, Point2D, Point3D} from "./gda_core";
import {OrtoCamera} from "./camera";
import * as Point from "./PointOps";
import * as Line from "./LineOps";


export default class OrtoProjection {

    constructor(hasFocus) {
        this.hasFocus = hasFocus
    }


    getSize() {
        return [this.canvas.width, this.canvas.height]
    }

    getZoomLevel() {
        return this.camera.zoomLevel
    }

    // setScale(x, y, factor) {
    //
    //     let ray = new Vector(x, y, 0).add(this.pos)
    //     ray.z = this.pos.z - DEFAULT_DIST
    //
    //     let toMove = new Vector.sub(ray, this.pos).normalize().mult(0.05 * factor * (this.pos.z - 36))
    //
    //     this.pos.add(toMove)
    //
    //     this.lookingAt.set(this.pos.x, this.pos.y, this.pos.z - DEFAULT_DIST)
    //
    //     this.zoom = DEFAULT_DIST / this.pos.z
    // }

    setBackground(bg) {
        this.bg = bg;
    }

    setup(p5, canvasParentRef) {
        this.bg = [0, 0, 0]
        this.canvas = null
        this.parentDiv = null
        this.camera = new OrtoCamera()

        // Interface meta to disable events
        this.hasFocus = true

        canvasParentRef.classList.add("canvas-container")
        this.parentDiv = canvasParentRef;
        var width = canvasParentRef.offsetWidth;
        var height = canvasParentRef.offsetHeight;

        let canvas = p5.createCanvas(width, height, p5.WEBGL)
        canvas.parent(canvasParentRef)
        this.canvas = canvas
        p5.background(...this.bg)
        p5.textFont(this.font)

        console.log("camera setup")
        this.camera.setup(p5, this)

        // this.container = objectManager

        // Add x axis
        // let x_axis = new InfiniteLine2D(new Point2D(-1, 0), new Point2D(1, 0), 'red', 1)
        // this.container.addLine(x_axis)




        console.log("constructor");

        console.log("setup");
    }

    mouseWheel(p5, e) {
        this.camera.mouseWheel(p5, e)
    }

    draw(p5, points, lines) {
        p5.background(...this.bg)

        this.camera.update(p5)

        for (let i = 0; i < points.length; i++) {
            // drawable[i].draw(p5, this)
            Point.render(points[i], p5, this)
        }

        for (let i = 0; i < lines.length; i++) {
            // drawable[i].draw(p5, this)
            Line.render(lines[i], p5, this)
        }

        for (const [key, value] of Object.entries(lines)) {
            Line.render(value, p5, this)
        }

        // p5.ellipse(0, 0, 100)
    }

    preload(p5) {
        this.font = p5.loadFont('Inconsolata.ttf');
    }

    mousePressed(p5, e) {
        this.camera.mousePressed(p5, e)
    }

    mouseDragged(p5, e) {
        this.camera.mouseDragged(p5, e)
    }

    windowResized(p5) {
        p5.resizeCanvas(this.parentDiv.offsetWidth, this.parentDiv.offsetHeight);
    }
}