import {Stack} from "@mui/material";
import PointEntry from "./PointEntry";
import {useSelector} from "react-redux";

const ObjectContainer = () => {
    const points = useSelector((state) => state.objects.points)

    // const [items, setItems] = useState(getPointsElems(points))

    console.log("points", points);

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
        color: 'white'
    };

    function getPointsElems(points) {
        return points.map((point, index) => {
            return <PointEntry key={index} point={point}/>
        })
    }

    return (
        <Stack sx={style}>
            {getPointsElems(points)}
        </Stack>
    )
}

export default ObjectContainer