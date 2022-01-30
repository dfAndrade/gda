import {Divider, styled} from "@mui/material";
import MuiGrid from '@mui/material/Grid';

const PointEntry = (props) => {
    const {point} = props

    const Grid = styled(MuiGrid)(({theme}) => ({
        width: '100%',
        textAlign: 'center',
        ...theme.typography.body2,
        '& [role="separator"]': {
            margin: theme.spacing(0, 2),
        },
    }));

    return (
        <Grid container>
            <Grid item xs>
                X: {point.x}
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs>
                Y: {point.y}
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs>
                Z: {point.z}
            </Grid>
        </Grid>
    )
}

export default PointEntry