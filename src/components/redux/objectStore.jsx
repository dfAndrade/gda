import {configureStore} from '@reduxjs/toolkit'
import objectSlice from "./objectSlice";

export default configureStore({
    reducer: {
        objects: objectSlice,
    },
})