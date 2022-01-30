import OrtoToolbar from "../components/ortoToolBar/OrtoToolbar";
import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import * as Point from "../core/PointOps"
import * as Line from "../core/LineOps"
import {useDispatch, useSelector} from "react-redux";
import {add_line_wref, add_point} from "../components/redux/objectSlice";
import OrtoSketch from "../components/ortoSketch/OrtoSketch";

const OrtoPage = () => {
    // const [orto, setOrto] = useState(undefined)
    const dispatch = useDispatch();
    const [skecthHasFocus, setFocus] = useState(true)

    const handleOpen = (state) => {
        setFocus(state)
    }

    // const points = useSelector((state) => state.objects.points.concat(state.objects.namedPoints))
    // let orto = new OrtoProjection(objectManager, pointGetter);
    //
    // TODO make orto.toParams return {
    //     mouseWheel: mouseWheel
    //     preload : preload
    //     ...
    //  }
    //  Then do <Sketch {...orto.toParams()} />

    // useEffect(() => {
    //     // objectManager.addPoint(new Point3D(2,4,6))
    //     if (!orto) setOrto(new OrtoProjection())
    //
    //
    // }, [])

    useEffect(() => {
            // Add x axis
            //     let x_axis = new InfiniteLine2D(new Point2D(-1, 0), new Point2D(1, 0), 'red', 1)

            dispatch(add_point(Point.create(-1, 0, 0, "A")))
            dispatch(add_point(Point.create(1, 0, 0, "B")))
            dispatch(add_line_wref({p1Label: "A", p2Label:"B", label: "line1"}))
            console.log("miau")
        }
    )

    // const updateSketch = () => {
    //     return (
    //         <Sketch setup={setup1}
    //                 draw={draw1}
    //                 mouseWheel={mouseWheel}
    //                 preload={preload}
    //                 mouseDragged={mouseDragged}
    //                 mousePressed={mousePressed}
    //                 windowResized={windowResized}
    //         />
    //     )
    // }

    // useEffect(() => {
    //     if (!sketch) {
    //         // Initialize sketch
    //         let inst = updateSketch()
    //         setSketch(inst);
    //     }
    //
    //
    // }, [points])

    // useEffect(
    //     () => {
    //         // This effect is only responsible for cleaning up after the previous one 😅
    //         return () => {
    //             if (sketch) {
    //                 console.log('removing sketch!');
    //                 // Removing p5.js sketch because the component is un-mounting
    //                 sketch.remove();
    //             }
    //         };
    //     },
    //     // This effect needs to be re-initialized *after* the sketch gets created
    //     [sketch]
    // );

    // const setup1 = (p5, canvasParentRef) => {
    //     orto.setup(p5, canvasParentRef)
    // }
    //
    // const draw1 = p5 => {
    //     orto.draw(p5, points)
    // }
    //
    // const mouseWheel = (p5, test) => {
    //     orto.mouseWheel(p5, test)
    // }
    //
    // const preload = (p5) => {
    //     orto.preload(p5)
    // }
    //
    // const mouseDragged = (p5, event) => {
    //     orto.mouseDragged(p5, event)
    // }
    //
    // const mousePressed = (p5, event) => {
    //     orto.mousePressed(p5, event)
    // }
    //
    // const windowResized = (p5) => {
    //     orto.windowResized(p5)
    // }

    const clickPoint = () => {
        console.log("clicked")

        // Dsiplay point creation modal/interface

        // -> In Modal handlers
        // Confirm point creation
        // orto.createPoint(specs)
    }

    return (
        <Stack sx={{flexGrow: 1}} spacing={0}>
            <OrtoToolbar clickPoint={clickPoint} handleFocus={handleOpen}
            isOpen={!skecthHasFocus}
            />
            <OrtoSketch hasFocus={skecthHasFocus}/>
        </Stack>
    );
};

export default OrtoPage;