import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ReactTooltip from 'react-tooltip';
import StateChart from './StateChart';

import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'absolute',
        backgroundColor: '#509609',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MapDialog = props => {
    const classes = useStyles();
    const [contentD, setContentD] = useState("");
    const [DTName, setDTName] = useState("");

    const navigate = useNavigate();

    const goToOfficeList = () => {
        navigate("/user/office");
    };

    return (
        <Dialog fullScreen TransitionComponent={Transition} open={props.show} onClose={props.closeModal} style={{ backgroundColor: 'white' }}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.closeModal} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    {!DTName && (
                        <Typography variant="h6" className={classes.title}>
                            No district selected
                        </Typography>
                    )}
                    {DTName && (
                        <Typography variant="h6" className={classes.title}>
                            <Button type="primary" size="large" onClick={goToOfficeList} style={{ float: "right" }}>
                                View offices in {DTName}
                            </Button>
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>

            <div style={{ backgroundColor: 'white' }}>
                <StateChart setTooltipContent={setContentD} setDistrictName={setDTName} selectedState={props.StateName} />
                <ReactTooltip>{contentD}</ReactTooltip>
            </div>
        </Dialog>
    )
};

export default MapDialog;
