import {checkMouseInsideCanvas, Vector} from "./p5utils";


export class OrtoCamera {

    setup(p5, manager) {
        this.manager = manager

        this.pos = new Vector(0, 0, 0) // camera pos
        this.pos.z = this.getDefaultDist()
        this.lookAt = new Vector(0, 0, 0) // camera look at pos
        this.up = new Vector(0, 1, 0)

        // Tells other objects the current zoom level to adjust stroke
        this.zoomLevel = 1 // Current zoom level based on distance to z = 0

        this.zoomFactor = 0.05 // zoom 5%

        // Drag meta data
        this.pressOffset = new Vector(0, 0)
    }

    move(toMove) {
        toMove.div(this.zoomLevel)
        this.pos.add(toMove)
        this.updateLookAt()
    }

    /**
     * Returns the value at which camera should be offset from plane so that coords
     * translate 1 to 1 in screen pixels.
     * @returns {number}
     */
    getDefaultDist() {
        let height = this.manager.getSize()[1]
        return (height / 2) / Math.tan(Math.PI / 6)
    }

    update(p5) {
        p5.camera(
            this.pos.x, this.pos.y, this.pos.z, // position
            this.lookAt.x, this.lookAt.y, this.lookAt.z, // lookingAt
            this.up.x, this.up.y, this.up.z // Up (? no me acuerdo :c)
        )
    }

    updateLookAt() {
        let defaultDist = this.getDefaultDist();
        this.lookAt.set(this.pos.x, this.pos.y, this.pos.z - defaultDist)
        this.zoomLevel = defaultDist / this.pos.z
    }

    /**
     * Zoom in on screen location
     * @param screenX Screen X
     * @param screenY Screen Y
     * @param factor -1 if backwards, 1 if forwards
     */
    zoomToScreenPoint(screenX, screenY, factor) {
        let ray = this.getScreenRay(screenX, screenY)
        let toMove = Vector.sub(ray[1], ray[0])
            .normalize()
            // Scaling factors for zoom
            .mult(this.zoomFactor * factor * (this.pos.z - 36)) // pos.z because our draw plane is z=0
                                                                // and z = 36 is the closest the camera can get
                                                                // due to frustum(? not 100% sure)

        this.move(toMove)
    }

    mousePressed(p5, e) {
        if (!this.checkMouseIn(p5)) return
        // Update camera move offset
        this.pressOffset.set(p5.mouseX, p5.mouseY)

        e.preventDefault()
        return false;
    }

    mouseDragged(p5, e) {
        // TODO Maybe change to initPos != null
        //  and set to null when mousePressed happens outside canvas
        if (!this.checkMouseIn(p5)) return
        // Get screen mouse pos
        let delta = new Vector(p5.mouseX, p5.mouseY)

        // Get offset from last move
        let offset = Vector.sub(this.pressOffset, delta)

        // Update move offset
        this.pressOffset.set(delta)

        // Move camera
        this.move(offset)

        e.preventDefault()
        return false;
    }

    mouseWheel(p5, e) {
        if (!this.checkMouseIn(p5)) return
        let sf = e.deltaY > 0 ? -1 : 1
        this.zoomToScreenPoint(p5.mouseX, p5.mouseY, sf)

        e.preventDefault()
        return false;
    }


    screenToWorld(screenX, screenY) {
        let size = this.manager.getSize()
        return [screenX - (size[0] / 2), screenY - (size[1] / 2)]
    }

    /**
     * Calculate a ray [start, end] to screen location.
     * @param screenX Screen X
     * @param screenY ScreenY
     * @returns {*[]}
     */
    getScreenRay(screenX, screenY) {
        // we only use camera with WEBGL where coords are shifted
        let converted = this.screenToWorld(screenX, screenY)
        let x = converted[0], y = converted[1]

        // Create a point at xy relative to camera
        let ray = new Vector(x, y, 0).add(this.pos)

        // Give depth to make sure ray respects camera geometry
        ray.z = this.pos.z - this.getDefaultDist()

        return [this.pos.copy(), ray]
    }

    checkMouseIn(p5) {
        return checkMouseInsideCanvas(p5.mouseX, p5.mouseY, this.manager.canvas.width, this.manager.canvas.height)
    }
}