import { IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

const useStyles = makeStyles((theme) => ({
    footer: {
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        minWidth: '120px',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jobsFound: {
    },
    arrowButton:{
        width: '48px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#e3f2fd',
            },
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
        },
    },
}));

const MobileFooter = ({ numTotalHits, jobsmobileRef }) => {

    smoothscroll.polyfill();

    const classes = useStyles();
    const theme = useTheme();

    const addCommas = function(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className={classes.footer}>
            <div className={classes.jobsFound}>
                <Typography noWrap align="left" variant="subtitle1">Jobs Found: <span style={{color: theme.palette.mode === 'light' ? '#673ab7' : '#2196f3'}}>{addCommas(numTotalHits)}</span></Typography>
            </div>
            <div className={classes.arrowContainer}>
                <IconButton className={classes.arrowButton}><ArrowUpwardIcon onClick={() => jobsmobileRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth'})} /></IconButton>
            </div>
        </div>
    )
}

export default MobileFooter;