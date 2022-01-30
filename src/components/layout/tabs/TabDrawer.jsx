import {Box, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import {useState} from "react";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabDrawer(props) {
    const {children, ...other} = props;
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getChildTabs(children) {
        return children.map((child, index) => (
                <Tab key={child.props.label} label={child.props.label} {...a11yProps(index)} />
            )
        );
    }

    function getChildComponents(children) {
        return children.map((child, index) => (
                <TabPanel key={child.props.label} index={index} value={value}>
                    {child}
                </TabPanel>
            )
        );
    }


    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {children && getChildTabs(children)}
                </Tabs>
            </Box>
            {children && getChildComponents(children)}
        </Box>
    )
}