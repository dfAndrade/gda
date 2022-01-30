import Sketch from "react-p5";
import {useEffect, useState} from "react";
import OrtoProjection from "../../core/orto_projection";
import {useSelector} from "react-redux";
import {OrtoCamera} from "../../core/camera";


const OrtoSketch = (props) => {
    const {hasFocus} = props
    const points = useSelector((state) => state.objects.points.concat(state.objects.namedPoints))
    const lines = useSelector((state) => state.objects.namedLines)
    const [orto, setOrto] = useState(undefined)
    const [camera, setCamera] = useState(undefined)

    useEffect(() => {
        // objectManager.addPoint(new Point3D(2,4,6))
        if (!orto) setOrto(new OrtoProjection(hasFocus)) // TODO migrate all OrtoProj to this component
        if (!camera) setCamera(new OrtoCamera())


    }, [])



    const setup = (p5, canvasParentRef) => {
        orto.setup(p5, canvasParentRef)
    }

    const draw1 = p5 => {
        orto.draw(p5, points, lines)
    }

    const mouseWheel = (p5, test) => {
        if (!hasFocus) return;
        orto.mouseWheel(p5, test)
    }

    const preload = (p5) => {
        orto.preload(p5)
    }

    const mouseDragged = (p5, event) => {
        if (!hasFocus) return;
        orto.mouseDragged(p5, event)
    }

    const mousePressed = (p5, event) => {
        if (!hasFocus) return;
        orto.mousePressed(p5, event)
    }

    const windowResized = (p5) => {
        orto.windowResized(p5)
    }

    const clickPoint = () => {
        console.log("clicked")

        // Dsiplay point creation modal/interface

        // -> In Modal handlers
        // Confirm point creation
        // orto.createPoint(specs)
    }

    return <Sketch setup={setup}
                   draw={draw1}
                   mouseWheel={mouseWheel}
                   preload={preload}
                   mouseDragged={mouseDragged}
                   mousePressed={mousePressed}
                   windowResized={windowResized}
    />
}

export default OrtoSketch