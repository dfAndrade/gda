import {createSlice} from '@reduxjs/toolkit'
import {Point3D} from "../../core/gda_core";
import * as Line from "../../core/LineOps"

export const objectSlice = createSlice({
    name: 'objects',
    initialState: {
        points: [],
        namedPoints: {},
        namedLines: {},
        lines: [],
    },
    reducers: {
        add_point: (state, action) => {
            const label = action.payload.label;
            if (label) state.namedPoints[label] = action.payload
            else state.points.push(action.payload)
        },
        remove_point_idx: (state, action) => {
            let idx = action.payload.idx
            state.points.splice(idx, 1)
        },
        remove_point_label: (state, action) => {
            let label = action.payload.label
            let idx = state.points.findIndex((item) => item.label === label)
            state.points.splice(idx, 1)
        },
        add_line_wref: (state, action) => {
            let pl = action.payload
            let p1Label = pl.p1Label
            let p2Label = pl.p2Label

            let p1 = state.namedPoints[p1Label]
            let p2 = state.namedPoints[p2Label]

            // let p1 = state.points.find((p) => p.label === p1Label)
            // let p2 = state.points.find((p) => p.label === p2Label)
            const label = action.payload.label;
            if (label) state.namedLines[label] = Line.create(p1,p2, label)
            else state.lines.push(Line.create(p1,p2,label))

            // state.lines.push(Line.create(p1,p2, pl.label))
        }
    },
})

// Action creators are generated for each case reducer function
export const {add_point, remove_point_idx, remove_point_label, add_line_wref} = objectSlice.actions

export default objectSlice.reducer