import "./ortotoolbar.scss"
import {AppBar, Toolbar} from "@mui/material";
import PointModal from "../PointModal/pointModal";

const OrtoToolbar = (props) => {
    const {handleFocus, isOpen} = props


    const handleClose = () => {
        handleFocus(true)
    }

    const handleOpen = () => {
        handleFocus(false)
    }

    return<AppBar color={"primary"} position={"static"}>
            <Toolbar>
                <PointModal
                    open={isOpen}
                    handleOpen={handleOpen}
                    handleClose={handleClose}/>
            </Toolbar>
        </AppBar>
    ;
};

export default OrtoToolbar;