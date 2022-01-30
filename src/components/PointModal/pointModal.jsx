import * as React from "react"
import {useState} from "react"
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import TabDrawer from "../layout/tabs/TabDrawer";
import {useDispatch} from "react-redux";
import {add_point} from "../redux/objectSlice";

const PointModal = (props) => {
    const {handleOpen, handleClose, open} = props
    const dispatch = useDispatch()

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: 'white'
    };

    const handleSubmit = () => {
        dispatch(add_point({x: x, y: y,z: z}))
    }

    return (
        <div>
            <Button variant={"outlined"} onClick={handleOpen}>
                <ControlPointIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a point
                    </Typography>
                    <TabDrawer>
                        <Stack label={"Plain"} direction={"row"} spacing={2}>
                            <TextField label="X" variant="outlined" autoComplete={"off"} onChange={(e) => setX(e.target.value)}/>
                            <TextField label="Y" variant="outlined" autoComplete={"off"} onChange={(e) => setY(e.target.value)}/>
                            <TextField label="Z" variant="outlined" autoComplete={"off"} onChange={(e) => setZ(e.target.value)}/>
                        </Stack>
                        <Box label={"B13"}> Two </Box>
                        <Box label={"B24"}> Three </Box>
                    </TabDrawer>
                    <Button onClick={handleSubmit}>Create</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default PointModal;