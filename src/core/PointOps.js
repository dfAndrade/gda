const {Vector} = require("./p5utils");

export const create = function (x,y,z=0, label=null) {
    return {
        x: x,
        y: y,
        z: z,
        label: label,
    }
}

export const toVector = function(p) {
    return new Vector(p.x, p.y, p.z)
}

export const render = function(point, p5, manager) {
    p5.push()
    let x = 10 * point.x
    let y = 10 * point.y
    let z = 10 * point.z

    p5.fill('red')

    p5.ellipse(x, y, 2)
    p5.ellipse(x, -z, 2)

    p5.strokeWeight(1)
    p5.stroke('red')
    p5.line(x, y, x, -z)

    p5.pop()
}