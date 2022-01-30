import * as Point from "./PointOps"
import {Vector} from "./p5utils";

export const create = function (p1, p2, label = null, stroke = 'red', strokeWeight = '1') {
    return {
        p1: p1,
        p2: p2,
        label: label,
        stroke: stroke,
        strokeWeight: strokeWeight
    }
}

export const render = function (line, p5, manager) {
    let strokeWeight = line.strokeWeight
    let stroke = line.stroke
    if (manager) strokeWeight /= manager.getZoomLevel()

    let p1 = Point.toVector(line.p1)
    let p2 = Point.toVector(line.p2)

    let dia_len = new Vector(p5.windowWidth, p5.windowHeight).mag();
    if (manager) dia_len /= manager.getZoomLevel()
    let dir_v = Vector.sub(p2, p1).setMag(dia_len);
    let norm
    if (manager) norm = new Vector(dir_v.y, -dir_v.x).setMag(5 / manager.getZoomLevel())
    let lp1 = Vector.add(p1, dir_v);
    let lp2 = Vector.sub(p1, dir_v);

    p5.stroke(stroke)
    p5.strokeWeight(strokeWeight)

    p5.line(lp1.x, lp1.y, lp2.x, lp2.y);
    if (manager) p5.textSize(12 / manager.getZoomLevel())
    if (manager) p5.text('word', norm.x, norm.y);
}
