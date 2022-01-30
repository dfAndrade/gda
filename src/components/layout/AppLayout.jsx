import {Outlet} from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./app.scss"
import Sketch from "react-p5"; // Preload p5

const AppLayout = (props) => {
    const {objectManager} = props

    return <div className={"main"}>
        <div className={"sidebar-wrapper"}>
            <Sidebar objectManager={objectManager}/>
        </div>
        <div className={"content"}>
            <Outlet/>
        </div>
    </div>
        ;
};

export default AppLayout;