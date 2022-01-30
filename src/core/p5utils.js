const Vector = window.p5.Vector;

export function coordsToWEBGL(p5) {
    return [p5.mouseX - 500. / 2, p5.mouseY - 400. / 2]
}

export function checkMouseInsideCanvas(mx, my, width, height) {
    let inX = between(mx, 0, width)
    let inY = between(my, 0, height)
    return inX && inY
}

export function between (val, a, b, inclusive) {
    var min = Math.min(a, b),
        max = Math.max(a, b);

    return inclusive ? val >= min && val <= max : val > min && val < max;
}

export {
    Vector
}