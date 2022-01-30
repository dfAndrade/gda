import {Point3D} from "./gda_core";
import {useSelector} from "react-redux";

export default class ObjectManager {
    constructor() {
        this.points = []
        this.lines = []

        // Auto generated labels for points
        this.latestLetter = 0
    }

    addLine(line) {
        this.lines.push(line)
    }

    addPoint(point) {
        this.points.push(point)
    }

    getDrawable() {
        return this.points.concat(this.lines)
    }

    getPoints() {
        return this.points
    }

    getLines() {
        return this.lines
    }

    createPoint(x,y,z, label) {
        if (undefined === label) label = String.fromCharCode(97 + this.latestLetter);

        this.addPoint(new Point3D(x,y,z, label))
    }

}